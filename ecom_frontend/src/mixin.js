import _ from 'lodash';
import {mapState} from 'vuex';
import axios from 'axios';

export default {
    data() {
        return {}
    },
    methods: {
        addToMyFavorites(product){
            if(this.isInList){
                axios.post('/api/addToFavorites/', {productId:product.id})
                .then(()=>{
                    this.$message({message:`${product.name} removed from your list`, type:'success'});
                });
            }
            else{
                axios.post('/api/removeFromFavorites/', {productId:product.id})
                .then(()=>{
                    this.$message({message:`${product.name} removed from your list`, type:'warning'});
                });
            }
            this.$store.commit('addToMyFavorites', product);
        }
    },
    computed: {
        ...mapState([
            'route',
            'apiURL',
            'token'])
        }
}