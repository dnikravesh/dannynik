<script lang="ts">
	import { onMount } from 'svelte';

	const dashes = [...Array(6)].map(() => '-' + ' ');

	let links: NodeListOf<HTMLLIElement>;
	let currentIndex = 0;

	// Function to update the active link
	const updateActiveLink = () => {
		links.forEach((link, i) => {
			if (i === currentIndex) {
				link.classList.add('active');
				const anchor = link.querySelector<HTMLAnchorElement>('a');
				anchor?.focus();
			} else {
				link.classList.remove('active');
			}
		});
	};

	// Event listener for keyboard navigation
	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowDown' || e.key === 'j') {
			currentIndex = (currentIndex + 1) % links.length;
			updateActiveLink();
		} else if (e.key === 'ArrowUp' || e.key === 'k') {
			currentIndex = (currentIndex - 1 + links.length) % links.length;
			updateActiveLink();
		} else if (e.key === 'Enter') {
			const anchor = links[currentIndex]?.querySelector<HTMLAnchorElement>('a');
			anchor?.click();
		}
	};

	// Setup the links and attach the event listener when the component mounts
	onMount(() => {
		links = document.querySelectorAll('.link');
		if (links.length > 0) {
			updateActiveLink(); // Set the initial active link

			document.addEventListener('keydown', handleKeydown);
		}

		return () => {
			document.removeEventListener('keydown', handleKeydown); // Cleanup event listener
		};
	});
</script>

<svelte:head>
	<title>Danny Nikravesh</title>
	<meta name="description" content="Software Engineer @[DS]" />
	<meta name="keywords" content="Danny Nikravesh, Software Engineer, DS, Delicious Simplicity" />
</svelte:head>
<div class="text-center text-4xl md:text-6xl lg:text-8xl">
	{#each dashes as dash, index}
		<span class={index % 2 === 0 ? 'hidden xl:inline' : 'inline'}>{dash}</span>
	{/each}
	MENU
	{#each dashes as dash, index}
		<span class={index % 2 === 0 ? 'hidden xl:inline' : 'inline'}>{dash}</span>
	{/each}
</div>

<div class="mx-auto mt-8 max-w-xl space-y-6 sm:max-w-2xl lg:mt-16 lg:max-w-5xl">
	<div>Danny Nikravesh</div>
	<div class="my-4">
		Software Engineer <a
			target="_blank"
			rel="noopener nofollow"
			href="https://www.delicious-simplicity.com/">@[DS]</a
		>
	</div>
	<ul class="space-y-6 pl-8 lg:pl-16">
		<li class="link">
			<a target="_blank" rel="noopener nofollow" href="https://github.com/dsdannynikravesh"
				>Github</a
			>
		</li>
		<li class="link">
			<a
				target="_blank"
				rel="noopener nofollow"
				href="https://www.linkedin.com/in/daniel-nikravesh/">LinkedIn</a
			>
		</li>
		<li class="link">
			<a target="_blank" rel="noopener nofollow" href="mailto:dannynikravesh@gmail.com">Email</a>
		</li>
	</ul>
	<div>
		Select&nbsp;:&nbsp;<kbd>▲</kbd> <kbd>▼</kbd> key
	</div>
	<div>
		Set &nbsp;&nbsp;&nbsp;:&nbsp;<kbd>↵</kbd> key
	</div>
</div>
