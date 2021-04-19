var ic_tc_tj = new function(){
    var LO  = location,
        D   = document,
        SC  = screen,
        W   = window,
        DT  = new Date(),
        M   = Math;
        DTL = D.title;

    var __sid,L;

    L = "https:" == D.location.protocol ? "https:": "http:";
    var  Aa = function(){
        this.h  =  LO.hostname;
        this.rh = function(){
            var d_a = this.h.split(".");
            var rh;
            if(d_a.length>2){
                rh = d_a[d_a.length-2]+'.'+d_a[d_a.length-1]
                if(rh=='com.cn'){
                    rh =  d_a[d_a.length-3]+'.'+d_a[d_a.length-2]+'.'+d_a[d_a.length-1]
                }    
            }else{
                rh = this.h;
            }
            return  rh;
        }
    }
    var aa= new Aa();
    var Ba = function(){
        this.width  = SC.width;
        this.height = SC.height;
    }
    var Ca = function(){
        this.agent = encodeURI(W.navigator.userAgent);
        this.refer = encodeURI(D.referrer);
        this.url = encodeURI(D.URL);

        this.title = D.title;
        this.cookie = D.cookie;
    }
    var Da = function(){
        this.time = DT.getTime();
    }
    var da = new Da();
    var ba = new Ba();
    var ca = new Ca();
    __sid =da.time.toString()+M.round(M.random()*256984).toString();
    var Ea = function(){
        this.gce = function(c_name){
            if(D.cookie.length>0){
                c_start = D.cookie.indexOf(c_name + "=");
                if(c_start!=-1){
                    c_start = c_start + c_name.length +1 ;
                    c_end = D.cookie.indexOf(';',c_start);
                    if(c_end==-1)c_end = D.cookie.length;
                    return unescape(D.cookie.substring(c_start,c_end));
                }
            }
            return '';
        }
        this.sce = function(c_name,value,exp){
            DT.setDate(DT.getDate()+exp);
            D.cookie = c_name+ "=" +escape(value)+((exp==null)?"":";expires="+DT.toGMTString())+";path=/;domain="+aa.rh();
        }
        this.cce = function(){
            if(this.gce('__fansid')==""){
                this.sce('__fansid',__sid,365*10);
            }else{
                __sid=this.gce("__fansid");
            }
            this.sce("__fanvt",DT.getTime());
        }
        this.gt = (this.gce('__fanvt'))?DT.getTime()-this.gce('__fanvt'):0;
    }
    var ea = new Ea();
    ea.cce();
    this.ic_st_ds=function (url,ti){
        var im = new Image();
        var a=[];
        a.push('h='+aa.h);
        a.push('sid='+ea.gce('__fansid'));
        a.push('at='+ca.agent);
        a.push('w='+ba.width);
        a.push('h='+ba.height);
        a.push('re='+ca.refer);
        a.push('url='+url);
        a.push('t='+ea.gt);
        a.push('asr='+ea.gce('aSr_auth'));
        if(aa.h=='www.21icsearch.com'&&typeof(ckun)!='undefined'){
            a.push('un='+encodeURI(ckun));
        }else{
            a.push('un='+encodeURI(ea.gce('www_username')));
        }
        a.push('bun='+encodeURI(ea.gce('bbs_username')));
        a.push('i_m_sg='+encodeURIComponent(ti));
        this.src = L+'//tj.21ic.com/sn.gif?'+a.join('&');
        im.src = this.src;
    }
    var g_tag = function(){
        var tag = D.getElementsByTagName('span');
        var tagname = '';
        for(var i=0;i<tag.length ;i++){
            if(tag[i].className=='tags'){
               var  tags = tag[i].getElementsByTagName('a');
                for(var j=0;j<tags.length;j++){
                   if(tagname!=''){
                        tagname = tagname+'||'+tags[j].innerHTML;
                   }else{
                        tagname= tags[j].innerHTML;
                   }
                }
            }
        }
        this.tagname = tagname;
    }
    var ga = function(){
        if(aa.h=='datasheet.21ic.com'){
            var tag = D.getElementsByTagName('table');
            for(var i=0;i<tag.length;i++){
                if(tag[i].className=='cont_table'||tag[i].className=='cont_right'){
                    var taga =  tag[i].getElementsByTagName('a');
                    for(var j=0;j<taga.length;j++){
                       var re = /\/manufacturer\/.*/g;
                        if(re.test(taga[j])){
                            DTL = DTL+":_:"+taga[j].innerHTML;
                        }
                    }
                }
            }
        }
    }
    new ga();
    var ha = function(){
        if(aa.h=='dl.21ic.com'){
            var tag = D.getElementsByTagName('div');
            for(var i=0;i<tag.length;i++){
                if(tag[i].className=='dl_location'){
                    var taga =  tag[i].getElementsByTagName('a');
                    for(var j=0;j<taga.length;j++){
                        if(j==1||j==2){
                            DTL = DTL+":_:"+taga[j].innerHTML;
                        }
                    }
                    break;
                }
            }
            var re = /\/ebook.*/g;
            if(re.test(LO.href)){
                for(var i=0;i<tag.length;i++){
                    if(tag[i].className=='ebookcont'){
                        var taga =  tag[i].getElementsByTagName('a');
                        for(var j=0;j<taga.length;j++){
                            if(j==1){
                                DTL = DTL+":_:"+taga[j].innerHTML;
                            }
                        }
                        break;
                    }
                }
            }
        }
    }
    new ha();
    var ia = function(){
        if(aa.h=='edu.21ic.com'){
            var tag = D.getElementsByTagName('div');
            for(var i=0;i<tag.length;i++){
                if(tag[i].className=='location_ongray'||tag[i].className=='location'){
                    var taga =  tag[i].getElementsByTagName('a');
                    for(var j=0;j<taga.length;j++){
                        if(j==1||j==2){
                            DTL = DTL+":_:"+taga[j].innerHTML;
                        }
                    }
                }
            }
        }
    }
    new ia();
    var ja = function(){
        if(aa.h=='www.21icsearch.com'){
            var tag = D.getElementsByTagName('div');
            for(var i=0;i<tag.length;i++){
                if(tag[i].className=='position'){
                    var taga =  tag[i].getElementsByTagName('a');
                    for(var j=0;j<taga.length;j++){
                        if(j==1||j==2){
                            DTL = DTL+":_:"+taga[j].innerHTML;
                        }
                    }
                }
            }
            document.write(unescape("%3Cscript src='//tj.21ic.com/ck.php' type='text/javascript'%3E%3C/script%3E"));

        }
        if(aa.h=='www.21ic.com.cn'){
            document.write(unescape("%3Cscript src='//tj.21ic.com/ck.php' type='text/javascript'%3E%3C/script%3E"));
        }
     }
    new ja();
    var actBbsForbid = function(){
        if(aa.h=='bbs.21ic.com'&&typeof(fid)!='undefined'){
            var fbids=[49,50,59,114,124,126,127,182,187,224,226,250,348,428];
            for (var i = 0; i < fbids.length; i++) {
                if(fid==fbids[i]){
                    return false;
                }
            }
        }
        return true;
    }
    var act_bbs_forbid = new actBbsForbid();
    var act = function(){
        if(act_bbs_forbid==false){
            return false;
        }
        var charset =  document.getElementsByTagName('html')[0].getAttribute('lang');

        if(charset=='gb2312'){
            document.write(unescape("%3Cscript src='//tj.21ic.com/agama/agama.js" +  "' type='text/javascript'%3E%3C/script%3E"));
        }else{
            var wact_str = new Array();
            wact_str[0] = "无线MCU,无线微控制器,无线微控器,SimpleLink,Mesh,网状网络,长距离,sensor hub,智能家居,工业自动化,智能抄表,车规级,无线模块,货架标签方案,ESL 方案,SoC,LaunchPad,Gateway";
            wact_str[1] = "Sigfox,LoRa,LPWAN,NBIOT,NB-IoT,RPMA,CC1352,CC2652,Thread,超窄带,UNB,星型网络,窄带物联网,eMTC,低功耗广域,M2M,TI stack,TI15.4,TI MAC,easylink";
            wact_str[2] = "Bluetooth,蓝牙,配对,Beacon,CC2642,SIG,WiFi,Wi-Fi,热点,无线路由器,CC3220,BLE,AoA,AoD,寻向功能,cc2640";
            wact_str[3] = "Zigbee,IEEE802.15.4,紫蜂协议,2.4GHz,GNU Radio,大规模组网,短程无线通信,CC2530,LINK-23X,Link-212,EM260,MC1319,JN5148,LightLink,ZLL,CC2592,CC2538,CC2531,DMM";
            wact_str[4] = "Sub1GHz,Sub-1,433MHz,868MHz,CC1310,915MHz,CC1312,CC1200,CC1101,电表方案,20dBm,ISM,跳频,Sensor to Cloud,Long range mode,LRM,DSSS,FEC";
            wact_str[5] = "WiFi,Wi-Fi,热点,无线路由器,cc3220,WLAN,ADSL,局域网,CC3200,ESP8266,安全加密,低功耗无线网,802.11,CC3235,双频,可视门铃,FIPS";
            wact_str[6] = "MSP432,MSP430,以太网,Ethernet,Cortex-M4,EXP432,CAN,主机微控制器,有线微控制器";


            var ahl='';
            if(typeof(document.getElementsByTagName('h1')[0])!='undefined') {
                ahl =  document.getElementsByTagName('h1')[0].innerHTML;
            }else if(typeof(document.getElementsByClassName('tags')[0])!='undefined'){
                ahl=document.getElementsByClassName('tags')[0].innerHTML;
            }
            if(ahl!=''){
                var reg=/<[^<>]+>/g;
                ahl = ahl.replace(reg,'');
                ahl = ahl.toUpperCase();
                for (var j=0;j<wact_str.length;j++) {
                    var wacts = wact_str[j].split(',');
                    for (var i = 0; i < wacts.length; i++) {
                        wacts[i] = wacts[i].toUpperCase();
                        if (ahl.indexOf(wacts[i]) != -1) {
                            if(ea.gce('__fansid')=='1519638525303246124') {
                                console.log(wacts[i]);
                                console.log(ahl);
                            }
                            var wa = [];
                            wa.push('i=' + i);
                            wa.push('j=' + j);
                            wa.push('h=' + aa.h);
                            wa.push('sid=' + ea.gce('__fansid'));
                            wa.push('at=' + ca.agent);
                            wa.push('w=' + ba.width);
                            wa.push('re=' + ca.refer);
                            wa.push('url=' + ca.url);
                            wa.push('t=' + ea.gt);
                            wa.push('asr=' + ea.gce('aSr_auth'));
                            wa.push('bun=' + encodeURI(ea.gce('bbs_username')));
                            ea.sce('__fanact', i + 1, 30);
                            ea.sce('__fanacttid', j + 1, 30);
                            setTimeout(function(){
                                var js = document.createElement("script");
                                js.type = "text/javascript";
                                js.src = "http://tj.21ic.com/act.php?" + wa.join('&');
                                var head = document.getElementsByTagName('head')[0];
                                head.appendChild(js);


                               // document.body.appendChild(createDiv);
                            },5000);
                            break;
                        }
                    }
                }
            }
            if(ea.gce('__fanact')&&ea.gce('__fanacttid')){
                document.write(unescape("%3Cscript src='//tj.21ic.com/act.php?action=display&ptype="+ea.gce('__fanact')+"&tid="+ea.gce('__fanacttid')+"&sid="+ea.gce('__fansid')+"' type='text/javascript'%3E%3C/script%3E"));
            }
        }
    }
    //new act();
    var actmps = function(){
        if(act_bbs_forbid==false){
            return false;
        }
        var wact_str = new Array();
        wact_str[0] = "发射器,接收器,碰撞预警,辅助驾驶,车道偏离,疲劳检测,自动泊车,红外LED,倒车影像";
        wact_str[1] = "DMS,深度学习,超速报警,人脸识别,紧急救援,Carplay,车载影音,语音识别,V2X,手势识别,车联网,车机系统,T-BOX,智能仪表,HUD,抬头显示,数字仪表,OBD,车载操作系统";
        wact_str[2] = "汽车头灯,尾灯,日行灯,刹车灯,转向灯,氛围灯";
        wact_str[3] = "Type-C,PD,PPS,QC,USB";
        var ahl='';
        if(typeof(document.getElementsByTagName('h1')[0])!='undefined') {
            ahl =  document.getElementsByTagName('h1')[0].innerHTML;

        }else if(typeof(document.getElementsByClassName('tags')[0])!='undefined'){
            ahl=document.getElementsByClassName('tags')[0].innerHTML;
        }

        if(ahl!=''){
            var reg=/<[^<>]+>/g;
            ahl = ahl.replace(reg,'');
            ahl = ahl.toUpperCase();
            for (var j=0;j<wact_str.length;j++) {
                var wacts = wact_str[j].split(',');
                for (var i = 0; i < wacts.length; i++) {
                    wacts[i] = wacts[i].toUpperCase();
                    if (ahl.indexOf(wacts[i]) != -1) {
                        var wa = [];
                        wa.push('i=' + i);
                        wa.push('j=' + j);
                        wa.push('h=' + aa.h);
                        wa.push('sid=' + ea.gce('__fansid'));
                        wa.push('at=' + ca.agent);
                        wa.push('w=' + ba.width);
                        wa.push('re=' + ca.refer);
                        wa.push('url=' + ca.url);
                        wa.push('t=' + ea.gt);
                        wa.push('asr=' + ea.gce('aSr_auth'));
                        wa.push('bun=' + encodeURI(ea.gce('bbs_username')));
                        ea.sce('__fansmart', i + 1, 30);
                        ea.sce('__fansmarttid', j + 1, 30);

                        setTimeout(function(){
                            var js = document.createElement("script");
                            js.type = "text/javascript";
                            js.src = "//tj.21ic.com/smart/actmps.php?" + wa.join('&');
                            var head = document.getElementsByTagName('head')[0];
                            head.appendChild(js);
                        },5000);
                        break;
                    }
                }
            }

            if(ea.gce('__fanactmps')&&ea.gce('__fanactmps')){
                document.write(unescape("%3Cscript src='https://tj.21ic.com/smart/actmps.php?action=display&ptype="+ea.gce('__fanactmps')+"&tid="+ea.gce('__fanactmpstid')+"&sid="+ea.gce('__fansid')+"' type='text/javascript'%3E%3C/script%3E"));
            }
        }
    }
    new actmps();
    var actsys = function(){
        if(act_bbs_forbid==false){
            return false;
        }
        var charset =  document.getElementsByTagName('html')[0].getAttribute('lang');

        if(charset=='gb2312'){
            document.write(unescape("%3Cscript src='//tj.21ic.com/smart/actsys.js" +  "' type='text/javascript'%3E%3C/script%3E"));
        }else{
            var wact_str = new Array();
            wact_str[0] = "智能控制,状态监控,传动器,变送器,过程分析,工业监视器,HMI,PLC,人机界面,CNC控制,工业机器人,工业PC";
            wact_str[1] = "燃气表,电力表,热量计,水表,断路器,继电器,接触器,太阳能,配电,汇流箱";
            wact_str[2] = "有源探头,直流电源,交流电源,电子负载,数字万用表,任意波形发生器,分析器,示波器,DSO,激光测距,光谱仪";
            wact_str[3] = "UPS,电池组,工业电源,网关电源,服务器电源,PMBUS,电力输送,整流器,电动车";
            wact_str[4] = "环视系统,成像雷达,超声波,激光雷达,ADAS,毫米波雷达,激光测距,盲点探测,全景泊车";
            wact_str[5] = "电动汽车,混动汽车,EV,高压电池管理,高压逆变器,电机控制,车用SIC,无刷电机,BLDC,牵引逆变器,双电池系统,混合动力";
            wact_str[6] = "扬声器,音箱,音响,功放,音频,DOLBY,杜比";
            var ahl='';
            if(typeof(document.getElementsByTagName('h1')[0])!='undefined'){
                ahl =  document.getElementsByTagName('h1')[0].innerHTML;
                if(ahl==''){
                    ahl =   document.getElementsByTagName('title')[0].innerHTML;
                }
            }else if(typeof(document.getElementsByClassName('tags')[0])!='undefined'){
                ahl=document.getElementsByClassName('tags')[0].innerHTML;
            }

            if(ahl!=''){
                var reg=/<[^<>]+>/g;
                ahl = ahl.replace(reg,'');
                ahl = ahl.toUpperCase();
                for (var j=0;j<wact_str.length;j++) {
                    var wacts = wact_str[j].split(',');
                    for (var i = 0; i < wacts.length; i++) {
                        wacts[i] = wacts[i].toUpperCase();
                        if (ahl.indexOf(wacts[i]) != -1) {
                            if(ea.gce('__fansid')=='1519638525303246124') {
                                console.log(wacts[i]);
                                console.log(ahl);
                            }
                            var wa = [];
                            wa.push('i=' + i);
                            wa.push('j=' + j);
                            wa.push('h=' + aa.h);
                            wa.push('sid=' + ea.gce('__fansid'));
                            wa.push('at=' + ca.agent);
                            wa.push('w=' + ba.width);
                            wa.push('re=' + ca.refer);
                            wa.push('url=' + ca.url);
                            wa.push('t=' + ea.gt);
                            wa.push('asr=' + ea.gce('aSr_auth'));
                            wa.push('bun=' + encodeURI(ea.gce('bbs_username')));
                            ea.sce('__fanactsys', i + 1, 30);
                            ea.sce('__fanactsys', j + 1, 30);
                            setTimeout(function(){
                                var js = document.createElement("script");
                                js.type = "text/javascript";
                                js.src = "//tj.21ic.com/smart/actsys.php?" + wa.join('&');
                                var head = document.getElementsByTagName('head')[0];
                                head.appendChild(js);
                            },5000);
                            break;
                        }
                    }
                }
            }
            if(ea.gce('__fanactsys')&&ea.gce('__fanactsys')){
                document.write(unescape("%3Cscript src='https://tj.21ic.com/smart/actsys.php?action=display&ptype="+ea.gce('__fanactsys')+"&tid="+ea.gce('__fanactsystid')+"&sid="+ea.gce('__fansid')+"' type='text/javascript'%3E%3C/script%3E"));
            }
        }
    }
    //new actsys();
    var actyan = function(){
        if(act_bbs_forbid==false){
            return false;
        }
        if(ea.gce('__fanactyan')){

        }else{
            document.write(unescape("%3Cscript src='https://tj.21ic.com/smart/actyan.php?action=display&ptype=1&tid=1&sid=1' type='text/javascript'%3E%3C/script%3E"));
        }
    }
    new actyan();
    function Fa(){
        var im = new Image();
        var a=[];
        a.push('h='+aa.h);
        a.push('sid='+ea.gce('__fansid'));
        a.push('at='+ca.agent);
        a.push('w='+ba.width);
        a.push('h='+ba.height);
        a.push('re='+ca.refer);
        a.push('url='+ca.url);
        a.push('t='+ea.gt);
        a.push('asr='+ea.gce('aSr_auth'));
        if((aa.h=='www.21icsearch.com'|| aa.h=='www.21ic.com.cn') && typeof(ckun)!='undefined'){
            a.push('un='+encodeURI(ckun));
        }else{
            a.push('un='+encodeURI(ea.gce('www_username')));
        }
        a.push('bun='+encodeURI(ea.gce('bbs_username'))+"|||"+ea.gce('aSr_promotion'));

        if(aa.h=='www.21ic.com'){
            var tag = new g_tag();
            tag = tag.tagname;
            DTL = DTL+":_:"+tag;
        }
        if(aa.h=='bbs.21ic.com'&&typeof(fid)!='undefined'){
            if(typeof(tid)!='undefined'){
                DTL = DTL+":_:"+tid+'||'+fid;
            }else{
                DTL = DTL+":_:0||"+fid;
            }
        }
        a.push('i_m_sg='+encodeURIComponent(DTL));
        this.src = L+'//tj.21ic.com/sn.gif?'+a.join('&');
        im.src = this.src;
    }
    if(aa.h=='www.21icsearch.com'||aa.h=='www.21ic.com.cn'){
        setTimeout(function(){ Fa();},500);
    }else{
        Fa();
    }

};


