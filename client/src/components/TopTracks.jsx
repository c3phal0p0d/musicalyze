import React, { useState, useEffect } from "react";
import "../App.css";

const TopTracks = () => {
    const [topTracks, setTopTracks] = useState(null);
    return ( 
        <div className="topTracks">
            <h2>Top tracks</h2>
            <div className="tracksContainer">
                Tracks
            </div>
        </div>
    );
};

export default TopTracks;