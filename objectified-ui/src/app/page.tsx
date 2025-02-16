import Image from "next/image";
import Dashboard from "@/app/components/Dashboard";

export const VERSION="0.0.1"

export default function Home() {
  return (
    <main>
      <Dashboard/>
      <div style={{ position: 'absolute', bottom: 0, right: 0, color: '#000', paddingRight: '5px' }}>
        v{VERSION}
      </div>
    </main>
  );
}
