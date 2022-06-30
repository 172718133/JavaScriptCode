window.addEventListener('load', function() {
    var swiper = this.document.querySelector('.swiper');
    var arrowl = this.document.querySelector('.arrowl');
    var arrowr = this.document.querySelector('.arrowr');
    var num = 0;
    var round = 0;
    var flag = true;
    // 获取图片的宽度
    var swiperWidth = swiper.offsetWidth;
    // 鼠标经过显示左右按钮
    swiper.addEventListener('mouseenter', function() {
        arrowl.style.display = 'block';
        arrowr.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    // 鼠标经过隐藏左右按钮
    swiper.addEventListener('mouseleave', function() {
        arrowl.style.display = 'none';
        arrowr.style.display = 'none';
        timer = setInterval(function() {
            arrowr.click();
        }, 2000)
    });
    var ul = swiper.querySelector('ul');
    var circle = swiper.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        // 创建li节点
        var li = this.document.createElement('li');
        // 创建自定义属性  索引号
        li.setAttribute('index', i)
        circle.appendChild(li);
        circle.children[0].className = 'current';
        li.addEventListener('mouseenter', function() {
            for (var i = 0; i < circle.children.length; i++) {
                circle.children[i].className = '';
            }
            this.className = 'current';
            // 获取索引号
            var index = this.getAttribute('index');
            num = index;
            round = index;
            // 调用动画函数
            animate(ul, -index * swiperWidth, function() {})
        });
    }
    // 克隆第一张图片
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first)
    arrowr.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * swiperWidth, function() {
                flag = true;
            });
            round++;
            if (round == circle.children.length) {
                round = 0;
            }
            circleChange()
        }
    });
    arrowl.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                ul.style.left = -(ul.children.length - 1) * swiperWidth + 'px';
                num = ul.children.length - 1;
            }
            num--;
            animate(ul, -num * swiperWidth, function() {
                flag = true;
            });
            round--;
            // if (round < 0) {
            //     round = circle.children.length - 1;
            // }
            round = round < 0 ? circle.children.length - 1 : round
            circleChange()
        }
    });

    function circleChange() {
        for (var i = 0; i < circle.children.length; i++) {
            circle.children[i].className = '';
            circle.children[round].className = 'current';
        }
    }
    var timer = setInterval(function() {
        arrowr.click();
    }, 2000)
});