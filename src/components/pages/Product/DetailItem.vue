<template>
    <div>
        <div>
            <h3>{{product.title}}</h3>
            <p>{{product.body}}</p>
        </div>
        <button class="btn btn-secondary" v-on:click="$bvModal.show('modal-2')">Edit</button>
        <b-modal id="modal-2" title="Edit" size="xl" hide-footer>
            <div class="my-4">
                <div name="form">
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" class="form-control" v-model="product.title" />
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary" v-on:click="saveEdit">Save</button>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>
<script>
export default {
    props: {
        product: {}
    },
    data() {
        return {
        };
    },
    mounted() {},
    methods: {
        saveEdit() {
            console.log('call api edit with data: ', this.product);
        },
    }
};
</script>