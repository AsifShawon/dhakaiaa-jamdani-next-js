// src/app/shipping/page.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ShippingInfoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content font-inter">
      {/* Hero Section */}
      <section className="relative h-64 bg-cover bg-center flex items-center justify-center text-center rounded-b-lg shadow-lg animate-fade-in" style={{ backgroundImage: "url('/images/cod_delivery.webp')" }}>
        <div className="absolute inset-0 bg-black opacity-50 rounded-b-lg"></div>
        <div className="relative z-10 p-6">
          <h1 className="text-5xl font-bold text-white mb-4 animate-slide-up">Shipping Information</h1>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-8 animate-fade-in-delay-1">
          <p className="text-lg leading-relaxed mb-6">
            At Dhakaia Jamdani, we aim to deliver your authentic traditional Bangladeshi clothing efficiently and securely. Please read the following information regarding our shipping policies.
          </p>
        </section>

        <section className="mb-8 animate-fade-in-delay-2">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">Cash On Delivery (COD)</h2>
          <p className="text-lg leading-relaxed pl-4">
            We offer Cash on Delivery (COD) service within Dhaka city. You can pay for your order in cash when it is delivered to your doorstep.
          </p>
          <Image
            src="/images/cod_delivery.webp"
            alt="Cash on Delivery illustration"
            width={800}
            height={450}
            className="w-full h-auto rounded-lg shadow-md mt-6 mb-4 object-cover"
          />
          <p className="text-sm text-gray-600 text-center">Convenient payment upon delivery within Dhaka.</p>
        </section>

        <section className="mb-8 animate-fade-in-delay-3">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">Advance Payment Policy (Outside Dhaka & Remote Areas)</h2>
          <p className="text-lg leading-relaxed mb-4 pl-4">
            For orders outside Dhaka city, an advance payment is required to confirm your purchase:
          </p>
          <ul className="list-disc list-inside text-lg space-y-3 pl-8">
            <li>
              <span className="font-semibold">Orders up to ৳3,000:</span> An advance payment of <strong className="text-secondary">৳205</strong> or <strong className="text-secondary">৳305</strong> is required (via bKash/Nagad/Rocket to{' '}
              <a href="tel:+8801322902560" className="text-accent hover:underline">01322902560</a>).
            </li>
            <li>
              <span className="font-semibold">Orders exceeding ৳3,000:</span> A <strong className="text-secondary">30% advance payment</strong> of the total order value is required. The exact amount will be communicated to you during order confirmation.
            </li>
            <li>
              <span className="font-semibold">Upazila or Village Level:</span> For deliveries to Upazila or village-level areas, <strong className="text-error">full advance payment</strong> may be required to confirm your order due to logistical considerations.
            </li>
          </ul>
        </section>

        <section className="mb-8 animate-fade-in-delay-4">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">Courier Charges</h2>
          <p className="text-lg leading-relaxed pl-4">
            Please note that <strong className="text-error">courier charges are not included in the product price.</strong> These charges will be added to your total order amount and must be paid by the customer.
          </p>
        </section>

        <section className="mb-8 animate-fade-in-delay-5">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">Domestic Delivery Process</h2>
          <ol className="list-decimal list-inside text-lg space-y-3 pl-4">
            <li><span className="font-semibold">Order Confirmation:</span> Once your order is placed and any necessary advance payment is made, you will receive an order confirmation.</li>
            <li><span className="font-semibold">Dispatch:</span> Products are dispatched promptly after confirmation.</li>
            <li><span className="font-semibold">Delivery:</span> Our trusted courier partners will deliver your order to the provided address.</li>
            <li>
              <span className="font-semibold">Product Acceptance:</span> Upon delivery, <strong className="text-error">it is crucial to carefully examine the product(s) with the delivery person/courier.</strong> If you find any issues, discrepancies, or damage, <strong className="text-error">do not accept the package.</strong> Once the product has been accepted after delivery, complaints will not be entertained.
            </li>
          </ol>
          <Image
            width={800}
            height={450}
            src="/images/delivery.webp"
            alt="Delivery person handing over a package"
            className="w-full h-auto rounded-lg shadow-md mt-6 mb-4 object-cover"
          />
          <p className="text-sm text-gray-600 text-center">Ensure to inspect your package upon arrival.</p>
        </section>

        <section className="mb-8 animate-fade-in-delay-6">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">International Delivery</h2>
          <p className="text-lg leading-relaxed pl-4">
            Dhakaia Jamdani proudly serves international customers. We use <strong className="text-secondary">GPO – EMS service</strong> as our shipping partner for global deliveries. This ensures that your products are shipped economically, reliably, and reach you within a few days, depending on your location.
          </p>
        </section>

        <section className="mb-8 animate-fade-in-delay-7">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">Order Tracking</h2>
          <p className="text-lg leading-relaxed pl-4">
            We partner with reputable courier services for all deliveries. You can track the status and location of your product(s) through the courier company&apos;s tracking system. We encourage you to utilize their tracking facilities to stay updated on your delivery time and product&apos;s journey until it reaches you.
          </p>
        </section>

        <section className="animate-fade-in-delay-8">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">Important Information</h2>
          <ul className="list-disc list-inside text-lg space-y-3 pl-4">
            <li><span className="font-semibold">Accurate Details:</span> Ensure your name, delivery address, and mobile phone number are completely accurate when placing your order.</li>
            <li>
              <span className="font-semibold">Order Slip Verification:</span> As soon as you receive your order slip from Dhakaia Jamdani, please verify all details (name, address, phone number). Immediately inform us of any errors. Dhakaia Jamdani will not be responsible for issues arising from incorrect information provided by the customer.
            </li>
            <li>
              <span className="font-semibold">Product Booking:</span> We generally do not encourage product booking. However, if you wish to reserve a product for a limited time, a non-refundable advance payment is required. Failure to collect the product within the stipulated time will result in forfeiture of the product and the advance payment.
            </li>
          </ul>
          <p className="text-lg leading-relaxed mt-6">
            If you have any further questions about shipping or delivery, please feel free to{' '}
            <Link href="/Contact" className="text-accent hover:underline font-bold">contact our customer service team</Link>.
          </p>
        </section>
      </main>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-fade-in-delay-1 {
          animation: fadeIn 1s ease-out 0.2s forwards;
          opacity: 0;
        }
        .animate-fade-in-delay-2 {
          animation: fadeIn 1s ease-out 0.4s forwards;
          opacity: 0;
        }
        .animate-fade-in-delay-3 {
          animation: fadeIn 1s ease-out 0.6s forwards;
          opacity: 0;
        }
        .animate-fade-in-delay-4 {
          animation: fadeIn 1s ease-out 0.8s forwards;
          opacity: 0;
        }
        .animate-fade-in-delay-5 {
          animation: fadeIn 1s ease-out 1s forwards;
          opacity: 0;
        }
        .animate-fade-in-delay-6 {
          animation: fadeIn 1s ease-out 1.2s forwards;
          opacity: 0;
        }
        .animate-fade-in-delay-7 {
          animation: fadeIn 1s ease-out 1.4s forwards;
          opacity: 0;
        }
        .animate-fade-in-delay-8 {
          animation: fadeIn 1s ease-out 1.6s forwards;
          opacity: 0;
        }
        .animate-slide-up {
          animation: slideUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ShippingInfoPage;
