import GetPokemon from "@/components/GetPokemon";
import { useEffect, useState } from "react";
import { ExternalLink, Link } from "react-feather";
import styles from "../styles/index.module.scss";

const Home = (p) => {
  const [showPokemon, setShowPokemon] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ownedPokemon, setOwnedPokemon] = useState([]);
  const [ownedPokemonChange, setOwnedPokemonChange] = useState(false);

  useEffect(() => {
    setLoading(true);
    const obtainedPokemon = JSON.parse(localStorage.getItem("pokelist"));
    setTimeout(() => {
      setOwnedPokemon(obtainedPokemon);
      setLoading(false);
      setOwnedPokemonChange(false);
    }, 1500);
  }, [ownedPokemonChange]);

  p = {
    ...p,
    setOwnedPokemonChange,
  };

  return (
    <main>
      {showPokemon && (
        <GetPokemon {...p} show={showPokemon} setShow={setShowPokemon} />
      )}
      <section className="h-[75vh] mb-20">
        <div className="h-full flex flex-col justify-center items-center gap-12 bg-yellow-200 lg:flex-row">
          <div className="w-1/2">
            <img className="w-96 ml-auto" src="/images/main_image.png" alt="" />
          </div>
          <div className="lg:w-1/2">
            <h1 className="font-bold md:text-xl lg:text-3xl">welcome to</h1>
            <h1 className="font-bold mb-4 text-4xl lg:text-8xl">PokeNéxt!</h1>
            <a
              className={styles["btn-transparent"]}
              href="#"
              onClick={() => setShowPokemon(true)}
            >
              Get Your Pokémon Now!
            </a>
          </div>
        </div>
      </section>
      <section className="container flex flex-col gap-12 mb-12 lg:flex-row">
        <div className="lg:w-1/2 order-last lg:order-first">
          <a class="twitter-timeline" data-height="600" href="https://twitter.com/Pokemon?ref_src=twsrc%5Etfw">Tweets by Pokemon</a>
        </div>
        <div className="lg:w-1/2">
          <div className="w-full h-full flex flex-col gap-4">
            <h1 className="font-bold text-3xl">My Pokemon</h1>
            <p>You can see all of your owned pokémon here!</p>
            <div className="w-2/3 h-96 bg-amber-200 shadow-xl rounded-lg p-3 overflow-y-scroll">
              {loading ? (
                <div className="font-semibold h-full text-center">
                  <img
                    className="h-2/3 mx-auto mb-4"
                    src="/images/search.gif"
                    alt=""
                  />
                  Loading...
                </div>
              ) : !ownedPokemon?.length ? (
                <div className="h-full flex flex-col justify-center items-center">
                  <img className="h-1/2" src="/images/404.png" alt="" />
                  <p className="font-bold text-xl mb-2">You have no pokemon.</p>
                  <a
                    className={`${styles["btn-transparent"]} ${styles["btn-sm"]}`}
                    href="#"
                  >
                    Get your pokemon
                  </a>
                </div>
              ) : (
                <div>
                  {ownedPokemon.map((pokemon, index) => (
                    <div
                      className={`bg-amber-300 rounded-lg flex items-center ${
                        index !== ownedPokemon.length - 1 && "mb-2"
                      }`}
                      key={pokemon.id}
                    >
                      <img src={pokemon.sprites.front_default} alt="" />
                      <div>
                        <h3 className="font-bold text-2xl capitalize">
                          {pokemon.name}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
