/**
 * Created by Fan_Manager on 2017/7/4.
 */
var zyhMv = document.getElementById('zyhMv');
var mov = document.getElementById('mov');//video
var mvPlay = document.getElementById('zPlay');//播放键
var mvNext = document.getElementById('next');
var mvPrev = document.getElementById('prev');
var mvIplay = document.getElementById('iplay');
var mvZyhplan = document.getElementById('zplan');//整体进度条
var mvzyhProgress = document.getElementById('zProgress');//白色进度条
var mvZyanhGlobe = document.getElementById('zGlobe');//时间进度条小球
var mvVolume = document.getElementsByClassName('volume')[0];
var mvVolumeCon = document.getElementById('volumeCon');
var mvVolumePlan = document.getElementsByClassName('volumePlan')[0];
var mvVolumeGol = document.getElementById('volumeGol');
var mvFtime = document.getElementsByClassName('ztext')[0];   //现在时间
var mvDurationTime = document.getElementsByClassName('ztext')[1];//总时间
var mvTimer = null;//小球的定时器
var mvTimer1 = null;  //显示时间定时器
var mvTimer3 = null;//显示隐藏定时器

var mvList = document.getElementById('mvList');

/*var loop = document.getElementsByClassName('loop')[0]; 循环按钮（未加）*/
var stop = document.getElementById('stop');//停止
var controlCon = document.getElementById('zRail');//整个控制区域

var videoOnoff = true;
var mvPage = '';//控制keydown







//生成首页的结构---------------

var mvstr = '';
for (var i = 0; i < movData.length; i++) {
    mvstr += `<li mvNum="${i}" mvSrc="${movData[i].src}">
        <img src="${movData[i].img}"/>
        <p class="mvName">${movData[i].name}</p>
        </li>`;
}
var num;//加在点击列表传进来

mvList.innerHTML = mvstr;
var mvLists = mvList.getElementsByTagName('li');
for (var i = 0; i < mvLists.length; i++) {
    mvLists[i].index = i;
    mvLists[i].onclick = function () {
        num = this.index;
        zyhMv.style.display = 'block';
        mov.src = movData[this.index].src;
        mvDurationTime.innerHTML = movData[this.index].time;
        mvZyanhGlobe.style.left = 0;
         mvzyhProgress.style.width = 0;
        mvPage = 'mv';
        music.pause();
        off = false;
        zyhChoice[1].innerHTML = '<i class="fa fa-play"></i>';//添加播放键键
        leftSpans[1].innerHTML = '<i class="fa fa-play"></i>';//添加播放键键
    }
}







//播放and暂停-------------------
mvPlay.isPlay = 'Play'; //自定判断是否在播放的属性
mov.load();

mvIplay.onclick = mvPlay.onclick = function () {
    if (videoOnoff) {
        mov.play();
        golMove();
        freshTime();
        mvPlay.style.display = 'none';
        mvPlay.isPlay = 'Stop';
        mvPlay.title = '暂停';
        mvIplay.title = '暂停';
        mvPlay.innerHTML = '<i class="fa fa-pause"></i>';
        mvIplay.innerHTML = '<i class="fa fa-pause"></i>';
        mvTimer3 = setTimeout(function () {
            controlCon.style.display = 'none';
        }, 2000);
    } else {
        mov.pause();
        clearInterval(mvTimer);
        clearInterval(mvTimer1);
        mvPlay.innerHTML = '<i class="fa fa-play"></i>';
        mvIplay.innerHTML = '<i class="fa fa-play"></i>';
        mvPlay.style.display = 'block';
        mvPlay.isPlay = 'Play';
        mvPlay.title = '播放';
        mvIplay.title = '播放';

    }
    videoOnoff = !videoOnoff;
};






//空格暂停播放---------------------

document.addEventListener('keydown',function (ev) {
    if(mvPage=='mv') {
        if (ev.keyCode == 32) {
            mvPlay.onclick();
        }
    }
});






// 鼠标停止移动一段时间进度条等消失-----------------


mvTimer3 = setTimeout(function () {
    controlCon.style.display = 'none';
}, 2000);
document.addEventListener('mousemove', function () {
    // console.log(ev);
    controlCon.style.display = 'block';
    if (mvPlay.isPlay == 'Play') {
        mvPlay.style.display = 'block';
    }
});
document.addEventListener('mousemove', hide, false);

