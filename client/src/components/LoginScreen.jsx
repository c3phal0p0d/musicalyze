import React from "react";
import "../App.css";

function LoginScreen() {
    return (
        <div className="App">
            <header className="App-header">
                <p>You are not logged in to Spotify</p>
                <a className="App-link" href={"/auth/login"}>Login</a>
            </header>
        </div>
    );
}

export default LoginScreen;