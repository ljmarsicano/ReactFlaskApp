import React from 'react';
import '../components/pages.css';
import NavBar from '../components/navbar';
import Searchbar from '../components/searchbar'

const News = () => {
    return (
        <>
        <NavBar />
        <h1>News Page</h1>
        <Searchbar />
        </>
    )
}

export default News;