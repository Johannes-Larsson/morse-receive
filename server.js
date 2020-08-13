let http = require('http')
let express = require('express')
//require('bodyParser')

let app = express();
app.server = http.createServer(app);

app.use(express.static('.'))


//app.use(bodyParser.json({
//	limit : config.bodyLimit
//}));

app.server.listen(1753, () => {
	console.log(`Started on port ${app.server.address().port}`);
});

