const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const ports = process.env.PORT || 5000;
const cors = require("cors");
const pgp = require("pg-promise");

//POSTGRESQL
const { Pool } = require("pg");
const { Console } = require("console");
const pool2 = new Pool({
  user: "postgres",
  host: "localhost",
  database: "artgallery",
  password: "Ilovetea@3", //3425
  port: "5432",
});

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.listen(ports, () => console.log(`listening on port ${ports}`));

// REQUESTS

// POSTGRESSQL

//works
app.get("/artists", async (req, res) => {
  res.send(await getAllArtists());
});

//works
app.get("/artists/filter", async (req, res) => {
  const fName = req.query.fname;
  const lName = req.query.lname;
  res.send(await getAllArtists());
});

//works
app.get("/artist/:id", async (req, res) => {
  res.send(await getArtist(req.params.id));
});

app.get("/user/:username/:password", async (req, res) => {
  res.send(await getUser(req.params.username, req.params.password));
});

app.put("/artist", async (req, res) => {
  res.send(await updateArtist(req.body));
});

app.delete("/artist/:id", async (req, res) => {
  res.send(await deleteArtist(req.params.id));
});

app.delete("/artwork/:id", async (req, res) => {
  console.log(req.params.id);
  res.send(await deleteArtwork(req.params.id));
});

app.post("/artist", async (req, res) => {
  res.send(await createArtist(req.body));
});

//works
app.get("/artworks", async (req, res) => {
  console.log("here");
  res.send(await getAllArtWorksAllArtists());
});

//works
app.get("/artwork/:id", async (req, res) => {
  console.log(req.params.id);
  res.send(await getArtWork(req.params.id));
});

//works
app.get("/artist/artworks/:id", async (req, res) => {
  res.send(await getAllArtWorkByArtist(req.params.id));
});

//FUNCTIONS

async function getAllArtists() {
  return new Promise((resolve, reject) => {
    pool2.query("SELECT * FROM artist ", (error, rows) => {
      if (error) {
        return reject(error);
      }
      return resolve(rows.rows);
    });
  });
}

async function getArtist(id) {
  return new Promise((resolve, reject) => {
    pool2.query(
      `SELECT * FROM artist WHERE artist_id =$1`,
      [id],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result.rows[0]);
      }
    );
  });
}

async function getUser(username, password) {
  return new Promise((resolve, reject) => {
    pool2.query(
      `SELECT c.username, c.password, c.role_id, r.role_name
       FROM customer c
       LEFT JOIN roles r on c.role_id = r.role_id
       WHERE c.username = $1 and c.password = $2`,
      [username, password],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result.rows[0]);
      }
    );
  });
}

async function createArtist(artist) {
  //If date fields are left blank, prepare them for SQL statement
  if (artist.date_of_birth == "") {
    artist.date_of_birth = null;
  }
  if (artist.date_of_death == "") {
    artist.date_of_death = null;
  }

  return new Promise((resolve, reject) => {
    pool2.query(
      `INSERT INTO artist (artist_id, fname, lname, email, date_of_birth,  date_of_death, nationality,  preferred_artistic_medium, description) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        artist.fname,
        artist.lname,
        artist.email,
        artist.date_of_birth,
        artist.date_of_death,
        artist.nationality,
        artist.preferred_artistic_medium,
        artist.description,
      ],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result.rows);
      }
    );
  });
}

async function updateArtist(artist) {
  //If date fields are left blank, prepare them for SQL statement
  if (artist.date_of_birth == "") {
    artist.date_of_birth = null;
  }
  if (artist.date_of_death == "") {
    artist.date_of_death = null;
  }
  if (artist.fname == "") {
    artist.fname = null;
  }
  if (artist.lname == "") {
    artist.lname = null;
  }
  if (artist.email == "") {
    artist.email = null;
  }
  if (artist.nationality == "") {
    artist.nationality = null;
  }
  if (artist.preferred_artistic_medium == "") {
    artist.preferred_artistic_medium = null;
  }
  if (artist.description == "") {
    artist.description = null;
  }
  return new Promise((resolve, reject) => {
    pool2.query(
      ` UPDATE artist
        SET fname = COALESCE($2 , fname),
            lname = COALESCE($3, lname),
            email = COALESCE($4, email),
            date_of_birth = COALESCE($5, date_of_birth),
            date_of_death = COALESCE($6, date_of_death),
            nationality = COALESCE($7, nationality),
            preferred_artistic_medium = COALESCE($8, preferred_artistic_medium),
            description = COALESCE($9, description)
        WHERE artist_id = $1;`,
      [
        artist.artist_id,
        artist.fname,
        artist.lname,
        artist.email,
        artist.date_of_birth,
        artist.date_of_death,
        artist.nationality,
        artist.preferred_artistic_medium,
        artist.description,
      ],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result.rows);
      }
    );
  });
}

async function deleteArtist(id) {
  return new Promise((resolve, reject) => {
    pool2.query(
      `DELETE from artist
       WHERE artist_id = $1`,
      [id],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result.rows[0]);
      }
    );
  });
}

async function getAllArtWorksAllArtists() {
  return new Promise((resolve, reject) => {
    pool2.query(
      `SELECT 
          w.artwork_id,
          w.artist_id,
          w.title,
          w.date_of_creation,
          w.price,
          w.art_medium,
          w.image_url,
          a.fname,
          a.lname
        FROM
          artwork w
        JOIN
          artist a ON w.artist_id = a.artist_id`,
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result.rows);
      }
    );
  });
}

async function deleteArtwork(id) {
  return new Promise((resolve, reject) => {
    console.log(id);
    pool2.query(
      `DELETE from artwork
       WHERE artwork_id = $1`,
      [id],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result.rows[0]);
      }
    );
  });
}
async function getArtWork(id) {
  return new Promise((resolve, reject) => {
    pool2.query(
      `SELECT 
      w.artwork_id,
      w.artist_id,
      w.title,
      w.date_of_creation,
      w.price,
      w.art_medium,
      w.image_url,
      a.fname,
      a.lname,
      a.email
  FROM
      artwork w
          JOIN
      artist a ON w.artist_id = a.artist_id
  WHERE
      artwork_id = $1`,
      [id],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result.rows[0]);
      }
    );
  });
}

async function getAllArtWorkByArtist(id) {
  return new Promise((resolve, reject) => {
    pool2.query(
      `SELECT 
          w.artwork_id,
          w.artist_id,
          w.title,
          w.date_of_creation,
          w.price,
          w.art_medium,
          w.image_url,
          a.fname,
          a.lname
        FROM
          artwork w
        JOIN
          artist a ON w.artist_id = a.artist_id
        WHERE
          w.artist_id =$1`,
      [id],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result.rows);
      }
    );
  });
}
