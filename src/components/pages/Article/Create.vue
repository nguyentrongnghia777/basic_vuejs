<template>
    <div>
        <div>create article</div>
        <div name="form">
            <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control" v-model="article.title" />
            </div>
            <div class="form-group">
                <label>Category</label>
                <select2
                    id="selectCategory"
                    v-model="article.category"
                    :options="myOptions"
                    :settings="settingsCategory"
                    @change="myChangeEvent($event)"
                    @select="mySelectEvent($event)"
                />
            </div>
            <div class="form-group">
                <label>Tag</label>
                <select2
                    id="selectTag"
                />
            </div>
            <div class="form-group">
                <button class="btn btn-primary" v-on:click="createArticle">Save</button>
            </div>
        </div>
    </div>
</template>
<script>
import Axios from "axios";
import Select2 from "v-select2-component";
export default {
    components: {
        Select2
    },
    data() {
        return {
            loading: false,
            article: {
                title: "",
                content: "",
                category: [1, 2],
                tag: [1, 2, 3],
            },
            myOptions: [], // or [{id: key, text: value}, {id: key, text: value}]
            settingsCategory: {}
        };
    },
    created() {
        this.getCategory();
    },
    mounted() {
        this.article.category.forEach(id => {
            // call api get data by id to get name
            Axios.get("https://jsonplaceholder.typicode.com/posts/" + id)
                .then(res => {
                    $("#selectCategory").append(new Option(res.data.title, id, true, true)).trigger('select');
                })
                .catch(err => {});
        });
    },
    methods: {
        createArticle() {
            console.log("data create: ", this.article);
        },
        myChangeEvent(val) {
            console.log(val);
        },
        mySelectEvent({ id, text }) {
            console.log({ id, text });
        },
        getCategory() {
            this.settingsCategory = {
                placeholder: "Search for a repository",
                multiple: true,
                ajax: {
                    url: "https://api.github.com/search/repositories",
                    dataType: "json",
                    delay: 250,
                    tags: true,
                    data: function(params) {
                        return {
                            q: params.term, // search term
                            page: params.page
                        };
                    },
                    processResults: function(data, params) {
                        params.page = params.page || 1;
                        return {
                            // custom template show option
                            results: data.items,

                            // default template must be get (id, text) in results
                            // results: data.items.map(item => {
                            //     return {
                            //         text: item.name,
                            //         id: item.id
                            //     };
                            // }),
                            pagination: {
                                more: params.page * 30 < data.total_count
                            }
                        };
                    },
                    cache: true
                },
                templateResult: this.formatRepo,
                templateSelection: this.formatRepoSelection
            };
        },
        formatRepo(repo) {
            if (repo.loading) {
                return repo.text;
            }

            var $container = $(
                "<div class='select2-result-repository clearfix'>" +
                    "<div class='select2-result-repository__avatar'><img src='" +
                    repo.owner.avatar_url +
                    "' /></div>" +
                    "<div class='select2-result-repository__meta'>" +
                    "<div class='select2-result-repository__title'></div>" +
                    "<div class='select2-result-repository__description'></div>" +
                    "<div class='select2-result-repository__statistics'>" +
                    "<div class='select2-result-repository__forks'><i class='fa fa-flash'></i> </div>" +
                    "<div class='select2-result-repository__stargazers'><i class='fa fa-star'></i> </div>" +
                    "<div class='select2-result-repository__watchers'><i class='fa fa-eye'></i> </div>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
            );

            $container
                .find(".select2-result-repository__title")
                .text(repo.full_name);
            $container
                .find(".select2-result-repository__description")
                .text(repo.description);
            $container
                .find(".select2-result-repository__forks")
                .append(repo.forks_count + " Forks");
            $container
                .find(".select2-result-repository__stargazers")
                .append(repo.stargazers_count + " Stars");
            $container
                .find(".select2-result-repository__watchers")
                .append(repo.watchers_count + " Watchers");

            return $container;
        },
        formatRepoSelection(repo) {
            return repo.full_name || repo.text;
        },
    }
};
</script>
<style>
.select2-result-repository__avatar {
    float: left;
    width: 60px;
    margin-right: 10px;
}
.select2-result-repository__avatar img {
    width: 100%;
    height: auto;
    border-radius: 2px;
}
.select2-result-repository__meta {
    margin-left: 70px;
}
.select2-result-repository__title {
    color: black;
    font-weight: 700;
    word-wrap: break-word;
    line-height: 1.1;
    margin-bottom: 4px;
}
.select2-result-repository__description {
    font-size: 13px;
    color: #777;
    margin-top: 4px;
}
.select2-result-repository__forks, .select2-result-repository__stargazers, .select2-result-repository__watchers {
    display: inline-block;
    color: #aaa;
    font-size: 11px;
}
.select2-result-repository__forks, .select2-result-repository__stargazers {
    margin-right: 1em;
}
</style>