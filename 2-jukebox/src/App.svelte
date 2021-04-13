<script lang="ts">
import { jukeboxEvents } from "@swiftory/utils";
import { onDestroy, onMount } from "svelte";
import { Route, Router } from "svelte-routing";
import AlbumFoundModal from "./AlbumFoundModal.svelte";
import BackToHomeLink from "./BackToHomeLink.svelte";
import Dashboard from "./Dashboard.svelte";

let allFoundKeys = [];
let albumFoundKey = "";
const setAlbumFoundKey = (key) => {
  albumFoundKey = key;
};

export const handleAlbumFoundEvent = (e: Event) => {
  albumFoundKey = e.detail.albumKey;
  if (!allFoundKeys.includes(e.detail.albumKey)) {
    allFoundKeys.push(e.detail.albumKey);
  }
};

onMount(() => {
  jukeboxEvents.attach("swiftory:found_album", handleAlbumFoundEvent);
});

onDestroy(() => {
  jukeboxEvents.cleanup("swiftory:found_album", handleAlbumFoundEvent);
});

console.log("albumFoundKey", albumFoundKey);

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

<div>
  {#if albumFoundKey.length > 0}
    <AlbumFoundModal
      albumFoundKey="{albumFoundKey}"
      setAlbumFoundKey="{setAlbumFoundKey}" />
  {/if}
  <Router>
    <Route path="/" component="{Dashboard}" allFoundKeys="{allFoundKeys}" />
    <Route path="/album/*" component="{BackToHomeLink}" />
  </Router>
</div>
