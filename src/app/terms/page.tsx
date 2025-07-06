// src/app/terms/page.tsx
import React from 'react';
import Link from 'next/link';

const TermsAndServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content font-inter">
      {/* Hero Section */}
      <section className="relative h-64 bg-cover bg-center flex items-center justify-center text-center rounded-b-lg shadow-lg animate-fade-in" style={{ backgroundImage: "url('https://placehold.co/1200x300/8B0000/FFFFFF?text=Terms+and+Services')" }}>
        <div className="absolute inset-0 bg-black opacity-50 rounded-b-lg"></div>
        <div className="relative z-10 p-6">
          <h1 className="text-5xl font-bold text-white mb-4 animate-slide-up">Terms and Services</h1>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-8 animate-fade-in-delay-1">
          <p className="text-lg leading-relaxed mb-6">
            Welcome to Dhakaia Jamdani online shop! We hope your shopping experience with us is delightful. By accessing and using our website and services, you agree to comply with and be bound by the following terms and conditions.
          </p>
        </section>

        <section className="mb-8 animate-fade-in-delay-2">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">1. Products</h2>
          <ul className="list-disc list-inside text-lg space-y-3 pl-4">
            <li><span className="font-semibold">Variety:</span> We offer high-quality Sharees (including various counts of Jamdani), Panjabi, and other categories and designs of women&apos;s apparel.</li>
            <li>
              <span className="font-semibold">Quality & Color:</span> While we strive for accuracy, slight color variations may occur between the product image and the actual product due to photographic lighting sources or your monitor settings. We strongly recommend customers to <strong className="text-secondary">watch product videos before placing an order</strong>, as products are generally not returned due to minor color discrepancies.
            </li>
            <li>
              <span className="font-semibold">Handwoven Jamdani:</span> Please note that Jamdani Sharees are handwoven. Minor characteristics like yarn joints, small thread irregularities (buti/guti), or slightly raised threads are inherent to the craftsmanship and should be considered when ordering.
            </li>
          </ul>
        </section>

        <section className="mb-8 animate-fade-in-delay-3">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">2. Pricing</h2>
          <ul className="list-disc list-inside text-lg space-y-3 pl-4">
            <li><span className="font-semibold">Pricing Structure:</span> Prices are determined as wholesale prices, varying by product. Online prices are exclusively applicable for online purchases.</li>
            <li>
              <span className="font-semibold">Online Exclusive Offers:</span> Any prices, discounts, or offers displayed online are valid <strong className="text-secondary">only for online purchases.</strong> These online-specific promotions will also be honored at Dhakaia Jamdani&apos;s Jatrabari showroom. For other showrooms, their respective pricing and offer policies will apply.
            </li>
            <li>
              <span className="font-semibold">Offer Eligibility:</span> To avail of any offer, discount, or price reduction, orders must be confirmed within the stipulated time frame as per the applicable terms of the offer.
            </li>
            <li>
              <span className="font-semibold">Price Updates:</span> Due to technical complexities and management reasons, product prices may not be updated instantly online. Customers will be informed of any price changes (reduction or increase) before order confirmation.
            </li>
          </ul>
        </section>

        <section className="mb-8 animate-fade-in-delay-4">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">3. Order Placement & Confirmation</h2>
          <ul className="list-disc list-inside text-lg space-y-3 pl-4">
            <li><span className="font-semibold">Accuracy of Information:</span> It is crucial to provide your name, address, and mobile phone number accurately when placing an order.</li>
            <li>
              <span className="font-semibold">Order Slip Verification:</span> Upon receiving your order slip from Dhakaia Jamdani, please immediately verify that your name, address, and phone number are correct. Any discrepancies must be reported immediately. Dhakaia Jamdani will not be responsible for any issues arising from incorrect information provided by the customer.
            </li>
            <li>
              <span className="font-semibold">Booking Policy:</span> Dhakaia Jamdani does not encourage holding products. Customers interested in booking a product for a limited time may do so by making a <strong className="text-error">non-refundable advance payment.</strong> If the product is not picked up within the agreed timeframe, the product will not be delivered, and the non-refundable advance payment will not be adjusted against other products.
            </li>
          </ul>
        </section>

        <section className="mb-8 animate-fade-in-delay-5">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">4. Payment & Delivery</h2>
          <ul className="list-disc list-inside text-lg space-y-3 pl-4">
            <li>
              <span className="font-semibold">Advance Payment (Outside Dhaka):</span> For purchases outside Dhaka city up to ৳3,000, an advance payment of ৳205/৳305 (via bKash/Nagad/Rocket to{' '}
              <a href="tel:+8801322902560" className="text-accent hover:underline">01322902560</a>) is required. For purchases exceeding ৳3,000, the advance payment amount will be communicated, or a 30% advance will be required. For purchases in Upazila or village areas, full advance payment may be required for order confirmation.
            </li>
            <li><span className="font-semibold">Courier Charges:</span> Courier charges are <strong className="text-error">not included</strong> in the product price and must be paid separately by the customer.</li>
            <li>
              <span className="font-semibold">Delivery & Acceptance:</span> Please carefully receive and verify your product from the delivery person/courier. <strong className="text-error">Do not accept the product if there is any damage or discrepancy.</strong> Complaints regarding the product after delivery acceptance will not be entertained.
            </li>
            <li>
              <span className="font-semibold">Courier Responsibility:</span> For courier/home delivery, the respective courier company is responsible for the delivery. Dhakaia Jamdani partners with reputable courier services. Customers can track their product&apos;s location and estimated delivery time through the courier company&apos;s tracking system.
            </li>
          </ul>
        </section>

        <section className="mb-8 animate-fade-in-delay-6">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">5. Order Cancellation & Modification</h2>
          <ul className="list-disc list-inside text-lg space-y-3 pl-4">
            <li><span className="font-semibold">Cancellation Window:</span> Orders can be cancelled or modified within <strong className="text-secondary">3 hours</strong> of order confirmation.</li>
            <li>
              <span className="font-semibold">Post-Window Cancellation:</span> If an order is cancelled after the 3-hour window, the delivery charge will be deducted from any advance payment, and the remaining amount will be refunded.
            </li>
            <li>
              <span className="font-semibold">Post-Window Modification:</span> If an order is modified after the 3-hour window, the customer will be required to pay the delivery charge again.
            </li>
          </ul>
        </section>

        <section className="mb-8 animate-fade-in-delay-7">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">6. Image Representation</h2>
          <p className="text-lg leading-relaxed">
            All product images on Dhakaia Jamdani&apos;s website are taken with a mobile phone camera and published without editing. These images are the true representation of the products.
          </p>
        </section>

        <section className="mb-8 animate-fade-in-delay-8">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">7. Advance Payment Refund</h2>
          <p className="text-lg leading-relaxed">
            If a customer has made an advance payment but subsequently does not accept the product (due to a change of mind, not receiving the product, or any other reason), the advance payment will be refunded within <strong className="text-secondary">90 days</strong>.
          </p>
        </section>

        <section className="mb-8 animate-fade-in-delay-9">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">8. Contact Us (Wholesale Store)</h2>
          <p className="text-lg leading-relaxed pl-4">
            <span className="font-semibold">Jatrabari:</span> Bibir Bagicha, Road/Gate No-3, Behind Ibn Sina Diagnostic Center Building, 79/1/I, 2nd Floor, Dhaka-1204.
          </p>
        </section>

        <section className="animate-fade-in-delay-10">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">9. Contact Us (Retail Stores)</h2>
          <ul className="list-disc list-inside text-lg space-y-3 pl-4">
            <li>
              <span className="font-semibold">New Market:</span> Noor Mansion Shopping Center, Shop No-12, 3rd Floor, Opposite Dhaka New Market or adjacent to Gawsia Market.
            </li>
            <li>
              <span className="font-semibold">Chattogram:</span> Amin Center, Shop No-35, 2nd Floor, Lalkhan Bazar, Ispahani Mor.
            </li>
          </ul>
          <p className="text-lg leading-relaxed mt-4">
            If you have any questions or complaints, please do not hesitate to contact us. We are always happy to assist you.
          </p>
          <ul className="list-disc list-inside text-lg space-y-2 pl-4 mt-2">
            <li>
              <span className="font-semibold">Contact (WhatsApp):</span>{' '}
              <a href="tel:+8801711461083" className="text-accent hover:underline">01711461083</a>
            </li>
            <li>
              <span className="font-semibold">Email:</span>{' '}
              <a href="mailto:admin@dhakaiaajamdani.com" className="text-accent hover:underline">admin@dhakaiaajamdani.com</a>
            </li>
          </ul>
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
        .animate-fade-in-delay-9 {
          animation: fadeIn 1s ease-out 1.8s forwards;
          opacity: 0;
        }
        .animate-fade-in-delay-10 {
          animation: fadeIn 1s ease-out 2s forwards;
          opacity: 0;
        }
        .animate-slide-up {
          animation: slideUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TermsAndServicesPage;
