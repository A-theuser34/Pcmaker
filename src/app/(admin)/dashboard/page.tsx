import React from 'react'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Pccompoents} from '@/lib/interface';
import { supabase } from '@/migration/db';
import Button from './DeleteButton';
import UptadeButton from './UptadeButton';

export default async function page() {

    const Supabase = createServerComponentClient({cookies})
    const {data:{user}} = await Supabase.auth.getUser()

    if(user?.email !== process.env.MY_ADMIT){
        return redirect('/')
      }

       const {data} = await supabase.from('components').select('*').eq("approved",false)
       
    
    return (
    <div>

      {data?.map((peopleData:Pccompoents, index) => {
      return(
      <div className="max-w-xs bg-slate-500 rounded overflow-hidden shadow-lg m-4" key={index}>
        <div className="px-4 py-2">
          <div className="font-bold text-lg mb-1">{peopleData.name}</div>
          <p className="text-white text-sm">Brand: {peopleData.brand}</p>
          <p className="text-white  text-sm">Type: {peopleData.type}</p>
          <p className="text-white  text-sm">Compatibility: {peopleData.compatability}</p>
        </div>
        <div className="flex justify-between px-4 pt-2 pb-2">
          <UptadeButton id={peopleData.id}/>
          <Button id={peopleData.id}/>
        </div>
      </div>
      )
      })}



    </div>
  )
}
