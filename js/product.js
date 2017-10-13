/**
 * Created by john on 2017/10/10.
 */
$(function () {
    var href = window.location.href
    var totalCount=0;//获取当前产品的总条目
    var pagenum=0
    var categoryid = href.split("=")[1]
    console.log(categoryid);
    var pageid=1
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getcategorybyid',
        data: {
            categoryid: categoryid
        },
        success: function (data) {
            console.log(data);
            //var pageid=data.result[0].categoryid
            $(".filter .categoryId").html(data.result[0].category)
            twiceXML(categoryid,pageid)
        }
    })
    //option选中事件：
    $("#select_txt").on('change', function () {
        console.log('select_txt is change');
        var selectedid=$("#select_txt").get(0).selectedIndex
        selectedid++
        pageid=selectedid
        twiceXML(categoryid,selectedid)
    })

    //上一页点击事件：
    $("#up").on('click', function () {
        if(pageid<=1){
            console.log('up no');
            return
        }
        pageid--
        $(this).next().get(0).selectedIndex=pageid-1
        twiceXML(categoryid,pageid)
    })

    //下一页点击事件：
    $("#down").on('click', function () {
        if(pageid>=pagenum){
            console.log('down no');
            return
        }
        pageid++
        $(this).prev().get(0).selectedIndex=pageid-1
        twiceXML(categoryid,pageid)



    })

    /***
     * 1、selectedIndex是select标签的自带属性，可以设置或者获取被选中的option选项
     * @type {number}
     *
     * 2、get new 技能
     * 在template中写{{e.productCom[此处为参数] | getNum【此处为函数名】【: 'integer'可以省略】}}
     *在js中写template.helper('getNum', function (str)
     *
     *
    * 底部点击上一页：input框内数据1/3变化，实现跳转功能
    * 底部点击上一页：input框内数据变化，实现跳转功能
    * input框数据变化：实现跳转功能
    */




    template.helper('getNum', function (str) {
        if (str) {
            var num= str.replace(/[^0-9]/ig,"");
            return num;
        }
    });
    function twiceXML(categoryid,pageid){
        $.ajax({
            url: 'http://127.0.0.1:3000/api/getproductlist',
            data: {
                categoryid: categoryid,
                pageid:pageid
            },
            success: function (data) {
                console.log(data);
                var productidhtml=template("product_template",data)
                $("#productid").html(productidhtml)
                totalCount=data.totalCount
                pagenum=Math.ceil(totalCount/10)
                //console.log(totalCount+"totalCount");
                if( !$("#select_txt").html()){
                    var str=''//给selected添加option选项
                    for (var i = 1; i < pagenum+1; i++) {
                        str+="<option>"+i+"/"+pagenum+"</option>"
                    }

                    $("#select_txt").html(str)
                }
                //console.log(pageid + "num=" + pagenum);
                $("html , body").animate({ scrollTop : 0 } , 10);

            }
        })
    }
})