"use client"
import React, { useState } from "react";
import Link from "next/link";
import { signupUser } from "./action";

export default function Signup() {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    try {
      await signupUser({ email, password, firstname, lastname });
      setIsSigningUp(true);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="card mt-20 h-[500px] flex justify-center items-center">
      <div>
        <h1 className="text-3xl font-bold text-center">Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <div className="mt-5">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              onChange={(e) => setFirstname(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mt-5">
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              onChange={(e) => setLastname(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mt-5">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mt-5">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mt-5">
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
              Sign up
            </button>
          </div>
          <p className='mt-5'>
            Already have an account?{' '}
            <Link href='/login' className='text-blue-500'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
