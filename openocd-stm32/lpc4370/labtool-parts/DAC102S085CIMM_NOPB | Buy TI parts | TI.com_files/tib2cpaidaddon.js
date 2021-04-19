/*
 * [y] hybris Platform
 *
 * Copyright (c) 2017 SAP SE or an SAP affiliate company.  All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */


$( window ).on( "load", function() {
        if ($('.js-enable-on-load').length > 0) {
        $('.js-enable-on-load').each(function() {
                $(this).removeClass('js-enable-on-load');
        });
    }
});


function isNumber(event){
	var keycode=event.keyCode;
	if(keycode>=48 && keycode<58){
		return true;
	}
	return false;

}

$("#notifyEmail").change(function(){ 
	 var emailPattern = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,20}$/;
	    var notifyEmail = $('#notifyEmail').val();
	    if (notifyEmail == "" || !emailPattern.test(notifyEmail)) {
	    	$('#tiB2CPaid-notify-email-error').css('display', 'block');
	    }
	    else{
	    	$('#tiB2CPaid-notify-email-error').css('display', 'none');
}
});

$('#LimitTxtbx').on("paste", function(){
	var quantity = $('#LimitTxtbx').val();
	if (quantity && Number.isInteger(Number(quantity))){
		$("#Txtbx_Errmsg_IC").css('display', 'none');	
	}
	else{
		$("#Txtbx_Errmsg_IC").css('display', 'block');
	}
})

$('#tiB2CPaidNotifyMe').click(function(e) {
    e.preventDefault();
    $('#tiB2CPaid-notify-email-error').css({
    	'display':'none',
    });
    var prodCode = $('#tiB2CPaid-notify-product').val();
    var pdbPartType =$('#tiB2CPaid-notify-pdbPartType').val();
    var limit =  $('#tiB2CPaid-notify-test').val();
    var limitFormattedValue =  addCommasToNum(limit);
    var emailPattern = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,20}$/;
    var notifyEmail = $('#notifyEmail').val();
    var quantity = $('#LimitTxtbx').val(); 
    if((parseInt(quantity) > parseInt(limit)) && (pdbPartType == 6 || pdbPartType == 06))	{
			$(".pre1").remove();
			$("#Txtbx_Errmsg_IC").hide();
			$("#Txtbx_Errmsg_Limit1").css('display', 'block');
			$("#Txtbx_Errmsg-DYN").text(" "+limitFormattedValue+" ");
			$("#Txtbx_Errmsg_Limit1").append($("#Txtbx_Errmsg_Limit2").css('display', 'inline'));
	} 
    else if(quantity==0 || !Number.isInteger(Number(quantity))){
    	if(pdbPartType != 6 || pdbPartType != 06){
			$("#Txtbx_Errmsg_Limit1").hide();
			$("#Txtbx_Errmsg_IC").css('display', 'block');
    	
			}

		 else{
			$(".pre1").remove();
			$("#Txtbx_Errmsg_IC").hide();
			$("#Txtbx_Errmsg_Limit1").css('display', 'block');
			$("#Txtbx_Errmsg-DYN").text(" "+limitFormattedValue+" ");
			$("#Txtbx_Errmsg_Limit1").append($("#Txtbx_Errmsg_Limit2").css('display', 'inline'));
		}
    }
    else if(notifyEmail == "" || !emailPattern.test(notifyEmail) || prodCode =="" ) {
    	$("#Txtbx_Errmsg_Limit1").hide();
		$("#Txtbx_Errmsg_IC").hide();
    	$('#tiB2CPaid-notify-email-error').css('display', 'block');
    }
    
    else{
	    $.ajax({
	        url: ACC.config.encodedContextPath + "/tinotify/notifyEmail?",
	        data:{productId: prodCode , customerEmail: notifyEmail, qty:quantity},        
	        type: 'POST',
	        success:function(res){
	        	$("#tiB2CPaid-target-modal-email").modal('hide');
	    		  $("#tiB2CPaid-notify_enabled-modal-email").modal('show');
	        },
	        error: function(xhr, errorType, exception){
	        	$("#tiB2CPaid-target-modal-email").html("");
	        	$("modal-body").html("");
	        	$("#MainModal").modal('show');
	     }
	    });
    }
});

$('.tiB2CPaidNotify').click(function(e) {
	var dataValueObj = $(this). data('value');
	var pdbPartType = dataValueObj.key2;
	var limit = dataValueObj.key1;
	
	
	  $("#tiB2CPaid-target-modal-email").modal("show");
	  if(pdbPartType==6 || pdbPartType==06){
		  $(".check_6").show();
	  }else{
		  $(".check_6").hide();
	  }
	    e.preventDefault();
		var prdtCode = $(this).attr('data-id');
		var defaultEmail = $('#tiB2CPaid-defaultEmail').val();
		var qtyValid= false; 	
		var emailValid=false;
	    $(".modal-body #tiB2CPaid-notify-product").val(prdtCode);
	    $(".modal-body #tiB2CPaid-notify-pdbPartType").val(pdbPartType);
	    $(".modal-body #notifyEmail").val(defaultEmail);
	 
	        	var qtyValid= false;
	        	var emailValid=false;
	                $(".modal-body #tiB2CPaid-notify-test").val(limit);
	                var limitFormattedValue =  addCommasToNum(limit);
	                                $("#limitid").text(limitFormattedValue);
	                                $("#LimitTxtbx").val('');
	                                $("#Txtbx_Errmsg_Limit1").hide();
									$("#Txtbx_Errmsg_IC").hide();
	               	        	 	$("#tiB2CPaid-notify-email-error").hide();
	                                $("#LimitTxtbx").focusout(function(){ 
	                            		var txtval= $("#LimitTxtbx").val();
	                            	
	                            		

	                            		if(parseInt(txtval) > parseInt(limit) && (pdbPartType == 6 || pdbPartType == 06)){
	                            			 
	                            				$(".pre1").remove();
												$("#Txtbx_Errmsg_IC").hide();
		                            			$("#Txtbx_Errmsg_Limit1").css('display', 'block');
		                            			$("#Txtbx_Errmsg-DYN").text(" "+limitFormattedValue+" ");
		                            			$("#Txtbx_Errmsg_Limit1").append($("#Txtbx_Errmsg_Limit2").css('display', 'inline'));

	                            		} else if(txtval == 0 || !Number.isInteger(Number(txtval))){
	                            			if(pdbPartType != 6 || pdbPartType != 06){
	                            				
	                            				$("#Txtbx_Errmsg_Limit1").hide();
	                            				$("#Txtbx_Errmsg_IC").css('display', 'block');
	                            				
	                            				}
	                            			
	                            			 else{
	                            				$(".pre1").remove();
												$("#Txtbx_Errmsg_IC").hide();
		                            			$("#Txtbx_Errmsg_Limit1").css('display', 'block');
		                            			$("#Txtbx_Errmsg-DYN").text(" "+limitFormattedValue+" ");
		                            			$("#Txtbx_Errmsg_Limit1").append($("#Txtbx_Errmsg_Limit2").css('display', 'inline'));
	                            			}
	                            		}
	                            		else{
	                            			$("#Txtbx_Errmsg_Limit1").hide();
	                            			$("#Txtbx_Errmsg_IC").hide();
	                            			qtyValid= true;
	                            		}
	                            	});
	             
			    if(defaultEmail !=null && defaultEmail!=''){
			    	 $('#tiB2CPaid-notify-email-error').css({
			    	    	'display':'none',
			    	    });//css
			    	 emailValid=true;
			    	 
			    }
	      
    });

$('body').on('keyup',"#tiB2CPaid-target-modal-email",function (e) {
    if (e.which == 13) {
    	var triggeredId ="#"+e.target.id;
    	if(e.target.id == "LimitTxtbx" || e.target.id == "notifyEmail" || e.target.id == "tiB2CPaid-target-modal-email" ){
    		$("#tiB2CPaidNotifyMe").trigger('click');
    	}else{
    		$(triggeredId).trigger('click');
    	}
    }
  });


function addCommasToNum(nStr) {
	nStr += '';
	var x = nStr.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
} 


/* --------- Address Book - Start ------------------*/

//--> Add - GET
$(document).on('click','#add-paid-address',function(e) {
	e.preventDefault();
	 $.ajax({
    url: 'add-address',
    type: 'GET',
    // datatype:"json",
    success: function(res) {
   	 $("#target-modal-address-add").modal('show');
		     $('#add-address-modal-body').html(res);
    }
	 });
});

//--> Update - GET
$('a#update-paid-address').click(function(e) {
	    	e.preventDefault();
	    	var addressId = $(this).attr('data-address-id');
	    	 $.ajax({
	             url: 'edit-address/'+ addressId,
	             type: 'GET',
	             success: function(res) {
	            	 $("#target-modal-address-update").modal('show');
	    		     $('#update-address-modal-body').html(res);
	    		     if($('#add-select-country-list-id').children(":selected").attr('value')=='HK'){
	    		    	 var countryName=$('#add-select-country-list-id').children(":selected").text();
	    		    	 $("#ab_townCity").val(countryName);
		    		 $("#ab_townCity").prop("readonly",true);
		    	     } 
			     setupPhoneEntryGroups();
	        }
	 });
	    	 
});

$('.address-remove-link-paid').click(function(e) {
	var addressId = $(this).attr('data-address-id');
    $("#removed-address-modal #curr-address-id").val(addressId);
});

//--> Remove
$(document).on('click','#remove-paid-address',function(e) {
	e.preventDefault();
	var addressId = $("#curr-address-id").val();
location.href= 'remove-address/' + addressId;
});


$(document).on('click','#ok-paid-address-btn',function() {
	 window.location = window.location.href;
});

