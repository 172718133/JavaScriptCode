function animate(obj, target, callback) {
    // 一开始先清除之前的动画，避免造成定时器多开
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        // 定义步长
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer)
            callback && callback();
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}