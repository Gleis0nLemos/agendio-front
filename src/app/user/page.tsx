"use client";

import UserGreeting from "@/components/user/UserGreeting";
import SearchBar from "@/components/user/SearchBar";
import AppointmentsSection from "@/components/user/AppointmentsSection";
import SloganSection from "@/components/user/SloganSection";

export default function UserPage() {
  const handleSearch = (query: string) => {
    console.log("Pesquisando:", query);
  };

  return (
    <div className="space-y-6">
      <UserGreeting name="Gleison" />
      <SearchBar
        placeholder="Buscar"
        onSearch={handleSearch}
      />
      <SloganSection />
      <AppointmentsSection />
    </div>
  );
}
