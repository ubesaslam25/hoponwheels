// $(function() {
//     var currentDate = new Date();
//     var currentMonths = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];
//     if(currentDate.getDate() == 1){
//         var currentDates = "01";
//     }else if(currentDate.getDate() == 2){
//         var currentDates = "02";
//     }else if(currentDate.getDate() == 3){
//         var currentDates = "03";
//     }else if(currentDate.getDate() == 4){
//         var currentDates = "04";
//     }else if(currentDate.getDate() == 5){
//         var currentDates = "05";
//     }else if(currentDate.getDate() == 6){
//         var currentDates = "06";
//     }else if(currentDate.getDate() == 7){
//         var currentDates = "07";
//     }else if(currentDate.getDate() == 8){
//         var currentDates = "08";
//     }else if(currentDate.getDate() == 9){
//         var currentDates = "09";
//     }else{
//         var currentDates = currentDate.getDate();
//     }
//     $("#pickupdate,#returndate").html(currentDates);
//     $("#pickupmonth,#returnmonth").html(currentMonths[currentDate.getMonth()]);
//     if(currentDate.getHours() >= 12){
//         if(currentDate.getHours() == 12){
//             var currentHour = "12";
//         }else if(currentDate.getHours() == 13){
//             var currentHour = "01";
//         }else if(currentDate.getHours() == 14){
//             var currentHour = "02";
//         }else if(currentDate.getHours() == 15){
//             var currentHour = "03";
//         }else if(currentDate.getHours() == 16){
//             var currentHour = "04";
//         }else if(currentDate.getHours() == 17){
//             var currentHour = "05";
//         }else if(currentDate.getHours() == 18){
//             var currentHour = "06";
//         }else if(currentDate.getHours() == 19){
//             var currentHour = "07";
//         }else if(currentDate.getHours() == 20){
//             var currentHour = "08";
//         }else if(currentDate.getHours() == 21){
//             var currentHour = "09";
//         }else if(currentDate.getHours() == 22){
//             var currentHour = "10";
//         }else if(currentDate.getHours() == 23){
//             var currentHour = "11";
//         }else if(currentDate.getHours() == 24){
//             var currentHour = "00";
//         }
//         $("#pickuptime,#returntime").html(currentHour+":"+currentDate.getMinutes()+" PM");
//     }else{
//         if(currentDate.getHours() == "00"){
//             var currentHour = "00";
//         }else if(currentDate.getHours() == 1){
//             var currentHour = "01";
//         }else if(currentDate.getHours() == 2){
//             var currentHour = "02";
//         }else if(currentDate.getHours() == 3){
//             var currentHour = "03";
//         }else if(currentDate.getHours() == 4){
//             var currentHour = "04";
//         }else if(currentDate.getHours() == 5){
//             var currentHour = "05";
//         }else if(currentDate.getHours() == 6){
//             var currentHour = "06";
//         }else if(currentDate.getHours() == 7){
//             var currentHour = "07";
//         }else if(currentDate.getHours() == 8){
//             var currentHour = "08";
//         }else if(currentDate.getHours() == 9){
//             var currentHour = "09";
//         }else if(currentDate.getHours() == 10){
//             var currentHour = "10";
//         }else if(currentDate.getHours() == 11){
//             var currentHour = "11";
//         }
//         $("#pickuptime,#returntime").html(currentHour+":"+currentDate.getMinutes()+" AM");
//     }
//     $("#pickupdatepicker").change(function() {
//         var date = $(this).datetimepicker("getDate");
//         var months = [ "Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];
//         var day = date.context.defaultValue.split(" ")[0].split("/")[2];
//         var month = months[date.context.defaultValue.split(" ")[0].split("/")[1]];
//         var time = date.context.defaultValue.split(" ")[1];
//         if(time.split(":")[0] >= 12){
//             if(time.split(":")[0] == 12){
//                 var finalTime = time+" PM";
//             }else if(time.split(":")[0] == 13){
//                 var finalTime = "01:"+time.split(":")[1]+" PM";
//             }else if(time.split(":")[0] == 14){
//                 var finalTime = "02:"+time.split(":")[1]+" PM";
//             }else if(time.split(":")[0] == 15){
//                 var finalTime = "03:"+time.split(":")[1]+" PM";
//             }else if(time.split(":")[0] == 16){
//                 var finalTime = "04:"+time.split(":")[1]+" PM";
//             }else if(time.split(":")[0] == 17){
//                 var finalTime = "05:"+time.split(":")[1]+" PM";
//             }else if(time.split(":")[0] == 18){
//                 var finalTime = "06:"+time.split(":")[1]+" PM";
//             }else if(time.split(":")[0] == 19){
//                 var finalTime = "07:"+time.split(":")[1]+" PM";
//             }else if(time.split(":")[0] == 20){
//                 var finalTime = "08:"+time.split(":")[1]+" PM";
//             }else if(time.split(":")[0] == 21){
//                 var finalTime = "09:"+time.split(":")[1]+" PM";
//             }else if(time.split(":")[0] == 22){
//                 var finalTime = "10:"+time.split(":")[1]+" PM";
//             }else if(time.split(":")[0] == 23){
//                 var finalTime = "11:"+time.split(":")[1]+" PM";
//             }
//         }else{
//             if(time.split(":")[0] == "00"){
//                 var finalTime = "12:"+time.split(":")[1]+" AM";
//             }else{
//                 var finalTime = time+" AM";
//             }
//         }
//         $("#pickupdate").text(day);
//         $("#pickupmonth").text(month);
//         $("#pickuptime").text(finalTime);
//         // $("#pickupdate").text(date.getDate());
//         // $("#pickupmonth").text(months[date.getMonth()]);
//     });
//     $("#returndatepicker").change(function(e) {
//         var date = $(this).datetimepicker("getDate");
//         var months = [ "Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];
//         var day = date.context.defaultValue.split(" ")[0].split("/")[2];
//         var month = months[date.context.defaultValue.split(" ")[0].split("/")[1]];
//         var time = date.context.defaultValue.split(" ")[1];
//         if(time.split(":")[0] >= 12){
//             if(time.split(":")[0] == 12){
//                 var finalTime = time+" PM";
//             }else if(time.split(":")[0] == 13){
//                 var finalTime = "01:"+time.split(":")[1]+" PM";
//             }else if(time.split(":")[0] == 14){
//                 var finalTime = "02:"+time.split(":")[1]+" PM";
//             }else if(time.split(":")[0] == 15){
//                 var finalTime = "03:"+time.split(":")[1]+" PM";
//             }else if(time.split(":")[0] == 16){
//                 var finalTime = "04:"+time.split(":")[1]+" PM";
//             }else if(time.split(":")[0] == 17){
//                 var finalTime = "05:"+time.split(":")[1]+" PM";
//             }else if(time.split(":")[0] == 18){
//                 var finalTime = "06:"+time.split(":")[1]+" PM";
//             }else if(time.split(":")[0] == 19){
//                 var finalTime = "07:"+time.split(":")[1]+" PM";
//             }else if(time.split(":")[0] == 20){
//                 var finalTime = "08:"+time.split(":")[1]+" PM";
//             }else if(time.split(":")[0] == 21){
//                 var finalTime = "09:"+time.split(":")[1]+" PM";
//             }else if(time.split(":")[0] == 22){
//                 var finalTime = "10:"+time.split(":")[1]+" PM";
//             }else if(time.split(":")[0] == 23){
//                 var finalTime = "11:"+time.split(":")[1]+" PM";
//             }
//         }else{
//             if(time.split(":")[0] == "00"){
//                 var finalTime = "12:"+time.split(":")[1]+" AM";
//             }else{
//                 var finalTime = time+" AM";
//             }
//         }
//         $("#returndate").text(day);
//         $("#returnmonth").text(month);
//         $("#returntime").text(finalTime);
//         // $("#returndate").text(date.getDate());
//         // $("#returnmonth").text(months[date.getMonth()]);
//     });
//     $('#pickuptimepicker').timepicker();
// });

$(function() {
    $('a[href="#wrap-body"]').on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
    });
});

// $(function() {
//     "use strict";
//     $('#customers-testimonials').owlCarousel({
//         loop: true,
//         center: true,
//         items: 3,
//         margin: 0,
//         autoplay: true,
//         dots:false,
//         autoplayTimeout: 8500,
//         smartSpeed: 450,
//         responsive: {
//           0: {
//             items: 1
//           },
//           768: {
//             items: 2
//           },
//           1170: {
//             items: 3
//           }
//         }
//     });
// });