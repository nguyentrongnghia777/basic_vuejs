<template>
    <div>
        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Create article</h1>
        </div>
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
                <select2 id="selectTag" />
            </div>
            <div class="form-group">
                <label>Content</label>
                <editor v-model="article.content" :init="editorInit"></editor>
            </div>
            <div class="form-group">
                <label>Created At</label>
                <date-time-picker v-model="article.createdAt" :config="options"></date-time-picker>
                <div>{{article.createdAt}} => Moment: {{ article.createdAt | moment("YYYY-MM-DD HH:mm") }}</div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" v-on:click="createArticle">Save</button>
            </div>
        </div>
    </div>
</template>
<script>
import Axios from "axios";

export default {
    components: {},
    data() {
        return {
            loading: false,
            article: {
                title: "",
                content: "",
                category: [1, 2],
                tag: [1, 2, 3],
                content: "",
                createdAt: new Date()
            },
            myOptions: [], // or [{id: key, text: value}, {id: key, text: value}]
            settingsCategory: {},
            editorInit: {
                branding: false,
                skin: "lightgray",
                plugins: ["link", "table", "paste"],
                toolbar: "bold underline link table",
                language: "ja",
                menubar: false,
                forced_root_block: "",
                relative_urls: false,
                convert_urls: false,
                paste_as_text: true,
                link_title: false,
                link_class_list: [
                    { title: "アンダーラインなし", value: "s-article_textlink" }
                ],
                table_default_attributes: {
                    class: "s-article_table"
                },
                formats: {
                    bold: {
                        inline: "span",
                        attributes: { class: "s-article_textstrong" }
                    },
                    underline: {
                        inline: "span",
                        attributes: { class: "s-article_p-marker" }
                    }
                },
                height: 200,
                resize: false,
                content_css: "/vendor/css/editor.css?v=1.2"
            },
            options: {
                format: "DD/MM/YYYY HH:mm",
                useCurrent: false,
                showClear: true,
                showClose: true,
                locale: "ja",
                defaultDate: "11/1/2019",
                disabledDates: [new Date(2019, 11 - 1, 21), "11/22/2019 00:53"]
                // custom icons
                // icons: {
                //     time: "far fa-clock",
                //     date: "far fa-calendar",
                //     up: "fas fa-arrow-up",
                //     down: "fas fa-arrow-down",
                //     previous: "fas fa-chevron-left",
                //     next: "fas fa-chevron-right",
                //     today: "fas fa-calendar-check",
                //     clear: "far fa-trash-alt",
                //     close: "far fa-times-circle"
                // }
            }
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
                    $("#selectCategory")
                        .append(new Option(res.data.title, id, true, true))
                        .trigger("select");
                })
                .catch(err => {});
        });
    },
    methods: {
        createArticle() {
            this.$swal("Hello", "Hello brave new world!", "success");
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
                placeholder: "検索する",
                multiple: true,
                language: {
                    errorLoading: function() {
                        return "結果が読み込まれませんでした";
                    },
                    inputTooLong: function(e) {
                        var t = e.input.length - e.maximum,
                            n = t + " 文字を削除してください";
                        return n;
                    },
                    inputTooShort: function(e) {
                        var t = e.minimum - e.input.length,
                            n = "少なくとも " + t + " 文字を入力してください";
                        return n;
                    },
                    loadingMore: function() {
                        return "検索中...";
                    },
                    maximumSelected: function(e) {
                        var t = e.maximum + " 件しか選択できません";
                        return t;
                    },
                    noResults: function() {
                        return "対象が見つかりません";
                    },
                    searching: function() {
                        return "検索しています…";
                    },
                    removeAllItems: function() {
                        return "すべてのアイテムを削除";
                    }
                },
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
        }
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
.select2-result-repository__forks,
.select2-result-repository__stargazers,
.select2-result-repository__watchers {
    display: inline-block;
    color: #aaa;
    font-size: 11px;
}
.select2-result-repository__forks,
.select2-result-repository__stargazers {
    margin-right: 1em;
}
</style>