//===================================================
// CreateLiveCMS Version4.0 Ajax(By 梅傲风)
//===================================================
// Mail: support@aspoo.cn, Info@aspoo.cn
// Msn : support@aspoo.cn, Clw866@hotmail.com
// Web : http://www.aspoo.cn
// Bbs : http://bbs.aspoo.cn
// Copyright (C) 2007 Aspoo.Cn All Rights Reserved.
//===================================================
//定义公共变量
var Cl_AjaxresponseText;
var Cl_AjaxDoSuc	= 0;
var Cl_InstallDir	= "/";
var Cl_ChannelID	= 0;
var Cl_SpareVar		= 0;  //备用变量
var IsDebug			= false;
function ShowDebug(m){
	if(IsDebug){
		alert("[Debug]:"+m);
	}
}
function Cl_CreateAjaxObj()
{
	var XmlHttp;
	//windows
	try {
		XmlHttp = new ActiveXObject("Msxml2.XMLHTTP.3.0");
	} catch (e) {
		try {
			XmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				XmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				XmlHttp = false;
			}
		}
	}
	//other
	if (!XmlHttp)
	{
		try {
			XmlHttp = new XMLHttpRequest();
		} catch (e) {
			XmlHttp = false;
		}
	}
	return XmlHttp;
}
function Cl_Ajax()
{
	this.XmlHttp= new Cl_CreateAjaxObj();
	this.Url	= null;
	this.ContentType = "application/x-www-form-urlencoded";
	this.HttpMethod = "POST";
	this.SucDo = null;
	this.ErrDo = null;
}
/* Get */
Cl_Ajax.prototype.Get = function() {
	this.ContentType= "text/html";
	this.HttpMethod = "GET";
	if (this.Url!=null){this.SendRequest(null);}
}
/* Post */
Cl_Ajax.prototype.Post = function(PostData) {
	this.ContentType= "application/x-www-form-urlencoded" ;
	this.HttpMethod = "POST";
	if (this.Url!=null){this.SendRequest(PostData);}
}
Cl_Ajax.prototype.SendRequest = function(data){
	if ( this.XmlHttp != null )
	{
		this.XmlHttp.open(this.HttpMethod, this.Url, true);
		if (this.HttpMethod=="POST"){this.XmlHttp.setRequestHeader("content-length",data.length);}
		this.XmlHttp.setRequestHeader("content-type", this.ContentType);
		var thisAjax=this;var thisFunction;
		this.XmlHttp.onreadystatechange = function (){
			if (thisAjax.XmlHttp.readyState==4&&thisAjax.XmlHttp.status==200) {
				Cl_AjaxresponseText = thisAjax.XmlHttp.responseText;
				if (Cl_AjaxresponseText.substring(0,2)=="OK") {Cl_AjaxDoSuc = 1;thisFunction = thisAjax.SucDo;}
				else{thisFunction = thisAjax.ErrDo;}
				if (thisFunction!=null){setTimeout(thisFunction,10);}
				//Cl_AjaxresponseText = Cl_AjaxresponseText.substring(3,Cl_AjaxresponseText.length);
			}else{
				switch(thisAjax.XmlHttp.readyState){
				case 1:
					break;//正在连接服务器;
				case 2:
					break;//正在向服务器发送数据;
				case 3:
					break;//正在接收返回数据;
				default:
					break;//;
				}
			}
		}
		this.XmlHttp.send(data);
	}
}
//用户登录
function AjaxUserLogin(dir,cid,type) {
	Cl_InstallDir = dir;
	Cl_ChannelID= cid;
	Cl_SpareVar = type;
	var outObj	= document.getElementById("LoginMessage");
	var UserName= document.UserLogin.UserName.value;
	var UserPass= document.UserLogin.Password.value;
	var CookieDate= document.UserLogin.CookieDate;
	var CodeStr = document.UserLogin.CodeStr;
	var url		= Cl_InstallDir + "User/Login.asp";
	var post	= "Action=CheckLogin&Ajax=1&UserName="+escape(UserName)+"&Password="+escape(UserPass);
	//对表单进行简单判断
	if (UserName==""){
		outObj.innerHTML="<font color=\"#ff0033\">用户名不能为空！</font>";
		document.UserLogin.UserName.focus();
		return false;}
	if (UserPass==""){
		outObj.innerHTML="<font color=\"#ff0033\">密码不能为空！</font>";
		document.UserLogin.Password.focus();
		return false;}
	if (CookieDate){post += "&CookieDate="+escape(CookieDate.value);}
	if (CodeStr){
		if (CodeStr.value==""){
		outObj.innerHTML="<font color=\"#ff0033\">验证码不能为空！</font>";
		CodeStr.focus();
		return false;}
		post += "&CodeStr="+escape(CodeStr.value);}
	//输出信息
	//document.getElementById("sydl").disabled=true;
	if (outObj){outObj.innerHTML="<font color=\"#0000ff\">正在验证登录信息...</font>";}
	var Ajax = new Cl_Ajax();
	Ajax.Url = url;
	Ajax.SucDo = "AjaxUserLoginSuc()";
	Ajax.ErrDo = "AjaxUserLoginErr()";
	Ajax.Post(post);
}
//用户登录/退出成功
function AjaxUserLoginSuc() {
	var Ajax = new Cl_CreateAjaxObj();
	Ajax.open("POST", Cl_InstallDir + "ShowLogin.asp", true);
	//Ajax.setRequestHeader("content-length",PostData.length); 
	Ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
	Ajax.onreadystatechange=function() {
		if (Ajax.readyState==4&&Ajax.status==200) {
			document.getElementById("ShowUserLogin").innerHTML=Ajax.responseText;
		}
	}
	Ajax.send("Ajax=1&Type="+Cl_SpareVar+"&ChannelID="+Cl_ChannelID);
}
//用户登录失败
function AjaxUserLoginErr() {
	var Obj;
	Obj = document.getElementById("LoginMessage");
	if (Obj){Obj.innerHTML="<font color=\"#ff0033\">"+Cl_AjaxresponseText+"</font>";}
	Obj = document.getElementById("CodeStr");
	if (Obj){Obj.value="";}
	Obj = document.getElementById("LoginCode");
	if (Obj){Obj.innerHTML="<img src=\""+Cl_InstallDir+"Inc/Cl_GetCode.asp?type=GetCode\" id=\"logincode\" />";}
	//document.getElementById("sydl").disabled=false;
}
//用户退出
function AjaxUserLogout(dir,cid,type) {
	Cl_InstallDir = dir;
	Cl_ChannelID= cid;
	Cl_SpareVar = type;
	var outObj	= document.getElementById("ShowUserLogin");
	var url		= Cl_InstallDir + "User/Logout.asp";
	var date	= "Ajax=1"
	if (outObj){outObj.innerHTML="<font color=\"#0000ff\">正在退出登录，请稍候...</font>";}
	var Ajax = new Cl_Ajax();
	Ajax.Url = url;
	Ajax.SucDo = "AjaxUserLoginSuc()";
	Ajax.Post(date);
}