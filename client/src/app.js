import React, { useContext } from 'react';
import SearchForm from './componenets/SearchForm';
import SearchResult from './componenets/SearchResult';
import { SearchContext } from './SearchContext';
import './app.css';

const RedditSearch = () => {
    const { searchResults } = useContext(SearchContext);

    return (
        <div className="search-container">
            <SearchForm />
            {searchResults && searchResults.length > 0 && (
                <div className="results">
                    {searchResults.map((result) => (
                        <SearchResult key={result.id} result={result} />
                    ))}
                </div>
            )}

            {!searchResults && <div>Loading...</div>}
        </div>
    );
};

export default RedditSearch;
