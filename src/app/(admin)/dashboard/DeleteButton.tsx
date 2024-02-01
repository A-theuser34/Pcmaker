"use client"

import { DeleteData } from "@/lib/actions"
import { useFormStatus } from "react-dom"


export default function Button({id}:{id:number}) {

    const { pending } = useFormStatus()

  return (
    <div>
        <button className=" text-white" aria-disabled={pending} onClick={async()=> await DeleteData(id)}>Delete</button>
    </div>
  )
}

