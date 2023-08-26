const oracledb = require('oracledb');

let connection;

async function connectToDatabase() {
    if (!connection) {
        connection = await oracledb.getConnection({
            user: "TOURHUB",
            password: "12345",
            connectString: "localhost/orclpdb"
        });
    }
    return connection;
}

module.exports = {
    connectToDatabase
};