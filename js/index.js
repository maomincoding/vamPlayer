let timer = null;
let disX = 0;
let disL = 0;
function $(el) {
  return document.querySelector(el);
}
function showEl(el) {
  $(el).style.display = "block";
}
function hideEl(el) {
  $(el).style.display = "none";
}
function setVp(w, h) {
  $(".video-player").style.width = w + "px";
  $(".video-player").style.height = h + "px";
  $(".video-box").style.width = w + "px";
  $(".video-box").style.height = h + "px";
  $(".pv-bar").style.width = w + "px";
}
// 时间格式化
function changeTime(iNum) {
  let iN = parseInt(iNum);
  const iH = toZero(Math.floor(iN / 3600));
  const iM = toZero(Math.floor((iN % 3600) / 60));
  const iS = toZero(Math.floor(iN % 60));
  return iH + ":" + iM + ":" + iS;
}
// 整0处理
function toZero(num) {
  if (num <= 9) {
    return "0" + num;
  } else {
    return "" + num;
  }
}
// 底部控制栏
$(".video-box").onmouseenter = function () {
  $(".bottom-tool").style.bottom = "0px";
};
$(".video-box").onmouseleave = function () {
  $(".bottom-tool").style.bottom = "-45px";
};

// 倍速播放栏(显示/隐藏)
$(".pv-spnum").onmouseover = function () {
  showEl(".selectList");
};
$(".pv-controls").onmouseleave = function () {
  hideEl(".selectList");
};

// 播放/暂停
$(".play-btn").onclick = function () {
  if ($(".video-player").paused) {
    $(".video-player").play();
    hideEl(".icon-bofang");
    showEl(".icon-zanting");
    nowTime();
    timer = setInterval(nowTime, 1000);
  } else {
    $(".video-player").pause();
    showEl(".icon-bofang");
    hideEl(".icon-zanting");
    clearInterval(timer);
  }
};

// 总时长
$(".video-player").oncanplay = function () {
  $(".pv-duration").innerHTML = changeTime($(".video-player").duration);
};
$(".video-player").onended = function (params) {
  showEl(".icon-bofang");
  hideEl(".icon-zanting");
};

// 播放时长
function nowTime() {
  $(".pv-currentTime").innerHTML = changeTime($(".video-player").currentTime);
  let scale = $(".video-player").currentTime / $(".video-player").duration;
  let w = $(".pv-bar").offsetWidth - $(".pv-dot").offsetWidth;
  $(".pv-dot").style.left = scale * w + "px";
  $(".pv-played").style.width = scale * w + "px";
}

// 静音/取消静音
$(".pv-iconyl").onclick = function () {
  if ($(".video-player").muted) {
    $(".video-player").volume = 1;
    hideEl(".icon-jingyin");
    showEl(".icon-yinliang");
    $(".video-player").muted = false;
  } else {
    $(".video-player").volume = 0;
    showEl(".icon-jingyin");
    hideEl(".icon-yinliang");
    $(".video-player").muted = true;
  }
};
let isfullScreen = false;
// 全屏
$(".pv-screen").onclick = function () {
  const w = document.documentElement.clientWidth || document.body.clientWidth;
  const h = document.documentElement.clientHeight || document.body.clientHeight;
  isfullScreen = !isfullScreen;
  if (isfullScreen) {
    setVp(w, h);
    hideEl(".icon-quanping");
    showEl(".icon-huanyuan");
  } else {
    setVp(900, 480);
    showEl(".icon-quanping");
    hideEl(".icon-huanyuan");
  }
};
// 播放进度条
$(".pv-dot").onmousedown = function (ev) {
  let ev1 = ev || window.event;
  disX = ev1.clientX - $(".pv-dot").offsetLeft;
  document.onmousemove = function (ev) {
    let ev2 = ev || window.event;
    let L = ev2.clientX - disX;
    if (L < 0) {
      L = 0;
    } else if (L > $(".pv-bar").offsetWidth - $(".pv-dot").offsetWidth) {
      L = $("..pv-bar").offsetWidth - $(".pv-dot").offsetWidth;
    }
    $(".pv-dot").style.left = L + "px";

    let scale = L / ($(".pv-bar").offsetWidth - $(".pv-dot").offsetWidth);
    $(".video-player").currentTime = scale * $(".video-player").duration;
    nowTime();
  };

  document.onmouseup = function () {
    document.onmousemove = null;
  };

  return false;
};
// 音量控制
$(".pv-ol").onmousedown = function (ev) {
  let ev1 = ev || window.event;
  disL = ev1.clientX - $(".pv-ol").offsetLeft;
  document.onmousemove = function (ev) {
    let ev2 = ev || window.event;
    let L = ev2.clientX - disL;
    if (L < 0) {
      L = 0;
    } else if (L > $(".pv-yl").offsetWidth - $(".pv-ol").offsetWidth) {
      L = $(".pv-yl").offsetWidth - $(".pv-ol").offsetWidth;
    }
    $(".pv-ol").style.left = L + "px";
    let scale = L / ($(".pv-yl").offsetWidth - $(".pv-ol").offsetWidth);
    $(".pv-bg").style.width = $(".pv-ol").offsetLeft + "px";
    if ($(".pv-ol").offsetLeft !== 0) {
      showEl(".icon-yinliang");
      hideEl(".icon-jingyin");
    } else {
      showEl(".icon-jingyin");
      hideEl(".icon-yinliang");
    }
    $(".video-player").volume = scale;
  };

  document.onmouseup = function () {
    document.onmousemove = null;
  };

  return false;
};
// 播放速度
$(".selectList").onclick = function (e) {
  let ev = e || window.event;
  hideEl(".selectList");
  $(".pv-spnum").innerText = e.target.innerText;
  const value = e.target.innerText.replace("x", "");
  $(".video-player").playbackRate = value;
};
