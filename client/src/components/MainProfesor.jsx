

import React, { useState, useEffect, useRef} from 'react';
import '../styleMainProfesor.css';
import { Link, useLocation } from 'react-router-dom';
import UserProfesor from './UserProfesor';
import Authentication from './Authentication';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const MainProfesor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.user  || {};
  const form = useRef();

  // State pentru a ține evidența valorii "numeTitluStudent"
  const [numeTitluProfesor, setNumeTitluProfesor] = useState('');
  const [solicitari, setSolicitari] = useState([]);
  const [cereri, setCereri] = useState([]);
  const [verify,setVerify] = useState('');
  const [verifyCerere,setVerifyCerere] = useState('');

  // Folosirea useEffect pentru a actualiza valoarea după ce componenta s-a montat
  useEffect(() => {
    // Verificare pentru a evita eroarea în cazul în care userData este null sau undefined
    if (userData) {
      setNumeTitluProfesor(userData.Nume);
    }

    const fetchProfesoriId = async() =>
    {
      try{
        const response = await fetch(`http://localhost:5000/solicitariProfesor/${userData.Id}`);
        const data = await response.json();
        setSolicitari(data.solicitari);
      }
      catch(error){
        console.log(error);
      }
    }

    const fetchCereriProfesoriId = async() =>
    {
      try{
        const response = await fetch(`http://localhost:5000/cereriProfesor/${userData.Id}`);
        const data = await response.json();
        setCereri(data.cereri);
      }
      catch(error){
        console.log(error);
      }
    }

    fetchProfesoriId();
    fetchCereriProfesoriId();
  }, [userData]); // Este dependent de userData

  const options = solicitari.map((solicitare) => ({
    value: solicitare.IdSolicitare,
    label: `Ați primit o solicitare nouă și id-ul solicitarii este ${solicitare.IdSolicitare}`,
  }));

  const optionsCereri = cereri.map((cerere) => ({
    value: cerere.IdCerere,
    label: `Ați primit o cerere nouă și id-ul cererii este ${cerere.IdCerere}`,
  }));

  const [selectedOptionsList, setSelectedOptionsList] = useState('');
  const[showPopup, setShowPopup] = useState(false);
  const [showTextArea, setShowTextArea] = useState(false);
  const [message, setMessage] = useState(''); 

  const[selectedOptionsListCerere, setSelectedOptionsListCerere]= useState('');
  const[showPopupCerere, setShowPopupCerere] = useState(false);
  const [showTextAreaCerere, setShowTextAreaCerere] = useState(false);
  const [messageCerere, setMessageCerere] = useState(''); 

  const handleSelectedOptionsListClick = (value) => {
    setSelectedOptionsList(value);
    setShowPopup(true);
    setShowTextArea(false);
    console.log(`Selected option: ${value}`);
  };

  const handleSelectedOptionsListCerereClick = (value) => {
    setSelectedOptionsListCerere(value);
    setShowPopupCerere(true);
    setShowTextAreaCerere(false);
    console.log(`Selected option: ${value}`);
  };


  const handleOpenUserProfile = () => {
    window.open('./UserProfesor');
  };
  const handleOptionClick = (value) => {
    // Implementează logica pentru manipularea navigării sau altă acțiune
    console.log(`Selected option: ${value}`);
  };

  const handleRefuseClick= () =>{
    alert(`Solicitarea ${selectedOptionsList} a fost respinsa!`);
    setShowPopup(true);
    setShowTextArea(true); 
    setVerify(false);
  };

  const handleAcceptClick= () =>{
    alert(`Solicitarea ${selectedOptionsList} a fost acceptata!`);
    setShowPopup(true);
    setShowTextArea(true); 
    setVerify(true);
  };

  const handleSubmitMessage = async () => {
    alert(`Justificarea pentru solicitarea ${selectedOptionsList} a fost trimisa! 
    Continut: ${message}`);
    setShowPopup(false);
    setShowTextArea(false); 

    if(verify == true)
    {
      try {
        const response = await fetch(`http://localhost:5000/actualizareSolicitare/${selectedOptionsList}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mesaj: message, stareSolicitare: 1 }), // 1 pentru acceptare, 2 pentru refuz
        });
    
        const data = await response.json();
    
        if (data.success) {
          alert(`Justificarea pentru solicitarea ${selectedOptionsList} a fost trimisă cu succes!`);
          setShowPopup(false);
          setShowTextArea(false);
        } else {
          alert('Eroare la trimiterea justificării.');
        }
      } catch (error) {
        console.error('Eroare la trimiterea cererii:', error.message);
        alert('Eroare la trimiterea cererii.');
      }
    }
    else if(verify == false){
      try {
        const response = await fetch(`http://localhost:5000/actualizareSolicitare/${selectedOptionsList}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mesaj: message, stareSolicitare: 2 }), // 1 pentru acceptare, 2 pentru refuz
        });
    
        const data = await response.json();
    
        if (data.success) {
          alert(`Justificarea pentru solicitarea ${selectedOptionsList} a fost trimisă cu succes!`);
          setShowPopup(false);
          setShowTextArea(false);
        } else {
          alert('Eroare la trimiterea justificării.');
        }
      } catch (error) {
        console.error('Eroare la trimiterea solicitarii:', error.message);
        alert('Eroare la trimiterea solicitarii.');
      }
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_alz3hwf', 'template_rmcxma8', form.current, 'FgzuF52AqaPQI2FMT')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  const handleSubmitMessageCerere = async () => {
    alert(`Justificarea pentru cerere ${selectedOptionsListCerere} a fost trimisa! 
    Continut: ${messageCerere}`);
    setShowPopupCerere(false);
    setShowTextAreaCerere(false); 

    if(verifyCerere == true)
    {
      try {
        const response = await fetch(`http://localhost:5000/actualizareCerere/${selectedOptionsListCerere}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mesaj: messageCerere, stareCerere: 1 }), // 1 pentru acceptare, 2 pentru refuz
        });
    
        const data = await response.json();
    
        if (data.success) {
          alert(`Justificarea pentru cerere ${selectedOptionsListCerere} a fost trimisă cu succes!`);
          setShowPopupCerere(false);
          setShowTextAreaCerere(false);
        } else {
          alert('Eroare la trimiterea justificării.');
        }
      } catch (error) {
        console.error('Eroare la trimiterea cererii:', error.message);
        alert('Eroare la trimiterea cererii.');
      }
    }
    else if(verifyCerere == false){
      try {
        const response = await fetch(`http://localhost:5000/actualizareCerere/${selectedOptionsListCerere}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mesaj: messageCerere, stareCerere: 2 }), // 1 pentru acceptare, 2 pentru refuz
        });
    
        const data = await response.json();
    
        if (data.success) {
          alert(`Justificarea pentru cerere ${selectedOptionsListCerere} a fost trimisă cu succes!`);
          setShowPopupCerere(false);
          setShowTextAreaCerere(false);
        } else {
          alert('Eroare la trimiterea justificării.');
        }
      } catch (error) {
        console.error('Eroare la trimiterea cererii:', error.message);
        alert('Eroare la trimiterea cererii.');
      }
    }
  };

  const handleRefuseClickCerere= () =>{
    alert(`Cererea ${selectedOptionsListCerere} a fost respinsa!`);
    setShowPopupCerere(true);
    setShowTextAreaCerere(true); 
  };
  const handleAcceptClickCerere= () =>{
    alert(`Cererea ${selectedOptionsListCerere} a fost acceptata!`);
    setShowPopupCerere(true);
    setShowTextAreaCerere(true); 
  };


  //se descarca din baza de date cererea 
  const handleDescarcaClickCerere= async () =>{
    alert(`Cererea ${selectedOptionsListCerere} a fost descarcata cu succes!`);
    setShowPopupCerere(false);
    setShowTextAreaCerere(false); 

    try {
      const response = await fetch(`http://localhost:5000/descarca-cerere/${selectedOptionsListCerere}`);
      const data = await response.blob();
  
      // Crează un link pentru descărcare și apelează click pe el
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'cerere_descarcata.docx'); // Schimbă numele descărcatului la nevoie
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Eroare la descărcarea cererii:', error.message);
      alert('Eroare la descărcarea cererii.');
    }
  };
  

  const handleButtonClick = () => {
    // Exemplu de utilizare a navigate
    navigate(`/UserProfesor/${userData.Id}`, {
      state: userData ? { user: userData } : undefined,
    });
  };

  return (
    <>
      {/* Required meta tags */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      {/* bootstrap css */}
      <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" />
      {/* titlu */}
      <title>Disertație</title>
      <nav className="navbar navbar-light mx-auto text-center" style={{ backgroundColor: '#e3f2fd', flexDirection: 'column' }}>
        <a className="navbar-brand" href="#">
          <h3>Bun venit, </h3>
          <input type="text" id="numeTitluProfesor" readOnly value={numeTitluProfesor} />
          <h3></h3>
          <img src="/gif/user-f.gif" width="122" height="122" className="d-inline-block align-top" alt="gif" />
        </a>
      </nav>
      <div className="dropdown mr-auto text-center">
        <button className="btn btn-light" id="ButonAutentificare">
          <Link to="/Authentication/Profesor">Autentificare</Link>
        </button>
        <div className="dropdown-divider"></div>
        <br></br>
        <button className="btn btn-light" id="ButonProfil" onClick={handleButtonClick}>
            Profil
        </button>
        <br></br><br></br>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4 mb-4 text-center custom-border">
            <h5 className="mt-3">Solicitari primite</h5>
            <hr />
            <p className="stilizare">Trimite răspuns fiecărei solicitări</p>
            <br />
            <img src="/images/solicitariProfesor.jpg" width="200" height="200" className="mb-4" alt="solicitari" />
            <br /><br /><br />
            <ul>
              {options.map((option) => (
                <li key={option.value} onClick={() => handleSelectedOptionsListClick(option.value)}>
                  {option.label}
                </li>
              ))}
            </ul>
            {showPopup && (
        <div className="popup">
          {showTextArea ? (
            <form onSubmit={handleSubmitMessage}>
              <label>
                Scrieti justificarea
                <br></br>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="4"
                  cols="30"
                />
              </label>
              <br></br>
              <button className="btnsMainProfesor" type="submit">Trimite</button>
            </form>
          ) : (
            <div>
              <button className="btnsMainProfesor" onClick={() => handleAcceptClick()}>Accepta</button>
              <br/><br/>
              <button className="btnsMainProfesor" onClick={() => handleRefuseClick()}>Refuza</button>
            </div>
          )}
        </div>
      )}
          </div>
          <div className="col-md-4 mb-4 text-center custom-border">
          <h5 className="mt-3">Cereri primite</h5>
            <hr />
            <p className="stilizare">Vizualizează și verifică cererile primite</p>
            <br />
            <img src="/images/cerere.jpg" width="200" height="200" className="mb-4" alt="cereri" />
            <br /><br /><br />
            <ul>
              {optionsCereri.map((cerere) => (
                <li key={cerere.value} onClick={() => handleSelectedOptionsListCerereClick(cerere.value)}>
                  {cerere.label}
                </li>
              ))}
            </ul>
            {showPopupCerere && (
        <div className="popup">
          {showTextAreaCerere ? (
            <form onSubmit={handleSubmitMessageCerere}>
              <label>
                Scrieti justificarea:
                <br></br>
                <textarea
                  value={messageCerere}
                  onChange={(e) => setMessageCerere(e.target.value)}
                  rows="4"
                  cols="30"
                />
              </label>
              <br></br>
              <button className="btnsMainProfesor" type="submit">Trimite</button>
            </form>
          ) : (
            <div>
              <button className="btnsMainProfesor btnscerere" onClick={() => handleDescarcaClickCerere()}>Descarcă cerere</button>
              <br/><br/>
              <button className="btnsMainProfesor btnscerere" onClick={() => handleAcceptClickCerere()}>Acceptă cerere</button>
              <br/><br/>
              <button className="btnsMainProfesor btnscerere" onClick={() => handleRefuseClickCerere()}>Refuză cerere</button>
            </div>
          )}
        </div>
      )}
          </div>
          <div className="col-md-4 mb-4 text-center custom-border">
            <h5 className="mt-3">Trimite sugestii pe mail</h5>
            <hr />
            <p className="stilizare">Completează și încarcă mail-ului</p>
            <img src="/gif/bird.gif" width="200" height="200" className="mb-4 mt-4" style={{ marginLeft: '10px' }} alt="gif" />
            <br /><br />
            <form ref={form} onSubmit={sendEmail}>
                <div className="form-group">
                    <label htmlFor="user_name">Nume</label>
                    <input type="text" name="user_name" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="user_email">Email</label>
                    <input type="email" name="user_email" className="form-control" />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="message">Mesaj</label>
                    <textarea name="message" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Trimite mail studentului</button>
              </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainProfesor;
