import client from "./client.mjs";

client.connect();

client.query(`Select * from "User"`, (err, res) => {
    !err
        ? console.log(res.rows)
        : console.log(err.message);
    client.end();
})