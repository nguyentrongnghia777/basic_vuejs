<template>
    <div>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">{{error}}</div>
        <div v-else>
            <p>id: {{user.id}}</p>
            <p>name: {{user.name}}</p>
        </div>
    </div>
</template>>
<script>
import axios from "axios";

export default {
    data() {
        return {
            loading: false,
            user: {},
            error: ""
        };
    },
    created() {
        this.loading = true;
        this.getUser(this.$route.params.id);
    },
    methods: {
        getUser(id) {
            axios
                .get("https://jsonplaceholder.typicode.com/users/" + id)
                .then(res => {
                    this.loading = false;
                    this.user = res.data;
                })
                .catch(err => {
                    this.loading = false;
                    this.error = err.toString();
                });
        }
    }
};
</script>>