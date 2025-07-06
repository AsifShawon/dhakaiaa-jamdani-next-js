// src/app/faq/page.tsx
"use client";
import React from 'react';
import Link from 'next/link';

const FAQPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content font-inter">
      {/* Hero Section */}
      <section className="relative h-64 bg-cover bg-center flex items-center justify-center text-center rounded-b-lg shadow-lg animate-fade-in" style={{ backgroundImage: "url('https://placehold.co/1200x300/ADD8E6/333333?text=Frequently+Asked+Questions')" }}>
        <div className="absolute inset-0 bg-black opacity-50 rounded-b-lg"></div>
        <div className="relative z-10 p-6">
          <h1 className="text-5xl font-bold text-white mb-4 animate-slide-up">Frequently Asked Questions</h1>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-8 animate-fade-in-delay-1">
          <p className="text-lg leading-relaxed mb-6">
            Here are some common questions we receive. If you can&apos;t find the answer you&apos;re looking for, please don&apos;t hesitate to{' '}
            <Link href="/Contact" className="text-accent hover:underline font-bold">contact us</Link>.
          </p>
        </section>

        <section className="space-y-4 animate-fade-in-delay-2">
          {/* General Questions */}
          <div className="collapse collapse-arrow bg-base-200 rounded-lg shadow-md">
            <input type="checkbox" className="peer" id="faq-general" />
            <div className="collapse-title text-xl font-medium text-primary peer-checked:bg-primary peer-checked:text-accent rounded-t-lg">
              General Questions
            </div>
            <div className="collapse-content bg-base-200 text-base-content rounded-b-lg">
              <p className="py-4">
                <strong>Q: What types of products does Dhakaia Jamdani offer?</strong><br />
                A: We specialize in authentic Bangladeshi traditional wear, including various counts of Jamdani Sharees, elegant Panjabis, and beautiful Three Piece sets.
              </p>
              <p className="py-4">
                <strong>Q: Are your products handmade?</strong><br />
                A: Yes, our Jamdani Sharees are handwoven by skilled artisans, preserving the traditional craftsmanship of Bangladesh.
              </p>
              <p className="py-4">
                <strong>Q: Do you offer custom designs?</strong><br />
                A: Yes, for a small upcharge, you can provide your own design, and we will have it woven and shipped to your location.
              </p>
            </div>
          </div>

          {/* Ordering and Pricing */}
          <div className="collapse collapse-arrow bg-base-200 rounded-lg shadow-md">
            <input type="checkbox" className="peer" id="faq-ordering" />
            <div className="collapse-title text-xl font-medium text-primary peer-checked:bg-primary peer-checked:text-accent rounded-t-lg">
              Ordering and Pricing
            </div>
            <div className="collapse-content bg-base-200 text-base-content rounded-b-lg">
              <p className="py-4">
                <strong>Q: Are online prices different from showroom prices?</strong><br />
                A: Online prices, discounts, and offers are generally applicable only for online purchases and at our Jatrabari showroom. Other showrooms may have different pricing policies.
              </p>
              <p className="py-4">
                <strong>Q: How can I ensure the product color matches the image online?</strong><br />
                A: We publish product images taken with mobile phone cameras without editing, aiming for realism. However, slight color variations can occur. We strongly recommend watching product videos for a more accurate representation. Products are not returnable due to minor color differences.
              </p>
              <p className="py-4">
                <strong>Q: What if the price of a product changes after I&apos;ve placed an order?</strong><br />
                A: While we strive for real-time updates, product prices may not update instantly due to technical or management issues. We will inform you of any price changes before confirming your order.
              </p>
              <p className="py-4">
                <strong>Q: How can I place an order quickly?</strong><br />
                A: For faster service, we recommend using WhatsApp voice messages. You can also call us directly from 11 AM to 11 PM.
              </p>
            </div>
          </div>

          {/* Payment and Shipping */}
          <div className="collapse collapse-arrow bg-base-200 rounded-lg shadow-md">
            <input type="checkbox" className="peer" id="faq-payment-shipping" />
            <div className="collapse-title text-xl font-medium text-primary peer-checked:bg-primary peer-checked:text-accent rounded-t-lg">
              Payment and Shipping
            </div>
            <div className="collapse-content bg-base-200 text-base-content rounded-b-lg">
              <p className="py-4">
                <strong>Q: What are the payment options?</strong><br />
                A: We offer Cash on Delivery (COD) for certain areas. For deliveries outside Dhaka city, an advance payment is required for orders up to ৳3,000. For orders above ৳3,000, 30% advance payment is required, or the exact amount will be communicated. For remote areas (Upazila/village level), full advance payment might be necessary.
              </p>
              <p className="py-4">
                <strong>Q: Is shipping free?</strong><br />
                A: No, courier charges are not included in the product price and must be paid separately.
              </p>
              <p className="py-4">
                <strong>Q: How do you ship internationally?</strong><br />
                A: We use GPO – EMS service for international shipping, ensuring economical and reliable delivery within a few days.
              </p>
              <p className="py-4">
                <strong>Q: How can I track my order?</strong><br />
                A: You can track your order&apos;s status and location through the courier company&apos;s tracking system, based on their capabilities.
              </p>
            </div>
          </div>

          {/* Returns, Cancellations & Refunds */}
          <div className="collapse collapse-arrow bg-base-200 rounded-lg shadow-md">
            <input type="checkbox" className="peer" id="faq-returns" />
            <div className="collapse-title text-xl font-medium text-primary peer-checked:bg-primary peer-checked:text-accent rounded-t-lg">
              Returns, Cancellations & Refunds
            </div>
            <div className="collapse-content bg-base-200 text-base-content rounded-b-lg">
              <p className="py-4">
                <strong>Q: What is your cancellation policy?</strong><br />
                A: You can cancel or modify your order within 3 hours of confirmation. If you cancel after this period, the delivery charge will be deducted from your refund. If you modify your order, you will need to pay the delivery charge again.
              </p>
              <p className="py-4">
                <strong>Q: Can I return a Jamdani Sharee?</strong><br />
                A: No, sold Jamdani Sharees are generally non-returnable and non-exchangeable due to their handmade nature and delicate craftsmanship. Please inspect the product carefully upon delivery.
              </p>
              <p className="py-4">
                <strong>Q: What if I made an advance payment but didn&apos;t receive/accept the product?</strong><br />
                A: If you made an advance payment and did not receive or accept the product (e.g., changed your mind), the payment will be refunded within 90 days.
              </p>
            </div>
          </div>

          {/* Product Care */}
          <div className="collapse collapse-arrow bg-base-200 rounded-lg shadow-md">
            <input type="checkbox" className="peer" id="faq-care" />
            <div className="collapse-title text-xl font-medium text-primary peer-checked:bg-primary peer-checked:text-accent rounded-t-lg">
              Product Care
            </div>
            <div className="collapse-content bg-base-200 text-base-content rounded-b-lg">
              <p className="py-4">
                <strong>Q: How should I care for my Jamdani Sharee?</strong><br />
                A: Jamdani Sharees must <strong className="text-error">not be washed with water or exposed to water.</strong> They require specialized care, typically dry cleaning.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="collapse collapse-arrow bg-base-200 rounded-lg shadow-md">
            <input type="checkbox" className="peer" id="faq-contact" />
            <div className="collapse-title text-xl font-medium text-primary peer-checked:bg-primary peer-checked:text-accent rounded-t-lg">
              Contact Information
            </div>
            <div className="collapse-content bg-base-200 text-base-content rounded-b-lg">
              <div className="py-4">
                <p>
                  <strong>Q: How can I contact customer service for inquiries or complaints?</strong><br />
                  A: You can reach us via:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2">
                  <li>WhatsApp (for quick orders/inquiries):{' '}
                    <a href="tel:+8801322902540" className="text-accent hover:underline">01322902540</a>,{' '}
                    <a href="tel:+8801322902541" className="text-accent hover:underline">01322902541</a>,{' '}
                    <a href="tel:+8801322902542" className="text-accent hover:underline">01322902542</a>,{' '}
                    <a href="tel:+8801322902543" className="text-accent hover:underline">01322902543</a>,{' '}
                    <a href="tel:+8801322902544" className="text-accent hover:underline">01322902544</a>,{' '}
                    <a href="tel:+8801322902545" className="text-accent hover:underline">01322902545</a>,{' '}
                    <a href="tel:+8801322902546" className="text-accent hover:underline">01322902546</a>,{' '}
                    <a href="tel:+8801322902547" className="text-accent hover:underline">01322902547</a>,{' '}
                    <a href="tel:+8801322902548" className="text-accent hover:underline">01322902548</a>,{' '}
                    <a href="tel:+8801322902549" className="text-accent hover:underline">01322902549</a>.
                    For complaints or general inquiries: <a href="tel:+8801711461083" className="text-accent hover:underline">01711461083</a>.
                  </li>
                  <li>Email: <a href="mailto:admin@dhakaiaajamdani.com" className="text-accent hover:underline">admin@dhakaiaajamdani.com</a></li>
                </ul>
                <p className="mt-2">
                  For Facebook Messenger inquiries, please note that we follow a &quot;First Come, First Serve&quot; policy, and it may take up to 72 hours to receive a response. For faster response please use WhatsApp voice messages.
                </p>
              </div>
              <p className="py-4">
                <strong>Q: Where are your physical stores located?</strong><br />
                A: Our Wholesale Store is in <strong className="text-secondary">Jatrabari, Dhaka</strong>. We also have Retail Stores in <strong className="text-secondary">New Market, Dhaka</strong>, and <strong className="text-secondary">Chattogram</strong>. Detailed addresses are available on our <Link href="/Contact" className="text-accent hover:underline">Contact Us</Link> page.
              </p>
            </div>
          </div>
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
        .animate-slide-up {
          animation: slideUp 1s ease-out forwards;
        }
        /* DaisyUI collapse transition */
        .collapse-content {
          transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
        }
        .peer:checked ~ .collapse-content {
          max-height: 500px; /* Adjust as needed for content length */
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default FAQPage;
