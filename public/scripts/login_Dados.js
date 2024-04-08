// login/entrar

function abrirModalDeLogin()
{
	document.getElementById ( "entrarLink" ).addEventListener ( "click", function ( event )
	{
		event.preventDefault(); // Evita a ação padrão do link

		// Exibe o modal de login
		let loginModal = new bootstrap.Modal (document.getElementById ( 'loginModal' ));
		loginModal.show();
	});
}

// Chamar funçao ao carregar a pagina
window.onload = abrirModalDeLogin;
