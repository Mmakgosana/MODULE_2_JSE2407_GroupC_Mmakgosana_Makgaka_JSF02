<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    
    export let id;
    let product = writable(null);
    let loading = writable(true);
    let error = writable(null);
  
    onMount(async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        product.set(data);
      } catch (err) {
        error.set(err);
      } finally {
        loading.set(false);
      }
    });

    // Function to add the product to the cart
  function addToCart() {
    product.subscribe(value => {
      if (value) {
        cart.update(items => [...items, value]);
      }
    });
  }
  </script>
  
  {#if $loading}
    <p>Loading...</p>
  {:else if $error}
    <p>Error: {$error.message}</p>
  {:else if $product}
    <div class="max-w-2xl mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">{$product.title}</h1>
      <img src={$product.image} alt={$product.title} class="w-1/2 mx-auto mb-4" />
      <p class="mb-2"><strong>Price:</strong> ${$product.price}</p>
      <p class="mb-2"><strong>Category:</strong> {$product.category}</p>
      <div class="flex items-center mb-2">
        <svg
          class="w-5 h-5 text-yellow-400 mr-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
        <span>{$product.rating.rate} ({$product.rating.count} reviews)</span>
      </div>
      <p class="mb-4">{$product.description}</p>
      <div class="flex space-x-4">
        <button 
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          on:click={addToCart}
        >
          Add to Cart
        </button>
        <button 
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          on:click={() => history.back()}
        >
          Back to Products
        </button>
      </div>
    </div>
  {/if}