const user_id = sessionStorage.getItem('user_id')
const token = sessionStorage.getItem('access_token')
let P1
let P2

function visualizarP1(copiaP1) {
	copiaP1.forEach(e => {
		let imagenes
		if (P1 === user_id) {
			imagenes = document.querySelector('#imagesP1')
		} else {
			imagenes = document.querySelector('#imagesP2')
		}

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
			if (P1 === user_id) {
				pokBat(e)
			}
		})
	})
}

function visualizarP2(copiaP2) {
	copiaP2.forEach(e => {
		let imagenes2
		if (P1 === user_id) {
			imagenes2 = document.querySelector('#imagesP2')
		} else {
			imagenes2 = document.querySelector('#imagesP1')
		}
		// let imagenes2 = document.querySelector('#imagesP2')
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
			if (P2 === user_id) {
				pokBat(e)
			}
			// pokBat(e)
		})
	})
}

async function visualizar(data) {
	const options2 = {
		method: 'GET',
		headers: {
			'User-Agent': 'insomnia/10.1.1',
			apikey:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
			Authorization: `Bearer ${token}`,
		},
	}

	let pok1_1 = ''
	let pok1_2 = ''
	let pok1_3 = ''
	let pok2_1 = ''
	let pok2_2 = ''
	let pok2_3 = ''
	let response = await fetch(
		`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?&select=poks1%2Cpoks2`,
		options2,
	)
	let data2 = await response.json()
	// .then(response => response.json())
	// .then(data2 => {
	P1 = data2[0].poks1[0]
	P2 = data2[0].poks2[0]
	pok1_1 = data2[0].poks1[1]
	pok1_2 = data2[0].poks1[2]
	pok1_3 = data2[0].poks1[3]
	pok2_1 = data2[0].poks2[1]
	pok2_2 = data2[0].poks2[2]
	pok2_3 = data2[0].poks2[3]

	const pokemonsP1 = data.filter(
		e => e.nombre === pok1_1 || e.nombre === pok1_2 || e.nombre === pok1_3,
	)
	let copiaP1 = pokemonsP1.map(e => ({ ...e, vidaActual: e.vida }))
	// console.log(copiaP1)

	const pokemonsP2 = data.filter(
		e => e.nombre === pok2_1 || e.nombre === pok2_2 || e.nombre === pok2_3,
	)
	let copiaP2 = pokemonsP2.map(e => ({ ...e, vidaActual: e.vida }))
	// console.log(copiaP2)

	if (P1 === user_id) {
		visualizarP1(copiaP1)
		visualizarP2(copiaP2)
	} else {
		visualizarP1(copiaP1)
		visualizarP2(copiaP2)
	}

	setInterval(() => {
		pokBat2(copiaP1, copiaP2)
	}, 1000)

	// pokBatElegido()
	// })
	// .catch(err => console.error(err))
	return [copiaP1, copiaP2]
}

async function pokBat(e) {
	// console.log(e)
	if (e !== undefined) {
		// console.log(e)
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

		const botonConfirmar = document.getElementById('boton-confirmar')
		botonConfirmar.classList.remove('oculto')

		botonConfirmar.addEventListener('click', () => {
			if (P1 === user_id) {
				pokUso1(nombrePok1Batalla.textContent)
				console.log(algo)
			} else {
				pokUso2(nombrePok1Batalla.textContent)
			}
		})
		// console.log(nombrePok1Batalla.innerText)
		// return nombrePok1Batalla.innerText
	}
	// if (P1 === user_id) {
	// let pokBatSeleccionado = await pokBatElegido(datos)
	// console.log(pokBatSeleccionado)
	// e = datos[0].filter(element => element.nombre === pokBatSeleccionado)
	// } else {
	// 	e = datos[1].filter(element => element.nombre === batPok2[0])
	// }
}

