/**
 * Created by john on 2017/10/12.
 */
$(function(){
    console.log('i ma in');
    var href=window.location.href
    productId=href.split("?")[1].split("&")[0].split("=")[1]
    categoryId=href.split("?")[1].split("&")[1].split("=")[1]
    console.log('productId==='+productId);
    console.log('categoryId==='+categoryId);
    /***
     * ҳ��ˢ�½���http://127.0.0.1:3000/api/getproduct
     */
    $.ajax({
        //url:'http://127.0.0.1:3000/api/getproduct',//��Ʒ����
        url:'http://127.0.0.1:3000/api/getcategorybyid',//��Ʒ����
        //url:'http://127.0.0.1:3000/api/getproductcom',//������Ϣ
        dataType:'json',
        data:{
            categoryid:categoryId,
        },
        success: function (data) {
            //console.log(data);
            $("#product_name").html(data.result[0].category)
        }
    })
    $.ajax({
        url:'http://127.0.0.1:3000/api/getproduct',//��Ʒ����
        data:{
            productid:productId,
        },
        success: function (data) {
            console.log(data);
            $("#categoryId").html(data.result[0].productName.split(" ")[0])
            $("#product_detail_price").html(data.result[0].bjShop)
            $("#product_detail .product_name").html(data.result[0].productName)
            $("#product_detail .product_img").html(data.result[0].productImg)

            $.ajax({
                url:'http://127.0.0.1:3000/api/getproductcom',//������Ϣ
                //url:'http://127.0.0.1:3000/api/getproduct',//��Ʒ����
                data:{
                    productid:productId,
                },
                success: function (data) {
                    console.log(data);
                    var messagesHTML=template("messages_id",data)
                    console.log(messagesHTML);
                    $("#messages").html(messagesHTML)

                }
            })
        }

    })
})