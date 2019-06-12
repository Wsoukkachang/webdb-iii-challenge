const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

// END POINTS //

// POST IN COHORTS

server.post('/api/cohorts', async (req, res) => {
    try {
    const [ id ] = await db('cohorts').insert(req.body)
    const cohort = await db('cohorts').where({ id }).first();
    res.status(201).json(cohort);
    } catch {
    res.status(500).json({ error: "There was an error posting data" });
    }
});

// GET ALL COHORTS

server.get('/api/cohorts', async (req, res) => {
    try {
    const cohorts = await db('cohorts'); // all the records from the table
    res.status(200).json(cohorts);
    } catch {
    res.status(500).json({ error: "There was an error retrieving data" });
    }
});

// GET COHORT WITH MATCHING ID

server.get('/api/cohorts/:id', async (req, res) => {
    try {
    const cohort = await db('cohorts').where({ id: req.params.id }).first();
    res.status(200).json(cohort);
    } catch {
    res.status(500).json({ error: "There was an error retrieving data"});
    }
})

// GET ALL STUDENTS FOR COHORT WITH MATCHING ID

server.get('/api/cohorts/:id/students', async (req, res) => {
    try {
    const students = await db('students').where({ cohorts_id: req.params.id })
    res.status(200).json(students);
    } catch {
    res.status(500).json({ error: "There was an error retrieving student data for that cohort" })
    }
})

// PUT OR UPDATE COHORT DATA WITH MATCHING ID

server.put('/api/cohorts/:id', async (req, res) => {
    try {
    const count = await db('cohorts').where({ id: req.params.id }).update(req.body);
    if(count > 0) {
        res.status(200).json({ message: `${count} cohort record updated`})
    } else {
        res.status(404).json({ message: "Cohort by ID not found"})
    }
    } catch {
    res.status(500).json({ error: "There was an error updating data" })
    }
})

// DELETE BY ID

server.delete('/api/cohorts/:id', async (req, res) => {
    try {
    const count = await db('cohorts').where({ id: req.params.id }).del();
    if(count > 0) {
        res.status(200).json({ message: `${count} cohort record deleted`})
    } else {
        res.status(404).json({ message: "Cohort by ID not found"})
    }
    } catch {
    res.status(500).json({ error: "There was an error deleting data" })
    }
})


const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);
