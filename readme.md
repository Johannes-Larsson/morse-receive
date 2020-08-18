This is a simple web app to practice receiving morse code.

It plays a random word in a tempo you choose (currently 7, 10, 15, 20, 25 wpm are available. It is easy to add more).
When you have entered a guess, it tells you if you were right or wrong and the correct answer, then plays a new word.

The words are from a list of the 1000 most common english words.

The audio files are generated using ebook2cw, for example like this:  
`mkdir 7wpm; while read -r line; do echo $line | ebook2cw -o "7wpm/$line"  -w 7; done < words.txt;`

The static directory contains all one might need, so it is sufficient to serve that with for example nginx.
A golang backend server with more features is also in progress, see server.go.
Do `go run server.go` to start that.
