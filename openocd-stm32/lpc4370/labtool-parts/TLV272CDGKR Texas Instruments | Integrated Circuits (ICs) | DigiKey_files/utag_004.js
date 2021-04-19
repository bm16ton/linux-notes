//tealium universal tag - utag.loader ut4.46.202103221902, Copyright 2021 Tealium.com Inc. All Rights Reserved. 

var utag_condload=false;window.__tealium_twc_switch=false;try{ try{
// Type your JavaScript code here...
// Remove old cookie-tracking

var domain = location.hostname.match(/\.digikey\..*/)[0];
document.cookie = "udo-data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;domain="+domain+";";
document.cookie = "wt-tracking=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;domain="+domain+";";

window.utag_data = window.utag_data || {};
var xj;
for (xj in window.utag_data) {
    if (typeof window.utag_data[xj] === 'string') {
        try {
            window.utag_data[xj] = decodeURIComponent(window.utag_data[xj]);
        } catch (e) {
        }
    }
}

utag_data.do_not_track = "";
if (navigator.doNotTrack == "yes" || navigator.doNotTrack == "1" || navigator.msDoNotTrack == "1") {
    utag_data.do_not_track = "yes";
}

window.utag_cfg_ovrd = window.utag_cfg_ovrd || {};

window.utag_cfg_ovrd.load_rules_at_wait = true;
window.utag_cfg_ovrd.ga_noview = false;

//if (location.hostname.indexOf("digikey.cn") > -1) {utag_cfg_ovrd.path = utag_cfg_ovrd.path ? utag_cfg_ovrd.path : "//tags.tiqcdn.cn/utag/digikey/main/qa/";}


if (location.hostname.indexOf("digikey.com.cn") > -1  || location.hostname.indexOf("digikey.cn") > -1) {
    
    if (location.pathname.indexOf(/products/) > -1){window.utag_cfg_ovrd.noview = true}
    
    if (location.hostname.indexOf("digikeytest")> -1 || location.hostname.indexOf("digikeydev")> -1) {
        utag_cfg_ovrd.path =  utag_cfg_ovrd.path ? utag_cfg_ovrd.path :  "//tags.tiqcdn.cn/utag/digikey/main/qa/";
    } else {
        utag_cfg_ovrd.path =  utag_cfg_ovrd.path ? utag_cfg_ovrd.path :  "//tags.tiqcdn.cn/utag/digikey/main/prod/";        
    }
}/* else {
    if (location.hostname.indexOf("digikeytest")  > - 1 || location.hostname.indexOf("digikeydev")> -1 
    || location.hostname.indexOf("developer-preprod")> -1 )  {
        utag_cfg_ovrd.path =  "//tags.tiqcdn.com/utag/digikey/main/qa/";
    } else {
        utag_cfg_ovrd.path =  "//tags.tiqcdn.com/utag/digikey/main/prod/";
    }
}
*/

utag_cfg_ovrd.view_processed = false;

window.utag_evergageCampaigns=function(evergageCampaigns){
    try {
        utag_cfg_ovrd.evergageCampaigns = evergageCampaigns;
        if (utag_cfg_ovrd.view_processed) {
            utag.framework.processEvergageCampaigns(utag_cfg_ovrd.evergageCampaigns);
            utag_cfg_ovrd.evergageCampaigns = "";
        } 
    } catch(e){ utag.DB(e)}
}



} catch(e){ utag.DB(e) }  }catch(e){};
if(!utag_condload){try{ try{
//EXT 508
if (/feedback/.test(window.document.location.hostname) && /digikey/.test(window.document.location.search)){
    window.localStorage.setItem("gdpr_cookie_consent", JSON.stringify({ "acceptedOn": new Date() }));
}

} catch(e){ utag.DB(e) }  }catch(e){}};
if(!utag_condload){try{ try{
// Tealium Tracking Code for YouTube iframe embeds
// All domains except China
if (location.hostname.indexOf("digikey.cn") <= 0) 
{
// Read the identifiers on the YouTube iframes. If not present, then add ids
if (jQuery('iframe[src*="youtube.com"]').length > 0) {
 var i = 0, id;
 window.iframe_id = [];
 jQuery('iframe[src*="youtube.com"]').each(function() {
   if (jQuery(this).attr('id')) {
     id = jQuery(this).attr('id');
     window.iframe_id.push(id);
   } else {
     id = 'tealium_youtube' + i;
     jQuery(this).attr('id', id);
     window.iframe_id.push(id);
     i++;
   }
 });
}

// Configure Milestones
//
function setMileStones(i) {
  // Set the intervals here as you want them reported, in % viewed, each number separated by a comma
  // If you do not want mileStones set mileStones[i] = [] ;
  mileStones[i] = [10, 25, 50, 75, 90];
}
var mileStones = [];
if (window.iframe_id) {
  for (i = 0; i < window.iframe_id.length; i++) {
    setMileStones(i);
  }
}

// Load the YouTube iframe library
//
var ytapi = document.createElement('script');
ytapi.src="https://ww" + "w.youtube" + ".com/iframe_api";
var scriptref = document.getElementsByTagName('script')[0];
scriptref.parentNode.insertBefore(ytapi, scriptref);

window.players = [];
window.onYouTubeIframeAPIReady = function() {
  // Confirm existing ID or set ID in the iframe for each video on the page
  jQuery('iframe[src*="youtube.com"]').each(function() {
  var id = jQuery(this).attr('id');
  window.players[id] = new YT.Player(id, {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
      }
    });
  });
};

window.start = [];
window.onPlayerReady = function(event) {
 //Log that the video is ready/open
 var idx;
 for (i = 0; i < window.iframe_id.length; i++) {
   if (window.iframe_id[i] === event.target.getIframe().id) {
     idx = i;
   }
   window.start.push(true);
 }
 if (event.target.getPlayerState() === YT.PlayerState.CUED) {
   var player = event.target;
   var player_data = player.getVideoData() ;
   /*utag.link(
   { ref_page_event: 'playerLoad',
          video_playhead: parseInt(playhead).toString(),
          playlist_id: '(Not Set)',
          video_id: player_data.video_id,
          video_length: duration.toString(),
          video_milestone: next_ms.toString(),
          event_label: player_data.title,
         // page_content_sub_group: 'YouTube',
         // page_content_group: 'Video',
          video_source: utag.data['video_source'],
          event_category: 'yt_video',
          page_type: 'VI',
          page_sub_type: 'YT',
         // ref_page_type: ref_page_type,
         // ref_page_sub_type: ref_page_sub_type,
          supplier_id: utag.data['supplier_id']
   });*/
   var data = {};
           data['event_category'] = 'yt_video';
           data['event_label'] = player_data.title;
           data['ref_page_event'] = 'video_load';
           data['playlist_id'] = '(Not Set)';
           data['video_id'] = player_data.video_id;
           data['page_type'] = 'VI';
           data['page_sub_type'] = 'YT';
           data['page_content_group'] = 'Video';
           data['page_content_sub_group'] = 'YouTube'; 
           //data['ref_page_type'] = utag.data['page_type'];
           //data['ref_page_sub_type'] = utag.data['page_sub_type'];
           //data['ref_page_id'] = utag.data['page_id'];
           //data['supplier_id'] = utag.data['supplier_id'];
           //['ref_supplier_id'] = utag.data['supplier_id'];
           utag.assignVideoSource(data);
           data['video_source'] = utag.data['video_source'];
           utag.dklink(data);
  }
};

var playerCheckInterval, event;

window.onPlayerStateChange = function(event) {
 player = event.target;
 var playhead, idx;
 for (i = 0; i < window.iframe_id.length; i++) {
   if (window.iframe_id[i] === event.target.getIframe().id) {
     idx = i;
   }
 }

 ref_page_event = "";

 if (event.data == YT.PlayerState.PLAYING) {
   if (start[idx]) {
     if (mileStones[idx].length > 0) {
       playerCheckInterval = setInterval(mileStoneCheck, 50);
     }
     ref_page_event = "mediaStart";
     playhead = 0;
   } else {
     //This will catch when the video playback is changed from not playing to playing
     ref_page_event = "mediaBegin";
     playhead = player.getCurrentTime().toString();
   }
   start[idx] = false;

 } else if (event.data == YT.PlayerState.PAUSED) {
   ref_page_event = "mediaPause";
   playhead = player.getCurrentTime().toString();

 } else if (event.data == YT.PlayerState.ENDED) {
   if (mileStones[idx].length > 0) {
     clearInterval(playerCheckInterval);
     // reset in case visitor replays the video
     playerCheckInterval = 0;
     setMileStones(idx);
   }
   ref_page_event = "mediaComplete"; // utag
   playhead = Math.round(player.getDuration()).toString();
 }

 if (ref_page_event) {
   utag.DB("Video event: " + ref_page_event + ", video ID: " + window.iframe_id[idx]);
   var player_data = player.getVideoData() ;
   /*utag.link(
   { ref_page_event: ref_page_event,
          video_playhead: parseInt(playhead).toString(),
          playlist_id: '(Not Set)',
          video_id: player_data.video_id,
          video_length: duration.toString(),
          video_milestone: next_ms.toString(),
          event_label: player_data.title,
          //page_content_sub_group: 'YouTube',
          //page_content_group: 'Video',
          video_source: utag.data['video_source'],
          event_category: 'yt_video',
          page_type: 'VI',
          page_sub_type: 'YT',
          //ref_page_type: ref_page_type,
          //ref_page_sub_type: ref_page_sub_type,
          supplier_id: utag.data['supplier_id']
   });*/
   var data = {};
           data['event_category'] = 'yt_video';
           data['event_label'] = player_data.title;
           data['ref_page_event'] = ref_page_event;
           data['playlist_id'] = '(Not Set)';
           data['video_id'] = player_data.video_id;
           data['page_type'] = 'VI';
           data['page_sub_type'] = 'YT';
           data['page_content_group'] = 'Video';
           data['page_content_sub_group'] = 'YouTube'; 
           //data['ref_page_type'] = utag.data['page_type'];
           //data['ref_page_sub_type'] = utag.data['page_sub_type'];
           //data['ref_page_id'] = utag.data['page_id'];
           //data['supplier_id'] = utag.data['supplier_id'];
           //['ref_supplier_id'] = utag.data['supplier_id'];
           utag.assignVideoSource(data);
           data['video_source'] = utag.data['video_source'];
           utag.dklink(data);
 }

  function mileStoneCheck() {
    var idx;
    for (i = 0; i < window.iframe_id.length; i++) {
      if (window.iframe_id[i] === player.getIframe().id) {
        idx = i;
      }
    }
    var duration = Math.round(player.getDuration());
    var playhead = parseInt(player.getCurrentTime());
    var percComplete = (playhead / duration) * 100;
    var ms_len = mileStones[idx].length;
    if (ms_len > 0) {
      var next_ms = mileStones[idx][0];
      if (next_ms <= percComplete) {
        mileStones[idx].shift();
        utag.DB("Video event: video_milestone, video ID: " + window.iframe_id[idx] + ", Milestone=" + percComplete.toFixed());
        var player_data = player.getVideoData() ;
        /*utag.link(
        { ref_page_event: 'video_milestone',
           video_playhead: parseInt(playhead).toString(),
          playlist_id: '(Not Set)',
          video_id: player_data.video_id,
          video_length: duration.toString(),
          video_milestone: next_ms.toString(),
          event_label: player_data.title,
          //page_content_sub_group: 'YouTube',
          //page_content_group: 'Video',
          video_source: utag.data['video_source'],
          event_category: 'yt_video',
          page_type: 'VI',
          page_sub_type: 'YT',
          //ref_page_type: ref_page_type,
          //ref_page_sub_type: ref_page_sub_type,
          supplier_id: utag.data['supplier_id']
        });*/
        var data = {};
           data['event_category'] = 'yt_video';
           data['event_label'] = player_data.title;
           data['ref_page_event'] = 'video_milestone';
           data['playlist_id'] = '(Not Set)';
           data['video_id'] = player_data.video_id;
           data['page_type'] = 'VI';
           data['page_sub_type'] = 'YT';
           data['page_content_group'] = 'Video';
           data['page_content_sub_group'] = 'YouTube'; 
           //data['ref_page_type'] = utag.data['page_type'];
           //data['ref_page_sub_type'] = utag.data['page_sub_type'];
           //data['ref_page_id'] = utag.data['page_id'];
           //data['supplier_id'] = utag.data['supplier_id'];
           //['ref_supplier_id'] = utag.data['supplier_id'];
           utag.assignVideoSource(data);
           data['video_source'] = utag.data['video_source'];
           utag.dklink(data);
        
      }
    }
  }
}
};
} catch(e){ utag.DB(e) }  }catch(e){}};
if (typeof utag == "undefined" && !utag_condload) {
  var utag = {
    id:"digikey.main",
    o:{},
    sender: {},
    send: {},
    rpt: {
      ts: {
        a: new Date()
      }
    },
    dbi: [],
    db_log : [],
    loader: {
      q: [],
      lc: 0,
      f: {},
      p: 0,
      ol: 0,
      wq: [],
      lq: [],
      bq: {},
      bk: {},
      rf: 0,
      ri: 0,
      rp: 0,
      rq: [],
      ready_q : [], 
      sendq :{"pending":0},
      run_ready_q : function(){
        for(var i=0;i<utag.loader.ready_q.length;i++){
          utag.DB("READY_Q:"+i);
          try{utag.loader.ready_q[i]()}catch(e){utag.DB(e)};
        }
      },
      lh: function(a, b, c) {
        a = "" + location.hostname;
        b = a.split(".");
        c = (/\.co\.|\.com\.|\.org\.|\.edu\.|\.net\.|\.asn\.|\...\.jp$/.test(a)) ? 3 : 2;
        return b.splice(b.length - c, c).join(".");
      },
      WQ: function(a, b, c, d, g) {
        utag.DB('WQ:' + utag.loader.wq.length);
        try {
          // this picks up a utag_data items added after utag.js was loaded
          // Gotcha: Data layer set after utag.js will not overwrite something already set via an extension.  Only "new" values are copied from utag_data
          // for case where utag_data is set after utag.js is loaded
          if(utag.udoname && utag.udoname.indexOf(".")<0){
            utag.ut.merge(utag.data,window[utag.udoname],0);
          }

          // TBD: utag.handler.RE('view',utag.data,"bwq");
          // process load rules again if this flag is set
          if(utag.cfg.load_rules_at_wait){
            utag.handler.LR(utag.data);
          }
        } catch (e) {utag.DB(e)};
	
	d=0;
        g=[]; 
        for (a = 0; a < utag.loader.wq.length; a++) {
          b = utag.loader.wq[a];
	  b.load = utag.loader.cfg[b.id].load;
          if (b.load == 4){
            //LOAD the bundled tag set to wait here
            this.f[b.id]=0;
            utag.loader.LOAD(b.id)
          }else if (b.load > 0) {
            g.push(b);
            //utag.loader.AS(b); // moved: defer loading until flags cleared
	    d++;
          }else{
            // clear flag for those set to wait that were not actually loaded
            this.f[b.id]=1;
          }
        }
        for (a = 0; a < g.length; a++) {
          utag.loader.AS(g[a]);
        }

	if(d==0){
	  utag.loader.END();
	}
      },
      AS: function(a, b, c, d) {
        utag.send[a.id] = a;
        if (typeof a.src == 'undefined') {
          a.src = utag.cfg.path + ((typeof a.name != 'undefined') ? a.name : 'ut' + 'ag.' + a.id + '.js')
        }
        a.src += (a.src.indexOf('?') > 0 ? '&' : '?') + 'utv=' + (a.v?utag.cfg.template+a.v:utag.cfg.v);
        utag.rpt['l_' + a.id] = a.src;
        b = document;
        this.f[a.id]=0;
        if (a.load == 2) {
          utag.DB("Attach sync: "+a.src);
          a.uid=a.id;
          b.write('<script id="utag_' + a.id + '" src="' + a.src + '"></scr' + 'ipt>')
          if(typeof a.cb!='undefined')a.cb();
        } else if(a.load==1 || a.load==3) {
          if (b.createElement) {
            c = 'utag_digikey.main_'+a.id;
            if (!b.getElementById(c)) {
	      d = {
	        src:a.src,
		id:c,
                uid:a.id,
		loc:a.loc
              }
              if(a.load == 3){d.type="iframe"};
	      if(typeof a.cb!='undefined')d.cb=a.cb;
              utag.ut.loader(d);
            }
          }
        }
      },
      GV: function(a, b, c) {
        b = {};
        for (c in a) {
          if (a.hasOwnProperty(c) && typeof a[c] != "function") b[c] = a[c];
        }
        return b
      },
      OU: function(tid, tcat, a, b, c, d, f, g) {
        g = {};
        utag.loader.RDcp(g);
        try {
          if (typeof g['cp.OPTOUTMULTI'] != 'undefined') {
            c = utag.loader.cfg;
            a = utag.ut.decode(g['cp.OPTOUTMULTI']).split('|');
            for (d = 0; d < a.length; d++) {
              b = a[d].split(':');
              if (b[1] * 1 !== 0) {
                if (b[0].indexOf('c') == 0) {
                  for (f in utag.loader.GV(c)) {
                    if (c[f].tcat == b[0].substring(1)) c[f].load = 0;
                    // if we know the tid but don't know the category and this is a category opt out...
                    if (c[f].tid == tid && c[f].tcat == b[0].substring(1)) return true; 
                  }
                  if (tcat == b[0].substring(1)) return true;
                } else if (b[0] * 1 == 0) {
                  utag.cfg.nocookie = true
                } else {
                  for (f in utag.loader.GV(c)) {
                    if (c[f].tid == b[0]) c[f].load = 0
                  }
                  if (tid == b[0]) return true;
                }
              }
            }
          }
        } catch (e) {utag.DB(e)}
        return false;
      },
      RDdom: function(o){
        var d = document || {}, l = location || {};
        o["dom.referrer"] = d.referrer;
        o["dom.title"] = "" + d.title;
        o["dom.domain"] = "" + l.hostname;
        o["dom.query_string"] = ("" + l.search).substring(1);
        o["dom.hash"] = ("" + l.hash).substring(1);
        o["dom.url"] = "" + d.URL;
        o["dom.pathname"] = "" + l.pathname;
        o["dom.viewport_height"] = window.innerHeight || (d.documentElement?d.documentElement.clientHeight:960);
        o["dom.viewport_width"] = window.innerWidth || (d.documentElement?d.documentElement.clientWidth:960);
      },
      RDcp: function(o, b, c, d){
        b = utag.loader.RC();
        for (d in b) {
          if (d.match(/utag_(.*)/)) {
            for (c in utag.loader.GV(b[d])) {
              o["cp.utag_" + RegExp.$1 + "_" + c] = b[d][c];
            }
          }
        }
        for (c in utag.loader.GV((utag.cl && !utag.cl['_all_']) ? utag.cl : b)) {
          if (c.indexOf("utag_") < 0 && typeof b[c] != "undefined") o["cp." + c] = b[c];
        }
      },
      RDqp: function(o, a, b, c){
        a = location.search + (location.hash+'').replace("#","&");
        if(utag.cfg.lowerqp){a=a.toLowerCase()};
        if (a.length > 1) {
          b = a.substring(1).split('&');
          for (a = 0; a < b.length; a++) {
            c = b[a].split("=");
            if(c.length>1){
              o["qp." + c[0]] = utag.ut.decode(c[1])
            }
          }
        }
      },
      RDmeta: function(o, a, b, h){
        a = document.getElementsByTagName("meta");
        for (b = 0; b < a.length; b++) {
          try{
            h = a[b].name || a[b].getAttribute("property") || ""; 
          }catch(e){h="";utag.DB(e)};
          if (utag.cfg.lowermeta){h=h.toLowerCase()};
          if (h != ""){o["meta." + h] = a[b].content}
        }
      },
      RDva: function(o){
        // Read visitor attributes in local storage
        var readAttr = function(o, l ){
          var a = "", b;
          a = localStorage.getItem(l);
          if(!a || a=="{}")return;
          b = utag.ut.flatten({va : JSON.parse(a)});
          utag.ut.merge(o,b,1);
        }
        try{
          readAttr(o, "tealium_va" );
          readAttr(o, "tealium_va_" + o["ut.account"] + "_" + o["ut.profile"] );
        }catch(e){ utag.DB(e) }
      },
      RDut: function(o, a){
        // Add built-in data types to the data layer for use in mappings, extensions and RDva function.
        var t = {};
        var d = new Date();
        var m = ( utag.ut.typeOf(d.toISOString) == "function" );
        o["ut.domain"] = utag.cfg.domain;
        o["ut.version"] = utag.cfg.v;
        // i.e. "view" or "link"
        t["tealium_event"] = o["ut.event"] = a || "view";
        t["tealium_visitor_id"] = o["ut.visitor_id"]=o["cp.utag_main_v_id"];
        t["tealium_session_id"] = o["ut.session_id"]=o["cp.utag_main_ses_id"];
        t["tealium_session_number"] = o["cp.utag_main__sn"];
        t["tealium_session_event_number"] = o["cp.utag_main__se"];
        try{
          t["tealium_datasource"] = utag.cfg.datasource;
          t["tealium_account"] = o["ut.account"] = utag.cfg.utid.split("/")[0];
          t["tealium_profile"] = o["ut.profile"] = utag.cfg.utid.split("/")[1];
          t["tealium_environment"] = o["ut.env"] = utag.cfg.path.split("/")[6];
        }catch(e){ utag.DB(e) }

        t["tealium_random"] = Math.random().toFixed(16).substring(2);
        t["tealium_library_name"] = "ut"+"ag.js";
        t["tealium_library_version"] = ( utag.cfg.template + "0" ).substring(2);
        t["tealium_timestamp_epoch"] = Math.floor( d.getTime() / 1000 );
        t["tealium_timestamp_utc"] = ( m ? d.toISOString() : "");
        // Adjust date to local time
        d.setHours( d.getHours() - ( d.getTimezoneOffset() / 60 ) );
        t["tealium_timestamp_local"] = ( m ? d.toISOString().replace( "Z","" ) : "" );

        // Any existing data elements with "tealium_" will not be overwritten
        utag.ut.merge( o, t, 0 );
      },
      RDses: function( o, a, c ) {
        a = (new Date()).getTime();
        c = ( a + parseInt( utag.cfg.session_timeout ) ) + "";

        // cp.utag_main_ses_id will not be in the data layer when it has expired or this is first page view of all time
	if ( !o["cp.utag_main_ses_id"] ) {
          o["cp.utag_main_ses_id"] = a + "";
          o["cp.utag_main__ss"] = "1";
          o["cp.utag_main__se"] = "1";
          o["cp.utag_main__sn"] = ( 1 + parseInt( o["cp.utag_main__sn"] || 0 ) ) + "";
        } else {
          o["cp.utag_main__ss"] = "0";
          o["cp.utag_main__se"] = ( 1 + parseInt( o["cp.utag_main__se"] || 0 ) ) + "";
        }

        o["cp.utag_main__pn"] = o["cp.utag_main__pn"] || "1";
        o["cp.utag_main__st"] = c;

        utag.loader.SC( "utag_main", { "_sn": ( o["cp.utag_main__sn"] || 1 ), "_se": o["cp.utag_main__se"], "_ss": o["cp.utag_main__ss"], "_st": c, "ses_id": ( o["cp.utag_main_ses_id"] || a ) + ";exp-session", "_pn": o["cp.utag_main__pn"] + ";exp-session" } );
      },
      RDpv: function( o ) {
        if ( typeof utag.pagevars == "function" ) {
          utag.DB("Read page variables");
          utag.pagevars(o);
        }
      },
      RD: function( o, a ) {
        utag.DB("utag.loader.RD");
        utag.DB(o);

        utag.loader.RDcp(o);

        if ( !utag.loader.rd_flag ) {
          utag.loader.rd_flag = 1;
          o["cp.utag_main_v_id"] = o["cp.utag_main_v_id"] || utag.ut.vi((new Date()).getTime());
          o["cp.utag_main__pn"] = ( 1 + parseInt( o["cp.utag_main__pn"] || 0 ) ) + "";
          // the _st value is not-yet-set for first page view so we'll need wait to write in _pn value (which is exp-session)
          // The SC function expires (removes) cookie values that expired with the session
          utag.loader.SC( "utag_main", { "v_id": o["cp.utag_main_v_id"] } );
          utag.loader.RDses(o);
        }

        // first utag.track call for noview should not clear session start (_ss) value
        if(a && !utag.cfg.noview)utag.loader.RDses(o);
        utag.loader.RDqp(o);
        utag.loader.RDmeta(o);
        utag.loader.RDdom(o);
        utag.loader.RDut(o, a || "view");
        utag.loader.RDpv(o);
        utag.loader.RDva(o);
      },
      RC: function(a, x, b, c, d, e, f, g, h, i, j, k, l, m, n, o, v, ck, cv, r, s, t) {
        o = {};
        b = ("" + document.cookie != "") ? (document.cookie).split("; ") : [];
        r = /^(.*?)=(.*)$/;
        s = /^(.*);exp-(.*)$/;
        t = (new Date()).getTime();
        for (c = 0; c < b.length; c++) {
          if (b[c].match(r)) {
            ck = RegExp.$1;
            cv = RegExp.$2;
          }
          e = utag.ut.decode(cv);
          if (typeof ck!="undefined"){
            if (ck.indexOf("ulog") == 0 || ck.indexOf("utag_") == 0) {
              e = cv.split("$");
              g = [];
              j = {};
              for (f = 0; f < e.length; f++) {
                try{
                  g = e[f].split(":");
                  if (g.length > 2) {
                    g[1] = g.slice(1).join(":");
                  }
                  v = "";
                  if (("" + g[1]).indexOf("~") == 0) {
                    h = g[1].substring(1).split("|");
                    for (i = 0; i < h.length; i++) h[i] = utag.ut.decode(h[i]);
                    v = h
                  } else v = utag.ut.decode(g[1]);
                  j[g[0]] = v;
                }catch(er){utag.DB(er)};
              }
              o[ck] = {};
              for (f in utag.loader.GV(j)) {
                if (j[f] instanceof Array) {
                  n = [];
                  for (m = 0; m < j[f].length; m++) {
                    if (j[f][m].match(s)){
                      k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : t - 1) : parseInt(RegExp.$2);
                      if (k > t) n[m] = (x == 0) ? j[f][m] : RegExp.$1;
                    }
                  }
                  j[f] = n.join("|");
                } else {
                  j[f] = "" + j[f];
                  if (j[f].match(s)) {
                    k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : t - 1) : parseInt(RegExp.$2);
                    j[f] = (k < t) ? null : (x == 0 ? j[f] : RegExp.$1);
                  }
                }
                if (j[f]) o[ck][f] = j[f];
              }
            } else if (utag.cl[ck] || utag.cl['_all_']) {
              o[ck] = e
            }
          }
        }
        return (a) ? (o[a] ? o[a] : {}) : o;
      },
      SC: function(a, b, c, d, e, f, g, h, i, j, k, x, v) {
        if (!a) return 0;
        if (a=="utag_main" && utag.cfg.nocookie) return 0;
        v = "";
        var date = new Date();
        var exp = new Date();
        exp.setTime(date.getTime()+(365*24*60*60*1000));
        x = exp.toGMTString();
        if (c && c == "da") {
          x = "Thu, 31 Dec 2009 00:00:00 GMT";
        } else if (a.indexOf("utag_") != 0 && a.indexOf("ulog") != 0) {
          if (typeof b != "object") {
            v = b
          }
        } else {
          d = utag.loader.RC(a, 0);
          for (e in utag.loader.GV(b)) {
            f = "" + b[e];
            if (f.match(/^(.*);exp-(\d+)(\w)$/)) {
              g = date.getTime() + parseInt(RegExp.$2) * ((RegExp.$3 == "h") ? 3600000 : 86400000);
              if (RegExp.$3 == "u") g = parseInt(RegExp.$2);
              f = RegExp.$1 + ";exp-" + g;
            }
            if (c == "i") {
              if (d[e] == null) d[e] = f;
            } else if (c == "d") delete d[e];
            else if (c == "a") d[e] = (d[e] != null) ? (f - 0) + (d[e] - 0) : f;
            else if (c == "ap" || c == "au") {
              if (d[e] == null) d[e] = f;
              else {
                if (d[e].indexOf("|") > 0) {
                  d[e] = d[e].split("|")
                }
                g = (d[e] instanceof Array) ? d[e] : [d[e]];
                g.push(f);
                if (c == "au") {
                  h = {};
                  k = {};
                  for (i = 0; i < g.length; i++) {
                    if (g[i].match(/^(.*);exp-(.*)$/)) {
                      j = RegExp.$1;
                    }
                    if (typeof k[j] == "undefined") {
                      k[j] = 1;
                      h[g[i]] = 1;
                    }
                  }
                  g = [];
                  for (i in utag.loader.GV(h)) {
                    g.push(i);
                  }
                }
                d[e] = g
              }
            } else d[e] = f;
          }
          h = new Array();
          for (g in utag.loader.GV(d)) {
            if (d[g] instanceof Array) {
              for (c = 0; c < d[g].length; c++) {
                d[g][c] = encodeURIComponent(d[g][c])
              }
              h.push(g + ":~" + d[g].join("|"))
            } else h.push((g + ":").replace(/[\,\$\;\?]/g,"") + encodeURIComponent(d[g]))
          }
          if (h.length == 0) {
            h.push("");
            x = ""
          }
          v = (h.join("$"));
        }
        document.cookie = a + "=" + v + ";path=/;domain=" + utag.cfg.domain + ";expires=" + x;
        return 1
      },
      LOAD: function(a, b, c, d) {
        //utag.DB('utag.loader.LOAD:' + a);
        if(!utag.loader.cfg){
           return
        }
	if(this.ol==0){
          if(utag.loader.cfg[a].block && utag.loader.cfg[a].cbf){
            this.f[a] = 1;
	    delete utag.loader.bq[a];
          }
	  for(b in utag.loader.GV(utag.loader.bq)){
            if(utag.loader.cfg[a].load==4 && utag.loader.cfg[a].wait==0){
              utag.loader.bk[a]=1;
              utag.DB("blocked: "+ a);
            }
	    utag.DB("blocking: " + b);
	    return;
	  }
	  utag.loader.INIT();
	  return;
	}
        utag.DB('utag.loader.LOAD:' + a);

        if (this.f[a] == 0) {
          this.f[a] = 1;
      	
	  if(utag.cfg.noview!=true){
	    if(utag.loader.cfg[a].send){
              utag.DB("SENDING: "+a);
              try{
                if (utag.loader.sendq.pending > 0 && utag.loader.sendq[a]) {
                  utag.DB("utag.loader.LOAD:sendq: "+a);
                  while( d = utag.loader.sendq[a].shift() ) {
                    utag.DB(d);
                    utag.sender[a].send(d.event, utag.handler.C(d.data));
                    utag.loader.sendq.pending--;
                  }
                } else {
                  utag.sender[a].send('view',utag.handler.C(utag.data));
                }
		utag.rpt['s_' + a] = 0;
	      } catch (e) {
                utag.DB(e);
	        utag.rpt['s_' + a] = 1;
	      }
	    }
	  }
	  if(utag.loader.rf==0)return;
          for (b in utag.loader.GV(this.f)) {
            if (this.f[b] == 0 || this.f[b] == 2) return
          }
	  utag.loader.END();
        }
      },
      EV: function(a, b, c, d) {
        if (b == "ready") {
          if(!utag.data){
            try {
              utag.cl = {'_all_': 1};
              utag.loader.initdata();    
              utag.loader.RD(utag.data);
            }catch(e){ utag.DB(e) };
          }
          if ( (document.attachEvent || utag.cfg.dom_complete) ? document.readyState === "complete" : document.readyState !== "loading" ) setTimeout(c, 1);
          else {
            utag.loader.ready_q.push(c);
            var RH;

            if(utag.loader.ready_q.length<=1){
              if (document.addEventListener) {
                RH = function() {
                  document.removeEventListener("DOMContentLoaded", RH, false);
                  utag.loader.run_ready_q()
                };
                if(!utag.cfg.dom_complete)document.addEventListener("DOMContentLoaded", RH, false);
                window.addEventListener("load", utag.loader.run_ready_q, false);
              } else if (document.attachEvent) {
                RH = function() {
                  if (document.readyState === "complete") {
                    document.detachEvent("onreadystatechange", RH);
                    utag.loader.run_ready_q()
                  }
                };
                document.attachEvent("onreadystatechange", RH);
                window.attachEvent("onload", utag.loader.run_ready_q);
              }
            }
          }
        } else {
          if (a.addEventListener) {
            a.addEventListener(b, c, false)
          } else if (a.attachEvent) {
            a.attachEvent(((d == 1) ? "" : "on") + b, c)
          }
        }
      },
      END: function(b, c, d, e, v, w){
        if(this.ended){return};
        this.ended=1;
	utag.DB("loader.END");
        b = utag.data;
        // add the default values for future utag.link/view calls
	if(utag.handler.base && utag.handler.base!='*'){
          e = utag.handler.base.split(",");
          for (d = 0; d < e.length; d++) {
            if (typeof b[e[d]] != "undefined") utag.handler.df[e[d]] = b[e[d]]
          }
        }else if (utag.handler.base=='*'){
           utag.ut.merge(utag.handler.df,b,1);
        }

        utag.rpt['r_0']="t";
	for(var r in utag.loader.GV(utag.cond)){
          utag.rpt['r_'+r]=(utag.cond[r])?"t":"f";
        }

        utag.rpt.ts['s'] = new Date();
	

        v = utag.cfg.path;
        // both .tiqcdn.com and .tiqcdn.cn supported
        w = v.indexOf(".tiqcdn.");
        if(w>0 && b["cp.utag_main__ss"]==1 && !utag.cfg.no_session_count)utag.ut.loader({src:v.substring(0,v.indexOf("/ut"+"ag/")+6)+"tiqapp/ut"+"ag.v.js?a="+utag.cfg.utid+(utag.cfg.nocookie?"&nocookie=1":"&cb="+(new Date).getTime()),id:"tiqapp"})
        
        if(utag.cfg.noview!=true)utag.handler.RE('view',b,"end");
	utag.handler.INIT();
      }
    },
    DB: function(a, b) {
      // return right away if we've already checked the cookie
      if(utag.cfg.utagdb===false){
        return;
      }else if(typeof utag.cfg.utagdb=="undefined"){
        b = document.cookie+'';
        utag.cfg.utagdb=((b.indexOf('utagdb=true') >= 0)?true:false);
      }
      if(utag.cfg.utagdb===true){
        var t;
        if(utag.ut.typeOf(a) == "object"){
          t=utag.handler.C(a)
        }else{
          t=a
        }
        utag.db_log.push(t);
        try{if(!utag.cfg.noconsole)console.log(t)}catch(e){}
      }
    },
    RP: function(a, b, c) {
      if (typeof a != 'undefined' && typeof a.src != 'undefined' && a.src != '') {
        b = [];
        for (c in utag.loader.GV(a)) {
          if (c != 'src') b.push(c + '=' + escape(a[c]))
        }
        this.dbi.push((new Image()).src = a.src + '?utv=' + utag.cfg.v + '&utid=' + utag.cfg.utid + '&' + (b.join('&')))
      }
    },
    view: function(a,c,d) {
      return this.track({event:'view', data:a || {}, cfg:{cb:c,uids:d}})
    },
    link: function(a,c,d) {
      return this.track({event:'link', data:a || {}, cfg:{cb:c,uids:d}})
    },
    track: function(a,b,c,d,e) {
      a = a || {};
      if (typeof a == "string") {
        a = { event: a, data: b || {}, cfg:{cb:c,uids:d} } 
      }

      // track called directly also supports a 3rd option where first param (a) is data layer and second param (b) is cb function
      for(e in utag.loader.GV(utag.o)){
        utag.o[e].handler.trigger(a.event || "view", a.data || a, a.cfg || {cb:b,uids:c})
      }
      a.cfg = a.cfg || {cb:b};
      if(typeof a.cfg.cb == "function")a.cfg.cb();

      return true
    },
    handler: {
      base: "page_site,page_language,page_title,page_content_group,page_content_sub_group,page_type,page_sub_type",
      df: {},
      o: {},
      send: {},
      iflag: 0,
      INIT: function(a, b, c) {
        utag.DB('utag.handler.INIT');
        if(utag.initcatch){
          utag.initcatch=0;
          return
        }
        this.iflag = 1;
        a = utag.loader.q.length;
        if (a > 0) {
          utag.DB("Loader queue");
          for (b = 0; b < a; b++) {
            c = utag.loader.q[b];
            utag.handler.trigger(c.a, c.b, c.c)
          }
        }
        //##UTABSOLUTELAST##
      },
      test: function() {
        return 1
      },
      // reset and run load rules
      LR: function(b){
        utag.DB("Load Rules");
        for(var d in utag.loader.GV(utag.cond)){
          utag.cond[d]=false;
        }
        utag.DB(b);
        utag.loader.loadrules(b);
        utag.DB(utag.cond);
        utag.loader.initcfg();
        // use the OPTOUTMULTI cookie value to override load rules
        utag.loader.OU();
	for(var r in utag.loader.GV(utag.cond)){
          utag.rpt['r_'+r]=(utag.cond[r])?"t":"f";
        }
      },
      // The third param "c" is a string that defines the location i.e. "blr" == before load rules
      RE:function(a,b,c,d,e,f,g){
        if(c!="alr" && !this.cfg_extend){
          return 0; 
        }
        utag.DB("RE: "+c);
        if(c=="alr")utag.DB("All Tags EXTENSIONS");
        utag.DB(b);
        if(typeof this.extend != "undefined"){
          g=0;
          for (d = 0; d < this.extend.length; d++) {
            try {
              /* Extension Attributes */
              e=0;
              if(typeof this.cfg_extend!="undefined"){
                f=this.cfg_extend[d];
                if(typeof f.count == "undefined")f.count=0;
                if(f[a]==0 || (f.once==1 && f.count>0) || f[c]==0){
                  e=1
                }else{
                  if(f[c]==1){g=1};
                  f.count++
                }
              }
              if(e!=1){
                this.extend[d](a, b);
                utag.rpt['ex_' + d] = 0
              }
            } catch (er) {
              utag.DB(er);
              utag.rpt['ex_' + d] = 1;
	      utag.ut.error({e:er.message,s:utag.cfg.path+'utag.js',l:d,t:'ge'});
            }
          }
          utag.DB(b);
          return g;
        }
      },
      trigger: function(a, b, c, d, e, f) {
        utag.DB('trigger:'+a+(c && c.uids?":"+c.uids.join(","):""));
        b = b || {};
        utag.DB(b);

        if (!this.iflag) {
          utag.DB("trigger:called before tags loaded");
          for (d in utag.loader.f) {
            if (!(utag.loader.f[d] === 1)) utag.DB('Tag '+d+' did not LOAD')
          }
          utag.loader.q.push({
            a: a,
            b: utag.handler.C(b),
            c: c
          });
          return;
        }

        // update all values for AJAX pages
        utag.ut.merge(b,this.df,0);
        utag.loader.RD( b, a );

        // clearing noview flag after the RD function call
        utag.cfg.noview = false;

        function sendTag(a, b, d){
          try {
            if(typeof utag.sender[d]!="undefined"){
              utag.DB("SENDING: "+d);
              utag.sender[d].send(a, utag.handler.C(b));
	      utag.rpt['s_' + d] = 0;
            }else if (utag.loader.cfg[d].load!=2){
              // utag.link calls can load in new tags
              utag.loader.sendq[d] = utag.loader.sendq[d] || [];
              utag.loader.sendq[d].push({"event":a, "data":utag.handler.C(b)});
              utag.loader.sendq.pending++;
              utag.loader.AS({id : d, load : 1}); 
            }
          }catch (e) {utag.DB(e)}
        }
        
        // utag.track( { event : "view", data: {myvar : "myval" }, cfg: { uids : [1,2,10] } } );
        if(c && c.uids){
          this.RE(a,b,"alr");
          for(f=0;f<c.uids.length;f++){
            d=c.uids[f];
            // bypass load rules, but still check the OPTOUTMULTI cookie before firing
            if (!utag.loader.OU(utag.loader.cfg[d].tid)) {
              sendTag(a, b, d);
            }
          }
        }else if(utag.cfg.load_rules_ajax){
          this.RE(a,b,"blr");
          // process load rules based on current data layer
          this.LR(b);
          this.RE(a,b,"alr");
          
          for(f = 0; f < utag.loader.cfgsort.length; f++){
            d = utag.loader.cfgsort[f];
            if(utag.loader.cfg[d].load && utag.loader.cfg[d].send){
              sendTag(a, b, d);
            }
          }
        }else{
          // legacy behavior
          this.RE(a,b,"alr");
          for (d in utag.loader.GV(utag.sender)) {
            sendTag(a, b, d);
          }
        }
        this.RE(a,b,"end");
      },
      // "sort-of" copy
      C: function(a, b, c) {
        b = {};
        for (c in utag.loader.GV(a)) {
          if(a[c] instanceof Array){
            b[c] = a[c].slice(0)
          }else{
            // objects are still references to the original (not copies)
            b[c] = a[c]
          }
        }
        return b
      }
    },
    ut:{
      pad: function(a,b,c,d){
        a=""+((a-0).toString(16));d='';if(b>a.length){for(c=0;c<(b-a.length);c++){d+='0'}}return ""+d+a
      },
      vi: function(t,a,b){
        if(!utag.v_id){
          a=this.pad(t,12);b=""+Math.random();a+=this.pad(b.substring(2,b.length),16);try{a+=this.pad((navigator.plugins.length?navigator.plugins.length:0),2);a+=this.pad(navigator.userAgent.length,3);a+=this.pad(document.URL.length,4);a+=this.pad(navigator.appVersion.length,3);a+=this.pad(screen.width+screen.height+parseInt((screen.colorDepth)?screen.colorDepth:screen.pixelDepth),5)}catch(e){utag.DB(e);a+="12345"};utag.v_id=a;
        }
        return utag.v_id
      },
      hasOwn: function(o, a) {
        return o != null && Object.prototype.hasOwnProperty.call(o, a)
      },
      isEmptyObject: function(o, a) {
	for (a in o) {
          if (utag.ut.hasOwn(o,a))return false
        }
        return true
      },
      isEmpty: function(o) {
        var t = utag.ut.typeOf(o);
        if ( t == "number" ){
          return isNaN(o)
        }else if ( t == "boolean" ){
          return false
        }else if ( t == "string" ){
          return o.length === 0
        }else return utag.ut.isEmptyObject(o)
      },
      typeOf: function(e) {
        return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
      },
      flatten: function(o){
        // stop when arriving at a string, array, boolean, number (float or integer)
        var a = {}; 
        function r(c, p) {
          if (Object(c) !== c || c instanceof Array) {
            a[p] = c;
          } else {
            if(utag.ut.isEmptyObject(c)){
              //a[p] = {};
            }else{
              for (var d in c) {
                r(c[d], p ? p+"."+d : d);
              }
            }
          }
        }
        r(o, "");

        return a;
      },
      merge: function(a, b, c, d) {
        if(c){
          for(d in utag.loader.GV(b)){
            a[d] = b[d]
          }
        }else{
          for(d in utag.loader.GV(b)){
            if(typeof a[d]=="undefined")a[d] = b[d]
          }
        }
      },
      decode: function(a, b) {
        b = "";
        try{b = decodeURIComponent(a)}catch(e){utag.DB(e)};
        if (b == ""){b = unescape(a)};
        return b
      },
      encode: function(a, b) {
        b = "";
        try{b = encodeURIComponent(a)}catch(e){utag.DB(e)};
        if (b == ""){b = escape(a)};
        return b
      },
      error: function(a, b, c){
        if(typeof utag_err!="undefined"){
          utag_err.push(a)
        }
      },
      loader: function(o, a, b, c, l, m) {
        utag.DB(o);
        a=document;
        if (o.type=="iframe") {
          // if an iframe of same id already exists, remove and add again (to keep DOM clean and avoid impacting browser history)
          m = a.getElementById( o.id );
          if ( m && m.tagName == "IFRAME" ) {
            m.parentNode.removeChild(m);
          }
          b = a.createElement("iframe");
          o.attrs = o.attrs || {};
          utag.ut.merge( o.attrs, { "height" : "1", "width" : "1", "style" : "display:none" } , 0 );
        }else if (o.type=="img"){
          utag.DB("Attach img: "+o.src);
          b = new Image();
        }else{
          b = a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";
        }
        if(o.id){b.id=o.id};
        for( l in utag.loader.GV(o.attrs) ){
          b.setAttribute( l, o.attrs[l] )
        }
        b.setAttribute("src", o.src);
        if (typeof o.cb=="function") {
          if(b.addEventListener) {
            b.addEventListener("load",function(){o.cb()},false);
          }else {
            // old IE support
            b.onreadystatechange=function(){if(this.readyState=='complete'||this.readyState=='loaded'){this.onreadystatechange=null;o.cb()}};
          }
        }
        if(typeof o.error=="function"){
          utag.loader.EV(b, "error", o.error);
        }
        if ( o.type != "img" ) {
          l = o.loc || "head";
          c = a.getElementsByTagName(l)[0];
          if (c) {
            utag.DB("Attach to "+l+": "+o.src);
            if (l == "script") {
              c.parentNode.insertBefore(b, c);
            } else {
              c.appendChild(b)
            }
          }
        }
      }
    }
  };
  utag.o['digikey.main']=utag;
  utag.cfg = {
    template : "ut4.46.",
    // Enable load rules ajax feature by default
    load_rules_ajax: true,
    load_rules_at_wait: false,
    lowerqp: false,
    noconsole: false,
    //noview: ##UTNOVIEW##,
    session_timeout: 1800000,
    readywait: 1,
    noload: 0,
    domain: utag.loader.lh(),
    datasource: "##UTDATASOURCE##".replace("##"+"UTDATASOURCE##",""),
    path: "//tags.tiqcdn.com/utag/digikey/main/prod/",
    utid: "digikey/main/202103221901"
  };
  utag.cfg.v = utag.cfg.template + "202103221902";
  try{var _gaq=_gaq || [];var pageTracker=pageTracker || {_trackEvent:function(c,d,e,f,g){g={ga_eventCat:c,ga_eventAction:d,ga_eventLabel:e,ga_eventValue:f};utag.link(g,null,[214]);},_trackPageview:function(c){_gaq.push(['_trackPageview',c?c:null]);}}}catch(e){};utag.cond={101:0,106:0,115:0,116:0,117:0,118:0,121:0,126:0,131:0,132:0,135:0,136:0,137:0,138:0,140:0,141:0,142:0,143:0,144:0,23:0,27:0,2:0,43:0,63:0,67:0,79:0,80:0,82:0,8:0,90:0,91:0,97:0,98:0};
