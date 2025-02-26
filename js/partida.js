// Datos de Jugadores
let P1
let P2
let pok1
let pok2
let pokP1EnUso
let pokP2EnUso
let pokUsoP1
let pokUsoP2
let pokemonBatallaP1
let pokemonBatallaP2
let numero
// Datos de la Batalla
let turno
let pokVivosP1 = 3
let pokVivosP2 = 3
let movimientos = []
let movimientosAnteriores = ''
// User_id y token del Usuario
const user_id = sessionStorage.getItem('user_id')
const token = sessionStorage.getItem('access_token')

function visualizarP1(pokemonsP1, pokemonsP2) {
	// Dependiendo del usuario, seteo la variable pokemons con los pokemons del Jugador 1 o del Jugador2
	let pokemons
	if (P1 === user_id) {
		pokemons = pokemonsP1
	} else if (P2 === user_id) {
		pokemons = pokemonsP2
	}
	// Recorro el array de pokemons para pintarlos en la izquierda de la pantalla
	pokemons.forEach(e => {
		let imagenes = document.querySelector('#imagesP1')
		let divPokemon = document.createElement('div')
		divPokemon.setAttribute('id', `P1-${e.nombre}`)
		divPokemon.classList.add('P-pokemons')
		if (e.vidaActual === 0) {
			divPokemon.classList.add('muerto')
		}
		let imgPokemon = document.createElement('img')
		imgPokemon.setAttribute('id', `imgP1-${e.nombre}`)
		imgPokemon.setAttribute('src', e.img)
		let vidaPok = document.createElement('p')
		vidaPok.setAttribute('id', `vidaP1-${e.nombre}`)
		vidaPok.innerText = e.vidaActual + '/' + e.vida
		// let boton = document.createElement('button')
		// boton.innerHTML = `<button id="boton-confirmar-${e.nombre}" class="oculto botonConfirmar">Confirmar</button>`
		divPokemon.appendChild(imgPokemon)
		divPokemon.appendChild(vidaPok)
		// divPokemon.appendChild(boton)
		imagenes.appendChild(divPokemon)

		divPokemon.addEventListener('click', event => {
			event.stopPropagation()

			// Eliminar cualquier overlay de "Confirmar" visible en otros Pokémon
			document
				.querySelectorAll('.confirmar')
				.forEach(confirmarDiv => confirmarDiv.remove())

			let confirmarDiv = divPokemon.querySelector('.confirmar')
			if (!confirmarDiv) {
				// Crea el overlay de confirmación en el Pokémon actual
				confirmarDiv = document.createElement('div')
				confirmarDiv.classList.add('confirmar')
				confirmarDiv.innerText = 'Confirmar'

				divPokemon.appendChild(confirmarDiv)

				confirmarDiv.addEventListener('click', event => {
					event.stopPropagation()
					confirmarDiv.innerText = ''
					confirmarDiv.classList.remove('confirmar')
					confirmarDiv.classList.add('oculto')

					if (P1 === user_id) {
						pokP1EnUso = e
						pokUso1(e.nombre)
					} else if (P2 === user_id) {
						pokP2EnUso = e
						pokUso2(e.nombre)
					}
					if (e.vidaActual > 0) {
						document.querySelector('.boton-luchar').removeAttribute('disabled')
						// Pongo en color la imagen del pokemon de la batalla
						document.querySelector('#imgP1').classList.remove('muerto')
					}
					if (e.vidaActual === 0) {
						document.querySelector('.boton-luchar').setAttribute('disabled', '')
						// Pongo en blanco y negro la imagen del pokemon de la batalla
						document.querySelector('#imgP1').classList.add('muerto')
					}
					// Llamo a la función que visualiza el pokemon del usuario a la izquierda de la pantalla
					pokBat(e)
				})
			}
		})
	})
}

