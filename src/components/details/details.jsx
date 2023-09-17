import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { GetDetails } from '../../api/api';
import './details.scss';

const Details = (props) => {

    // Destructuring des props
    const { pokemon, setPokemon, setSearch } = props;
    // State pour stocker les détails du Pokémon
    const [pokemonDetails, setPokemonDetails ] = useState([]);
    
    // Gestion du retour à la liste principale, on vide le state qui contient l'id et on remet a null la valeur de recherche
    const handleSelection = () => {
        setPokemon('')
        setSearch(null)
    }

    useEffect(() => {
        if (pokemon !== '') {
            // Fonction pour obtenir les détails du pokémon recherché depuis la fonction établie dans le fichier api.js
            const getPokemonDetails = async () => {
                try {
                    const details = await GetDetails(pokemon);
                    setPokemonDetails([details]);
                } 
                
                catch (error) {
                    console.error(error);
                }
            }
            getPokemonDetails(pokemon);
        }
    }, [pokemon])
    
    return (
        <div className='details_container'>
            <button onClick={handleSelection}>Back to the list</button>
            {pokemonDetails.map((poke) => 
                <div className='details_display' key={poke.id}>
                    <h2>{poke.name}</h2>
                    <img src={poke.sprites.front_default} alt={poke.name} />
                    <p>{poke.weight}</p>
                </div>
                )
            }
        </div>
    )
};

Details.propTypes = {
    pokemon: PropTypes.number,
    setPokemon: PropTypes.func,
    setSearch: PropTypes.func,
}


export default Details;