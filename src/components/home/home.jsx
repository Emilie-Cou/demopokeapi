import { useEffect, useState } from "react";
import { GetAllWithSprites, GetSearchedPokemon } from "../../api/api";
import './home.scss';
import Details from "../details/details";
import Search from "../search/search";


const Home = () => {

    // Définition des states pour gérer les données et la recherche
    const [ pokemonsList, setPokemonList ] = useState([]); // Liste des Pokémons
    const [ selectedPokemon, setSelectedPokemon ] = useState(''); // Pokémon sélectionné
    const [ searchValue, setSearchValue ] = useState(null); // Valeur de recherche reçue par le component Search

    // Fonction pour obtenir tous les Pokémon depuis la fonction établie dans le fichier api.js
    const getAll = async () => {
        try {
            const pokemonData = await GetAllWithSprites();
            setPokemonList(pokemonData);
        } catch (error) {
            console.error(error)
        }
    };

    // Fonction pour obtenir un Pokémon recherché depuis la fonction établie dans le fichier api.js
    const getSearched = async () => {
        try {
            const pokemonData = await GetSearchedPokemon(searchValue);
            setPokemonList([pokemonData])
        } catch (error) {
            console.error(error);
        }
    }

    // Gestion de la sélection d'un Pokémon au clic de l'image
    const handleSelection = (e, id) => {
        setSelectedPokemon(id);
    }

    useEffect(() => {
        if (searchValue === null) {
           getAll(); // Si l'input search est vide, obtenir tous les Pokémons
        } 
        
        else {
            getSearched(searchValue); // Sinon, obtenir le Pokémon recherché
        }
    }, [searchValue]);

    return (
        <>
            <Search setSearch={setSearchValue} setPokemon={setSelectedPokemon}/>
            {selectedPokemon !== '' ? (
                <Details pokemon={selectedPokemon} setPokemon={setSelectedPokemon} setSearch={setSearchValue}/>
            ) : (
                <section className="pokemon_container">
                    { pokemonsList.map((poke) => (
                        <div key={poke.id} className="pokemon_display">
                            <h2>{poke.name}</h2>
                            <img src={poke.sprite} alt={poke.name} onClick={(e) => handleSelection(e, poke.id)} className="pokemon_sprite" />
                        </div>
                    ))
                    }
                </section>
            )}
        </>
    )
};

export default Home;