const mongoose = require('mongoose');

// definindo o esquema do formulário
const formularioSchema = new mongoose.Schema(
	{
		primeiroNome: {
			type: String,
			required: true
		},
		sobrenome: {
			type: String,
			required: true
		},
		nomeUsuario: {
			type: String,
			required: true
		},
		cpf: {
			type: String,
			required: true
		},
		estado: {
			type: String,
			required: true
		},
		sexo: {
			type: String,
			enum: ['masculino', 'feminino', 'outro'],
			required: true
		},
		celular: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		senha: {
			type: String,
			required: true
		}
	}
);

// Exportar o esquema do formulário
module.exports = mongoose.model('Formulario', formularioSchema);
