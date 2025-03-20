<template>
    <div>
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