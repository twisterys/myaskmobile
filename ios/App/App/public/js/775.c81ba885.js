"use strict";(globalThis["webpackChunkmy_ask"]=globalThis["webpackChunkmy_ask"]||[]).push([[775],{8487:(e,t,o)=>{o.d(t,{a:()=>d,c:()=>m,g:()=>c,s:()=>u});var n=o(6587);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const r="ION-CONTENT",i="ion-content",s=".ion-content-scroll-host",a=`${i}, ${s}`,l=e=>e.tagName===r,c=async e=>l(e)?(await new Promise((t=>(0,n.c)(e,t))),e.getScrollElement()):e,d=e=>e.closest(a),u=(e,t)=>{if(l(e)){const o=e;return o.scrollToTop(t)}return Promise.resolve(e.scrollTo({top:0,left:0,behavior:t>0?"smooth":"auto"}))},m=(e,t,o,n)=>{if(l(e)){const r=e;return r.scrollByPoint(t,o,n)}return Promise.resolve(e.scrollBy({top:o,left:t,behavior:n>0?"smooth":"auto"}))}},8775:(e,t,o)=>{o.r(t),o.d(t,{startInputShims:()=>A});var n=o(8487),r=o(6587),i=o(3541);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const s=new WeakMap,a=(e,t,o,n=0,r=!1)=>{s.has(e)!==o&&(o?c(e,t,n,r):d(e,t))},l=e=>e===e.getRootNode().activeElement,c=(e,t,o,n=!1)=>{const r=t.parentNode,i=t.cloneNode(!1);i.classList.add("cloned-input"),i.tabIndex=-1,n&&(i.disabled=!0),r.appendChild(i),s.set(e,i);const a=e.ownerDocument,l="rtl"===a.dir?9999:-9999;e.style.pointerEvents="none",t.style.transform=`translate3d(${l}px,${o}px,0) scale(0)`},d=(e,t)=>{const o=s.get(e);o&&(s.delete(e),o.remove()),e.style.pointerEvents="",t.style.transform=""},u=50,m=(e,t,o)=>{if(!o||!t)return()=>{};const n=o=>{l(t)&&a(e,t,o)},i=()=>a(e,t,!1),s=()=>n(!0),c=()=>n(!1);return(0,r.a)(o,"ionScrollStart",s),(0,r.a)(o,"ionScrollEnd",c),t.addEventListener("blur",i),()=>{(0,r.b)(o,"ionScrollStart",s),(0,r.b)(o,"ionScrollEnd",c),t.removeEventListener("blur",i)}},v="input, textarea, [no-blur], [contenteditable]",f=()=>{let e=!0,t=!1;const o=document,n=()=>{t=!0},i=()=>{e=!0},s=n=>{if(t)return void(t=!1);const r=o.activeElement;if(!r)return;if(r.matches(v))return;const i=n.target;i!==r&&(i.matches(v)||i.closest(v)||(e=!1,setTimeout((()=>{e||r.blur()}),50)))};return(0,r.a)(o,"ionScrollStart",n),o.addEventListener("focusin",i,!0),o.addEventListener("touchend",s,!1),()=>{(0,r.b)(o,"ionScrollStart",n,!0),o.removeEventListener("focusin",i,!0),o.removeEventListener("touchend",s,!1)}},p=.3,h=(e,t,o)=>{var n;const r=null!==(n=e.closest("ion-item,[ion-item]"))&&void 0!==n?n:e;return w(r.getBoundingClientRect(),t.getBoundingClientRect(),o,e.ownerDocument.defaultView.innerHeight)},w=(e,t,o,n)=>{const r=e.top,i=e.bottom,s=t.top,a=Math.min(t.bottom,n-o),l=s+15,c=a-u,d=c-i,m=l-r,v=Math.round(d<0?-d:m>0?-m:0),f=Math.min(v,r-s),h=Math.abs(f),w=h/p,y=Math.min(400,Math.max(150,w));return{scrollAmount:f,scrollDuration:y,scrollPadding:o,inputSafeY:4-(r-l)}},y="$ionPaddingTimer",b=(e,t,o)=>{const n=e[y];n&&clearTimeout(n),t>0?e.style.setProperty("--keyboard-offset",`${t}px`):e[y]=setTimeout((()=>{e.style.setProperty("--keyboard-offset","0px"),o&&o()}),120)},g=(e,t,o)=>{const n=()=>{t&&b(t,0,o)};e.addEventListener("focusout",n,{once:!0})};let E=0;const S="data-ionic-skip-scroll-assist",L=(e,t,o,n,r,s,a,l=!1)=>{const c=s&&(void 0===a||a.mode===i.a.None),d=async()=>{t.hasAttribute(S)?t.removeAttribute(S):T(e,t,o,n,r,c,l)};return e.addEventListener("focusin",d,!0),()=>{e.removeEventListener("focusin",d,!0)}},k=e=>{document.activeElement!==e&&(e.setAttribute(S,"true"),e.focus())},T=async(e,t,o,i,s,l,c=!1)=>{if(!o&&!i)return;const d=h(e,o||i,s);if(o&&Math.abs(d.scrollAmount)<4)return k(t),void(l&&null!==o&&(b(o,E),g(t,o,(()=>E=0))));if(a(e,t,!0,d.inputSafeY,c),k(t),(0,r.r)((()=>e.click())),l&&o&&(E=d.scrollPadding,b(o,E)),"undefined"!==typeof window){let r;const i=async()=>{void 0!==r&&clearTimeout(r),window.removeEventListener("ionKeyboardDidShow",s),window.removeEventListener("ionKeyboardDidShow",i),o&&await(0,n.c)(o,0,d.scrollAmount,d.scrollDuration),a(e,t,!1,d.inputSafeY),k(t),l&&g(t,o,(()=>E=0))},s=()=>{window.removeEventListener("ionKeyboardDidShow",s),window.addEventListener("ionKeyboardDidShow",i)};if(o){const e=await(0,n.g)(o),a=e.scrollHeight-e.clientHeight;if(d.scrollAmount>a-e.scrollTop)return"password"===t.type?(d.scrollAmount+=u,window.addEventListener("ionKeyboardDidShow",s)):window.addEventListener("ionKeyboardDidShow",i),void(r=setTimeout(i,1e3))}i()}},D=!0,A=async(e,t)=>{const o=document,s="ios"===t,a="android"===t,l=e.getNumber("keyboardHeight",290),c=e.getBoolean("scrollAssist",!0),d=e.getBoolean("hideCaretOnScroll",s),u=e.getBoolean("inputBlurring",s),v=e.getBoolean("scrollPadding",!0),p=Array.from(o.querySelectorAll("ion-input, ion-textarea")),h=new WeakMap,w=new WeakMap,y=await i.K.getResizeMode(),b=async e=>{await new Promise((t=>(0,r.c)(e,t)));const t=e.shadowRoot||e,o=t.querySelector("input")||t.querySelector("textarea"),i=(0,n.a)(e),s=i?null:e.closest("ion-footer");if(!o)return;if(i&&d&&!h.has(e)){const t=m(e,o,i);h.set(e,t)}const u="date"===o.type||"datetime-local"===o.type;if(!u&&(i||s)&&c&&!w.has(e)){const t=L(e,o,i,s,l,v,y,a);w.set(e,t)}},g=e=>{if(d){const t=h.get(e);t&&t(),h.delete(e)}if(c){const t=w.get(e);t&&t(),w.delete(e)}};u&&D&&f();for(const n of p)b(n);o.addEventListener("ionInputDidLoad",(e=>{b(e.detail)})),o.addEventListener("ionInputDidUnload",(e=>{g(e.detail)}))}}}]);
//# sourceMappingURL=775.c81ba885.js.map