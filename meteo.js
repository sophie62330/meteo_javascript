let coordonnees=document.querySelector("#coordonnees");
let btnAfficher=document.querySelector("#btnAfficher");
let ville=document.querySelector("#ville");
let conteneur=document.querySelector("#conteneur");

//const url="https://api.openweathermap.org/data/2.5/forecast?q="+ville.value+"&appid=fdeb03a660ccc55089b3aa10f588132e";

 const afficherMeteo = () => {
    while (conteneur.childNodes.length>0){
        conteneur.firstChild.remove();
    }
    //construction de l'url et appel de l'api de météo
    fetch("https://api.openweathermap.org/data/2.5/forecast?q="+ville.value+"&appid=fdeb03a660ccc55089b3aa10f588132e&units=metric&lang=fr")
        .then(fetchMeteoOK,fetchMeteoNop)
        .then(trtMeteoJson)
        .catch( err => {
            console.log(err)
        })
}

/**
 * fonction qui traite la reponse du fetch demandé à la meteo api si elle est ok
 * @param {*} reponse 
 * @returns la reponse au format json
 */
const fetchMeteoOK = (reponse) => {
    console.log("fetch ok");
    return reponse.json();
}

/**
 * fonction qui traite la reponse du fetch demandé à la meteo api si elle est pas ok
 * @param {*} err 
 */
const fetchMeteoNop = (err) => {
    console.log(err);
}

/**
 * fonction qui va chercher les infos de météo des 5 prochains jours toutes les 3h et les intégrent au html
 */
const trtMeteoJson = (json) => {
    console.log(json);
    let meteo=json;
    let city=meteo.city;

    let listeMeteo=meteo.list;
    listeMeteo.forEach(element => {
        //Récupération des données voulues
        let jourHeure=element.dt_txt;
        let temperature=Math.round(element.main.temp);
        let meteoPrevue=element.weather[0].description;
        let vitesse_vent=Math.round(element.wind.speed);
        let icon=element.weather[0].icon;
        let img = document.createElement('img');
        img.src='http://openweathermap.org/img/wn/'+ icon+'.png'

        //ajout du code HTLM
        conteneur.innerHTML=conteneur.innerHTML
        +"<div class='tuile'><h2>"+formatterDateHeureEnDate(jourHeure)+" "+formatterDateHeureEnHeure(jourHeure)+"</h2>"
            +"<div id='conteneurInfos'>"
                +"<div>"
                    +"<br>"
                    +"<br>"
                    +"Vitesse vent : "+vitesse_vent+"km/h<br>"
                    +meteoPrevue+" ("+temperature+" °C)<br><br>"
                    
                +"</div>"
                +"<div>"
                    +"<img src='"+img.src+"' alt=''>"
                +"</div>"
            +"</div>"
        +"</div>";

    })
}

/**
 * permet d'avoir la date au format souhaité
 * @param {*} dateHeure date à formatter en format date
 * @returns date de la forme : DD/MM/YY
 */
function formatterDateHeureEnDate(dateHeure){
    let dateAFormater=new Date(dateHeure);
    console.log("date "+dateAFormater);
    console.log("jour : "+dateAFormater.getDay());
    return dateAFormater.getDate()+"/"+(dateAFormater.getMonth()+1)+"/"+dateAFormater.getFullYear();
    
}

/**
 * permet d'avoir l'heure au format souhaité
 * @param {*} dateHeure date à formatter en format date
 * @returns heure de la forme HH h
 */
function formatterDateHeureEnHeure(dateHeure){
    let dateAFormater=new Date(dateHeure);
    return dateAFormater.getHours()+"h";
}

/**
 * écoute du bouton d'affichage
 */
btnAfficher.addEventListener("click",afficherMeteo);

