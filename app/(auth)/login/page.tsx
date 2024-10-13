"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { client } from "@/lib/auth-client";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    await client.signIn.email({
      email,
      password,
    });
  };

  const handleGoogle = async () => {
    await client.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <section className="py-40 px-20 flex gap-16">
      <div className="border-black border-t-2 w-2/3">
        <h2 className="font-medium tracking-tight text-6xl/tight mt-7">Blog</h2>
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
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
