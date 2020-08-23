let word;
let words;
let audio;

let ncorr = 0;
let n = 0;
let speed = '10wpm';

let playing = true;
let completedWord = false;

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

fetch('api/version')
.then(function(response) {
  response.text().then(function(text) {
    $('#version-span').html(text);
  });
});

function newWord() {
  if (!playing) return;

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
  completedWord = true;
  audio.pause();

  let ans = $('#wordinput').val();
  n += 1;
  if (ans.toLowerCase() == word.toLowerCase()) {
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

function playAgain() {
  if (audio.paused && !completedWord) {
    audio.play()
  }
}

function pause() {
  playing = false;
  audio.pause()
  $('#pause').hide()
  $('#resume').show()
}

function resume() {
  playing = true;
  if (completedWord) newWord();

  audio.currentTime = 0;
  audio.play();
  $('#resume').hide()
  $('#pause').show()
}
