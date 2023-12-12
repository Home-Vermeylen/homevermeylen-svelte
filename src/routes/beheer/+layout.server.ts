export async function load({ request, locals }) {
	return {
		gebruiker: locals.user
	};
}
