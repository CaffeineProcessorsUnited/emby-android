function makeReleaseCopies(e){shell.mkdir("-p",cdnFolder),Object.keys(releaseFiles).forEach(function(i){var r,s=releaseFiles[i],n=i.replace(/VER/g,e.newVersion),l=cdnFolder+"/"+n;/\.map$/.test(l)?(r=fs.readFileSync(s,"utf8").replace(/"file":"([^"]+)","sources":\["([^"]+)"\]/,'"file":"'+n.replace(/\.min\.map/,".min.js")+'","sources":["'+n.replace(/\.min\.map/,".js")+'"]'),fs.writeFileSync(l,r)):s!==l&&shell.cp("-f",s,l)})}function makeArchives(e,i){function r(i,r,s){if(e.preRelease)return void s();var n,l=require("archiver")("zip"),a=cdnFolder+"/"+i+"-md5.txt",m=fs.createWriteStream(cdnFolder+"/"+i+"-jquery-"+e.newVersion+".zip"),c=/VER/;m.on("close",s),m.on("error",function(e){throw e}),l.pipe(m),r=r.map(function(i){return"dist"+(c.test(i)?"/cdn":"")+"/"+i.replace(c,e.newVersion)}),n=e.exec("md5sum "+r.join(" "),"Error retrieving md5sum"),fs.writeFileSync(a,n),r.push(a),r.forEach(function(e){l.append(fs.createReadStream(e),{name:path.basename(e)})}),l.finalize()}function s(e){r("googlecdn",googleFilesCDN,e)}function n(e){r("mscdn",msFilesCDN,e)}e.chdir(e.dir.repo),s(function(){n(i)})}var fs=require("fs"),shell=require("shelljs"),path=require("path"),cdnFolder="dist/cdn",devFile="dist/jquery.js",minFile="dist/jquery.min.js",mapFile="dist/jquery.min.map",releaseFiles={"jquery-VER.js":devFile,"jquery-VER.min.js":minFile,"jquery-VER.min.map":mapFile},googleFilesCDN=["jquery.js","jquery.min.js","jquery.min.map"],msFilesCDN=["jquery-VER.js","jquery-VER.min.js","jquery-VER.min.map"];module.exports={makeReleaseCopies:makeReleaseCopies,makeArchives:makeArchives};