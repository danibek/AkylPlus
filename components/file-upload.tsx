"use client"

import type { OurFileRouter } from "@/app/api/uploadthing/core"
import { UploadDropzone } from "@uploadthing/react"
import toast from "react-hot-toast"

interface FileUploadProps {
  onChange: (url?: string, originalFilename?: string) => void
  endpoint: keyof OurFileRouter
};

interface UploadResponse {
  url: string
  name: string
}

export const FileUpload = ({
  onChange,
  endpoint
}: FileUploadProps) => {

  return (
    <UploadDropzone<OurFileRouter, keyof OurFileRouter>
      endpoint={endpoint}
      onClientUploadComplete={(res: UploadResponse[]) => {
        console.log("onClientUploadComplete res:", res)
        if (res && res.length > 0) {
          onChange(res[0].url, res[0].name)
        }
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`)
      }}
    />
  )
}
