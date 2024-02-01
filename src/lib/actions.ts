'use server'

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"


export async function DeleteData(id:number){
    const supabase = createServerActionClient({cookies})
    
    const { error } = await supabase.from('components').delete().match({id});
    revalidatePath('/dashboard')
    if(error){
        return("couldnt delete data")
    }
}

export async function UptadeData(id:number){

    const supabase = createServerActionClient({cookies})

    const { error } = await supabase.from('components').update({"approved":true}).eq("id",id)
    revalidatePath('/dashboard')
    if(error){
        return("couldnt delete data")
    }
}

export async function handleFormSubmit(datas:FormData){
    "use server"
    const name = datas.get("name")
    const brand = datas.get("brand")
    const type = datas.get("type") 
    const compatability = datas.get("compatibility") as string
    const supabase = createServerActionClient({cookies})
    const {data:{user}} = await supabase.auth.getUser()
    const approved = false

    const {error} = await supabase.from('components').insert(
        {name,brand,type,"compatability":[compatability],"user_id":user?.id,approved}       
    )
    if(!error){
        redirect('/thank-you')
    }
}