//--> Add - POST
$(document).on('click','#paid-addAddress_btn',function() {

  $('#addAddressForm').find('p.error-text').css({
   	'display':'none',
   });
  var frm = $('#addAddressForm');
  var isValid = true;
  var fieldPattern = /^[a-zA-z0-9\.\:\@\,\-\s\(\)\!\#\$\%\^\&\*\~\_]+$/;
  var nickNameFieldPattern = /^[a-zA-z0-9\.\:\@\,\'\-\s\(\)\!\#\$\%\^\&\*\~\_]+$/;
  var emailPattern = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,20}$/;
  var urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/HTTP:\/\/WWW\.|HTTPS:\/\/WWW\.|HTTP:\/\/|HTTPS:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{1,10}(:[0-9]{1,5})?(\/.*)?$/;
  $("#addAddressForm .input-required").each(
          function() {
              if ($.trim($(this).val()) == '') {
                  isValid = false;
                  $(this).parent('.form-group').find('.error-text').css({
                  	'display':'inline',
                  });
              }
              else if(($.trim($(this).attr("id")) === "ab_email") && !emailPattern.test($.trim($(this).val()))){
              	isValid = false;
                  $(this).parent('.form-group').find('.nonenglish-error-text').css({
                  	'display':'inline',
                  });
              }
              else if(!validatePhone()){
              	isValid = false;
              }else if(!fieldPattern.test($.trim($(this).val())) && ($.trim($(this).attr("id")) != "ab_email") && ($.trim($(this).attr("id")) != "ab_phone")
            		  && ($.trim($(this).attr("id")) != "ab_middleName2")) {
                  isValid = false;
                  $(this).parent('.form-group').find('.nonenglish-error-text').css({
                  	'display':'inline',
                  });
              }else if($.trim($(this).attr("id")) === "ab_companyName"){
              	  var letters = /[a-zA-Z]/g;
               	  var companyName = $('#ab_companyName').val();
               	 if (companyName == "") {
                	  	$(this).parent('.form-group').find('.error-text').css({
                	      	'display':'inline',
                	      });
                	  	isValid = false;
                 } 
               	  var count = (companyName.match(letters) || []).length;
               	  if (companyName.length < 2 || count < 2) {
               			 $(this).parent('.form-group').find('.error-text').css({
               		        	'display':'inline',
               		        });
               		    	isValid = false;
               		 }
                 }
          });
  if(($.trim($('#ab_companyUrl').val()) != '')){
	  var companyUrl = $('#ab_companyUrl').val();
	   if (typeof companyUrl == 'undefined') {
	   	companyUrl = '';
	      }
	   var companyUrlLower = companyUrl.toLowerCase();
	   var isValid=true;
	   if (companyUrl == "") {
	     	$('#ab_companyUrl').parent('.form-group').find('.error-text').css({
	         	'display':'inline',
	         });
	     	isValid = false;
	     } 
	     if(!urlPattern.test(companyUrlLower) && companyUrlLower != 'none'){
	     	$('#ab_companyUrl').parent('.form-group').find('.nonenglish-error-text').css({
	         	'display':'inline',
	         });
	     	isValid = false;
	     }else{
	     	$('#ab_companyUrl').parent('.form-group').find('.nonenglish-error-text').css({
	         	'display':'none',
	         });
	     	isValid = true;
	     }
	   $('#isValid').val($.trim($('#isValid').val()));
  }
  if(($.trim($('#ab_line2').val()) != '') && (!fieldPattern.test($.trim($('#ab_line2').val())))){
  	  isValid = false;
        $('#ab_line2').parent('.form-group').find('.nonenglish-error-text').css({
        	'display':'inline',
        });
    }
    if(($.trim($('#ab_taxId').val()) != '') && (!fieldPattern.test($.trim($('#ab_taxId').val())))){
    	  isValid = false;
          $('#ab_taxId').parent('.form-group').find('.nonenglish-error-text').css({
          	'display':'inline',
          });
      }
    
    if($('#add-select-country-list-id').children(":selected").attr('value')=='0'){
    	isValid = false;
        $('#add-select-country-list-id').parent('.form-group').find('.error-text').css({
        	'display':'inline',
        });
    }
    
    if(($.trim($('#ab_middleName2').val()) != '') && (!nickNameFieldPattern.test($.trim($('#ab_middleName2').val())))){
     	  isValid = false;
           $('#ab_middleName2').parent('.form-group').find('.nonenglish-error-text').css({
           	'display':'inline',
           });
       }
    var country = $('#add-select-country-list-id').children(":selected").attr('value');
    if(country!="" && !validateZip()){
		// set isValid to false if zip is not valid -- no action if its valid
		isValid = false;
     }
    
  var countryIsoCode=$('#add-select-country-list-id').children(":selected").val();
  var state;
  if($('#state-select-box').css('display') == 'block'){
	  $('#select-state-list-id').removeAttr('disabled');
	   $('#state-input').attr('disabled','disabled');
	   countryIsoCode=$('#add-select-country-list-id').children(":selected").val();
	   state = $('#select-state-list-id').children(":selected").attr('value');
	   if($('#regionMandatory').val() =='true'){
       if(state=='0' || state=='undefined'){
       isValid = false;
          $('#select-state-list-id').parent('.form-group').find('.error-text').css({
           'display':'inline',
          });
      }
  }else if(state=='0' || state=='undefined'){
	  $('#state-input').val('');
	  $('#select-state-list-id').val('');
	 }
}else{
	   $('#select-state-list-id').attr('disabled','disabled');
	   $('#state-input').removeAttr('disabled');
}  
  setTimeout(function(){
    if (isValid == true)  {
   	 var myFormData = $("#addAddressForm").serialize().replace(/%23/g, 'IGNORE');
       $.ajax({
           url: 'add-address',
           type: frm.attr('method'),
           data: myFormData,
           success: function(res) {
               if (res.validated) {
               	 $('#target-modal-address-add').css({'display':'none'});
               	$("#target-modal-address-success").modal('show');
               	$('#success-response-address-header').find('p').val();
               	$('#success-response-address-modal-body').find('p').val();
               } else {
                   // Set error messages
                   $.each(res.errorMessages, function(key, value) {
                       $('input[name=' + key + ']').parent('.form-group').find('.error-text').text(value);
                       $('input[name=' + key + ']').parent('.form-group').find('.error-text').css({
                       	'display':'inline',
                       });
                   });
                   return false;
               }
           }
       });
   }
  }, 2000);
});

//--> Update - POST
$(document).on('click','#paid-updateAddress-btn', function(e) {
$('#editAddressForm').find('p.error-text').css({
	'display':'none',
});
var frm = $('#editAddressForm');
var addressId = $('#editAddressForm').find('#addressCode').val();
var isValid = true;
var fieldPattern = /^[a-zA-z0-9\.\:\@\,\-\s\(\)\!\#\$\%\^\&\*\~\_]+$/;
var nickNameFieldPattern = /^[a-zA-z0-9\.\:\@\,\'\-\s\(\)\!\#\$\%\^\&\*\~\_]+$/;
var emailPattern = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,20}$/;
var urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/HTTP:\/\/WWW\.|HTTPS:\/\/WWW\.|HTTP:\/\/|HTTPS:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{1,10}(:[0-9]{1,5})?(\/.*)?$/;
$("#editAddressForm .input-required").each(
   function() {
       if ($.trim($(this).val()) == '') {
           isValid = false;
           $(this).parent('.form-group').find('.error-text').css({
           	'display':'inline',
           });
       }
       else if(($.trim($(this).attr("id")) === "ab_email") && !emailPattern.test($.trim($(this).val()))){
         	isValid = false;
             $(this).parent('.form-group').find('.nonenglish-error-text').css({
             	'display':'inline',
             });
         }
         else if(!validatePhone()){
         	isValid = false;
         }
         else if(!fieldPattern.test($.trim($(this).val())) && ($.trim($(this).attr("id")) != "ab_email") && ($.trim($(this).attr("id")) != "ab_phone") 
        		 && ($.trim($(this).attr("id")) != "ab_middleName2")) {
             isValid = false;
             $(this).parent('.form-group').find('.nonenglish-error-text').css({
             	'display':'inline',
             });
         }else if($.trim($(this).attr("id")) === "ab_companyName"){
          	  var letters = /[a-zA-Z]/g;
           	  var companyName = $('#ab_companyName').val();
           	 if (companyName == "") {
            	  	$(this).parent('.form-group').find('.error-text').css({
            	      	'display':'inline',
            	      });
            	  	isValid = false;
             } 
           	  var count = (companyName.match(letters) || []).length;
           	  if (companyName.length < 2 || count < 2) {
           			 $(this).parent('.form-group').find('.error-text').css({
           		        	'display':'inline',
           		        });
           		    	isValid = false;
           		 }
             }
   });
if(($.trim($('#ab_companyUrl').val()) != '')){
	   var companyUrl = $('#ab_companyUrl').val();
	   if (typeof companyUrl == 'undefined') {
	   	companyUrl = '';
	      }
	   var companyUrlLower = companyUrl.toLowerCase();
	   var isValid=true;
	   if (companyUrl == "") {
	     	$('#ab_companyUrl').parent('.form-group').find('.error-text').css({
	         	'display':'inline',
	         });
	     	isValid = false;
	     } 
	     if(!urlPattern.test(companyUrlLower) && companyUrlLower!= 'none'){
	     	$('#ab_companyUrl').parent('.form-group').find('.nonenglish-error-text').css({
	         	'display':'inline',
	         });
	     	isValid = false;
	     }else{
	     	$('#ab_companyUrl').parent('.form-group').find('.nonenglish-error-text').css({
	         	'display':'none',
	         });
	     	isValid = true;
	     }
	   $('#isValid').val($.trim($('#isValid').val()));
   }
if(($.trim($('#ab_line2').val()) != '') && (!fieldPattern.test($.trim($('#ab_line2').val())))){
	  isValid = false;
      $('#ab_line2').parent('.form-group').find('.nonenglish-error-text').css({
      	'display':'inline',
      });
  }
  if(($.trim($('#ab_taxId').val()) != '') && (!fieldPattern.test($.trim($('#ab_taxId').val())))){
  	  isValid = false;
        $('#ab_taxId').parent('.form-group').find('.nonenglish-error-text').css({
        	'display':'inline',
        });
    }
  
  if($('#add-select-country-list-id').children(":selected").attr('value')=='0'){
  	isValid = false;
      $('#add-select-country-list-id').parent('.form-group').find('.error-text').css({
      	'display':'inline',
      });
  }
  
if(($.trim($('#ab_middleName2').val()) != '') && (!nickNameFieldPattern.test($.trim($('#ab_middleName2').val())))){
	  isValid = false;
     $('#ab_middleName2').parent('.form-group').find('.nonenglish-error-text').css({
     	'display':'inline',
     });
 }
var country = $('#add-select-country-list-id').children(":selected").attr('value');
if(country!="" && !validateZip()){
	// set isValid to false if zip is not valid -- no action if its valid
	isValid = false;
 }

var countryIsoCode=$('#add-select-country-list-id').children(":selected").val();
if(countryIsoCode=='HK'){
	 var countryName=$('#add-select-country-list-id').children(":selected").text();
	 $("#ab_townCity").val(countryName);
	 $("#ab_townCity").prop("readonly",true);
}else{
	 $("#ab_townCity").prop("readonly",false);
}
var state;
if($('#state-select-box').css('display') == 'block'){
	   $('#select-state-list-id').removeAttr('disabled');
	   $('#state-input').attr('disabled','disabled');
	   countryIsoCode=$('#add-select-country-list-id').children(":selected").val();
	   state = $('#select-state-list-id').children(":selected").attr('value');
	   if($('#regionMandatory').val() =='true'){
		if(state=='0' || state=='undefined'){
   isValid = false;
      $('#select-state-list-id').parent('.form-group').find('.error-text').css({
       'display':'inline',
      });
  }
}else if(state=='0' || state=='undefined'){
	  $('#state-input').val('');
	  $('#select-state-list-id').val('');
}
}else{
$('#select-state-list-id').attr('disabled','disabled');
$('#state-input').removeAttr('disabled');
} 	
setTimeout(function(){
if (isValid == true) {
	  var myFormData4Update = $("#editAddressForm").serialize().replace(/%23/g, 'IGNORE');
   $.ajax({
       url: 'edit-address',
       type: frm.attr('method'),
       data: myFormData4Update,
       success: function(res) {
           if (res.validated) {
        	   	$("#target-modal-address-update").css({'display':'none'});
               	$("#target-modal-address-updated").modal('show');
           		$('#success-response-address-update').find('p').val();
           		$('#success-response-address-modal-body-update').find('p').val();
           } else {
               // Set error messages
               $.each(res.errorMessages, function(key, value) {
               	$('input[name=' + key + ']').parent('.form-group').find('.error-text').text(value);
                   $('input[name=' + key + ']').parent('.form-group').find('.error-text').css({
                   	'display':'inline',
                   });
                   //There fields have a wrapper div around it. Finding the closet selector instead
                   if(key === 'gstExemptCert' || key === 'pstExemptCert'){
                	   $('input[name=' + key + ']').closest('.form-group').find('.error-text').css({
                          	'display':'inline',
                        }); 
                   }
               });
               return false;
           }
       }
   })
}
}, 2000);
});

//Address auto suggestions in shipping page
$(document).on('keyup','#paid-line1',function() {
    var countryIsoCode=$('#select-country-list-id').children(":selected").val();
    var textToSearch =$("#paid-line1").val();
	$('#paid-line1copy').val(textToSearch);
    $.ajax({
        url: ACC.config.encodedContextPath + '/checkout/buy/multi/delivery-address/getCountryConfigData',
        type: 'GET',
        data:{"countryIso": countryIsoCode},
        success: function(res) {
        	var obj = JSON.parse(res);
        	var addresscheck=obj[0].automatedAddressCheck;
        	if(addresscheck=="true"){    
        			// Hack to stop autofill from appearing on top of Google maps autocomplete
        			// This is a known bug with Google Maps replacing the "autcomplete"
        			// property with the unsupported "off" value.
        	    	var autocompleteInput = document.getElementById("paid-line1");

        	    	var observerHack = new MutationObserver(function() {
        	        	observerHack.disconnect();
        	        	$("#paid-line1").attr("autocomplete", "new-password");
        	    	});

        	    	observerHack.observe(autocompleteInput, {
        	        	attributes: true,
        	        	attributeFilter: ['autocomplete']
        	    	});
        	    	// - end hack
        		    
        			initServicePaid(textToSearch,countryIsoCode);
        	}
            }       
    });
});

function loadAutoCompleteSuggestions(input, options, callback){
    var autocomplete = new google.maps.places.Autocomplete(input, options);
    callback();
    return autocomplete;
}
function addDataMaskToAutocompleteSuggestions(){    
    var autoCompleteElements = document.querySelectorAll('.pac-item');
    if(typeof autoCompleteElements != 'undefined' && autoCompleteElements != null &&  autoCompleteElements.length > 0){        
        for(var i=0;i<autoCompleteElements.length;i++){
            autoCompleteElements[i].setAttribute("data-di-mask", "");
        }
    }
}

function initServicePaid(text, country) {
	var options = {
		types : [ 'address' ],
		componentRestrictions : {
			country : country
		}
	};
	var input = document.getElementById('paid-line1');
	var streetnum = false;
	var addressComponents = {
		street_number : 'short_name',
		route : 'long_name',
		locality : 'long_name',
		administrative_area_level_1 : 'short_name',
		country : 'long_name',
		postal_code : 'short_name',
		premise:'short_name',
		sublocality_level_2:'short_name'
		
	};
	//var autocomplete = new google.maps.places.Autocomplete(input, options);	
	var autocomplete = loadAutoCompleteSuggestions(input, options,addDataMaskToAutocompleteSuggestions);
	google.maps.event
			.addListener(
					autocomplete,
					'place_changed',
					function() {
						var place = autocomplete.getPlace();
						for (var i = 0; i < place.address_components.length; i++) {
							var addressType = place.address_components[i].types[0];
							if (addressComponents[addressType]) {
								var values = place.address_components[i][addressComponents[addressType]];
								$('#line2').val('');
								$('#postcode').val('');
								if (addressType == "street_number" || addressType=="premise") {
									$('#paid-line1').val(values);
									streetnum = true;
								} else if (addressType == "route" || addressType=="sublocality_level_2") {
									if (streetnum) {
										var address = $('#paid-line1').val()
												+ " " + values;
										$('#paid-line1').val(address);
									} else
										$('#paid-line1').val(values);
								} else if (addressType == "locality"){
									$('#townCity').val(values);
									if(values !=''){
										$('#townCity').parent('.form-group').find('.error-text').css({
								        	'display':'none',
								        });
										$('#townCity').parent('.form-group').find('.nonenglish-error-text').css({
								        	'display':'none',
								        });
									}
								}else if (addressType == "administrative_area_level_1") {
									if ($('#state-select-box').css('display') == 'block') {
										$(
												'#select-state-list-id option:selected')
												.removeAttr('selected');
										$(
												'#select-state-list-id option[value='
														+ values + ']').prop(
												'selected', 'selected');
										$(
												'#select-state-list-id option[value='
														+ values + ']').attr(
												'selected', 'selected');
										if(values !=''){
											$('#select-state-list-id').parent('.form-group').find('.error-text').css({
									        	'display':'none',
									        });
											$('#select-state-list-id').parent('.form-group').find('.nonenglish-error-text').css({
									        	'display':'none',
									        });
											//load tax exemption fields if applicable
											triggerProvinceChangeCustomEvent();
										}
									} else {
										var state = place.address_components[i]["long_name"];
										$('#state-input').val(state);
										if(state !=''){
											$('#state-input').parent('.form-group').find('.error-text').css({
									        	'display':'none',
									        });
											$('#state-input').parent('.form-group').find('.nonenglish-error-text').css({
									        	'display':'none',
									        });
										}
									}
								} else if (addressType == "postal_code")
									$('#postcode').val(values);
									if(values !=''){
										$('#postcode').parent('.form-group').find('.error-text').css({
								        	'display':'none',
								        });
										$('#postcode').parent('.form-group').find('.nonenglish-error-text').css({
								        	'display':'none',
								        });
									}
							}
						}
						var inputchange = $('#paid-line1').val();
						$('#paid-line1copy').val(inputchange);
					});

}

function triggerProvinceChangeCustomEvent(){
	var event = document.createEvent('Event');
	event.initEvent('provincechange', true, true);
	$('#select-state-list-id')[0].dispatchEvent(event);
}

$(document).on('focus','#line2',function() {	
	var inputchange = $('#paid-line1copy').val();
	$('#paid-line1').val(inputchange);
});

$(document).on('focus','#lastName',function() {	
	var inputchange = $('#paid-line1copy').val();
	$('#paid-line1').val(inputchange);
});

// Functionality for showing address nickname field
$(document).on('change','.js-toggle-nickname-field',function() {
  $("#js-nickname-field").toggleClass("js-hide");
  $("#middleName2").toggleClass('input-required');
  
  if($('.js-toggle-nickname-field').is(':checked') ==false){
	$("#paid-shipping-address-select").attr('disabled', false);
	}
  else if($('.js-toggle-nickname-field').is(':checked') ==true && $('#middleName2').val()==''){
		$("#paid-shipping-address-select").attr('disabled', true);
		}
});

/* --------- Address Book - End ------------------ */

/* ---------Order History- Start------------------ */
$(document).ready(function() {
	$("#ti-paid-order-history").DataTable({
		"dom": '<"toolbar">frtip',	
		columnDefs: [{ 'targets': 0, type: 'date' }],
		"drawCallback": function ( settings ) {
	        if (Math.ceil((this.fnSettings().fnRecordsDisplay()) / this.fnSettings()._iDisplayLength) > 1) {
	            $('#ti-paid-order-history_paginate').css("display", "block");     
	        } else {                
	            $('#ti-paid-order-history_paginate').css("display", "none");
	        }

	        },

	    language: {
	     search: '<a class="searchBtn" id="searchBtn"><i class="fa fa-search"></i></a>',
	    	//search:'',
		 searchPlaceholder:$('#tib2cPaidSearchPlaceholder').val(),
		 emptyTable:'<div id="orderhistoryempty"><a id="orderhistoryNodata"><i class="fa fa-search"></i></a>&nbsp;'+$('#tib2cOrderHistoryMessage').val()+'</div>',
		"info": "",	
	        paginate: {
	          next: '<i style="color:black;margin-right:20px;"  class="fa">&#xf054;</i>', // or '?'
	          previous: '<i style="color:black;margin-left:20px;" class="fa">&#xf053;</i>' // or '?' 
	      }
	    },
	    initComplete : function() {
	        $("#ti-paid-order-history_filter").detach().appendTo('#paid-new-search-area');
		    }	    
	});

	});

$('#paidOrderHistoryCombo').on('change', function() {
    var days = $("#paidOrderHistoryCombo").val();
    if (days != undefined && days != null) {
    	window.location = 'order-history?days=' + days; 
    }
});

/* ---------Order History- End------------------*/

/* ---------Order View Details - Start------------------*/
$(document).on('click','#tiPaidOrderDetails',function(e) {
    var orderCode = $(this).attr('data-id');
    if (orderCode != undefined && orderCode != null) {
    	window.location = 'order-details/' + orderCode; 
    }
});
/* ---------Order View Details - End------------------*/
/* ---------Continue Payment - Start------------------*/
$(document).on('click','#tiPaidContinuePayment',function(e) {
    var orderCode = $(this).attr('data-id');
    var paymentMethod = $(this).attr('data-paymentMethod');
    if (BrowserUtil.isMobile() && (paymentMethod == 'alipay' || paymentMethod == 'wechatpay')) {
    	$.ajax({
    		url: ACC.config.encodedContextPath + "/hop/payment/" + orderCode,
            cache: false,
            type: 'GET',
            success: function(response){
            	if(response.result == 'success'){
            			window.open(response.hop_url, "_blank");
            		}
            	}
            } );
    	
    }
	else if (paymentMethod == 'apruve'){
		var OrderDetailsUrl = window.location.href.replace('/myaccount/order-history', '/myaccount/order-details/'+orderCode+'?mode=continuePayment');
		window.location = OrderDetailsUrl;
	}
	else {
    	$.ajax({
    		url: ACC.config.encodedContextPath + "/hop/payment/getPaymentView?orderCode=" + orderCode,
            cache: false,
            type: 'GET',
            success: function(response){
       		 		$('#target-modal-apm').find('.modal-content').html(response);
       		 		$('#target-modal-apm').modal('show');
            	}
            } );    	
    }
});
/* ---------Continue Payment - End------------------*/
//Validation (text input)
$(".text-input .input-required").blur(function() {
  var value = $(this).val().trim();
  if (value == "" && $(this).hasClass('input-required')) {
	  $(this).parent('.form-group').find('.error-text').css({'display':'inline'});	
    
  } else {
	  $(this).parent('.form-group').find('.error-text').css({'display':'none'});
  }
});

// Validation (select list)
$(".select-list .input-required").blur(function() {
  if ($(this)[0].selectedIndex == 0) {
    $(this).parents(".select-list").find('.error-text').addClass('show');
  } else {
    $(this).parents(".select-list").find('.error-text').removeClass('show');
  }
});


$(document).on("input",".tiB2CPaid-confirmGuestEmail,.tiB2CPaid-guestEmail",function(){
	
	var orginalEmail = $(".tiB2CPaid-guestEmail").val();
	var confirmationEmail = $(".tiB2CPaid-confirmGuestEmail").val();
	
	if(orginalEmail.toUpperCase() === confirmationEmail.toUpperCase()){
	  $(".tiB2CPaid-guestCheckoutBtn").prop('disabled',false);
	}else{
	   $(".tiB2CPaid-guestCheckoutBtn").prop('disabled',true);
	}
});

/*----------------------- Checkout page Start -----------------------*/

//Adding shipping address for the cart
function submitPaidShippingAddressForm() {
	 $('#paid-shipping-address-form').find('p.error-text').css({
   	'display':'none',
   });
	 $('#paid-shipping-address-form').find('p.nonenglish-error-text').css({
		   	'display':'none',
		   });
	
	var isSaveAddress = $('#saveInAddressBook').is(':checked');
	if(isSaveAddress ==true){
		$('#saveInAddressBook').val("true");
	}
	 var isValid = true;
	 if (!$("input[name='addressType']:checked").val()) {
		 	isValid = false;
		$('.radio-content').find('.error-text').css({
	         'display':'inline',          
        });
	}
	 isValid = shippingAddressFormvalidation();
	 var isBillingValid =true;
	 if($('#different_billingAddress').val() == 'false'){
		 isBillingValid =billingAddressFormValidation();
	 }
	 
	  if(isValid && isBillingValid){
		  
	//	Shipping Address Optional State field Validation 
		  	var selectedCountry = $('#select-country-list-id').children(":selected").attr('value');
	      	var selectedState = $('#select-state-list-id').children(":selected").attr('value');
	      	if((selectedCountry == 'CN' || selectedCountry == 'JP') && (selectedState == '0' || selectedState == 'undefined'))
	      	{
	      	 $('#select-state-list-id').val('');
	      	}

	//	Billing Address Optional State field Validation 

	      	var selectedBillToCountry = $('#billing-select-country-list-id').children(":selected").attr('value');
	      	var selectedBillTOState = $('#billTo-select-state-list-id').children(":selected").attr('value');
	      	if((selectedBillToCountry == 'CN' || selectedBillToCountry == 'JP') && (selectedBillTOState == '0' || selectedBillTOState == 'undefined'))
	      	{
	      	 $('#billTo-select-state-list-id').val('');
	      	}

		    var formData = $('#paid-shipping-address-form').serialize().replace(/%23/g, 'IGNORE');
			var url= $('#paid-shipping-address-form').attr('action');
			$.post('addSelected', formData,function(res){
				if (res.validated) {
					 console.log('form validated and saved -- going to next step');
					 $('#address-next-form').submit();
				 }
				 else if(res.tiTaxExemptionLookupResponse) {
					 console.log('tax exemption error - showing modal');
					 $.get('getTaxExemptionFailureDetails', formData,function(tres){
						 $('#target-modal-tax-exempt-fail').find('.modal-content').html(tres);
						 $('#target-modal-tax-exempt-fail').modal('show');
					 });
					  
					 
					 return false;
				 }else{
					// Set error messages
	                $.each(res.errorMessages, function(key, value) {
	                    $('input[name=' + key + ']').closest(".form-group").find('.error-text').text(value);
	                    $('input[name=' + key + ']').closest(".form-group").find('.error-text').css({
	                    	'display':'inline',
	                    });
	                });
	                return false;
				}
			});
	  }else{
		  return false;
	  }
}

//Display the delivery addresses for the selected country
$(document).on('change','#select-country-list-id',function(){
	var addressType = $("input[name=addressType]:checked").val();
	var countryIsoCode = $('#select-country-list-id').children(":selected").attr('value');
	if(countryIsoCode == 'US' && addressType =='Business'){
		$('#js-tax-exemption').css('display', 'block');
	}else{
		$('input[name=isTaxExempt]:checked').prop('checked',false); 
		$('#js-tax-exemption').css('display', 'none');
	}
	
	$.ajax({
        url: "getSelectedAddress?" + "selectedAddressCode=undefined&shippingAddressType="+addressType+"&countryIsoCode="+countryIsoCode,
        cache: false,
        type: 'GET',
        success: function(response){
            $("#shipping_address_content").html(response);
            shippingAddressFormvalidation();
	    if($('#different_billingAddress').val() == 'false'){
	   	billingAddressFormValidation();
	     }
            if($('#select-country-list-id').children(":selected").attr('value')=='HK'){
   			 	var countryName=$('#select-country-list-id').children(":selected").text();
   			 	$("#townCity").val(countryName);
   			 	$("#townCity").prop("readonly",true);
            }else{
   			 	$("#townCity").attr('disabled', false);
            }
        }
    });

});


//Display the selected address
$(document).on('change','#paid-address-list-id',function(){
	var addressId = $(this).children(":selected").val();
	if(addressId == "0"){
		addressId = "New address";
	}
	var addressType = $("input[name=addressType]:checked").val();
	var countryIsoCode = $('#select-country-list-id').children(":selected").attr('value'); 
	$.ajax({
        url: "getSelectedAddress?" + "selectedAddressCode=" + addressId +"&shippingAddressType="+addressType+"&countryIsoCode="+countryIsoCode,
        cache: false,
        type: 'GET',
        success: function(response){
            $("#shipping_address_content").html(response);
            shippingAddressFormvalidation();
	   		 if($('#different_billingAddress').val() == 'false'){
	   			 billingAddressFormValidation();
	   		 }
	   		 
	   		if($('#select-country-list-id').children(":selected").attr('value')=='HK'){
	   			var countryName=$('#select-country-list-id').children(":selected").text();
	   			$("#townCity").val(countryName);
	   			$("#townCity").prop("readonly",true);
	   		}else{
	   			$("#townCity").attr('disabled', false);
	   		}
        }
    });
	
});



//Wavier details popup
$(document).on('click','#tiDownloadWaiverPDF',function(e) {
	e.preventDefault();
	var divToPrint=$('#tiWaiverDetails').html();
	var myWindow = window.open("", "_blank", "top=400,left=700,width=400,height=200,resizable=yes");
	myWindow.document.write(divToPrint);
	
});


/*----------------------- Checkout page End -----------------------*/


/*................Payment Details Page..............*/
//remove the payment information
$('.paymentInfo-remove-link-paid').click(function(e) {
	var paymentInfoId = $(this).attr('data-payment-id');
  $("#removed-payment-modal").find('#paymentInfo-id').val(paymentInfoId);
});

$(document).on('click','#remove-paymentInfo',function(e) {
	e.preventDefault();
	var paymentInfoId = $("#paymentInfo-id").val();
	location.href= 'ti-remove-payment-method/' + paymentInfoId;
});
/*................Payment Details Page..............*/

$('#useDiffDeliveryAddress, #useSameDeliveryAddress').on('change', function() {
	var newbilling = $("#useDiffDeliveryAddress").is(':checked');
	var sameAsShipping = $("#useSameDeliveryAddress").is(':checked');
	if (newbilling){
		$('#billingAddressForm').css({
		  	'display':'block',
		});
		options = {'countryIsoCode': $('#useDeliveryAddressData').data('countryisocode') , 'useDeliveryAddress': false};
	}else if(sameAsShipping){
		$('#billingAddressForm').css({
		  	'display':'none',
		});
		options = {'countryIsoCode': $('#useDeliveryAddressData').data('countryisocode') , 'useDeliveryAddress': true};
	}
	$.ajax({
		url: ACC.config.encodedContextPath + '/checkout/buy/multi/payment-method/billingaddressform',
		async: true,
		data: options,
		dataType: "html"
		}).done(function (data)
			{
				$("#billingAddressForm").html($(data).html());
			});
	
});

//Invoice page
$(document).on('click','#tiPaidInvoice',function(e) {
    var orderCode = $(this).attr('data-id');
    if (orderCode != undefined && orderCode != null) {
    	window.location = '../invoice/' + orderCode; 

    }
});

/*//Waiver email
$(document).on('click','#emailWaiver',function(e) {
    var orderCode = $(this).attr('data-id');
    if (orderCode != undefined && orderCode != null) {
    	window.location = '../emailWaiver/?orderCode=' + orderCode; 
    }

});*/

$('#paymetricPaymentDiv .submit_silentOrderPostForm').click(function ()
{
	ACC.common.blockFormAndShowProcessingMessage($(this));
	$('.billingAddressForm').filter(":hidden").remove();
	ACC.silentorderpost.enableAddressForm();
	var formData;
	if($('#isApruveCalled').val() == "Y" ){
		formData = $('#apruveSilentOrderPostForm').serialize();
	}
	else{
		formData = $('#silentOrderPostForm').serialize();
	}
	var url= ACC.config.encodedContextPath + "/checkout/buy/multi/sop/response";
	$.post(url, formData,function(res){
		setTimeout(function(){
			$('.body-wrap').html(jQuery(res).find('.body-wrap').html());
			$('.body-wrap').prepend(jQuery(res).find('.global-alerts').html());
			$('.main-header').find('.breadcrumb-section').html(jQuery(res).find('.breadcrumb-section').html());
			var globalalerts = jQuery(res).find('.global-alerts').html();
			var orderCode =jQuery(res).find('#orderCode').val();
			var cartLock = jQuery(res).find('#cartLock').val();
			var paymentType = jQuery(res).find('#paymentType').val();
			if(typeof globalalerts!= 'undefined' && globalalerts.length >0){
				$('.main-header')[0].scrollIntoView(); // anchor to top of the page
				location.reload();  //Refresh page 
			}else if(typeof orderCode!= 'undefined' && orderCode!="" && typeof paymentType!= 'undefined' && paymentType ==='paypal'){
				var currentUrl = window.location.href;
				var updatedCurrentUrl = currentUrl.replace('/checkout/buy/multi/payment-method/add', '/myaccount/order-conf/'+orderCode);
				window.location = updatedCurrentUrl+'?B2CP_ORDER_CONFIRM_KEY='+orderCode;
			}
			else if(typeof orderCode!= 'undefined' && orderCode!="" && typeof paymentType!= 'undefined' && paymentType ==='alipay'){
				var currentUrl = window.location.href;
				var updatedCurrentUrl = currentUrl.replace('/checkout/buy/multi/payment-method/paymetric/alipay', '/myaccount/order-conf/'+orderCode);
				window.location = updatedCurrentUrl+'?B2CP_ORDER_CONFIRM_KEY='+orderCode;
			}else{
				var currentUrl = window.location.href;
				var updatedCurrentUrl = currentUrl.replace('/checkout/buy/multi/payment-method/add', '/checkout/buy/multi/summary/view');
				window.location = updatedCurrentUrl;
			}
		});
	$('#silentOrderPostForm').unblock();
	});
});


//////////////////////SavedCartPage//////////////////////////////////////////////////////////////////


//FieldValidationForSavingCart
$(document).on("input", ".js-save-cart-field-validate", function() {
	var inputText = $('#text-input-id').val();
	if (inputText != "") {
		$('#js-save-cart-submit').prop('disabled', false);
	} else {
		$('#js-save-cart-submit').prop('disabled', true);
	}

});

// Disable Restore Link on SavedCartPage
$(window).load(function() {
	$('.js-restore-ti-saved-cart').css({
		'pointer-events' : 'auto',
		'opacity' : '',
		'display' : 'inline'
	});
});

//Disable Delete Link on SavedCartPage
$(window).load(function() {
	$('.js-delete-ti-saved-cart').css({
		'pointer-events' : 'auto',
		'opacity' : '',
		'display' : 'inline'
	});
});

//Disable SavedCartPageDetailsPage Link on SavedCartPage
$(window).load(function() {
	$('.js-saved-cart-name').css({
		'pointer-events' : 'auto',
		'opacity' : '',
		'display' : 'inline'
	});
});

//Restore GET Method
$(document).on('click','.js-restore-ti-saved-cart',function(e) {
	e.preventDefault();
	var cartId = $(this).attr('data-savedcart-id');
	$.ajax({
	    url: 'saved-cart/'+cartId+'/restore',
	//    data:{"cartId": cartId},        
	    type: 'GET',
		async: false,
	    success:function(res){
	        $('#restore-modal-body').html(res);
	        $("#target-modal-saved-cart-restore").modal('show');
	        window.dispatchEvent(new CustomEvent('tiAddToCartChange', {}));
	    },
	});
});

//Delete GET Method
$(document).on('click','.js-delete-ti-saved-cart',function(e) {
	e.preventDefault();
	var cartId = $(this).attr('data-savedcart-id');
	$.ajax({
	    url: 'saved-cart/'+cartId+'/delete',
	//    data:{"cartId": cartId},        
	    type: 'GET',
		async: false,
	    success:function(res){
	        $('#delete-modal-body').html(res);
	        $("#target-modal-saved-cart-delete").modal('show');
	        window.dispatchEvent(new CustomEvent('tiAddToCartChange', {}));
	    },
	});
});

///Edit GET Method
$(document).on('click','.js-edit-ti-saved-cart',function(e) {
	e.preventDefault();
	var cartId = $(this).attr('data-savedcart-id');
	$.ajax({
	    url: 'saved-cart/'+cartId+'/edit',
	//    data:{"cartId": cartId},        
	    type: 'GET',
		async: false,
	    success:function(res){
	        $('#edit-modal-body').html(res);
	        $("#target-modal-saved-cart-edit").modal('show');
	        window.dispatchEvent(new CustomEvent('tiAddToCartChange', {}));
	    },
	});
});

// Delete POST Method
$(document).on("click", '.js-delete-ti-saved-cart-btn', function (event) {
    event.preventDefault();
    var cartId = $(this).attr('data-savedcart-id');
    $.ajax({
        url: 'saved-cart/'+cartId+'/delete',
        type: 'DELETE',
        success: function (response) {
            window.dispatchEvent(new CustomEvent('tiAddToCartChange', {}));
            var url = ACC.config.encodedContextPath + "/myaccount/saved-cart"
            window.location.replace(url);
        }
    });
});

//Restore POST Method
$(document).on("click", '.js-restore-ti-saved-cart-btn', function (event) {
    event.preventDefault();
    var url = $(this).attr('data-restore-url');
  
    $.post(url).done(function (result, data, status) {
        if (result == "200") {
            window.dispatchEvent(new CustomEvent('tiAddToCartChange', {}));
            var url = ACC.config.encodedContextPath + "/cart"
            window.location.replace(url);
        } 
    });
});

//DATA TABLE SAVED CART
$(document).ready(function() {

//Commenting out this code because it is causing page refresh if any ajax call returns 405. Need to move this to specific ajax calls.
//	 $.ajaxSetup({
//	        statusCode: {
//	            405: function(){
//	                    location.reload();
//	                }
//	        }
//	    });
	

		
	$("#ti-paid-saved-cart").DataTable({
		searching: false, 
		info: false,
		paging:false,
	});
});





//Re-Order
$('.js_reorder').click(function(e) {
    e.preventDefault();
    var order = $('#tiOrderCode').val();
	$.ajax({
        url: ACC.config.encodedContextPath + '/myaccount/reorder',
        data:{"orderCode":order},
        type: 'POST',
        success: function(res) {
         if(res=="success")
         {
         window.location = ACC.config.encodedContextPath + '/cart?oldOrderCode=' + order; 
         }
        }
	});
});

//////////////////////SavedCartDetailsPage//////////////////////////////////////////

//Disable Restore Button on SavedCartDetailsPage
$(window).load(function() {
    if ( $('.js-restore-ti-saved-cart').length > 0 ) {
        $('.js-restore-ti-saved-cart').prop('disabled', false);
    }
});

//Disable Delete Button on SavedCartDetailsPage
$(window).load(function() {
    if ( $('.js-delete-ti-saved-cart').length > 0 ) {
        $('.js-delete-ti-saved-cart').prop('disabled', false);
    }
});

//Disable Edit Button on SavedCartDetailsPage
$(window).load(function() {
    if ( $('.js-edit-ti-saved-cart').length > 0 ) {
        $('.js-edit-ti-saved-cart').prop('disabled', false);
    }
});

//Disable BackToSavedCart Button on SavedCartDetailsPage
$(window).load(function() {
    if ( $('.js-back-to-saved-cart').length > 0 ) {
        $('.js-back-to-saved-cart').prop('disabled', false);
    }
});



//Disable Restore Button on SavedCartDetailsPage
$(window).load(function() {
    if ( $('.js-restore-ti-saved-cart').length > 0 ) {
        $('.js-restore-ti-saved-cart').prop('disabled', false);
    }
});

//Disable Delete Button on SavedCartDetailsPage
$(window).load(function() {
    if ( $('.js-delete-ti-saved-cart').length > 0 ) {
        $('.js-delete-ti-saved-cart').prop('disabled', false);
    }
});

//Disable Edit Button on SavedCartDetailsPage
$(window).load(function() {
    if ( $('.js-edit-ti-saved-cart').length > 0 ) {
        $('.js-edit-ti-saved-cart').prop('disabled', false);
    }
});

//Disable BackToSavedCart Button on SavedCartDetailsPage
$(window).load(function() {
    if ( $('.js-back-to-saved-cart').length > 0 ) {
        $('.js-back-to-saved-cart').prop('disabled', false);
    }
});


//Restore GET Method for Details Page
$(document).on('click','.js-restore-ti-saved-cart',function(e) {
	e.preventDefault();
	var cartId = $(this).attr('data-savedcart-id');
	$.ajax({
	    url: cartId+'/restore',
	//    data:{"cartId": cartId},        
	    type: 'GET',
		async: false,
	    success:function(res){
	        $('#restore-modal-body').html(res);
	        $("#target-modal-saved-cart-restore").modal('show');
	    },
	});
});



//Delete GET Method for Details Page
$(document).on('click','.js-delete-ti-saved-cart',function(e) {
	e.preventDefault();
	var cartId = $(this).attr('data-savedcart-id');
	$.ajax({
	    url: cartId+'/delete',
	//    data:{"cartId": cartId},        
	    type: 'GET',
		async: false,
	    success:function(res){
	        $('#delete-modal-body').html(res);
	        $("#target-modal-saved-cart-delete").modal('show');
	    },
	});
});


///Edit GET Method for Details Page
$(document).on('click','.js-edit-ti-saved-cart',function(e) {
	e.preventDefault();
	var cartId = $(this).attr('data-savedcart-id');
	$.ajax({
	    url: cartId+'/edit',
	//    data:{"cartId": cartId},        
	    type: 'GET',
		async: false,
	    success:function(res){
	        $('#edit-modal-body').html(res);
	        $("#target-modal-saved-cart-edit").modal('show');
	    },
	});
});

//Delete POST Method for Details Page
$(document).on("click", '.js-delete-ti-saved-cart-btn', function (event) {
  event.preventDefault();
  var cartId = $(this).attr('data-savedcart-id');
  $.ajax({
      url: cartId+'/delete',
      type: 'DELETE',
      success: function (response) {
          var url = ACC.config.encodedContextPath + "/myaccount/saved-cart"
          window.location.replace(url);
      }
  });
});

//Back to Saved Cart
$(document).on("click", '.js-back-to-saved-cart', function (event) {
	  event.preventDefault();
	  var cartId = $(this).attr('data-savedcart-id');
	  $.ajax({
	      url: '/'+cartId,
	      type: 'GET',
	      success: function (response) {
	          var url = ACC.config.encodedContextPath + "/myaccount/saved-cart"
	          window.location.replace(url);
	      }
	  });
	});

$(document).on("click", '.clear-cart', function (event) {
    event.preventDefault();    
	$.ajax({
        url: ACC.config.encodedContextPath + '/myaccount/saved-cart/clear',
        type: 'POST',
        success: function(res) {
         if(res=="success")
         {
         window.location = ACC.config.encodedContextPath + '/cart'; 
         }
        }
	});
});

//email waiver model
$('.js_emailWaiver').click(function(e) {
	var orderCode = $(this).attr('data-id');
	var defaultEmail = $('#defaultEmail').val();
	 /*$(".modal-body #tiB2CPaid-waiver-order").val(orderCode);*/
	 $(".modal-body #notifyWaiverEmail").val(defaultEmail);
  if(defaultEmail != undefined && defaultEmail != null){
   $('#tiB2CPaid-waiver-email-error').css({
        'display':'none',
       });
  }
});

$('.js_reorderModalBtn').click(function(e) {
e.preventDefault();
$('#target-modal-reorder').modal('hide');
var order = $('#tiOrderCode').val();
$.ajax({
    url: ACC.config.encodedContextPath + '/myaccount/reorder',
    data:{"orderCode":order},
    type: 'POST',
    success: function(res) {
     if(res=="success")
     {
     window.location = ACC.config.encodedContextPath + '/cart?oldOrderCode=' + order; 
     }
    }
});

});
//Waiver emailjs_emailWaiver_btn
$('.js_emailWaiver_btn')
		.click(
				function(e) {
					e.preventDefault();
					$('#tiB2CPaid-waiver-email-error').css({
						'display' : 'none',
					});
					var orderCode = $(this).attr('data-id');
					var emailPattern = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,20}$/;
					var defaultEmail = $('#notifyWaiverEmail').val();
					var currentLang = $("ti-header-language-selection").val();
					if (defaultEmail == "" || !emailPattern.test(defaultEmail)
							|| orderCode == "") {
						$('#tiB2CPaid-waiver-email-error').css('display',
								'block');
					} else {
						$
								.ajax({
									url : ACC.config.encodedContextPath
											+ '/myaccount/email-waiver?orderCode='
											+ orderCode,
									data : {
										
										emailID : defaultEmail, currentLang : currentLang
									},
									type : 'GET',
									success : function(res) {
										$('#ti-target-modal-email').modal('hide');
									},
									error : function(xhr, errorType, exception) {
										$("#ti-target-modal-email").modal(
												'show');
										$('.modal-body')
												.html(
														"Something went wrong, Please try after login..");

									}
								});
					}
				});



//B2C Paid - F8 commercial Invoice modal
$('.b2cPaid-Invoice').click(function(e) {
	var defaultEmail = $('#tiB2CPaid-defaultEmail').val();
	
  $(".modal-body #b2cPaid-commInvoiceEmail").val(defaultEmail);
  $(".modal-body #b2cPaid-masterTracking").val($(this).attr('data-masterTracking'));
  if(defaultEmail !=null && defaultEmail!=''){
  	 $('#b2cPaid-invoice-email-error').css({
  	    	'display':'none',
  	    });
  }

  $("#paid-commercialInvoice-target-modal-email").modal('show');

});

//B2C paid - Commercial Invoice modal
$('#b2cPaidCommercialInvoice').click(function(e) {
    e.preventDefault();
    $('#b2cPaid-invoice-email-error').css({
        'display': 'none',
    });
    var emailPattern = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,20}$/;
    var orderCode = $('#paid-invoice-orderCode').val();
    var deliveryEmailId = $('#b2cPaid-commInvoiceEmail').val();
    var masterTracking = $('#b2cPaid-masterTracking').val();
    var guestCustomer = $('#guestCustomer').val();
    var orderGuid = $('#paid-invoice-orderGuid').val();
    var url = ACC.config.encodedContextPath;
    if(guestCustomer  === 'true')
    	{
    	url = ACC.config.encodedContextPath+"/guest/f8-invoice?"
    	orderCode = orderGuid;
    	}
    else
    	{
    	url = ACC.config.encodedContextPath+"/myaccount/f8-invoice?"
    	orderCode = orderCode;
    	}
    
    if (deliveryEmailId == "" || !emailPattern.test(deliveryEmailId)) {
        $('#b2cPaid-invoice-email-error').css('display', 'block');
    } else {
        $.ajax({
            url: url,
            data: {
                orderCode: orderCode,
                deliveryEmailId: deliveryEmailId,
                masterTracking: masterTracking
            },
            success: function(res) {
                if (res == 'success') {
                    $("#paid-commercialInvoice-target-modal-email").modal('hide');
                    $("#paid-Invoice-confirm-modal-email").modal('show');
                } else {
                    $("#paid-commercialInvoice-target-modal-email").modal('hide');
                    $("#paid-Invoice-failure-modal-email").modal('show');

                }
            }
        });
    }
});

