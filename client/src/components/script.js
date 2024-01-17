$(document).ready(function() {
    $('.dropright button').on("click", function(e) {
      e.stopPropagation();
      e.preventDefault();
  
      if (!$(this).next('div').hasClass('show')) {
        $(this).next('div').addClass('show');
      } else {
        $(this).next('div').removeClass('show');
      }
  
    });
  });
  function descarcaDocument (){
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
}

document.addEventListener("DOMContentLoaded", function() {
  var button = document.getElementById("ButonProfil");
  button.addEventListener("click", function () {
      var destination = button.getAttribute("data-href");
      window.open(destination, "_blank");
  });
});
