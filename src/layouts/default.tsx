import { Outlet } from "react-router-dom";

import { Navbar } from "@/components/shared/navbar.tsx";

export default function DefaultLayout() {
  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex-1 flex flex-col p-6">
        <Navbar />
        <main className="w-full transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
