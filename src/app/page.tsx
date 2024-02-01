"use client"
import { Pccompoents } from '@/lib/interface';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'


export default function Page() {
  const [Clicked,setClicked] = useState<Pccompoents[]>([]);
  const order = ['CPU', 'CPU-Cooler', 'Motherboard', 'RAM', 'Memory', 'GPU', 'Power-Supply',"Case"];  
  const [compatable,setitemCompababtle] = useState("")
  const [wattage,setwattage] = useState(0)
  const [wattageCompatable,setWattageCompatable] = useState("")

  useEffect(() => {
    const itemsFromLocalStorage = localStorage.getItem('clickedItems');
    if (itemsFromLocalStorage) {
      ///items selected

    const itemStored = JSON.parse(itemsFromLocalStorage);
    const motherboard = itemStored.find((item:Pccompoents) => item.type === 'Motherboard');
      ///wats
      const totalWattage = itemStored.filter((item:Pccompoents) => item.type !== 'Power-Supply').reduce((total:number, item:Pccompoents) => total + item.wattage, 0);
      setwattage(totalWattage);

      const selectedPSU = itemStored.find((item: Pccompoents) => item.type === 'Power-Supply');
      const requireTypes = ['CPU', 'CPU-Cooler','Memory', 'Motherboard', 'RAM', 'GPU'];
      const allitems = requireTypes.every(type => itemStored.some((item:Pccompoents) => item.type === type))
      
      if(selectedPSU && allitems){
        const totalWattage = itemStored.filter((item:Pccompoents) => item.type !== 'Power-Supply').reduce((total:number, item:Pccompoents) => total + item.wattage, 0)
        if(totalWattage > selectedPSU.wattage){
          setWattageCompatable('you need a beter psu or else...')
        }
      }

////motherobard check
    if (motherboard && itemStored.length > 1) {
    const isCompatible = itemStored.every((item:Pccompoents) => 
    item.compatability && item.compatability.some(option => 
     motherboard.compatability && motherboard.compatability.includes(option))
    );
    if (!isCompatible) {
    setitemCompababtle("Warning: These parts are not compatible.");
    }
    }
    setClicked(itemStored);
    }
   }, []);

   
   

   const clearClickedItem = (itemToRemove: Pccompoents) => {
    
    const updatedClickedItems = Clicked.filter(item => item.id !== itemToRemove.id);
    setClicked(updatedClickedItems);
    localStorage.setItem('clickedItems', JSON.stringify(updatedClickedItems));

    const newTotalWattage = updatedClickedItems.filter((item:Pccompoents) => item.type !== 'Power-Supply').reduce((total:number, item:Pccompoents) => total + item.wattage, 0);

    setwattage(newTotalWattage);
  };

   


   return (
    <div className="flex flex-col gap-3 p-2 w-full max-w-screen-md mx-auto bg-slate-900 rounded">
      <h1 className='text-center text-2xl font-bold text-gray-500'>Build your computer</h1>    
    
    <div >
      {compatable && <p className={`text-white text-lg font-mono`}>{compatable}</p>}
      <p className=' text-white font-mono'>{wattageCompatable}</p>
    </div>

      <h1 className=' text-white font-semibold text-center'>  estimated wattage: {wattage}</h1>
      {order.map((type, index) => (
        <div key={index} className="p-3 rounded shadow-lg hover:shadow-2xl transition duration-500 ease-in-out bg-gray-800">
          <Link href={`List/${type}`} className="text-white block mb-2 text-center font-semibold text-lg">{type}</Link>
          {Clicked?.filter(item => item.type === type)?.map((item, index) => (
            <div key={index} className="p- bg-slate-500 rounded flex flex-col items-center">
              <p className="text-white font-semibold text-lg mb-2">{item.name}</p>
              <button onClick={() => clearClickedItem(item)} className="text-black font-light hover:text-gray-400">Clear</button>
            </div>
          ))}
        </div>
      ))}

      


    </div>






    )
   
 }