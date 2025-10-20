"use client";

import "@/app/globals.css";
import Header from "@/components/user/Header";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">


      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
