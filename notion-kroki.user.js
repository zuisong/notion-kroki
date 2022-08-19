// ==UserScript==
// @name        notion-kroki
// @namespace   https://github.com/zuisong/notion-kroki
// @grant       none
// @version     1.1.3
// @match        *://www.notion.so/*
// @match        *://*.notion.site/*
// @match        *://*.super.site/*
// @supportURL  https://github.com/zuisong/notion-kroki/issues
// @run-at      document-idle
// @author      zuisong
// @description Render notion code block as graph by kroki
// ==/UserScript==

async function mr(r){return new Promise((t,e)=>setTimeout(t,r))}function wr(r,t){let e=document.evaluate(r,t,null,XPathResult.ANY_TYPE,null),n=[],i;for(;i=e.iterateNext(),i;)n.push(i);return n}function j(r){localStorage.getItem("debug")&&console.log(r)}function xr(r,t){let e;return function(...n){clearTimeout(e),e=setTimeout(()=>r(n),t)}}var Z=Uint8Array,z=Uint16Array,b=Uint32Array,fr=new Z([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),ur=new Z([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),zr=new Z([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Mr=function(r,t){for(var e=new z(31),n=0;n<31;++n)e[n]=t+=1<<r[n-1];for(var i=new b(e[30]),n=1;n<30;++n)for(var o=e[n];o<e[n+1];++o)i[o]=o-e[n]<<5|n;return[e,i]},Ur=Mr(fr,2),Br=Ur[0],er=Ur[1];Br[28]=258,er[258]=28;var kr=Mr(ur,0),Vr=kr[0],Tr=kr[1],ir=new z(32768);for(u=0;u<32768;++u)O=(u&43690)>>>1|(u&21845)<<1,O=(O&52428)>>>2|(O&13107)<<2,O=(O&61680)>>>4|(O&3855)<<4,ir[u]=((O&65280)>>>8|(O&255)<<8)>>>1;var O,u,J=function(r,t,e){for(var n=r.length,i=0,o=new z(t);i<n;++i)r[i]&&++o[r[i]-1];var s=new z(t);for(i=0;i<t;++i)s[i]=s[i-1]+o[i-1]<<1;var l;if(e){l=new z(1<<t);var h=15-t;for(i=0;i<n;++i)if(r[i])for(var v=i<<4|r[i],a=t-r[i],c=s[r[i]-1]++<<a,g=c|(1<<a)-1;c<=g;++c)l[ir[c]>>>h]=v}else for(l=new z(n),i=0;i<n;++i)r[i]&&(l[i]=ir[s[r[i]-1]++]>>>15-r[i]);return l},H=new Z(288);for(u=0;u<144;++u)H[u]=8;var u;for(u=144;u<256;++u)H[u]=9;var u;for(u=256;u<280;++u)H[u]=7;var u;for(u=280;u<288;++u)H[u]=8;var u,V=new Z(32);for(u=0;u<32;++u)V[u]=5;var u,Zr=J(H,9,0);var Pr=J(V,5,0);var Sr=function(r){return(r+7)/8|0},Cr=function(r,t,e){(t==null||t<0)&&(t=0),(e==null||e>r.length)&&(e=r.length);var n=new(r.BYTES_PER_ELEMENT==2?z:r.BYTES_PER_ELEMENT==4?b:Z)(e-t);return n.set(r.subarray(t,e)),n};var Or=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Dr=function(r,t,e){var n=new Error(t||Or[r]);if(n.code=r,Error.captureStackTrace&&Error.captureStackTrace(n,Dr),!e)throw n;return n};var G=function(r,t,e){e<<=t&7;var n=t/8|0;r[n]|=e,r[n+1]|=e>>>8},W=function(r,t,e){e<<=t&7;var n=t/8|0;r[n]|=e,r[n+1]|=e>>>8,r[n+2]|=e>>>16},tr=function(r,t){for(var e=[],n=0;n<r.length;++n)r[n]&&e.push({s:n,f:r[n]});var i=e.length,o=e.slice();if(!i)return[lr,0];if(i==1){var s=new Z(e[0].s+1);return s[e[0].s]=1,[s,1]}e.sort(function(F,M){return F.f-M.f}),e.push({s:-1,f:25001});var l=e[0],h=e[1],v=0,a=1,c=2;for(e[0]={s:-1,f:l.f+h.f,l,r:h};a!=i-1;)l=e[e[v].f<e[c].f?v++:c++],h=e[v!=a&&e[v].f<e[c].f?v++:c++],e[a++]={s:-1,f:l.f+h.f,l,r:h};for(var g=o[0].s,n=1;n<i;++n)o[n].s>g&&(g=o[n].s);var p=new z(g+1),w=ar(e[a-1],p,0);if(w>t){var n=0,y=0,E=w-t,P=1<<E;for(o.sort(function(M,x){return p[x.s]-p[M.s]||M.f-x.f});n<i;++n){var D=o[n].s;if(p[D]>t)y+=P-(1<<w-p[D]),p[D]=t;else break}for(y>>>=E;y>0;){var R=o[n].s;p[R]<t?y-=1<<t-p[R]++-1:++n}for(;n>=0&&y;--n){var L=o[n].s;p[L]==t&&(--p[L],++y)}w=t}return[new Z(p),w]},ar=function(r,t,e){return r.s==-1?Math.max(ar(r.l,t,e+1),ar(r.r,t,e+1)):t[r.s]=e},Ar=function(r){for(var t=r.length;t&&!r[--t];);for(var e=new z(++t),n=0,i=r[0],o=1,s=function(h){e[n++]=h},l=1;l<=t;++l)if(r[l]==i&&l!=t)++o;else{if(!i&&o>2){for(;o>138;o-=138)s(32754);o>2&&(s(o>10?o-11<<5|28690:o-3<<5|12305),o=0)}else if(o>3){for(s(i),--o;o>6;o-=6)s(8304);o>2&&(s(o-3<<5|8208),o=0)}for(;o--;)s(i);o=1,i=r[l]}return[e.subarray(0,n),t]},X=function(r,t){for(var e=0,n=0;n<t.length;++n)e+=r[n]*t[n];return e},or=function(r,t,e){var n=e.length,i=Sr(t+2);r[i]=n&255,r[i+1]=n>>>8,r[i+2]=r[i]^255,r[i+3]=r[i+1]^255;for(var o=0;o<n;++o)r[i+o+4]=e[o];return(i+4+n)*8},Er=function(r,t,e,n,i,o,s,l,h,v,a){G(t,a++,e),++i[256];for(var c=tr(i,15),g=c[0],p=c[1],w=tr(o,15),y=w[0],E=w[1],P=Ar(g),D=P[0],R=P[1],L=Ar(y),F=L[0],M=L[1],x=new z(19),f=0;f<D.length;++f)x[D[f]&31]++;for(var f=0;f<F.length;++f)x[F[f]&31]++;for(var $=tr(x,7),U=$[0],Q=$[1],T=19;T>4&&!U[zr[T-1]];--T);var Y=v+5<<3,k=X(i,H)+X(o,V)+s,S=X(i,g)+X(o,y)+s+14+3*T+X(x,U)+(2*x[16]+3*x[17]+7*x[18]);if(Y<=k&&Y<=S)return or(t,a,r.subarray(h,h+v));var I,m,C,N;if(G(t,a,1+(S<k)),a+=2,S<k){I=J(g,p,0),m=g,C=J(y,E,0),N=y;var _=J(U,Q,0);G(t,a,R-257),G(t,a+5,M-1),G(t,a+10,T-4),a+=14;for(var f=0;f<T;++f)G(t,a+3*f,U[zr[f]]);a+=3*T;for(var d=[D,F],K=0;K<2;++K)for(var q=d[K],f=0;f<q.length;++f){var B=q[f]&31;G(t,a,_[B]),a+=U[B],B>15&&(G(t,a,q[f]>>>5&127),a+=q[f]>>>12)}}else I=Zr,m=H,C=Pr,N=V;for(var f=0;f<l;++f)if(n[f]>255){var B=n[f]>>>18&31;W(t,a,I[B+257]),a+=m[B+257],B>7&&(G(t,a,n[f]>>>23&31),a+=fr[B]);var A=n[f]&31;W(t,a,C[A]),a+=N[A],A>3&&(W(t,a,n[f]>>>5&8191),a+=ur[A])}else W(t,a,I[n[f]]),a+=m[n[f]];return W(t,a,I[256]),a+m[256]},Gr=new b([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),lr=new Z(0),Lr=function(r,t,e,n,i,o){var s=r.length,l=new Z(n+s+5*(1+Math.ceil(s/7e3))+i),h=l.subarray(n,l.length-i),v=0;if(!t||s<8)for(var a=0;a<=s;a+=65535){var c=a+65535;c>=s&&(h[v>>3]=o),v=or(h,v+1,r.subarray(a,c))}else{for(var g=Gr[t-1],p=g>>>13,w=g&8191,y=(1<<e)-1,E=new z(32768),P=new z(y+1),D=Math.ceil(e/3),R=2*D,L=function(nr){return(r[nr]^r[nr+1]<<D^r[nr+2]<<R)&y},F=new b(25e3),M=new z(288),x=new z(32),f=0,$=0,a=0,U=0,Q=0,T=0;a<s;++a){var Y=L(a),k=a&32767,S=P[Y];if(E[k]=S,P[Y]=k,Q<=a){var I=s-a;if((f>7e3||U>24576)&&I>423){v=Er(r,h,0,F,M,x,$,U,T,a-T,v),U=f=$=0,T=a;for(var m=0;m<286;++m)M[m]=0;for(var m=0;m<30;++m)x[m]=0}var C=2,N=0,_=w,d=k-S&32767;if(I>2&&Y==L(a-d))for(var K=Math.min(p,I)-1,q=Math.min(32767,a),B=Math.min(258,I);d<=q&&--_&&k!=S;){if(r[a+C]==r[a+C-d]){for(var A=0;A<B&&r[a+A]==r[a+A-d];++A);if(A>C){if(C=A,N=d,A>K)break;for(var Ir=Math.min(d,A-2),cr=0,m=0;m<Ir;++m){var rr=a-d+m+32768&32767,dr=E[rr],pr=rr-dr+32768&32767;pr>cr&&(cr=pr,S=rr)}}}k=S,S=E[k],d+=k-S+32768&32767}if(N){F[U++]=268435456|er[C]<<18|Tr[N];var gr=er[C]&31,yr=Tr[N]&31;$+=fr[gr]+ur[yr],++M[257+gr],++x[yr],Q=a+C,++f}else F[U++]=r[a],++M[r[a]]}}v=Er(r,h,o,F,M,x,$,U,T,a-T,v),!o&&v&7&&(v=or(h,v+1,lr))}return Cr(l,0,n+Sr(v)+i)};var Nr=function(){var r=1,t=0;return{p:function(e){for(var n=r,i=t,o=e.length|0,s=0;s!=o;){for(var l=Math.min(s+2655,o);s<l;++s)i+=n+=e[s];n=(n&65535)+15*(n>>16),i=(i&65535)+15*(i>>16)}r=n,t=i},d:function(){return r%=65521,t%=65521,(r&255)<<24|r>>>8<<16|(t&255)<<8|t>>>8}}},$r=function(r,t,e,n,i){return Lr(r,t.level==null?6:t.level,t.mem==null?Math.ceil(Math.max(8,Math.min(13,Math.log(r.length)))*1.5):12+t.mem,e,n,!i)};var Hr=function(r,t,e){for(;e;++t)r[t]=e,e>>>=8};var Rr=function(r,t){var e=t.level,n=e==0?0:e<6?1:e==9?3:2;r[0]=120,r[1]=n<<6|(n?32-2*n:1)};function vr(r,t){t||(t={});var e=Nr();e.p(r);var n=$r(r,t,2,4);return Rr(n,t),Hr(n,n.length-4,e.d()),n}var sr=typeof TextDecoder<"u"&&new TextDecoder,Yr=0;try{sr.decode(lr,{stream:!0}),Yr=1}catch(r){}var qr=function(r){for(var t="",e=0;;){var n=r[e++],i=(n>127)+(n>223)+(n>239);if(e+i>r.length)return[t,Cr(r,e-1)];i?i==3?(n=((n&15)<<18|(r[e++]&63)<<12|(r[e++]&63)<<6|r[e++]&63)-65536,t+=String.fromCharCode(55296|n>>10,56320|n&1023)):i&1?t+=String.fromCharCode((n&31)<<6|r[e++]&63):t+=String.fromCharCode((n&15)<<12|(r[e++]&63)<<6|r[e++]&63):t+=String.fromCharCode(n)}};function hr(r,t){if(t){for(var e="",n=0;n<r.length;n+=16384)e+=String.fromCharCode.apply(null,r.subarray(n,n+16384));return e}else{if(sr)return sr.decode(r);var i=qr(r),o=i[0],s=i[1];return s.length&&Dr(8),o}}var jr={serverPath:"//kroki.io/"};async function Fr(r=null){var e,n,i,o,s,l,h;await mr(3e3);let t=wr("//*[starts-with(text(),'//kroki ')]",r!=null?r:document.body);for(let v of t)if(!!v&&v.innerText.startsWith("//kroki")){let a=v.innerText.split(`
`),c=a[0].replace("//kroki","").trim();if(!(c!=null&&c.trim()))continue;let g=a.filter((E,P)=>P!=0).join(`
`);if(!(g!=null&&g.trim()))continue;let p=Wr(g,c,jr),w=document.createElement("div",void 0);w.style.cssText="display: flex; flex-direction: row; place-content: center;",w.setAttribute("notion-kroki","true"),w.innerHTML=`<object type="image/svg+xml" style="max-width: 100%;" data="${p}" />`;let y=(n=(e=v.parentElement)==null?void 0:e.parentElement)==null?void 0:n.querySelector("div[notion-kroki]");if(y){let E=(i=y.firstElementChild)==null?void 0:i.getAttribute("data");if(j(`preSvgUrl:${E}`),j(`svgUrl:${p}`),E==p)continue;(s=(o=v.parentElement)==null?void 0:o.parentElement)==null||s.removeChild(y)}(h=(l=v.parentElement)==null?void 0:l.parentElement)==null||h.appendChild(w)}}function Kr(r){return new TextEncoder().encode(r)}function Wr(r,t,e){r=r.trim(),j(`kroki render type: ${t}`),j(`kroki render content: 
 ${r}`);let n=`${(e==null?void 0:e.serverPath)+t}/svg/`,i=Kr(r),o=hr(vr(i,{level:9}),!0),s=btoa(o).replace(/\+/g,"-").replace(/\//g,"_");return n+s}Fr();function Xr(){Fr()}new MutationObserver(Jr).observe(document,{childList:!0,subtree:!0});function Jr(r,t){j(r),r.forEach(e=>{xr(Xr,1e3)(e.target)})}

