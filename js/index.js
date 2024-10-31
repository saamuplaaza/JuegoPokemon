const formulario = document.querySelector('form')

formulario.addEventListener('submit', event => {
	event.preventDefault()
	const email = document.querySelector('#usuario').value
	console.log(email)
	const passwd = document.querySelector('#clave').value
	console.log(passwd)

	const errorMessage = document.getElementById('error-message')

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'User-Agent': 'insomnia/10.1.0',
			apikey:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
		},
		body: `{"email":"${email}","password":"${passwd}"}`,
	}

	fetch(
		'https://bjolpxbkopwlmzztpmgb.supabase.co/auth/v1/token?grant_type=password',
		options,
	)
		.then(response => response.json())
		.then(data => {
			console.log(data)

			if (data.access_token) {
				sessionStorage.setItem('access_token', data.access_token)
				sessionStorage.setItem('refresh_token', data.refresh_token)
				sessionStorage.setItem('user_id', data.user.id)
				window.location.href = './menu.html'
			} else {
				errorMessage.innerHTML = 'Usuario o contraseña incorrectos.'
			}
		})
		.catch(err => {
			console.error(err)
			errorMessage.innerHTML =
				'Error. Algo salió mal. Inténtelo de nuevo más tarde.'
		})
})
