/*************************************************
* client:  客戶
* project: 專案
* date:    Thu Feb 21 2019 17:07:43 
* copyright (c) 2019  | jerjer.
 *************************************************/
'use strict';

var _$$slick;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

console.log("%cJERJER%c(\u2032\u309C\u03C9\u3002\u2035)...", 'color: rgba(5,137,62,1); font-size: 32px; vertical-align: baseline;' + 'font-family: "Luxia-Medium", Arial, "Noto Sans TC", "Microsoft JhengHei";' + 'margin: 10px 0px 5px 0; padding: 0px 5px;', 'font-size: 30px; color: rgba(5,137,62,1);');
console.log('%cryan-project   ❙   2019-01   ❙   Copyright \xA9 2019 ', 'color: rgba(5,137,62,1); font-size: 12px; margin: 5px 0; font-family:Arial; font-weight: 600;');
var PI = Math.PI,
    rad = Math.PI / 180,
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
var SCRIPTS = {
  first: document.getElementsByTagName('script')[0]
},
    API_KEYS = {};

window.requestAnimateFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
    return window.setTimeout(callback, 1000 / 60);
  }; // shoot for 60 fps
}();

window.cancelAnimateFrame = function () {
  return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function (id) {
    window.clearTimeout(id);
  };
}();

function getUrlData() {
  var loca = window.location,
      UrlData = {
    localhost: /localhost/.test(loca),
    href: loca.href,
    host: loca.protocol + '//' + loca.hostname,
    // 完整網域
    path: loca.pathname.replace(/\/[^/]*$/, ''),
    // 完整資料夾
    page: loca.href.split('/').pop().replace(/[\?\#\.]+.*/, ''),
    // 頁面名稱
    port: loca.port ? ':' + loca.port : '',
    api: 'API/',
    prev: document.referrer,
    // 前一頁
    hash: loca.hash,
    // # 後面
    query: loca.search,
    querys: new Object() // 問號後面

  };
  var str = loca.href.replace(/.+[\?]/, '').split('&');

  for (var s = 0; s < str.length; s++) {
    var item = str[s].split('=');
    UrlData.querys[item[0]] = item[1];
  }

  return UrlData;
}
/* 判斷瀏覽器大大與是否行動裝置 */


function parseUserAgent() {
  var ua = new Object(),
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
      edge: /Edge\/\d+/,
      IE: /MSIE\s\d/,
      IE8: /MSIE 8/,
      IE9: /MSIE 9/,
      IE10: /MSIE 10/,
      IE11: /MSIE 11|rv\:11/,
      Firefox: /Firefox\W\d/,
      Chrome: /Chrom(e|ium)\W\d|CriOS\W\d/,
      Safari: /\bSafari\W\d/,
      Oprea: /\bOpera\W\d|\bOPR\W\d/i
    },
    Render: {
      trident: /Trident/,
      // IE 核心
      presto: /Presto/,
      // Opera 核心
      webKit: /AppleWebKit/,
      // Apple Google 核心 + Android Google 核心
      gecko: /Gecko,KHTML/,
      // Firefox 核心 *
      firefox: /Firefox/
    },
    Device: {
      iPhone: /iPhone/,
      // iPhone 與否
      iPad: /iPad/,
      // iPad 與否
      Mac: /Mac/,
      mobile: /(iPad|iPhone|Android|Mobile)/,
      tablet: /Tablet|iPad/i,
      // tablet true false
      touch: 'ontouchstart' in document.documentElement // touch true false

    },
    OS: {
      Android: /Android/,
      windows: /IEMobile|Windows Phone|Lumia/i,
      Blackberry: /BlackBerry|PlayBook|BB10/,
      iOS: /iPhone|iP[oa]d/,
      MacOS: /Mac OS X(?!.+Mobile)/,
      // MacOS 系統
      win10: /Windows NT 10/,
      winvista: /Windows NT 6\.0/,
      win7: /Windows NT 6\.1/,
      win8: /Windows NT 6\.\d/,
      winxp: /Windows NT 5\.1/,
      winnt: /Windows NT [1-5]\./,
      Linux: /Linux/,
      nix: /X11/
    },
    APP: {
      messenger: /\bFB[\w_]+\/(Messenger|MESSENGER)/,
      facebook: /\bFB[\w_]+\//,
      twitter: /\bTwitter/i,
      line: /\bLine\//i,
      wechat: /\bMicroMessenger\//i,
      puffin: /\bPuffin/i,
      miui: /\bMiuiBrowser\//i,
      instagram: /\bInstagram/i,
      // chromeiOS: /CriOS/, // iOS chrome 
      chromeMobile: /\bCrMo\b|CriOS|Android.*Chrome\/[.0-9]* (Mobile)?/,
      safariMobile: /Version.*Mobile.*Safari|Safari.*Mobile|MobileSafari/,
      firefoxMobile: /fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile|FxiOS/,
      IEMobile: /IEMobile|MSIEMobile/
    }
  };
  ua.User = {};
  ua.text = u1;

  for (var item in regex) {
    ua[item] = {};

    for (var key in regex[item]) {
      var _text = regex[item][key];
      console.log();
      ua[item][key] = typeof _text != 'boolean' ? _text.test(u1) : _text;

      if (ua[item][key]) {
        ua.User[item] = key;
      }
    }

    if (typeof text == 'boolean') {
      ua.User[item] = false;
    }
  }

  ua.Device.PC = ua.Device.mobile || ua.Device.tablet ? false : true;
  return ua;
}

