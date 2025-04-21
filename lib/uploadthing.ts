import { createUploadthing } from "uploadthing/next";
import type { OurFileRouter } from "./core";

// Используйте createUploadthing вместо generateComponents
export const { UploadButton, UploadDropzone, Uploader } = 
  createUploadthing<OurFileRouter>();