define(["datetime","cardBuilder","emby-itemscontainer","scrollStyles"],function(e,t){function r(){Dashboard.showLoadingMsg();var e={Limit:40,Fields:"AirTime,UserData,SyncInfo",UserId:Dashboard.getCurrentUserId(),ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb",EnableTotalRecordCount:!1};return ApiClient.getJSON(ApiClient.getUrl("Shows/Upcoming",e))}function n(e,t){t.then(function(t){var r=t.Items;e.querySelector(".noItemsMessage").style.display=r.length?"none":"block";var n=e.querySelector("#upcomingItems");o(n,r),Dashboard.hideLoadingMsg()})}function a(){return browserInfo.mobile&&AppInfo.enableAppLayouts}function i(){return a()?"overflowBackdrop":"backdrop"}function o(r,n){var o,s,l=[],c="",d=[];for(o=0,s=n.length;s>o;o++){var m=n[o],h="";if(m.PremiereDate)try{var u=e.parseISO8601Date(m.PremiereDate,!0);h=u.getDate()==(new Date).getDate()-1?Globalize.translate("Yesterday"):LibraryBrowser.getFutureDateText(u,!0)}catch(g){}h!=c?(d.length&&l.push({name:c,items:d}),c=h,d=[m]):d.push(m)}var p="";for(o=0,s=l.length;s>o;o++){var y=l[o];p+='<div class="homePageSection">',p+='<h1 class="listHeader">'+y.name+"</h1>",p+=a()?'<div is="emby-itemscontainer" class="itemsContainer hiddenScrollX">':'<div is="emby-itemscontainer" class="itemsContainer vertical-wrap">',p+=t.getCardsHtml({items:y.items,showLocationTypeIndicator:!1,shape:i(),showTitle:!0,preferThumb:!0,lazy:!0,showDetailsMenu:!0,centerText:!0,context:"home-upcoming",overlayMoreButton:!0,showParentTitle:!0}),p+="</div>",p+="</div>"}r.innerHTML=p,ImageLoader.lazyChildren(r)}return function(e){var t,a=this;a.preRender=function(){t=r()},a.renderTab=function(){Dashboard.showLoadingMsg(),n(e,t)}}});