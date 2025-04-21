"use client";

import axios from "axios";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

export const Actions = ({ disabled, courseId, isPublished }: ActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Курс жарияланбады");
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("Курс жарияланды");
        confetti.onOpen();
      }
      router.refresh();
    } catch (error) {
      console.error("[COURSE_PUBLISH]", error);
      toast.error("Бірдеңе дұрыс болмады");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Курс жойылды");
      router.push(`/teacher/courses`);
    } catch (error) {
      console.error("[COURSE_DELETE]", error);
      toast.error("Бірдеңе дұрыс болмады");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Жариялауды тоқтату" : "Жариялау"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
