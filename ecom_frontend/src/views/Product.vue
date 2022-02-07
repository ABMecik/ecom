<template>
    <div class="product" v-if="product != null">
        <div class="columns is-multiline">
            <div class="column is-6">
                <figure class="image is-3">
                    <img :src="product.get_image" style="display: block;margin-left: auto;margin-right: auto;width: 50%;">
                </figure>
            </div>

            <div class="column is-6">
                <h1 class="title">{{ product.name }}</h1>

                <p>{{ product.description }}</p>
                <br>

                <p><strong>Price: </strong>₺{{ product.price }}</p>
                <br><br>

                <div class="field has-addons mt-6" v-if="$store.state.isAuthenticated">
                    <div class="control">
                        <a class="button" @click="addToMyFavorites(product)" v-if="isInMyFavorites()">Add To My Favorites</a>
                        <a class="button" @click="addToMyFavorites(product)" v-else>Remove From My Favorites</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash';
export default {
    name: 'Product',
    data() {
        return {
            product: null,
            isInList: false
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
            this.$store.commit('setIsLoading', true);
            axios.get(`/api/products/${this.$route.params.id}`)
                .then(({data})=>{
                    this.product = data;
                    this.$store.commit('setIsLoading', false);
                    document.title = `ECOM | ${data.name}`;
                    this.forceUpdate();
                });
        },
        isInMyFavorites(){
            this.isInList = _.isEmpty(_.filter(this.$store.state.myFavorites, o=>o.id === this.product.id));
            return this.isInList;
        }
    }
    
}

</script>

