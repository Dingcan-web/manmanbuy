/**
 * Created by john on 2017/10/10.
 */
$(function () {
    var href = window.location.href
    var totalCount=0;//��ȡ��ǰ��Ʒ������Ŀ
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
    //optionѡ���¼���
    $("#select_txt").on('change', function () {
        console.log('select_txt is change');
        var selectedid=$("#select_txt").get(0).selectedIndex
        selectedid++
        pageid=selectedid
        twiceXML(categoryid,selectedid)
    })

    //��һҳ����¼���
    $("#up").on('click', function () {
        if(pageid<=1){
            console.log('up no');
            return
        }
        pageid--
        $(this).next().get(0).selectedIndex=pageid-1
        twiceXML(categoryid,pageid)
    })

    //��һҳ����¼���
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
     * 1��selectedIndex��select��ǩ���Դ����ԣ��������û��߻�ȡ��ѡ�е�optionѡ��
     * @type {number}
     *
     * 2��get new ����
     * ��template��д{{e.productCom[�˴�Ϊ����] | getNum���˴�Ϊ����������: 'integer'����ʡ�ԡ�}}
     *��js��дtemplate.helper('getNum', function (str)
     *
     *
    * �ײ������һҳ��input��������1/3�仯��ʵ����ת����
    * �ײ������һҳ��input�������ݱ仯��ʵ����ת����
    * input�����ݱ仯��ʵ����ת����
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
                    var str=''//��selected���optionѡ��
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