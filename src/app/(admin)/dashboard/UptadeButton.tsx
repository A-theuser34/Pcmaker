"use client"

import { UptadeData } from "@/lib/actions"
import { useFormStatus } from "react-dom"


export default function UptadeButton({id}:{id:number}) {

    const { pending } = useFormStatus()

  return (
    <div>
        <button className=" text-white" aria-disabled={pending} onClick={async()=> await UptadeData(id)}>Uptade</button>
    </div>
  )
}