function hide(ev) {
    clearInterval(mvTimer3);
    mvTimer3 = setTimeout(function () {
        var Nmovel = ev.clientX;
        var Nmovet = ev.clientY;
        var movel = ev.clientX;
        var movet = ev.clientY;
        if (movel - Nmovel == 0 && movet - Nmovet == 0) {
            controlCon.style.display = 'none';
            mvPlay.style.display = 'none';
            if (mvVolumeCon.style.display == 'block') {
                mvVolumeCon.style.display = 'none'
            }
        }
    }, 2000);
}






//controlCon 歌曲操作部分在鼠标移入后不消失---------------

mvPlay.onmouseenter = controlCon.onmouseenter = function () {
    clearTimeout(mvTimer3);
    document.removeEventListener('mousemove', hide, false);
    controlCon.style.display = 'block';
};

mvPlay.onmouseleave = controlCon.onmouseleave = function () {
    document.addEventListener('mousemove', hide, false);
    //controlCon.style.display = 'block';
};






//停止-------------

stop.onclick = function () {
    videoOnoff = true;
    clearInterval(mvTimer);
    clearInterval(mvTimer1);
    mov.currentTime = 0;
    mvPlay.isPlay = 'Play';
    mvPlay.innerHTML = '<i class="fa fa-play"></i>';
    mvPlay.style.display = 'block';
    mvFtime.innerHTML = '00:00';
    mvZyanhGlobe.style.left = 0;
    mvzyhProgress.style.width = 0;
    mov.pause()
};
mov.addEventListener('ended', function () {
    mvNext.onclick();
});






//上一曲---------------------------
mvPrev.onclick = function () {
    // var nowSrc = mov.src;
    num--;
    if (num < 0) {
        num = movData.length - 1;
    }
    mov.src = movData[num].src;
    if (mvPlay.isPlay == 'Stop') {
        mvZyanhGlobe.style.left = 0;
        mvzyhProgress.style.width = 0;
        mov.play();
    }
    if (mvPlay.isPlay == 'Play') {
        mvZyanhGlobe.style.left = 0;
        mvzyhProgress.style.width = 0;

    }

};







//下一曲---------------

mvNext.onclick = function () {
    //var nowSrc = mov.src;
    //var m;
    num = (num + 1) % movData.length;
    mov.src = movData[num].src;
    if (mvPlay.isPlay == 'Stop') {
        mvZyanhGlobe.style.left = 0;
        mvzyhProgress.style.width = 0;

        mov.play();

    }
    if (mvPlay.isPlay == 'Play') {
        mvZyanhGlobe.style.left = 0;
        mvzyhProgress.style.width = 0;

    }

};








//循环按钮
/*loop.onclick = function () {
 if (mov.loop) {
 mov.loop = false;
 loop.style.background = '';
 } else {
 mov.loop = true;
 loop.style.background = 'white';
 }
 };*/








//进度条小球事件---------------------------
mvZyanhGlobe.onmousedown = function (ev) {
    ev.preventDefault();
    clearInterval(mvTimer);
    clearInterval(mvTimer1);
    this.style.transform = 'scale(1.5)';
    var disX = ev.clientX - mvZyanhGlobe.getBoundingClientRect().left;
    var maxL = mvZyhplan.clientWidth - this.offsetWidth;

    document.onmousemove = function (mev) {

        var y = mev.clientX - disX - mvZyhplan.getBoundingClientRect().left;

        if (y < 0) {
            y = 0;
        }
        if (y > maxL) {
            y = maxL;
        }
        mvZyanhGlobe.style.left = y + 'px';
        mvzyhProgress.style.width = y / mvZyhplan.offsetWidth * 100 + '%';

    };
    document.onmouseup = function () {
        mvZyanhGlobe.style.transform = 'scale(1)';
        var per = timePercent();
        if (mvPlay.isPlay == 'Play') {
            videoPer(mov, per);
            //mov.play();
        }
        if (mvPlay.isPlay == 'Stop') {
            videoPer(mov, per);
            mov.play();
            mvPlay.isPlay = 'Stop';
        }
        freshTime();
        golMove();
        document.onmousemove = null;
        document.onmouseup = null;
    };
};








