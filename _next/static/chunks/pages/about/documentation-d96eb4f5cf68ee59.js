(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[407],{7209:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/about/documentation",function(){return t(7033)}])},1831:function(e,n,t){"use strict";t.d(n,{a:function(){return v}});var i=t(5893);t(7294);var o=t(301);let a=(0,o.zo)("blockquote",{fontWeight:"300",color:"$slate11",padding:"$gr1 0"});var s=e=>{let{children:n}=e;return(0,i.jsx)(a,{children:n})},r=t(640),l=t.n(r),c=t(7087),d=t(5986);let h={plain:{color:"var(--colors-indigo12)",fontSize:.9*d.hO,fontFamily:"Menlo, monospace"},styles:[{types:["boolean","string"],style:{color:"var(--colors-indigo10)"}},{types:["operator"],style:{color:"var(--colors-indigo11)"}},{types:["punctuation"],style:{color:"var(--colors-indigo8)"}}]};var u=t(2765);let p=(0,o.zo)("div",{position:"relative",button:{position:"absolute",marginTop:"-$gr2",right:"$gr3"}}),x=(0,o.zo)("pre",{backgroundColor:"$indigo3",padding:"$gr3",borderRadius:"5px",lineHeight:"1.382em",overflowX:"scroll",overflowY:"visible",boxShadow:"inset 1px 1px 2px  ".concat(u.Eh.indigoA3),zIndex:"0"}),g=(0,o.zo)("code",{backgroundColor:"$indigo3",padding:"3px $gr1",borderRadius:"5px",fontSize:"$gr3",color:"$indigo11",boxShadow:"1px 1px 1px  ".concat(u.Eh.indigoA6)});var f=t(2190),m=t(2469),j=e=>{let{children:n,language:t}=e;return(0,i.jsx)(c.ZP,{...c.lG,theme:h,code:n,language:t,children:e=>{let{style:t,tokens:o,getLineProps:a,getTokenProps:s}=e;return(0,i.jsxs)(p,{children:[(0,i.jsxs)(f.O,{buttonSize:"tiny",buttonType:"primary","aria-label":"Copy Code",onClick:()=>{l()(n)},css:{display:"flex",alignItems:"center"},children:["Copy\xa0",(0,i.jsx)(m.TIy,{})]}),(0,i.jsx)(x,{style:t,children:o.map((e,n)=>(0,i.jsx)("div",{...a({line:e,key:n}),children:e.map((e,t)=>(0,i.jsx)("span",{...s({token:e,key:t})},n))},n))})]})}})},y=t(5857),b=t(2230);function v(e){return{h1:e=>{let{children:n}=e;return(0,i.jsx)(y.Z,{as:"h1",children:n})},h2:e=>{let{children:n}=e;return(0,i.jsx)(y.Z,{as:"h2",id:(0,b.getSlug)(n),children:n})},h3:e=>{let{children:n}=e;return(0,i.jsx)(y.Z,{as:"h3",children:n})},code:e=>{let{children:n}=e;return(0,i.jsx)(g,{children:n})},blockquote:e=>{let{children:n}=e;return(0,i.jsx)(s,{children:n})},pre:e=>{var n;let{children:t}=e,o=t.props.children,a=null===(n=t.props.className)||void 0===n?void 0:n.replace("language-","");return(0,i.jsx)(j,{language:a,children:o.trim()})},...e}}},3701:function(e,n,t){"use strict";var i=t(5893),o=t(7937),a=t(7294),s=t(5045),r=t(2213),l=t(6671),c=t(2230),d=t(2404);n.Z=e=>{let{content:n,navigation:t}=e,[h,u]=(0,a.useState)();return(0,a.useEffect)(()=>{let e=document.createElement("html");e.innerHTML=(0,d.uS)(n);let t=Object.values(e.getElementsByTagName("h2")).map(e=>{let{textContent:n}=e;return{path:"#".concat((0,c.getSlug)(n)),text:n||""}});u(t)},[n]),(0,i.jsx)(r.Z,{children:(0,i.jsx)(s.Z,{containerType:"wide",children:(0,i.jsxs)(o.vs,{aside:!0,children:[t&&(0,i.jsx)(o.CH,{children:(0,i.jsx)(o.AH,{children:(0,i.jsx)(l.Z,{items:{primary:[{path:"/works",text:"Works"},{path:"/metadata",text:"Metadata"},{path:"/about",text:"About"}],about:[{path:"/about",text:"About"},{path:"/about/documentation",text:"Documentation"},{path:"/about/example",text:"Markdown Example"},{path:"/about/history",text:"Project History"}]}[t],subNavigation:h,orientation:"vertical"})})}),(0,i.jsx)(o.S4,{children:n})]})})})}},7937:function(e,n,t){"use strict";t.d(n,{AH:function(){return a},CH:function(){return s},S4:function(){return r},vs:function(){return l}});var i=t(5986),o=t(301);let a=(0,o.zo)("div",{position:"fixed",width:"275px",paddingTop:"calc($gr4 + $gr3)",marginTop:"-$gr4",maxHeight:"calc(100% - $gr5 - ".concat(i.J9,"px)"),overflow:"scroll","@xs":{position:"relative",width:"100%",maxHeight:"auto",paddingTop:"0",marginTop:"0"}}),s=(0,o.zo)("aside",{width:"275px","@xs":{position:"relative",width:"100%",marginTop:"0",paddingBottom:"$gr2",borderBottom:"1px solid $slate6"}}),r=(0,o.zo)("div",{flexShrink:1,width:"calc(100% - 275px)","@xs":{width:"100%"}}),l=(0,o.zo)("div",{position:"relative",width:"100%",padding:"$gr4 0",display:"flex",variants:{aside:{true:{"@xs":{flexDirection:"column"}}}},"@md":{padding:"$gr2 0"}})},5857:function(e,n,t){"use strict";t.d(n,{Z:function(){return s}});var i=t(5893);t(7294);var o=t(301);let a=(0,o.zo)("h2",{variants:{isHidden:{true:{position:"absolute",visibility:"hidden"}}},"&[data-level=h1]":{margin:"$gr4 0",fontSize:"$gr8",fontWeight:"400",fontFamily:"$display",letterSpacing:"-0.02em",lineHeight:"1.1","@sm":{fontSize:"$gr7"}},"&[data-level=h2]":{margin:"$gr5 0 $gr4",fontSize:"$gr7",fontWeight:"400",fontFamily:"$display",letterSpacing:"-0.01em","@sm":{fontSize:"$gr5"}},"&[data-level=h3]":{margin:"$gr5 0 $gr3",color:"$slate11",fontSize:"$gr6",fontWeight:"300",fontFamily:"$sans",letterSpacing:"-0.01em","@sm":{fontSize:"$gr4"}},"&[data-level=h4]":{},"&[data-level=h5]":{},"&[data-level=h6]":{}});var s=e=>{let{as:n="h2",css:t={},id:o,isHidden:s=!1,children:r}=e;return(0,i.jsx)(a,{as:n,isHidden:s,"data-level":n,css:t,id:o,children:(0,i.jsx)(i.Fragment,{children:r})})}},2230:function(e,n,t){"use strict";let i=t(1304),o={lower:!0,strict:!0,trim:!0};function a(e){return function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e.substring(0,n)}(i(e,o),100)}e.exports={getSlug:a,getUniqueSlug:function(e,n){var t;let i=a(e),o=(t=n[i])?t+1:1;return{slug:o>1?"".concat(i,"-").concat(o):i,allSlugs:{...n,[i]:o}}}}},7033:function(e,n,t){"use strict";t.r(n);var i=t(5893),o=t(1831),a=t(3701);let s=e=>{let{children:n}=e;return(0,i.jsx)(a.Z,{content:n,navigation:"about"})};function r(e){let n=Object.assign({h1:"h1",p:"p",h2:"h2",h3:"h3",pre:"pre",code:"code",ol:"ol",li:"li",strong:"strong",a:"a",em:"em",h4:"h4"},(0,o.a)(),e.components);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{children:"Documentation"}),"\n",(0,i.jsx)(n.p,{children:"Canopy IIIF is a Next.js application where production and development builds will follow Next documentation accordingly."}),"\n",(0,i.jsx)(n.h2,{children:"Setup"}),"\n",(0,i.jsx)(n.h3,{children:"Install Dependencies"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npm install\n"})}),"\n",(0,i.jsx)(n.h3,{children:"Running in Development"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npm run dev\n"})}),"\n",(0,i.jsx)(n.h3,{children:"Building in Production"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npm run build\n"})}),"\n",(0,i.jsx)(n.h2,{children:"Getting Started"}),"\n",(0,i.jsxs)(n.p,{children:["Canopy IIIF uses a default configuration ",(0,i.jsx)(n.code,{children:"config/.default/canopy.default.json"})," for demonstration purposes if a custom one is not set. The build process will read from a custom configuration file at config/canopy.json if it exists."]}),"\n",(0,i.jsx)(n.h3,{children:"Custom Configuration"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["Find your ",(0,i.jsx)(n.code,{children:"config/"})," directory"]}),"\n",(0,i.jsxs)(n.li,{children:["Copy ",(0,i.jsx)(n.code,{children:"canopy.sample.json"})," to ",(0,i.jsx)(n.code,{children:"canopy.json"})]}),"\n",(0,i.jsxs)(n.li,{children:["Make updates to both the ",(0,i.jsx)(n.strong,{children:"prod"})," and ",(0,i.jsx)(n.strong,{children:"dev"})," configurations"]}),"\n",(0,i.jsxs)(n.li,{children:["Copy ",(0,i.jsx)(n.code,{children:"options.sample.json"})," to ",(0,i.jsx)(n.code,{children:"option.json"})]}),"\n",(0,i.jsxs)(n.li,{children:["Modify ",(0,i.jsx)(n.code,{children:"option.json"})," as needed"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{children:"Example Configuration"}),"\n",(0,i.jsx)(n.p,{children:"Both the prod and dev environments have a configuration. These configurations can match each other; however in some cases, development speed can be aided by targeting a smaller IIIF Collection id as a fixture."}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Important:"})," The collection property is required and must be the id of the referenced source IIIF Collection. Collections of Collections are not currently supported."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "prod": {\n    "label": { "none": ["Hobhouse"] },\n    "summary": { "none": ["Manuscripts from the archive of Emily Hobhouse."] },\n    "collection": "https://iiif.bodleian.ox.ac.uk/iiif/collection/hobhouse",\n    "featured": [\n      "https://iiif.bodleian.ox.ac.uk/iiif/manifest/8da97e8c-4e12-457d-aad8-3327b3aec183.json",\n      "https://iiif.bodleian.ox.ac.uk/iiif/manifest/2968d5c7-3718-44ef-92ea-ee4cc58cc677.json"\n    ],\n    "metadata": ["Extent", "Title", "Date Statement", "Language"]\n  },\n  "dev": {\n    "label": { "none": ["Hobhouse"] },\n    "summary": { "none": ["Manuscripts from the archive of Emily Hobhouse."] },\n    "collection": "https://iiif.bodleian.ox.ac.uk/iiif/collection/hobhouse",\n    "featured": [\n      "https://iiif.bodleian.ox.ac.uk/iiif/manifest/8da97e8c-4e12-457d-aad8-3327b3aec183.json",\n      "https://iiif.bodleian.ox.ac.uk/iiif/manifest/2968d5c7-3718-44ef-92ea-ee4cc58cc677.json"\n    ],\n    "metadata": ["Extent", "Title", "Date Statement", "Language"]\n  }\n}\n'})}),"\n",(0,i.jsx)(n.h2,{children:"Customization"}),"\n",(0,i.jsx)(n.h3,{children:"Site Title and Description"}),"\n",(0,i.jsxs)(n.p,{children:["The Canopy IIIF site title and description are respectively the ",(0,i.jsx)(n.code,{children:"label"})," and ",(0,i.jsx)(n.code,{children:"summary"})," of the set Collection resource. You can optionally override this by providing a valid Presentation 3.0 ",(0,i.jsx)(n.a,{href:"https://iiif.io/api/presentation/3.0/#label",children:"label"})," and/or ",(0,i.jsx)(n.a,{href:"https://iiif.io/api/presentation/3.0/#summary",children:"summary"})," property."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "label": { "none": ["Hobhouse"] },\n  "summary": { "none": ["Manuscripts from the archive of Emily Hobhouse."] }\n}\n'})}),"\n",(0,i.jsx)(n.h3,{children:"Featured Manifests"}),"\n",(0,i.jsx)(n.p,{children:"You can inform Canopy IIIF of featured Manifests by providing an array of ids. These must be within the referenced collection resource and the Manifest URIs must be an exact match. These Manifests will render throughout the interface in featured components."}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Warning:"})," In the current pre-release, featured Manifests must have an Image body on the first Canvas."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'"featured": [\n  "https://iiif.bodleian.ox.ac.uk/iiif/manifest/8da97e8c-4e12-457d-aad8-3327b3aec183.json",\n  "https://iiif.bodleian.ox.ac.uk/iiif/manifest/2968d5c7-3718-44ef-92ea-ee4cc58cc677.json"\n]\n'})}),"\n",(0,i.jsx)(n.h3,{children:"Metadata and Facets"}),"\n",(0,i.jsx)(n.p,{children:"Curating Metadata allows implementers of Canopy IIIF to select metadata labels that provide use to end users. An optimal case is a label common to all or most manifests with some in diversity of values across those resources. Metadata labels that are curated will be automatically included as featured elements on the homepage, the metadata page, linking from works, and as facets on the search page."}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Note:"})," Metadata labels are not yet BCP 47 language code aware; however, aggregation processes will make exact string comparisons regardless of language code."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'"metadata": ["Extent", "Title", "Date Statement", "Language"]\n'})}),"\n",(0,i.jsx)(n.h2,{children:"Additional Options"}),"\n",(0,i.jsx)(n.h3,{children:"Locale Preferences"}),"\n",(0,i.jsxs)(n.p,{children:["Canopy IIIF supports locale preferences for user interface language. The default configuration language is English; however, additional languages can be defined. For more information, ",(0,i.jsx)(n.a,{href:"#locale",children:"see Locale"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'"locales": [\n  {\n    "config": "locales/en.json",\n    "label": "English",\n    "lang": "en"\n  }\n]\n'})}),"\n",(0,i.jsxs)(n.p,{children:["If ",(0,i.jsx)(n.em,{children:"more than one"})," locale is defined in the ",(0,i.jsx)(n.code,{children:"config/options.json"}),", a select element will render in the header allowing users to toggle the defined languages. In addition, Canopy will attempt to align the language set by the user's browser with the available options. As a fallback, the first locale defined in the array will be set."]}),"\n",(0,i.jsxs)(n.p,{children:["As an example, if a visitor with ",(0,i.jsx)(n.code,{children:"en-US"})," visited a Canopy instance that included both ",(0,i.jsx)(n.code,{children:"no"})," and ",(0,i.jsx)(n.code,{children:"en"})," as language options, the ",(0,i.jsx)(n.code,{children:"en"})," locale configuration would be the default locale. Whereas, if a user visited this same instance with ",(0,i.jsx)(n.code,{children:"fr"})," as their browser language, the default locale would be the ",(0,i.jsx)(n.code,{children:"no"})," configuration."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'"locales": [\n  {\n    "config": "locales/no.json",\n    "label": "Norsk",\n    "lang": "no"\n  },\n  {\n    "config": "locales/en.json",\n    "label": "English",\n    "lang": "en"\n  }\n]\n'})}),"\n",(0,i.jsx)(n.h3,{children:"Search Index"}),"\n",(0,i.jsxs)(n.p,{children:["Search options can be configured in ",(0,i.jsx)(n.code,{children:"config/options.json"}),". By default, the search index is included but can be disabled by setting ",(0,i.jsx)(n.code,{children:"enabled: false"}),". If the search index is enabled, the label property on the manifest is always indexed. The properties of the ",(0,i.jsx)(n.code,{children:"metadata"})," property are also indexed by default, but this can be modified to have these values not be indexed at all by setting ",(0,i.jsx)(n.code,{children:"search.index.metadata.enabled"})," to ",(0,i.jsx)(n.code,{children:"false"}),". Furthermore, all ",(0,i.jsx)(n.code,{children:"metadata"})," values may be indexed OR you may specify only the properties that are specified in ",(0,i.jsx)(n.code,{children:"config/canopy.json"})," by modifying ",(0,i.jsx)(n.code,{children:"search.index.metadata.all"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["The only property that can be indexed outside of ",(0,i.jsx)(n.code,{children:"metadata"})," and ",(0,i.jsx)(n.code,{children:"label"})," currently is ",(0,i.jsx)(n.code,{children:"summary"}),". This is configured with ",(0,i.jsx)(n.code,{children:"search.index.summary.enabled"})," ."]}),"\n",(0,i.jsx)(n.h4,{children:"FlexSearch"}),"\n",(0,i.jsxs)(n.p,{children:["Users can customize their ",(0,i.jsx)(n.a,{href:"https://github.com/nextapps-de/flexsearch#options",children:"FlexSearch configuration"})," using ",(0,i.jsx)(n.code,{children:"search.flexSearch"})," to fit around the source Collection and its Manifest ",(0,i.jsx)(n.code,{children:"label"}),", ",(0,i.jsx)(n.code,{children:"metadata"}),", and ",(0,i.jsx)(n.code,{children:"summary"})," properties. Customizations range from defining language-specific options such as ",(0,i.jsx)(n.code,{children:"charset"})," and ",(0,i.jsx)(n.code,{children:"stemmer"}),", as well as scoring options like ",(0,i.jsx)(n.code,{children:"resolution"})," and ",(0,i.jsx)(n.code,{children:"depth"}),"."]}),"\n",(0,i.jsx)(n.h4,{children:"Default Search Configuration"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'"search": {\n  "enabled": true,\n  "flexSearch": {\n    "charset": "latin:extra",\n    "optimize": true,\n    "tokenize": "strict",\n    "bidirectional": false,\n    "document": {\n      "index": [\n        {\n          "field": "label",\n          "tokenize": "full",\n          "resolution": 9,\n          "depth": 3,\n          "bidirectional": true\n        },\n        {\n          "field": "metadata",\n          "resolution": 2\n        },\n        {\n          "field": "summary",\n          "resolution": 1\n        }\n      ]\n    }\n  },\n  "index": {\n    "metadata": {\n      "enabled": true,\n      "all": false\n     },\n    "summary": {\n      "enabled": false\n     }\n  }\n}\n'})}),"\n",(0,i.jsx)(n.h3,{children:"Theme Mode"}),"\n",(0,i.jsxs)(n.p,{children:["The default theme for users can be set via ",(0,i.jsx)(n.code,{children:"config/options.json"}),". This feature sets the initial theme for users as ",(0,i.jsx)(n.strong,{children:"light"}),", ",(0,i.jsx)(n.strong,{children:"dark"}),", or ",(0,i.jsx)(n.strong,{children:"system"}),". The ",(0,i.jsx)(n.em,{children:"Toggle Theme"})," button can also be enabled or disabled here."]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Note:"})," Theme settings are stored in the users local browser storage. Setting the theme will only affect new users to your site. It will not change the default theme for users who have already visited."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'"theme": { "defaultTheme": "light", "toggleEnabled": false }\n'})}),"\n",(0,i.jsx)(n.h3,{children:"Maps (navPlace)"}),"\n",(0,i.jsxs)(n.p,{children:["A map route can be enabled to provide geographic discovery of works via ",(0,i.jsx)(n.code,{children:"config/options.json"}),". This feature builds markers off of geographic point features found in ",(0,i.jsx)(n.a,{href:"https://iiif.io/api/extension/navplace/",children:"navPlace"})," properties at the Manifest level. To enable this option, set the option to ",(0,i.jsx)(n.code,{children:"true"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Note:"})," Currently, only ",(0,i.jsx)(n.code,{children:"navPlace"}),' properties found at the Manifest level are displayed. Also, onlyFeatures of type: "Point" are displayed.']}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'"map": { "enabled": true }\n'})}),"\n",(0,i.jsx)(n.p,{children:"The map's tile layers are also configured here, giving users the ability to choose and customize layers for their project. Additional services, such as MapBox, can be easily integrated following this pattern. Each tile layer defined here will appear as an option in the layer control of the map. The name property defines the text next to the radio button. The url property is the link to the tile layer. Finally, the attribution property defines the text that appears at the bottom of the map in case the tile layer requires any specific attribution on use. The first tile layer in the array will be used as the default map."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'"tileLayers": [\n  {\n    "name": "OpenStreetMap",\n    "url": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",\n    "attribution": "&copy; OpenStreetMap contributors"\n  },\n  {\n    "name": "OpenTopoMap",\n    "url": "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",\n    "attribution": "&copy; OpenStreetMap contributors"\n  }\n]\n'})}),"\n",(0,i.jsx)(n.h2,{children:"Locale"}),"\n",(0,i.jsxs)(n.p,{children:["User interface language strings are set through a locale configuration file located in the ",(0,i.jsx)(n.code,{children:"config/locales"})," directory. Persons customizing a Canopy instance can add new language configurations to support their preferred locales. We welcome all pull requests to add new locales to the Canopy IIIF project."]}),"\n",(0,i.jsx)(n.h3,{children:"Example"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.em,{children:"English"})," configuration found at ",(0,i.jsx)(n.code,{children:"config/locales/en.json"})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "footerSourceCollection": "Source Collection",\n  "footerToggleTheme": "Toggle Theme",\n  "homepageHighlightedWorks": "Highlighted Works",\n  "searchButton": "Search",\n  "searchResults": "Results",\n  "searchFilter": "Filter",\n  "searchFilterAny": "Any",\n  "searchFilterClear": "Clear All",\n  "searchFilterClose": "Close",\n  "searchFilterSubmit": "View Results"\n}\n'})}),"\n",(0,i.jsx)(n.h2,{children:"Contextual Content"}),"\n",(0,i.jsxs)(n.p,{children:["Canopy allows for easy creation of contextual content that supports the automatically generated content at ",(0,i.jsx)(n.code,{children:"/"}),", ",(0,i.jsx)(n.code,{children:"search/"})," and ",(0,i.jsx)(n.code,{children:"works/"}),". For the purpose of easy content generation Canopy utilizes ",(0,i.jsx)(n.a,{href:"https://mdxjs.com/",children:"MDX"})," which ",(0,i.jsx)(n.em,{children:'"allows you to use JSX in your markdown content."'})]}),"\n",(0,i.jsx)(n.h3,{children:"Creating a Page"}),"\n",(0,i.jsxs)(n.p,{children:["Individual pages for Canopy IIIF are created with the ",(0,i.jsx)(n.code,{children:"pages/"})," directory. Following Next.js conventions, if you create the page ",(0,i.jsx)(n.code,{children:"pages/contact.mdx"}),", an accessibile path will be created at ",(0,i.jsx)(n.code,{children:"/contact"}),". MDX pages will need a defined layout from ",(0,i.jsx)(n.code,{children:"@/components/Layouts/"}),". Addditional JSX components can be imported and integrated between markdown syntax. The final line of your file should be an export which outputs the ",(0,i.jsx)(n.em,{children:"children"})," (content) to the provided layout component."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:'import Basic from "@/components/Layouts/Basic";\nimport Button from "@/components/Button/Button";\n\n# Contact\n\nThank you for your interest.\n\nFor resource requests, please complete a request form or contact us at [email@example.org](mailto:email@example.org).\n\n<Button url="https://example.org/requests">Submit Request</Button>\n\nexport default ({ children }) => <Basic content={children} />;\n\n;\n'})}),"\n",(0,i.jsx)(n.h3,{children:"Avoiding Conflicts"}),"\n",(0,i.jsx)(n.p,{children:"To avoid potential code conflicts on future release updates, it is advised not to update the following integrated Canopy pages:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"pages/\n-- api/\n-- works/\n-- index.tsx\n-- map.tsx\n-- metadata.tsx\n-- search.tsx\n"})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Note:"})," Future considerations will be delivered upon for updating content within these pages."]}),"\n",(0,i.jsx)(n.h3,{children:"Environment Variables"}),"\n",(0,i.jsxs)(n.p,{children:["When you are ready to deploy your site, you need to modify the ",(0,i.jsx)(n.code,{children:".env"})," to reflect how your site is hosted.components"]}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"NEXT_PUBLIC_URL"})," variable is used to declare the canonical URL of your site. This base path is critical to routing of works in Canopy and SEO."]}),"\n",(0,i.jsxs)(n.p,{children:["If you plan to howst your site in subdirectory or subdomain, you will need to set the ",(0,i.jsx)(n.code,{children:"NEXT_PUBLIC_BASE_PATH"})," to reflect this."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'NEXT_PUBLIC_URL = "https://canopy-iiif.vercel.app"\nNEXT_PUBLIC_BASE_PATH = ""\n'})})]})}n.default=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.jsx)(s,Object.assign({},e,{children:(0,i.jsx)(r,e)}))}}},function(e){e.O(0,[774,412,409,971,118,602,888,179],function(){return e(e.s=7209)}),_N_E=e.O()}]);