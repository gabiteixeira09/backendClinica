const express = require('express');
const knex = require('../database/database');
const cors = require('cors');
const pacientesRota = require('./routes/pacientes');


const router = express();

router.use(express.json());
router.use(cors());

router.use(pacientesRota);




router.listen(5002, () => {
    console.log('Servidor está funcionando...')
});