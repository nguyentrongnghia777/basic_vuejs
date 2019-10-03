<template>
    <div>
        <b-modal id="modal-1" title="Detail">
            <div class="my-4">
                <h3>{{product.title}}</h3>
                <p>{{product.body}}</p>
            </div>
        </b-modal>

        <div v-if="loading">Loading...</div>
        <div v-else-if="error">{{error}}</div>
        <div v-else>
            <ul>
                <li :key="index" v-for="(product, index) in products">{{product.title}} <button class="btn btn-secondary" v-on:click="viewDetail(product)">detail</button></li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
    data() {
        return {
            loading: false,
            products: [],
            error: "",
            product: {}
        };
    },
    components: {

    },
    created() {
        this.loading = true;
        this.getProducts();
    },
    mounted() {
        
    },
    methods: {
        getProducts() {
            axios
                .get("https://jsonplaceholder.typicode.com/posts")
                .then(res => {
                    this.loading = false;
                    this.products = res.data;
                })
                .catch(err => {
                    this.loading = false;
                    this.error = err.toString();
                });
        },
        callback(msg) {
            this.$notify(`Modal dismissed with msg '${msg}'.`);
        },
        viewDetail(item) {
            this.product = item;
            console.log(this.product);
            this.$bvModal.show('modal-1');
        }
    }
};
</script>