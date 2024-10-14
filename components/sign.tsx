"use client";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/auth-client";
import Link from "next/link";

export function HandleSign() {
  const {
    data,
    isPending, // loading state
    error, // error object
  } = client.useSession();

  return <Sign sessionID={data?.session?.id} />;
}

const handleSignOut = async () => {
  await client.signOut();
};

export function Sign({ sessionID }: { sessionID: any }) {
  if (!sessionID) {
    return (
      <Button size="lg" className="tracking-tight text-lg/5" asChild>
        <Link href="/login">Đăng nhập</Link>
      </Button>
    );
  } else
    return (
      <Button size="lg" className="tracking-tight text-lg/5" asChild>
        <Link href="/" onClick={handleSignOut}>
          Đăng xuất
        </Link>
      </Button>
    );
}
