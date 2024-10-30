'use client'

import { uploadToS3 } from "@/app/api/profile/uploadimge"
import { ChangeEvent } from "react"

export  default  function  UploadButton({
    onUplodeComplete
}:{
    onUplodeComplete:(url:string)=>void,
}){
    async function upload(ev:ChangeEvent<HTMLInputElement>){

        const target = ev.target as HTMLInputElement
        if(target.files?.length){
           const file= target.files[0]
           const formData=  new FormData
           formData.set('file',file)
            const result= await uploadToS3(formData)
            onUplodeComplete( result.url as string)

        }

    }
    return(
        <>
        <label className="mt-4 block">
          {/* Border added around the span */}
          <span className="block px-4 py-2 border-2 border-black rounded-xl w-48">Upload Profile Image</span>
          <input className="hidden" type="file" onChange={ev => upload(ev)} />
        </label>

        </>

    )

}