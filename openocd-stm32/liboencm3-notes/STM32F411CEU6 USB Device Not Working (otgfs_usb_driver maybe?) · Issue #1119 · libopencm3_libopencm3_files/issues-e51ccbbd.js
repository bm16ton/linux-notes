System.register(["./chunk-vendor.js","./chunk-frameworks.js","./chunk-toast.js"],(function(e,t){"use strict";var n,s,o,r,i,a,c,l,u,d,m,p,f,g,b,h,v,y,j,k,S,q,w,A,L,T;return{setters:[function(e){n=e.o,s=e.a,o=e.r,r=e.j,i=e._,a=e.t,c=e.c},function(e){l=e.o,u=e.j,d=e.b,m=e.V,p=e.aW,f=e.c,g=e.aX,b=e.r,h=e.aY,v=e.h,y=e.A,j=e.q,k=e.aS,S=e.a9,q=e.S,w=e.aZ,A=e.a_,L=e.k},function(e){T=e.t}],execute:function(){n(".js-issue-row .js-issues-list-check:checked",{add(e){e.closest(".js-issue-row").classList.add("selected")},remove(e){e.closest(".js-issue-row").classList.remove("selected")}}),s("navigation:keydown",".js-issue-row",(function(e){"x"===e.detail.hotkey&&(!function(e){const t=e.querySelector(".js-issues-list-check");t instanceof HTMLInputElement&&u(t,!t.checked)}(e.currentTarget),e.preventDefault(),e.stopPropagation())})),l("#js-issues-search",(function(e){const t=e;t.value=t.value}));const e=new WeakMap,E=new WeakMap;n(".js-milestone-issues",{subscribe:e=>d(e,"socket:message",(async function(e){const t=e.currentTarget,n=e.detail.data,s=t.querySelector(".js-milestone-issues-container");if(E.has(s))return void E.delete(s);await m();const o=document.querySelector(".js-client-uid");o instanceof HTMLInputElement&&o.value===n.client_uid||async function(e){if(p(e))return;const t=e.getAttribute("data-url"),n=await f(document,t);g(document,(()=>{e.replaceWith(n)}))}(t)}))}),o(".js-milestone-sort-form",(async function(e,t){const n=(await t.json()).json,s=e.querySelector(".js-milestone-reorder-feedback");s.textContent="",n.error?e.querySelector(".js-milestone-changed").classList.remove("d-none"):(e.querySelector(".js-timestamp").value=n.updated_at,s.textContent=s.getAttribute("data-success-text")||"")}));const x=r((function(e){const{newIndex:t,item:n}=e,s=n.closest(".js-milestone-issues-container"),o=n.getAttribute("data-id")||"",r=function(e,t){return e.querySelectorAll(".js-draggable-issue")[t]}(s,t-1),i=r&&r.getAttribute("data-id"),a=s.closest(".js-milestone-sort-form");a.querySelector(".js-item-id").value=o,a.querySelector(".js-prev-id").value=i||"",E.set(s,!0),b(a)}),200);function M(e,t){x({oldIndex:void 0,item:t,newIndex:Array.from(e.querySelectorAll(".js-draggable-issue")).indexOf(t),trackingLabel:"keyboard-shortcut"}),h(t.closest(".js-navigation-container"),t)}function C(e){const t=e.currentTarget;if(!(t instanceof HTMLElement))return;const n=t.querySelector(".js-milestone-edit-cancel"),s=n.getAttribute("data-confirm-changes");s&&(v(t)?n.setAttribute("data-confirm",s):n.removeAttribute("data-confirm"))}let N;s("click",".js-draggable-issue .js-sortable-button",(async function({currentTarget:e}){const{moveWithButton:n}=await t.import("./chunk-sortable-behavior.js");n(e,e.closest(".js-draggable-issue"),x)})),s("navigation:keydown",".js-draggable-issues-container .js-draggable-issue",(function(e){const t=e.currentTarget,n=t.closest(".js-draggable-issues-container");if("J"===e.detail.hotkey){const s=t.nextElementSibling;s&&(s.after(t),M(n,t),e.preventDefault(),e.stopPropagation())}else if("K"===e.detail.hotkey){const s=t.previousElementSibling;s&&(s.before(t),M(n,t),e.preventDefault(),e.stopPropagation())}})),n(".js-draggable-issues-container",{add:async function(n){if(e.has(n))return;const{Sortable:s}=await t.import("./chunk-sortable-behavior.js"),o=s.create(n,{animation:150,item:".js-draggable-issue",handle:".js-drag-handle",onUpdate:x,chosenClass:"is-dragging"});e.set(n,o)},remove:function(t){const n=e.get(t);n&&n.destroy()}}),s("change",".js-milestone-edit-form",C),s("click",".js-milestone-edit-form",C);let $=null;function H(e){const{item:t,oldIndex:n}=e;$=t.parentNode.children[n+1]}async function _(e){const{oldIndex:t,newIndex:n,item:s}=e;if(t===n)return;const o=s.closest(".js-pinned-issues-reorder-form"),r=o.closest(".js-pinned-issues-reorder-container").querySelector(".js-pinned-issues-spinner");r.style.display="inline-block",N.option("disabled",!0);if((await fetch(o.action,{method:o.method,body:new FormData(o),headers:{"X-Requested-With":"XMLHttpRequest"}})).ok)r.style.display="none",N.option("disabled",!1);else{const e=s.parentNode;$?e.insertBefore(s,$):e.appendChild(s)}}n(".js-pinned-issues-reorder-list",{async add(e){const{Sortable:n}=await t.import("./chunk-sortable-behavior.js");N=n.create(e,{animation:150,item:".js-pinned-issue-list-item",handle:".js-pinned-issue-reorder",onUpdate:_,onStart:H,chosenClass:"is-dragging"})}}),s("submit",".js-pinned-issues-reorder-form",(function(e){e.preventDefault()})),s("click",".js-pinned-issue-list-item .js-sortable-button",(async function({currentTarget:e}){const n=e,{moveWithButton:s}=await t.import("./chunk-sortable-behavior.js");s(n,n.closest(".js-pinned-issue-list-item"),_)}));let I=null;const R=r((async function(){const e=document.querySelector(".js-quick-pull-new-branch-name"),t=e.value,n=e.getAttribute("data-generated-branch"),s=document.querySelector(".js-quick-pull-normalization-info"),o=new FormData;o.append("ref",t);const r=e.getAttribute("data-check-url"),i=e.parentElement.querySelector(".js-data-check-url-csrf");null==I||I.abort();const{signal:a}=I=new AbortController;try{const a=await fetch(r,{mode:"same-origin",method:"POST",body:o,headers:{Accept:"application/json","Scoped-CSRF-Token":i.value,"X-Requested-With":"XMLHttpRequest"}});if(a.ok){const o=await a.json();if(t!==e.value)return;const r=o.normalized_ref;if(s.innerHTML=null==o.message_html?"":o.message_html,!r){s.querySelector("code").textContent=n}null}}catch(c){}a.aborted||e.value}),200);function W(){return document.querySelectorAll(".js-template-editor").length>0}function D(){if(document.querySelectorAll(".js-template-form.is-loading").length>0)return"loading";return document.querySelectorAll(".js-template-form.is-errored").length>0?"error":"ok"}function X(){const e=document.querySelector(".js-commit-templates-form"),t=e.querySelector(".js-blob-submit"),n=document.querySelector(".js-template-commit-form-error-message"),s=document.querySelector(".js-template-commit-form-loading-message");switch(D()){case"loading":n.classList.add("d-none"),s.classList.remove("d-none"),e.setAttribute("disabled","disabled"),t.setAttribute("disabled","disabled");break;case"error":n.classList.remove("d-none"),s.classList.add("d-none"),e.setAttribute("disabled","disabled"),t.setAttribute("disabled","disabled");break;default:n.classList.add("d-none"),s.classList.add("d-none"),e.removeAttribute("disabled"),t.removeAttribute("disabled")}}async function O(e){e.classList.add("is-loading"),X();const t=e.querySelector('[name="filename"]').value,n={};for(const l of document.querySelectorAll(".js-template-form")){const e=l.querySelector('[name="filename"]').value;n[e]={};const t=new FormData(l);for(const[s,o]of t.entries())n[e][s]=o.toString()}const s=new FormData(e);s.append("current",t),s.append("templates",JSON.stringify(n));const o=await fetch(e.action,{method:"POST",body:s,headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest"}});if(!o.ok)return;const r=await o.json(),i=j(document,r.html);e.closest(".js-template-preview").replaceWith(i);const a=document.querySelector(".js-hidden-template-fields"),c=a.querySelector(`[data-filename="${r.filename}"]`);if(c instanceof HTMLInputElement)c.value=r.markdown;else{const e=document.createElement("input");e.type="hidden",e.name=`templates[][${r.filename}]`,e.setAttribute("data-filename",r.filename),e.value=r.markdown,a.append(e)}e.classList.remove("is-loading"),X()}function F(){for(const e of document.querySelectorAll(".js-template-form"))O(e)}n(".js-template-form .js-issue-labels",{add(e){const t=e.closest(".js-issue-template-labels-container");if(!t)return;const n=t.querySelector(".js-issue-template-labels");n.value="";for(const s of e.children){const e=s.getAttribute("data-name");e&&!n.value.includes(e)&&(""===n.value?n.value=e:n.value=`${n.value}, ${e}`)}}}),n(".js-template-form .js-issue-assignees",{add(e){const t=e.closest(".js-issue-template-assignees-container").querySelector(".js-issue-template-assignees");t.value="";for(const n of e.children){const e=n.querySelector("span");if(e){const n=e.getAttribute("data-assignee-name");n&&!t.value.includes(n)&&(""===t.value?t.value=n:t.value=`${t.value}, ${n}`)}}}}),s("change",".js-quick-pull-choice-option",(function(e){if(!W())return;const t=e.currentTarget;document.querySelector(".js-quick-pull-new-branch-name").toggleAttribute("required","quick-pull"===t.value)})),y(".js-quick-pull-new-branch-name",(function(e){if(!W())return;const t=e.target.value;document.querySelector(".js-quick-pull-target-branch").value=t,t.length&&R()})),y(".js-synced-template-input",(function(e){const t=e.target,n=t.getAttribute("data-sync");if(!n)return;const s=t.closest(".js-sync-container"),o=s.querySelectorAll(`[data-sync-with="${n}"]`),r=t.value;if(""!==r.trim()){for(const e of o)e.textContent=t.value;if("name"===n){s.querySelector(".js-sync-filename").value=(r.replace(/[^\w]/g,"-")+".md").toLowerCase()}}else for(const i of o){const e=i.getAttribute("data-sync-blank");e&&(i.innerHTML=`<span class="color-text-secondary">${e}</span>`)}})),s("submit",".js-template-form",(function(e){e.preventDefault();O(e.currentTarget)})),s("click",".js-toggle-template-commit",(function(){const e=document.querySelector(".js-template-commit-pane");e.classList.toggle("d-none"),e.classList.contains("d-none")||F()})),s("submit",".js-commit-templates-form",(function(e){"ok"!==D()&&e.preventDefault(),X()})),s("click",".js-refresh-template-content",(async function(e){const t=e.currentTarget,n=t.closest(".js-template-form"),s=n.querySelector(".js-template-content-preview");s.innerHTML='<span class="color-text-secondary">Loading preview...</span>';const o=n.querySelector(".js-template-content-textarea").value,r=t.getAttribute("data-markdown-preview-url");if(!r)return;const i=t.parentElement.querySelector(".js-data-markdown-preview-url-csrf"),a=new FormData;a.append("markdown",o);const c=await fetch(r,{mode:"same-origin",method:"POST",body:a,headers:{"Scoped-CSRF-Token":i.value,"X-Requested-With":"XMLHttpRequest"}});if(!c.ok)return;const l=await c.text();s.innerHTML=l})),s("click",".js-custom-template-toggle",(e=>{const t=e.target.closest(".js-template-preview"),n=!t.classList.contains("expand-preview");if(function(){const e=document.querySelectorAll(".js-template-preview");for(const t of e)t.classList.remove("expand-preview")}(),n)t.classList.add("expand-preview"),t.scrollIntoView({behavior:"smooth",block:"start"});else{O(t.querySelector(".js-template-form"))}})),s("click",".js-remove-template-button",(function(e){const t=e.target.closest(".js-template-preview"),n=t.getAttribute("data-filename"),s=document.querySelector(".js-hidden-template-fields"),o=document.querySelector(".js-toggle-template-commit"),r=s.querySelector(`[data-filename="${n}"]`);r&&r.remove(),o.disabled=!1,t.remove(),F()})),s("click",".js-edit-custom-field-header",(function(e){e.target.closest(".js-custom-field-header").classList.toggle("section-focus");document.querySelector(".js-toggle-template-commit").disabled=!1})),s("details-menu-selected",".js-add-template",(function(e){const t=document.querySelector(".js-templates-container"),n=document.querySelector(".js-toggle-template-commit"),s=e.detail.relatedTarget.value;if(!s)return;n.disabled=!1;const o=document.getElementById(s);t.append(o.content.cloneNode(!0))}),{capture:!0});let P=class TrackedIssuesProgressElement extends HTMLElement{attributeChangedCallback(e,t,n){null!==t&&t!==n&&(this.timer&&cancelAnimationFrame(this.timer),this.timer=requestAnimationFrame((()=>this.update("0"===t&&"0"!==n))))}update(e){const t=Number(this.getAttribute("data-completed")||0),n=Number(this.getAttribute("data-total")||0);if(this.label.textContent=this.getLabelContent(t,n),this.progress&&n>0){const s=Number(this.progress.getAttribute("data-circumference")||0),o=t/n*100,r=Math.round(s-o/100*s).toString();this.progress.children[1].setAttribute("stroke-dashoffset",r),0===t?(this.progress.parentElement.style.display="none",this.checklist.style.display="flex"):e&&(this.progress.parentElement.style.display="flex",this.checklist.style.display="none")}}getLabelContent(e,t){return e>0?e===t?this.pluralizeTasks(t)+" done":`${e} of ${this.pluralizeTasks(t)}`:this.pluralizeTasks(t)}pluralizeTasks(e){return 1===e?"1 task":e+" tasks"}};P.observedAttributes=["data-total","data-completed"],i([a],P.prototype,"label",void 0),i([a],P.prototype,"progress",void 0),i([a],P.prototype,"checklist",void 0),P=i([c],P);const B=new WeakMap,K=new WeakMap;var z;s("change",".js-issues-list-check",(function(){const e=!!document.querySelector(".js-issues-list-check:checked");document.querySelector("#js-issues-toolbar").classList.toggle("triage-mode",e);for(const t of document.querySelectorAll(".js-issue-triage-menu"))B.set(t,!0)})),s("toggle",".js-issue-triage-menu",(function(e){const t=e.currentTarget;t.hasAttribute("open")?function(e){if(!B.has(e))return;const t=document.querySelector(".js-triage-loader-template"),n=e.querySelector(".js-triage-deferred-content");n.innerHTML="",n.append(t.content.cloneNode(!0));const s=function(e,t){const n=new URL(e,window.location.origin),s=new URLSearchParams(n.search);for(const[o,r]of t)s.append(o,r);return n.search=s.toString(),n.toString()}(e.getAttribute("data-url"),Array.from(document.querySelectorAll(".js-issues-list-check:checked")).map((e=>[e.name,e.value])));n.querySelector("include-fragment").setAttribute("src",s),B.delete(e)}(t):async function(e){const t=e.querySelector("form");if(!K.has(t))return;!function(e,t){const n=e.closest(".js-issues-toolbar-triage");n.querySelector(".js-issue-triage-spinner").hidden=!t,n.querySelector(".js-issue-triage-error").hidden=!0}(e,!0);try{const e=await fetch(t.action,{method:t.method,body:new FormData(t),headers:{"X-Requested-With":"XMLHttpRequest",Accept:"application/json"}});if(!e.ok){const t=new Error,n=e.statusText?" "+e.statusText:"";throw t.message=`HTTP ${e.status}${n}`,t}const n=await e.json();K.delete(t),await k(n.job.url,{headers:{accept:"application/json"}}),S({url:window.location.href,container:document.querySelector("#js-repo-pjax-container"),replace:!0})}catch(n){!function(e,t){const n=e.closest(".js-issues-toolbar-triage");n.querySelector(".js-issue-triage-spinner").hidden=!0,n.querySelector(".js-issue-triage-error").hidden=!t}(e,!0)}}(t)}),{capture:!0}),s("details-menu-selected",".js-issue-triage-menu details-menu",(function(e){const t=e.detail.relatedTarget,n=t.closest("form"),s=function(e){const t="true"===e.getAttribute("aria-checked"),n=e.getAttribute("name")||e.getAttribute("data-name"),s=e.getAttribute("value")||e.getAttribute("data-value"),o=document.createElement("input");switch(o.type="hidden",o.name=n,e.getAttribute("role")){case"menuitem":case"menuitemradio":o.value=s;break;case"menuitemcheckbox":o.value=t?s:"0"}return o}(t),o=n.querySelector(".js-issues-triage-fields"),r=o.querySelector(`[name='${s.name}']`);r?r.replaceWith(s):o.append(s);K.set(n,!0)}),{capture:!0}),o(".js-undo-issue-event-form",(async(e,t)=>{await t.text();const n=e.getAttribute("action");e.remove();const s=document.querySelectorAll(`.js-undo-issue-event-form[action="${n}"]`);for(let o=0;o<s.length;o++)s[o].remove()})),function(e){e.NONE="",e.ALT="alt",e.META="meta"}(z||(z={}));let U=z.NONE;const V=navigator.userAgent.match(/Macintosh/);function J(e){const t=document.querySelector(".js-convert-task-to-issue-enabled").querySelector(".js-convert-task-to-issue-data"),n=t.getAttribute("data-tooltip-label-inline"),s=t.getAttribute("data-tooltip-label-open"),o=t.getAttribute("data-tooltip-label-open-same-tab");for(const r of e)U===z.ALT?r.setAttribute("aria-label",o):U===z.META?r.setAttribute("aria-label",s):r.setAttribute("aria-label",n)}function Y(e){const t=e.currentTarget.closest("li.plain-task-item");if(!t)return;if(t.classList.contains("is-loading"))return;const n=document.querySelector(".js-convert-task-to-issue-enabled"),s=t.getAttribute("data-title"),o=t.getAttribute("data-position");if(U!==z.NONE)return void function(e,t,n,s){const o=t.querySelector(".js-convert-task-to-issue-data"),r=o.getAttribute("data-url"),i=o.getAttribute("data-parent-issue-number"),a=`${r}?convert_from_task=true&parent_issue_number=${i}&title=${encodeURIComponent(n)}&position=${s}`;U===z.ALT?window.open(a+"&click_type=current_tab","_self","noopener,noreferrer"):window.open(a+"&click_type=new_tab","_blank","noopener,noreferrer");Z()}(0,n,s,o);w(n),function(e){var t;e.classList.add("is-loading");const n=e.querySelector("input[type='checkbox']"),s=document.querySelector(".js-convert-task-to-issue-spinner").cloneNode(!0);s.removeAttribute("hidden"),null===(t=n.parentNode)||void 0===t||t.insertBefore(s,n.nextSibling);e.querySelector("button").hidden=!0}(t);const r=document.getElementById("js-inline-convert-to-issue-title"),i=document.getElementById("js-inline-convert-to-issue-position");r.value=s,i.value=o;const a=document.querySelector(".js-inline-convert-to-issue-form");a&&a instanceof HTMLFormElement&&async function(e,t,n){let s,o;try{s=await fetch(e.action,{method:e.method,body:new FormData(e),headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest"}}),o=await s.json()}catch(r){}(function(){const e=document.getElementById("js-inline-convert-to-issue-title"),t=document.getElementById("js-inline-convert-to-issue-position");e.value="",t.value=""})(),s&&!s.ok?o?(ae(o),A(t),function(e){if(!e)return;e.classList.remove("is-loading");const t=e.querySelector(".loading-spinner");e.removeChild(t)}(n)):ae():o&&L(o.title+" was converted to an issue.")}(a,n,t)}function Z(){U=z.NONE}function G(){var e;const t=null===(e=document.querySelector(".js-convert-to-issue-button"))||void 0===e?void 0:e.cloneNode(!0);return t.removeAttribute("hidden"),t.addEventListener("focus",re),t.addEventListener("blur",ie),t}function Q(e){return 0!==e.querySelectorAll(":scope > span > .js-issue-link").length||0!==e.querySelectorAll(":scope > p > span > .js-issue-link").length}function ee(e){return!!e.querySelector("button.convert-to-issue-button")}function te(e){return!!e.classList.contains("task-list-item")}function ne(e){return e.innerHTML.replace(/<(?!\/?code)[^>]+>|\n/g,"").replace(/<\/?code>/g,"`").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#96;/g,"`").replace(/&#x27;/g,"'").replace(/&apos;/g,"'").trim()}function se(e){var t,n;const s=e.target;if(!s)return;null===(t=s.parentElement)||void 0===t||t.classList.remove("hovered"),s.classList.remove("hovered");const o=null===(n=s.parentElement)||void 0===n?void 0:n.closest(".enabled.task-list-item");null==o||o.classList.add("hovered")}function oe(e){var t;const n=e.target;if(!n)return;const s=null===(t=n.parentElement)||void 0===t?void 0:t.closest(".enabled.task-list-item");null==s||s.classList.remove("hovered"),n.classList.add("hovered")}function re(e){var t;const n=e.target;if(!n)return;const s=null===(t=n.parentElement)||void 0===t?void 0:t.closest(".enabled.task-list-item");null==s||s.classList.add("hovered")}function ie(e){var t;const n=e.target;if(!n)return;const s=null===(t=n.parentElement)||void 0===t?void 0:t.closest(".enabled.task-list-item");null==s||s.classList.remove("hovered")}function ae(e){if((null==e?void 0:e.url)&&(null==e?void 0:e.url_title)){const t=document.querySelector(".js-convert-to-issue-update-error-toast").content.firstElementChild.querySelector("a");t.href=e.url,t.textContent=e.url_title,T(document.querySelector(".js-convert-to-issue-update-error-toast").innerHTML)}else T(document.querySelector(".js-convert-to-issue-save-error-toast").innerHTML)}function ce(e){const t=function(e){const t=e.parentElement;return t?t.closest(".contains-task-list"):null}(e);if(!t)throw new Error(".contains-task-list not found");const n=e?Array.from(t.children).indexOf(e):-1;return[le(t),n]}function le(e){const t=e.closest("task-lists");if(!t)throw new Error("parent not found");return Array.from(t.querySelectorAll("ol, ul")).indexOf(e)}n(".js-convert-task-to-issue-enabled .comment-body",(function(e){var t;!function(e,t){for(const n of t){if(ee(n))return;const e=n.querySelector("ul, ol");if(e&&n.classList.add("pb-0"),n.classList.add("position-relative","border-right-0"),Q(n))continue;if(!te(n))continue;n.classList.add("plain-task-item");const t=G();let s="";if(e){for(const e of n.childNodes)e.nodeType===Node.TEXT_NODE&&(s+=e.nodeValue);n.insertBefore(t,e)}else n.classList.add("pr-6"),s=ne(n),n.appendChild(t);const o=s.trim(),r=ce(n).toString();n.setAttribute("data-title",o),n.setAttribute("data-position",r);const i=document.createElement("span");i.hidden=!0,n.appendChild(i);const a=`Press Enter to convert to an issue instantly. Press ${V?"Option":"Alt"}-Enter to open the create new issue form in the current tab. Press Shift-Enter to open the create new issue form.`;i.textContent=`Create an issue with the title ${o}. ${a}`;const c=r.replace(/,/,"-");i.id="button-description-"+c,t.setAttribute("aria-describedby","button-description-"+c)}}(0,(t=e,Array.from(t.querySelectorAll("ul.contains-task-list > li")))),function(e){const t=e,n=Array.from(t.querySelectorAll("button.convert-to-issue-button"));window.addEventListener("keydown",(e=>{(function(e){return e.altKey||e.ctrlKey&&e.shiftKey||e.shiftKey||e.metaKey})(e)&&(U=e.altKey?z.ALT:z.META,J(n))})),window.addEventListener("keyup",(()=>{Z(),J(n)}))}(e)})),n(".enabled.task-list-item",{subscribe:e=>q(d(e,"mouseenter",oe),d(e,"mouseleave",se))}),n(".js-convert-to-issue-button",{subscribe:e=>q(d(e,"click",Y))}),n(".js-convert-task-to-issue-enabled .task-list-item-checkbox",{subscribe:e=>q(d(e,"focus",re),d(e,"blur",ie))}),n(".js-convert-task-to-issue-enabled .js-issue-link",{subscribe:e=>q(d(e,"focus",re),d(e,"blur",ie))})}}}));
//# sourceMappingURL=issues-369c8f07.js.map
