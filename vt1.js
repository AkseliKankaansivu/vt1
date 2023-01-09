"use strict";
//@ts-check 
// Joukkueen sarja on viite data.sarjat-taulukossa lueteltuihin sarjoihin
// Joukkueen rastileimausten rastit ovat viitteitä data.rastit-taulukossa lueteltuihin rasteihin

// Kirjoita tästä eteenpäin oma ohjelmakoodisi

/**
  * Taso 1
  * Järjestää leimaustavat aakkosjärjestykseen 
  * isoilla ja pienillä kirjaimilla ei ole järjestämisessä merkitystä
  * Alkuperäistä rakennetta ei muuteta vaan järjestäminen tehdään alkup. taulukon kopiolle.
  * @param {Object} data - tietorakenne, jonka data.rastit-taulukko järjestetään 
  * @return {Array} palauttaa järjestetyn _kopion_ data.leimaustavat-taulukosta
*/
function jarjestaLeimaustavat(data) {
  // kopioidaan array uuteen taulukkoon
  let datakopio = Array.from(data.leimaustavat);
  datakopio.sort();
  return datakopio;
}

/**
  * Taso 1
  * Järjestää sarjat aakkosjärjestykseen sarjan nimen perustella 
  * isoilla ja pienillä kirjaimilla ei ole järjestämisessä merkitystä
  * Alkuperäistä rakennetta ei muuteta vaan järjestäminen tehdään alkup. taulukon kopiolle.
  * @param {Object} data - tietorakenne, jonka data.rastit-taulukko järjestetään 
  * @return {Array} palauttaa järjestetyn _kopion_ data.sarjat-taulukosta
  */

function jarjestaSarjat(data) {
  let datakopio = Array.from(data.sarjat);
  datakopio.sort(function (a, b) {
    return a.kesto - b.kesto;
  });
  return datakopio;
}

/**
  * Taso 1
  * Lisää uuden sarjan data-rakenteeseen ja palauttaa muuttuneen datan
  * Sarja lisätään vain jos kaikki seuraavat ehdot täyttyvät:
  *  - Toista samannimistä sarjaa ei ole olemassa. Nimien vertailussa
  *    ei huomioida isoja ja pieniä kirjaimia tai nimen alussa ja lopussa välilyöntejä etc. (whitespace)
  *    sarjan nimi ei voi olla pelkkää whitespacea. 
  * - Sarjan keston täytyy olla kokonaisluku ja suurempi kuin 0
  *  Uusi sarja tallennetaan data.sarjat-taulukkoon. Sarjan on oltava seuraavaa muotoa:
  *  {
  *     "id": {Number}, // Jokaisella sarjalle oleva uniikki kokonaislukutunniste, pakollinen tieto
  *     "nimi": {String}, // Sarjan uniikki nimi, pakollinen tieto
  *     "kesto": {Number}, // sarjan kesto tunteina, pakollinen tieto
  *     "alkuaika": {String}, // Sarjan alkuaika, oletuksena ""
  *     "loppuaika": {String}, // Sarjan loppuaika, oletuksena ""
  *  }
  * @param {Object} data - tietorakenne johon sarja lisätään 
  * @param {String} nimi - Lisättävän sarjan nimi
  * @param {String} kesto - Sarjan kesto
  * @param {String} alkuaika - Sarjan alkuaika, ei pakollinen
  * @param {String} loppuaika - Sarjan loppuaika, ei pakollinen
  * @return {Object} palauttaa muutetun alkuperäisen data-tietorakenteen
  */
