<script lang="ts">
import { navigateToUrl } from "single-spa";

const doNavigate = (e) => {
  navigateToUrl(e);
};
</script>

<style global lang="postcss">
.back-link {
  transform: translateX(-10px);
}
.back-link:hover {
  transform: translateX(0px);
}
</style>

<a
  class="back-link fixed top-16 left-0 z-50 px-4 py-2 bg-black text-white rounded-r-full transition-transform"
  title="Back to SWIFTORY"
  href="/"
  on:click="{doNavigate}">
  <span class="text-2xl pl-4">&larr;</span>
</a>
