$(function(){
    $("#category").hover(function(){
        $("#myline2").hide();
        $("#myline").show();
        $("#category").addClass('mysucai');
        $("#myxiala").show();
    },function(){
        $("#myline").hide();
        $("#category").removeClass('mysucai');
        $("#myxiala").hide();
    });
    $("#activity").hover(function(){
        $("#myline2").show();
        $("#activity").addClass('mysucai');
        $("#myxiala2").show();
    },function(){
        $("#myline2").hide();
        $("#activity").removeClass('mysucai');
        $("#myxiala2").hide();
    });

    $("#tool").hover(function(){
        $("#myline3").show();
        $("#tool").addClass('mysucai');
        $("#myxiala3").show();
    },function(){
        $("#myline3").hide();
        $("#tool").removeClass('mysucai');
        $("#myxiala3").hide();
    });

    $("#myxiala,#myline").hover(function(){
        $("#myline").show();
        $("#category").addClass('mysucai');
        $("#myxiala").show();
    },function(){
        $("#myline").hide();
        $("#category").removeClass('mysucai');
        $("#myxiala").hide();
    });
    $("#myxiala2,#myline2").hover(function(){
        $("#myline2").show();
        $("#activity").addClass('mysucai');
        $("#myxiala2").show();
    },function(){
        $("#myline2").hide();
        $("#activity").removeClass('mysucai');
        $("#myxiala2").hide();
    });
    $("#myxiala3,#myline3").hover(function(){
        $("#myline3").show();
        $("#tool").addClass('mysucai');
        $("#myxiala3").show();
    },function(){
        $("#myline3").hide();
        $("#tool").removeClass('mysucai');
        $("#myxiala3").hide();
    });
})