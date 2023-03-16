import DataActions from "@/services/dataActions";
import { useEffect, useState } from "react";

const Loading = () => (
  <div className="h-full flex flex-col justify-center items-center">
    <img
      className="h-1/3 mx-auto mb-4"
      src="/images/search.gif"
      alt=""
    />
    <h1 className="text-3xl font-semibold">Loading...</h1>
  </div>
);

const PokeList = (p) => {
  const [loading, setLoading] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  const [offset, setOffset] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [pokelist, setPokelist] = useState([]);

  const scrollListener = (ev) => {
    const currentHeight = ev.target.scrollTop;
    const maxHeight = document.querySelector('#pokelist').scrollHeight - 1250;
    if (currentHeight > maxHeight) {
      setOffset(offset + 30);
      setLoading(true);
    } 
  };

  useEffect(() => {
    let newPokeList = pokelist;
    if (!loading) return;
    DataActions.GetAllPokemon(offset).then(result => {
      result.results.map(({ url }) => {
        DataActions.GetPokemonDetail(url).then(pokemon => {
          setLoading(true);
          newPokeList.push(pokemon);
          setLoading(false);
          setFirstLoad(false);
        });
        setPokelist(newPokeList);
      });
    });
  }, [offset, loading, pokelist]);

  useEffect(() => {
    if (!loading && pokelist.length > 0) {
      window.addEventListener('scroll', scrollListener, true);
      return () => window.removeEventListener('scroll', scrollListener, true);
    }
  }, [loading, pokelist]);

  return (
    <main className="flex flex-col items-center gap-4 h-screen container pt-24 lg:flex-row lg:pt-0">
      <div className="w-4/5 h-full overflow-y-scroll bg-amber-800 rounded-lg lg:w-1/2 lg:h-4/5">
        {firstLoad ? (
          <Loading />
        ) : (
          <div id="pokelist" className="flex flex-col gap-4 p-4">
            {pokelist.map(pokemon => (
              <div
                key={pokemon.id}
                className={`rounded-lg flex items-center cursor-pointer ${selectedPokemon === pokemon ? 'bg-amber-500' : 'bg-amber-200'}`}
                onClick={() => {
                  if (selectedPokemon === pokemon) {
                    setSelectedPokemon({});
                  } else setSelectedPokemon(pokemon);
                }}
              >
                {/* <img src="https://picsum.photos/60" alt="" /> */}
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <h4 className="font-bold text-3xl capitalize">{pokemon.name}</h4>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-4/5 h-4/5 flex flex-col justify-center items-center gap-4 lg:w-2/3">
        {!Object.keys(selectedPokemon).length ? (
          <>
            <img className="h-1/3" src="/images/idle.png" alt="" />
            <h1 className="font-bold text-4xl">Choose Pokémon</h1>
          </>
        ) : (
          <div className="w-full h-full flex flex-col bg-amber-500 rounded-lg px-10 py-4">
            <div className="flex items-center gap-12">
              <img className="w-1/2" src={selectedPokemon.sprites.front_default} alt="" />
              <div>
                <h1 className="font-semibold text-xl">Abilities</h1>
                <ul className="list-disc">
                  {selectedPokemon.abilities.map(ability => (
                    <li key={ability.slot}>{ability.ability.name}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              {selectedPokemon.stats.map((stat, index) => (
                  <p key={index}>
                    <span className="font-semibold uppercase">
                      {stat.stat.name}
                    </span>{" "}
                    - {stat.base_stat}
                  </p>
                ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default PokeList;
