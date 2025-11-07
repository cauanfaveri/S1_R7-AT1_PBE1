const { pool } = require('../config/db');

const clienteModels = {
    /**
     * Retorna o produtos cadastrados na tabela produtos
     * @async
     * @function selectAll
     * @returns {Promise<Array<Object>>} Retorna um array de objetos, cada objeto representa um produto
     * @example
     * const produtos = await produtoModel.selectAll();
     * console.log(produtos);
     * //Saída esperada
     * [
     *  {coluna1: "valorColuna1", coluna2: "valorColuna2"....},
     * 
     * ]
     */
    selectAll: async () => {
        const sql = 'SELECT * FROM clientes;';
        const [rows] = await pool.query(sql);
        return rows;
    },
    insertCliente: async (pNomeCliente, pCpfCLiente) => { // Criação do cliente
        const sql = 'INSERT INTO clientes(nome_cliente, cpf_cliente) VALUES (?,?);';
        const values = [pNomeCliente, pCpfCLiente];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    update: async (pId, pNomeCliente, pCpfCLiente) => { //Alteração dos dados do cliente;
        const sql = 'UPDATE clientes SET nome_cliente=?, cpf_cliente=? WHERE id_cliente=?;'
        const values = [pNomeCliente, pCpfCLiente, pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    
    delete: async (pId) => { // Deleção de clientes
        const sql = 'DELETE FROM clientes WHERE id_cliente = ?;';
        const values = [pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    }

};

module.exports = { clienteModels };