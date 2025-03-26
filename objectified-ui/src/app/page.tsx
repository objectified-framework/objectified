import Image from "next/image";
import Dashboard from "@/app/components/Dashboard";
import {VERSION} from "@/middleware";

export default function Home() {
  return (
    <main>
      <Dashboard/>
    </main>
  );
}

