// src/app/privacy/page.tsx
"use client";
import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content font-inter">
      {/* Hero Section */}
      <section className="relative h-64 bg-cover bg-center flex items-center justify-center text-center rounded-b-lg shadow-lg animate-fade-in" style={{ backgroundImage: "url('https://placehold.co/1200x300/87CEEB/FFFFFF?text=Privacy+Policy')" }}>
        <div className="absolute inset-0 bg-black opacity-50 rounded-b-lg"></div>
        <div className="relative z-10 p-6">
          <h1 className="text-5xl font-bold text-white mb-4 animate-slide-up">Privacy Policy</h1>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-8 animate-fade-in-delay-1">
          <p className="text-lg leading-relaxed mb-6">
            At Dhakaia Jamdani, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information when you use our online store.
          </p>
        </section>

        <section className="mb-8 animate-fade-in-delay-2">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">Information We Collect</h2>
          <p className="text-lg leading-relaxed mb-4">
            We collect information necessary to process your orders and provide you with the best possible service. This may include:
          </p>
          <ul className="list-disc list-inside text-lg space-y-2 pl-4">
            <li><span className="font-semibold">Personal Identification Information:</span> Name, email address, phone number, and shipping address.</li>
            <li><span className="font-semibold">Transaction Data:</span> Details of products purchased, order total, and payment method (though we do not store full payment card details for online COD orders).</li>
            <li><span className="font-semibold">Communication Data:</span> Information you provide when contacting our customer service.</li>
          </ul>
        </section>

        <section className="mb-8 animate-fade-in-delay-3">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">How We Use Your Information</h2>
          <p className="text-lg leading-relaxed mb-4">
            Your information is used for the following purposes:
          </p>
          <ul className="list-disc list-inside text-lg space-y-2 pl-4">
            <li><span className="font-semibold">Order Fulfillment:</span> To process your purchases, deliver products, and send order confirmations.</li>
            <li><span className="font-semibold">Customer Service:</span> To respond to your inquiries, complaints, and support requests.</li>
            <li><span className="font-semibold">Communication:</span> To provide updates on your order status and, with your consent, send promotional offers.</li>
            <li><span className="font-semibold">Service Improvement:</span> To analyze website usage and improve our products and services.</li>
          </ul>
        </section>

        <section className="mb-8 animate-fade-in-delay-4">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">Data Protection</h2>
          <p className="text-lg leading-relaxed">
            We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.
          </p>
        </section>

        <section className="mb-8 animate-fade-in-delay-5">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">Sharing Your Information</h2>
          <p className="text-lg leading-relaxed">
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or serving you, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others&apos; rights, property, or safety.
          </p>
        </section>

        <section className="mb-8 animate-fade-in-delay-6">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">Your Consent</h2>
          <p className="text-lg leading-relaxed">
            By using our site, you consent to our privacy policy.
          </p>
        </section>

        <section className="animate-fade-in-delay-7">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">Changes to our Privacy Policy</h2>
          <p className="text-lg leading-relaxed">
            If we decide to change our privacy policy, we will post those changes on this page.
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
        .animate-slide-up {
          animation: slideUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicyPage;
