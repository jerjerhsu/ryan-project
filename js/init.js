
let _body      = document.body;
let $window    = $( window ),
    $body      = $( 'body' ),
	$html      = $( 'html' ),
    $htmlbody  = $( 'html, body' ),
	$wrapper   = $( '.wrapper' ),
	$header    = $( '.header' ),
	$footer    = $( '.footer' ),
    $loading_data = $( '.loading-data' ),
    $loading_page = $( '.loading-page' ),
    $loading_percent = $( '.loading_percent' ),
    $go_top = $( '#go-top' ),
    $burger_check = $( '#burger-check' ),
    $nav_item = $( '.nav-item' );

let W = window.innerWidth,
    H = window.innerHeight,
    loop = true,
    scroll = _body.scrollTop;

// 載入進度條 
function LoadingProgress( options ){
    let _ = this;
    _.canvas = options.$dom;
    _.ctx = _.canvas.getContext( '2d' );
    _.textColor = options.textColor; 
    _.fontSize = options.fontSize || 1;
    _.percent = 0;
    _.progress = 0;
    _.build();
}
LoadingProgress.prototype.build = function(){
    let _ = this;
    // _.canvas.height = Number(getComputedStyle(document.querySelector('html')).fontSize.replace( 'px', '' )) * _.fontSize + 10;
};
LoadingProgress.prototype.update = function( percent ){
    let _ = this;
    _.ctx.clearRect( 0, 0, _.canvas.width, _.canvas.height );
    _.percent = Number(percent) > 1 ? 1 : Number(percent) < 0 ? 0 : Number(percent);
    _.progress = round(_.percent * 100); // + '%';
    _.ctx.font = `${_.fontSize}rem Fira Sans Condensed`;
    // _.canvas.width = _.ctx.measureText( _.progress ).width; 
    _.ctx.font = `${_.fontSize}rem Fira Sans Condensed`;
    _.ctx.fillStyle = _.textColor;
    _.ctx.textAlign = 'center'; 
    _.ctx.textBaseline = 'middle';
    _.ctx.fillText( _.progress, _.canvas.width/2, _.canvas.height/2 );
};
// 載入進度條 End

function openLoading(){
    $loading_page.addClass( 'on-visible' );
}
function closeLoading(){
    $loading_page.removeClass( 'on-visible' );
}

function inlineToJSON( str ){
    // return 
    // JSON.stringify( 
    //     str.replace( /[']*/g, '' )
    //         .replace( /[\s]*/g, '' )
    //         .replace( /([^{}\[\]:,\s]+[^{}\[\]:,\s]*)/g , "'" + '$&' + "'" )
    // );
    return JSON.parse( JSON.stringify( eval( '(' + str + ')' ) ) )
}

function getRandomColor(){
    let letters = '0123456789ABCDEF', color = '#';
    for( let i = 0; i < 6; i++ ){
        color += letters[ floor( random() * 16 ) ];
    }
    return color;
}

$.fn.EventInIt = function(){
    $body.on('click','#go-top,.nav-item,#cta-side-btn-box-0,.light-box-close,[name="subscribe"],#cta-btn',function(e){
        var _self = $(e.currentTarget);
        switch(true){
            case _self.is('#go-top'):
                $htmlbody.animate(
                    {
                        scrollTop: 0
                    },
                    300
                );
            break;
            case _self.is('.nav-item'):
                $burger_check.get(0).checked = false;
                $nav_item.removeClass('active');
                _self.addClass('active');
                $body.removeClass('show-light-box');
                $htmlbody.animate(
                    {
                        scrollTop: $('[scroll-anchor="'+_self.attr('scroll-index')+'"]').offset().top - parseInt($header.height()) - 30
                    },
                    300
                );
            break;
            case _self.is('#cta-side-btn-box-0') || _self.is('#cta-btn'):
                $body.addClass('show-light-box');
            break;
            case _self.is('.light-box-close'):
                $body.removeClass('show-light-box');
            break;
            case _self.is('[name="subscribe"]'):
                window.location.href = './lesson.html';
            break;
        }
    });
}
$.fn.ScrollInIt = function(){
    var temp_scrolltop = 0,
        scroll_pre = false,
        scroll_cur = true;
    function scrolling(){
        temp_scrolltop = $window.scrollTop();
        if(temp_scrolltop > 500){
            scroll_cur = true;
        } else {
            scroll_cur = false;
        }
        if(scroll_cur !== scroll_pre){
            scroll_pre = scroll_cur;
            if(scroll_cur){
                $body.addClass('show-go-top');
                // console.log('add');
            } else {
                $body.removeClass('show-go-top');
                // console.log('remove');
            }
            
        }
    }
    $window.on('scroll',scrolling).trigger('scroll');
}
$body.EventInIt();
$body.ScrollInIt();