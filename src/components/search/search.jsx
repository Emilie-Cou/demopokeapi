import PropTypes from 'prop-types';
import { useState } from 'react';


const Search = (props) => {
    // Destructuring des props
    const { setSearch } = props;

    // State pour stocker la valeur de la recherche
    const [ searchValue, setSearchValue ] = useState('');

    // Gestion du submit du formulaire de recherche
    const handleSubmit = (e) => {
        e.preventDefault();

        // On transmet le pokémon recherché au parent via la fonction setSearch avec la valeur actuelle de searchValue
        setSearch(searchValue)
        // Réinitialisation de la valeur de searchValue
        setSearchValue('')
    };
    
    // Gestion du changement de valeur dans l'input search
    const handleInputChange = (e) => {
        setSearchValue(e.target.value)
    };

    return (
        <div className='search_container'>
            <h3>Search field</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search pokemon..." onChange={handleInputChange} value={searchValue} className="search_input"/>
                <input type="submit" value="Search" className="search_button" />
            </form>
        </div>
    )
};

Search.propTypes = {
    setSearch: PropTypes.func,
}

export default Search;