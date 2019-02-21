'use strict';
console.log('%cJERJER%c(\u2032\u309C\u03C9\u3002\u2035)...', 
'color: rgba(5,137,62,1); font-size: 32px; vertical-align: baseline;' + 
'font-family: "Luxia-Medium", Arial, "Noto Sans TC", "Microsoft JhengHei";' + 
'margin: 10px 0px 5px 0; padding: 0px 5px;', 'font-size: 30px; color: rgba(5,137,62,1);');
console.log('%cryan-project   ❙   2019-01   ❙   Copyright \xA9 2019 ', 
'color: rgba(5,137,62,1); font-size: 12px; margin: 5px 0; font-family:Arial; font-weight: 600;');

const 
PI = Math.PI,
rad = Math.PI/180,
cos = Math.cos,
sin = Math.sin,
atan2 = Math.atan2,
abs = Math.abs,
sqrt = Math.sqrt,
round = Math.round,
ceil = Math.ceil,
floor = Math.floor,
max = Math.max,
min = Math.min,
random = Math.random;

const 
SCRIPTS = { first: document.getElementsByTagName( 'script' )[ 0 ] },
API_KEYS = {};

window.requestAnimateFrame = (function(){
 return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
        function( callback ){ return window.setTimeout( callback, 1000 / 60 ); }; // shoot for 60 fps
})();
window.cancelAnimateFrame = (function(){
 return window.cancelAnimationFrame || window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame || window.oCancelAnimationFrame ||
        function( id ){ window.clearTimeout( id );  };
})();

function getUrlData(){
    let loca = window.location,
        UrlData = {
            localhost: /localhost/.test( loca ), 
            href:      loca.href,
            host:      loca.protocol + '//' + loca.hostname, // 完整網域
            path:      loca.pathname.replace( /\/[^/]*$/, '' ), // 完整資料夾
            page:      loca.href.split( '/' ).pop().replace( /[\?\#\.]+.*/, '' ), // 頁面名稱
            port:      loca.port ? ':' + loca.port : '',
            api:       'API/',
            prev:      document.referrer, // 前一頁
            hash:      loca.hash,         // # 後面
            query:     loca.search,  
            querys:    new Object,       // 問號後面
        };
        let str = loca.href.replace( /.+[\?]/, '' ).split( '&' );
        for( let s = 0; s < str.length; s++ ){
            let item = str[ s ].split( '=' );           
            UrlData.querys[ item[0] ] = item[1];
        }
    return UrlData;
}

/* 判斷瀏覽器大大與是否行動裝置 */
function parseUserAgent(){
    let ua = new Object,
        u1 = navigator.userAgent,
        u2 = navigator.userAgent.toLowerCase(),
        u3 = navigator.appName,
        // Return value assumes failure.
        // http://useragentstring.com/pages/useragentstring.php
        // https://developers.whatismybrowser.com/useragents/explore/
        // https://github.com/f2etw/detect-inapp
        rv = -1,
        regex = { 
            Browser: {
                edge:    /Edge\/\d+/, 
                IE:      /MSIE\s\d/, 
                IE8:     /MSIE 8/, 
                IE9:     /MSIE 9/, 
                IE10:    /MSIE 10/, 
                IE11:    /MSIE 11|rv\:11/, 
                Firefox: /Firefox\W\d/, 
                Chrome:  /Chrom(e|ium)\W\d|CriOS\W\d/, 
                Safari:  /\bSafari\W\d/, 
                Oprea:   /\bOpera\W\d|\bOPR\W\d/i, 
            },
            Render: {
                trident: /Trident/,     // IE 核心
                presto:  /Presto/,      // Opera 核心
                webKit:  /AppleWebKit/, // Apple Google 核心 + Android Google 核心
                gecko:   /Gecko,KHTML/, // Firefox 核心 *
                firefox: /Firefox/, 
            },
            Device: {
                iPhone:  /iPhone/,       // iPhone 與否
                iPad:    /iPad/,         // iPad 與否
                Mac:     /Mac/, 
                mobile:  /(iPad|iPhone|Android|Mobile)/,
                tablet:  /Tablet|iPad/i, // tablet true false
                touch:   'ontouchstart' in document.documentElement, // touch true false
            },
            OS: {
                Android:    /Android/, 
                windows:    /IEMobile|Windows Phone|Lumia/i, 
                Blackberry: /BlackBerry|PlayBook|BB10/, 
                iOS:        /iPhone|iP[oa]d/, 
                MacOS:      /Mac OS X(?!.+Mobile)/, // MacOS 系統
                win10:      /Windows NT 10/, 
                winvista:   /Windows NT 6\.0/, 
                win7:       /Windows NT 6\.1/, 
                win8:       /Windows NT 6\.\d/, 
                winxp:      /Windows NT 5\.1/, 
                winnt:      /Windows NT [1-5]\./, 
                Linux:      /Linux/, 
                nix:        /X11/, 
            },
            APP: {
                messenger: /\bFB[\w_]+\/(Messenger|MESSENGER)/,
                facebook:  /\bFB[\w_]+\//,
                twitter:   /\bTwitter/i,
                line:      /\bLine\//i,
                wechat:    /\bMicroMessenger\//i,
                puffin:    /\bPuffin/i,
                miui:      /\bMiuiBrowser\//i,
                instagram: /\bInstagram/i,
                // chromeiOS: /CriOS/, // iOS chrome 
                chromeMobile:  /\bCrMo\b|CriOS|Android.*Chrome\/[.0-9]* (Mobile)?/,
                safariMobile:  /Version.*Mobile.*Safari|Safari.*Mobile|MobileSafari/,
                firefoxMobile: /fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile|FxiOS/,
                IEMobile:      /IEMobile|MSIEMobile/,
            },
        };
    ua.User = {};
    ua.text = u1;
    for( let item in regex ){
        ua[item] = {};
        for( let key in regex[item] ){
            let text = regex[item][key];
            console.log(  )
            ua[item][key] = typeof text != 'boolean' ? text.test( u1 ) : text;
            if( ua[item][key] ){ ua.User[item] = key; }
        }
        if( typeof text == 'boolean' ){ ua.User[item] = false; }
    }
    ua.Device.PC = ua.Device.mobile || ua.Device.tablet ? false : true;
    return ua;
};

/* localStorage */
function loadFormStorage( id ){
    let get_storage = window.localStorage[ id ];
    if( get_storage ){ return JSON.parse( get_storage ); }
    else{ return {} }
}
function saveToStorage( id, data ){
    window.localStorage[ id ] = JSON.stringify( data );
}