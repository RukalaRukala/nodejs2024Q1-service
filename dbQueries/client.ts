import {Client} from "pg";

const client = new Client({
    host: 'localhost',
    user: 'Rukala',
    port: 5432,
    password: 'password',
    database: 'median-db'
})

export default client;