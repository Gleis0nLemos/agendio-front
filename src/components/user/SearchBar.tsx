"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({
  placeholder = "Buscar...",
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="flex items-center gap-2">
        {/* Caixa de input */}
        <div className="flex items-center flex-1 bg-zinc-900 rounded-xl px-4 py-2 border border-zinc-900 focus-within:border-zinc-600 transition">
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-gray-200 outline-none placeholder-gray-500"
          />
        </div>

        {/* Botão de busca */}
        <button
          type="submit"
          className="p-2 rounded-lg border border-violet-600 bg-violet-600 hover:bg-violet-700 hover:border-violet-700 text-gray-200 hover:text-white transition"
        >
          <Search size={18} />
        </button>
      </div>
    </form>
  );
}
