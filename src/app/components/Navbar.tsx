import React from 'react'
import { Navbar, NavbarContent, NavbarItem,NavbarBrand } from '../next-ui/Next-ui'
import Link from 'next/link'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import SingOut from './LogoutButton'

export default async function Navigation() {
  const supabase = createServerComponentClient({cookies})
  const {data} = await supabase.auth.getSession()
  
  return (
    <Navbar >
        <NavbarBrand>
            <Link href="/" className="font-bold text-slate-800 px-4 py-2 rounded">Home</Link>
        </NavbarBrand>
          <NavbarContent className="gap-4 "   justify="center" >
            {data?.session?.user ? (
            <div className=' flex gap-4'>
              <SingOut/>
              <NavbarItem className=' font-bold text-white'>
              {data.session.user.email}
              </NavbarItem>
            </div>
          ) : (
            <div className=' flex gap-4 sm:flex'>
                <Link href="/login" className="font-bold text-white px-4 py-2 rounded">Login</Link>
                <Link href="/Signup" className="font-bold text-white px-4 py-2 rounded">Signup</Link>
            </div>
          )}
            </NavbarContent>
            <NavbarContent justify="end">
            <Link href="/FormSubmit" className="font-bold text-slate-800 px-4 py-2 rounded">Form Submission</Link>
            </NavbarContent>
    </Navbar>
  )
}
