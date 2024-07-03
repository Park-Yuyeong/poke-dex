import Chip from "@/components/Chip";
import Page from "@/components/Page";
import { Pokemon } from "@/types/Pokemon.type";
import Image from "next/image";

interface PokemonDetailPageProps {
  params: { id: string };
}

const PokemonDetailPage = async ({ params }: PokemonDetailPageProps) => {
  const response = await fetch(
    `http://localhost:3000/api/pokemons/${params.id}`
  );
  const pokemon: Pokemon = await response.json();

  return (
    <Page title={pokemon.korean_name || pokemon.name} width="md" hasBackButton>
      <p className="text-slate-600 font-medium">No. {pokemon.id}</p>
      <Image
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        width={200}
        height={200}
        className="m-2"
      />

      <div className="flex flex-col justify-center gap-y-3">
        <h3 className="text-xl font-semibold text-center">
          이름: {pokemon.korean_name || pokemon.name}
        </h3>
        <p className="text-center">
          키: {pokemon.height}m / 무게: {pokemon.weight}kg
        </p>
        <div className="flex justify-center gap-x-3">
          <div className="flex items-center gap-x-1">
            <span>타입: </span>
            {pokemon.types.map((type) => (
              <Chip label={type.type.korean_name} intent="yellow" />
            ))}
          </div>
          /
          <div className="flex items-center gap-x-1">
            <span>특성: </span>
            {pokemon.abilities.map((ability) => (
              <Chip label={ability.ability.korean_name} intent="green" />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-y-3 rounded-lg p-4 bg-slate-100 mt-2">
          <h2 className="text-2xl font-semibold px-2">기술🗡️</h2>
          <div className="flex gap-1 flex-wrap">
            {pokemon.moves.map((move) => (
              <Chip label={move.move.korean_name} />
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default PokemonDetailPage;
