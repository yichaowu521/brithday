/**
 * 微信音频自动播放解决方案
 * 不依赖微信 JS-SDK（无需公众号），使用 WeixinJSBridgeReady 事件
 */

(function() {
    function tryPlay(audioEl) {
        if (!audioEl || audioEl._wechatPlayed) return;
        var promise = audioEl.play();
        if (promise && typeof promise.catch === 'function') {
            promise.catch(function() {
                // 自动播放被阻止，静默处理
            });
        }
        audioEl._wechatPlayed = true;
    }

    function setupAudio(audioId) {
        var audio = document.getElementById(audioId);
        if (!audio) return;

        // 微信环境：使用 WeixinJSBridge 触发播放（无需 JS-SDK 签名）
        if (typeof WeixinJSBridge === 'object' && typeof WeixinJSBridge.invoke === 'function') {
            // iOS WKWebView：WeixinJSBridge 已存在
            WeixinJSBridge.invoke('getNetworkType', {}, function() {
                tryPlay(audio);
            });
        } else {
            // Android X5 / 其他情况：等待 WeixinJSBridgeReady 事件
            document.addEventListener('WeixinJSBridgeReady', function() {
                WeixinJSBridge.invoke('getNetworkType', {}, function() {
                    tryPlay(audio);
                });
            }, false);
        }

        // 非微信环境回退：首次用户交互时播放
        var events = ['click', 'touchstart'];
        function playOnInteract() {
            tryPlay(audio);
            events.forEach(function(e) {
                document.removeEventListener(e, playOnInteract);
            });
        }
        events.forEach(function(e) {
            document.addEventListener(e, playOnInteract, { once: true });
        });
    }

    // 暴露全局函数
    window.initWechatAudio = setupAudio;
})();
