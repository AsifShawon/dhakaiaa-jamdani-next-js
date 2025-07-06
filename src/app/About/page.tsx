// src/app/about/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// About Us page component
const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content font-inter">
      {/* Hero Section */}
      <section className="relative h-96 bg-cover bg-center flex items-center justify-center text-center rounded-b-lg shadow-lg" style={{ backgroundImage: "url('/images/dhakiaa-jamdani-cover.webp')" }}>
        <div className="absolute inset-0 bg-black opacity-50 rounded-b-lg"></div>
        <div className="relative z-10 p-6">
          <h1 className="text-5xl font-bold text-white mb-4 animate-pulse pt-36">About Dhakaia Jamdani</h1>
          <p className="text-xl text-white">Preserving Bangladeshi Heritage, One Weave at a Time</p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        {/* Who We Are Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold text-primary mb-6 border-b-2 border-primary pb-2">Who We Are</h2>
          <p className="text-lg leading-relaxed mb-4">
            Dhakaiaa Jamdani Limited (www.dhakaiaajamdani.com.bd) is dedicated to manufacturing and selling exquisite Jamdani Sharees, 3-piece, and 2-piece sets directly to our valued customers. We reach you through our physical showrooms, and our e-commerce and f-commerce platforms. We take immense pride in being Bangladesh&apos;s pioneer in providing on-demand, custom-designed Jamdani Sharees, catering to both local and international clients with unbeatable wholesale prices and uncompromised quality.
          </p>
          <Image
            src="/images/sharee_panjabi.webp"
            alt="Artisan weaving Jamdani"
            width={800}
            height={450}
            className="w-full h-auto rounded-lg shadow-md mt-6 mb-4 object-cover"
          />
          <p className="text-sm text-gray-600 text-center">An artisan meticulously weaving a traditional Jamdani saree.</p>
        </section>

        {/* Our Journey and Reputation Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold text-primary mb-6 border-b-2 border-primary pb-2">Our Journey and Reputation</h2>
          <p className="text-lg leading-relaxed mb-4">
            We have successfully established ourselves as a reputable local brand, earning a strong reputation for offering export-quality Jamdani Sharees at accessible prices. Our journey has seen us participate in significant local events, including the Westin Hotel Fair in 2014, the WVA fair and Dhrik Gallery in 2013, and the Dhaka international trade fair in 2020. Our expertise extends to designing for special occasions like &quot;GAYE HOLUD&quot; and various cultural programs for schools and other organizations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="card bg-base-200 shadow-xl rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
              <div className="card-body items-center text-center">
                <h3 className="text-5xl font-bold text-secondary">1,938,000+</h3>
                <p className="text-lg text-base-content">Facebook Likes</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
              <div className="card-body items-center text-center">
                <h3 className="text-5xl font-bold text-secondary">8+</h3>
                <p className="text-lg text-base-content">Years in Business</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Global Vision Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold text-primary mb-6 border-b-2 border-primary pb-2">Our Global Vision</h2>
          <p className="text-lg leading-relaxed mb-4">
            Bangladesh is globally renowned for its Jamdani Sharee industry, consistently ranking among the top producing countries. We not only produce Jamdani Sharees for third-party labels but also for our own esteemed brand. It&apos;s common to find Bangladeshi Dhakaiaa Jamdani Sharees in stores abroad, particularly in India, though often rebranded. We believe it&apos;s time to directly serve the international market, offering our finest Dhakaiaa Jamdani Sharees and services online at affordable prices, without intermediaries. We are equipped to supply our best quality Jamdani Sharees to customers in the USA, UK, France, Italy, UAE, and many other countries.
          </p>
          <Image
            src="/images/logo.png"
            alt="World map with highlighted countries"
            width={800}
            height={450}
            className="w-full h-auto rounded-lg shadow-md mt-6 mb-4 object-cover hover:scale-105 transition-transform duration-300"
          />
          <p className="text-sm text-gray-600 text-center">Expanding our reach to customers worldwide.</p>
        </section>

        {/* Affordable Quality, Direct to You Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold text-primary mb-6 border-b-2 border-primary pb-2">Affordable Quality, Direct to You</h2>
          <p className="text-lg leading-relaxed mb-4">
            Our ability to offer such competitive pricing stems from our direct manufacturing process. By producing our own Dhakaiaa Jamdani Sharees and operating directly from our store fronts, we significantly reduce overhead costs. We partner with GPO – EMS service as our shipping partner, ensuring that your products are delivered economically, reliably, and swiftly within a few days, regardless of your location.
          </p>
        </section>

        {/* Custom Designs Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold text-primary mb-6 border-b-2 border-primary pb-2">Custom Designs</h2>
          <p className="text-lg leading-relaxed mb-4">
            Should our existing designs not perfectly match your vision, we offer a unique service: for a small additional charge, you can have your own design printed and shipped directly to your doorstep, anywhere in the world.
          </p>
          <Image
            src="/images/sharee_1.webp"
            alt="Sketch of a custom Jamdani design"
            width={800}
            height={450}
            className="w-[400px] h-auto rounded-lg shadow-md mt-6 mb-4 object-cover hover:scale-105 transition-transform duration-300"
          />
          <p className="text-sm text-gray-600 text-center">Bring your unique Jamdani design to life.</p>
        </section>

        {/* Connect With Us Section */}
        <section className="mb-8">
          <h2 className="text-4xl font-semibold text-primary mb-6 border-b-2 border-primary pb-2">Connect With Us</h2>
          <p className="text-lg leading-relaxed mb-4">
            For any questions or inquiries, please do not hesitate to reach out to us:
          </p>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>
              <span className="font-semibold">Email:</span>{' '}
              <a href="mailto:dhakaiaajamdani@gmail.com" className="text-accent hover:underline">dhakaiaajamdani@gmail.com</a>
            </li>
            <li>
              <span className="font-semibold">Phone:</span>{' '}
              <a href="tel:+8801770203804" className="text-accent hover:underline">01770203804</a> /{' '}
              <a href="tel:+8801711461083" className="text-accent hover:underline">01711461083</a>
            </li>
          </ul>
          <p className="text-lg leading-relaxed mt-4">
            Join our community and help us share this awesome project with your family and friends through social media. Let them know they can purchase authentic Dhakaiaa Jamdani Sharees, 3-piece, 2-piece sets, and other half-silk and cotton sharees directly from us at wholesale prices, without compromising on quality.
          </p>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
