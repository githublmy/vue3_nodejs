import{_ as L}from"./index-3q-Ysi7W.js";import{d as M,a as U,j as N,s as V,m as b,r as $,ar as j,e as u,h as x,f as s,w as n,u as d,as as h,b as I,v as g,i as v,y as O,aO as P,at as q}from"./vendor-CKOI4o9H.js";import{_ as A}from"../js/main.CTPREjN3.js";const G=M("fileList",{state:()=>({fileList:[]})}),H=v("div",{class:"el-upload__text"},[g("拖拽文件或者"),v("em",null,"点击上传")],-1),J=U({__name:"index",setup(C){const f=N("elMsg"),c="http://localhost:3000/files/upload",{fileList:i}=V(G()),k=b([{prop:"name",label:"文件名称"},{prop:"size",label:"文件大小"},{prop:"percentage",label:"上传进度(%)"},{prop:"operate",label:"操作",slot:"operate"}]),r=b(),y=(e,t)=>{r.value.handleRemove(e),i.value.splice(t,1)},E=()=>{r.value.submit()},S=(e,t)=>{e.status==="ready"&&i.value.unshift(e)},T=(e,t,o)=>{f.success("上传成功")},w=e=>{const t=e.size,o=1024*1024*5,_=Math.ceil(t/o);for(let l=0;l<_;l++){const a=l*o,p=Math.min(a+o,t);e.slice(a,p)}},z=(e,t,o)=>{},B=(e,t)=>{},D=(e,t)=>!0;return(e,t)=>{const o=$("upload-filled"),_=O,l=P,a=q,p=L,m=j("blur");return u(),x("div",null,[s(l,{ref_key:"uploadRef",ref:r,style:{width:"100%"},action:d(c),"before-upload":w,"before-remove":D,drag:"",multiple:"","auto-upload":!1,"show-file-list":!1,"on-progress":z,"on-exceed":B,"on-change":S,"on-success":T},{default:n(()=>[s(_,{class:"el-icon--upload"},{default:n(()=>[s(o)]),_:1}),H]),_:1},8,["action"]),s(p,{tableTitle:d(k),tableData:d(i)},{operate:n(({row:F,index:R})=>[h(s(a,{type:"danger",icon:"Delete",plain:"",size:"small",onClick:X=>y(F,R)},null,8,["onClick"]),[[m]])]),_:1},8,["tableTitle","tableData"]),h((u(),I(a,{type:"success",onClick:E},{default:n(()=>[g(" 开始上传 ")]),_:1})),[[m]])])}}}),K={},Q={class:"baseStyle"};function W(C,f){const c=J;return u(),x("div",Q,[s(c)])}const te=A(K,[["render",W]]);export{te as default};