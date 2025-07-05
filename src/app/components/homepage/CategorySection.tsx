import Image from "next/image";
import React from "react";

const CategorySection = () => {
  return (
    <section className="container pb-10 mx-auto rounded-lg pl-5 pr-5">
      <h1 className="text-4xl font-bold text-center p-5 text-red-500">
        Check Out the Categories
      </h1>
      <div className="flex flex-col md:flex-row md:justify-center md:gap-4">
        <div className="card bg-base-100 image-full w-full md:w-[650px] md:h-[600px] h-[290px] shadow-2xl mb-4 md:mb-0">
          <figure>
            <Image
              src="/images/sharee_2.jpg"
              alt="Shoes"
              style={{ objectFit: 'cover' }}
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="card-body flex flex-col justify-between">
            <h2 className="card-title md:text-8xl text-4xl">Sharee</h2>
            <p className="md:pl-10 md:pt-16 md:text-lg">
              A traditional and elegant garment, the Bangladeshi sharee is
              cherished for its intricate designs and cultural significance.
              <span className="sm:block hidden">
                Popular styles include Jamdani, Dhakai, and Tangail, each
                reflecting the rich heritage and craftsmanship of the region.
              </span>
            </p>
            <div className="md:pr-10 flex justify-end">
              <button className="btn btn-error md:w-[200px] bg-red-400 hover:bg-red-700 border-red-400">
                Check Out Now
                <Image
                src="/images/up-arrow.png"
                width={50}
                height={10}
                alt="arrow"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:gap-4 gap-8">
          <div className="card bg-base-100 image-full w-full md:w-[650px] h-[290px] shadow-xl">
            <figure>
              <Image
                src="/images/panjabi_2.jpg"
                alt="Shoes"
                style={{ objectFit: 'cover' }}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body flex flex-col justify-between">
              <h2 className="card-title md:text-6xl text-4xl">Panjabi</h2>
              <p>
                The Panjabi is a traditional men&apos;s garment in Bangladesh,
                worn during festivals and formal occasions. It&apos;s a long,
                loose-fitting shirt often adorned with intricate embroidery.
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-error md:w-[200px] bg-red-400 hover:bg-red-700 border-red-400">
                  Check Out Now
                  <Image
                src="/images/up-arrow.png"
                width={50}
                height={10}
                alt="arrow"
                />
                </button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 image-full w-full md:w-[650px] h-[290px] shadow-xl">
            <figure>
              <Image
                src="/images/threepcs_2.jpg"
                alt="Shoes"
                style={{ objectFit: 'cover' }}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body flex flex-col justify-between">
              <h2 className="card-title md:text-6xl text-4xl">Three Pieces</h2>
              <p>
                The Three-Piece is a popular women&apos;s outfit in Bangladesh,
                consisting of a kurta (top), salwar (pants), and a matching
                dupatta (scarf).
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-error md:w-[200px] bg-red-400 hover:bg-red-700 border-red-400">
                  Check Out Now
                  <Image
                src="/images/up-arrow.png"
                width={50}
                height={10}
                alt="arrow"
                />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
