<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="preload" href="/fonts/VT323.ttf" as="font" type="font/ttf" crossorigin="anonymous" />
</svelte:head>

{@render children()}
