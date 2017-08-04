//拿数据
function shuju(obj){
	for(var i=0;i<data.length;i++){
		if(obj.innerHTML == data[i].name){
			// console.log(data[i].info);
			var sj = data[i].info;
			var arr = sj.split('[');
			for(var j=1;j<arr.length;j++){
				// console.log(arr[j].split(']'));
				str1 +='<p id="'+arr[j].split(']')[0]+'">'+arr[j].split(']')[1]+'</p>';
				lrcTxt.style.height = j*40+'px';
			}
		}
	}
	lrcTxt.innerHTML = str1;
	var ps = lrcTxt.getElementsByTagName('p');
	for(var i=0;i<ps.length;i++){
		ps[i].style.top = (i*40+160)+'px';
	}
}
//小球的运动比例
function qiuBili(){
	timer1 = setInterval(function(){
		console.log(1);
		var s = Math.floor(music.duration);
		var t = Math.floor(music.currentTime);
		var ju = (t/s)*parseFloat(chang);
		var ju1 = (t/s)*parseFloat(chang1);
		// console.log(ju);
		zyhGlobe.style.left = ju+'px';
		zyhProgress.style.width = ju+'px';
		globe.style.left = ju1+'px';
		progress.style.width = ju1+'px';
	},10);
}
//开始时间的运动函数
function startTime(){
	timer2 = setInterval(function(){
		var startT = Math.floor(music.currentTime%60);//秒
		var startS = Math.floor(music.currentTime%3600/60);//分
		// console.log(startT)
		if(startS){
			zyhtext[0].innerHTML= startS+':'+two(startT);
			startText.innerHTML = startS+':'+two(startT);
		}else{
			zyhtext[0].innerHTML= '0:'+two(startT);
			startText.innerHTML ='0:'+two(startT);
		}
	},0);
}
//处理00函数
function two(n){
	return n<10?'0'+n:''+n;
}
//下一曲切换函数
function tabPlay(){
	music.src = data[num].src;
	zyhImg.src = data[num].img;
	zyhHelena.innerHTML = data[num].name; 
	zyhSinger.innerHTML = data[num].people;
	zyhtext[1].innerHTML = data[num].time;
	musicImg.src = data[num].img;
	firstPs[0].innerHTML = data[num].name; 
	firstPs[1].innerHTML = data[num].people;
	endText.innerHTML = data[num].time;
	lrcTxt.innerHTML = '';
	str1 = '';
	shuju(zyhLike[num]);
	if(off){
		music.play();
	}else{
		music.pause();
	}
	zyhbg.style.backgroundImage = 'url('+data[num].img+')';
    for(var i=0;i<zyhLike1.length;i++){
        zyhLike1[i].style.backgroundColor = '';
    }
    zyhLike1[num].style.backgroundColor = 'rgba(0,120,215,0.8)';
}
