(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[434],{8966:function(e,t,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/about/example",function(){return i(4531)}])},1831:function(e,t,i){"use strict";i.d(t,{a:function(){return j}});var n=i(5893);i(7294);var s=i(301);let u=(0,s.zo)("blockquote",{fontWeight:"300",color:"$slate11",padding:"$gr1 0"});var a=e=>{let{children:t}=e;return(0,n.jsx)(u,{children:t})},r=i(640),l=i.n(r),o=i(7087),c=i(5986);let d={plain:{color:"var(--colors-indigo12)",fontSize:.9*c.hO,fontFamily:"Menlo, monospace"},styles:[{types:["boolean","string"],style:{color:"var(--colors-indigo10)"}},{types:["operator"],style:{color:"var(--colors-indigo11)"}},{types:["punctuation"],style:{color:"var(--colors-indigo8)"}}]};var m=i(2765);let p=(0,s.zo)("div",{position:"relative",button:{position:"absolute",marginTop:"-$gr2",right:"$gr3"}}),h=(0,s.zo)("pre",{backgroundColor:"$indigo3",padding:"$gr3",borderRadius:"5px",lineHeight:"1.382em",overflowX:"scroll",overflowY:"visible",boxShadow:"inset 1px 1px 2px  ".concat(m.Eh.indigoA3),zIndex:"0"}),g=(0,s.zo)("code",{backgroundColor:"$indigo3",padding:"3px $gr1",borderRadius:"5px",fontSize:"$gr3",color:"$indigo11",boxShadow:"1px 1px 1px  ".concat(m.Eh.indigoA6)});var f=i(2190),b=i(2469),v=e=>{let{children:t,language:i}=e;return(0,n.jsx)(o.ZP,{...o.lG,theme:d,code:t,language:i,children:e=>{let{style:i,tokens:s,getLineProps:u,getTokenProps:a}=e;return(0,n.jsxs)(p,{children:[(0,n.jsxs)(f.O,{buttonSize:"tiny",buttonType:"primary","aria-label":"Copy Code",onClick:()=>{l()(t)},css:{display:"flex",alignItems:"center"},children:["Copy\xa0",(0,n.jsx)(b.TIy,{})]}),(0,n.jsx)(h,{style:i,children:s.map((e,t)=>(0,n.jsx)("div",{...u({line:e,key:t}),children:e.map((e,i)=>(0,n.jsx)("span",{...a({token:e,key:i})},t))},t))})]})}})},x=i(5857),y=i(2230);function j(e){return{h1:e=>{let{children:t}=e;return(0,n.jsx)(x.Z,{as:"h1",children:t})},h2:e=>{let{children:t}=e;return(0,n.jsx)(x.Z,{as:"h2",id:(0,y.getSlug)(t),children:t})},h3:e=>{let{children:t}=e;return(0,n.jsx)(x.Z,{as:"h3",children:t})},code:e=>{let{children:t}=e;return(0,n.jsx)(g,{children:t})},blockquote:e=>{let{children:t}=e;return(0,n.jsx)(a,{children:t})},pre:e=>{var t;let{children:i}=e,s=i.props.children,u=null===(t=i.props.className)||void 0===t?void 0:t.replace("language-","");return(0,n.jsx)(v,{language:u,children:s.trim()})},...e}}},5677:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var i in t)Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}(t,{noSSR:function(){return a},default:function(){return r}});let n=i(8754),s=(i(7294),n._(i(8976)));function u(e){return{default:(null==e?void 0:e.default)||e}}function a(e,t){return delete t.webpack,delete t.modules,e(t)}function r(e,t){let i=s.default,n={loading:e=>{let{error:t,isLoading:i,pastDelay:n}=e;return null}};e instanceof Promise?n.loader=()=>e:"function"==typeof e?n.loader=e:"object"==typeof e&&(n={...n,...e}),n={...n,...t};let r=n.loader;return(n.loadableGenerated&&(n={...n,...n.loadableGenerated},delete n.loadableGenerated),"boolean"!=typeof n.ssr||n.ssr)?i({...n,loader:()=>null!=r?r().then(u):Promise.resolve(u(()=>null))}):(delete n.webpack,delete n.modules,a(i,n))}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2254:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"LoadableContext",{enumerable:!0,get:function(){return u}});let n=i(8754),s=n._(i(7294)),u=s.default.createContext(null)},8976:function(e,t,i){"use strict";/**
@copyright (c) 2017-present James Kyle <me@thejameskyle.com>
 MIT License
 Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
 The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE
*/Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return p}});let n=i(8754),s=n._(i(7294)),u=i(2254),a=[],r=[],l=!1;function o(e){let t=e(),i={loading:!0,loaded:null,error:null};return i.promise=t.then(e=>(i.loading=!1,i.loaded=e,e)).catch(e=>{throw i.loading=!1,i.error=e,e}),i}class c{promise(){return this._res.promise}retry(){this._clearTimeouts(),this._res=this._loadFn(this._opts.loader),this._state={pastDelay:!1,timedOut:!1};let{_res:e,_opts:t}=this;e.loading&&("number"==typeof t.delay&&(0===t.delay?this._state.pastDelay=!0:this._delay=setTimeout(()=>{this._update({pastDelay:!0})},t.delay)),"number"==typeof t.timeout&&(this._timeout=setTimeout(()=>{this._update({timedOut:!0})},t.timeout))),this._res.promise.then(()=>{this._update({}),this._clearTimeouts()}).catch(e=>{this._update({}),this._clearTimeouts()}),this._update({})}_update(e){this._state={...this._state,error:this._res.error,loaded:this._res.loaded,loading:this._res.loading,...e},this._callbacks.forEach(e=>e())}_clearTimeouts(){clearTimeout(this._delay),clearTimeout(this._timeout)}getCurrentValue(){return this._state}subscribe(e){return this._callbacks.add(e),()=>{this._callbacks.delete(e)}}constructor(e,t){this._loadFn=e,this._opts=t,this._callbacks=new Set,this._delay=null,this._timeout=null,this.retry()}}function d(e){return function(e,t){let i=Object.assign({loader:null,loading:null,delay:200,timeout:null,webpack:null,modules:null},t),n=null;function a(){if(!n){let t=new c(e,i);n={getCurrentValue:t.getCurrentValue.bind(t),subscribe:t.subscribe.bind(t),retry:t.retry.bind(t),promise:t.promise.bind(t)}}return n.promise()}if(!l){let e=i.webpack?i.webpack():i.modules;e&&r.push(t=>{for(let i of e)if(t.includes(i))return a()})}function o(e,t){!function(){a();let e=s.default.useContext(u.LoadableContext);e&&Array.isArray(i.modules)&&i.modules.forEach(t=>{e(t)})}();let r=s.default.useSyncExternalStore(n.subscribe,n.getCurrentValue,n.getCurrentValue);return s.default.useImperativeHandle(t,()=>({retry:n.retry}),[]),s.default.useMemo(()=>{var t;return r.loading||r.error?s.default.createElement(i.loading,{isLoading:r.loading,pastDelay:r.pastDelay,timedOut:r.timedOut,error:r.error,retry:n.retry}):r.loaded?s.default.createElement((t=r.loaded)&&t.default?t.default:t,e):null},[e,r])}return o.preload=()=>a(),o.displayName="LoadableComponent",s.default.forwardRef(o)}(o,e)}function m(e,t){let i=[];for(;e.length;){let n=e.pop();i.push(n(t))}return Promise.all(i).then(()=>{if(e.length)return m(e,t)})}d.preloadAll=()=>new Promise((e,t)=>{m(a).then(e,t)}),d.preloadReady=e=>(void 0===e&&(e=[]),new Promise(t=>{let i=()=>(l=!0,t());m(r,e).then(i,i)})),window.__NEXT_PRELOADREADY=d.preloadReady;let p=d},3701:function(e,t,i){"use strict";var n=i(5893),s=i(7937),u=i(7294),a=i(5045),r=i(2213),l=i(6671),o=i(2230),c=i(2404);t.Z=e=>{let{content:t,navigation:i}=e,[d,m]=(0,u.useState)();return(0,u.useEffect)(()=>{let e=document.createElement("html");e.innerHTML=(0,c.uS)(t);let i=Object.values(e.getElementsByTagName("h2")).map(e=>{let{textContent:t}=e;return{path:"#".concat((0,o.getSlug)(t)),text:t||""}});m(i)},[t]),(0,n.jsx)(r.Z,{children:(0,n.jsx)(a.Z,{containerType:"wide",children:(0,n.jsxs)(s.vs,{aside:!0,children:[i&&(0,n.jsx)(s.CH,{children:(0,n.jsx)(s.AH,{children:(0,n.jsx)(l.Z,{items:{primary:[{path:"/works",text:"Works"},{path:"/metadata",text:"Metadata"},{path:"/about",text:"About"}],about:[{path:"/about",text:"About"},{path:"/about/documentation",text:"Documentation"},{path:"/about/example",text:"Markdown Example"},{path:"/about/history",text:"Project History"}]}[i],subNavigation:d,orientation:"vertical"})})}),(0,n.jsx)(s.S4,{children:t})]})})})}},7937:function(e,t,i){"use strict";i.d(t,{AH:function(){return u},CH:function(){return a},S4:function(){return r},vs:function(){return l}});var n=i(5986),s=i(301);let u=(0,s.zo)("div",{position:"fixed",width:"275px",paddingTop:"calc($gr4 + $gr3)",marginTop:"-$gr4",maxHeight:"calc(100% - $gr5 - ".concat(n.J9,"px)"),overflow:"scroll","@xs":{position:"relative",width:"100%",maxHeight:"auto",paddingTop:"0",marginTop:"0"}}),a=(0,s.zo)("aside",{width:"275px","@xs":{position:"relative",width:"100%",marginTop:"0",paddingBottom:"$gr2",borderBottom:"1px solid $slate6"}}),r=(0,s.zo)("div",{flexShrink:1,width:"calc(100% - 275px)","@xs":{width:"100%"}}),l=(0,s.zo)("div",{position:"relative",width:"100%",padding:"$gr4 0",display:"flex",variants:{aside:{true:{"@xs":{flexDirection:"column"}}}},"@md":{padding:"$gr2 0"}})},5857:function(e,t,i){"use strict";i.d(t,{Z:function(){return a}});var n=i(5893);i(7294);var s=i(301);let u=(0,s.zo)("h2",{variants:{isHidden:{true:{position:"absolute",visibility:"hidden"}}},"&[data-level=h1]":{margin:"$gr4 0",fontSize:"$gr8",fontWeight:"400",fontFamily:"$display",letterSpacing:"-0.02em",lineHeight:"1.1","@sm":{fontSize:"$gr7"}},"&[data-level=h2]":{margin:"$gr5 0 $gr4",fontSize:"$gr7",fontWeight:"400",fontFamily:"$display",letterSpacing:"-0.01em","@sm":{fontSize:"$gr5"}},"&[data-level=h3]":{margin:"$gr5 0 $gr3",color:"$slate11",fontSize:"$gr6",fontWeight:"300",fontFamily:"$sans",letterSpacing:"-0.01em","@sm":{fontSize:"$gr4"}},"&[data-level=h4]":{},"&[data-level=h5]":{},"&[data-level=h6]":{}});var a=e=>{let{as:t="h2",css:i={},id:s,isHidden:a=!1,children:r}=e;return(0,n.jsx)(u,{as:t,isHidden:a,"data-level":t,css:i,id:s,children:(0,n.jsx)(n.Fragment,{children:r})})}},6616:function(e,t,i){"use strict";var n=i(5893);i(7294);var s=i(5152),u=i.n(s);let a=u()(()=>Promise.all([i.e(318),i.e(897),i.e(447),i.e(940)]).then(i.bind(i,1940)).then(e=>e.Viewer),{loadableGenerated:{webpack:()=>[null]},ssr:!1}),r={colors:{accent:"$indigo10",accentAlt:"$indigo11",accentMuted:"$indigo8",primary:"$slate12",primaryAlt:"$slate12",primaryMuted:"$slate10",secondary:"$slate1",secondaryAlt:"$slate3",secondaryMuted:"$slate2"},fonts:{sans:"$sans",display:"$display"}},l={canvasBackgroundColor:"$slate6",canvasHeight:"600px",openSeadragon:{gestureSettingsMouse:{scrollToZoom:!1}},informationPanel:{open:!1,renderAbout:!1,renderToggle:!1},showTitle:!1,showIIIFBadge:!1};t.Z=e=>{let{iiifContent:t,options:i}=e;return(0,n.jsx)(a,{iiifContent:t,options:{...l,...i},customTheme:r})}},2230:function(e,t,i){"use strict";let n=i(1304),s={lower:!0,strict:!0,trim:!0};function u(e){return function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e.substring(0,t)}(n(e,s),100)}e.exports={getSlug:u,getUniqueSlug:function(e,t){var i;let n=u(e),s=(i=t[n])?i+1:1;return{slug:s>1?"".concat(n,"-").concat(s):n,allSlugs:{...t,[n]:s}}}}},4531:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return d}});var n=i(5893),s=i(1831),u=i(3701),a=i(6616);let r={showTitle:!0,showIIIFBadge:!1,informationPanel:{open:!1,renderToggle:!1}};var l=e=>{let{iiifContent:t,options:i=r}=e;return(0,n.jsx)(a.Z,{iiifContent:t,options:i})};let o=e=>{let{children:t}=e;return(0,n.jsx)(u.Z,{content:t,navigation:"about"})};function c(e){let t=Object.assign({h1:"h1",p:"p",h2:"h2",h3:"h3",ul:"ul",li:"li",blockquote:"blockquote",pre:"pre",code:"code"},(0,s.a)(),e.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{children:"Markdown Example"}),"\n",(0,n.jsx)(t.p,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in velit accumsan, pretium ante eget, tincidunt purus. Aenean eu tincidunt purus. Aliquam tristique, enim sed tincidunt auctor, ligula libero posuere metus, et cursus mi diam in urna. Donec eu justo vestibulum, viverra eros a, auctor metus. Integer mauris neque, laoreet vitae porta vel, egestas a ex. Phasellus congue ligula sed aliquam commodo. In id lacus lorem. Etiam vitae lectus sapien."}),"\n",(0,n.jsx)(t.h2,{children:"Subheading"}),"\n",(0,n.jsx)(t.p,{children:"Vivamus pellentesque est ac tellus feugiat ultrices. Nam dapibus hendrerit mattis. Vestibulum elementum nibh lacus, sit amet maximus lacus euismod dignissim. Nullam rutrum malesuada mauris sed imperdiet. Nam dolor massa, consectetur ut rutrum tempor, ultrices pellentesque mauris. Fusce ut mauris eu nibh interdum hendrerit et quis purus. Nam at arcu leo. Vivamus vel ex lectus. Sed ac leo consectetur, lobortis mi nec, tristique tellus. Maecenas lorem sem, mattis quis ultrices in, ornare et turpis. Donec interdum metus non rhoncus mollis. Pellentesque ac congue lacus."}),"\n",(0,n.jsx)(l,{iiifContent:"/api/facet/date/1905"}),"\n",(0,n.jsx)(t.h2,{children:"Another Subheading"}),"\n",(0,n.jsx)(t.p,{children:"Quisque at aliquam augue. Nam eu tincidunt nisl. Duis egestas libero magna, sit amet feugiat odio porttitor finibus. Quisque quis purus vel urna laoreet ornare eu a odio. Nunc malesuada sed leo ac finibus. Vivamus varius sed velit et suscipit. Ut viverra tristique maximus. Suspendisse dapibus semper enim sit amet hendrerit. Aenean quam leo, vehicula vitae feugiat laoreet, hendrerit vestibulum velit. Nunc dapibus et ipsum id suscipit. Duis gravida, mi a scelerisque blandit, quam leo consectetur sem, a sollicitudin nisl libero id enim. Maecenas ut feugiat libero, porttitor maximus felis. Sed mattis elit ut felis eleifend, elementum dignissim purus elementum. Sed faucibus, nulla nec consequat auctor, tortor ipsum finibus sem, non faucibus lectus ex sit amet mi. Proin eget iaculis nibh, sed pellentesque erat. Sed vel tristique ipsum."}),"\n",(0,n.jsx)(t.h3,{children:"Quisque ut ullamcorper arcu."}),"\n",(0,n.jsx)(t.p,{children:"Integer tristique tempor nunc non egestas. Suspendisse velit leo, ornare eleifend commodo sit amet, fermentum id ex. Ut aliquet suscipit mollis. Aliquam varius lacus cursus, iaculis leo in, sodales sem."}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"Donec viverra nibh id efficitur viverra."}),"\n",(0,n.jsx)(t.li,{children:"Nulla dui mauris, accumsan vel mollis at, pharetra a purus."}),"\n",(0,n.jsx)(t.li,{children:"Interdum et malesuada fames ac ante ipsum primis in faucibus."}),"\n",(0,n.jsx)(t.li,{children:"Donec feugiat nibh egestas massa hendrerit scelerisque."}),"\n"]}),"\n",(0,n.jsx)(l,{iiifContent:"https://api.dc.library.northwestern.edu/api/v2/works/cd5e1b9c-370b-40e5-b3d9-defc1d8e0777?as=iiif"}),"\n",(0,n.jsx)(t.h3,{children:"Subheading"}),"\n",(0,n.jsx)(t.p,{children:"Vivamus laoreet diam id urna porta ultricies. Donec imperdiet bibendum dui, eleifend auctor ex tempus ut. Sed vitae enim nulla. Cras non nulla luctus odio ullamcorper feugiat."}),"\n",(0,n.jsxs)(t.blockquote,{children:["\n",(0,n.jsx)(t.p,{children:"Aenean viverra quam sit amet sapien tempor, vel sagittis velit ultricies. In imperdiet posuere risus non sodales. Mauris posuere elit a lectus vehicula, nec ullamcorper metus aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit."}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"Pellentesque et scelerisque tellus, nec vehicula nisi. Mauris auctor nisl non bibendum varius. Donec nec pretium leo. Sed ut sapien metus. Nullam elementum est leo, ac ornare ipsum accumsan id. Sed nec metus sed lacus fringilla feugiat. Nulla ut nunc sem. Ut efficitur tincidunt mi. Curabitur sed dapibus ex. Nunc non condimentum enim. Mauris scelerisque scelerisque nisi, eget auctor mauris tempus vitae. Fusce et turpis mauris. Vestibulum egestas condimentum euismod. Duis mauris dolor, tempor in cursus a, ultricies in arcu."}),"\n",(0,n.jsx)(t.h2,{children:"Example MDX"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-jsx",children:'import Basic from "@/components/Layouts/Basic";\nimport Viewer from "@/components/Embed/Viewer";\n\n# Markdown Example\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in velit accumsan, pretium ante eget, tincidunt purus. Aenean eu tincidunt purus. Aliquam tristique, enim sed tincidunt auctor, ligula libero posuere metus, et cursus mi diam in urna. Donec eu justo vestibulum, viverra eros a, auctor metus. Integer mauris neque, laoreet vitae porta vel, egestas a ex. Phasellus congue ligula sed aliquam commodo. In id lacus lorem. Etiam vitae lectus sapien.\n\n## Subheading\n\nVivamus pellentesque est ac tellus feugiat ultrices. Nam dapibus hendrerit mattis. Vestibulum elementum nibh lacus, sit amet maximus lacus euismod dignissim. Nullam rutrum malesuada mauris sed imperdiet. Nam dolor massa, consectetur ut rutrum tempor, ultrices pellentesque mauris. Fusce ut mauris eu nibh interdum hendrerit et quis purus. Nam at arcu leo. Vivamus vel ex lectus. Sed ac leo consectetur, lobortis mi nec, tristique tellus. Maecenas lorem sem, mattis quis ultrices in, ornare et turpis. Donec interdum metus non rhoncus mollis. Pellentesque ac congue lacus.\n\n<Viewer iiifContent="/api/facet/date/1905" />\n\n## Another Subheading\n\nQuisque at aliquam augue. Nam eu tincidunt nisl. Duis egestas libero magna, sit amet feugiat odio porttitor finibus. Quisque quis purus vel urna laoreet ornare eu a odio. Nunc malesuada sed leo ac finibus. Vivamus varius sed velit et suscipit. Ut viverra tristique maximus. Suspendisse dapibus semper enim sit amet hendrerit. Aenean quam leo, vehicula vitae feugiat laoreet, hendrerit vestibulum velit. Nunc dapibus et ipsum id suscipit. Duis gravida, mi a scelerisque blandit, quam leo consectetur sem, a sollicitudin nisl libero id enim. Maecenas ut feugiat libero, porttitor maximus felis. Sed mattis elit ut felis eleifend, elementum dignissim purus elementum. Sed faucibus, nulla nec consequat auctor, tortor ipsum finibus sem, non faucibus lectus ex sit amet mi. Proin eget iaculis nibh, sed pellentesque erat. Sed vel tristique ipsum.\n\n### Quisque ut ullamcorper arcu.\n\nInteger tristique tempor nunc non egestas. Suspendisse velit leo, ornare eleifend commodo sit amet, fermentum id ex. Ut aliquet suscipit mollis. Aliquam varius lacus cursus, iaculis leo in, sodales sem.\n\n- Donec viverra nibh id efficitur viverra.\n- Nulla dui mauris, accumsan vel mollis at, pharetra a purus.\n- Interdum et malesuada fames ac ante ipsum primis in faucibus.\n- Donec feugiat nibh egestas massa hendrerit scelerisque.\n\n<Viewer iiifContent="https://api.dc.library.northwestern.edu/api/v2/works/cd5e1b9c-370b-40e5-b3d9-defc1d8e0777?as=iiif" />\n\n### Subheading\n\nVivamus laoreet diam id urna porta ultricies. Donec imperdiet bibendum dui, eleifend auctor ex tempus ut. Sed vitae enim nulla. Cras non nulla luctus odio ullamcorper feugiat.\n\n> Aenean viverra quam sit amet sapien tempor, vel sagittis velit ultricies. In imperdiet posuere risus non sodales. Mauris posuere elit a lectus vehicula, nec ullamcorper metus aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nPellentesque et scelerisque tellus, nec vehicula nisi. Mauris auctor nisl non bibendum varius. Donec nec pretium leo. Sed ut sapien metus. Nullam elementum est leo, ac ornare ipsum accumsan id. Sed nec metus sed lacus fringilla feugiat. Nulla ut nunc sem. Ut efficitur tincidunt mi. Curabitur sed dapibus ex. Nunc non condimentum enim. Mauris scelerisque scelerisque nisi, eget auctor mauris tempus vitae. Fusce et turpis mauris. Vestibulum egestas condimentum euismod. Duis mauris dolor, tempor in cursus a, ultricies in arcu.\n\nexport default ({ children }) => (\n  <Basic content={children} navigation="about" />\n);\n'})})]})}var d=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.jsx)(o,Object.assign({},e,{children:(0,n.jsx)(c,e)}))}},5152:function(e,t,i){e.exports=i(5677)}},function(e){e.O(0,[774,412,409,971,118,602,888,179],function(){return e(e.s=8966)}),_N_E=e.O()}]);