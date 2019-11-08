<template>
    <div>
        <div>
            <h2>Step 1</h2>
            <div name="form">
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-control" v-model="formData.title" />
                </div>
                <div class="form-group">
                    <label>Note</label>
                    <input type="text" class="form-control" v-model="formData.note" />
                </div>
                <div class="form-group">
                    <label>aricle photo content</label>
                    <input type="text" class="form-control" v-model="formData.content" />
                </div>
                <div class="form-group">
                    <label>Category</label>
                    <select2
                        id="selectCategory"
                        v-model="formData.category"
                        :options="myOptions"
                        :settings="settingsCategory"
                    />
                </div>
            </div>
        </div>
        <button class="btn btn-primary" v-on:click="next">Next</button>
    </div>
</template>

<script>
import $ from "jquery";
import ModelCategory from "@/models/category.js";
export default {
    props: {
        booking: {},
    },

    data() {
        return {
            formData: {
                title: '',
                note: '',
                content: '',
                category: [],
            },
            settingsCategory: {},
            myOptions: []
        };
    },

    created() {
        console.log('created step 1');
        this.getCategory();
        this.formData.category = this.booking.category;
        this.formData.title = this.booking.title;
        this.formData.note = this.booking.note;
        this.formData.content = this.booking.article.photo.content;
        
    },

    mounted() {
        console.log('mounted step 1');
        this.renderCategory();
    },

    computed: {
        bookingTitle() {
            return this.booking.title;
        },
        bookingCategory() {
            return this.booking.category;
        },
    },

    watch: {
        bookingTitle() {
            this.formData.title = this.booking.title;
        },

        bookingCategory() {
            this.formData.category = this.booking.category;
            this.renderCategory();
        }
    },

    methods: {
        next() {
            this.$emit('checkUpdateBooking', this.formData);
            this.$emit('moveStep', 2);
        },
        renderCategory() {
            $("#selectCategory").html("");
            this.formData.category.forEach(id => {
                // call api get data by id to get name
                ModelCategory.getDetail(id)
                    .then(res => {
                        $("#selectCategory")
                            .append(new Option(res.data.full_name, id, true, true))
                            .trigger("select");
                    })
                    .catch(err => {});
            })
        },
        getCategory() {
            this.settingsCategory = ModelCategory.settingCategory();
        },
    }
}
</script>