// coloca o rodapé em cada uma das páginas

document.addEventListener ( "DOMContentLoaded", function()
{
	const footer = document.createElement ( "footer" );
	const div = document.createElement ( "div" );

	// Adiciona o conteúdo ao div de dentro
	div.innerHTML = '<p>Trabalho de Programação para Web</p>' +
		'<p class = "contact-info">Trabalhe conosco, contato: (xx) x xxxx - xxxx</p>';

	// Adiciona div
	footer.appendChild ( div );

	// Adiciona o rodapé 
	document.body.appendChild ( footer );
});
