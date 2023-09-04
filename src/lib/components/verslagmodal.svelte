<script lang="ts">
  export let verslag: any | undefined;
</script>

<dialog id="verslag_modal" class="modal">
  <form method="post" enctype="multipart/form-data" class="modal-box">
    <input type="file" placeholder={verslag.verslag ?? ""} />
    <input type="text" value={verslag.naam ?? ""}/>
    <div class="modal-action">
      <button type="submit" formmethod="dialog" class="btn-outline">Annuleer</button>
      <button type="submit" class="btn">Opslaan</button>
    </div>
  </form>
</dialog>