//时间进度条点击事件---------------------------
mvZyhplan.onmousedown = function (ev) {
    ev.preventDefault();
    clearInterval(mvTimer);
    clearInterval(mvTimer1);
    mvZyanhGlobe.style.transform = 'scale(1.5)';
    var l = ev.clientX - mvZyhplan.getBoundingClientRect().left - mvZyanhGlobe.offsetWidth / 2;
    l = l > 0 ? l : 0;
    mvZyanhGlobe.style.left = l + 'px';
    mvzyhProgress.style.width = l / mvZyhplan.offsetWidth * 100 + '%';

    var per = timePercent();
    if (mvPlay.isPlay == 'Play') {
        videoPer(mov, per);

    }
    if (mvPlay.isPlay == 'Stop') {
        mov.play();
        //play.isPlay = 'Stop';
        //  golMove();
    }

    var disX = ev.clientX - mvZyanhGlobe.getBoundingClientRect().left;
    var maxL = mvZyhplan.clientWidth - mvZyanhGlobe.offsetWidth;
    document.onmousemove = function (mev) {
        mev.preventDefault();
        clearInterval(mvTimer);
        clearInterval(mvTimer1);
        //mov.pause();
        var y = mev.clientX - disX - mvZyhplan.getBoundingClientRect().left;
        if (y < 0) {
            y = 0;
        }
        if (y > maxL) {
            y = maxL;
        }
        mvZyanhGlobe.style.left = y + 'px';
        mvzyhProgress.style.width = y / mvZyhplan.offsetWidth * 100 + '%';

    };
    document.onmouseup = function () {
        mvZyanhGlobe.style.transform = 'scale(1)';
        var per = timePercent();
        if (mvPlay.isPlay == 'Play') {
            videoPer(mov, per);
            //mov.play();
            mvFtime.innerHTML = getTime();
        }
        if (mvPlay.isPlay == 'Stop') {
            videoPer(mov, per);
            mov.play();
            freshTime();
            mvPlay.isPlay = 'Stop';
        }
        golMove();
        document.onmousemove = null;
        document.onmouseup = null;
    };
};






