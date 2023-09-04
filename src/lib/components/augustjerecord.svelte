<script lang="ts">
	import { Edit, Trash, File } from "lucide-svelte";
	import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    const updateAugustje = () => {
      dispatch('update', {augustje});
    }

    export let augustje: any;
</script>

<tr>
    <td>
      <div class="flex flex-row gap-2">
        <button
          on:click={updateAugustje}
          class="btn btn-square h-7 w-7"
        >
          <Edit class="h-4 w-4" />
      </button>
        <button class="btn btn-square btn-error h-7 w-7">
          <Trash class="h-4 w-4" />
        </button>
      </div>
    </td>
    <td>
      <div class="font-bold">{augustje.naam}</div>
    </td>
    <td>
      <a class="btn" href={augustje.augustje} target="_blank">
        <File class="h-4 w-4" />
      </a>
    </td>
    <td>
      <div>{augustje.created}</div>
    </td>
  </tr>