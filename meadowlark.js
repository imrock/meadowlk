var express = require('express');
var fortune = require('./lib/fortune.js');

var app = express();

// Установка механизма представления handlebars
var handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
	
app.set('port', process.env.PORT || 3000);


app.use(express.static('public'));

app.get('/', function(reg, res) {
	//res.type('text/plain');
	//res.send('Meadowlark Travel');
	res.render('home');
});
app.get('/about', function(req, res) {
	res.render('about', { fortune: fortune.getFortune() });
});

// пользовательськая страница 404
app.use(function(req, res) {
	//res.type('text/plain');
	res.status(404);
	//res.send('404 - Не найдено');
	res.render('404');
});

// пользовательськая страница 500
app.use(function(err, reg, res, next) {
	console.error(err.stack);
	//res.type('text/plain');
	res.status(500);
	//res.send('500 - Ошибка сервера');
	res.render('505');
});

app.listen(app.get('port'), function() {
	console.log( 'Express запущен на http://localhost:' + 
		app.get('port') + '; нажмите Ctrl+C для завершения.');
});
