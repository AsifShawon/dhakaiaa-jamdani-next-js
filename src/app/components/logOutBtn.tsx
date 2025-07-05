'use client';
import React from 'react'
import { supabase } from '../utils/supabase/supabaseClient';
import { redirect } from 'next/navigation';

export default function LogOutBtn() {
    const handleLogOut = async () => {
        const {error} = await supabase.auth.signOut();
        if(error){
            console.log(error);
        }
        else {
            window.location.href = '/login';
        }
    }
    return (
        <div>
            <button onClick={handleLogOut} className='btn btn-accent'>Logout</button>
        </div>
    )
}
