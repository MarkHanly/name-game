<script lang="ts">
  import { onMount } from "svelte";
  import { sampledNames, sampledRecords, resampleNames } from "$lib/stores/names";

  // sample names on mount
  onMount(() => resampleNames());
</script>


<h3>{$sampledNames[0]} OR {$sampledNames[1]}</h3>


<div class="p-4 border rounded h-[400px]">

</div>

<pre>
{#each $sampledRecords.slice(0, 2) as row}
  {JSON.stringify(row, null, 2)}
{/each}
</pre>

<button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onclick={resampleNames}>
  Resample Names
</button>
