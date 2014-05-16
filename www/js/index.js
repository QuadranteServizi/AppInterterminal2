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