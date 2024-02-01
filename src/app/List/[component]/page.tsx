"use client"

import { supabase } from '@/migration/db';
import { Pccompoents} from '@/lib/interface';

import React, {useEffect, useState} from 'react';
import { useParams,useRouter } from 'next/navigation';

export default function Page() {
    const [data, setData] = useState<Pccompoents[]>();
    const router = useRouter()
    const params = useParams()

    useEffect(() => {
      const fecthData = async()=>{
        const { data, error } = await supabase.from('components').select('*').eq('approved',true);
        if (error) {
          console.error('Error fetching data:', error);
          return;
        }
        const filteredData = data?.filter(item => item.type === params.component);
        setData(filteredData)
      }
      fecthData()

    },[params.component]);
    
    const HandleClick = (item:Pccompoents) => {
      const itemStored = localStorage.getItem('clickedItems');
      let clickedItems: Pccompoents[] = [];

      if (itemStored) {
            clickedItems = JSON.parse(itemStored);
          }   

      clickedItems = clickedItems.filter(clickedItem => clickedItem.type !== item.type);
      clickedItems.push(item);
      localStorage.setItem('clickedItems', JSON.stringify(clickedItems));
        
    router.push('/')
  }

    return (
    <div>


{data?.map((item, index) => (
        <div key={index} className="cursor-pointer p-4 bg-gray-600 rounded hover:bg-slate-500 transition duration-500 ease-in-out mb-4">
          <span className="font-semibold text-medium text-white">{item.name}</span>
          <button
            onClick={() => { HandleClick(item) }}
            className="ml-4 p-1 border bg-gray-600 text-black rounded hover:bg-slate-800 hover:text-white transition duration-300"
          >
            Add
          </button>
          <p className=' text-slate-300'>wattage: </p>{item.wattage}
        </div>
      ))}



    </div>
  )
}
