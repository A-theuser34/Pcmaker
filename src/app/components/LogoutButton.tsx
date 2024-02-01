"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

export default function SingOut() {
    const router = useRouter()

    const handleLogout = async()=>{
        const supabase = createClientComponentClient()
        const {error} = await supabase.auth.signOut()

        if(!error){
            router.push('/')
            router.refresh()
        }
        if(error){
            console.log(error)
        }
    }

  return (
    <div className=" font-bold text-white">
      <button onClick={handleLogout}>Logout</button>
      </div>
  )
}
