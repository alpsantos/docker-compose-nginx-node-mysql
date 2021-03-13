const express = require('express');
const app = express()
const port = 3000

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const mysql = require('mysql')
var connection = mysql.createConnection(config)

connection.query("DROP TABLE IF EXISTS people;")
const create_sql = "CREATE TABLE people (id int not null auto_increment, name varchar(255), primary key(id));"
connection.query(create_sql)

connection.end()

app.get('/', (req, res) => {

  var connection = mysql.createConnection(config)

  const insert_sql = "INSERT INTO people(name) VALUES ('full_cycle_rocks')"
  connection.query(insert_sql)

  connection.query(
    "SELECT * FROM people",
    function (err, rows) {
      if (err) throw err;

      var html = "<h1>Full Cycle Rocks!</h1> <ul>"
      for (var i in rows) html += "<li>" + rows[i].name + "</li>";
      html += "</ul>"

      res.send(html);
    }
  );
  
  connection.end()
})

app.listen(port, () => {

  console.log('Rodando porta ' + port)
  
})