function lisaaSarja(data, nimi, kesto, alkuaika, loppuaika) {
  //tarkistetaan, onko sarjan nimi jo varattu
  for (let j = 0;j<data.sarjat.length;j++){
    let ntarkistin = nimi;
    ntarkistin = ntarkistin.replace(/\s/g, "");
    ntarkistin = ntarkistin.toUpperCase();
    let mtarkistin = data.sarjat[j].nimi;
    mtarkistin = mtarkistin.replace(/\s/g, "");
    mtarkistin = mtarkistin.toUpperCase();
  if (mtarkistin == ntarkistin) {
    console.log("sarja ei sallittu, nimi on jo varattu");
    return data;
  }
  }
  //tarkistetaan, onko nimi tyhjä tai pelkkää whitespacea
  if (!nimi.replace(/\s/g, '').length) {
    console.log("sarja ei sallittu, nimi ei voi olla vain välilyöntejä tai tyhjä");
    return data;
  }
  //tarkistetaan onko annettu kesto sallittu
  if (!kesto || kesto == 0) {
    console.log("Kesto ei voi olla nolla tai tyhjä!");
    return data;
  }
  //katsotaan, onko kesto ilmoitettu kokonaislukuna
  if (kesto.includes('.') || kesto.includes(',') || isNaN(kesto)) {
    console.log("Ilmoita kesto kokonaislukuna!");
    return data;
  }
  //lisätään uusi sarja data.sarjat taulukkoon uudella ID numerolla
  //Varmistetaan, ettei tule samaa ID lukua sarjoille
  let i = data.sarjat.length-1;
  let uusiId = data.sarjat[i].id+1;
  for (let j=0;j<data.sarjat.length;j++) {
    if (data.sarjat[j].id == uusiId) {
      console.log("Tapahtui virhe, yritä uudelleen");
    }
  }
  let uusi = {
    "nimi" : nimi, "kesto" : parseInt(kesto), "id" : uusiId, "alkuaika" : alkuaika, "loppuaika" : loppuaika
  };
  console.log(data.sarjat);
  data.sarjat.push(uusi);
  return data;
}

/**
  * Taso 1
  * Poistaa joukkueen id:n perusteella data-rakenteesta ja palauttaa muuttuneen datan
  * @param {Object} data - tietorakenne josta joukkue poistetaan
  * @param {String} id - poistettavan joukkueen id
  * @return {Object} palauttaa muuttuneen alkuperäisen datan
  */
function poistaJoukkue(data, id) {
  for (let i=0;i<data.joukkueet.length;i++){
    if (data.joukkueet[i].id == id) {
    let index = i;
    data.joukkueet.splice(index,1);
    }
  }
  return data;
}

/**
  * Taso 3
  * Järjestää rastit aakkosjärjestykseen rastikoodin perustella siten, että 
  * numeroilla alkavat rastit ovat kirjaimilla alkavien jälkeen. Alkuperäistä 
  * rakennetta ei muuteta vaan järjestäminen tehdään alkup. taulukon kopiolle.
  * isoilla ja pienillä kirjaimilla ei ole järjestämisessä merkitystä
  * @param {Object} data - tietorakenne, jonka data.rastit-taulukko järjestetään 
  * @return {Array} palauttaa järjestetyn _kopion_ data.rastit-taulukosta
  */
