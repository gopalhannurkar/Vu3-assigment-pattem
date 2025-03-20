<template>
    <div class="product-container">
        <Filters />
        <ProductList />
    </div>
</template>

<script>
import Filters from './FilterItem.vue';
import ProductList from './ProductList.vue';

export default {
    components: {
        ProductList,
        Filters,
    },
};
</script>

<style scoped> 

.product-container{
   max-width: 1170px;
    margin: 0 auto;
}
</style>