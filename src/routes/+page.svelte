<script lang="ts">
	import { onMount } from 'svelte';

	const dashes = [...Array(6)].map(() => '-' + ' ');

	let links: NodeListOf<HTMLLIElement>;
	let currentIndex = 0;
	let lastTouchY: number | null = null;

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

		if (navigator.vibrate) {
			navigator.vibrate(10); // Duration in ms, short sharp tap
		}
	};

	// Keyboard navigation
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

			// Stronger haptic
			if (navigator.vibrate) {
				navigator.vibrate([30, 10, 30]); // double-tap feel
			}
		}
	};

	// Touch scroll navigation
	const handleTouchMove = (e: TouchEvent) => {
		if (e.touches.length !== 1) return;

		const touchY = e.touches[0].clientY;
		if (lastTouchY !== null) {
			const deltaY = touchY - lastTouchY;

			if (deltaY > 20) {
				currentIndex = (currentIndex - 1 + links.length) % links.length;
				updateActiveLink();
			} else if (deltaY < -20) {
				currentIndex = (currentIndex + 1) % links.length;
				updateActiveLink();
			}
		}
		lastTouchY = touchY;
	};

	const resetTouch = () => {
		lastTouchY = null;
	};

	onMount(() => {
		links = document.querySelectorAll('.link');
		if (links.length > 0) {
			updateActiveLink();

			document.addEventListener('keydown', handleKeydown);
			window.addEventListener('touchmove', handleTouchMove, { passive: true });
			window.addEventListener('touchend', resetTouch);
		}

		// Flicker line effect
		const flickerLine = document.getElementById('flicker-line');

		const flicker = () => {
			if (!flickerLine) return;
			const y = Math.random() * window.innerHeight;
			flickerLine.style.top = `${y}px`;
			flickerLine.style.opacity = '1';

			setTimeout(() => {
				flickerLine.style.opacity = '0';
			}, 40);

			setTimeout(flicker, Math.random() * 4000 + 1000);
		};

		flicker();

		return () => {
			document.removeEventListener('keydown', handleKeydown);
			window.removeEventListener('touchmove', handleTouchMove);
			window.removeEventListener('touchend', resetTouch);
		};
	});
</script>

<svelte:head>
	<title>Danny Nikravesh</title>
	<meta name="description" content="Software Engineer @[DS]" />
	<meta name="keywords" content="Danny Nikravesh, Software Engineer, DS, Delicious Simplicity" />
</svelte:head>

<h1 class="sr-only">Danny Nikravesh Software Engineer</h1>

<div class="text-center text-4xl md:text-6xl lg:text-8xl">
	{#each dashes as dash, index}
		<span class={index % 2 === 0 ? 'hidden xl:inline' : 'inline'}>{dash}</span>
	{/each}
	MENU
	{#each dashes as dash, index}
		<span class={index % 2 === 0 ? 'hidden xl:inline' : 'inline'}>{dash}</span>
	{/each}
</div>

<section class="mx-auto mt-8 max-w-xl space-y-6 sm:max-w-2xl lg:mt-16 lg:max-w-5xl">
	<header>
		<h2>Danny Nikravesh</h2>
		<p class="my-4">
			Software Engineer
			<a target="_blank" rel="noopener nofollow" href="https://www.delicious-simplicity.com/">
				@[DS]
			</a>
		</p>
	</header>

	<nav aria-labelledby="links-heading">
		<h2 id="links-heading" class="sr-only">Links</h2>
		<ul class="space-y-6 pl-8 lg:pl-16">
			<li class="link">
				<a target="_blank" rel="noopener nofollow" href="https://github.com/dsdannynikravesh">
					GitHub
				</a>
			</li>
			<li class="link">
				<a
					target="_blank"
					rel="noopener nofollow"
					href="https://www.linkedin.com/in/daniel-nikravesh/"
				>
					LinkedIn
				</a>
			</li>
			<li class="link">
				<a target="_blank" rel="noopener nofollow" href="mailto:dannynikravesh@gmail.com">
					Email
				</a>
			</li>
		</ul>
	</nav>

	<section aria-label="Keyboard Controls">
		<h2 class="sr-only">Keyboard Controls</h2>
		<p>
			Select&nbsp;:&nbsp;<kbd>▲</kbd> <kbd>▼</kbd> key
		</p>
		<p>
			Set &nbsp;&nbsp;&nbsp;:&nbsp;<kbd>↵</kbd> key
		</p>
	</section>
</section>

<div id="flicker-line"></div>