$("#b2cPaid-commInvoiceEmail").change(function(){ 
	 var emailPattern = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,20}$/;
	    var commercialInvoiceEmail = $('#b2cPaid-commInvoiceEmail').val();
	    if (commercialInvoiceEmail == "" || !emailPattern.test(commercialInvoiceEmail)) {
	    	$('#b2cPaid-invoice-email-error').css('display', 'block');
	    }
	    else{
	    	$('#b2cPaid-invoice-email-error').css('display', 'none');
}
});


$('body').on('keyup',"#paid-commercialInvoice-target-modal-email",function (e) {
  if (e.which == 13) {
  	var triggeredId = "#"+e.target.id;
  	if(e.target.id == "b2cPaid-commInvoiceEmail" || e.target.id =="paid-commercialInvoice-target-modal-email"){
  		$("#b2cPaidCommercialInvoice").trigger('click');
  	}else{
  		$(triggeredId).trigger('click');
  	}
  }
});

$(document).ready(function() {
	    $('#b2cPaid-commInvoiceEmail').keypress(function(event) {
	        if (event.keyCode == 13) {
	            event.preventDefault();
	        }
	    });
});

//B2C paid - F2 Financial Invoice modal
$('.b2cPaid-finInvoice').click(function(e) {
	var defaultEmail = $('#tiB2CPaid-defaultEmail').val();
    $(".modal-body #b2cPaid-finInvoiceEmail").val(defaultEmail);
    $(".modal-body #b2cPaid-deliveryNos").val($(this).attr('data-deliveryNos'));
    if(defaultEmail !=null && defaultEmail!=''){
    	 $('#b2cPaid-finInvoice-email-error').css({
    	    	'display':'none',
    	    });
    }
	$("#paid-financialInvoice-target-modal-email").modal('show');
	
});
$('#b2cPaidfinancialInvoice').click(function(e) {
    e.preventDefault();
    $('#b2cPaid-finInvoice-email-error').css({
        'display': 'none',
    });
    var emailPattern = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,20}$/;
    var orderCode = $('#paid-invoice-orderCode').val();
    var deliveryEmailId = $('#b2cPaid-finInvoiceEmail').val();
    var deliveryNos = $('#b2cPaid-deliveryNos').val();
    var guestCustomer = $('#guestCustomer').val();
    var orderGuid = $('#paid-invoice-orderGuid').val();
    var url = ACC.config.encodedContextPath;
    if(guestCustomer  === 'true')
	{
	url = ACC.config.encodedContextPath+"/guest/f2-invoice?"
	orderCode = orderGuid;
	}
    else
	{
	url = ACC.config.encodedContextPath+"/myaccount/f2-invoice?"
	orderCode = orderCode;
	}

    if (deliveryEmailId == "" || !emailPattern.test(deliveryEmailId)) {
        $('#b2cPaid-finInvoice-email-error').css('display', 'block');
    } else {
        $.ajax({
            url: url,
            data: {
                orderCode: orderCode,
                deliveryEmailId: deliveryEmailId,
                deliveryNos: deliveryNos
            },
            success: function(res) {
                if (res == 'success') {
                    $("#paid-financialInvoice-target-modal-email").modal('hide');
                    $("#paid-Financial-Invoice-confirm-modal-email").modal('show');
                } else {
                    $("#paid-financialInvoice-target-modal-email").modal('hide');
                    $("#paid-Financial-Invoice-failure-modal-email").modal('show');
                }
            }
        });
    }
});

