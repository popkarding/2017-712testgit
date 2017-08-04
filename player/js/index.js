var Rail = document.getElementById('Rail');
var zyhtext = document.getElementsByClassName('zyhtext');
var zyhList = document.getElementById('zyhList');//歌单列表
var drag = document.getElementById('drag');//下拉的按钮
var zyhBot = document.getElementById('zyhBot');//歌曲列表
var zyhgc = document.getElementById('zyhgc');//歌词大div
var zyhTop = document.getElementById('zyhTop');//歌曲功能div
var changpian = document.getElementById('changpian');//唱片的div
var zyhplan = document.getElementById('zyhplan');
var plan = document.getElementById('plan');
var chang = getComputedStyle(zyhplan).width;//歌曲进度条长度
var chang1 = getComputedStyle(plan).width;//歌曲进度条长度
// console.log(chang);
var zyhGlobe = document.getElementById('zyhGlobe');//小圆点长度
var zyhProgress = document.getElementById('zyhProgress');//播放进度条
var zyhImg = document.getElementById('zyhImg');//专辑图片
var musicImg = document.getElementById('musicImg');//主页面专辑图片
var zyhHelena = document.getElementById('zyhHelena');//歌曲名称
var zyhSinger = document.getElementById('zyhSinger');//歌手名称
var musicTxt = document.getElementById('musicTxt');//歌手、歌曲
var firstPs = musicTxt.getElementsByTagName('p');
var geci = document.getElementById('geci');
var zyhLrc = document.getElementsByTagName('zyhLrc');//歌词
var lrcTxt = document.getElementById('lrcTxt');//歌词div
var music = document.getElementById('music');//歌曲audio
var actionLeft = document.getElementById('actionLeft');//功能区
var zyhChoice = actionLeft.getElementsByTagName('span');//各个小功能
var playRight = document.getElementById('playRight');
var leftSpans =playRight.getElementsByTagName('span');
var list = document.getElementById('list');
var playCen = document.getElementById('playCen');
var startText = playCen.getElementsByClassName('start text')[0];
var endText = playCen.getElementsByClassName('end text')[0];
var globe = document.getElementById('globe');
var progress = document.getElementById('progress');
var conLeft = document.getElementById('conLeft');
var conLis = conLeft.getElementsByTagName('li');
//var zyhMusic = document.getElementById('zyhMusic');
var zyhbg = document.getElementById('zyhbg');//音乐播放界面背景
// console.log(leftSpans);
// console.log(actionLeft);
var n = 0;
var num = 0;
var str = '';//生成歌曲页面的字符串
var str1 = '';//生成歌词的字符串
var str2 = '';//生成主页面歌单的字符串
var arr = [];
var off = false;//暂停播放开关
var odd = true;//随机、顺序开关
var onodd = true;//控制随机按钮的开关
var offon = true;//控制顺序按钮的开关
var timer = null;
var timer1 = null;
var timer2 = null;
var timer3 = null;
//初始化
firstPs[0].innerHTML = data[0].name;
firstPs[1].innerHTML = data[0].people;
endText.innerHTML = data[0].time;
musicImg.src = data[0].img;
zyhImg.src = data[0].img;
zyhHelena.innerHTML = data[0].name;
zyhSinger.innerHTML = data[0].people;
music.src = data[0].src;
zyhbg.style.backgroundImage = 'url('+data[0].img+')';
stopAnim();
//生成主页面歌单
for(var i=0;i<data.length;i++){
    str2 += `<li>
                <img src="${data[i].img}"/>
                <p class="song">${data[i].name}</p>
                <p class="singer">${data[i].people}</p>
            </li>`;
}
list.innerHTML = str2;
var lis = list.getElementsByTagName('li');
// console.log(lis);
//歌曲页面生成歌单
for(var i=0;i<data.length;i++){
    str += `<li>
        <span class="audioList">
            <span class="zyhCheck"><i class="fa fa-square-o"></i></span>
            <span class="transmit"><i class="fa fa-align-left fa-rotate-270"></i></span>
            <span class="zyhLike">${data[i].name}</span>
        </span>
        <span class="zyhOrder">${data[i].people}</span>
        <span class="zyhTime">${data[i].time}</span>
    </li>`;
}
zyhList.innerHTML = str;
var zyhLike1 = zyhList.getElementsByTagName('li');//歌名
var zyhLike = zyhList.getElementsByClassName('zyhLike');//歌名
var zyhTime = zyhList.getElementsByClassName('zyhTime');//时间
// //歌词初始化
zyhLike1[0].style.backgroundColor = 'rgba(0,120,215,0.8)';
var ps = lrcTxt.getElementsByTagName('p');
shuju(zyhLike[0]);
shuju(lis[0]);
for(var i=0;i<zyhLike1.length;i++){
    onodd = true;
    zyhLike1[i].index = i;
    zyhLike1[i].onclick = function(){
        stopAnim();
        startAnim();
        zyhChoice[1].innerHTML = '<i class="fa fa-pause"></i>';//添加播放键键
        leftSpans[1].innerHTML = '<i class="fa fa-pause"></i>';//添加播放键键
        zyhbg.style.backgroundImage = 'url('+data[this.index].img+')';
        //歌曲地址变化
        music.autoplay = 'autoplay';
        // console.log(this.firstElementChild.nextElementSibling)
        if(zyhLike[this.index].innerHTML ==  data[this.index].name){
            music.src = data[this.index].src;
        }
        num = this.index;
        //左侧的时间变长
        str1 = '';
        clearInterval(timer1);
        clearInterval(timer2);
        //歌曲时长
        zyhtext[1].innerHTML = zyhTime[this.index].innerHTML;
        // console.log(data[this.index].time)
        endText.innerHTML = data[this.index].time;
        //歌词的变化
        // shuju(this);
        // console.log(geci.innerHTML);
        shuju(zyhLike[this.index]);
        //专辑图片和歌手信息变化
        zyhImg.src = data[this.index].img;
        zyhHelena.innerHTML = data[this.index].name;
        zyhSinger.innerHTML = data[this.index].people;
        musicImg.src = data[this.index].img;
        firstPs[0].innerHTML = data[this.index].name;
        firstPs[1].innerHTML = data[this.index].people;
        //开始时间的显示
        startTime();
        qiuBili();
        off = true;
        //点谁谁高亮
        for(var i=0;i<zyhLike1.length;i++){
            zyhLike1[i].style.backgroundColor = '';
        }
        this.style.backgroundColor = 'rgba(0,120,215,0.8)';
        timer3 = setInterval(function(){
            var txt = zyhtext[0].innerHTML;
            var txt1 = startText.innerHTML;
            // console.log(txt);
            for(var i=0;i<ps.length;i++){
                // console.log(txt);
                // console.log(ps[i].id.slice(0,5));
                if(txt == ps[i].id.slice(1,5) || txt1 == ps[i].id.slice(1,5)){
                    for(var j=0;j<ps.length;j++){
                        ps[j].style.color = '';
                        ps[j].style.fontSize = '';
                    }
                    lrcTxt.style.top = -i*40+'px';
                    ps[i].style.color = '#fff';
                    ps[i].style.fontSize = '22px';
                }
            }
        },1000)
    }
}
for(var i=0;i<lis.length;i++){
    onodd = true;
    lis[i].index = i;
    lis[i].onclick = function(){
        zyhChoice[1].innerHTML = '<i class="fa fa-pause"></i>';//添加播放键键
        leftSpans[1].innerHTML = '<i class="fa fa-pause"></i>';//添加播放键键
        zyhbg.style.backgroundImage = 'url('+data[this.index].img+')';
        stopAnim()
        startAnim();
        //歌曲地址变化
        music.autoplay = 'autoplay';
        if(this.firstElementChild.nextElementSibling.innerHTML ==  data[this.index].name){
            music.src = data[this.index].src;
        }
        num = this.index;
        //左侧的时间变长
        str1 = '';
        clearInterval(timer1);
        clearInterval(timer2);
        for(var i=0;i<zyhLike1.length;i++){
            zyhLike1[i].style.backgroundColor = '';
        }
        zyhLike1[this.index].style.backgroundColor = 'rgba(0,120,215,0.8)';
        //歌曲时长
        zyhtext[1].innerHTML = zyhTime[this.index].innerHTML;
        endText.innerHTML = data[this.index].time;
        zyhGlobe.style.left = '0px';
        //歌词的变化
        shuju(this.firstElementChild.nextElementSibling);
        // console.log(geci.innerHTML);
        //专辑图片和歌手信息变化
        musicImg.src = data[this.index].img;
        firstPs[0].innerHTML = data[this.index].name;
        firstPs[1].innerHTML = data[this.index].people;
        zyhImg.src = data[this.index].img;
        zyhHelena.innerHTML = data[this.index].name;
        zyhSinger.innerHTML = data[this.index].people;
        //开始时间的显示
        startTime();
        qiuBili();
        off = true;
        // shuju(this);
        //播放暂停键变化
        // if(off){
        //  off = false;
        //  clearInterval(timer1);
        //  clearInterval(timer2);
        // }else{
        //  off = true;
        //  startTime();
        //  qiuBili();
        // }
        //歌词的滚动、高亮变化
        timer3 = setInterval(function(){
            var txt = zyhtext[0].innerHTML;
            var txt1 = startText.innerHTML;
            // console.log(txt);
            for(var i=0;i<ps.length;i++){
                // console.log(txt);
                // console.log(ps[i].id.slice(0,5));
                if(txt == ps[i].id.slice(1,5) || txt1 == ps[i].id.slice(1,5)){
                    for(var j=0;j<ps.length;j++){
                        ps[j].style.color = '';
                        ps[j].style.fontSize = '';
                    }
                    lrcTxt.style.top = -i*40+'px';
                    ps[i].style.color = '#fff';
                    ps[i].style.fontSize = '22px';
                }
            }
        },1000)
    }
}
//暂停、播放
leftSpans[1].onclick = zyhChoice[1].onclick = function(){
    if(off){
        //暂停
        off = false;
        onodd = true;
        music.pause();
        // var time = music.duration;//总时长
        zyhChoice[1].innerHTML = '<i class="fa fa-play"></i>';//添加播放键键
        leftSpans[1].innerHTML = '<i class="fa fa-play"></i>';//添加播放键键
        zyhChoice[1].title = '播放';
        leftSpans[1].title = '播放';
        var time = Math.floor(music.currentTime);//可改
        // if(time.length == 1){
        //     zyhtext[0].innerHTML = '00:0'+time;
        // }
        clearInterval(timer1);
        clearInterval(timer2);
        stopAnim();
    }else{
        //播放
        //歌词的滚动、高亮变化
        off = true;
        timer3 = setInterval(function(){
            var txt = zyhtext[0].innerHTML;
            var txt1 = startText.innerHTML;
            // console.log(txt);
            for(var i=0;i<ps.length;i++){
                // console.log(txt);
                // console.log(ps[i].id.slice(0,5));
                if(txt == ps[i].id.slice(1,5) || txt1 == ps[i].id.slice(1,5)){
                    for(var j=0;j<ps.length;j++){
                        ps[j].style.color = '';
                        ps[j].style.fontSize = '';
                    }
                    lrcTxt.style.top = -i*40+'px';
                    ps[i].style.color = '#fff';
                    ps[i].style.fontSize = '22px';
                }
            }
        },1000)
        music.play();
        zyhChoice[1].innerHTML = '<i class="fa fa-pause"></i>';//添加播放键键
        leftSpans[1].innerHTML = '<i class="fa fa-pause"></i>';//添加播放键键
        zyhChoice[1].title = '暂停';
        leftSpans[1].title = '暂停';
        qiuBili();
        startTime();
        startAnim();
    }
}
//播放模式
leftSpans[3].onclick = zyhChoice[3].onclick = function(){
    if(odd){
        //顺序播放
        odd = false;
        zyhChoice[3].innerHTML = '<i class="fa fa-random"></i>';
        leftSpans[3].innerHTML = '<i class="fa fa-random"></i>';
        this.title = '随机播放';
    }else{
        //随机播放
        odd = true;
        zyhChoice[3].innerHTML = '<i class="fa fa-refresh"></i>';
        leftSpans[3].innerHTML = '<i class="fa fa-refresh"></i>';
        this.title = '顺序播放';
    }
}
music.addEventListener('ended', function(){
    if(odd){
        num = (num+1)%data.length;
        tabPlay();
    }else{
        num = Math.round(Math.random()*(data.length-1));
        // console.log(num);
        tabPlay();
    }
    odd;
}, false);
//小球的按下事件
zyhGlobe.onmousedown = function(ev){
        ev.preventDefault();
        ev.cancelBubble = true;
        clearInterval(timer1);
        clearInterval(timer2);
        var disX = ev.clientX - zyhGlobe.getBoundingClientRect().left;
        var maxT = zyhplan.clientWidth;
        document.onmousemove = function(ev){
            var y = ev.clientX-disX-zyhplan.getBoundingClientRect().left;
            if(y<0){
                y = 0;
            }
            if(y>maxT){
                y = maxT;
            }
            zyhGlobe.style.left = y+'px';
            zyhProgress.style.width = y+'px';
            timer3 = setInterval(function(){
            var txt = zyhtext[0].innerHTML;
            var txt1 = startText.innerHTML;
            // console.log(txt);
            for(var i=0;i<ps.length;i++){
                // console.log(txt);
                // console.log(ps[i].id.slice(0,5));
                if(txt == ps[i].id.slice(1,5) || txt1 == ps[i].id.slice(1,5)){
                    for(var j=0;j<ps.length;j++){
                        ps[j].style.color = '';
                        ps[j].style.fontSize = '';
                    }
                    lrcTxt.style.top = -i*40+'px';
                    ps[i].style.color = '#fff';
                    ps[i].style.fontSize = '22px';
                }
            }
        },1000)
        }
        document.onmouseup = function(){
            var curTime = music.currentTime;
            // console.log(music.currentTime);
            var set = Math.floor(zyhGlobe.offsetLeft/parseFloat(chang)*Math.floor(music.duration));
            music.currentTime = set;
            // qiuBili();
            // startTime();
            console.log(off);
            if(off){
                qiuBili();
                startTime();
            }else{
                clearInterval(timer1);
                clearInterval(timer2);
                var startT = Math.floor(music.currentTime%60);//秒
                var startS = Math.floor(music.currentTime%3600/60);//分
                // console.log(startT)
                if(startS){
                    zyhtext[0].innerHTML = startS+':'+two(startT);
                    startText.innerHTML = startS+':'+two(startT);
                }else{
                    zyhtext[0].innerHTML = '0:'+two(startT);
                    startText.innerHTML ='0:'+two(startT);
                }
            }
            document.onmousemove = document.onmouseup = null;
        }
    }
