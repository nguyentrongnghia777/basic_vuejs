<template>
    <div>
        <div>demo total: {{total}}</div>
        <div>demo item total: {{itemTotal.count}}</div>
        <div>demo item total demo emit: {{itemTotalDemoEmit.count}}</div>
        <div>Demo computed: {{showCustomTotal}}</div>
        
        <div>Demo only watch key 'text' object message, dùng thủ thật thông qua computed để lấy cái cần watch, rồi watch cái computed: 
            <button class="btn btn-primary" @click="changeText">change text message</button>
        </div>

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
            },
            message: {
                text: 'a',
            }
        };
    },
    components: {
        EmitEdit: EmitEdit
    },
    created() {},
    mounted() {
        setTimeout(() => {
            this.total = 2; // parent change, child not change
        }, 2000);
    },
    computed: {
        showCustomTotal() {
            return parseInt(this.total) + 1;
        },
        getTextMessage() {
            return this.message.text;
        }
    },
    watch: {
        total() {
            console.log('watch total ' + this.total);
        },
        showCustomTotal() {
            console.log('watch computed showCustomTotal', this.showCustomTotal);
            this.message.text = 'c';
        },

        // demo watch key object base on computed => return this key
        getTextMessage() {
            console.log('watch computed getTextMessage', this.message.text);
        }
    },
    methods: {
        // function listen emit
        updateTotal(value) {
            this.total = value;

            // case: child not change => parent listen any emit  => parent change => child change
            // this.itemTotal.count = value;
        },
        changeText() {
            this.message.text = 'b';
        }
    }
};
</script>