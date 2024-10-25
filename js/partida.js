let datos

const options = {
	method: 'GET',
	headers: {
		'User-Agent': 'insomnia/10.1.0',
		apikey:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
		Authorization:
			'Beared eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
	},
}
fetch(
	'https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/pokemon?select=*',
	options,
)
	.then(response => response.json())
	.then(data => {
		console.log(data)
		const datos = visualizar(data)
		console.log(datos)
		const botonLucha = document.querySelector('.boton-luchar')
		botonLucha.addEventListener('click', () => ataque(datos))
	})
	.catch(err => console.error(err))

function visualizar(data) {
	const pokemonsP1 = data.filter(e => e.player === 'player1')
	let copiaP1 = pokemonsP1.map(e => ({ ...e, vidaActual: e.vida }))

	const pokemonsP2 = data.filter(e => e.player === 'player2')
	let copiaP2 = pokemonsP2.map(e => ({ ...e, vidaActual: e.vida }))

	copiaP1.forEach(e => {
		let imagenes = document.querySelector('#imagesP1')
		let divPokemon = document.createElement('div')
		divPokemon.setAttribute('id', `P1-${e.nombre}`)
		divPokemon.classList.add('P-pokemons')
		let imgPokemon = document.createElement('img')
		imgPokemon.setAttribute('id', `imgP1-${e.nombre}`)
		imgPokemon.setAttribute('src', e.img)
		let vidaPok = document.createElement('p')
		vidaPok.setAttribute('id', `vidaP1-${e.nombre}`)
		vidaPok.innerText = e.vidaActual + '/' + e.vida
		divPokemon.appendChild(imgPokemon)
		divPokemon.appendChild(vidaPok)
		imagenes.appendChild(divPokemon)

		divPokemon.addEventListener('click', () => {
			if (e.vidaActual > 0) {
				document.querySelector('.boton-luchar').removeAttribute('disabled')
				document.querySelector('#imgP1').classList.remove('muerto')
				copiaP1.forEach(pok => (pok.enUso = false))
				e.enUso = true
			}
			if (e.vidaActual === 0) {
				document.querySelector('.boton-luchar').setAttribute('disabled', '')
				document.querySelector('#imgP1').classList.add('muerto')
			}

			const elegir = document.getElementById('span1')
			elegir.classList.add('oculto')
			const imgPok1Batalla = document.getElementById(`imgP1`)
			imgPok1Batalla.setAttribute('src', e.img)
			const nombrePok1Batalla = document.getElementById('nombrePok1Batalla')
			nombrePok1Batalla.classList.remove('oculto')
			nombrePok1Batalla.innerText = e.nombre
			const vidaPok1Batalla = document.getElementById('vidaPok1Batalla')
			vidaPok1Batalla.classList.remove('oculto')
			vidaPok1Batalla.innerText = `Vida: ${e.vidaActual}`

			const tipoPok1Batalla = document.getElementById('tipoPok1Batalla')
			tipoPok1Batalla.classList.remove('oculto')
			tipoPok1Batalla.innerText = `Tipo: ${e.tipo}`

			const fuerzaPok1Batalla = document.getElementById('fuerzaPok1Batalla')
			fuerzaPok1Batalla.classList.remove('oculto')
			fuerzaPok1Batalla.innerText = `Fuerza: ${e.fuerza}`
		})
	})

	copiaP2.forEach(e => {
		let imagenes2 = document.querySelector('#imagesP2')
		let divPokemon2 = document.createElement('div')
		divPokemon2.setAttribute('id', `P2-${e.nombre}`)
		divPokemon2.classList.add('P-pokemons')
		let imgPokemon2 = document.createElement('img')
		imgPokemon2.setAttribute('id', `imgP2-${e.nombre}`)
		imgPokemon2.setAttribute('src', e.img)
		let vidaPok2 = document.createElement('p')
		vidaPok2.setAttribute('id', `vidaP2-${e.nombre}`)
		vidaPok2.innerText = e.vidaActual + '/' + e.vida
		divPokemon2.appendChild(imgPokemon2)
		divPokemon2.appendChild(vidaPok2)
		imagenes2.appendChild(divPokemon2)

		divPokemon2.addEventListener('click', () => {
			if (e.vidaActual > 0) {
				document.querySelector('.boton-luchar').removeAttribute('disabled')
				document.querySelector('#imgP2').classList.remove('muerto')
				copiaP2.forEach(pok => (pok.enUso = false))
				e.enUso = true
			}
			if (e.vidaActual === 0) {
				document.querySelector('.boton-luchar').setAttribute('disabled', '')
				document.querySelector('#imgP2').classList.add('muerto')
			}

			const elegir = document.getElementById('span2')
			elegir.classList.add('oculto')
			const imgPok2Batalla = document.getElementById(`imgP2`)
			imgPok2Batalla.setAttribute('src', e.img)
			const nombrePok2Batalla = document.getElementById('nombrePok2Batalla')
			nombrePok2Batalla.classList.remove('oculto')
			nombrePok2Batalla.innerText = e.nombre
			const vidaPok2Batalla = document.getElementById('vidaPok2Batalla')
			vidaPok2Batalla.classList.remove('oculto')
			vidaPok2Batalla.innerText = `Vida: ${e.vidaActual}`

			const tipoPok2Batalla = document.getElementById('tipoPok2Batalla')
			tipoPok2Batalla.classList.remove('oculto')
			tipoPok2Batalla.innerText = `Tipo: ${e.tipo}`

			const fuerzaPok2Batalla = document.getElementById('fuerzaPok2Batalla')
			fuerzaPok2Batalla.classList.remove('oculto')
			fuerzaPok2Batalla.innerText = `Fuerza: ${e.fuerza}`
		})
	})
	return { copiaP1, copiaP2 }
}

