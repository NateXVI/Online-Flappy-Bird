<script lang="ts">
	import P5 from 'p5-svelte';
	import sketch from '$lib/flappybird/sketch';
	import FlappyBird from '$lib/flappybird/FlappyBird.svelte';
</script>

<div class="grid min-h-screen w-screen place-items-center overflow-hidden">
	<FlappyBird />
</div>
