$(function() {
    resetui();
    $('#btnSend').on('click', function() {
        var text = $('.inputCon').val().trim();
        if (text.length <= 0) {
            return $('.inputCon').val('');
        }
        $('.list').append('<li class="right"><img src="./img/person02.png" alt=""><span>' + text + '</span></li>');
        $('.inputCon').val('');
        resetui();
        getMsg(text);
    });
    // 获取机器人回复的消息
    function getMsg(text) {
        $.ajax({
            type: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success: function(res) {
                // console.log(res.data.info.text);
                $('.list').append('<li class="left"><img src="./img/person01.png" alt=""><span>' + res.data.info.text + '</span></li>');
                resetui();
                getVoice(res.data.info.text);
            }
        })
    }
    // 将机器人的回复内容转为语音
    function getVoice(text) {
        $.ajax({
            type: 'GET',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: text
            },
            success: function(res) {
                // console.log(res);
                if (res.status == 200) {
                    $('#voice').attr('src', res.voiceUrl)
                }
            }
        })
    }

    // 回车发送消息
    $('.inputCon').on('keyup', function(e) {
        // console.log(e);
        if (e.keyCode === 13) {
            $('#btnSend').click();
        }
    });
});