"use client";

import { useState } from "react";
import { Star, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface CourseReviewsProps {
  courseId: string;
  reviews: {
    id: string;
    rating: number;
    comment: string;
    createdAt: Date;
    userId: string;
    user: {
      name: string;
      imageUrl: string | null;
    };
  }[];
  hasPurchased: boolean;
  userId: string;
}

export const CourseReviews = ({
  courseId,
  reviews,
  hasPurchased,
  userId,
}: CourseReviewsProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingReview, setEditingReview] = useState<{
    id: string;
    rating: number;
    comment: string;
  } | null>(null);
  const router = useRouter();

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/courses/${courseId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          comment,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Пікір жіберу қатесі");
      }

      toast.success("Пікір қосылды");
      router.refresh();
      setRating(0);
      setComment("");
    } catch (error: unknown) {
      console.error("Error submitting review:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Бірдеңе дұрыс болмады";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onEdit = async () => {
    if (!editingReview) return;

    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/courses/${courseId}/reviews`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewId: editingReview.id,
          rating: editingReview.rating,
          comment: editingReview.comment,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Шолуды жаңарту қатесі");
      }

      toast.success("Шолу сәтті жаңартылды");
      router.refresh();
      setEditingReview(null);
    } catch (error: unknown) {
      console.error("Error updating review:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Бірдеңе дұрыс болмады";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onDelete = async (reviewId: string) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(
        `/api/courses/${courseId}/reviews?reviewId=${reviewId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Ошибка при удалении отзыва");
      }

      toast.success("Отзыв успешно удален");
      router.refresh();
    } catch (error: unknown) {
      console.error("Error deleting review:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Что-то пошло не так";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length ||
    0;

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">Пікірлер</h2>
        <div className="flex items-center">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          <span className="ml-1 text-lg font-semibold">
            {averageRating.toFixed(1)}
          </span>
        </div>
      </div>

      {hasPurchased && (
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Пікір қалдыру</h3>
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-6 w-6 ${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <Textarea
            placeholder="Пікіріңізді жазыңыз..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mb-4"
          />
          <Button
            onClick={onSubmit}
            disabled={isSubmitting || !rating || !comment}
            className="bg-yellow-500 hover:bg-yellow-600"
          >
            Жіберу
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-gray-50 p-4 rounded-lg shadow-lg ">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{review.user.name}</span>
              </div>
              {review.userId === userId && (
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setEditingReview({
                            id: review.id,
                            rating: review.rating,
                            comment: review.comment,
                          })
                        }
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Пікірді өзгерту</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() =>
                                setEditingReview((prev) =>
                                  prev ? { ...prev, rating: star } : null
                                )
                              }
                              className="focus:outline-none"
                            >
                              <Star
                                className={`h-6 w-6 ${
                                  star <= (editingReview?.rating || 0)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                        <Textarea
                          value={editingReview?.comment || ""}
                          onChange={(e) =>
                            setEditingReview((prev) =>
                              prev ? { ...prev, comment: e.target.value } : null
                            )
                          }
                        />
                        <Button
                          onClick={onEdit}
                          disabled={isSubmitting}
                          className="w-full bg-yellow-500 hover:bg-yellow-600"
                        >
                          Сақтау
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Пікірді жою керек пе?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Бұл әрекетті қайтару мүмкін емес.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Қайтару</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(review.id)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Өшіру
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
            <p className="text-gray-600">{review.comment}</p>
            <p className="text-sm text-gray-400 mt-2">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
