import { ProfielSchema } from "$lib/schemas.js";
import { actionResult, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export async function POST(event) {
	const origineleData = await event.request.clone().formData();

	if ((origineleData.get('avatar') as File).size == 0) {
		origineleData.delete('avatar');
	}

	const form = await superValidate(event, zod(ProfielSchema));
	form.data.avatar = undefined;

	if (origineleData.get('oud_wachtwoord') != '') {
		if (origineleData.get('nieuw_wachtwoord') != '') {
			try {
				await event.locals.pb.collection('functies').update(
					event.locals.pb.authStore.model?.id,
					{
						oldPassword: origineleData.get('oud_wachtwoord'),
						password: origineleData.get('nieuw_wachtwoord'),
						passwordConfirm: origineleData.get('nieuw_wachtwoord')
					})
			} catch (err) {
				return actionResult('error', { form }, 500);
			}
		} else {
			return actionResult('failure', { form }, { message: 'Fout bij verwerken wachtwoorden.' });
		}
	}

	if (!form.valid) {
		return actionResult('failure', { form }, 400);
	}

	try {
		await event.locals.pb.collection('praesidium_leden').update(form.data.id, origineleData);
	} catch (err) {
		return actionResult('error', { form }, 500);
	}

	return actionResult('success', { form }, 200);
}