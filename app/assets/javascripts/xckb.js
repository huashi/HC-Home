/**
 * Created by alex on 2015/6/28.
 */

var page = 1, total = 0;
function  getList(data) {
    if(!data) {
        $('.more').html('数据已经全部加载完').show();
        return false;
    }
    for(var date in data) {

        var append_str  = '';
        append_str += '<div class="timeBox"><h1>'+date+'</h1><div class="star"><img src="http://mat1.gtimg.com/cd/2015/xckb/time_star.png"></div><div class="timeline"><div class="line"></div></div><div class="txtBox">';

        var tempData = data[date];
        for(var j=0; j<tempData.length; j++) {

            tempData[j].author="/assets/xckb/"+tempData[j].author;

            switch(parseInt(tempData[j].type)){
                case 1:
                    append_str += '<div class="item item1"><div class="txt"><h2>'+tempData[j].content+'</h2><span class="sj sj1"></span><span class="sj sj2"></span></div><div class="pic"><img src="'+tempData[j].author+'"></div></div>';
                    break;
                case 2:
                    var piclist = tempData[j].piclist.split(',');
                    var piclist_str = '';
                    for(var a = 0; a<piclist.length;a++){
                        piclist_str += '<li><a href="'+piclist[a]+'" class="swipebox" title=""><img src="'+piclist[a]+'" alt="image"></a></li>';
                    }
                    append_str += '<div class="item item1"><div class="txt"><h2>'+tempData[j].content+'</h2><ul>'+piclist_str+'</ul><span class="sj sj1"></span><span class="sj sj2"></span></div><div class="pic"><img src="'+tempData[j].author+'"></div></div>';
                    break;
                case 3:
                    append_str += '<div class="item item2"><div class="pic"><img src="'+tempData[j].author+'"></div><div class="txt"><h2>'+tempData[j].content+'</h2><span class="sj sj1"></span><span class="sj sj2"></span></div></div>';
                    break;
                case 4:
                    append_str += '<div class="item item3"><div class="pic"><img src="'+tempData[j].author+'"></div><div class="txt"><div class="tp"><img src="'+tempData[j].pic+'"></div><h2>'+tempData[j].title+'</h2><p>'+tempData[j].content+'</p><span class="sj sj1"></span><span class="sj sj2"></span><div class="link"><a href="'+tempData[j].link+'">全文</a></div></div></div>';
                    break;
                case 5:
                    append_str += '<div class="item item4"><div class="pic"><img src="'+tempData[j].author+'"></div><div class="txt"><h2>'+tempData[j].title+'</h2><div class="tp"><img src="'+tempData[j].pic+'"></div><p>'+tempData[j].content+'</p><div class="link"><a href="'+tempData[j].link+'">全文</a></div><span class="sj sj1"></span><span class="sj sj2"></span></div></div>';
                    break;
                case 6:
                    var piclist = tempData[j].piclist.split(',');
                    var piclist_str = '';
                    for(var a = 0; a<piclist.length;a++){

                        piclist[a]="/assets/xckb/content/"+ piclist[a];

                        piclist_str += '<li><a href="'+piclist[a]+'" class="swipebox" title=""><img src="'+piclist[a]+'" alt="image"></a></li>';
                    }
                    append_str += '<div class="item item5"><div class="pic"><img src="'+tempData[j].author+'"></div><div class="txt"><h2>'+tempData[j].content+'</h2><ul>'+piclist_str+'</ul><span class="sj sj1"></span><span class="sj sj2"></span></div></div>';
                    break;
                default:
                    break;
            }
        }
        append_str +='</div></div>';
        $('#maindata').append(append_str);
    }
}
function loadPage() {
    if(total > 0 && page > total) {
        $('.more').html('数据已经全部加载完').show();
        return false;
    }

    $.ajax({
        url: 'ds',
//            03
        data: {page: page},
        dataType: 'json',
        success:function(R) {
            if(total == 0) {
                total = R.pages.total;
            }
            if(R.list && R.pages.page <= R.pages.total) {
                getList(R.list);
                page++;
            }
        },
        error:function(e,b){
            console.log(e);
        }
    });
}

$(document).ready(function() {
    loadPage();
    $('.swipebox').swipebox();
});

$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    var windowHeight = $(this).height();
    if (scrollTop + windowHeight == scrollHeight) {
        loadPage();
    }
});

var imgUrl = 'http://mat1.gtimg.com/cd/weixin/cdlife.jpg';
var lineLink = 'http://www.yachunhua.com/xckb';
var descContent = "沂南快报，关注咱身边的事儿";
var shareTitle = '沂南正在发生的事儿，快来看一下哈！';
var appid = '';

//    02

function shareFriend() {
    WeixinJSBridge.invoke('sendAppMessage',{
        "appid": appid,
        "img_url": imgUrl,
        "img_width": "640",
        "img_height": "640",
        "link": lineLink,
        "desc": descContent,
        "title": shareTitle
    }, function(res) {
        _report('send_msg', res.err_msg);
    });
}
function shareTimeline() {
    WeixinJSBridge.invoke('shareTimeline',{
        "img_url": imgUrl,
        "img_width": "640",
        "img_height": "640",
        "link": lineLink,
        "desc": descContent,
        "title": shareTitle
    }, function(res) {
        _report('timeline', res.err_msg);
    });
}
function shareWeibo() {
    WeixinJSBridge.invoke('shareWeibo',{
        "content": descContent,
        "url": lineLink,
    }, function(res) {
        _report('weibo', res.err_msg);
    });
}

function onBridgeReady(){
    WeixinJSBridge.call('showOptionMenu');
    WeixinJSBridge.call('hideToolbar');

    // 发送给好友
    WeixinJSBridge.on('menu:share:appmessage', function(argv){
        shareFriend();
    });

    // 分享到朋友圈
    WeixinJSBridge.on('menu:share:timeline', function(argv){
        shareTimeline();
    });

    // 分享到微博
    WeixinJSBridge.on('menu:share:weibo', function(argv){
        shareWeibo();
    });
}

if (typeof WeixinJSBridge == "undefined"){
    if( document.addEventListener ){
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    }else if (document.attachEvent){
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }

}else{
    onBridgeReady();
}