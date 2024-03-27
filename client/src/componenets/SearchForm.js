import React, { useContext } from 'react';
import { SearchContext } from '../SearchContext';
import './SearchForm.css';
import axios from "axios";

const SearchForm = () => {
    const { searchTerm, setSearchTerm, setSearchResults } = useContext(SearchContext);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(searchTerm);
        }
    };

    const handleSubmit = async (searchTerm) => {
        if (!searchTerm) return;

        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/search?q=${searchTerm}`);
            setSearchResults(response.data.results);
        } catch (error) {
            console.error('Error fetching results:', error);
        }
    };

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(searchTerm);
        }}>
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Search Reddit"
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;
