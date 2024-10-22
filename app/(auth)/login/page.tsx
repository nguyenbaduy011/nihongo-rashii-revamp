"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { client } from "@/lib/auth-client";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    await client.signIn.email({
      email,
      password,
      callbackURL: "/",
    });
  };

  const handleGoogle = async () => {
    await client.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    
  };

  return (
    <section className="py-40 px-20 flex gap-16 bg-primary-foreground">
      <div className=" w-2/3 flex justify-center">
        <h2 className="font-medium tracking-tight text-6xl/tight mt-7">
          Đăng nhập
        </h2>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[350px]">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Mật khẩu</Label>
                {/* <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link> */}
              </div>
              <Input
                id="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleSignIn}>
              Đăng nhập
            </Button>
            <Button variant="outline" className="w-full" onClick={handleGoogle}>
              Đăng nhập với Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Chưa có tài khoản?{" "}
            <Link href="signup" className="underline">
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
