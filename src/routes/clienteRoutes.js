const express = require('express');
const clienteRoutes = express.Router();
const clienteController = require('../controllers/clienteController');

clienteRoutes.get('/clientes', clienteController.selecionaTodos);
clienteRoutes.post('/clientes', clienteController.incluirRegistrosClientes)
clienteRoutes.put('/clientes/:idCliente', clienteController.alteraCliente);
clienteRoutes.delete('/produtos/:idProduto', clienteController.deleteCliente);
module.exports = { clienteRoutes }