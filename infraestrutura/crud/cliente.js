const executaQuery = require('../database/queries')

class Cliente {
    lista() {
        const sql = `SELECT * FROM Clientes;
                     SELECT * FROM Pets`
        return executaQuery(sql).then(dados =>
                dados[0].map(cliente => {
                    cliente.pets = dados[1].filter(
                            pet => pet.donoId === cliente.id);
                    return cliente;
                }))
    }

    buscaPorId(id) {
        const sql = `SELECT * FROM Clientes WHERE id=${id};
        SELECT * FROM Pets WHERE donoId=${id}`
        return executaQuery(sql).then(resposta => {
            return {
                ...resposta[0][0],
                pets: resposta[1]
            };
        })
    }

    adiciona(item) {
        const {nome, cpf} = item
        const sql = `INSERT INTO Clientes(nome, CPF) VALUES('${nome}', '${cpf}')`
        return executaQuery(sql).then(resposta => {
            return {
                id: resposta.insertId,
                nome: nome,
                cpf: cpf
            }
        })
    }

    atualiza(novoItem, id) {
        const {nome, cpf} = novoItem
        const sql = `UPDATE Clientes SET nome='${nome}', CPF='${cpf}' WHERE id=${id}`
        return executaQuery(sql).then(() => novoItem);
    }

    deleta(id) {
        const sql = `DELETE FROM Clientes WHERE id=${id}`
        return executaQuery(sql).then(() => id);
    }
}

module.exports = new Cliente