function jarjestaRastit(data) {
  let rastitkopio = Array.from(data.rastit);
  //sortataan numerot ensimmäiski järjestykseen ja kirjaimet toiseksi järjestykseen
  rastitkopio.sort(function(a, b) {
    if (isNaN(a.koodi.charAt(0).toUpperCase()) && !isNaN(b.koodi.charAt(0).toUpperCase())) {
        return -1;
    }
    if (!isNaN(a.koodi.charAt(0).toUpperCase()) && isNaN(b.koodi.charAt(0).toUpperCase())) {
        return 1;
    }
    if (a.koodi.toUpperCase() < b.koodi.toUpperCase()) {
      return -1;
    }
    if (a.koodi.toUpperCase() > b.koodi.toUpperCase()) {
      return 1;
    }
    return 0;
  });
  return rastitkopio;
}
/**
  * Taso 3
  * Lisää joukkueen data-rakenteeseen ja palauttaa muuttuneen datan
  * Joukkue lisätään vain jos kaikki seuraavat ehdot täyttyvät:
  *  - Toista samannimistä joukkuetta ei ole olemassa. Nimien vertailussa
  *    ei huomioida isoja ja pieniä kirjaimia tai nimen alussa ja lopussa välilyöntejä etc. (whitespace)
  *    Joukkueen nimi ei voi olla pelkkää whitespacea. 
  *  - Leimaustapoja on annettava vähintään yksi kappale. Leimaustapojen
  *     on löydyttävä data.leimaustavat-taulukosta
  *  - Jäseniä on annettava vähintään kaksi kappaletta. 
  *  - Saman joukkueen jäsenillä ei saa olla kahta samaa nimeä
  *  - Sarjan id on löydyttävä data.sarjat-taulukon sarjoista
  *
  *  Uusi joukkue tallennetaan data.joukkueet-taulukkoon. Joukkueen on oltava seuraavaa muotoa:
  *  {
  *     "id": {Number}, // jokaisella joukkueella oleva uniikki kokonaislukutunniste
  *     "nimi": {String}, // Joukkueen uniikki nimi
  *     "jasenet": {Array}, // taulukko joukkueen jäsenien nimistä
  *     "leimaustapa": {Array}, // taulukko joukkueen leimaustapojen indekseistä (data.leimaustavat)
  *     "rastileimaukset": {Array}, // taulukko joukkueen rastileimauksista. Oletuksena tyhjä eli []
  *     "sarja": {Object}, // viite joukkueen sarjaan, joka löytyy data.sarjat-taulukosta
  *     "pisteet": {Number}, // joukkueen pistemäärä, oletuksena 0
  *     "matka": {Number}, // joukkueen kulkema matka, oletuksena 0
  *     "aika": {String}, // joukkueen käyttämä aika "h:min:s", oletuksena "00:00:00"
  *  }
  * @param {Object} data - tietorakenne johon joukkue lisätään 
  * @param {String} nimi - Lisättävän joukkueen nimi
  * @param {Array} leimaustavat - Taulukko leimaustavoista
  * @param {String} sarja - Joukkueen sarjan id-tunniste
  * @param {Array} jasenet - joukkueen jäsenet
  * @return {Object} palauttaa muutetun alkuperäisen data-tietorakenteen
  */
function lisaaJoukkue(data, nimi, leimaustavat, sarja, jasenet) {
  //katsotaan, onko joukkueen nimi tyhjä
  if (/\S/.test(nimi) == false) {
    console.log("nimi on tyhjä");
    return data;
  }
  // tarkistetaan, että tämän nimistä joukkuetta ei ole
  for (let j = 0;j<data.joukkueet.length;j++){
    let ntarkistin = nimi;
    ntarkistin = ntarkistin.replace(/\s/g, "");
    ntarkistin = ntarkistin.toUpperCase();
    let mtarkistin = data.joukkueet[j].nimi;
    mtarkistin = mtarkistin.replace(/\s/g, "");
    mtarkistin = mtarkistin.toUpperCase();
  if (mtarkistin == ntarkistin) {
    console.log("Joukkue ei sallittu, nimi on jo varattu");
    return data;
  }
}

// tarkistetaan, että jäseniä on vähintään kaksi
for (let k = 0;k<2;k++) {
  if (/\S/.test(jasenet[k]) == false) {
    console.log("Jasenen nimi ei voi olla tyhjä, varmista että vähintään kaksi jäsentä");
    return data;
}
// tarkistetaan, että jäsenillä on uniikit nimet
if (jasenet.some((a, b) => jasenet.indexOf(a) !== b) == true) {
    console.log("jäsenillä samat nimet");
    return data;
}
}
// Poistetaan ylimääräinen tyhjä jäsen
for (let k = 0;k<jasenet.length;k++) {
  if (/\S/.test(jasenet[k]) == false) {
    jasenet.splice(k,1);
  }
}
//tarkistetaan, että leimaustavoista on valittu jokin sallituista
let tarkista = leimaustavat.some(r=> data.leimaustavat.includes(r));
  if (!tarkista) {
    console.log("laiton leimaustapa");
    return data;
  }

//oletetaan, että leimaustavat ovat aina samat, tarkistetaan dataan lisättävät leimaustavat
let palautusleimat = [];
if (leimaustavat.includes("GPS")) {
  palautusleimat.push(data.leimaustavat.indexOf("GPS"));
}
if (leimaustavat.includes("Lomake")) {
  palautusleimat.push(data.leimaustavat.indexOf("Lomake"));
}
if (leimaustavat.includes("NFC")) {
  palautusleimat.push(data.leimaustavat.indexOf("NFC"));
}
if (leimaustavat.includes("QR")) {
  palautusleimat.push(data.leimaustavat.indexOf("QR"));
}
// etsitään sarjan id:n mukaan oikea sarja  
  let sarjaindex = 0;
  for (let k = 0;k<data.sarjat.length;k++) {
    if (data.sarjat[k].id == sarja) {
      sarjaindex = k;
    }
  }
  // luodaan uusi joukkue
  // Varmistetaan, ettei tule kahdelle joukkueelle sama ID
  let uusiId = haeUusiID(data);

  let uusi = {
    "id" : uusiId,  "jasenet" : jasenet, "nimi" : nimi,  "leimaustapa" : palautusleimat, "rastileimaukset" : [], "sarja" : data.sarjat[sarjaindex], "pisteet" : 0, "matka" : 0, "aika" : "00:00:00" 
  };
  data.joukkueet.push(uusi);
  return data;
}

