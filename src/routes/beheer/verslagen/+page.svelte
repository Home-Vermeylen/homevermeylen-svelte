<script lang="ts">
	import { Verslagrecord } from "$lib/components";
	import { FilePlus } from "lucide-svelte";

    export let data: any;
</script>

<div class="flex flex-col gap-10 items-center mt-5 overflow-x-auto w-full">
    <button
      class="btn"
    >
      <FilePlus class="h-4 w-4"/> Nieuw Verslag
    </button>
    <table class="table w-full">
      <thead>
        <tr>
          <th>Acties</th>
          <th>Naam</th>
          <th>Bestand</th>
          <th>Publicatiedatum</th>
        </tr>
      </thead>
      <tbody>
        {#each data.verslagen as verslag (verslag.id)}
            <Verslagrecord {verslag} />
        {/each}
      </tbody>

      <tfoot>
        <tr>
          <th>Acties</th>
          <th>Naam</th>
          <th>Bestand</th>
          <th>Publicatiedatum</th>
        </tr>
      </tfoot>
    </table>
  </div>