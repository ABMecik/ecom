<template>
    <div class="home">
        <el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>

        <div class="columns is-multiline">
            <div class="column is-12">
                <h2 class="is-size-2 has-text-centered">Newly</h2>
            </div>
        </div>
            

        <!-- <div class="wrapper">
            <div class="box" v-for="product in latestProducts" :id="product.id" :key="`product-${product.id}`" @click="routeToProduct(product.id)">
                <figure class="image mb-4">
                    <img :src="product.get_thumbnail">
                </figure>

                <h3 class="is-size-4">{{ product.name }}</h3>
                <p class="is-size-6 has-text-grey">₺{{ product.price }}</p>
            </div>
        </div> -->
        <ItemList :products="latestProducts"></ItemList>

    </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios'
import ItemList from '@/components/ItemList'

export default {
    name: 'Home',
    components: {
        ItemList,
    },
    data() {
        return {
            latestProducts: []
        }
    },
    methods: {
        forceUpdate(){
            this.$forceUpdate();
        },
        init(){
            document.title = "ECOM | Home"
            this.$store.commit('setIsLoading', true);
            return axios.get('/api/latest-products/')
                .then(({data})=>{
                    this.latestProducts = data;
                    this.$store.commit('setIsLoading', false);
                    return this.forceUpdate();
                }).catch(err=>{
                    console.log(err)
                })
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
    created() {
        this.init();
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
