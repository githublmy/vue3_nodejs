import{_ as y}from"./index-3q-Ysi7W.js";import{a as w,m as p,ao as d,e as x,h as z,f as e,w as n,v as S,u as t,y as h,at as E}from"./vendor-CKOI4o9H.js";import{a as N}from"../js/main.CTPREjN3.js";import{i as k}from"./request-IoRnclOp.js";function B(r){return k({url:"/getData",method:"post",data:r})}const C={class:"baseStyle"},U=w({__name:"index",setup(r){const l=p(!1),m=p(0),c=p([]),g=[{type:"selection",width:55,fixed:"left"},{prop:"id",label:"ID"},{prop:"operator",label:"姓名"},{prop:"status",label:"状态"},{prop:"department_name",label:"备注"},{prop:"operate_time",label:"创建时间"}],o=d({formData:{pageNum:1,pageSize:10,searchKey:"",status:""},list:[{type:"el-input",prop:"name",label:"姓名"}]}),u=async()=>{l.value=!0;const s=await B(o.formData);l.value=!1,c.value=s.data.content,m.value=s.data.total},b=d({showBorder:!1,showSearch:!0,handleEvent:u});return(s,a)=>{const _=N,f=h,D=E,v=y;return x(),z("div",C,[e(f,{size:18},{default:n(()=>[e(_,{name:"vue"})]),_:1}),e(f,{size:18},{default:n(()=>[e(_,{name:"book"})]),_:1}),e(v,{config:t(b),tableTitle:g,loading:t(l),tableData:t(c),total:t(m),page:t(o).formData.pageNum,"onUpdate:page":a[1]||(a[1]=i=>t(o).formData.pageNum=i),limit:t(o).formData.pageSize,"onUpdate:limit":a[2]||(a[2]=i=>t(o).formData.pageSize=i),onPagination:u},{toolbar:n(()=>[e(D,{type:"primary",icon:"Plus",plain:"",size:"small",onClick:a[0]||(a[0]=()=>{})},{default:n(()=>[S("新增")]),_:1})]),_:1},8,["config","loading","tableData","total","page","limit"])])}}});export{U as default};