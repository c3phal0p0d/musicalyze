import React from "react";
import "../App.css";

function LoginScreen() {
    return (
        <div className="content">
            <h1>Musicalyze</h1>
            {/* <p>Analyze your music taste!</p> */}
            {/* <div className="button"> */}
            <a className="button" href={"/auth/login"}>Log in</a>
            {/* </div> */}
        </div>
    );
}

export default LoginScreen;