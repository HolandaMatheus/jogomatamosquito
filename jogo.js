
//Descobrindo o tamanho total da tela para que o jogo 
//seja criado em cima da capacidade máxima da  
//tela sem que o usuário se perca no jogo e deixando expansivo

var altura = 0
var largura = 0
var vidas = 1
var tempo = 10

var criaMosquitoTempo = 1500

//O search pega o que esta dps de uma " ? " que são os parâmetros. Detalhe: o '?' tbm é recuperado
var nivel = window.location.search
//O REPLACE recebe dois parâmetros: ('O CARACTERE QUE ESTA PROCURANDO (PEGA TODOS QUE APARECEM)', 'E O VALOR QUE DESEJA COLOCAR NO LUGAR... CASO QUEIRA QUE SEJA VAZIO = '' ')
nivel = nivel.replace('?','')

if (nivel === 'normal') {
	criaMosquitoTempo
} else if (nivel === 'dificil') {
	criaMosquitoTempo = 1100
} else if (nivel === 'extremo') {
	criaMosquitoTempo = 850
}

function ajustaTelaJogo() {
	altura = window.innerHeight
	largura = window.innerWidth
	console.log(altura,largura)
}

ajustaTelaJogo()

var cronometro = setInterval(function() {

	tempo -= 1

	if(tempo < 0) {
		//acabou o tempo e o jogador ta vivo
		clearInterval(cronometro)
		clearInterval(criaMosquito)
		window.location.href = 'vitoria.html'
	} else {
		document.getElementById('cronometro').innerHTML = tempo	
	}
	
}, 1000)


function posicaoRandomica() {

	//validando se o elemento já existe
	if(document.getElementById('mosquito')){
		document.getElementById('mosquito').remove()

		if(vidas > 3 ){
			window.location.href = 'fim_de_jogo.html'
		} else {
			document.getElementById('v' + vidas).src = 'imagens/coracao_vazio.png'

			vidas++
		}		
	}

	//Usando o Math.floor para arredontar o Math.random que gerar pontos aleatórios. Esta sendo multiplicado pela altura e largura, pq o random gera número até 1 (0.876 ou 0.4324 por exemplo)	
	var posicaoX = Math.floor(Math.random() * largura) - 90
	var posicaoY = Math.floor(Math.random() * altura) - 90 //evitando estourar a tela

	//caso as posições forem exatamente 0 x,y a imagem some e para tratar isso:
	//Utilizando o operador ternário são esperados a condição, ?(sim/nao ) "sim" recebe ou execulta algo (no caso o 0), "não" recebe ou execulta algo (no caso a própria variavel) 
	posicaoX = posicaoX < 0 ? 0 : posicaoX
	posicaoY = posicaoY < 0 ? 0 : posicaoY

	console.log(posicaoX, posicaoY)

	//criando um elemento HTML
	//criando um elemento do tipo imagem
	var mosquito = document.createElement('img')
	//passando o caminho da imagem
	mosquito.src = 'imagens/mosca.png'
	//colocando a edição e trocando o lado da imagem 
	//precisa do ESPAÇO para o browser entender que esta chamando duas funções
	mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
	// passando as coordenadas 
	mosquito.style.left = posicaoX + 'px'
	mosquito.style.top = posicaoY +'px'
	//para definir onde a img deve aparecer (ponto na xoordenada X e Y)
	mosquito.style.position = 'absolute'
	// colocando um ID para verificar se o elemento já existe e se existir, sera apagado
	mosquito.id = 'mosquito'
	mosquito.onclick = function() {
		this.remove()
	} 


	document.body.appendChild(mosquito)
	tamanhoAleatorio()

	ladoAleatorio()
}

function tamanhoAleatorio() {
	//Criando uma variável que permite o jogo escolher, de maneira aleatória, o tamanho do mosquito
	// o resultado esperado na conta abaixo é de 0 à 3
	var classe = Math.floor(Math.random() * 3)
	
	//condição que verifica o valor gerado e retorna a classe 
	switch(classe) {
		case 0:
			return 'mosquito1'
		
		case 1:
			return 'mosquito2'

		case 2:
			return 'mosquito3'

	}
}

function ladoAleatorio() {
	//Criando uma variável que permite o jogo escolher, de maneira aleatória, o lado que a img aparece
	var classe = Math.floor(Math.random() * 2)
	
	//condição que verifica o valor gerado e retorna a classe 
	switch(classe) {
		case 0:
			return 'ladoA'
		
		case 1:
			return 'ladoB'
	}
}