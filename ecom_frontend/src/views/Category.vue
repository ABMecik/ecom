<template>
    <div class="category">

        <div class="columns is-multiline">
            <div class="column is-12">
                <h2 class="is-size-2 has-text-centered">Results For {{ category.name }}</h2>
            </div>
        </div>

        <!-- <div class="wrapper">
            <div class="box" v-for="product in products" :id="product.id" :key="`product-${product.id}`" @click="routeToProduct(product.id)">
                <figure class="image mb-4">
                    <img :src="product.get_thumbnail">
                </figure>

                <h3 class="is-size-4">{{ product.name }}</h3>
                <p class="is-size-6 has-text-grey">₺{{ product.price }}</p>
            </div>
        </div> -->

        <ItemList :products="products"></ItemList>

    </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios'
import ItemList from '@/components/ItemList'

export default {
    name: 'Category',
    components: {
        ItemList,
    },
    data() {
        return {
            products: [],
            category: null
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        forceUpdate(){
            this.$forceUpdate();
        },
        init(){
            this.category = _.find(this.$store.state.categories, o=> o.id == this.$route.params.id);
            this.$store.commit('setIsLoading', true);
            axios.get(`/api/categories/${_.get(this.category, 'id')}`)
                .then(({data})=>{
                    console.log(data);
                    this.products = _.get(data,'products');
                    this.$store.commit('setIsLoading', false);
                    document.title = `ECOM | ${_.get(this.category, 'name')}`;
                    this.forceUpdate();
                });
        },
        routeToProduct(id){
            try{
                this.$router.push({name: 'Product', params:{id}});
            }
            catch (error) {
                this.$router.push({name: "Home", params:{}});
            }
        },
    },
    watch:{
        $route(to,from){
            if (to.name === 'Category'){
                this.init();
            }
        }
    }
}
</script>

<style>
.wrapper {
  display: grid;
  grid-template-columns: repeat(6, auto);
  grid-auto-rows: minmax(100px, auto);
  gap: 10px;
}
.image {
    margin-top: -1.25rem;
    margin-left: -1.25rem;
    margin-right: -1.25rem;
}
</style>