function haeUusiID(data) {
  let id = Math.floor(Math.random()*10000000000000000);
    for (let i=0;i<data.joukkueet.length;i++) {
      if (data.joukkueet[i].id == id) {
        id = haeUusiID(data);
      }
    }
    return id;
}
/**
  * Taso 3
  * Laskee joukkueen käyttämän ajan. Tulos tallennetaan joukkue.aika-ominaisuuteen.
  * Matka lasketaan viimeisestä LAHTO-rastilla tehdystä leimauksesta alkaen aina
  * ensimmäiseen MAALI-rastilla tehtyyn leimaukseen asti. Leimauksia jotka tehdään
  * ennen lähtöleimausta tai maalileimauksen jälkeen ei huomioida.
  * @param {Object} joukkue
  * @return {Object} joukkue
  */
function laskeAika(joukkue) {
  //palautetaan joukkue jos rastileimauksia ei ole
  if (joukkue.rastileimaukset.length == 0) {
    return joukkue;
  }
  let indeksi = 0;
  let indeksi2 = 0;
  for (let i=0;i<joukkue.rastileimaukset.length;i++) {
    //tarkistetaan ettei rasteissa ole virheitä
    if (typeof joukkue.rastileimaukset[i].rasti == 'undefined') 
    {
      return;
    }
    //Varmistetaan, että lahtörasti on ensimmäinen
    if (joukkue.rastileimaukset[i].rasti.koodi == "LAHTO" && indeksi == 0) {
      indeksi = i;
    }
  }
  let aloitusaika = joukkue.rastileimaukset[indeksi].aika;
  for (let i=0;i<joukkue.rastileimaukset.length;i++) {
    if (joukkue.rastileimaukset[i].rasti.koodi == "MAALI") {
      indeksi2 = i;

    }
  }
  // lasketaan kellonaika käyttäen date datatypeä apuna
  let paatosaika = joukkue.rastileimaukset[indeksi2].aika;
  let aikaI = new Date(aloitusaika);
  let aH = aikaI.getHours();
  let aMin = aikaI.getMinutes();
  let aSec = aikaI.getSeconds();

  let aikaJ = new Date(paatosaika);
  let pH = aikaJ.getHours();
  let pMin = aikaJ.getMinutes();
  let pSec = aikaJ.getSeconds();

  pSec = pSec - aSec;
  if(pSec < 0) {
    pMin = pMin - 1;
    pSec = pSec + 60;
  } 

  pMin = pMin - aMin;
  if(pMin - aMin < 0) {
    pH = pH - 1;
    pMin = pMin + 60;
  }

  pH = pH - aH;

  //Luodaan string kellon ajalle
  let loppuAika = pH + ":" + pMin + ":" + pSec;
  //asetetaan joukkue.aika-ominaisuuteen
  joukkue.aika = loppuAika;
  return joukkue;
}

