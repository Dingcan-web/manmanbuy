$(function () {
    console.log('injquery');
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getindexmenu',
        data: {},
        type: 'get',
        dataType: 'json',
        success: function (data) {
            var href=['bijia.html','shengqian.html','guonei.html','baicai.html','haitao.html','youhui.html','check.html','more.html','cou.html','kou.html','shang.html','pin.html']

            for (var j = 0; j < data.result.length; j++) {
                    data.result[j].href=href[j]
            }
            //data.result.href=href
            console.log(data);
            var htmltemp = template("template", data)
            $("#menu").html(htmltemp)
            $("#menu .addmore").on('click', function () {
                $(".more").toggle()
            })
            console.log('i am finish');
        }

    })

    //adv data
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getmoneyctrl',
        dataType: 'json',
        data: {},
        success: function (data) {
            console.log(data);
            var detail = template("detail_template", data)
            $("#footer").html(detail)

        }
    })

    $("#getmore").on('click', function () {
        addmore()
    })

    $("#toTop").on('click', function () {
        console.log('i want to Top');
        $("html , body").animate({ scrollTop : 0 } , 1000);
        //$("html").animate({scrollTop:0},1000)
    })

    function addmore() {
        console.log('i am in click');
        $.ajax({
            url: 'http://127.0.0.1:3000/api/getmoneyctrl',
            dataType: 'json',
            data: {},
            success: function (data) {
                console.log(data);
                var detail = template("detail_template", data)
                $("#footer").append(detail)

            }
        })
    }


})