globe.onmousedown = function(ev){
    ev.preventDefault();
    ev.cancelBubble = true;
    clearInterval(timer1);
    clearInterval(timer2);
    var leftX = ev.clientX - globe.getBoundingClientRect().left;
    var maxT = zyhplan.clientWidth;
    document.onmousemove = function(ev){
        var x = ev.clientX-leftX-plan.getBoundingClientRect().left;
        if(x<0){
            x = 0;
        }
        if(x>maxT){
            x = maxT;
        }
        globe.style.left = x+'px';
        progress.style.width = x+'px';

    }
    document.onmouseup = function(){
        var curTime = music.currentTime;
        // console.log(music.currentTime);
        var set1 = Math.floor(globe.offsetLeft/parseFloat(chang1)*Math.floor(music.duration));
        music.currentTime = set1;
        // qiuBili();
        // startTime();
        console.log(off);
        if(off){
            qiuBili();
            startTime();
        }else{
            clearInterval(timer1);
            clearInterval(timer2);
            var startT = Math.floor(music.currentTime%60);//秒
            var startS = Math.floor(music.currentTime%3600/60);//分
            // console.log(startT)
            if(startS){
                zyhtext[0].innerHTML = startS+':'+two(startT);
                startText.innerHTML = startS+':'+two(startT);
            }else{
                zyhtext[0].innerHTML = '0:'+two(startT);
                startText.innerHTML ='0:'+two(startT);
            }
        }
        // leftqiuBili();
        document.onmousemove = document.onmouseup = null;
    }
}
//点击歌曲长条
zyhplan.onmousedown = function(ev){
    clearInterval(timer1);
    clearInterval(timer2);
    //点击时候的位置
    var onL = ev.clientX-this.offsetLeft;
    var set = Math.floor(onL/parseFloat(chang)*Math.floor(music.duration));
    music.currentTime = set;
    qiuBili();
    startTime();
}
plan.onmousedown = function(ev){
    clearInterval(timer1);
    clearInterval(timer2);
    //点击时候的位置
    var onL = ev.clientX-this.offsetLeft;
    var set1 = Math.floor(onL/parseFloat(chang1)*Math.floor(music.duration));
    music.currentTime = set1;
    qiuBili();
    startTime();
}
//下一曲
leftSpans[2].onclick =zyhChoice[2].onclick = function(){
    if(odd){
        num = (num+1)%data.length;
        tabPlay();
    }else{
        num = Math.round(Math.random()*(data.length-1));
        tabPlay();
    }
    globe.style.left = 0;
    progress.style.width = 0;
    zyhGlobe.style.left =0;
    zyhProgress.style.width = 0;
}
// //上一曲
leftSpans[0].onclick =zyhChoice[0].onclick = function(){
    if(odd){
        num--;
        if(num <= 0){
            num = data.length-1;
        }
        tabPlay();
    }else{
        num++;
        if(num < data.length-1){
            num = 0;
        }
        tabPlay();
    }
    globe.style.left = 0;
    progress.style.width = 0;
    zyhGlobe.style.left =0;
    zyhProgress.style.width = 0;
}

