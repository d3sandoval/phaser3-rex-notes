import GetTime from './GetTime.js';
import { TimeTagKeys, ScoreKeys } from './Const.js';

var Methods = {
    loadFirstPage() {
        this.resetPageQuery();

        var self = this;
        return this.page.loadFirstPage()
            .then(function (docs) {
                return Promise.resolve(DocsToDataArray.call(self, docs));
            })
    },

    loadNextPage() {
        this.resetPageQuery();

        var self = this;
        return this.page.loadNextPage()
            .then(function (docs) {
                return Promise.resolve(DocsToDataArray.call(self, docs));
            })
    },

    loadPreviousPage() {
        this.resetPageQuery();

        var self = this;
        return this.page.loadPreviousPage()
            .then(function (docs) {
                return Promise.resolve(DocsToDataArray.call(self, docs));
            })
    },

    loadCurrentPage() {
        this.resetPageQuery();

        var self = this;
        return this.page.loadCurrentPage()
            .then(function (docs) {
                return Promise.resolve(DocsToDataArray.call(self, docs));
            })
    },

    resetPageQuery() {
        if (!this.resetQueryFlag) {
            return this;
        }

        var t = this.timeFilterType[0];
        var timeTagKey = [TimeTagKeys[t], GetTime()[t]];
        var baseQuery = this.getRecordQuery(this.boardID, this.tag, undefined, timeTagKey);
        var nextPageQuery = baseQuery.orderBy(ScoreKeys[t], 'desc');
        var prevPageQuery = baseQuery.orderBy(ScoreKeys[t]);

        this.page.setQuery(nextPageQuery, prevPageQuery);
        this.resetQueryFlag = false;
        return this;
    },


}

var DocsToDataArray = function (docs) {
    var items = [], item;

    var scoreKey = ScoreKeys[this.timeFilterType[0]]
    for (var i = 0, cnt = docs.length; i < cnt; i++) {
        item = docs[i].data();
        item.score = item[scoreKey];
        // Remove timeFilterKeys, and scoreKeys
        for (var t in this.timeFilter) {
            delete item[TimeTagKeys[t]];
            delete item[ScoreKeys[t]];
        }
        items.push(item);
    }
    return items;
}

export default Methods;