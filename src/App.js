import "./App.css";
import { Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import Dashboard from "./components/Dashboard";
import Subscriptions from "./components/Subscriptions";


import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Settings from "./components/Settings/Settings";
import Nav from "./components/Nav";


function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signUp" exact element={<SignUp />} />
        <Route path="/settings" exact element={<Settings />} />
        <Route path="/subscriptions/:username" exact element={<Subscriptions />} />
        <Route path="/dashboard/:id" exact element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
