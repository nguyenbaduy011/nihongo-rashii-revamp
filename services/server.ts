import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function Session() {
  const session = await auth.api.getSession({
    headers: headers(), // you need to pass the headers object.
  });
}
