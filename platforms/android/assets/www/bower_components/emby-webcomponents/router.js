define(["loading","viewManager","skinManager","pluginManager","backdrop","browser","pageJs"],function(e,n,t,r,o,i,a){function c(){o.clear(),e.show(),H.connect().then(function(n){u(n,e)})}function u(e,n){switch(e.State){case MediaBrowser.ConnectionState.SignedIn:n.hide(),t.loadUserSkin();break;case MediaBrowser.ConnectionState.ServerSignIn:e.ApiClient.getPublicUsers().then(function(n){n.length?V.showLocalLogin(e.ApiClient,e.Servers[0].Id):V.showLocalLogin(e.ApiClient,e.Servers[0].Id,!0)});break;case MediaBrowser.ConnectionState.ServerSelection:V.showSelectServer();break;case MediaBrowser.ConnectionState.ConnectSignIn:V.showWelcome();break;case MediaBrowser.ConnectionState.ServerUpdateNeeded:require(["alert"],function(e){e(Globalize.translate("core#ServerUpdateNeeded",'<a href="https://emby.media">https://emby.media</a>')).then(function(){V.showSelectServer()})})}}function s(e,n,t,r){var o=t.contentPath||t.path;if(0!=o.toLowerCase().indexOf("http")&&0!=o.indexOf("file:")&&(0!=o.indexOf("/")&&(o="/"+o),o=k()+o),e.querystring&&t.enableContentQueryString&&(o+="?"+e.querystring),t.enableCache!==!1){var i=z[o];if(i)return void S(e,t,i,r)}o+=-1==o.indexOf("?")?"?":"&",o+="v="+W;var a=new XMLHttpRequest;a.onload=a.onerror=function(){if(this.status<400){var i=this.response;t.enableCache!==!1&&(z[o.split("?")[0]]=i),S(e,t,i,r)}else n()},a.onerror=n,a.open("GET",o,!0),a.send()}function l(e,n,t){v(e,t,function(){d(e,n,t)})}function d(e,n,t){var r=function(r){p(e,n,t,r)};require(t.dependencies||[],function(){t.controller?require([t.controller],r):r()})}function f(){var e=N;e&&(e.cancel=!0)}function p(e,t,r,o){f();var i=e.isBack,a={url:k()+e.path,transition:r.transition,isBack:i,state:e.state,type:r.type,controllerFactory:o,options:{supportsThemeMedia:r.supportsThemeMedia||!1},autoFocus:r.autoFocus};N=a;var c=function(){"string"==typeof r.path?s(e,t,r,a):t()};return i||"home"==r.type?void n.tryRestoreView(a).then(function(){Q={route:r,path:e.path}},c):void c()}function h(n){e.show(),require(["connectionManager"],function(t){H=t,H.connect().then(function(t){A=t,e.hide(),n=n||{},a({click:n.click!==!1,hashbang:n.hashbang!==!1,enableHistory:g()})})})}function g(){return i.xboxOne?!1:!0}function m(){return a.enableNativeHistory()}function v(n,r,o){var i=A;if(i&&(A=null,i.State!=MediaBrowser.ConnectionState.SignedIn))return void u(i,e);{var a=H.currentApiClient();n.pathname.toLowerCase()}return a&&a.isLoggedIn()?void(n.isBack&&r.isDefaultRoute?w():r.isDefaultRoute?t.loadUserSkin():o()):void(r.anonymous?o():c())}function w(){t.loadUserSkin(),P||(P=!0,t.getCurrentSkin().showBackMenu().then(function(){P=!1}))}function S(e,t,r,o){r=Globalize.translateDocument(r,t.dictionary),o.view=r,n.loadView(o),Q={route:t,path:e.path},e.handled=!0}function b(){var e=window.location.pathname||"",n=e.lastIndexOf("/");return e=-1!=n?e.substring(n):"/"+e,e&&"/"!=e||(e="/index.html"),e}function k(){return J}function y(e){return function(n,t){l(n,t,e)}}function C(){var e=Q?Q.path||"":"",n=e.indexOf("?"),t="";return-1!=n&&(t=e.substring(n)),t||""}function L(e,n){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var t="[\\?&]"+e+"=([^&#]*)",r=new RegExp(t,"i"),o=r.exec(n||C());return null==o?"":decodeURIComponent(o[1].replace(/\+/g," "))}function B(){a.back()}function x(){var e=I();return e?"home"==e.type?!1:a.canGoBack():!1}function M(e,n){return new Promise(function(t){var r=k();return e=e.replace(r,""),Q&&Q.path==e&&"home"!=Q.route.type?void t():(a.show(e,n),void setTimeout(t,500))})}function I(){return Q?Q.route:null}function R(){var e=t.getCurrentSkin(),n=e.getRoutes().filter(function(e){return"home"==e.type})[0];return M(r.mapRoute(e,n))}function T(e){"string"==typeof e?Emby.Models.item(e).then(T):t.getCurrentSkin().showItem(e)}function O(e){t.getCurrentSkin().setTitle(e)}function E(){var e=t.getCurrentSkin(),n=e.getRoutes().filter(function(e){return"video-osd"==e.type})[0];return M(r.mapRoute(e,n))}function U(e,n){a(e,y(n)),X.push(n)}function q(){return X}function D(e){"full"==e||e==Emby.TransparencyLevel.Full?(o.clear(!0),document.documentElement.classList.add("transparentDocument")):"backdrop"==e||e==Emby.TransparencyLevel.Backdrop?(o.externalBackdrop(!0),document.documentElement.classList.add("transparentDocument")):(o.externalBackdrop(!1),document.documentElement.classList.remove("transparentDocument"))}function F(e,n,t){e.navigate=!1,a.pushState(e,n,t)}function G(){var e=window.location.pathname.replace(b(),"");e.lastIndexOf("/")==e.length-1&&(e=e.substring(0,e.length-1)),a.base(e)}var H,N,A,P,V={showLocalLogin:function(e,n,t){var r=t?"manuallogin":"login";M("/startup/"+r+".html?serverid="+n)},showSelectServer:function(){M("/startup/selectserver.html")},showWelcome:function(){M("/startup/welcome.html")},showSettings:function(){M("/settings/settings.html")}},z={},W=(new Date).getTime(),J=window.location.href.split("?")[0].replace(b(),"");J=J.split("#")[0],J.lastIndexOf("/")==J.length-1&&(J=J.substring(0,J.length-1));var Q,X=[];return G(),V.addRoute=U,V.param=L,V.back=B,V.show=M,V.start=h,V.baseUrl=k,V.canGoBack=x,V.current=I,V.redirectToLogin=c,V.goHome=R,V.showItem=T,V.setTitle=O,V.setTransparency=D,V.getRoutes=q,V.pushState=F,V.enableNativeHistory=m,V.showVideoOsd=E,V.TransparencyLevel={None:0,Backdrop:1,Full:2},V});