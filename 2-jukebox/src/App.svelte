<script lang="ts">
import { jukeboxEvents } from '@swiftory/utils';
import { onDestroy,onMount } from 'svelte';
import Jukebox from './svg/Jukebox.svelte';























const testEventCallback = (e: Event) => {
    testCount++;
  };

onMount(() => {
  jukeboxEvents.attach('swiftory:test', testEventCallback)
})

onDestroy(() => {
  jukeboxEvents.cleanup('swiftory:test', testEventCallback);
})

export let name;
export let testCount = 0;
</script>

<style global lang="postcss">
  /* only apply purgecss on utilities, per Tailwind docs */
  /* purgecss start ignore */
  @tailwind base;
  @tailwind components;
  /* purgecss end ignore */

  @tailwind utilities;
</style>

<section class="py-24">
  <div class="flex justify-center w-full max-w-4xl mx-auto">
    <div class="relative" style="width:200px;z-index:1;">
      <Jukebox/>
    </div>
    <div class="flex-grow border p-5 rounded" style="margin-left:-100px;padding-left:110px;border-color:#493b33;">
      <div class="flex justify-between border-b pb-3 mb-3 text-center" style="border-bottom-color:#493b33;">
        <span class="font-black">JUKEBOX</span>
        <span><strong>7</strong> of <strong>20</strong> albums found</span>
      </div>
      <div class="border border-white rounded-sm" style="width:50px;height:50px;">album</div>
    </div>
  </div>
</section>
