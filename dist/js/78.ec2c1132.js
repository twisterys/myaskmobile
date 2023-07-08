"use strict";(globalThis["webpackChunkmy_ask"]=globalThis["webpackChunkmy_ask"]||[]).push([[78],{8487:(t,o,e)=>{e.d(o,{a:()=>u,c:()=>m,g:()=>i,s:()=>h});var s=e(6587);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const r="ION-CONTENT",n="ion-content",a=".ion-content-scroll-host",l=`${n}, ${a}`,c=t=>t.tagName===r,i=async t=>c(t)?(await new Promise((o=>(0,s.c)(t,o))),t.getScrollElement()):t,u=t=>t.closest(l),h=(t,o)=>{if(c(t)){const e=t;return e.scrollToTop(o)}return Promise.resolve(t.scrollTo({top:0,left:0,behavior:o>0?"smooth":"auto"}))},m=(t,o,e,s)=>{if(c(t)){const r=t;return r.scrollByPoint(o,e,s)}return Promise.resolve(t.scrollBy({top:e,left:o,behavior:s>0?"smooth":"auto"}))}},6078:(t,o,e)=>{e.r(o),e.d(o,{startStatusTap:()=>a});var s=e(65),r=e(8487),n=e(6587);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const a=()=>{const t=window;t.addEventListener("statusTap",(()=>{(0,s.wj)((()=>{const o=t.innerWidth,e=t.innerHeight,a=document.elementFromPoint(o/2,e/2);if(!a)return;const l=(0,r.a)(a);l&&new Promise((t=>(0,n.c)(l,t))).then((()=>{(0,s.Iu)((async()=>{l.style.setProperty("--overflow","hidden"),await(0,r.s)(l,300),l.style.removeProperty("--overflow")}))}))}))}))}}}]);
//# sourceMappingURL=78.ec2c1132.js.map