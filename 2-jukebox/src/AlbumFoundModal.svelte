<script lang="ts">
import { CDN_URL } from "@swiftory/utils";
import { fade } from "svelte/transition";
import albumData from "./album-data";
import Jukebox from "./svg/Jukebox.svelte";

export let albumFoundKey;
export let setAlbumFoundKey;

let thisData = albumData[albumFoundKey];
</script>

<style global lang="postcss">
</style>

<span
  class="fixed top-0 left-0 w-full h-full flex items-center justify-center"
  style="background:rgba(0,0,0,0.8);z-index:9999;"
  on:click="{() => {
    setAlbumFoundKey('');
  }}"
  transition:fade="{{ duration: 200 }}">
  <div
    class="flex items-center justify-center rounded-xl relative max-w-3xl"
    style="background:rgba(0,0,0,1);">
    <div class="absolute" style="z-index:0;width:300px;">
      <Jukebox />
    </div>

    <div
      class="flex items-center justify-center p-12 rounded-xl relative"
      style="z-index:1;background:rgba(0,0,0,0.6);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);">
      <div
        class="overflow-hidden rounded-lg mr-6"
        style="min-width:150px;width:150px;height:150px;">
        <img
          src="{`${CDN_URL}/jukebox/albums/${thisData.cover}`}"
          alt="{thisData.album}" />
      </div>
      <div>
        You just found<br />
        <h2 class="font-extrabold tracking-widest text-4xl uppercase">
          {thisData.album}
        </h2>
        by
        <em class="font-lg">{thisData.artist}</em>.

        <p class="mt-3">
          {thisData.producer}
          helped produce this album in
          {thisData.year}.
        </p>

        <p>
          <small><em class="text-gray-500">Click anywhere to close.</em></small>
        </p>
      </div>
    </div>
  </div>
</span>
