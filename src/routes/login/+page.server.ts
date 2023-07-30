import { error, redirect } from "@sveltejs/kit";

export const actions = {
    login: async ({ request, locals }) => {
        const data = await request.formData();

        const gebruikersnaam = data.get('gebruikersnaam');
        const wachtwoord = data.get('wachtwoord');

        console.log(gebruikersnaam, wachtwoord);
        try {
            await locals.pb.collection('gebruikers').authWithPassword(gebruikersnaam, wachtwoord);
        } catch (err) {
            console.log('Error: ', err);
            throw error(500, 'Er is een probleem opgetreden bij het inloggen')
        }

        throw redirect(303, "/");
    }
}