import { writable, derived } from "svelte/store";
import baby_names_data from "$lib/data/baby_name_data.json";

/* ----------------------------------------
 * Writable: all unique names (from long data)
 * ---------------------------------------- */
export const uniqueNames = writable(
  Array.from(
    new Set(baby_names_data.map(d => d.Name))
  )
);

/* ----------------------------------------
 * Utility: sample 2 names
 * ---------------------------------------- */
function sampleTwo(arr) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
}

/* ----------------------------------------
 * Writable: sampled names
 * ---------------------------------------- */
export const sampledNames = writable([]);

/* ----------------------------------------
 * Action: resample names
 * ---------------------------------------- */
export function resampleNames() {
  uniqueNames.subscribe(names => {
    sampledNames.set(sampleTwo(names));
  })();
}

/* ----------------------------------------
 * Derived: records filtered by sampled names
 * ---------------------------------------- */
export const sampledRecords = derived(
  sampledNames,
  ($sampledNames) => {
    if ($sampledNames.length === 0) return [];

    return baby_names_data
      .filter(d => $sampledNames.includes(d.Name))
      .map(d => ({
        ...d,
        Date: new Date(d.Date) // 👈 parse YYYY-MM-DD string to Date
      }));
  }
);

