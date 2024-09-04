import { PraesidiaResponse, type TypedPocketBase } from '../types/pocketbase-types.ts';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			pb: TypedPocketBase;
			praesidium: PraesidiaResponse?
		}
		namespace Superforms {
			type Message = {
				type: 'error' | 'success', text: string
			}
			// interface Error {}
			// interface Locals {}
			// interface PageData {}
			// interface Platform {}
		}
	}
}

export { };

