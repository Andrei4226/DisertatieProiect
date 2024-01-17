import React, { useState,useEffect} from 'react';
import '../styleMainStudent.css';
import { Link, useLocation } from 'react-router-dom';
import UserStudent from './UserStudent';
import Authentication from './Authentication';
import { useNavigate } from 'react-router-dom';

const MainStudent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.user;

   // State pentru a ține evidența valorii "numeTitluStudent"
   const [numeTitluStudent, setNumeTitluStudent] = useState('');
   const [profesori, setProfesori] = useState([]);
   const [showTextArea, setShowTextArea] = useState(false);
   const [message, setMessage] = useState(''); 
   const[showSolicitare, setShowSolicitare] = useState(false);
   const [solicitari, setSolicitari] = useState([]);
   const [showTextAreaCerere, setShowTextAreaCerere] = useState(false);
   const[showCerere, setShowCerere] = useState(false);
   const [cereri, setCereri] = useState([]);
   const [messageCerere, setMessageCerere] = useState(''); 

  const handleInchide = (e) => {
      e.preventDefault();
      setShowSolicitare(false);
      setShowTextArea(false);
  }

  const handleInchideCerere = (e) => {
    e.preventDefault();
    setShowCerere(false);
    setShowTextAreaCerere(false);
}

  const handleShowRaspunsuriSolicitariClick = () =>
  {
    setShowSolicitare(true);
    setShowTextArea(true);
  }

  const handleShowRaspunsuriCereriClick = () =>
  {
    setShowCerere(true);
    setShowTextAreaCerere(true);
  }



   // Folosirea useEffect pentru a actualiza valoarea după ce componenta s-a montat
   useEffect(() => {
     // Verificare pentru a evita eroarea în cazul în care userData este null sau undefined
     if (userData) {
       setNumeTitluStudent(userData.Nume);
     }

     const fetchProfesori = async () => {
      try {
        const response = await fetch('http://localhost:5000/profesori');
        const data = await response.json();
        setProfesori(data);
      } catch (error) {
        console.error('Eroare la obținerea datelor despre profesori:', error);
      }
    };

    const fetchRaspunsuri = async () => {
      
      try {
        const response = await fetch(`http://localhost:5000/solicitariStudent/${userData.Id}`);
        const data = await response.json();
        setSolicitari(data.solicitari);
      } catch (error) {
        console.error('Eroare la obținerea răspunsurilor pentru solicitări:', error);
      }
    };

    const fetchRaspunsuriCerere = async () => {
      
      try {
        const response = await fetch(`http://localhost:5000/cereriStudent/${userData.Id}`);
        const data = await response.json();
        setCereri(data.cereri);
      } catch (error) {
        console.error('Eroare la obținerea răspunsurilor pentru cereri:', error);
      }
    };

    const handleOptionClick = (value) => {
      console.log(`Selected option: ${value}`);
    };

    fetchProfesori();
    fetchRaspunsuri();
    fetchRaspunsuriCerere();
   }, [userData]); // Este dependent de userData

   const raspunsuriSolicitari = solicitari.map((solicitare) => ({
    value: solicitare.Mesaj,
    label: `Id solicitare: ${solicitare.IdSolicitare} si mesajul este: ${solicitare.Mesaj}`,
  }));

  const raspunsuriCereri = cereri.map((cerere) => ({
    value: cerere.IdCerere,
    label: `Id cerere: ${cerere.IdCerere} si mesajul este: ${cerere.Mesaj}`,
  }));
  
