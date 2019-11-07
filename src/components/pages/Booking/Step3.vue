<template>
    <div>
        <div>
            <h2>Step 3</h2>
            <div name="form">
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-control" v-model="formData.title" />
                </div>
                <div class="form-group">
                    <label>Note</label>
                    <input type="text" class="form-control" v-model="formData.note" />
                </div>
            </div>
        </div>
        <button class="btn btn-primary" v-on:click="back">Back</button> - <button class="btn btn-primary" v-on:click="next">submit</button>
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
                note: '',
            },
        };
    },

    created() {
        this.formData.note = this.booking.note;
        this.formData.title = this.booking.title;
    },

    mounted() {

    },

    methods: {
        back() {
            this.$emit('moveStep', 2);
        },
        next() {
            this.$swal("Hello", "Hello brave new world!", "success");
            this.$emit('checkUpdateBooking', this.formData);
        },
    }
}
</script>