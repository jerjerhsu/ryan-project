let ua = parseUserAgent(),
	url = getUrlData();

if( ua.Device.PC ){
	console.log( '是電腦' );
	$body.addClass( 'pc' );
	if( ua.IE8 || ua.IE9 ){
		loop = false;
		console.log( '請使用高級瀏覽器' );
		// alert( '建議使用Chrome，Firefox，以及IE10以上版本的瀏覽器進入網站，以便達成最佳瀏覽效果，謝謝' );
	}
	if( url.localhost ){}
	}
else {
	console.log( '是行動裝置' );
	if( ua.Device.tablet ){
		console.log( 'tablet' );
		// $body.addClass( 'tablet' );
	}
	if( ua.Device.mobile ){
		console.log( 'mobile' );
		// $body.addClass( 'mobile' );
	}
	if( url.localhost ){
		// $( '.broswer-popup-active' ).prop( 'checked', currentBroswer ).change();
	}
}
let 
loadend = {
	img: false,
	vue: false,
	youtube: false,
	ready: false,
},
str = {
	animationEnd: 'webkitAnimationEnd oanimationend msAnimationEnd animationend',
};

function intro(){
	closeLoading();
}

let introProgress = new LoadingProgress({
	$dom: $( '.loading_percent' )[ 0 ],
	textColor: '#fff',
	fontSize: 1,
});

$body.imagesLoaded()
.then(function( instance, image ){
	console.log( 'then' );
})
.done(function(){
	console.log( 'done' );
})
.always(function(){
	loadend.img = true;
	loadend.ready = true;
	introProgress.update( 1 );
	intro();
})
.progress(function( instance, image, progressedData ){
	introProgress.update( progressedData.loadedPercent );
});

// 尺寸
function resizing(){
    W = window.innerWidth; 
    H = window.innerHeight;
}
window.onresize = function(){
    resizing();
}

if( 'scrollRestoration' in history ){
	history.scrollRestoration = 'manual';
}
  

/* slick */


$('#banner').slick(
	{
		centerMode: true,
		slidesToShow: 3,
		centerPadding: '0px',
		respondTo: "slider",
		slidesToShow: 1,
		infinite: true,
		dots: true,
		autoplay: true,
		prevArrow: $('#ar_l'),
		nextArrow: $('#ar_r'),
		responsive: [
			{
			  breakpoint: 960,
			  settings: {
				centerPadding: '0px'
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				centerPadding: '0px'
			  }
			}
		]
	}
).on('beforeChange', function(event, slick, currentSlide, nextSlide){
}).on('afterChange', function(event, slick, currentSlide){
});
$('#banner_preview').css({'display':'none'});
$('#banner').css({'display':'block'}).addClass('show');

$( '.slides' ).each(function () {
	var $this = $(this),
		$slides = $this.children(' .slides_list' ),
		slidesName = $slides.data( 'slides' ),
		slidesNav = $slides.data( 'slidesnav' ) || false,
		options = {
			prevArrow: $this.children( '.slides_prev' ),
			nextArrow: $this.children( '.slides_next' ),
			dots: true,
			infinite: false,
			speed: 450,
			centerMode: true,
			centerPadding: '20%',
			slidesToShow: 1,
			asNavFor: slidesNav,
			adaptiveHeight: true,
			swipe: true,
		};
	$slides.slick( options );
	if( slidesNav ){
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
		$(slidesNav).slick( navOptions );
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
	menu: $( '.menu' ).height(),
	$mainNav: $( '.main-nav-active' ),
};
$body.on( 'click', viewpageApp.btn, function(){
	console.log( 'click' );
	var v = viewpageApp,
		target = $( this ).data( 'target' ),
		position = $( v.page + '[data-page="' + target + '"]' ).offset().top;
	v.$scroll.stop().animate({ scrollTop: position - $( '.header' ).height() }, 400 );
	v.$mainNav.prop( 'checked', false );
});
$( viewpageApp.page ).viewportChecker({
	classToAdd:                'on-visible', 
	classToAddForFullView:     'full-visible', 
	classToRemove:             'invisible', 
	removeClassAfterAnimation:  false, 
	offset:                    '50%',
	invertBottomOffset:         true,
	repeat:                     true, 
	scrollHorizontal:           false,
	callbackFunction: function( elem, action ){ 
		var v = viewpageApp;
		if( !v.anchor ){
			v.anchor = $( elem ).data( 'page' );
			$( v.btn + '[data-target="' + v.anchor + '"]' ).addClass( 'on-active' );
			v.action = action;
		}
		if( v.action !== action ){
			v.action = action;
			if( v.action == 'remove' ){
				$( v.btn + '.on-active' ).removeClass( 'on-active' );
			}
			else{
				v.anchor = $( elem ).data( 'page' );
				$( v.btn + '[data-target="' + v.anchor + '"]' ).addClass( 'on-active' );
			}
		}
		if( v.hash ){
			console.log( v.anchor );
			window.location.hash = v.anchor;
		}
	} 
});
$( viewpageApp.el ).viewportChecker({
	classToAdd:                'on-visible', 
	classToAddForFullView:     'full-visible', 
	classToRemove:             'invisible', 
	removeClassAfterAnimation:  false, 
	offset:                    '18%',
	invertBottomOffset:         false,
	repeat:                     true, 
	scrollHorizontal:           false,
	callbackFunction: function( elem, action ){} 
});