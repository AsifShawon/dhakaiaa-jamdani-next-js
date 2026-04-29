 "use client";
import { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, MessageCircle, Truck } from "lucide-react";
import { saveOrder } from "../api/orders";
import { fetchProducts } from "../slices/productSlices";
import { getUserData, userProfile, UserProfile } from "../auth/getUser";
import { User } from "@supabase/supabase-js";
import {
  initializeFromStorage,
  clearCart,
  syncCart,
  syncCartNow,
  decrementQuantity,
  incrementQuantity,
  loadCartFromServer,
} from "@/app/slices/cartSlice";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [placedOrderId, setPlacedOrderId] = useState<number | null>(null);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const cartItems = useSelector((state: any) => state.cart.cart);
  const { products, status } = useSelector((state: any) => state.products);

  useEffect(() => {
    dispatch(initializeFromStorage());
    dispatch(loadCartFromServer());
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    getUserData().then(setAuthUser);
    userProfile().then(setUserData);
  }, []);

  useEffect(() => {
    if (!userData && !authUser) return;
    setFormData((prev) => ({
      ...prev,
      firstName: userData?.firstname || prev.firstName,
      lastName: userData?.lastname || prev.lastName,
      email: authUser?.email || prev.email,
    }));
  }, [userData, authUser]);

  useEffect(() => {
    if (placedOrderId) {
      const timeout = setTimeout(() => {
        router.push(`/order-confirmation?orderId=${placedOrderId}`);
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [placedOrderId, router]);

  const cartProducts = useMemo(
    () =>
      cartItems
        .map((item: any) => {
          const product = products?.find((p: any) => p.id === item.id);
          return product ? { ...product, quantity: item.quantity } : null;
        })
        .filter(Boolean),
    [cartItems, products]
  );

  const subtotal = cartProducts.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0
  );
  const shipping = 100;
  const total = subtotal + shipping;

  const validateShipping = () => {
    const errors: Record<string, string> = {};
    ["firstName", "lastName", "email", "phone", "address", "city", "postalCode"].forEach(
      (key) => {
        if (!formData[key as keyof typeof formData]?.trim()) errors[key] = "Required";
      }
    );
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const placeOrder = async () => {
    if (!authUser?.id) return setSubmissionError("Please login to place order.");
    if (cartProducts.length === 0) return setSubmissionError("Cart is empty.");
    setSubmissionError("");
    setIsSubmitting(true);
    try {
      const order = await saveOrder({
        uid: authUser.id,
        status: "processing",
        total,
        products: cartProducts.map((p: any) => ({ id: p.id, quantity: p.quantity })) as any,
        order_info: formData as any,
      });

      const orderedProductDetails = cartProducts.map((p: any) => ({
        id: p.id,
        title: p.title,
        quantity: p.quantity,
        price: p.price,
      }));

      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "order_confirmation",
          orderId: order.id,
          ...formData,
          total: order.total,
          products: orderedProductDetails,
          firstName: formData.firstName,
          lastName: formData.lastName,
          customerEmail: formData.email,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          phone: formData.phone,
        }),
      });

      await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "order",
          title: `New order #${order.id}`,
          message: `${formData.firstName} ${formData.lastName} placed an order totaling ৳${order.total}.`,
        }),
      });

      dispatch(clearCart());
      await dispatch(syncCartNow());
      setCurrentStep(2);
      setPlacedOrderId(order.id as number);
    } catch (error: any) {
      setSubmissionError(error?.message || "Failed to place order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const nextStep = async () => {
    if (currentStep === 0) {
      if (!validateShipping()) return;
      setCurrentStep(1);
      return;
    }
    if (currentStep === 1) {
      await placeOrder();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24 pb-10">
      <div className="max-w-6xl mx-auto">
        <ul className="steps w-full mb-8">
          {["Shipping Info", "Review & Confirm", "Success"].map((step, index) => (
            <li key={step} className={`step ${index <= currentStep ? "step-primary" : ""}`}>{step}</li>
          ))}
        </ul>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={(e) => e.preventDefault()} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                {currentStep === 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      ["firstName", "First Name"],
                      ["lastName", "Last Name"],
                      ["email", "Email"],
                      ["phone", "Phone"],
                      ["city", "City"],
                      ["postalCode", "Postal Code"],
                    ].map(([key, label]) => (
                      <div key={key} className="form-control">
                        <label className="label"><span className="label-text">{label}</span></label>
                        <input name={key} value={(formData as any)[key]} onChange={handleInputChange} className={`input input-bordered ${fieldErrors[key] ? "input-error" : ""}`} />
                        {fieldErrors[key] && <p className="text-error text-xs mt-1">{fieldErrors[key]}</p>}
                      </div>
                    ))}
                    <div className="form-control md:col-span-2">
                      <label className="label"><span className="label-text">Address</span></label>
                      <input name="address" value={formData.address} onChange={handleInputChange} className={`input input-bordered ${fieldErrors.address ? "input-error" : ""}`} />
                      {fieldErrors.address && <p className="text-error text-xs mt-1">{fieldErrors.address}</p>}
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="alert alert-success"><Truck className="w-4 h-4" /> Cash on Delivery: Please keep ৳{total.toFixed(2)} ready.</div>
                    <div className="bg-base-200 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Shipping Address</h3>
                      <p>{formData.firstName} {formData.lastName}, {formData.address}, {formData.city} {formData.postalCode}, {formData.phone}</p>
                    </div>
                    <p className="text-sm text-base-content/70">Estimated delivery: 3-7 business days.</p>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="text-center py-10 space-y-3">
                    <div className="w-14 h-14 rounded-full bg-green-100 text-green-700 mx-auto flex items-center justify-center"><Check /></div>
                    <h2 className="text-2xl font-bold">Order placed successfully</h2>
                    <p>Redirecting to order confirmation...</p>
                    <Link href={`https://wa.me/8801711461083?text=Hi, I need help with order #${placedOrderId || ""}`} target="_blank" className="btn btn-outline">
                      <MessageCircle className="w-4 h-4" /> WhatsApp Order Inquiry
                    </Link>
                  </div>
                )}

                {submissionError && <p className="text-error mt-3">{submissionError}</p>}

                <div className="flex justify-between mt-6 items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className={`btn btn-outline ${currentStep === 0 || currentStep === 2 ? "invisible" : ""}`}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn btn-primary"
                    disabled={isSubmitting || currentStep === 2 || status === "loading"}
                  >
                    {isSubmitting ? <span className="loading loading-spinner"></span> : currentStep === 1 ? "Place Order" : <>Next <ArrowRight className="w-4 h-4 ml-2" /></>}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  {cartProducts.map((item: any, index: any) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              dispatch(decrementQuantity(item.id));
                              dispatch(syncCart());
                            }}
                            className="btn btn-xs btn-ghost"
                            type="button"
                          >
                            -
                          </button>
                          <span className="badge badge-neutral">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => {
                              dispatch(incrementQuantity(item.id));
                              dispatch(syncCart());
                            }}
                            className="btn btn-xs btn-ghost"
                            type="button"
                          >
                            +
                          </button>
                        </div>
                        <span>{item.title}</span>
                      </div>
                      <span>৳{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  {cartProducts.length > 0 && (
                    <>
                      <div className="divider"></div>
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>৳{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>৳{shipping.toFixed(2)}</span>
                      </div>
                      <div className="divider"></div>
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>৳{total.toFixed(2)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
