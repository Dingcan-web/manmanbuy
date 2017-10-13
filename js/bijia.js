/**
 * Created by john on 2017/10/10.
 */
$(function () {
    $("#toTop").on('click', function () {
        console.log('i want to Top');
        $("html , body").animate({ scrollTop : 0 } , 1000);
        //$("html").animate({scrollTop:0},1000)
    })


    $.ajax({
        url: "http://127.0.0.1:3000/api/getcategorytitle",
        success: function (data) {
            console.log(data);
            /***
             *  var collapseIndex=['One','Two','Three','Four','Fif','Six','Seven','Eight',]
             for(var k=0;k < collapseIndex.length;k++){
                data.result[k].collapseIndex=collapseIndex[k]
            }
             *完全没有必要在数据里面添加自定义数据：可以使用拼接字符串的方式
             * 在bootstrap里面的collapse模板里面href=‘#aaa’ id=‘aaa’是相对应的
             *
              * @type {string[]}
             */

            var bijia_menu=template("menu",data)
            $("#bijiao_menu").html(bijia_menu)
//点击事件
            console.log($(".menu-id"));
            $(".menu-id").on('click', function () {
                var Isthis=this
                var titleId=$(this).data('id')

                console.log(titleId);
                $.ajax({
                    url:'http://127.0.0.1:3000/api/getcategory',
                    data:{
                        titleid:titleId
                    },
                    success: function (data0) {
                        console.log(data0);
                        var tableMenu=template('table-menu',data0)
                        $(Isthis).parents(".panel").find('.panel-collapse').html(tableMenu)
                        //点击还要显现当前的#collapseOne需要show


                    }
                })

            })

            /**
             *
            想法1：//想法：将获取的数据在js遍历
            //for循环进行多次渲染

            //想法2：将第二次请求的数据添加到data.result里面，再进行渲染，节约渲染次数
             想法3：每点击一次a，show出下面详情表格；
             注意：给a添加data-id 点击一次请求一个
            */

        }
    })
})