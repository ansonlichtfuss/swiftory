<script lang="ts">
  // @ts-ignore
  import { jukeboxEvents } from '@swiftory/utils';
import { onDestroy,onMount } from 'svelte';


  export let name;
  export let testCount = 0;

  onMount(() => {
    jukeboxEvents.attach('test', (e: Event) => {
      testCount++;
    })
  })

  onDestroy(() => {
    jukeboxEvents.cleanup();
  })
</script>

<style global lang="postcss">
  /* only apply purgecss on utilities, per Tailwind docs */
  /* purgecss start ignore */
  @tailwind base;
  @tailwind components;
  /* purgecss end ignore */

  @tailwind utilities;
</style>

<section>{name} is mounted! Also, you friggin sent {testCount} test messages.</section>
