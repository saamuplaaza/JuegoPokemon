const divPokemons = document.querySelector('.pokemons')
const user_id = sessionStorage.getItem('user_id')
const token = sessionStorage.getItem('access_token')

const options = {
	method: 'GET',
	headers: {
		'User-Agent': 'insomnia/10.1.0',
		apikey:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
		Authorization:
			'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
	},
}

fetch(
	'https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/pokemon?select=*',
	options,
)
	.then(response => response.json())
	.then(data => {
		let poksPlayer = [user_id]

		data.forEach(e => {
			const pokemon = document.createElement('div')
			pokemon.classList.add('pokemon')
			pokemon.innerHTML = `<h3>${e.nombre}</h3><img src="${e.img}" class="img-pok"></img><p>Vida: ${e.vida}</p><p>Fuerza: ${e.fuerza}</p><p>Tipo: ${e.tipo}</p>`
			divPokemons.appendChild(pokemon)

			pokemon.addEventListener('click', event => {
				event.stopPropagation()

				// Eliminar cualquier overlay de "Confirmar" visible en otros Pokémon
				document
					.querySelectorAll('.confirmar')
					.forEach(confirmarDiv => confirmarDiv.remove())

				// Verifica si ya existe el overlay de confirmación en el Pokémon actual
				let confirmarDiv = pokemon.querySelector('.confirmar')

				if (!confirmarDiv) {
					// Crea el overlay de confirmación en el Pokémon actual
					confirmarDiv = document.createElement('div')
					confirmarDiv.classList.add('confirmar')
					confirmarDiv.innerText = 'Confirmar'

					pokemon.appendChild(confirmarDiv)

					// Evento de clic en el overlay para cambiar a "Seleccionado"
					confirmarDiv.addEventListener('click', event => {
						event.stopPropagation()
						confirmarDiv.innerText = 'Seleccionado'
						confirmarDiv.classList.remove('confirmar')
						confirmarDiv.classList.add('seleccionado')

						poksPlayer.push({ ...e, vidaActual: e.vida })
						if (poksPlayer.length === 4) {
							const options = {
								method: 'GET',
								headers: {
									'User-Agent': 'insomnia/10.1.1',
									apikey:
										'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
									Authorization: `Bearer ${token}`,
								},
							}
							fetch(
								`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?player1=eq.${sessionStorage.getItem('user_id')}&select=*`,
								options,
							)
								.then(response => response.json())
								.then(data => {
									if (data.length === 0) {
										fetch(
											`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?player1=eq.${sessionStorage.getItem('user_id')}&select=*`,
											options,
										)

										const options2 = {
											method: 'PATCH',
											headers: {
												'Content-Type': 'application/json',
												'User-Agent': 'insomnia/10.1.0',
												apikey:
													'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
												Authorization: `Bearer ${token}`,
												Prefer: 'return=minimal',
											},
											body: JSON.stringify({
												poks2: {
													id: poksPlayer[0],
													pok1: poksPlayer[1],
													pok2: poksPlayer[2],
													pok3: poksPlayer[3],
												},
											}),
										}

										fetch(
											`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?player2=eq.${user_id}`,
											options2,
										)
											.then(data => {
												console.log(data)
												setInterval(() => {
													pasarPartida()
												}, 3000)
											})
											.catch(err => console.log(err))
									} else {
										const options2 = {
											method: 'PATCH',
											headers: {
												'Content-Type': 'application/json',
												'User-Agent': 'insomnia/10.1.0',
												apikey:
													'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
												Authorization: `Bearer ${token}`,
												Prefer: 'return=minimal',
											},
											body: JSON.stringify({
												poks1: {
													id: poksPlayer[0],
													pok1: poksPlayer[1],
													pok2: poksPlayer[2],
													pok3: poksPlayer[3],
												},
											}),
										}
										fetch(
											`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?player1=eq.${user_id}`,
											options2,
										)
											.then(() => {
												setInterval(() => {
													pasarPartida()
												}, 3000)
											})
											.catch(err => console.log(err))
									}
								})
								.catch(err => console.error(err))
						}
					})
				}
			})
		})

		// Evento en el documento para cerrar el overlay de confirmación si se hace clic fuera del Pokémon
		document.addEventListener('click', () => {
			// Selecciona todos los divs de confirmación y los elimina
			document
				.querySelectorAll('.confirmar')
				.forEach(confirmarDiv => confirmarDiv.remove())
		})
	})
	.catch(err => console.error(err))

const pasarPartida = () => {
	const options = {
		method: 'GET',
		headers: {
			'User-Agent': 'insomnia/10.1.1',
			apikey:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
			Authorization: `Bearer ${token}`,
		},
	}
	fetch(
		`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?&select=poks1%2Cpoks2`,
		options,
	)
		.then(response => response.json())
		.then(data => {
			data[0].poks1 !== null && data[0].poks2 !== null
				? (window.location.href = './partida.html')
				: ''
		})
		.catch(err => console.error(err))
}
