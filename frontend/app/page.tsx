import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold text-center dark:text-white sm:text-left">
        Welcome to Repomap
      </h1>
      <Button className="mt-4">Click Me</Button>
    </div>
  );
}
