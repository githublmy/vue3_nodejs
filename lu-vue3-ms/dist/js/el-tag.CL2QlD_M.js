import{S as B,k as T}from"./_Uint8Array.CZt4dQYT.js";import{b as A}from"./isEqual.7kw8jDiK.js";import{bJ as z,co as I,cp as P,b5 as F,cq as L,cr as $,bI as x,bP as N,aV as D,bU as G,d as R,bp as U,aX as K,aq as q,o as d,c as J,ae as g,h as b,aI as u,e as i,b as h,w as C,g as k,cs as v,a_ as y,aA as E,i as _,n as S,ct as X,b4 as H,b_ as Q,r as V,cu as W,bt as Y}from"./main.FTzGWMCm.js";function Z(e,n,t,r){e.length;for(var s=t+1;s--;)if(n(e[s],s,e))return s;return-1}var j=1,ee=2;function ne(e,n,t,r){var s=t.length,l=s;if(e==null)return!l;for(e=Object(e);s--;){var o=t[s];if(o[2]?o[1]!==e[o[0]]:!(o[0]in e))return!1}for(;++s<l;){o=t[s];var c=o[0],a=e[c],f=o[1];if(o[2]){if(a===void 0&&!(c in e))return!1}else{var m=new B,p;if(!(p===void 0?A(f,a,j|ee,r,m):p))return!1}}return!0}function M(e){return e===e&&!z(e)}function se(e){for(var n=T(e),t=n.length;t--;){var r=n[t],s=e[r];n[t]=[r,s,M(s)]}return n}function w(e,n){return function(t){return t==null?!1:t[e]===n&&(n!==void 0||e in Object(t))}}function te(e){var n=se(e);return n.length==1&&n[0][2]?w(n[0][0],n[0][1]):function(t){return t===e||ne(t,e,n)}}var ae=1,re=2;function oe(e,n){return I(e)&&M(n)?w(P(e),n):function(t){var r=F(t,e);return r===void 0&&r===n?L(t,e):A(n,r,ae|re)}}function ie(e){return function(n){return n==null?void 0:n[e]}}function le(e){return function(n){return $(n,e)}}function ce(e){return I(e)?ie(P(e)):le(e)}function ue(e){return typeof e=="function"?e:e==null?x:typeof e=="object"?N(e)?oe(e[0],e[1]):te(e):ce(e)}function ke(e,n,t){var r=e==null?0:e.length;if(!r)return-1;var s=r-1;return Z(e,ue(n),s)}const ve=(e="")=>e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d"),fe=D({type:{type:String,values:["primary","success","info","warning","danger"],default:"primary"},closable:Boolean,disableTransitions:Boolean,hit:Boolean,color:String,size:{type:String,values:G},effect:{type:String,values:["dark","light","plain"],default:"light"},round:Boolean}),pe={close:e=>e instanceof MouseEvent,click:e=>e instanceof MouseEvent},de=R({name:"ElTag"}),me=R({...de,props:fe,emits:pe,setup(e,{emit:n}){const t=e,r=U(),s=K("tag"),l=q(()=>{const{type:a,hit:f,effect:m,closable:p,round:O}=t;return[s.b(),s.is("closable",p),s.m(a||"primary"),s.m(r.value),s.m(m),s.is("hit",f),s.is("round",O)]}),o=a=>{n("close",a)},c=a=>{n("click",a)};return(a,f)=>a.disableTransitions?(d(),J("span",{key:0,class:u(i(l)),style:S({backgroundColor:a.color}),onClick:c},[g("span",{class:u(i(s).e("content"))},[b(a.$slots,"default")],2),a.closable?(d(),h(i(E),{key:0,class:u(i(s).e("close")),onClick:y(o,["stop"])},{default:C(()=>[k(i(v))]),_:1},8,["class","onClick"])):_("v-if",!0)],6)):(d(),h(X,{key:1,name:`${i(s).namespace.value}-zoom-in-center`,appear:""},{default:C(()=>[g("span",{class:u(i(l)),style:S({backgroundColor:a.color}),onClick:c},[g("span",{class:u(i(s).e("content"))},[b(a.$slots,"default")],2),a.closable?(d(),h(i(E),{key:0,class:u(i(s).e("close")),onClick:y(o,["stop"])},{default:C(()=>[k(i(v))]),_:1},8,["class","onClick"])):_("v-if",!0)],6)]),_:3},8,["name"]))}});var ge=H(me,[["__file","tag.vue"]]);const ye=Q(ge);function Ee(e){const n=V(!1);return{handleCompositionStart:()=>{n.value=!0},handleCompositionUpdate:l=>{const o=l.target.value,c=o[o.length-1]||"";n.value=!W(c)},handleCompositionEnd:l=>{n.value&&(n.value=!1,Y(e)&&e(l))}}}export{ye as E,ue as b,ve as e,ke as f,fe as t,Ee as u};