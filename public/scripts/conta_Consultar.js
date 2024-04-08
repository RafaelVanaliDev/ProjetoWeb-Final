const searchForm = document.getElementById ( 'searchForm' );
const cadastroInfo = document.getElementById ( 'cadastroInfo' );

searchForm.addEventListener('submit', async ( event ) => {
	event.preventDefault();
	const cadastroId = searchForm.cadastroId.value;

	try {
		const response = await fetch(`/api/cadastros/${cadastroId}`);
		const data = await response.json();

		if (response.ok)
		{
			// Exibir os dados do cadastro
			cadastroInfo.innerHTML = `
				<h3>Dados do Cadastro:</h3>
				<p><strong>ID:</strong> ${data._id}</p>
				<p><strong>Primeiro Nome:</strong> ${data.primeiroNome}</p>
				<p><strong>Sobrenome:</strong> ${data.sobrenome}</p>
				<p><strong>Nome de Usuário:</strong> ${data.nomeUsuario}</p>
				<p><strong>CPF:</strong> ${data.cpf}</p>
				<p><strong>Estado:</strong> ${data.estado}</p>
				<p><strong>Sexo:</strong> ${data.sexo}</p>
				<p><strong>Celular:</strong> ${data.celular}</p>
				<p><strong>Email:</strong> ${data.email}</p>
			`;
		}
		else
			cadastroInfo.innerHTML = `<p>${data.message}</p>`;

	} catch (error) {
		cadastroInfo.innerHTML = `<p>Ocorreu um erro ao buscar o cadastro.</p>`;
		console.error('Erro:', error);
	}
});
