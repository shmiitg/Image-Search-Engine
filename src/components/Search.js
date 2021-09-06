import React, { useState, useEffect } from 'react';
import { createApi } from 'unsplash-js';
import { FaSearch } from 'react-icons/fa';
import Image from './Image';

const unsplash = createApi({ accessKey: "j2y6B23X5elobbTY-bRdSqrI8867tLCTt09DuqGQFPE" });

const Search = () => {
    const initialCount = 0;
    const [searchText, setSearchText] = useState('');
    const [counter, setCounter] = useState(initialCount);
    const [images, setImages] = useState([]);
    const [imageCount, setImageCount] = useState(0);

    const searchImages = (e) => {
        e.preventDefault();
        setCounter(initialCount);
    }
    const loadMore = () => setCounter(prevCount => prevCount + 1);

    const changeSearchText = (e) => {
        setSearchText(e.target.value);
        setCounter(0);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await unsplash.search.getPhotos({ query: searchText, page: counter + 1, perPage: 12 });
                if (res.type === 'success') {
                    res = res.response;
                    if (counter > 0) setImages(img => img.concat(res.results));
                    else setImages(res.results);
                    setImageCount(res.total);
                }
            }
            catch (err) {
                console.log("Error: ", err.message);
            }
        }
        fetchData();
    }, [counter, searchText])

    return (
        <>
            <div className="search-container">
                <form onSubmit={searchImages}>
                    <input type="text" placeholder="Search for photos" value={searchText} onChange={changeSearchText} />
                    <button className="btn" type="submit"><FaSearch /></button>
                </form>
            </div>
            <h3>{searchText}</h3>
            <p>
                {
                    images.length ? `${imageCount} Images have been found` : ''
                }
            </p>
            <div className="image-container">
                {
                    images.map(image => { return <Image key={image.id} imgSrc={image.urls.full} /> })
                }
            </div>
            <div className="load-more">
                {
                    images.length ? <button className="btn" onClick={loadMore}>Load More</button> : ''
                }
            </div>
        </>
    )
}

export default Search