$("#b2cPaid-finInvoiceEmail").change(function(){ 
	 var emailPattern = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,20}$/;
	    var finInvoiceInvoiceEmail = $('#b2cPaid-finInvoiceEmail').val();
	    if (finInvoiceInvoiceEmail == "" || !emailPattern.test(finInvoiceInvoiceEmail)) {
	    	$('#b2cPaid-finInvoice-email-error').css('display', 'block');
	    }
	    else{
	    	$('#b2cPaid-finInvoice-email-error').css('display', 'none');
}
});

$('body').on('keyup',"#paid-financialInvoice-target-modal-email",function (e) {
	   if (e.which == 13) {
	   	var triggeredId = "#"+e.target.id;
	   	if(e.target.id == "b2cPaid-finInvoiceEmail" || e.target.id =="paid-financialInvoice-target-modal-email"){
	   		$("#b2cPaidfinancialInvoice").trigger('click');
	   	}else{
	   		$(triggeredId).trigger('click');
	   	}
	   }
	 });

$(document).ready(function() {
	    $('#b2cPaid-finInvoiceEmail').keypress(function(event) {
	        if (event.keyCode == 13) {
	            event.preventDefault();
	        }
	    });
});

$('.paid-commercialInvoice, .paid-financialInvoice').click(function() {
	var orderCode = $('#paid-invoice-orderCode').val();
	var guestCustomer = $('#guestCustomer').val();
	var orderGuid = $('#paid-invoice-orderGuid').val();
	    if(guestCustomer === 'true' && orderGuid != undefined && orderGuid != null)
	    	{
	    	window.location = ACC.config.encodedContextPath + '/guest/invoice/'+orderGuid;
	    	}
	    else if(orderCode != undefined && orderCode != null)
	    	{
	    	window.location = ACC.config.encodedContextPath + '/myaccount/invoice/'+orderCode;
	    	}
});

/*----------------------- TAX/VAT Id label - Start -----------------------*/ 

$(document).on('change','#addressType',function(){
	var country = $('#select-country-list-id').children(":selected").attr('value');
	var countryName = $('#select-country-list-id').children(":selected").text();
	var addressType = $('input[name=addressType]:checked').val();
	
	$('#paid-shipping-address-select').prop('disabled',true);
	if(country == 'US' && addressType =='Business'){
		$('#js-tax-exemption').css('display', 'block');
	}else{
		$('input[name=isTaxExempt]:checked').prop('checked',false); 
		$('#js-tax-exemption').css('display', 'none');
	}
	
	if(country!='' && country !='0'){
		$.ajax({
	        url: "getCountryConfigData?" + "countryIso=" + country,
	        type: 'GET',
	        datatype:"json",
	        success: function(response){
	        	$('#taxId-div').css({
     	        	'display':'block',
     	        });
				$('#taxId').removeAttr('disabled');
	        	var jsonObject = $.parseJSON(response); 
	        	$.each(jsonObject, function (i, obj) {
	        		if(addressType!='' && addressType=='Business'){
						var labelName = obj.businessTaxidLabel;
						var display = obj.taxidBusinessDisplay;
						if(display!=''&& display =='Required'  || display == 'Optional'){
		        			if(display == 'Optional')
	        				{
		        				$('#taxId').removeClass('input-required');
		        				$('#taxId').prop('disabled',false);
		        				$('#paid-shipping-address-select').prop('disabled',false);		        				
	        				}else{
	        					$('#taxId').addClass('input-required');
	        				}
		        			var lableNameUpdated = labelName.replace(".","");
							document.getElementById("shippingLabelName-check").innerHTML = lableNameUpdated;
							document.getElementById("billingLabelName-check").innerHTML = lableNameUpdated;
							
						}else if(display!=''&& display=='No Display'){
							$('#taxId-div').css({
			     	        	'display':'none',
			     	        });
							$('#taxId').attr('disabled','disabled');
							$('#taxId').removeClass('input-required');
							$('#paid-shipping-address-select').prop('disabled',false);
						}
	        		}
	        		else if(addressType!='' && addressType=='Other'){
						var labelName = obj.otherTaxidLabel;
						var display = obj.taxidOtherDisplay;
						if(display!=''&& display =='Required' || display == 'Optional'){
							
		        			if(display == 'Optional')
	        				{
		        				$('#taxId').removeClass('input-required');
		        				$('#taxId').prop('disabled',false);
		        				$('#paid-shipping-address-select').prop('disabled',false);
	        				}
		        			else{
		        				$('#taxId').addClass('input-required');
		        			}
		        			var lableNameUpdated = labelName.replace(".","");
							document.getElementById("shippingLabelName-check").innerHTML = lableNameUpdated;
							document.getElementById("billingLabelName-check").innerHTML = lableNameUpdated;
							
						}else if(display!=''&& display=='No Display'){
							$('#taxId-div').css({
			     	        	'display':'none',
			     	        });
							$('#taxId').attr('disabled','disabled');
							$('#taxId').removeClass('input-required');
							$('#paid-shipping-address-select').prop('disabled',false);
						}
	        		}
	        	});
	        	 shippingAddressFormvalidation();
		   		 if($('#different_billingAddress').val() == 'false'){
		   			 billingAddressFormValidation();
		   		 }
	        }
	    });
	}
});
/*----------------------- TAX/VAT Id label - End -----------------------*/

//Back to Saved Cart
$(document).on("click", '.js-back-to-saved-cart', function (event) {
	event.preventDefault();
    window.location = ACC.config.encodedContextPath + "/myaccount/saved-cart"
});

// ########### Handling Billing Address ##################

//Functionality for showing billing address nickname field
$(document).on('change','.js-toggle-billing-nickname-field',function() {
	  $("#js-billing-nickname-field").toggleClass("js-hide");
	  $("#billTo_middleName2").toggleClass('input-required');
});

//To list billing address for country
$(document).on('change','#billing-select-country-list-id',function(){
	var countryIsoCode = $('#billing-select-country-list-id').children(":selected").val();
	var addressId = 'undefined';
	$.ajax({
        url: "getBillingAddress",
        data:{"addressCode" :addressId , "countryIsoCode":countryIsoCode},
        type: 'GET',
        success: function(response){
            $("#billing_address_content").html(response);
	    setupPhoneEntryGroups();
            if($('#billing-select-country-list-id').children(":selected").attr('value')=='HK'){
   			 	var countryName=$('#billing-select-country-list-id').children(":selected").text();
   			 	$("#billTo_townCity").val(countryName);
   			 	$("#billTo_townCity").prop("readonly",true);
            }else{
   			 	$("#billTo_townCity").attr('disabled', false);
            }
        }
    });
	
});


