/**
 * Niconico Seiga/Shunga - Tombloo patch
 * Development URL: http://github.com/poochin/tombloo
 * 
 * Author: poochin
 * Version: 1.0.0
 * Since: 2011-11-22
 * Last Update: 20011-11-22
 */

(function() {

const _BASE_URL = 'http://seiga.nicovideo.jp/';
const _THUMB_URL = 'http://lohas.nicoseiga.jp/thumb/';
const _FAVICON_URL = 'http://seiga.nicovideo.jp/favicon.ico';

Tombloo.Service.extractors.register({
    name: 'Photo - Seiga / Shunga',
    ICON: _FAVICON_URL,
    check: function(ctx) {
        return /http:\/\/seiga.nicovideo.jp\/image\/source\?id=\d+/.test(ctx.link);
    },
    getImageURL: function(ctx) {
        // image size post string:
        //   s < q < m < i = l (maybe equal)
        imid = ctx.link.href.match('id=(\\d+)')[1];
        return _THUMB_URL + imid + 'l';
    },
    getUsername: function(ctx) {
        doc = ctx.document;
        nameelm = doc.querySelector('.illust_user_name strong');
        return nameelm.innerHTML;
    },
    extractTags: function(ctx) {
        doc = ctx.document;
        taglinks = doc.querySelectorAll('.tag');
        tags = [];
        for (i = 0; i < taglinks.length; i++) {
            tags.push(taglinks[i].innerHTML);
        }
        return tags;
    },
    extract: function(ctx) {
        return {
            type: 'photo',
            item: ctx.title,
            itemUrl: this.getImageURL(ctx),
            tags: this.extractTags(ctx).concat([this.getUsername(ctx)]),
        };
    },
}, 'Photo', false);

})();
