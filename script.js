document.write('test');

var names = ['naam1', 'naam2'];

function showNames(item) {
    document.getElementById('naam').innerHTML += 'Name:' + '<br>';
    document.getElementById('item').innerHTML += item  + '<br>';

    var img = document.createElement('img');
    img.src = '/Leerjaar%202/Challenge%20Front-end/Img/'+item+'.jfif';
    document.getElementById('img').appendChild(img);
}