;
/* localStorage */

function loadFormStorage(id) {
  var get_storage = window.localStorage[id];

  if (get_storage) {
    return JSON.parse(get_storage);
  } else {
    return {};
  }
}

function saveToStorage(id, data) {
  window.localStorage[id] = JSON.stringify(data);
}

var _body = document.body;
var $body = $('body'),
    $html = $('html'),
    $htmlbody = $('html, body'),
    $wrapper = $('.wrapper'),
    $header = $('.header'),
    $footer = $('.footer'),
    $loading_data = $('.loading-data'),
    $loading_page = $('.loading-page'),
    $loading_percent = $('.loading_percent');
var W = window.innerWidth,
    H = window.innerHeight,
    loop = true,
    scroll = _body.scrollTop; // 載入進度條 

function LoadingProgress(options) {
  var _ = this;

  _.canvas = options.$dom;
  _.ctx = _.canvas.getContext('2d');
  _.textColor = options.textColor;
  _.fontSize = options.fontSize || 1;
  _.percent = 0;
  _.progress = 0;

  _.build();
}

LoadingProgress.prototype.build = function () {
  var _ = this; // _.canvas.height = Number(getComputedStyle(document.querySelector('html')).fontSize.replace( 'px', '' )) * _.fontSize + 10;

};

LoadingProgress.prototype.update = function (percent) {
  var _ = this;

  _.ctx.clearRect(0, 0, _.canvas.width, _.canvas.height);

  _.percent = Number(percent) > 1 ? 1 : Number(percent) < 0 ? 0 : Number(percent);
  _.progress = round(_.percent * 100); // + '%';

  _.ctx.font = "".concat(_.fontSize, "rem Fira Sans Condensed"); // _.canvas.width = _.ctx.measureText( _.progress ).width; 

  _.ctx.font = "".concat(_.fontSize, "rem Fira Sans Condensed");
  _.ctx.fillStyle = _.textColor;
  _.ctx.textAlign = 'center';
  _.ctx.textBaseline = 'middle';

  _.ctx.fillText(_.progress, _.canvas.width / 2, _.canvas.height / 2);
}; // 載入進度條 End


function openLoading() {
  $loading_page.addClass('on-visible');
}

function closeLoading() {
  $loading_page.removeClass('on-visible');
}

function inlineToJSON(str) {
  // return 
  // JSON.stringify( 
  //     str.replace( /[']*/g, '' )
  //         .replace( /[\s]*/g, '' )
  //         .replace( /([^{}\[\]:,\s]+[^{}\[\]:,\s]*)/g , "'" + '$&' + "'" )
  // );
  return JSON.parse(JSON.stringify(eval('(' + str + ')')));
}

function getRandomColor() {
  var letters = '0123456789ABCDEF',
      color = '#';

  for (var i = 0; i < 6; i++) {
    color += letters[floor(random() * 16)];
  }

  return color;
}

var ua = parseUserAgent(),
    url = getUrlData();

if (ua.Device.PC) {
  console.log('是電腦');
  $body.addClass('pc');

  if (ua.IE8 || ua.IE9) {
    loop = false;
    console.log('請使用高級瀏覽器'); // alert( '建議使用Chrome，Firefox，以及IE10以上版本的瀏覽器進入網站，以便達成最佳瀏覽效果，謝謝' );
  }

  if (url.localhost) {}
} else {
  console.log('是行動裝置');

  if (ua.Device.tablet) {
    console.log('tablet'); // $body.addClass( 'tablet' );
  }

  if (ua.Device.mobile) {
    console.log('mobile'); // $body.addClass( 'mobile' );
  }

  if (url.localhost) {// $( '.broswer-popup-active' ).prop( 'checked', currentBroswer ).change();
  }
}

var loadend = {
  img: false,
  vue: false,
  youtube: false,
  ready: false
},
    str = {
  animationEnd: 'webkitAnimationEnd oanimationend msAnimationEnd animationend'
};

function intro() {
  closeLoading();
}

