
let _body      = document.body;
let $body      = $( 'body' ),
	$html      = $( 'html' ),
    $htmlbody  = $( 'html, body' ),
	$wrapper   = $( '.wrapper' ),
	$header    = $( '.header' ),
	$footer    = $( '.footer' ),
    $loading_data = $( '.loading-data' ),
    $loading_page = $( '.loading-page' ),
    $loading_percent = $( '.loading_percent' );

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