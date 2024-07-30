<script>
     //import { Router, Route, Link } from "svelte-routing";
    // import Home from "./routes/Home.svelte";
    import Header from './components/Header.svelte'
    import Layout from './components/Layout.svelte'
    import Sort from './components/Sort.svelte'
    import ProductDetails from './components/Products/ProductDetails.svelte'
    import {Router, Route} from "svelte-routing"
    import ProductDetail from './components/Products/ProductDetail.svelte'
    
    // export let url = "";
    
</script>

<style lang="postcss">
    :global(html) {
        background-color: #caf0f8;
    }

</style>

<Router>
        <Header />
    
    <Route path="/" component={ProductDetails} />
    <Route path="/products/:id" component={ ProductDetail}/>
</Router>

<!-- <Header /> -->
<!-- <Sort /> -->







<!-- <Router {url}>
    <Route path="/" component={Home} />
</Router> -->

