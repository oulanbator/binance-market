(this["webpackJsonpbinance-markets"]=this["webpackJsonpbinance-markets"]||[]).push([[0],{12:function(e,t,n){},14:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n.n(r),a=n(7),s=n.n(a),i=(n(12),n(6)),l=n(2),o=n(0),j=function(e){var t=e.data,n=e.prevTicker,r=e.onSymbolClick,c=0;return n.forEach((function(e,n){e.symbol===t.symbol&&(c=e.priceChangePercent)})),Object(o.jsxs)("tr",{children:[Object(o.jsx)("td",{children:Object(o.jsx)("a",{href:"/#",onClick:function(e){e.preventDefault(),r(e.target.text)},children:t.symbol})}),Object(o.jsx)("td",{children:t.price}),t.variation>0?Object(o.jsx)("td",{className:"text-success",children:t.variation}):Object(o.jsx)("td",{className:"text-danger",children:t.variation}),Object(o.jsx)("td",{children:Math.round(1e3*t.longVariation)/1e3}),Object(o.jsx)("td",{children:c})]})},b=function(e){var t=e.data,n=e.prevTicker,r=e.onSymbolClick,c=[];return t.forEach((function(e,t){c.push(Object(o.jsx)(j,{data:e,prevTicker:n,onSymbolClick:r},t))})),Object(o.jsxs)("table",{id:"priceTable",className:"table",children:[Object(o.jsx)("thead",{children:Object(o.jsxs)("tr",{children:[Object(o.jsx)("th",{children:"Symbol"}),Object(o.jsx)("th",{children:"Price"}),Object(o.jsx)("th",{children:"Last %"}),Object(o.jsx)("th",{children:Object(o.jsx)("span",{className:"golden",children:"Cumul %"})}),Object(o.jsx)("th",{children:"24h %"})]})}),Object(o.jsx)("tbody",{children:c})]})},d=function(e){var t=e.prices,n=e.title,c=e.prevTicker,a=e.onOpenChart;return Object(o.jsxs)(r.Fragment,{children:[Object(o.jsx)("h2",{children:n}),Object(o.jsx)(b,{data:t,prevTicker:c,onSymbolClick:a})]})},u=(n(14),function(){return Object(o.jsx)("div",{className:"spinner-border text-warning",role:"status",children:Object(o.jsx)("span",{className:"sr-only",children:"Loading..."})})}),h=function(e){var t=e.data,n=e.symbol,c=e.interval,a=r.useRef(null);return r.useEffect((function(){var e=window.LightweightCharts,r=e.createChart(a.current,{width:800,height:400,layout:{backgroundColor:"#FFF",textColor:"#000"},grid:{vertLines:{color:"rgba(197, 203, 206, 0.5)"},horzLines:{color:"rgba(197, 203, 206, 0.5)"}},crosshair:{mode:e.CrosshairMode.Normal},rightPriceScale:{borderColor:"rgba(197, 203, 206, 0.8)"},timeScale:{borderColor:"rgba(197, 203, 206, 0.8)"}}).addCandlestickSeries({upColor:"rgba(0, 255, 0, 1)",downColor:"rgba(255, 0, 0, 1)",borderDownColor:"rgba(255, 0, 0, 1)",borderUpColor:"rgba(0, 255, 0, 1)",wickDownColor:"rgba(255, 0, 0, 1)",wickUpColor:"rgba(0, 255, 0, 1)"});r.setData(t),new WebSocket("wss://stream.binance.com:9443/ws/"+n+"@kline_"+c).onmessage=function(e){var t=JSON.parse(e.data).k;r.update({time:t.t/1e3,open:t.o,high:t.h,low:t.l,close:t.c})}}),[t,n,c]),Object(o.jsx)("div",{id:"Chart",ref:a})},f=function(e){var t=e.onClose,n=e.symbol,c=r.useState(!0),a=Object(l.a)(c,2),s=a[0],i=a[1],j=r.useState(!1),b=Object(l.a)(j,2),d=b[0],f=b[1],O=r.useState([]),m=Object(l.a)(O,2),x=m[0],v=m[1],p=r.useState("5m"),g=Object(l.a)(p,2),y=g[0],C=g[1];r.useEffect((function(){fetch("/api/history/"+n+"/"+y).then((function(e){return e.json()})).then((function(e){e.errorStatus?f(!0):(v(e),i(!1))}))}),[n,y]);var S=function(e){e.preventDefault(),i(!0),C(e.target.innerText)};return Object(o.jsxs)("div",{id:"chartBox",children:[Object(o.jsx)("a",{href:"/#",onClick:function(e){e.preventDefault(),t()},id:"chartCloser",children:Object(o.jsx)("i",{className:"fas fa-times-circle"})}),s?Object(o.jsx)(u,{}):Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)("div",{id:"chartTitle",children:Object(o.jsxs)("h3",{children:[n," (",y,")"]})}),Object(o.jsx)(h,{data:x,symbol:n.toLowerCase(),interval:y}),Object(o.jsxs)("div",{id:"chartTimeframe",children:[Object(o.jsx)("button",{onClick:S,disabled:"1m"===y,children:"1m"}),Object(o.jsx)("button",{onClick:S,disabled:"5m"===y,children:"5m"}),Object(o.jsx)("button",{onClick:S,disabled:"15m"===y,children:"15m"}),Object(o.jsx)("button",{onClick:S,disabled:"1h"===y,children:"1h"}),Object(o.jsx)("button",{onClick:S,disabled:"1d"===y,children:"1d"})]})]}),d?Object(o.jsx)("h2",{children:"Error.. Try again.."}):null]})},O=function(e){var t=e.name,n=e.checked;return Object(o.jsxs)("div",{className:"form-check",children:[Object(o.jsx)("input",{className:"form-check-input",type:"radio",name:t,id:t,checked:n,readOnly:!0}),Object(o.jsx)("label",{className:"form-check-label",htmlFor:t,children:t})]})},m=function(e){var t=e.settings,n=e.onSettingsChange,c=e.minDelay,a=r.useState(t.delay/1e3),s=Object(l.a)(a,2),i=s[0],j=s[1],b=r.useState("USDT"),d=Object(l.a)(b,2),u=d[0],h=d[1];return Object(o.jsxs)("div",{className:"settingsBar",children:[Object(o.jsxs)("div",{className:"barHeader",children:[Object(o.jsx)("div",{children:Object(o.jsx)("h2",{children:"Settings"})}),Object(o.jsxs)("div",{className:"currentValues",children:[Object(o.jsxs)("div",{children:["Current symbol filter : ",t.symbol]}),Object(o.jsxs)("div",{children:["Current refresh delay : ",t.delay/1e3," secs"]})]})]}),Object(o.jsxs)("form",{className:"barItems",children:[Object(o.jsxs)("div",{className:"form-group setSymbol",onChange:function(e){h(e.target.name)},children:[Object(o.jsx)("label",{children:"Filter symbol pairs"}),Object(o.jsx)(O,{name:"USDT",checked:"USDT"===u}),Object(o.jsx)(O,{name:"BTC",checked:"BTC"===u})]}),Object(o.jsxs)("div",{className:"form-group setDelay",children:[Object(o.jsxs)("label",{htmlFor:"refreshDelayInput",className:"form-label",children:["Refresh prices (min : ",c/1e3," secs)"]}),Object(o.jsx)("input",{type:"text",id:"refreshDelayInput",className:"form-control",value:i,onChange:function(e){e.preventDefault(),j(e.target.value)}})]}),Object(o.jsx)("button",{className:"btn btn-info setSubmit",onClick:function(e){e.preventDefault(),n({delay:i,selectedSymbol:u})},children:"Set"})]})]})},x=function(e){var t=e.start,n=r.useState(0),c=Object(l.a)(n,2),a=c[0],s=c[1],i=r.useState(""),j=Object(l.a)(i,2),b=j[0],d=j[1];return r.useEffect((function(){var e=setInterval((function(){return s((function(e){return e+1}))}),1e3);return function(){return clearInterval(e)}}),[]),r.useEffect((function(){var e=Date.now()-t;if(console.log(e),e/1e3<60){var n=Math.round(e/1e3)+" s";d(n)}else if(e/1e3<3600){var r=Math.trunc(e/1e3/60),c=e-60*r*1e3,a=Math.round(c/1e3);d(r+"m "+a+"s")}else{var s=Math.trunc(e/1e3/60/60),i=e-3600*s*1e3,l=Math.trunc(i/1e3/60),o=i-60*l*1e3,j=Math.round(o/1e3);d(s+"h "+l+"m "+j+"s")}}),[a]),Object(o.jsxs)("div",{className:"titleBar golden",children:[Object(o.jsx)("div",{children:Object(o.jsx)("h1",{children:"Binance Market"})}),Object(o.jsx)("div",{className:"timeSpendDiv",children:Object(o.jsxs)("h3",{children:["Time spend : ",b]})})]})},v=3e3;var p=function(){var e=r.useState(!0),t=Object(l.a)(e,2),n=t[0],c=t[1],a=r.useState(0),s=Object(l.a)(a,2),j=s[0],b=s[1],u=r.useState("USDT"),h=Object(l.a)(u,2),O=h[0],p=h[1],g=r.useState(v),y=Object(l.a)(g,2),C=y[0],S=y[1],k=r.useState(0),N=Object(l.a)(k,2),D=N[0],T=N[1],w=r.useState([]),E=Object(l.a)(w,2),M=E[0],I=E[1],F=r.useState([]),L=Object(l.a)(F,2),V=L[0],W=L[1],U=r.useState([]),B=Object(l.a)(U,2),P=B[0],J=B[1],A=r.useState([]),R=Object(l.a)(A,2),z=R[0],H=R[1],_=r.useState(0),q=Object(l.a)(_,2),G=q[0],K=q[1],Q=r.useState(!1),X=Object(l.a)(Q,2),Y=X[0],Z=X[1],$=r.useState(""),ee=Object(l.a)($,2),te=ee[0],ne=ee[1];r.useEffect((function(){var e=setInterval((function(){return T((function(e){return e+1}))}),1e4);return K(Date.now()),function(){return clearInterval(e)}}),[]),r.useEffect((function(){var e=setInterval((function(){return b((function(e){return e+1}))}),C);return function(){return clearInterval(e)}}),[C]),r.useEffect((function(){fetch("https://api.binance.com/api/v3/ticker/24hr").then((function(e){return e.json()})).then((function(e){W(e),c(!1)}))}),[D]),r.useEffect((function(){fetch("https://api.binance.com/api/v3/ticker/price").then((function(e){return e.json()})).then((function(e){e.forEach((function(t,n){if(0===M.length)t.variation=0,t.longVariation=0;else{var r=M[n].price,c=100*(e[n].price-r)/r;t.variation=Math.round(1e3*c)/1e3;var a=M[n].longVariation+t.variation;t.longVariation=a}})),I(e)}))}),[j]),r.useEffect((function(){var e=Object(i.a)(M).filter((function(e){return!(!e.symbol.endsWith(O)||e.symbol.endsWith("UP"+O)||e.symbol.endsWith("DOWN"+O))})),t=Object(i.a)(M).filter((function(e){return!(!e.symbol.endsWith(O)||e.symbol.endsWith("UP"+O)||e.symbol.endsWith("DOWN"+O))}));e.sort((function(e,t){return e.longVariation<t.longVariation?1:-1})),t.sort((function(e,t){return e.longVariation>t.longVariation?1:-1})),J(e.slice(0,15)),H(t.slice(0,15))}),[M]);var re=function(e){ne(e),Z(!0)},ce={delay:C,symbol:O};return n?Object(o.jsx)("h1",{id:"initialLoading",children:"Loading data from binance API..."}):Object(o.jsxs)(r.Fragment,{children:[Y?Object(o.jsx)(f,{symbol:te,onClose:function(){Z(!1)}}):null,Object(o.jsx)(x,{start:G}),Object(o.jsx)(m,{settings:ce,onSettingsChange:function(e){e.delay>=3&&S(1e3*e.delay),p(e.selectedSymbol)},minDelay:v}),Object(o.jsxs)("div",{className:"container",children:[Object(o.jsxs)("div",{className:"row align-items-start filteredTables",children:[Object(o.jsx)("div",{className:"col-sm-6 championsTable",children:Object(o.jsx)(d,{title:"Champions",prices:P,prevTicker:V,onOpenChart:re})}),Object(o.jsx)("div",{className:"col-sm-6",children:Object(o.jsx)(d,{title:"Loosers",prices:z,prevTicker:V,onOpenChart:re})})]}),Object(o.jsx)(d,{title:"All Market",prices:M,prevTicker:V,onOpenChart:re})]})]})};s.a.render(Object(o.jsx)(c.a.StrictMode,{children:Object(o.jsx)(p,{})}),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.ce2d17f1.chunk.js.map