import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Landing from "./components/Landing/landing";
import Home from "./components/Home/home";
import Login from "./components/Sign/signin";
import SignUp from "./components/Sign/signup";
import Failure from "./components/UI/Failure/failure";
import About from "./components/UI/About/about";
import Chat from "./components/Chat/chat";
import { useState } from "react";

function App() {
  const [situation,setSituation]=useState('');
  const [expert,setExpert]=useState('');

  return (
    <div>
      <Toaster />
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/home" element={<Home setExpert={setExpert} />} />
          <Route path="/situation" element={<About setSituation={setSituation} expert={expert}/>} />
          <Route path="/aiexpert" element={<Chat situation={situation} expert={expert}/>} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/*" element={<Failure />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;