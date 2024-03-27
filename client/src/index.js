import React from 'react';
import ReactDOM from 'react-dom/client';
import RedditSearch from './app';
import { SearchProvider } from './SearchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SearchProvider>
        <RedditSearch />
    </SearchProvider>
);
