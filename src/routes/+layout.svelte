<script>
    import { Modals, closeModal } from 'svelte-modals';
</script>

<Modals>
    <div
      slot="backdrop"
      class="backdrop"
      on:click={closeModal}
    />
</Modals>

<slot />