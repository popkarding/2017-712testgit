var con = document.getElementById('con');
var Loading = document.getElementById('Loading');
con.style.opacity = 0.1;
con.style.filter = 'blur(9px)';
var zTimer = null;
var Num1 = 0.1;
var Num2 = 9;
zTimer = setInterval(fn,20);
function fn(){
	Num1+=0.008;
	Num2+=-0.08;
	if(Num1>=1&&Num2<=0){
		clearInterval(zTimer);
		Loading.style.display = 'none';
	}
	con.style.opacity = Num1;
	con.style.filter = 'blur('+Num2+'px)';
}
var zyhMusic = document.getElementById('zyhMusic');
var playLeft = document.getElementById('playLeft');
var goBack = document.getElementById('goBack');
var l = document.body.clientWidth || document.documentElement.clientWidth;
con.style.left = 0;
zyhMusic.style.left = l+'px';
playLeft.onclick = function(){
	con.style.transition = zyhMusic.style.transition = 'left 1s';
	con.style.left = -l+'px';
	zyhMusic.style.left = 0;
}
goBack.onclick = function(){
	con.style.transition = zyhMusic.style.transition = 'left 1s';
	con.style.left = 0;
	zyhMusic.style.left = l+'px';
}
var leftBg = document.getElementById('LeftBg');
var conLeft = document.getElementById('conLeft');
var rightBg = document.getElementById('RightBg');
var conRight = document.getElementById('conRight');
var leftLi = conLeft.getElementsByTagName('li');
var navs = conLeft.getElementsByTagName('a');
var divs = conLeft.getElementsByClassName('Playback');
leftLi[4].onclick = playLeft.onclick;
leftLi[0].onoff = false;
leftLi[0].onclick = function(){
	if(this.onoff){
		this.title = '最大化导航窗格';
		for(var i=0;i<navs.length;i++){
			navs[i].style.width = '';
		}
		for(var i=0;i<divs.length;i++){
			divs[i].style.transition = 'width 0.5s';
			divs[i].style.width = 0;
			divs[i].style.height = 0;
			var a = divs[i].firstElementChild;
			if(a){
				a.style.transition = 'opacity 0.5s';
				a.style.opacity = 0;
			}
		}
		leftBg.style.transition = conLeft.style.transition = 'width 0.5s';
		rightBg.style.transition = conRight.style.transition = 'width 0.5s';
		leftBg.style.width = conLeft.style.width = '';
		rightBg.style.width = conRight.style.width = '';
		this.onoff = false;
	}else{
		this.title = '最小化导航窗格';
		for(var i=0;i<navs.length;i++){
			navs[i].style.width = 25+'%';
		}
		for(var i=0;i<divs.length;i++){
			divs[i].style.transition = 'width 0.5s';
			divs[i].style.width = 60+'%';
			divs[i].style.height = this.offsetHeight+'px';
			var a = divs[i].firstElementChild;
			if(a){
				a.style.transition = 'opacity 0.5s';
				a.style.opacity = 1;
			}
		}
		leftBg.style.transition = conLeft.style.transition = 'width 0.5s';
		rightBg.style.transition = conRight.style.transition = 'width 0.5s';
		leftBg.style.width = conLeft.style.width = 20+'%';
		rightBg.style.width = conRight.style.width = 80+'%';
		this.onoff = true;
	}
}
var zyhLyric = document.getElementById('zyhLyric');
var zyhTop = document.getElementById('zyhTop');
var zyhBot = document.getElementById('zyhBot');
var drag = document.getElementById('drag');
var mpPlaying = document.getElementById('mpPlaying');
var t = document.body.clientHeight || document.documentElement.clientHeight;
zyhBot.style.top = t+'px';
//相互之间有关联，可用一个开关控制
var onoff = false;
//drag.onoff = false;
//mpPlaying.onoff = false;
drag.onclick = function(){
	if(/*this.*/onoff){
		this.style.transform = 'rotate(0deg)';
		this.style.transition = 'transform 0.5s';
		zyhLyric.style.transition = zyhTop.style.transition = zyhBot.style.transition = 'bottom 0.5s';
		zyhLyric.style.bottom = '';
		zyhTop.style.bottom = '';
		zyhBot.style.bottom = -zyhBot.offsetHeight+'px';
		zyhBot.style.transition = 'opacity 0.5s,top 0.5s';
		zyhBot.style.opacity = 0;
		zyhBot.style.top = t+'px';
//		this.onoff = false;
//		mpPlaying.onoff = false;
		zyhDisk.style.transition = 'opacity 0.5s';
		zyhDisk.style.height = 350+'px';
		zyhDisk.style.opacity = 1;
		onoff = false;
	}else{
		this.style.transform = 'rotate(180deg)';
		this.style.transition = 'transform 0.5s';
		zyhLyric.style.transition = zyhTop.style.transition = zyhBot.style.transition = 'bottom 0.5s';
		zyhLyric.style.bottom = t+'px';
		zyhTop.style.bottom = t-zyhTop.offsetHeight+'px';
		zyhBot.style.bottom = 0;
		zyhBot.style.transition = 'opacity 0.5s,top 0.5s';
		zyhBot.style.opacity = 1;
		zyhBot.style.top = zyhTop.offsetHeight+'px';
//		this.onoff = true;
//		mpPlaying.onoff = true;
		zyhDisk.style.transition = 'opacity 0.5s';
		zyhDisk.style.height = 0;
		zyhDisk.style.opacity = 0;
		onoff = true;
	}
}
mpPlaying.onclick = function(){
	if(/*this.*/onoff){
		drag.style.transform = 'rotate(0deg)';
		drag.style.transition = 'transform 0.5s';
		zyhLyric.style.transition = zyhTop.style.transition = zyhBot.style.transition = 'bottom 0.5s';
		zyhLyric.style.bottom = '';
		zyhTop.style.bottom = '';
		zyhBot.style.bottom = -zyhBot.offsetHeight+'px';
		zyhBot.style.transition = 'opacity 0.5s,top 0.5s';
		zyhBot.style.opacity = 0;
		zyhBot.style.top = t+'px';
//		this.onoff = false;
//		drag.onoff = false;
		zyhDisk.style.transition = 'opacity 0.5s';
		zyhDisk.style.height = 350+'px';
		zyhDisk.style.opacity = 1;
		onoff = false;
	}else{
		drag.style.transform = 'rotate(180deg)';
		drag.style.transition = 'transform 0.5s';
		zyhLyric.style.transition = zyhTop.style.transition = zyhBot.style.transition = 'bottom 0.5s';
		zyhLyric.style.bottom = t+'px';
		zyhTop.style.bottom = t-zyhTop.offsetHeight+'px';
		zyhBot.style.bottom = 0;
		zyhBot.style.transition = 'opacity 0.5s,top 0.5s';
		zyhBot.style.opacity = 1;
		zyhBot.style.top = zyhTop.offsetHeight+'px';
//		this.onoff = true;
//		drag.onoff = true;
		zyhDisk.style.transition = 'opacity 0.5s';
		zyhDisk.style.height = 0;
		zyhDisk.style.opacity = 0;
		onoff = true;
	}
}
var mymusic = document.getElementById('mymusic');
var myMv = document.getElementById('myMv');
var list = document.getElementById('list');
var mvList = document.getElementById('mvList');
myMv.onclick = function(){
	this.style.color = '#fff';
	mymusic.style.color = 'rgba(255,255,255,0.6)';
	list.style.transition = 'opacity 0.5s';
	list.style.opacity = 0;
	setTimeout(function(){
		mvList.style.display = 'block';
		list.style.display = 'none';
		list.style.opacity = 1;
	},500)
}
mymusic.onclick = function(){
	this.style.color = '';
	myMv.style.color = '';
	mvList.style.transition = 'opacity 0.5s';
	mvList.style.opacity = 0;
	setTimeout(function(){
		list.style.display = 'block';
		mvList.style.opacity = 1;
		mvList.style.display = '';
	},500)
}
var zyhMv = document.getElementById('zyhMv');
var mvLis = mvList.getElementsByTagName('li');
var yClose = document.getElementById('yClose');
//mvLis[0].onclick = function(){
//	con.style.transition = 'opacity 0.5s';
//	con.style.opacity = 0;
//	setTimeout(function(){
//		zyhMv.style.display = 'block';
//		con.style.opacity = 1;
//		con.style.display = 'none';
//	},500)
//}
//mv界面的返回按钮
yClose.onclick = function () {
    zyhMv.style.transition = 'opacity 0.5s';
    zyhMv.style.opacity = 0;
    mov.pause();
    clearInterval(mvTimer);
    clearInterval(mvTimer1);
    mvPlay.innerHTML = '<i class="fa fa-play"></i>';
    mvIplay.innerHTML = '<i class="fa fa-play"></i>';
    mvPlay.style.display = 'block';
    mvPlay.isPlay = 'Play';
    mvPlay.title = '播放';
    mvIplay.title = '播放';
    videoOnoff = true;
    mvPage = '';
    if (!fullonoff) {
        document.webkitCancelFullScreen();
        fullonoff = true;
    }
    setTimeout(function () {
        con.style.display = 'block';
        zyhMv.style.display = '';
        zyhMv.style.opacity = 1;
    }, 500)
};


