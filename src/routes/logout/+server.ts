import { redirect } from '@sveltejs/kit';

export const GET = ({ locals }) => {
	locals.pb.authStore.clear();

	redirect(303, '/');
};
