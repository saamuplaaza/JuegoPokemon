const boton = document.querySelector('.play')
const token = sessionStorage.getItem('access_token')

boton.addEventListener('click', async () => {
	// Si el select da algo, hacer el update, sino, hacer insert
	const options = {
		method: 'GET',
		headers: {
			'User-Agent': 'insomnia/10.1.0',
			apikey:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
			Authorization: `Bearer ${token}`,
			Range: '0-0',
		},
	}

	let response = await fetch(
		'https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?player2=is.null&select=id%2Cplayer2',
		options,
	)
	let data = await response.json()

	let newRow = false

	if (data.length === 0) {
		newRow = true
		const options3 = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'User-Agent': 'insomnia/10.1.1',
				apikey:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
				Authorization: `Bearer ${token}`,
				Prefer: 'return=minimal',
			},
			body: `{"player1":"${sessionStorage.getItem('user_id')}", "player2": null}`,
		}

		fetch('https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match', options3)
			.then(setInterval(() => pasarPartida(newRow), 3000))
			.catch(err => console.error(err))
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
			body: `{"player2":"${sessionStorage.getItem('user_id')}", "estado": "ready"}`,
		}

		fetch(
			`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?id=eq.${data[0].id}`,
			options2,
		)
			// .then(response => response.json)
			.then(setInterval(() => pasarPartida(newRow), 1000))
			// .then((window.location.href = './pokemons.html'))
			.catch(err => console.log(err))
	}

	const divcontador = document.querySelector('.divContador')
	const contador = document.querySelector('.contador')
	divcontador.classList.remove('oculto')
	let minutos = 0
	let segundos = 0
	setInterval(() => {
		segundos++
		if (segundos > 59) {
			minutos++
			segundos = 0
		}
		if (segundos < 10) {
			contador.innerHTML = `${minutos}:0${segundos}`
		} else {
			contador.innerHTML = `${minutos}:${segundos}`
		}
	}, 1000)
})

const pasarPartida = newRow => {
	const options = {
		method: 'GET',
		headers: {
			'User-Agent': 'insomnia/10.1.1',
			apikey:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
			Authorization: `Bearer ${token}`,
		},
	}
	if (newRow) {
		fetch(
			`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?player1=eq.${sessionStorage.getItem('user_id')}&select=estado`,
			options,
		)
			.then(response => response.json())
			.then(data => {
				if (data[0].estado === 'ready') {
					const partidaEncontrada = document.querySelector('.partidaEncontrada')
					const cuentaAtras = document.querySelector('.cuenta-atras')
					let cont = 5

					// Evita que el intervalo se cree varias veces
					if (!partidaEncontrada.classList.contains('iniciado')) {
						partidaEncontrada.classList.remove('oculto')
						partidaEncontrada.classList.add('iniciado')

						setInterval(() => {
							if (cont >= 0) {
								cuentaAtras.innerHTML = cont
								cont--
							} else {
								window.location.href = './pokemons.html'
							}
						}, 1000)
					}
				}
			})
			.catch(err => console.error(err))
	} else {
		fetch(
			`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?player2=eq.${sessionStorage.getItem('user_id')}&select=estado`,
			options,
		)
			.then(response => response.json())
			.then(data => {
				if (data[0].estado === 'ready') {
					const partidaEncontrada = document.querySelector('.partidaEncontrada')
					const cuentaAtras = document.querySelector('.cuenta-atras')
					let cont = 4

					// Evita que el intervalo se cree varias veces
					if (!partidaEncontrada.classList.contains('iniciado')) {
						partidaEncontrada.classList.remove('oculto')
						partidaEncontrada.classList.add('iniciado')

						setInterval(() => {
							if (cont >= 0) {
								cuentaAtras.innerHTML = cont
								cont--
							} else {
								window.location.href = './pokemons.html'
							}
						}, 1000)
					}
				}
			})
			.catch(err => console.error(err))
	}
}