let pokVivosP1 = 3
let pokVivosP2 = 3

let turno = 1

function ataque(datos) {
	let pokBatallaP1 = datos.copiaP1.filter(e => e.enUso === true)
	let pok1Batalla = pokBatallaP1[0]
	let pokBatallaP2 = datos.copiaP2.filter(e => e.enUso === true)
	let pok2Batalla = pokBatallaP2[0]

	if (pok1Batalla.vidaActual === 0 || pok2Batalla.vidaActual === 0) {
		document.querySelector('.boton-luchar').setAttribute('disabled', '')
		return
	}

	// Ataque del Pokémon 1
	if (turno % 2 !== 0) {
		let ataque1 = Math.ceil(Math.random() * pok1Batalla.fuerza)
		pok2Batalla.vidaActual -= ataque1

		if (pok2Batalla.vidaActual <= 0) {
			pok2Batalla.vidaActual = 0
			document.querySelector('.boton-luchar').setAttribute('disabled', '')
			document
				.querySelector(`#P2-${pok2Batalla.nombre}`)
				.classList.add('muerto')
			document.querySelector(`#imgP2`).classList.add('muerto')
			pokVivosP2 -= 1
			if (pokVivosP2 === 0) {
				let ganador = document.createElement('p')
				ganador.className = 'ganador'
				ganador.innerHTML = '¡Player 1 win!'
				document.body.append(ganador)
				actualizarVida(datos.copiaP1)
			}
		}

		// Actualizar el texto de vida del Pokémon 2
		let vidaPok2Batalla = document.getElementById('vidaPok2Batalla')
		vidaPok2Batalla.innerText = `Vida: ${pok2Batalla.vidaActual}`

		let vidaPok2 = document.querySelector(`#vidaP2-${pok2Batalla.nombre}`)
		vidaPok2.innerText = pok2Batalla.vidaActual + '/' + pok2Batalla.vida

		const ataquePok1Batalla = document.getElementById('eventos-batalla')
		ataquePok1Batalla.innerHTML += `Ataca ${pok1Batalla.nombre} con daño ${ataque1} y deja a ${pok2Batalla.nombre} con ${pok2Batalla.vidaActual} de vida.<br>`
		ataquePok1Batalla.scrollTop = ataquePok1Batalla.scrollHeight

		if (pok2Batalla.vidaActual === 0) {
			document.querySelector('.boton-luchar').setAttribute('disabled', '')
			turno++
			return
		}
	} else if (turno % 2 === 0) {
		// Ataque del Pokémon 2
		let ataque2 = Math.ceil(Math.random() * pok2Batalla.fuerza)
		pok1Batalla.vidaActual -= ataque2

		if (pok1Batalla.vidaActual <= 0) {
			pok1Batalla.vidaActual = 0
			document.querySelector('.boton-luchar').setAttribute('disabled', '')
			document
				.querySelector(`#P1-${pok1Batalla.nombre}`)
				.classList.add('muerto')
			document.querySelector(`#imgP1`).classList.add('muerto')
			pokVivosP1 -= 1
			if (pokVivosP1 === 0) {
				let ganador = document.createElement('p')
				ganador.className = 'ganador'
				ganador.innerHTML = '¡Player 2 win!'
				document.body.append(ganador)
			}
		}

		// Actualizar el texto de vida del Pokémon 1
		let vidaPok1Batalla = document.getElementById('vidaPok1Batalla')
		vidaPok1Batalla.innerText = `Vida: ${pok1Batalla.vidaActual}`

		let vidaPok1 = document.querySelector(`#vidaP1-${pok1Batalla.nombre}`)
		vidaPok1.innerText = pok1Batalla.vidaActual + '/' + pok1Batalla.vida

		const ataquePok2Batalla = document.getElementById('eventos-batalla')
		ataquePok2Batalla.innerHTML += `Ataca ${pok2Batalla.nombre} con daño ${ataque2} y deja a ${pok1Batalla.nombre} con ${pok1Batalla.vidaActual} de vida.<br>`
		ataquePok2Batalla.scrollTop = ataquePok2Batalla.scrollHeight

		if (pok1Batalla.vidaActual === 0) {
			document.querySelector('.boton-luchar').setAttribute('disabled', '')
			turno++
			return
		}
	}

	console.log('Turno:', turno)
	turno++
}

