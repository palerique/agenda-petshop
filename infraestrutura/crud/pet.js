const executaQuery = require('../database/queries')

class Pet {
    lista() {
        const sql = `SELECT Pets.id,
                            Pets.nome,
                            Pets.tipo,
                            Pets.observacoes,
                            cliente.id   as donoId,
                            cliente.nome as donoNome,
                            cliente.cpf  as donoCpf
                     FROM Pets
                              INNER join Clientes cliente on Pets.donoId = cliente.id`
        return executaQuery(sql).then(pets => {
            return pets.map(pet => ({
                id: pet.id,
                nome: pet.nome,
                tipo: pet.tipo,
                observacoes: pet.observacoes,
                dono: {
                    id: pet.donoId,
                    nome: pet.donoNome,
                    cpf: pet.donoCpf,
                }
            }))
        })
    }

    buscaPorId(id) {
        const sql = `SELECT * FROM Pets WHERE id=${parseInt(id)}`
        return executaQuery(sql).then(resposta => resposta[0])
    }

    adiciona(item) {
        const {nome, donoId, tipo, observacoes} = item
        const sql = `INSERT INTO Pets(nome, donoId, tipo, observacoes) 
                        VALUES('${nome}', ${donoId}, '${tipo}', '${observacoes}')`
        return executaQuery(sql).then(resposta => {
            return {
                id: resposta.insertId,
                nome: nome,
                donoId: donoId,
                tipo: tipo,
                observacoes: observacoes
            }
        })
    }

    atualiza(novoItem, id) {
        const {nome, donoId, tipo, observacoes} = novoItem
        const sql = `UPDATE Pets SET nome='${nome}', donoId=${donoId}, tipo='${tipo}', observacoes='${observacoes}' 
                        WHERE id=${id}`
        return executaQuery(sql).then(() => novoItem);
    }

    deleta(id) {
        const sql = `DELETE FROM Pets WHERE id=${id}`
        return executaQuery(sql)
    }
}

module.exports = new Pet
