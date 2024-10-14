const pokemonsP1 = [
	{
		nombre: 'Pikachu',
		tipo: 'Eléctrico',
		fuerza: 50,
		img: './images/pikachu.png',
		vida: 100,
	},
	{
		nombre: 'Charizard',
		tipo: 'Fuego/Volador',
		fuerza: 80,
		img: './images/charizard.png',
		vida: 120,
	},
	{
		nombre: 'Bulbasur',
		tipo: 'Planta/Veneno',
		fuerza: 60,
		img: './images/bulbasur.png',
		vida: 90,
	},
]

let pokVivosP1 = 3

const copiaP1 = pokemonsP1.map(e => ({ ...e, vidaActual: e.vida }))

const pokemonsP2 = [
	{
		nombre: 'Ekans',
		tipo: 'Veneno',
		fuerza: 50,
		img: './images/ekans.png',
		vida: 130,
	},
	{
		nombre: 'Lapras',
		tipo: 'Agua',
		fuerza: 70,
		img: './images/lapras.png',
		vida: 100,
	},
	{
		nombre: 'Snorlax',
		tipo: 'Normal',
		fuerza: 100,
		img: './images/snorlax.png',
		vida: 150,
	},
]

let pokVivosP2 = 3

const copiaP2 = pokemonsP2.map(e => ({ ...e, vidaActual: e.vida }))

copiaP1.forEach((e, i) => {
	let imgPokemon = document.getElementById(`imgP1-${i}`)
	imgPokemon.setAttribute('src', e.img)
	let vidaPok = document.getElementById(`vidaP1 ${i}`)
	vidaPok.innerText = e.vidaActual + '/' + e.vida

	const P1 = document.getElementById(`P1-${i}`)
	P1.addEventListener('click', () => {
		if (e.vidaActual > 0) {
			document.querySelector('.boton-luchar').removeAttribute('disabled')
			document.querySelector('#imgP1').classList.remove('muerto')
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

copiaP2.forEach((e, i) => {
	let imgPokemon = document.getElementById(`imgP2-${i}`)
	imgPokemon.setAttribute('src', e.img)
	let vidaPok = document.getElementById(`vidaP2 ${i}`)
	vidaPok.innerText = e.vidaActual + '/' + e.vida

	const P2 = document.getElementById(`P2-${i}`)
	P2.addEventListener('click', () => {
		if (e.vidaActual > 0) {
			document.querySelector('.boton-luchar').removeAttribute('disabled')
			document.querySelector('#imgP2').classList.remove('muerto')
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

const ataque = () => {
	const nombrePok1Batalla = document.getElementById('nombrePok1Batalla')
	pok1Batalla = copiaP1.filter(e => e.nombre === nombrePok1Batalla.innerHTML)

	const nombrePok2Batalla = document.getElementById('nombrePok2Batalla')
	pok2Batalla = copiaP2.filter(e => e.nombre === nombrePok2Batalla.innerHTML)

	copiaP1.map((e1, i1) => {
		if (e1.nombre === pok1Batalla[0].nombre) {
			copiaP2.map((e2, i2) => {
				if (e2.nombre === pok2Batalla[0].nombre) {
					if (e1.vidaActual === 0 || e2.vidaActual === 0) {
						document.querySelector('.boton-luchar').setAttribute('disabled', '')
						return
					}
					let ataque1 = Math.ceil(Math.random() * e1.fuerza)
					e2.vidaActual -= ataque1
					if (e2.vidaActual <= 0) {
						e2.vidaActual = 0
						document.querySelector('.boton-luchar').setAttribute('disabled', '')
						document.querySelector(`#P2-${i2}`).classList.add('muerto')
						document.querySelector(`#imgP2`).classList.add('muerto')
						pokVivosP2 -= 1
						if (pokVivosP2 === 0) {
							let ganador = document.createElement('p')
							ganador.className = 'ganador'
							ganador.innerHTML = '¡Player 1 win!'
							document.body.append(ganador)
						}
					}
					let vidaPok2 = document.getElementById(`vidaP2 ${i2}`)
					vidaPok2.innerText = e2.vidaActual + '/' + e2.vida
					let vidaPok2Batalla = document.getElementById('vidaPok2Batalla')
					vidaPok2Batalla.innerText = `Vida: ${e2.vidaActual}`
					const ataquePok1Batalla = document.getElementById('eventos-batalla')
					ataquePok1Batalla.innerHTML += `Ataca ${e1.nombre} con daño ${ataque1} y deja a ${e2.nombre} con ${e2.vidaActual} de vida.<br>`
					ataquePok1Batalla.scrollTop = ataquePok1Batalla.scrollHeight
					if (e2.vidaActual === 0) {
						document.querySelector('.boton-luchar').setAttribute('disabled', '')
						return
					}
					let ataque2 = Math.ceil(Math.random() * e2.fuerza)
					e1.vidaActual -= ataque2
					if (e1.vidaActual <= 0) {
						e1.vidaActual = 0
						document.querySelector('.boton-luchar').setAttribute('disabled', '')
						document.querySelector(`#P1-${i1}`).classList.add('muerto')
						document.querySelector(`#imgP1`).classList.add('muerto')
						pokVivosP1 -= 1
						if (pokVivosP1 === 0) {
							let ganador = document.createElement('p')
							ganador.className = 'ganador'
							ganador.innerHTML = '¡Player 2 win!'
							document.body.append(ganador)
						}
					}
					let vidaPok1 = document.getElementById(`vidaP1 ${i1}`)
					vidaPok1.innerText = e1.vidaActual + '/' + e1.vida
					let vidaPok1Batalla = document.getElementById('vidaPok1Batalla')
					vidaPok1Batalla.innerText = `Vida: ${e1.vidaActual}`
					const ataquePok2Batalla = document.getElementById('eventos-batalla')
					ataquePok2Batalla.innerHTML += `Ataca ${e2.nombre} con daño ${ataque2} y deja a ${e1.nombre} con ${e1.vidaActual} de vida.<br>`
					ataquePok2Batalla.scrollTop = ataquePok2Batalla.scrollHeight
					if (e1.vidaActual === 0) {
						document.querySelector('.boton-luchar').setAttribute('disabled', '')
						return
					}
				}
			})
		}
	})
}

const reiniciar = () => {
	// const eventos = document.getElementById('eventos-batalla')
	// eventos.innerText = ''
	location.reload()
}
