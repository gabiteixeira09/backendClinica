const knex = require('../database/database');

const Pacientes = async () => {
  const tableExists = await knex.schema.hasTable('pacientes');
  if (!tableExists) {
    return knex.schema.createTable('pacientes', table => {
      table.increments('id').primary();
      table.string('nome').notNullable();
      table.string('sexo').notNullable();
      table.integer('idade').notNullable();
      table.string('clínica').notNullable();
      table.timestamps(true, true); 
    });
  }
};

module.exports = Pacientes;