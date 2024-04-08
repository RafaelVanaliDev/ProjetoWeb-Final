const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

require('dotenv/config');	// a Variável de ambiente em .env

// Importar modelo de formularios o arquivo formularioSchema.js
const Formulario = require('./Model/formularioSchema.js');

const app = express();
//const PORT = process.env.PORT || 3000;

app.use(express.json());

// Adicionando middleware para servir arquivos estáticos (como CSS e JS)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Rota para servir o arquivo index.html
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Rota para obter todos os cadastros
app.get('/api/cadastros', async (req, res) => {
	try {
		// Usar  obter todos os documentos de Formulario
		const cadastros = await Formulario.find();

		// Responder com os dados dos cadastros
		res.json(cadastros);
	} catch (error) {
		// Lidar com erros
		console.error('Erro ao obter os cadastros:', error);
		res.status(500).json({ message: 'Erro ao obter os cadastros' });
	}
});

// Rota para buscar um cadastro específico por ID
app.get('/api/cadastros/:id', async (req, res) => {
	try {
		//  o método findById() para buscar um cadastro pelo ID do mongoose
		const cadastro = await Formulario.findById(req.params.id);

		// Verificar se o cadastro foi encontrado
		if (!cadastro) {
			return res.status(404).json({ message: 'Cadastro não encontrado' });
		}

		// Responder com o cadastro encontrado
		res.json(cadastro);
	} catch (error) {
		// Lidar com erros
		console.error('Erro ao buscar o cadastro por ID:', error);
		res.status(500).json({ message: 'Erro ao buscar o cadastro por ID' });
	}
});

// Rota para processar os dados do formulário e salvá-los no banco de dados
app.post('/api/cadastrar', async (req, res) => {
	try {
		// pegar os dados do corpo da solicitação
		const { primeiroNome, sobrenome, nomeUsuario, cpf, estado, sexo, celular, email, senha } = req.body;

		// Validar os dados do formulário
		if (!primeiroNome || !sobrenome || !nomeUsuario || !cpf || !estado || !sexo || !celular || !email || !senha)
			return res.status(400).json({ message: 'Todos os campos são obrigatórios' });

		// criar um novo objeto do modelo Formulario
		const novoCadastro = new Formulario({
			primeiroNome,
			sobrenome,
			nomeUsuario,
			cpf,
			estado,
			sexo,
			celular,
			email,
			senha
		});

		// savarr o novo cadastro no banco de dados
		const cadastroSalvo = await novoCadastro.save();

		// o cadastro salvo
		res.status(201).json(cadastroSalvo);
	} catch (error) {
		// Lidar com erros
		console.error('Erro ao processar o cadastro:', error);
		res.status(500).json({ message: 'Erro ao processar o cadastro' });
	}
});

// Rota para atualizar um cadastro existente
app.put('/api/cadastros/:id', async (req, res) => {
	try {
		// Extrair os dados de atualização do corpo da solicitação
		const dadosAtualizados = req.body;

		// Verificar se existem dados de atualização no corpo da solicitação
		if (Object.keys(dadosAtualizados).length === 0) {
			return res.status(400).json({ message: 'Nenhum dado de atualização fornecido' });
		}

		// Atualizar o cadastro com base no ID fornecido
		const cadastroAtualizado = await Formulario.findByIdAndUpdate(req.params.id, dadosAtualizados, { new: true });

		// Verificar se o cadastro foi encontrado e atualizado
		if (!cadastroAtualizado) {
			return res.status(404).json({ message: 'Cadastro não encontrado' });
		}

		// Retornar os detalhes do cadastro atualizado
		res.json(cadastroAtualizado);
	} catch (error) {
		// Lidar com erros
		console.error('Erro ao atualizar o cadastro:', error);
		res.status(500).json({ message: 'Erro ao atualizar o cadastro' });
	}
});

// Rota para excluir um cadastro
app.delete('/api/cadastros/:id', async (req, res) => {
	try {
		// Excluir o cadastro com base no ID fornecido
		const cadastroExcluido = await Formulario.findByIdAndDelete(req.params.id);

		// Verificar se o cadastro foi encontrado e excluído
		if (!cadastroExcluido) {
			return res.status(404).json({ message: 'Cadastro não encontrado' });
		}

		// Retornar uma mensagem indicando que o cadastro foi excluído com sucesso
		res.json({ message: 'Cadastro excluído com sucesso' });
	} catch (error) {
		// Lidar com erros
		console.error('Erro ao excluir o cadastro:', error);
		res.status(500).json({ message: 'Erro ao excluir o cadastro' });
	}
});

// Conectar ao banco de dados usando async/await
async function conectarAoBancoDeDados() {
	try {
		await mongoose.connect(process.env.DB_CONNECTION);
		console.log('Conectado ao banco de dados');
	} catch (error) {
	console.error('Erro ao conectar ao banco de dados:', error);
	process.exit(1); // Sair do processo em caso de erro de conexão
	}
}

conectarAoBancoDeDados()
	.then(() => {
		// Iniciar o servidor apenas após a conexão bem-sucedida
		app.listen(3000, () => console.log("Servidor em execução: http://localhost:3000/"));
	})
	.catch(error => console.error('Erro ao iniciar o servidor:', error));


	/*

acessar id
	http://localhost:3000/api/cadastros

	*/