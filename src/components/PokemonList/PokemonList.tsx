"use client";

import { Pokemon } from "@/types/Pokemon.type";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import PokemonCard from "../PokemonCard";

const PokemonList = () => {
  const fetchPokemons = async () => {
    const response = await fetch("/api/pokemons");
    const data = response.json();

    return data;
  };

  const { data: pokemons, isPending } = useQuery<Pokemon[]>({
    queryKey: ["pokemon", { list: true }],
    queryFn: fetchPokemons,
  });

  if (isPending) {
    return (
      <div className="text-xl font-semibold text-center py-20">
        몬스터 볼 던지는 중..🍃
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-5">
      {pokemons?.map((pokemon) => {
        return (
          <li
            key={pokemon.id}
            className="bg-white w-40 h-40 rounded-lg p-4 shadow-md hover:scale-125 transition-transform"
          >
            <Link href={`/pokemons/${pokemon.id}`}>
              <PokemonCard pokemon={pokemon} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default PokemonList;
