import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function Home() {
  return (
      <Button onClick={
        redirect('/create')
      }>Go to Create Page</Button>
  );
}
