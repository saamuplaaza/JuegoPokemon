async function funcPoksPlayes() {
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
		`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?&select=poks1%2Cpoks2`,
		options,
	)
	let [data] = await response.json()
	return data
}

async function funcPoksEnUso() {
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
		`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?player${numero}=eq.${user_id}&select=P1EnUso%2CP2EnUso`,
		options,
	)
	let [data] = await response.json()
	return data
}

function pokUso1(nombre) {
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
		body: `{ "P1EnUso": "${nombre}" }`,
	}

	fetch(
		`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?player${numero}=eq.${user_id}`,
		options,
	).catch(err => console.error(err))
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

	fetch(
		`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?player${numero}=eq.${user_id}`,
		options,
	)
}

async function funcBattleTurn() {
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
		`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?player${numero}=eq.${user_id}&select=battle%2Cturn`,
		options,
	)
	let [data] = await response.json()
	return data
}

function updatePoks1(poksEnUso) {
	const options = {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'User-Agent': 'insomnia/10.1.1',
			apikey:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
			Authorization: `Bearer ${token}`,
			Prefer: 'return=minimal',
		},
		body: JSON.stringify({ poks1: poksEnUso.poks1 }),
	}
	fetch(
		`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?player${numero}=eq.${user_id}`,
		options,
	).catch(err => console.error(err))
}

function updatePoks2(poksEnUso) {
	const options = {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'User-Agent': 'insomnia/10.1.1',
			apikey:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
			Authorization: `Bearer ${token}`,
			Prefer: 'return=minimal',
		},
		body: JSON.stringify({ poks2: poksEnUso.poks2 }),
	}
	fetch(
		`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?player${numero}=eq.${user_id}`,
		options,
	).catch(err => console.error(err))
}

function updateBattle(movimientos) {
	const options = {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'User-Agent': 'insomnia/10.1.1',
			apikey:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
			Authorization: `Bearer ${token}`,
			Prefer: 'return=minimal',
		},
		body: `{"battle":"{${movimientos}}"}`,
	}
	fetch(
		`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?player${numero}=eq.${user_id}`,
		options,
	).catch(err => console.error(err))
}

function pasarTurno(turno) {
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
		body: `{"turn":"${turno + 1}"}`,
	}

	fetch(
		`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?player${numero}=eq.${user_id}`,
		options,
	).catch(err => console.error(err))
}

async function funcPoksVivos() {
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
		`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?&select=poksVivosP1%2CpoksVivosP2`,
		options,
	)
	let [data] = await response.json()
	return data
}

function restarPokVivos1(pokVivosP1) {
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
		body: `{"poksVivosP1":"${pokVivosP1 - 1}"}`,
	}

	fetch(
		`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?player${numero}=eq.${user_id}`,
		options,
	).catch(err => console.error(err))
}

function restarPokVivos2(pokVivosP2) {
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
		body: `{"poksVivosP2":"${pokVivosP2 - 1}"}`,
	}

	fetch(
		`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?player${numero}=eq.${user_id}`,
		options,
	).catch(err => console.error(err))
}

async function borrarPartida(){
	const options = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'User-Agent': 'insomnia/10.1.0',
			apikey:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb2xweGJrb3B3bG16enRwbWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNzEwMDksImV4cCI6MjA0NDY0NzAwOX0.IeR7NSHpXXJwTa0D84ov2dQ8BJgHAjxwyQPLtj4LfKg',
			Authorization: `Bearer ${token}`,
			Prefer: 'return=minimal',
		},
		
	}

	fetch(
		`https://bjolpxbkopwlmzztpmgb.supabase.co/rest/v1/match?player${numero}=eq.${user_id}`,
		options,
	).catch(err => console.error(err))
}