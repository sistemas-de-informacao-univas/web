var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

var con = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'bdados'
});

con.connect(function(erro) {
  if (erro) throw err;
  console.log("Conectado ao Banco de Dados");
});

app.get('/', function(req, res){

	var html;
	html = "<html>";
	html += "<body>";
	html += "<div align = 'center' width='50%'>";
	html += "<a href='/'>Voltar</a>";
	html += "<form action='/inserir' method='post'><br>";
	html += "<h1>Controle da Agenda de Clientes</h1><br>";
	html += " Nome: <input type='text' name='nome' > ";
	html += " Telefone: <input type='text' name='telefone'> ";
	html += " <input type='submit' value='Inserir'>";
	html += "<hr>";
	html += "<table border=1>";
	html += "<thead>";
	html += "<td width='40%'>NOME</td><td width='30%'>TELEFONE</td><td width='30%'>AÇÕES</td>";
	html += "</thead>";

	var sql = "SELECT * FROM agenda";

	var rows = conSync.query(sql);
	for(var i = 0; i < rows.length; i++){
		html += "<tbody>";
		html += "<td>"+ rows[i].nome + "</td>";
		html += "<td>"+ rows[i].telefone + "</td>";
		html += "<td>";
		html += "<a href='/" + rows[i].id + "'>Editar</a>  ";
		html += "<a href='/remover/" + rows[i].id + "'>Remover</a>";
		html += "</td>";

		html += "</tbody>";
	};

	html += "</table></div>";
	html += "</body></html>";
	res.send(html);

});


app.get('/inserir', function(req, res){

	con.query('insert into agenda (nome, telefone) values ("univas","3421-1010")',  
		function(erro){
		if (erro) {
	        console.log(erro.message);
	    } else {
			console.log("Dados inseridos na agenda");
		}
	});

});


app.listen(3000, function(){
	console.log('Servidor pronto');
});

