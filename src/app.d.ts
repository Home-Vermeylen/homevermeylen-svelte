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
	activiteit?: ActiviteitenRecord;
	verslag?: VerslagenRecord;
	augustje?: any;
	new_modal?: boolean;
	verwijder_ids?: string[];
	profiel?: boolean;
	netwerk_detail_modal?: boolean;
	fakkels_bakken?: any;
	baravond_modal?: boolean;
	verkiezing?: any;
	verwijder_activiteit?: any;
	verwijder_augustje?: any;
	verwijder_stemming?: any;
	bewerk_stemming?: any;
	verwijder_id?: string;
	stemming?: any;
	verwijder_verslag?: any;
}
	}
}

export {};
