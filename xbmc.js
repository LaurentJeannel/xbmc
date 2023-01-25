exports.action = function (data) {
try{
var listfilm={"jsonrpc": "2.0", "method": "VideoLibrary.GetMovies", "params": { "filter": {"field": "playcount", "operator": "is", "value": "0"}, "properties" : ["art", "rating", "thumbnail", "playcount", "file"], "sort": { "order": "ascending", "method": "label", "ignorearticle": false } }, "id": "libMovies"}

var xbmc_api_url='http://127.0.0.1:7979/jsonrpc';

JarvisIA.reco=JarvisIA.reco.replace(new RegExp('â', 'ig'),"a")
JarvisIA.reco=JarvisIA.reco.replace(new RegExp('à', 'ig'),"a")
JarvisIA.reco=JarvisIA.reco.replace(new RegExp('é', 'ig'),"e")
JarvisIA.reco=JarvisIA.reco.replace(new RegExp('è', 'ig'),"e")
JarvisIA.reco=JarvisIA.reco.replace(new RegExp('â', 'ig'),"a")
JarvisIA.reco=JarvisIA.reco.replace(new RegExp('-', 'ig')," ")
JarvisIA.reco=JarvisIA.reco.replace(new RegExp('-', 'ig')," ")
JarvisIA.reco=JarvisIA.reco.replace(new RegExp('ème', 'ig'),"e")
JarvisIA.reco=JarvisIA.reco.replace(new RegExp('eme', 'ig'),"e")
JarvisIA.reco=JarvisIA.reco.replace(new RegExp('  ', 'ig')," ")


var sendJSONRequest = function (url, reqJSON, callback) {
	var request = require('request');
    request({
            'uri': url,
            'method': 'POST',
			'timeout': 3000,
            'json': reqJSON
        },
        function (err, response, json) {
            if (err || response.statusCode != 200) {
               console.log(err);return
            }
            callback(json);
        });
}


var work=function(){
if(data.valuexbmc=="right"){var send={"jsonrpc": "2.0", "method": "Input.Right", "params": {}, "id": 1};
sendJSONRequest(xbmc_api_url, send, function (result) {});return
}
if(data.valuexbmc=="left"){var send={"jsonrpc": "2.0", "method": "Input.Left", "params": {}, "id": 1};
sendJSONRequest(xbmc_api_url, send, function (result) {});return
}
if(data.valuexbmc=="up"){var send={"jsonrpc": "2.0", "method": "Input.Up", "params": {}, "id": 1};
sendJSONRequest(xbmc_api_url, send, function (result) {});return
}
if(data.valuexbmc=="down"){var send={"jsonrpc": "2.0", "method": "Input.Down", "params": {}, "id": 1};
sendJSONRequest(xbmc_api_url, send, function (result) {});return
}
if(data.valuexbmc=="home"){var send={"jsonrpc": "2.0", "method": "Input.Home", "params": {}, "id": 1};
sendJSONRequest(xbmc_api_url, send, function (result) {});return
}
if(data.valuexbmc=="back"){var send={"jsonrpc": "2.0", "method": "Input.Back", "params": {}, "id": 1};
sendJSONRequest(xbmc_api_url, send, function (result) {});return
}
if(data.valuexbmc=="select"){var send={"jsonrpc": "2.0", "method": "Input.Select", "params": {}, "id": 1};
sendJSONRequest(xbmc_api_url, send, function (result) {});return
}
if(data.valuexbmc=="stop"){var send={"jsonrpc":"2.0","id":1,"method":"Player.Stop","params":{"playerid":1}};
sendJSONRequest(xbmc_api_url, send, function (result) {});return
}
if(data.valuexbmc=="pause"){var send={"jsonrpc":"2.0","method":"Player.PlayPause","params":{"playerid":1},"id":1};
sendJSONRequest(xbmc_api_url, send, function (result) {});return
}

if(data.valuexbmc=="playfilm"){

	var reg="/"+data.txtxmbc+"(.+)/i" ; var rgxp = eval(reg) ; 
	var temp1 = JarvisIA.reco.match(rgxp) ; var temp1=temp1[1].trim();console.log("on cherche :*"+temp1+'*')
	if(temp1==""){console.log('rien'); return}
		
		if(listefilmxbmc.indexOf(temp1)>-1){
			console.log("nom : ",listefilmxbmc.indexOf(temp1),"place ",listefilmxbmc.indexOf(temp1)+1,listefilmxbmc[listefilmxbmc.indexOf(temp1)],listefilmxbmc[listefilmxbmc.indexOf(temp1)+1])
			var send={ "jsonrpc": "2.0", "method": "Player.Open", "params": { "item": { "movieid": '' }}, "id": 1 }
			send.params.item.movieid=listefilmxbmc[listefilmxbmc.indexOf(temp1)+1]
			sendJSONRequest(xbmc_api_url, send, function (result) {});return
		}
		else{
			if(typeof levenshtein==='undefined'){ levenshtein=require('levenshtein') }
		  
			for(var i=0;i<listefilmxbmc.length;i++){
  				var levi=levenshtein(listefilmxbmc[i],temp1)
  				var querylengthlevi=temp1.length
                var concordancelevi=(levi*100)/listefilmxbmc[i].length;//console.log(concordancelevi)
                if ( (concordancelevi<20) ){console.log("trouvé en levi : "+concordancelevi+" "+listefilmxbmc[i],"**",temp1,listefilmxbmc.indexOf(listefilmxbmc[i]))
					console.log( listefilmxbmc[listefilmxbmc.indexOf(listefilmxbmc[i])])  
					var send={ "jsonrpc": "2.0", "method": "Player.Open", "params": { "item": { "movieid": "" }}, "id": 1 }
					//send.params.item.file='smb://famille-pc/film/'+listefilmxbmc[i]+".avi";console.log(send)
					send.params.item.movieid=listefilmxbmc[listefilmxbmc.indexOf(listefilmxbmc[i])+1];console.log(send)
					sendJSONRequest(xbmc_api_url, send, function (result) {console.log(result)})
					return
				}		
  		  }//fin for
	}//fin else
return
}
//affiche les films
if(data.valuexbmc=="showfilm"){
	var params1={"jsonrpc":"2.0","method":"GUI.ActivateWindow","params":{"window":"video","parameters":["videodb://1/2"]},"id":"1"};
		sendJSONRequest(xbmc_api_url, params1, function (result) {
			var params2={ "jsonrpc": "2.0", "method": "Input.ExecuteAction", "params": {"action": "left"}, "id": 1 };
				sendJSONRequest(xbmc_api_url, params2, function (result) {
					var params3={ "jsonrpc": "2.0", "method": "Input.ExecuteAction", "params": {"action": "firstpage"}, "id": 1 };
					sendJSONRequest(xbmc_api_url, params3, function (result) {console.log(result)});return	
				})
	})
}


}//fin fnct work		
 
if(typeof listefilmxbmc==="undefined"){
	var listefilmxbmc=[]

	sendJSONRequest(xbmc_api_url, listfilm, function (result) {

	for (var i = 0; i <result.result.limits['end']; i++) {
	
try{	
var v=result.result.movies[i];
console.log(v)
var temp=v['label'];
temp=temp.toLowerCase().trim()
temp=temp.split('/');
var templength=temp.length
var tempmov=temp[templength-1]
tempmov=tempmov.split('.')
tempmov=tempmov[0].trim()
tempmov=tempmov.replace(new RegExp('é', 'ig'),"e")
tempmov=tempmov.replace(new RegExp('è', 'ig'),"e")
tempmov=tempmov.replace(new RegExp('â', 'ig'),"a")
tempmov=tempmov.replace(new RegExp('à', 'ig'),"a")
tempmov=tempmov.replace(new RegExp('-', 'ig')," ")
tempmov=tempmov.replace(new RegExp('-', 'ig')," ")
tempmov=tempmov.replace(new RegExp('ème', 'ig'),"e")
tempmov=tempmov.replace(new RegExp('eme', 'ig'),"e")
//tempmov=tempmov.replace(new RegExp('.', 'ig')," ")
tempmov=tempmov.replace(new RegExp('  ', 'ig')," ")

listefilmxbmc.push(tempmov);listefilmxbmc.push(v['movieid'])
}catch(err){console.log(err)}	

	}			
	console.log(listefilmxbmc,"eeeeeeeeee",JarvisIA.reco);work()
});

}//fin undefined

else{work();console.log('!!!!!!!!!!!')}
}catch(err){console.log(err);return false}
}
