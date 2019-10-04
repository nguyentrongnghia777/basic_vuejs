<template>
    <div>
        <div>Product detail</div>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">{{error}}</div>
        <div v-else>
            <detail-item :product="product"></detail-item>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import DetailItem from './DetailItem.vue';

export default {
    components: {
        DetailItem: DetailItem,
    },
    data() {
        return {
            loading: false,
            product: {},
            error: ""
        };
    },
    created() {
        this.loading = true;
        this.getProduct(this.$route.params.id);
    },
    methods: {
        getProduct(id) {
            axios
                .get("https://jsonplaceholder.typicode.com/posts/" + id)
                .then(res => {
                    this.loading = false;
                    this.product = res.data;
                })
                .catch(err => {
                    this.loading = false;
                    this.error = err.toString();
                });
        }
    }
};
</script>