const boton = document.querySelector('.play')
const token = sessionStorage.getItem('access_token')
// const apikey =

boton.addEventListener('click', () => {
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

	fetch(
		'https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?player2=is.null&select=id%2Cplayer2',
		options,
	)
		.then(response => response.json())
		.then(data => {
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

				fetch(
					'https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match',
					options3,
				)
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
		})
		// .then((window.location.href = '../partida.html'))
		.catch(err => console.error(err))
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
			.then(data =>
				data[0].estado === 'ready'
					? (window.location.href = './pokemons.html')
					: '',
			)
			.catch(err => console.error(err))
	} else {
		console.log('entra')
		fetch(
			`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?player2=eq.${sessionStorage.getItem('user_id')}&select=estado`,
			options,
		)
			.then(response => response.json())
			.then(data =>
				data[0].estado === 'ready'
					? (window.location.href = './pokemons.html')
					: '',
			)
			.catch(err => console.error(err))
	}
}
