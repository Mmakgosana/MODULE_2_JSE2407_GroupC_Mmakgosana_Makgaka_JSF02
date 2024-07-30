<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { navigate } from 'svelte-routing';

  let products = writable([]);
  let originalProducts = [];
  let selectedProduct = null;
  let categories = ["All categories"];
  let searchTerm = "";
  let filterItem = writable("All categories");
  let sorting = writable("default");
  let loading = writable(false);
  let error = writable(false);

  const fetchProducts = async () => {
    let url = $filterItem !== "All categories" 
      ? `https://fakestoreapi.com/products/category/${$filterItem}`
      : 'https://fakestoreapi.com/products';

    try {
      loading.set(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Data fetching failed, please check your network connection");
      }
      const data = await response.json();
      originalProducts = JSON.parse(JSON.stringify(data));
      products.set(data);
    } catch (err) {
      error.set(err);
    } finally {
      loading.set(false);
      sortProducts();
      searchProducts();
    }
  };

  const sortProducts = () => {
    if ($sorting !== "default") {
      products.update(items => items.sort((a, b) =>
        $sorting === "low" ? a.price - b.price : b.price - a.price
      ));
    } else {
      products.set(JSON.parse(JSON.stringify(originalProducts)));
    }
  };

  const searchProducts = () => {
    if (searchTerm.trim() !== "") {
      const filteredProducts = originalProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      products.set(JSON.parse(JSON.stringify(filteredProducts)));
    } else {
      products.set(JSON.parse(JSON.stringify(originalProducts)));
    }
  };

  onMount(async () => {
    await fetchProducts();

    // Fetch categories
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const fetchedCategories = await response.json();
      categories = ["All categories", ...fetchedCategories];
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  });

  function handleCategoryChange(event) {
    filterItem.set(event.target.value);
    fetchProducts();
  }

  function handleSearch(event) {
    searchTerm = event.target.value;
    searchProducts();
  }

  function handleSortChange(event) {
    sorting.set(event.target.value);
    sortProducts();
  }

  $: sortProducts();
  $: searchProducts();

  const stars = Array(5).fill(0);

  function clickedProduct(product) {
    navigate(`/products/${product.id}`);
  }
</script>

<div class="p-4">
  <div class="mb-4 flex flex-col sm:flex-row sm:items-center">
    <select on:change={handleCategoryChange} class="p-2 border rounded mb-2 sm:mb-0 sm:mr-2">
      {#each categories as category}
        <option value={category}>{category}</option>
      {/each}
    </select>
    <input 
      type="text" 
      placeholder="Search products" 
      bind:value={searchTerm} 
      on:input={handleSearch}
      class="p-2 border rounded mb-2 sm:mb-0 sm:mr-2"
    />
    <select on:change={handleSortChange} class="p-2 border rounded">
      <option value="default">Sort by</option>
      <option value="low">Price: Low to High</option>
      <option value="high">Price: High to Low</option>
    </select>
  </div>

  <ul class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {#each $products as product (product.id)}
      <li 
        class="flex flex-col cursor-pointer bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105"
        on:click={() => clickedProduct(product)}
      >
        <div class="h-48 w-full flex items-center justify-center bg-gray-100">
          <img src={product.image} alt={product.title} class="object-contain h-full max-w-full" />
        </div>
        <div class="flex-1 flex flex-col p-4">
          <header class="mb-2">
            <h2 class="text-lg font-bold text-gray-700 line-clamp-2">
              {product.title}
            </h2>
          </header>
          <div class="flex-1">
            <h2 class="text-base font-bold text-gray-600">
              ${product.price}
            </h2>
            <p class="text-sm text-gray-500">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
            <div class="flex items-center mt-2 mb-4">
              {#each stars as _, i}
                <svg
                  class="w-5 h-5 {i < Math.round(product.rating.rate) ? 'text-yellow-400' : 'text-gray-300'}"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              {/each}
            </div>
          </div>
          <div class="flex justify-between items-center mt-2">
            <span class="inline-flex items-center rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
              {product.category}
            </span>
            <button class="text-gray-500 hover:text-red-500">
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
              </svg>
            </button>
            <button class="inline-flex justify-center whitespace-nowrap rounded bg-cyan-700 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-900">
              Add To Cart
            </button>
          </div>
        </div>
      </li>
    {/each}
  </ul>
</div>
