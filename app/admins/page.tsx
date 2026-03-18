import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function AdminIndexPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (session?.value === "authenticated") {
    redirect("/admins/dashboard");
  } else {
    redirect("/admins/login");
  }
}
