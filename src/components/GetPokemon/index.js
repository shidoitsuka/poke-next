import { useEffect, useState } from "react";
import "@/helpers";
import DataActions from "@/services/dataActions";
import { X } from "react-feather";
import styles from "@/styles/index.module.scss";

const GetPokemon = (p) => {
  const { show, setShow, setOwnedPokemonChange } = p;
  const [loading, setLoading] = useState(true);
  const [obtained, setObtained] = useState({});

  const claimPokemon = () => {
    const currentPokemon = JSON.parse(localStorage.getItem("pokelist"));
    currentPokemon.push(obtained);
    localStorage.setItem("pokelist", JSON.stringify(currentPokemon));
    setShow(false);
    setOwnedPokemonChange(true);
  };

  useEffect(() => {
    if (loading)
      DataActions.GetRandomPokemon().then((response) => {
        const data = response.results.random().url;
        DataActions.GetPokemonDetail(data).then((pokemon) => {
          setObtained(pokemon);
          setLoading(false);
        });
      });
  }, [loading]);

  if (show)
    return (
      <main className="w-full h-full fixed top-0 left-0 z-50 bg-black/50">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="bg-yellow-200 w-80 rounded-lg p-4">
            <div className="w-full flex justify-between">
              <h1 className="font-bold text-xl">{!loading && obtained.name}</h1>
              <X
                className="ml-auto cursor-pointer"
                onClick={() => setShow(!show)}
              />
            </div>
            {loading ? (
              <div className="h-full text-center font-bold">
                <img
                  className="h-2/3 mx-auto mb-4"
                  src="/images/search.gif"
                  alt=""
                />
                Processing your pokémon
              </div>
            ) : (
              <div className="h-full">
                <img
                  className="mx-auto w-40"
                  src={obtained.sprites.front_default}
                  alt=""
                />
                <div className="bg-yellow-300 rounded-lg p-2 mb-2">
                  {obtained.stats.map((stat, index) => (
                    <p key={index}>
                      <span className="font-semibold uppercase">
                        {stat.stat.name}
                      </span>{" "}
                      - {stat.base_stat}
                    </p>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a
                    className={`w-1/2 block text-center py-2 duration-300 shadow-red-500 rounded-full hover:shadow-lg`}
                    href="#"
                    onClick={() => setShow(false)}
                  >
                    release
                  </a>
                  <a
                    className={`w-1/2 block text-center font-semibold border border-yellow-300 rounded-full px-6 py-2 duration-300 bg-yellow-300 hover:shadow-lg`}
                    href="#"
                    onClick={claimPokemon}
                  >
                    claim
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    );
};

export default GetPokemon;
