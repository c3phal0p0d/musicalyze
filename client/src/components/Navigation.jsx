import React from "react";
import "../App.css";

const Navigation = () => {
    return ( 
        <div className="navigation">
            <a className="navLink" href={"/auth/logout"}>Logout</a>
        </div>
    );
};

export default Navigation;