import{a as v,m as y,ao as u,e as F,h as g,f as t,w as o,v as i,at as k,aO as L,aj as b,ah as x}from"./vendor-CKOI4o9H.js";const C={style:{padding:"20px"}},E=v({__name:"test",setup(w){const a=y(),r=u({name:"Hello",region:"",count:"",date1:"",date2:"",delivery:!1,type:[],resource:"",desc:"",fileList:[]}),f=u({fileList:[{required:!0,message:"上传文件",trigger:"change"}]}),m=async l=>{l&&await l.validate((e,s)=>{e||console.log("error submit!",s)})},c=l=>{l&&l.resetFields()};return(l,e)=>{const s=k,p=L,d=b,_=x;return F(),g("div",C,[t(_,{ref_key:"ruleFormRef",ref:a,model:r,rules:f},{default:o(()=>[t(d,{label:"上传",prop:"fileList"},{default:o(()=>[t(p,{"file-list":r.fileList,"onUpdate:fileList":e[0]||(e[0]=n=>r.fileList=n),class:"upload-demo",action:"https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15",multiple:""},{default:o(()=>[t(s,{type:"primary"},{default:o(()=>[i("点击上传")]),_:1})]),_:1},8,["file-list"])]),_:1}),t(d,null,{default:o(()=>[t(s,{type:"primary",onClick:e[1]||(e[1]=n=>m(a.value))},{default:o(()=>[i(" 创建 ")]),_:1}),t(s,{onClick:e[2]||(e[2]=n=>c(a.value))},{default:o(()=>[i("Reset")]),_:1})]),_:1})]),_:1},8,["model","rules"])])}}});export{E as default};