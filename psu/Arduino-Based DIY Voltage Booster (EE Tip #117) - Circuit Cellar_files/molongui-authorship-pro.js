var addBylineModifiers=function(){var e=document.querySelectorAll('a[href$="?m_bm=true"]');Array.prototype.forEach.call(e,function(e,t){e.setAttribute("href",decodeURIComponent(e.getAttribute("href")).replace("?m_bm=true","")),e.insertAdjacentHTML("beforebegin",molongui_authorship.byline_prefix+" "),e.insertAdjacentHTML("afterend"," "+molongui_authorship.byline_suffix)})},decodeMultiAuthorBylines=function(){var e=document.querySelectorAll('a[href*="molongui_byline=true"]');Array.prototype.forEach.call(e,function(e,t){var i=e.getAttribute("href"),r=new URL(decodeURIComponent(i)),n=new URLSearchParams(r.search),o=r.origin,a=r.pathname;if(!n.has("molongui_byline"))return!1;if(""===e.innerText)return n.has("m_main_disabled")?e.removeAttribute("href"):e.setAttribute("href",o+a),!1;var l,u,s=[molongui_authorship.byline_separator,molongui_authorship.byline_last_separator],d=e.innerText.split(new RegExp(s.join("|"),"gi"));n.has("m_main_disabled")?(u=n.getAll("mca")).unshift("molongui-disabled-link"):(l=a.replace(/^\/|\/$/g,"").split("/").pop(),a.replace(/\/$/g,"").replace(l,""),(u=n.getAll("mca")).unshift(o+a));var c="",h=d.length,m=e.getAttribute("class"),p=e.getAttribute("target"),f=e.getAttribute("rel"),b=e.getAttribute("itemprop"),g=m?'class="'+m+'"':"",y=p?'target="'+p+'"':"",_=f?'rel="'+f+'"':"",A=b?'itemprop="'+b+'"':"";for(j=0;j<h;j++){var v=d[j].trim(),L="";L=""!==molongui_authorship.byline_dom_tree?molongui_authorship.byline_dom_tree.replace("{%ma_authorName}",v):v,"molongui-disabled-link"===u[j]||j>=u.length?c+=L:c+='<a href="'+u[j]+'" '+g+" "+_+" "+A+" "+y+' title="'+molongui_authorship.byline_link_title+" "+v+'">'+L+"</a>",j<h-1-1?c+=s[0]:j<h-1&&(c+=s[1])}e.insertAdjacentHTML("afterend",c),e.parentNode.removeChild(e)})},disableEmptyLinks=function(){var e=document.querySelectorAll('a[href="#molongui-disabled-link"]');Array.prototype.forEach.call(e,function(e,t){e.classList.add("molongui-disabled-link"),e.removeAttribute("href")})},initBylines=function(){addBylineModifiers(),decodeMultiAuthorBylines(),disableEmptyLinks()};document.addEventListener("DOMContentLoaded",function(){initBylines();var e=document.body;new MutationObserver(function(e){Array.prototype.forEach.call(e,function(e,t){initBylines()})}).observe(e,{attributes:!0,childList:!0,subtree:!0,characterData:!0})});