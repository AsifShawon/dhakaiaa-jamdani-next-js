"use client";
import Link from 'next/link';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { login } from './action';

// Separate component that uses useSearchParams
const LoginForm = () => {
  const searchParams = useSearchParams();
  const [redirectTo, setRedirectTo] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const redirectToParam = searchParams.get('redirectTo');
    const errorParam = searchParams.get('error');
    
    if (redirectToParam) {
      setRedirectTo(redirectToParam);
    }
    
    if (errorParam) {
      switch (errorParam) {
        case 'unauthorized':
          setError('Please log in to access this page.');
          break;
        case 'access_denied':
          setError('You do not have permission to access that page.');
          break;
        case 'auth_error':
          setError('Authentication error. Please try again.');
          break;
        default:
          setError('An error occurred. Please try again.');
      }
    }
  }, [searchParams]);

  return (
    <div className="w-full max-w-md">
      <h1 className='text-3xl font-bold text-center'>Login</h1>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {redirectTo && (
        <div className="mt-4 p-3 bg-blue-100 border border-blue-300 text-blue-700 rounded-md">
          You will be redirected after login.
        </div>
      )}
      
      <form>
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <div className='mt-5'>
          <input 
            name='email' 
            type='email' 
            placeholder='Email' 
            className='w-full p-2 border border-gray-300 rounded-md' 
            required
          />
        </div>
        <div className='mt-5'>
          <input 
            name='password' 
            type='password' 
            placeholder='Password' 
            className='w-full p-2 border border-gray-300 rounded-md' 
            required
          />
        </div>
        <div className='mt-5'>
          <button 
            formAction={login} 
            className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors'
          >
            Login
          </button>
        </div>
        <p className='mt-5 text-center'>
          Don&apos;t have an account?{' '}
          <Link href='/Signup' className='text-blue-500 hover:underline'>
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

// Loading component for Suspense fallback
const LoginLoading = () => (
  <div className="w-full max-w-md">
    <h1 className='text-3xl font-bold text-center'>Login</h1>
    <div className="mt-4 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
    </div>
  </div>
);

// Main page component with Suspense boundary
const Page = () => {
  return (
    <div className='card mt-20 h-[500px] flex justify-center items-center'>
      <Suspense fallback={<LoginLoading />}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default Page;
