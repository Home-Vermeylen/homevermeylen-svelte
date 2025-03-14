import { redirect } from '@sveltejs/kit';

export function load() {
	redirect(307, '/beheer/fakkels_bakken');
}

