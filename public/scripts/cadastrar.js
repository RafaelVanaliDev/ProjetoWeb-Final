const formulario =
{
	dados:
	{
		primeiroNome: "",
		sobrenome: "",
		nomeUsuario: "",
		cpf: "",
		estado: "",
		sexo: "",
		celular: "",
		email: "",
		senha: "",
		confirmarSenha: ""
	},

	validarPrimeiroNome: function ()
	{
		let primeiroNome = this.dados.primeiroNome.trim();
		let regex = /^[a-zA-Z\u00C0-\u017F']+$/;

		if ( primeiroNome === "" || !regex.test ( primeiroNome ))
		{
			this.mostrarErro ( "primeiroNome", "erroPrimeiroNome" );
			this.ocultarSucesso ( "sucessoPrimeiroNome" );
			return false;
		}

		else
		{
			this.ocultarErro ( "primeiroNome", "erroPrimeiroNome" );
			this.mostrarSucesso ( "sucessoPrimeiroNome" );
			return true;
		}
	},

	validarSobrenome: function ()
	{
		let sobrenome = this.dados.sobrenome.trim();
		let regex = /^[a-zA-Z\u00C0-\u017F' ]+$/;

		if ( sobrenome === "" || !regex.test ( sobrenome ))
		{
			this.mostrarErro ( "sobrenome", "erroSobrenome" );
			this.ocultarSucesso ( "sucessoSobrenome" );
		return false;
		}

		else
		{
			this.ocultarErro ( "sobrenome", "erroSobrenome" );
			this.mostrarSucesso ( "sucessoSobrenome" );
		return true;
		}
	},

	validarNomeUsuario: function ()
	{
		let nomeUsuario = this.dados.nomeUsuario.trim();
		let regex = /^[a-zA-Z\u00C0-\u017F']+$/;

		if ( nomeUsuario === "" || !regex.test ( nomeUsuario ))
		{
			this.mostrarErro ( "nomeUsuario", "erroNomeUsuario" );
			this.ocultarSucesso ( "sucessoNomeUsuario" );
			return false;
		}

		else
		{
			this.ocultarErro ( "nomeUsuario", "erroNomeUsuario" );
			this.mostrarSucesso ( "sucessoNomeUsuario" );
			return true;
		}
	},

	validarCPF: function ()
	{
		let cpf = this.dados.cpf.replace (/[^\d]+/g, '');

		if ( cpf.length !== 11 || cpf.match (/^(.)\1*$/) )
		{
			this.mostrarErro ( "cpf", "erroCPF" );
			this.ocultarSucesso ( "sucessoCPF" );
			return false;
		}

		else
		{
			let soma = 0;
			for ( let i = 0; i < 9; i++ )
				soma += parseInt ( cpf.charAt ( i )) * ( 10 - i );

			let resto = soma % 11;
			let digitoVerificador1 = resto < 2 ? 0 : 11 - resto;
			soma = 0;
			for ( let i = 0; i < 10; i++ )
				soma += parseInt(cpf.charAt(i)) * (11 - i);

			resto = soma % 11;
			let digitoVerificador2 = resto < 2 ? 0 : 11 - resto;

			if ( parseInt ( cpf.charAt ( 9 )) !== digitoVerificador1 || parseInt ( cpf.charAt ( 10 )) !== digitoVerificador2 )
			{
				this.mostrarErro ( "cpf", "erroCPF" );
				this.ocultarSucesso ( "sucessoCPF" );
				return false;
			}
		}

		this.ocultarErro ( "cpf", "erroCPF" );
		this.mostrarSucesso ( "sucessoCPF" );
		return true;
	},

	validarEstado: function ()
	{
		if ( this.dados.estado === "" )
		{
			this.mostrarErro ( "estado", "erroEstado" );
			this.ocultarSucesso ( "sucessoEstado" );
			return false;
		}

		else
		{
			this.ocultarErro ( "estado", "erroEstado" );
			this.mostrarSucesso ( "sucessoEstado" );
			return true;
		}
	},

	validarSexo: function ()
	{
		if ( this.dados.sexo === "" )
		{
			this.mostrarErro ( "sexo", "erroSexo" );
			this.ocultarSucesso ( "sucessoSexo" );
			return false;
		}

		else
		{
			this.ocultarErro ( "sexo", "erroSexo" );
			this.mostrarSucesso ( "sucessoSexo" );
			return true;
		}
	},

	validarCelular: function ()
	{
		let celular = this.dados.celular.trim();
		let regex = /^[0-9]{10,11}$/;

		if ( celular === "" || !regex.test ( celular ))
		{
			this.mostrarErro ( "celular", "erroCelular" );
			this.ocultarSucesso ( "sucessoCelular" );
			return false;
		}

		else
		{
			this.ocultarErro ( "celular", "erroCelular" );
			this.mostrarSucesso ( "sucessoCelular" );
			return true;
		}
	},

	validarEmail: function ()
	{
		let email = this.dados.email.trim();
		let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if ( email === "" || !regex.test ( email ))
		{
			this.mostrarErro ( "email", "erroEmail" );
			this.ocultarSucesso ( "sucessoEmail" );
			return false;
		}

		else
		{
			this.ocultarErro ( "email", "erroEmail" );
			this.mostrarSucesso ( "sucessoEmail" );
			return true;
		}
	},

	validarSenha: function()
	{
		let senha = this.dados.senha.trim();
		let confirmarSenha = this.dados.confirmarSenha.trim();
	
		if ( senha !== confirmarSenha || senha === "" )
		{
			this.mostrarErro ( "confirmarSenha", "erroSenha" );
			this.ocultarSucesso ( "sucessoSenha" );
			return false;
		}

		else
		{
			this.ocultarErro ( "confirmarSenha", "erroSenha" );
			this.mostrarSucesso ( "sucessoSenha" );
			return true;
		}
	},

	// Função para acompanhar os resultados e testar
	enviarDados: function ()
	{
		console.log ( "Dados do formulário enviados com sucesso!" );
		console.log ( "Dados inseridos:", this.dados );

	//  localStorage.setItem('dadosFormulario', JSON.stringify(this.dados));
	},

	// Função auxiliar para mostrar mensagem de erro
	mostrarErro: function ( campo, erro )
	{
		document.getElementById ( campo ).classList.add ( "is-invalid" );
		document.getElementById ( erro ).style.display = "block";
	},

	// Função auxiliar para ocultar mensagem de erro
	ocultarErro: function ( campo, erro )
	{
		document.getElementById ( campo ).classList.remove( "is-invalid" );
		document.getElementById ( erro ).style.display = "none";
	},

	// Função auxiliar para mostrar mensagem de sucesso
	mostrarSucesso: function ( sucesso )
	{
		document.getElementById ( sucesso ).style.display = "block";
	},

	// Função auxiliar para ocultar mensagem de sucesso
	ocultarSucesso: function ( sucesso )
	{
		document.getElementById(sucesso).style.display = "none";
	},

	// Função para enviar os dados do formulário
	enviarDados: function ()
	{
		console.log("Dados do formulário enviados com sucesso!");
		// acredito que quyando for enviar dados a um JSON (se for pedido na proxima parte) - *-*** adicinar aqui ****
	},

	// Função para validar o formulário
	validar_Formulario: function ()
	{
		if
		(
		this.validarPrimeiroNome() &&
		this.validarSobrenome() &&
		this.validarNomeUsuario() &&
		this.validarCPF() &&
		this.validarEstado() &&
		this.validarSexo() &&
		this.validarCelular() &&
		this.validarEmail() && 
		this.validarSenha()
		) {
		// Verifica se todos os campos estão preenchidos
		if
		(
			this.dados.primeiroNome.trim() !== "" &&
			this.dados.sobrenome.trim() !== "" &&
			this.dados.nomeUsuario.trim() !== "" &&
			this.dados.cpf.trim() !== "" &&
			this.dados.estado.trim() !== "" &&
			this.dados.sexo.trim() !== "" &&
			this.dados.celular.trim() !== "" &&
			this.dados.email.trim() !== "" &&
			this.dados.senha.trim() !== ""
		)   {
			this.enviarDados();
			exibir_Prompt_Cadastro();
			return true; // Retorna true se todos os campos estiverem validados corretamente e preenchidos
			}

		else
			alert ( "Por favor, preencha todos os campos antes de cadastrar." );
		}

		return false;
	}
};


// Função para enviar os dados do formulário para o servidor app.js
const enviarDadosParaServidor = async (dados) => {
	try {
		const response = await fetch('/api/cadastrar', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(dados) // Enviar os dados do formulário em JSON
		});

		if (response.ok)
			console.log('Dados cadastrados com sucesso!');
		else
			console.error('Erro ao cadastrar os dados:', response.statusText);

	} catch (error) {
		console.error('Erro ao enviar os dados para o servidor:', error);
	}
};

// quando o formulário for enviado
document.getElementById ( 'botaoCadastro' ).addEventListener ( 'click', async ( event ) => {
	event.preventDefault(); // Impede o comportamento padrão do botão (enviar o formulário)

	// Obtém os dados do formulário e envia para o servidor
	const dadosDoFormulario =
	{
		primeiroNome: document.getElementById ( 'primeiroNome' ).value.trim(),
		sobrenome: document.getElementById ( 'sobrenome' ).value.trim(),
		nomeUsuario: document.getElementById ( 'nomeUsuario' ).value.trim(),
		cpf: document.getElementById ( 'cpf' ).value.trim(),
		estado: document.getElementById ( 'estado' ).value,
		sexo: document.getElementById ( 'sexo' ).value,
		celular: document.getElementById ( 'celular' ).value.trim(),
		email: document.getElementById ( 'email' ).value.trim(),
		senha: document.getElementById ( 'senha' ).value.trim(),
		confirmarSenha: document.getElementById ( 'confirmarSenha' ).value.trim()
	};

	await enviarDadosParaServidor(dadosDoFormulario); // Envia os dados para o servidor
});


// Adiciona eventos de input para cada campo
document.getElementById ( "primeiroNome" ).addEventListener("input", function ()
{
	formulario.dados.primeiroNome = this.value;
	formulario.validarPrimeiroNome();
});

document.getElementById ( "sobrenome" ).addEventListener ( "input", function ()
{
	formulario.dados.sobrenome = this.value;
	formulario.validarSobrenome();
});

document.getElementById ( "nomeUsuario" ).addEventListener ( "input", function ()
{
	formulario.dados.nomeUsuario = this.value;
	formulario.validarNomeUsuario();
});

document.getElementById ( "cpf" ).addEventListener ( "input", function ()
{
	formulario.dados.cpf = this.value;
	formulario.validarCPF();
});

document.getElementById ( "estado" ).addEventListener ( "change", function ()
{
	formulario.dados.estado = this.value;
	formulario.validarEstado();
});

document.getElementById ( "sexo" ).addEventListener ( "change", function ()
{
	formulario.dados.sexo = this.value;
	formulario.validarSexo();
});

document.getElementById ( "celular" ).addEventListener ( "change", function ()
{
	formulario.dados.celular = this.value;
	formulario.validarCelular();
});

document.getElementById ( "email" ).addEventListener ( "input", function ()
{
	formulario.dados.email = this.value;
	formulario.validarEmail();
});

document.getElementById ( "senha" ).addEventListener ( "input", function()
{
	formulario.dados.senha = this.value;
});

document.getElementById ( "confirmarSenha" ).addEventListener ( "input", function()
{
	formulario.dados.confirmarSenha = this.value;
	formulario.validarSenha();
});


// Adiciona evento de submit para o formulário
document.getElementById ( "botaoCadastro" ).addEventListener ( "click", function ()
{
	if ( formulario.validar_Formulario() )  // Chama a função validar_Formulario quando o botão de cadastrar for clicado
		exibir_Prompt_Cadastro(); // e exibe o prompt de cadastro apenas se o formulário for validado com sucesso
});

// Mostrar no console o objeto dos dados preenchidos (corretamente)
document.getElementById ( "botaoCadastro" ).addEventListener ( "click", function ()
{
	console.log ( "Objeto contendo os dados preenchidos:", formulario.dados );
});


// Função para exibir o prompt de cadastro quando for concluído, quando clicar em "CADASTRAR"
function exibir_Prompt_Cadastro()
{
	// Obtendo o nome de usuário do objeto de dados do formulário
	const nomeUsuario = formulario.dados.nomeUsuario;

	// usando o Bootstrap
	const modalHTML =
	`
		<div class="modal fade" id="cadastroModal" tabindex="-1" aria-labelledby="cadastroModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
			<div class="modal-header center">
				<h3 class="modal-title mensagem-cadastro-feito" id="cadastroModalLabel">Cadastro Feito Com Sucesso!</h3>
			</div>
			<div class="modal-body">
				<p class="mensagem-texto">Parabéns <span class = "cor-usuario"> ${nomeUsuario}</span>! Seu cadastro foi realizado com sucesso.</p>
				<p class="mensagem-erro">Clique em "Voltar para Página Inicial" e faça o seu login.</p>
			</div>
			<div class="modal-footer">
				<a href="index.html" class="btn btn-primary">Voltar para Página Inicial</a>
			</div>
			</div>
		</div>
		</div>
	`;

	document.body.insertAdjacentHTML ( 'beforeend', modalHTML );

	const cadastroModal = new bootstrap.Modal ( document.getElementById ( 'cadastroModal' ), { backdrop: 'static', keyboard: false });
	cadastroModal.show();
}
