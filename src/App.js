// import './App.css';
import Home from './components/Home.js'
import About from './components/About.js'
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import NoteState from './components/context/notes/NoteState.js';
import Alert from './components/Alert.js';

function App() {
  return (
    <>
    <NoteState>
    <BrowserRouter>
        <Navbar/>
        <Alert message="Warning befor action"/>
        <div className='container'>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Home" element={<Home />}/>
            <Route path="/About" element={<About/>}/>
          </Routes>
        </div>
    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
