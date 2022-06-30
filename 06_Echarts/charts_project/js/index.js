(function() {
    $('.monitor .tabs').on('click', 'a', function() {
        $(this).addClass('active').siblings('a').removeClass('active');
        $('.monitor .content').eq($(this).index()).show().siblings('.content').hide();
    });
    $('.marquee-view .marquee').each(function() {
        var rows = $(this).children().clone();
        $(this).append(rows)
    })
})();
// 点位分布模块饼图
(function() {
    // 1.实例化对象
    var myChart = echarts.init(document.querySelector('.pie'));
    // 2.指定配置项和数据
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [{
            name: '点位统计',
            type: 'pie',
            radius: ['10%', '70%'],
            center: ['50%', '50%'],
            roseType: 'radius',
            label: {
                fontSize: 10
            },
            labelLine: {
                length: 4,
                length2: 4
            },
            data: [
                { value: 30, name: '福建' },
                { value: 28, name: '陕西' },
                { value: 26, name: '山东' },
                { value: 24, name: '黑龙江' },
                { value: 22, name: '浙江' },
                { value: 20, name: '湖南' },
                { value: 18, name: '辽宁' },
                { value: 16, name: '西藏' }
            ]
        }]
    };
    // 赋值
    myChart.setOption(option);
})();