<script lang="ts">
import { CDN_URL } from "@swiftory/utils";
import albumData from "./album-data";
import Jukebox from "./svg/Jukebox.svelte";

export let allFoundKeys;
let emptyAlbumArray = new Array(21).fill("");
</script>

<div>
  <section class="py-24 px-4">
    <div class="flex justify-center w-full max-w-4xl mx-auto">
      <div class="relative" style="width:200px;z-index:1;">
        <Jukebox />
      </div>
      <div
        class="flex-grow border p-5 rounded"
        style="margin-left:-100px;padding-left:110px;border-color:#555;">
        <div
          class="flex justify-between border-b pb-3 mb-3 text-center"
          style="border-bottom-color:#555;">
          <span class="font-black">JUKEBOX</span>
          <span><strong>{allFoundKeys.length}</strong>
            of
            <strong>{emptyAlbumArray.length}</strong>
            albums found</span>
        </div>
        {#each emptyAlbumArray as albumPlaceholder, index}
          <div
            class="border border-white rounded-sm"
            style="width:50px;height:50px;">
            {#if allFoundKeys[index]}
              <img
                src="{`${CDN_URL}/jukebox/albums/${albumData[allFoundKeys[index]].cover}`}" />
            {/if}
            poop album
          </div>
        {/each}
        {JSON.stringify(allFoundKeys)}
      </div>
    </div>
  </section>
  <section class="pb-4 px-4 text-center">
    <p>
      An experimental micro frontend app from
      <a
        href="https://www.freepik.com"
        target="_blank"
        rel="noreferrer"><strong>Anson Lichtfuss</strong></a>.
    </p>
    <p class="text-gray-500 mb-0">
      <small>Jukebox icon made by
        <a
          href="https://www.freepik.com"
          target="_blank"
          rel="noreferrer">Freepik</a>
        from
        <a
          href="https://www.flaticon.com/"
          target="_blank"
          rel="noreferrer">www.flaticon.com</a></small><br />
      <small>Content and statistics sourced from Wikipedia</small>
    </p>
  </section>
</div>
