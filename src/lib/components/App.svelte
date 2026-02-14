<script>
	import { Plot, RuleY, Line } from 'svelteplot'
    import { onMount } from "svelte";
    import { sampledNames, sampledRecords, resampleNames } from "$lib/stores/names";
    import Icon from '@iconify/svelte';

  // sample names on mount
  onMount(() => resampleNames());

  let showLegend = $state(false);
  let guess = $state([]);
  let pause = 1000;
  let message = $state(null);

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
 
  const positiveEmojis = ["✨", "🎉", "🚀", "🔥", "🌟", "😎"];
  const negativeEmojis = ["💩", "😢", "☹️", "😞", "😔", "😩"];

  let emoji = $state(null);

  function pickEmoji(message) {
    emoji = message === "Correct!" ? 
        positiveEmojis[Math.floor(Math.random() * positiveEmojis.length)] : 
        negativeEmojis[Math.floor(Math.random() * negativeEmojis.length)];
  }

  // Modal state
  let showModal = $state(false);

  function toggleModal() {
    showModal = !showModal;
  }

</script>

<div class="mx-2 sm:mx-8 md:mx-32">

    <div
        class="text-right pt-2 pr-2"
    >

    <!-- Info icon -->
    <button 
    class="text-gray-600 hover:text-gray-400 active:text-gray-200"
    onclick={toggleModal}
    aria-label="Info"
    >
    <Icon icon="mdi:information" width="24" />
    </button>

    </div>

    <div
        class = "text-2xl md:text-3xl font-semibold text-center tracking-tight">
        Pick the right legend!
    </div>

    <div class="my-3">
        <div class="relative flex items-center gap-4">
            <!-- Left button -->
            <button
                class="rounded bg-slate-800 border border-slate-500 px-2 py-2 min-w-[30vw] max-w-[40vw] hover:bg-slate-900 active:bg-slate-700"
                onclick={() => {
                    showLegend = !showLegend
                    guess = [$sampledNames[1], $sampledNames[0]]
                    checkAnswer(shuffledNames, guess)
                    pickEmoji(message)
                    setTimeout(() => {
                        resampleNames()
                        showLegend = false
                        emoji = null
                        guess = []
                        message = null
                        }, pause)
                    }} 
            >
                <span class="bg-blue-950 text-yellow-500 font-semibold">{$sampledNames[0]}</span> & <br> 
                <span class="text-teal-300 font-semibold">{$sampledNames[1]}</span>

            </button>

            <!-- Center text -->
            <div class="absolute left-1/2 transform -translate-x-1/2 text-center">
                or
            </div>

        <!-- Right button -->
            <button
                class="ml-auto rounded bg-slate-800 border border-slate-500 px-1 py-2 min-w-[30vw] max-w-[40vw] hover:bg-slate-900 active:bg-slate-700"
                onclick={() => {
                    showLegend = !showLegend
                    guess = [$sampledNames[0], $sampledNames[1]]
                    checkAnswer(shuffledNames, guess)
                    pickEmoji(message)
                    setTimeout(() => {
                        resampleNames()
                        showLegend = false
                        emoji = null
                        guess = []
                        message = null
                        }, pause)
                    }} 
            >
                <span class="text-yellow-500 font-semibold">{$sampledNames[1]}</span> & <br> 
                <span class="text-teal-300 font-semibold">{$sampledNames[0]}</span>
                
            </button>
        </div>
    </div>    

    <!-- Center text -->
    <div class="absolute left-1/2 transform -translate-x-1/2 text-center font-semibold text-lg">
        { message } { emoji }
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
    class="my-8 mx-auto block px-4 py-2 bg-slate-500 text-slate-100 rounded"
    onclick={() => {
        resampleNames();
        showLegend = false
    }
    }
>
  Resample Names
</button>


<footer 
  class="fixed bottom-0 left-0 w-full bg-gray-800 text-gray-400 text-sm py-1 text-center">
  
  <span>
    Data: 
    <a 
      href="https://www.nsw.gov.au/family-and-relationships/births/popular-baby-names"
      class="underline hover:text-gray-300"
      target="_blank"
      rel="noopener noreferrer"
    >
      NSW Popular Baby Names
    </a>
  </span>
</footer>

<!-- Modal overlay -->
{#if showModal}
  <div class="fixed inset-0 bg-gray-850 flex items-center justify-center z-50">

    <!-- Modal content -->
    <div class="bg-white p-6 rounded-lg max-w-md mx-4 text-center relative">
      <button 
        class="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        onclick={toggleModal}
      >✕
      </button>

      <div class="text-lg font-semibold mb-2 text-gray-800 ">How to play</div>
      <hr>
      <p class="text-gray-700">
        The chart shows the number of registered babies in New South Wales from 1955 - 2025 
        for two randomly selected names. 
      </p>
      <br>
      <p class="text-gray-700">
        Can you match the legend to the lines?
      </p>
    </div>
  </div>
{/if}

<style>
  :global(.color-legend) {

  }
</style>
