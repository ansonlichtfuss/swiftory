<script lang="ts">
import { fade } from "svelte/transition";

export let setShowAlbumAlreadyFoundModal;
</script>

<span
  class="fixed top-0 left-0 w-full h-full flex items-center justify-center"
  style="background:rgba(0,0,0,0.8);z-index:9999;"
  on:click="{() => {
    setShowAlbumAlreadyFoundModal(false);
  }}"
  transition:fade="{{ duration: 200 }}">
  <div
    class="flex items-center justify-center rounded-xl relative p-12"
    style="background:rgba(0,0,0,1);">
    <div>
      This album has already been added to your Jukebox.

      <p>
        <small><em class="text-gray-500">Click anywhere to close.</em></small>
      </p>
    </div>
  </div>
</span>
