const mysql = require('mysql2');

export default class JdbcConnection {
    constructor() {
        this.host = 'localhost';
        this.port = 3306;
        this.user = 'root';
        this.password = 'TravisMong666';
        this.database = 'geckocc';

        this.connection = mysql.createConnection({
            host: this.host,
            port: this.port,
            user: this.user,
            password: this.password,
            database: this.database
        });

        this.connection.connect((err) => {
            if (err) {
                console.error('Error connecting to MySQL:', err);
                throw err;
            }
            console.log('Connected to MySQL');
        });
    }

    async getTableSize(tableName) {
        const query = `SELECT COUNT(*) AS rowCount FROM ${tableName}`;
        const result = await this.query(query);
        return result[0].rowCount;
    }

    async emptyTable(tableName) {
        const setSafeUpdatesQuery = 'SET SQL_SAFE_UPDATES = 0;';
        const deleteQuery = `DELETE FROM ${tableName}`;
        const resetSafeUpdatesQuery = 'SET SQL_SAFE_UPDATES = 1;'
        
        try {
            await this.query(setSafeUpdatesQuery);
            const result = await this.query(deleteQuery);
            const rowsAffected = result.affectedRows;
            console.log(`Deleted ${rowsAffected} rows from the ${tableName} table.`);
        } finally {
            await this.query(resetSafeUpdatesQuery);
        }
    }

    async query(sql) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async shutDown() {
        this.connection.end((err) => {
            if (err) {
                console.error('Error closing MySQL connection:', err);
            } else {
                console.log('MySQL connection closed');
            }
        });
    }
}