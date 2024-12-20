import { redirect } from "next/navigation";

export default function Home() {
  redirect("/new?page=1");
}
