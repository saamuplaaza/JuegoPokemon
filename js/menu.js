const boton = document.querySelector('.play')

boton.addEventListener('click', () => {
	// Si el select da algo, hacer el update, sino, hacer insert
	const options = {
		method: 'GET',
		headers: {
			'User-Agent': 'insomnia/10.1.0',
			apikey:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
			Range: '0-0',
		},
	}

	fetch(
		'https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?player2=is.null&select=id%2Cplayer2',
		options,
	)
		.then(response => response.json())
		.then(data => {
			console.log(data)
			if (data.length === 1) {
				const options2 = {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						'User-Agent': 'insomnia/10.1.0',
						apikey:
							'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
						Prefer: 'return=minimal',
					},
					body: JSON.stringify({ player2: sessionStorage.getItem('user_id') }),
				}

				fetch(
					`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?id=eq.${data[0].id}`,
					options2,
				).catch(err => console.log(err))
			} else {
				const options3 = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'User-Agent': 'insomnia/10.1.1',
						apikey:
							'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
						Authorization:
							'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
						Prefer: 'return=minimal',
					},
					body: `{"player1":"${sessionStorage.getItem('user_id')}"}`,
				}

				fetch(
					'https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match',
					options3,
				).catch(err => console.error(err))
			}
		})
		// .then((window.location.href = '../html/partida.html'))
		.catch(err => console.error(err))

	// } catch {
	// }
})
