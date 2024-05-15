const express = require('express');
const knex = require ('../../database/database');
const Pacientes = require('../api/pacientes');



const Paciente = new Pacientes(knex);
const routes = express.Router(knex);

// Rota para obter todos os pacientes
routes.get('/pacientes', async (req, res, next) => {
    try {
        const pacientes = await Paciente.list();
        if ("error" in pacientes) {
          res.status(400).json({ statusCode: 400, message: pacientes }).end();
          return;
        }
        console.log('alo');
        res.status(200).json({ statusCode: 200, message: pacientes }).end();
        console.log('tchau');
    } catch (error) {
        console.error(error);
        res.status(500).json({ statusCode: 500, message: 'Erro ao obter a lista de pacientes.' }).end();
    }
});

// Rota para criar um novo paciente
routes.post('/pacientes', async (req, res, next) => {
    try {
        // Transformar nome, sexo e clinica em maiúsculas
        let nome, sexo, idade, clinica; 
    
        if (req.body.nome) {
            nome = req.body.nome.toUpperCase();
        }

        if (req.body.sexo) {
            sexo = req.body.sexo.toUpperCase();
        }

        if (req.body.clinica) {
            clinica = req.body.clinica.toUpperCase();
        }

        idade = req.body.idade; 

        const pacienteID = await Paciente.create(nome, sexo, idade, clinica);

        if ("error" in pacienteID) {
          res.status(400).json({ statusCode: 400, message: pacienteID }).end();
          return;
        }

        res.status(200).json({ statusCode: 200, message: pacienteID }).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ statusCode: 500, message: 'Erro ao criar um novo paciente.' }).end();
    }
});

// Rota para obter um paciente específico por ID
routes.get('/pacientes/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const paciente = await Paciente.fromID(id);

        if ("error" in paciente) {
          res.status(400).json({ statusCode: 400, message: paciente }).end();
          return;
        }

        res.status(200).json({ statusCode: 200, message: paciente }).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ statusCode: 500, message: 'Erro ao obter o paciente.' }).end();
    }
});

// Rota para atualizar um paciente por ID
routes.put("/pacientes/:id", async (req, res, next) => {
    try {
        let nome, sexo, idade, clinica; 
    
        if (req.body.nome) {
            nome = req.body.nome.toUpperCase();
        }

        if (req.body.sexo) {
            sexo = req.body.sexo.toUpperCase();
        }

        idade = req.body.idade; 

        if (req.body.clinica) {
            clinica = req.body.clinica.toUpperCase();
        } 
    
        const { id } = req.params;
        const message = await Paciente.update(id, nome, sexo, idade, clinica);
    
        if ("error" in message) {
          res.status(400).json({ statusCode: 400, message: message }).end();
          return;
        }
    
        res.status(200).json({ statusCode: 200, message: message.message }).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ statusCode: 500, message: 'Erro ao atualizar o paciente.' }).end();
    }
});
      


// Rota para excluir um paciente por ID
routes.delete("/pacientes/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const message = await Paciente.delete(id);

        if ("error" in message) {
            res.status(400).json({ statusCode: 400, message: message.error }).end();
        } else {
            res.status(200).json({ statusCode: 200, message:message.message }).end();
        }
        } catch (error) {
        console.error("Erro ao deletar paciente:", error);
        res.status(500).json({ statusCode: 500, message: "Erro ao deletar paciente." }).end();
        }
        });
        
module.exports = routes;
              