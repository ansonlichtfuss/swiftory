<script lang="ts">
import { CDN_URL, jukeboxEvents, preloadImages } from "@swiftory/utils";
import { onDestroy, onMount } from "svelte";
import { Route, Router } from "svelte-routing";
import albumData from "./album-data";
import AlbumAlreadyAddedModal from "./AlbumAlreadyAddedModal.svelte";
import AlbumFoundModal from "./AlbumFoundModal.svelte";
import BackToHomeLink from "./BackToHomeLink.svelte";
import Dashboard from "./Dashboard.svelte";
import MobileWarning from "./MobileWarning.svelte";

/**
 * Album key simple state management
 */
let allFoundKeys = [];
let albumFoundKey = "";
let showAlbumAlreadyFoundModal = false;
const setAlbumFoundKey = (key) => {
  albumFoundKey = key;
};
const setShowAlbumAlreadyFoundModal = (value) => {
  showAlbumAlreadyFoundModal = value;
};

export const handleAlbumFoundEvent = (e) => {
  if (!allFoundKeys.includes(e.detail.albumKey)) {
    albumFoundKey = e.detail.albumKey;
    allFoundKeys.push(e.detail.albumKey);
  } else {
    showAlbumAlreadyFoundModal = true;
  }
};

onMount(async () => {
  jukeboxEvents.attach("swiftory:found_album", handleAlbumFoundEvent);

  /**
   * Preload album artwork
   */
  const albumArtworkUrlArray = Object.keys(albumData).map(
    (albumKey) => `${CDN_URL}/jukebox/albums/${albumData[albumKey].cover}`
  );
  await preloadImages(albumArtworkUrlArray);
});

onDestroy(() => {
  jukeboxEvents.cleanup("swiftory:found_album", handleAlbumFoundEvent);
});
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
  {#if showAlbumAlreadyFoundModal}
    <AlbumAlreadyAddedModal
      setShowAlbumAlreadyFoundModal="{setShowAlbumAlreadyFoundModal}" />
  {/if}
  <MobileWarning />
  <Router>
    <Route path="/" component="{Dashboard}" allFoundKeys="{allFoundKeys}" />
    <Route path="/album/*" component="{BackToHomeLink}" />
  </Router>
</div>
