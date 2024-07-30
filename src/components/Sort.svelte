<script>
  import { sortOption } from '../components/Store';

  export let onSort;

  function handleSort(event) {
    sortOption.set(event.target.value);
    onSort(event.target.value);
  }
</script>

<style>
  .sort-container {
    margin-bottom: 1rem;
  }
  select {
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #D1D5DB;
  }
</style>

<div class="sort-container">
  <label for="sort-select">Sort by: </label>
  <select id="sort-select" bind:value={$sortOption} on:change={handleSort}>
    <option value="default">Default</option>
    <option value="low-to-high">Price: Low to High</option>
    <option value="high-to-low">Price: High to Low</option>
  </select>
</div>
