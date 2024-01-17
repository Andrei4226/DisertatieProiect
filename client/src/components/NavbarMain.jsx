import React,{useState} from 'react';
import {Link} from 'react-router-dom';

const NavbarMain = () => {
  const[isProfesorMeniu, setIsProfesorMeniu]=useState(false);

  const handleMeniuToggle = () =>{
    setIsProfesorMeniu((prev)=> !prev);
  };

  const disertatieStyle = {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    fontSize: '20px',
    color: '#333', // culoare text
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark d-flex justify-content-between">
        <img src="/images/letter-d.jpg" alt="photo" width="40px" height="40px" />
        <button onClick={handleMeniuToggle}>
          {isProfesorMeniu ? (
            <Link to="/MainProfesor"className ="text-black">
              Meniu Profesor
            </Link>
          ): (
            <Link to="/MainStudent" className="text-black">
              Meniu Student
            </Link>
          )
          }
          </button>
      </nav>
      <nav>
        <a className="navbar-brand d-flex justify-content-center text-center" style={disertatieStyle}> Înregistrare la Disertație</a>
      </nav>
    </div>
  );
};

export default NavbarMain;