//音量点击事件
var mvShadow = document.getElementById('mvVolumeShadow');//点击音量后点击任何地方都使调节音量框消失
mvVolume.onclick = function (ev) {
    ev.preventDefault();
    mvVolumeCon.style.display = 'block';
    mvVolumeCon.style.left = mvVolume.getBoundingClientRect().left - mvVolumeCon.offsetWidth / 4 + 'px';
    mvVolumeCon.style.top = mvVolume.getBoundingClientRect().top - mvVolumeCon.offsetHeight - 5 + 'px';
    mvShadow.style.display = 'block';
    mvShadow.onclick = function () {
        mvShadow.style.display = 'none';
        mvVolumeCon.style.display = 'none';
    };

    mvVolumeCon.onmouseenter = mvPlay.onmouseenter;
    mvVolumeCon.onmouseleave = mvPlay.onmouseleave;

    mvVolumeGol.onmousedown = function (ev) {
        ev.preventDefault();
        var per = mvvolumPercent();
        mov.volume = (per / 100) <= 1 ? per / 100 : 1;
        var disX = ev.clientX - this.getBoundingClientRect().left;
        var maxW = mvVolumePlan.clientWidth - this.offsetWidth;

        document.onmousemove = function (mev) {
            mev.preventDefault();
            var per = mvvolumPercent();
            mov.volume = (per / 100) <= 1 ? per / 100 : 1;
            var y = mev.clientX - disX - mvVolumePlan.getBoundingClientRect().left;

            // console.log(mvVolumeGol.style.left);
            if (y < 0) {
                y = 0;
            }
            if (y > maxW) {
                y = maxW;
            }
            //console.log(y);
            mvVolumeGol.style.left = y + 'px';
        };
        document.onmouseup = function () {
            var per = mvvolumPercent();
            mov.volume = (per / 100) <= 1 ? per / 100 : 1;

            // console.log(mov.mvVolume);
            document.onmousemove = null;
            document.onmouseup = null;
        }
    };




    //音量进度条点击事件---------------------------

    mvVolumePlan.onmousedown = function (ev) {
        ev.preventDefault();
        var l = ev.clientX - mvVolumePlan.getBoundingClientRect().left - mvVolumeGol.offsetWidth / 2;
        l = l > 0 ? l : 0;
        mvVolumeGol.style.left = l + 'px';
        var per = mvvolumPercent();
        mov.volume = (per / 100) <= 1 ? per / 100 : 1;

        var disX = ev.clientX - mvVolumeGol.getBoundingClientRect().left;
        var maxL = mvVolumePlan.clientWidth - mvVolumeGol.offsetWidth;
        document.onmousemove = function (mev) {
            mev.preventDefault();
            var per = mvvolumPercent();
            mov.volume = (per / 100) <= 1 ? per / 100 : 1;

            var y = mev.clientX - disX - mvVolumePlan.getBoundingClientRect().left;
            if (y < 0) {
                y = 0;
            }
            if (y > maxL) {
                y = maxL;
            }
            mvVolumeGol.style.left = y + 'px';
        };
        document.onmouseup = function () {
            var per = mvvolumPercent();
            mov.volume = (per / 100) <= 1 ? per / 100 : 1;
            /* if(mov.mvVolume==0){
             mvVolume.innerHTML = '';
             }*/
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
};






//全屏------------------------
/* webkit    element.webkitRequestFullScreen();
 Firefox    element.mozRequestFullScreen();
 W3C        element.requestFullscreen();
 退出全屏：
 webkit    document.webkitCancelFullScreen();
 Firefox    document.mozCancelFullScreen();
 W3C       document.exitFullscreen();*/

/*var full = document.getElementById('full');
 var fullonoff = true;*/
var fullonoff = true; //全屏开关
mov.ondblclick = function () {
    if (fullonoff) {
        mov.webkitRequestFullScreen();
    }
    if (!fullonoff) {
        document.webkitCancelFullScreen();
    }
    fullonoff = !fullonoff;
};






//音量键bug
controlCon.addEventListener('mousedown', function () {
    if (mvVolumeCon.style.display == 'block') {
        mvVolumeCon.style.display = 'none'
    }
}, false);
mvPlay.addEventListener('mousedown', function () {
    if (mvVolumeCon.style.display == 'block') {
        mvVolumeCon.style.display = 'none'
    }
}, false);
mov.addEventListener('mousedown', function () {

    if (mvVolumeCon.style.display == 'block') {
        mvVolumeCon.style.display = 'none'
    }
});








//小球随时间运动函数
function golMove() {
    clearInterval(mvTimer);
    var per = 0;
    mvTimer = setInterval(function () {
        per = mov.currentTime / mov.duration;
        mvZyanhGlobe.style.left = per * (mvZyhplan.offsetWidth - mvZyanhGlobe.offsetWidth) + 'px';
        mvzyhProgress.style.width = per * 100 + '%';
    }, 4)
}








//显示时间定时器

function freshTime() {
    clearInterval(mvTimer1);
    mvTimer1 = setInterval(function () {
        var t = getTime();
        mvFtime.innerHTML = t;
    }, 4)
}








//音量圆点所在进度
function mvvolumPercent() {
    var per = Math.round((mvVolumeGol.getBoundingClientRect().left - mvVolumePlan.getBoundingClientRect().left) / (mvVolumePlan.offsetWidth - mvVolumeGol.offsetWidth) * 100);
    if (per > 100) {
        per = 100;
    }
    if (per < 0) {
        per = 0;
    }
    return per;
}











//视频的现在时间获取-----
function nowTime(video) {
    return video.currentTime
}


//视频的总时长-------
function fullTime(video) {
    return video.duration;
}

//视频圆点在进度条比例  返回数字
function timePercent() {
    var per = Math.round((mvZyanhGlobe.getBoundingClientRect().left - mvZyhplan.getBoundingClientRect().left) / (mvZyhplan.offsetWidth - mvZyanhGlobe.offsetWidth) * 100);
    if (per > 1) {
        p = 1;
    }
    if (per < 0) {
        per = 0;
    }
    return per;
}


//根据百分比来调整视频
function videoPer(mov, per) {
    mov.currentTime = fullTime(mov) * per / 100


}


//获取时间变为时间格式字符串
function getTime() {
    var m = Math.floor(mov.currentTime / 60);
    var s = parseInt(mov.currentTime % 60);
    var str = '';
    str = two(m) + ':' + two(s);
    //补0函数,时间小于10，一般都是01，02，所以需要补0
    function two(n) {
        return n < 10 ? '0' + n : '' + n;
    }

    return str;
}

//获取当前歌曲的总时间（未使用）
function getDuraTime() {
    var m = Math.floor(mov.duration / 60);
    var s = parseInt(mov.duration % 60);
    var str = '';
    str = two(m) + ':' + two(s);
    //补0函数,时间小于10，一般都是01，02，所以需要补0
    function two(n) {
        return n < 10 ? '0' + n : '' + n;
    }
    return str;
}
