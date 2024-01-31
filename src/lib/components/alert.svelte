<script lang="ts">
    import { blur } from "svelte/transition";
</script>

<div class="text-xs rounded bg-red-100 p-sm mb-md border-red-600 border text-red-600" transition:blur>
    <slot />
</div>