let word;
let words;
let audio;

let ncorr = 0;
let n = 0;
let speed = '10wpm';

$('#correct').hide();
$('#wrong').hide();
$('#showword').hide();
$('#correctans').hide();
$('#content').hide();

fetch('words/words.json')
.then(function(response) {
  return response.json();
})
.then(function(jsonResponse) {
  words = jsonResponse;
});

function newWord() {
  word = words[Math.floor(Math.random()*words.length)];
  playWord(word);
  $('#correct').hide();
  $('#wrong').hide();
  $('#showword').hide();
  $('#correctans').hide();
  $('#wordinput').val('');
}

function playWord(word) {
  audio = new Audio(`words/${speed}/${word}0000.mp3`);
  audio.play();
}

function formSubmit() {
  audio.pause();

  let ans = $('#wordinput').val();
  n += 1;
  if (ans == word) {
    $('#correct').show();
    ncorr += 1;
  } else {
    $('#wrong').show();
    $('#showword').show();
    $('#correctans').show();
    $('#correctans').html(word);
  }
  $('#score').html(`${ncorr}/${n}`);

  setTimeout(newWord, 3000);
  return false;
}

function applySpeed() {
  if (audio) audio.pause();
  ncorr = 0;
  n = 0;
  $('#score').html(`${ncorr}/${n}`);
  speed = $('#speed').val();
  setTimeout(newWord, 1000);
}

function start() {
  $('#start').hide();
  $('#content').show();
  newWord();
}
