import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

async function controleerKiescomite(locals: App.Locals): Promise<boolean> {
	const user = locals.pb.authStore.model;

	if (!user) {
		return false;
	}

	try {
		const recentsteAcademiejaar = await locals.pb
			.collection('praesidia')
			.getFirstListItem('', { sort: '-academiejaar' });

		const praesidiumLid = await locals.pb
			.collection('praesidium_leden')
			.getFirstListItem(
				`functie = "${user.id}" && praesidium = "${recentsteAcademiejaar.id}"`
			);

		const lidMetKiescomite = praesidiumLid as typeof praesidiumLid & {
			kiescomite?: boolean;
		};

		return lidMetKiescomite.kiescomite === true;
	} catch {
		return false;
	}
}

export const POST: RequestHandler = async ({ request, locals, params }) => {
	if (!(await controleerKiescomite(locals))) {
		return json({ error: 'Je hebt geen toegang.' }, { status: 403 });
	}

	const origineleData = await request.formData();
	const code = origineleData.get('code');

	if (typeof code !== 'string' || !code.trim()) {
		return json({ error: 'Ongeldige toegangscode.' }, { status: 400 });
	}

	const opgeschoondeCode = code.trim();

	try {
		const verkiezing = await locals.pb.collection('verkiezingen').getOne(params.id);

		const toegangscodes = verkiezing.toegangscodes ?? [];

		if (toegangscodes.includes(opgeschoondeCode)) {
			return json({ error: 'Deze toegangscode bestaat al.' }, { status: 409 });
		}

		await locals.pb.collection('verkiezingen').update(params.id, {
			toegangscodes: [...toegangscodes, opgeschoondeCode]
		});

		return json({ status: 200 });
	} catch (err) {
		console.error('Fout bij aanmaken toegangscode:', err);
		return json({ error: 'Toegangscode aanmaken mislukt.' }, { status: 500 });
	}
};