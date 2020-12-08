jQuery(document).ready(function($){var do_convert_btn=document.getElementById("arfcn-freq-convert");var band_list_btn=document.getElementById("band-list");if(do_convert_btn)
{do_convert_btn.addEventListener("click",function(){var input_arfcn_freq_value=$.trim($('#input-arfcn-freq-value').val());var item_checked=$("input:checked").val();var arfcn_freq_pattern="";if(item_checked=="arfcn"){arfcn_freq_pattern=/^\d+$/;}else if(item_checked=="band"){arfcn_freq_pattern=/^[n,N]?\d+$/;}else{arfcn_freq_pattern=/^\d+(\.\d+)?$/;}
$("#convert-result").removeClass("alert alert-success alert-danger alert-info alert-warning");if(arfcn_freq_pattern.test(input_arfcn_freq_value)){$("#convert-result").addClass("alert alert-info");$("#convert-result").html("Processing, please wait...");var home_url=globalObject.homeUrl;$.ajax({url:home_url+"wp-admin/admin-ajax.php",type:"post",data:{action:'arfcn_freq_convert',input_type:item_checked,input_value:input_arfcn_freq_value},success:function(data){console.log("Received Data:"+data);var converted_result=JSON.parse(data);if(converted_result.valid==1){$("#convert-result").removeClass("alert alert-danger alert-info");$("#convert-result").html("");var result_table="";var i;result_table+="<table class='table table-sm table-hover table-bordered text-center'>";result_table+="<thead class='table-success'><tr>";if(item_checked=="band"){result_table+="<th>RAT</th><th>Band</th><th>Name</th><th>Mode</th><th>UL Freq[MHz]</th><th>DL Freq[MHz]</th><th>BW UL/DL[MHz]</th></thead>";result_table+="<tbody>";for(i=0;i<converted_result.result.length;i++){var band_url=home_url+"band/"+converted_result.result[i].rat.toLowerCase()+"-band-"+converted_result.result[i].band+"/";result_table+="<tr>";result_table+="<td>"+converted_result.result[i].rat+"</td>";result_table+="<td><a href='"+band_url+"'>"+converted_result.result[i].band+"</a></td>";result_table+="<td>"+converted_result.result[i].name+"</td>";result_table+="<td>"+converted_result.result[i].mode+"</td>";if(converted_result.result[i].freq_up_low>0&&converted_result.result[i].freq_up_high){result_table+="<td>"+100*converted_result.result[i].freq_up_low/100+"/"+100*converted_result.result[i].freq_up_high/100+"</td>";bw_ul=(100*converted_result.result[i].freq_up_high-100*converted_result.result[i].freq_up_low)/100;}else{result_table+="<td>-/-</td>";bw_ul="-";}
if(converted_result.result[i].freq_dl_low>0&&converted_result.result[i].freq_dl_high){result_table+="<td>"+100*converted_result.result[i].freq_dl_low/100+"/"+100*converted_result.result[i].freq_dl_high/100+"</td>";bw_dl=(100*converted_result.result[i].freq_dl_high-100*converted_result.result[i].freq_dl_low)/100;}else{result_table+="<td>-/-</td>";bw_dl="-"}
result_table+="<td>"+bw_ul+"/"+bw_dl+"</td>";result_table+="</tr>";}}else{result_table+="<th>RAT</th><th>Band</th><th>Name</th>";if(converted_result.nr.exist==1){result_table+="<th>ΔF<sub>Raster (KHz)</sub></th>";}
result_table+="<th>DL ARFCN</th><th>DL Frequency[MHz]</th><th>UL ARFCN</th><th>UL Frequency[MHz]</th><th>Mode</th></thead>";result_table+="<tbody>";for(i=0;i<converted_result.result.length;i++){var band_url=home_url+"band/"+converted_result.result[i].rat.toLowerCase()+"-band-"+converted_result.result[i].band+"/";result_table+="<tr>";result_table+="<td>"+converted_result.result[i].rat+"</td>";result_table+="<td><a href='"+band_url+"'>"+converted_result.result[i].band+"</a></td>";result_table+="<td>"+converted_result.result[i].name+"</td>";if(converted_result.result[i].rat=="NR"){result_table+="<td>"+converted_result.result[i].fdelta_raster+"</td>";}else if(converted_result.nr.exist==1){result_table+="<td>-</td>";}else{}
result_table+="<td>"+converted_result.result[i].arfcn_dl+"</td>";result_table+="<td>"+converted_result.result[i].freq_dl+"</td>";result_table+="<td>"+converted_result.result[i].arfcn_ul+"</td>";result_table+="<td>"+converted_result.result[i].freq_ul+"</td>";result_table+="<td>"+converted_result.result[i].mode+"</td>";result_table+="</tr>";}
if(converted_result.nr.unaligned==1){var warning_info="<div id='result-warning' class='alert alert-warning'>*  NR-ARFCN is not aligned with channel raster</div>"
$("#convert-result").append(warning_info);}
if(converted_result.arfcn_unaligned==1){var warning_info="** No exact ARFCN matched to input frequency in some bands";var warning_div=document.getElementById("result-warning");if(warning_div){$("#result-warning").append("<br>"+warning_info);}
else{$("#convert-result").append("<div id='result-warning' class='alert alert-warning'>"+warning_info+"</div>");}}}
result_table+="<tbody>";result_table+="</table>";$("#convert-result").append(result_table);$("#convert-result").unmark({done:function(){var mark_options={"accuracy":"exactly","log":window.console};if(input_arfcn_freq_value.indexOf('n')==0){$("#convert-result").mark(input_arfcn_freq_value,mark_options);$("#convert-result").mark(input_arfcn_freq_value.substr(1),mark_options);}else{$("#convert-result").mark(input_arfcn_freq_value,mark_options);$("#convert-result").mark('n'+input_arfcn_freq_value,mark_options);}}});}else{$("#convert-result").addClass("alert alert-danger");$("#convert-result").html("<p>No related "+item_checked.toUpperCase()+" found, please check input value</p>");}}});}else{alert("Please input a valid ARFCN or Frequency value");}});}
if(band_list_btn){band_list_btn.addEventListener("click",function(){$("#convert-result").removeClass("alert alert-success alert-danger alert-info alert-warning");$("#convert-result").addClass("alert alert-info");$("#convert-result").html("Processing, please wait...");var home_url=globalObject.homeUrl;$.ajax({url:home_url+"wp-admin/admin-ajax.php",type:"post",data:{action:'arfcn_freq_convert',input_type:"band_list",input_value:""},success:function(data){console.log("Received Data:"+data);var converted_result=JSON.parse(data);if(converted_result.valid==1){$("#convert-result").removeClass("alert alert-danger alert-info");$("#convert-result").html("");var result_table="";var i;result_table+="<table class='table table-sm table-hover table-bordered text-center'>";result_table+="<thead class='table-success'><tr>";result_table+="<th>RAT</th><th>Band</th><th>Name</th><th>Mode</th><th>UL Freq[MHz]</th><th>DL Freq[MHz]</th><th>BW UL/DL[MHz]</th></thead>";result_table+="<tbody>";for(i=0;i<converted_result.result.length;i++){var band_url=home_url+"band/"+converted_result.result[i].rat.toLowerCase()+"-band-"+converted_result.result[i].band+"/";result_table+="<tr>";result_table+="<td>"+converted_result.result[i].rat+"</td>";result_table+="<td><a href='"+band_url+"'>"+converted_result.result[i].band+"</a></td>";result_table+="<td>"+converted_result.result[i].name+"</td>";result_table+="<td>"+converted_result.result[i].mode+"</td>";if(converted_result.result[i].freq_up_low>0&&converted_result.result[i].freq_up_high){result_table+="<td>"+100*converted_result.result[i].freq_up_low/100+"/"+100*converted_result.result[i].freq_up_high/100+"</td>";bw_ul=(100*converted_result.result[i].freq_up_high-100*converted_result.result[i].freq_up_low)/100;}else{result_table+="<td>-/-</td>";bw_ul="-";}
if(converted_result.result[i].freq_dl_low>0&&converted_result.result[i].freq_dl_high){result_table+="<td>"+100*converted_result.result[i].freq_dl_low/100+"/"+100*converted_result.result[i].freq_dl_high/100+"</td>";bw_dl=(100*converted_result.result[i].freq_dl_high-100*converted_result.result[i].freq_dl_low)/100;}else{result_table+="<td>-/-</td>";bw_dl="-"}
result_table+="<td>"+bw_ul+"/"+bw_dl+"</td>";result_table+="</tr>";}
result_table+="<tbody>";result_table+="</table>";$("#convert-result").append(result_table);}else{$("#convert-result").addClass("alert alert-danger");$("#convert-result").html("<p>No related "+item_checked.toUpperCase()+" found, please check input value</p>");}}});});}});
/*! This file is auto-generated */
!function(d,l){"use strict";var e=!1,o=!1;if(l.querySelector)if(d.addEventListener)e=!0;if(d.wp=d.wp||{},!d.wp.receiveEmbedMessage)if(d.wp.receiveEmbedMessage=function(e){var t=e.data;if(t)if(t.secret||t.message||t.value)if(!/[^a-zA-Z0-9]/.test(t.secret)){var r,a,i,s,n,o=l.querySelectorAll('iframe[data-secret="'+t.secret+'"]'),c=l.querySelectorAll('blockquote[data-secret="'+t.secret+'"]');for(r=0;r<c.length;r++)c[r].style.display="none";for(r=0;r<o.length;r++)if(a=o[r],e.source===a.contentWindow){if(a.removeAttribute("style"),"height"===t.message){if(1e3<(i=parseInt(t.value,10)))i=1e3;else if(~~i<200)i=200;a.height=i}if("link"===t.message)if(s=l.createElement("a"),n=l.createElement("a"),s.href=a.getAttribute("src"),n.href=t.value,n.host===s.host)if(l.activeElement===a)d.top.location.href=t.value}}},e)d.addEventListener("message",d.wp.receiveEmbedMessage,!1),l.addEventListener("DOMContentLoaded",t,!1),d.addEventListener("load",t,!1);function t(){if(!o){o=!0;var e,t,r,a,i=-1!==navigator.appVersion.indexOf("MSIE 10"),s=!!navigator.userAgent.match(/Trident.*rv:11\./),n=l.querySelectorAll("iframe.wp-embedded-content");for(t=0;t<n.length;t++){if(!(r=n[t]).getAttribute("data-secret"))a=Math.random().toString(36).substr(2,10),r.src+="#?secret="+a,r.setAttribute("data-secret",a);if(i||s)(e=r.cloneNode(!0)).removeAttribute("security"),r.parentNode.replaceChild(e,r)}}}}(window,document);