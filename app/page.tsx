import { fetchShelves } from "@/src/services/gloseApi";
import { redirect } from "next/navigation";

export default async function Home() {
  const shelves = await fetchShelves(0, 1);
  if (shelves.length > 0) {
    redirect(`/shelf/${shelves[0].id}`);
  }
  return null;
}