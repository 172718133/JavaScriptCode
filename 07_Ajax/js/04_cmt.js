$(function() {
    function getCmtlist() {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/cmtlist',
            data: {},
            success: function(res) {
                // console.log(res);
                if (res.status !== 200) return alert('获取评论列表失败！')
                var list = [];
                $.each(res.data, function(i, item) {
                    list.push('<li class="list-group-item"><span class="badge" style="background-color: #eeac4c;">评论时间：' + item.time + '</span><span class="badge" style="background-color: #5ac0dd;">评论人：' + item.username + '</span> ' + item.content + '</li>');
                });
                $('.list-group').empty().append(list.join(''))
            }
        })
    }
    getCmtlist();
    $('#formAdd').on('submit', function(e) {
        e.preventDefault();
        var data = $(this).serialize();
        data = decodeURIComponent(data, true);
        console.log(data);
        $.post('http://www.liulongbin.top:3006/api/addcmt', data, function(res) {
            if (res.status !== 201) {
                return alert(res.msg)
            };
            getCmtlist();
            $('#formAdd')[0].reset();
        });
    });
});