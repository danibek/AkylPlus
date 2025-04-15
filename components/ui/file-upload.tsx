"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                if (res && res.length > 0) {
                    onChange(res[0].url);
                } else {
                    toast.error("Не удалось загрузить файл.");
                }
            }}
            onUploadError={(error: Error) => {
                toast.error(`Ошибка загрузки: ${error.message}`);
            }}
        />
    );
};
