<template>
    <div>
        <div>
            <h2>Step 2</h2>
            <div name="form">
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-control" v-model="formData.title" />
                </div>
            </div>
        </div>
        <button class="btn btn-primary" v-on:click="back">Back</button> - <button class="btn btn-primary" v-on:click="next">next</button>
    </div>
</template>

<script>
export default {
    props: {
        booking: {},
    },

    data() {
        return {
            formData: {
                title: '',
            },
        };
    },

    created() {
        this.formData.title = this.booking.title;
    },

    mounted() {

    },

    methods: {
        back() {
            this.$emit('moveStep', 1);
        },
        next() {
            this.$emit('checkUpdateBooking', this.formData);
            this.$emit('moveStep', 3);
        },
    }
}
</script>