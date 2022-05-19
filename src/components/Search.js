import React, { useState } from "react";
import { createApi } from "unsplash-js";
import { FaSearch } from "react-icons/fa";
import Image from "./Image";

const apiKey = process.env.REACT_APP_UNSPLASH_API_KEY;

const unsplash = createApi({ accessKey: apiKey });

const Search = () => {
    const [currText, setCurrText] = useState("");
    const [searchText, setSearchText] = useState("");
    const [counter, setCounter] = useState(0);
    const [images, setImages] = useState([]);
    const [imageCount, setImageCount] = useState(0);

    const searchImages = (e) => {
        e.preventDefault();
        fetchImage(0, searchText);
        setCurrText(searchText);
        setCounter(0);
    };
    const loadMore = () => {
        fetchImage(counter + 1, currText);
        setCounter((prevCount) => prevCount + 1);
    };

    const changeSearchText = (e) => {
        setSearchText(e.target.value);
    };

    const fetchImage = async (cnt, text) => {
        let res = await unsplash.search.getPhotos({ query: text, page: cnt + 1, perPage: 12 });
        if (res.type === "success") {
            res = res.response;
            if (cnt > 0) setImages((img) => img.concat(res.results));
            else setImages(res.results);
            setImageCount(res.total);
        } else {
            window.alert("Some error occured");
        }
    };

    return (
        <>
            <div className="search-container">
                <form onSubmit={searchImages}>
                    <input
                        type="text"
                        placeholder="Search for photos"
                        value={searchText}
                        onChange={changeSearchText}
                    />
                    <button className="btn" type="submit">
                        <FaSearch />
                    </button>
                </form>
            </div>
            <h3>{currText}</h3>
            <p>{images.length ? `${imageCount} Images have been found` : ""}</p>
            <div className="image-container">
                {images.map((image) => {
                    return <Image key={image.id} imgSrc={image.urls.full} />;
                })}
            </div>
            <div className="load-more">
                {images.length ? (
                    <button className="btn" onClick={loadMore}>
                        Load More
                    </button>
                ) : (
                    ""
                )}
            </div>
        </>
    );
};

export default Search;
