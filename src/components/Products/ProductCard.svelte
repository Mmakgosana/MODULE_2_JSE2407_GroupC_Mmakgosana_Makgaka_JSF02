<script>
  //import { onMount } from 'svelte';
  import Ratings from './Ratings.svelte';
  import { navigate } from 'svelte-routing';

  //Exporting properties that can be passed from a parent component
  export let id;
  export let title;
  export let image;
  export let price;
  export let rating;
  export let category;

  //Function to handle click events, navigating to the product details page
  function handleClick() {
    navigate(`/products/${id}`);
  }
  //Function to handle adding a product to favorites
  function addToFavourites(event) {
    //Prevents click event from propagating to parent elements
    event.stopPropagation();
  }
</script>
<!--Main container for the product card-->
<div
  on:click={handleClick}
  class="flex bg flex-col max-h-[130rem] cursor-pointer max-w-80 hover:-translate-y-1 hover:scale-105 duration-300 bg-white border border-slate-200 shadow shadow-slate-950/5 rounded-2xl overflow-hidden"
>
  <img class="object-contain h-48 mt-3" src={image} alt="Product Image" />

  <div class="flex-1 flex flex-col p-6">
    <div class="flex-1">
      <header class="mb-2 flex-2">
        <h2 class="text-lg line-clamp-2 font-extrabold leading-snug">
          <div class="text-slate-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300">
            {title}
          </div>
        </h2>
      </header>

      <!--Ratings component displaying product rating-->
      <Ratings {rating} />
      <div class="text-base line-clamp-2 font-extrabold text-slate-500 leading-snug">
        <h2>${price}</h2>
      </div>
    </div>

    <!--Container for category and action buttons-->

    <div class="flex mt-1 space-x-2">
      <!--Product category-->
      <div class="justify-start flex-1">
        <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
          {category}
        </span>
      </div>
      <!--Container for action buttons-->
      <div class="justify-end space-x-2">
        <button on:click={addToFavourites}>
          <svg
            class="me-1.5 h-5 w-5 hover:fill-red-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            transform="scale(1.6)"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
            />
          </svg>
        </button>
        <!--Add to cart button-->
        <button class="inline-flex justify-center whitespace-nowrap rounded-lg bg-cyan-700 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors">
          Add To Cart
        </button>
      </div>
    </div>
  </div>
</div>
