import React from "react";

const Home = () => {
    return ( 
        <>
            <p>Logged in</p> 
            <a className="App-link" href={"/auth/logout"}>Logout</a>
        </>
    );
};

export default Home;