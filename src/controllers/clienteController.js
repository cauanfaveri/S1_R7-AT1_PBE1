
const { clienteModels } = require("../models/clienteModels");
const { produtoModel } = require("../models/produtoModel");

const clienteController = {
    /**
     * /**
     * Retorna os produtos cadastrados
     * Rota GET /produtos
     * @async
     * @function selecionaTodos
     * @param {Request} req Objeto da requisição HTTP
     * @param {Response} res Objeto da resposta HTTP
     * @returns {Promise<Array<Object>>} Objeto contendo o resultado da consulta 
     */
    selecionaTodos: async (req, res) => {
        try {
            const { idCliente } = req.query;
            if (idCliente) {
                const resultadoCliente = await clienteModels.selectAll();
                return res.status(200).json({ data: resultadoProduto })
            }
            const resultado = await clienteModels.selectAll();
            if (resultado.length === 0) {
                return res.status(200).json({ message: 'A consulta não retornou resultados' });
            }
            res.status(200).json({ data: resultado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    //Criação de clientes
    incluirRegistrosClientes: async (req, res) => {
        try {
            const { descricao, cpf } = req.body;
            if (!descricao || !cpf) {
                return res.status(400).json({ message: 'Verifique os dados enviado e tente novamente' });
            }
            try {
                const { descricao, cpf } = req.body;
                if (!descricao || !cpf ) {
                    return res.status(400).json({ message: 'Verifique os dados enviado e tente novamente' });
                }
                const resultado = await clienteModels.insertCliente(descricao, cpf);
                if (resultado.insertId === 0) {
                    throw new Error('Ocorreu um erro ao incluir o cliente');
                }
                res.status(201).json({ message: 'Registro incluido com sucesso', data: resultado })
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Ocorreu um erro', errorMessage: error.message })
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro geral na inclusão', errorMessage: error.message });
        }
    },
    // Alteração de clientes (se for alterar o CPF, verifique se o novo já existe e retorne a mesma mensagem da criação de clientes);
    alteraCliente: async (req, res) => {
        try {
            const idCliente = Number(req.params.idCliente);
            const { descricao, cpf } = req.body;

            if (!idCliente || (!descricao && !cpf) || isNaN(cpf) || typeof idCliente != 'number') {
                return res.status(400).json({ message: 'Verifiqueee os dados enviado e tente novamente' });
            }

            const clienteAtual = await produtoModel.selectById(idCliente);
            if (clienteAtual.length === 0) {
                return res.status(200).json({ message: 'Client não foi localizado não localizado' });
            }

            const novaDescricao = descricao ?? clienteAtual[0].nome_cliente;
            const novoCpf = cpf ?? clienteAtual[0].cpf_cliente;
            console.log(novaDescricao, novoCpf);

            const resultUpdate = await clienteModels.update(idCliente, novaDescricao, novoCpf);

            if (resultUpdate.affectedRows === 1 && resultUpdate.changedRows === 0) {
                return res.status(200).json({ message: 'Não há alterações a serem realizadas' });
            }
            if (resultUpdate.affectedRows === 1 && resultUpdate.changedRows === 1) {
                return res.status(200).json({ message: 'O registro foi alterado com sucesso' });
            }
            // res.json({message:'teste'})
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
        }
    },
    // Deleção de clientes;
    deleteCliente: async (req, res) => {
        try {
            const idCliente = Number(req.params.idCliente);

            if (!idCliente || !Number.isInteger(idCliente)) {
                return res.status(400).json({ message: 'Forneça um identificador válido' })
            }
            const clienteSelecionado = await clienteModels.delete(idCliente);
            if (clienteSelecionado.length === 0) {
                return res.status(200).json({ message: 'Cliente ñ localizado' });
            }
            const resultadoDelete = await clienteModels.delete(idCliente);
            if (resultadoDelete.affectedRows === 1) {
                return res.status(200).json({ message: 'Erro ao excluir cliente' })
            }
            res.status(200).json({
                message: 'CLiente excluído com sucesso',
                data: resultadoDelete
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu erro no server', errorMessage: error.message })
        }
    }

}
module.exports = clienteController;