<template>
    <div>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">{{error}}</div>
        <div v-else>
            <ul>
                <li :key="index" v-for="(product, index) in products">
                    {{product.title}}
                    <button class="btn btn-secondary" v-on:click="viewDetail(product)">View</button> -
                    <router-link :to="'/products/' + product.id" class="btn btn-secondary">Page detail</router-link>
                </li>
            </ul>
        </div>
        <b-modal id="modal-1" title="Detail" size="xl" hide-footer @hide="callbackHideDetail">
            <div class="my-4">
                <detail-item :product="product"></detail-item>
            </div>
        </b-modal>
    </div>
</template>
<script>
import Axios from "axios";
import DetailItem from "./DetailItem.vue";

export default {
    data() {
        return {
            loading: false,
            products: [],
            error: "",
            product: {},
        };
    },
    components: {
        DetailItem: DetailItem
    },
    created() {
        this.loading = true;
        this.getProducts();
    },
    mounted() {},
    methods: {
        getProducts() {
            Axios
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
        callbackHideDetail() {
            console.log('close modal');
        },
        viewDetail(item) {
            this.product = item;
            this.$bvModal.show("modal-1");
        },
    }
};
</script>