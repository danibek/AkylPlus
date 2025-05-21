import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@//lib/auth-actions";
import SignInWithGoogleButton from "./SignInWithGoogleButton";

export function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Кіру</CardTitle>
        <CardDescription>
        Тіркелгіңізге кіру үшін төменде электрондық поштаңызды енгізіңіз
        </CardDescription>
      </CardHeader>
      <CardContent>
      <form action={login}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Электрондық пошта</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="@akylplus.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="*******">Құпия сөз</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Құпия сөзіңізді ұмыттыңыз ба?
                </Link>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <SignInWithGoogleButton />
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
        Есептік жазбаңыз жоқ па?{" "}
          <Link href="/signup" className="underline">
          Тіркелу
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
