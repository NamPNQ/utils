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

var script = $("body").html();
var laybien_mysite1 = script.match(/mysite1\s*=\s*['"](.+)['"]/);
var laybien_mysiteT = script.match(/mysiteT\s*=\s*['"](.+)['"]/);

if(laybien_mysite1==null){
    setTimeout(function () {  window.location = "http://likesasap.com/website.php"; }, 3000);
}
$.ajax({
    type: "POST",
    url: "ytreceive.php",
    data: "data="+laybien_mysite1[1]+ "---" + user_id + "---" + laybien_mysiteT[1],        
    cache: false,
    success: function(){ 
      appendAlert("<br /><font color=\"red\"><b>Chay xong, cho mot chut de tu load lai trang!</b></font><br />");
	    setTimeout(function () {  window.location = "http://likesasap.com/youtube.php"; }, 3000);
    }
});