var introProgress = new LoadingProgress({
  $dom: $('.loading_percent')[0],
  textColor: '#fff',
  fontSize: 1
});
$body.imagesLoaded().then(function (instance, image) {
  console.log('then');
}).done(function () {
  console.log('done');
}).always(function () {
  loadend.img = true;
  loadend.ready = true;
  introProgress.update(1);
  intro();
}).progress(function (instance, image, progressedData) {
  introProgress.update(progressedData.loadedPercent);
}); // 尺寸

function resizing() {
  W = window.innerWidth;
  H = window.innerHeight;
}

window.onresize = function () {
  resizing();
};

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
/* slick */


$('#banner').slick((_$$slick = {
  centerMode: true,
  slidesToShow: 3,
  centerPadding: '0px',
  respondTo: "slider"
}, _defineProperty(_$$slick, "slidesToShow", 1), _defineProperty(_$$slick, "infinite", true), _defineProperty(_$$slick, "dots", true), _defineProperty(_$$slick, "autoplay", true), _defineProperty(_$$slick, "prevArrow", $('#ar_l')), _defineProperty(_$$slick, "nextArrow", $('#ar_r')), _defineProperty(_$$slick, "responsive", [{
  breakpoint: 960,
  settings: {
    centerPadding: '0px'
  }
}, {
  breakpoint: 480,
  settings: {
    centerPadding: '0px'
  }
}]), _$$slick)).on('beforeChange', function (event, slick, currentSlide, nextSlide) {}).on('afterChange', function (event, slick, currentSlide) {});
$('#banner_preview').css({
  'display': 'none'
});
$('#banner').css({
  'display': 'block'
}).addClass('show');
$('.slides').each(function () {
  var $this = $(this),
      $slides = $this.children(' .slides_list'),
      slidesName = $slides.data('slides'),
      slidesNav = $slides.data('slidesnav') || false,
      options = {
    prevArrow: $this.children('.slides_prev'),
    nextArrow: $this.children('.slides_next'),
    dots: true,
    infinite: false,
    speed: 450,
    centerMode: true,
    centerPadding: '20%',
    slidesToShow: 1,
    asNavFor: slidesNav,
    adaptiveHeight: true,
    swipe: true
  };
  $slides.slick(options);

  if (slidesNav) {
    var navOptions = {
      prevArrow: false,
      nextArrow: false,
      slidesToShow: 3,
      // slidesToScroll: 1,
      asNavFor: '.slides_list[data-slides=' + slidesName + ']',
      dots: false,
      infinite: false,
      // speed: 650,
      // fade: true,
      swipe: false,
      centerMode: true,
      centerPadding: '0%',
      focusOnSelect: true
    };
    $(slidesNav).slick(navOptions);
  }
});
/* viewportChecker */

var viewpageApp = {
  $scroll: $htmlbody,
  page: '.viewpage',
  el: '.view',
  btn: '.btn-anchor',
  hash: false,
  anchor: false,
  menu: $('.menu').height(),
  $mainNav: $('.main-nav-active')
};
$body.on('click', viewpageApp.btn, function () {
  console.log('click');
  var v = viewpageApp,
      target = $(this).data('target'),
      position = $(v.page + '[data-page="' + target + '"]').offset().top;
  v.$scroll.stop().animate({
    scrollTop: position - $('.header').height()
  }, 400);
  v.$mainNav.prop('checked', false);
});
$(viewpageApp.page).viewportChecker({
  classToAdd: 'on-visible',
  classToAddForFullView: 'full-visible',
  classToRemove: 'invisible',
  removeClassAfterAnimation: false,
  offset: '50%',
  invertBottomOffset: true,
  repeat: true,
  scrollHorizontal: false,
  callbackFunction: function callbackFunction(elem, action) {
    var v = viewpageApp;

    if (!v.anchor) {
      v.anchor = $(elem).data('page');
      $(v.btn + '[data-target="' + v.anchor + '"]').addClass('on-active');
      v.action = action;
    }

    if (v.action !== action) {
      v.action = action;

      if (v.action == 'remove') {
        $(v.btn + '.on-active').removeClass('on-active');
      } else {
        v.anchor = $(elem).data('page');
        $(v.btn + '[data-target="' + v.anchor + '"]').addClass('on-active');
      }
    }

    if (v.hash) {
      console.log(v.anchor);
      window.location.hash = v.anchor;
    }
  }
});
$(viewpageApp.el).viewportChecker({
  classToAdd: 'on-visible',
  classToAddForFullView: 'full-visible',
  classToRemove: 'invisible',
  removeClassAfterAnimation: false,
  offset: '18%',
  invertBottomOffset: false,
  repeat: true,
  scrollHorizontal: false,
  callbackFunction: function callbackFunction(elem, action) {}
});