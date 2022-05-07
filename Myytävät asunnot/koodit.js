"use strict";

// Konstruktori Asunto-olioille

function Asunto(
  kohdenumero,
  katuosoite,
  postinumero,
  postitoimipaikka,
  hinta,
  pintaAla
) {
  this.kohdenumero = kohdenumero;
  this.katuosoite = katuosoite;
  this.postinumero = postinumero;
  this.postitoimipaikka = postitoimipaikka;
  this.hinta = hinta;
  this.pintaAla = pintaAla;
  this.laskeNelioHinta = function () {
    return (this.hinta / this.pintaAla).toFixed(2);
  };
}

let asunnot = [];

// Funktio hakee tietokannan koon näkyviin, kun sivu latautuu.

function haeTietokannanKoko() {
  document.getElementById("tulostusalue_syotto").innerHTML =
    "Asuntojen määrä tietokannassa: " + asunnot.length;
}

// Funktio tarkastaa, että kaikki asunnon tiedot on syötetty kenttiin (kaikissa on yli 0 merkkiä
// ja postinumero, hinta ja pinta-ala ovat numeroita). Jos nämä ok, lisätään olio listaan funktiolla lisaaAsunto().
// Kun tiedot tarkastettu ja lisätty ja kentät tyhjennetty seuraavaa syöttöä varten,
// funktio palauttaa "True". Jos tietoja puuttuu, tulee virheilmoitus.

function tarkastaSyotetytTiedot() {
  let kohdenumero = document.getElementById("kohdenumero").value;
  let katuosoite = document.getElementById("katuosoite").value;
  let postinumero = document.getElementById("postinumero").value;
  let postitoimipaikka = document.getElementById("postitoimipaikka").value;
  let hinta = document.getElementById("hinta").value;
  let pintaAla = document.getElementById("pintaAla").value;
  if (
    isNaN(kohdenumero) == false &&
    Array.from(katuosoite).length > 0 &&
    Array.from(postinumero).length == 5 &&
    isNaN(postinumero) == false &&
    Array.from(postitoimipaikka).length > 0 &&
    isNaN(hinta) == false &&
    isNaN(pintaAla) == false
  ) {
    lisaaAsunto(
      kohdenumero,
      katuosoite,
      postinumero,
      postitoimipaikka,
      hinta,
      pintaAla
    );
    document.getElementById("kohdenumero").value = "";
    document.getElementById("katuosoite").value = "";
    document.getElementById("postinumero").value = "";
    document.getElementById("postitoimipaikka").value = "";
    document.getElementById("hinta").value = "";
    document.getElementById("pintaAla").value = "";
    return true;
  } else {
    document.getElementById("tulostusalue_syotto").innerHTML =
      "Virhe! Tarkista viimeksi syöttämäsi tiedot.";
  }
}

// Funktio lisää asunnon listaan.

function lisaaAsunto(
  kohdenumero,
  katuosoite,
  postinumero,
  postitoimipaikka,
  hinta,
  pintaAla
) {
  let asunto = new Asunto(
    kohdenumero,
    katuosoite,
    postinumero,
    postitoimipaikka,
    hinta,
    pintaAla
  );
  asunnot.push(asunto);
  document.getElementById("tulostusalue_syotto").innerHTML =
    "Asuntojen määrä tietokannassa: " + asunnot.length;
}

// Funktio hakee asuntoja listasta ja lisää löytyneet listaan "hakutulokset".

function haeAsuntoja() {
  let hakutulokset = [];
  let haku_kohdenumero = document.getElementById("hae_kohdenumero").value;
  let haku_postitoimipaikka = document.getElementById(
    "hae_postitoimipaikka"
  ).value;

  if (Array.from(haku_kohdenumero).length > 0) {
    // Jos hakukenttään on syötetty jotain...
    hakutulokset = asunnot.filter(function (asunto) {
      // filtteröidään lista haetulla kohdenumerolla
      return asunto.kohdenumero == haku_kohdenumero; // funktio palauttaa muuttujaan "hakutulokset" listan, jossa vain asunnot, joilla haettu kohdenro
    });
  }

  if (Array.from(haku_postitoimipaikka).length > 0) {
    if (hakutulokset.length > 0) {
      // jos hakutulokset-listassa on jo jotain, kohdistetaan filtteröinti siihen
      hakutulokset = hakutulokset.filter(function (asunto) {
        return asunto.postitoimipaikka == haku_postitoimipaikka; //haetaan mätsit haetun postitoimipaikan mukaan ja sijoitetaan mätsäävät asunnot listaan "hakutulokset"
      });
    } else {
      // jos hakutulokset lista on vielä tyhjä...
      hakutulokset = asunnot.filter(function (asunto) {
        // filtteröidään elokuvat-listaa haetulla ohjaajan nimellä
        return asunto.postitoimipaikka == haku_postitoimipaikka;
      });
    }
  }

  if (hakutulokset.length > 0) {
    // lopuksi, jos hakutuloksiin on löytynyt asuntoja,
    tulostaAsunnot(hakutulokset); // tulostetaan hakua vastaavat asunnot funktiolla tulostaAsunnot()
  }

  // jos hakutuloksia ei löydy, tulostetaan tieto käyttäjälle
  if (hakutulokset.length == 0) {
    document.getElementById("tulostusalue_haunTulokset").innerHTML =
      "Hakua vastaavia asuntoja ei löydy.";
  }

  // tyhjennetään hakukentät uutta hakua varten
  document.getElementById("hae_kohdenumero").value = "";
  document.getElementById("hae_postitoimipaikka").value = "";
}

// Haulla löytyneiden asuntojen tietojen tulostaminen.

function tulostaAsunnot(lista) {
  const alue = document.getElementById("tulostusalue_haunTulokset");
  alue.innerHTML = "";
  for (let i = 0; i < lista.length; i++) {
    alue.append(`Kohdenumero: ${lista[i].kohdenumero}`);
    let br = document.createElement("br");
    alue.append(br);
    alue.append(`Katuosoite: ${lista[i].katuosoite}`);
    br = document.createElement("br");
    alue.append(br);
    alue.append(`Postinumero: ${lista[i].postinumero}`);
    br = document.createElement("br");
    alue.append(br);
    alue.append(`Postitoimipaikka: ${lista[i].postitoimipaikka}`);
    br = document.createElement("br");
    alue.append(br);
    alue.append(`Hinta: ${lista[i].hinta} €`);
    br = document.createElement("br");
    alue.append(br);
    alue.append(`Pinta-ala: ${lista[i].pintaAla} m2`);
    br = document.createElement("br");
    alue.append(br);
    alue.append(`Neliöhinta: ${lista[i].laskeNelioHinta()} €/m2`);
    br = document.createElement("br");
    alue.append(br);
    br = document.createElement("br");
    alue.append(br);
  }
}
