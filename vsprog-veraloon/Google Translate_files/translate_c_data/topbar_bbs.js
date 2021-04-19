
var img = '//misc.21ic.com/pub/topbar/images/';

var top_uid = 0;
var top_user = '';

function getcookie(name) {
	var cookie_start = document.cookie.indexOf(name);
	var cookie_end = document.cookie.indexOf(";", cookie_start);
	return cookie_start == -1 ? '' : decodeURI(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));
}

top_user = getcookie('aSr_ic21_user');
var jq = jQuery.noConflict();
if (top_user) {
	var pmsnum = '';
	var top_userinfo = top_user.split("\t");
	var top_uid = top_userinfo[1];
	var top_username = top_userinfo[0];
	var Qtpl ='\<div id="top_wallet"><span class="down_arrow5"><a href="https://pay.21ic.com" target="_blank" title="我的钱包">我的钱包</a></span></div>\
		<div id="top_user" onmouseover="showmenu3()" onmouseout="hidemenu3()"><iframe src="//bbs.21ic.com/api.php?mod=member:pms&ext=html&wh=26" width="40" frameborder="0"></iframe>\
			<div class="top_downmenu3" style="display:none;">\
				<div class="usercenter_head"><a href="https://my.21ic.com/home.php?mod=spacecp&ac=avatar" target="_blank"><img src="//uc2.21ic.com/avatar.php?uid='+top_uid+'&size=middle" title="点击修改头像" /></a></div>\
				<div class="usercenter_username"><a href="https://my.21ic.com" target="_blank" title="进入用户中心">'+top_username+'</a></div>\
				<ul class="usercenter_menu">\
				  <li><a href="//bbs.21ic.com/home.php?mod=space&do=pm" target="_blank" class="top_edit14"><span style="float:left;">站内信</span><iframe src="//bbs.21ic.com/api.php?mod=member:pms&ext=iframeNum" style="width: 30px;" height="26"  frameborder="0"></iframe></a></li>\
				  <li><a class="top_edit13" href="https://my.21ic.com" target="_blank">用户中心</a></li>\
				  <li><a class="top_edit9" href="https://my.21ic.com/home.php?mod=spacecp&ac=profile" target="_blank">资料修改</a></li>\
				  <li><a class="top_edit10" href="https://my.21ic.com/logout_www.php">退出</a></li>\
				</ul>\
			</div>\
		</div>\
		<div id="top_edit" onmouseover="showmenu2()" onmouseout="hidemenu2()"><span class="down_arrow2"></span>\
			<ul class="top_downmenu2" style="display:none;">\
			  <li><a href="//bbs.21ic.com/home.php?mod=space&do=thread&view=me" target="_blank" class="top_edit1">我的帖子</a></li>\
			  <li><a href="//project.21ic.com/my/info" target="_blank" class="top_edit2">我的项目</a></li>\
			  <li><a href="//dl.21ic.com/user/downloadlog.html" target="_blank" class="top_edit6">我的下载</a></li>\
			  <li><a href="//edu.21ic.com/user/lesson" target="_blank" class="top_edit7">我的课程</a></li>\
			  <li><a href="//seminar.21ic.com/usercenter" target="_blank" class="top_edit11">我的研讨会</a></li>\
			  <li><a href="//bbs.21ic.com/home.php?mod=space&do=blog" target="_blank" class="top_edit8">我的博客</a></li>\
			</ul>\
		</div>\
	';
	
	jQuery(document).ready(function(){
		
		jQuery("#top_userlogin").html(Qtpl);
		//jQuery.get('//bbs.21ic.com/api.php?mod=member:pms',function(data){ jQuery(".top_edit14").html('站内信('+pmsnum+')');});
	});
	
}



 function checkinput(){
 	var q_name = jQuery("#topbar_q").attr('name');
 	var q_value = jQuery("#topbar_q").val().length;
 	if( (q_name == 'k' || q_name == 'part_number') && q_value <3 )
 	{
 		alert("查询器件，需要输入三个以上字符");
 		return false;
 	}
 	return true;
 }
 
 var topso_ac = new Array(4); 
  topso_ac['s1'] = 'https://search.21ic.com/so.php?type=bbs';
  topso_ac['s2'] = 'https://www.21icsearch.com/search/index.html';
  topso_ac['s3'] = 'https://search.21ic.com/so.php?type=www';
  topso_ac['s4'] = 'https://search.21ic.com/so.php?type=dl';
 var top_sc = new Array(4);
 top_sc['s1'] = 'keyword';
 top_sc['s2'] = 'k';
 top_sc['s3'] = 'keyword';
 top_sc['s4'] = 'keyword';
