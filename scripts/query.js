$(function () {
    $("#chatsumbit").click(function () {
        $.post({
            url: "sendMsg",
            type: 'POST',
            data: {
                chatname: $("#chatname").val(),
                msg: $("#msg").val()
            },
            success: function (msg) {
                $("#msg").val("")
            }
        });
    });
})