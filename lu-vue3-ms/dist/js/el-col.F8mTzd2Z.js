import{aT as h,aY as o,aZ as u,d as b,ai as $,ao as c,a$ as g,b5 as f,bj as N,o as _,b as j,w as x,h as C,b0 as v,e as p,n as O,aW as E,aX as w,bc as S}from"./main.Bx2Os4fs.js";import{r as k}from"./el-row.Df6sStiJ.js";const B=h({tag:{type:String,default:"div"},span:{type:Number,default:24},offset:{type:Number,default:0},pull:{type:Number,default:0},push:{type:Number,default:0},xs:{type:o([Number,Object]),default:()=>u({})},sm:{type:o([Number,Object]),default:()=>u({})},md:{type:o([Number,Object]),default:()=>u({})},lg:{type:o([Number,Object]),default:()=>u({})},xl:{type:o([Number,Object]),default:()=>u({})}}),K=b({name:"ElCol"}),P=b({...K,props:B,setup(m){const t=m,{gutter:n}=$(k,{gutter:c(()=>0)}),a=g("col"),d=c(()=>{const e={};return n.value&&(e.paddingLeft=e.paddingRight=`${n.value/2}px`),e}),i=c(()=>{const e=[];return["span","offset","pull","push"].forEach(s=>{const l=t[s];f(l)&&(s==="span"?e.push(a.b(`${t[s]}`)):l>0&&e.push(a.b(`${s}-${t[s]}`)))}),["xs","sm","md","lg","xl"].forEach(s=>{f(t[s])?e.push(a.b(`${s}-${t[s]}`)):N(t[s])&&Object.entries(t[s]).forEach(([l,r])=>{e.push(l!=="span"?a.b(`${s}-${l}-${r}`):a.b(`${s}-${r}`))})}),n.value&&e.push(a.is("guttered")),[a.b(),e]});return(e,y)=>(_(),j(E(e.tag),{class:v(p(i)),style:O(p(d))},{default:x(()=>[C(e.$slots,"default")]),_:3},8,["class","style"]))}});var T=w(P,[["__file","col.vue"]]);const R=S(T);export{R as E};