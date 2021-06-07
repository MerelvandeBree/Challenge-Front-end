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

localStorage.setItem('seconds', 10);

var correctAnswers = 0;
var wrongAnswers = 0;
var correctName;
var answers = [];
var progressbarId;
var progressbarWidth = 1;


const timeAmountInput = document.getElementById('time');


function switchClass() {

    var homeClass = document.getElementById("home")
    var trainerClass = document.getElementById("trainer");
    var settingsClass = document.getElementById("settings");

    if ( $('div.home').hasClass('active') ) {
        homeClass.classList.remove("active");
        homeClass.classList.add("inactive");

        trainerClass.classList.remove("inactive");
        trainerClass.classList.add("active");

        load();

    }
    else if ( $('div.trainer').hasClass('active') ) {

        trainerClass.classList.remove("active");
        trainerClass.classList.add("inactive");

        settingsClass.classList.remove("inactive");
        settingsClass.classList.add("active");

        clearInterval(progressbarId);

    }
    else if ( $('div.trainer').hasClass('inactive') ) {

        trainerClass.classList.remove("inactive");
        trainerClass.classList.add("active");

        settingsClass.classList.remove("active");
        settingsClass.classList.add("inactive");

        load();

    }

}

function settings() {

    var startTraining = document.getElementById('startBtn');
    startTraining.onclick = function () {
        if (timeAmountInput.value !== '') {
            localStorage.setItem('seconds', timeAmountInput.value);
        } else {
            localStorage.setItem('seconds', localStorage.getItem('seconds'));
        }

        switchClass();
    }

}

function showName() {

    var number = Math.floor(Math.random() * names.length);
    correctName = names[number].Name;

    var name = document.getElementById('name');
    name.innerHTML = 'Welke afbeelding hoort bij de naam <b>' + correctName + '</b>?';

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
        for (var i = 0; i < names.length; i++) {

            if (names[i].Name === correctName) {

                names[i].Good += 1;
                correctAnswers += 1;

                console.log('goede antwoorden' + correctAnswers);
                console.log('goed per naam' + names[i].Good);

                progressbarWidth = 100;
                clearInterval(progressbarId);

            }
        }

        load();
    }
    else if (answer === 'timeout') {
        for (var i = 0; i < names.length; i++) {

            if (names[i].Name === correctName) {

                alert('Not quick enough!')

                wrongAnswers += 1;
                names[i].Wrong += 1;

                progressbarWidth = 100;
                clearInterval(progressbarId);

            }
        }

        load();
    }

    else {
        for (var i = 0; i < names.length; i++) {

            if (names[i].Name === correctName) {

                console.log('Wrong answer');
                alert('Wrong answer');

                wrongAnswers += 1;
                names[i].Wrong += 1;

                progressbarWidth = 100;
                clearInterval(progressbarId);


            }
        }

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

    var score = document.getElementById('scoreboard');
    score.innerHTML = 'Goede antwoorden: ' + correctAnswers + '<br>' + 'Foute antwoorden: ' + wrongAnswers;

}

function load() {

    let checker = arr => arr.every(v => v.Good === 1);

    if (checker(names) === false) {
        var y = 0;
        if (y === 0) {
            y = 1;
            const elem = document.getElementById("myBar");
            progressbarWidth = 1;
            progressbarId = setInterval(frame, localStorage.getItem('seconds') * 10);

            function frame() {
                if (progressbarWidth >= 100) {
                    clearInterval(progressbarId);
                    y = 0;
                    registerAnswer('timeout');
                } else {
                    progressbarWidth++;
                    elem.style.width = progressbarWidth + "%";
                }
            }
        }

    }

    document.getElementById('name').innerHTML = '';
    document.getElementById('answers').innerHTML = '';
    answers = [];

    showName();
    options();
    scoreBoard();

}