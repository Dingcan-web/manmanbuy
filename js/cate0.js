/**
 * Created by john on 2017/10/10.
 */
$(function () {
    var href=window.location.href
    console.log(href);
    $.ajax({
        url:'http://127.0.0.1:3000/api/getcategorybyid',
        data:{
            
        },
        success: function (data) {
            console.log(data);
        }
    })
})