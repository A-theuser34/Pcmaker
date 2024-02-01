"use client"

import React, { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import AuthForm from '../AuthForm';
import { useRouter } from 'next/navigation';

export default function Page() {

  const router = useRouter()
  const [error, setError] = useState('')


  const handleSignIn = async(e:any,email:any,password:any)=>{
    e.preventDefault()
    setError('')

    const supabase = createClientComponentClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      setError(error.message)
    }
    if (!error) {
      router.push('/')
      router.refresh()
    } 
  }
  return (
    <main className="flex flex-col items-center justify-center h-screen">
 <div className=" bg-gray-300 p-10 rounded shadow-md w-full md:w-1/3">
   <h1 className="text-2xl font-bold mb-4 text-center">Log in</h1>
   <AuthForm handleSignIn={handleSignIn} className="bg-purple-200" />
   {error && <div className="error">{error}</div>}
 </div>
</main>

  );
}