utag.pagevars=function(ud){ud = ud || utag.data;try{ud['js_page.window.mobile']=window.mobile}catch(e){utag.DB(e)};try{ud['js_page.document.documentElement.lang']=document.documentElement.lang}catch(e){utag.DB(e)};try{ud['js_page.window.cart2']=window.cart2}catch(e){utag.DB(e)};};
utag.loader.chkCanRunTime = function(s,e,d,t,o,i) {   try {       o = {           is : [s,e],           dt : [],           tm : [],           hd : 0,           ms : 0       };       for (i=0;i<2;i++){           d = o.is[i].substring(0,8);           t = o.is[i].substring(8);           o.dt[i] = new Date();           if (d !== '--------'){               o.dt[i].setFullYear(d.substring(0,4));               o.dt[i].setMonth(parseInt(d.substring(4,6))-1);               o.dt[i].setDate(d.substring(6,8));           }           if (t !== '----'){               o.dt[i].setHours(t.substring(0,2));               o.dt[i].setMinutes(t.substring(2,4));           } else {               o.dt[i].setHours(o.hd);               o.dt[i].setMinutes(o.ms);           }           o.dt[i].setSeconds(o.ms);           o.tm[i] = o.dt[i].getTime();           o.hd = 23;           o.ms = 59;       }       o.n = new Date().getTime();       return (o.n >= o.tm[0] && o.n <= o.tm[1]);   } catch (e) {       return false;   }};utag.loader.initdata = function() {   try {       utag.data = (typeof utag_data != 'undefined') ? utag_data : {};       utag.udoname='utag_data';    } catch (e) {       utag.data = {};       utag.DB('idf:'+e);   }};utag.loader.loadrules = function(_pd,_pc) {var d = _pd || utag.data; var c = _pc || utag.cond;for (var l in utag.loader.GV(c)) {switch(l){
case '101':try{c[101]|=(/digikey\.com$/.test(d['dom.domain']))}catch(e){utag.DB(e)}; break;
case '106':try{c[106]|=(d['dom.pathname'].toString().toLowerCase().indexOf('/bom/view'.toLowerCase())<0)}catch(e){utag.DB(e)}; break;
case '115':try{c[115]|=(typeof d['optimizely_project_id']!='undefined')}catch(e){utag.DB(e)}; break;
case '116':try{c[116]|=(typeof d['twitter_pid']!='undefined')}catch(e){utag.DB(e)}; break;
case '117':try{c[117]|=(typeof d['clicktail_project_guid']!='undefined')}catch(e){utag.DB(e)}; break;
case '118':try{c[118]|=(typeof d['do_not_track']!='undefined'&&d['do_not_track']=='')||(d['do_not_track']!='yes')||(typeof d['do_not_track']=='undefined')||(d['region'].toString().toLowerCase()!='EMEA'.toLowerCase())}catch(e){utag.DB(e)}; break;
case '121':try{c[121]|=(typeof d['bing_id']!='undefined')}catch(e){utag.DB(e)}; break;
case '126':try{c[126]|=(typeof d['ad_word_universal_id']!='undefined')}catch(e){utag.DB(e)}; break;
case '131':try{c[131]|=(typeof d['google_tracking_id_staging']!='undefined')}catch(e){utag.DB(e)}; break;
case '132':try{c[132]|=(typeof d['google_tracking_id_sandbox']!='undefined')}catch(e){utag.DB(e)}; break;
case '135':try{c[135]|=(typeof d['kenshoo_token']!='undefined')}catch(e){utag.DB(e)}; break;
case '136':try{c[136]|=(d['do_not_track_for_consent']!='yes')}catch(e){utag.DB(e)}; break;
case '137':try{c[137]|=(d['dom.domain'].toString().toLowerCase().indexOf('digikeytest'.toLowerCase())>-1)||(d['dom.domain'].toString().toLowerCase().indexOf('digikeydev'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '138':try{c[138]|=(d['is_confirmation_page']=='true')}catch(e){utag.DB(e)}; break;
case '140':try{c[140]|=(typeof d['kenshoo_token']!='undefined')}catch(e){utag.DB(e)}; break;
case '141':try{c[141]|=(typeof d['datadog_view']=='undefined')||(d['datadog_view'].toString().toLowerCase()!='true'.toLowerCase())}catch(e){utag.DB(e)}; break;
case '142':try{c[142]|=(typeof d['ccpa_do_not_track']=='undefined')||(d['ccpa_do_not_track']!='yes')}catch(e){utag.DB(e)}; break;
case '143':try{c[143]|=(d['dom.domain'].toString().indexOf('digikey.bg')>-1)}catch(e){utag.DB(e)}; break;
case '144':try{c[144]|=(d['dom.domain'].toString().indexOf('digikey.com')>-1)}catch(e){utag.DB(e)}; break;
case '2':try{c[2]|=(typeof d['page_title']!='undefined'&&d['page_title'].toString().toLowerCase()=='order confirmation'.toLowerCase())||(typeof d['page_title']!='undefined'&&d['page_title'].toString().toLowerCase()=='shopping cart - submit'.toLowerCase())}catch(e){utag.DB(e)}; break;
case '23':try{c[23]|=(d['dom.domain'].toString().indexOf('.jp')>-1)}catch(e){utag.DB(e)}; break;
case '27':try{c[27]|=(d['dom.domain'].toString().indexOf('.kr')>-1)}catch(e){utag.DB(e)}; break;
case '43':try{c[43]|=(typeof d['qp.wt.z_sm_link']!='undefined'&&d['qp.wt.z_sm_link'].toString().toLowerCase().indexOf('twitter'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '63':try{c[63]|=(d['dom.pathname'].toString().indexOf('/product-highlight/c/cui/summer-of-power')>-1)}catch(e){utag.DB(e)}; break;
case '67':try{c[67]|=(d['page_title']=='Order Confirmation'&&d['dom.domain'].toString().toLowerCase().indexOf('.cn'.toLowerCase())>-1&&typeof d['order_currency']!='undefined')||(d['page_title']=='Shopping Cart - Submit'&&d['dom.domain'].toString().toLowerCase().indexOf('.cn'.toLowerCase())>-1&&typeof d['order_currency']!='undefined')||(d['tealium_event']=='purchase'&&d['dom.domain'].toString().indexOf('.cn')>-1)}catch(e){utag.DB(e)}; break;
case '79':try{c[79]|=(d['dom.domain'].toString().toLowerCase().indexOf('digikey.com.cn'.toLowerCase())>-1)||(d['dom.domain'].toString().toLowerCase().indexOf('digikey.cn'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '8':try{c[8]|=(d['page_title']!='Order Confirmation'&&d['page_title']!='Shopping Cart - Submit')}catch(e){utag.DB(e)}; break;
case '80':try{c[80]|=(d['dom.domain'].toString().toLowerCase().indexOf('digikey.cn'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '82':try{c[82]|=(d['dom.pathname'].toString().toLowerCase()=='/en/maker'.toLowerCase())}catch(e){utag.DB(e)}; break;
case '90':try{c[90]|=(d['dom.domain'].toString().indexOf('digikeytest')>-1)||(d['dom.domain'].toString().indexOf('digikeydev')>-1)||(d['dom.domain'].toString().indexOf('digikeytrain')>-1)||(d['dom.domain'].toString().indexOf('developer-preprod')>-1)}catch(e){utag.DB(e)}; break;
case '91':try{c[91]|=(d['dom.domain'].toString().toLowerCase().indexOf('digikeytest'.toLowerCase())<0&&d['dom.domain'].toString().toLowerCase().indexOf('digikeydev'.toLowerCase())<0)}catch(e){utag.DB(e)}; break;
case '97':try{c[97]|=(d['dom.domain'].toString().toLowerCase().indexOf('.cn'.toLowerCase())<0)}catch(e){utag.DB(e)}; break;
case '98':try{c[98]|=(typeof d['ref_page_event']!='undefined'&&d['ref_page_event'].toString().toLowerCase()=='add to cart'.toLowerCase())}catch(e){utag.DB(e)}; break;}}};utag.pre=function() {    utag.loader.initdata();utag.pagevars();    try{utag.loader.RD(utag.data)}catch(e){utag.DB(e)};    utag.loader.loadrules();    };utag.loader.GET=function(){utag.cl={'_all_':1};utag.pre();
  utag.handler.extend=[function(a,b){ try{utag.runonce = utag.runonce || {};utag.runonce.ext = utag.runonce.ext || {};if(typeof utag.runonce.ext[398]=='undefined'){utag.runonce.ext[398]=1;if(1){
// Manage new tagging for testing
utag.data.domain = location.hostname;

//utag.data.testNewTagging = false;
//if (utag.data.domain.indexOf('digikeytest')>-1 || utag.data.domain.indexOf('digikey.ca')>-1) {
//    utag.data.testNewTagging = true;
//}

if (typeof utag.data['ExtRun'] == 'undefined') {
  utag.data["ExtRun"] = "";
}

utag.dkTrk = function(a) {
  if(!(utag.data['ExtRun'].indexOf(a)>0)) {
    if (typeof utag.data['ExtDln'] == 'undefined') {
        if (utag.data['ExtRun'].length > 0) {
           utag.data["ExtDln"] = "||";
        } else {
           utag.data["ExtDln"] = ""; 
        }
     }

    utag.data["ExtRun"] += (utag.data["ExtDln"] + a);
    utag.data["ExtDln"] = "|"; 
  }
  return utag.data['ExtRun'];
}
  

utag.cfg.domainForCookies = location.hostname.match(/\.digikey\..*/)[0];

utag.displayDigiKeyTags = function(a,c)
{
    var tsttag = {};
    for (var i in c){
        if (!i.match(/^cp.|^meta.|^tealium.|^ut.|^dom.|^js_page.|^qp./i)){
            tsttag[i]=c[i];
        }
    }
    utag.DB(a);
    utag.DB(tsttag);
}

utag.readUTMCookie = function(b) {
    if (typeof utag.data.do_not_process_cookies === 'undefined' || utag.data.do_not_process_cookies !== true) {
        var justCookieValues = []; var decodedStr = "";
        var keyValuePairs = [],aKeyValuePair = [];
        if (typeof b['cp.utm_data_x'] != 'undefined' && b['cp.utm_data_x'] !== "") {
            decodedStr = utag.ut.decode(b['cp.utm_data_x']);
            keyValuePairs = decodedStr.split(',');
            for (n = 0; n < keyValuePairs.length; n++) {
                aKeyValuePair = keyValuePairs[n].split("=");
                if ((!utag.data.hasOwnProperty(aKeyValuePair[0]) && !b.hasOwnProperty(aKeyValuePair[0])) || utag.data[aKeyValuePair[0]] === "") {
                    if (aKeyValuePair[1].indexOf('%') < 0) {
                        try {
                            utag.data[aKeyValuePair[0]] = b[aKeyValuePair[0]] = justCookieValues[aKeyValuePair[0]] = decodeURIComponent(aKeyValuePair[1]).replace(/@@/g,',');
                        } catch(e) {}
                    } else {
                        utag.data[aKeyValuePair[0]] = b[aKeyValuePair[0]] = justCookieValues[aKeyValuePair[0]] = aKeyValuePair[1];
                    }
                }else if(aKeyValuePair[0].indexOf('ref_') == 0 || aKeyValuePair[0].indexOf('html_') == 0) {
                    utag.data[aKeyValuePair[0]] = b[aKeyValuePair[0]] = justCookieValues[aKeyValuePair[0]] = aKeyValuePair[1];
                }
            }
            
            utag.dkTrk('398.2');
            b['cp.utm_data_x'] = "";
            utag.displayDigiKeyTags('New Cookie Data',justCookieValues);
        }
        document.cookie = "utm_data_x=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;domain="+utag.cfg.domainForCookies+";"; 
    }
};

//Turned off on 8/5/2020
//Set video_soure to null if not a video event (bc_video)
/*if ((typeof utag.data['video_source'] != 'undefined' || typeof b['video_source'] != 'undefined') && b['event_category'] != 'bc_video') {
    utag.dkTrk('398.3');
    utag.data['video_source'] = "";
}*/

if (window._DATADOG_SYNTHETICS_BROWSER) b.datadog_view = "true";

if (typeof localStorage.ccpa_do_not_track !== 'undefined' ) b.ccpa_do_not_track = 'yes';


}
}} catch(e){ utag.DB(e) }  },
function(a,b){ try{utag.runonce = utag.runonce || {};utag.runonce.ext = utag.runonce.ext || {};if(typeof utag.runonce.ext[356]=='undefined'){utag.runonce.ext[356]=1;if(1){
// Standard Helper Fuctions 356

if (typeof utag.data['js_page.LivePersonSection'] == 'undefined') {
    utag.data['js_page.LivePersonSection'] = "";
}


//utag.cfg.load_rules_at_wait = true;
//utag.cfg.readywait = true;
//utag.cfg.lowermeta = true;

utag.newEventDefaultValues = function(data,linkType,href) {
    if (typeof data.referring_page_event != 'undefined') data.ref_page_event = data.referring_page_event;
    data['ref_page_type'] = utag.data['page_type'] || data['ref_page_type'];
    data['ref_page_sub_type'] = utag.data['page_sub_type'] || data['ref_page_sub_type'];
    data['ref_page_id'] = utag.data['page_id'] ||data['ref_page_id'];
    try {
        var gdprStr = localStorage.getItem('gdpr_cookie_consent');
        var gdpr = JSON.parse(gdprStr);
        data['ccookie'] = gdpr.acceptedOn;
    } catch (e) {utag.DB(e);}
    
    if ("customer_id" in utag.data === true) data['ref_customer'] = utag.data['customer_id'];
    if ("part_id" in utag.data === true) data['ref_part_id'] = utag.data['part_id'];
    if ("pn_sku" in utag.data === true) data['ref_pn_sku'] = utag.data['pn_sku'];
    if ("supplier_id" in utag.data === true) data['ref_supplier_id'] = utag.data['supplier_id'];
    data['ref_page_state'] = utag.data['page_state'] || "";
    data['ref_pers_state'] = utag.data['personalization_state'] || "";
    data['ref_part_search_term'] = utag.data['part_search_term'] || "";
    data['ref_part_search_term_ext'] = utag.data['part_search_term_ext'] || "";
    
    if (linkType == 'link') {
        data.page_type = utag.data.page_type;
        data.page_sub_type = utag.data.page_sub_type;
        data.page_id = utag.data.page_id;
        if (typeof href != 'undefined') {
            if (href.indexOf('tel:') === 0) {
                data['ext_host'] = 'Phone Number';
                data['ext_uri'] = '';
            } else if (href.indexOf('mailto:') === 0) {
                data['ext_host'] = 'Send Email';
                data['ext_uri'] = "";
            } else if (href.indexOf('sms:') === 0) {
                data['ext_host'] = 'Send Text Message';
                data['ext_uri'] = "";
            } else {
                data['ext_host'] = href.substring(href.indexOf('//')+2,href.indexOf('/',10));
                data['ext_uri'] = href.substr(href.indexOf('/',10));
            }
        }
    }
}


utag.dkStdVars = function(data,tag_type,href) {
    data['page_site'] = utag.data['page_site'];
    data['page_language'] = utag.data['page_language'];
    data['page_title'] = utag.data['page_title'];
    data['pre_order_id'] = utag.data['pre_order_id'] || "";
    data['event_domain'] = utag.data['dom.domain'];
    data['event_url'] = utag.data['dom.pathname'];
    data['event_query'] = utag.data['dom.query_string'];
    data['event_referrer_url'] = utag.data['dom.referrer'];
    data['personalization_state'] = utag.data['personalization_state'];
    data['page_state'] = utag.data['page_state'];
    utag.newEventDefaultValues(data,tag_type,href);
}

if (utag.data.doNotTrack === "1" || utag.data.do_not_track === 'yes' || window.doNotTrack === "1") {
    utag.data['do_not_track'] = b['do_not_track'] = 'yes';
} else {
    utag.data['do_not_track'] = b['do_not_track'] = 'no';
}

utag.dkParseStringtoDataObj = function(str){
    var aKeyValuePair = [],returnObj = {};
    var strng = str.replace(';',',');
    var keyValuePairs = strng.split(',');
    for (var n = 0; n < keyValuePairs.length; n++) {
        aKeyValuePair = keyValuePairs[n].split("=");
        returnObj[aKeyValuePair[0]] = aKeyValuePair[1];
    }
    return returnObj;
}

utag.dkValuePairsToProperties = function(VPArray,vObject) {
    for (var i = 0; i < VPArray.length; i++) {
        var pair = VPArray[i].split('=');
        if (pair.length > 1) {
            pair[0] = pair[0].replace(' ','');
            pair[1] = pair[1].replace(/^\s+|\s+$/gm,'');
            vObject[pair[0]] = pair[1];
        }
    }
}

utag.dkConCatPageType = function() {
    var pgType = utag.data['page_type'] || utag_data['page_type'] || "";
    var pgSType = utag.data['page_sub_type'] || utag_data['page_sub_type'] || "";
    return pgType + "-" + pgSType;
}

utag.preserveOriginalUtagData = function() {
    utag.utag_data_at_pageLoad = {};
    utag.utag_data_at_pageLoad['page_title'] = utag.data['dom.title']; //to be overridden if title defined in tag
    for (var i in utag_data) {
        utag.utag_data_at_pageLoad[i] = utag_data[i];
    }
}



}}} catch(e){ utag.DB(e) }  },
function(a,b){ try{utag.runonce = utag.runonce || {};utag.runonce.ext = utag.runonce.ext || {};if(typeof utag.runonce.ext[331]=='undefined'){utag.runonce.ext[331]=1;if(1){
// Specialized Helper Functions 331
if (utag.data.tealium_environment == 'qa') {
  var e = 1;
} 
 
utag.dkAsgnExtLnk = function(a, e) {
  var dest = e.currentTarget.href;
  if(typeof dest != 'undefined') {
    a['ext_location'] = dest;
    a['ext_host'] = dest.substring(dest.indexOf('//')+2,dest.indexOf('/',10));
    a['ext_uri'] = dest.substr(dest.indexOf('/',10));
  }
}
  
    
 utag.assignVideoSource = function (b) {
   try {
   if (typeof b['video_source'] == 'undefined' && typeof utag.data['video_source'] == 'undefined') {
    if (utag.data['ref_page_type'] === 'SP' && utag.data['ref_page_sub_type'] === 'SP')
      {utag.data['video_source'] = 'Supplier Portal';}
    else if (utag.data['ref_page_type'] === 'CP')
      {utag.data['video_source']='Careers';}
    else if (utag.data['page_type'] === 'MK')
      {utag.data['video_source']='Maker';}
    else if ((utag.data['ref_page_type'] === 'DT' && utag.data['ref_page_sub_type'] === 'RE') || (utag.data['ref_page_type'] === 'RE' && utag.data['ref_page_sub_type'] === 'DT'))
      {utag.data['video_source']='Development Tools';}
    else if ((utag.data['ref_page_type'] === 'DT' && utag.data['ref_page_sub_type'] === 'BFA') || (utag.data['ref_page_type'] === 'DT' && utag.data['ref_page_sub_type'] === 'LP'))
      {utag.data['video_source']='Design Tools';} 
    else if (utag.data['ref_page_type'] === 'RE' && utag.data['ref_page_sub_type'] === 'DKE')
      {utag.data['video_source']='Resources';} 
    else if (utag.data['ref_page_type'] === 'BLG')
      {utag.data['video_source']='Blog - The Circuit';}
    else if (utag.data['ref_page_type'] === 'FS' && utag.data['ref_page_sub_type'] === 'CS')
      {utag.data['video_source']='Content Search';}
    else if (utag.data['ref_page_type'] === 'FS' && utag.data['ref_page_sub_type'] === 'PH')
      {utag.data['video_source']='Product Highlight Library';}
    else if ((utag.data['ref_page_type'] === 'FS' && utag.data['ref_page_sub_type'] === 'PTM') || utag.data['ref_page_type'] === 'PTM')
      {utag.data['video_source']='PTM';}
    else if ((utag.data['ref_page_type'] === 'FS' && utag.data['ref_page_sub_type'] === 'VL') || (utag.data['ref_page_type'] === 'VI' && utag.data['ref_page_sub_type'] === 'VL') || (utag.data['ref_page_type'] === 'VL' && utag.data['ref_page_sub_type'] === 'VP'))
      {utag.data['video_source']='Video Library';}
    else if (utag.data['ref_page_type'] === 'HP')
      {utag.data['video_source']='DK Homepage';}
    else if (utag.data['ref_page_type'] === 'IDA')
      {utag.data['video_source']='Industrial Automation';}
    else if (utag.data['ref_page_type'] === 'PS' && utag.data['ref_page_sub_type'] === 'PD')
      {utag.data['video_source']='Part Detail';}
    else if (utag.data['ref_page_type'] === 'RDL')
      {utag.data['video_source']='Reference Design Library';}
    else if (utag.data['ref_page_type'] === 'RE' && utag.data['ref_page_sub_type'] === 'IOT')
      {utag.data['video_source']='IoT Solutions';}
    else if (utag.data['ref_page_type'] === 'SP' && utag.data['ref_page_sub_type'] === 'PH')
      {utag.data['video_source']='Product Highlight Library';}
    else if (utag.data['ref_page_type'] === 'DSP' && utag.data['ref_page_sub_type'] === 'DSP')
      {utag.data['video_source']='Design Service Provider Page';}  
    else if (typeof['page_content_group'] != 'undefined' && decodeURIComponent(utag.data['page_content_group']) == 'Product Highlight')
     {utag.data['video_source']='Product Highlight Library';}
     else if (typeof['page_content_group'] != 'undefined' && decodeURIComponent(utag.data['page_content_group']) == 'Scheme It')
     {utag.data['video_source']='Scheme It';}
     else if (typeof['page_content_group'] != 'undefined' && decodeURIComponent(utag.data['page_content_group']) == 'Blogs')
     {utag.data['video_source']='Blog - The Circuit';}
     else if (typeof['page_content_group'] != 'undefined' && decodeURIComponent(utag.data['page_content_group']) == 'Resources')
     {utag.data['video_source']='Resources';}
     else if (utag.data['ref_page_type'] === 'TZ')
      {utag.data['video_source']='Techzones';}
    else if (utag.data['ref_page_sub_type'] === 'SP')
      {utag.data['video_source']='Supplier Portal';}
    else if ((utag.data['ref_page_type'] === 'DYC' && utag.data['ref_page_sub_type'] === 'PG') || (utag.data['ref_page_type'] === 'ERC' && utag.data['ref_page_sub_type'] === 'HP') || (utag.data['ref_page_type'] === 'RCO' && utag.data['ref_page_sub_type'] === 'RDX') || (utag.data['ref_page_type'] === 'RE' && utag.data['ref_page_sub_type'] === 'RE') || (utag.data['ref_page_type'] === 'TZ' && utag.data['ref_page_sub_type'] === 'SB') || (utag.data['ref_page_type'] === 'PS' && utag.data['ref_page_sub_type'] === 'CAT') || (utag.data['ref_page_type'] === 'PS' && utag.data['ref_page_sub_type'] === 'FAM') || (utag.data['ref_page_type'] === 'HE' && utag.data['ref_page_sub_type'] === 'HE'))
      {utag.data['video_source']='Other';}
    else if (typeof b["qp.video_source"] != 'undefined')
      {utag.data['video_source']=b["qp.video_source"];}
    else if (typeof b["qp.WT.z_video_source"] != 'undefined')
      {utag.data['video_source']=b["qp.WT.z_video_source"];}
    else
      {utag.data['video_source']=utag.data['ref_page_type'] + '_' + utag.data['ref_page_sub_type'];}
  } else {
	// correct video sources defined incorrectly
  }
 } catch (e) {
   utag.DB(e);
 }
} 

utag.InitWTCampaign = function (b) {
  b['social_media_campaign'] = '(Not Set)';
  b['vanity_campaign'] = '(Not Set)';
  b['webapp_campaign'] = '(Not Set)';
  b['aggregator_or_supplier_campaign'] = '(Not Set)';
  b['supplier_landing_page_campaign'] = '(Not Set)';
  b["ExtRun"] = utag.dkTrk('333.1');
}

utag.addPageState = function(newState,b) {
    if (typeof b.page_state === 'undefined') {
        b.page_state = newState;
    } else {
        b.page_state += "," + newState;
    }
}

}}} catch(e){ utag.DB(e) }  },
function(a,b){ try{utag.runonce = utag.runonce || {};utag.runonce.ext = utag.runonce.ext || {};if(typeof utag.runonce.ext[357]=='undefined'){utag.runonce.ext[357]=1;if(1){
// Digikey API - 357


utag.dklink = function(a,href) {
    try {
        if (window.utag_cfg_ovrd.noview === false) {
            utag.dkStdVars(a,'link',href);
            if (typeof a['event_category'] == 'undefined') {
                a['event_category'] = 'Coded Event';
            }
            a['not_a_pageview'] = '1';
            if (a['page_type'] == 'VI' && a['page_sub_type'] == 'BC') {
                a['event_category'] = 'bc_video';
            }
            a["ExtRun"] = utag.dkTrk("357.2");
            utag.link(a);
            
            utag.data['ExtRun'] = "";
            utag.data['ExtDln'] = "";
        }
    } catch (e) {
      utag.DB(e);
    } 
}

utag.dkLink = function(txt) {
    // supports both a string or an object parameter
    var data;
    if (typeof txt === 'string') {
        data = {};
        utag.data.priorityLink = true;
        var kvs = txt.split(';');
        for (var i = 0; i < kvs.length; i++) {
            var pair = kvs[i].split('=');
            data[pair[0]] = pair[1];
        }
        data["ExtRun"] = utag.dkTrk("357.3");
    } else if (typeof txt === 'object') {
        data = txt;
    }
    utag.dklink(data);
    utag.data.priorityLink = false;
}

utag.dkVideo = function(playerId,bcData) {
  var playerids = ["vjs_video_3","popup-player"];
  var elmnt;
  for (i=0;i < playerids.length;i++){
      elmnt = document.getElementById(playerids[i]);
      if (elmnt) {playerId=elmnt.id;}
  }
  //var elmnt = document.getElementById("vjs_video_3") || document.getElementById("popup-player");
  var VPlayer = videojs(playerId).player();
  var data = {};
  utag.assignVideoSource(data);
  data['video_source'] = utag.data['video_source'];
  data['event_category'] = 'bc_video';
  data['event_label'] = bcData['WT.clip_n'];
  //4-23-20 data['event_label'] = VPlayer.mediainfo.name;
  data['ref_page_event'] = bcData['WT.z_event_type'];
  data['playlist_id'] = '(Not Set)';
  data['video_id'] = bcData['WT.clip_id'];
  //4-23-20 data['video_id'] = bcData['WT.z_video_id'];
  //4-23-20 data['video_id'] = VPlayer.mediainfo.id;
  data['page_type'] = 'VI';
  data['page_sub_type'] = 'BC';
  data['content_group'] = 'Video';
  data['content_sub_group'] = 'Brightcove'; 
  var i;
  var KV = [];
  for (i=0; i < VPlayer.mediainfo.tags.length;i++) {
    KV = VPlayer.mediainfo.tags[i].split('=');
    if (KV[0]=='supplierid') {
      //remove ref supplier id to supplier id video assignment
      utag.data['supplier_id'] = KV[1];
      break;
    }
  }
  //remove ref supplier id to supplier id video assignment
  data['supplier_id'] = bcData['WT.z_supplier_id']||utag.data['supplier_id'];

  utag.dklink(data);
}

utag.dkDialogTag = function(title,label,instr) {
    var e = 1;
}

utag.dkView = function(data) {
    // check consent on SPA
    if (utag.data.hasOwnProperty('do_not_track_for_consent') && utag.data.do_not_track_for_consent == 'yes'){return};
    try {
        var idx=0, tdx = "", ds1 = [], ds2 = [],sndData={};
        if (typeof data === 'string') {
            ds1 = data.split(';');
            for (idx = 0; idx < ds1.length; idx++) {
                ds2 = ds1[idx].split('=');
                utag.data[ds2[0]] = sndData[ds2[0]] = ds2[1];
            }
        } else {
            for (tdx in data) {
                utag.data[tdx] = sndData[tdx] = data[tdx];
            }
        }
        
        utag.utag_data_at_pageLoad = utag.utag_data_at_pageLoad || {};
        
        if (utag.data['dom.pathname'].match(/ReviewOrder$/) || utag.data['dom.pathname'].match(/\/products$|\/products\//)
            || utag.data['dom.pathname'].match(/\/pcb-builder\/$/) || utag.data['dom.pathname'].match(/\/antenna-builder\/$/)) {
            sndData.ref_page_event = utag.data['ref_page_event'] || utag.utag_data_at_pageLoad['ref_page_event'] || "";
            sndData.ref_page_type = utag.data['ref_page_type'] || utag.utag_data_at_pageLoad['ref_page_type'] || "";
            sndData.ref_page_sub_type = utag.data['ref_page_sub_type'] || utag.utag_data_at_pageLoad['ref_page_sub_type'] || "";
            sndData.ref_page_id = utag.data['ref_page_id'] || utag.utag_data_at_pageLoad['ref_page_id'] || "";
            sndData.ref_part_search_term = utag.data['ref_part_search_term'] || utag.utag_data_at_pageLoad['ref_part_search_term'] || "";
            sndData.ref_page_state = utag.data['ref_page_state'] || utag.utag_data_at_pageLoad['ref_page_state'] || "";
            sndData.ref_part_search_term_ext = utag.data['ref_part_search_term_ext'] || utag.utag_data_at_pageLoad['ref_part_search_term_ext'] || "";
            sndData.ref_page_category = utag.data['ref_page_category'] || utag.utag_data_at_pageLoad['ref_page_category'] || "";
            sndData.ref_pers_state = utag.data['ref_pers_state'] || utag.utag_data_at_pageLoad['ref_pers_state'] || "";
            sndData.ref_supplier_id = utag.data['ref_supplier_id'] || utag.utag_data_at_pageLoad['ref_supplier_id'] || "";
            sndData.html_element1 = utag.data['html_element1'] || utag.utag_data_at_pageLoad['html_element1'] || "";
            sndData.html_element2 = utag.data['html_element2'] || utag.utag_data_at_pageLoad['html_element2'] || "";
            sndData.html_element3 = utag.data['html_element3'] || utag.utag_data_at_pageLoad['html_element3'] || "";
            sndData.html_element4 = utag.data['html_element4'] || utag.utag_data_at_pageLoad['html_element4'] || "";
//            if (utag.data.tealium_environment === 'prod') utag.setPersonalizationState(sndData);
            utag.setPersonalizationState(sndData);
            
            utag.view(sndData);
            utag_cfg_ovrd.noview = false;
            utag.utag_data_at_pageLoad={};
            return;
        } else {
            sndData.ref_page_type = sndData.ref_page_type || utag.data['page_type'];
            sndData.ref_page_sub_type = sndData.ref_page_sub_type || utag.data['page_sub_type'];
            sndData.ref_page_id = sndData.ref_page_id || utag.data['page_id'];
            if (utag_cfg_ovrd.noview !== true) utag.view(sndData);
        }
    } catch(e) {
      utag.DB(e);
    }
}

utag.dkErrorTag = function(data,errorId,errorData) {
    var tmpData = JSON.parse(JSON.stringify(data));
    tmpData.event_category = 'Error Info';
    tmpData.ref_page_event = errorId;
    tmpData.event_label = errorData;
    tmpData["ExtRun"] = utag.dkTrk("357.5");
    utag.dklink(tmpData);
//    data = JSON.parse(tmpData);
}
  

}}} catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (a === 'link') {
    if (b.event_category !== 'bc_video' && b.event_category !== 'yt_video') {
        utag.dkTrk('398.3');
        b.video_source = "";
    }
}

if (a === 'view') {
    utag.readUTMCookie(b);
    if (b.page_type === 'PS' && b.page_sub_type === 'PD') {
        b.part_search_term = b.part_search_term || b.ref_part_search_term || "";
    }

    if (utag.data.hasOwnProperty('do_not_track_for_consent') && !utag.hasOwnProperty('utag_data_at_pageLoad')) {
        utag.preserveOriginalUtagData();
    }
}


} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
// Process the ST Micro cookie if exists
if (typeof b['cp.dk_mfr_trk'] != 'undefined') {
    var array = b['cp.dk_mfr_trk'].split('|');
    b['st_campaign'] = array[0]; 
    b['st_campaign_supplier_id'] = array[1]; 
    b['manufacturer_part_number'] = array[2];
    switch (b.st_campaign) {
        case "5B9F6B98F0F6469993ADE9F18766EAF8":
            b.st_campaign_supplier_id = "150";
            b.st_campaign_supplier_name = 'Microchip';
            break;
        case "E35982E000A346E1B12F4518478B9CC7":
            b.st_campaign_supplier_id = "497";
            b.st_campaign_supplier_name="ST Micro";
            break;
        case "00B08DD880C0469DA26DFED67F536AB8":
            b.st_campaign_supplier_id = "23";
            b.st_campaign_supplier_name="Molex";
            break;
        case "B9B2EE51216440D986C866CC3CD7B3A0":
            b.st_campaign_supplier_id = "505";
            b.st_campaign_supplier_name="Analog Devices";
            break;
        case "538E657CB6C8494E9EF419215F7C8FCA":
            b.st_campaign_supplier_id = "399";
            b.st_campaign_supplier_name="Kemet";
            break;
        case "70A7B486B5C2495A8F0D9C65B52DDAFF":
            b.st_campaign_supplier_id = "488";
            b.st_campaign_supplier_name="On Semi";
            break;
        case "F230F551EF424A019323EFCB08A41BB7":
            b.st_campaign_supplier_id = "732";
            b.st_campaign_supplier_name="Wurth";
            break;
        case "53BE676DAB6344FFAE01EEB0C6C92A6B":
            b.st_campaign_supplier_id = "296";
            b.st_campaign_supplier_name="TI";
            break;
        case "312C28C68A5A45D4ACA91B2C22CABAB4":
            b.st_campaign_supplier_id = "488";
            b.st_campaign_supplier_name="Infineon";
            break;
        case "1E5B4092C9D741548FCC5715BB65DDCF":
            b.st_campaign_supplier_id = "490";
            b.st_campaign_supplier_name="Murata";
            break;
        case "F8B0D57057FF480F88356419DA3BD23B":
            b.st_campaign_supplier_id = "17";
            b.st_campaign_supplier_name="TE";
            break;
        case "40986DD7EB0F4F11B851F6CD5758A87D":
            b.st_campaign_supplier_id = "945";
            b.st_campaign_supplier_name="Recom";
            break;
        default:
            b.st_campaign_supplier_id = "Unknown";
            b.st_campaign_supplier_name='Unknown';
    }

    utag.dkTrk('300.3');
}

} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
// Set Variables based on Domain - 239


utag.dk = {
    AssignLanguage : function(b,dlang) {
        if (typeof b.page_language == 'undefined' || b.page_language == '(Not Set)') {
            if (typeof b['meta.digikey.fss.language'] != 'undefined') {
              b.page_language = b['meta.digikey.fss.language'];
            }
            else if (typeof b["qp.lang"] != 'undefined') {
                b.page_language = b["qp.lang"];
            }
            else {b.page_language = dlang;}
        }
    },
    
    AssignGT : function(b,gid,site,dlang,region,dcur) {
        b.google_tracking_id = "UA-88355857-" + gid;
        b.page_site = site;
        b.region = region;
        utag.dk['AssignLanguage'](b,dlang);
        b.order_currency = dcur;
    },

    SetAdWord : function(b,id,lbl) {
        b.ad_word_universal_id='AW-'+id;
        b.ad_word_universal_label = lbl;
    },


    SetUniversalAdWord : function(b,id,lbl) {
        b.ad_word_universal_id='AW-'+id+',AW-987442776';
        b.ad_word_universal_label = lbl+',fWozCOSc15ABENjc7NYD';
    },

    SetOptimizely : function(b,id,max_ord_amt) {
        b['optimizely_project_id'] = id;
        if (b['order_subtotal_in_usd'] < max_ord_amt) {
            b['less_than_max_order_size'] = 1;
        }
    },
    SetKenshoo : function(b,token) {
        b.kenshoo_id = '3825';
        b.kenshoo_token = token;
    }
}

var dk = utag.dk;
var AdWordConfirmationIDs = [];
var CurrentAdWordID = 1;
b['AdWordConfirmationIDs'] = AdWordConfirmationIDs;
var dom = b['dom.domain'];
if (/digikeytest\.digikey/i.test(dom) || /digikeydev\.digikey/i.test(dom) || /preprod\.digikey/i.test(dom)){
    b['google_tracking_id_sandbox'] = 'UA-88355857-1';
    //dk.AssignGT(b,1,'US','en','Americas','USD');
if (/digikey\.bg$/i.test(dom)) {
    b['google_tracking_id_staging'] = 'UA-88355857-8';
    dk.AssignGT(b,8,'US','en','Americas','USD');
  }
    if (/digikey\.cn$/i.test(dom)){
    console.log('CN TEST');
    //dk.AssignGT(b,1,'','','','');
    }
    b['clicktail_project_guid'] = '3d60bbfe-3fa3-45c4-9332-cc1534d3e4bd';
  b['region'] = 'Americas'
  dk.SetUniversalAdWord(b,'986885005','jp2jCOPVvgQQjdfK1gM');
  dk.SetOptimizely(b,'546832397','2500');
  //b.marin_client_id = '27490huz44870';
    b.kenshoo_id = '6216';
    utag.data.google_tracking_id1 = 'UA-88355857-1';
      b['bing_id'] = '20044368';
    dk.SetKenshoo(b,'e439b6c3-bbe9-4ab9-b29d-9e56c827d0f9');
}
else if(/digikey\.at$/i.test(dom)){
  dk.AssignGT(b,'9','AT','de','EMEA','EUR');
  b['region'] = 'EMEA'
  dk.SetUniversalAdWord(b,'976480781','TMPqCNPojwcQjdTP0QM');
  //b.marin_client_id = '27490w9b44845';
  dk.SetKenshoo(b,'1a19cf81-3cc1-4767-8bc4-c8dc7aa271ba');
  }
else if (/digikey\.com\.au$/i.test(dom)){
  dk.AssignGT(b,'10','AU','en','APAC','AUD');
  b['bing_id'] = '20044368';
  b['region'] = 'APAC'
  dk.SetUniversalAdWord(b,'929868311','MrZ0CPHf-wcQl9SyuwM');
  //b.marin_client_id = '27490v4c44844';
  dk.SetKenshoo(b,'9d0e0826-4ced-458a-be67-b17c53278de1');
}
else if (/digikey\.be$/i.test(dom)){
  dk.AssignGT(b,'11','BE','nl','EMEA','EUR');
  b['region'] = 'EMEA'
  dk.SetUniversalAdWord(b,'969095129','bM2lCLejxhwQ2e-MzgM');
  //b.marin_client_id = '27490f5a44846';
  dk.SetKenshoo(b,'377fd95c-2cc4-4391-8009-37cfde680b55');
}
else if (/digikey\.bg$/i.test(dom)){
  dk.AssignGT(b,'12','BG','en','EMEA','EUR');
  b['google_tracking_id_staging'] = 'UA-88355857-8';  
  b['region'] = 'EMEA'
}
else if (/digikey\.ca$/i.test(dom)){
  dk.AssignGT(b,'13','CA','en','Americas','CAD');
  b['bing_id'] = '20044366';
  b['region'] = 'Americas'
//  b['google_tracking_id_sandbox'] = 'UA-88355857-1';
//  b['google_tracking_id_staging'] = 'UA-88355857-8';
  dk.SetUniversalAdWord(b,'986753255','oq7mCOGT1gYQ59HC1gM');
  dk.SetOptimizely(b,'546832397','2500');
  //b.marin_client_id = '27490aiz44848';
  dk.SetKenshoo(b,'e28bdea3-04d4-4484-b5fe-3193b0fbd620');
  b['clicktail_project_guid'] = 'f2d6d095-ea80-42e0-a686-8b47d9d214da';
}
else if (/digikey\.ch$/i.test(dom)){
  dk.AssignGT(b,'14','CH','de','EMEA','CHF');
  b['region'] = 'EMEA'
  dk.SetUniversalAdWord(b,'961995131','493cCJmunVYQ-8LbygM');
  //b.marin_client_id = '27490qmj44866';
  dk.SetKenshoo(b,'9690af57-fa0f-4b82-a57b-d6ecc9fa6f33');
}
else if (/digikey\.cn$/i.test(dom)){
  dk.AssignGT(b,'17','CN','zhs','APAC','CNY');
  b['adwords_remarketing_id'] = '966190433';
  b['region'] = 'APAC'
  b.kenshoo_id = '6216';
    dk.SetOptimizely(b,'17272214739','2500');
    b['clicktail_project_guid'] = '4ac915e3-084b-4802-a8a0-e27758930263';
  dk.SetKenshoo(b,'e2b59db2-2159-4207-b659-dba3fe81f429');
}
else if (/digikey\.cz$/i.test(dom)){
  dk.AssignGT(b,'16','CZ','cz','EMEA','CZK');
  b['region'] = 'EMEA'
}
else if (/digikey\.de$/i.test(dom)){
  dk.AssignGT(b,'19','DE','de','EMEA','EUR');
//  b['adwords_remarketing_id'] = '987990740';
  
  b['twitter_pid']='I4rz4';
  b['bing_id'] = '20044364';
  b['region'] = 'EMEA'
  dk.SetUniversalAdWord(b,'987990740','_unPCLylxgcQ1JWO1wM');
  dk.SetOptimizely(b,'2342910375','4000');
  b['clicktail_project_guid'] = '359f1ac2-6ae6-499d-a3e2-0c0a64bb3273';
  //b.marin_client_id = '27490ol144851';
  dk.SetKenshoo(b,'d5dd3389-447f-43d3-b6c6-aa9a8b7a28db');
}
else if (/digikey\.dk$/i.test(dom)){
  dk.AssignGT(b,'18','DK','da','EMEA','DKK');
  b['region'] = 'EMEA'
  dk.SetUniversalAdWord(b,'965467474','udvBCM-B1VYQ0rqvzAM');
  //b.marin_client_id = '27490p8d44849';
  dk.SetKenshoo(b,'bb8ca9a8-1338-41e9-88d5-c802f86120d7');
}
else if (/digikey\.ee$/i.test(dom)){
  dk.AssignGT(b,'20','EE','en','EMEA','EUR');
  b['region'] = 'EMEA'
}
else if (/digikey\.es$/i.test(dom)){
  dk.AssignGT(b,'21','ES','en','EMEA','EUR');
  b['region'] = 'EMEA';
  b['bing_id'] = '20114635';
  dk.SetUniversalAdWord(b,'971633003','xkbUCNXKgwkQ6-KnzwM');
  //b.marin_client_id = '27490hhi44864';
  dk.SetKenshoo(b,'828e1067-a76d-481b-8c10-3f1b213e6345');
}
else if (/digikey\.fi$/i.test(dom)){
  dk.AssignGT(b,'23','FI','fi','EMEA','EUR');
  b['region'] = 'EMEA';
  dk.SetUniversalAdWord(b,'962854095','xxO0COy1-lUQz_mPywM');
  //b.marin_client_id = '274908ii44454';
  dk.SetKenshoo(b,'ed171b38-9230-4fe4-a5d9-95f822c80db0');
}
else if (/digikey\.fr$/i.test(dom)){
  dk.AssignGT(b,'22','FR','fr','EMEA','EUR');
  b['twitter_pid']='I4rz4';
  b['bing_id'] = '20044369';
  b['region'] = 'EMEA';
  dk.SetUniversalAdWord(b,'999892546','j1SCCKaZ9AYQwszk3AM');
  //b.marin_client_id = '27490bvp44850';
  dk.SetKenshoo(b,'4f524516-4686-4f1c-bb9b-4601f6b8233a');
}
else if (/digikey\.gr$/i.test(dom)){
  dk.AssignGT(b,'25','GR','en','EMEA','EUR');
  b['region'] = 'EMEA';
}
else if (/digikey\.hk$/i.test(dom)){
  dk.AssignGT(b,'24','HK','en','APAC','HKD');
  b['bing_id'] = '20044370';
  b['region'] = 'APAC';
  dk.SetUniversalAdWord(b,'966544232','xv2rCLCk5QkQ6JbxzAM');
  //b.marin_client_id = '27490k4944852';
  dk.SetKenshoo(b,'149c8211-6a62-4ef3-afe1-d755ca9a1681');
}
else if (/digikey\.hu$/i.test(dom)){
   dk.AssignGT(b,'26','HU','hu','EMEA','HUF');
  b['region'] = 'EMEA';
}
else if (/digikey\.ie$/i.test(dom)){
  dk.AssignGT(b,'27','IE','en','EMEA','EUR');
  b['region'] = 'EMEA';
  dk.SetUniversalAdWord(b,'992690842','enAsCJaIxgYQmoWt2QM');
  //b.marin_client_id = '27490ne544854';
  dk.SetKenshoo(b,'0ada730a-b1f3-43cd-a990-bd701c4d0f8c');
}
else if (/digikey\.co\.il$/i.test(dom)){
  dk.AssignGT(b,'29','IL','en','EMEA','ILS');
  b['adwords_remarketing_id'] = '964542947';
  b['region'] = 'EMEA';
  dk.SetUniversalAdWord(b,'964542947','9Py7CODxqFYQ44P3ywM');
  //b.marin_client_id = '27490y1d44455';
  dk.SetKenshoo(b,'13248446-c542-40f5-b4b0-015519661575');
}
else if (/digikey\.it$/i.test(dom)){
  dk.AssignGT(b,'28','IT','it','EMEA','EUR');
  b['bing_id'] = '20060577';
  b['twitter_pid']='I4rz4';
  b['region'] = 'EMEA';
  dk.SetUniversalAdWord(b,'975409889','JFkvCJf6vhsQ4aWO0QM');
  b.marin_client_id = '27490mu044855';
  dk.SetKenshoo(b,'4eaabc39-1f05-47b0-a275-2a7c79167a73');
}
else if (/digikey\.jp$/i.test(dom)){
  dk.AssignGT(b,'30','JP','ja','APAC','JPY');
  b['region'] = 'APAC'
  dk.SetUniversalAdWord(b,'982810753','AaoBCO--1QUQgYHS1AM');
  dk.SetOptimizely(b,'3579530909','4000');
  b['clicktail_project_guid'] = '4164d9a2-4c6a-46d3-b7d1-3a9f57b01dab';
  //b.marin_client_id = '27490x9444856';
  dk.SetKenshoo(b,'0eee8d81-8d67-42cf-855d-ca3702c539b4');
}
else if (/digikey\.kr$/i.test(dom)){
  dk.AssignGT(b,'31','KR','ko','APAC','KRW');
//  b['google_tracking_id_sandbox'] = 'UA-88355857-1';
  b['region'] = 'APAC';
   b['clicktail_project_guid'] = '4ac915e3-084b-4802-a8a0-e27758930263';
  dk.SetUniversalAdWord(b,'967069669','-6ZeCIvMvwoQ5Z-RzQM');
  //b.marin_client_id = '27490lb344857';
  dk.SetKenshoo(b,'26c28cda-307e-4b0f-ab22-2fd0dac4e054');
}
else if (/digikey\.lt$/i.test(dom)){
  b['region'] = 'EMEA'
  dk.AssignGT(b,'32','LT','en','EMEA','EUR');
}
else if (/digikey\.lu$/i.test(dom)){
  b['region'] = 'EMEA'
  dk.AssignGT(b,'33','LU','en','EMEA','EUR');
}
else if (/digikey\.lv$/i.test(dom)){
  b['region'] = 'EMEA'
  dk.AssignGT(b,'35','LV','en','EMEA','EUR');
}
else if (/digikey\.com\.mx$/i.test(dom)){
  dk.AssignGT(b,'34','MX','es','Americas','USD');
  b['region'] = 'Americas'
  dk.SetUniversalAdWord(b,'968133679','UmMZCKHW2wgQr5jSzQM');
  //b.marin_client_id = '27490ngz44858';
  dk.SetKenshoo(b,'0c556518-9b15-4c0c-bb5a-9f82c3446e7c');
}
else if (/digikey\.nl$/i.test(dom)){
  dk.AssignGT(b,'36','NL','nl','EMEA','EUR');
  b['region'] = 'EMEA'
  dk.SetUniversalAdWord(b,'973802402','LvzfCI6mxAkQopes0AM');
  //b.marin_client_id = '274903oa44859';
  dk.SetKenshoo(b,'3c94a96f-79b5-460c-aa74-91df061ea935');
}
else if (/digikey\.no$/i.test(dom)){
  dk.AssignGT(b,'37','NO','no','EMEA','NOK');
  b['region'] = 'EMEA'
  dk.SetUniversalAdWord(b,'960334832','e1PoCJTBnFcQ8Jf2yQM');
  //b.marin_client_id = '274903ud44860';
  dk.SetKenshoo(b,'0c33f525-b349-4895-9be8-5aa0e61af76a');
}
else if (/digikey\.co\.nz$/i.test(dom)){
  dk.AssignGT(b,'39','NZ','en','APAC','NZD');
  b['region'] = 'APAC'
  dk.SetUniversalAdWord(b,'990617294','XFmjCNKu3QcQzr2u2AM');
  //b.marin_client_id = '274903bu44451';
  dk.SetKenshoo(b,'b76563f5-ed23-4449-9565-657d7f368639');
}
else if (/digikey\.pl$/i.test(dom)){
  b['region'] = 'EMEA';
  dk.SetUniversalAdWord(b,'789488977','h4_ICPrk1YgBENHKuvgC');
  dk.AssignGT(b,'38','PL','pl','EMEA','PLN');
  //b.marin_client_id = '274903m763794';
  dk.SetKenshoo(b,'217f8219-b710-4607-b90a-3c834cc7efd6');
}
else if (/digikey\.pt$/i.test(dom)){
  dk.AssignGT(b,'41','PT','pt','EMEA','EUR');
  dk.SetUniversalAdWord(b,'966398518','4l-FCOW8mlYQtqTozAM');
  b['region'] = 'EMEA';
  //b.marin_client_id = '27490rx444861';
  dk.SetKenshoo(b,'84a4bfbc-820e-467f-86f3-e0117985b7a5');
}
else if (/digikey\.se$/i.test(dom)){
  dk.AssignGT(b,'40','SE','sv','EMEA','SEK');
  b['region'] = 'EMEA'
  dk.SetUniversalAdWord(b,'973880654','HhMnCOjPx1YQzvqw0AM');
  //b.marin_client_id = '27490l5s44865';
  dk.SetKenshoo(b,'cdaacde9-0c80-461e-bd3c-1695b23f6c43');
}
else if (/digikey\.si$/i.test(dom)){
  dk.AssignGT(b,'43','SI','en','EMEA','EUR');
  b['region'] = 'EMEA'
}
else if (/digikey\.sg$/i.test(dom)){
  dk.AssignGT(b,'42','SG','en','APAC','SGD');
  b['bing_id'] = '20044371';
   b['region'] = 'APAC'
 dk.SetUniversalAdWord(b,'966710723','o1CsCK_kt1YQw6v7zAM');
 //b.marin_client_id = '27490i3244862';
 dk.SetKenshoo(b,'fd92387b-5b32-4311-9a64-dadee10c461b');
}
else if (/digikey\.sk$/i.test(dom)){
  dk.AssignGT(b,'45','SK','en','EMEA','EUR');
  b['region'] = 'EMEA'
}
else if (/digikey\.tw$/i.test(dom)){
  dk.AssignGT(b,'44','TW','zht','APAC','TWD');
  b['bing_id'] = '20044367';
  b['region'] = 'APAC'
  dk.SetUniversalAdWord(b,'972972209','kDvmCJ_5vhsQscH5zwM');
  //b.marin_client_id = '2749098744867';
  dk.SetKenshoo(b,'a2b5f8b0-ea4a-442d-bae0-862301fdb0d8');
}
else if (/digikey\.co\.uk$/i.test(dom)){
  dk.AssignGT(b,'47','UK','en','EMEA','GBP');
  b['twitter_pid']='I4rz4';
  b['bing_id'] = '20044365';
  b['region'] = 'EMEA';
   b['clicktail_project_guid'] = '4ac915e3-084b-4802-a8a0-e27758930263';
  dk.SetUniversalAdWord(b,'991776014','aeG6CPqyywcQjpr12AM');
  //b.marin_client_id = '27490ndg44869';
  dk.SetKenshoo(b,'659a7eaa-e380-4579-8284-47fba1864c7d');
}
else if (/digikey\.com$/i.test(dom)){
  dk.AssignGT(b,'46','US','en','Americas','USD');
  b['bing_id'] = '20044363';
  b['region'] = 'Americas'
  //US Site
  dk.SetUniversalAdWord(b,'986885005','jp2jCOPVvgQQjdfK1gM')
  dk.SetOptimizely(b,'346228540','4500');
  b['clicktail_project_guid'] = '3d60bbfe-3fa3-45c4-9332-cc1534d3e4bd';
  //b.marin_client_id = '27490huz44870';
    dk.SetKenshoo(b,'e439b6c3-bbe9-4ab9-b29d-9e56c827d0f9');
}
else if (/digikey\.us/i.test(dom)){
  dk.AssignGT(b,'46','US','en','Americas','USD');
  b['region'] = 'Americas';
  //US Site
  //b['clicktail_project_guid'] = '3d60bbfe-3fa3-45c4-9332-cc1534d3e4bd';

}
else if (/digikey\.in$/i.test(dom)){
  dk.AssignGT(b,'49','IN','en','APAC','USD');
//  b['adwords_remarketing_id'] = 'AW-980367696';
  dk.SetUniversalAdWord(b,'980367696','8lpmCJi_pocBENDyvNMD');  
  b['region'] = 'APAC'
  b.marin_client_id = '2749046d44853';
  dk.SetOptimizely(b,'13631720521','4500');
  b['clicktail_project_guid'] = '4ac915e3-084b-4802-a8a0-e27758930263';
  dk.SetKenshoo(b,'1eee6668-db70-49c9-a962-b08bceef9674');
}
else if (/digikey\.my$/i.test(dom)){
  dk.AssignGT(b,'48','MY','en','APAC','MYR');
  b['region'] = 'APAC'
  b['bing_id'] = '20114634';
  dk.SetUniversalAdWord(b,'837569373','vd26CPqL-3QQ3ZaxjwM');
  //b.marin_client_id = '274905bu61470';
  dk.SetKenshoo(b,'192a91d4-9a39-4da3-949c-d2acf1aa837a');
}
else if (/digikey\.ro$/i.test(dom)){
  dk.AssignGT(b,'51','RO','ro','EMEA','RON');
  b['region'] = 'EMEA'
}
else if (/digikey\.ph$/i.test(dom)){
  dk.AssignGT(b,'59','PH','en','APAC','PHP');
//  b['adwords_remarketing_id'] = '991414342';
  dk.SetUniversalAdWord(b,'779924707','4QzHCJr46ZMBEOPp8vMC');
  //b.marin_client_id = '27490paf64099';
  dk.SetKenshoo(b,'1fbbbd3f-2c62-4028-8b02-f79a47725772');
}
else if (/digikey\.co\.th$/i.test(dom)){
  dk.AssignGT(b,'60','TH','th','APAC','THB');
//  dk.AssignGT(b,'60','TH','en','APAC','THB');
//  b['adwords_remarketing_id'] = '991414342';
  dk.SetUniversalAdWord(b,'779926364','CmZzCOD-75MBENz28vMC');
  //b.marin_client_id = '27490job64063';
  dk.SetKenshoo(b,'9c07e995-3b2d-4ed2-8cf6-4f8f7fc907e0');
}
else if (/digikey\.co\.za$/i.test(dom)){
  dk.AssignGT(b,'50','ZA','en','EMEA','ZAR');
//  b['adwords_remarketing_id'] = 'AW-958453091';
  dk.SetUniversalAdWord(b,'958453091','wfZjCMbtw1cQ46qDyQM');
  b['region'] = 'EMEA';
  //b.marin_client_id = '27490ns144863';
  dk.SetKenshoo(b,'9b608007-492c-40ca-acbb-fabcb2b2c676');
};
b['Google_tracking_name'] = 'Production';
b['google_tracking_name_sandbox'] = 'Sandbox';
b['google_tracking_name_staging'] = 'Staging';
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (b.page_type === 'Ordering' && b['dom.pathname'] === '/ordering/SubmitOrderConfirmView') {
    b.page_type = 'SC';
    b.page_sub_type = 'SCN';
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){

utag.dkSetConsentValues = function(consentStatus) {
    if (consentStatus === 'noConsent') {
        b.do_not_track_for_consent = utag.data.do_not_track_for_consent = 'yes';
        window.utag_cfg_ovrd.noview = true;
        window.utag_cfg_ovrd.nocookie=true;
        utag.cfg.noview = true;
        window['ga-disable-'+utag.data.google_tracking_id1] = true;
    } else {
        b.do_not_track_for_consent = utag.data.do_not_track_for_consent = 'no';
        window.utag_cfg_ovrd.noview = false;
        window.utag_cfg_ovrd.nocookie=false;
        utag.cfg.noview = false;
        window['ga-disable-'+utag.data.google_tracking_id1] = false;
        if(/\/\w{2}\/products\//.test(location.pathname)||/antenna-builder/.test(location.pathname)){
            window.utag_cfg_ovrd.noview = true;
            utag.cfg.noview = true;
        }

    }
}

utag.dkSetConsentValues('noConsent');
if (window.localStorage.getItem('gdpr_cookie_consent') !== null) {
    utag.dkSetConsentValues('Consented');
} else if (typeof utag.data['ccookie'] != 'undefined') {
    window.localStorage.setItem('gdpr_cookie_consent',JSON.stringify({ "acceptedOn":utag.data['ccookie']}));
    utag.dkSetConsentValues('Consented');
}

if (b.do_not_track_for_consent === 'yes') {
    utag.preserveOriginalUtagData();
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (b['dom.domain'].search(/digikey.cn$/i)) {
    if (b.page_type === 'SC' && b.page_sub_type === 'CO' && b.ref_page_event === 'Add to Cart') {
        b.Kenshoo_conversion_type = 'add_to_cart';
    } else if (b['dom.pathname'] === '/ordering/OrderWorkflow' && b['dom.referrer'].indexOf('ShoppingCartView')) {
        b.Kenshoo_conversion_type = 'purchase_button_click';
    } else if ((b.page_type === 'MDK' && b['dom.query_string'].indexOf('newRegistration') > -1) || (b.page_sub_type === 'NR' && b.ref_page_event === 'Submit Registration')) {
        b.Kenshoo_conversion_type = 'registration';
    } else if ((b.page_type === 'MDK' && b.ref_page_event === 'Complete Registration')|| (b.ref_page_event === 'Continue Registration')) {
        b.Kenshoo_conversion_type = 'create_account';
    }
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{utag.runonce = utag.runonce || {};utag.runonce.ext = utag.runonce.ext || {};if(typeof utag.runonce.ext[447]=='undefined'){utag.runonce.ext[447]=1;if(1){
// The following will need to be run after the user has given consent.
utag.dkCollectConsentData = function(gdpr,tags) {
    utag.consentData = {
        "consentDate" : "",
        "expirationDate" : "",
        "digiKeyApplication" : "digikey.com",
        "consentVersion" : "ver 1.0",
        "typeOfConsent" : "Cookie"
    };
    
//    tags['ipAddress'] = utag.IPData['ip'];
    
    utag.consentData['consentDate'] = gdpr.acceptedOn;
    var jDate = new Date(gdpr.acceptedOn);
    var year = jDate.getFullYear();
    var month = jDate.getMonth();
    var date = jDate.getDate();
    
    utag.consentData['expirationDate'] = new Date(jDate.getFullYear()+1,jDate.getMonth(),jDate.getDate());
    tags['consentData'] = JSON.stringify(utag.consentData);
    
};
}
}} catch(e){ utag.DB(e) }  },
function(a,b){ try{utag.runonce = utag.runonce || {};utag.runonce.ext = utag.runonce.ext || {};if(typeof utag.runonce.ext[451]=='undefined'){utag.runonce.ext[451]=1;if(1){
utag.framework = utag.framework||{};

utag.evergageTable = {};
utag.evergageTable['4h3x0']=['Supplier Cookies - ST Micro','Product Search Ad','Part Search Banner Click (e)'];
utag.evergageTable['60P2m']=['All Users','Badging on Part Detail Page - VREG','VREG Part Detail Promotion Click (e)'];
utag.evergageTable['7NNvd']=['All Users','Badging on Part Detail Page - EEPROMM','EEPROMM Part Detail Promotion Click (e)'];
utag.evergageTable['ys8D2']=['All Users','My History Toolbar','Click My History (e)'];
utag.evergageTable['AqntD']=['All Users','Articles for Users Without Supplier Cookie','Select Article w/o Supplier Cookie (e)'];
utag.evergageTable['C09C7']=['Supplier Cookies - Recom','Product Search Ad','Part Search Banner Click (e)'];
utag.evergageTable['E4yfp']=['Supplier Cookies - Microchip','Homepage Banner','Homepage Banner Click (e)'];
utag.evergageTable['FJq3q']=['All Users','Articles for Users With Supplier Cookie','Select Article with Supplier Cookie (e)'];
utag.evergageTable['hr425']=['Supplier Cookies - Analog Devices','Product Search Ad','Part Search Banner Click (e)'];
utag.evergageTable['IZQj2']=['Supplier Cookies - ST Micro','Homepage Banner','Homepage Banner Click (e)'];
utag.evergageTable['m8NwK']=['Supplier Cookies','Supplier Web2Web Navigation','Header Nav (e)'];
utag.evergageTable['MHlVe']=['Supplier Cookies - Analog Devices','Homepage Banner','Homepage Banner Click (e)'];
utag.evergageTable['nUzP0']=['Supplier Cookies - ONSemi','Homepage Banner','Homepage Banner Click (e)'];
utag.evergageTable['oDgjU']=['Supplier Cookies - Microchip','Product Search Ad','Part Search Banner Click (e)'];
utag.evergageTable['ORkOm']=['Supplier Cookies - Molex','Homepage Banner','Part Search Banner Click (e)'];
utag.evergageTable['QF7OB']=['Supplier Cookies - Molex','Product Search Ad','Part Search Banner Click (e)'];
utag.evergageTable['RSQCM']=['All Users','Articles for Users With Supplier Cookie','Select Article with Supplier Cookie (e)'];
utag.evergageTable['VxDgx']=['Supplier Cookies - Recom','Homepage Banner','Part Search Banner Click (e)'];
utag.evergageTable['XcUiS']=['Supplier Cookies - ONSemi','Product Search Ad','Part Search Banner Click (e)'];
utag.evergageTable['KoMS8']=['Supplier Cookies - Recom','Homepage Banner','Part Search Banner Click (e)'];
utag.evergageTable['wEPZK']=['Supplier Cookies - ONSemi','Product Search Ad','Part Search Banner Click (e)'];

utag.framework.lookupForEvergage = function(perData) {
    if (utag.evergageTable.hasOwnProperty(perData.evergageID)) {
        perData.personalization_program = utag.evergageTable[perData.evergageID][0];
        perData.personalization_creative = utag.evergageTable[perData.evergageID][1];
        return utag.evergageTable[perData.evergageID][2];
    }
};

utag.framework.assignEvergageValues = function(element,tags) {
    evergageID = element.id;
    if (evergageID !== "") {
        tags.evergageID = evergageID.substr(-5);
        utag.framework.lookupForEvergage(tags);
        if (tags.hasOwnProperty('personaliztion_program'))
        {
            tags.ref_page_event = "Impression";
            tags.event_category = 'Personalization';
            tags.event_label = 'Evergage';
            if (tags.personalization_program.match(/Supplier Cookie/i)) {
                utag.dkSaveSupplierCookieRules(tags);
            } else {
                utag.dklink(tags);
            }
        }
    }
}
    

}
}} catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
// 457
utag.framework['isOrderConfirmationHTML'] = function(b,eventType) {
    retVal = false;
    var OrderConfirmationPage = (document.getElementById('isOrderConfirmation'));
    if (!OrderConfirmationPage) {
        OrderConfirmationPage = (document.getElementsByClassName('reference-info').length > 0);
    }
    if (!OrderConfirmationPage && b['dom.domain'].indexOf('digikey.cn') >= 0) {
        OrderConfirmationPage = (document.getElementById('submittedLblId'));
    }
    
    if (OrderConfirmationPage) retVal = true;
    return retVal;
};

utag.framework['isOrderConfirmation'] = function(b,eventType) {
    var retVal = false;

    if (eventType === 'view') {
        if ((b.page_type === 'SC' && (b.page_sub_type === 'POR' || b.page_sub_type === 'SCN')) || (b.page_type === 'Ordering')){
            if (b.ref_page_event === "Submit Order") {
                if ((typeof b.order_salesorder_number === 'undefined' || b.order_salesorder_number === 0 || b.order_salesorder_number === '0')
                    && (typeof b.marketplace_sales === 'undefined')){
                        retVal = false;
                    } else {
                        retVal = utag.framework['isOrderConfirmationHTML'](b,eventType);
                    }
            }
        }
    } else {
        if (utag.framework['isOrderConfirmationHTML'](b,eventType) && utag.data['is_confirmation_page'] === 'true') retVal = true;
    }
    
    return retVal;
};

utag.framework['ClearTransaction'] = function(b) {
    b.order_salesorder_number = "";
    b.order_weborder_number = "";
    b.order_id = "";
    b.product_quantity = "";
    b.product_sku = "";
    b.product_extended_prices = '';
    b.order_subtotal = '';
    b.order_currency = '';
    b.company_type = '';
    b.webtrends_conversion = '';
    b.transaction_type = '';
    b.transaction_date = '';
    b.transaction_time = '';
    b.ti_revenue = '';
    b.ti_part_qty = '';
    b.order_subtotal_in_usd = "";
    b.product_unit_prices = '';
    b.product_number = '';
    b['_ctotal'] = "";
    b.marketplace_sales="";
    b.marketplace_revenue_usd="";
}

if (a=== 'view') {
    try {
        // is_confirmation_page has to be a string because it's used in a load rule
        if (b.page_type === 'SC') {
            b['is_confirmation_page'] = 'false';
            if (utag.framework['isOrderConfirmation'](b,a)) {
                if (typeof b.js_page === 'undefined') b.js_page = {};
                b.page_sub_type = 'SCN';
                b.page_id = 'SCN';
                b.page_content_sub_group = 'Submit Order';
                b.page_title = 'Shopping Cart - Submit';
                b.sales_order_id = b.order_salesorder_number;
                b['is_confirmation_page'] = 'true';
                window.utag_cfg_ovrd.ga_noview = true;
                utag.DB("Process Order Confirmation - Supress PageView?");
                utag.data["newCustomer"] = false;
                if (typeof b.customer_id === 'undefined' || b.customer_id ==='0') utag.data["newCustomer"] = true;
                if (b['order_subtotal_in_usd']>=500000) {
                    b['order_subtotal_in_usd'] = utag.data['order_subtotal_in_usd'] = 1;
                    b['_ctotal'] = '1';
                }
            } else {
                if (typeof b['js_page.window.cart2'] == 'undefined'){utag.framework['ClearTransaction'](b)};
                if (utag.framework['isOrderConfirmationHTML'](b,a)) {
                    b.page_sub_type = 'PCN';
                    b.page_id = 'PCN';
                    b.page_content_sub_group = 'Review Order Confirmation';
                    b.page_title = 'Review Order Confirmation';
                    b.is_confirmation_page = 'false';
                    b.tealium_event = "";
                }
            }
        }
    } catch (err) {
        data['ExtRun'] = utag.dkTrk('457.1-e');
        utag.dkErrorTag(data,err.name,err.message);
    }
}


} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
utag.setPersonalizationState = function (data) {
    try {
        var pstate = {};
        if (typeof utag.data['personalization_state'] === 'object') pstate = utag.data['personalization_state'];
        var pers_state = pstate || {};
        utag.data['personalization_state'] = data.personalization_state = JSON.stringify(pers_state);
        utag["ExtRun"] = utag.dkTrk('459.1');  // Remove this line after confirm method executed each hit
    } catch (e) {
        data['ExtRun'] = utag.dkTrk('459.1-e');
        utag.dkErrorTag(data,err.name,err.message + '459.1-e');
        utag.DB(err)
    }
};

} } catch(e){ utag.DB(e) }  },
function(a,b){ try{utag.runonce = utag.runonce || {};utag.runonce.ext = utag.runonce.ext || {};if(typeof utag.runonce.ext[466]=='undefined'){utag.runonce.ext[466]=1;if(1){
utag.setTag = function(element,value,tagType) {
    if (typeof element === 'undefined' || element === null) return;
    element.removeAttribute('ref_page_event');
    element.removeAttribute('cookie-tracking');
    element.removeAttribute('track-data');
    var tgtp = (typeof tagType === 'undefined') ? 'ref_page_event' : tagType;
    if (tgtp === 'ref_page_event') {
        utag.dkTrk('432.1');
        element.setAttribute(tgtp,value);
    } else {
        utag.dkTrk('432.2');
        element.setAttribute(tgtp,'ref_page_event='+value);
    }
};
    
utag.insertTag = function(elmType,attr,value,page_type,page_sub_type,instance,tagType) {
    var i = 0, x,vrr={};
    var itm = (typeof instance !== 'number') ? 0 : instance;
//    var tgtp = (typeof tagType === 'undefined') ? 'ref_page_event' : tagType;
    if ((typeof page_type === 'undefined' && typeof page_sub_type === 'undefined')
        || (page_type === null && page_sub_type === null)
        || (utag_data.page_type === page_type && (utag_data.page_sub_type === page_sub_type || page_sub_type === 'all'))) {
        if (elmType === 'class') {
            if (instance !== 'all') {
                x = document.getElementsByClassName(attr)[itm];
                utag.setTag(x,value,tagType);
            } else if (instance === 'all') {
                x = document.getElementsByClassName(attr);
                if (typeof x !== 'undefined') {
                    for (y = 0; y < x.length; y++) {
                        vrr = x[y];
                        utag.setTag(vrr,value,tagType);
                    }
                }
            }
        } else {
            x = document.getElementById(attr);
            utag.setTag(x,value,tagType);
        }
    }
};

// Testing
if (utag.data['ut.env'] === 'qa') {
//    if (utag.data['page_type'] === 'RE' && utag.data['page_sub_type'] === 'DKE') {
//       var elmt = document.getElementsByClassName('featured-container')[0]; 
//       elmt.id = 'evergage-tooltip-ambIZQj2'
//    }
}

// Header - Footer
utag.insertTag('class','button-desktop','Consent or View Privacy',null,null,0,'track-data');
utag.insertTag('class','button-mobile','Consent or View Privacy',null,null,0,'track-data');
utag.insertTag('class','footer__column--contact','Footer Nav - Contact Us',null,null,0,'track-data');
utag.insertTag('class','header__logo','Header Nav;ref_page_category=Logo',null,null,'all','cookie-tracking');
utag.insertTag('class','header__links','Header Nav - Upper Left',null,null,'all','cookie-tracking');


}
}} catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
b.query_string = b['dom.query_string'];
if (b.query_string.match(/email=/) && !(b.query_string.match(/z_email=/))) {
    var startp = b.query_string.indexOf('email=');
    b.query_string = b.query_string.substring(b.query_string.indexOf('&',startp)+1);
    }
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (a === 'view') {
    if (b['dom.pathname'].match(/ReviewOrder$/) || b['dom.pathname'].match(/\/pcb-builder\/$/)
        || b['dom.pathname'].match(/en\/products/)) {
        if (b['dom.pathname'].match(/ReviewOrders$/)) {
            b.page_type = 'MDK';
            b.page_sub_type = 'RO';
            b.page_id = 'RO';
        }
        b.sales_order_id = utag.data['sales_order_id'] || "";
        if (typeof utag_cfg_ovrd.viewProcessed == 'undefined' || utag_cfg_ovrd.viewProcessed === false) {
            utag.preserveOriginalUtagData();
            window.utag_cfg_ovrd.noview = true;
            utag.cfg.noview = true;
        } else {
            window.utag_cfg_ovrd.noview = false;
            utag.cfg.noview = false;            
        }
        utag_cfg_ovrd.viewProcessed = true;
    }
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
/* This code is waiting until the part list before sending the purchase pageview.

This also ties to a change in the Google template that removes the sending of the
transaction data on pageview.
*/

utag.ga = utag.ga||{};

utag.ga['sendProductListforPurchase'] = function(data) {
    var idx=0;
    var env = (utag.data['tealium_environment'] === 'qa') ? 'Sandbox' : 'Production';
    for (idx; idx < data.part_id_a.length; idx++)
    {
        var g = {};
        g.id = data.part_id_a[idx];
//        g.name = data.part_description_a[idx];
        g.brand = data.supplier_id_a[idx];
        g.price = data.line_item_price_a[idx];
        g.quantity = data.part_qty_a[idx];
        g.dimension114 = data.part_id_a[idx];
//        g.dimension115 = data.stock_status_a[idx];
//        g.dimension116 = data.web_id_a[idx];
//        g.dimension137 = data.part_type_a[idx];
        ga(env+'.ec:addProduct',g);
    }
}

utag.ga['sendPurchaseEvent'] = function() {
    var u = utag.data;
    var env = (utag.data['tealium_environment'] === 'qa') ? 'Sandbox' : 'Production';
    var transdata ={
        id : u.order_weborder_number,
        affiliation : "",
        revenue : u.total_order_subtotal_usd,
        shipping: "",
        tax: "",
        coupon : ""
    };
    var pageviewData  = {
        dimension8: u.ref_page_type,
        dimension12: u.ref_page_sub_type,
        dimension9: u.ref_page_id,
        dimension10: u.ref_page_event,
        dimension82: u.registered_user_id,
        metric1: u.init_srch_count,
        dimension65: u.pre_order_id,
        dimension71: u.order_currency,
        metric3: u.order_subtotal,
        dimension75: u.sales_order_id,
        dimension95: u.ref_customer,
        dimension103: u.company_type,
        dimension72: u.ExtRun,
        dimension25: u.google_cust_id,
        dimension117: u.html_element1,
        dimension120: u.html_element2,
        dimension121: u.html_element3,
        dimension122: u.html_element4,
        dimension127: u.page_state,
        dimension135: u.marketplace_sales,
        metric7: u.marketplace_revenue_usd,
        dimension136: u.personalization_state,
        dimension138: u.vendor_type,
        dimension30: u.query_string,
        dimension140: u.ref_pers_state
    };
    window['ga-disable-' + utag.data.google_tracking_id1] = false;
    ga(env+'.ec:setAction','purchase',transdata);
//        ga(env+'.send','event','UX','Purchase',{'nonInteraction':1});
    ga(env+'.send','pageview',pageviewData);
    utag.DB('Sent Purchase Pageview with Parts');
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{utag.runonce = utag.runonce || {};utag.runonce.ext = utag.runonce.ext || {};if(typeof utag.runonce.ext[527]=='undefined'){utag.runonce.ext[527]=1;if(1){
// Digikey API - 527

// Moving to get this code under Tealium's change control

utag.postBingProductData = function(event,data,productList) {
    
    data.bing_part_ids = [];
    var i = 0;
    // assign event to bing event
    data.bing_event = event;
    // package the first 15 product ids in the bing product id array
    if (typeof productList !== 'undefined') {
        for (i = 0; i < productList.length; i++) {
            data.bing_part_ids.push(productList[i]);
            if (i >= 15) {break;}
        }
    }
    
    window.uetq = window.uetq || [];
    if (data.bing_part_ids.length > 0) {
        window.uetq.push ('event', '', {'ecomm_prodid': data.bing_part_ids, 'ecomm_pagetype': data.bing_event});
    }

    // place this function call the part list code,before the call to dkLink(), calling only if a bing_id is present
    
}

utag.clearPartData = function() {
    utag.DB('Send Part Data');
    utag.pIds = [];
    utag.pSku = [];
    utag.pDesc = [];
    utag.pSup = [];
    utag.pQty = [];
    utag.pCat = [];
    utag.pSStat = [];
    utag.pPrc = [];
    utag.pWID = [];
    utag.pVType = [];
}

utag.assignPartListData = function(data) {
    utag.data['part_id_a'] = data['part_id_a'] = utag.pIds;
    utag.data['part_sku_a'] = data['part_sku_a'] = utag.pSku;
    utag.data['part_description_a'] = data['part_description_a'] = utag.pDesc;
    utag.data['supplier_id_a'] = data['supplier_id_a'] = utag.pSup;
    utag.data['part_qty_a'] = data['part_qty_a'] = utag.pQty;
    utag.data['part_category_a'] = data['part_category_a'] = utag.pCat;
    utag.data['stock_status_a'] = data['stock_status_a'] = utag.pSStat;
    utag.data['line_item_price_a'] = data['line_item_price_a'] = utag.pPrc;
    utag.data['web_id_a'] = data['web_id_a'] = utag.pWID;
    utag.data['part_type_a'] = data['part_type_a'] = utag.pVType;
}

utag.dkPartActivity = function(Action, PartDescx) {
  try {
    utag.pLastOp = Action;
    utag.charCount += PartDescx.length;
    var PartDesc = JSON.parse(PartDescx);
    var vnType = utag.framework["testForMerchandising"](PartDesc['supplier_id']) || 'Digi-Key';
    if (Action === 'purchase') {
        if (typeof utag.queue === 'undefined') utag.queue = {};
        if (typeof utag.queue['purchaseParts'] === 'undefined') {
            utag.queue['purchaseParts'] = [PartDesc];
        } else {
            utag.queue['purchaseParts'].push(PartDesc);
        }
    } else if (Action === 'remove_part' || Action === 'cart_add' || Action === 'product_view' || Action === 'checkout')  {
        utag.pIds.push(PartDesc['part_id']||'(Not Set)');
        utag.pSku.push(PartDesc['pn_sku']||'(Not Set)');
        utag.pDesc.push(PartDesc['part_description']||'(Not Set)');
        utag.pSup.push(PartDesc['supplier_id']||'(Not Set)');
        utag.pQty.push(PartDesc['part_qty']||'(Not Set)');
        utag.pCat.push(PartDesc['part_category']||'(Not Set)');
        utag.pSStat.push(PartDesc['stock_status']||'(Not Set)');
        utag.pPrc.push(PartDesc['line_item_price']||'(Not Set)');
        utag.pWID.push(PartDesc['web_id']||'(Not Set)');
        utag.pVType.push(vnType);
        if (utag.charCount > 6500) {
            utag.sendProductList();
            utag.charCount = 0;
        }
    }
      
  } catch(er) {
    utag.DB(er);
  }
}
    
utag.dkLastPart = function(){
    utag.pPartListToPost = true;
    if (typeof utag.queue !== 'undefined' && utag.queue['purchaseParts'].length > 0) {
        utag.queue['purchaseEnd'] = true;
    } else {
        utag.sendProductList(); 
    }
    utag.DB('Part List Loaded');
}

utag.dkPartView = function(partData) {
    var e = 'placeholder';
}

utag.sendProductList = function() {
try {
    if (typeof utag.postLoadCompleted == 'undefined') {
        utag.postLoadCompleted = 0;
    }
    var data = [];
    if (typeof utag.pLastOp == 'undefined' || utag.pLastOp == "") {return};
    data['tealium_event'] = utag.pLastOp;
  
    if (typeof data['tealium_event'] != 'undefined') {
        utag.assignPartListData(data);
        switch (data['tealium_event']) {
        case 'cart_add':
            utag.dkStdVars(data);
            data['ref_page_event'] = 'Post Parts Added to Cart';
            data['not_a_pageview'] = '1';
            utag.postBingProductData('cart',data,data.part_id_a);
            utag.link(data,null);
            utag.clearPartData();
            break;
        case 'remove_part':
            utag.dkStdVars(data);
            data['ref_page_event'] = 'Post Parts Removed from Cart';
            data['not_a_pageview'] = '1';
            utag.link(data,null);
            utag.clearPartData();
            break;
        case 'checkout':
            utag.dkStdVars(data);
            data['ref_page_event'] = 'Post Parts Checked Out Cart';
            data['not_a_pageview'] = '1';
            utag.postBingProductData('other',data,data.part_id_a);
            utag.link(data,null);
            utag.clearPartData();
            break;
        case 'purchase':
            utag.dkStdVars(data);
            utag.postBingProductData('purchase',data,data.part_id_a);
            utag.pushPartListOnConfirmation(data);
            break;
        }
    }
} catch(er) {
  utag.DB(er);
}
}

utag.clearPartData();
utag.pVType = [];
utag.postLoadEvents = [];
utag.charCount = 0;

}
}} catch(e){ utag.DB(e) }  },
function(a,b){ try{ if((typeof b['js_page.document.documentElement.lang']!='undefined'&&typeof b['js_page.document.documentElement.lang']!='undefined'&&b['js_page.document.documentElement.lang']!='')){try{b['page_language']=document.documentElement.lang.match(/\w{2,3}/i)[0]}catch(e){}} } catch(e){ utag.DB(e); }  },
function(a,b,c,d){
  b._ccity='';
  b._ccountry='';
  b._ccurrency=(typeof b['order_currency']!='undefined')?b['order_currency']:'';
  b._ccustid='';
  b._corder=(typeof b['order_id']!='undefined')?b['order_id']:'';
  b._cpromo='';
  b._cship='';
  b._cstate='';
  b._cstore='';
  b._csubtotal=(typeof b['order_subtotal']!='undefined')?b['order_subtotal']:'';
  b._ctax='';
  b._ctotal=(typeof b['order_subtotal']!='undefined')?b['order_subtotal']:'';
  b._ctype='';
  b._czip='';
  b._cprod=(typeof b['product_number']!='undefined'&&b['product_number'].length>0)?b['product_number']:[];
  b._cprodname=[];
  b._cbrand=[];
  b._ccat=[];
  b._ccat2=[];
  b._cquan=(typeof b['product_quantities']!='undefined'&&b['product_quantities'].length>0)?b['product_quantities']:[];
  b._cprice=(typeof b['product_price']!='undefined'&&b['product_price'].length>0)?b['product_price']:[];
  b._csku=(typeof b['product_sku']!='undefined'&&b['product_sku'].length>0)?b['product_sku']:[];
  b._cpdisc=[];
  if(b._cprod.length==0){b._cprod=b._csku.slice()};
  if(b._cprodname.length==0){b._cprodname=b._csku.slice()};
  function tf(a){if(a=='' || isNaN(parseFloat(a))){return a}else{return (parseFloat(a)).toFixed(2)}};
  b._ctotal=tf(b._ctotal);b._csubtotal=tf(b._csubtotal);b._ctax=tf(b._ctax);b._cship=tf(b._cship);for(c=0;c<b._cprice.length;c++){b._cprice[c]=tf(b._cprice[c])};for(c=0;c<b._cpdisc.length;c++){b._cpdisc[c]=tf(b._cpdisc[c])};
},
function(a,b){ try{ if(1){
// Standard Variable Corrections - 361

try {
   b['tealium_visitorid'] = utag_data['tealium_visitor_id'];
   b['tealium_visitid'] = utag_data['tealium_session_id'];
} catch(e) {
   utag.DB(e);
}

if (typeof b['part_search_term'] != 'undefined') {
  b['part_search_term'].toLowerCase();
  }
if (typeof b['part_search_term_ext'] != 'undefined') {
    b["ExtRun"] = utag.dkTrk('361.1')
    b['part_search_term_ext'].toLowerCase();
    
}

if (typeof b['page_language'] != 'undefined' && b['page_language'].toLowerCase() == 'zh') {
    if (typeof b['page_site'] != 'undefined') {
        switch (b['page_site'].toLowerCase()) {
           case 'hk':
           case 'tw':
		b['page_language'] = 'zht';
                break;
           case 'cn':
           case 'sg':
           case 'zz':
                b['page_language'] = 'zhs';
                break;
         }
    }
    b["ExtRun"] = utag.dkTrk('361.3')
}

//if (a === 'view' && utag.data.tealium_environment === 'prod') utag.setPersonalizationState(b);

if (b.page_type === 'TEC' && b.page_title === '') {
    b.page_title = b['dom.title'];
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){b['currency_Always_USD']='USD'} } catch(e){ utag.DB(e); }  },
function(a,b){ try{ if(1){
utag.fixCookieHomepageRedbar = function(a, b, c, d, e) {
  var element = a.target, counter = 0,hrefx="";
  while (element && counter < 5) {
    if (element.getAttribute('href') == '/panda/en/'){
      element.getAttribute('href');
      utag.dkTrk('405.1');
      utag.dkCookie("ref_page_event=Price Availability");
      break;
    }
    element = element.parentElement; 
    counter++;
  }
}

if (b.page_type==='HP' && b.page_sub_type==='HP') {
    elementx = document.getElementById('banner__redbar');
      if (elementx !== null) {
	  utag.loader.EV(elementx,'click',utag.fixCookieHomepageRedbar);
      }
}

} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
    if (typeof utag.data.st_campaign !== 'undefined' && typeof utag.data.st_campaign_supplier_id !== 'undefined') {
        if (b['event_category']==='Personalization' && b['personalization_creative'] === 'Prioritized Search Results') {
//            if (b.personalization_vendor === '1') {
                b.personalization_program = 'Supplier Cookies - '+utag.data.st_campaign_supplier_name;
                b.personalization_creative = 'Prioritized Search Results';
                if (b['ref_page_event'] == 'Click' || b['ref_page_event'] == 'Select Part' || b['ref_page_event'] == "Substitute-Also Eval"){
                    b["ExtRun"] = utag.dkTrk('410.1');
                    if (typeof utag.data.st_campaign_supplier_name != 'undefined' && utag.data.st_campaign_supplier_name.length > 0){
                        if (utag.data.st_campaign_supplier_id == b.ref_supplier_id){
                            b['ref_page_event'] = 'Click';
                        } else {
//                            b['ref_page_event'] = 'Click - Not '+utag.data.st_campaign_supplier_name+' Part';
                            b.event_category = "";
                        }
                    }
                } else if (b['ref_page_event'] == 'Impression' && b['personalization_vendor'] == '1') {
                    b['ref_page_event'] = 'Impression';
                    b["ExtRun"] = utag.dkTrk('410.2');
                } else {
//                    b['ref_page_event'] = 'Impression - '+utag.data.st_campaign_supplier_name+' Parts not in Result';
//                    b["ExtRun"] = utag.dkTrk('410.3');
                    b.event_category = "";
                }
//            } else {
//                b.event_category = "";
//            }
        } else if(b['event_category'] === 'Personalization' && b['personalization_creative'] === 'Weighted Recommendation List') {
            b.personalization_program = 'Supplier Cookies - '+utag.data.st_campaign_supplier_name;
            b.personalization_creative = 'Weighted Recomendation List';
            var supplier = b.ref_supplier_id || utag.data['supplier_id'];
            if (supplier !== utag.data['st_campaign_supplier_id']) {
                b.event_category = "";
            }
        }
        
    }




} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
utag.setAsCookie = function() {
    utag.dkTrk('429.2');
    return 'Cookie';
}

utag.setAsLink = function() {
    utag.dkTrk('429.1');
    return 'Link';
}

utag.CookieOrLink = function(hrf) {
    if (typeof hrf === 'undefined' || hrf === null || hrf === "") return utag.setAsCookie();
    hrf = hrf.toLowerCase();
    if (hrf.indexOf('api-portal.digikey.') > 0) return utag.setAsLink();
    var bHrf = hrf.split("?")[0];
    if (bHrf.substring(0,1) != '/' && bHrf.indexOf('.digikey.') <= 0) return utag.setAsLink();
    if (bHrf.indexOf('.digikey.') > 0 && bHrf.indexOf('/media/pdf/') > 0) return utag.setAsLink();
    return utag.setAsCookie();
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (typeof b.order_id_on_confirmation_page != 'undefined') linkedin_conversion_id = '956649';
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
var cookie = document.cookie.match('cur'+'=([^;]*)');
if (cookie !== null && typeof cookie[1] != 'undefined') {
    b.order_currency = cookie[1];
} 

} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
utag.fixUpSuppliers = function(data,sElements)  {
    
    if (typeof sElements['Link to Newest Products'] !== 'undefined') {
        var existingTag = sElements['Link to Newest Products'].getAttribute('cookie-tracking');
        if (existingTag === 'ref_page_event=Link to Product;') {
            data.ref_page_event = 'Link to Newest Products';
        }
    }

};

utag.generateSupplierTags = function(data,sElements,href) {
    var tagSent = false;
    if (typeof sElements['Supplier Page Nav'] !== 'undefined') {
        data.ref_page_event = 'Go To Page Section'
        var startAnchor = href.indexOf('#') + 1;
        data.ref_page_category = href.substring(startAnchor);
        utag.dklink(data,href);
    }
    return tagSent;

}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
utag.dkSaveSupplierCookieRules = function(perData,tmp_perData) {
    if (typeof utag.data['st_campaign'] === 'string' && utag.data['st_campaign'].length > 0) {
        perData.personalization_program = 'Supplier Cookies - ' + utag.data['st_campaign_supplier_name'];
        utag.dklink(perData);
        if (perData.ref_page_event !== 'Impression') {
            utag.newCookie(tmp_perData);
        }
    }
}

utag.evergagePersonalization = function(sElements,href,tags){
    var perData = {}, tmp_perData = {},itr,id=sElements['Evergage Click'].id, tmp_RPE = "";
    perData.evergageID = id.substr(-5);
    utag.framework.lookupForEvergage(perData);
    if (perData.hasOwnProperty('personalization_program')) {
        perData.ref_page_event = "Supplier Promo Click";
        perData.event_category = 'Personalization';
        perData.event_label = 'Evergage';
        perData.personalization_program = '(Evergage - Not Defined)';
        perData.personalization_creative = '(Evergage - Not Defined)';
        tmp_perData.html_element1 = perData.html_element1 = tags.html_element1;
        tmp_perData.html_element2 = perData.html_element2 = tags.html_element2;
        tmp_perData.html_element3 = perData.html_element3 = tags.html_element3;
        tmp_perData.html_element4 = perData.html_element4 = tags.html_element4;
        tmp_perData.ref_page_event = utag.framework.lookupForEvergage(perData);
        if (perData.personalization_program.match(/supplier cookie/i)) {
            utag.dkSaveSupplierCookieRules(perData,tmp_perData);
        } else {
            utag.dklink(perData,href);
            utag.newCookie(tmp_perData);
        }
    }
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (typeof b['qp.utm_medium'] != 'undefined' && typeof b['qp.utm_source'] != 'undefined'){
    b["ExtRun"] = utag.dkTrk('455');
     utag.InitWTCampaign(b);
  b['uses_new_google_campaigns'] = '1';
  b['campaign_medium'] = b['qp.utm_medium'];
  b['campaign_source'] = b['qp.utm_source'];
  if (typeof b['qp.utm_content'] != 'undefined'){
    b['campaign_content'] = b['qp.utm_content'];
  } else {
    b['campaign_content'] = '(Not Set)';
  }
  if (typeof b['qp.utm_campaign'] != 'undefined') {
    b['campaign'] = b['qp.utm_campaign'];
  } else {
    b['campaign'] = '(Not Set)';
  }
  if (typeof b['qp.utm_cid'] != 'undefined') {
    b['campaign_customer_id'] = b['qp.utm_cid'];
  }
  if (typeof b['page_site'] != 'undefined') {
    b['campaign_site'] = b['page_site'];
  } else {
    b['campaign_site'] = '(Not Set)';
  }
  if (typeof b['supplier_id'] != 'undefined') 
  {
    b['campaign_supplier'] = b['supplier_id'];
  } else {
    b['campaign_supplier'] = '(Not Set)';
  }
  switch(b['campaign_medium']){
    case "email":
        if (typeof b['email_id'] == 'undefined'){
        	b['email_id'] = b['campaign']+'_'+b['campaign_content'];
          }
        var pos = b['campaign_content'].indexOf('_');
        if (pos > 0 && b['campaign_content'].charAt(pos+1) != '_') {
            b['campaign_site'] = b['campaign_content'].substr(b['campaign_content'].indexOf('_')+1);
            if (b['campaign_site'].indexOf('_') > 0) {
                b['campaign_site'] = b['campaign_site'].substr(0,b['campaign_site'].indexOf('_'));
            }
        } else {
            b['campaign_site'] = '(Not Set)';
        }
        pos = b['campaign_content'].search(/_[a-z]{2}_/i);
        if (pos <0) pos = b['campaign_content'].search(/_[a-z]{3}_/i);
        if (pos < 0) {pos = b['campaign_content'].search(/__/i);}
        if (pos >= 0) {
            if (b['campaign_content'].charAt(pos+1) != '_') {
                if (b['campaign_content'].indexOf('_CNR_') >= 0) {
                    b['campaign_supplier'] = b['campaign_content'].substr(pos+5);
                } else {
                    b['campaign_supplier'] = b['campaign_content'].substr(pos+4);
                }
            } else {
                b['campaign_supplier'] = b['campaign_content'].substr(pos+2);
            }
            if (b['campaign_supplier'].indexOf('-') > 0) {
                b['campaign_supplier'] = b['campaign_supplier'].substring(0,b['campaign_supplier'].indexOf('-'));
            }
        } 
        break;
    case "cpc":
        b['is_paid_search'] = '1';
        if (typeof b['utm_adgroup'] != 'undefined') {
            b['ad_group'] = b['utm_adgroup'];
        }
        if (typeof b['qp.pkw'] != 'undefined') {
            b['paid_search_term'] = decodeURIComponent(b['qp.pkw']);
        } else if (typeof b['qp.keywords'] != 'undefined') {
            b['paid_search_term'] = decodeURIComponent(b['qp.keywords']);
        } else if (typeof b['qp.utm_term'] != 'undefined') {
            b['paid_search_term'] = decodeURIComponent(b['qp.utm_term']);
        } else if (typeof b['part_search_term'] != 'undefined') {
            b['paid_search_term'] = b['part_search_term'];
        } else {
            b['paid_search_term'] = b['content_search_keywords'];
        }
        break;
    default:
    }
  }
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
utag.framework['correctExistingTags'] = function(page,tags,tagType) {
    switch (page) {
        case 'SP-SP':
            if (decodeURIComponent(tags['ref_page_event']) === 'Link to Supplier Spotlight') {
                tags['ref_page_event'] = 'Link from Spotlight';
                return 'TBD';
            }
            break;
        case 'PCB-BLD':
            if (decodeURIComponent(tags['ref_page_event']) === 'Upload Gerber File') {
                return 'Cookie';
            }
            break;
        case 'PCB-LAY':
            if (tags['ref_page_event'].match(/^Confirm File Upload$|^Cancel File Upload$/))  {
                return 'Cookie';
            }
            break;
    }
    return tagType.eventType;
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
utag.fixUpFamilyPage = function(data,sElements,eventType)  {
    
    data.personalization_program = "";
    data.personalization_creative = "";
    
    if (typeof sElements['Asset'] !== 'undefined') {
        data.ref_page_event = 'Display Asset';
        data.page_title = 'Datasheet';
        data.asset_type = 'Datasheet';
        data['ExtRun'] = utag.dkTrk('435.1');
    }
    if (typeof sElements['Help for Parts'] !== 'undefined') {
        data.ref_page_event = 'Help for Parts';
        eventType = 'Link';
        data['ExtRun'] = utag.dkTrk('435.2');
    }
    if (typeof sElements['Select Manufacturer'] !== 'undefined') {
        data.ref_page_event = 'Select Manufacturer';
        eventType = 'Cookie';
        data['ExtRun'] = utag.dkTrk('435.3');
    }
    if (typeof sElements['View Series'] !== 'undefined') {
        data.ref_page_event = 'View Series';
        data['ExtRun'] = utag.dkTrk('435.4');
    }
    if (typeof sElements['Supplier Search'] !== 'undefined') {
        data.personalization_program = "";
        data.personalization_creative = "";
        data.ref_page_event = 'Filter on Supplier';
        data['ExtRun'] = utag.dkTrk('435.5');
    }
    if (typeof sElements['Cat Header'] !== 'undefined') {
        data.ref_page_event = 'Select Family by Header';
        data['ExtRun'] = utag.dkTrk('435.6');
    }
    if (typeof sElements['Cat New Product'] !== 'undefined') {
        data.ref_page_event = 'Select New Products for Family';
        data['ExtRun'] = utag.dkTrk('435.7');
    }
    if (typeof sElements['Add Part'] !== 'undefined') {
        var frm = document.getElementById('update-quantity');
        data.ref_quantity_ordered = frm[1].value;
        data['ExtRun'] = utag.dkTrk('435.8');
    }
    if (typeof sElements['Search Term'] !== 'undefined') {
        var srchTrm = sElements['Search Term'].getAttribute('data-term-key');
        if (srchTrm === utag.data['part_search_term']) {
            utag.data['part_search_term'] = utag.data['part_search_term_ext'] = utag.data['part_search_filter'] = "";
            data['ExtRun'] = utag.dkTrk('435.9');
        }
    }
    if (typeof sElements['Part Number Type Ahead'] !== 'undefined') {
        data.ref_page_category = 'Part Number Type Ahead';
        data['ExtRun'] = utag.dkTrk('435.10');
    }
    if (typeof sElements['Categories Type Ahead'] !== 'undefined') {
        data.ref_page_category = 'Categories Type Ahead';
        data['ExtRun'] = utag.dkTrk('435.11');
    }
    
    if ('Filter on Supplier' in sElements) {
        data.ref_page_event = 'Filter on Supplier';
        data['ExtRun'] = utag.dkTrk('435.12');
    }
    

    return eventType;
};

utag.fixUpKeypressSearch = function(tags,sElements,cntrl) {
    if (typeof sElements['RefineSearch'] !== 'undefined') {
        tags.ref_page_event = 'Search Within Results';
        tags['ExtRun'] = utag.dkTrk('435.9');
        cntrl.eventType = 'Cookie';
    }
    
};

utag.generatePartSearchTags = function(data,sElements,href) {
    var tagSent = false, eventType = 'Not Set';
    if (typeof sElements['Select Learn More'] !== 'undefined') {
        data.personalization_program = "";
        data.personalization_creative = "";
        data.ref_page_event = 'Select Learn More';
        utag.newCookie(data,href);
        tagSent = true;
        data['ExtRun'] = utag.dkTrk('435.12');
    }
    if (!tagSent && 'Select Part' in sElements) {
        data.ref_page_event = 'Select Part';
        eventType = 'Cookie';
        utag.newCookie(data,href);
        tagSent = true;
        data['ExtRun'] = utag.dkTrk('435.13');
    }
    if (!tagSent && 'Select Manufacturer' in sElements) {
        data.ref_page_event = 'Select Manufacturer';
        utag.newCookie(data,href);
        tagSent = true;
        data['ExtRun'] = utag.dkTrk('435.13');
    }

    if (!tagSent && 'View Series' in sElements) {
        data.ref_page_event = 'View Series';
        utag.newCookie(data,href);
        tagSent = true;
        data['ExtRun'] = utag.dkTrk('435.12');
    }

    if (!tagSent && 'Change Number of Results Displayed' in sElements) {
        data.ref_page_event = 'Change Number of Results Displayed';
        utag.newCookie(data,href);
        tagSent = true;
        data['ExtRun'] = utag.dkTrk('435.12');
    }

    if (!tagSent && 'Download Table' in sElements) {
        data.ref_page_event = 'Download Table';
        utag.dklink(data,href);
        tagSent = true;
        data['ExtRun'] = utag.dkTrk('435.12');
    }

    if (!tagSent && 'Link to Supplier' in sElements) {
        data.ref_page_event = 'Link to Supplier';
        utag.newCookie(data,href);
        tagSent = true;
        data['ExtRun'] = utag.dkTrk('435.12');
    }
    
    if (!tagSent && 'View Marketplace Message' in sElements) {
        data.ref_page_event = 'View Marketplace Message';
        utag.dkLink(data);
        tagSent = true;
        data['ExtRun'] = utag.dkTrk('435.12');
    }
    
    if (!tagSent && 'Change Page in Search Results' in sElements) {
        data.ref_page_event = 'Change Page in Search Results';
        utag.newCookie(data,href);
        tagSent = true;
        data['ExtRun'] = utag.dkTrk('435.12');
    }
    
    if (!tagSent && 'Help for Parts' in sElements) {
        data.ref_page_event = 'Help for Parts';
        utag.dkLink(data);
        tagSent = true;
        data['ExtRun'] = utag.dkTrk('435.12');
    }
    
    if (!tagSent && 'Filter on Supplier' in sElements) {
        data.ref_page_event = 'Filter on Supplier';
        utag.newCookie(data,href);
        tagSent = true;
        data['ExtRun'] = utag.dkTrk('435.12');
    }
    
    if ('Click Compare Parts' in sElements) {
        data.ref_page_event = 'Click Compare Parts';
        utag.newCookie(data,href);
        tagSent = true;
        data['ExtRun'] = utag.dkTrk('435.12');
    }
    
    if (!tagSent && 'Hide or Expose Shared Attributes' in sElements) {
        data.ref_page_event = 'Hide or Expose Shared Attributes';
        utag.dkLink(data);
        tagSent = true;
        data['ExtRun'] = utag.dkTrk('435.12');
    }
    
    if (!tagSent && 'Remove Part from Comparison' in sElements) {
        data.ref_page_event = 'Remove Part from Comparison';
        utag.newCookie(data,href);
        tagSent = true;
        data['ExtRun'] = utag.dkTrk('435.12');
    }
    
    if (!tagSent && 'Link from Product Comparison' in sElements) {
        data.ref_page_event = 'Link from Product Comparison';
        utag.newCookie(data,href);
        tagSent = true;
        data['ExtRun'] = utag.dkTrk('435.12');
    }
    



    return tagSent;
};



    
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (a === 'view') {
    b.userAgent=utag.data['userAgent']=navigator.userAgent || "";
    b.userAgent.indexOf('WeChat') >= 0 ? b.isWeChat = utag.data['isWeChat'] = true : false;
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{utag.runonce = utag.runonce || {};utag.runonce.ext = utag.runonce.ext || {};if(typeof utag.runonce.ext[458]=='undefined'){utag.runonce.ext[458]=1;if(1){
utag['generateMyDigikeyTags'] = function(data,sElements,eventType) {
    data.personalization_program = "";
    data.personalization_creative = "";
    var SentTag = false;

    if (typeof sElements['BOM Add to Cart'] !== 'undefined') {
        data.ref_page_event = 'Add to Cart';
        data['ExtRun'] = utag.dkTrk('458.1');
        utag.newCookie(data);
        SentTag = true;
    }
    if (typeof sElements['BOM Apply Assemblies'] !== 'undefined') {
        if (sElements['BOM Apply Assemblies'].textContent === 'Create Quote') {
            data.ref_page_event = 'Create Quote';
        } else {
            data.ref_page_event = 'Enter Assemblies';
        }
        data['ExtRun'] = utag.dkTrk('458.2');
        utag.newCookie(data);
        SentTag = true;
    }
    return SentTag;

}

}
}} catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (a==="view") {
    if(typeof Array.isArray(b.marketplace_sales) && b.page_type == 'SC' && b.page_sub_type == 'SCN' ) {
        var total,int,mp;
        var PCBSuppliers = RegExp(/2527|2528|2529|2530|2531|2532|2533|2534|2674|2675|2677|2678|2690|2681/);
        b.marketplace_revenue_usd=0, b.pcb_revenue_usd = 0;
        b.total_order_subtotal_usd=b.order_subtotal_in_usd;
        if(b.marketplace_sales.length > 0) {
            for (i = 0;i<b.marketplace_sales.length; i++) {
                mp=b.marketplace_sales[i];
                PCBSuppliers.test(mp.VendorID) 
                    ? b.pcb_revenue_usd += parseFloat(mp.USD,10) : b.marketplace_revenue_usd = parseFloat(mp.USD,10);
                }
            b.marketplace_sales = JSON.stringify(b.marketplace_sales);
            b.total_order_subtotal_usd += b.marketplace_revenue_usd + b.pcb_revenue_usd;
        }
        b.total_order_subtotal_usd = b.total_order_subtotal_usd.toFixed(2);
    }
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
utag['fixUpFooter'] = function(data,sElements,eventType) {
    retval = eventType || "";
    data.personalization_program = "";
    data.personalization_creative = "";

    if (sElements.hasOwnProperty('ECIA Distributor')) {
        if (data.ref_page_event === 'Footer Nav - Contact Us') {
            data.ref_page_event = 'Footer Nav';
            data['ExtRun'] = utag.dkTrk('464.1');
            retval = 'Cookie';
        }
    }
    return retval;
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
utag['fixUpResources'] = function(data,sElements,eventType) {
    retval = eventType || "";
    data.personalization_program = "";
    data.personalization_creative = "";

    if (sElements.hasOwnProperty('Expand Help Section')) {
        if (utag.data['page_sub_type'] === 'LSS') {
            data.ref_page_event = 'Expand Help Section';
            data.ref_page_category = sElements['Expand Help Section'].textContent.trim()
            data['ExtRun'] = utag.dkTrk('465.1');
            retval='Link';
        }
    }
    
    if (utag.data['page_type'] === 'PCB' && utag.data['page_sub_type'] === 'LP') {
        if (typeof sElements['Tab Item'] !== 'undefined') {
            data.ref_page_category = sElements['Tab Item'].getAttribute('data-tab-label');
            data.ref_page_event = 'View Partner Info';
            retval = 'Link';
        }
    }

    
    return retval;
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
utag.framework['testForMerchandising'] = function(supplierID) {
    var retval = "",result=[];
    if(typeof supplierID === 'string') {
        result = supplierID.match(/2140|2144|2156|2173|2183|2197|2204|2205|2206|2207|2210|2211|2212|2215|2216|2217|2218|2219|2227|2228|2229|2230|2234|2235|2237|2239|2240|2247|2250|2255|2256|2257|2263/);
        if (result === null || result[0] === "") result = supplierID.match(/2264|2266|2268|2269|2270|2271|2272|2273|2275|2276|2279|2280|2281|2282|2283|2286|2288|2292|2296|2297|2298|2299|2307|2308|2319|2324|2325|2326|2327|2328|2329|2334|2335/);
        if (result === null || result[0] === "") result = supplierID.match(/2337|2339|2340|2342|2343|2345|2346|2349|2350|2351|2352|2353|2354|2355|2356|2359|2360|2361|2362|2363|2367|2368|2369|2370|2371|2372|2373|2374|2375|2376|2377|2379|2380/);
        if (result === null || result[0] === "") result = supplierID.match(/2381|2382|2383|2384|2385|2386|2387|2388|2389|2390|2391|2392|2395|2396|2397|2398|2399|2401|2402|2403|2404|2405|2406|2407|2408|2409|2410|2411|2412|2413|2414|2415|2416/);
        if (result === null || result[0] === "") result = supplierID.match(/2417|2418|2419|2420|2421|2422|2423|2424|2425|2426|2427|2428|2429|2430|2431|2432|2433|2435|2436|2437|2438|2439|2440|2441|2442|2443|2444|2451|2454|2455|2456|2457|2458/);
        if (result === null || result[0] === "") result = supplierID.match(/2459|2460|2461|2462|2463|2464|2465|2466|2467|2468|2469|2470|2471|2472|2473|2474|2475|2476|2477|2478|2480|2481|2482|2483|2484|2485|2486|2487|2488|2489|2490|2491|2492/);
        if (result === null || result[0] === "") result = supplierID.match(/2493|2494|2495|2496|2497|2498|2499|2500|2501|2502|2503|2504|2505|2507|2510|2511|2512|2513|2514|2515|2516|2517|2518|2519|2520|2523|2524|2525|2526|2527|2528|2529|2530/);
        if (result === null || result[0] === "") result = supplierID.match(/2531|2532|2533|2534|2537|2538|2539|2540|2541|2542|2543|2544|2545|2546|2547|2550|2552|2553|2554|2555|2556|2557|2558|2559|2560|2561|2562|2563|2564|2565|2566|2567|2568/);
        if (result === null || result[0] === "") result = supplierID.match(/2569|2570|2571|2572|2573|2576|2577|2578|2579|2580|2581|2583|2584|2587|2588|2589|2590|2591|2592|2593|2594|2595|2596|2597|2598|2600|2601|2602|2603|2604|2605|2606|2607/);
        if (result === null || result[0] === "") result = supplierID.match(/2608|2609|2611|2612|2613|2614|2615|2616|2617|2620|2621|2622|2623|2624|2625|2626|2627|2628|2629|2630|2631|2632|2633|2634|2635|2636|2637|2638|2639|2641|2642|2643|2644/);
        if (result === null || result[0] === "") result = supplierID.match(/2645|2647|2649|2650|2653|2654|2655|2656|2657|2658|2659|2660|2661|2662|2663|2664|2665|2666|2667|2668|2669|2670|2671|2672|2673|2674|2675|2676|2677|2678|2679|2680|2681/);
        if (result === null || result[0] === "") result = supplierID.match(/2682|2683|2685|2687|2688|2689|2690|2691|2692|2693|2694|2695|2696|2697|2698|2699|2700|2701|2702|2703|2704|2705|2706|2707|2710|2711|2712|2717|2718|2719|2720|2721|2722/);        
        if (result === null || result[0] === "") result = supplierID.match(/2723|2724|2726|2728|2731|2732|2737|2738|2739|2740|2741|2742|2743|2744|2745|2746|2747|2748|2749|2750|2751|2752|2753|2754|2755|2756|2757|2758|2759|2760|2761|2762|2765/);        
        if (result === null || result[0] === "") result = supplierID.match(/2766|2767|2768|2769|2779|2783|2788|2789|2791|2792|2793|2795|2796|2797|2798|2799|2800|2801|2803|2804|2806|2807|2808|2809|2810|2811|2812|2813|2814|2815|2816|2817|2819/); 
        if (result === null || result[0] === "") result = supplierID.match(/2821|2823|2824|2825|2826|2829|2830|2831|2832|2833|2834|2835|2837|2838|2839|2840|2841|2842|2843|2844|2845|2846|2847|2848|2849|2851|2852|2853|2854|2855|2856|2857|2858/);
        if (result === null || result[0] === "") result = supplierID.match(/2859|2860|2861|2862|2863|2864|2865|2866|2867|2868|2869|2872|2874|2875|2876|2877|2878|2880|2881|2883|2884|2885|2886|2887|2888|2889|2890|2891|2892|2893|2894|2895|2896|2899/);
        if (result === null || result[0] === "") result = supplierID.match(/2900|2902|2903|2904|2905|2906|2907|2909|2910|2912|2913|2914|2915|2916|2917|2918|2919|2920|2921|2922|2923|2924|2925|2926|2927|2929|2930|2933|2934|2935|2936|2937|2939/);
        if (result === null || result[0] === "") result = supplierID.match(/2940|2941|2942|2943|2948|2949|2950|2951|2953|2954|2955|2956|2957|2960|2961|2962|2963|2964|2965|2966|2968|2970|2971|2974|2975|2976|2977|2978|2979|2980|2981|2982|2983/);
        if (result === null || result[0] === "") result = supplierID.match(/2984|2986|2989|2990|2991|2992|2993|2996|2997|2998|2999|3000|3001|3002|3003|3004|3005|3006|3007|3009|3010|3011|3012|3013|3014|3015|3016|3025|3027|3028|3029|3030|3031|3032|3033|3034/);
        if (result === null || result[0] === "") result = supplierID.match(/3035|3036|3038|3039|3040|3041|3042|3043|3044|3045|3048|3049|3050|3051|3054|3055|3056|3057|3058|3059|3060|3061|3062|3063|3064|3065|3066|3067|3068|3069/);
        if (result === null || result[0] === "") result = supplierID.match(/3070|3071|3073|3075|3076|3077|3078|3080|3081|3082|3083|3084|3085|3086|3087|3088|3089|3090|3091|3092|3093|3094/);
        if (result !== null && result[0] !== "") retval = 'Marketplace Vendor';
    }
    return retval;
    
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (a === 'view') {
    if (b.page_type !== 'PS') return;
    
    if (b.ref_page_event === 'Search Within Results') {
        if (b.part_search_term == b.part_search_term_ext) {
            b.ref_page_event = 'Initiate Search';
        }
    }
    
    b.part_search_term = b.part_search_term || b.ref_part_search_term;
    b.part_search_term_ext = b.part_search_term_ext || b.ref_part_search_term_ext;
    
    switch (utag.dkConCatPageType()) {
    case 'PS-PD':
        if (typeof b.personalization_state !== 'string' || b.personalization_state.indexOf('not active')>=0) {
            var qtyFld = document.getElementById('dkQty');
            if (qtyFld === null) break;
            var qty = Number(qtyFld.textContent.replace(/,/g,''));
            nPageState = (qty>0) ? 'Parts In Stock':'Parts Not In Stock';
            if (typeof b.page_state === 'undefined') {
                b.page_state = nPageState;
            } else {
                b.page_state += ", " + nPageState;
            }
        }
        break;
    }

}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{utag.runonce = utag.runonce || {};utag.runonce.ext = utag.runonce.ext || {};if(typeof utag.runonce.ext[478]=='undefined'){utag.runonce.ext[478]=1;if(1){
utag.handleEverGNav = function(){
    var tagData = {};
    var elemts = document.getElementById('evergage-tooltip-ambm8NwK')
    if (elemts && utag.data.web2webFired === '0') {
        tagData.evergageID = 'm8NwK';  
        tagData.ref_page_event = "Impression";
        tagData.event_category = 'Personalization';
        tagData.event_label = 'Evergage';
        tagData.personalization_program = 'Supplier Cookies';
        tagData.personalization_creative = 'Web2Web Navigation';
        tagData.order_id = "";
        utag.dkSaveSupplierCookieRules(tagData);
        utag.data.web2webFired = '1';
    }
}

if (a === 'view') {
    if (b.hasOwnProperty('st_campaign'))
    {
        var i = 0, elemts = document.getElementsByClassName('flymenu__section'),cElemt = {};
        for (i=0;i<elemts.length; i++) {
            var val=elemts[i].getAttribute('data-index');
            if (elemts[i].getAttribute('data-index')=== "1") {
                utag.data.web2webFired = '0';
                utag.loader.EV(elemts[i], 'mouseover', utag.handleEverGNav);
                break;
            }
        }
    }
}
}
}} catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
utag.framework.sendEvergageCampaigns = function(eCampaign) {
    var data={
        event_category : "Evergage Campaign - Test",
        event_label : eCampaign.campaignName + "|" + eCampaign.experienceName + "|" + eCampaign.userGroup
    }
    switch (eCampaign.statType) {
        case "i":
            event_action = eCampaign.userGroup + " Impression";
            break;
        case "c":
            event_action = "Clickthrough";
            break;
        case "d":
            event_action = "Dismissal";
            break;
    }
    
    utag.dklink(data);
}

utag.framework.processEvergageCampaigns = function(evergageCampaigns) {
    
    var i = 0;
    for (i = 0; i < evergageCampaigns.length; i++) {
        utag.framework.sendEvergageCampaigns(evergageCampaigns[i]);
    }
    
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){


if (a === 'view') {
    switch (b['qp.utm_medium'])  
	{
	case 'email':
		b.ref_page_type = '(e)';
        b.ref_page_sub_type = '(c)';
		b.ref_page_id = '(email)';
        b.ref_page_event = '(Entered from Email)';
		break;
	case 'cpc':
		b.ref_page_type = '(e)';
        b.ref_page_sub_type = '(c)';
        b.ref_page_id = '(cpc)';
        b.ref_page_event = '(Entered from Paid Search)';
		break;
	case 'aggregator':
		b.ref_page_type = '(e)';
        b.ref_page_sub_type = '(c)';
        b.ref_page_id = '(aggregator)';
        b.ref_page_event = '(Entered from Aggregator)';
		break;
	case 'buynow':
		b.ref_page_type = '(e)';
        b.ref_page_sub_type = '(c)';
        b.ref_page_id = '(buynow)';
        b.ref_page_event = '(Entered from BuyNow)';
		break;
	case 'social':
		b.ref_page_type = '(e)';
        b.ref_page_sub_type = '(c)';
        b.ref_page_id = '(social)';
        b.ref_page_event = '(Entered from Social)';
		break;
	case 'supplier':
		b.ref_page_type = '(e)';
        b.ref_page_sub_type = '(c)';
        b.ref_page_id = '(supplier)';
        b.ref_page_event = '(Entered from Supplier)';
		break;
	case 'vanity':
		b.ref_page_type = '(e)';
        b.ref_page_sub_type = '(c)';
        b.ref_page_id = '(vanity)';
        b.ref_page_event = '(Entered from Vanity)';
		break;
	case 'pressrelease':
		b.ref_page_type = '(e)';
        b.ref_page_sub_type = '(c)';
        b.ref_page_id = '(pressrelease)';
        b.ref_page_event = '(Entered from Press Release)';
		break;
	case 'referral':
		b.ref_page_type = '(e)';
        b.ref_page_sub_type = '(c)';
        b.ref_page_id = '(referral)';
        b.ref_page_event = '(Entered from Referral)';
		break;
	case 'cpm':
		b.ref_page_type = '(e)';
        b.ref_page_sub_type = '(c)';
        b.ref_page_id = '(cpm)';
        b.ref_page_event = '(Entered from Display)';
		break;
	case 'organic':
		b.ref_page_type = '(e)';
        b.ref_page_sub_type = '(c)';
        b.ref_page_id = '(organic)';
        b.ref_page_event = '(Entered from Organic Search)';
		break;
	}
}


} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (a === 'view') {
    if (b.page_type === 'PS' && b.page_sub_type === 'PD' && b.page_site==='US') {
            if("personalization_state" in b && !(b["personalization_state"].match(/search2/))) {
                 var table = document.getElementsByClassName("product-dollars")[0],
                row = table.rows[1],
                qty = row.cells[0].textContent,
                pri = row.cells[1].textContent.trim();
                utag.data['firstPriceBreak'] = {
                    quantity : qty,
                    unitPrice : pri,
                    extPrice : String(Number(qty.replace(",","")) * Number(pri))
                 };
            }
    }
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){

utag.generateFixUpAllPages = function (data, sElements) {
    var retVal = false;
    if (typeof sElements['Change Language'] !== 'undefined') {
        data.personalization_program = "";
        data.personalization_creative = "";
        data.ref_page_event = 'Change Language';
        utag.newCookie(data);
        data['ExtRun'] = utag.dkTrk('499.1');
        retVal = true;
    }
    if (typeof sElements['Change Country'] !== 'undefined') {
        data.personalization_program = "";
        data.personalization_creative = "";
        data.ref_page_event = 'Change Country';
        utag.dklink(data);
        data['ExtRun'] = utag.dkTrk('499.2');
        retVal = true;
    }
    if (typeof sElements['Change Currency'] !== 'undefined') {
        data.personalization_program = "";
        data.personalization_creative = "";
        data.ref_page_event = 'Change Currency';
        utag.dklink(data);
        data['ExtRun'] = utag.dkTrk('499.3');
        retVal = true;
    }  
    if (typeof sElements['Change Currency-Update Preferences'] !== 'undefined') {
        data.personalization_program = "";
        data.personalization_creative = "";
        data.ref_page_event = 'Change Currency-Update Preferences';
        utag.newCookie(data);
        data['ExtRun'] = utag.dkTrk('499.4');
        retVal = true;
    }    
    if (typeof sElements['Change Currency-Help and Support'] !== 'undefined') {
        data.personalization_program = "";
        data.personalization_creative = "";
        data.ref_page_event = 'Change Currency-Help and Support';
        utag.newCookie(data);
        data['ExtRun'] = utag.dkTrk('499.5');
        retVal = true;
    }    
    return retVal;
};



} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
// Extension 505
/*
utag.sendQualtricsIntercept = function(tags) {
    window._qsie= window._qsie || [];
    var intercept = "";
    if (tags.ref_page_event == 'Change Language') intercept = 'ChangeLanguage'
    if (intercept.length > 0) window._qsie.push(intercept);
}
*/
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){try{b['super_cat']=window.document.querySelector('.breadcrumbs :nth-child(2)').href.replace(/\D/g,'')}catch(e){}} } catch(e){ utag.DB(e); }  },
function(a,b){ try{ if(1){try{b['dark_mode']=window.matchMedia?String(window.matchMedia('(prefers-color-scheme: dark)').matches):'NA'}catch(e){}} } catch(e){ utag.DB(e); }  },
function(a,b){ try{utag.runonce = utag.runonce || {};utag.runonce.ext = utag.runonce.ext || {};if(typeof utag.runonce.ext[393]=='undefined'){utag.runonce.ext[393]=1;if(1){
// These tags fire only after page views.  They do not fire after events
if (a === 'view') {
    if (utag.data['page_type'] === 'TEC') {
        utag.data['ref_page_type'] = "";
        utag.data['ref_page_sub_type'] = "";
        utag.data['ref_page_id'] = "";
        utag.data['ref_page_event'] = "";
    }
    utag.data["view_processed_and_sent"] = true;
    document.cookie = "udo-data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "wt-tracking=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

}}} catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
utag.pushPartListOnConfirmation = function(data) {
    if (utag.pPartListToPost === true) {
        utag.dkStdVars(utag.data);
        if (utag.framework['isOrderConfirmationHTML'](b)) {
            utag.data['ref_page_event'] = 'Submit Order';
            if (typeof utag.ga !== 'undefined' && utag.ga.hasOwnProperty('sendPurchaseEvent')) {
                utag.ga.sendProductListforPurchase(utag.data);
                utag.ga.sendPurchaseEvent();
            }
            utag.clearPartData()
        }
    }
}

// process the Part List Queue
utag.processOrderConfirmation = function() {
    try {
        var uque = utag.queue, i = 0;
        if (typeof uque !== 'undefined' && uque.hasOwnProperty('purchaseEnd')) {
            var charCount = 0;
            if (utag.data['page_sub_type'] === 'SCN') {
                for (i;i<uque.purchaseParts.length;i++) {
                    var PartDesc = uque.purchaseParts[i];
                    charCount = charCount + JSON.stringify(PartDesc).length;
                    utag.pIds.push(PartDesc['part_id'] || '(Not Set)');
                    utag.pSku.push(PartDesc['pn_sku'] || '(Not Set)');
                    utag.pDesc.push(PartDesc['part_description'] || '(Not Set)');
                    utag.pSup.push(PartDesc['supplier_id'] || '(Not Set)');
                    utag.pQty.push(PartDesc['part_qty'] || '(Not Set)');
                    utag.pCat.push(PartDesc['part_category'] || '(Not Set)');
                    utag.pSStat.push(PartDesc['stock_status'] || '(Not Set)');
                    utag.pPrc.push(PartDesc['line_item_price'] || '(Not Set)');
                    utag.pWID.push(PartDesc['web_id'] || '(Not Set)');
                    utag.pVType.push(utag.framework["testForMerchandising"](PartDesc['supplier_id']) || 'Digi-Key');
                    if (charCount > 18000) {
//                        utag.sendProductList();
//                        charCount = 0;
                        break;
                    }
                }
                utag.sendProductList();
            }
        } else if (utag.data['page_sub_type'] === 'SCN') {
            utag.dkStdVars(utag.data);
            utag.ga.sendPurchaseEvent();
            utag.clearPartData()
        }
    } catch(e) {
        data['ExtRun'] = utag.dkTrk('480-e');
        utag.dkErrorTag(data,e.name,e.message + '--480 -- ' +errDisp);
    }
}

if (a === 'view') {
    if (b.page_type === 'SC' && b.page_sub_type==='SCN') {
        window.plIterator = 0;
        waitForParts = setInterval(function() {
            try {
                if (typeof utag.queue === 'object' 
                && utag.queue.hasOwnProperty('purchaseEnd')
                && utag.data['view_processed_and_sent']) {
                    clearInterval(waitForParts);
                    utag.processOrderConfirmation();
                }
                window.plIterator++;
                if (window.plIterator > 50) {
                    clearInterval(waitForParts);
                    utag.processOrderConfirmation();
                }
            } catch (e) {
                clearInterval(waitForParts);
            }
        },200);
    } /*else {
        // handle the case where the part list wasn't sent
        utag.dkStdVars(utag.data);
        if (utag.framework['isOrderConfirmationHTML'](b) && utag.data['ref_page_event'] == 'Submit Order') {
//            utag.data['ref_page_type'] = 'SC';
//            utag.data['ref_page_sub_type'] = 'POR';
//            utag.data['ref_page_id'] = 'POR';
//            utag.data['ref_page_event'] = 'Submit Order';
            utag.ga.sendPurchaseEvent();
            utag.clearPartData()
        }
    }*/
}
    


} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (a === 'view') {
    if (typeof utag_cfg_ovrd.evergageCampaigns !== 'undefined') {
        utag.framework.processEvergageCampaigns(utag_cfg_ovrd.evergageCampaigns);
        utag_cfg_ovrd.evergageCampaigns = "";
    }
}

utag_cfg_ovrd.view_processed = true;
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
// Clean up After Tags - 370
utag.data['ExtRun'] = "";
utag.data['ExtDln'] = "";
utag.data['ref_page_category'] = "";
utag.data['ref_page_event'] = "";
utag.data['ref_page_type'] = "";
utag.data['ref_page_sub_type'] = "";
utag.data['ref_page_id'] = "";
utag.data['cp.utm_data_x'] = "";
// Not sure why we were clearing tags here.  If we have to add the commented lines back in, assign the referring page values before doing so (8/5/2020)
//utag.data['part_search_term'] = "";
utag.data['part_search_results_count'] = "";
//utag.data['part_search_filter'] = "";
} } catch(e){ utag.DB(e) }  }];
  utag.handler.cfg_extend=[{"bwq":0,"blr":1,"end":0,"id":"398","alr":0},{"bwq":0,"blr":1,"end":0,"id":"356","alr":0},{"blr":1,"bwq":0,"alr":0,"id":"331","end":0},{"alr":0,"id":"357","end":0,"blr":1,"bwq":0},{"end":0,"id":"518","alr":0,"bwq":0,"blr":1},{"blr":1,"bwq":0,"id":"300","end":0,"alr":0},{"bwq":0,"blr":1,"alr":0,"end":0,"id":"239"},{"end":0,"id":"497","alr":0,"bwq":0,"blr":1},{"blr":1,"bwq":0,"alr":0,"id":"421","end":0},{"end":0,"id":"423","alr":0,"bwq":0,"blr":1},{"blr":1,"bwq":0,"id":"447","end":0,"alr":0},{"bwq":0,"blr":1,"end":0,"id":"451","alr":0},{"blr":1,"bwq":0,"alr":0,"id":"457","end":0},{"alr":0,"id":"459","end":0,"blr":1,"bwq":0},{"id":"466","end":0,"alr":0,"blr":1,"bwq":0},{"blr":1,"bwq":0,"id":"471","end":0,"alr":0},{"blr":1,"bwq":0,"id":"472","end":0,"alr":0},{"blr":1,"bwq":0,"alr":0,"id":"479","end":0},{"end":0,"id":"527","alr":0,"bwq":0,"blr":1},{"blr":1,"bwq":0,"id":"528","end":0,"alr":0},{"blr":0,"bwq":0,"alr":1,"id":"3","end":0},{"alr":1,"end":0,"id":"361","bwq":0,"blr":0},{"alr":1,"id":"397","end":0,"blr":0,"bwq":0},{"end":0,"id":"405","alr":1,"bwq":0,"blr":0},{"blr":0,"bwq":0,"alr":1,"id":"410","end":0},{"end":0,"id":"429","alr":1,"bwq":0,"blr":0},{"bwq":0,"blr":0,"end":0,"id":"433","alr":1},{"blr":0,"bwq":0,"id":"439","end":0,"alr":1},{"blr":0,"bwq":0,"alr":1,"id":"445","end":0},{"alr":1,"end":0,"id":"448","bwq":0,"blr":0},{"alr":1,"end":0,"id":"455","bwq":0,"blr":0},{"end":0,"id":"456","alr":1,"bwq":0,"blr":0},{"blr":0,"bwq":0,"id":"435","end":0,"alr":1},{"blr":0,"bwq":0,"alr":1,"id":"323","end":0},{"id":"458","end":0,"alr":1,"blr":0,"bwq":0},{"bwq":0,"blr":0,"alr":1,"end":0,"id":"462"},{"alr":1,"id":"464","end":0,"blr":0,"bwq":0},{"end":0,"id":"465","alr":1,"bwq":0,"blr":0},{"blr":0,"bwq":0,"alr":1,"id":"467","end":0},{"alr":1,"id":"475","end":0,"blr":0,"bwq":0},{"alr":1,"end":0,"id":"478","bwq":0,"blr":0},{"alr":1,"id":"483","end":0,"blr":0,"bwq":0},{"end":0,"id":"491","alr":1,"bwq":0,"blr":0},{"blr":0,"bwq":0,"alr":1,"id":"494","end":0},{"id":"499","end":0,"alr":1,"blr":0,"bwq":0},{"blr":0,"bwq":0,"id":"505","end":0,"alr":1},{"bwq":0,"blr":0,"alr":1,"end":0,"id":"512"},{"alr":1,"end":0,"id":"514","bwq":0,"blr":0},{"alr":0,"end":1,"id":"393","bwq":0,"blr":0},{"alr":0,"end":1,"id":"480","bwq":0,"blr":0},{"alr":0,"id":"484","end":1,"blr":0,"bwq":0},{"alr":0,"end":1,"id":"370","bwq":0,"blr":0}];
  utag.loader.initcfg = function(){
    utag.loader.cfg={"304":{load:1,send:1,v:201805151502,wait:0,tid:20067},"269":{load:(utag.cond[91] && utag.cond[141] && utag.cond[118]),send:1,v:202103121810,wait:1,tid:7110},"211":{load:(utag.cond[141] && utag.cond[132] && utag.cond[90]),send:1,v:202103121810,wait:1,tid:7110},"172":{load:(utag.cond[142] && utag.cond[63] && utag.cond[136]),send:1,v:202002141927,wait:1,tid:20078},"192":{load:(utag.cond[142] && utag.cond[67] && utag.cond[136]),send:1,v:202002141927,wait:1,tid:11003},"204":{load:(utag.cond[142] && utag.cond[136] && utag.cond[97] && utag.cond[138]),send:1,v:202003022139,wait:1,tid:6026},"207":{load:(utag.cond[142] && utag.cond[79] && utag.cond[136] && utag.cond[2]),send:1,v:202002141927,wait:1,tid:7117},"208":{load:(utag.cond[142] && utag.cond[80] && utag.cond[136] && utag.cond[2]),send:1,v:202002141927,wait:1,tid:7117},"214":{load:(utag.cond[136] && utag.cond[82]),send:1,v:201907222054,wait:1,tid:7001},"267":{load:(utag.cond[141] && utag.cond[118] && utag.cond[131] && utag.cond[101]),send:1,v:202103121810,wait:1,tid:7110},"268":{load:(utag.cond[142] && utag.cond[136] && utag.cond[97] && utag.cond[98]),send:1,v:202002141927,wait:1,tid:6026},"272":{load:(utag.cond[142] && utag.cond[136] && utag.cond[23]),send:1,v:202002141927,wait:1,tid:25019},"274":{load:(utag.cond[142] && utag.cond[136] && utag.cond[27]),send:1,v:202002141927,wait:1,tid:20067},"279":{load:utag.cond[106],send:1,v:202007202104,wait:1,tid:20067},"288":{load:1,send:1,v:201801010024,wait:1,tid:20010},"299":{load:(utag.cond[115] && utag.cond[138]),send:1,v:202012112132,wait:1,tid:15022},"301":{load:(utag.cond[136] && utag.cond[116] && utag.cond[43]),send:1,v:201904081403,wait:1,tid:20078},"303":{load:(utag.cond[136] && utag.cond[117]),send:1,v:202010282035,wait:1,tid:3158},"312":{load:(utag.cond[121] && utag.cond[142] && utag.cond[136] && utag.cond[138]),send:1,v:202008072046,wait:1,tid:2045},"316":{load:(utag.cond[142] && utag.cond[136] && utag.cond[8] && utag.cond[126]),send:1,v:202011162150,wait:1,tid:7132},"321":{load:(utag.cond[142] && utag.cond[136] && utag.cond[138] && utag.cond[126]),send:1,v:202011162150,wait:1,tid:7132},"335":{load:(utag.cond[142] && utag.cond[79] && utag.cond[136] && utag.cond[8]),send:1,v:202002141927,wait:1,tid:11003},"336":{load:(utag.cond[142] && utag.cond[136]),send:1,v:202002141927,wait:1,tid:12047},"337":{load:(utag.cond[91] && utag.cond[136]),send:1,v:201905081802,wait:1,tid:17003},"338":{load:(utag.cond[137] && utag.cond[136]),send:1,v:202002032048,wait:1,tid:17003},"339":{load:(utag.cond[142] && utag.cond[8] && utag.cond[27]),send:1,v:202002141927,wait:1,tid:14022},"340":{load:(utag.cond[142] && utag.cond[136] && utag.cond[138] && utag.cond[27]),send:1,v:202002141927,wait:1,tid:14022},"343":{load:(utag.cond[142] && utag.cond[91] && utag.cond[138] && utag.cond[27]),send:1,v:202004082042,wait:1,tid:20010},"344":{load:(utag.cond[121] && utag.cond[142] && utag.cond[136] && utag.cond[8]),send:1,v:202004152119,wait:1,tid:2063},"351":{load:(utag.cond[142] && utag.cond[136] && utag.cond[135]),send:1,v:202002141927,wait:1,tid:20010},"353":{load:(utag.cond[142] && utag.cond[136] && utag.cond[140] && utag.cond[138]),send:1,v:202008072046,wait:1,tid:11023},"355":{load:(utag.cond[142] && utag.cond[136] && utag.cond[135] && utag.cond[138]),send:1,v:202008072046,wait:1,tid:20010},"357":{load:(utag.cond[115] && utag.cond[2]),send:1,v:202012112132,wait:1,tid:15022},"358":{load:utag.cond[143],send:1,v:202008242125,wait:1,tid:7125},"363":{load:(utag.cond[142] && utag.cond[144] && utag.cond[136]),send:1,v:202010192035,wait:1,tid:20010},"364":{load:(utag.cond[142] && utag.cond[136]),send:1,v:202010262005,wait:1,tid:4049}};
utag.loader.cfgsort=["304","269","211","172","192","204","207","208","214","267","268","272","274","279","288","299","301","303","312","316","321","335","336","337","338","339","340","343","344","351","353","355","357","358","363","364"];
  }
utag.loader.initcfg();
}

  if(typeof utag_cfg_ovrd!='undefined'){for(utag._i in utag.loader.GV(utag_cfg_ovrd))utag.cfg[utag._i]=utag_cfg_ovrd[utag._i]};
  utag.loader.PINIT = function(a,b,c){
    utag.DB("Pre-INIT");
    if (utag.cfg.noload) {
      return;
    }

    try {
      // Initialize utag.data
      this.GET();
      // Even if noview flag is set, we still want to load in tags and have them ready to fire
      // FUTURE: blr = "before load rules"
      if(utag.handler.RE('view',utag.data,"blr")){
        utag.handler.LR(utag.data);
      }
      
    }catch(e){utag.DB(e)};
    // process 'blocking' tags (tags that need to run first)
    a=this.cfg;
    c=0;
    for (b in this.GV(a)) {
      // external .js files (currency converter tag) are blocking
      if(a[b].block == 1 || (a[b].load>0 && (typeof a[b].src!='undefined'&&a[b].src!=''))){
        a[b].block = 1;
        c=1;
        this.bq[b]=1;
      }
    }
    if(c==1) {
      for (b in this.GV(a)) {
        if(a[b].block){
          // handle case of bundled and blocking (change 4 to 1)
          // (bundled tags that do not have a .src should really never be set to block... they just run first)
          a[b].id=b; 
          if(a[b].load==4)a[b].load=1; 
 	  a[b].cb=function(){
            var d=this.uid;
            utag.loader.cfg[d].cbf=1;
            utag.loader.LOAD(d)
          };
          this.AS(a[b]);
        }
      }
    }
    if(c==0)this.INIT();
  };
  utag.loader.INIT = function(a, b, c, d, e) {
    utag.DB('utag.loader.INIT');
    if (this.ol == 1) return -1;
    else this.ol = 1;
    // The All Tags scope extensions run after blocking tags complete
    // The noview flag means to skip these Extensions (will run later for manual utag.view call)
    if(utag.cfg.noview!=true)utag.handler.RE('view',utag.data,"alr"); 

    utag.rpt.ts['i'] = new Date();
     
    d = this.cfgsort;
    // TODO: Publish engine should sort the bundled tags first..
    for (a=0;a<d.length;a++){
      e = d[a];
      b = this.cfg[e];
      b.id = e;
      if(b.block != 1){
        // do not wait if the utag.cfg.noview flag is set and the tag is bundled
        if (utag.loader.bk[b.id] || ((utag.cfg.readywait||utag.cfg.noview) && b.load==4)){
          this.f[b.id]=0;
          utag.loader.LOAD(b.id)
        }else if (b.wait == 1 && utag.loader.rf == 0) {
	  utag.DB('utag.loader.INIT: waiting ' + b.id);
          this.wq.push(b)
          this.f[b.id]=2;
        }else if (b.load>0){
	  utag.DB('utag.loader.INIT: loading ' + b.id);
	  this.lq.push(b);
          this.AS(b);
        }
      }
    }
          
    if (this.wq.length > 0) utag.loader.EV('', 'ready', function(a) {
      if(utag.loader.rf==0){
        utag.DB('READY:utag.loader.wq');
        utag.loader.rf=1;
        utag.loader.WQ();
      }
    });
    else if(this.lq.length>0)utag.loader.rf=1;
    else if(this.lq.length==0)utag.loader.END();

    return 1
  };
  utag.loader.EV('', 'ready', function(a) {if(utag.loader.efr!=1){utag.loader.efr=1;try{ try{ if(1){
utag.getHeaderNavHrchy = function(data,sElements)  {
    var submenu = [];
        var text = '',identifier = '',texta = [], i = 0, delineator = '->',innrtxt = "";
        var titleElm = [], itemElm = [], flyElm = [], flyout = "";
        var results = "";

    try {
    
        if (utag.data['page_language'] !== 'en') return;
        if (sElements.hasOwnProperty('Logout')) {
            data.ref_page_event = 'Log Out';
            return;
        }
    
        submenu = document.getElementsByClassName('section open')
        if (submenu.length > 0) {
            innrtxt = submenu[0].innerText.split('\n')[0];
            results = innrtxt.toUpperCase().trim();
            submenu = document.getElementsByClassName('item open');
            for (i = 0; i < submenu.length; i++) {
                innrtxt = submenu[i].innerText.split('\n')[0];
                results += delineator + innrtxt.trim();
            }
            if (typeof sElements['Flyout'] !== 'undefined') {
                innrtxt = sElements['Flyout'].innerText;
                results += delineator + innrtxt.trim() + ' - Flyout'; 
            }
            if (results.length > 0) {
                if (results.indexOf('HELLO') === 0) {
                    results = 'MyDigiKey';
                }
                if (results === 'LOGIN OR') {
                    results = 'Login or Register';
                }
                data.ref_page_category = results;
                data['ExtRun'] = utag.dkTrk('434.1');
            }
        } else {
            var i;
            submenu =document.getElementsByClassName('flymenu__open');
            for (i=0;i<submenu.length;i++) {
                titleElm = submenu[i].getElementsByClassName('flymenu__section-title')[0];
                if (titleElm) {
                    results = titleElm.text.toUpperCase().trim();
                } else {
                    if (submenu[i].tagName === 'LI') {
                        itemElm = submenu[i].getElementsByClassName('flymenu__item-title')[0];
                        if (itemElm) {
                            results += delineator+itemElm.text.trim();
                        }
                        if (typeof sElements['Flyout'] !== 'undefined') {
                            innrtxt = sElements['Flyout'].innerText;
                            results += delineator + "Featred: " + innrtxt.trim(); 
                        }
                    }
                }
                if (flyout !== "") results += delineator+flyout;
            }
            if (results.length > 0) {
                if (results.indexOf('HELLO') === 0) {
                    results = 'MyDigiKey';
                }
                if (results.indexOf('LOGIN OR') === 0) {
                    results = 'Login or Register';
                }
            }
            data.ref_page_category = results || data.ref_page_category;
            data['ExtRun'] = utag.dkTrk('434.2');
        }
    } catch (e) {
//        data['ExtRun'] = utag.dkTrk('434.1-' + e.message);
//        var x = i ||0; var errDisp = "undefined";
//        if (typeof submenu[x].innerText !== 'undefined') {
//            errDisp = submenu[x].innerText.replace(/\n/g,'|');
//        }
//        utag.dkErrorTag(data,'434.1'+e.message,submenu[x].className + "--" + errDisp);
        utag.DB(e);
    }
};

} } catch(e){ utag.DB(e) }  }catch(e){utag.DB(e)};
try{ try{ if(1){

utag.dkCookieImpl = function(dataObj){
    if (typeof dataObj === 'object') {
        var tag = "",del="";
        if (typeof utag.newEventDefaultValues === 'function') utag.newEventDefaultValues(dataObj,'cookie');
        for (var i in dataObj) {
            if (typeof dataObj[i] === 'string') {
                dataObj[i] = dataObj[i].replace(/,/g,'@@');
                try {
                tag += del+i+'='+decodeURIComponent(dataObj[i]);
                } catch(e) {
                    tag += del+i+'='+dataObj[i];
                }
                del = ",";
            }
        }
        tag += ',ExtRun=' + decodeURIComponent(utag.dkTrk("357.5"));
        var now = new Date();
        var time = now.getTime();
        time += 600 * 1000;
        now.setTime(time);
        var enctag = encodeURIComponent(tag);
        document.cookie = "utm_data_x="+enctag +";path=/;expires="+now.toUTCString()+";domain="+utag.cfg.domainForCookies+";";
        if (typeof b !== 'undefined') b['cp.utm_data_x'] = enctag;
        utag.data['cp.utm_data_x'] = enctag;
        utag.DB('Write utm_data_x');
        utag.DB(tag);
    }
}

utag.newCookie = function (a) {
    try {
        utag.dkTrk("428.1")
        utag.dkCookieImpl(a)
    } catch (e) {
        utag.DB(e);
    }
}

utag.dkCookie = function (a) {
  try {
    if (a.indexOf("Initiate Search")>=0) return;
    var utagData = utag.dkParseStringtoDataObj(a);
    utag.dkTrk('428.2');
    utag.dkCookieImpl(utagData);
    utag.data.prorityCookie = true;
} catch (e) {
  utag.DB(e);
}
  }
  
utag.dkISCookie = function (a) {
    try {
        var utagData = utag.dkParseStringtoDataObj(a);
        utag.dkTrk('428.4');
        utag.dkCookieImpl(utagData);
        utag.data.prorityCookie = true;
    } catch (e) {
        utag.DB(e);
    }
}
  
} } catch(e){ utag.DB(e) }  }catch(e){utag.DB(e)};
try{ try{ if(1){
utag.checkClassPath = function(a,classStr) {
    var element = a.target, counter = 0;
    while (element && counter < 10) {
        if (element.className.indexOf(classStr)>=0) {
            return true;
        }
        counter++;
        element = element.parentElement;
    }
    return false;
}
  
utag.tagSearchKeypressEvent = function(a,b,c,d,e) {
    var enterKeyPressed = false;
    if (a.key === 'Enter') {enterKeyPressed = true;}
    else if (a.keyCode === 13) {enterKeyPressed = true;}
    if (!enterKeyPressed) return;

    var cv = "ref_page_event=Initiate Search";
    if (utag.data.do_not_track_for_consent === 'yes' && typeof utag.clearDoNotTrack === 'function') {
        fStage = 'Clear Consent';
        utag.clearDoNotTrack("unknown",cv);
    }
    if (utag.checkClassPath(a,"show-advanced")) {
        cv += ",html_element1=show-advanced";
    }
    utag.dkTrk("389.3");
    utag.dkISCookie(cv);
};    

utag.tagSearchKeypress = function(searchElements) {
  var i,i1;
  var navElement = [];
  utag.DB('Add Nav Events');
  for (i = 0; i < searchElements.length; i++) {
      navElement = searchElements[i];
      if (navElement['type'] == 'c') {
        var elementy = document.getElementsByClassName(navElement['element']);
	    if (elementy !== null && typeof elementy !== undefined) {
      	    for (i1 = 0; i1 < elementy.length; i1++) {
	            utag.loader.EV(elementy[i1],'keydown',utag.tagSearchKeypressEvent);
	        }
	    }
      } else if (navElement['type'] == 'i') {
            var elementx = document.getElementById(navElement['element']);
            if (elementx !== null && typeof elementx !== 'undefined') {
                utag.loader.EV(elementx,'keydown',utag.tagSearchKeypressEvent);
            }
      }
  }
};

utag.tagSearchKeypress([{type:'i',element:'custom-search'},{type:'i',element:'header-search'},{type:'c',element:'product-search-text'},{type:'i',element:'header-search'},
    {type:'i',element:'header_search_bar'},{type:'i',element:'search-textbox'},{type:'c',element:'search-textbox'}]);

} } catch(e){ utag.DB(e) }  }catch(e){utag.DB(e)};
try{ try{ if(1){
utag.dkGetEventForPageType = function(pageType) {
    retval = "";
    switch (utag.dkConCatPageType()) {
        case 'RDL-DP':
        case 'RDL-HP':
        case 'RDL-RP':
            retval = "ref_page_event=Search RDL";
            break;
        case 'VI-VL':
            retval = 'ref_page_event=Search Video Library';
            break;
        case 'PS-FAM':
        case 'PS-CAT':
            retval = 'ref_page_event=Search Within Results';
            break;
    }
    return retval;
    
}

utag.tagGSearchNav = function(a, b, c, d, e) {
    if (a.target.type === 'text') return;
    var pagtp = utag.dkConCatPageType();
    var cv = utag.dkGetEventForPageType(pagtp);
    if (cv !== "") {
        utag.dkTrk('446.1');
        utag.dkISCookie(cv);
    }
};
  
utag.tagGSearchKeypressEvent = function(a,b,c,d,e) {
    var enterKeyPressed = false;
    if (a.key === 'Enter') {enterKeyPressed = true;}
    else if (a.keyCode === 13) {enterKeyPressed = true;}
    if (!enterKeyPressed) return;

    var pagtp = utag.dkConCatPageType();
    var cv = utag.dkGetEventForPageType();
    if (cv !== "") {
        utag.dkTrk("446.2");
        utag.dkISCookie(cv);
    }
};    

utag.tagGSearch = function(searchElements) {
    var i,i1;
    var navElement = [];
    for (i = 0; i < searchElements.length; i++) {
        navElement = searchElements[i];
        if (navElement['type'] == 'c') {
            var elementy = document.getElementsByClassName(navElement['element']);
            if (elementy !== null && typeof elementy !== undefined) {
                for (i1 = 0; i1 < elementy.length; i1++) {
                    utag.loader.EV(elementy[i1],'mousedown',utag.tagGSearchNav);
                    utag.loader.EV(elementy[i1],'keydown',utag.tagGSearchKeypressEvent);
                }
            }
        } else if (navElement['type'] == 'i') {
            var elementx = document.getElementById(navElement['element']);
            if (elementx !== null && typeof elementx !== 'undefined') {
                utag.loader.EV(elementx,'mousedown',utag.tagGSearchNav);
                utag.loader.EV(elementx,'keydown',utag.tagGSearchKeypressEvent);
            }
        }
    }
}
  
utag.tagGSearch([{type:'c',element:'SearchBar'},{type:'c',element:'searchbar'},{type:'c',element:'search-within-clone'}
    ,{type:'i',element:'search-keyword'},{type:'i',element:'search-within-button'},{type:'c',element:'psdkdirchanger search-input'}]);


} } catch(e){ utag.DB(e) }  }catch(e){utag.DB(e)};
try{ try{ if(1){

utag.processPandAEvents = function(evt) {
    var cntr = 0;
    if (utag.data.page_type === 'P&A') {
        if (utag.data.page_sub_type === 'RLS'||utag.data.page_sub_type === 'ADP'){
            var target = evt.target;
            while (target && cntr < 5) {
                if (target.id == 'btnAdd' && target.innerHTML == 'Add to list') {
                    utag.dkTrk('416.1');
                    utag.dkLink("ref_page_event=Add Part to List");
                    break;
                }
                target = target.parentElement;
                cntr++;
            }
        }
    }
}



} } catch(e){ utag.DB(e) }  }catch(e){utag.DB(e)};
try{ try{ if(1){
utag.framework = utag.framework||{};

utag.framework["checkSpecializedTrackableEvents"] = function(element) {
    var retval = false;
    if (element.getAttribute('aria-controls') !== null && element.getAttribute('aria-controls') !== "") retval = true;
    if (typeof element.className === 'string') {
        if (element.className.indexOf('swiper-slide') > -1) retval = true;
        if (element.className.indexOf('dk-tab-item') > -1) retval = true;
    }
    if (element.tagName.toLowerCase() === 'copy-icon') retval = true;
    if (element.getAttribute('track-data') === 'ref_page_event=Change Parametric Search Presentation') {
        retval = true;
    }
    return retval;
}


utag.framework["testForTrackableElement"] = function(element) {
    var trackableElement = false;
    if (typeof element.tagName !== 'string') return trackableElement;
    if (element.tagName.toLowerCase().match(/^a$|^button$|^span$|^img$/i) !== null) {
        trackableElement = true;
    } else if (element.tagName.toLowerCase() === 'input' && element.type.toLowerCase().match(/button|submit/i) !== null) {
        trackableElement = true;
    } else if (element.onclick !== null  || element.onchange !== null) {
        if (element.className !== "flymenu-body") {
            trackableElement = true;
        }
    } else if (element.nodeName.toLowerCase() === 'select') {
        trackableElement = true;
    } else if (!trackableElement && typeof utag.framework.hasOwnProperty("checkSpecializedTrackableEvents")) {
            trackableElement = utag.framework["checkSpecializedTrackableEvents"](element);
    }
    return trackableElement;
}

} } catch(e){ utag.DB(e) }  }catch(e){utag.DB(e)};
try{ try{ if(1){
// Control what is implemented in test.
utag.parseDataStr = function(str)
{

    var returnObj = {}, e = str.split(";");
    for (var i = 0; i < e.length; i++) {
        if (e[i].indexOf('=')>=0) {
            var r = e[i].split("=");
            r[0] = r[0].trim();
            r[1] = r[1].trim();
            if (r[0].length > 0 && r[1].length > 0) {
                returnObj[(r[0])]=r[1];
            }
        } else if (e[0] === str) {
            returnObj['ref_page_event'] = str;
            break;
        }
    }
    return returnObj;
    
}

utag.collectSpecElements = function(element,sElements,cntrl) {
    if (typeof element.className !== 'string') return;
    
    // General
    
    // for Header Nav
    if (element.className.indexOf('featured__flyout__text') >= 0) sElements['Flyout'] = element;  //old
    if (element.className.indexOf('flymenu__featured') >= 0) sElements['Flyout'] = element;
    if (element.className.indexOf('cta-button') >= 0) sElements['Flyout'] = element;//old
    if (typeof element.href !== 'undefined' && element.href.toLowerCase().indexOf('logout') >= 0) sElements['Logout'] = element;
    if (typeof element.href !== 'undefined' && element.href.indexOf('/help/authorized-distributor') >= 0) sElements['ECIA Distributor'] = element;
    
    // for Additional Header
    if (element.className.indexOf('country-drawer') >= 0 && element.className.indexOf('country-drawer closed') < 0) sElements['Change Country'] = element;
    if (element.className.indexOf('lang-dropdown-list') >= 0) sElements['Change Language'] = element;
    if (element.className.indexOf('cur-dropdown-list') >= 0) sElements['Change Currency'] = element;
    if (element.className.indexOf('currency-prompt-update-preferences-button dk-btn__primary') >= 0) sElements['Change Currency-Update Preferences'] = element;
    if (element.className.indexOf('dk-link bottom-link') >= 0 && typeof element.href != 'undefined' && element.href.indexOf('/resources/local-support') >= 0) sElements['Change Currency-Help and Support'] = element;

    // for Part Search Family Page
    if (element.className.indexOf('lnkDatasheet') >= 0) sElements['Asset'] = element;
    if (element.className.indexOf('tr-qtyAvailable') >= 0) sElements['Help for Parts'] = element;
    if (element.className.indexOf('tr-packaging') >= 0) sElements['Help for Parts'] = element;
    if (element.className.indexOf('tr-series') >= 0) sElements['View Series'] = element;
    if (element.className.indexOf('tr-vendor') >= 0) sElements['Select Manufacturer'] = element;
    if (element.className.indexOf('catfiltertopitem') >= 0) sElements['Cat Header'] = element;
    if (element.className.indexOf('newProductCategory') >= 0) sElements['Cat New Product'] = element;
    if (element.id === 'addtoorderbutton' || element.id === 'update-addToOrder-btn') sElements['Add Part'] = element;
    
    // for Part Detail Page
    if (element.className.indexOf('button btnLeadTime') >= 0) sElements['Lead Time'] = element;
    if (element.className.indexOf('link') >= 0 && 
        typeof element.href != 'undefined' && element.href.indexOf('/local-support#FAQs6') >= 0) sElements['Select Learn More'] = element; //for PDP & SC

    // for Part Search Category Page
    if (element.className.indexOf('chosen-results') >= 0){
        sElements['Supplier Search'] = element;
        cntrl.trackableElement = true;
    } 
    // Part Search 2.0
    // keep the data-term-key attribute handling.  It clears part_search_term, etc. when the user removes the last search term
    if (element.getAttribute('data-term-key')) sElements['Search Term'] = element;
    // Keep the following two elements.  It is a Search 2 feature that is implemented by the Rocket team for the search term dropdowns
    if (element.className.indexOf('suggestions--part-number') >= 0) sElements['Part Number Type Ahead'] = element;
    if (element.className.indexOf('search__suggestions') >= 0 && element.className.indexOf('suggestions--part-number') < 0) sElements['Categories Type Ahead'] = element;
    if (element.getAttribute('data-testid') === 'filter-box-inner-ref' ||
        element.getAttribute('data-testid') === 'filter-box-group--1') sElements['Filter on Supplier'] = element;
    if (element.getAttribute('data-testid') === 'data-table-0-product-number') sElements['Select Part'] = element;
    if (element.getAttribute('data-atag') === 'tr-manufacturer' || element.getAttribute('data-atag') == 'tr-supplier') sElements['Select Manufacturer'] = element;
    if (element.getAttribute('data-atag') === 'tr-series') sElements['View Series'] = element;
    if (element.getAttribute('data-testid') === 'per-page-selector') sElements['Change Number of Results Displayed'] = element;
    if (element.getAttribute('data-testid') === 'download-table-button') sElements['Download Table'] = element;
    if (element.getAttribute('data-testid') === 'marketplace-messages') sElements['View Marketplace Message'] = element;
    if (element.getAttribute('data-testid') === 'pagination-container') sElements['Change Page in Search Results'] = element;
    if (element.getAttribute('data-testid') === 'help-icon-trigger') sElements['Help for Parts'] = element;
    if (element.getAttribute('data-testid') === 'overview-supplier') sElements['Link to Supplier'] = element;
    if (element.getAttribute('data-testid') === 'marketplace-messages') sElements['View Marketplace Message'] = element;
    if (element.getAttribute('data-testid') === 'compare-button') sElements['Click Compare Parts'] = element;
    if (element.getAttribute('data-testid') === 'shared-toggle') sElements['Hide or Expose Shared Attributes'] = element;
    if (element.getAttribute('data-testid') === 'remove-column-button') sElements['Remove Part from Comparison'] = element;
    if (element.getAttribute('data-testid') === 'compare-table') sElements['Link from Product Comparison'] = element;

    // for Shopping Cart
    if (element.className.indexOf('button-checkout') >= 0) sElements['Checkout'] = element;
    if (element.id === 'btnAddToCart' || element.id === 'btnAddToNewCart') sElements['Upload File'] = element;
    if (element.id === 'btnImportParts') sElements['Add Part List'] = element;
    if (element.className.indexOf('btnAddToCart') >= 0) sElements['Add Part Manually'] = element;
    if (element.id === 'WC_SubmitOrderBtn' || element.id === 'WC_SubmitOrderBtn2') sElements['Submit Order'] = element;  //for China
    if (element.className.indexOf('cartRowShippedByMessage') >= 0) sElements['View Marketplace Message'] = element;
    // for test: if (element.className.indexOf('link') >= 0 && element.href.indexOf('/local-support') >= 0) sElements['Select Learn More'] = element; 
    
    // for Supplier Centers
    if (element.className.indexOf('supplier-result-container') >= 0) sElements['Link to Newest Products'] = element;
    if (element.className.indexOf('supplier-result-container') >= 0) {
        sElements['Link to Newest Products'] = element;
        cntrl.trackableElement = true;
    }
    
    if (element.id === 'nav') {
        sElements['Supplier Page Nav'] = element;
        cntrl.trackableElement = true;
    }
    // for PCB Builder
    if (element.className.indexOf('dk-tab-item') >= 0) sElements['Tab Item'] = element;
    
    // for BOM
    if (element.id === 'btnAddToCart') sElements['BOM Add to Cart'] = element;
    if (element.id === 'apply-assemblies-btn') sElements['BOM Apply Assemblies'] = element;
    // for Evergage Personalization
    if (element.id.indexOf('evergage-tooltip') >= 0) {
        sElements['Evergage Click'] = element;
        cntrl.repressTag = true;
    }
    // for Help
    if (element.className.indexOf('expand-section-link') >= 0) {
        sElements['Expand Help Section'] = element;
        cntrl.trackableElement = true;
    }
    
//    if (utag.data['ut.env'] === 'qa') {
//        var fakeElement = {};
//        fakeElement.id = 'evergage-tooltip-ambm8NwK';
//        sElements['Evergage Click'] = fakeElement;
//        cntrl.repressTag = true;
//        }
}

utag.postDCSpecializedFunc = function(tags,sElements,cntrl) {
    if (tags.ref_page_event === 'Header Nav') {
        if (typeof utag.getHeaderNavHrchy !== 'undefined') utag.getHeaderNavHrchy(tags,sElements);
    } else if (tags.ref_page_event === 'Footer Nav' || tags.ref_page_event === 'Footer Nav - Contact Us') {
        if (typeof utag.fixUpFooter === 'function') cntrl.eventType = utag.fixUpFooter(tags,sElements,cntrl.eventType);
    } else if (utag.data['page_type'] === 'PS' && (utag.data['page_sub_type'] === 'FAM' ||utag.data['page_sub_type'] === 'CAT'
        ||utag.data['page_sub_type'] === 'PD'||utag.data['page_sub_type'] === 'SR'||utag.data['page_sub_type'] === 'PCAT') ) {
        if (typeof utag.fixUpFamilyPage !== 'undefined') cntrl.eventType = utag.fixUpFamilyPage(tags,sElements,cntrl.eventType)
    } else if (utag.data['page_type'] === 'SC' && utag.data['page_sub_type'] === 'CO') {
        if (typeof utag.fixUpShoppingCart !== 'undefined') utag.fixUpShoppingCart(tags,sElements);
    } else if (utag.data['page_type'] === 'SC' && utag.data['page_sub_type'] === 'POR'
        && utag.data['page_site'] === 'CN') {
        if (typeof utag.fixUpShoppingCart !== 'undefined') cntrl.eventType = utag.fixUpShoppingCart(tags,sElements,cntrl.eventType);
    } else if (utag.data['page_type'] === 'SP' && utag.data['page_sub_type'] === 'SP') {
        if (typeof utag.fixUpSuppliers !== 'undefined') utag.fixUpSuppliers(tags,sElements);
    } else if (utag.data['page_type'] === 'RE') {
        if (typeof utag.fixUpResources === 'function') cntrl.eventType = utag.fixUpResources(tags,sElements,cntrl.eventType);
        } else if (utag.data['page_type'] === 'PCB') {
        if (typeof utag.fixUpResources === 'function') cntrl.eventType = utag.fixUpResources(tags,sElements,cntrl.eventType);
    } 
    };

utag.generateTag = function(sElements,href,tags,cntrl) {
    if (typeof sElements !== 'object') return;
    if (sElements.hasOwnProperty('Evergage Click') && typeof utag.evergagePersonalization === 'function'){
        cntrl.tagSent = utag.evergagePersonalization(sElements,href,tags);
    } else if (utag.data['page_type'] === 'BOM' && utag.data['page_sub_type'] === 'BOM') {
        if (typeof utag.generateMyDigikeyTags !== 'undefined') {
            cntrl.tagSent = utag.generateMyDigikeyTags(tags,sElements);
        }
    } else if (utag.data['page_type'] === 'SC' && utag.data['page_sub_type'] === 'CO') {
        if (typeof utag.generateShoppingCartTags !== 'undefined') {
            cntrl.tagSent = utag.generateShoppingCartTags(tags,sElements,href);
        }
    } else if (utag.data['page_type'] === 'SP' && utag.data['page_sub_type'] === 'SP') {
        if (typeof utag.generateSupplierTags !== 'undefined') {
            cntrl.tagSent = utag.generateSupplierTags(tags,sElements,href);
        }
    } else if (utag.data['page_type'] === 'PS' && utag.data['page_sub_type'].match(/^CAT$|^FAM$|^PD$|^SR$|^PCAT$|^CMP$/)) {
        if (typeof utag.generatePartSearchTags !== 'undefined') {
            cntrl.tagSent = utag.generatePartSearchTags(tags,sElements,href);
        }
    } if (typeof utag.generateFixUpAllPages !== 'undefined') 
            cntrl.tagSent = utag.generateFixUpAllPages(tags,sElements);


}


utag.clearTagValues = function(tagData) {
    var e = 1;
//    for (var i in tagData) {
//        utag.data[i] = '';
//    }  
}
    
utag.processTags = function(a, b, c, d, e) {
    var uFramework = utag.framework;
    var fStage = 'Start';
    try {
        utag.data.tagSent = false;
    var cntrl = {
        'trackableElement':false,
        'eventType':'undefined',
        'tagAssigned':false,
        'tagSent':false,
        'repressTag':false
    };
    var element = a.target, counter = 0, href="",tags = {},rawProp = {} ,nProperty = "";
    var labels = [], sElements = {};
    var htmlProperties = ['html_element1','html_element2','html_element3','html_element4'],htmlIdx = 0,htmlLst = {};
    if (utag.data.priorityLink === true) return;
    
    fStage = 'Start - Preserve Data';
    if (utag.data.hasOwnProperty('do_not_track_for_consent') && !utag.hasOwnProperty('utag_data_at_pageLoad')) {
        utag.preserveOriginalUtagData();
    }
    
    fStage = 'Start - Process Elements';
    while (element && counter < 50) {
        if (href==="" && typeof element.href !== 'undefined' && element.tagName !== 'IMG'){
            href = element.href;
        }

        fStage = 'Start - Check Trackability';
        if (!cntrl.trackableElement) {
            if (typeof utag.framework.hasOwnProperty("testForTrackableElement")) {
                cntrl.trackableElement = utag.framework["testForTrackableElement"](element);
            } else {
                if (typeof element.tagName == 'string' && element.tagName.toLowerCase().match(/^a$|^input$|^button$|^span$|^img$/i) !== null) cntrl.trackableElement = true;
                if (element.onclick !== null) cntrl.trackableElement = true;
                if (!cntrl.trackableElement && typeof utag.checkSpecializedTrackableEvents) {
                    cntrl.trackableElement = utag.checkSpecializedTrackableEvents(element);
                }
            }
        }

        fStage = 'Start - Check Attribute';
        try {
            r = element.getAttribute("data-cookie-tracking")||element.getAttribute("cookie-tracking")
            || element.getAttribute("data-webtrends")||element.getAttribute("wt_name") 
            || element.getAttribute("cookie-event");
            fStage = 'Start - Determine Event Type';
            if (r && cntrl.eventType !== 'Link'/* && r.indexOf('header_flag')<0*/) {
                fStage = 'Start - Process Events';
                rawProp = utag.parseDataStr(r);
                for (nProperty in rawProp) {
                    if (nProperty !== 'header_flag') {
                        tags[nProperty] || (tags[nProperty] = rawProp[nProperty]);
                        cntrl.tagAssigned = true;
                        if (cntrl.eventType === 'undefined') cntrl.eventType='Cookie';
                    }
                }
            } else if (cntrl.eventType !== 'Cookie' && (r = element.getAttribute('track-data')
                || element.getAttribute('data-track-data'))) {
                fStage = 'Start - Process Cookies';
                rawProp = utag.parseDataStr(r);
                for (nProperty in rawProp) {
                    tags[nProperty] || (tags[nProperty] = rawProp[nProperty]);
                    cntrl.tagAssigned = true;
                    if (cntrl.eventType === 'undefined') cntrl.eventType = 'Link';
                }
            } else if ((r = (element.getAttribute('ref_page_event')||element.getAttribute('ref-page-event')||element.getAttribute('data-ref-page-event'))) 
                && !(tags.hasOwnProperty('ref_page_event'))) {
                tags['ref_page_event'] = r;
                if (cntrl.eventType === 'undefined') cntrl.eventType = 'TBD'
                cntrl.tagAssigned = true;

            }else if (r = element.getAttribute('dkview') || element.getAttribute('data-dkview')) {
                rawProp = utag.parseDataStr(r);
                for (nProperty in rawProp) {
                    if (nProperty !== 'header_flag') {
                        tags[nProperty] || (tags[nProperty] = rawProp[nProperty]);
                    }
                }
                if (cntrl.eventType === 'undefined') cntrl.eventType = 'APP'
                cntrl.tagAssigned = true;
            }
            
            if (cntrl.trackableElement && htmlIdx < 5) {
                var cType = element.tagName, ta = false;
                var trk_data = element.getAttribute('data-atag') || element.getAttribute('data-testid');
                if (typeof cType !== 'undefined' && cType.match(/^a$|^div$|^li$|^ul$/i) !== null) {
                    if ((element.id !== null && element.id !== "") || (element.className !== null && element.className !== "")) {
                        htmlLst[htmlProperties[htmlIdx]] = element.id || element.className;
                        tags[htmlProperties[htmlIdx]] = element.id || element.className;
                        ta = true;
                    }
                    if (trk_data !== null && trk_data !== "") {
                        // this should override html values
                        htmlLst[htmlProperties[htmlIdx]] = tags[htmlProperties[htmlIdx]] = trk_data;
                        ta = true;
                    }
                    if (ta) {
                        htmlIdx++;
                    }
                }
                
            }
            fStage = 'Collect Trackable Elements';
            utag.collectSpecElements(element,sElements,cntrl);
            if (typeof uFramework.testEvent === 'function') {
                cntrl.trackableElement = uFramework.testEvent(element,sElements,cntrl);
            }
        } catch(err) {
            utag.DB(err)
        }
        fStage = 'Start';
        element = element.parentElement;
        counter++;
    }
    
    // Determine whether to use a cookie or an event.  Use the rules in Events from Cookies Tracking, basically if the href doesn't include digikey it is an event.
    fStage = 'Generate Tag';
    if (cntrl.trackableElement) {
            if (utag.data.do_not_track_for_consent === 'yes' && typeof utag.clearDoNotTrack === 'function') {
                fStage = 'Clear Consent';
                utag.clearDoNotTrack(href,tags);
            }
            if (cntrl.tagAssigned && !cntrl.repressTag) {
                tags['ExtRun'] = utag.dkTrk('409.1');
                fStage = 'Process Specialized Functions';
                utag.postDCSpecializedFunc(tags,sElements,cntrl);
                if (uFramework.hasOwnProperty('processDynamicEvents')) {
                    cntrl.eventType = uFramework.processDynamicEvents(tags,sElements,cntrl);
                }
                fState = 'Correct Existing Tags'
                if (utag.framework.hasOwnProperty('correctExistingTags')) {
                    cntrl.eventType = utag.framework['correctExistingTags'](utag.dkConCatPageType(),tags,cntrl);
                }
                fStage = 'Send Tag';
                if (cntrl.eventType === 'TBD' && typeof utag.CookieOrLink != 'undefined') cntrl.eventType = utag.CookieOrLink(href);
                if (cntrl.eventType === 'Link') {
                    utag.dklink(tags,href);
                    cntrl.tagSent = true;
                }
                if (cntrl.eventType === 'APP') {
                    utag.dkView(tags,href);
                    cntrl.tagSent = true;    
                } else if (cntrl.eventType === 'Cookie' && utag.data.prorityCookie !== true) {  // tags created from the nav section, by user calls to dkCookie and by event handlers take precedence over cookies constructed by processing attributes
                    utag.newCookie(tags);
                    cntrl.tagSent = true;
                }
            }
                
            if (!cntrl.tagSent) {
                fStage = 'Generate Tag';
                if (typeof utag.generateTag === 'function') {
                    utag.generateTag(sElements,href,tags,cntrl);
                }
                if (typeof uFramework.generateTag === 'function') {
                    cntrl.eventType = uFramework.generateTag(sElements,href,tags,cntrl);
                }
            }
            
            if (!cntrl.tagAssigned && !cntrl.tagSent && htmlLst.hasOwnProperty('html_element1')) {
                if (utag.data.hasOwnProperty('page_type') && ((utag.data['page_type'].match(/^MK$/) 
                ||utag.data['page_type'].match(/^SC$/)) && !(utag.data['page_sub_type'].match(/^PRG$/))
                ||utag.data['page_type'].match(/^PS$/))){
                    tags['ExtRun'] = utag.dkTrk('409.2');
                    if (typeof utag.CookieOrLink === 'function') {
                        cntrl.eventType = utag.CookieOrLink(href);
                        if (cntrl.eventType === 'Link') {
                            utag.dklink(tags,href);
                            cntrl.tagSent = true;
                        }
                        else if (cntrl.eventType === 'Cookie' && utag.data.prorityCookie !== true) {  // tags created from the nav section, by user calls to dkCookie and by event handlers take precedence over cookies constructed by processing attributes
                            utag.newCookie(tags);
                            cntrl.tagSent = true;
                        }
                    }
                }
            }
    // Process Site Specific Events 
            fStage = 'Process Site Specific Events';
            utag.processPandAEvents(a, b, c, d, e);
            // the typeof below can be removed when the Qualtrics Intercept is in Production
            if (typeof utag.sendQualtricsIntercept === 'function') utag.sendQualtricsIntercept(tags);
        }
        
    utag.data.priorityLink = utag.data.prorityCookie = false;
    utag.clearTagValues(tags);
    utag.data.tagSent = cntrl.tagSent == true;
    } catch(err) {
        var x = i ||0; var errDisp = fStage,data = [];
        data['ExtRun'] = utag.dkTrk('409.1-e');
        utag.dkErrorTag(data,err.name,err.message + '--409 -- ' +errDisp);
        utag.DB(err)
        }
    }
utag.loader.EV(document, 'mousedown', utag.processTags);
} } catch(e){ utag.DB(e) }  }catch(e){utag.DB(e)};
try{ try{ if(1){
utag.clearDoNotTrack = function(href,tags){
    if (document.getElementsByClassName('cookie-notice').length > 0) {
        if (window.localStorage.getItem('gdpr_cookie_consent') === null) {
            if ((typeof href != 'undefined' && href.indexOf("help/privacy") < 0) 
                && utag.data['dom.pathname'].toLowerCase().indexOf('help/privacy')<0) {
                var gdpr={'acceptedOn':new Date()};
                window.localStorage.setItem("gdpr_cookie_consent", JSON.stringify({ "acceptedOn": new Date() }));
                window.utag_cfg_ovrd.noview = false;
                window.utag_cfg_ovrd.nocookie=false;
                window['ga-disable-'+ utag.data.google_tracking_id1] = false;
                utag.cfg.noview = false;
                utag.data.do_not_process_cookies = true;
                utag.dkTrk('420');
                utag.view(utag.utag_data_at_pageLoad);
                utag.data.do_not_track_for_consent = 'no';
                if (typeof utag.dkCollectConsentData === 'function') {
                    utag.dkCollectConsentData(gdpr,tags);
                }
            }
        }
    }
}
} } catch(e){ utag.DB(e) }  }catch(e){utag.DB(e)};
try{
  if(typeof utag.linkHandler=='undefined'){
    utag.linkHandler=function(a,b,c,d,e){
      if(!a)a=window.event;
      if(a.target)b=a.target;
      else if(a.srcElement)b=a.srcElement;
      if(b.nodeType==3)b=b.parentNode;
      if(typeof b=='undefined'||typeof b.tagName=='undefined')return;
      c=b.tagName.toLowerCase();
      if(c=='body')return;
      if(c!='a'){
        for(d=0;d<5;d++){
          if(typeof b!='undefined'&&b.parentNode)b=b.parentNode;
          c=(b!=null&&b.tagName)?b.tagName.toLowerCase():'';
          if(c=='a')break;
          else if(c == 'body')return;
        }
      }
      if(c!='a')return;
      var lt=b.text ? b.text: b.innerText ? b.innerText : '';
      if((lt=='' || /^\s+$/.test(lt)) && typeof b.innerHTML!='undefined'){
        lt=b.innerHTML.toLowerCase();
        if(lt.indexOf('<img ')>-1){
          d=lt.indexOf('alt="');
          if(d>-1){
            e=lt.indexOf('"', d + 5);
            lt=lt.substring(d+5,e);
          }else{
            d=lt.indexOf('src="');
            if(d>-1){
              e=lt.indexOf('"',d+5);
              lt=lt.substring(d+5,e);
            }
          }
        }
      }
      var hr=b.href,hrnq=(b.href.split('?'))[0];
      var obj={link_obj:b,link_text:lt,link_url:hrnq,link_type:'exit link',event_name:'Onsite and Downloads'};
c=[location.hostname].concat(('javascript:,digikey,localhost').split(','));
for(d=0;d<c.length;d++){if(hrnq.indexOf(c[d])>-1){obj.link_type='link';break;}};
c=('exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls').split(',');
for(d=0;d<c.length;d++){e=new RegExp(c[d]+'$');if(e.test(hrnq)){obj.link_type='download link';break;}};
try{var link=b;(function () {
  var data = {};   
  utag.dkStdVars(data);
  data['not_a_pageview'] = '1';
  if (typeof obj != 'undefined' && typeof obj.link_url != 'undefined' && obj.link_url.length > 0) {
    //if (!/digikey/ig.test(obj.link_url)) {
    if (!/\/\/digikey/ig.test(obj.link_url) && !/\.digikey/ig.test(obj.link_url)
        && obj.link_url !== 'javascript:;' && !/evergage/ig.test(obj.link_url)) {
    var dest = data['ext_location'] = data['event_label'] = obj.link_url;
    data['ext_host'] = dest.substring(dest.indexOf('//') + 2,dest.indexOf('/',10)); 
    data['ext_uri'] = dest.substr(dest.indexOf('/',10));
    switch(obj.link_type) {
      case 'download link':
	data['ref_page_event'] = 'Download from External Page (Auto)';
	break;
      case 'exit link': 
	data['ref_page_event'] = 'Link to External Page (Auto)';
	break;
      default:
      if (!utag.data.tagSent) {
    	data['ref_page_event'] = 'Javascript & Misc (Auto)';
    	data['event_label'] = obj.link_text;
      }
    }
    data['event_category'] = "Offsite Links (Auto)";
    data['page_title'] = obj.link_url;
    utag.link(data); 
  } else if (obj.link_type === "download link") {
    data['ref_page_event'] = "DigiKey Download (Auto)";
    data['event_category'] = "DigiKey Download (Auto)";
    data['page_title'] = obj.link_url;
    data['event_label'] = obj.link_url;
     utag.link(data);
  }
}
}());


      
}catch(e){};
    if(obj['link_url']=='EXCLUDEALL')utag.link(obj);
    }
  utag.loader.EV(document,'mousedown',utag.linkHandler);
  }

}catch(e){utag.DB(e)};
try{ try{ if(1){
utag.fixUpShoppingCart = function(data,sElements,eventType)  {
    var retVal = eventType;
    if (typeof sElements['Checkout'] !== 'undefined') {
//        utag.dkLink('ref_page_event=Checkout Event;google_action=checkout;checkout_step=1');
        var labelx = sElements['Checkout'].innerText.trim();
        if (labelx.toLowerCase() === 'checkout as guest') {
            data.ref_page_event = 'Checkout As Guest';
            data['ExtRun'] = utag.dkTrk('444.1');
        } else {
            data.ref_page_event = 'Click Checkout'
            data['ExtRun'] = utag.dkTrk('444.2');
        }
    } else if (sElements.hasOwnProperty('Add Part List')) {
        data.ref_page_event = 'Add Part';
        data.add_part_method = 'Add Part List';
        data['ExtRun'] = utag.dkTrk('444.4');
    } else if (sElements.hasOwnProperty('Add Part Manually')) {
        data.ref_page_event = 'Add Part';
        data.add_part_method = 'Manual Add Part';
        data['ExtRun'] = utag.dkTrk('444.5');
    } else if (sElements.hasOwnProperty('Submit Order')) {
        data.ref_page_event = 'Submit Order';
        data['ExtRun'] = utag.dkTrk('444.6');
        retVal = 'Cookie';
    }
    return retVal
}; 

utag.generateShoppingCartTags = function(data,sElements,href) {
    var tagSent = false;
    if (sElements.hasOwnProperty('Upload File')) {
        data.ref_page_event = 'Add Part';
        data.add_part_method = 'File Upload';
        data['ExtRun'] = utag.dkTrk('444.3');
        utag.dklink(data);
        tagSent = true;
    }
     if (typeof sElements['View Marketplace Message'] !== 'undefined') {
        data.personalization_program = "";
        data.personalization_creative = "";
        data.ref_page_event = 'View Marketplace Message';
        data['ExtRun'] = utag.dkTrk('444.7');
        utag.dklink(data);
        tagSent = true;
    }
    if (typeof sElements['Select Learn More'] !== 'undefined') {
        data.personalization_program = "";
        data.personalization_creative = "";
        data.ref_page_event = 'Select Learn More';
        data['ExtRun'] = utag.dkTrk('444.8');
        utag.newCookie(data,href);
        tagSent = true;        
    }
    return tagSent;
};


} } catch(e){ utag.DB(e) }  }catch(e){utag.DB(e)};
try{ try{ if(1){
utag.testKeypressTrackability = function(element,sElements,cntrl) {
    // for Header Nav
    if (typeof element.className !== 'string') return;
    if (element.getAttribute('data-testid') === 'search-input') {
        sElements['RefineSearch'] = element;
        cntrl.trackableElement = true;
    }
    if (/dk-input/.test(element.className)) {
        cntrl.trackableElement = true;
    }
//    if (utag.data['ut.env'] === 'qa') {
//        var fakeElement = {};
//        fakeElement.id = 'evergage-tooltip-ambm8NwK';
//        sElements['Evergage Click'] = fakeElement;
//        cntrl.repressTag = true;
//        }
}

utag.collectSpecKElements = function(element, sElements, cntrl) {
    // placeholder for tags added by Tealium to be processed dynamically (see collectSpecElements()
    var e = 1;
}

utag.postDCSpecializedKeypressFunc = function(tags,sElements,cntrl) {
    if (utag.data['page_type'] === 'PS') {
        if (typeof utag.fixUpKeypressSearch === 'function') utag.fixUpKeypressSearch(tags,sElements,cntrl);
    }
}

utag.processKeypress = function(a, b, c, d, e) {
    var uFramework = utag.framework;
    var fStage = 'Start';
    try {
        var cntrl = {
            'trackableElement':false,
            'eventType':'undefined',
            'tagAssigned':false,
            'tagSent':false,
            'repressTag':false
        };
        var element = a.target, href="",tags = {},rawProp = {} ,nProperty = "", counter = 0;
        var r;
        var labels = [], sElements = {};
        var enterKeyPressed = false;
        var htmlProperties = ['html_element1','html_element2','html_element3','html_element4'],htmlIdx = 0,htmlLst = {};
        if (utag.data.priorityLink === true) return;
        if (a.key === 'Enter') {enterKeyPressed = true;}
        else if (a.keyCode === 13) {enterKeyPressed = true;}
        if (!enterKeyPressed) return;

    
        // Check to see if we have consent.  If not, capture the original utag_data so that it can be sent when 
        // the user does consent.
        fState = 'Start - Preserve Data';
        if (utag.data.hasOwnProperty('do_not_track_for_consent') && !utag.hasOwnProperty('utag_data_at_pageLoad')) {
            utag.preserveOriginalUtagData();
        }
   
        // Walk up the element hierarchy, checking each element to see if it contains any analytics tags
        fStage = 'Start - Process Elements';
        while (element && counter < 50) {
            if (href === "" && typeof element.href !== 'undefined' && element.tagName !== 'IMG') {
                href = element.href;
            }

            // First check to see if keypress represents a user action as opposed to a random click on the page
            fStage = 'Start - Check Trackability';
            utag.testKeypressTrackability(element, sElements, cntrl);

            // Look to see if the current element has an analytics tag.  Based on the type of tag, determine what kind
            // of tag to fire
            fStage = 'Start - Check Attribute';
                r = element.getAttribute("data-cookie-tracking") || element.getAttribute("cookie-tracking") || element.getAttribute("data-webtrends") || element.getAttribute("wt_name") || element.getAttribute("cookie-event");
                fStage = 'Start - Determine Event Type';
                if (r && cntrl.eventType !== 'Link') {
                    fStage = 'Start - Process Events';
                    rawProp = utag.parseDataStr(r);
                    for (nProperty in rawProp) {
                        if (nProperty !== 'header_flag') {
                            tags[nProperty] || (tags[nProperty] = rawProp[nProperty]);
                            cntrl.tagAssigned = true;
                            if (cntrl.eventType === 'undefined') cntrl.eventType = 'Cookie';
                        }
                    }
                } else if (cntrl.eventType !== 'Cookie' && (r = element.getAttribute('track-data') || element.getAttribute('data-track-data'))) {
                    fStage = 'Start - Process Cookies';
                    rawProp = utag.parseDataStr(r);
                    for (nProperty in rawProp) {
                        tags[nProperty] || (tags[nProperty] = rawProp[nProperty]);
                        cntrl.tagAssigned = true; 
                        cntrl.eventType = 'Link';
                    }
                } else if ((r = (element.getAttribute('ref_page_event') || element.getAttribute('ref-page-event') || element.getAttribute('data-ref-page-event'))) && !(tags.hasOwnProperty('ref_page_event'))) {
                    tags['ref_page_event'] = r;
                    if (cntrl.eventType === 'undefined') cntrl.eventType = 'TBD'
                    cntrl.tagAssigned = true;

                } else if (r = element.getAttribute('dkview') || element.getAttribute('data-dkview')) {
                    rawProp = utag.parseDataStr(r);
                    for (nProperty in rawProp) {
                        if (nProperty !== 'header_flag') {
                            tags[nProperty] || (tags[nProperty] = rawProp[nProperty]);
                        }
                    }
                    if (cntrl.eventType === 'undefined') cntrl.eventType = 'APP'
                    cntrl.tagAssigned = true;
                }

                // Capture the identifiers for the four html elements lowest in the element hierarchy
                if (cntrl.trackableElement && htmlIdx < 4) {
                    var cType = element.tagName, ta = false;
                    var trk_data = element.getAttribute('data-atag') || element.getAttribute('data-testid');
                    if (typeof cType !== 'undefined' && cType.match(/^a$|^div$|^li$|^ul$/i) !== null) {
                        if ((element.id !== null && element.id !== "") || (element.className !== null && element.className !== "")) {
                            htmlLst[htmlProperties[htmlIdx]] = element.id || element.className;
                            tags[htmlProperties[htmlIdx]] = element.id || element.className;
                            ta = true;
                        }
                        if (trk_data !== null && trk_data !== "") {
                            htmlLst[htmlProperties[htmlIdx]] = tags[htmlProperties[htmlIdx]] = trk_data;
                            ta = true;
                        }
                        if (ta) {
                            htmlIdx++;
                        }
                    }

                }
                
                // Check to see if we are generating a tag dynamically from the current element
                fStage = 'Collect Trackable Elements';
                utag.collectSpecKElements(element, sElements, cntrl);

            fStage = 'Start';
            element = element.parentElement;
            counter++;
        }
 
        fState = 'Process Tag'
        // Process all keypresses we've identified as a trackable
        if (cntrl.trackableElement) {
            // Our current rule is that any action (except looking at the privacy page) is consent to be tracked.
            // That is initiated here.
            if (utag.data.do_not_track_for_consent === 'yes' && typeof utag.clearDoNotTrack === 'function') {
                fStage = 'Clear Consent';
                utag.clearDoNotTrack(href,tags);
            }
            tags['ExtRun'] = utag.dkTrk('477.1');
            
            // The following processes the dynamic tags identified from the elements collected in 
            // processKSpecialElements and for which other tag data was collected from 
            // html attributes (i.e. cookie-tracking, etc.)
            if (cntrl.tagAssigned && !cntrl.repressTag) {
                tags['ExtRun'] = utag.dkTrk('477.1');
                fStage = 'Process Specialized Functions';
                utag.postDCSpecializedKeypressFunc(tags,sElements,cntrl);

                fStage = 'Send Tag';
                if (cntrl.eventType === 'TBD' && typeof utag.CookieOrLink != 'undefined') cntrl.eventType = utag.CookieOrLink(href);
                if (cntrl.eventType === 'Link') {
                    utag.dklink(tags,href);
                    cntrl.tagSent = true;
                } else if (cntrl.eventType === 'APP') {
                    utag.dkView(tags,href);
                    cntrl.tagSent = true;    
                } else if (cntrl.eventType === 'Cookie' && utag.data.prorityCookie !== true) {  // tags created from the nav section, by user calls to dkCookie and by event handlers take precedence over cookies constructed by processing attributes
                    utag.newCookie(tags);
                    cntrl.tagSent = true;
                }
            }

            // If no tag data was collected when processing the html attributes, try generating
            // a dynamic tag from elements collected in the collectKSpecialElements.  The
            // generateTag function includes code to write the cookie or send the tag.
            if (!cntrl.tagSent) {
                fStage = 'Generate Tag';
                utag.generateTag(sElements,href,tags,cntrl);
            }
            
            // If a tag has not been sent, generate a tag for selected page type and page sub types.  This is mostly
            // done to track down issues or to audit pages for missing tags.  It is, combined with lookup tables
            // the primary way for tagging Maker.
            if ((!cntrl.tagAssigned && !cntrl.tagSent) || htmlLst.hasOwnProperty('html_element1')) {
                if (utag.data.hasOwnProperty('page_type') && (utag.data['page_type'].match(/^MK$/) 
                ||utag.data['page_type'].match(/^SC$/)) && !(utag.data['page_sub_type'].match(/^PRG$/))) {
                    tags['ExtRun'] = utag.dkTrk('409.2');
                    cntrl.eventType = utag.CookieOrLink(href);
                    if (cntrl.eventType === 'Link') {
                        utag.dklink(tags,href);
                        cntrl.tagSent = true;
                    } else if (cntrl.eventType === 'Cookie' && utag.data.prorityCookie !== true) {  // tags created from the nav section, by user calls to dkCookie and by event handlers take precedence over cookies constructed by processing attributes
                        utag.newCookie(tags);
                        cntrl.tagSent = true;
                    }
                }
            }
        }
    } catch(err) {
        // In addition to tracking errors in the Tealium debug log, generate and sent to Google and
        // event tag with the error information.
        var x = i ||0; var errDisp = fStage,data = [];
        data['ExtRun'] = utag.dkTrk('477.1-e');
        utag.dkErrorTag(data,err.name,err.message + '--477 -- ' +errDisp);
        utag.DB(err)
        }
    }
utag.loader.EV(document, 'keydown', utag.processKeypress);// Type your JavaScript code here...
} } catch(e){ utag.DB(e) }  }catch(e){utag.DB(e)};}})

  if(utag.cfg.readywait || utag.cfg.waittimer){
    utag.loader.EV('', 'ready', function(a) {
      if(utag.loader.rf==0){
        utag.loader.rf=1;
        utag.cfg.readywait=1;
        utag.DB('READY:utag.cfg.readywait');
        setTimeout(function(){utag.loader.PINIT()}, utag.cfg.waittimer || 1);
      }
    })
  }else{
    utag.loader.PINIT()
  }
}

