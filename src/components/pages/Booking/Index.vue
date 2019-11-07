<template>
    <div>
        <Step1 v-if="this.step==1" :booking="booking" @checkUpdateBooking="updateBooking" @moveStep="moveStep"></Step1>
        <Step2 v-if="this.step==2" :booking="booking" @checkUpdateBooking="updateBooking" @moveStep="moveStep"></Step2>
        <Step3 v-if="this.step==3" :booking="booking" @checkUpdateBooking="updateBooking" @moveStep="moveStep"></Step3>
        <hr />
        <div>
            <div>
                <h4>value parent</h4>
                <div>note: {{booking.title}}</div>
                <div>note: {{booking.note}}</div>
                <div>article photo content: {{booking.article.photo.content}}</div>
                <div>category: {{booking.category.toString()}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import Step1 from './Step1.vue';
import Step2 from './Step2.vue';
import Step3 from './Step3.vue';
export default {
    components: {
        Step1: Step1,
        Step2: Step2,
        Step3: Step3,
    },
    data() {
        return {
            booking: {
                title: 'default title',
                note: 'default note',
                article: {
                    photo: {
                        content: 'default content'
                    }
                },
                category: [],
            },
            step: 1,
        };
    },

    mounted() {
        this.getBooking();
    },

    methods: {
        getBooking() {
            // call api get title
            setTimeout(() => {
                this.booking.title = 'new title';
            }, 2000);

            // call api get category
            setTimeout(() => {
                this.booking.category = [99260363, 122711842]
            }, 2500);
        },

        updateBooking(data) {
            if (data.title != undefined) this.booking.title = data.title;
            if (data.note != undefined) this.booking.note = data.note;
            if (data.category != undefined) this.booking.category = data.category;
            if (data.content != undefined) this.booking.article.photo.content = data.content;
        },

        moveStep(step) {
            this.step = step;
        }
    }
}
</script>