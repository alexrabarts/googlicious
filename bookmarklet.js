javascript:(function(global){var%20head=document.getElementsByTagName('head')[0];if(!head){head=document.createElement('head');document.appendChild(head);}%20var%20style=document.createElement('style');var%20styles='body%20{'+'background-color:%20#000;'+'color:%20#ccc;'+'font:%20.75em/1.5em%20Arial,%20sans-serif;%20/*%20EMs%20calculated%20with%20pxtoem.com%20*/'+'padding:%201.5em;'+'margin:%200;'+'}'+'.searchresult%20{'+'padding:%201.5em%200;'+'border-bottom:%201px%20solid%20#333;'+'}'+'.searchresult%20h3,%20.searchresult%20p%20{'+'margin:%200;'+'}'+'.searchresult%20h3%20a%20{'+'font:%201em%20Tahoma,%20serif;'+'color:#3273D0;'+'font-weight:%20bold;'+'font-size:%201em;'+'}'+'.searchresult%20.resultdesc%20b%20{'+'color:%20#fff;'+'}'+'.searchresult%20.resulturl%20{'+'color:%20#666;'+'font-size:%20.75em;'+'}'+'div.shell%20{'+'float:%20left;'+'width:%2030%;'+'margin-right:%201.5em;'+'}';style.type='text/css';head.appendChild(style);if(style.styleSheet){style.styleSheet.cssText=styles;}else{style.appendChild(document.createTextNode(styles));}%20var%20body='<form%20id="searchform"%20action="#">'+'<label%20for="searchquery">'+'<span%20class="caption">Googlicious:</span>'+'<input%20type="text"%20size="20"%20maxlength="255"%20title="Enter%20your%20keywords%20and%20click%20the%20search%20button"%20id="searchquery"%20name="searchquery"%20/>'+'</label>'+'<input%20type="submit"%20value="Search"%20/>'+'</form>';document.getElementsByTagName('body')[0].innerHTML=body;document.getElementById('searchform').onsubmit=function(e){e.preventDefault();var%20query=document.getElementById('searchquery').value;var%20googleScript=document.createElement('script');googleScript.src='http://ajax.googleapis.com/ajax/services/search/web?v=1.0&callback=processGoogle&q='+query;head.appendChild(googleScript);var%20deliciousScript=document.createElement('script');deliciousScript.src='http://feeds.delicious.com/v2/json/popular/'+query+'?count=10&plain=true&callback=processDelicious';head.appendChild(deliciousScript);};function%20processGoogle(res){res=res.responseData.results;results=[];var%20i,r,len=res.length;for(i=0;i<len;i++){r=res[i];results.push({title:r.titleNoFormatting,url:r.url,description:r.content});}%20appendResults(results);}%20function%20processDelicious(res){results=[];var%20i,r,len=res.length;for(i=0;i<len;i++){r=res[i];results.push({title:r.d,url:r.u,description:r.t.join(',%20')});}%20appendResults(results);}%20function%20appendResults(results){var%20shell=document.createElement('div');var%20html='';var%20len=results.length;var%20i,r;for(i=0;i<len;i++){r=results[i];html+='<div%20class="searchresult">'+'<h3><a%20href="'+r.url+'">'+r.title+'</a></h3>'+'<p%20class="resultdesc">'+r.description+'</p>'+'<p%20class="resulturl">'+r.url+'</p>'+'</div>';}%20shell.innerHTML=html;shell.className='shell';document.getElementsByTagName('body')[0].appendChild(shell);}%20global.processGoogle=processGoogle;global.processDelicious=processDelicious;})(this);