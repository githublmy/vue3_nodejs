import{ai as be,aq as i,be as Q,bf as tl,b5 as j,aL as G,aR as Ve,b4 as ge,d as se,aX as ne,cj as nl,e as Ce,ad as he,bx as sl,at as Xl,aB as H,ak as te,bA as Te,o as f,c as C,h as R,ae as k,af as L,aI as u,a_ as B,r as V,as as Ee,bs as U,i as $,n as ve,bh as Jl,bl as Yl,bi as Zl,bj as xl,bk as _l,bm as F,bo as et,bp as lt,bq as tt,b0 as nt,bd as st,a$ as ot,br as at,bt as le,ck as we,bu as z,bg as it,cl as ut,bv as ol,b2 as rt,aV as dt,b9 as ct,aU as fe,b8 as pt,b6 as Ze,b7 as ft,bn as vt,ba as bt,bb as mt,bc as gt,E as ht,c1 as yt,aP as St,aA as Ot,bw as Ct,by as al,ah as A,aj as wt,g as K,w as M,F as xe,f as _e,al as el,b as W,ag as ee,bz as It,aF as Ie,cm as Vt,cn as Tt,b_ as Et,cc as il}from"./main.D4uViPbW.js";import{e as $t,u as kt,f as Rt,t as Mt,E as Dt}from"./el-tag.DLxNf354.js";import{i as me}from"./isEqual.Bza_6Eof.js";import{d as Bt}from"./debounce.DTWgmgM_.js";const ul=Symbol("ElSelectGroup"),ye=Symbol("ElSelect");function Lt(e,s){const a=be(ye),w=be(ul,{disabled:!1}),m=i(()=>a.props.multiple?v(a.props.modelValue,e.value):v([a.props.modelValue],e.value)),I=i(()=>{if(a.props.multiple){const r=a.props.modelValue||[];return!m.value&&r.length>=a.props.multipleLimit&&a.props.multipleLimit>0}else return!1}),t=i(()=>e.label||(Q(e.value)?"":e.value)),h=i(()=>e.value||e.label||""),c=i(()=>e.disabled||s.groupDisabled||I.value),b=Ve(),v=(r=[],p)=>{if(Q(e.value)){const o=a.props.valueKey;return r&&r.some(T=>tl(j(T,o))===j(p,o))}else return r&&r.includes(p)},y=()=>{!e.disabled&&!w.disabled&&(a.states.hoveringIndex=a.optionsArray.indexOf(b.proxy))},S=r=>{const p=new RegExp($t(r),"i");s.visible=p.test(t.value)||e.created};return G(()=>t.value,()=>{!e.created&&!a.props.remote&&a.setSelected()}),G(()=>e.value,(r,p)=>{const{remote:o,valueKey:T}=a.props;if(me(r,p)||(a.onOptionDestroy(p,b.proxy),a.onOptionCreate(b.proxy)),!e.created&&!o){if(T&&Q(r)&&Q(p)&&r[T]===p[T])return;a.setSelected()}}),G(()=>w.disabled,()=>{s.groupDisabled=w.disabled},{immediate:!0}),{select:a,currentLabel:t,currentValue:h,itemSelected:m,isDisabled:c,hoverItem:y,updateOption:S}}const Ft=se({name:"ElOption",componentName:"ElOption",props:{value:{required:!0,type:[String,Number,Boolean,Object]},label:[String,Number],created:Boolean,disabled:Boolean},setup(e){const s=ne("select"),a=nl(),w=i(()=>[s.be("dropdown","item"),s.is("disabled",Ce(h)),s.is("selected",Ce(t)),s.is("hovering",Ce(S))]),m=he({index:-1,groupDisabled:!1,visible:!0,hover:!1}),{currentLabel:I,itemSelected:t,isDisabled:h,select:c,hoverItem:b,updateOption:v}=Lt(e,m),{visible:y,hover:S}=sl(m),r=Ve().proxy;c.onOptionCreate(r),Xl(()=>{const o=r.value,{selected:T}=c.states,oe=(c.props.multiple?T:[T]).some(ae=>ae.value===r.value);H(()=>{c.states.cachedOptions.get(o)===r&&!oe&&c.states.cachedOptions.delete(o)}),c.onOptionDestroy(o,r)});function p(){e.disabled!==!0&&m.groupDisabled!==!0&&c.handleOptionSelect(r)}return{ns:s,id:a,containerKls:w,currentLabel:I,itemSelected:t,isDisabled:h,select:c,hoverItem:b,updateOption:v,visible:y,hover:S,selectOptionClick:p,states:m}}}),Nt=["id","aria-disabled","aria-selected"];function Wt(e,s,a,w,m,I){return te((f(),C("li",{id:e.id,class:u(e.containerKls),role:"option","aria-disabled":e.isDisabled||void 0,"aria-selected":e.itemSelected,onMouseenter:s[0]||(s[0]=(...t)=>e.hoverItem&&e.hoverItem(...t)),onClick:s[1]||(s[1]=B((...t)=>e.selectOptionClick&&e.selectOptionClick(...t),["stop"]))},[R(e.$slots,"default",{},()=>[k("span",null,L(e.currentLabel),1)])],42,Nt)),[[Te,e.visible]])}var $e=ge(Ft,[["render",Wt],["__file","option.vue"]]);const zt=se({name:"ElSelectDropdown",componentName:"ElSelectDropdown",setup(){const e=be(ye),s=ne("select"),a=i(()=>e.props.popperClass),w=i(()=>e.props.multiple),m=i(()=>e.props.fitInputWidth),I=V("");function t(){var h;I.value=`${(h=e.selectRef)==null?void 0:h.offsetWidth}px`}return Ee(()=>{t(),U(e.selectRef,t)}),{ns:s,minWidth:I,popperClass:a,isMultiple:w,isFitInputWidth:m}}});function Pt(e,s,a,w,m,I){return f(),C("div",{class:u([e.ns.b("dropdown"),e.ns.is("multiple",e.isMultiple),e.popperClass]),style:ve({[e.isFitInputWidth?"width":"minWidth"]:e.minWidth})},[e.$slots.header?(f(),C("div",{key:0,class:u(e.ns.be("dropdown","header"))},[R(e.$slots,"header")],2)):$("v-if",!0),R(e.$slots,"default"),e.$slots.footer?(f(),C("div",{key:1,class:u(e.ns.be("dropdown","footer"))},[R(e.$slots,"footer")],2)):$("v-if",!0)],6)}var At=ge(zt,[["render",Pt],["__file","select-dropdown.vue"]]);const Kt=11,Ht=(e,s)=>{const{t:a}=Jl(),w=nl(),m=ne("select"),I=ne("input"),t=he({inputValue:"",options:new Map,cachedOptions:new Map,disabledOptions:new Map,optionValues:[],selected:e.multiple?[]:{},selectionWidth:0,calculatorWidth:0,collapseItemWidth:0,selectedLabel:"",hoveringIndex:-1,previousQuery:null,inputHovering:!1,menuVisibleOnFocus:!1,isBeforeHide:!1}),h=V(null),c=V(null),b=V(null),v=V(null),y=V(null),S=V(null),r=V(null),p=V(null),o=V(null),T=V(null),X=V(null),oe=V(null),{wrapperRef:ae,isFocused:ke,handleFocus:dl,handleBlur:Re}=Yl(y,{afterFocus(){e.automaticDropdown&&!O.value&&(O.value=!0,t.menuVisibleOnFocus=!0)},beforeBlur(l){var n,d;return((n=b.value)==null?void 0:n.isFocusInsideContent(l))||((d=v.value)==null?void 0:d.isFocusInsideContent(l))},afterBlur(){O.value=!1,t.menuVisibleOnFocus=!1}}),O=V(!1),J=V(),{form:Me,formItem:Y}=Zl(),{inputId:cl}=xl(e,{formItemContext:Y}),{valueOnClear:pl,isEmptyValue:fl}=_l(e),ie=i(()=>e.disabled||(Me==null?void 0:Me.disabled)),Se=i(()=>e.multiple?F(e.modelValue)&&e.modelValue.length>0:!fl(e.modelValue)),vl=i(()=>e.clearable&&!ie.value&&t.inputHovering&&Se.value),De=i(()=>e.remote&&e.filterable&&!e.remoteShowSuffix?"":e.suffixIcon),bl=i(()=>m.is("reverse",De.value&&O.value)),Be=i(()=>(Y==null?void 0:Y.validateState)||""),ml=i(()=>et[Be.value]),gl=i(()=>e.remote?300:0),Le=i(()=>e.loading?e.loadingText||a("el.select.loading"):e.remote&&!t.inputValue&&t.options.size===0?!1:e.filterable&&t.inputValue&&t.options.size>0&&Z.value===0?e.noMatchText||a("el.select.noMatch"):t.options.size===0?e.noDataText||a("el.select.noData"):null),Z=i(()=>E.value.filter(l=>l.visible).length),E=i(()=>{const l=Array.from(t.options.values()),n=[];return t.optionValues.forEach(d=>{const g=l.findIndex(N=>N.value===d);g>-1&&n.push(l[g])}),n.length>=l.length?n:l}),hl=i(()=>Array.from(t.cachedOptions.values())),yl=i(()=>{const l=E.value.filter(n=>!n.created).some(n=>n.currentLabel===t.inputValue);return e.filterable&&e.allowCreate&&t.inputValue!==""&&!l}),Fe=()=>{e.filterable&&le(e.filterMethod)||e.filterable&&e.remote&&le(e.remoteMethod)||E.value.forEach(l=>{var n;(n=l.updateOption)==null||n.call(l,t.inputValue)})},Ne=lt(),Sl=i(()=>["small"].includes(Ne.value)?"small":"default"),Ol=i({get(){return O.value&&Le.value!==!1},set(l){O.value=l}}),Cl=i(()=>F(e.modelValue)?e.modelValue.length===0&&!t.inputValue:e.filterable?!t.inputValue:!0),wl=i(()=>{var l;const n=(l=e.placeholder)!=null?l:a("el.select.placeholder");return e.multiple||!Se.value?n:t.selectedLabel});G(()=>e.modelValue,(l,n)=>{e.multiple&&e.filterable&&!e.reserveKeyword&&(t.inputValue="",ue("")),re(),!me(l,n)&&e.validateEvent&&(Y==null||Y.validate("change").catch(d=>tt()))},{flush:"post",deep:!0}),G(()=>O.value,l=>{l?ue(t.inputValue):(t.inputValue="",t.previousQuery=null,t.isBeforeHide=!0),s("visible-change",l)}),G(()=>t.options.entries(),()=>{var l;if(!nt)return;const n=((l=h.value)==null?void 0:l.querySelectorAll("input"))||[];(!e.filterable&&!e.defaultFirstOption&&!st(e.modelValue)||!Array.from(n).includes(document.activeElement))&&re(),e.defaultFirstOption&&(e.filterable||e.remote)&&Z.value&&We()},{flush:"post"}),G(()=>t.hoveringIndex,l=>{ot(l)&&l>-1?J.value=E.value[l]||{}:J.value={},E.value.forEach(n=>{n.hover=J.value===n})}),at(()=>{t.isBeforeHide||Fe()});const ue=l=>{t.previousQuery!==l&&(t.previousQuery=l,e.filterable&&le(e.filterMethod)?e.filterMethod(l):e.filterable&&e.remote&&le(e.remoteMethod)&&e.remoteMethod(l),e.defaultFirstOption&&(e.filterable||e.remote)&&Z.value?H(We):H(Il))},We=()=>{const l=E.value.filter(g=>g.visible&&!g.disabled&&!g.states.groupDisabled),n=l.find(g=>g.created),d=l[0];t.hoveringIndex=qe(E.value,n||d)},re=()=>{if(e.multiple)t.selectedLabel="";else{const n=ze(e.modelValue);t.selectedLabel=n.currentLabel,t.selected=n;return}const l=[];F(e.modelValue)&&e.modelValue.forEach(n=>{l.push(ze(n))}),t.selected=l},ze=l=>{let n;const d=we(l).toLowerCase()==="object",g=we(l).toLowerCase()==="null",N=we(l).toLowerCase()==="undefined";for(let P=t.cachedOptions.size-1;P>=0;P--){const D=hl.value[P];if(d?j(D.value,e.valueKey)===j(l,e.valueKey):D.value===l){n={value:l,currentLabel:D.currentLabel,get isDisabled(){return D.isDisabled}};break}}if(n)return n;const q=d?l.label:!g&&!N?l:"";return{value:l,currentLabel:q}},Il=()=>{e.multiple?t.hoveringIndex=E.value.findIndex(l=>t.selected.some(n=>_(n)===_(l))):t.hoveringIndex=E.value.findIndex(l=>_(l)===_(t.selected))},Vl=()=>{t.selectionWidth=c.value.getBoundingClientRect().width},Pe=()=>{t.calculatorWidth=S.value.getBoundingClientRect().width},Tl=()=>{t.collapseItemWidth=X.value.getBoundingClientRect().width},Oe=()=>{var l,n;(n=(l=b.value)==null?void 0:l.updatePopper)==null||n.call(l)},Ae=()=>{var l,n;(n=(l=v.value)==null?void 0:l.updatePopper)==null||n.call(l)},Ke=()=>{t.inputValue.length>0&&!O.value&&(O.value=!0),ue(t.inputValue)},He=l=>{if(t.inputValue=l.target.value,e.remote)Ue();else return Ke()},Ue=Bt(()=>{Ke()},gl.value),x=l=>{me(e.modelValue,l)||s(ol,l)},El=l=>Rt(l,n=>!t.disabledOptions.has(n)),$l=l=>{if(e.multiple&&l.code!==it.delete&&l.target.value.length<=0){const n=e.modelValue.slice(),d=El(n);if(d<0)return;const g=n[d];n.splice(d,1),s(z,n),x(n),s("remove-tag",g)}},kl=(l,n)=>{const d=t.selected.indexOf(n);if(d>-1&&!ie.value){const g=e.modelValue.slice();g.splice(d,1),s(z,g),x(g),s("remove-tag",n.value)}l.stopPropagation(),ce()},je=l=>{l.stopPropagation();const n=e.multiple?[]:pl.value;if(e.multiple)for(const d of t.selected)d.isDisabled&&n.push(d.value);s(z,n),x(n),t.hoveringIndex=-1,O.value=!1,s("clear"),ce()},Ge=l=>{if(e.multiple){const n=(e.modelValue||[]).slice(),d=qe(n,l.value);d>-1?n.splice(d,1):(e.multipleLimit<=0||n.length<e.multipleLimit)&&n.push(l.value),s(z,n),x(n),l.created&&ue(""),e.filterable&&!e.reserveKeyword&&(t.inputValue="")}else s(z,l.value),x(l.value),O.value=!1;ce(),!O.value&&H(()=>{de(l)})},qe=(l=[],n)=>{if(!Q(n))return l.indexOf(n);const d=e.valueKey;let g=-1;return l.some((N,q)=>tl(j(N,d))===j(n,d)?(g=q,!0):!1),g},de=l=>{var n,d,g,N,q;const pe=F(l)?l[0]:l;let P=null;if(pe!=null&&pe.value){const D=E.value.filter(Ye=>Ye.value===pe.value);D.length>0&&(P=D[0].$el)}if(b.value&&P){const D=(N=(g=(d=(n=b.value)==null?void 0:n.popperRef)==null?void 0:d.contentRef)==null?void 0:g.querySelector)==null?void 0:N.call(g,`.${m.be("dropdown","wrap")}`);D&&ut(D,P)}(q=oe.value)==null||q.handleScroll()},Rl=l=>{t.options.set(l.value,l),t.cachedOptions.set(l.value,l),l.disabled&&t.disabledOptions.set(l.value,l)},Ml=(l,n)=>{t.options.get(l)===n&&t.options.delete(l)},{handleCompositionStart:Dl,handleCompositionUpdate:Bl,handleCompositionEnd:Ll}=kt(l=>He(l)),Fl=i(()=>{var l,n;return(n=(l=b.value)==null?void 0:l.popperRef)==null?void 0:n.contentRef}),Nl=()=>{t.isBeforeHide=!1,H(()=>de(t.selected))},ce=()=>{var l;(l=y.value)==null||l.focus()},Wl=()=>{Qe()},zl=l=>{je(l)},Qe=l=>{if(O.value=!1,ke.value){const n=new FocusEvent("focus",l);H(()=>Re(n))}},Pl=()=>{t.inputValue.length>0?t.inputValue="":O.value=!1},Xe=()=>{ie.value||(t.menuVisibleOnFocus?t.menuVisibleOnFocus=!1:O.value=!O.value)},Al=()=>{O.value?E.value[t.hoveringIndex]&&Ge(E.value[t.hoveringIndex]):Xe()},_=l=>Q(l.value)?j(l.value,e.valueKey):l.value,Kl=i(()=>E.value.filter(l=>l.visible).every(l=>l.disabled)),Hl=i(()=>e.multiple?e.collapseTags?t.selected.slice(0,e.maxCollapseTags):t.selected:[]),Ul=i(()=>e.multiple?e.collapseTags?t.selected.slice(e.maxCollapseTags):[]:[]),Je=l=>{if(!O.value){O.value=!0;return}if(!(t.options.size===0||Z.value===0)&&!Kl.value){l==="next"?(t.hoveringIndex++,t.hoveringIndex===t.options.size&&(t.hoveringIndex=0)):l==="prev"&&(t.hoveringIndex--,t.hoveringIndex<0&&(t.hoveringIndex=t.options.size-1));const n=E.value[t.hoveringIndex];(n.disabled===!0||n.states.groupDisabled===!0||!n.visible)&&Je(l),H(()=>de(J.value))}},jl=()=>{if(!c.value)return 0;const l=window.getComputedStyle(c.value);return Number.parseFloat(l.gap||"6px")},Gl=i(()=>{const l=jl();return{maxWidth:`${X.value&&e.maxCollapseTags===1?t.selectionWidth-t.collapseItemWidth-l:t.selectionWidth}px`}}),ql=i(()=>({maxWidth:`${t.selectionWidth}px`})),Ql=i(()=>({width:`${Math.max(t.calculatorWidth,Kt)}px`}));return e.multiple&&!F(e.modelValue)&&s(z,[]),!e.multiple&&F(e.modelValue)&&s(z,""),U(c,Vl),U(S,Pe),U(o,Oe),U(ae,Oe),U(T,Ae),U(X,Tl),Ee(()=>{re()}),{inputId:cl,contentId:w,nsSelect:m,nsInput:I,states:t,isFocused:ke,expanded:O,optionsArray:E,hoverOption:J,selectSize:Ne,filteredOptionsCount:Z,resetCalculatorWidth:Pe,updateTooltip:Oe,updateTagTooltip:Ae,debouncedOnInputChange:Ue,onInput:He,deletePrevTag:$l,deleteTag:kl,deleteSelected:je,handleOptionSelect:Ge,scrollToOption:de,hasModelValue:Se,shouldShowPlaceholder:Cl,currentPlaceholder:wl,showClose:vl,iconComponent:De,iconReverse:bl,validateState:Be,validateIcon:ml,showNewOption:yl,updateOptions:Fe,collapseTagSize:Sl,setSelected:re,selectDisabled:ie,emptyText:Le,handleCompositionStart:Dl,handleCompositionUpdate:Bl,handleCompositionEnd:Ll,onOptionCreate:Rl,onOptionDestroy:Ml,handleMenuEnter:Nl,handleFocus:dl,focus:ce,blur:Wl,handleBlur:Re,handleClearClick:zl,handleClickOutside:Qe,handleEsc:Pl,toggleMenu:Xe,selectOption:Al,getValueKey:_,navigateOptions:Je,dropdownMenuVisible:Ol,showTagList:Hl,collapseTagList:Ul,tagStyle:Gl,collapseTagStyle:ql,inputStyle:Ql,popperRef:Fl,inputRef:y,tooltipRef:b,tagTooltipRef:v,calculatorRef:S,prefixRef:r,suffixRef:p,selectRef:h,wrapperRef:ae,selectionRef:c,scrollbarRef:oe,menuRef:o,tagMenuRef:T,collapseItemRef:X}};var Ut=se({name:"ElOptions",setup(e,{slots:s}){const a=be(ye);let w=[];return()=>{var m,I;const t=(m=s.default)==null?void 0:m.call(s),h=[];function c(b){F(b)&&b.forEach(v=>{var y,S,r,p;const o=(y=(v==null?void 0:v.type)||{})==null?void 0:y.name;o==="ElOptionGroup"?c(!rt(v.children)&&!F(v.children)&&le((S=v.children)==null?void 0:S.default)?(r=v.children)==null?void 0:r.default():v.children):o==="ElOption"?h.push((p=v.props)==null?void 0:p.value):F(v.children)&&c(v.children)})}return t.length&&c((I=t[0])==null?void 0:I.children),me(h,w)||(w=h,a&&(a.states.optionValues=h)),t}}});const jt=dt({name:String,id:String,modelValue:{type:[Array,String,Number,Boolean,Object],default:void 0},autocomplete:{type:String,default:"off"},automaticDropdown:Boolean,size:ct,effect:{type:fe(String),default:"light"},disabled:Boolean,clearable:Boolean,filterable:Boolean,allowCreate:Boolean,loading:Boolean,popperClass:{type:String,default:""},popperOptions:{type:fe(Object),default:()=>({})},remote:Boolean,loadingText:String,noMatchText:String,noDataText:String,remoteMethod:Function,filterMethod:Function,multiple:Boolean,multipleLimit:{type:Number,default:0},placeholder:{type:String},defaultFirstOption:Boolean,reserveKeyword:{type:Boolean,default:!0},valueKey:{type:String,default:"value"},collapseTags:Boolean,collapseTagsTooltip:Boolean,maxCollapseTags:{type:Number,default:1},teleported:pt.teleported,persistent:{type:Boolean,default:!0},clearIcon:{type:Ze,default:ft},fitInputWidth:Boolean,suffixIcon:{type:Ze,default:vt},tagType:{...Mt.type,default:"info"},validateEvent:{type:Boolean,default:!0},remoteShowSuffix:Boolean,placement:{type:fe(String),values:bt,default:"bottom-start"},fallbackPlacements:{type:fe(Array),default:["bottom-start","top-start","right","left"]},...mt,...gt(["ariaLabel"])}),ll="ElSelect",Gt=se({name:ll,componentName:ll,components:{ElInput:ht,ElSelectMenu:At,ElOption:$e,ElOptions:Ut,ElTag:Dt,ElScrollbar:yt,ElTooltip:St,ElIcon:Ot},directives:{ClickOutside:Ct},props:jt,emits:[z,ol,"remove-tag","clear","visible-change","focus","blur"],setup(e,{emit:s}){const a=Ht(e,s);return al(ye,he({props:e,states:a.states,optionsArray:a.optionsArray,handleOptionSelect:a.handleOptionSelect,onOptionCreate:a.onOptionCreate,onOptionDestroy:a.onOptionDestroy,selectRef:a.selectRef,setSelected:a.setSelected})),{...a}}}),qt=["id","disabled","autocomplete","readonly","aria-activedescendant","aria-controls","aria-expanded","aria-label"],Qt=["textContent"],Xt={key:1};function Jt(e,s,a,w,m,I){const t=A("el-tag"),h=A("el-tooltip"),c=A("el-icon"),b=A("el-option"),v=A("el-options"),y=A("el-scrollbar"),S=A("el-select-menu"),r=wt("click-outside");return te((f(),C("div",{ref:"selectRef",class:u([e.nsSelect.b(),e.nsSelect.m(e.selectSize)]),onMouseenter:s[16]||(s[16]=p=>e.states.inputHovering=!0),onMouseleave:s[17]||(s[17]=p=>e.states.inputHovering=!1),onClick:s[18]||(s[18]=B((...p)=>e.toggleMenu&&e.toggleMenu(...p),["prevent","stop"]))},[K(h,{ref:"tooltipRef",visible:e.dropdownMenuVisible,placement:e.placement,teleported:e.teleported,"popper-class":[e.nsSelect.e("popper"),e.popperClass],"popper-options":e.popperOptions,"fallback-placements":e.fallbackPlacements,effect:e.effect,pure:"",trigger:"click",transition:`${e.nsSelect.namespace.value}-zoom-in-top`,"stop-popper-mouse-event":!1,"gpu-acceleration":!1,persistent:e.persistent,onBeforeShow:e.handleMenuEnter,onHide:s[15]||(s[15]=p=>e.states.isBeforeHide=!1)},{default:M(()=>{var p;return[k("div",{ref:"wrapperRef",class:u([e.nsSelect.e("wrapper"),e.nsSelect.is("focused",e.isFocused),e.nsSelect.is("hovering",e.states.inputHovering),e.nsSelect.is("filterable",e.filterable),e.nsSelect.is("disabled",e.selectDisabled)])},[e.$slots.prefix?(f(),C("div",{key:0,ref:"prefixRef",class:u(e.nsSelect.e("prefix"))},[R(e.$slots,"prefix")],2)):$("v-if",!0),k("div",{ref:"selectionRef",class:u([e.nsSelect.e("selection"),e.nsSelect.is("near",e.multiple&&!e.$slots.prefix&&!!e.states.selected.length)])},[e.multiple?R(e.$slots,"tag",{key:0},()=>[(f(!0),C(xe,null,_e(e.showTagList,o=>(f(),C("div",{key:e.getValueKey(o),class:u(e.nsSelect.e("selected-item"))},[K(t,{closable:!e.selectDisabled&&!o.isDisabled,size:e.collapseTagSize,type:e.tagType,"disable-transitions":"",style:ve(e.tagStyle),onClose:T=>e.deleteTag(T,o)},{default:M(()=>[k("span",{class:u(e.nsSelect.e("tags-text"))},[R(e.$slots,"label",{label:o.currentLabel,value:o.value},()=>[el(L(o.currentLabel),1)])],2)]),_:2},1032,["closable","size","type","style","onClose"])],2))),128)),e.collapseTags&&e.states.selected.length>e.maxCollapseTags?(f(),W(h,{key:0,ref:"tagTooltipRef",disabled:e.dropdownMenuVisible||!e.collapseTagsTooltip,"fallback-placements":["bottom","top","right","left"],effect:e.effect,placement:"bottom",teleported:e.teleported},{default:M(()=>[k("div",{ref:"collapseItemRef",class:u(e.nsSelect.e("selected-item"))},[K(t,{closable:!1,size:e.collapseTagSize,type:e.tagType,"disable-transitions":"",style:ve(e.collapseTagStyle)},{default:M(()=>[k("span",{class:u(e.nsSelect.e("tags-text"))}," + "+L(e.states.selected.length-e.maxCollapseTags),3)]),_:1},8,["size","type","style"])],2)]),content:M(()=>[k("div",{ref:"tagMenuRef",class:u(e.nsSelect.e("selection"))},[(f(!0),C(xe,null,_e(e.collapseTagList,o=>(f(),C("div",{key:e.getValueKey(o),class:u(e.nsSelect.e("selected-item"))},[K(t,{class:"in-tooltip",closable:!e.selectDisabled&&!o.isDisabled,size:e.collapseTagSize,type:e.tagType,"disable-transitions":"",onClose:T=>e.deleteTag(T,o)},{default:M(()=>[k("span",{class:u(e.nsSelect.e("tags-text"))},[R(e.$slots,"label",{label:o.currentLabel,value:o.value},()=>[el(L(o.currentLabel),1)])],2)]),_:2},1032,["closable","size","type","onClose"])],2))),128))],2)]),_:3},8,["disabled","effect","teleported"])):$("v-if",!0)]):$("v-if",!0),e.selectDisabled?$("v-if",!0):(f(),C("div",{key:1,class:u([e.nsSelect.e("selected-item"),e.nsSelect.e("input-wrapper"),e.nsSelect.is("hidden",!e.filterable)])},[te(k("input",{id:e.inputId,ref:"inputRef","onUpdate:modelValue":s[0]||(s[0]=o=>e.states.inputValue=o),type:"text",class:u([e.nsSelect.e("input"),e.nsSelect.is(e.selectSize)]),disabled:e.selectDisabled,autocomplete:e.autocomplete,style:ve(e.inputStyle),role:"combobox",readonly:!e.filterable,spellcheck:"false","aria-activedescendant":((p=e.hoverOption)==null?void 0:p.id)||"","aria-controls":e.contentId,"aria-expanded":e.dropdownMenuVisible,"aria-label":e.ariaLabel,"aria-autocomplete":"none","aria-haspopup":"listbox",onFocus:s[1]||(s[1]=(...o)=>e.handleFocus&&e.handleFocus(...o)),onBlur:s[2]||(s[2]=(...o)=>e.handleBlur&&e.handleBlur(...o)),onKeydown:[s[3]||(s[3]=ee(B(o=>e.navigateOptions("next"),["stop","prevent"]),["down"])),s[4]||(s[4]=ee(B(o=>e.navigateOptions("prev"),["stop","prevent"]),["up"])),s[5]||(s[5]=ee(B((...o)=>e.handleEsc&&e.handleEsc(...o),["stop","prevent"]),["esc"])),s[6]||(s[6]=ee(B((...o)=>e.selectOption&&e.selectOption(...o),["stop","prevent"]),["enter"])),s[7]||(s[7]=ee(B((...o)=>e.deletePrevTag&&e.deletePrevTag(...o),["stop"]),["delete"]))],onCompositionstart:s[8]||(s[8]=(...o)=>e.handleCompositionStart&&e.handleCompositionStart(...o)),onCompositionupdate:s[9]||(s[9]=(...o)=>e.handleCompositionUpdate&&e.handleCompositionUpdate(...o)),onCompositionend:s[10]||(s[10]=(...o)=>e.handleCompositionEnd&&e.handleCompositionEnd(...o)),onInput:s[11]||(s[11]=(...o)=>e.onInput&&e.onInput(...o)),onClick:s[12]||(s[12]=B((...o)=>e.toggleMenu&&e.toggleMenu(...o),["stop"]))},null,46,qt),[[It,e.states.inputValue]]),e.filterable?(f(),C("span",{key:0,ref:"calculatorRef","aria-hidden":"true",class:u(e.nsSelect.e("input-calculator")),textContent:L(e.states.inputValue)},null,10,Qt)):$("v-if",!0)],2)),e.shouldShowPlaceholder?(f(),C("div",{key:2,class:u([e.nsSelect.e("selected-item"),e.nsSelect.e("placeholder"),e.nsSelect.is("transparent",!e.hasModelValue||e.expanded&&!e.states.inputValue)])},[e.hasModelValue?R(e.$slots,"label",{key:0,label:e.currentPlaceholder,value:e.modelValue},()=>[k("span",null,L(e.currentPlaceholder),1)]):(f(),C("span",Xt,L(e.currentPlaceholder),1))],2)):$("v-if",!0)],2),k("div",{ref:"suffixRef",class:u(e.nsSelect.e("suffix"))},[e.iconComponent&&!e.showClose?(f(),W(c,{key:0,class:u([e.nsSelect.e("caret"),e.nsSelect.e("icon"),e.iconReverse])},{default:M(()=>[(f(),W(Ie(e.iconComponent)))]),_:1},8,["class"])):$("v-if",!0),e.showClose&&e.clearIcon?(f(),W(c,{key:1,class:u([e.nsSelect.e("caret"),e.nsSelect.e("icon")]),onClick:e.handleClearClick},{default:M(()=>[(f(),W(Ie(e.clearIcon)))]),_:1},8,["class","onClick"])):$("v-if",!0),e.validateState&&e.validateIcon?(f(),W(c,{key:2,class:u([e.nsInput.e("icon"),e.nsInput.e("validateIcon")])},{default:M(()=>[(f(),W(Ie(e.validateIcon)))]),_:1},8,["class"])):$("v-if",!0)],2)],2)]}),content:M(()=>[K(S,{ref:"menuRef"},{default:M(()=>[e.$slots.header?(f(),C("div",{key:0,class:u(e.nsSelect.be("dropdown","header")),onClick:s[13]||(s[13]=B(()=>{},["stop"]))},[R(e.$slots,"header")],2)):$("v-if",!0),te(K(y,{id:e.contentId,ref:"scrollbarRef",tag:"ul","wrap-class":e.nsSelect.be("dropdown","wrap"),"view-class":e.nsSelect.be("dropdown","list"),class:u([e.nsSelect.is("empty",e.filteredOptionsCount===0)]),role:"listbox","aria-label":e.ariaLabel,"aria-orientation":"vertical"},{default:M(()=>[e.showNewOption?(f(),W(b,{key:0,value:e.states.inputValue,created:!0},null,8,["value"])):$("v-if",!0),K(v,null,{default:M(()=>[R(e.$slots,"default")]),_:3})]),_:3},8,["id","wrap-class","view-class","class","aria-label"]),[[Te,e.states.options.size>0&&!e.loading]]),e.$slots.loading&&e.loading?(f(),C("div",{key:1,class:u(e.nsSelect.be("dropdown","loading"))},[R(e.$slots,"loading")],2)):e.loading||e.filteredOptionsCount===0?(f(),C("div",{key:2,class:u(e.nsSelect.be("dropdown","empty"))},[R(e.$slots,"empty",{},()=>[k("span",null,L(e.emptyText),1)])],2)):$("v-if",!0),e.$slots.footer?(f(),C("div",{key:3,class:u(e.nsSelect.be("dropdown","footer")),onClick:s[14]||(s[14]=B(()=>{},["stop"]))},[R(e.$slots,"footer")],2)):$("v-if",!0)]),_:3},512)]),_:3},8,["visible","placement","teleported","popper-class","popper-options","fallback-placements","effect","transition","persistent","onBeforeShow"])],34)),[[r,e.handleClickOutside,e.popperRef]])}var Yt=ge(Gt,[["render",Jt],["__file","select.vue"]]);const Zt=se({name:"ElOptionGroup",componentName:"ElOptionGroup",props:{label:String,disabled:Boolean},setup(e){const s=ne("select"),a=V(null),w=Ve(),m=V([]);al(ul,he({...sl(e)}));const I=i(()=>m.value.some(b=>b.visible===!0)),t=b=>{var v,y;return((v=b.type)==null?void 0:v.name)==="ElOption"&&!!((y=b.component)!=null&&y.proxy)},h=b=>{const v=Tt(b),y=[];return v.forEach(S=>{var r,p;t(S)?y.push(S.component.proxy):(r=S.children)!=null&&r.length?y.push(...h(S.children)):(p=S.component)!=null&&p.subTree&&y.push(...h(S.component.subTree))}),y},c=()=>{m.value=h(w.subTree)};return Ee(()=>{c()}),Vt(a,c,{attributes:!0,subtree:!0,childList:!0}),{groupRef:a,visible:I,ns:s}}});function xt(e,s,a,w,m,I){return te((f(),C("ul",{ref:"groupRef",class:u(e.ns.be("group","wrap"))},[k("li",{class:u(e.ns.be("group","title"))},L(e.label),3),k("li",null,[k("ul",{class:u(e.ns.b("group"))},[R(e.$slots,"default")],2)])],2)),[[Te,e.visible]])}var rl=ge(Zt,[["render",xt],["__file","option-group.vue"]]);const nn=Et(Yt,{Option:$e,OptionGroup:rl}),sn=il($e);il(rl);export{sn as E,nn as a};