/**
  * Taso 3 ja Taso 5
  *  Järjestää joukkueet järjestykseen haluttujen tietojen perusteella
  *  järjestetään ensisijaisesti kasvavaan aakkosjärjestykseen 
  *  Järjestäminen on tehtävä alkuperäisen taulukon kopiolle
  *  mainsort-parametrin mukaisen tiedon perusteella
  *  Joukkueen jäsenet järjestetään aina aakkosjärjestykseen
  *  Joukkueen leimaustavat järjestetään myös aina aakkosjärjestykseen leimastapojen nimien mukaan
  *  Isoilla ja pienillä kirjaimilla ei ole missään järjestämisissä merkitystä eikä myöskään alussa tai lopussa olevalla whitespacella
  *  sortorder-parametrin käsittely vain tasolla 5
  *  jos sortorder-parametrina on muuta kuin tyhjä taulukko, käytetään 
  *  sortorderin ilmoittamaa järjestystä eikä huomioida mainsort-parametria: 
  *  ensisijaisesti järjestetään taulukon ensimmäisen alkion tietojen perusteella, 
  *  toissijaisesti toisen jne.
  *  sortorder-taulukko sisältää objekteja, joissa kerrotaan järjestysehdon nimi (key),
  *  järjestyssuunta (1 = nouseva, -1 = laskeva) ja järjestetäänkö numeerisesti (true)
  *  vai aakkosjärjestykseen (false)
  *	 sortorder = [
  *	 {"key": "sarja", "order": 1, "numeric": false},
  *	 {"key": "nimi", "order": 1, "numeric": false},
  *	 {"key": "matka", "order": -1, "numeric": true},
  *	 {"key": "aika", "order": 1, "numeric": false},
  *	 {"key": "pisteet", "order": -1, "numeric": true}
  *	]
  * @param {Object} data - tietorakenne, jonka data.rastit-taulukko järjestetään 
  * @param {String} mainsort - ensimmäinen (ainoa) järjestysehto, joka voi olla nimi, sarja, matka, aika tai pisteet  TASO 3
  * @param {Array} sortorder - mahdollinen useampi järjestysehto TASO 5
  * @return {Array} palauttaa järjestetyn ja täydennetyn _kopion_ data.joukkueet-taulukosta
  */
function jarjestaJoukkueet(data, mainsort="nimi", sortorder=[] ) {
  let datakopio = Array.from(data.joukkueet);
  //pushataan järjestys-taulukkoon leimaustapojen indeksit oikeaan järjestykseen
  let leimaustavatK = Array.from(data.leimaustavat);
  let jarjestys = [];
  //Käydään jokaisen leimaustavan kohdalla koko data.leimaustavat läpi, jotta löydetään oikea indeksi
  for (let k=0;k<leimaustavatK.length;k++) {
    if (leimaustavatK[k] == "GPS") {
      jarjestys.push(data.leimaustavat.indexOf("GPS"));
    }
  }
  for (let k=0;k<leimaustavatK.length;k++) {
    if (leimaustavatK[k] == "Lomake") {
      jarjestys.push(data.leimaustavat.indexOf("Lomake"));
    }
  }
  for (let k=0;k<leimaustavatK.length;k++) {
    if (leimaustavatK[k] == "NFC") {
      jarjestys.push(data.leimaustavat.indexOf("NFC"));
    }
  }  
  for (let k=0;k<leimaustavatK.length;k++) {
    if (leimaustavatK[k] == "QR") {
      jarjestys.push(data.leimaustavat.indexOf("QR"));
    }
  }
  for (let i=0;i<datakopio.length;i++) {
    datakopio[i].jasenet.sort();
  }
  //järjestetään leimastapa jarjestys-taulukon antamaan aakkosjärjestykseen
  for (let i=0;i<datakopio.length;i++) {
    datakopio[i].leimaustapa.sort((a,b) => jarjestys.indexOf(a) - jarjestys.indexOf(b));
  }
  //sortataan mainsortin arvon mukaan koko array
  if (mainsort == "nimi") {
  datakopio.sort((a,b)=> (a.nimi.toUpperCase() > b.nimi.toUpperCase() ? 1 : -1));
  }
  if (mainsort == "sarja") {
    datakopio.sort((a,b)=> (a.sarja.kesto > b.sarja.kesto ? 1 : -1));
  }
  if (mainsort == "matka") {
    datakopio.sort((a,b)=> (a.matka > b.matka ? 1 : -1));
  }
  if (mainsort == "aika") {
    datakopio.sort((a,b)=> (a.aika > b.aika ? 1 : -1));
  }
 
  return datakopio;
}

