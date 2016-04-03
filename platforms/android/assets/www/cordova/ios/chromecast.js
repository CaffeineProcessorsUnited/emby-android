define(["appSettings","events","jQuery"],function(e,t,n){function a(){function t(t){t=Object.assign(t,{userId:Dashboard.getCurrentUserId(),deviceId:ApiClient.deviceId(),accessToken:ApiClient.accessToken(),serverAddress:ApiClient.serverAddress(),receiverName:v||h});var n=e.maxChromecastBitrate();n&&(t.maxBitrate=n),require(["chromecasthelpers"],function(e){e.getServerAddress(ApiClient).then(function(e){t.serverAddress=e,a(t)})})}function a(e){var t=JSON.stringify(e);o.sendMessage(t)}function i(){var e=o.devices||{},t=[];for(var n in e){var a=e[n];t.push({name:a.friendlyName,deviceName:a.friendlyName,playerName:h,playableMediaTypes:["Audio","Video"],isLocalPlayer:!1,id:a.id,supportedCommands:["VolumeUp","VolumeDown","Mute","Unmute","ToggleMute","SetVolume","SetAudioStreamIndex","SetSubtitleStreamIndex","DisplayContent","SetRepeatMode","EndSession"]})}return Promise.resolve(t)}function r(){var e=g.lastPlayerData||{};return e=e.PlayState||{},null==e.VolumeLevel?100:e.VolumeLevel}function s(e){if("playbackerror"==e.type){var t=e.data;setTimeout(function(){Dashboard.alert({message:Globalize.translate("MessagePlaybackError"+t),title:Globalize.translate("HeaderPlaybackError")})},300)}else"connectionerror"==e.type?setTimeout(function(){Dashboard.alert({message:Globalize.translate("MessageChromecastConnectionError"),title:Globalize.translate("HeaderError")})},300):e.type&&0==e.type.indexOf("playback")&&Events.trigger(C,e.type,[e.data])}function u(e){s("string"==typeof e?JSON.parse(e):e)}function c(){t({options:{},command:"Identify"})}function l(){m(),MediaController.removeActivePlayer(h)}function m(){g.lastPlayerData={}}function d(e,t){e&&o.disconnect(),m(),v=null,t||(y=null)}function p(e,t){var n=i().filter(function(t){return t.getId()==e})[0];n?g.tryPair(e):t&&setTimeout(function(){p(e,!1)},2e3)}function f(){var e=y;e&&setTimeout(function(){p(e,!0)},0)}var y,v,g=this,h="Chromecast",I="2D4B1DA3";g.name=h,g.getItemsForPlayback=function(e){var t=Dashboard.getCurrentUserId();return e.Ids&&1==e.Ids.split(",").length?new Promise(function(n){ApiClient.getItem(t,e.Ids.split(",")).then(function(e){n({Items:[e],TotalRecordCount:1})})}):(e.Limit=e.Limit||100,e.ExcludeLocationTypes="Virtual",ApiClient.getItems(t,e))};var C={};Events.on(C,"playbackstart",function(e,t){var n=g.getPlayerStateInternal(t);Events.trigger(g,"playbackstart",[n])}),Events.on(C,"playbackstop",function(e,t){var n=g.getPlayerStateInternal(t);Events.trigger(g,"playbackstop",[n]),g.lastPlayerData={}}),Events.on(C,"playbackprogress",function(e,t){var n=g.getPlayerStateInternal(t);Events.trigger(g,"positionchange",[n])}),g.play=function(e){Dashboard.getCurrentUser().then(function(){e.items?g.playWithCommand(e,"PlayNow"):g.getItemsForPlayback({Ids:e.ids.join(",")}).then(function(t){e.items=t.Items,g.playWithCommand(e,"PlayNow")})})},g.playWithCommand=function(e,n){return e.items?(e.items=e.items.map(function(e){return{Id:e.Id,Name:e.Name,Type:e.Type,MediaType:e.MediaType,IsFolder:e.IsFolder}}),void t({options:e,command:n})):void ApiClient.getItem(Dashboard.getCurrentUserId(),e.ids[0]).then(function(t){e.items=[t],g.playWithCommand(e,n)})},g.unpause=function(){t({command:"Unpause"})},g.pause=function(){t({command:"Pause"})},g.shuffle=function(e){var t=Dashboard.getCurrentUserId();ApiClient.getItem(t,e).then(function(e){g.playWithCommand({items:[e]},"Shuffle")})},g.instantMix=function(e){var t=Dashboard.getCurrentUserId();ApiClient.getItem(t,e).then(function(e){g.playWithCommand({items:[e]},"InstantMix")})},g.canQueueMediaType=function(e){return"Audio"==e},g.queue=function(e){g.playWithCommnd(e,"PlayLast")},g.queueNext=function(e){g.playWithCommand(e,"PlayNext")},g.stop=function(){t({command:"Stop"})},g.displayContent=function(e){t({options:e,command:"DisplayContent"})},g.mute=function(){t({command:"Mute"})},g.unMute=function(){g.setVolume(r()+2)},g.toggleMute=function(){var e=g.lastPlayerData||{};e=e.PlayState||{},e.IsMuted?g.unMute():g.mute()},g.getTargets=function(){return i()},g.seek=function(e){e=parseInt(e),e/=1e7,t({options:{position:e},command:"Seek"})},g.setAudioStreamIndex=function(e){t({options:{index:e},command:"SetAudioStreamIndex"})},g.setSubtitleStreamIndex=function(e){t({options:{index:e},command:"SetSubtitleStreamIndex"})},g.nextTrack=function(){t({options:{},command:"NextTrack"})},g.previousTrack=function(){t({options:{},command:"PreviousTrack"})},g.beginPlayerUpdates=function(){},g.endPlayerUpdates=function(){},g.volumeDown=function(){t({options:{},command:"VolumeDown"})},g.setRepeatMode=function(e){t({options:{RepeatMode:e},command:"SetRepeatMode"})},g.volumeUp=function(){t({options:{},command:"VolumeUp"})},g.setVolume=function(e){e=Math.min(e,100),e=Math.max(e,0),t({options:{volume:e},command:"SetVolume"})},g.getPlayerState=function(){return new Promise(function(e){var t=g.getPlayerStateInternal();e(t)})},g.lastPlayerData={},g.getPlayerStateInternal=function(e){return e=e||g.lastPlayerData,g.lastPlayerData=e,e},g.tryPair=function(e){return o.selectDevice(e.id).then(function(){var t=function(){y=e.id,v=e.name,setTimeout(c,2e3)};return o.joinApplication().then(t,function(){return o.launchApplication().then(t)})})},g.endSession=function(){g.stop(),setTimeout(function(){d(!0,!1)},1e3)},document.addEventListener("resume",f,!1),o.scanForDevices(I),n(o).on("disconnectWithError",l),n(o).on("deviceDidGoOffline",function(e,t){t.id==y&&l()}),n(o).on("receiveMessage",function(e,t){u(t)})}var o=cordova.require("fw-cordova-chromecast.FWChromecast");MediaController.registerPlayer(new a)});