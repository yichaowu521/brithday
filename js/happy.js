$(function () {
    setTimeout(function () {
        $('.name').animate({
            opacity:"1",
            top:"15%"
        },2000);

    },6000);
    setTimeout(function () {
        $('.happy').animate({
            opacity:"1",
            top:"15%"
        },2000);

    },6000);
    setTimeout(function () {
        $('.button-style1').animate({
            opacity:"1",
            top:"70%"
        },1500);
        $('.button-style2').animate({
            opacity:"1",
            top:"85%"
        },2000);
    },9000);

    // 非微信环境回退：首次点击/触摸时播放音频
    $(window).one('click touchstart', function(){
        var a = $('audio')[0];
        if (a) a.play();
    });
})