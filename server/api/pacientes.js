// aqui ficarão as regras de negocio do pacientes
function Pacientes (knex) {
    this.knex = knex;

    this.list = async function () {
        const pacientesList = await this.knex("pacientes");
    
        if (!pacientesList.length) {
          return { error: "Não foi possível obter pacientes." };
        }
    
        return pacientesList;
      };

      this.fromID = async function (id) {
        const paciente = await this.knex("pacientes").where({ id });
    
        if (!paciente.length) {
          return { error: "Paciente não encontrado." };
        }
    
        return paciente;
      };

      this.fromNome = async function (nome) {
        const paciente = await this.knex("pacientes").where({ nome });
    
        if (!paciente.length) {
          return { error: "Paciente não encontrado." };
        }
    
        return paciente;
      };
    
      this.create = async function (nome, sexo, idade, clinica) {
            const existingPaciente = await this.fromNome(nome);

            if (!("error" in existingPaciente)) {
                return { error: 'Paciente já cadastrado' };
            }

            const pacienteID = await this.knex
            .insert(
              [
                {
                  nome,
                  sexo,
                  idade,
                  clinica
                },
              ],
              ["id"]
            )
            .into("pacientes");
    
          if (!pacienteID) {
            return { error: "Não foi possível criar paciente" };
          }
    
          return { id: pacienteID };
      };

      this.delete = async function (id) {
        try {
            const paciente = await this.knex("pacientes").where({ id }).first();
            if (!paciente) {
                return { error: "Paciente não encontrado." };
            }
    
            await this.knex.transaction(async (trx) => {
                await this.knex("pacientes").where({ id }).del().transacting(trx);
            });
    
            return { message: "Paciente deletado com sucesso." };
        } catch (e) {
            return { error: e };
          }
        
    };
    
    this.update = async function (id, nome, sexo, idade, clinica) {
        try {
            const validation = await this.knex("pacientes")
                .where({ id })
                .update({
                    nome: nome,
                    sexo: sexo,
                    idade: idade,
                    clinica, clinica,
                });
    
            if (validation) {
                return { message: "Paciente atualizado com sucesso." };
            } else {
                return { error: "Erro ao atualizar paciente." };
            }
        } catch (e) {
          return { error: e };
        }
    };
      
    
    

    
    
}

module.exports = Pacientes;