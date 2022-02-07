import { createStore } from 'vuex'
import axios from 'axios'
import _ from 'lodash';

export default createStore({
    state: {
        myFavorites: [],
        isAuthenticated: false,
        token: '',
        isLoading: false,
        categories: []
    },
    mutations: {
        initializeStore(state){
            if(localStorage.getItem('myFavorites')){
                state.myFavorites = JSON.parse(localStorage.getItem('myFavorites'))
            } else {
                localStorage.setItem('myFavorites', JSON.stringify(state.myFavorites))
            }

            if(localStorage.getItem('token')){
                state.token = localStorage.getItem('token')
                state.isAuthenticated = true;
            }
            else{
                state.token = ''
                state.isAuthenticated = false;
            }
        },
        addToMyFavorites(state,item){
            if(state.myFavorites.filter(i => i.id === item.id).length == 0){
                state.myFavorites.push(item);
            }else{
                state.myFavorites = state.myFavorites.filter(i => i.id != item.id);
            }
            localStorage.setItem('myFavorites', JSON.stringify(state.myFavorites))
        },
        setIsLoading(state, status){
            state.isLoading = status;
        },
        getAllCategories(state){
            axios.get('/api/getAllCategories/')
                .then(({data})=>{
                    state.categories = data;
                });
        },
        setToken(state, token){
            state.token = token
            state.isAuthenticated = true;
            localStorage.setItem('token', token)
        },
        removeToken(state){
            state.token = ''
            state.isAuthenticated = false;
            localStorage.removeItem('token')
        }
    },
    actions: {
    },
    modules: {
    }
})