const handleTrimiteSolicitare = async () => {
  try {
    // IdProfesor trebuie să fie selectat din dropdown, IdStudent poate fi extras din URL
    const idProfesor = document.getElementById('one').value;  // sau poți utiliza starea componentei pentru a ține selecția
    const idStudent = userData.Id;  // Să presupunem că Id-ul studentului poate fi extras din userData
    const numeStudent = userData.Nume;
    const prenumeStudent = userData.Prenume;

    // StareSolicitare trebuie să fie 0, deoarece este o solicitare nouă
    const stareSolicitare = 0;

    // Perioada trebuie să fie selectată din dropdown
    const perioada = document.getElementById('two').value;  // sau poți utiliza starea componentei pentru a ține selecția
    
    // Trimite cererea POST la server
    const response = await fetch('http://localhost:5000/solicitari', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({idStudent, numeStudent,prenumeStudent,idProfesor,stareSolicitare, perioada }),
    });

    if (response.ok) {
      // Cererea a fost trimisă cu succes, poți adăuga aici orice acțiune suplimentară
      alert("Solicitarea a fost trimisă cu succes!");
    } else {
      // Cererea a întâmpinat o problemă
      alert("Eroare la trimiterea solicitării: " + response.statusText);
      
    }
  } catch (error) {
    alert("Eroare la trimiterea solicitării: " + error.message);
  }
};
  ////////////////////////////////

  const handleDownloadDocument = () => {
    // Implementați logica de descărcare a documentului aici
    // Apelați această funcție atunci când este apăsat butonul "Descarcă Document Word"
    // URL-ul direct de descărcare al documentului Word de pe Dropbox
    var linkDescarcare = "https://www.dropbox.com/scl/fi/l7hccsl0zkf9f8lopeakj/CERERE-ALEGERE-TEMA-Licenta-Disertatie-2024-RO.docx?rlkey=g82wosvcf0jyvi96wcocriatc&dl=1";

    // Creează un element ancoră
    var ancoraNoua = document.createElement("a");

    // Setează atributul href al ancărei către link-ul de descărcare
    ancoraNoua.href = linkDescarcare;

    // Setează atributul download al ancărei pentru a indica că este un link de descărcare
    ancoraNoua.download = "cerere_disertatie.docx";

    // Adaugă ancoră la corpul documentului (pentru a putea fi activată)
    document.body.appendChild(ancoraNoua);

    // Simulează un clic pe ancoră pentru a începe descărcarea
    ancoraNoua.click();

    // Elimină ancora după ce descărcarea a început
    document.body.removeChild(ancoraNoua);
  };
  const handleOpenUserProfile= ()=>{
    window.open('./UserStudent');
  };
  const handleOptionClick = (value) => {
    // Implementează logica pentru manipularea navigării sau altă acțiune
    console.log(`Selected option: ${value}`);
  };

  const [fileContent, setFileContent] = useState(null);
  
  const handleFileChange = (e) => {
    const fileInput = e.target;
    const file = fileInput.files[0];

    if (!file) {
      // Dacă utilizatorul nu a selectat un fișier
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;

      // Salvează conținutul fișierului în starea componentei
      setFileContent(content);

      // Exemplu: Afișează conținutul în consolă
      console.log('Conținutul fișierului:', content);
    };

    // Citirea conținutului fișierului
    reader.readAsText(file); // Sau poți utiliza readAsArrayBuffer pentru fișiere binare
  };

  // const handleIncarcaCerere = async (e) => {
  //   e.preventDefault();
  //   const idProfesor = document.getElementById('one').value;
  
  //   try {
  //     const fileInput = document.getElementById('fileInput');
  //     const file = fileInput.files[0];
  
  //     if (!file) {
  //       alert('Vă rugăm să selectați un fișier înainte de a încărca cererea.');
  //       return;
  //     }
  
  //     const formData = new FormData();
  //     formData.append('file', file);
  
  //     const response = await fetch(`http://localhost:5000/incarca-cerere/${userData.Id}`, {
  //       method: 'POST',
  //       body: formData,
  //     });
  
  //     if (response.ok) {
  //       alert('Cererea a fost actualizată cu succes!');
  //     } else {
  //       alert('Eroare la actualizarea cererii: ' + response.statusText);
  //     }
  //   } catch (error) {
  //     alert('Eroare la actualizarea cererii: ' + error.message);
  //   }
  // };

  const handleIncarcaCerere = async (e) => {
    e.preventDefault();
    const idProfesorInput = document.getElementById('one');
    const idProfesor = idProfesorInput.value;
  
    try {
      const fileInput = document.getElementById('fileInput');
      const file = fileInput.files[0];
  
      if (!file) {
        alert('Vă rugăm să selectați un fișier înainte de a încărca cererea.');
        return;
      }
  
      const formData = new FormData();
      formData.append('file', file);
      formData.append('idProfesor', idProfesor); // Adaugă idProfesor în FormData
  
      const response = await fetch(`http://localhost:5000/incarca-cerere/${userData.Id}`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        alert('Cererea a fost actualizată cu succes!');
      } else {
        alert('Eroare la actualizarea cererii: ' + response.statusText);
      }
    } catch (error) {
      alert('Eroare la actualizarea cererii: ' + error.message);
    }
};



  const handleButtonClick = () => {
    // Exemplu de utilizare a navigate
    navigate(`/UserStudent/${userData.Id}`, {
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
          <input type="text" id="numeTitluStudent" readOnly value={numeTitluStudent}/>
          <h3></h3>
          <img src="/gif/user-f.gif" width="122" height="122" className="d-inline-block align-top" alt="gif" />        </a>
      </nav>
        <div className="dropdown mr-auto text-center">
        <button className="btn btn-light" id="ButonAutentificare">
        <Link to="/Authentication/Student">Autentificare</Link>
      </button>
          <div className="dropdown-divider"></div>

          <button className="btn btn-light" href="#" onClick={handleShowRaspunsuriSolicitariClick}>
            Răspunsurile la solicitarile mele
          </button>

          {showSolicitare && (
        <div className="popup">
          {showTextArea ? (
            <form>
              <label>
                
                <br></br>
                <textarea
                  value={raspunsuriSolicitari.map((rasp) => rasp.label).join('\n')}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="8"
                  cols="50"
                />
              </label>
              <br></br>
              <button type="submit" onClick={handleInchide}>Închide</button>
            </form>
          ) : console.log("nu exista")}
        </div>
      )}

      <br></br><br></br>
          <button className="btn btn-light" href="#" onClick={handleShowRaspunsuriCereriClick}>
            Răspunsurile la cererile mele
          </button>

          {showCerere && (
        <div className="popup">
          {showTextAreaCerere ? (
            <form>
              <label>
                <br></br>
                <textarea
                  value={raspunsuriCereri.map((cer) => cer.label).join('\n')}
                  onChange={(e) => setMessageCerere(e.target.value)}
                  rows="8"
                  cols="50"
                />
              </label>
              <br></br>
              <button type="submit" onClick={handleInchideCerere}>Închide</button>
            </form>
          ) : console.log("nu exista")}
        </div>
      )}
          <br></br>
          <br></br>
          <button className="btn btn-light" id="ButonProfil" onClick={handleButtonClick}>
              Profil
          </button>
          <br></br><br></br>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4 mb-4 text-center custom-border">
              <h5 className="mt-3">Alege profesorul dorit</h5>
              <hr />
              <p className="stilizare">Profesori disponibili</p>
              <br />
              <img src="/images/teacher-removebg-preview.png" width="200" height="200" className="mb-4" style={{ marginLeft: '80px' }} alt="profesorul" />
              <select id="one" onChange={(e) => handleOptionClick(e.target.value)}>
                      {profesori.map((profesor) => (
                        <option key={profesor.Id} value={profesor.Id}>
                                    {profesor.Nume} {profesor.Prenume}
                        </option>
                    ))}
              </select>
              <br /><br />
              <select id="two" onChange={(e) => handleOptionClick(e.target.value)}>
                  <option value="Ianuarie - Februarie">Ianuarie - Februarie</option>
                  <option value="Iunie - August">Iunie - August</option>
              </select>
              <br /><br /><br />
              <button className="btnsMainStudent" id = "btnTrmiteSolicitare" onClick={handleTrimiteSolicitare}>Trimite solicitare</button>
            </div>
            <div className="col-md-4 mb-4 text-center custom-border">
              <h5 className="mt-3">Descarcă cererea</h5>
              <hr />
              <p className="stilizare">Cererea trebuie descărcată și completată</p>
              <br /><br />
              <img src="/images/download-icon.png" width="200" height="200" className="mb-4" style={{ marginLeft: '20px' }} alt="download-doc" />
              <button className="btnsMainStudent" onClick={handleDownloadDocument}>Descarcă Document Word</button>
              <br /><br /><br />
            </div>
            <div className="col-md-4 mb-4 text-center custom-border">
              <h5 className="mt-3">Încarcă cererea</h5>
              <hr />
              <p className="stilizare">Trimite cererea completată către profesor</p>
              <img src="/gif/bird.gif" width="200" height="200" className="mb-4 mt-4" style={{ marginLeft: '10px' }} alt="gif" />
              <br /><br />
              
              
              <input id="fileInput" type="file" style={{ marginLeft: '50px' }}  className="mb-3 mt-3" onChange={handleFileChange} />
              <button className="btnsMainStudent" onClick={handleIncarcaCerere}>Încarcă cererea</button>
            </div>
          </div>
        </div>
    </>
  );
};

export default MainStudent;