//音乐界面音量点击事件
var auVolume = document.getElementsByClassName('auVolume')[0];
var auVolumeCon = document.getElementById('auVolumeCon');
var auVolumePlan = document.getElementsByClassName('auVolumePlan')[0];
var auVolumeGol = document.getElementById('auVolumeGol');
var auShadow = document.getElementById('auVolumeShadow');//点击音量后点击任何地方都使调节音量框消失
auVolume.onclick = function (ev) {
    ev.preventDefault();
    auVolumeCon.style.display = 'block';
    auVolumeGol.style.left = music.volume*(auVolumePlan.offsetWidth-auVolumeGol.offsetWidth)+'px';
    auVolumeCon.style.left = auVolume.getBoundingClientRect().left - auVolumeCon.offsetWidth / 4 + 'px';
    auVolumeCon.style.top = auVolume.getBoundingClientRect().top - auVolumeCon.offsetHeight - 5 + 'px';
    auShadow.style.display = 'block';
    auShadow.onclick = function () {
        auShadow.style.display = 'none';
        auVolumeCon.style.display = 'none';
    };


    auVolumeGol.onmousedown = function (ev) {
        ev.preventDefault();
        var per = volumPercent();

        music.volume = (per / 100) <= 1 ? per / 100 : 1;
        console.log(music.volume);
        var disX = ev.clientX - this.getBoundingClientRect().left;
        var maxW = auVolumePlan.clientWidth - this.offsetWidth;

        document.onmousemove = function (mev) {

            mev.preventDefault();
            var per = volumPercent();
            music.volume = (per / 100) <= 1 ? per / 100 : 1;
            var y = mev.clientX - disX - auVolumePlan.getBoundingClientRect().left;

            if (y < 0) {
                y = 0;
            }
            if (y > maxW) {
                y = maxW;
            }
            auVolumeGol.style.left = y + 'px';
        };
        document.onmouseup = function () {
            console.log(music.volume);

            var per = volumPercent();
            music.volume = (per / 100) <= 1 ? per / 100 : 1;

            // console.log(mov.auVolume);
            document.onmousemove = null;
            document.onmouseup = null;
        }
    };




    //音量进度条点击事件---------------------------

    auVolumePlan.onmousedown = function (ev) {
        ev.preventDefault();
        var l = ev.clientX - auVolumePlan.getBoundingClientRect().left - auVolumeGol.offsetWidth / 2;
        l = l > 0 ? l : 0;
        auVolumeGol.style.left = l + 'px';
        var per = volumPercent();
        music.volume = (per / 100) <= 1 ? per / 100 : 1;

        var disX = ev.clientX - auVolumeGol.getBoundingClientRect().left;
        var maxL = auVolumePlan.clientWidth - auVolumeGol.offsetWidth;
        document.onmousemove = function (mev) {
            mev.preventDefault();
            var per = volumPercent();
            music.volume = (per / 100) <= 1 ? per / 100 : 1;

            var y = mev.clientX - disX - auVolumePlan.getBoundingClientRect().left;
            if (y < 0) {
                y = 0;
            }
            if (y > maxL) {
                y = maxL;
            }
            auVolumeGol.style.left = y + 'px';
        };
        document.onmouseup = function () {
            var per = volumPercent();
            music.volume = (per / 100) <= 1 ? per / 100 : 1;
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
};


function volumPercent() {
    var per = Math.round((auVolumeGol.getBoundingClientRect().left - auVolumePlan.getBoundingClientRect().left) / (auVolumePlan.offsetWidth - auVolumeGol.offsetWidth) * 100);

    if (per > 100) {
        per = 1;
    }
    if (per < 0) {
        per = 0;
    }
    return per;
}
