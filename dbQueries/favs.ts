import client from "./client";
import * as util from "util";

client.connect();

client.query(`SELECT
    json_agg(
        json_build_object(
            'id', "Track".id,
            'name', "Track".name,
            'duration', "Track".duration
        )
    ) AS tracks,
    json_agg(
        json_build_object(
            'name', "Artist".name
        )
    ) AS artists,
    json_agg(
        json_build_object(
            'name', "Album".name,
            'year', "Album".year
        )
    ) AS albums
FROM
    "Favorites"
LEFT JOIN
    "Album" ON "Favorites".id = "Album"."favoritesId"
LEFT JOIN
    "Artist" ON "Favorites".id = "Artist"."favoritesId"
LEFT JOIN
    "Track" ON "Favorites".id = "Track"."favoritesId"
GROUP BY
    "Favorites".id`, (err, res) => {
    !err
        ? console.log(util.inspect(res.rows, { depth: null, colors: true }))
        : console.log(err.message);
    client.end();
})