//mv  的playback  返回事件；--------------------
var mvPb = document.getElementById('mvPb');
mvPb.onclick = function () {
	music.pause();
    zyhMv.style.display = 'block';
    mvPage = 'mv';
};


var zyhDisk = document.getElementById('zyhDisk');
var rotate = 0;
var timer = null;
function startAnim() {
    timer = setInterval(function () {
        var img = document.getElementById("img");
        var rotateStyle = "rotate(" + rotate + "deg)";
        img.style.transform = rotateStyle;
        img.style["-moz-transform"] = rotateStyle;
        img.style["-webkit-transform"] = rotateStyle;
        img.style["-o-transform"] = rotateStyle;
        img.style["-ms-transform"] = rotateStyle;
        rotate += 3;
        if (rotate == 360){
            rotate = 0;
        }
    },50);
}
function stopAnim() {
    clearInterval(timer);
}
//startAnim();
//stopAnim();


//主界面音量点击事件------------------------------
var mainVolume = document.getElementsByClassName('mainVolume')[0];
var mainVolumeCon = document.getElementById('mainVolumeCon');
var mainVolumePlan = document.getElementsByClassName('mainVolumePlan')[0];
var mainVolumeGol = document.getElementById('mainVolumeGol');
var mainShadow = document.getElementById('mainVolumeShadow');//点击音量后点击任何地方都使调节音量框消失
mainVolume.onclick = function (ev) {
    console.log(1);
    ev.preventDefault();

    mainVolumeCon.style.display = 'block';
    mainVolumeGol.style.left = music.volume*(mainVolumePlan.offsetWidth-mainVolumeGol.offsetWidth)+'px';
    mainVolumeGol.style.left = music.volume*(mainVolumePlan.offsetWidth-mainVolumeGol.offsetWidth)+'px';
    mainVolumeCon.style.left = mainVolume.getBoundingClientRect().left - mainVolumeCon.offsetWidth / 4 + 'px';
    mainVolumeCon.style.top = mainVolume.getBoundingClientRect().top - mainVolumeCon.offsetHeight - 5 + 'px';
    mainShadow.style.display = 'block';
    mainShadow.onclick = function () {
        mainShadow.style.display = 'none';
        mainVolumeCon.style.display = 'none';
    };


    mainVolumeGol.onmousedown = function (ev) {
        ev.preventDefault();
        var per = mainvolumPercent();
        music.volume = (per / 100) <= 1 ? per / 100 : 1;
        var disX = ev.clientX - this.getBoundingClientRect().left;
        var maxW = mainVolumePlan.clientWidth - this.offsetWidth;

        document.onmousemove = function (mev) {
            mev.preventDefault();
            var per = mainvolumPercent();
            music.volume = (per / 100) <= 1 ? per / 100 : 1;
            var y = mev.clientX - disX - mainVolumePlan.getBoundingClientRect().left;

            if (y < 0) {
                y = 0;
            }
            if (y > maxW) {
                y = maxW;
            }
            mainVolumeGol.style.left = y + 'px';
        };
        document.onmouseup = function () {
            var per = mainvolumPercent();
            music.volume = (per / 100) <= 1 ? per / 100 : 1;

            // console.log(mov.mainVolume);
            document.onmousemove = null;
            document.onmouseup = null;
        }
    };


    //音量进度条点击事件---------------------------

    mainVolumePlan.onmousedown = function (ev) {
        ev.preventDefault();
        var l = ev.clientX - mainVolumePlan.getBoundingClientRect().left - mainVolumeGol.offsetWidth / 2;
        l = l > 0 ? l : 0;
        mainVolumeGol.style.left = l + 'px';
        var per = mainvolumPercent();
        music.volume = (per / 100) <= 1 ? per / 100 : 1;

        var disX = ev.clientX - mainVolumeGol.getBoundingClientRect().left;
        var maxL = mainVolumePlan.clientWidth - mainVolumeGol.offsetWidth;
        document.onmousemove = function (mev) {
            mev.preventDefault();
            var per = mainvolumPercent();
            music.volume = (per / 100) <= 1 ? per / 100 : 1;

            var y = mev.clientX - disX - mainVolumePlan.getBoundingClientRect().left;
            if (y < 0) {
                y = 0;
            }
            if (y > maxL) {
                y = maxL;
            }
            mainVolumeGol.style.left = y + 'px';
        };
        document.onmouseup = function () {
            var per = mainvolumPercent();
            music.volume = (per / 100) <= 1 ? per / 100 : 1;
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
};


//音量小球百分比
function mainvolumPercent() {
    var per = Math.round((mainVolumeGol.getBoundingClientRect().left - mainVolumePlan.getBoundingClientRect().left) / (mainVolumePlan.offsetWidth - mainVolumeGol.offsetWidth) * 100);
    if (per > 100) {
        per = 1;
    }
    if (per < 0) {
        per = 0;
    }
    return per;
}
