var express = require('express');

var app = express();

// Установка механизма представления handlebars
var handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
	
app.set('port', process.env.PORT || 3000);

/////
var fortunes = [
	"Победи свои страхи, или они победят тебя.",
	"Рекам нужны истоки.",
	"Не бойся неведомого.",
	"Тебя ждет приятный сюрпиз.",
	"Будь проще везде, где только можно.",
];

app.use(express.static('public'));

app.get('/', function(reg, res) {
	//res.type('text/plain');
	//res.send('Meadowlark Travel');
	res.render('home');
});
app.get('/about', function(req, res) {
	var randomFortune =
		fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', { fortune: randomFortune });
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
