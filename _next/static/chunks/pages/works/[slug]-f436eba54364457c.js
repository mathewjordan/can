(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[177],{9529:function(e,t,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/works/[slug]",function(){return o(5038)}])},1674:function(e,t,o){"use strict";o.d(t,{Z:function(){return n}});var l=o(5893);o(7294);var u=o(9332);let a=(0,u.zo)("h2",{variants:{isHidden:{true:{position:"absolute",visibility:"hidden"}}},"&[data-level=h1]":{margin:"$gr4 0",color:"$slate12",fontSize:"$gr8",fontWeight:"800",fontFamily:"$bookTight","@sm":{fontSize:"$gr7"}},"&[data-level=h2]":{margin:"$gr5 0 $gr4",color:"$slate11",fontSize:"$gr7",fontWeight:"200",fontFamily:"$bookTight","@sm":{fontSize:"$gr5"}},"&[data-level=h3]":{margin:"$gr5 0 $gr3",color:"$slate12",fontSize:"$gr5",fontWeight:"800",fontFamily:"$bookTight","@sm":{fontSize:"$gr4"}},"&[data-level=h4]":{},"&[data-level=h5]":{},"&[data-level=h6]":{}}),s=e=>{let{as:t="h2",css:o={},id:u,isHidden:s=!1,children:n}=e;return(0,l.jsx)(a,{as:t,isHidden:s,"data-level":t,css:o,id:u,children:(0,l.jsx)(l.Fragment,{children:n})})};var n=s},2564:function(e,t,o){"use strict";var l=o(5893);o(7294);var u=o(5152),a=o.n(u);let s=a()(()=>Promise.all([o.e(318),o.e(645),o.e(806),o.e(975)]).then(o.bind(o,615)),{loadableGenerated:{webpack:()=>[615]},ssr:!1}),n={colors:{accent:"$indigo10",accentAlt:"$indigo11",accentMuted:"$indigo8",primary:"$slate12",primaryAlt:"$slate12",primaryMuted:"$slate10",secondary:"$slate1",secondaryAlt:"$slate3",secondaryMuted:"$slate2"},fonts:{sans:"$book",display:"$bookTight"}},r={canvasBackgroundColor:"$slate6",canvasHeight:"600px",openSeadragon:{gestureSettingsMouse:{scrollToZoom:!1}},renderAbout:!1,showTitle:!1,showIIIFBadge:!1,showInformationToggle:!1},d=e=>{let{id:t,options:o}=e;return(0,l.jsx)(s,{id:t,options:{...r,...o},customTheme:n})};t.Z=d},5677:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){let o=a.default,u={loading:e=>{let{error:t,isLoading:o,pastDelay:l}=e;return null}};e instanceof Promise?u.loader=()=>e:"function"==typeof e?u.loader=e:"object"==typeof e&&(u=l({},u,e)),u=l({},u,t);let r=u.loader,d=()=>null!=r?r().then(s):Promise.resolve(s(()=>null));return(u.loadableGenerated&&delete(u=l({},u,u.loadableGenerated)).loadableGenerated,"boolean"!=typeof u.ssr||u.ssr)?o(l({},u,{loader:d})):(delete u.webpack,delete u.modules,n(o,u))},t.noSSR=n;var l=o(6495).Z,u=o(2648).Z,a=(u(o(7294)),u(o(8976)));function s(e){return{default:(null==e?void 0:e.default)||e}}function n(e,t){return delete t.webpack,delete t.modules,e(t)}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2254:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.LoadableContext=void 0;var l=(0,o(2648).Z)(o(7294));let u=l.default.createContext(null);t.LoadableContext=u},8976:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l=o(6495).Z,u=(0,o(2648).Z)(o(7294)),a=o(2254);let s=[],n=[],r=!1;function d(e){let t=e(),o={loading:!0,loaded:null,error:null};return o.promise=t.then(e=>(o.loading=!1,o.loaded=e,e)).catch(e=>{throw o.loading=!1,o.error=e,e}),o}class c{promise(){return this._res.promise}retry(){this._clearTimeouts(),this._res=this._loadFn(this._opts.loader),this._state={pastDelay:!1,timedOut:!1};let{_res:e,_opts:t}=this;e.loading&&("number"==typeof t.delay&&(0===t.delay?this._state.pastDelay=!0:this._delay=setTimeout(()=>{this._update({pastDelay:!0})},t.delay)),"number"==typeof t.timeout&&(this._timeout=setTimeout(()=>{this._update({timedOut:!0})},t.timeout))),this._res.promise.then(()=>{this._update({}),this._clearTimeouts()}).catch(e=>{this._update({}),this._clearTimeouts()}),this._update({})}_update(e){this._state=l({},this._state,{error:this._res.error,loaded:this._res.loaded,loading:this._res.loading},e),this._callbacks.forEach(e=>e())}_clearTimeouts(){clearTimeout(this._delay),clearTimeout(this._timeout)}getCurrentValue(){return this._state}subscribe(e){return this._callbacks.add(e),()=>{this._callbacks.delete(e)}}constructor(e,t){this._loadFn=e,this._opts=t,this._callbacks=new Set,this._delay=null,this._timeout=null,this.retry()}}function i(e){return function(e,t){let o=Object.assign({loader:null,loading:null,delay:200,timeout:null,webpack:null,modules:null},t),l=null;function s(){if(!l){let t=new c(e,o);l={getCurrentValue:t.getCurrentValue.bind(t),subscribe:t.subscribe.bind(t),retry:t.retry.bind(t),promise:t.promise.bind(t)}}return l.promise()}if(!r){let e=o.webpack?o.webpack():o.modules;e&&n.push(t=>{for(let o of e)if(-1!==t.indexOf(o))return s()})}function d(e,t){!function(){s();let e=u.default.useContext(a.LoadableContext);e&&Array.isArray(o.modules)&&o.modules.forEach(t=>{e(t)})}();let n=u.default.useSyncExternalStore(l.subscribe,l.getCurrentValue,l.getCurrentValue);return u.default.useImperativeHandle(t,()=>({retry:l.retry}),[]),u.default.useMemo(()=>{var t;return n.loading||n.error?u.default.createElement(o.loading,{isLoading:n.loading,pastDelay:n.pastDelay,timedOut:n.timedOut,error:n.error,retry:l.retry}):n.loaded?u.default.createElement((t=n.loaded)&&t.default?t.default:t,e):null},[e,n])}return d.preload=()=>s(),d.displayName="LoadableComponent",u.default.forwardRef(d)}(d,e)}function g(e,t){let o=[];for(;e.length;){let l=e.pop();o.push(l(t))}return Promise.all(o).then(()=>{if(e.length)return g(e,t)})}i.preloadAll=()=>new Promise((e,t)=>{g(s).then(e,t)}),i.preloadReady=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return new Promise(t=>{let o=()=>(r=!0,t());g(n,e).then(o,o)})},window.__NEXT_PRELOADREADY=i.preloadReady,t.default=i},5038:function(e,t,o){"use strict";o.r(t),o.d(t,{__N_SSG:function(){return p},default:function(){return b}});var l=o(5893),u=o(2049),a=o(2564),s=o(9771),n=o(9332);let r=(0,n.zo)("div",{}),d=(0,n.zo)("section",{maxWidth:"1280px",margin:"auto",position:"relative",paddingTop:"$gr3",".work-summary":{fontSize:"$gr5",color:"$slate10",marginBottom:"$gr5","@sm":{fontSize:"$gr4",marginBottom:"$gr4"}}});var c=o(7058),i=o(1664),g=o.n(i);o(7294);var _=o(1674);let v=(0,n.zo)("div",{dl:{dt:{padding:"$gr3 0 $gr2",fontFamily:"$bookTight"},dd:{padding:"0 0 $gr1",margin:"0"}}}),f=e=>{let{searchParam:t,searchValues:o,value:u}=e;if(!u)return(0,l.jsx)(l.Fragment,{});let a=null==o?void 0:o.find(e=>e.value===u);return(0,l.jsx)(g(),{href:"/search?".concat(t,"=").concat(encodeURIComponent(null==a?void 0:a.slug)),children:(0,l.jsx)("span",{dangerouslySetInnerHTML:{__html:u}})})},h=e=>{let{manifest:t}=e,{label:o,metadata:u,requiredStatement:a,summary:n}=t,i=c.map(e=>({Content:(0,l.jsx)(f,{searchParam:e.slug,searchValues:e.values}),matchingLabel:{none:[e.label]}}));return(0,l.jsx)(d,{children:(0,l.jsxs)(r,{children:[(0,l.jsx)(_.Z,{as:"h1",children:(0,l.jsx)(s.__,{label:o,as:"span"})}),n&&(0,l.jsx)(s.ER,{summary:n,as:"p",className:"work-summary"}),(0,l.jsxs)(v,{children:[u&&(0,l.jsx)(s.SF,{customValueContent:i,metadata:u}),a&&(0,l.jsx)(s.bT,{requiredStatement:a})]})]})})};var m=o(934),p=!0;function b(e){let{manifest:t}=e,{id:o}=t;return(0,l.jsxs)(u.Z,{children:[(0,l.jsx)(a.Z,{id:o}),(0,l.jsx)(m.Z,{children:(0,l.jsx)(h,{manifest:t})})]})}},5152:function(e,t,o){e.exports=o(5677)},7058:function(e){"use strict";e.exports=JSON.parse('[{"label":"Subject","slug":"subject","values":[{"value":"Bodies of water","slug":"bodies-of-water","doc_count":19,"docs":[3,4,19,21,22,24,28,33,35,48,53,54,67,68,70,74,85,86,87]},{"value":"Log cabins","slug":"log-cabins","doc_count":12,"docs":[5,9,12,16,31,52,54,56,57,63,74,76]},{"value":"Trails","slug":"trails","doc_count":7,"docs":[0,3,7,8,53,66,87]},{"value":"Hotels","slug":"hotels","doc_count":4,"docs":[0,72,80,88]},{"value":"Pine","slug":"pine","doc_count":4,"docs":[2,10,45,84]},{"value":"Roads","slug":"roads","doc_count":4,"docs":[22,28,34,70]},{"value":"Sawmills","slug":"sawmills","doc_count":4,"docs":[42,51,60,85]},{"value":"Oak","slug":"oak","doc_count":3,"docs":[2,45,84]},{"value":"Transportation","slug":"transportation","doc_count":2,"docs":[47,50]},{"value":"Barns","slug":"barns","doc_count":1,"docs":[16]},{"value":"Buildings","slug":"buildings","doc_count":1,"docs":[65]},{"value":"College campuses","slug":"college-campuses","doc_count":1,"docs":[89]},{"value":"Dams","slug":"dams","doc_count":1,"docs":[85]},{"value":"Farms","slug":"farms","doc_count":1,"docs":[69]},{"value":"Food","slug":"food","doc_count":1,"docs":[52]},{"value":"Handicraft","slug":"handicraft","doc_count":1,"docs":[18]},{"value":"Housing","slug":"housing","doc_count":1,"docs":[25]},{"value":"Rye","slug":"rye","doc_count":1,"docs":[41]}]},{"label":"Date","slug":"date","values":[{"value":"Aug 13, 1886","slug":"aug-13-1886","doc_count":12,"docs":[0,12,18,26,40,55,57,66,73,80,81,88]},{"value":"Aug 19, 1886","slug":"aug-19-1886","doc_count":12,"docs":[2,15,16,19,21,39,47,51,58,68,84,86]},{"value":"Aug 14, 1886","slug":"aug-14-1886","doc_count":10,"docs":[4,8,11,17,23,35,44,48,54,83]},{"value":"Aug 16, 1886","slug":"aug-16-1886","doc_count":9,"docs":[5,7,9,24,33,34,43,56,67]},{"value":"Aug 25, 1886","slug":"aug-25-1886","doc_count":7,"docs":[25,30,42,62,63,69,78]},{"value":"Aug 12, 1886","slug":"aug-12-1886","doc_count":6,"docs":[1,6,32,59,72,77]},{"value":"Aug 18, 1886","slug":"aug-18-1886","doc_count":6,"docs":[3,22,28,53,76,87]},{"value":"Aug 22, 1886","slug":"aug-22-1886","doc_count":5,"docs":[38,61,71,79,82]},{"value":"Aug 28, 1886","slug":"aug-28-1886","doc_count":4,"docs":[10,20,37,60]},{"value":"Aug 30, 1886","slug":"aug-30-1886","doc_count":4,"docs":[14,29,46,64]},{"value":"Aug 17, 1886","slug":"aug-17-1886","doc_count":3,"docs":[36,50,52]},{"value":"Aug 20, 1886","slug":"aug-20-1886","doc_count":3,"docs":[31,74,85]},{"value":"Aug 27, 1886","slug":"aug-27-1886","doc_count":3,"docs":[27,41,45]},{"value":"Aug 11, 1886","slug":"aug-11-1886","doc_count":2,"docs":[65,89]},{"value":"Aug 24, 1886","slug":"aug-24-1886","doc_count":2,"docs":[13,75]},{"value":"Aug 21, 1886","slug":"aug-21-1886","doc_count":1,"docs":[70]},{"value":"Sep 1, 1886","slug":"sep-1-1886","doc_count":1,"docs":[49]}]},{"label":"Place","slug":"place","values":[{"value":"Great Smoky Mountains (N.C. and Tenn.)","slug":"great-smoky-mountains-nc-and-tenn","doc_count":87,"docs":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88]},{"value":"Little River","slug":"little-river","doc_count":19,"docs":[4,19,21,23,24,33,35,39,46,47,48,54,60,64,67,74,76,85,86]},{"value":"Mount Nebo","slug":"mount-nebo","doc_count":14,"docs":[1,5,12,18,26,31,40,44,55,57,72,73,77,81]},{"value":"Pine Mountain","slug":"pine-mountain","doc_count":9,"docs":[6,8,9,13,32,44,59,75,83]},{"value":"Blount County (Tenn.)","slug":"blount-county-tenn","doc_count":8,"docs":[0,2,25,26,40,50,84,88]},{"value":"Miller Cove","slug":"miller-cove","doc_count":6,"docs":[35,48,54,56,63,69]},{"value":"Tuckaleechee Cove","slug":"tuckaleechee-cove","doc_count":5,"docs":[16,42,51,68,78]},{"value":"Scott Mountain","slug":"scott-mountain","doc_count":4,"docs":[15,15,58,58]},{"value":"Gregory Bald","slug":"gregory-bald","doc_count":3,"docs":[27,41,45]},{"value":"Knoxville (Tenn.)","slug":"knoxville-tenn","doc_count":3,"docs":[49,65,89]},{"value":"Laurel Creek","slug":"laurel-creek","doc_count":3,"docs":[22,28,50]},{"value":"Cades Cove","slug":"cades-cove","doc_count":2,"docs":[20,37]},{"value":"Millers Cove","slug":"millers-cove","doc_count":2,"docs":[39,68]},{"value":"Blockhouse Mountain","slug":"blockhouse-mountain","doc_count":1,"docs":[27]},{"value":"Tennessee River","slug":"tennessee-river","doc_count":1,"docs":[89]},{"value":"Thunderhead Mountain","slug":"thunderhead-mountain","doc_count":1,"docs":[27]}]}]')}},function(e){e.O(0,[27,409,448,870,774,888,179],function(){return e(e.s=9529)}),_N_E=e.O()}]);