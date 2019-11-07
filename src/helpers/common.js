export default {
    getSelect2LanguageJA() {
        return {
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
        }
    }
}