<template>
    <div class="wrapper">
            <div class="box" v-for="product in products" :id="product.id" :key="`product-${product.id}`" @click="routeToProduct(product.id)">
                <figure class="image mb-4">
                    <img :src="product.get_thumbnail">
                </figure>

                <h3 class="is-size-4">{{ product.name }}</h3>
                <p class="is-size-6 has-text-grey">₺{{ product.price }}</p>
            </div>
        </div>
</template>

<script>
export default {
    name: 'ItemList',
    props: {
        products: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        routeToProduct(id){
            try{
                this.$router.push({name: 'Product', params:{id}});
            }
            catch (error) {
                this.$router.push({name: "Home", params:{}});
            }
        }
    }

}
</script>