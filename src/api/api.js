import axios from 'axios';

// Fonction pour obtenir la liste des 151 premiers Pokémon avec leurs sprites
export const GetAllWithSprites = async () => {
    try {
        const listResponse = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const pokemonList = listResponse.data.results;

        // Utilisation de map pour traiter chaque pokémon de manière asynchrone et aller récupérer les sprites
        const pokemonData = pokemonList.map(async (pokemon) => {
            const spritesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
            const id = spritesResponse.data.id;
            const spriteData = spritesResponse.data.sprites.front_default;
            return {id : id, name : pokemon.name, sprite : spriteData};
        })
        
        // Utilisation de Promise.all pour attendre que toutes les requêtes asynchrones soient terminées
        const pokemon = await Promise.all(pokemonData);
        return pokemon;
    } 
    
    catch (error) {
        console.error(error);
        return [];
    }
};

// Fonction pour obtenir les détails d'un pokémon par son ID
export const GetDetails = async (id) => {
    try {
        const pokemonDetails = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return pokemonDetails.data;
    }
    
    catch (error) {
        console.error('Error fetching Pokemon data: ', error)
        return [];
    }
}

// Fonction pour obtenir les détails d'un Pokémon par son nom
export const GetSearchedPokemon = async (name) => {
    try {
        const pokemonDetails = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const id = pokemonDetails.data.id;
        const pName = pokemonDetails.data.name;
        const spriteData = pokemonDetails.data.sprites.front_default;
        return {id: id, name: pName, sprite: spriteData}


    } catch (error) {
        console.error(error);
        return [];
    }
}