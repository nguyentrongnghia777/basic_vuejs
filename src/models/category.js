import Axios from "axios";
import HelperCommon from "@/helpers/common.js";
export default {
    getDetail(id) {
        return new Promise(function(resolve, reject) {
            Axios.get("https://api.github.com/repositories/" + id)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },

    settingAjaxSelect2() {
        return {
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
        }
    },

    settingCategory() {
        return {
            placeholder: "検索する",
            multiple: true,
            language: HelperCommon.getSelect2LanguageJA(),
            ajax: this.settingAjaxSelect2(),
            templateResult: this.formatRepo,
            templateSelection: this.formatRepoSelection
        }
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
};