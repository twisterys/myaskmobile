"use strict";(globalThis["webpackChunkmy_ask"]=globalThis["webpackChunkmy_ask"]||[]).push([[990],{8990:(t,e,n)=>{n.r(e),n.d(e,{createSwipeBackGesture:()=>i});var a=n(6587),r=n(545),s=n(6515);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const i=(t,e,n,i,o)=>{const c=t.ownerDocument.defaultView;let l=(0,r.i)(t);const h=t=>{const e=50,{startX:n}=t;return l?n>=c.innerWidth-e:n<=e},u=t=>l?-t.deltaX:t.deltaX,d=t=>l?-t.velocityX:t.velocityX,k=n=>(l=(0,r.i)(t),h(n)&&e()),b=t=>{const e=u(t),n=e/c.innerWidth;i(n)},m=t=>{const e=u(t),n=c.innerWidth,r=e/n,s=d(t),i=n/2,l=s>=0&&(s>.2||e>i),h=l?1-r:r,k=h*n;let b=0;if(k>5){const t=k/Math.abs(s);b=Math.min(t,540)}o(l,r<=0?.01:(0,a.m)(0,r,.9999),b)};return(0,s.A)({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:k,onStart:n,onMove:b,onEnd:m})}}}]);
//# sourceMappingURL=990.99e41396.js.map