import React, { createContext, useState } from 'react';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm, searchResults, setSearchResults }}>
            {children}
        </SearchContext.Provider>
    );
};

export { SearchContext, SearchProvider };