function visualizarP2(pokemonsP1, pokemonsP2) {
	// En esta función hacemos lo mismo que en la de visualizarP1, pero al contrario, para mostrar los pokemons
	// del usuario que falta
	let pokemons
	if (P1 === user_id) {
		pokemons = pokemonsP2
	} else {
		pokemons = pokemonsP1
	}
	pokemons.forEach(e => {
		imagenes2 = document.querySelector('#imagesP2')
		let divPokemon2 = document.createElement('div')
		divPokemon2.setAttribute('id', `P2-${e.nombre}`)
		divPokemon2.classList.add('P-pokemons2')
		if (e.vidaActual === 0) {
			divPokemon2.classList.add('muerto')
		}
		let imgPokemon2 = document.createElement('img')
		imgPokemon2.setAttribute('id', `imgP2-${e.nombre}`)
		imgPokemon2.setAttribute('src', e.img)
		let vidaPok2 = document.createElement('p')
		vidaPok2.setAttribute('id', `vidaP2-${e.nombre}`)
		vidaPok2.innerText = e.vidaActual + '/' + e.vida
		divPokemon2.appendChild(imgPokemon2)
		divPokemon2.appendChild(vidaPok2)
		imagenes2.appendChild(divPokemon2)
	})
}

async function visualizar(data) {
	const pokemonsP1 = data.poks1
	const pokemonsP2 = data.poks2

	// Llamo a ambas funciones para vidualizar los pokemons de ambos jugadores
	visualizarP1(pokemonsP1, pokemonsP2)
	visualizarP2(pokemonsP1, pokemonsP2)

	// Cada cierto tiempo, muestro el pokemon que tiene el oponente en uso, a la derecha de la pantalla
	setInterval(() => {
		pokBat2(pokemonsP1, pokemonsP2)
	}, 1000)

	// Devuelve los pokemons de cada jugador, con los datos iniciales(o al recargar la página)
	return [pokemonsP1, pokemonsP2]
}

async function pokBat(e) {
	if (e !== undefined) {
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

		// const botonConfirmar = document.getElementById(
		// 	`boton-confirmar-${e.nombre}`,
		// )
		// botonConfirmar.classList.remove('oculto')

		// botonConfirmar.addEventListener('click', () => {
		// Al botón de confirmar el pokemon le pongo un evento, que llama a una función
		// para actualizar datos en la base de datos
		// if (P1 === user_id) {
		// 	pokP1EnUso = e
		// 	console.log(pokP1EnUso)
		// 	pokUso1(e.nombre)
		// } else if (P2 === user_id) {
		// 	pokP2EnUso = e
		// 	console.log(pokP2EnUso)
		// 	pokUso2(e.nombre)
		// }
		// Tengo que hacer que cuando seleccione el pokemon, ponga ese pokemon como que está en uso, para
		// poder atacar directamente sin que me de error. Para ello necesito las variables: pokP1EnUso y pokP2EnUso
		// })
	}
}

async function pokBat2(pokemonsP1, pokemonsP2) {
	// Dependiendo del usuario, llamo a la funcion para visualizar el pokemon de la batalla del oponente
	// pasándole un pokemon u otro
	if (P1 === user_id) {
		const [batPok2] = pokemonsP2.filter(e => e.nombre === pok2)
		pokEnUso2(batPok2)
	} else if (P2 === user_id) {
		const [batPok1] = pokemonsP1.filter(e => e.nombre === pok1)
		pokEnUso2(batPok1)
	}
}

function pokEnUso2(e) {
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
		vidaPok2Batalla.innerText = `Vida: ${e.vidaActual}`

		const tipoPok2Batalla = document.getElementById('tipoPok2Batalla')
		tipoPok2Batalla.classList.remove('oculto')
		tipoPok2Batalla.innerText = `Tipo: ${e.tipo}`

		const fuerzaPok2Batalla = document.getElementById('fuerzaPok2Batalla')
		fuerzaPok2Batalla.classList.remove('oculto')
		fuerzaPok2Batalla.innerText = `Fuerza: ${e.fuerza}`
	}
}

