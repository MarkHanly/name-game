<script>
	import { Plot, RuleY, Line } from 'svelteplot'
    import { onMount } from "svelte";
    import { sampledNames, sampledRecords, resampleNames } from "$lib/stores/names";

  // sample names on mount
  onMount(() => resampleNames());

  let showLegend = $state(false);
  let guess = $state([]);
  let pause = 1000;
  let message = $state("or");

  function checkAnswer(input1, input2) {
    if (input1[0] === input2[0] && input1[1] === input2[1]) {
        message = "Correct!";
        } else {
            message = "Incorrect";
        }

    }    


function shuffle(names) {
  const arr = [...names];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

let shuffledNames = $derived(shuffle($sampledNames));
 

</script>


<div class="mx-32 mt-12">

    <div class="relative flex items-center px-12 py-8">
        <!-- Left button -->
        <button
            class="rounded bg-slate-800 border border-slate-500 px-4 py-2 hover:bg-slate-900 active:bg-slate-700"
            onclick={() => {
                showLegend = !showLegend
                guess = [$sampledNames[1], $sampledNames[0]]
                checkAnswer(shuffledNames, guess)
                setTimeout(() => {
                    resampleNames()
                    showLegend = false
                    guess = []
                    message = "or"
                    }, pause)
                }} 
        >
            <span class="text-yellow-500 font-semibold">{$sampledNames[0]}</span> and 
            <span class="text-teal-300 font-semibold">{$sampledNames[1]}</span>
        </button>

        <!-- Center text -->
        <div class="absolute left-1/2 transform -translate-x-1/2 text-center">
            { message }
        </div>

    <!-- Right button -->
        <button
            class="ml-auto rounded bg-slate-800 border border-slate-500 px-4 py-2 hover:bg-slate-900 active:bg-slate-700"
            onclick={() => {
                showLegend = !showLegend
                guess = [$sampledNames[0], $sampledNames[1]]
                checkAnswer(shuffledNames, guess)
                setTimeout(() => {
                    resampleNames()
                    showLegend = false
                    guess = []
                    message = "or"
                    }, pause)
                }} 
        >
            <span class="text-yellow-500 font-semibold">{$sampledNames[1]}</span> and
            <span class="text-teal-300 font-semibold">{$sampledNames[0]}</span>
            
        </button>
    </div>

    <Plot
        x={{
            axis: 'bottom',
            tickSpacing: 100,
            tickFormat: "YYYY"
        }}
        color={{ 
            // legend: showLegend,
            legend: false,
            domain: shuffledNames, 
            scheme: ["#2dd4bf", "#eab308"], 
            position: "bottom"
            }}
        y={{ grid: true, percent: false }}>
        <RuleY y={1} />
        <Line
            data={$sampledRecords}
            x='Date'
            y='Number'
            stroke='Name'
            strokeWidth={4}
            />
    </Plot>
</div>

<button 
    class="mt-8 mx-auto block px-4 py-2 bg-slate-500 text-slate-100 rounded"
    onclick={() => {
        resampleNames();
        showLegend = false
    }
    }
>
  Resample Names
</button>


<style>
  :global(.color-legend) {

  }
</style>
