"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  initializeFromStorage,
  clearCart,
  decrementQuantity,
  incrementQuantity,
} from "@/app/slices/cartSlice";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CreditCard, Truck, Check } from "lucide-react";
import { fetchProducts } from "../slices/productSlices";
import { getUserData, userProfile, UserProfile } from "../auth/getUser";
import { User } from "@supabase/supabase-js";
import { saveOrder } from "../api/orders";
import { sendMail } from "../api/send-order-email";

interface CheckoutStep {
  title: string;
  icon: JSX.Element;
}

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [data, setData] = useState<User | null>(null);

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Shipping Info
    firstName: userData?.firstname || "",
    lastName: userData?.lastname || "",
    email: data?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserData();

      setData(user);
    };
    fetchUser();
  }, []);

  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.cart);
  const { products, status, error } = useSelector(
    (state: any) => state.products
  );

  const steps: CheckoutStep[] = [
    { title: "Shipping", icon: <Truck className="w-5 h-5" /> },
    { title: "Payment", icon: <CreditCard className="w-5 h-5" /> },
    { title: "Confirmation", icon: <Check className="w-5 h-5" /> },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await userProfile();
      setUserData(data);
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    dispatch(initializeFromStorage());
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  const cartProducts = cartItems.map((item: any) => {
    const product = products?.find((p: any) => p.id === item.id);
    return {
      ...product,
      quantity: item.quantity,
    };
  });

  const subtotal = cartProducts.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0
  );
  const shipping = 100; // Fixed shipping cost
  const total: number = subtotal + shipping;

  // In your component
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        setIsSubmitting(true);

        if (!data?.id) throw new Error("User not authenticated");

        const orderData = {
          uid: data.id,
          status: "processing" as const,
          total: total,
          products: cartProducts.map((p: { id: number; quantity: number }) => ({
            id: p.id,
            quantity: p.quantity,
          })) as unknown as JSON[],
          Order_info: formData as unknown as JSON
        };

        // Save order to database
        const order = await saveOrder(orderData);
        console.log("Order saved:", order);

        const ordered_products_id = cartProducts.map((p: { id: number }) => p.id);
        const ordered_products = products?.filter((p: any) =>
          ordered_products_id.includes(p.id)
        );

        const emailResponse = await sendMail(
          "Order Confirmation",
          order,
          formData,
          ordered_products
        );
        console.log("Email response:", emailResponse);

        dispatch(clearCart());
      } catch (error) {
        console.error("Order submission error:", error);
        alert("Order submission failed. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (status === "loading" || !products) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  if (status === "failed") {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const OrderSummary = () => {
    if (!cartProducts.length) {
      return (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <p>Your cart is empty</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4 pt">
            <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">City</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Postal Code</span>
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
          </div>
        );
      // case 1:
      //   return (
      //     <div className="space-y-4">
      //       <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
      //       <div className="form-control">
      //         <label className="label">
      //           <span className="label-text">Card Number</span>
      //         </label>
      //         <input
      //           type="text"
      //           name="cardNumber"
      //           value={formData.cardNumber}
      //           onChange={handleInputChange}
      //           className="input input-bordered"
      //           placeholder="1234 5678 9012 3456"
      //           required
      //         />
      //       </div>
      //       <div className="form-control">
      //         <label className="label">
      //           <span className="label-text">Cardholder Name</span>
      //         </label>
      //         <input
      //           type="text"
      //           name="cardName"
      //           value={formData.cardName}
      //           onChange={handleInputChange}
      //           className="input input-bordered"
      //           required
      //         />
      //       </div>
      //       <div className="grid grid-cols-2 gap-4">
      //         <div className="form-control">
      //           <label className="label">
      //             <span className="label-text">Expiry Date</span>
      //           </label>
      //           <input
      //             type="text"
      //             name="expiryDate"
      //             value={formData.expiryDate}
      //             onChange={handleInputChange}
      //             className="input input-bordered"
      //             placeholder="MM/YY"
      //             required
      //           />
      //         </div>
      //         <div className="form-control">
      //           <label className="label">
      //             <span className="label-text">CVV</span>
      //           </label>
      //           <input
      //             type="text"
      //             name="cvv"
      //             value={formData.cvv}
      //             onChange={handleInputChange}
      //             className="input input-bordered"
      //             placeholder="123"
      //             required
      //           />
      //         </div>
      //       </div>
      //     </div>
      //   );
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-6">Order Confirmation</h2>
            <div className="bg-base-200 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold">Shipping Address</h3>
              <p>
                {formData.firstName} {formData.lastName}
                <br />
                {formData.address}
                <br />
                {formData.city}, {formData.postalCode}
                <br />
                {formData.phone}
                <br />
                {formData.email}
              </p>
            </div>
            <div className="bg-base-200 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold">Payment Method</h3>
              <p className="text-green-700">Cash On Delivery</p>
            </div>
          </div>
        );
      // Add this case to renderStepContent function
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-6">Order Confirmation</h2>
            <div className="bg-base-200 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold">Order Summary</h3>
              {cartProducts.map((item: any) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.title} x {item.quantity}
                  </span>
                  <span>৳{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="divider"></div>
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>৳{total.toFixed(2)}</span>
              </div>
            </div>
            <div className="bg-base-200 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold">Shipping Address</h3>
              <p>
                {formData.firstName} {formData.lastName}
                <br />
                {formData.address}
                <br />
                {formData.city}, {formData.postalCode}
                <br />
                {formData.phone}
                <br />
                {formData.email}
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24 pb-10">
      <div className="max-w-6xl mx-auto">
        {/* Stepper */}
        <ul className="steps w-full mb-8">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className={`step ${index <= currentStep ? "step-primary" : ""}`}
              data-content={index <= currentStep ? "✓" : ""}
            >
              <div className="flex items-center gap-2">
                {step.icon}
                <span>{step.title}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="card bg-base-100 shadow-xl"
            >
              <div className="card-body">
                {renderStepContent()}

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className={`btn btn-outline ${
                      currentStep === 0 ? "invisible" : ""
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="loading loading-spinner"></span>
                    ) : currentStep === steps.length - 1 ? (
                      "Place Order"
                    ) : (
                      <>
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
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
                            onClick={() => dispatch(decrementQuantity(item.id))}
                            className="btn btn-xs btn-ghost"
                          >
                            -
                          </button>
                          <span className="badge badge-neutral">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => dispatch(incrementQuantity(item.id))}
                            className="btn btn-xs btn-ghost"
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
