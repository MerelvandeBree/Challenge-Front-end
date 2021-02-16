// document.write('test');

var namen = ['Adelle', 'Anneliek', 'Bert', 'Dilan', 'Elisa', 'Elsa', 'Geraldine', 'Gert', 'Iona', 'Jackp', 'Karam', 'Kayleigh', 'Sarah-Louise'];
var nummer = Math.floor(Math.random() * 12);
var juisteNaam = namen[nummer];

var antwoorden = [juisteNaam];

showAfbeelding(namen[nummer]);
opties();
knoppen();

function showAfbeelding(afbeelding) {

    console.log('Nummer:' + nummer);
    console.log('Naam:' + juisteNaam);

    // document.getElementById('naam').innerHTML += 'Juiste naam:' + '<br>';

    var img = document.createElement('img');
    img.src = 'Img/' + afbeelding + '.jpg';
    document.getElementById('afbeelding').appendChild(img);
    
}

function opties() {

    while (antwoorden.length < 3) {
        var nummers = Math.floor(Math.random() * 12);
        var optie = namen[nummers];

        if (optie !== juisteNaam) {
            if (optie !== antwoorden[1]) {
                antwoorden.push(optie);
            }

        }
    }

    console.log('Mogelijke antwoorden ' + antwoorden);

}

function knoppen(){

    for (i =0; i < antwoorden.length; i++) {

        var knop = document.createElement('button');
        knop.innerHTML = antwoorden[i];

        document.getElementById('antwoorden').appendChild(knop);

    }
}