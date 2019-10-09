<template>
    <div>
        <div name="form">
            <div class="form-group">
                <label>Demo total</label>
                <input type="text" class="form-control" v-model="dataTotal" />
                <label>Demo item total</label>
                <input type="text" class="form-control" v-model="itemTotal.count" />
                <label>Demo item total demo emit</label>
                <input type="text" class="form-control" v-model="dataItemTotalDemoEmit.count" />
            </div>
            <div class="form-group">
                <button class="btn btn-primary" v-on:click="saveEdit">Save</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        total: 0,
        itemTotal: {},
        itemTotalDemoEmitChild: {},
    },
    data() {
        return {
            dataTotal: 0,
            dataItemTotalDemoEmit: {
                count: 2,
            }
        };
    },
    mounted() {
        this.dataTotal = this.total;
        this.dataItemTotalDemoEmit = this.itemTotalDemoEmitChild; // auto change value parent without emit
        // this.dataItemTotalDemoEmit.count = this.itemTotalDemoEmit.count; // change value parent by emit

        // note: demo emit by value and object value
    },
    methods: {
        saveEdit() {
            this.$emit('totalWasEdited', this.dataTotal);
        },
    }
};
</script>