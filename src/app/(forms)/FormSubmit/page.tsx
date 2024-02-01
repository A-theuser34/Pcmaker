import React from "react";
import ButtonForm from "./button";
import { handleFormSubmit } from "@/lib/actions";

export default function Page() {
 return (
   <div className="flex justify-center items-center h-screen">
     <div className="p-8 rounded-lg shadow-lg bg-slate-300 bg-opacity-20">
       <form action={handleFormSubmit} className="flex flex-col gap-6 items-center">
         <input
           name="name"
           placeholder="Name of the component"
           className="rounded-full py-2 px-4 border-2 border-gray-300 text-black focus:outline-none focus:border-opacity-70 w-72"
           required
         />
         <input
           name="brand"
           placeholder="Brand"
           className="rounded-full py-2 px-4 border-2 border-gray-300 text-black focus:outline-none focus:border-opacity-70 w-72"
           required
         />
         <input
           name="type"
           placeholder="Type (CPU, GPU, etc.)"
           className="rounded-full py-2 px-4 border-2 border-gray-300 text-black focus:outline-none focus:border-opacity-70 w-72"
           required
         />
         <input
           name="compatibility"
           placeholder="Compatibility (e.g., AM4, ATX, DDR4)"
           className="rounded-full py-2 px-4 border-2 border-gray-300 text-black focus:outline-none focus:border-opacity-70 w-72"
           required
         />
         <div className="flex justify-center">
           <div>
             <ButtonForm/>
           </div>
         </div>
       </form>
     </div>
   </div>
 );
}