//Display the selected Billing Addresses
$(document).on('change','#paid_billing_address_list_id',function(){
	var addressId = $(this).children(":selected").val();
	if(addressId == "新地址"){
		addressId = "New address";
	}
	var countryIsoCode = $('#billing-select-country-list-id').children(":selected").attr('value'); 
	$.ajax({
        url: "getBillingAddress",
        data:{"addressCode" :addressId , "countryIsoCode":countryIsoCode},
        type: 'GET',
        success: function(response){
            $("#billing_address_content").html(response);
            var isShipValid =shippingAddressFormvalidation();
            var isBillToValid =billingAddressFormValidation();
            if(isShipValid && isBillToValid){
            	$('#paid-shipping-address-select').removeAttr('disabled');
            }else{
            	$('#paid-shipping-address-select').attr('disabled', true);
            }
            
            if($('#billing-select-country-list-id').children(":selected").attr('value')=='HK'){
   			 	var countryName=$('#billing-select-country-list-id').children(":selected").text();
   			 	$("#billTo_townCity").val(countryName);
   			 	$("#billTo_townCity").prop("readonly",true);
            }else{
   			 	$("#billTo_townCity").attr('disabled', false);
            }
        }
    });
});

$('#js-different-billing-address, #js-same-shipping-address').on('change', function() {
	var newbilling = $("#js-different-billing-address").is(':checked');
	var sameAsShipping = $("#js-same-shipping-address").is(':checked');
	if (newbilling){
		$.ajax({
			url: "getBillingAddressForm",
	        cache: false,
	        type: 'GET',
	        success: function(response){
	            $("#billing_address_content").html(response);
	            $('#billingAddressForm').css({
	    		  	'display':'block',
	    		});
	    		$('#different_billingAddress').val('false');
	    		$('#paid-shipping-address-select').attr('disabled', true);
	        }
	    });
		
		setTimeout(function(){
	    console.log("TEST billing-select-country-list-id" + $('#billing-select-country-list-id').children(":selected").attr('value'));
		if($('#billing-select-country-list-id').children(":selected").attr('value')=='0'){
			 $("#paid_billing_address_list_id").attr('disabled', true);
			 $("#billTo_firstName").attr('disabled', true);
			 $("#billTo_lastName").attr('disabled', true);
			 $("#billTo_line1").attr('disabled', true);
			 $("#billTo_line2").attr('disabled', true);
			 $("#billTo_townCity").attr('disabled', true);
			 $("#billTo-state-text-input.form-control.state.input-optional").attr('disabled', true);
			 $("#billTo-select-state-list-id").attr('disabled', true);
			 $("#billTo_postcode").attr('disabled', true);
			 $("#billTo_companyName").attr('disabled', true);
			 $("#billTo_companyUrl").attr('disabled', true);
			 $("#billTo_phone").attr('disabled', true);
			 $("#billTo_email").attr('disabled', true);
			 $("#billTo_saveInAddressBook").attr('disabled', true);
		 }else{
			 $("#paid_billing_address_list_id").attr('disabled', false);
			 $("#billTo_firstName").attr('disabled', false);
			 $("#billTo_lastName").attr('disabled', false);
			 $("#billTo_line1").attr('disabled', false);
			 $("#billTo_line2").attr('disabled', false);
			 $("#billTo_townCity").attr('disabled', false);
			 $("#billTo-state-text-input.form-control.state.input-optional").attr('disabled', false);
			 $("#billTo-select-state-list-id").attr('disabled', false);
			 $("#billTo_postcode").attr('disabled', false);
			 $("#billTo_companyName").attr('disabled', false);
			 $("#billTo_companyUrl").attr('disabled', false);
			 $("#billTo_phone").attr('disabled', false);
			 $("#billTo_email").attr('disabled', false);
			 $("#billTo_saveInAddressBook").attr('disabled', false);
		 }
		 }, 500);
		 shippingAddressFormvalidation();
         billingAddressFormValidation();
	}else if(sameAsShipping){
		$("#billing_address_content").html("");
		$('#billingAddressForm').css({
		  	'display':'none',
		});
		$('#different_billingAddress').val('true');
		 shippingAddressFormvalidation();
	}
});

$('.samlLoginUrl').click(function(e) {
	var currentUrl = window.location.href;
	var updatedCurrentUrl = currentUrl.replace('/guest-login', '');
	var samlLoginUrl = updatedCurrentUrl.replace('/store','/samlsinglesignon/saml/store');
	
	window.location = samlLoginUrl;
});

// ## Pop over functionality --> Starts
// Added to fix a bug with popover needing many clicks after hiding
$(".popover-w-table a[data-toggle=popover]").click(function(e) {
  //$('.popover').not(this).hide(); // optional, hide other popovers
  $(this).popover('toggle'); // show popover now it's setup
  e.preventDefault();
});

$(".popover-w-table a[data-toggle=popover]").popover({
    html: true,
    container: 'body',
    content: function() {
      formatDisplayedVolPrice();    
      var content = $(this).attr("data-popover-content");
      return $(content).children(".popover-body").html();
    },
    title: function() {
      var title = $(this).attr("data-popover-content");
      return $(title).children(".popover-heading").html();
    }
});

// Function to close popovers
var hideAllPopovers = function() {
  $('[data-toggle=popover]').each(function () {
    $(this).popover('hide');
  });
};

// Close popover on basic table scroll
$(".basic-table").scroll(function() {
  hideAllPopovers();
});

// Close popover on freeze table scroll
$(".freeze-panes tbody").scroll(function() {
  hideAllPopovers();
});

//## Pop over functionality --> Ends

//Save cart 
$(document).on('click','#js-save-cart-submit',function() { 
	var formData = $("#saveCartForm").find('input,textarea').serialize().replace(/%23/g, 'IGNORE');
	 var url =$("#saveCartForm").attr('action');
	$.post(url, formData,function(res){
		var alertInfo = jQuery(res).find('.alert-info').prop('outerHTML');
		if(typeof alertInfo!= 'undefined' && alertInfo.length >0){
			$('.body-wrap').find('.alert-info').remove();
			
			$('.body-wrap').find('.ti-cart').before(jQuery(res).find('.alert-info').prop('outerHTML'));
			$('#target-modal-saved-cart-new').modal('hide');
		}else {
			$('#target-modal-saved-cart-new').modal('hide');
			var currentUrl = window.location.href;
			window.location = currentUrl;
		}
	});
    		
});



/////////////////////////DISABLE///////////////////////////
//Disable Invoice Button on OrderHistoryDetailsPage
$(window).load(function() {
    if ( $('.tiPaidInvoice').length > 0 ) {
        $('.tiPaidInvoice').prop('disabled', false);
    }
});

//Disable ReOrder Button on OrderHistoryDetailsPage
$(window).load(function() {
    if ( $('.js_reorder').length > 0 ) {
        $('.js_reorder').prop('disabled', false);
    }
});

//Disable BackToOrderHistoryButton on OrderHistoryDetailsPage
$(window).load(function() {
    if ( $('.backToOrderHistory').length > 0 ) {
        $('.backToOrderHistory').prop('disabled', false);
    }
});

//Disable emailWaiver Link on OrderHistoryDetailsPage
$(window).load(function() {
	$('.js_emailWaiverDisable').css({
		'pointer-events' : 'auto',
		'opacity' : '',
		'display' : 'inline'
	});
	if ( $('.js_emailWaiverDisable').length > 0 ) {
        $('.js_emailWaiverDisable').attr('disabled', false);
	}
});
//////////////////////////DISABLE-ENDS////////////////////////
$(document).on('blur keyup', '.form-control.companyUrl',function() {
	var isValid = true;
	var urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/HTTP:\/\/WWW\.|HTTPS:\/\/WWW\.|HTTP:\/\/|HTTPS:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{1,10}(:[0-9]{1,5})?(\/.*)?$/;
	$(this).parent('.form-group').find('.error-text').css({
    	'display':'none',
    });
	$(this).parent('.form-group').find('.nonenglish-error-text').css({
    	'display':'none',
    });
    if ($(this).val() == "") {
    	$(this).parent('.form-group').find('.error-text').css({
        	'display':'inline',
        });
    	isValid = false;
    } 
    if(!urlPattern.test($(this).val().toLowerCase()) && $(this).val().toLowerCase() != 'none' && $(this).val() != ""){
    	$(this).parent('.form-group').find('.nonenglish-error-text').css({
        	'display':'inline',
        });
    	isValid = false;
    }else{
    	$(this).parent('.form-group').find('.nonenglish-error-text').css({
        	'display':'none',
        });
    	isValid = true;
    }
});
$(document).on('blur keyup','.form-control.companyName',function() {
	var isValid = true;
	var value = $(this).val();
	var letters = /[a-zA-Z]/g;
	var count = (value.match(letters) || []).length;
	 if (value.length < 2 || count < 2) {
		 $(this).parent('.form-group').find('.error-text').css({
	        	'display':'inline',
	        });
	    	isValid = false;
	    	
	 }
});

$(document).on('click',"#paid-shipping-address-select",function() {
	submitPaidShippingAddressForm();
});

$(document).on('click',"#tax-exempt-fail-cont-taxable",function() {
	$('input[name=isTaxExempt][value=false]').prop('checked', true); 
	submitPaidShippingAddressForm();
});

$(document).on('click',"#tax-exempt-fail-cont-update-company",function() {
	var newCompany = $('input[name=taxExemptCompanyOption]:checked').val();
	if (!newCompany){
		$('.modal-message---tax-exempt-error').css('display', 'inline');
		return false;
	}
	$("#companyName").val(newCompany);
	submitPaidShippingAddressForm();
});

$(document).on('change','#isTaxExempt',function(e) {
	shippingAddressFormvalidation();
});

$(document).on('change','#isTaxCertExempt',function(e) {
	shippingAddressFormvalidation();
});

$(document).on('change','input[name=taxExemptCompanyOption]',function(e) {
	$('.modal-message---tax-exempt-error').css('display', 'none');
});

function selectCitconPaymentMethod(){
	deselectAdyenPaymentMethod()
	$('.payment-buttons-warnings').find('.warning').addClass('is-hidden');
	var paymentMethodVal = $('input[name=paymentMethod]:checked').val();

	if (paymentMethodVal == 'alipay'){
		$('#warning-alipay').removeClass('is-hidden');
	}
	if (paymentMethodVal == 'wechatpay'){
		$('#warning-wechat').removeClass('is-hidden');
	}
	if (paymentMethodVal == 'unionpay'){
		$('#warning-unionpay').removeClass('is-hidden');
	}
	if (paymentMethodVal == 'unionpay_b'){
		$('#warning-unionpay_b').removeClass('is-hidden');
	}
	if (paymentMethodVal == 'apruve'){
		$("input[name=paymentMethod]").prop( 'checked', false );
		$("#payment-method-apruve").prop( 'checked', true );
		$("#target-modal-apruve").modal('show');				
	}
}

function deselectAdyenPaymentMethod(){
	$("#adyenPaymentDiv input[name=paymentMethod]").prop( 'checked', false );
	$("#adyenSubmitBtn").attr('disabled', true);
	$( ".payment_method_details" ).hide();
}

function deselectCitconPaymentMethod(){
	$("#citconPaymentDiv input[name=paymentMethod]").prop( 'checked', false );
	$('.payment-buttons-warnings').find('.warning').addClass('is-hidden');
	$("#adyenSubmitBtn").attr('disabled', false);
}

$(document).on('change','#citconPaymentDiv input[name=paymentMethod]',function(e) {
	selectCitconPaymentMethod();
});

$('.js-apm-paymentbtn').click(function(e) {
	e.preventDefault();
	$('#payment-zh-cn-form').submit();
	$(this).attr('disabled', true);
});

$('.continue-apruve').click(function(e) {
	e.preventDefault();	
	$('#form-apruve-radio-hidden').submit();
});

// Clear payment method radio button when apruve confirmation modal hides on user clicking outside the modal or the close button
$('#target-modal-apruve').on('hidden.bs.modal', function (e) {
	$("#payment-method-apruve").prop( 'checked', false );
	$("input[name=paymentMethod]").prop( 'checked', false );
})

$(document).on('click','#reveal-guest-form',function() { 
	$('#guest-form').removeClass('is-hidden');
	$('#reveal-guest-form').addClass('is-hidden');
});	

$(document).ready(function(){
	$('form').each(function(){
		var formID = $(this).attr('id');
		if($(this).attr('id') == "guestForm" &&  typeof formID != 'undefined'){
			var errorspan = $( "div" ).hasClass( "help-block" );
			if(errorspan &&  typeof errorspan != 'undefined'){
				$('#guest-form').removeClass('is-hidden');
				$('#reveal-guest-form').addClass('is-hidden');
			}else{
				$('#guest-form').addClass('is-hidden');
				$('#reveal-guest-form').removeClass('is-hidden');
			}
		}
	});
});



