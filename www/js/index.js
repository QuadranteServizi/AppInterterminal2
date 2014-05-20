function init() {
	document.addEventListener("offline", onOffline, false);
	document.addEventListener("deviceready", deviceReady, true);
	delete init;
}
//Funzioni generiche

function deviceReady() {
  window.location.replace("entrata.html"); 
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

function visualizzadanni(uti){
    var data = {
              "area": "",
              "tipo":""
            };
         var areacolore = {
              0: "graffiato",
              1:"strappato",
              2:"staccato",
              3:"ammaccato",
              4:"rotto",
              5:"bucato",
              6:"piegato",
              7:"assente",
              8:"fuoriuso",
              9:"deformato"
            };
         data = $(this).serialize() + "&" + $.param(data);
            $.ajax({
              type: "GET",
              dataType: "json",
              url: "http://interterminal.quadranteservizi.it/danni/app/danniuti.php?visualizzadanni=1&uti="+uti, //Relative or absolute path to response.php file
             
              success: function(data) {
                var dataLength = data.length;
                for (var i = 0; i < dataLength; i++) {
                    tipo_css=areacolore[data[i]["tipo"]];
                    $('area[title="'+data[i]["area"]+'"]').attr('alt', ''+tipo_css);
                }
              }
            });
          // colori();

}

			function colori() {
			//colora le aree in base al danno
				var mappedImages =  $("img[usemap]");	  
				mappedImages.each(function(index,img){
  				var $img = $(img);
  				var $imgmap = $("<div id='danni_div' class='imgmap'></div>");
  				$img.after($imgmap);
  				var imgheight = $img.height();
  				var imgwidth = $img.width();
  				var imgPosition = $img.position();
  				$imgmap.css(
  				   {
  				   top:imgPosition.top+"px",
  				   left:imgPosition.left+"px",
  				   height:imgheight+"px",
  				   width:imgwidth+"px"
  				   });
  				//alert("ok");	
  				var mapName = $img.attr("usemap").replace("#","");
  				var circles = $("map[name='"+mapName+"'] area[shape='rect']");
  				circles.each(function(index,circle){
  				   var $circle = $(circle);
  				   var attrs = $circle.attr("coords").split(",");
  				   var alt = $circle.attr("alt");
  				   var $newa = $("<a class='mapcircle "+alt+"' href='"+$circle.attr("href")+"' alt='"+alt+"'>"+"</a>");
  				   $imgmap.append($newa);
  				   var size = (attrs[2])+'px'
  				   $newa.css(
  						{
  						left:attrs[0]+'px',
  						top:attrs[1]+'px',
  						height:attrs[3]-attrs[1],
  						width:attrs[2]-attrs[0]
  				   });	   
  			  });
			 });	
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
						//$('#'+i+' a').attr('href','fotodanno.html?uti='+ getUrlVars()["uti"]+ '&area='+ getUrlVars()["area"]+'&tipo='+i);	
						
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

function fotodanno(){
         setTimeout(function(){
         var data = {
              "id_danno":"",
              "area":"",
              "tipo": "",
              "file":"",
              "data":"",
              "ora":""
            };
            
            var array_descr = ["graffiato",	  "strappato"];
            var tuttelefoto="";
        
        
         data = $(this).serialize() + "&" + $.param(data);
            $.ajax({
              type: "GET",
              dataType: "json",
              url: "http://interterminal.quadranteservizi.it/danni/app/danniuti.php?visualizzafoto=1&uti="+getUrlVars()["uti"]+"&area="+getUrlVars()["area"]+"&tipo="+getUrlVars()["tipo"], //Relative or absolute path to response.php file
              
              success: function(data) {
                var dataLength = data.length;
                for (var i = 0; i < dataLength; i++) {
                    descr_danno=array_descr[data[i]["tipo"]];
                    tuttelefoto=tuttelefoto+('<br>										<img width="20%" src="http://interterminal.quadranteservizi.it/danni/immagini/'+data[i]["file"]+'"><br><p><b>Danno: </b>Area '+data[i]["area"]+" "+descr_danno+" <b>Data:</b> "+data[i]["data"]+" <b>Ora:</b> "+data[i]["ora"]+'&nbsp;<a href="http://interterminal.quadranteservizi.it/danni/app/danniuti.php?rimuovidanno=1&id_danno='+data[i]["id_danno"]+'">Rimuovi</a></p>');
                }	
                document.getElementById("danni").innerHTML=tuttelefoto;	
                if(dataLength==0){
                    document.getElementById("danni").innerHTML="<br>Nessun danno presente per quest'area.";
                
                //sistemo il titolo
                document.getElementById("titolotipo").innerHTML="<center><h1 class=\"ui-title\" role=\"heading\" aria-level=\"1\">UTI "+  getUrlVars()["uti"] +" - Danni area '"+getUrlVars()["area"] +"'</h1></center>";
                }
                }
                
              
            });
            return false;
            
            },700);

}

function rimuovidanno() {
             var data = {
                  "file": "",
                  "tipo":""
                };
            
             data = $(this).serialize() + "&" + $.param(data);
                $.ajax({
                  type: "GET",
                  dataType: "json",
                  url: "http://interterminal.quadranteservizi.it/danni/app/danniuti.php?rimuovidanno=1&uti="+getUrlVars()["uti"]+"&area="+getUrlVars()["area"], 
                 
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
		  