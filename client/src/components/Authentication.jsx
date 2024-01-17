import React from "react";
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';


const Authentication = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onFinish = async (e) => {
    e.preventDefault();

    const email = document.getElementById("emailAutentificare").value;
    const password = document.getElementById("parolaAutentificare").value;

    console.log(location.pathname);

    if( location.pathname === '/Authentication/Student')
    {
      try {
        const response = await axios.post('http://localhost:5000/validarePassword/Student', { email, password });
  
        if (response.data.validation) {
          alert("Logare cu succes");
          console.log(JSON.stringify(response.data, null, 2));
          navigate(`/MainStudent/Student/${response.data.user.Id}`, { state: { user: response.data.user, verificare:true } });
        } else {
          alert("Logare nereușită");
        }
      } catch (error) {
        console.error("Eroare în timpul autentificării:", error);
        alert("A apărut o eroare în timpul autentificării");
      }
    }
    else if(location.pathname === '/Authentication/Profesor')
    {
      try {
        const response = await axios.post('http://localhost:5000/validarePassword/Profesor', { email, password });
  
        if (response.data.validation) {
          alert("Logare cu succes");
          console.log(JSON.stringify(response.data, null, 2));
          navigate(`/MainProfesor/Profesor/${response.data.user.Id}`, { state: { user: response.data.user, verificare:true } });
        } else {
          alert("Logare nereușită");
        }
      } catch (error) {
        console.error("Eroare în timpul autentificării:", error);
        alert("A apărut o eroare în timpul autentificării");
      }
    }
   

  };

  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" />

      <form className="px-4 py-6 mx-auto text-center" onSubmit={onFinish}>
        <div className="form-group col-2 mx-auto text-center">
          <label htmlFor="etichetaMailAutentificare" className="mb-2 mt-5">Adresa de email:</label>
          <input type="email" className="form-control" id="emailAutentificare" placeholder="email@example.com" />
        </div>
        <div className="form-group col-2 mx-auto text-center">
          <label htmlFor="etichetaParolaAutentificare" className="mt-3">Parola:</label>
          <input type="password" className="form-control" id="parolaAutentificare" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary" id="ButonProfil">
          Autentificare
        </button>
      </form>
    </>
  );
};

export default Authentication;
