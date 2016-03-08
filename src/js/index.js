/**
 * This demo surport Chrome, FireFox, IE(>9)
 * IE(<9) do not surport function getElementsByClassName
 * IE(<10) do not surport transition
 */
window.onload = function(){
	var cur_index = 0,// current page index. start with 0.
		pages = document.getElementsByClassName("page"),// set of pages
		pages_len = pages.length,
		scroll_handling = false;
	
	sizing();
	
	window.addEventListener("resize",sizing);
	
	// only chrome surport mousewheel
	window.addEventListener("wheel",onWheel);
	
	document.body.addEventListener("keydown",function(e){
		var key_code = e.keyCode;
		
		if(key_code == 38){
			changePage("pre");
		}else if(key_code == 40){
			changePage("next");
		}
	});
	
	function onWheel(e){
		if(scroll_handling){
			return;
		}
		
		// hack: chrome(wheelDeltaY), firefox(deltaY)
		var deltaY = e.wheelDeltaY || (e.deltaY * -40);
		
		// set delay
		scroll_handling = true;
		window.setTimeout(function(){
			scroll_handling = false;
		}, 800);
		
		if(deltaY < 0){
			changePage("next");
		}else{
			changePage("pre");
		}
	}
	
	function changePage(act){
		var index = 0,
			page_wrap = document.getElementById("page_wrap"),
			current = document.getElementsByClassName("cur"),
			current_len = current.length;
		
		if(act === "next"){
			index = ++cur_index;// increase index
		}else if(act === "pre"){
			index = --cur_index;// decrease index
		}else{
			return;
		}
		
		// Validate index. Then change value of cur_index.
		if(index < 0){
			cur_index = 0;
			return;
		}else if(index >= pages_len){
			cur_index = pages_len-1;
			return;
		}else{
			cur_index = index;
		}
		
		page_wrap.style.top = (-index * 100) + "vh";
		
		if(current != undefined){
			for(; current_len--; ){
				current[current_len].className = current[current_len].className.replace(/ cur/,"");
			}
		}
		
		pages[index].className += " cur";
	}
	
	function sizing(){
		document.getElementById("page_wrap").style.height = (pages_len * 100) + "vh";
	}
}