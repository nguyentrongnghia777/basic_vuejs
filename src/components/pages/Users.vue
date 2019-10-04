<template>
    <div>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">{{error}}</div>
        <ul v-else>
            <li :key="index" v-for="(user, index) in users">
                <router-link :to="'/users/' + user.id">{{user.name}}</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
import axios from "axios";

export default {
    data() {
        return {
            loading: false,
            users: [],
            error: ""
        };
    },
    created() {
        this.loading = true;
        this.getUsers();
    },
    methods: {
        getUsers() {
            axios
                .get("https://jsonplaceholder.typicode.com/users")
                .then(res => {
                    this.loading = false;
                    this.users = res.data;
                })
                .catch(err => {
                    this.loading = false;
                    this.error = err.toString();
                });
        }
    }
};
</script>>