<script lang="ts">
	import { Edit, Trash, File } from "lucide-svelte";

    export let verslag: any;
</script>
<tr>
    <td>
      <div class="flex flex-row gap-2">
        <button
          class="btn btn-square h-7 w-7"
        >
          <Edit class="h-4 w-4" />
        </button>
        <button
          class="btn btn-square btn-error h-7 w-7"
        >
          <Trash class="h-4 w-4" />
        </button>
      </div>
    </td>
    <td>
      <div class="font-bold">{verslag.naam}</div>
    </td>
    <td>
      <a class="btn" href={verslag.verslag} target="_blank">
        <File class="h-4 w-4" />
      </a>
    </td>
    <td>
      <div>{verslag.created}</div>
    </td>
  </tr>