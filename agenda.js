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

app.get('/remover/:id', function(req, res) {
	
	var id = req.params.id;

    con.query('DELETE FROM agenda WHERE id = ' + id, function(erro, result) {
	    if (erro) {
	        console.log(erro.message);
	    } else {
	        console.log('Registro removido com sucesso!');
	    }
    });
	res.redirect('')
});

app.get('/:id', function(req, res) {
	
	var id = req.params.id;

	var sql = "SELECT * FROM agenda WHERE id = " + id;

	var rows = conSync.query(sql);
	var nome = rows[0].nome;
	var telefone = rows[0].telefone;
	
	var html;
	html = "<html>";
	html += "<body>";
	html += "<div align = 'center' width='50%'>";
	html += "<form action='/atualizar' method='post'><br>";
	html += "<h1>Editando dados na Agenda de Clientes</h1><br>";
	html += " Nome: <input type='text' name='nome' value='" + nome + "'> ";
	html += " Telefone: <input type='text' name='telefone' value='" + telefone + "'> ";
	html += " <input type='hidden' name='id' value='" + id + "'>";
	html += " <input type='submit' value='Atualizar'>";
	html += " <input type='button' value='Cancelar' onClick='history.back();'>";

	res.send(html);

});


app.post('/atualizar', function(req, res){
	var post = {
	    nome: req.body.nome,
	    telefone: req.body.telefone
	};

	var id = req.body.id;
 
	con.query('UPDATE agenda set ? where id = ?', [post, id], function(erro, result) {
	    if (erro) {
	        console.log(erro.message);
	    } else {
	        console.log('Registro atualizado com sucesso!');
	    }
    });
	res.redirect('')
});

app.listen(3000, function(){
	console.log('Servidor pronto');
});

