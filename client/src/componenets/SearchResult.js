import React from 'react';
import sanitizeHtml from 'sanitize-html';
import './SearchResult.css';

const imageExtensionsRegex = new RegExp('^(.*\.(?:png|jpg|jpeg|gif))$', 'i');

const extractTitleFromSelftext = (selftext) => {
    const sanitizedText = sanitizeHtml(selftext, { allowedTags: [] });
    const firstLine = sanitizedText.split('\n')[0];
    if (firstLine.length > 20) {
        return firstLine;
    }
    return null;
};

const SearchResult = ({ result }) => {
    return (
        <div className="result-item">
            {result.title || extractTitleFromSelftext(result.selftext)  && (
                <h2>{result.title || extractTitleFromSelftext(result.selftext)}</h2>
            )}

            {result.author && <p>Author: {result.author}</p>}
            {result.url && (
                <a href={result.url} target="_blank" rel="noreferrer noopener">
                    Title: {result.title || 'Link'}
                </a>
            )}

            {result.selftext && <p>{result.selftext}</p>}
            {result.thumbnail && imageExtensionsRegex.test(result.thumbnail) && (
                <img src={result.thumbnail} alt={result.title} />
            )}
            {!result.thumbnail && result.preview && result.preview.images[0] && (
                <img src={result.preview.images[0].source.url} alt={result.title}  />
            )}
        </div>
    );
};

export default SearchResult;
