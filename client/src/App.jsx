import React, {useState, useEffect} from "react";
import axios from "axios";
import "./App.css";
import LoginScreen from "./components/LoginScreen";
import Loading from "./components/Loading";
import Home from "./components/Home";

function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios.get("/auth/current-session")
        .then(({data}) => {
            setAuth(data);
        })
        .catch(({error}) => {
            console.log(error);
        });
  }, []);

  if (auth === null) {
    return <Loading/>;
  }
  if (auth) {
    return <Home auth={auth}/>;
  }
  return <LoginScreen/>;
}

export default App;