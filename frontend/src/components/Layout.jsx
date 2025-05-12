import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow p-4 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
