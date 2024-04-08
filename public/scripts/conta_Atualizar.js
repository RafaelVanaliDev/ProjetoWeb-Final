const updateForm = document.getElementById ( 'updateForm' );
const updateMessage = document.getElementById( 'updateMessage' );

updateForm.addEventListener( 'submit', async ( event ) => {
	event.preventDefault(); // Evitar o comportamento padrão de enviar o formulário

	//  dados do formulário
	const cadastroId = updateForm.querySelector ( '#cadastroIdUpdate' ).value;
	const novoPrimeiroNome = updateForm.querySelector ( '#novoPrimeiroNome' ).value;
	const novoSobrenome = updateForm.querySelector ( '#novoSobrenome' ).value;
	const novoNomeUsuario = updateForm.querySelector ( '#novoNomeUsuario' ).value;
	const novoCPF = updateForm.querySelector ( '#novoCPF' ).value;
	const novoEstado = updateForm.querySelector ( '#novoEstado' ).value;
	const novoSexo = updateForm.querySelector ( '#novoSexo' ).value;
	const novoCelular = updateForm.querySelector ( '#novoCelular' ).value;
	const novoEmail = updateForm.querySelector ( '#novoEmail' ).value;
	const novaSenha = updateForm.querySelector ( '#novaSenha' ).value;

	const dataToUpdate = {}; // Objeto para armazenar os dados a serem atualizados

	// Adicionando os campos novos do usuario preenchidos ao objeto de dados a serem atualizados
	if ( novoPrimeiroNome )
		dataToUpdate.primeiroNome = novoPrimeiroNome;

	if ( novoSobrenome )
		dataToUpdate.sobrenome = novoSobrenome;

	if ( novoNomeUsuario )
		dataToUpdate.nomeUsuario = novoNomeUsuario;

	if ( novoCPF )
		dataToUpdate.cpf = novoCPF;

	if ( novoEstado )
		dataToUpdate.estado = novoEstado;

	if ( novoSexo )
		dataToUpdate.sexo = novoSexo;

	if ( novoCelular )
		dataToUpdate.celular = novoCelular;

	if ( novoEmail )
		dataToUpdate.email = novoEmail;

	if ( novaSenha )
		dataToUpdate.senha = novaSenha;

	try {
		// Enviando uma solicitação PUT para atualizar o cadastro
		const response = await fetch(`/api/cadastros/${cadastroId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(dataToUpdate) // Enviando apenas os campos preenchidos para atualização
		});

		// Verificando se a solicitação foi bem realizada
		if (response.ok)
		{
			const data = await response.json();
			updateMessage.textContent = 'Cadastro atualizado com sucesso.';
		}
		else
			updateMessage.textContent = 'Erro ao atualizar o cadastro.';
	} catch (error) {
		console.error('Erro ao enviar solicitação de atualização:', error);
		updateMessage.textContent = 'Erro ao enviar solicitação de atualização.';
	}
});
