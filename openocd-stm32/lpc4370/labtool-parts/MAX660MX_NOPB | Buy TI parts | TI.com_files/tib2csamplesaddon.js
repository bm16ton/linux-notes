/*
 * [y] hybris Platform
 *
 * Copyright (c) 2017 SAP SE or an SAP affiliate company.  All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 
/*  Submit form using Ajax */

window.onload = function() {
	if ($('.js-enable-on-load').length > 0) {
	$('.js-enable-on-load').each(function() {
			$(this).removeClass('js-enable-on-load');
	});
}
}

$(document).ready(
	function() {
        if ($('.js-enable-on-load').length > 0) {
        $('.js-enable-on-load').each(function() {
                $(this).removeClass('js-enable-on-load');
        });
    }
});

$(document).on('click','#addAddress_btn',function() {

	$('#addAddressForm').find('p.error-text').css({
        	'display':'none',
        });
	$('#addAddressForm').find('p.nonenglish-error-text').css({
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
                       $(this).parent('.form-group').find('p.nonenglish-error-text').css({
                       	'display':'inline',
                       });
                   }
                   else if(!validatePhone()){
                   	isValid = false;                      
                   }
                   else if(!fieldPattern.test($.trim($(this).val())) && ($.trim($(this).attr("id")) != "ab_email") && ($.trim($(this).attr("id")) != "ab_middleName2") 
                		   && ($.trim($(this).attr("id")) != "ab_phone")) {
                       isValid = false;
                       $(this).parent('.form-group').find('p.nonenglish-error-text').css({
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
             $('#line2').parent('.form-group').find('.nonenglish-error-text').css({
             	'display':'inline',
             });
         }
         if(($.trim($('#ab_taxId').val()) != '') && (!fieldPattern.test($.trim($('#ab_taxId').val())))){
         	  isValid = false;
               $('#line2').parent('.form-group').find('.nonenglish-error-text').css({
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
$(document).on('click','#ok-address-btn',function() {
	 window.location = window.location.href;
});
$('a#update-address').click(
    function(e) {
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

$(document).on('click','#updateAddress-btn', function(e) {
        $('#editAddressForm').find('p.error-text').css({
        	'display':'none',
        });
        $(this).parent('.form-group').find('.nonenglish-error-text').css({
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
                        });
                        return false;
                    }
                }
            })
        }
        }, 2000);
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
	    	$('#notify-email-error').css('display', 'block');
	    }
	    else{
	    	$('#notify-email-error').css('display', 'none');
}
});

$('#LimitTxtbx').on("paste", function(){
	var quantity = $('#LimitTxtbx').val();
	if (quantity && typeof parseInt(quantity) == "number"){
		$("#Txtbx_Errmsg_IC").css('display', 'none');	
	}
	else{
		$("#Txtbx_Errmsg_IC").css('display', 'block');
	}
})

$('#tiNotifyMe').click(function(e) {
    e.preventDefault();
    $('#notify-email-error').css({
    	'display':'none',
    });
    var prodCode = $('#notify-product').val();
    var pdbPartType = $('#notify-pdbPartType').val();
    var limit = $('#tiB2CPaid-notify-test').val();
    var limitFormattedValue =  addCommasToNum(limit);
    var emailPattern = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,20}$/;
    var notifyEmail = $('#notifyEmail').val();
    var quantity = $('#LimitTxtbx').val(); 
    
    if((parseInt(quantity) > parseInt(limit)) && (pdbPartType == 6 || pdbPartType == 06)){
		$(".pre1").remove();
			$("#Txtbx_Errmsg_IC").hide();
			$("#Txtbx_Errmsg_Limit1").css('display', 'block');
			$("#Txtbx_Errmsg-DYN").text(" "+limitFormattedValue+" ");
			$("#Txtbx_Errmsg_Limit1").append($("#Txtbx_Errmsg_Limit2").css('display', 'inline'));
	}
	else if(quantity==0 || !typeof parseInt(quantity) == "number" ){

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
    	$('#notify-email-error').css('display', 'block');
    }
    
    else{
	    $.ajax({
	        url: ACC.config.encodedContextPath + "/tinotify/notifyEmail?",
	        data:{productId: prodCode , customerEmail: notifyEmail, qty:quantity},        
	        type: 'POST',
	        success:function(res){
	        	$("#target-modal-email").modal('hide');
	    		  $("#tiB2CPaid-notify_enabled-modal-email").modal('show');
	        },
	        error: function(xhr, errorType, exception){
	        	$("#tiB2CPaid-target-modal-email").html("");
	        	$("modal-body").html("");
	        	$("#target-modal-email").modal('show');
	     }
	    });
    }
});

$('.notify').click(function(e) {
	var dataValueObj = $(this). data('value');
	var pdbPartType = dataValueObj.key2;
	var limit = dataValueObj.key1;
	  $("#target-modal-email").modal("show");
	  if(pdbPartType==6 || pdbPartType==06 ){
		  $(".check_6").show();
	  }else{
		  $(".check_6").hide();
	  }
	 e.preventDefault();
	var prodCode = $(this).attr('data-id');
	var defaultEmail = $('#defaultEmail').val();
	var qtyValid= false;
	var emailValid=false;
    $(".modal-body #notify-product").val(prodCode);
    $(".modal-body #notify-pdbPartType").val(pdbPartType);
    
    $(".modal-body #notifyEmail").val(defaultEmail);
    
        	var qtyValid= false;
        	var emailValid=false;
                $(".modal-body #tiB2CPaid-notify-test").val(limit);
                var limitFormattedValue =  addCommasToNum(limit);
                                $("#limitid").text(limitFormattedValue);
                                $("#LimitTxtbx").val('');
                                $("#Txtbx_Errmsg_Limit1").hide();
								$("#Txtbx_Errmsg_IC").hide();
								$("#notify-email-error").hide();
                                $("#LimitTxtbx").focusout(function(){
                            		var txtval= $("#LimitTxtbx").val();
                            		if(parseInt(txtval) > parseInt(limit) && (pdbPartType == 6 || pdbPartType == 06)){
                            			 
                            				$(".pre1").remove();
											$("#Txtbx_Errmsg_IC").hide();
	                            			$("#Txtbx_Errmsg_Limit1").css('display', 'block');
	                            			$("#Txtbx_Errmsg-DYN").text(" "+limitFormattedValue+" ");
	                            			$("#Txtbx_Errmsg_Limit1").append($("#Txtbx_Errmsg_Limit2").css('display', 'inline'));
                            			
                            		} else if(txtval == 0 || !typeof parseInt(txtval) == "number" ){
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
		    	 $('#notify-email-error').css({
		    	    	'display':'none',
		    	    });//css
		    	 emailValid=true;
		    	 
		    }
        
    });

$('body').on('keyup',"#target-modal-email",function (e) {
    if (e.which == 13) {
    	var triggeredId ="#"+e.target.id;
    	if(e.target.id == "LimitTxtbx" || e.target.id == "notifyEmail" || e.target.id == "target-modal-email" ){
    		$("#tiNotifyMe").trigger('click');
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

////////////////



function getURLParameter(url, name) {
    return (RegExp(name + '=' + '(.+?)(&|$)').exec(url)||[,null])[1];
}

$(document).ready(function() {
	$("#ti-order-invoice").DataTable({
		"searching":false,
		"paginate":true,
		"dom": '<"toolbar">frtip', 
		"drawCallback": function ( settings ) {
	        if (Math.ceil((this.fnSettings().fnRecordsDisplay()) / this.fnSettings()._iDisplayLength) > 1) {
	            $('#ti-order-history_paginate').css("display", "block");     
	        } else {                
	            $('#ti-order-history_paginate').css("display", "none");
	        }

	        },
	    language: {
	     search: '<a class="searchBtn" id="searchBtn"><i class="fa fa-search"></i></a>',
	     //search:'',
		searchPlaceholder:"Search...",
		"info": "", 
	        paginate: {
	          next: '<i style="color:black;margin-right:14pt;"  class="fa">&#xf054;</i>', // or '?'
	          previous: '<i style="color:black;margin-left:14pt;" class="fa">&#xf053;</i>' // or '?' 
	      }
	    },
	    initComplete : function() {
	        $("#ti-order-history_filter").detach().appendTo('#new-search-area');
	        //$("div.toolbar").html('<a class="btn searchBtn" id="searchBtn"><i class="fa fa-search"></i></a>');
	    }
	});

});
		
	
$(document).ready(function() {
	$("#ti-order-history").DataTable({
		"searching":true,
		"paginate":true,
		"dom": '<"toolbar">frtip', 
		columnDefs: [{ 'targets': 0, type: 'date' }],
		"drawCallback": function ( settings ) {
	        if (Math.ceil((this.fnSettings().fnRecordsDisplay()) / this.fnSettings()._iDisplayLength) > 1) {
	            $('#ti-order-history_paginate').css("display", "block");     
	        } else {                
	            $('#ti-order-history_paginate').css("display", "none");
	        }

	        },
	    language: {
	     search: '<a class="searchBtn" id="searchBtn"><i class="fa fa-search"></i></a>',
	     //search:'',
		searchPlaceholder:$('#tib2cSampleSearchPlaceholder').val(),  
		emptyTable:'<div id="orderhistoryempty"><a id="orderhistoryNodata"><i class="fa fa-search"></i></a>&nbsp;'+$('#tib2cSampleOrderHistoryMessage').val()+'</div>',
		"info": "", 
	        paginate: {
	          next: '<i style="color:black;margin-right:14pt;"  class="fa">&#xf054;</i>', // or '?'
	          previous: '<i style="color:black;margin-left:14pt;" class="fa">&#xf053;</i>' // or '?' 
	      }
	    },
	    initComplete : function() {
	        $("#ti-order-history_filter").detach().appendTo('#new-search-area');
	        //$("div.toolbar").html('<a class="btn searchBtn" id="searchBtn"><i class="fa fa-search"></i></a>');
	    }
	});

});


$(document).on('click','#tiOrderDetails',function(e) {
    var orderCode = $(this).attr('data-id');
    if (orderCode != undefined && orderCode != null) {
    	window.location = 'view-orderdetails/' + orderCode; 
    }
});

$('#orderHistoryCombo').on('change', function() {
    var days = $("#orderHistoryCombo").val();
    if (days != undefined && days != null) {
    	window.location = 'order-history?days=' + days; 
    }
});

$('.address-remove-link-samples').click(function() {
	var addressId = $(this).attr('data-address-id');
    $("#removed-address-modal #curr-address-id").val(addressId);
});

//Address Remove address confirmation
$(document).on('click','#remove-address',function(e) {
	e.preventDefault();
	var addressId = $("#curr-address-id").val();
     location.href= 'remove-address/' + addressId; 
});

$(document).on('click','#add-address',function(e) {
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

$(document).on('click','#tiInvoice',function(e) {
    var orderCode = $(this).attr('data-id');
    if (orderCode != undefined && orderCode != null) {
    	window.location = '../invoice/' + orderCode; 

    }
});

//Wavier details popup
$(document).on('click','#downloadWaiverPDF',function(e) {
	e.preventDefault();
	var divToPrint=$('#waiverDetails').html();
	var myWindow = window.open("", "_blank", "top=400,left=700,width=400,height=200,resizable=yes");
	myWindow.document.write(divToPrint);
	
});


// GLOBAL CLOSE MENUS - RESPONSIVE - MOBILE
var globalClose = function () {
  $('.js-menu-open').removeClass('js-menu-open');
};

var stopGlobalClose = function (event) {
  event.stopPropagation();
};

// Catch All Close
// ---------------
$('body').on('click', globalClose);

// Catch All Exceptions
// --------------------
$('.js-m-search').on('click', stopGlobalClose);
$('.left-menu li a').on('click', stopGlobalClose);

// During mobile search open and the resize to desktop - m-search still open
// solution add close button to m-search

// Toggle Mobile Nav
var mobileNav = $('.left-menu');
$('.js-toggle-m-menu').on('click', function (event) {
  event.stopPropagation();

  if (mobileNav.hasClass('js-menu-open')) {
    globalClose();
  } else {
    globalClose();
    mobileNav.addClass('js-menu-open');
  }
});

// Toggle Mega Menu
$('.js-toggle-mega-menu').on('click', function (event) {
  event.stopPropagation();
  var megaMenu = $(this).siblings('.mega-menu-list');
  if (megaMenu.hasClass('js-menu-open')) {
    globalClose();
  } else {
    globalClose();
    megaMenu.addClass('js-menu-open');
  }
});

var searchBar = $('.js-m-search');
// Toggle Mobile Search
$('.js-m-search-toggle').on('click', function (event) {
  event.stopPropagation();
  if (searchBar.hasClass('js-menu-open')) {
    globalClose();
  } else {
    globalClose();
    searchBar.addClass('js-menu-open');
  }
});


// Order History Page Inner Toggle Sort for the Datatable
$('.js-toggle-sort-datatable').click(function () {
    var curSrc = $(this).children().attr('src');
    var imagePath = $(this).children().attr('imageUrl');
    if (curSrc === imagePath + '/arrow-up.svg') {
      $(this).children().attr('src', imagePath + '/arrow-down.svg');
    } else {
      $(this).children().attr('src', imagePath + '/arrow-up.svg');
    }
  });

//Address auto suggestions in shipping page
$(document).on('keyup','#line1',function() {
	var textToSearch =$("#line1").val();
	$('#line1copy').val(textToSearch);
    var countryIsoCode=$('#samples-select-country-list-id').children(":selected").val();
    $.ajax({
        url: 'getCountryConfigData',
        type: 'GET',
        data:{"countryIso": countryIsoCode},
        success: function(res) {
        	var obj = JSON.parse(res);
        	var addresscheck=obj[0].automatedAddressCheck;
        	if(addresscheck=="true"){    
        		    
        			// Hack to stop autofill from appearing on top of Google maps autocomplete
        			// This is a known bug with Google Maps replacing the "autcomplete"
        			// property with the unsupported "off" value.
        	    	var autocompleteInput = document.getElementById("line1");

        	    	var observerHack = new MutationObserver(function() {
        	        	observerHack.disconnect();
        	        	$("#line1").attr("autocomplete", "new-password");
        	    	});

        	    	observerHack.observe(autocompleteInput, {
        	        	attributes: true,
        	        	attributeFilter: ['autocomplete']
        	    	});
        	    	// - end hack
        	    	
        			initService(textToSearch,countryIsoCode);
        	}
            }       
    });
   
});

function initService(text, country) {
	var options = {
		types : [ 'address' ],
		componentRestrictions : {
			country : country
		}
	};
	var input = document.getElementById('line1');
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
	var autocomplete = new google.maps.places.Autocomplete(input, options);
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
									$('#line1').val(values);
									streetnum = true;
								} else if (addressType == "route" || addressType=="sublocality_level_2") {
									if (streetnum) {
										var address = $('#line1').val() + " "
												+ values;
										$('#line1').val(address);
									} else
										$('#line1').val(values);
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
										$('#samples-select-state-list-id option:selected')
												.removeAttr('selected');
										$('#samples-select-state-list-id option[value='
														+ values + ']').prop(
												'selected', 'selected');
										$('#samples-select-state-list-id option[value='
														+ values + ']').attr(
												'selected', 'selected');
										if(values !=''){
											$('#samples-select-state-list-id').parent('.form-group').find('.error-text').css({
									        	'display':'none',
									        });
											$('#samples-select-state-list-id').parent('.form-group').find('.nonenglish-error-text').css({
									        	'display':'none',
									        });
										}
									} else {
										var state = place.address_components[i]["long_name"];
										$('#state-input').val(state);
										if(values !=''){
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
						
						var inputchange = $('#line1').val();
						$('#line1copy').val(inputchange);

					});
}

$(document).on('focus','#line2',function() {	
	var inputchange = $('#line1copy').val();
	$('#line1').val(inputchange);
});

$(document).on('focus','#lastName',function() {	
	var inputchange = $('#line1copy').val();
	$('#line1').val(inputchange);
});


//Functionality for showing address nickname field
$(document).on('change','.js-toggle-nickname-field',function() {
  $("#js-nickname-field-samples").toggleClass("js-hide-sample");
  $("#middleName2").toggleClass('input-required');
  
  if($('.js-toggle-nickname-field').is(':checked') ==false){
		$("#shipping-address-select").attr('disabled', false);
		}
  else if($('.js-toggle-nickname-field').is(':checked') ==true && $('#middleName2').val()==''){
		$("#shipping-address-select").attr('disabled', true);
		}
});

/*//Waiver email
$(document).on('click','#samplesEmailWaiver',function(e) {
    var orderCode = $(this).attr('data-id');
    if (orderCode != undefined && orderCode != null) {
    	window.location = '../samplesEmailWaiver/?orderCode=' + orderCode; 
    }

});*/


//email waiver model
$('.ti-js_emailWaiver').click(function(e) {
	/*var orderCode = $(this).attr('data-id');*/
	var defaultEmail = $('#defaultEmail').val();
	/* $(".modal-body #tiB2C-waiver-order").val(orderCode);*/
	 $(".modal-body #notifyWaiverEmail").val(defaultEmail);
  if(defaultEmail != undefined && defaultEmail != null){
   $('#tiB2C-waiver-email-error').css({
        'display':'none',
       });
  }
});

//Waiver emailjs_emailWaiver_btn
$('.ti-js_emailWaiver_btn')
		.click(
				function(e) {
					e.preventDefault();
					$('#tiB2C-waiver-email-error').css({
						'display' : 'none',
					});
					var orderCode = $(this).attr('data-id');
					var emailPattern = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,20}$/;
					var defaultEmail = $('#notifyWaiverEmail').val();
					var currentLang = $("ti-header-language-selection").val();
					if (defaultEmail == "" || !emailPattern.test(defaultEmail)
							|| orderCode == "") {
						$('#tiB2C-waiver-email-error').css('display', 'block');
					} else {
						$
								.ajax({
									url : ACC.config.encodedContextPath
											+ '/account/email-waiver?orderCode='
											+ orderCode,
									data : {

										emailID : defaultEmail, currentLang: currentLang
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
														"Something went wrong, Please try after login..");

									}
								});
					}
				});

//Display the delivery addresses for selected country
$(document).on('change','#samples-select-country-list-id',function(){
	var addressType = $("input[name=addressType]:checked").val();
	var countryIsoCode = $('#samples-select-country-list-id').children(":selected").attr('value'); 
	$.ajax({
        url: "getSelectedAddress?" + "selectedAddressCode=undefined&shippingAddressType="+addressType+"&countryIsoCode="+countryIsoCode,
        cache: false,
        type: 'GET',
        success: function(response){
            $("#shipping-address-form").html(response);
            shippingAddressFormvalidation();
            //validateForm();
            if($('#samples-select-country-list-id').children(":selected").attr('value')=='HK'){
   			 	var countryName=$('#samples-select-country-list-id').children(":selected").text();
   			 	$("#townCity").val(countryName);
   			 	$("#townCity").prop("readonly",true);
            }else{
   			 	$("#townCity").attr('disabled', false);
            }
        }
    });

});

//Display the selected Shipping Addresses
$(document).on('change','#samples-address-list-id',function(){
	var addressId = $(this).children(":selected").val();
	if(addressId == "新地址"){
		addressId = "New address";
	}
	var addressType = $("input[name=addressType]:checked").val();
	var countryIsoCode = $('#samples-select-country-list-id').children(":selected").attr('value'); 
	$.ajax({
        url: "getSelectedAddress?" + "selectedAddressCode=" + addressId +"&shippingAddressType="+addressType+"&countryIsoCode="+countryIsoCode,
        cache: false,
        type: 'GET',
        success: function(response){
            $("#shipping-address-form").html(response);
            validateForm();
            
            if($('#samples-select-country-list-id').children(":selected").attr('value')=='HK'){
   			 	var countryName=$('#samples-select-country-list-id').children(":selected").text();
   			 	$("#townCity").val(countryName);
   			 	$("#townCity").prop("readonly",true);
            }else{
   			 	$("#townCity").attr('disabled', false);
            }
        }
    });
});

// Add the selected address as Delivery address
$(document).on('click',"#shipping-address-select",function() {
	 $('#shipping-address-form').find('p.error-text').css({
	   	'display':'none',
	   });
	 $('#shipping-address-form').find('p.nonenglish-error-text').css({
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
		isValid=shippingAddressFormvalidation();
		if(isValid){
		// Optional State field Validation 
			var selectedCountry = $('#samples-select-country-list-id').children(":selected").attr('value');
	      	var selectedState = $('#samples-select-state-list-id').children(":selected").attr('value');
	      	if((selectedCountry == 'CN' || selectedCountry == 'JP') && (selectedState == '0' || selectedState == 'undefined'))
	      	{
	      	 $('#samples-select-state-list-id').val('');
	      	}
		    var formData = $('#shipping-address-form').serialize().replace(/%23/g, 'IGNORE');
			var url= $('#shipping-address-form').attr('action');
			$.post(url, formData,function(res){
				if (res.validated) {
					$('#address-next-form').submit();
		           } else {
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
		}
});

//B2C Samples - Regulation next button issue
$(window).click(function() {
	var applicationId = $('#regulations-select').children(":selected").attr('id');
    var applnName = $('#regulations-select').children(":selected").text();
    var endEquipmentId = $('#checkout-regulations-select').children(":selected").attr('id');
    var EEName = $('#checkout-regulations-select').children(":selected").text();
    var isAccepted =$('#terms_accept').is(":checked");
    var militaryChoose = $("input[name='militaryFlag']:checked").val();
    var eligibleForGovtMilitary = $('#eligibleForGovtMilitary').val();
    var govtMilitaryChoose = $("input[name='govtMilitary']:checked").val();
    $('#selectedAppCategory').val(applicationId);
    $('#selectedEndEquipmentsId').val(endEquipmentId);
    $('#selectedAppCategoryName').val(applnName);
    $('#selectedEndEquipmentsName').val(EEName);
    if(($('.waiver-content').length ==0 || $('#waiver_accept').is(":checked")) && isAccepted && (militaryChoose) && (endEquipmentId !=null && endEquipmentId !='') && (applicationId !=null && applicationId!='') && ((eligibleForGovtMilitary!=undefined && govtMilitaryChoose!=undefined) || eligibleForGovtMilitary==undefined)){
        $('#regulations-submit-btn').prop('disabled',false);
    }else{
         $('#regulations-submit-btn').prop('disabled',true);
    }

});


$(document).ready(function () {
	var applicationId = $('#regulations-select').children(":selected").attr('id');
    var applnName = $('#regulations-select').children(":selected").text();
    var endEquipmentId = $('#checkout-regulations-select').children(":selected").attr('id');
    var EEName = $('#checkout-regulations-select').children(":selected").text();
    var isAccepted =$('#terms_accept').is(":checked");
    var militaryChoose = $("input[name='militaryFlag']:checked").val();
    var eligibleForGovtMilitary = $('#eligibleForGovtMilitary').val();
    var govtMilitaryChoose = $("input[name='govtMilitary']:checked").val();
    $('#selectedAppCategory').val(applicationId);
    $('#selectedEndEquipmentsId').val(endEquipmentId);
    $('#selectedAppCategoryName').val(applnName);
    $('#selectedEndEquipmentsName').val(EEName);
    if(($('.waiver-content').length ==0 || $('#waiver_accept').is(":checked")) && isAccepted && (militaryChoose) && (endEquipmentId !=null && endEquipmentId !='') && (applicationId !=null && applicationId!='') && ((eligibleForGovtMilitary!=undefined && govtMilitaryChoose!=undefined) || eligibleForGovtMilitary==undefined)){
        $('#regulations-submit-btn').prop('disabled',false);
    }else{
         $('#regulations-submit-btn').prop('disabled',true);
    }
});


//B2C Samples - F8 commercial Invoice modal
$('.b2cSamples-Invoice').click(function(e) {
	var defaultEmail = $('#tiB2CSamples-defaultEmail').val();
    $(".modal-body #b2cSamples-commInvoiceEmail").val(defaultEmail);
    $(".modal-body #b2cSamples-masterTracking").val($(this).attr('data-masterTracking'));
    if(defaultEmail !=null && defaultEmail!=''){
    	 $('#b2cSamples-invoice-email-error').css({
    	    	'display':'none',
    	    });
    }
});

$('#b2cSamplesCommercialInvoice').click(function(e) {
    e.preventDefault();
    $('#b2cSamples-invoice-email-error').css({
    	'display':'none',
    });
    var emailPattern = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,20}$/;
	var orderCode = $('#samples-invoice-orderCode').val();
    var deliveryEmailId = $('#b2cSamples-commInvoiceEmail').val();
    var masterTracking=$('#b2cSamples-masterTracking').val();
    
    if (deliveryEmailId == "" || !emailPattern.test(deliveryEmailId)) {
    	$('#b2cSamples-invoice-email-error').css('display', 'block');
    }else{
	    $.ajax({
	        url: ACC.config.encodedContextPath + "/account/f8-invoice?",
	        data:{orderCode: orderCode , deliveryEmailId: deliveryEmailId, masterTracking:masterTracking},        
	        success:function(res){
	        	if(res=='success'){
	    		  $("#samples-commercialInvoice-target-modal-email").modal('hide');
	    		  $("#samples-Invoice-confirm-modal-email").modal('show');
	        	}else{
	        	  $("#samples-commercialInvoice-target-modal-email").modal('hide');
	    		  $("#samples-Invoice-confirm-modal-email").modal('show');s
	        	}
	       }
	    });
    }
});

$('.samples-commercialInvoice, samples-financialInvoice').click(function() {
	var orderCode = $('#samples-invoice-orderCode').val();
	window.location = ACC.config.encodedContextPath + '/account/invoice/'+orderCode;
});

/*----------------------- TAX/VAT Id label - Start -----------------------*/ 

$(document).on('change','#samples-addressType',function(){
	$('.radio-content').find('.error-text').css({
        'display':'none',          
   });
	var country = $('#samples-select-country-list-id').children(":selected").attr('value');
	var countryName = $('#samples-select-country-list-id').children(":selected").text();
	var addressType = $('input[name=addressType]:checked').val();
	validatePhone();
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
							var lableNameUpdated = labelName.replace(".","");
		        			$('#labelName-check').text(lableNameUpdated);		        			
		        			if(display == 'Optional')
	        				{
		        				$('#taxId').removeClass('input-required');
		        				$('#taxId').prop('disabled',false);
		        				$('#shipping-address-select').prop('disabled',false);		        				
	        				}else{
	        					$('#taxId').addClass('input-required');
	        				}
						}else if(display!=''&& display=='No Display'){
							$('#taxId-div').css({
			     	        	'display':'none',
			     	        });
							$('#taxId').attr('disabled','disabled');
							$('#taxId').removeClass('input-required');
							$('#shipping-address-select').prop('disabled',false);
						}
	        		}
	        		else if(addressType!='' && addressType=='Other'){
						var labelName = obj.otherTaxidLabel;
						var display = obj.taxidOtherDisplay;
						if(display!=''&& display =='Required' || display == 'Optional'){
							var lableNameUpdated = labelName.replace(".","");
		        			$('#labelName-check').text(lableNameUpdated);
		        			if(display == 'Optional')
	        				{
		        				$('#taxId').removeClass('input-required');
		        				$('#taxId').prop('disabled',false);
		        				$('#shipping-address-select').prop('disabled',false);
	        				}
		        			else{
		        				$('#taxId').addClass('input-required');
		        			}
						}else if(display!=''&& display=='No Display'){
							$('#taxId-div').css({
			     	        	'display':'none',
			     	        });
							$('#taxId').attr('disabled','disabled');
							$('#taxId').removeClass('input-required');
							$('#shipping-address-select').prop('disabled',false);
						}
	        		}
	        	});
	        	validateForm();
	        }
	    });
	}
});
/*----------------------- TAX/VAT Id label - End -----------------------*/

/////////////////////////DISABLE///////////////////////////

//Disable Invoice Button on OrderHistoryDetailsPage
$(window).load(function() {
  if ( $('.tiInvoice').length > 0 ) {
      $('.tiInvoice').prop('disabled', false);
  }
});

//Disable BackToOrderHistoryButton on OrderHistoryDetailsPage
$(window).load(function() {
  if ( $('.backToOrderHistoryPage').length > 0 ) {
      $('.backToOrderHistoryPage').prop('disabled', false);
  }
});

//Disable emailWaiver Link on OrderHistoryDetailsPage
$(window).load(function() {
	$('.ti-js_emailWaiverDisable').css({
		'pointer-events' : 'auto',
		'opacity' : '',
		'display' : 'inline'
	});
	if ( $('.ti-js_emailWaiverDisable').length > 0 ) {
        $('.ti-js_emailWaiverDisable').attr('disabled', false);
	}
});
//////////////////////////DISABLE-ENDS////////////////////////