/**
  * Taso 5
  * Laskee joukkueen kulkeman matkan. Matka tallennetaan joukkue.matka-ominaisuuteen
  * Laske kuinka pitkän matkan kukin joukkue on kulkenut eli laske kunkin rastivälin
  * pituus ja laske yhteen kunkin joukkueen kulkemat rastivälit. Jos rastille ei löydy
  * sijaintitietoa (lat ja lon), niin kyseistä rastia ei lasketa matkaan mukaan. Matka
  * lasketaan viimeisestä LAHTO-rastilla tehdystä leimauksesta alkaen aina
  * ensimmäiseen MAALI-rastilla tehtyyn leimaukseen asti. Leimauksia jotka tehdään
  * ennen lähtöleimausta tai maalileimauksen jälkeen ei huomioida.
  * Käytä annettua apufunktiota getDistanceFromLatLonInKm
  * @param {Object} joukkue
  * @return {Object} joukkue
  */
function laskeMatka(joukkue) {
  return joukkue;
}

/**
  * Taso 5
  * Laskee joukkueen saamat pisteet. Pistemäärä tallennetaan joukkue.pisteet-ominaisuuteen
  * Joukkue saa kustakin rastista pisteitä rastin koodin ensimmäisen merkin
  * verran. Jos rastin koodi on 9A, niin joukkue saa yhdeksän (9) pistettä. Jos rastin
  * koodin ensimmäinen merkki ei ole kokonaisluku, niin kyseisestä rastista saa nolla
  * (0) pistettä. Esim. rasteista LÄHTÖ ja F saa 0 pistettä.
  * Samasta rastista voi sama joukkue saada pisteitä vain yhden kerran. Jos
  * joukkue on leimannut saman rastin useampaan kertaan lasketaan kyseinen rasti
  * mukaan pisteisiin vain yhden kerran.
  * Rastileimauksia, jotka tehdään ennen lähtöleimausta tai maalileimauksen jälkeen, ei
  * huomioida.
  * Maalileimausta ei huomioida kuin vasta lähtöleimauksen jälkeen.
  * Jos joukkueella on useampi lähtöleimaus, niin pisteet lasketaan vasta
  * viimeisen lähtöleimauksen jälkeisistä rastileimauksista.
  * Joukkue, jolla ei ole ollenkaan rastileimauksia, saa 0 pistettä
  * @param {Object} joukkue
  * @return {Object} joukkue
  */
function laskePisteet(joukkue) {
  return joukkue;
}



// apufunktioita tasolle 5
/**
  * Laskee kahden pisteen välisen etäisyyden
  */
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  let R = 6371; // Radius of the earth in km
  let dLat = deg2rad(lat2-lat1);  // deg2rad below
  let dLon = deg2rad(lon2-lon1);
  let a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  let d = R * c; // Distance in km
  return d;
}
/**
   Muuntaa asteet radiaaneiksi
  */
function deg2rad(deg) {
  return deg * (Math.PI/180);
}