async function pokBat2(copiaP1, copiaP2) {
	const options2 = {
		method: 'GET',
		headers: {
			'User-Agent': 'insomnia/10.1.1',
			apikey:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
			Authorization: `Bearer ${token}`,
		},
	}
	let response = await fetch(
		`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?&select=P1EnUso%2CP2EnUso`,
		options2,
	)
	let data4 = await response.json()
	// .then(response => response.json())
	// .then(data4 => {
	pok1 = data4[0].P1EnUso
	pok2 = data4[0].P2EnUso

	if (P1 === user_id) {
		// const options3 = {
		// 	method: 'GET',
		// 	headers: {
		// 		'User-Agent': 'insomnia/10.1.1',
		// 		apikey:
		// 			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
		// 		Authorization: `Bearer ${token}`,
		// 	},
		// }
		// let response = await fetch(
		// 	`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/pokemon?&select=*`,
		// 	options3,
		// )
		// let data3 = await response.json()
		// .then(response => response.json())
		// .then(data3 => {
		// 	// console.log(pok2)
		const batPok2 = copiaP2.filter(e => e.nombre === pok2)
		pokEnUso2(batPok2[0])
		// })
		// .catch(err => console.error(err))
	} else {
		// const options3 = {
		// 	method: 'GET',
		// 	headers: {
		// 		'User-Agent': 'insomnia/10.1.1',
		// 		apikey:
		// 			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
		// 		Authorization: `Bearer ${token}`,
		// 	},
		// }
		// let response = await fetch(
		// 	`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/pokemon?&select=*`,
		// 	options3,
		// )
		// let data3 = await response.json()
		// .then(response => response.json())
		// .then(data3 => {
		const batPok1 = copiaP1.filter(e => e.nombre === pok1)
		pokEnUso2(batPok1[0])
		// })
		// .catch(err => console.error(err))
	}
	// })
	// .catch(err => console.error(err))
}

function pokEnUso2(e) {
	// console.log(e)
	if (e !== undefined) {
		const elegir = document.getElementById('span2')
		elegir.classList.add('oculto')
		const cargar = document.getElementById('cargando')
		cargar.classList.add('oculto')
		const imgPok2Batalla = document.getElementById(`imgP2`)
		imgPok2Batalla.setAttribute('src', e.img)
		const nombrePok2Batalla = document.getElementById('nombrePok2Batalla')
		nombrePok2Batalla.classList.remove('oculto')
		nombrePok2Batalla.innerText = e.nombre
		const vidaPok2Batalla = document.getElementById('vidaPok2Batalla')
		vidaPok2Batalla.classList.remove('oculto')
		vidaPok2Batalla.innerText = `Vida: ${e.vida}`

		const tipoPok2Batalla = document.getElementById('tipoPok2Batalla')
		tipoPok2Batalla.classList.remove('oculto')
		tipoPok2Batalla.innerText = `Tipo: ${e.tipo}`

		const fuerzaPok2Batalla = document.getElementById('fuerzaPok2Batalla')
		fuerzaPok2Batalla.classList.remove('oculto')
		fuerzaPok2Batalla.innerText = `Fuerza: ${e.fuerza}`
	}
}

async function pokUso1(nombre) {
	const options = {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'User-Agent': 'insomnia/10.1.0',
			apikey:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
			Authorization: `Bearer ${token}`,
			Prefer: 'return=minimal',
		},
		body: `{"P1EnUso":"${nombre}"}`,
	}

	let response = await fetch(
		`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?player1=eq.${user_id}`,
		options,
	)
	console.log(response)
	// .catch(err => console.log(err))
}

async function pokUso2(nombre) {
	const options = {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'User-Agent': 'insomnia/10.1.0',
			apikey:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
			Authorization: `Bearer ${token}`,
			Prefer: 'return=minimal',
		},
		body: `{"P2EnUso":"${nombre}"}`,
	}

	let response = await fetch(
		`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?player2=eq.${user_id}`,
		options,
	)
	// .catch(err => console.log(err))
}

let pok1
let pok2

