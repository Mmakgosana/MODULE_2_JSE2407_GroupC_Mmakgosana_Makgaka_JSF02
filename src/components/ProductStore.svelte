<script>
    import { writable, derived } from 'svelte/store';
    
    // Create the main store
    const createStore = () => {
      const { subscribe, set, update } = writable({
        products: [],
        originalProducts: [],
        loading: false,
        error: false,
        sorting: "default",
        searchTerm: "",
        filterItem: "All categories",
        categories: [],
        singleProduct: null,
      });
    
      return {
        subscribe,
        setSorting: (sorting) => update(state => ({ ...state, sorting })),
        setSearchTerm: (searchTerm) => update(state => ({ ...state, searchTerm })),
        setFilterItem: (category) => update(state => ({ ...state, filterItem: category })),
        fetchProducts: async () => {
          update(state => ({ ...state, loading: true }));
          const url = state.filterItem !== "All categories" 
            ? `https://fakestoreapi.com/products/category/${state.filterItem}`
            : `https://fakestoreapi.com/products`;
    
          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error("Data fetching failed, please check your network connection");
            }
            const data = await response.json();
            update(state => ({
              ...state,
              products: data,
              originalProducts: JSON.parse(JSON.stringify(data)),
              loading: false,
            }));
          } catch (error) {
            update(state => ({ ...state, error }));
          } finally {
            sortProducts();
            searchProducts();
          }
        },
        sortProducts: () => update(state => {
          if (state.sorting !== "default") {
            const sortedProducts = [...state.products].sort((a, b) =>
              state.sorting === "low" ? a.price - b.price : b.price - a.price
            );
            return { ...state, products: sortedProducts };
          } else {
            return { ...state, products: JSON.parse(JSON.stringify(state.originalProducts)) };
          }
        }),
        searchProducts: () => update(state => {
          if (state.searchTerm.trim() !== "") {
            const filteredProducts = state.originalProducts.filter((product) =>
              product.title.toLowerCase().includes(state.searchTerm.toLowerCase())
            );
            return { ...state, products: JSON.parse(JSON.stringify(filteredProducts)) };
          }
          return state;
        }),
        getCategories: async () => {
          try {
            const response = await fetch("https://fakestoreapi.com/products/categories");
            if (!response.ok) {
              throw new Error("Data fetching failed, please check your network connection");
            }
            const data = await response.json();
            update(state => ({ ...state, categories: data }));
            return { response: data };
          } catch (error) {
            update(state => ({ ...state, error }));
            return { error };
          }
        },
        fetchSingleProduct: async (id) => {
          update(state => ({ ...state, loading: true }));
          try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            if (!response.ok) {
              throw new Error("Data fetching failed, please check your network connection and reload.");
            }
            const data = await response.json();
            update(state => ({ ...state, singleProduct: data, loading: false }));
            return { response: data };
          } catch (error) {
            update(state => ({ ...state, error, loading: false }));
            return { error };
          }
        },
      };
    };
    
    const productStore = createStore();
    
    // Derived stores
    const products = derived(productStore, $store => $store.products);
    const loading = derived(productStore, $store => $store.loading);
    const error = derived(productStore, $store => $store.error);
    const sorting = derived(productStore, $store => $store.sorting);
    const searchTerm = derived(productStore, $store => $store.searchTerm);
    const filterItem = derived(productStore, $store => $store.filterItem);
    const categories = derived(productStore, $store => $store.categories);
    const singleProduct = derived(productStore, $store => $store.singleProduct);
    
    // Functions to update the store
    const setSorting = (newSorting) => productStore.setSorting(newSorting);
    const setSearchTerm = (newSearchTerm) => productStore.setSearchTerm(newSearchTerm);
    const setFilterItem = (newCategory) => productStore.setFilterItem(newCategory);
    const fetchProducts = () => productStore.fetchProducts();
    const sortProducts = () => productStore.sortProducts();
    const searchProducts = () => productStore.searchProducts();
    const getCategories = () => productStore.getCategories();
    const fetchSingleProduct = (id) => productStore.fetchSingleProduct(id);
    
    // Export everything
    export {
      products, loading, error, sorting, searchTerm, filterItem, categories, singleProduct,
      setSorting, setSearchTerm, setFilterItem, fetchProducts, sortProducts, searchProducts,
      getCategories, fetchSingleProduct
    };
    </script>