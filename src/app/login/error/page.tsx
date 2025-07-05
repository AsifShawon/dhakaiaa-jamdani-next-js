"use client";

import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="card mt-20 h-[500px] flex justify-center items-center">
      <div>
        <h1 className="text-3xl font-bold text-center">Error</h1>
        <p>There was an error processing your request</p>
        <Link href="/login">
          <button className="w-full bg-gray-500 text-white p-2 rounded-md pt mt-5">
            Try again
          </button>
        </Link>
      </div>
    </div>
  );
}