async function main() {
	// Me traigo los jugadores de la base de datos
	const options = {
		method: 'GET',
		headers: {
			'User-Agent': 'insomnia/10.1.1',
			apikey:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
			Authorization: `Bearer ${token}`,
		},
	}
	let response = await fetch(
		`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?player1=eq.${user_id}&select=player1%2Cplayer2`,
		options,
	)
	let players = await response.json()
	if (players[0] === undefined) {
		response = await fetch(
			`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?player2=eq.${user_id}&select=player1%2Cplayer2`,
			options,
		)
		players = await response.json()
	}
	P1 = players[0].player1
	P2 = players[0].player2

	// Seteo la variable numero a 1 o 2, dependiendo del jugador, para usarla
	// más adelante y no tener que hacer fetch repetidos
	if (P1 === user_id) {
		numero = 1
	} else if (P2 === user_id) {
		numero = 2
	}

	// Me traigo los pokemons elegidos por cada jugador y los meto en la misma variable (dataPoks)
	let poksPlayers = await funcPoksPlayes()
	let dataPoks
	if (poksPlayers.poks1 !== null && poksPlayers.poks2 !== null) {
		dataPoks = {
			poks1: [
				poksPlayers.poks1.pok1,
				poksPlayers.poks1.pok2,
				poksPlayers.poks1.pok3,
			],
			poks2: [
				poksPlayers.poks2.pok1,
				poksPlayers.poks2.pok2,
				poksPlayers.poks2.pok3,
			],
		}
	}

	// Me traigo los pokemons que están usando cada uno y seteo pok1 y pok2
	let poksEnUso = await funcPoksEnUso()
	pok1 = poksEnUso.P1EnUso
	pok2 = poksEnUso.P2EnUso

	// Si pok1 es Undefined, pokP1EnUso será un array vacío
	pokP1EnUso = dataPoks.poks1.filter(e => e.nombre === pok1)
	// console.log(pokP1EnUso)

	// Si pok2 es Undefined, pokP2EnUso será un array vacío
	pokP2EnUso = dataPoks.poks2.filter(e => e.nombre === pok2)
	// console.log(pokP2EnUso)

	// Cada cierto tiempo, vuelvo a pedirle al servidor que me envíe los pokemons que están
	// en uso, por si han cambiado
	setInterval(async () => {
		poksEnUso = await funcPoksEnUso()
		pok1 = poksEnUso.P1EnUso
		pok2 = poksEnUso.P2EnUso

		pokP1EnUso = dataPoks.poks1.filter(e => e.nombre === pok1)

		pokP2EnUso = dataPoks.poks2.filter(e => e.nombre === pok2)
	}, 1000)

	// Visualizo los pokemons de cada jugador. Cada jugador tiene a sus pokemons a la izquierda y
	// y los del oponente a la derecha. 'dataPoks' contiene los pokemons de ambos jugadores.
	let [datosP1, datosP2] = await visualizar(dataPoks)

	// La primera vez, visualizará lo que haya en pokEnUso(del jugador 1 o 2), si no hay nada no visualiza nada
	if (pokP1EnUso[0] !== undefined) {
		pokemonBatallaP1 = datosP1.filter(e => e.nombre === pokP1EnUso[0].nombre)
	}
	if (pokP2EnUso[0] !== undefined) {
		pokemonBatallaP2 = datosP2.filter(e => e.nombre === pokP2EnUso[0].nombre)
	}
	if (P1 === user_id && pok1) {
		pokBat(pokemonBatallaP1[0])
	} else if (P2 === user_id && pok2) {
		pokBat(pokemonBatallaP2[0])
	}

	// Cada cierto tiempo, observamos el estado de pokP1EnUso y pokP2EnUso, si son distintas de undefined, se
	// pintará el pokemon correspondiente
	const intervalo = setInterval(async () => {
		let poksVivos = await funcPoksVivos()
		pokVivosP1 = poksVivos.poksVivosP1
		pokVivosP2 = poksVivos.poksVivosP2
		console.log(pokVivosP2)
		console.log(poksVivos)
		if (pokVivosP2 === 0) {
			if (P1 === user_id) {
				let resultado = document.createElement('p')
				resultado.className = 'resultado ganador'
				resultado.innerHTML = '¡Victoria!'
				document.body.append(resultado)
				clearInterval(intervalo)
			} else if (P2 === user_id) {
				let resultado = document.createElement('p')
				resultado.className = 'resultado perdedor'
				resultado.innerHTML = 'Derrota'
				document.body.append(resultado)
				clearInterval(intervalo)
			}
			try{
				borrarPartida()
			}catch{
				return
			}
		} else if (pokVivosP1 === 0) {
			if (P1 === user_id) {
				let resultado = document.createElement('p')
				resultado.className = 'resultado perdedor'
				resultado.innerHTML = 'Derrota'
				document.body.append(resultado)
				clearInterval(intervalo)
			} else if (P2 === user_id) {
				let resultado = document.createElement('p')
				resultado.className = 'resultado ganador'
				resultado.innerHTML = '¡Victoria!'
				document.body.append(resultado)
				clearInterval(intervalo)
			}
			try{
				borrarPartida()
			}catch{
				return
			}
		}

		if (pokP1EnUso[0] !== undefined) {
			pokemonBatallaP1 = datosP1.filter(e => e.nombre === pokP1EnUso[0].nombre)
		}
		if (pokP2EnUso[0] !== undefined) {
			pokemonBatallaP2 = datosP2.filter(e => e.nombre === pokP2EnUso[0].nombre)
		}
		if (P1 === user_id && pok1) {
			if (pokemonBatallaP1[0].nombre !== pok1) {
				pokBat(pokemonBatallaP1[0])
			}
		} else if (P2 === user_id && pok2) {
			if (pokemonBatallaP2[0].nombre !== pok2) {
				pokBat(pokemonBatallaP2[0])
			}
		}

		if (pokemonBatallaP1 !== undefined && pokemonBatallaP2 !== undefined) {
			let poksUso = await funcPoksPlayes()

			for (let i = 1; i <= 3; i++) {
				// Dependiendo del usuario, actuaalizamos la vida en la lista de la izquierda o de la derecha
				let pokP2 = poksUso.poks2[`pok${i}`]
				if (pokP2.nombre === pokemonBatallaP2[0].nombre) {
					pokUsoP2 = pokP2
					break
				}
			}
			for (let i = 1; i <= 3; i++) {
				// Dependiendo del usuario, actuaalizamos la vida en la lista de la izquierda o de la derecha
				let pokP1 = poksUso.poks1[`pok${i}`]
				if (pokP1.nombre === pokemonBatallaP1[0].nombre) {
					pokUsoP1 = pokP1
					break
				}
			}

			if (pokUsoP2 !== undefined) {
				if (pokUsoP2.vidaActual === 0) {
					if (P1 === user_id) {
						document
							.querySelector(`#P2-${pokUsoP2.nombre}`)
							.classList.add('muerto')
						document.querySelector(`#imgP2`).classList.add('muerto')
					} else if (P2 === user_id) {
						document
							.querySelector(`#P1-${pokUsoP2.nombre}`)
							.classList.add('muerto')
						document.querySelector(`#imgP1`).classList.add('muerto')
					}
				} else {
					if (P1 === user_id) {
						document
							.querySelector(`#P2-${pokUsoP2.nombre}`)
							.classList.remove('muerto')
						document.querySelector(`#imgP2`).classList.remove('muerto')
					} else if (P2 === user_id) {
						document
							.querySelector(`#P1-${pokUsoP2.nombre}`)
							.classList.remove('muerto')
						document.querySelector(`#imgP1`).classList.remove('muerto')
					}
				}
			}

			if (pokUsoP1 !== undefined) {
				if (pokUsoP1.vidaActual === 0) {
					if (P2 === user_id) {
						document
							.querySelector(`#P2-${pokUsoP1.nombre}`)
							.classList.add('muerto')
						document.querySelector(`#imgP2`).classList.add('muerto')
					} else if (P1 === user_id) {
						document
							.querySelector(`#P1-${pokUsoP1.nombre}`)
							.classList.add('muerto')
						document.querySelector(`#imgP1`).classList.add('muerto')
					}
				} else {
					if (P2 === user_id) {
						document
							.querySelector(`#P2-${pokUsoP1.nombre}`)
							.classList.remove('muerto')
						document.querySelector(`#imgP2`).classList.remove('muerto')
					} else if (P1 === user_id) {
						document
							.querySelector(`#P1-${pokUsoP1.nombre}`)
							.classList.remove('muerto')
						document.querySelector(`#imgP1`).classList.remove('muerto')
					}
				}
			}

			if (pokemonBatallaP1 !== undefined) {
				if (pokUsoP1.nombre === pokemonBatallaP1[0].nombre && P1 === user_id) {
					let vidaPok1Batalla = document.getElementById('vidaPok1Batalla')
					vidaPok1Batalla.innerText = `Vida: ${pokUsoP1.vidaActual}`

					let vidaPok1 = document.querySelector(`#vidaP1-${pokUsoP1.nombre}`)
					vidaPok1.innerText = pokUsoP1.vidaActual + '/' + pokUsoP1.vida
				}
			}
			if (pokemonBatallaP2 !== undefined) {
				if (pokUsoP2.nombre === pokemonBatallaP2[0].nombre && P2 === user_id) {
					let vidaPok1Batalla = document.getElementById('vidaPok1Batalla')
					vidaPok1Batalla.innerText = `Vida: ${pokUsoP2.vidaActual}`

					let vidaPok1 = document.querySelector(`#vidaP1-${pokUsoP2.nombre}`)
					vidaPok1.innerText = pokUsoP2.vidaActual + '/' + pokUsoP2.vida
				}
			}
		}
		const ataquePok1Batalla = document.getElementById('eventos-batalla')
		if (pok1 !== null && pok2 !== null) {
			// Si ambos tienen algo de contenido, realizamos una petición al servidor para traernos el turno y
			// los comentarios de la batalla
			let TurnAndBattle = await funcBattleTurn()

			turno = TurnAndBattle.turn
			movimientos = TurnAndBattle.battle
			// Si la variable movimientos tiene algo de contenido y lo ultimo es distinto a movimientosAnteriores,
			// actualizamos movimientosAnteriores y pintamos en la pantalla el ultimo ataque
			if (
				movimientos.length !== 0 &&
				movimientos.at(-1) !== movimientosAnteriores
			) {
				movimientosAnteriores = movimientos.at(-1)
				ataquePok1Batalla.innerHTML += movimientosAnteriores + '<br>'
			}
		}
		// Esta línea sirve para que haga "scroll automático" al insertar algo nuevo
		ataquePok1Batalla.scrollTop = ataquePok1Batalla.scrollHeight

		// Turno del Player 1
		if (pokemonBatallaP1 === undefined || pokemonBatallaP2 === undefined) {
			document.querySelector('.boton-luchar').setAttribute('disabled', '')
		} else if (
			pokUsoP1 === undefined ||
			pokUsoP2 === undefined ||
			pokUsoP1.vidaActual === 0 ||
			pokUsoP2.vidaActual === 0
		) {
			document.querySelector('.boton-luchar').setAttribute('disabled', '')
		} else {
			if (turno % 2 !== 0) {
				// Ajustamos el estado del botón de luchar
				if (P1 === user_id) {
					document
						.querySelector('.boton-luchar')
						.removeAttribute('disabled', '')
				} else if (P2 === user_id) {
					document.querySelector('.boton-luchar').setAttribute('disabled', '')
				}
				// Turno del Player 2
			} else if (turno % 2 === 0) {
				// Ajustamos el estado del botón de luchar
				if (P1 === user_id) {
					document.querySelector('.boton-luchar').setAttribute('disabled', '')
				} else if (P2 === user_id) {
					document
						.querySelector('.boton-luchar')
						.removeAttribute('disabled', '')
				}
			}
		}
	}, 1000)

	const botonLucha = document.querySelector('.boton-luchar')
	botonLucha.addEventListener('click', () => {
		// console.log(pokemonBatallaP1, pokemonBatallaP2)
		ataque(pokemonBatallaP1, pokemonBatallaP2)
	})
}

