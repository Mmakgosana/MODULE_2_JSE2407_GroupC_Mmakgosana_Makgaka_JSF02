<script>
    // import { Router, Route } from "svelte-routing";
    // import Home from "./routes/Home.svelte";
    import Header from './components/Header.svelte'
    import Layout from './components/Layout.svelte'
    import Filter from './components/Filter.svelte'
    import Sort from './components/Sort.svelte'
    import CardSkeleton from './components/Products/CardSkeleton.svelte';
    //import ProductCard from './components/Products/ProductCard.svelte';
    //import ProductDetails from './components/Products/ProductDetails.svelte';
    import Ratings from './components/Ratings.svelte'

    
    
    // export let url = "";
</script>

<style lang="postcss">
    :global(html) {
        background-color: #caf0f8;
    }

</style>



<Header />
<Filter />
<Sort />
<Layout />
<CardSkeleton />





<!-- <Router {url}>
    <Route path="/" component={Home} />
</Router> -->

