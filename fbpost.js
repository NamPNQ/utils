var user_id="127285"; var user_ten="chienthan1612";var extime="0";
function checktime(){
    if (extime==0){
        retime="Cảm ơn "+user_ten+" đã tin tưởng và và sử dụng tool.<br />Bạn được sử dụng tool vĩnh viễn.";
    }
    else if(extime > 0){
        retime="Cảm ơn "+user_ten+" đã tin tưởng và và sử dụng tool.<br />Bạn còn được sử dụng tool trong <span id=\"countdown\"></span> nữa.";
        var countdowntime=self.setInterval(function(){counttimedown()},1000);
    }
    else{
        retime="Cảm ơn "+user_ten+" đã tin tưởng và và sử dụng tool.<br />Bạn cần hỗ trợ mình để tool tiếp tục hoạt động.";
    }
    $("div#liketool small").html(retime);
}

function counttimedown(){
    
    if(extime<0){
        checktime();
        clearInterval(countdowntime);
    }
    else{
    ngay=parseInt(extime / 86400);
    gio=parseInt((extime%86400)/3600);
    phut=parseInt(((extime%86400)%3600)/60);
    giay=parseInt(((extime%86400)%3600)%60);
    $("div#liketool small span#countdown").html(ngay+" ngày "+gio+" giờ "+phut+" phút "+giay+" giây ");   
    }
    
    
    extime--;
}


function check_rate(){
    $.get("profile.php", function(data) {
        lt_likesmade=data.match(/Likes\sMade<\/label><\/td><td width=\"20\"><\/td><td>(\d+)<\/td><\/tr>/)[1];
        lt_unlike=data.match(/Unlikes \(Reports\)<\/label><\/td><td width=\"20\"><\/td><td>(\d+)<\/td><\/tr>/)[1];
        
        
        $("div#liketool h2 a").append("<br /><br />Rate:"+parseInt(lt_unlike*100/lt_likesmade)+"% - "+parseInt((lt_unlike*100/4)-lt_likesmade));
    });
}

$("body").append("<div style=\"position:fixed;right:20px;bottom:0px;height:418px;width:380px;display:block;background:#fff;border-top:1px solid #000;border-left:1px solid #000;border-right:1px solid #000;border-radius:3px 3px 0px 0px;\" id=\"liketool\"></div>");
$("div#liketool").html("<h2><a href=\"http://hs2t.com/\">Liketool - Hs2T.com</a></h2><small id=\"countdown\" style=\"color: #000;\"></small>");
checktime();
check_rate();






function appendAlert(msg){
    $("div#liketool").append(msg);
}
var iframe = "<iframe width='468' height='60' frameborder='0' src='http://www.ptp22.com/seo.php?username=leeshin456&format=468x60' marginwidth='0' marginheight='0' vspace='0' hspace='0' allowtransparency='true' scrolling='no'></iframe>";
//$("div#body center").eq(0).html(iframe);


appendAlert("<br /><b>Start!</b><br />");

appendAlert("<br />Tổng số "+$("input[value=\"Confirm\"]").size()+" likes");
var count=0;
function setLike(likeEq, myusername1){
    temp=$("input[value=\"Confirm\"]").eq(likeEq).attr("onclick").toString().split("'");
    $.post('fbphotoscheck.php',{details: temp[1], fbname: myusername1, id: temp[5], uid: temp[7]} ,  function(msg){
        aaa = msg.substr(2);
        if ( aaa == 'no' ){
            $(".lt_likeEq"+likeEq).html(" Skip");
        }
        else {
            $(".lt_likeEq"+likeEq).html(" Ok");
        }
    });
}

function getLikeName(){
    appendAlert("<br />Like "+(count+1)+" <span class=\"lt_likeEq"+count+"\">Get human <img src=\"//ilovehagiang.com/bankapi/libraries/images/loading16.gif\" /></span>");
    fbpageid=/[0-9]{13,17}/.exec($("input[value=\"Confirm\"]").eq(count).attr("onclick").toString());
    var url = "//tienich.hs2t.com/likesasap.com/likesasap.com.fbphotos.php?fbid="+fbpageid+"&callback=?";
    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        jsonpCallback: 'jsonCallback',
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(json) {
            $(".lt_likeEq"+count).html(json.name);
            setLike(count, json.name);
            setTimeout(function () { getLikeName(); }, 1000);
            count++;
            if(count>=$("input[value=\"Confirm\"]").size()){
                setTimeout(function () {  window.location = "http://likesasap.com/fbphotos.php"; }, 5000);
            }
        },
        error: function(e) {
            console.log(e.message);
//            setTimeout(function () {  window.location = "http://likesasap.com/fbsite.php"; }, 5000);
        }
    });
    
}

//if($("input[value=\"Confirm\"]").size()>0){
//
//        setTimeout(function () { getLikeName(); }, 1000);
//}

//else{
    setTimeout(function () {  window.location = "http://likesasap.com/fbsite.php"; }, 5000);
//}
