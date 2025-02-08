import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { readable } from 'svelte/store';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const useMediaQuery = (mediaQueryString: string) => {
	const matches = readable(null, (set) => {
		const m = window.matchMedia(mediaQueryString);
		//we set the value of the reader to the matches property
		set(m.matches);
		//we create the event listener that will set the new value on change
		const el = (e) => set(e.matches);
		//we add the new event listener
		m.addEventListener('change', el);
		//we return the stop function that will clean the event listener
		return () => {
			m.removeEventListener('change', el);
		};
	});
	//then we return the readable
	return matches;
};
