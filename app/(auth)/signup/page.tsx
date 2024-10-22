"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { client } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    await client.signUp.email({
      name,
      email,
      password,
    });
    toast({
      title: "Đăng ký thành công",
      description: "Tài khoản của bạn đã được tạo.",
    });
    router.push("/dashboard");
  };

  return (
    <section className="py-40 px-20 flex gap-16 bg-primary-foreground">
      <div className=" w-2/3 flex justify-center">
        <h2 className="font-medium tracking-tight text-6xl/tight mt-7">
          Đăng ký
        </h2>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[350px]">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Tên người dùng</Label>
              <Input
                id="name"
                type="name"
                value={name}
                placeholder=""
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                placeholder="m@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Mật khẩu</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleSignUp}>
              Đăng ký
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Đã có tài khoản?{" "}
            <Link href="login" className="underline">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
