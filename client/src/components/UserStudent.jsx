// UserProfile.js
import React, { useEffect, useState } from 'react';
import '../styleProfilStudent.css';
import { useLocation } from 'react-router-dom';

const UserProfile = () => {
  const location = useLocation();
  const userData = location.state?.user;

  const [numeStudent, setNumeStudent] = useState('');
  const [prenumeStudent, setPrenumeStudent] = useState('');
  const [emailStudent, setEmailStudent] = useState('');
  const [specializare, setspecializareStudent] = useState('');
  const [serie, setserieStudent] = useState('');
  const [aninmatriculare, setaninmatriculareStudent] = useState('');
  const [grupa, setgrupaStudent] = useState('');
  const [formaInvatamant, setformainvatamantStudent] = useState('');
  const [telefonStudent, settelefonStudent] = useState('');
  const [anCurent, setanCurentStudent] = useState('');


  useEffect(() => {
    // Verificare pentru a evita eroarea în cazul în care userData este null sau undefined
    if (userData) {
      setNumeStudent(userData.Nume);
      setPrenumeStudent(userData.Prenume);
      setEmailStudent(userData.Email);
      setspecializareStudent(userData.Specializare);
      setserieStudent(userData.Serie);
      setgrupaStudent(userData.Grupa);
      settelefonStudent(userData.Telefon);
      setaninmatriculareStudent(userData.AnInmatriculare);
      setformainvatamantStudent(userData.FormaDeInvatamant);
      setanCurentStudent(userData.An);
      setPassword(userData.Parola);
    }
  }, [userData]); // Este dependent de userData

  //useState= hook si creeaza o stare locala
  //showPassword = variabila de stare
  //setShowPassword = functie 
  //starea initiala, parola nu este afisata
  const[showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("123456"); 
  // const[messageTitle, setMessageTitle] = useState('');

  const handleChangePassword = (event) =>{
    event.preventDefault();
    setShowPassword(!showPassword);
  }
  // const handleChangeMessage = event => {
  //   setMessageTitle(event.target.value);
  // }

  return (
    <>
    {/* Required meta tags */}
    <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        {/* bootstrap css */}
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" />
        {/* titlu */}
      <div className="user-profile-modal">
      <nav>
          <a className="navbar-brand d-flex justify-content-center text-center"> Profil - Utilizator </a>
        </nav>

        <nav className="navbar navbar-light bg-light d-flex justify-content-center align-items-center">
          <a className="navbar-brand text-center">
            <h3>Bun venit, </h3>
            <input type="text" id="numeTitluStudentProfil" disabled value={numeStudent} />
            <br></br>
            <br></br>
            <img src="/gif/profil.gif" width="122" height="122" className="d-inline-block align-top" alt="gif" />
          </a>
        </nav>
        <br />

        <h3 className="text-center">Informatii personale</h3>

        <form action="" id="informatiiStudenti">
          <div className="containerInformatii d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column align-items-center mr-3">
              <p className="mb-0 mt-3">Nume:</p>
              <input type="text" className="mr-0" id="nume" disabled value={numeStudent} />
              <p className="mb-0 mt-3">Prenume:</p>
              <input type="text" id="prenume" className="readonlyM" disabled value={prenumeStudent} />
              <p className="mb-0 mt-3">Specializare:</p>
              <input type="text" id="specializare" className="mr-0 readonlyM" disabled value={specializare} />
            </div>
            <div className="d-flex flex-column align-items-center mr-3">
              <p className="mb-0 mt-3">Serie:</p>
              <input type="text" id="serie" className="readonlyM" disabled value={serie} />
              <p className="mb-0 mt-3">Grupa:</p>
              <input type="text" id="grupa" className="mr-0 readonlyM" disabled value={grupa} />
              <p className="mb-0 mt-3">Telefon:</p>
              <input type="text" id="telefon" className="readonlyM" disabled value={telefonStudent} />
            </div>
            <div className="d-flex flex-column align-items-center mr-3">
              <p className="mb-0 mt-3">An Inmatriculare:</p>
              <input type="text" id="anInmatriculare" className="mr-0 readonlyM" disabled value={aninmatriculare} />
              <p className="mb-0 mt-3">Forma de Invatamant:</p>
              <input type="text" id="forma" className="mr-0 readonlyM" disabled value={formaInvatamant} />
              <p className="mb-0 mt-3">An:</p>
              <input type="text" id="an" className="mr-0 readonlyM" disabled value={anCurent} />
            </div>
          </div>
          <div className="d-flex flex-column align-items-center mr-3 mt-3">
            <p className="mb-0 mt-3">Email:</p>
            <input type="text" id="emailProfil" className="mr-0 readonlyM" disabled value={emailStudent} />
            <p className="mb-0">Parola:</p>
            <input type={showPassword ? "text" : "password"} id="parolaProfil" disabled className="mr-0 mb-2 readonlyM" value={password}  />
            <button onClick={handleChangePassword}>
              {showPassword ? 'Ascunde parola' : 'Vezi parola'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserProfile;
