import Image from "next/image";
import Dashboard from "@/app/components/Dashboard";
import {VERSION} from "@/middleware";

export default function Home() {
  return (
    <main>
      <Dashboard/>
      <div style={{ position: 'absolute', bottom: 0, right: 0, color: '#000', paddingRight: '5px', zIndex: 999 }}>
        v{VERSION}
      </div>
    </main>
  );
}

