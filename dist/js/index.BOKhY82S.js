import{_ as y}from"./index.CjNyjuV4.js";import{d as w,r as p,ad as f,o as x,c as z,g as e,w as n,al as S,e as t,bF as E,aA as N,am as h}from"./main.Cwkf5ojV.js";import{i as k}from"./request.BD1ptvdN.js";import"./el-loading.DYScC8mC.js";import"./el-tag.DGG2sz3V.js";import"./_Uint8Array.D-6K5djZ.js";import"./isEqual.DDRySnpb.js";import"./el-select.BIMgfNIj.js";import"./debounce.3uYIcujo.js";import"./el-checkbox.DkVb1x2m.js";import"./el-row.CdqFewRM.js";import"./_initCloneObject.BKsqrT_k.js";import"./raf.PxqZd-3a.js";function B(r){return k({url:"/getData",method:"post",data:r})}const C={class:"baseStyle"},J=w({__name:"index",setup(r){const l=p(!1),m=p(0),c=p([]),g=[{type:"selection",width:55,fixed:"left"},{prop:"id",label:"ID"},{prop:"operator",label:"姓名"},{prop:"status",label:"状态"},{prop:"department_name",label:"备注"},{prop:"operate_time",label:"创建时间"}],o=f({formData:{pageNum:1,pageSize:10,searchKey:"",status:""},list:[{type:"el-input",prop:"name",label:"姓名"}]}),u=async()=>{l.value=!0;const i=await B(o.formData);l.value=!1,c.value=i.data.content,m.value=i.data.total},b=f({showBorder:!1,showSearch:!0,handleEvent:u});return(i,a)=>{const _=E,d=N,D=h,v=y;return x(),z("div",C,[e(d,{size:18},{default:n(()=>[e(_,{name:"vue"})]),_:1}),e(d,{size:18},{default:n(()=>[e(_,{name:"book"})]),_:1}),e(v,{config:t(b),tableTitle:g,loading:t(l),tableData:t(c),total:t(m),page:t(o).formData.pageNum,"onUpdate:page":a[1]||(a[1]=s=>t(o).formData.pageNum=s),limit:t(o).formData.pageSize,"onUpdate:limit":a[2]||(a[2]=s=>t(o).formData.pageSize=s),onPagination:u},{toolbar:n(()=>[e(D,{type:"primary",icon:"Plus",plain:"",size:"small",onClick:a[0]||(a[0]=()=>{})},{default:n(()=>[S("新增")]),_:1})]),_:1},8,["config","loading","tableData","total","page","limit"])])}}});export{J as default};