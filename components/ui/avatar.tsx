import * as React from "react";
import { Avatar as AvatarPrimitive, AvatarFallback as PrimitiveFallback, AvatarImage as PrimitiveImage } from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive ref={ref} className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)} {...props} />
));
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof PrimitiveImage>,
  React.ComponentPropsWithoutRef<typeof PrimitiveImage>
>(({ className, ...props }, ref) => (
  <PrimitiveImage ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} />
));
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof PrimitiveFallback>,
  React.ComponentPropsWithoutRef<typeof PrimitiveFallback>
>(({ className, ...props }, ref) => (
  <PrimitiveFallback ref={ref} className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)} {...props} />
));
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
