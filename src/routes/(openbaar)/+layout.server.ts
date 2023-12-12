import type { Record } from 'pocketbase';

export const load = ({ locals }) => {
	if (locals.user) {
		return {
			user: locals.user as Record
		};
	}

	return {
		user: undefined
	};
};