async function ataque() {
	// Me traigo los pokemons del Jugador 1 y del Jugador 2 de la base de datos
	let poksEnUso = await funcPoksPlayes()
	if (pokUsoP1 === undefined || pokUsoP2 === undefined) {
		return
	} else if (pokUsoP1.vidaActual === 0 || pokUsoP2.vidaActual === 0) {
		return
	}

	// Ataque del Jugador 1 (turnos impares)
	if (turno % 2 !== 0) {
		let ataque1 = Math.ceil(Math.random() * pokemonBatallaP1[0].fuerza)
		pokemonBatallaP2[0].vidaActual -= ataque1

		let nuevoText = { id: poksEnUso.poks2.id }
		if (pokemonBatallaP2[0].vidaActual <= 0) {
			// Ajustamos la vida para que si es menor que 0, aparezca 0 y desabilitamos el botón
			pokemonBatallaP2[0].vidaActual = 0
			document.querySelector('.boton-luchar').setAttribute('disabled', '')

			if (P1 === user_id) {
				document
					.querySelector(`#P2-${pokemonBatallaP2[0].nombre}`)
					.classList.add('muerto')
				document.querySelector(`#imgP2`).classList.add('muerto')
				// } else if (P2 === user_id) {
				// 	document
				// 		.querySelector(`#P1-${pokemonBatallaP2[0].nombre}`)
				// 		.classList.add('muerto')
				// 	document.querySelector(`#imgP1`).classList.add('muerto')
			}

			restarPokVivos2(pokVivosP2)
		}
		for (let i = 1; i <= 3; i++) {
			let pokP2 = poksEnUso.poks2[`pok${i}`]
			if (pokP2.nombre === pokemonBatallaP2[0].nombre) {
				pokP2.vidaActual = pokemonBatallaP2[0].vidaActual
			}
			if (i === 1) {
				nuevoText.pok1 = pokP2
			} else if (i === 2) {
				nuevoText.pok2 = pokP2
			} else if (i === 3) {
				nuevoText.pok3 = pokP2
			}
		}
		poksEnUso.poks2 = nuevoText

		updatePoks2(poksEnUso)

		// Actualizar el texto de vida del Pokémon 2
		for (let i = 1; i <= 3; i++) {
			// Dependiendo del usuario, actuaalizamos la vida en la lista de la izquierda o de la derecha
			let pokP2 = poksEnUso.poks2[`pok${i}`]
			if (pokP2.nombre === pokemonBatallaP2[0].nombre) {
				if (P1 === user_id) {
					let vidaPok2Batalla = document.getElementById('vidaPok2Batalla')
					vidaPok2Batalla.innerText = `Vida: ${pokP2.vidaActual}`

					let vidaPok2 = document.querySelector(`#vidaP2-${pokP2.nombre}`)
					vidaPok2.innerText = pokP2.vidaActual + '/' + pokP2.vida
				}
			}
		}

		let ataque = `Ataca ${pokemonBatallaP1[0].nombre} con daño ${ataque1} y deja a ${pokemonBatallaP2[0].nombre} con ${pokemonBatallaP2[0].vidaActual} de vida.`
		if (movimientos === undefined) {
			movimientos = ataque
		} else {
			movimientos.push(ataque)
		}
		updateBattle(movimientos)

		if (pokemonBatallaP2[0].vidaActual === 0) {
			document.querySelector('.boton-luchar').setAttribute('disabled', '')
			pasarTurno(turno)
			return
		}
	}
	// Ataque del player 2 (turnos pares)
	else if (turno % 2 === 0) {
		let ataque2 = Math.ceil(Math.random() * pokemonBatallaP2[0].fuerza)
		pokemonBatallaP1[0].vidaActual -= ataque2

		let nuevoText = { id: poksEnUso.poks1.id }
		if (pokemonBatallaP1[0].vidaActual <= 0) {
			// Ajustamos la vida para que si es menor que 0, aparezca 0 y desabilitamos el botón
			pokemonBatallaP1[0].vidaActual = 0
			document.querySelector('.boton-luchar').setAttribute('disabled', '')
			if (P2 === user_id) {
				document
					.querySelector(`#P2-${pokemonBatallaP1[0].nombre}`)
					.classList.add('muerto')
				document.querySelector(`#imgP2`).classList.add('muerto')
				// } else if (P1 === user_id) {
				// 	document
				// 		.querySelector(`#P1-${pokemonBatallaP1[0].nombre}`)
				// 		.classList.add('muerto')
				// 	document.querySelector(`#imgP1`).classList.add('muerto')
			}
			restarPokVivos1(pokVivosP1)
		}
		for (let i = 1; i <= 3; i++) {
			let pokP1 = poksEnUso.poks1[`pok${i}`]
			if (pokP1.nombre === pokemonBatallaP1[0].nombre) {
				pokP1.vidaActual = pokemonBatallaP1[0].vidaActual
			}
			if (i === 1) {
				nuevoText.pok1 = pokP1
			} else if (i === 2) {
				nuevoText.pok2 = pokP1
			} else if (i === 3) {
				nuevoText.pok3 = pokP1
			}
		}
		poksEnUso.poks1 = nuevoText

		updatePoks1(poksEnUso)

		// Actualizar el texto de vida del Pokémon 2
		for (let i = 1; i <= 3; i++) {
			// Dependiendo del usuario, actuaalizamos la vida en la lista de la izquierda o de la derecha
			let pokP1 = poksEnUso.poks1[`pok${i}`]
			if (pokP1.nombre === pokemonBatallaP1[0].nombre) {
				if (P2 === user_id) {
					let vidaPok2Batalla = document.getElementById('vidaPok2Batalla')
					vidaPok2Batalla.innerText = `Vida: ${pokP1.vidaActual}`

					let vidaPok2 = document.querySelector(`#vidaP2-${pokP1.nombre}`)
					vidaPok2.innerText = pokP1.vidaActual + '/' + pokP1.vida
				}
			}
		}

		let ataque = `Ataca ${pokemonBatallaP2[0].nombre} con daño ${ataque2} y deja a ${pokemonBatallaP1[0].nombre} con ${pokemonBatallaP1[0].vidaActual} de vida.`
		if (movimientos === undefined) {
			movimientos = ataque
		} else {
			movimientos.push(ataque)
		}
		updateBattle(movimientos)

		if (pokemonBatallaP1[0].vidaActual === 0) {
			document.querySelector('.boton-luchar').setAttribute('disabled', '')
			pasarTurno(turno)
			return
		}
	}
	pasarTurno(turno)
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

main()

document.addEventListener('click', () => {
	// Selecciona todos los divs de confirmación y los elimina
	document
		.querySelectorAll('.confirmar')
		.forEach(confirmarDiv => confirmarDiv.remove())
})
