document.addEventListener("DOMContentLoaded",function(){
    const emailUtilizator = localStorage.getItem("emailUtilizator");
    const parolaUtilizator = localStorage.getItem("parolaUtilizator");
    const prenumeUtilizator= localStorage.getItem("prenumeUtilizator");
    const serieUtilizator=localStorage.getItem("serieUtilizator");
    const grupaUtilizator=localStorage.getItem("grupaUtilizator");
    const telefonUtilizator=localStorage.getItem("telefonUtilizator");
    const anInmatriculareUtilizator=localStorage.getItem("anInmatriculareUtilizator");
    const formaDeInvatamantUtilizator =  localStorage.getItem("formaDeInvatamantUtilizator");
    const anUtilizator=  localStorage.getItem("anUtilizator");
    const specializareUtilizator = localStorage.getItem("specializareUtilizator");

    // Setează valorile în input-urile corespunzătoare
    if (emailUtilizator) {
        document.getElementById("emailProfil").value = emailUtilizator;
    }
  
    if (parolaUtilizator) {
        document.getElementById("parolaProfil").value = parolaUtilizator;
    }
    if (prenumeUtilizator) {
      document.getElementById("prenume").value = prenumeUtilizator;
  }
  
  if (serieUtilizator) {
      document.getElementById("serie").value = serieUtilizator;
  }
  
  if (grupaUtilizator) {
      document.getElementById("grupa").value = grupaUtilizator;
  }
  
  if (telefonUtilizator) {
      document.getElementById("telefon").value = telefonUtilizator;
  }
  
  if (anInmatriculareUtilizator) {
      document.getElementById("anInmatriculare").value = anInmatriculareUtilizator;
  }
  
  if (formaDeInvatamantUtilizator) {
      document.getElementById("formaDeInvatamant").value = formaDeInvatamantUtilizator;
  }
  
  if (anUtilizator) {
      document.getElementById("an").value = anUtilizator;
  }
  
  if (specializareUtilizator) {
      document.getElementById("specializare").value = specializareUtilizator;
  }
    
});


function editeaza() {
    // Se obțin toate elementele input cu class-ul "mr-0"
    var inputElements = document.querySelectorAll('input.readonlyM');
    
    // Se parcurge fiecare element input și se schimbă atributul "readonly"
    inputElements.forEach(function(input) {
      input.removeAttribute('readonly');
    });
  }

  function salveazaAcum() {
    // Se obțin toate elementele input cu class-ul "mr-0"
    var inputElements = document.querySelectorAll('input.mr-0');
    
    // Se parcurge fiecare element input și se adaugă atributul "readonly"
    inputElements.forEach(function(input) {
      input.setAttribute('readonly', true);
    });
}

function afiseazaParola()
{
  if(document.getElementById("parolaProfil").type == "password")
  {
  document.getElementById("parolaProfil").type="text";
  return;
  }
  if(document.getElementById("parolaProfil").type == "text")
  {
  document.getElementById("parolaProfil").type="password";
  return;
  }
}

// const emailProfilElement = document.getElementById("emailProfil");
// const parolaProfilElement = document.getElementById("parolaProfil");
// export function seteazaEmailSiParola(email, parola) {
//   emailProfilElement.value = email;
//   parolaProfilElement.value = parola;
// }
