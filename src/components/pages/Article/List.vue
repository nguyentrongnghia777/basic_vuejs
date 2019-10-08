<template>
    <div>
        <div>
            <router-link to="/article/create" class="btn btn-secondary">Create</router-link>
        </div>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">{{error}}</div>
        <div v-else>
            <ul>
                <li :key="key" v-for="(item, key) in articles">
                    {{item.title}}
                    <router-link :to="'/article/' + item.id" class="btn btn-secondary">Detail</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import Axios from "axios";
export default {
    data() {
        return {
            loading: false,
            articles: [],
            error: ""
        };
    },
    created() {
        this.getArticles();
    },
    mounted() {},
    methods: {
        getArticles() {
            this.loading = true;
            Axios.get("https://jsonplaceholder.typicode.com/posts")
                .then(res => {
                    this.loading = false;
                    this.articles = res.data;
                })
                .catch(err => {
                    this.loading = false;
                    this.error = err.toString();
                });
        }
    }
};
</script>
