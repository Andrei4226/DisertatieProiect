import React from 'react';
import MainStudent from './components/MainStudent';
import UserStudent from './components/UserStudent';
import NavbarMain from './components/NavbarMain';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authentication from './components/Authentication';
import MainProfesor from './components/MainProfesor';
import UserProfesor from './components/UserProfesor';


function App() {

  return (
    // <div>
    //   <NavbarMainUser />
    //   <MainStudent/>
    //   <h1>Mesaj de la server:</h1>
    //   <p>{message}</p>
    //   <h1>Aplicație React</h1>
    // </div>
      <Router>
        <Routes>
          <Route path="*" element={<Layout />} /> 
        </Routes>
      </Router>
    );
}
const Layout = () => {
  return (
    <div>
      <NavbarMain/>
      <Routes>
        <Route path="*" element={<MainStudent />} />
        <Route path="/UserStudent" element={<UserStudent />} />
        <Route path="/Authentication" element={<Authentication/>}/>
        <Route path="/Authentication/Student" element={<Authentication/>}/>
        <Route path="/Authentication/Profesor" element={<Authentication/>}/>
        <Route path="/MainStudent" element={<MainStudent/>}/>
        <Route path="/MainProfesor" element={<MainProfesor/>}/>
        <Route path="/UserProfesor" element ={<UserProfesor/>}/>
        <Route path="/MainProfesor/*" element={<MainProfesor/>}/>
        <Route path="/UserProfesor/:id" element ={<UserProfesor/>}/>
        <Route path="/UserProfesor/*" element={<UserProfesor />} />
        <Route path="/MainStudent/:id" element ={<MainStudent/>}/>
        <Route path="/UserStudent/*" element={<UserStudent />} />
      </Routes>
    </div>
  );
};


export default App;
