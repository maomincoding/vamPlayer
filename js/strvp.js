const strHtml = `
<div class="video-box" onmouseenter="vp.bottomTup()" onmouseleave="vp.bottomTdow()">
      <video class="video-player" oncanplay="vp.useOnplay()" onended="vp.useEnd()"></video>
      <div class="bottom-tool">
        <div class="pv-bar">
          <div class="pv-played"></div>
          <div class="pv-dot" onmousedown="vp.useTime()"></div>
        </div>
        <div class="pv-controls" onmouseleave="vp.selectListHide()">
          <div class="pc-con-l">
            <div class="play-btn" onclick="vp.usePlay()">
              <i class="iconfont icon-bofang"></i>
              <i class="iconfont icon-zanting hide"></i>
            </div>
            <div class="pv-time">
              <span class="pv-currentTime">00:00:00</span>
              <span>/</span>
              <span class="pv-duration">00:00:00</span>
            </div>
          </div>
          <div class="pc-con-r">
            <div class="pv-listen ml">
              <div class="pv-yl">
                <p class="pv-ol" onmousedown="vp.useListen()"></p>
                <p class="pv-bg"></p>
              </div>
              <div class="pv-iconyl" onclick="vp.useVolume()">
                <i class="iconfont icon-yinliang"></i>
                <i class="iconfont icon-jingyin hide"></i>
              </div>
            </div>
            <div class="pv-speed ml">
              <p class="pv-spnum" onmouseover="vp.selectListShow()">1x</p>
              <ul class="selectList" onclick="vp.useSpnum()">
                <li>0.5x</li>
                <li>1x</li>
                <li>1.25x</li>
                <li>1.5x</li>
                <li>2x</li>
              </ul>
            </div>
            <div class="pv-screen ml" onclick="vp.fullScreen()">
              <i class="iconfont icon-quanping"></i>
              <i class="iconfont icon-huanyuan hide"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
`;