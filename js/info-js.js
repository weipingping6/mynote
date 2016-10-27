// JavaScript Document
$(function(){
  self.app.changeinfo();
  self.app.setleft();
  self.app.changeItem();
})
var self={};
self.tools={};
self.tools.getStyle=function(obj,attr){
  return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr]
}

self.ui={};
self.ui.move=function(obj,json){
  clearInterval(obj.timer);
  obj.timer=setInterval(function(){	
	for(var attr in json){
	  var cur=parseInt(self.tools.getStyle(obj,attr));
	  var speed=(json[attr]-cur)/8;
	  speed=speed>0?Math.ceil(speed):Math.floor(speed);	
	  if(cur==json[attr]){clearInterval(obj.timer);}	
	  else{
	    obj.style[attr]=cur+speed+'px';
	  }
	}
  },30)
}


self.app={};
self.app.changeinfo=function(){
  $('#menu').find('.ball').click(function(){
	$('#menu').find('.ball').eq($(this).index()).addClass('on').siblings().removeClass('on');
	$('#menu').find('.detail').hide().eq($(this).index()).show();
  })
}
self.app.setleft=function(){
  var $wlist=$('#work').find('.w-list');
  for(var i=0;i<$wlist.length;i++){
    $wlist.eq(i).css('left',i*46+'px')
  }
}
self.app.changeItem=function(){
  var $wlist=$('#work').find('.w-list');
  $wlist.attr('bes',true)
  $wlist.click(function(){
	$wlist.find('p').css('font-size','22px');
	$wlist.find('p').css('color','rgba(255,255,255,0.7)');
	self.ui.move($(this).find('p').get(0),{'font-size':24}) 
	$(this).find('p').get(0).style.color='rgba(255,255,255,1)';
	if($(this).attr('bes')=='true'){  
	  for(var i=$(this).index()+1;i<$wlist.length;i++){
		self.ui.move($wlist.get(i),{'left':$('#work').width()-($wlist.length-i)*46})
		$wlist.eq(i).attr('bes',false);
	  }
	}
	else{
	  for(var i=0;i<$(this).index()+1;i++){
		self.ui.move($wlist.get(i),{'left':i*46})
		$wlist.eq(i).attr('bes',true); 
	  }
	}
  })
}
