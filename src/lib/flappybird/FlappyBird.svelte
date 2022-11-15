<script lang="ts">
	import P5 from 'p5-svelte';
	import sketch from './sketch';
</script>

<div class="mx-auto grid max-w-[1200px] place-items-center overflow-hidden">
	<div class="pb-5">
		<P5 sketch="{sketch}" />
	</div>
</div>

<style global>
	canvas.p5Canvas {
		@apply block rounded;
	}
	@media (min-height: 934px) {
		canvas.p5Canvas {
			@apply mt-[17px];
		}
	}
</style>
