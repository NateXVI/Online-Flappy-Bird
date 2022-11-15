<script lang="ts">
	import P5 from 'p5-svelte';
	import sketch from './sketch';
</script>

<div>
	<P5 sketch="{sketch}" />
</div>

<style global>
	canvas.p5Canvas {
		display: block;
	}
</style>
