<script lang="ts">
import { jukeboxEvents } from "@swiftory/utils";
import { onDestroy, onMount } from "svelte";
import { Route, Router } from "svelte-routing";
import BackToHomeLink from "./BackToHomeLink.svelte";
import Dashboard from "./Dashboard.svelte";

const testEventCallback = (e: Event) => {
  testCount++;
};

onMount(() => {
  jukeboxEvents.attach("swiftory:test", testEventCallback);
});

onDestroy(() => {
  jukeboxEvents.cleanup("swiftory:test", testEventCallback);
});

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

<Router>
  <Route path="/" component="{Dashboard}" />
  <Route path="/album/*" component="{BackToHomeLink}" />
</Router>
