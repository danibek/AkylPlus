"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, Upload } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface ImageFormProps {
  initialData: Course
  courseId: string;
};

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const ImageForm = ({
  initialData,
  courseId
}: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Курс жаңартылды");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Бірдеңе дұрыс болмады");
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 dark:bg-gray-800">
      <div className="font-medium flex items-center justify-between">
      Курс суреті
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Болдырмау</>
          )}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Суретті қосыңыз
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Суретті өзгерту
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
            />
          </div>
        )
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
          16:9 арақатынасы ұсынылады
          </div>
        </div>
      )}
    </div>
  )
}