// Project MyLinks
// Copyright (c) 2020 Neruthes

var parsedQueryParam = (function () {
	var tmpArr = location.search.slice(1).split('&').map(function (x) {return x.split('=')});
	var tmpObj = {};
	tmpArr.map(function (x) {tmpObj[x[0]]=x[1]});
	return tmpObj;
})();

// ===================================
// app
// ===================================

var app = {
};

// ===================================
// app.util
// ===================================

app.util = {};
app.util.Base64url_encode = function (str) {
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '');
};
app.util.Base64url_decode = function (str) {
    return atob( str.replace(/\-/g, '+').replace(/\_/g, '/') );
};

// ===================================
// app.DataClass
// ===================================

app.DataClass = {};

app.DataClass.MyLinksProfileUrl = {
    'Exmaple': `https://mylinks.one/u/?i={{}}`,
    'parse': function (url) {
        var tmpArr = url.slice(url.indexOf('?')+1).split('&').map(function (x) {return x.split('=')});
    	var tmpObj = {};
    	tmpArr.map(function (x) {tmpObj[x[0]]=x[1]});
    	return tmpObj.i;
    }
};

app.DataClass.ProfilePkg = {
    'Exmaple': `bXlsaW5rczpQcm9maWxlTWFpbjoxCi0tCm5hbWV8TmVydXRoZXMKYXZhdGFyVXJsfGh0dHBzOi8vbmVydXRoZXMueHl6L25lcnV0aGVzLWZvcmNlQ2lyY2xlLXVucGFkZGVkLnBuZwotCjB8bmVydXRoZXMueHl6CjF8aUBuZXJ1dGhlcy54eXoKMnxBRkIzMzczRjUyMDBERjM4CjV8bmVydXRoZXMKNnxuZXJ1dGhlcwo4fG5lcnV0aGVz`,
    'parse': function (str) {
        console.log('str', str);
        return app.DataClass.ProfileMain.parse(app.util.Base64url_decode(str));
    },
    'new': function (ProfileMain_instance) {
        return app.util.Base64url_encode(ProfileMain_instance);
    }
};
app.DataClass.ProfileMain = {
    'Example': `
mylinks:ProfileMain:1
--
name|Neruthes
avatarUrl|https://neruthes.xyz/neruthes-forceCircle-padded.png
-
0|neruthes.xyz
0|neruthes.com
    `,
    'parse': function (str) {
        var header = str.split('\n--\n')[0];
        console.log('header', header);
        if (header !== 'mylinks:ProfileMain:1') {
            console.error('Wrong version');
            return 1;
        };
        var ProfileMeta = str.split('\n--\n')[1].split('\n-\n')[0];
        var EntryList = str.split('\n--\n')[1].split('\n-\n')[1];
        return {
            ProfileMeta: app.DataClass.ProfileMeta.parse(ProfileMeta),
            EntryList: app.DataClass.EntryList.parse(EntryList)
        }
    },
    'new': function () {

    }
};

app.DataClass.ProfileMeta = {
    'Example': `
name|Neruthes
avatarUrl|https://neruthes.xyz/neruthes-forceCircle-padded.png
    `,
    'parse': function (str) {
        var obj = {};
        var arrobj = str.split('\n').map(line => line.split('|')).map(arr => {
            obj[arr[0]] = arr[1];
        });
        return obj;
    },
    'new': function () {
    }
};

app.DataClass.EntryList = {
    'Example': `
0|neruthes.xyz
0|neruthes.com
    `,
    'parse': function (str) {
        return str.split('\n').map(app.DataClass.EntryItem.parse);
    },
    'new': function () {
    }
};
app.DataClass.EntryItem = {
    'Example': `0|neruthes.xyz`,
    'defTable': {
        '0': function (argv) { // Website
            return {
                n: 'Website',
                text: `${argv[0]}`,
                href: `https://${argv[0]}`
            };
        },
        '1': function (argv) { // Email
            return {
                n: 'Email',
                text: `${argv[0]}`,
                href: `mailto:${argv[0]}`
            };
        },
        '2': function (argv) { // OpenPGP
            return {
                n: 'OpenPGP',
                text: `<code>${argv[0].split('').reverse().slice(0,16).reverse().join('').replace(/(\w{4})/g, '$1 ').trim()}</code>`,
                href: `https://pgp.to/#0x${argv[0]}`
            };
        },
        '5': function (argv) { // GitHub
            return {
                n: 'GitHub',
                text: `@${argv[0]}`,
                href: `https://github.com/${argv[0]}`
            };
        },
        '6': function (argv) { // Twitter
            return {
                n: 'Twitter',
                text: `@${argv[0]}`,
                href: `https://twitter.com/${argv[0]}`
            };
        },
        '7': function (argv) { // Facebook
            return {
                n: 'Facebook',
                text: `@${argv[0]}`,
                href: `https://www.twitter.com/${argv[0]}`
            };
        },
        '8': function (argv) { // Keybase
            return {
                n: 'Keybase',
                text: `@${argv[0]}`,
                href: `https://keybase.io/${argv[0]}`
            };
        }
    },
    'parse': function (str) {
        var index = str.split('|')[0];
        var realData = app.DataClass.EntryItem.defTable[index](str.split('|').slice(1));
        return realData;
    },
    'new': function () {
    }
};
