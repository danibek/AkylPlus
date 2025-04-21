"use client";

import * as z from "zod";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
};

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  // const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success("Бөлім жаңартылды");
      toggleEdit();
      //router.refresh();
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
      const url = `${baseUrl}/teacher/courses/${courseId}/chapters/${chapterId}`;
      window.location.assign(url);

    } catch {
      toast.error("Бірдеңе дұрыс болмады");
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4  dark:bg-gray-800 dark:text-slate-300">
      <div className="font-medium flex items-center justify-between">
      Бейне тарауы
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Болдырмау</>
          )}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Бейне қосу
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Бейнені өңдеу
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md  dark:bg-gray-800 dark:text-slate-300">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer
              playbackId={initialData?.muxData?.playbackId || ""}
            /> 
          </div>
        )
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
          Осы бөлімнің бейнесін жүктеу
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Бейне өңдеуге бірнеше минут кетуі мүмкін. Бейне көрінбесе, бетті жаңартыңыз.
        </div>
      )}
    </div>
  )
}