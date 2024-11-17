'use client'

import { uploadToS3 } from "@/app/api/profile/uploadimge"
import { ChangeEvent } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro} from '@fortawesome/free-solid-svg-icons';

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
          <span className="">  <FontAwesomeIcon icon={faCameraRetro} className="text-xl" /></span>
          <input className="hidden" type="file" onChange={ev => upload(ev)} />
        </label>

        </>

    )

}