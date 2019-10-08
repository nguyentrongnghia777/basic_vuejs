<template>
    <div>
        <div>demo total: {{total}}</div>
        <div>demo item total: {{itemTotal.count}}</div>
        <div>demo item total demo emit: {{itemTotalDemoEmit.count}}</div>
        <div><emit-edit :total="total" :itemTotal="itemTotal" :itemTotalDemoEmitChild="itemTotalDemoEmit"  @totalWasEdited="updateTotal"></emit-edit></div>
    </div>
</template>
<script>
import EmitEdit from "./EmitEdit.vue";

export default {
    data() {
        return {
            loading: false,
            total: 1,
            itemTotal: {
                count: 1,
            },
            itemTotalDemoEmit: {
                count: 1,
            }
        };
    },
    components: {
        EmitEdit: EmitEdit
    },
    created() {},
    mounted() {},
    methods: {
        // function listen emit
        updateTotal(value) {
            this.total = value;

            // case: child not change => parent listen any emit  => parent change => child change
            // this.itemTotal.count = value;
        }
    }
};
</script>