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
             *��ȫû�б�Ҫ��������������Զ������ݣ�����ʹ��ƴ���ַ����ķ�ʽ
             * ��bootstrap�����collapseģ������href=��#aaa�� id=��aaa�������Ӧ��
             *
              * @type {string[]}
             */

            var bijia_menu=template("menu",data)
            $("#bijiao_menu").html(bijia_menu)
//����¼�
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
                        //�����Ҫ���ֵ�ǰ��#collapseOne��Ҫshow


                    }
                })

            })

            /**
             *
            �뷨1��//�뷨������ȡ��������js����
            //forѭ�����ж����Ⱦ

            //�뷨2�����ڶ��������������ӵ�data.result���棬�ٽ�����Ⱦ����Լ��Ⱦ����
             �뷨3��ÿ���һ��a��show������������
             ע�⣺��a���data-id ���һ������һ��
            */

        }
    })
})