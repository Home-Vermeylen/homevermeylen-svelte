<script lang="ts">
	import { CalendarClock, CalendarDays } from "lucide-svelte";

    export let activiteit: any;

    const huidige_datum = new Date();
    const datum = new Date(activiteit.datum);
    const inschrijvings_start_datum = new Date(activiteit.inschrijvings_start_datum);
    const inschrijvings_eind_datum = new Date(activiteit.inschrijvings_eind_datum);
</script>

<div class="card w-[400px] bg-base-200 shadow-xl m-5">
    <figure class="w-[400px] h-[200px] rounded">
      <img
        loading="lazy"
        src={activiteit.banner.includes(".jpg") ? activiteit.banner : "/foto_placeholder.png"}
        class="object-scale-down"
        height={200}
        width={400}
        alt="Banner"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title text-center text-3xl self-center mb-5">{activiteit.naam}</h2>
      <h3 class="flex flex-row gap-2 self-center"><CalendarDays className="h-5 w-5" /> {datum.toLocaleDateString()}</h3>
      <h3 class="flex flex-row gap-2 self-center"><CalendarClock className="h-5 w-5" /> {datum.toLocaleTimeString(undefined, {hour: "2-digit", minute: "2-digit"})}</h3>
      <div class="divider"></div>
      <div class="prose mt-5 text-center">{activiteit.omschrijving}</div>
      <div class="card-actions flex flex-row items-center">
        {#if activiteit.inschrijven && (inschrijvings_start_datum <= huidige_datum && inschrijvings_eind_datum >= huidige_datum)}
        <button class="btn btn-primary btn-wide">Schrijf je in!</button>
        {/if}
      </div>
    </div>
  </div>