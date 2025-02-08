import {
	PraesidiaResponse,
	type ActiviteitenRecord,
	type TypedPocketBase
} from '../types/pocketbase-types.ts';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			pb: TypedPocketBase;
			praesidium: PraesidiaResponse?;
		}
		namespace Superforms {
			type Message = {
				type: 'error' | 'success';
				text: string;
			};
			// interface Error {}
			// interface Locals {}
			// interface PageData {}
			// interface Platform {}
		}
		interface PageState {
			activiteit: ActiviteitenRecord;
			verslag: VerslagenRecord;
			new_modal: boolean;
			verwijder_ids: string[];
			profiel: boolean;
			netwerk_detail_modal: boolean;
			fakkels_bakken: any;
		}
	}
}

export {};
