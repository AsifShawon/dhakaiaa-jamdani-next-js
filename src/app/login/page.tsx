"use client";
import Link from 'next/link';
import React, { useState } from 'react'
import { login } from './action';

const Page = () => {
  return (
    <div className='card mt-20 h-[500px] flex justify-center items-center'>
      <div>
        <h1 className='text-3xl font-bold text-center'>Login</h1>
        <form>
          <div className='mt-5'>
            <input name='email' type='text' placeholder='Username' className='w-full p-2 border border-gray-300 rounded-md' />
          </div>
          <div className='mt-5'>
            <input name='password' type='password' placeholder='Password' className='w-full p-2 border border-gray-300 rounded-md' />
          </div>
          <div className='mt-5'>
            <button formAction={login} className='w-full bg-blue-500 text-white p-2 rounded-md'>Login</button>
          </div>
          <p className='mt-5'>
            Don&apos;t have an account?{' '}
            <Link href='/Signup' className='text-blue-500'>
              Sign up
            </Link>
          </p>
        </form>

      </div>
    </div>
  )
}

export default Page