async function main() {
	const options5 = {
		method: 'GET',
		headers: {
			'User-Agent': 'insomnia/10.1.1',
			apikey:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
			Authorization: `Bearer ${token}`,
		},
	}
	let response3 = await fetch(
		`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?&select=P1EnUso%2CP2EnUso`,
		options5,
	)
	let data6 = await response3.json()
	console.log(data6)
	pok1 = data6[0].P1EnUso
	pok2 = data6[0].P2EnUso
	console.log(pok1)
	console.log(pok2)

	const options = {
		method: 'GET',
		headers: {
			'User-Agent': 'insomnia/10.1.0',
			apikey:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
			Authorization: `Bearer ${token}`,
		},
	}
	let response = await fetch(
		`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/pokemon?select=*`,
		options,
	)
	let data = await response.json()

	const options7 = {
		method: 'GET',
		headers: {
			'User-Agent': 'insomnia/10.1.0',
			apikey:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
			Authorization: `Bearer ${token}`,
		},
	}
	let response7 = await fetch(
		`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/pokemon?nombre=eq.${pok1}&select=*`,
		options7,
	)
	let [data7] = await response7.json()

	const options8 = {
		method: 'GET',
		headers: {
			'User-Agent': 'insomnia/10.1.0',
			apikey:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
			Authorization: `Bearer ${token}`,
		},
	}
	let response8 = await fetch(
		`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/pokemon?nombre=eq.${pok2}&select=*`,
		options8,
	)
	let [data8] = await response8.json()

	// console.log(data7)
	// console.log(data8)
	// .then(response => response.json())
	// .then(data => {
	let [datosP1, datosP2] = await visualizar(data)
	let [pokemonBatallaP1] = datosP1.filter(e => e.nombre === data7.nombre)
	let [pokemonBatallaP2] = datosP2.filter(e => e.nombre === data8.nombre)

	if (P1 === user_id && pok1) {
		pokBat(pokemonBatallaP1)
	} else if (P2 === user_id && pok2) {
		pokBat(pokemonBatallaP2)
		// console.log(nose)
	}

	const botonLucha = document.querySelector('.boton-luchar')
	botonLucha.addEventListener('click', () =>
		ataque(pokemonBatallaP1, pokemonBatallaP2),
	)
}

let pokVivosP1 = 3
let pokVivosP2 = 3

let turno = 1

