const executaQuery = require('../database/queries')

function getPetsMap(pets) {
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
    }));
}

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
        return executaQuery(sql).then(pets => (getPetsMap(pets)))
    }

    buscaPorId(id) {
        const sql = `SELECT Pets.id,
                            Pets.nome,
                            Pets.tipo,
                            Pets.observacoes,
                            cliente.id   as donoId,
                            cliente.nome as donoNome,
                            cliente.cpf  as donoCpf
                     FROM Pets
                              INNER join Clientes cliente on Pets.donoId = cliente.id
                              WHERE Pets.id=${parseInt(id)}`
        return executaQuery(sql).then(pets => (getPetsMap(pets))[0])
    }

    adiciona(item) {
        const {nome, donoId, tipo, observacoes} = item
        const sql = `INSERT INTO Pets(nome, donoId, tipo, observacoes) 
                        VALUES('${nome}', ${donoId}, '${tipo}', '${observacoes}');
                        SELECT * FROM Clientes where id = ${donoId}`
        return executaQuery(sql).then(resposta => {
            console.log(resposta);
            return {
                id: resposta[0].insertId,
                nome,
                donoId,
                tipo,
                observacoes,
                dono: resposta[1][0],
            }
        })
    }

    atualiza(novoItem, id) {
        const {nome, donoId, tipo, observacoes} = novoItem
        const sql = `UPDATE Pets SET nome='${nome}', donoId=${donoId}, tipo='${tipo}', observacoes='${observacoes}' 
                        WHERE id=${id};
                        SELECT * FROM Clientes where id = ${donoId}`
        return executaQuery(sql).then(resposta =>
                ({
                    id,
                    nome,
                    tipo,
                    observacoes,
                    dono: resposta[1][0],
                }))
    }

    deleta(id) {
        const sql = `DELETE FROM Pets WHERE id=${id}`
        return executaQuery(sql).then(() => id);
    }
}

module.exports = new Pet