$(document).on('change keyup input','#customerReferencePartNumber',function(e) {
	e.preventDefault();
	var customerReferencePartNumber = $(this).val();
	var purchaseOrderNumber = $("#purchaseOrderNumber").val();
	var endCustomerCompanyName = $("#endCustomerCompanyName").val();
	var entryNumber = $(this).data("index");
	var fieldPattern = /^[a-zA-z0-9\.\:\/\@\,\-\s\(\)\!\#\$\%\^\&\*\~\_]+$/;
	if(!fieldPattern.test(customerReferencePartNumber) && customerReferencePartNumber != ""){
		$(this).parent('.form-group-cust-ref-number').find('.error-text').css({
	     	'display':'inline',
	     });
		 $(".tiCartCalculateCheckoutButton").attr('disabled', true);
	}else{
		$(this).parent('.form-group-cust-ref-number').find('.error-text').css({
	     	'display':'none',
	     });
		$(".tiCartCalculateCheckoutButton").attr('disabled', false);
		console.log("customerReferencePartNumber "+ customerReferencePartNumber + " entryNumber "+ entryNumber);
		$.ajax({
			url: "cart/saveCustomerReferencePartNumber",
			data:{customerReferencePartNumber: encodeURIComponent(customerReferencePartNumber) , entryNumber:entryNumber},
			type: 'POST',
	        success: function(response){
	           if(response == "Success"){
	        	   console.log("Save Success");
	           }
	        }
	    });
	}
	if((!fieldPattern.test(purchaseOrderNumber) && purchaseOrderNumber != "") || (!fieldPattern.test(endCustomerCompanyName) && endCustomerCompanyName != "")){
		$(".tiCartCalculateCheckoutButton").attr('disabled', true);
	}
	
});


$(document).on('change keyup input','#purchaseOrderNumber',function(e) {
	e.preventDefault();
	var purchaseOrderNumber = $("#purchaseOrderNumber").val();
	var endCustomerCompanyName = $("#endCustomerCompanyName").val();
	var fieldPattern = /^[a-zA-z0-9\.\:\/\@\,\-\s\(\)\!\#\$\%\^\&\*\~\_]+$/;
	if((!fieldPattern.test(purchaseOrderNumber) && purchaseOrderNumber != "") || (!fieldPattern.test(endCustomerCompanyName) && endCustomerCompanyName != "")){
		$(".purchaseOrderNumberError").removeClass('hide');
		$(".tiCartCalculateCheckoutButton").attr('disabled', true);
	}else{
		$(".purchaseOrderNumberError").addClass('hide');
		$(".tiCartCalculateCheckoutButton").attr('disabled', false);
		console.log("purchaseOrderNumber "+ purchaseOrderNumber);
		$.ajax({
			url: "cart/savePurchaseOrderNumber",
			data:{purchaseOrderNumber: encodeURIComponent(purchaseOrderNumber)},    
	        type: 'POST',
	        success: function(response){
	           if(response == "Success"){
	        	   console.log("Save Success");
	           }
	        }
	    });
	}
	if( $(".error-text:visible").length > 0){
		$(".tiCartCalculateCheckoutButton").attr('disabled', true);
	}
	 
});

$(document).on('change keyup input','#endCustomerCompanyName',function(e) {
	e.preventDefault();
	var endCustomerCompanyName = $("#endCustomerCompanyName").val();
	var purchaseOrderNumber = $("#purchaseOrderNumber").val();
	var fieldPattern = /^[a-zA-z0-9\.\:\/\@\,\-\s\(\)\!\#\$\%\^\&\*\~\_]+$/;
	if((!fieldPattern.test(endCustomerCompanyName) && endCustomerCompanyName != "") || (!fieldPattern.test(purchaseOrderNumber) && purchaseOrderNumber != "")){
		$(".purchaseOrderNumberError").removeClass('hide');
		$(".tiCartCalculateCheckoutButton").attr('disabled', true);
	}else{
		$(".purchaseOrderNumberError").addClass('hide');
		$(".tiCartCalculateCheckoutButton").attr('disabled', false);
		console.log("endCustomerCompanyName "+ endCustomerCompanyName);
		$.ajax({
			url: "cart/saveEndCustomerCompanyName",
			data:{endCustomerCompanyName: encodeURIComponent(endCustomerCompanyName)},
	        type: 'POST',
	        success: function(response){
	           if(response == "Success"){
	        	   console.log("Save Success");
	           }
	        }
	    });
	}
	if($(".error-text:visible").length > 0){
		$(".tiCartCalculateCheckoutButton").attr('disabled', true);
	}
});


////Changes for OrderView for Guest users 

$(document).on('change','#orderNo',function(e) {
	enableGuestOrderDetails();
});

$(document).on('change','#guestLastName',function(e) {
	enableGuestOrderDetails();
});

$(document).on('change','#guestEmail',function(e) {
	enableGuestOrderDetails();
});

function recaptchaCallback() {
	enableGuestOrderDetails();
};


function enableGuestOrderDetails()
{   
	if($('#orderNo').val() != "" && $('#guestLastName').val() != ""  && $('#guestEmail').val() != "")
	{
		if($("#g-recaptcha_widget").css('display') == 'block')
	    	{
	    	  if(grecaptcha && grecaptcha.getResponse().length > 0)
	    		  {
	    		  $("#orderDetail").attr('disabled', false);
	    		  }
	    	}
	    else
	        {
	    	$("#orderDetail").attr('disabled', false);
	    	}
	}
else
	{
	 $("#orderDetail").attr('disabled', true);
	}
}


//// for email wiever


$('.js_guestEmailWaiver_btn')
.click(
              function(e) {
                     e.preventDefault();
                     $('#tiB2B-waiver-email-error').css({
                           'display' : 'none',
                     });
                     var orderGUID = $(this).attr('data-id');
                     var emailPattern = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
                     var defaultEmail = $('#notifyWaiverEmail').val();
                     if (defaultEmail == "" || !emailPattern.test(defaultEmail)
                                  || orderGUID == "") {
                            $('#tiB2B-waiver-email-error').css('display', 'block');
                     } else {
                           $
                                         .ajax({
                                                url : ACC.config.encodedContextPath
                                                              + '/guest/email-waiver?orderGUID='
                                                              + orderGUID,
                                                data : {

                                                       emailID : defaultEmail
                                                },
                                                type : 'GET',
                                                success : function(res) {
                                                       $('#ti-target-modal-email').modal(
                                                                     'hide');
                                                },
                                                error : function(xhr, errorType, exception) {
                                                       $("#ti-target-modal-email").modal(
                                                                     'show');
                                                       $('.modal-body')
                                                                     .html(
                                                                                  "Something went wrong, Please try after sometime..");

                                                }
                                         });
                     }
              });




////////////////////////////////////////////////////

$(document).on('change','#select-carrier1',function(e){
	var entryNumber = $(this).data("index");
	var carrierOption = $(this).val();
	$("#carrierOption"+entryNumber).val(carrierOption);
	console.log("entryNumber == "+ entryNumber + " carrierOption == "+ $("#carrierOption"+entryNumber).val());
	document.getElementById("updateCartForm"+entryNumber).submit();
});

$('#delivery-details').click(function () {   	
	$('#ti-target-modal-delivery-details').modal('show');   	
	});

$(document).ready(function(){
	if($('#boxTubeAvailable').val() == 'true'){
		$('#cart-fine-print').removeClass('is-hidden');
		$('#tube-note').removeClass('is-hidden');
	}
	if($('#boxTrayAvailable').val() == 'true'){
		$('#cart-fine-print').removeClass('is-hidden');
		$('#tray-note').removeClass('is-hidden');
	}
});


$(document).on('change keyup keydown','#addToCartPdpQty',function(e){
	var enteredQty = $('#addToCartPdpQty').val();
	var dataValueObj = $(this). data('value');
	var limit = dataValueObj.key1;
	var availableInv = dataValueObj.key2;
	var limitFormattedValue =  addCommasToNum(limit);
	
  if(parseInt(enteredQty) > parseInt(availableInv) ){
	  $("#error-text-exceeds-inv").css('display', 'block');
	  $('#addToCartButton').attr('disabled','disabled');
	  $('#addToCartCarrierButton').attr('disabled','disabled');
	  $('#addToCartHirelButton').attr('disabled','disabled');
	  $("#pdp-limit-error").css('display', 'none');
	  $("#error-text-zero-qty").css('display', 'none');
	  $("#js-error-status-cr").css('display', 'none');
  }
  else if(parseInt(enteredQty) > parseInt(limit)){
	  $("#pdp-limit-error").css('display', 'block');
	  $("#error-text-limit").text(" "+limitFormattedValue+" ");
	  $("#pdp-limit-error").append($("#error-text-limit-msg").css('display', 'inline'));
	  $('#addToCartButton').attr('disabled','disabled');
	  $('#addToCartCarrierButton').attr('disabled','disabled');
	  $('#addToCartHirelButton').attr('disabled','disabled');
	  $("#error-text-exceeds-inv").css('display', 'none');
	  $("#error-text-zero-qty").css('display', 'none');
	  $("#js-error-status-cr").css('display', 'none');
  }
  else if(parseInt(enteredQty) ==0){
	  $("#error-text-zero-qty").css('display', 'block');
	  $('#addToCartButton').attr('disabled','disabled');
	  $('#addToCartCarrierButton').attr('disabled','disabled');
	  $('#addToCartHirelButton').attr('disabled','disabled');
	  $("#error-text-exceeds-inv").css('display', 'none');
	  $("#pdp-limit-error").css('display', 'none');
	  $("#js-error-status-cr").css('display', 'none');
  }
  else{
	  $("#pdp-limit-error").css('display', 'none'); 
	  $("#error-text-exceeds-inv").css('display', 'none');
	  $("#error-text-zero-qty").css('display', 'none');
	  $('#addToCartButton').removeAttr('disabled');
	  $('#addToCartCarrierButton').removeAttr('disabled');
	  $('#addToCartHirelButton').removeAttr('disabled');
	  $("#js-error-status-cr").css('display', 'block');
	  
	  var volumePrices = $('#volPrice').val();
	  var currentCurrency = $("ti-header-currency-selection").val();
	  var currentLang = $("ti-header-language-selection").val();
	  if(volumePrices != null && volumePrices != undefined)
	  {
		  var jsonPrices = JSON.parse(volumePrices);
		  for (i = 0; i < jsonPrices.length; i++) {
	  		if(jsonPrices[i].maxQuantity != undefined && jsonPrices[i].maxQuantity != null && enteredQty <= jsonPrices[i].maxQuantity && enteredQty >= jsonPrices[i].minQuantity)
		  	{
		  	 $("#unitPrice").val(jsonPrices[i].value);
		  	 var unit_price = com.TI.CurrencyFormat.format(jsonPrices[i].value, true, currentCurrency, currentLang);
			_metrics_store_data.part_unit_price = unit_price.substring(1);
		  	}
		  	if(jsonPrices[i].maxQuantity == null && enteredQty >= jsonPrices[i].minQuantity)
		  	{
		  	 $("#unitPrice").val(jsonPrices[i].value);
		  	 var unit_price = com.TI.CurrencyFormat.format(jsonPrices[i].value, true, currentCurrency, currentLang);
			_metrics_store_data.part_unit_price = unit_price.substring(1);
		  	}
		}
	}
  }
});


function onPlpQtyChange(plpQtyObj){
	var enteredQty = $(plpQtyObj).val();
	var hubQty = plpQtyObj.getAttribute("data-key1");
	var availQty = plpQtyObj.getAttribute("data-key2");
	var prodCode = plpQtyObj.getAttribute("data-key3");
	var plpLimit =  addCommasToNum(hubQty);
	
  if(parseInt(enteredQty) > parseInt(availQty) ){
	  $("#error-text-exceeds-inv-plp-"+prodCode).css('display', 'block');
	  $("#plp-limit-error-"+prodCode).css('display', 'none');
	  $('#addToCartBtnPlp_'+prodCode).attr('disabled','disabled');
	  $("#error-text-zero-qty-"+prodCode).css('display', 'none');
  }
  else if(parseInt(enteredQty) > parseInt(hubQty)){
	  $("#error-text-exceeds-inv-plp-"+prodCode).css('display', 'none');
	  $("#error-text-zero-qty-"+prodCode).css('display', 'none');
	  $('#addToCartBtnPlp_'+prodCode).attr('disabled','disabled');
	  $("#plp-limit-error-"+prodCode).css('display', 'block');
	  $("#error-text-limit-"+prodCode).text(" "+plpLimit+" ");
	  $("#plp-limit-error-"+prodCode).append($("#error-text-limit-msg-"+prodCode).css('display', 'inline'));
  }
  else if(parseInt(enteredQty) ==0){
	  $("#error-text-zero-qty-"+prodCode).css('display', 'block');
	  $("#plp-limit-error-"+prodCode).css('display', 'none');
	  $("#error-text-exceeds-inv-plp-"+prodCode).css('display', 'none');
	  $('#addToCartBtnPlp_'+prodCode).attr('disabled','disabled');
  }
  else{
	  $("#error-text-exceeds-inv-plp-"+prodCode).css('display', 'none');
	  $("#plp-limit-error-"+prodCode).css('display', 'none');
	  $("#error-text-zero-qty-"+prodCode).css('display', 'none');
	  $('#addToCartBtnPlp_'+prodCode).removeAttr('disabled');
	  
	  var volumePrices = $('#volPrice_' + prodCode).val();
	  if(volumePrices != null && volumePrices != undefined)
	  {
		  var jsonPrices = JSON.parse(volumePrices);
		  var currentCurrency = $("ti-header-currency-selection").val();
		  var currentLang = $("ti-header-language-selection").val();
		  for (i = 0; i < jsonPrices.length; i++) {
		  		if(jsonPrices[i].maxQuantity != undefined && jsonPrices[i].maxQuantity != null && enteredQty <= jsonPrices[i].maxQuantity && enteredQty >= jsonPrices[i].minQuantity)
			  	{
			  	 $("#price_"+prodCode).val(jsonPrices[i].value);
			  	var unit_price = com.TI.CurrencyFormat.format(jsonPrices[i].value, true, currentCurrency, currentLang);
				_metrics_store_data.part_unit_price = unit_price.substring(1);
			  	}
			  	if(jsonPrices[i].maxQuantity == null && enteredQty >= jsonPrices[i].minQuantity)
			  	{
			  	 $("#price_"+prodCode).val(jsonPrices[i].value);
			  	 var unit_price = com.TI.CurrencyFormat.format(jsonPrices[i].value, true, currentCurrency, currentLang);
				_metrics_store_data.part_unit_price = unit_price.substring(1);
			  	}
			}
	 }
  }
}
////To display carrier options when clicked on add to cart button

function showCarrierOptions(addToCartCarrierBtn) {

	var enteredQty=$('#addToCartPdpQty').val();
	var prodCode = addToCartCarrierBtn.getAttribute("data-key1");
	var limitCarrier = addToCartCarrierBtn.getAttribute("data-key2");
	var availInvCarrier = addToCartCarrierBtn.getAttribute("data-key3");
    var referrerValue = addToCartCarrierBtn.getAttribute("data-key4");
	if(parseInt(enteredQty) > parseInt(availInvCarrier) ){
		$("#error-text-exceeds-inv").css('display', 'block');
		$('#addToCartButton').attr('disabled','disabled');
		$('#addToCartCarrierButton').attr('disabled','disabled');
		$("#pdp-limit-error").css('display', 'none');
		$("#error-text-zero-qty").css('display', 'none');
		$("#js-error-status-cr").css('display', 'none');
	} 
	else if(parseInt(enteredQty) > parseInt(limitCarrier)){
		$("#pdp-limit-error").css('display', 'block');
		$("#error-text-limit").text(" "+limitFormattedValue+" ");
		$("#pdp-limit-error").append($("#error-text-limit-msg").css('display', 'inline'));
		$('#addToCartButton').attr('disabled','disabled');
		$('#addToCartCarrierButton').attr('disabled','disabled');
		$("#error-text-exceeds-inv").css('display', 'none');
		$("#error-text-zero-qty").css('display', 'none');
		$("#js-error-status-cr").css('display', 'none');
	}
	else if(parseInt(enteredQty) == 0 || enteredQty==""){ 
		$("#error-text-zero-qty").css('display', 'block');
		$('#addToCartButton').attr('disabled','disabled');
		$('#addToCartCarrierButton').attr('disabled','disabled');
		$("#error-text-exceeds-inv").css('display', 'none');
		$("#pdp-limit-error").css('display', 'none');
		$("#js-error-status-cr").css('display', 'none');
	}else{
		$("#pdp-limit-error").css('display', 'none'); 
		$("#error-text-exceeds-inv").css('display', 'none');
		$("#error-text-zero-qty").css('display', 'none');
		$('#addToCartButton').removeAttr('disabled');
		$('#addToCartCarrierButton').removeAttr('disabled');

		$.ajax({
			url: ACC.config.encodedContextPath + "/getCarrierOptions",
			data:{qty: enteredQty , prodCode: prodCode, referrerValue:referrerValue}, 
			type: 'GET',
			// datatype:"json",
			success: function(res) {			
				$('#carrier-div-id').html(res);
				var a = $('#select-carrier').val();
				var fullReelCarrierQty = $('#fullReelCarrierQty').text();
				var cutTapeFlag = $('#cutTapeFlag').val();
				var customReelFlag = $('#customReelFlag').val();
				var isForeCastDown = $('#isForeCastDown').val();
				var showCarrierPopup = $('#showCarrier').val();
				var fullReelCount = $('#fullReelCount').val();
				var cutTapeQty = $('#cutTapeQuantity').val();
				var customReelQty = $('#customReelQuantity').val();
				
				var requestedQty =$('#qty').val();
				console.log("cutTapeFlag "+ cutTapeFlag + "customReelFlag "+customReelFlag + "cutTapeQty "+cutTapeQty + "customReelQty "+customReelQty + "showCarrierPopup "+showCarrierPopup);
				if(showCarrierPopup =="true")
				{
					$("#target-modal-checkout-carrier").modal('show');
				}
				else{
					if(isForeCastDown=="true"){
						$('#carrierValue').val('cutTape');
						$('#cutTapeQty').val(requestedQty);
					}else
					{
						$('#carrierValue').val($('#select-carrier').val());
						$('#cutTapeQty').val();
						$('#customReelQty').val();
						$('#fullReelCount').val();
					}

					var myFormData = $("#addToCartForm").serialize().replace(/%23/g, 'IGNORE');
					$.ajax({
						url: ACC.config.encodedContextPath + "/cart/add",
						type: 'POST',
						data: myFormData,
						success:function(res){

							$("#target-modal-checkout").modal('show');
							$('#add-to-cart-modal-body').html(res.addToCartLayer);
							 $('#addToCartLayer').remove();
						        if (typeof ACC.minicart.updateMiniCartDisplay == 'function') {
						            ACC.minicart.updateMiniCartDisplay();
						        }
						        var cartAnalyticsData = res.cartAnalyticsData;
                                var cartData = {
                                    "cartCode": cartAnalyticsData.cartCode,
                                    "productCode": prodCode, "quantity": enteredQty,
                                    "productPrice": cartAnalyticsData.productPostPrice,
                                    "productName": cartAnalyticsData.productName
                                };
                                window.dispatchEvent(new CustomEvent('tiAddToCartChange', {}));
                                ACC.track.trackAddToCart(prodCode, enteredQty, cartData);
						},
						error: function(xhr, errorType, exception){
							$("modal-body").html("");
							$("#MainModal").modal('show');
						}
					});
				}

			}
		});
	}
};


////To display Hirel options when clicked on add to cart button

function showHirelOptions(prodCode,quantity,qtyUpdated,previousDateCode) {

	var enteredQty=$('#addToCartPdpQty').val();
	var hirelPcrValue = $('#pcrValue').val();
	var updateCartPage = 'false';
	var code = prodCode;
	window.dispatchEvent(new CustomEvent('tiAddToCartChange', {}));
	updateCartHirelButton = document.getElementsByName("updateCartHirelButton_"+code)[0];
	if(typeof addToCartHirelButton !== 'undefined' && addToCartHirelButton != ''){
		prodCode = addToCartHirelButton.getAttribute("data-key1");
	}else if (typeof updateCartHirelButton !== 'undefined' && updateCartHirelButton != ''){
		prodCode = updateCartHirelButton.getAttribute("data-key1");
		updateCartPage = 'true';
	}else {
		prodCode = prodCode;
	}
	console.log("prodCode "+ prodCode + "updateCartPage "+updateCartPage + "qtyUpdated "+qtyUpdated + "quantity "+quantity + "enteredQty "+enteredQty + "previousDateCode "+previousDateCode);
	if(parseInt(enteredQty) == 0 || enteredQty==""){ 
		$("#error-text-zero-qty").css('display', 'block');
		$('#addToCartButton').attr('disabled','disabled');
		$('#addToCartHirelButton').attr('disabled','disabled');
		$("#error-text-exceeds-inv").css('display', 'none');
		$("#pdp-limit-error").css('display', 'none');
		$("#js-error-status-cr").css('display', 'none');
	}else{
		$("#pdp-limit-error").css('display', 'none'); 
		$("#error-text-exceeds-inv").css('display', 'none');
		$("#error-text-zero-qty").css('display', 'none');
		$('#addToCartButton').removeAttr('disabled');
		$('#addToCartHirelButton').removeAttr('disabled');
		if(qtyUpdated == 'true'){
			$.ajax({
			url: ACC.config.encodedContextPath + "/getCarrierOptions",
			data:{qty: quantity , prodCode: prodCode}, 
			type: 'GET',
			 datatype:"json",
			success: function(res) {	
				$('#hirel-div-id').html(res);
				initiateDateCodeOptionPriceFormat();
				var dateCode = $('#select-datecode').val();
				var isForeCastDown = $('#isForeCastDown').val();
				var showHirelPopup = $('#showHirel').val();
				var hirelRequestedQty =$('#hirelRequestedQty').val();
				console.log("dateCode "+ dateCode + "isForeCastDown "+isForeCastDown + "showHirelPopup "+showHirelPopup + "hirelRequestedQty "+hirelRequestedQty);
				var dateCodeArr = [];
				$('#selectDatecode option').each(function() {
					dateCodeArr.push($(this).attr('value'));
				});
				setHirelErrorMessage(previousDateCode,dateCodeArr,hirelPcrValue);
				if(updateCartPage == 'true'){
					$('#cartPageHirelPopup').val("Y");
					$('#cartEntryNumber').val(updateCartHirelButton.getAttribute("data-key2"));
				}else {
					$('#cartPageHirelPopup').val("N");
				}

			if(showHirelPopup =="true")
			{
				$("#target-modal-checkout-hirel").modal('show');
			}
			}
		});
		}else{
			$.ajax({
			url: ACC.config.encodedContextPath + "/getCarrierOptions",
			data:{qty: enteredQty , prodCode: prodCode}, 
			type: 'GET',
			datatype:"json",
			cache: false,
			success: function(res) {	
				$('#hirel-div-id').html(res);
				initiateDateCodeOptionPriceFormat();
				var dateCode = $('#select-datecode').val();
				var isForeCastDown = $('#isForeCastDown').val();
				var showHirelPopup = $('#showHirel').val();
				var requestedQty =$('#qty').val();
				console.log("dateCode "+ dateCode + "isForeCastDown "+isForeCastDown + "showHirelPopup "+showHirelPopup + "requestedQty "+requestedQty);
				if(showHirelPopup =="true")
				{
					$("#target-modal-checkout-hirel").modal('show');
				}else {
					$("#target-modal-checkout-hirel").modal('hide');
					var myFormData = $("#addToCartForm").serialize().replace(/%23/g, 'IGNORE');
					$.ajax({
						url: ACC.config.encodedContextPath + "/cart/add",
						type: 'POST',
						data: myFormData,
						success:function(res){

							$("#target-modal-checkout").modal('show');
							$('#add-to-cart-modal-body').html(res.addToCartLayer);
							$('#addToCartLayer').remove();
							if (typeof ACC.minicart.updateMiniCartDisplay == 'function') {
								ACC.minicart.updateMiniCartDisplay();
							}
							var cartAnalyticsData = res.cartAnalyticsData;
							var cartData = {
									"cartCode": cartAnalyticsData.cartCode,
									"productCode": prodCode, "quantity": enteredQty,
									"productPrice": cartAnalyticsData.productPostPrice,
									"productName": cartAnalyticsData.productName
							};
							window.dispatchEvent(new CustomEvent('tiAddToCartChange', {}));
							ACC.track.trackAddToCart(prodCode, enteredQty, cartData);
						},
						error: function(xhr, errorType, exception){
							$("modal-body").html("");
							$("#MainModal").modal('show');
						}
					});
				}
				
			}
		});
		}
		
	}
};

function initiateDateCodeOptionPriceFormat(retryCount){

	if (typeof isCurrencyStateReady != "undefined" && isCurrencyStateReady()) {
        formatHiRelDateCodeOptionsCurrency();
    } else {
        if (typeof retryCount == "undefined") {
            retryCount = 0;
        }
        if (retryCount < 5) {
            retryCount++;
            setTimeout(function () {
                initiateDateCodeOptionPriceFormat(retryCount);
            }, 1000);
        }
    }
}

function formatHiRelDateCodeOptionsCurrency(){
	var currentCurrency = $("ti-header-currency-selection").val();
	var currentLang = $("ti-header-language-selection").val();

	console.log('in formatHiRelDateCodeOptionsCurrency with currency='+currentCurrency+',lang='+currentLang);

	$("#selectDatecode > option[data-isformatted=false]").each(function()
	{
		var dateCodeVal = $(this).html();
		var dateCodeFee =  dateCodeVal.substring(dateCodeVal.lastIndexOf('(')+1, dateCodeVal.lastIndexOf(')'))
		if(dateCodeFee !== ''){
			var fmtDateCodeFee = com.TI.CurrencyFormat.format(dateCodeFee, false, currentCurrency, currentLang);
			if(fmtDateCodeFee.includes("NaN")){
				fmtDateCodeFee = dateCodeFee;
			}
			fmtDateCodeFeeToReplace = "(+ " + fmtDateCodeFee + ")";
			dateCodeVal =  dateCodeVal.replace(/\(.+?\)/g, fmtDateCodeFeeToReplace);
			$(this). html(dateCodeVal);
			$(this).data("isformatted", true);
		}
	});
}

////continue button on carrier options popup
$(document).on('click','#carrieraddToCart',function(e){
	var myFormData = $("#addToCartForm1").serialize().replace(/%23/g, 'IGNORE');
		$.ajax({
		url: ACC.config.encodedContextPath + "/cart/add",
		type: 'POST',
		 data: myFormData,
		 cache: false,
	    success:function(res){
	    	$("#target-modal-checkout").modal('show');
	    	 $('#add-to-cart-modal-body').html(res.addToCartLayer);
	    	 $('#addToCartLayer').remove();
		        if (typeof ACC.minicart.updateMiniCartDisplay == 'function')
		        {
		            ACC.minicart.updateMiniCartDisplay();
		        }
		        var enteredQty=$('#addToCartPdpQty').val();
		        var productCode=$('#productCodePost').val();
		        var cartAnalyticsData = res.cartAnalyticsData;
                var cartData = {
                    "cartCode": cartAnalyticsData.cartCode,
                    "productCode": productCode, "quantity": enteredQty,
                    "productPrice": cartAnalyticsData.productPostPrice,
                    "productName": cartAnalyticsData.productName
                };
                window.dispatchEvent(new CustomEvent('tiAddToCartChange', {}));
                ACC.track.trackAddToCart(productCode, enteredQty, cartData);
	    },
	    error: function(xhr, errorType, exception){
	    	$("modal-body").html("");
	    	$("#MainModal").modal('show');
	 }
	});

});

////continue button on hirel options popup
$(document).on('click','#hireladdToCart',function(e){
	 var myFormData = $("#addToCartForm2").serialize().replace(/%23/g, 'IGNORE');
	 console.log(myFormData);
		$.ajax({
		url: ACC.config.encodedContextPath + "/cart/add",
		type: 'POST',
		 data: myFormData,
	    success:function(res){
	    	$("#target-modal-checkout").modal('show');
	    	 $('#add-to-cart-modal-body').html(res.addToCartLayer);
	    	 $('#addToCartLayer').remove();
			 if(typeof updateCartHirelButton !== 'undefined' && updateCartHirelButton != ''){
				 window.location = ACC.config.encodedContextPath + '/cart'; 
			 }
		        if (typeof ACC.minicart.updateMiniCartDisplay == 'function')
		        {
		            ACC.minicart.updateMiniCartDisplay();
		        }
		        var enteredQty=$('#addToCartPdpQty').val();
		        var productCode=$('#productCodePost').val();
		        var cartAnalyticsData = res.cartAnalyticsData;
                var cartData = {
                    "cartCode": cartAnalyticsData.cartCode,
                    "productCode": productCode, "quantity": enteredQty,
                    "productPrice": cartAnalyticsData.productPostPrice,
                    "productName": cartAnalyticsData.productName
                };
                window.dispatchEvent(new CustomEvent('tiAddToCartChange', {}));
                ACC.track.trackAddToCart(productCode, enteredQty, cartData);
	    },
	    error: function(xhr, errorType, exception){
	    	$("modal-body").html("");
	    	$("#MainModal").modal('show');
	 }
	});

});


$(document).on('change','#select-carrier',function() {
	var selectedVal = $('#select-carrier').val();
	console.log("selected"+selectedVal);
	var cutTapeQty = $('#cutTapeQuantity').val();
	var customReelQty = $('#customReelQuantity').val();
	if (selectedVal == "Custom reel") {
		if(customReelQty !=null && customReelQty > 0)
		{
			$('#customReelQuantity').val(customReelQty);
			$('#cutTapeQuantity').val(0);
			
		}
		else {
			$('#customReelQuantity').val(cutTapeQty);
			$('#cutTapeQuantity').val(0);
		}
		formatDisplayedCustomReelPrice();
		$('.feedback-wrapper').removeClass('is-hidden');
		
	}
	else{
		if(cutTapeQty !=null && cutTapeQty > 0)
		{
			$('#customReelQuantity').val(0);
			$('#cutTapeQuantity').val(cutTapeQty);
		}
		else {
			$('#customReelQuantity').val(0);
			$('#cutTapeQuantity').val(customReelQty);
		}
		$('.feedback-wrapper').addClass('is-hidden');
	}
});

//Added for Hirel popup
$(document).on('change','#selectDatecode',function() {
        var dienCode = $(this).val();
        var lotYear = $('#selectYear');
		$('#selectYear,#selectWeek,#selectBatchNumber,#pcrValue').val("");
		$('#error-pcr-code-not-matching').css('display', 'none');
		$('#hireladdToCart').removeAttr('disabled');
		$('#lotCode,#selectYear,#selectWeek,#selectBatchNumber,#lotCodelabel').addClass('hide');
		if(dienCode == ""){
			$('#pcrToggle,#lotToggle,#lotCode').addClass('hide');
			$('#pcrCode').addClass('hide');
			$('#error-pcr-code-not-matching').css('display', 'none');
			$('#hireladdToCart').removeAttr('disabled');
		}else{
			var lotCodeDropdown = false;
			var pcrCodeTextInput = false;
			$('option', lotYear).filter(function(){
						if($(this).attr('data-group') == dienCode){
							lotCodeDropdown = true;
						}
			});
			if($('#' + dienCode).attr('id')== dienCode){
				pcrCodeTextInput = true;
			}
			if(lotCodeDropdown == false && pcrCodeTextInput == false){
				$('#pcrToggle,#lotToggle,#lotCode').addClass('hide');
				$('#pcrCode').addClass('hide');
				if(dienCode != ""){
					$('#hireladdToCart').removeAttr('disabled');
				}
			}else if(lotCodeDropdown == true && pcrCodeTextInput == false){
				$('#pcrToggle,#lotToggle').addClass('hide');
				$('#hireladdToCart').attr('disabled','disabled');
				$('#lotCode,#selectYear,#lotCodelabel').removeClass('hide');
			}else if(lotCodeDropdown == false && pcrCodeTextInput == true){
				$('#hireladdToCart').attr('disabled','disabled');
				$('#pcrToggle,#lotToggle').addClass('hide');
				$('#pcrCode').removeClass('hide');
			}else if(lotCodeDropdown == true && pcrCodeTextInput == true){
				$('#hireladdToCart').attr('disabled','disabled');
				$('#pcrToggle,#lotCode,#selectYear,#lotCodelabel').removeClass('hide');
			}
			lotYear.find('option').not(':first').hide();
				$('option', lotYear).filter(function(){
						if($(this).attr('data-group') == dienCode){
							$(this).show();
						}
				});
		}
});



$(document).on('change','#selectYear',function() {
	  $('#selectWeek').removeClass('hide');
	  $('#selectWeek,#selectBatchNumber').val("");
	  var year = $(this).val();
	  var lotWeek = $('#selectWeek');
	  lotWeek.find('option').not(':first').hide();
	  lotWeek.find('option').not(':first').attr('disabled','disabled');
	  lotWeek.find("option[data-group='"+year+"']").show();
	  lotWeek.find("option[data-group='"+year+"']").removeAttr('disabled');
	   if(year === '' || $('#selectWeek').val() === ''){
		   $('#hireladdToCart').attr('disabled','disabled');
		}else{
		   $('#hireladdToCart').removeAttr('disabled');
	   }
	  
});


$(document).on('change','#selectWeek',function() {
	$('#selectBatchNumber').removeClass('hide');
	$('#selectBatchNumber').val("");
       var week = $(this).val();
        var lotBatch = $('#selectBatchNumber');
		lotBatch.find('option').not(':first').hide();
		$('option', lotBatch).filter(function(){
			if($(this).attr('value') == '' || $(this).attr('data-group') == '' || $(this).attr('value') == 'undefined' || $(this).attr('data-group') == 'undefined'){
				$('.lot-batch').hide();
			}else{
				if($(this).attr('value') != '' && $(this).attr('data-group') != '' && $(this).attr('data-group') == week){
                    $(this).show();
					$('.lot-batch').show();
					$('#hireladdToCart').attr('disabled','disabled');
				}else{
					$('#hireladdToCart').removeAttr('disabled');
				}
			}
            });
	});

  $(document).on('change','#selectYear,#selectWeek,#selectBatchNumber',function(e){
	if($('#selectYear :selected').val() == "" || $('#selectWeek :selected').val() == "" || $('#selectBatchNumber :selected').val() == ""){
		if($('#selectYear :selected').val() != "" && $('#selectWeek :selected').val() != "" && $('.lot-batch').is(':hidden')){
			$('#hireladdToCart').removeAttr('disabled');
		}else{
			$('#hireladdToCart').attr('disabled','disabled');
		}
	}else{
		$('#hireladdToCart').removeAttr('disabled');
	}
});  

$(document).on('change','#pcrValue',function(e){
	
	$('#hireladdToCart').removeAttr('disabled');
	$('#error-pcr-code-not-matching').css('display', 'none');
	var pcrEntered = $('#pcrValue').val().trim();
	var dienCode = $('#selectDatecode :selected').val();
	var listOfPCR = $('#'+dienCode).val().split(",");
	var actualPCR = $('#'+dienCode).val().split(",");
	$('#pcrValueSelected').val("");
	var isMatched = false;
	if(pcrEntered != "" && listOfPCR != ""){
		for (i=0;i<listOfPCR.length;i++){
			listOfPCR[i] = listOfPCR[i].trim().replace(/[\[\]']+/g,'');
			listOfPCR[i] = listOfPCR[i].slice(0, 7);
			if(listOfPCR[i].toUpperCase() == pcrEntered.toUpperCase()) {
				var actualPCRSelected = actualPCR[i].trim().replace(/[\[\]']+/g,'');
				$('#pcrValueSelected').val(actualPCRSelected.toUpperCase());
				isMatched = true;
			  break;
			}
		}
		  if(isMatched) {
			$('#hireladdToCart').removeAttr('disabled');
			$('#error-pcr-code-not-matching').css('display', 'none');
		  }else{
			  $('#hireladdToCart').attr('disabled','disabled');
			  $('#pcrValueSelected').val("");
			  $('#error-pcr-code-not-matching').css('display', 'block');
		  }
		}else if (pcrEntered == ""|| listOfPCR == "" || isMatched == false){
			$('#hireladdToCart').attr('disabled','disabled');
			$('#pcrValueSelected').val("");
			 $('#error-pcr-code-not-matching').css('display', 'block');
		}
});

$(document).on('change','#hirelRequestedQty',function(e){
	var hirelRequestedQty = $('#hirelRequestedQty').val();
	var hirelAvailableQty = $('#hirelAvailableQty').val();
	
	var selectDatecode = $('#selectDatecode').val();
	var hirelProdCode =  $('#hirelProdCode').attr("data-key1");
	
	var previousDateCode = "";
	if($('#selectDatecode :selected').val() != ""){
		previousDateCode = $('#selectDatecode :selected').val();
	}
	if(parseInt(hirelRequestedQty) !=0 && hirelRequestedQty != ''){
		var qtyUpdated = 'true';
	  showHirelOptions(hirelProdCode,hirelRequestedQty,qtyUpdated,previousDateCode);
	}
	
});


$(document).on('keyup keydown','#hirelRequestedQty',function(e){
	var hirelRequestedQty = $('#hirelRequestedQty').val();
	var hirelAvailableQty = $('#hirelAvailableQty').val();
	if(parseInt(hirelRequestedQty) > parseInt(hirelAvailableQty) ){
		$("#error-hirelqty-exceeds-available-inv").css('display', 'block');
	  $('#hireladdToCart').attr('disabled','disabled');
	}
    else if(parseInt(hirelRequestedQty) ==0 || hirelRequestedQty == '' || hirelRequestedQty == null || hirelRequestedQty.trim() === ''){
		$('#hireladdToCart').attr('disabled','disabled');
	  $("#error-hirelqty-zero-qty").css('display', 'block');
	}else{
		$("#error-hirelqty-exceeds-available-inv").css('display', 'none');
	  $("#error-hirelqty-exceeds-datecode-inv").css('display', 'none');
	  $("#error-hirelqty-zero-qty").css('display', 'none');
	  $('#hireladdToCart').removeAttr('disabled');
	} 
});



function setHirelErrorMessage(pDateCode,dCodeArr,pcrValue) {
    var hirelRequestedQty = $('#hirelRequestedQty').val();
	var hirelAvailableQty = $('#hirelAvailableQty').val();
	$('#error-hirelqty-exceeds-datecode-inv').css('display', 'none');
	$('#error-hirelqty-exceeds-pcrcode-inv').css('display', 'none');
    var selectDatecode = $('#selectDatecode');
	var setDateCodeErrorMsg = "false";
		if($.inArray(pDateCode, dCodeArr) > -1){
			$('#error-hirelqty-exceeds-datecode-inv').css('display', 'none');
		}else{
			if(pcrValue != ""){
				$('#error-hirelqty-exceeds-pcrcode-inv').css('display', 'block');
			}else{
			 $('#error-hirelqty-exceeds-datecode-inv').css('display', 'block');
			}
		}
		if(parseInt(hirelRequestedQty) > parseInt(hirelAvailableQty) ){
		  $("#error-hirelqty-exceeds-available-inv").css('display', 'block');
		  $('#hireladdToCart').attr('disabled','disabled');
		}
}

$(document).on('click','#pcrToggle',function() { 
    $('#pcrCode').removeClass('hide');
    $('#lotCode').addClass('hide');
	$('#pcrToggle').addClass('hide');
	$('#lotToggle').removeClass('hide');
	$('#selectYear').val("");
	$('#selectWeek').val("");
	$('#selectBatchNumber').val("");
	$('#hireladdToCart').attr('disabled','disabled');
	
	
});

$(document).on('click','#lotToggle',function() {
	$('#pcrCode').addClass('hide');
    $('#lotCode').removeClass('hide');
	$('#pcrToggle').removeClass('hide');
	$('#lotToggle').addClass('hide');
	$('#pcrValue').val("");
	$('#hireladdToCart').attr('disabled','disabled');
});

$(document).on('click','#reveal-guest-form-disable',function() { 
	$('#guest-error-form').removeClass('is-hidden');
//	$('#reveal-guest-form-disable').addClass('is-hidden');
	$('#reveal-guest-form-disable').attr('disabled','disabled');
	$('#country-selector').attr('disabled','disabled');
	$('#currency-selector').attr('disabled','disabled');
});	
	

$(document).on("click", '#returnToCart', function (event) {
       window.location = ACC.config.encodedContextPath + '/cart'; 
});


//Lazy loading the volume price when popover-w-table is clicked.
function formatDisplayedVolPrice(){
	var currentCurrency = $("ti-header-currency-selection").val()
	var currentLang = $("ti-header-language-selection").val()

	$(".js-vol-price").each(function(){
		var isFormatted = $(this).data("isformatted");
		if(isFormatted !== undefined && isFormatted === false) {
			var volPrice = $(this).text();
			var fmtVolPrice= com.TI.CurrencyFormat.format(volPrice, true, currentCurrency, currentLang);
			if(fmtVolPrice.includes("NaN")){
				fmtVolPrice = volPrice;
			}
			$(this).text(fmtVolPrice);
			$(this).data("isformatted", true)
		}
	});
}

//Formatting price for Custom reel carrier option
function formatDisplayedCustomReelPrice(){
	var currentCurrency = $("ti-header-currency-selection").val()
	var currentLang = $("ti-header-language-selection").val()

	$(".js-calculated-price").each(function(){
		var isFormatted = $(this).data("isformatted");
		if(isFormatted !== undefined && isFormatted === false) {
			var calcPrice = $(this).text();
			var fmtCalcPrice= com.TI.CurrencyFormat.format(calcPrice, false, currentCurrency, currentLang);
			if(fmtCalcPrice.includes("NaN")){
				fmtCalcPrice = calcPrice;
			}
			$(this).text(fmtCalcPrice);
			$(this).data("isformatted", true)
		}
	});
}




////To display carrier options when clicked on add to cart button in case of alternate carriers
function showAltCarrierOptions(addToCartCarrierBtn) {
	 var prodCode = addToCartCarrierBtn.getAttribute("data-key1");
	    var altProdCode =prodCode;
	    var index = altProdCode.indexOf("/");
	    if(index > 0){
	    	var altProdCode = altProdCode.replace('/', '-');
	    }
	    else{
	    	 prodCode = altProdCode;
	    }
	    var enteredQty = $(document.getElementById('addToCartAltPdpQty_'+altProdCode)).val();
	    var limitCarrier = addToCartCarrierBtn.getAttribute("data-key2");
	    var availInvCarrier = addToCartCarrierBtn.getAttribute("data-key3");
        var referrerValue = addToCartCarrierBtn.getAttribute("data-key4");
	    console.log("prodCode "+altProdCode+" ent qty "+enteredQty+" limitCarrier "+limitCarrier+" availInvCarrier"+availInvCarrier +" referrerValue"+referrerValue);
	 
	    if(parseInt(enteredQty) > parseInt(availInvCarrier) ){
	        $("#error-text-exceeds-inv_"+altProdCode).css('display', 'block');
	        $('addToCartAltCarrierBtn__'+altProdCode).attr('disabled','disabled');
	        $("#pdp-limit-error_"+altProdCode).css('display', 'none');
	        $("#error-text-zero_"+altProdCode).css('display', 'none');
	    } 
	    else if(parseInt(enteredQty) > parseInt(limitCarrier)){
	        $("#pdp-limit-error_"+altProdCode).css('display', 'block');
	        $("#error-text-limit_"+altProdCode).text(" "+limitFormattedValue+" ");
	        $("#pdp-limit-error_"+altProdCode).append($("#error-text-limit-msg").css('display', 'inline'));
	        $('addToCartAltCarrierBtn__'+altProdCode).attr('disabled','disabled');
	        $("#error-text-exceeds-inv_"+altProdCode).css('display', 'none');
	        $("#error-text-zero-qty_"+altProdCode).css('display', 'none');
	    }
	    else if(parseInt(enteredQty) == 0 || enteredQty==""){ 
	        $("#error-text-zero-qty_"+altProdCode).css('display', 'block');
	        $('addToCartAltCarrierBtn__'+altProdCode).attr('disabled','disabled');
	        $("#error-text-exceeds-inv_"+altProdCode).css('display', 'none');
	        $("#pdp-limit-error_"+altProdCode).css('display', 'none');
	    }else{
	        $("#pdp-limit-error_"+altProdCode).css('display', 'none'); 
	        $("#error-text-exceeds-inv_"+altProdCode).css('display', 'none');
	        $("#error-text-zero-qty_"+altProdCode).css('display', 'none');
	        $('addToCartAltCarrierBtn__'+altProdCode).removeAttr('disabled');

        $.ajax({
            url: ACC.config.encodedContextPath + "/getCarrierOptions",
            data:{qty: enteredQty , prodCode: prodCode,referrerValue:referrerValue}, 
            type: 'GET',
            // datatype:"json",
            success: function(res) {            
                $('#carrier-div-id').html(res);
                var a = $('#select-carrier').val();
                var fullReelCarrierQty = $('#fullReelCarrierQty').text();
                var cutTapeFlag = $('#cutTapeFlag').val();
                var customReelFlag = $('#customReelFlag').val();
                var isForeCastDown = $('#isForeCastDown').val();
                var showCarrierPopup = $('#showCarrier').val();
                var fullReelCount = $('#fullReelCount').val();
                var cutTapeQty = $('#cutTapeQuantity').val();
                var customReelQty = $('#customReelQuantity').val();
                var requestedQty =$('#qty').val();
                
                console.log("cutTapeFlag "+ cutTapeFlag + "customReelFlag "+customReelFlag + "cutTapeQty "+cutTapeQty + "customReelQty "+customReelQty + "showCarrierPopup "+showCarrierPopup);
                if(showCarrierPopup =="true")
                {
                    $("#target-modal-checkout-carrier").modal('show');
                }
                else{
                    if(isForeCastDown=="true"){
                        $('#carrierValue').val('cutTape');
                        $('#cutTapeQty').val(requestedQty);
                    }else
                    {
                        $('#carrierValue').val($('#select-carrier').val());
                        $('#cutTapeQty').val();
                        $('#customReelQty').val();
                        $('#fullReelCount').val();
                    }

 

                    var myFormData = $(document.getElementById('addToCartForm2_'+altProdCode)).serialize().replace(/%23/g, 'IGNORE');
                    $.ajax({
                        url: ACC.config.encodedContextPath + "/cart/add",
                        type: 'POST',
                        data: myFormData,
                        success:function(res){

 

                            $("#target-modal-checkout").modal('show');
                            $('#add-to-cart-modal-body').html(res.addToCartLayer);
                             $('#addToCartLayer').remove();
                                if (typeof ACC.minicart.updateMiniCartDisplay == 'function') {
                                    ACC.minicart.updateMiniCartDisplay();
                                }
                                var cartAnalyticsData = res.cartAnalyticsData;
                                var cartData = {
                                    "cartCode": cartAnalyticsData.cartCode,
                                    "productCode": prodCode, "quantity": enteredQty,
                                    "productPrice": cartAnalyticsData.productPostPrice,
                                    "productName": cartAnalyticsData.productName
                                };
                                window.dispatchEvent(new CustomEvent('tiAddToCartChange', {}));
                                ACC.track.trackAddToCart(prodCode, enteredQty, cartData);
                        },
                        error: function(xhr, errorType, exception){
                            $("modal-body").html("");
                            $("#MainModal").modal('show');
                        }
                    });
                }

 

            }
        });
    }
};

document.addEventListener('tiLanguageReady', function() {
	var currentLang = $("ti-header-language-selection").val()
	if(currentLang !== undefined && currentLang === 'ko-KR'){
		updateRegulationsWaiverContent();
	}
});


document.addEventListener('tiLanguageChange', function() {
	var currentLang = $("ti-header-language-selection").val()
	checkIfCurrentLanguageIsChangedToKorean(currentLang)
	}
);

function checkIfCurrentLanguageIsChangedToKorean(currentLang){
	if($("ti-header-language-selection").val() === currentLang){
		setTimeout(function() {
			checkIfCurrentLanguageIsChangedToKorean(currentLang)
		}, 500);
	}
	else{
		if($("ti-header-language-selection").val() === 'ko-KR'){
			updateRegulationsWaiverContent();
		}
	}
	
}

function updateRegulationsWaiverContent(){
	var waiverArr = [];
	let page;
	$(".regulations-waiver-content").each(function() {
		var waiverId = $(this).data("waiverid");
		var materialId = $(this).data("materialid");
		var waiverVersion = $(this).data("waiverversion");
		page = $(this).data("page");
		waiverArr.push({waiverId: waiverId, materialId: materialId, waiverVersion: waiverVersion})
	});
	
	var data = JSON.stringify(waiverArr);
	
	if(data !== undefined && (page === 'shipping-details' || page === 'regulation-details' )){
		$.ajax({
	        url: "get-waiver-data",
	        type: 'POST',
	        contentType : "application/json",
	        data: data,
	        
	        success:function(res){
	        	$.each(res, function (i, obj) {
	        		var waiverIdModified = obj.waiverId != undefined ? obj.waiverId.replace('#','') : '';
	        		if(obj.waiverKrContent  && obj.waiverKrContent != '')
	        		 $('#regulations-waiver-'+waiverIdModified).html(obj.waiverKrContent) 
	        	});	       	 
	        },
	        error: function(xhr, errorType, exception){
	            console.log("Error while retriving the waiver content", exception)
	        }
	    });	
	}
}

 

function onAltPdpQtyChange(pdpAltQtyObj){
    var enteredQty = $(pdpAltQtyObj).val();    
    var hubQty = pdpAltQtyObj.getAttribute("data-key1");
    var availQty = pdpAltQtyObj.getAttribute("data-key2");
    var prodCode = pdpAltQtyObj.getAttribute("data-key3");
    var pdpLimit =  addCommasToNum(hubQty);
    console.log("alt pdp qty "+enteredQty+" avail qty"+availQty+" hubQty"+hubQty);    
    
  if(parseInt(enteredQty) > parseInt(availQty) ){
      $("#error-text-exceeds-inv_"+prodCode).css('display', 'block');
      $('#addToCartButton').attr('disabled','disabled');
      $('#addToCartAltCarrierBtn__'+prodCode).attr('disabled','disabled');
      $("#pdp-limit-error_"+prodCode).css('display', 'none');
      $("#error-text-zero-qty_"+prodCode).css('display', 'none');
  }
  else if(parseInt(enteredQty) > parseInt(hubQty)){
      $("#pdp-limit-error_"+prodCode).css('display', 'block');
      $("#error-text-limit_"+prodCode).text(" "+pdpLimit+" ");
      $("#pdp-limit-error_"+prodCode).append($("#error-text-limit-msg_"+prodCode).css('display', 'inline'));
      $('#addToCartButton').attr('disabled','disabled');
      $('#addToCartAltCarrierBtn__'+prodCode).attr('disabled','disabled');
      $("#error-text-exceeds-inv_"+prodCode).css('display', 'none');
      $("#error-text-zero-qty_"+prodCode).css('display', 'none');
  }
  else if(parseInt(enteredQty) ==0 || enteredQty==""){
      $("#error-text-zero-qty_"+prodCode).css('display', 'block');
      $('#addToCartButton').attr('disabled','disabled');
      $('#addToCartAltCarrierBtn__'+prodCode).attr('disabled','disabled');
      $("#error-text-exceeds-inv_"+prodCode).css('display', 'none');
      $("#pdp-limit-error_"+prodCode).css('display', 'none');
  }
  else{
      $("#pdp-limit-error_"+prodCode).css('display', 'none'); 
      $("#error-text-exceeds-inv_"+prodCode).css('display', 'none');
      $("#error-text-zero-qty_"+prodCode).css('display', 'none');
      $('#addToCartButton').removeAttr('disabled');
      $('#addToCartAltCarrierBtn__'+prodCode).removeAttr('disabled');
      
      var volumePrices = $('#volPrice_' + prodCode).val();
      var currentCurrency = $("ti-header-currency-selection").val();
	  var currentLang = $("ti-header-language-selection").val();
      if(volumePrices != null && volumePrices != undefined)
	  {
	      var jsonPrices = JSON.parse(volumePrices);
		  for (i = 0; i < jsonPrices.length; i++) {
	  		if(jsonPrices[i].maxQuantity != undefined && jsonPrices[i].maxQuantity != null && enteredQty <= jsonPrices[i].maxQuantity && enteredQty >= jsonPrices[i].minQuantity)
		  	{
		  	 $("#price_"+prodCode).val(jsonPrices[i].value);
		  	 var unit_price = com.TI.CurrencyFormat.format(jsonPrices[i].value, true, currentCurrency, currentLang);
			_metrics_store_data.part_unit_price = unit_price.substring(1);
		  	}
		  	if(jsonPrices[i].maxQuantity == null && enteredQty >= jsonPrices[i].minQuantity)
		  	{
		  	 $("#price_"+prodCode).val(jsonPrices[i].value);
		  	 var unit_price = com.TI.CurrencyFormat.format(jsonPrices[i].value, true, currentCurrency, currentLang);
			_metrics_store_data.part_unit_price = unit_price.substring(1);
		  	}
		}
	}
  }
};


$(document).on('click','#checkoutcontinue',function() {
	console.log('coming to continueshop');
	var contShoppingUrl = $('#contShopping').val(); 
	if(contShoppingUrl != null){
		console.log('continue shop url is '+contShoppingUrl);
		$.ajax({
			url: ACC.config.encodedContextPath + "/cart/getContinueShop?contShopUrl="+contShoppingUrl,
			cache: false,
			type: 'GET',
			success: function(response){
				console.log(response);
			}
		});
	}
});
 
