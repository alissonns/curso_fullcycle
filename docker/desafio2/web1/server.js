const express = require('express');
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql');

doInsertAndSelectNames = (connection) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO people(name) values('Alisson')`);
        connection.query(`SELECT id, name FROM people`, (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};

app.get('/', async (req, res) => {
    const connection = mysql.createConnection(config);
    const resultSet = await doInsertAndSelectNames(connection);
    const objects = JSON.parse(JSON.stringify(resultSet));
    connection.end();
    let html = `<h1>Full Cycle Rocks!</h1>`;
    html += `<hr />`
    html += `<h2>Lista de nomes cadastrada no banco de dados</h2>`
    html += `<ul>`;
    for (item of objects) {
        html += `<li>${item.id} - ${item.name} </li>`;
    }
    html += `</ul>`;
    res.send(html);
});

app.listen(port, () => {
    console.log(`Web1 application is listening on port ${port}`);
});
