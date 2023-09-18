import { Link, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserContext } from "./context/userContext";
import { useContext } from "react";
import data from './data.json'

function App() {
  const { users } = useContext(UserContext);
  const change = "new-1"
  console.log(change);
  console.log(data);

  return (
   <>
  
    </> 
  )
}

export default App
