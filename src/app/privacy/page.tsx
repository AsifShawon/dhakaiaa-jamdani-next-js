// src/app/privacy/page.tsx
"use client";
import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content font-inter">
      {/* Hero Section */}
      <section className="relative h-64 bg-cover bg-center flex items-center justify-center text-center rounded-b-lg shadow-lg animate-fade-in" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549449339-e4a739c9b5a4?q=80&w=2832&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-black opacity-50 rounded-b-lg"></div>
        <div className="relative z-10 p-6">
          <h1 className="text-6xl font-bold text-white mb-4 animate-slide-up">
            Privacy Policy <br />
            {/* <span className="text-3xl mt-2">গোপনীয়তা নীতি</span> */}
          </h1>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-8 animate-fade-in-delay-1">
          <p className="text-lg leading-relaxed mb-4">
            At Dhakaia Jamdani, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information when you use our online store.
          </p>
          <p className="text-lg leading-relaxed">
            ঢাকাইয়া জামদানিতে, আমরা আপনার গোপনীয়তা রক্ষা করতে প্রতিশ্রুতিবদ্ধ। আপনি যখন আমাদের অনলাইন স্টোর ব্যবহার করেন, তখন আমরা কীভাবে আপনার ব্যক্তিগত তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষিত করি, এই নীতিমালায় তার রূপরেখা দেওয়া হয়েছে।
          </p>
        </section>

        <section className="mb-8 animate-fade-in-delay-2">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">Information We Collect / আমরা যে তথ্য সংগ্রহ করি</h2>
          <p className="text-lg leading-relaxed my-4">
            We collect information necessary to process your orders and provide you with the best possible service. This may include:
            <br />
            আপনার অর্ডার প্রক্রিয়া করতে এবং আপনাকে সর্বোত্তম পরিষেবা প্রদান করার জন্য আমরা প্রয়োজনীয় তথ্য সংগ্রহ করি। এর মধ্যে অন্তর্ভুক্ত থাকতে পারে:
          </p>
          <ul className="list-disc list-inside text-lg space-y-4 pl-4">
            <li>
                <span className="font-semibold">Personal Identification Information:</span> Name, email address, phone number, and shipping address.
                <br />
                <span className="font-semibold">ব্যক্তিগত শনাক্তকরণ তথ্য:</span> নাম, ইমেল ঠিকানা, ফোন নম্বর এবং শিপিং ঠিকানা।
            </li>
            <li>
                <span className="font-semibold">Transaction Data:</span> Details of products purchased, order total, and payment method (though we do not store full payment card details).
                <br />
                <span className="font-semibold">লেনদেনের ডেটা:</span> ক্রয়কৃত পণ্যের বিবরণ, অর্ডারের মোট পরিমাণ এবং অর্থপ্রদানের পদ্ধতি (যদিও আমরা সম্পূর্ণ পেমেন্ট কার্ডের বিবরণ সংরক্ষণ করি না)।
            </li>
            <li>
                <span className="font-semibold">Communication Data:</span> Information you provide when contacting our customer service.
                <br />
                <span className="font-semibold">যোগাযোগের ডেটা:</span> আমাদের গ্রাহক পরিষেবার সাথে যোগাযোগ করার সময় আপনার সরবরাহ করা তথ্য।
            </li>
          </ul>
        </section>

        <section className="mb-8 animate-fade-in-delay-3">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">How We Use Your Information / আমরা আপনার তথ্য কীভাবে ব্যবহার করি</h2>
          <p className="text-lg leading-relaxed my-4">
            Your information is used for the following purposes:
            <br />
            আপনার তথ্য নিম্নলিখিত উদ্দেশ্যে ব্যবহার করা হয়:
          </p>
          <ul className="list-disc list-inside text-lg space-y-4 pl-4">
            <li>
                <span className="font-semibold">Order Fulfillment:</span> To process your purchases, deliver products, and send order confirmations.
                <br />
                <span className="font-semibold">অর্ডার পূরণ:</span> আপনার ক্রয় প্রক্রিয়া করতে, পণ্য সরবরাহ করতে এবং অর্ডার নিশ্চিতকরণ বার্তা পাঠাতে।
            </li>
            <li>
                <span className="font-semibold">Customer Service:</span> To respond to your inquiries, complaints, and support requests.
                <br />
                <span className="font-semibold">গ্রাহক পরিষেবা:</span> আপনার জিজ্ঞাসা, অভিযোগ এবং সহায়তার অনুরোধে সাড়া দিতে।
            </li>
            <li>
                <span className="font-semibold">Communication:</span> To provide updates on your order status and, with your consent, send promotional offers.
                <br />
                <span className="font-semibold">যোগাযোগ:</span> আপনার অর্ডারের অবস্থা সম্পর্কে আপডেট প্রদান করতে এবং আপনার সম্মতিতে, প্রচারমূলক অফার পাঠাতে।
            </li>
            <li>
                <span className="font-semibold">Service Improvement:</span> To analyze website usage and improve our products and services.
                <br />
                <span className="font-semibold">পরিষেবার উন্নতি:</span> ওয়েবসাইটের ব্যবহার বিশ্লেষণ করতে এবং আমাদের পণ্য ও পরিষেবা উন্নত করতে।
            </li>
          </ul>
        </section>

        <section className="mb-8 animate-fade-in-delay-4">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">Data Protection / ডেটা সুরক্ষা</h2>
          <p className="text-lg leading-relaxed">
            We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.
            <br /><br />
            আপনি যখন অর্ডার দেন বা আপনার ব্যক্তিগত তথ্য প্রবেশ, জমা বা অ্যাক্সেস করেন, তখন আপনার ব্যক্তিগত তথ্যের সুরক্ষা বজায় রাখার জন্য আমরা বিভিন্ন ধরনের নিরাপত্তা ব্যবস্থা বাস্তবায়ন করি।
          </p>
        </section>

        <section className="mb-8 animate-fade-in-delay-5">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">Sharing Your Information / আপনার তথ্য শেয়ার করা</h2>
          <p className="text-lg leading-relaxed">
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or serving you, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others&apos; rights, property, or safety.
            <br /><br />
            আমরা আপনার ব্যক্তিগত শনাক্তযোগ্য তথ্য বাইরের পক্ষের কাছে বিক্রি, বাণিজ্য বা অন্য কোনোভাবে হস্তান্তর করি না। এর মধ্যে বিশ্বস্ত তৃতীয় পক্ষ অন্তর্ভুক্ত নয় যারা আমাদের ওয়েবসাইট পরিচালনা, আমাদের ব্যবসা পরিচালনা বা আপনাকে পরিষেবা প্রদানে সহায়তা করে, যতক্ষণ পর্যন্ত সেই পক্ষগুলো এই তথ্য গোপন রাখতে সম্মত থাকে। আমরা আপনার তথ্য তখনই প্রকাশ করতে পারি যখন আমরা বিশ্বাস করি যে আইন মেনে চলার জন্য, আমাদের সাইটের নীতি প্রয়োগ করার জন্য, বা আমাদের বা অন্যদের অধিকার, সম্পত্তি বা সুরক্ষা রক্ষা করার জন্য এটি উপযুক্ত।
          </p>
        </section>

        <section className="mb-8 animate-fade-in-delay-6">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">Your Consent / আপনার সম্মতি</h2>
          <p className="text-lg leading-relaxed">
            By using our site, you consent to our privacy policy.
            <br /><br />
            আমাদের সাইট ব্যবহার করার মাধ্যমে, আপনি আমাদের গোপনীয়তা নীতিতে সম্মতি দিচ্ছেন।
          </p>
        </section>

        <section className="mb-8 animate-fade-in-delay-7">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">Changes to our Privacy Policy / আমাদের গোপনীয়তা নীতিতে পরিবর্তন</h2>
          <p className="text-lg leading-relaxed">
            If we decide to change our privacy policy, we will post those changes on this page.
            <br /><br />
            আমরা যদি আমাদের গোপনীয়তা নীতি পরিবর্তন করার সিদ্ধান্ত নিই, তাহলে আমরা এই পৃষ্ঠায় সেই পরিবর্তনগুলো পোস্ট করব।
          </p>
        </section>
        
        <section className="animate-fade-in-delay-7">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">Contact Us / আমাদের সাথে যোগাযোগ</h2>
          <p className="text-lg leading-relaxed mb-4">
            If you have any questions or concerns about our privacy policy, please do not hesitate to contact us.
             <br />
            আমাদের গোপনীয়তা নীতি সম্পর্কে আপনার কোন প্রশ্ন বা উদ্বেগ থাকলে, আমাদের সাথে যোগাযোগ করতে দ্বিধা করবেন না।
          </p>
           <ul className="list-none text-lg space-y-2 pl-4">
             <li><span className="font-semibold">WhatsApp:</span> 01711461083</li>
             <li><span className="font-semibold">Email:</span> dhakaiajamdani@gmail.com</li>
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
        .animate-slide-up {
          animation: slideUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicyPage;