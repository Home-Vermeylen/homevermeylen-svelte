import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { readable } from 'svelte/store';
import { ZodError, type ZodType } from 'zod';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const useMediaQuery = (mediaQueryString: string) => {
	const matches = readable<boolean | null>(null, (set) => {
		if (typeof window === 'undefined') return;

		const m = window.matchMedia(mediaQueryString);

		// Stel de beginwaarde in
		set(m.matches);

		// Luister naar wijzigingen
		const el = (e: MediaQueryListEvent) => set(e.matches);

		m.addEventListener('change', el);

		// Verwijder de eventlistener bij het opruimen
		return () => {
			m.removeEventListener('change', el);
		};
	});

	return matches;
};

export const valideerData = async <T>(
	formData: FormData,
	schema: ZodType<T>
) => {
	const body = Object.fromEntries(formData);

	try {
		const data = schema.parse(body);

		return {
			formData: data,
			errors: null
		};
	} catch (err: unknown) {
		if (err instanceof ZodError) {
			const errors = err.flatten();

			return {
				formData: body,
				errors
			};
		}

		throw err;
	}
};