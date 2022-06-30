$(function() {
    load();
    $("#title").on("keydown", function(e) {
        if (e.keyCode === 13) {
            if ($(this).val().length == 0) {
                alert("请输入内容")
            } else {
                var local = getData();
                local.push({ title: $(this).val(), done: false });
                saveData(local);
                $(this).val("");
                load();
            }
        }
    });
    // 读取本地存储的数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            // 将数据转换为 JavaScript 对象
            return JSON.parse(data)
        } else {
            return [];
        }
    };
    // 保存数据到缓存
    function saveData(data) {
        // 将 JavaScript 值转换为 JSON 字符串
        localStorage.setItem("todolist", JSON.stringify(data))
    };
    // 加载渲染数据
    function load() {
        var data = getData();
        var todocount = 0;
        var donecount = 0;
        $("section ul,section ol").empty();
        $.each(data, function(i, n) {
            if (n.done) {
                $("section ul").prepend("<li><input type='checkbox' checked='checked'><div class='con'>" + n.title + "</div><a href='#' id=" + i + ">×</a></li>");
                todocount++;
                // console.log(todocount);
            } else {
                $("section ol").prepend("<li><input type='checkbox'><div class='con'>" + n.title + "</div><a href='#' id=" + i + ">×</a></li>");
                donecount++;
                // console.log(donecount);
            }
        });
        $(".todo").html(todocount);
        $(".done").text(donecount);
    };
    // 点击删除该条存储
    $("section ul,section ol").on("click", "a", function() {
        // 获取存储的数据
        var data = getData();
        // 自定义id属性作为索引值
        var index = $(this).attr("id");
        // 根据索引值删除对应的数据
        data.splice(index, 1);
        // 修改后重新保存到存储
        saveData(data);
        // 重新渲染数据
        load();
    });
    // 单选框点击事件
    $("section ul,section ol").on("click", "input", function() {
        // 获取数据
        var data = getData();
        // 修改数据
        var index = $(this).siblings("a").attr("id");
        console.log(index);
        // console.log(data[index].done);
        data[index].done = $(this).prop("checked");
        console.log(data[index].done);
        // 保存数据
        saveData(data);
        // 渲染数据
        load();
    });
})