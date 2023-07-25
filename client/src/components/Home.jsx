import React from "react";
import "../App.css";
import TopTracks from "./TopTracks";
import Navigation from "./Navigation";

const Home = () => {
    return ( 
        <>
            <Navigation/>
            <TopTracks/>
        </>
    );
};

export default Home;