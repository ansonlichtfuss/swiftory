<script lang="ts">
import { CDN_URL } from "@swiftory/utils";
import albumData from "./album-data";
import Jukebox from "./svg/Jukebox.svelte";

export let allFoundKeys;
let emptyAlbumArray = new Array(Object.keys(albumData).length).fill("");
</script>

<div>
  <section class="pb-12 px-4 w-full">
    <div
      class="flex flex-col items-center justify-center w-full max-w-xl mx-auto">
      <div class="relative" style="width:200px;z-index:1;margin-bottom:-85px;">
        <Jukebox />
      </div>
      <div
        class="flex-grow border-4 p-5 rounded-lg w-full"
        style="border-color:#493b33;">
        <div
          class="flex justify-between border-b pb-3 mb-6 text-center"
          style="border-bottom-color:#493b33;">
          <span class="font-black">JUKEBOX</span>
          <span><strong>{allFoundKeys.length}</strong>
            of
            <strong>{emptyAlbumArray.length}</strong>
            albums found</span>
        </div>
        <div class="grid grid-cols-2 gap-x-6">
          {#each emptyAlbumArray as albumPlaceholder, index}
            <div class="flex items-center my-2">
              <div
                class="rounded-sm overflow-hidden flex-shrink-0"
                style="width:50px;height:50px;background:#261e1a;">
                {#if allFoundKeys[index]}
                  <img
                    src="{`${CDN_URL}/jukebox/albums/${albumData[allFoundKeys[index]].cover}`}"
                    alt="{albumData[allFoundKeys[index]].album}" />
                {/if}
              </div>
              <div class="flex flex-col flex-grow justify-center pl-4">
                {#if allFoundKeys[index]}
                  <strong>{albumData[allFoundKeys[index]].album}</strong>
                  <small>by
                    <em>{albumData[allFoundKeys[index]].artist}</em></small>
                {:else}
                  <div
                    class="rounded mb-2"
                    style="width:100%;height:1rem;background:#261e1a;"></div>
                  <div
                    class="rounded"
                    style="width:50px;height:1rem;background:#261e1a;"></div>
                {/if}
              </div>
            </div>
          {/each}
        </div>
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