const actualizarVida = datos => {
	datos.forEach(e => {
		console.log(e.vida)

		const vidaActualizada = e.vida * 1.1

		const options = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'User-Agent': 'insomnia/10.1.0',
				apikey:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
				Prefer: 'return=minimal',
			},
			body: JSON.stringify({ vida: vidaActualizada }),
		}

		fetch(
			`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/pokemon?id=eq.${e.id}`,
			options,
		)
	})
}

const reiniciar = () => {
	// const eventos = document.getElementById('eventos-batalla')
	// eventos.innerText = ''
	location.reload()
}

// function ataque(datos) {
// 	pokBatallaP1 = datos.copiaP1.filter(e => e.enUso === true)
// 	pok1Batalla = pokBatallaP1[0]

// 	pokBatallaP2 = datos.copiaP2.filter(e => e.enUso === true)
// 	pok2Batalla = pokBatallaP2[0]

// 	if (pok1Batalla.vidaActual === 0 || pok2Batalla.vidaActual === 0) {
// 		document.querySelector('.boton-luchar').setAttribute('disabled', '')
// 		return
// 	}
// 	let ataque1 = Math.ceil(Math.random() * pok1Batalla.fuerza)
// 	pok2Batalla.vidaActual -= ataque1
// 	if (pok2Batalla.vidaActual <= 0) {
// 		pok2Batalla.vidaActual = 0
// 		document.querySelector('.boton-luchar').setAttribute('disabled', '')
// 		document.querySelector(`#P2-${pok2Batalla.nombre}`).classList.add('muerto')
// 		document.querySelector(`#imgP2`).classList.add('muerto')
// 		pokVivosP2 -= 1
// 		if (pokVivosP2 === 0) {
// 			let ganador = document.createElement('p')
// 			ganador.className = 'ganador'
// 			ganador.innerHTML = '¡Player 1 win!'
// 			document.body.append(ganador)
// 		}
// 	}
// 	let vidaPok2 = pok2Batalla.vidaActual
// 	vidaPok2.innerText = pok2Batalla.vidaActual + '/' + pok2Batalla.vida
// 	let vidaPok2Batalla = document.getElementById('vidaPok2Batalla')
// 	vidaPok2Batalla.innerText = `Vida: ${pok2Batalla.vidaActual}`
// 	const ataquePok1Batalla = document.getElementById('eventos-batalla')
// 	ataquePok1Batalla.innerHTML += `Ataca ${pok1Batalla.nombre} con daño ${ataque1} y deja a ${pok2Batalla.nombre} con ${pok2Batalla.vidaActual} de vida.<br>`
// 	ataquePok1Batalla.scrollTop = ataquePok1Batalla.scrollHeight
// 	if (pok2Batalla.vidaActual === 0) {
// 		document.querySelector('.boton-luchar').setAttribute('disabled', '')
// 		return
// 	}
// 	let ataque2 = Math.ceil(Math.random() * pok2Batalla.fuerza)
// 	pok1Batalla.vidaActual -= ataque2
// 	if (pok1Batalla.vidaActual <= 0) {
// 		pok1Batalla.vidaActual = 0
// 		document.querySelector('.boton-luchar').setAttribute('disabled', '')
// 		document.querySelector(`#P1-${pok1Batalla.nombre}`).classList.add('muerto')
// 		document.querySelector(`#imgP1`).classList.add('muerto')
// 		pokVivosP1 -= 1
// 		if (pokVivosP1 === 0) {
// 			let ganador = document.createElement('p')
// 			ganador.className = 'ganador'
// 			ganador.innerHTML = '¡Player 2 win!'
// 			document.body.append(ganador)
// 		}
// 	}
// 	let vidaPok1 = pok1Batalla.vidaActual
// 	vidaPok1.innerText = pok1Batalla.vidaActual + '/' + pok1Batalla.vida
// 	let vidaPok1Batalla = document.getElementById('vidaPok1Batalla')
// 	vidaPok1Batalla.innerText = `Vida: ${pok1Batalla.vidaActual}`
// 	const ataquePok2Batalla = document.getElementById('eventos-batalla')
// 	ataquePok2Batalla.innerHTML += `Ataca ${pok2Batalla.nombre} con daño ${ataque2} y deja a ${pok1Batalla.nombre} con ${pok1Batalla.vidaActual} de vida.<br>`
// 	ataquePok2Batalla.scrollTop = ataquePok2Batalla.scrollHeight
// 	if (pok1Batalla.vidaActual === 0) {
// 		document.querySelector('.boton-luchar').setAttribute('disabled', '')
// 		return
// 	}
// 	turno++
// 	console.log('Turno:', turno)
// }
