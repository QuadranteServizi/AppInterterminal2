function init() {
	document.addEventListener("deviceready", deviceReady, true);
  document.addEventListener("offline", onOffline, false);
	delete init;
}
//Funzioni generiche

function deviceReady() {
  window.location.replace("cercauti.html"); 
}
function onOffline() {
  window.location.replace("offline.html");
}

function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}

function tipodanno() {
             var data = {
                  "file": "",
                  "tipo":""
                };
            
             data = $(this).serialize() + "&" + $.param(data);
                $.ajax({
                  type: "GET",
                  dataType: "json",
                  url: "http://interterminal.quadranteservizi.it/danni/app/danniuti.php?visualizzadanniarea=1&uti="+getUrlVars()["uti"]+"&area="+getUrlVars()["area"], 
                 
                  success: function(data) {
                    var dataLength = data.length;
                    for (var i = 0; i < 10; i++) {
						if(data[i]){
							$('#'+data[i]["tipo"]).css("background","url('http://interterminal.quadranteservizi.it/danni/immagini/"+data[i]["file"]+"') center center");
							$('#'+data[i]["tipo"]).css("background-size", "contain");
						}
						
						$('#'+i).removeClass( "ui-link");
            			$('#'+i).css("text-color","#FFF");
						$('#'+i).css('float','left'); 
						$('#'+i).css('border','solid');
						$('#'+i).css('text-align','center');
						$('#'+i).css('display','table-cell');
						$('#'+i).css('text-valign','middle');
						$('#'+i).css('text-decoration','none');
						//$('#'+i).attr('onclick','fotodanno.html?uti='+ getUrlVars()["uti"]+ '&area='+ getUrlVars()["area"]+'&tipo='+i);
						$('#'+i+' a').attr('href','fotodanno.html?uti='+ getUrlVars()["uti"]+ '&area='+ getUrlVars()["area"]+'&tipo='+i);	
						
						$(".click").click(function(){
							 window.location=$(this).find("a").attr("href");
							 return false;
							});
						
						if($(window).width()<400){
							$('#'+i).css('width','90%');
							$('#'+i).css('height',$(window).height()/4+"px");
							$('#'+i).css('line-height',$(window).height()/4+"px");	
						}else 
						if($(window).width()>400 && $(window).width()<700){
							$('#'+i).css('width','25%');	
							$('#'+i).css('height',$(window).height()/3+"px");
							$('#'+i).css('line-height',$(window).height()/3+"px");	
						}else 
						if($(window).width()>700 && $(window).width()<950){
							$('#'+i).css('width','32.50%');	
							$('#'+i).css('height',$(window).height()/4.6+"px");
							$('#'+i).css('line-height',$(window).height()/4.6+"px");	
						}else
						if($(window).width()>950 && $(window).width()<1900){
							$('#'+i).css('width','19.3%');	
							$('#'+i).css('height',$(window).height()/3+"px");
							$('#'+i).css('line-height',$(window).height()/3+"px");	
						}else
						if($(window).width()>1900){
							$('#'+i).css('width','19.3%');	
							$('#'+i).css('height',$(window).height()/3+"px");
							$('#'+i).css('line-height',$(window).height()/3+"px");	
						}
                    }
                  }
                });
                
				if($('#titolotipo')){
                //sistemo il titolo
                document.getElementById("titolotipo").innerHTML="<center><h1 class=\"ui-title\" role=\"heading\" aria-level=\"1\">UTI "+getUrlVars()["uti"] +" - Danni area '"+getUrlVars()["area"] +"'</h1></center>";
				}

}
		  