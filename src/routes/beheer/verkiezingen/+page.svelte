<script>
	import { Castle, Crown, MoreHorizontal } from "lucide-svelte";


</script>

<div class="flex flex-col items-center mt-5">
    <div class="flex flex-col md:flex-row gap-2 mb-10">
        <div class="card w-64 bg-base-200 shadow-xl">
            <div class="card-body items-center text-center">
              <h2 class="card-title"><Crown class="h-4 w-4"/> Homeraad</h2>
              <p>Start een homeraadverkiezing op.</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Ga verder</button>
              </div>
            </div>
          </div>
          <div class="card w-64 bg-base-200 shadow-xl">
            <div class="card-body items-center text-center">
              <h2 class="card-title"><Castle class="h-4 w-4"/>Home Konvent</h2>
              <p>Start een verkiezing op voor HK-Centraal.</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Ga verder</button>
              </div>
            </div>
          </div>
          <div class="card w-64 bg-base-200 shadow-xl">
            <div class="card-body items-center text-center">
              <h2 class="card-title"><MoreHorizontal class="h-4 w-4" /> Andere</h2>
              <p>Start een diverse verkiezing op.</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Ga verder</button>
              </div>
            </div>
          </div>
    </div>
    <div class="prose">
        <h2>Vorige verkiezingen</h2>
    </div>
</div>