function ataque(pokemonBatallaP1, pokemonBatallaP2) {
	console.log(pokemonBatallaP1)
	console.log(pokemonBatallaP2)
	// let pokBatallaP1 = datos.copiaP1.filter(e => e.enUso === true)
	// let pok1Batalla = pokBatallaP1[0]
	// let pokBatallaP2 = datos.copiaP2.filter(e => e.enUso === true)
	// let pok2Batalla = pokBatallaP2[0]

	if (pokemonBatallaP1.vidaActual === 0 || pokemonBatallaP2.vidaActual === 0) {
		document.querySelector('.boton-luchar').setAttribute('disabled', '')
		return
	}

	// Ataque del Player 1
	if (turno % 2 !== 0) {
		let ataque1 = Math.ceil(Math.random() * pokemonBatallaP1.fuerza)
		pokemonBatallaP2.vidaActual -= ataque1

		if (pokemonBatallaP2.vidaActual <= 0) {
			pokemonBatallaP2.vidaActual = 0
			document.querySelector('.boton-luchar').setAttribute('disabled', '')
			let numero
			let resultado
			if (P1 === user_id) {
				numero = 1
				resultado = '¡Victoria!'
			} else if (P2 === user_id) {
				numero = 2
				resultado = 'Derrota'
			}
			document
				.querySelector(`#P${numero}-${pokemonBatallaP2.nombre}`)
				.classList.add('muerto')
			document.querySelector(`#imgP${numero}`).classList.add('muerto')
			pokVivosP2 -= 1
			if (pokVivosP2 === 0) {
				let ganador = document.createElement('p')
				ganador.className = 'ganador'
				ganador.innerHTML = resultado
				document.body.append(ganador)
				actualizarVida(datos.copiaP1)
			}
		}

		// Actualizar el texto de vida del Pokémon 2
		let vidaPok2Batalla = document.getElementById('vidaPok2Batalla')
		vidaPok2Batalla.innerText = `Vida: ${pokemonBatallaP2.vidaActual}`

		let vidaPok2 = document.querySelector(`#vidaP2-${pokemonBatallaP2.nombre}`)
		vidaPok2.innerText =
			pokemonBatallaP2.vidaActual + '/' + pokemonBatallaP2.vida

		const ataquePok1Batalla = document.getElementById('eventos-batalla')
		ataquePok1Batalla.innerHTML += `Ataca ${pokemonBatallaP1.nombre} con daño ${ataque1} y deja a ${pokemonBatallaP2.nombre} con ${pokemonBatallaP2.vidaActual} de vida.<br>`
		ataquePok1Batalla.scrollTop = ataquePok1Batalla.scrollHeight

		if (pokemonBatallaP2.vidaActual === 0) {
			document.querySelector('.boton-luchar').setAttribute('disabled', '')
			turno++
			return
		}
	} else if (turno % 2 === 0) {
		// Ataque del Pokémon 2
		let ataque2 = Math.ceil(Math.random() * pokemonBatallaP2.fuerza)
		pokemonBatallaP1.vidaActual -= ataque2

		if (pokemonBatallaP1.vidaActual <= 0) {
			pokemonBatallaP1.vidaActual = 0
			document.querySelector('.boton-luchar').setAttribute('disabled', '')
			document
				.querySelector(`#P1-${pokemonBatallaP1.nombre}`)
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
		vidaPok1Batalla.innerText = `Vida: ${pokemonBatallaP1.vidaActual}`

		let vidaPok1 = document.querySelector(`#vidaP1-${pokemonBatallaP1.nombre}`)
		vidaPok1.innerText =
			pokemonBatallaP1.vidaActual + '/' + pokemonBatallaP1.vida

		const ataquePok2Batalla = document.getElementById('eventos-batalla')
		ataquePok2Batalla.innerHTML += `Ataca ${pok2Batalla.nombre} con daño ${ataque2} y deja a ${pokemonBatallaP1.nombre} con ${pokemonBatallaP1.vidaActual} de vida.<br>`
		ataquePok2Batalla.scrollTop = ataquePok2Batalla.scrollHeight

		if (pokemonBatallaP1.vidaActual === 0) {
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

main()

// async function pokBatElegido(datos) {
// 	// let pokBatSeleccionado2
// 	const options2 = {
// 		method: 'GET',
// 		headers: {
// 			'User-Agent': 'insomnia/10.1.1',
// 			apikey:
// 				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
// 			Authorization: `Bearer ${token}`,
// 		},
// 	}
// 	let response = await fetch(
// 		`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?&select=P1EnUso%2CP2EnUso`,
// 		options2,
// 	)
// 	let data4 = await response.json()
// 	// .then(response => response.json())
// 	// .then(data4 => {
// 	pok1 = data4[0].P1EnUso
// 	pok2 = data4[0].P2EnUso

// 	const options5 = {
// 		method: 'GET',
// 		headers: {
// 			'User-Agent': 'insomnia/10.1.1',
// 			apikey:
// 				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
// 			Authorization: `Bearer ${token}`,
// 		},
// 	}
// 	let response2 = await fetch(
// 		`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/pokemon?&select=*`,
// 		options5,
// 	)
// 	let data5 = await response2.json()
// 	// .then(response => response.json())
// 	// .then(data5 => {
// 	const batPok1 = data5.filter(e => e.nombre === pok1)
// 	const batPok2 = data5.filter(e => e.nombre === pok2)
// 	if (P1 === user_id) {
// 		if (batPok1.length > 0) {
// 			let pokBatSeleccionado2 = await pokBat(batPok1)
// 			// console.log(pokBatSeleccionado2)
// 			return pokBatSeleccionado2
// 		}
// 	} else if (P2 === user_id) {
// 		if (batPok2.length > 0) {
// 			let pokBatSeleccionado2 = await pokBat(batPok2)
// 			console.log(pokBatSeleccionado2)
// 			// return pokBatSeleccionado2
// 			return pokBatSeleccionado2
// 		}
// 	}
// 	// console.log(pokBatSeleccionado2)
// 	// })
// 	// .catch(err => console.error(err))
// 	// })
// 	// .catch(err => console.error(err))
// }
