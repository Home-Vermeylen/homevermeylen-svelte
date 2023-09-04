<script lang="ts">
	import { Activiteitsrecord } from "$lib/components";
	import { FilePlus } from "lucide-svelte";

    export let data: any;
</script>


    <div class="flex flex-col gap-10 items-center mt-5 overflow-x-auto w-full">
      <button
        class="btn"
      >
        <FilePlus class="h-4 w-4"/> Nieuwe Activiteit
      </button>
      <table class="table w-full">
        <thead>
          <tr>
            <th>Acties</th>
            <th>Naam</th>
            <th>Omschrijving</th>
            <th>Openbaar</th>
            <th>Datum</th>
          </tr>
        </thead>
        <tbody>
            {#each data.activiteiten as activiteit (activiteit.id)}
                <Activiteitsrecord {activiteit} />
            {/each}
        </tbody>

        <tfoot>
          <tr>
            <th>Acties</th>
            <th>Naam</th>
            <th>Omschrijving</th>
            <th>Openbaar</th>
            <th>Datum</th>
          </tr>
        </tfoot>
      </table>
    </div>
