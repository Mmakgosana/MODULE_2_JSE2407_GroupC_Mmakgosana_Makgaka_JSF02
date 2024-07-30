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


