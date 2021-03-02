// document.write('test');

var names = [
    {Name: 'Adelle', Good: 0, Wrong: 0},
    {Name: 'Anneliek', Good: 0, Wrong: 0},
    {Name: 'Bert', Good: 0, Wrong: 0},
    {Name: 'Dilan', Good: 0, Wrong: 0},
    {Name: 'Elisa', Good: 0, Wrong: 0},
    {Name: 'Elsa', Good: 0, Wrong: 0},
    {Name: 'Geraldine', Good: 0, Wrong: 0},
    {Name: 'Gert', Good: 0, Wrong: 0},
    {Name: 'Iona', Good: 0, Wrong: 0},
    {Name: 'Jackp', Good: 0, Wrong: 0},
    {Name: 'Karam', Good: 0, Wrong: 0},
    {Name: 'Kayleigh', Good: 0, Wrong: 0},
    {Name: 'Sarah-Louise', Good: 0, Wrong: 0}
];

var correctName;
var answers = [];
var progressbarId;
var progressbarWidth = 1;

load();

function showName() {

    var number = Math.floor(Math.random() * names.length);
    correctName = names[number].Name;

    var name = document.getElementById('name');
    name.innerHTML = 'Welke afbeelding hoort bij de naam <b>' + correctName + '</b>?';
    console.log(correctName);

}

function options() {

    answers = [correctName];

    while (answers.length !== 3) {
        var option = names[Math.floor(Math.random() * names.length)].Name;
        if (option !== correctName) {
            if (option !== answers[1]) {
                answers.push(option);
            }
        }
    }
    console.log(answers);

    answers = shuffleArray(answers);

    for (i = 0; i < answers.length; i++) {
        var coldiv = document.createElement('div');
        coldiv.className = 'col';

        document.getElementById('answers').appendChild(coldiv);

        var img = document.createElement('img');
        img.id = answers[i];
        img.className = 'images';
        img.src = 'Img/' + answers[i] + '.jpg';
        img.onclick = function () {
            registerAnswer(this.id);
        };

        coldiv.appendChild(img);
    }

}

function registerAnswer(answer) {

    if (answer === correctName){
        console.log('Correct answer');

        progressbarWidth = 100;
        clearInterval(progressbarId);

        load();
    } else {
        console.log('Wrong answer');
        alert('Wrong answer');

        progressbarWidth = 100;
        clearInterval(progressbarId);

        load();
    }

}

function shuffleArray(array) {

    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

}

function scoreBoard() {

    var score = document.getElementById('score');

}

function load() {

    var y = 0;
    if (y === 0) {
        y = 1;
        var elem = document.getElementById("myBar");
        progressbarWidth = 1;
        progressbarId = setInterval(frame, 100);
        function frame() {
            if (progressbarWidth >= 100) {
                clearInterval(progressbarId);
                y = 0;
                registerAnswer('')
            } else {
                progressbarWidth++;
                elem.style.width = progressbarWidth + "%";
            }
        }
    }

    document.getElementById('name').innerHTML = '';
    document.getElementById('answers').innerHTML = '';
    // document.getElementById('scoreboard').innerHTML = '';
    answers = [];

    showName();
    options();

}