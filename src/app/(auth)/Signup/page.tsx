"use client"

import React, { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import AuthForm from '../AuthForm'
import { useRouter } from 'next/navigation';

export default function Page() {

  const router = useRouter()
  const [error, setError] = useState('')


  const handleSignIn = async(e:any,email:any,password:any)=>{
    e.preventDefault()
    setError('')

    const supabase = createClientComponentClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options:{
        emailRedirectTo:`${location.origin}/api/auth/callback`
      }
    })
    if (error) {
      setError(error.message)
    }
    if (!error) {
      router.push('/verify')
    } 
  }
  return (
    <main className="flex flex-col items-center justify-center h-screen">
 <div className="bg-gray-300 p-10 rounded shadow-md w-full md:w-1/3">
  
    <h1 className="text-2xl font-bold mb-4 text-center">Sign up</h1>
    <p className=' text-medium font-bold text-center text-black'>🚀 Sign up today to be able to submit forms! 🚀</p>
  
   <AuthForm handleSignIn={handleSignIn} className="bg-purple-200" />
   {error && <div className="error">{error}</div>}
 </div>
</main>
  )
}
