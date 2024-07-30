<script>
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store';
</script>

let products = writable([]);
  let originalProducts = [];
  let selectedProduct = null;
  let categories = ["All categories"];
  let searchTerm = "";
  let filterItem = writable("All categories");
  let sorting = writable("default");
  let loading = writable(false);
  let error = writable(false);

