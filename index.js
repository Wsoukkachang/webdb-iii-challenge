const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

//end points

// POST

server.post('/api/cohorts', async (req, res) => {
    try {
    const [ id ] = await db('cohorts').insert(req.body)
    const cohort = await db('cohorts').where({ id }).first();
    res.status(201).json(cohort);
    } catch {
    res.status(500).json({ error: "There was an error posting data" });
    }
});

// GET

server.get('/api/cohorts', async (req, res) => {
    try {
    const cohorts = await db('cohorts'); // all the records from the table
    res.status(200).json(cohorts);
    } catch {
    res.status(500).json({ error: "There was an error retrieving data" });
    }
});

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);
