// src/app/return/page.tsx
"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ReturnPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content font-inter">
      {/* Hero Section */}
      <section className="relative h-64 bg-cover bg-center flex items-center justify-center text-center rounded-b-lg shadow-lg animate-fade-in" style={{ backgroundImage: "url('https://placehold.co/1200x300/FFD700/333333?text=Return+Policy')" }}>
        <div className="absolute inset-0 bg-black opacity-50 rounded-b-lg"></div>
        <div className="relative z-10 p-6">
          <h1 className="text-5xl font-bold text-white mb-4 animate-slide-up">Return Policy</h1>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-8 animate-fade-in-delay-1">
          <p className="text-lg leading-relaxed mb-6">
            At Dhakaia Jamdani, we strive to ensure your satisfaction with every purchase. Please read our return policy carefully.
          </p>
        </section>

        <section className="mb-8 animate-fade-in-delay-2">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">General Conditions for Returns</h2>
          <ul className="list-disc list-inside text-lg space-y-3 pl-4">
            <li>
              <span className="font-semibold">Product Acceptance:</span> Please thoroughly inspect your product upon delivery from the delivery person/courier. <strong className="text-error">Do not accept the product if there are any issues.</strong> We cannot accept complaints or returns once the product has been accepted after delivery.
            </li>
            <li>
              <span className="font-semibold">Cancellation/Modification Window:</span> Orders can be cancelled or modified within <strong className="text-secondary">3 hours</strong> of confirmation. Beyond this period, if an order is cancelled, the delivery charge will be deducted, and the remaining amount will be refunded. If an order is modified after this period, the customer will be required to pay the delivery charge again.
            </li>
          </ul>
        </section>

        <section className="mb-8 animate-fade-in-delay-3">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">Special Conditions for Jamdani Sharee</h2>
          <ul className="list-disc list-inside text-lg space-y-3 pl-4">
            <li>
              <span className="font-semibold">Handwoven Nature:</span> Jamdani Sharees are handwoven by artisans. Therefore, minor variations such as yarn joints, small design irregularities (buti/guti), or slight thread protrusions are inherent characteristics of handmade products and are not considered defects.
            </li>
            <li>
              <span className="font-semibold">Non-Returnable/Non-Exchangeable:</span> Due to the delicate and unique nature of handwoven Jamdani Sharees, <strong className="text-error">sold Jamdani Sharees are not returnable or exchangeable.</strong> We encourage customers to review product videos before ordering to ensure satisfaction with color and design.
            </li>
            <li>
              <span className="font-semibold">Care Instructions:</span> Jamdani Sharees <strong className="text-error">must not be washed with water or exposed to water.</strong> Proper dry cleaning or specialized care is recommended.
            </li>
          </ul>
          <Image
            src="/images/sharee_1.webp"
            alt="Close-up of a Jamdani saree fabric"
            width={800}
            height={450}
            className="w-full h-auto rounded-lg shadow-md mt-6 mb-4 object-cover"
          />
          <p className="text-sm text-gray-600 text-center">Understand the unique characteristics of handwoven Jamdani.</p>
        </section>

        <section className="mb-8 animate-fade-in-delay-4">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">Advance Payment Refund Policy</h2>
          <p className="text-lg leading-relaxed pl-4">
            If a customer has made an advance payment but subsequently does not accept the product (due to a change of mind or not receiving the product), the advance payment will be refunded within <strong className="text-secondary">90 days</strong>.
          </p>
        </section>

        <section className="mb-8 animate-fade-in-delay-5">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">Product Booking Policy</h2>
          <ul className="list-disc list-inside text-lg space-y-3 pl-4">
            <li>Dhakaia Jamdani <strong className="text-error">does not encourage product booking.</strong></li>
            <li>If a customer is interested, they may book a product for a <strong className="text-secondary">limited time</strong> by making a <strong className="text-error">non-refundable advance payment.</strong></li>
            <li>If the product is not picked up within the stipulated time, the customer will not receive the product, and the non-refundable advance payment will not be adjusted against other products.</li>
          </ul>
        </section>

        <section className="animate-fade-in-delay-6">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">Contact for Issues</h2>
          <p className="text-lg leading-relaxed">
            If you have any questions or concerns regarding your order or our policies, please contact our customer service via our <Link href="/Contact" className="text-accent hover:underline font-bold">Contact Us</Link> page.
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
        .animate-slide-up {
          animation: slideUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ReturnPolicyPage;
