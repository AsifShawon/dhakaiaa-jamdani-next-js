// src/app/size-guide/page.tsx
"use client";
import Image from 'next/image';
import React from 'react';

const SizeGuidePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content font-inter">
      {/* Hero Section */}
      <section className="relative h-64 bg-cover bg-center flex items-center justify-center text-center rounded-b-lg shadow-lg animate-fade-in" style={{ backgroundImage: "url('https://placehold.co/1200x300/6A5ACD/FFFFFF?text=Size+Guide')" }}>
        <div className="absolute inset-0 bg-black opacity-50 rounded-b-lg"></div>
        <div className="relative z-10 p-6">
          <h1 className="text-5xl font-bold text-white mb-4 animate-slide-up">Size Guide</h1>
          <p className="text-xl text-white">Find Your Perfect Fit</p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-8 animate-fade-in-delay-1">
          <p className="text-lg leading-relaxed mb-6">
            To ensure you find the perfect fit for your Dhakaia Jamdani attire, please refer to our size guide below. Measurements are in inches unless otherwise specified.
          </p>
        </section>

        <section className="mb-8 animate-fade-in-delay-2">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">How to Measure</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <ul className="list-disc list-inside text-lg space-y-3 pl-4">
                <li><span className="font-semibold">Bust/Chest:</span> Measure around the fullest part of your bust/chest.</li>
                <li><span className="font-semibold">Waist:</span> Measure around the narrowest part of your waist.</li>
                <li><span className="font-semibold">Hips:</span> Measure around the fullest part of your hips.</li>
                <li><span className="font-semibold">Sleeve Length:</span> Measure from the shoulder seam to the desired sleeve length.</li>
                <li><span className="font-semibold">Shoulder Width:</span> Measure from one shoulder point to the other.</li>
                <li><span className="font-semibold">Kurta/Shirt Length:</span> Measure from the highest point of the shoulder down to the desired hemline.</li>
                <li><span className="font-semibold">Pant/Salwar Length:</span> Measure from your waist to your ankle or desired length.</li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/images/panjabi_1.webp"
                alt="Diagram showing how to measure clothes"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-md object-cover"
              />
              <p className="text-sm text-gray-600 text-center mt-2">Accurate measurements ensure the best fit.</p>
            </div>
          </div>
        </section>

        <section className="mb-8 animate-fade-in-delay-3">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">Women&apos;s Apparel (Sharee, Three Piece)</h2>
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="table w-full bg-base-200">
              <thead>
                <tr className="bg-primary text-primary-content">
                  <th className="rounded-tl-lg">Size</th>
                  <th>Bust (in)</th>
                  <th>Waist (in)</th>
                  <th className="rounded-tr-lg">Hips (in)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold">S</td>
                  <td>34-36</td>
                  <td>26-28</td>
                  <td>36-38</td>
                </tr>
                <tr>
                  <td className="font-semibold">M</td>
                  <td>38-40</td>
                  <td>30-32</td>
                  <td>40-42</td>
                </tr>
                <tr>
                  <td className="font-semibold">L</td>
                  <td>42-44</td>
                  <td>34-36</td>
                  <td>44-46</td>
                </tr>
                <tr>
                  <td className="font-semibold">XL</td>
                  <td>46-48</td>
                  <td>38-40</td>
                  <td>48-50</td>
                </tr>
                <tr>
                  <td className="font-semibold rounded-bl-lg">XXL</td>
                  <td>50-52</td>
                  <td>42-44</td>
                  <td className="rounded-br-lg">52-54</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            <span className="font-semibold">Note:</span> Jamdani Sharees are generally one-size-fits-all, but specific dimensions (length and width) may be available on individual product pages.
          </p>
        </section>

        <section className="mb-8 animate-fade-in-delay-4">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">Men&apos;s Apparel (Panjabi)</h2>
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="table w-full bg-base-200">
              <thead>
                <tr className="bg-primary text-primary-content">
                  <th className="rounded-tl-lg">Size</th>
                  <th>Chest (in)</th>
                  <th>Shoulder (in)</th>
                  <th className="rounded-tr-lg">Length (in)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold">S</td>
                  <td>38</td>
                  <td>17</td>
                  <td>40</td>
                </tr>
                <tr>
                  <td className="font-semibold">M</td>
                  <td>40</td>
                  <td>18</td>
                  <td>42</td>
                </tr>
                <tr>
                  <td className="font-semibold">L</td>
                  <td>42</td>
                  <td>19</td>
                  <td>44</td>
                </tr>
                <tr>
                  <td className="font-semibold">XL</td>
                  <td>44</td>
                  <td>20</td>
                  <td>46</td>
                </tr>
                <tr>
                  <td className="font-semibold rounded-bl-lg">XXL</td>
                  <td>46</td>
                  <td>21</td>
                  <td className="rounded-br-lg">48</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="animate-fade-in-delay-5">
          <h2 className="text-3xl font-semibold text-primary mb-4 border-b border-primary pb-2">Important Notes</h2>
          <ul className="list-disc list-inside text-lg space-y-3 pl-4">
            <li><span className="font-semibold">Measurement Accuracy:</span> For best results, take your measurements carefully or have someone assist you.</li>
            <li><span className="font-semibold">Fit Preference:</span> Consider your personal fit preference (e.g., loose, regular, slim) when choosing a size.</li>
            <li><span className="font-semibold">Material:</span> The fabric of each item might have varying degrees of stretch or drape, which could affect the final fit.</li>
            <li><span className="font-semibold">Product-Specific Details:</span> Always check the individual product page for any specific sizing information or recommendations, as certain designs may vary.</li>
          </ul>
          <p className="text-lg leading-relaxed mt-6">
            If you have any further questions about sizing, please don&apos;t hesitate to contact our customer service team. We are here to help you find your perfect traditional outfit.
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
        .animate-slide-up {
          animation: slideUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SizeGuidePage;