var top_t = new Array(4);
top_t['s1'] = '';
top_t['s2'] = '';
top_t['s3'] = 'www';
top_t['s4'] = 'dl';

jQuery(function(){
               var ie6 = /msie 6/i.test(navigator.userAgent),
                dv = jQuery('.topline_holder'),
                st;
                dv.attr('otop', dv.offset().top); //存储原来的距离顶部的距离
                dv.after('<div style="clear:both;"></div>');
                //jQuery(window).scroll(function() {
                    st = Math.max(document.body.scrollTop || document.documentElement.scrollTop);
                    if (st >= parseInt(dv.attr('otop'))) {
                        if (ie6) { //IE6不支持fixed属性，所以只能靠设置position为absolute和top实现此效果
                            dv.css({
                            	//background: "url('/images/header_bg.png') repeat-x scroll 0px -114px",
                            	height: "38px",
                                position: 'absolute',
                                zIndex: "499",
                                //top:expression(eval(document.body.scrollTop)),
                                top: st,
                                left:0
                                });
                       } else if (dv.css('position') != 'fixed') {
                            dv.css({
                            	//background: "url('/images/header_bg.png') repeat-x scroll 0px -114px",
                            	height: "40px",
                            	position: 'fixed',
                            	top: 0,
                            	left:0,
                            	zIndex: "499"
                            });
                       }
                        dv.next().next("div").css({"margin-top":"40px"});
                    } else if (dv.css('position') != 'static') {
                    	if (ie6) {
                    		dv.css({position:'absolute',zIndex:"999",top:parseInt(dv.attr('otop')) });      
                    	} else {
                    		dv.css({'position': 'static' });
                    	}
                    }
               // }); 	
});
 
jQuery(document).ready(function(){   
    
 jQuery("#formsearch").attr('accept-charset','UTF-8');
 jQuery("#x1").mouseover(function(){
 	jQuery('#x1').attr('class','sa sa_hover');
 	jQuery("#x2").show();
 });

 jQuery("#x2 a").click(function(){
 	jQuery("#s0").html(jQuery(this).html());
 	jQuery("#formsearch").attr('action',topso_ac[jQuery(this).attr("id")]);
 	jQuery("#topbar_q").attr('name',top_sc[jQuery(this).attr("id")]);
	jQuery("#topbar_type").attr('value',top_t[jQuery(this).attr("id")]);
 	jQuery("#x2").hide();
 });
  jQuery("#x2").mouseout(function(){
  	jQuery('#x1').attr('class','sa');
 	jQuery(this).hide();
 });
  jQuery("#x1").mouseout(function(){
  	jQuery('#x1').attr('class','sa');
 	jQuery("#x2").hide();
 });
  jQuery("#x2").mouseover(function(){
 	jQuery(this).show();
 });
});
function showmenu1()
{
	jQuery('#top_all').attr('class','top_downone1');
	jQuery('.top_downmenu1').show();
}
function hidemenu1()
{
	jQuery('.top_downmenu1').hide();
	jQuery('#top_all').attr('class','');
}
function showmenu2()
{
	jQuery('#top_edit').attr('class','top_downone2');
	jQuery('.top_downmenu2').show();
}
function hidemenu2()
{
	jQuery('.top_downmenu2').hide();
	jQuery('#top_edit').attr('class','');
}
function showmenu3()
{
	jQuery('#top_user').attr('class','top_downone3');
	jQuery('.top_downmenu3').show();
}
function hidemenu3()
{
	jQuery('.top_downmenu3').hide();
	jQuery('#top_user').attr('class','');
}
function showmenu4()
{
	jQuery('#top_code').attr('class','top_downone4');
	jQuery('.top_downmenu4').show();
}
function hidemenu4()
{
	jQuery('.top_downmenu4').hide();
	jQuery('#top_code').attr('class','');
}
function showmenu5()
{
	jQuery('#column').attr('class','top_downone5');
	jQuery('.top_downmenu5').show();
}
function hidemenu5()
{
	jQuery('.top_downmenu5').hide();
	jQuery('#column').attr('class','');
}
