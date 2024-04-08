const deleteForm = document.getElementById ( 'deleteForm' );
const deleteMessage = document.getElementById ( 'deleteMessage' );

deleteForm.addEventListener('submit', async ( event ) => {
	event.preventDefault();
	const cadastroIdDeletar = deleteForm.cadastroIdDeletar.value;

	try {
		const response = await fetch(`/api/cadastros/${cadastroIdDeletar}`, { method: 'DELETE' });
		const data = await response.json();

		if (response.ok)
			// Exibir mensagem de sucesso
			deleteMessage.innerHTML = `<p>${data.message}</p>`;
		else
			// Exibir mensagem de erro
			deleteMessage.innerHTML = `<p>${data.message}</p>`;
		
	} catch (error) {
		deleteMessage.innerHTML = `<p>Ocorreu um erro ao deletar o cadastro.</p>`;
		console.error('Erro:', error);
	}
});
