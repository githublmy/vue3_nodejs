import{a as x,m as P,o as X,ar as Y,e as c,h as E,f as l,w as o,i as j,u as s,v as p,as as C,b,av as q,am as A,aj as $,b6 as G,at as H,ah as J,au as K}from"./vendor-CKOI4o9H.js";import{_ as O}from"../js/main.aSi9Bn6y.js";const Q={class:"sign"},Z=["width","height"],ee=x({__name:"index",setup(z){const e=P({width:800,height:300,fillStyle:"#fff",color:"#000",lineWidth:4});let m=!1,i,n,d=[];const B=()=>{i=document.getElementById("canvas"),n=i.getContext("2d",{willReadFrequently:!0}),g(),n.fillRect(0,0,i.width,i.height),_(),h()},h=()=>{n.strokeStyle=e.value.color},_=()=>{n.lineWidth=e.value.lineWidth},g=()=>{n.fillStyle=e.value.fillStyle},D=()=>{e.value={...e.value,fillStyle:"#fff",color:"#000",lineWidth:4},g(),_(),h()},W=()=>{m=!1},R=()=>{const t=n.getImageData(0,0,i.width,i.height);d.push(t),m=!1},U=()=>{if(d.length)if(d.length>1){const t=d.at(-2);d.pop(),n.putImageData(t,0,0)}else d.length===1&&(d.pop(),V())};function V(){d.length&&(d=[],n.clearRect(0,0,i.width,i.height))}const I=()=>{const t=document.createElement("a"),a=i.toDataURL();t.href=a,t.download=M(),document.body.appendChild(t),t.click(),document.body.removeChild(t)},M=(t=36,a=-6)=>Math.random().toString(t).slice(a),N=t=>{n.beginPath(),n.moveTo(t.offsetX,t.offsetY),m=!0},F=t=>{m&&(n.lineTo(t.offsetX,t.offsetY),n.stroke())},T=()=>{g(),n.fillRect(0,0,i.width,i.height)};return X(()=>{B()}),(t,a)=>{const v=q,w=A,u=$,S=G,f=H,L=J,k=K,y=Y("blur");return c(),E("div",Q,[l(k,{gutter:20},{default:o(()=>[l(v,{span:20},{default:o(()=>[j("canvas",{id:"canvas",width:s(e).width,height:s(e).height,onMouseleave:W,onMousedown:N,onMouseup:R,onMousemove:F}," 你的浏览器不支持 canvas，请升级你的浏览器。 ",40,Z)]),_:1}),l(v,{span:4},{default:o(()=>[l(L,{model:s(e),ref:"form","label-width":"80px",inline:!1},{default:o(()=>[l(u,{label:"画布宽度",prop:"width"},{default:o(()=>[l(w,{modelValue:s(e).width,"onUpdate:modelValue":a[0]||(a[0]=r=>s(e).width=r),min:0,size:"small"},null,8,["modelValue"])]),_:1}),l(u,{label:"画布高度",prop:"height"},{default:o(()=>[l(w,{modelValue:s(e).height,"onUpdate:modelValue":a[1]||(a[1]=r=>s(e).height=r),min:0,size:"small"},null,8,["modelValue"])]),_:1}),l(u,{label:"背景颜色",prop:"fillStyle"},{default:o(()=>[l(S,{modelValue:s(e).fillStyle,"onUpdate:modelValue":a[2]||(a[2]=r=>s(e).fillStyle=r),size:"large","show-alpha":"",onChange:T},null,8,["modelValue"])]),_:1}),l(u,{label:"画笔颜色",prop:"color"},{default:o(()=>[l(S,{modelValue:s(e).color,"onUpdate:modelValue":a[3]||(a[3]=r=>s(e).color=r),size:"large","show-alpha":"",onChange:h},null,8,["modelValue"])]),_:1}),l(u,{label:"画笔粗细",prop:"lineWidth"},{default:o(()=>[l(w,{modelValue:s(e).lineWidth,"onUpdate:modelValue":a[4]||(a[4]=r=>s(e).lineWidth=r),min:0,"step-strictly":"",onChange:_,size:"small"},null,8,["modelValue"])]),_:1}),l(u,null,{default:o(()=>[l(f,{type:"primary",size:"small",onClick:D},{default:o(()=>[p("重置")]),_:1})]),_:1})]),_:1},8,["model"])]),_:1})]),_:1}),l(k,null,{default:o(()=>[l(v,null,{default:o(()=>[C((c(),b(f,{type:"primary",size:"small",onClick:U},{default:o(()=>[p("上一步")]),_:1})),[[y]]),C((c(),b(f,{type:"primary",size:"small",onClick:V},{default:o(()=>[p("清空")]),_:1})),[[y]]),C((c(),b(f,{type:"primary",size:"small",onClick:I},{default:o(()=>[p("保存图片")]),_:1})),[[y]])]),_:1})]),_:1})])}}}),le=O(ee,[["__scopeId","data-v-089bfd7b"]]),ae=x({__name:"Sign",setup(z){return(e,m)=>(c(),E("div",null,[l(le)]))}});export{ae as default};