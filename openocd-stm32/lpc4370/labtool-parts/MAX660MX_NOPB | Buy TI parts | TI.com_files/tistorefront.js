ACC.minicart = {

		_autoload: [
			"bindMiniCart",
			"updateMiniCartDisplay"
		],

		bindMiniCart: function(){
	        $(document).on("click",".js-mini-cart-link", function(e){
	            e.preventDefault();
	            var url = $(this).data("miniCartUrl");
	            var cartName = ($(this).find(".js-mini-cart-count").html() != 0) ? $(this).data("miniCartName"):$(this).data("miniCartEmptyName");
	            $.ajax({
		            url: url,
		            cache: false,
		            type: 'GET',
		            success: function(response){
		            	$('#target-modal-mini-cart-details').modal('show');
		   		     	$('#mini-cart-body').html(response);
		            }
		        });
	        });
	    },
	    //	Not sure when the below function will get called
	    updateMiniCartDisplay: function(){
	        var cartItems = $(".js-mini-cart-link").data("miniCartItemsText");
	        var miniCartRefreshUrl = $(".js-mini-cart-link").data("miniCartRefreshUrl");
	        $.ajax({
	            url: miniCartRefreshUrl,
	            cache: false,
	            type: 'GET',
	            success: function(jsonData){
	                $(".js-mini-cart-link .js-mini-cart-count").html('<span class="nav-items-total">' + jsonData.miniCartCount + '<span class="items-desktop hidden-xs hidden-sm">' + ' ' + cartItems + '</span>' + '</span>' );
					$(".js-mini-cart-link .js-mini-cart-price").html(jsonData.miniCartPrice);
	            }
	        });
	    }

	};

ACC.product = {

	    _autoload: [
	        "bindToAddToCartForm",
	    ],

	    enableAddToCartButton: function () {
	        $('.js-enable-btn').each(function () {
	            if (!($(this).hasClass('outOfStock') || $(this).hasClass('out-of-stock'))) {
	                $(this).removeAttr("disabled");
	            }
	        });
	    },

	    bindToAddToCartForm: function () {
	        var addToCartForm = $('.add_to_cart_form');
	        addToCartForm.ajaxForm({
	        	beforeSubmit:ACC.product.showRequest,
	        	success: ACC.product.displayAddToCartPopup
	         });    
	        setTimeout(function(){
	        	$ajaxCallEvent  = true;
	         }, 1);
	     },
	     showRequest: function(arr, $form, options) {  
	    	 if($ajaxCallEvent)
	    		{
	    		 $ajaxCallEvent = false;
	    		 return true;
	    		}   	
	    	 return false;
	 
	    },

displayAddToCartPopup: function (cartResult, statusText, xhr, formElement) {
	    	
	    	$ajaxCallEvent=true;
	    	var productCode = $('[name=productCodePost]', formElement).val();
	        var quantityField = $('[name=qty]', formElement).val();
	        var pdpAvailQty = $('[name=pdpAvailQty]', formElement).val();
	        var plpAvailQty = $('[name=plpAvailQty]', formElement).val();
	        var plpLimit = $('[name=plpLimit]', formElement).val();
	        var limit = $('[name=pdpLimit]', formElement).val();
	        var limitFormattedValue =  addCommasToNum(limit);
	        var plpFormattedLimit =  addCommasToNum(plpLimit);
	        if(parseInt(quantityField) > parseInt(pdpAvailQty) || parseInt(quantityField) > parseInt(plpAvailQty)){
	        	 $("#error-text-exceeds-inv").css('display', 'block');	
	        	 $("#pdp-limit-error").css('display', 'none'); 
	        	 $("#error-text-exceeds-inv-plp-"+productCode).css('display', 'block');
	        	 $("#plp-limit-error-"+productCode).css('display', 'none');
	        	 $('#addToCartBtnPlp_'+productCode).attr('disabled','disabled');
	        	 $('#addToCartButton').attr('disabled','disabled');
	        }
	        else if(parseInt(quantityField) > parseInt(limit)){
	        	$("#pdp-limit-error").css('display', 'block');
	      	  	$("#error-text-limit").text(" "+limitFormattedValue+" ");
	      	  	$("#pdp-limit-error").append($("#error-text-limit-msg").css('display', 'inline'));
	      	  	$("#error-text-exceeds-inv").css('display', 'none');
	      	  	$("#error-text-exceeds-inv-plp-"+productCode).css('display', 'none');
	      	  	$("#error-text-zero-qty-"+productCode).css('display', 'none');
	        	$("#error-text-zero-qty").css('display', 'none');
	      	  	$("#plp-limit-error-"+productCode).css('display', 'block');
	      	  	$("#error-text-limit-"+productCode).text(" "+plpFormattedLimit+" ");
	      	  	$("#plp-limit-error-"+productCode).append($("#error-text-limit-msg-"+productCode).css('display', 'inline'));
	      	  	$('#addToCartBtnPlp_'+productCode).attr('disabled','disabled');
	      	  	$('#addToCartButton').attr('disabled','disabled');
	        }
	        else if(quantityField=="" || parseInt(quantityField) ==0){
	        	var prodCode = productCode.replace('/','-');
	        	$("#error-text-zero-qty-"+prodCode).css('display', 'block');
	        	$("#error-text-zero-qty").css('display', 'block');
		      	$("#pdp-limit-error").css('display', 'none');
		      	$("#plp-limit-error-"+prodCode).css('display', 'none');
		      	$("#error-text-exceeds-inv").css('display', 'none');
		      	$("#error-text-exceeds-inv-plp-"+prodCode).css('display', 'none');
		  		$('#addToCartBtnPlp_'+prodCode).attr('disabled','disabled');
		  		$('#addToCartButton').attr('disabled','disabled');
		    }
	        else{
	        	
	        $('#addToCartLayer').remove();
	        if (typeof ACC.minicart.updateMiniCartDisplay == 'function') {
	            ACC.minicart.updateMiniCartDisplay();
	        }
	        var titleHeader = $('#addToCartTitle').html();
	        $('#target-modal-checkout').modal('show');
		     $('#add-to-cart-modal-body').html(cartResult.addToCartLayer);

	        var cartpopupError= $('.cart_popup_error_msg').html().trim();
	        if(cartpopupError !='' && cartpopupError !='undefined' && cartpopupError.length > 0){
	        	 var titleHeader = $('.headline-text').html('Added to Your Shopping Cart - Failed');
	        }
	        //$('#add-to-cart-modal-label').text(titleHeader);
	        
	        //populate Jack Recommendations
//	        getJackRecommends(productCode);	
	        var pbtTypecode = $('[name=pbtTypecode]', formElement).val();
            if (pbtTypecode == '06' || pbtTypecode == '6')
	        {
            	//$('.modal-dialog').addClass('modal-sm');
            	$('#add-to-cart-modal-body-no-jack').html(cartResult.addToCartLayer);
	        	$('.modal-checkout-recommendation.show-jack').addClass('hide');
	        	$('.modal-checkout-recommendation.no-jack').removeClass('hide');

	        }
	        else
	        {
	        	//$('.modal-dialog').removeClass('modal-sm');
	        	$('.modal-checkout-recommendation.show-jack').removeClass('hide');
	        	$('.modal-checkout-recommendation.no-jack').addClass('hide');
	        //	getJackRecommends(productCode);
	        	
	        }
	        var quantity = 1;
	        if (quantityField != undefined) {
	            quantity = quantityField;
	        }

	        var cartAnalyticsData = cartResult.cartAnalyticsData;

	        var cartData = {
	            "cartCode": cartAnalyticsData.cartCode,
	            "productCode": productCode, "quantity": quantity,
	            "productPrice": cartAnalyticsData.productPostPrice,
	            "productName": cartAnalyticsData.productName
	        };
	        window.dispatchEvent(new CustomEvent('tiAddToCartChange', {}));
	        ACC.track.trackAddToCart(productCode, quantity, cartData);
	    }
	}
};

$('.cart-page-header-main').ready(function() {
   window.dispatchEvent(new CustomEvent('tiAddToCartChange', {}));
});

$(window).load(function(){
	var currentPage = $.cookie("tipage");
	if (currentPage && currentPage.includes("home page") && $('.nav-items-total').text().charAt(0)==='0'){
		ACC.minicart.updateMiniCartDisplay();
	}
});

$('.nav-cart').on('click',function(){
	ACC.minicart.updateMiniCartDisplay();
})

///////////VAT Invoice Validations/////////////
$('#saveVatInvoice').change(function() {
	if(this.checked) {
	    $("#saveVatInvoice").prop("value",true);
	} else {
		$("#saveVatInvoice").prop("value",false);
	}
});


function validateVatfeildEmpty(){
	var isValid = true;
	var invoiceRecipientType = $('input[name=recipientType]:checked').val();
	var invoiceType = $('input[name=type]:checked').val();
	if(invoiceType == 'EINVOICE'){
	if(invoiceRecipientType =='INDIVIDUAL'){
		if(validateCNMobile() && vatTitle() && vatCheckboxFlag() && vatEmail())
		{
		  isValid=true;
		}else{
		  isValid = false;
		}
	}else if(invoiceRecipientType =='COMPANY'){
		if(validateCNMobile() && vatTitle() && vatCmpCheckboxflag() && vatEmail() && vatTaxRegNo())
		{
		 isValid=true;
		}else{
		 isValid = false;
		}
	}
	}
	else if(invoiceType =='SPECIALPAPERINVOICE'){
		if(vatTitle() && vatCmpCheckboxflag() && vatTaxRegNo() && companyPhoneNo() && spetialPhoneNo() && vatReceivingAddress() && vatRCN() && vatRPName() && vatBankAccno() && vatBankName() && vatProvince() && vatTownOrCity() && vatRegAddress())
		{
		  isValid=true;
		  console.log("SPECIALPAPERINVOICE" + isValid);
		}else{
		  isValid = false;
		  console.log("SPECIALPAPERINVOICE" + isValid);
		}
	}
	return isValid;

}

/*Cartpage Mepty Shipto Notification Modal Related code*/
var cartPageModalActive=false;

window.onload = function cartPageModalTrigger(){
	var shipTo= $.cookie('user_pref_shipTo');
	if ((shipTo === null || (shipTo != null  && shipTo.length === 0)) && com.TI.ShipToList){	
		
		var countryOptionsDOM='';
		com.TI.ShipToList.forEach(function(country,cindex){
			countryOptionsDOM+='<option value="' + country.countryCode + '" data-index="'+cindex+'">' + country.countryName + '</option>';
		});

		//Append the list of country <option> available for the country <select> element.
		$('#llc-cartpage-ship-to-country').append(countryOptionsDOM);

		$('#target-modal-cart-page-empty-shipto-notification').modal('show');
		cartPageModalActive = true;

		$('#llc-cartpage-ship-to-continue').on('click', function(){

			var cartPageModalSelectedCurrency = $('#llc-cartpage-ship-to-currency').val();
			var cartPageModalSelectedShipTo = $('#llc-cartpage-ship-to-country').val();
	
			if ((cartPageModalSelectedCurrency && cartPageModalSelectedCurrency !== "currency") && (cartPageModalSelectedShipTo  && cartPageModalSelectedShipTo !== "shipto")){
			com.TI.UserPreferences.setUserPreference(com.TI.UserPreferences.INFO_FIELDS.shipTo,cartPageModalSelectedShipTo)
			.then(function() {
				com.TI.UserPreferences.setUserPreference(com.TI.UserPreferences.INFO_FIELDS.currency,cartPageModalSelectedCurrency)
				.then(function(){
					enforceStoreDomain(cartPageModalSelectedCurrency,true);
				});
			});		
			
			}
		});
	
		$('#llc-cartpage-ship-to-country').on("change", function(event){
	
			if (cartPageModalActive){
				//Reset the Currency dropdown to default placeholder text
				$('#llc-cartpage-ship-to-currency').val('currency');
		
				var shipToIndex = $(this).find(':selected').data('index');
				var currencyLocalText = "Currency";
				if($('#shiptoCurrencyText').val()){
					currencyLocalText = $('#shiptoCurrencyText').val();
				}
				
				var currencyOptionsDOM = shipToIndex >=0 ? '' : '<option value="currency">'+currencyLocalText+'</option>';
		
				if(shipToIndex >= 0){
					var currencyArray = com.TI.ShipToList[shipToIndex].currency;		
					if(currencyArray && currencyArray.length > 0){						
						currencyArray.forEach(function(currency){					
							currencyOptionsDOM += '<option value="' + currency + '">' + currency+ '</option>';
						})

						$('#llc-cartpage-ship-to-currency').removeAttr("disabled");
						$('#llc-cartpage-ship-to-continue').removeAttr("disabled");	
					}		
				}else{
					$('#llc-cartpage-ship-to-currency').attr("disabled",true);	
					$('#llc-cartpage-ship-to-continue').attr("disabled",true);				
				}

				//Append the list of currency <option> available for the selected country to the currency <select> element.
				$('#llc-cartpage-ship-to-currency').empty().append(currencyOptionsDOM);


			}
		});
		
		$('#llc-cartpage-ship-to-currency').on("change", function(){
			var selectedCurrency = $(this).val();
			if(selectedCurrency && selectedCurrency != 'currency' ){
				$('#llc-cartpage-ship-to-continue').removeAttr("disabled");
			}else{
				$('#llc-cartpage-ship-to-continue').attr("disabled",true);
			}	
		});
	}
}

$(document).ready(function() {
	var disableCountryCurrency = null;
	if (null != document.getElementById('disableCountryCurrencyFlag')) {
	    disableCountryCurrency = document.getElementById('disableCountryCurrencyFlag').value;
	    if (disableCountryCurrency !== 'false') {
            function disableShipingAndCurrency() {
                const elShip = document.querySelector("ti-header-ship-to-selection");
                const elCurrency = document.querySelector("ti-header-currency-selection");
                if (elShip) {
                    elShip.setAttribute("disabled","disabled");
                }
                if (elCurrency) {
                    elCurrency.setAttribute("disabled","disabled");
                }
            }

            if (document.readyState !== 'loading') {
                disableShipingAndCurrency();
            } else {
                document.addEventListener('DOMContentLoaded', disableShipingAndCurrency);
            }
        }
	}
});

//VAT checkboxflag validation

$(document).ready(function() {
	if($(this).prop('checked')!=true)
	{
		$("#ebillingid :input").attr("disabled", true); 
		$("#specialinvoice :input").attr("disabled", true);
		$("#taxRegNo").prop("disabled",true);
		$("#regAddress").prop("disabled",true);
		$("#phone-pumber").prop("disabled",true);
		$("#bank-name").prop("disabled",true);
		$("#bankAccno").prop("disabled",true);
	
	}
	else
	{
		$("#ebillingid :input").attr("disabled", false); 
		$("#specialinvoice :input").attr("disabled", false);
		$("#taxRegNo").prop("disabled",false);
		$("#regAddress").prop("disabled",false);
		$("#phone-pumber").prop("disabled",false);
		$("#bank-name").prop("disabled",false);
		$("#bankAccno").prop("disabled",false);
	}
});

$('#checkboxflag').change(function() {
	var isValid = true;
	isValid = validateVatfeildEmpty();
	if($(this).prop('checked')==true)	
	{
		$("#ebillingid :input").attr("disabled", false); 
		}
	else
		{
		$("#ebillingid :input").attr("disabled", true); 
		}
	console.log("in checkobox function isvalid value" + isValid);
	console.log("in checkobox function checkbox value" + $("#checkboxflag").val());
	console.log("in checkobox function checkbox prop value" + $("#checkboxflag").prop("checked"));
	if(isValid) {
		console.log("checkbox cheked and error message not there");
	    $("#tax-invoice-submit").prop("disabled",false);
	}else{
		$("#tax-invoice-submit").prop("disabled",true);
	}
});


$('#cmpCheckboxflag').change(function() {
	var isValid = true;
	if($(this).prop('checked')==true)	
	{
		$("#ebillingid :input").attr("disabled", false); 
		$("#specialinvoice :input").attr("disabled", false);
		$("#taxRegNo").prop("disabled",false);
		$("#regAddress").prop("disabled",false);
		$("#phone-pumber").prop("disabled",false);
		$("#bank-name").prop("disabled",false);
		$("#bankAccno").prop("disabled",false);
		}
	else
		{
		$("#ebillingid :input").attr("disabled", true); 
		$("#specialinvoice :input").attr("disabled", true); 
		$("#taxRegNo").prop("disabled",true);
		$("#regAddress").prop("disabled",true);
		$("#phone-pumber").prop("disabled",true);
		$("#bank-name").prop("disabled",true);
		$("#bankAccno").prop("disabled",true);
		}
	isValid = validateVatfeildEmpty();
	if(isValid) {
	    $("#tax-invoice-submit").prop("disabled",false);
	}else{
		$("#tax-invoice-submit").prop("disabled",true);
	}

});

//VAT title validation
function vatTitle(){
	var isValid=true;
	var title = $("#invoiceTitle").val().trim();
	var titlelength=$("#invoiceTitle").val().length;
	var titlemaxlength = $("#invoiceTitle").attr('maxlength');

	if($("#invoiceTitle").val()==''|| titlelength>50 || titlelength==0){
	 isValid = false;
	 	console.log("invalid title")
	 	$("#invtitle-error-text").css({ 'display':'inline'});
	 }
	else{
		$("#invtitle-error-text").css({ 'display':'none'});
	}
return isValid;
}


//VAT zipcode validation
function vatZipCode(){
	var country = $("#vatInvCountryCode").val();
	// get country config data and populate corresponding zipCode format
	$.ajax({
		url: "delivery-address/getCountryConfigData?" + "countryIso=" + country,
		cache: false,
		type: 'GET',
		datatype:"json",
		success: function(res) {
			var obj = JSON.parse(res);
			if(obj[0].zipCodeFormat!=null && obj[0].zipCodeFormat!=''){
				var patternVal = obj[0].zipCodeFormat;
			}

			var isValid=true;
			var enteredzip = $("#postalCode").val().trim();
			if(patternVal!=null && patternVal!='undefined' &&  patternVal!=""){
				var postCodePattern=new RegExp(patternVal.slice(1, -1));
				
				if(postCodePattern.test(enteredzip)){
					$("#postalcode-error").css({'display':'none'});
					if(validateVatfeildEmpty()){
					$("#tax-invoice-submit").prop("disabled",false);
					}
				}
				else{
					isValid = false;
					$("#postalcode-error").css({'display':'inline'});
					$("#tax-invoice-submit").prop("disabled",true);
				}
			}
			return isValid;
		}
	});
}	

$("#postalCode").on("keyup", function(){
    var enteredzip = $("#postalCode").val().trim();
    var isValid=true;
    if(enteredzip!=''){
    isValid = vatZipCode();
    }
    else {
        $("#postalcode-error").css({'display':'none'});
        if(validateVatfeildEmpty()){
    	$("#tax-invoice-submit").prop("disabled",false);
        }
    }
});


//VAT checkbox validation
function vatCheckboxFlag(){
	 var isValid=true;
if($("#checkboxflag").prop("checked") == false){
	console.log("not checked flag" + $("#checkboxflag").prop("checked"));
	isValid = false;
}
else{
	console.log("checkbox flag checked" + $("#checkboxflag").prop("checked"));
	isValid=true;
}
return isValid;
}


function vatCmpCheckboxflag(){
	 var isValid=true;
if($("#cmpCheckboxflag").prop("checked") == false){
	isValid = false;
}
else{
	isValid=true;
}
return isValid;
}

//VAT mobile number validation
function validateCNMobile(){
	 var mobNum = $("#mobile-number").val().trim();
	 var phonePattern = /^[0-9xX+,;#.( )-]{10,25}$/;
	 var length=mobNum.length;
	 var isValid=true;

	 if(mobNum.includes("-") ){
		 mobNum=mobNum.replace(/-|\s/g,"");
		 console.log("After replacing hypehen:"+mobNum.replace(/-/,' ').length+"Actual string now"+mobNum);
		 mobNum=mobNum.replace(/ /g,'')
		 console.log("After replacing space:"+mobNum.replace(/ /g,'').length+"Actual string now"+mobNum);
	 }
	 var exactlength=mobNum.replace(/ /g,'').length;
	 var trimlength=$("#mobile-number").val().trim().length;
	 console.log("in mobile change"+length+":"+exactlength+"::"+trimlength);

	 if($("#mobile-number").val()==''|| exactlength!=11 || !phonePattern.test(mobNum)){
		 	isValid = false;
		 	$("#mobile_err").css({ 'display':'inline'});
		 }
		else{
			 console.log("valid mobile number");
			$("#mobile_err").css({ 'display':'none'});
		}

	 return isValid;
}

//VAT email validation
function vatEmail(){
	 var emailPattern = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,20}$/;
	 var isValid=true;

	if($("#indi-email").val()=='' || !emailPattern.test($.trim($("#indi-email").val()))){
	 	isValid = false;
	 	$("#indemail-error-text").css({
	     	'display':'inline'
	     });
	 }
	else{
		$("#indemail-error-text").css({
	     	'display':'none'
	     });
	}

	return isValid;
}

//VAT TaxRegNo validation
function vatTaxRegNo(){
	var regnum = $("#taxRegNo").val().trim();
	var alphanum= /^[a-zA-Z0-9]{0,20}$/;
	var isValid=true;
	var regnolength=$("#taxRegNo").val().length;
	var taxRegNoLength = $("#taxRegNo").data("id");
	var taxRegNoSplits = taxRegNoLength.split(',');

	console.log("Entered Length:"+regnolength+" and Type:"+ typeof regnolength);

		if (alphanum.test(regnum)) {
			for(var i=0;i<taxRegNoSplits.length;i++){
				console.log("currently length="+regnolength.toString()+" and its type:"+typeof regnolength.toString()+"  i="+taxRegNoSplits[i]+" and its type:"+typeof taxRegNoSplits[i]);
				var stndlength=taxRegNoSplits[i].toString();
				var enteredlength=regnolength.toString();
				console.log("Type LengthEn="+typeof stndlength+"  Type LengthEx="+typeof enteredlength);
				if(stndlength===enteredlength){
						console.log("length exist");
						isValid = true;
						$("#taxRegNo-error-text").css({'display':'none'});
						break;
				}
				else{
					console.log("length does not exist");
					isValid = false;
					$("#taxRegNo-error-text").css({'display':'inline'});
				}
			}
		}
		else{
			console.log("Pattern not matching");
			isValid = false;
			$("#taxRegNo-error-text").css({'display':'inline'});
		}

		return isValid;
}

//VAT companyPhoneNo validation
function companyPhoneNo(){
	var mobNum = $("#phone-pumber").val().trim();
	 var phonePattern = /^[a-z\d\-\s]+$/i;
	 var isValid=true;
	 mobNum = mobNum.replace(/(\S{3})(\S{4})(\S{4})/, "$1 $2 $3");
	 $('#phone-pumber').val(mobNum);
	 var invoiceRecipientType = $('input[name=recipientType]:checked').val();
		if($("#phone-pumber").val()=='' && invoiceRecipientType != 'COMPANY'){
			 isValid = false;
			 $("#company-phone-error").css({'display':'inline'});
		 }
		 else if (!phonePattern.test(mobNum) && invoiceRecipientType != 'COMPANY') {
		    	isValid = false;
		    	$("#company-phone-error").css({'display':'inline'});
		 }
		 else{
			 $("#company-phone-error").css({'display':'none'});
		 }

	 return isValid;
}

$("#phone-pumber").on("change", function(){
	var isValid=true;
	isValid = companyPhoneNo();

	if(validateVatfeildEmpty()) {
	    $("#tax-invoice-submit").prop("disabled",false);
	}else{
		$("#tax-invoice-submit").prop("disabled",true);
	}
});


//VAT spetialVatPhoneNo validation
function spetialPhoneNo(){
	 var mobNum = $("#phone-number").val().trim();
	 var filter = /^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
	 var phonePattern = /^[0-9xX+,;#.( )-]{10,25}$/;
	 var length=mobNum.length;
	 var isValid=true;

	 if(mobNum.includes("-") ){
		 mobNum=mobNum.replace(/-|\s/g,"");
		 console.log("After replacing hypehen:"+mobNum.replace(/-/,' ').length+"Actual string now"+mobNum);
		 mobNum=mobNum.replace(/ /g,'')
		 console.log("After replacing space:"+mobNum.replace(/ /g,'').length+"Actual string now"+mobNum);
	 }
	 var exactlength=mobNum.replace(/ /g,'').length;
	 var trimlength=$("#phone-number").val().trim().length;

	 console.log("in mobile change"+length+":"+exactlength+"::"+trimlength);
	 if(exactlength!=11){
		 console.log("length issue");
		 isValid = false;
		 $("#spetial-phone-error").css({'display':'inline'});
	 }
	 else if (!phonePattern.test(mobNum)) {
	    	 console.log("format issue");
	    	 isValid = false;
	    	 $("#spetial-phone-error").css({'display':'inline'});
	 }
	 else{
		 $("#spetial-phone-error").css({'display':'none'});
	 }
	 console.log("spetialPhoneNo" + isValid);
	 return isValid;
}

$("#phone-number").on("change", function(){
	var isValid=true;
	isValid = spetialPhoneNo();
	console.log("invalid mobile number11" + isValid)

	var phoneNum = $('#phone-number').val();
	var phoneVal = PhoneUtil.formatNumberInput(+86, true, phoneNum, false)
	console.log("phone-number"+phoneVal);
	 $('#phone-number').val(phoneVal);

	if(validateVatfeildEmpty()) {
	    $("#tax-invoice-submit").prop("disabled",false);
	}else{
		$("#tax-invoice-submit").prop("disabled",true);
	}
});


$("#taxRegNo").on("keyup", function(){
	var isValid=true;
	isValid = vatTaxRegNo();

	if(validateVatfeildEmpty()) {
	    $("#tax-invoice-submit").prop("disabled",false);
	}else{
		$("#tax-invoice-submit").prop("disabled",true);
	}
});

$("#invoiceTitle").on("keyup", function(){
	var isValid=true;
	isValid = vatTitle();

	if(validateVatfeildEmpty()) {
		$("#tax-invoice-submit").prop("disabled",false);
	}else{
		$("#tax-invoice-submit").prop("disabled",true);
	}
});

$("#indi-email").on("keyup", function(){
	var isValid=true;
	isValid = vatEmail();

	if(validateVatfeildEmpty()) {
	    $("#tax-invoice-submit").prop("disabled",false);
	}else{
		$("#tax-invoice-submit").prop("disabled",true);
	}
});


$("#mobile-number").on("change", function(){
	var isValid=true;
	isValid = validateCNMobile();
	var mobNum = $('#mobile-number').val();
	var mobVal = PhoneUtil.formatNumberInput(+86, true, mobNum, false)
	console.log("mobile-number"+mobVal);
	 $('#mobile-number').val(mobVal);

	if(validateVatfeildEmpty()) {
	    $("#tax-invoice-submit").prop("disabled",false);
	}else{
		$("#tax-invoice-submit").prop("disabled",true);
	}
});



$(document).ready(function() {
	$("#tax-invoice-submit").prop("disabled",true);
	 $("#inv-title-tooltip").css({'display':'none'});
	 var optText = $("#optional-text").val();
	 
    $("input[name='type']").click(function() {
           var radio_inv_type= $("input[name='type']").val();
           if($(this).val()=="EINVOICE"){
                  $(".normal-e-invoice-types").show();
                  $(".invoice-individual-form").hide();
                  $(".e-invoice-add").hide();
                  $(".invoice-company-form").hide();
                  $(".special-paper-invoice").hide();
                  $(".save-invoice-info").hide();
                  $(".is-title-flag-individual").hide();
                  $("#tax-invoice-submit").prop("disabled",true);
                  $('input[name="recipientType"]').prop('checked', false);

           }
           if($(this).val()=="SPECIALPAPERINVOICE"){
                  $(".normal-e-invoice-types").hide();
                  $(".invoice-individual-form").show();
                  $(".invoice-company-form").show();
                  $(".special-paper-invoice").show();
                  $(".e-invoice-add").hide();
                  $(".save-invoice-info").show();
                  $(".individual-flag").hide();
                  $(".company-flag").show();
                  $(".is-title-flag-individual").show();
                  $(".optCP-text").css({'display':'none'});
                  $("#regAddress").attr('placeholder','');
                  $("#bank-name").attr('placeholder','');
                  $("#bankAccno").attr('placeholder','');
                  $("#company-phone-error").css({'display':'inline'});
                  $("#bankAccno-error-text").css({'display':'inline'});
                  $("#bankName-error-text").css({'display':'inline'});
                  $("#regAddress-error-text").css({'display':'inline'});
		  document.getElementsByName("recipientType").value="";
		  $('input[name="recipientType"]').prop('checked', false);
		  if(validateVatfeildEmpty()){
        	  $("#tax-invoice-submit").prop("disabled",false);
          }else{
        	  $("#tax-invoice-submit").prop("disabled",true);
          }
           }
    });
    $("input[name='recipientType']").click(function() {
           var radio_inv_type= $("input[name='recipientType']").val();
           if($(this).val()=="INDIVIDUAL"){
                  $(".normal-e-invoice-types").show();
                  $(".invoice-individual-form").show();
                  $(".e-invoice-add").show();
                  $(".invoice-company-form").hide();
                  $(".tw-invoice-company-form").hide();
                  $(".tw-invoice-individual-form").show();
                  $(".special-paper-invoice").hide();
                  $(".save-invoice-info").show();
                  $(".individual-flag").show();
                  $(".company-flag").hide();
                  $(".is-title-flag-individual").show();
                  $("#inv-title-tooltip").css({'display':'none'});
                  if(validateVatfeildEmpty()){
                	  $("#tax-invoice-submit").prop("disabled",false);
                  }else{
                	  $("#tax-invoice-submit").prop("disabled",true);
                  }

           }

           if($(this).val()=="COMPANY"){
                  $(".normal-e-invoice-types").show();
                  $(".invoice-company-form").show();
                  $(".special-paper-invoice").hide();
                  $(".invoice-individual-form").show();
                  $(".tw-invoice-individual-form").hide();
                  $(".tw-invoice-company-form").show();
                  $(".save-invoice-info").show();
                  $(".individual-flag").hide();
                  $(".company-flag").show();
                  $(".is-title-flag-individual").show();
                  $(".e-invoice-add").show();
                  $(".optCP-text").css({'display':'inline'});
                  $("#company-phone-error").css({'display':'none'});
                  $("#bankAccno-error-text").css({'display':'none'});
                  $("#bankName-error-text").css({'display':'none'});
                  $("#regAddress-error-text").css({'display':'none'});
                  $("#regAddress").attr('placeholder',optText);
                  $("#bank-name").attr('placeholder',optText);
                  $("#bankAccno").attr('placeholder',optText);
                  $("#inv-title-tooltip").css({'display':'inline'});
                  if(validateVatfeildEmpty()){
                	  $("#tax-invoice-submit").prop("disabled",false);
                  }else{
                	  $("#tax-invoice-submit").prop("disabled",true);
                  }
           }
});

    $ajaxCallEvent = true;
 ACC.product.enableAddToCartButton();

});

$("#tax-invoice-submit").click(function(e) {
	$("#tiB2CPaid-target-modal-vatInvoice").modal("show");
});

$(document).ready(function() {
	    $('#formInvoice').keypress(function(event) {
	        if (event.keyCode == 13) {
	            event.preventDefault();
	        }
	    });
});

$(window).load(function() {
	var invoiceTitle = $('#invoiceTitle').val();
	var mobileIndNumber = $('#mobile-number').val();
	var indEmail = $('#indi-email').val();
	var companytaxRegNo =  $('#taxRegNo').val();
	var phonenumber =  $('#phone-number').val();
	var postalcode =  $('#postalcode').val();
	var regAddress = $('#regAddress').val();
	var bankName= $('#bank-name').val();
	var bankAccNo=$('#bankAccno').val();
	var receipientName=$('#firstname').val();
	var recevingCN  =$('#recevingCN').val();
	var recevingAddress =$('#receiving-address').val();
	var townOrCity =$('#townOrCity').val();
	var province = $('#province').val();
	var compEmail = $('#compEmail').val();
	
	if(invoiceTitle ==''){
		$("#invtitle-error-text").css({'display':'inline'});
	}
	else if(invoiceTitle !=''){
		$("#invtitle-error-text").css({'display':'none'});
	}

	if(mobileIndNumber ==''){
		$("#mobile_err").css({'display':'inline'});
	}
	else{
		$("#mobile_err").css({'display':'none'});
	}
	if(companytaxRegNo ==''){
		$("#taxRegNo-error-text").css({'display':'inline'});
	}
	else{
		$("#taxRegNo-error-text").css({'display':'none'});
	}
	if(phonenumber ==''){
		$("#spetial-phone-error").css({'display':'inline'});
	}
	else{
		$("#spetial-phone-error").css({'display':'none'});
	}
	if(indEmail ==''){
		$("#indemail-error-text").css({'display':'inline'});
	}
	else{
		$("#indemail-error-text").css({'display':'none'});
	}
	if(compEmail ==''){
		$("#compEmail-error-text").css({'display':'inline'});
	}
	else{
		$("#compEmail-error-text").css({'display':'none'});
	}
	if(postalcode ==''){
		$("#postalcode-error").css({'display':'inline'});
	}
	else{
		$("#postalcode-error").css({'display':'none'});
	}
	if(receipientName ==''){
		$("#firstname-error-text").css({'display':'inline'});
	}
	else{
		$("#firstname-error-text").css({'display':'none'});
	}
	if(recevingCN ==''){
		$("#recevingCN-error-text").css({'display':'inline'});
	}
	else{
		$("#recevingCN-error-text").css({'display':'none'});
	}
	if(recevingAddress ==''){
		$("#spaddress-error-text").css({'display':'inline'});
	}
	else{
		$("#spaddress-error-text").css({'display':'none'});
	}
	if(townOrCity ==''){
		$("#spcity-error-text").css({'display':'inline'});
	}
	else{
		$("#spcity-error-text").css({'display':'none'});
	}
	if(province ==''){
		$("#province-error-text").css({'display':'inline'});
	}
	else{
		$("#province-error-text").css({'display':'none'});
	}

});



function vatEditButton(){
	 var isValid = true;
	 isValid = validateVatfeildEmpty();
if(isValid){
	console.log("not checked flag" + $("#checkboxflag").prop("checked"));
	console.log("edit button clicked error message there");
	$("#tax-invoice-submit").prop("disabled",false);
}else{
	$("#tax-invoice-submit").prop("disabled",true);
}
return isValid;
}

$("#receiving-address").on("keyup", function(){
	var isValid=true;
	isValid = vatReceivingAddress();
	if(validateVatfeildEmpty()) {
	    $("#tax-invoice-submit").prop("disabled",false);
	}else{
		$("#tax-invoice-submit").prop("disabled",true);
	}
});

//VAT receiving-address validation
function vatReceivingAddress(){
	 var isValid = true;
	if($("#receiving-address").val()==''){
	var isValid = false;
	$("#spaddress-error-text").css({'display':'inline'});
}else{
	$("#spaddress-error-text").css({'display':'none'});
}
return isValid;
}

$("#townOrCity").on("keyup", function(){
	var isValid=true;
	isValid = vatTownOrCity();

	if(validateVatfeildEmpty()) {
	    $("#tax-invoice-submit").prop("disabled",false);
	}else{
		$("#tax-invoice-submit").prop("disabled",true);
	}
});

//VAT TownOrCity validation
function vatTownOrCity(){
	var isValid=true;

	if($("#townOrCity").val()==''){
		var isValid = false;
		$("#spcity-error-text").css({'display':'inline'});
	}
	else{
		$("#spcity-error-text").css({'display':'none'});
	}
	return isValid;
}

$("#province").on("keyup", function(){
	var isValid=true;
	isValid = vatProvince();

	if(validateVatfeildEmpty()) {
	    $("#tax-invoice-submit").prop("disabled",false);
	}else{
		$("#tax-invoice-submit").prop("disabled",true);
	}
});

//VAT Province validation
function vatProvince(){
	var isValid=true;

	if($("#province").val()==''){
		var isValid = false;
		$("#province-error-text").css({'display':'inline'});
	}
	else{
		$("#province-error-text").css({'display':'none'});
	}
	return isValid;
}

$("#bankAccno").on("keyup", function(){
	var isValid=true;
	isValid = vatBankAccno();

	if(validateVatfeildEmpty()) {
	    $("#tax-invoice-submit").prop("disabled",false);
	}else{
		$("#tax-invoice-submit").prop("disabled",true);
	}
});

//VAT BankAccno validation
function vatBankAccno(){
	var isValid=true;
	var radio_inp_inv_type=  $('input[name=type]:checked').val();
	  if(radio_inp_inv_type == "SPECIALPAPERINVOICE"){
	  $("#bankAccno").attr('placeholder','');
	  }
	var invoiceRecipientType = $('input[name=recipientType]:checked').val();
	if($("#bankAccno").val()=='' && invoiceRecipientType != 'COMPANY'){
		var isValid = false;
		$("#bankAccno-error-text").css({'display':'inline'});
	}
	else{
		$("#bankAccno-error-text").css({'display':'none'});
	}
	return isValid;
}

$("#bank-name").on("keyup", function(){
	var isValid=true;
	isValid = vatBankName();

	if(validateVatfeildEmpty()) {
	    $("#tax-invoice-submit").prop("disabled",false);
	}else{
		$("#tax-invoice-submit").prop("disabled",true);
	}
});

//VAT BankAccno validation
function vatBankName(){
	var isValid=true;
	var radio_inp_inv_type=  $('input[name=type]:checked').val();
	  if(radio_inp_inv_type == "SPECIALPAPERINVOICE"){
	  $("#bank-name").attr('placeholder','');
	  }
	var invoiceRecipientType = $('input[name=recipientType]:checked').val();
	if($("#bank-name").val()=='' && invoiceRecipientType != 'COMPANY'){
		var isValid = false;
		$("#bankName-error-text").css({'display':'inline'});
	}
	else{
		$("#bankName-error-text").css({'display':'none'});
	}
	return isValid;
}

$("#regAddress").on("keyup", function(){
	var isValid=true;
	isValid = vatRegAddress();

	if(validateVatfeildEmpty()) {
	    $("#tax-invoice-submit").prop("disabled",false);
	}else{
		$("#tax-invoice-submit").prop("disabled",true);
	}
});

//VAT RegAddress validation
function vatRegAddress(){
	var isValid=true;
	var radio_inp_inv_type=  $('input[name=type]:checked').val();
	  if(radio_inp_inv_type == "SPECIALPAPERINVOICE"){
	  $("#regAddress").attr('placeholder','');
	  }

	var invoiceRecipientType = $('input[name=recipientType]:checked').val();
	if($("#regAddress").val()=='' && invoiceRecipientType != 'COMPANY'){
		var isValid = false;
		$("#regAddress-error-text").css({'display':'inline'});
	}
	else{
		$("#regAddress-error-text").css({'display':'none'});
	}
	return isValid;
}

$("#firstname").on("keyup", function(){
	var isValid=true;
	isValid = vatRPName();

	if(validateVatfeildEmpty()) {
	    $("#tax-invoice-submit").prop("disabled",false);
	}else{
		$("#tax-invoice-submit").prop("disabled",true);
	}
});

//VAT BankAccno validation
function vatRPName(){
	var isValid=true;

	if($("#firstname").val()==''){
		var isValid = false;
		$("#firstname-error-text").css({'display':'inline'});
	}
	else{
		$("#firstname-error-text").css({'display':'none'});
	}
	return isValid;
}

$("#recevingCN").on("keyup", function(){
	var isValid=true;
	isValid = vatRCN();

	if(validateVatfeildEmpty()) {
	    $("#tax-invoice-submit").prop("disabled",false);
	}else{
		$("#tax-invoice-submit").prop("disabled",true);
	}
});

//VAT BankAccno validation
function vatRCN(){
	var isValid=true;

	if($("#recevingCN").val()==''){
		var isValid = false;
		$("#recevingCN-error-text").css({'display':'inline'});
	}
	else{
		$("#recevingCN-error-text").css({'display':'none'});
	}
	return isValid;
}


///////////End of VAT Invoice Validations/////////////

/* function getJackRecommends(productCode){
	var URL="https://api.jack.texasinstruments.com/atcm-companion-parts";
	var storeType="store";
	var lang="en";
	var campaignId="CMP-JK-TI STORE-COMPANION PARTS ON ADD TO CART MODAL-WWE";
	var dataLidId="store_rtp_recommendations_jack_companion_parts_add_to_cart_en";
	var numOfRecords = 0;
	if(ACC.config.currentLang == 'zh'){
		lang="cn";
		campaignId="CMP-JK-TI STORE-COMPANION PARTS ON ADD TO CART MODAL-CN";
		dataLidId="store_rtp_recommendations_jack_companion_parts_add_to_cart_cn";
	}
	var uid=$.cookie('tiSessionID');
	$('#tipersonalization-item-block').html("");
    $.ajax({
        url: URL +'?opn='+productCode+'&campaign='+campaignId+'&uid='+uid+'&lang='+lang+'&type='+storeType+'&num_recs=3',
        dataType: 'jsonp',
        success: function(data) {
        	$.each(data, function (idx, obj) {
        		numOfRecords = numOfRecords + 1;
        		var content="<div class='recom-product-wrapper'><div class='recom-product-image'><img src='https://"+obj.img_url+"'></div><div class='recom-product-details'><p>"+
        		obj.description+"</p><p class='recom-product-title'>"+"<a href='"+obj.url+"' tabindex='-1'>"+obj.opn+"</a></p></div></div>";
        		  if ( numOfRecords <= 3) {
					$('#tipersonalization-item-block').append(content);
        		  }
	        	 });
        	$('#target-modal-checkout').modal('show');
        }
    });
}	*/

//choose endEquipments based on application
$(document).on('change','#regulations-select',function(){
	var application = $(this).children(":selected").attr('id');
	var applnName = $(this).children(":selected").text();
	var currentLang =$('#currentLang').val();
	$.ajax({
        url: "retieveEndEquipments?" + "appId=" + application,
        cache: false,
        type: 'GET',
        datatype:"json",
	        success: function(response){
	        	$('#selectedAppCategory').val(application);
	        	$('#selectedAppCategoryName').val(application);
	        	var jsonObject = $.parseJSON(response); 
	        	$("#checkout-regulations-select").find('option').remove();
	        	if(currentLang =='zh'){
	        		$("#checkout-regulations-select").append('<option>选择您的终端设备</option>');
	        	 }
	        	else if(currentLang =='ja'){
	        		$("#checkout-regulations-select").append('<option>最終製品を選択してください</option>');
	        	 }
	        	else{
	        		$("#checkout-regulations-select").append('<option>Please select your end equipment</option>');
	        		 
		         }
	        	//sorting based on endEquipment name
	        	var sortedObj = jsonObject.sort(function (a, b) {
	    
	        			if (a.eeqSolnName > b.eeqSolnName) {
	      					return 1;
	      				}
	    				if (a.eeqSolnName < b.eeqSolnName) {
	     					 return -1;
	     				}
	    				return 0;
			   });
	        
		        	$.each(sortedObj, function (i, obj) {
	        		$('#checkout-regulations-select').append($('<option>', { 
	        			text: obj.eeqSolnName,
	    		        id: obj.eeqSolnId
	    		    }));
	        	});	
		    $(".militoryRadio").prop('checked',false); 
			$("#importerDiv").hide();   	
    		enableNextbtn();
    		
	    }//success
    });//ajax
});

// GSPE_OCB-429 Maa End Customer name field
$(document).on('change keyup input','#endCustomerCompanyNameRegulations',function(e) {
	e.preventDefault();
	
	var ecName = $("#endCustomerCompanyNameRegulations").val();
	var fieldPattern = /^[a-zA-z0-9\.\:\/\@\,\-\s\(\)\!\#\$\%\^\&\*\~\_]+$/;
	//var isAccepted =$('#terms_accept').is(":checked");
	var militaryChoose = $("input[name='militaryFlag']:checked").val();
	var applicationId = $('#regulations-select').children(":selected").attr('id');
	var applnName = $('#regulations-select').children(":selected").text();
	var endEquipmentId = $('#checkout-regulations-select').children(":selected").attr('id');
	var EEName = $('#checkout-regulations-select').children(":selected").text();

	if(ecName.trim() === '' || !fieldPattern.test(ecName)){
		$(".endCustomerCompanyNameRegulationsError").removeClass('hide');
		$('#regulations-submit-btn').prop('disabled',true);
	} else {
		$(".endCustomerCompanyNameRegulationsError").addClass('hide');
		if(($('.waiver-content').length ==0 || $('#waiver_accept').is(":checked")) && (militaryChoose) && (endEquipmentId !=null && endEquipmentId !='') && (applicationId !=null && applicationId!='')){
			$('#regulations-submit-btn').prop('disabled',false);
		}
		else{
			$('#regulations-submit-btn').prop('disabled',true);
		}

		$.ajax({
			url: ACC.config.encodedContextPath + "/cart/saveEndCustomerCompanyName",
			data:{endCustomerCompanyName: encodeURIComponent(ecName)},
	        type: 'POST',
	        success: function(response){
	           if(response == "Success"){
	        	   console.log("Save Success");
	           }
	        }
	    });
	}
});

// Enable next button for Regulations
$(window).click(function() {
	 var applicationId = $('#regulations-select').children(":selected").attr('id');
		var applnName = $('#regulations-select').children(":selected").text();
		var endEquipmentId = $('#checkout-regulations-select').children(":selected").attr('id');
		var EEName = $('#checkout-regulations-select').children(":selected").text();
				
		$('#selectedAppCategory').val(applicationId);
		$('#selectedEndEquipmentsId').val(endEquipmentId);
		$('#selectedAppCategoryName').val(applnName);
		$('#selectedEndEquipmentsName').val(EEName);
			
		//enableNextbtn();
	
});

$(document).ready(function() {
	 var applicationId = $('#regulations-select').children(":selected").attr('id');
		var applnName = $('#regulations-select').children(":selected").text();
		var endEquipmentId = $('#checkout-regulations-select').children(":selected").attr('id');
		var EEName = $('#checkout-regulations-select').children(":selected").text();
				
		$('#selectedAppCategory').val(applicationId);
		$('#selectedEndEquipmentsId').val(endEquipmentId);
		$('#selectedAppCategoryName').val(applnName);
		$('#selectedEndEquipmentsName').val(EEName);
		$(".militoryRadio").prop('checked',false);
		enableNextbtn();		
});

$(document).on('click','input.js-checkout-waiver-radio',function() {
	 $(this).prop('checked', true);
	 $('.js-checkout-waiver-radio').not(this).prop('checked', false);
	 enableNextbtn();	 
});

//Regulations Submit
$(document).on('click','#regulations-submit-btn',function(e){
	 e.preventDefault();
	 $('#regulations-form').find('span.form-error').remove();	
	var applicationId = $('#regulations-select').children(":selected").attr('id');
	var applnName = $('#regulations-select').children(":selected").text();
	var endEquipmentId = $('#checkout-regulations-select').children(":selected").attr('id');
	var EEName = $('#checkout-regulations-select').children(":selected").text();
	//var isAccepted =$('#terms_accept').is(":checked");
	var militaryChoose = $("input[name='militaryFlag']:checked").val();
	var ecNameValue = $('#endCustomerCompanyNameRegulations').val();
	var ecNameFieldNotExists = $('#endCustomerCompanyNameRegulations').length == 0;
	var imp_handler=$("input[name='importerName']:checked").val();	
	var chk_confirmVal=$("input[name='chk_confirm']:checked").val();
	var ior = $("input[name='importerName']:checked").val();
	$('#selectedAppCategory').val(applicationId);
	$('#selectedEndEquipmentsId').val(endEquipmentId);
	$('#selectedAppCategoryName').val(applnName);
	$('#selectedEndEquipmentsName').val(EEName);
	$('#selectedIOR').val(ior);
	
	if(($('.waiver-content').length ==0 || $('#waiver_accept').is(":checked")) && (militaryChoose) && (endEquipmentId !=null && endEquipmentId !='') && (applicationId !=null && applicationId!='') && (ecNameFieldNotExists ? true : ecNameValue.trim() != '') && (typeof imp_handler!= undefined)  && (typeof chk_confirmVal!= undefined)	){
		
			$('#regulations-form').submit();
				    
		
		
	}else {
		 $(this).css({
             "border": "1px solid red",
         });
         $(this).before('<span class="form-error">Please provide the required details</span>');
	}
});

//onchange of equipment id dropdown 
$(document).on('change','#checkout-regulations-select',function(){ 
	var endEquipmentId = $('#checkout-regulations-select').children(":selected").attr('id');
	$(".militoryRadio").prop('checked',false);
	$("#importerDiv").hide();
	if(endEquipmentId == null || endEquipmentId=='' || endEquipmentId==undefined){
		$(".militoryRadio").attr('disabled',true);
	}
	else{
		$(".militoryRadio").attr('disabled',false);
	}
	
});
//on change of millitory radio button
$('.militoryRadio').on('click', function() { 	
	$('#regulations-submit-btn').prop('disabled',true);	
	$("input[name='importerName']").prop('checked', false);
	var militaryChoose = $("input[name='militaryFlag']:checked").val();
	var applicationId = $('#regulations-select').children(":selected").attr('id');
	var endEquipmentId = $('#checkout-regulations-select').children(":selected").attr('id');
	var currency = $('#currentCurrencyIsoCode').val();
	var country = $('#currentCountryCode').val();
	$.ajax({
		url: ACC.config.encodedContextPath + '/checkout/buy/multi/regulations-step/getIOR',
		type:'GET',
		datatype:"json",
		data:{"appId": applicationId, "eeId":endEquipmentId, "country":country, "currency" :currency, "militaryFlag":militaryChoose},
	
		success:function(res){
			console.log("res is" +res);
			var obj = JSON.parse(res);
			if(obj != null && obj.length > 1){
				obj.sort();
				$("input[type=radio].ti").val(obj[1]);
				$("input[type=radio].customer").val(obj[0]);
				$("#importerDiv").show();
				var imp_handler=$("input[name='importerName']:checked").val();	
				var chk_confirmVal=$("input[name='chk_confirm']:checked").val();							
			}
			else{
				$("#importerDiv").hide();
				$("input[name='importerName']").prop('checked', false);
			}
			enableNextbtn();
		}
		
});
	
});

$("input[name ='importerName']").on('click',function(){
	var ior=$("input[name='importerName']:checked").val();	
	$("#chkbx1").removeAttr("checked");
	if(ior === 'Customer NA'){
		$("#customerIORError").show();
		$("#customerIORWarning").hide();
		customerIORError();
		$("#chkbx1").attr("disabled", true);
	}
	else if(ior === 'TI NA'){
		$("#tiIORError").show();
		$("#tiIORWarning").hide();
		tiIORError();
		$("#chkbx1").attr("disabled", true);
	}
	else{
		$("#customerIORError").hide();
		$("#tiIORError").hide();
		
		$("#customerIORWarning").show();
		$("#tiIORWarning").show();
		
		$("#chkbx1").attr("disabled", false);		
	}	
});

$('#chkbx1').change(function(){
		enableNextbtn();	
});

function enableNextbtn(){
	
	var applicationId = $('#regulations-select').children(":selected").attr('id');
	var applnName = $('#regulations-select').children(":selected").text();
	var endEquipmentId = $('#checkout-regulations-select').children(":selected").attr('id');
	var EEName = $('#checkout-regulations-select').children(":selected").text();
	var militaryChoose = $("input[name='militaryFlag']:checked").val();
	var ecNameFieldNotExists = $('#endCustomerCompanyNameRegulations').length == 0;
	var ecNameValue = $('#endCustomerCompanyNameRegulations').val();
	var govtMilitary = $("input[name='govtMilitary']:checked").val();	
	
	var importerfieldPresent=$("#importerDiv").is(":visible");
	var imp_handler=$("input[name='importerName']:checked").val();	
	var chk_confirmVal=$("input[name='chk_confirm']:checked").val();
	
	
	if(applicationId == null || applicationId=='' || applicationId==undefined){
		$(".militoryRadio").attr('disabled',true);
	}
	else{
			if(endEquipmentId == null || endEquipmentId=='' || endEquipmentId==undefined){
			$(".militoryRadio").attr('disabled',true);
		}
		else{
			$(".militoryRadio").attr('disabled',false);
		}
	}
		
	if(($('.waiver-content').length ==0 || $('#waiver_accept').is(":checked")) && (militaryChoose) && (endEquipmentId !=null && endEquipmentId !='') && (applicationId !=null && applicationId!='')  && (ecNameFieldNotExists ? true : ecNameValue.trim() != ''))
	{	 
		if(importerfieldPresent){
			if($("input[name='importerName']").is(":checked") && $("input[name='chk_confirm']").is(":checked")){
			 		$("#regulations-submit-btn").attr('disabled',false);	
			}
			else{
			 		$('#regulations-submit-btn').prop('disabled',true);	
			}
		 }
		 else{
			  $("#regulations-submit-btn").attr('disabled',false);	
		 }				 
	 }else{
		 $('#regulations-submit-btn').prop('disabled',true);	
	 }	
}

function customerIORError(){
	var customerIORErrorMsg=$('#customerIORErrorMsg').val();
	console.log("error mesage is "+customerIORErrorMsg);
	if($('#currentLang').val() == 'zh')
	{
		checkGATrackFunction(customerIORErrorMsg,"IOR error_Buyer_cn",0);
	}
	else if($('#currentLang').val() == 'ja')
	{
		checkGATrackFunction(customerIORErrorMsg,"IOR error_Buyer_jp",0);
	}
	else{
		checkGATrackFunction(customerIORErrorMsg,"IOR error_Buyer",0);
	}
}

function tiIORError(){
	var tiIORErrorMsg=$('#tiIORErrorMsg').val();
	console.log("error mesage is"+tiIORErrorMsg);
	if($('#currentLang').val() == 'zh')
	{
		checkGATrackFunction(tiIORErrorMsg,"IOR error_TI_cn",0);
	}
	else if($('#currentLang').val() == 'ja')
	{
		checkGATrackFunction(tiIORErrorMsg,"IOR error_TI_jp",0);
	}
	else{
		checkGATrackFunction(tiIORErrorMsg,"IOR error_TI",0);
	}
}

//Disabling the search button while loading the page
$(document).ready(function () {
	$('.search-button').prop('disabled', true);
});

//Enabling the search button if the input value is not empty
$(document).on('change keyup keydown','#js-site-search-input',function(e){
	if($(this).val() != '') {
		$('.search-button').prop('disabled', false);
     }else{
    	 if (e.keyCode == 13) {
	        e.stopPropagation();
	        return false;
	    }else{
	    	$('.search-button').prop('disabled', true);
	    	return true;
	    }
     }
});

//setting the filter key
$(document).on('change','#select_box_search,#m_select_box_search,#c_select_box_search',function(e){
	var filter = $(this).val();
	$(this).closest('.search-bar').find('#searchType').val(filter);
});


//Get regions based on country common for B2c samples&paid in addressbook
$(document).on('change','#add-select-country-list-id',function(){
	var country = $(this).children(":selected").attr('value');
	var countryName = $(this).children(":selected").text();
	var optionZero = $('#state-select-box p:first').text(); 
	if(country!='' && country !='0'){
		$.ajax({
	        url: "getRegions?" + "countryIso=" + country,
	        cache: false,
	        type: 'GET',
	        datatype:"json",
	        success: function(response){
	        	var jsonObject = $.parseJSON(response); 
	        	$('#select-state-list-id').children('option').remove();
	        	$("#select-state-list-id").append("<option value=0>"+ optionZero +"</option>");
	        	if(jsonObject.length==0){
	        		$('#state-select-box').css({'display':'none'});
	        		$('#select-state-list-id').attr('name','');
	        		$('#state-text-input').css({'display':'block'});
	        		$('#state-input').attr('name','state');
	        		$('#state-input').val('');
	        		if($('#state-input').is(':disabled')){
	        			$('#state-input').removeAttr('disabled');	
	        		}
	        		$('#select-state-list-id').attr('disabled','disabled');
	        	}else{
	        		$('#select-state-list-id').attr('name','state');
	        		$('#state-input').attr('name','');
	        		$('#state-input').attr('disabled','disabled');
	        		$('#state-select-box').css({'display':'block'});
	        		$('#state-text-input').css({'display':'none'});
	        		if($("#select-state-list-id").is(':disabled')){
	        			$('#select-state-list-id').removeAttr('disabled');	
	        		}
	        		$('.nonenglish-error-text').css({'display':'none'});
		        	$.each(jsonObject, function (i, obj) {
		        		$('#select-state-list-id').append($('<option>', { 
		    		        text: obj.name,
		    		        value: obj.isocodeShort
		    		    }));
		        	});
		        }
	    		// get country config data and populate corresponding hidden attributes 
	    	    $.ajax({
	    	        url: "getCountryConfigData?" + "countryIso=" + country,
	    	        cache: false,
	    	        type: 'GET',
	    	        datatype:"json",
	    	        success: function(res) {
	    	        	var obj = JSON.parse(res);
	    	        	$('#regionMandatory').val(obj.regionMandatory);
	    	        	if(obj.zipCodeFormat!=null && obj.zipCodeFormat!=''){
	    	        		$('#zipCodeFormat').val(obj.zipCodeFormat);
	       					 if(!$('#postcode').hasClass('input-required')){
	       						 $('#postcode').addClass('input-required');
	       					 }
	    	        	}else if($('#postcode').hasClass('input-required')){
	       			    	$('#postcode').removeClass('input-required');
	       			     }
	    	        	$(".js-phone-entry--countrycode option[value='" + obj.phonePrefix + "']").attr("selected","selected");
	    	        	$(".js-phone-entry--countrycode option[value='" + obj.phonePrefix + "']").val(obj.phonePrefix);
	    	        	setupPhoneEntryGroups();
	    	        }       
	    	    });
	    	    
	    	    if($('#add-select-country-list-id').children(":selected").attr('value')=='HK'){
	    			 var countryName=$('#add-select-country-list-id').children(":selected").text();
	    			 $("#ab_townCity").val(countryName);
	    			 $("#ab_townCity").prop("readonly",true);
	    	    }else{
	    			 $("#ab_townCity").prop("readonly",false);
	    	    }
	        }
	    });
		
		
	}else{
		$(this).find("option[value='0']").attr("selected","selected");
	}
});

$(document).ready(function() {
    $("body").tooltip({ 
    	selector: '[data-toggle=tooltip]'
    });
});



// Search Results Page
$('.js-expand-details').click(function () {
  // Change icon
  var icon = $(this).find('.expand-opts').children();
  icon.toggleClass('fa-chevron-down').toggleClass('fa-chevron-up');
  // Scroll to a table that has been expanded
  if (icon.hasClass('fa-chevron-up')) {
    var element = $(this);
    $('html, body').animate({
        scrollTop: $(element).offset().top
    }, 600);
  }
});

// Prevent collapsing results on certain items
$('.product-w-table .inner-wrapper a').click(function (e) {
  e.stopPropagation();
});

// Toggle borders
$('.js-toggle-border').each(function(index, element) {
  var self     = element,
      $this    = $(element),
      $trigger = $this.find('.js-toggle-border-target');

  $trigger.click(function(e) {
    $this.parent().children('.js-toggle-border').each(function(index, element) {
      if (element == self) {
        $(element).toggleClass('dotted-borders');
      }
    });
  });
});
//cart calculation
$('#tiCartCalculate').on('click', function() {
	var entrySize = $('#lineItemsSize4Ti').val();
	var formName4Cart = "updateCartForm";
	var tempFormName = "";
	$.blockUI({ 
		message : getMessage(),
		onBlock: function() {
			for ( i = 0; i < entrySize ; i++) {
			tempFormName = formName4Cart+i;
			var initialCartQuantity = $("#"+tempFormName).find('input[name=initialQuantity]').val();
			var newCartQuantity = $("#"+tempFormName).find('input[name=quantity]').val();
		
			if ( initialCartQuantity != newCartQuantity ) {
			$.ajax({
			async: false,
		            type: $("#"+tempFormName).attr('method'), // method attribute of form
			        url: $("#"+tempFormName).attr('action'),  // action attribute of form
			        data : $("#"+tempFormName).serialize(),
			     });
				}
			}
			$.unblockUI(); 	
		}
	});
});

function getMessage(){
	if($('#currentLanguage').val() == 'zh'){
		return "<h3 style='color:#f9f9f9'>请稍等.....</h3>";
	}
	else{
		return "<h3 style='color:#f9f9f9'>Please Wait...</h3>";
	}
}
//Updating Cart while clicking Checkout button
$('#tiCartCalculate_Checkout, #tiCartCalculate_Checkout_top').on('mousedown', function(e) {
	e.preventDefault();
	var entrySize = $('#lineItemsSize4Ti').val();
	var formName4Cart = "updateCartForm";
	var tempFormName = "";
	var checkoutUrl = $(this).data("checkoutUrl");
	$.blockUI({
		message : getMessage(),
		onBlock : function() {
			for (i = 0; i < entrySize; i++) {
				tempFormName = formName4Cart + i;
				var initialCartQuantity = $("#" + tempFormName).find('input[name=initialQuantity]').val();
				var newCartQuantity = $("#" + tempFormName).find('input[name=quantity]').val();

				if (initialCartQuantity != newCartQuantity) {
					$.ajax({
						async : false,
						type : $("#" + tempFormName).attr('method'), // method attribute of form
						url : $("#" + tempFormName).attr('action'), // action attribute of form
						data : $("#" + tempFormName).serialize(),
					});
				}
			}
			$.unblockUI();
		},
		onUnblock : function() {
			var flow = $('#selectAltCheckoutFlow').val();
			if (flow == undefined || flow == ''
					|| flow == 'select-checkout') {
				window.location = checkoutUrl;
			}
		}
	});
	_tiAnalyticsTrack('ti store checkout', _metrics_store_data);
});

//Updating Cart while clicking Continue Shopping button
$('#tiCartCalculate_Continue, #tiCartCalculate_Continue_top').on('click', function(e) {
	e.preventDefault();
	var entrySize = $('#lineItemsSize4Ti').val();
	var formName4Cart = "updateCartForm";
	var tempFormName = "";
	var continueUrl = $(this).data("continueShoppingUrl");
	
	$.blockUI({
		message : getMessage(),
		onBlock : function() {
			for (i = 0; i < entrySize; i++) {
				tempFormName = formName4Cart + i;
				var initialCartQuantity = $("#" + tempFormName).find('input[name=initialQuantity]').val();
				var newCartQuantity = $("#" + tempFormName).find('input[name=quantity]').val();

				if (initialCartQuantity != newCartQuantity) {
					$.ajax({
						async : false,
						type : $("#" + tempFormName).attr('method'), // method attribute of form
						url : $("#" + tempFormName).attr('action'), // action attribute of form
						data : $("#" + tempFormName).serialize(),
					});
				}
			}
			$.unblockUI();
		},
		onUnblock : function() {
			window.location = continueUrl;
		}
	});
});


//Search Result Page Inner Toggle Sort
$('.js-toggle-sort').click(function(){
	 var sortArrow = $(this).find('.js-sort-arrows');
	    var downArrow = $(this).find('.js-sort-down');
	    var upArrow = $(this).find('.js-sort-up');

	    // Sorting arrows active
	    if (!sortArrow.hasClass('js-hide-icon')) {
	      sortArrow.addClass('js-hide-icon');
	      downArrow.removeClass('js-hide-icon');
	    } else { // toggle between up and down
	      downArrow.toggleClass('js-hide-icon');
	      upArrow.toggleClass('js-hide-icon');
	    }
});
function comparer(index) {
    return function(a, b) {
        var valA = getCellValue(a, index), valB = getCellValue(b, index)
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
    }
}
function getCellValue(row, index){ return $(row).children('td').eq(index).text() }

// Toggle language
$('#js-language-toggle').click(function() {
	$(this).text(function(i,e) {
		$('#lang-form').submit();
  });
});

//regulations terms&conditions scroll check
$("#js-checkout-toc-textbox").bind('scroll', function () {
    if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight - 5) {
    	$('.js-checkout-toc-radio').prop( "disabled", false );
    	// Remove disabled label class
    	$('.toc-lbl-disabled').each(function() {
    		$(this).removeClass('toc-lbl-disabled');
    	});
    }
});
 
   
/*----------------------- Tooltip - Start -----------------------*/ 

if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(a) {
    "use strict";
    var b = a.fn.jquery.split(" ")[0].split(".");
    if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1 || b[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
}(jQuery),  function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tooltip"),
                f = "object" == typeof b && b;
            !e && /destroy|hide/.test(b) || (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b)
    };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover click focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, c.prototype.init = function(b, c, d) {
        if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
            else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin",
                    i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.getOptions = function(b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, c.prototype.getDelegateOptions = function() {
        var b = {},
            c = this.getDefaults();
        return this._options && a.each(this._options, function(a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, c.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void(c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function() {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show)) : c.show())
    }, c.prototype.isInStateTrue = function() {
        for (var a in this.inState)
            if (this.inState[a]) return !0;
        return !1
    }, c.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        if (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), !c.isInStateTrue()) return clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide)) : c.hide()
    }, c.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !d) return;
            var e = this,
                f = this.tip(),
                g = this.getUID(this.type);
            this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
            var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
                i = /\s?auto?\s?/i,
                j = i.test(h);
            j && (h = h.replace(i, "") || "top"), f.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var k = this.getPosition(),
                l = f[0].offsetWidth,
                m = f[0].offsetHeight;
            if (j) {
                var n = h,
                    o = this.getPosition(this.$viewport);
                h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h)
            }
            var p = this.getCalculatedOffset(h, k, l, m);
            this.applyPlacement(p, h);
            var q = function() {
                var a = e.hoverState;
                e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
            };
            a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q()
        }
    }, c.prototype.applyPlacement = function(b, c) {
        var d = this.tip(),
            e = d[0].offsetWidth,
            f = d[0].offsetHeight,
            g = parseInt(d.css("margin-top"), 10),
            h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({
            using: function(a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth,
            j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = /top|bottom/.test(c),
            m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
            n = l ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(m, d[0][n], l)
    }, c.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, c.prototype.hide = function(b) {
        function d() {
            "in" != e.hoverState && f.detach(), e.$element && e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
        }
        var e = this,
            f = a(this.$tip),
            g = a.Event("hide.bs." + this.type);
        if (this.$element.trigger(g), !g.isDefaultPrevented()) return f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this
    }, c.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, c.prototype.hasContent = function() {
        return this.getTitle()
    }, c.prototype.getPosition = function(b) {
        b = b || this.$element;
        var c = b[0],
            d = "BODY" == c.tagName,
            e = c.getBoundingClientRect();
        null == e.width && (e = a.extend({}, e, {
            width: e.right - e.left,
            height: e.bottom - e.top
        }));
        var f = window.SVGElement && c instanceof window.SVGElement,
            g = d ? {
                top: 0,
                left: 0
            } : f ? null : b.offset(),
            h = {
                scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
            },
            i = d ? {
                width: a(window).width(),
                height: a(window).height()
            } : null;
        return a.extend({}, e, h, i, g)
    }, c.prototype.getCalculatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return e;
        var f = this.options.viewport && this.options.viewport.padding || 0,
            g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll,
                i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
        } else {
            var j = b.left - f,
                k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k)
        }
        return e
    }, c.prototype.getTitle = function() {
        var a, b = this.$element,
            c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, c.prototype.getUID = function(a) {
        do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
        return a
    }, c.prototype.tip = function() {
        if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, c.prototype.enable = function() {
        this.enabled = !0
    }, c.prototype.disable = function() {
        this.enabled = !1
    }, c.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, c.prototype.toggle = function(b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, c.prototype.destroy = function() {
        var a = this;
        clearTimeout(this.timeout), this.hide(function() {
            a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null, a.$element = null
        })
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = d, this
    }
}(jQuery);

$('body').on('click', function (e) {
    $('[data-toggle=tooltip]').each(function () {
        // hide any open tooltip when the anywhere else in the body is clicked
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.tooltip').has(e.target).length === 0) {
            $(this).tooltip('hide');
        }
    });
});

/*----------------------- Tooltip - End -----------------------*/ 

//Search results data table 
$(document).ready(function() {
	$("#ti-samples-search-results").DataTable({
		searching: false, 
		info: false,
		paging:false,
		"columnDefs": [ {
			"targets": [1,8],
			"orderable": false
			} ]
	});
});
//Search results sorting
$(document).on('change','#samplesSearchPagingCombo',function(){
    var resultsCount = $("#samplesSearchPagingCombo").val();
    var searchUrl = $("#searchUrl").val();
    var currentPageNum = $("#currentPageNum").val();
    if (resultsCount != undefined && resultsCount != null) {
    	if(searchUrl.indexOf("univsample") > 0){
    		window.location.href = ACC.config.encodedContextPath+searchUrl+'?show=All&pageSize='+ resultsCount; 
    	}else{
    		window.location.href = ACC.config.encodedContextPath+searchUrl+'&show=All&pageSize='+ resultsCount; 
    	}
    	
    }
});
$('#target-modal-address-update').on('show.bs.modal', function () {
	validateZip();
	console.log("target-modal-address-update add-select-country-list-id = "+ $('#add-select-country-list-id').children(":selected").attr('value'));
	setTimeout(function(){
	if($('#add-select-country-list-id').children(":selected").attr('value')=='0'){
		 AddressBookCommonDisableTrue();
	 }else{
		 AddressBookCommonDisableFalse();
	 }
	 }, 500);
});
$('#target-modal-address-add').on('show.bs.modal', function () {
	setTimeout(function(){
		console.log("target-modal-address-add add-select-country-list-id = "+ $('#add-select-country-list-id').children(":selected").attr('value'));
	if($('#add-select-country-list-id').children(":selected").attr('value')=='0'){
		AddressBookCommonDisableTrue();
	 }else{
		 AddressBookCommonDisableFalse();
	 }
	}, 500);
});

/*------------ Shipping Address Book next Button Disable / Enable  **STARTS**  ------------*/
$(document).ready(function () {
	if($( ".nav-item" ).hasClass( "js-myaccount" ) == true){
		shippingAddressFormvalidation();
	}else{
		if(($('input[name="addressType"]:checked').val() =='Business') || ($('input[name="addressType"]:checked').val() == 'Other')){
			$('.radio-content').find('.error-text').css({
		         'display':'none',          
	      });
			if($('#select-country-list-id').children(":selected").attr('value') == '0' || $('#samples-select-country-list-id').children(":selected").attr('value') == '0'){
    			$('#select-country-list-id').parent('.form-group').find('.error-text').css({
    		    	'display':'inline',
    		    });
    			$('#samples-select-country-list-id').parent('.form-group').find('.error-text').css({
    		    	'display':'inline',
    		    });
    		}else{
    			$('#select-country-list-id').parent('.form-group').find('.error-text').css({
    		    	'display':'none',
    		    });
    			$('#samples-select-country-list-id').parent('.form-group').find('.error-text').css({
    		    	'display':'none',
    		    });
    			shippingAddressFormvalidation();
    		}
			
		}else{
			$('.radio-content').find('.error-text').css({
		         'display':'inline',          
	     });
		}
	}
	
});


$(document).ready(function(){
	$('#err_inv_title').hide();
	$('#firstName, #lastName,#line1,#line2,#paid-line1,#townCity,#companyName,#shipping_companyUrl,#taxId,#postcode,#phone,#email,#gstExemptCert,#pstExemptCert,#qstExemptCert').on('keyup', function(e) {
        if (e.which == 37 || e.which == 39 || e.which == 32)
            return false;
    });
});

// common Address Field validation
$(document).on('blur keyup','#firstName,#state-input,#lastName,#line1,#line2,#paid-line1,#townCity,#companyName,#shipping_companyUrl,#taxId,#postcode,#phone,#email,#gstExemptCert,#pstExemptCert,#qstExemptCert,#samples-addressType,#addressType,#middleName2,#saveInAddressBook,#select-state-list-id,#samples-select-state-list-id',function() {
	var isValid = true;
	var fieldPattern = /^[a-zA-z0-9\.\:\/\@\,\-\s\(\)\!\#\$\%\^\&\*\~\_]+$/;
	$(this).parent('.form-group').find('.error-text').css({
    	'display':'none',
    });
	$(this).parent('.form-group').find('.nonenglish-error-text').css({
    	'display':'none',
    });
  
    $(this).val(($(this).val()));
    
  //B2c paid shipping Optional address
    $("#paid-shipping-address-form .input-optional").each(function() {
		 if (($.trim($(this).val()) != '') && (!fieldPattern.test($(this).val())) && ($.trim($(this).attr("id")) != "billTo_phone") && ($.trim($(this).attr("id")) != "phone")) {
            isValid = false;
            $(this).closest(".form-group").find(".nonenglish-error-text").css({
            	'display':'inline',
            });
            $('#paid-shipping-address-select').attr('disabled', true);
        }else{
        	$(this).closest(".form-group").find(".nonenglish-error-text").css({
			    	'display':'none',
			    });
		 }
	});
    
  //B2C Samples Shipping Optional address
	$("#shipping-address-form .input-optional").each(function() {
		 if (($.trim($(this).val()) != '') && (!fieldPattern.test($(this).val()))) {
             isValid = false;
             $(this).closest(".form-group").find(".nonenglish-error-text").css({
             	'display':'inline',
             });
             $("#shipping-address-select").attr('disabled', true);
		 }else{
			 $(this).closest(".form-group").find(".nonenglish-error-text").css({
			    	'display':'none',
			    });
		 }
	});	
	
  //B2c paid shipping address
	$("#paid-shipping-address-form .input-required").each(function() {
		 if ($.trim($(this).val()) == '' && ($.trim($(this).attr("id")) != "postcode")) {
             isValid = false;
             $(this).closest(".form-group").find(".error-text").css({
             	'display':'inline',
             });
             $('#paid-shipping-address-select').attr('disabled', true);
         }else{
        	 $(this).closest(".form-group").find(".error-text").css({
			    	'display':'none',
			    });
		 }
	});
	
	//B2C Samples Shipping address
	$("#shipping-address-form .input-required").each(function() {
		 if ($.trim($(this).val()) == '' && ($.trim($(this).attr("id")) != "postcode")) {
             isValid = false;
             $(this).closest(".form-group").find(".error-text").css({
             	'display':'inline',
             });
             $("#shipping-address-select").attr('disabled', true);
		 	}else{
		 		$(this).closest(".form-group").find(".error-text").css({
				    	'display':'none',
				    });
			 }
	});	
	
	var isBillToValid=true;
	 if($('#different_billingAddress').val() == 'false'){
		 isBillToValid=billingAddressFormValidation();
	 }
	 var isAllGood =shippingAddressFormvalidation();
    if(isValid && isAllGood && isBillToValid){
    	$("#paid-shipping-address-select").removeAttr('disabled');
        $("#shipping-address-select").removeAttr('disabled');
    }
    else{
    	$("#paid-shipping-address-select").attr('disabled', true);
        $("#shipping-address-select").attr('disabled', true);
    }
    
   
});


// Billing Address Field validation
$(document).on('blur keyup','#billTo_firstName,#billTo-state-text-input,#billTo_companyUrl,#billTo_lastName,#billTo_line1,#billTo_line2,#billTo_townCity,#billTo_companyName,#billTo_postcode,#billTo_phone,#billTo_email,#billTo_middleName2,#billTo_saveInAddressBook,#paid_billing_address_list_id,#billTo-select-state-list-id',function(e) {
	if (e.which == 37 || e.which == 39 || e.which == 32){
        return false;
	}
	var fieldPattern = /^[a-zA-z0-9\.\:\/\@\,\-\s\(\)\!\#\$\%\^\&\*\~\_]+$/;
	var isValid = true;
	$(this).parent('.form-group').find('.error-text').css({
    	'display':'none',
    });
	$(this).parent('.form-group').find('.nonenglish-error-text').css({
    	'display':'none',
    });

	$(this).val($.trim($(this).val()));
    
  //B2c paid shipping Optional address
    $("#shipping_address_content .input-optional").each(function() {
    	$(this).parent('.form-group').find('.error-text').css({
        	'display':'none',
        });
    	$(this).parent('.form-group').find('.nonenglish-error-text').css({
        	'display':'none',
        });    	
    	if (($.trim($(this).val()) != '') && (!fieldPattern.test($(this).val()))) {
            isValid = false;
            $(this).closest(".form-group").find(".nonenglish-error-text").css({
            	'display':'inline',
            });
            $('#paid-shipping-address-select').attr('disabled', true);
        }else{
        	$(this).closest(".form-group").find(".nonenglish-error-text").css({
			    	'display':'none',
			    });
		 }
	});
    
  //B2c paid shipping address
	$("#shipping_address_content .input-required").each(function() {
		$(this).parent('.form-group').find('.error-text').css({
         	'display':'none',
         });
		$(this).parent('.form-group').find('.nonenglish-error-text').css({
         	'display':'none',
         });
		 if ($.trim($(this).val()) == '') {
			 $(this).parent('.form-group').find('.error-text').css({
		         	'display':'inline',
		      });
             isValid = false;
             $('#paid-shipping-address-select').attr('disabled', true);
         }else if(!fieldPattern.test($(this).val()) && ($.trim($(this).attr("id")) != "billTo_phone") && ($.trim($(this).attr("id")) != "phone")){
        	 isValid = false;
        	 $(this).parent('.form-group').find('.nonenglish-error-text').css({
             	'display':'inline',
             });
        	 $('#paid-shipping-address-select').attr('disabled', true);
         }
		 isPaid = true;
	});
	
	if(isValid){
		var isShipToValid=shippingAddressFormvalidation();
		var isBillToValid=billingAddressFormValidation();
		if(isBillToValid && isShipToValid){
			$("#paid-shipping-address-select").removeAttr('disabled');
		}else{
			$("#paid-shipping-address-select").attr('disabled', true);
		}
	}
	else{
    	$("#paid-shipping-address-select").attr('disabled', true);
        $("#shipping-address-select").attr('disabled', true);
	}
	
	//GSPE_OCB-4438
	//Validate Zip code when it is not empty and is being changed even if some required fields are not filled up
	if(e.target.id === 'billTo_postcode' && $.trim(e.target.value) != ''){
		validateBillToZip();
	}
    
});

// Address Book Blur Fields
$(document).on('blur','#ab_line2, #ab_companyUrl, #ab_taxId, #state-input',function() {
	var fieldPattern = /^[a-zA-z0-9\.\:\/\@\,\-\s\(\)\!\#\$\%\^\&\*\~\_]+$/;
	$(this).parent('.form-group').find('.nonenglish-error-text').css({
    	'display':'none',
    });
   if(($(this).val() != '') && (!fieldPattern.test($(this).val()))){
    	$(this).parent('.form-group').find('.nonenglish-error-text').css({
        	'display':'inline',
        });
    }
    $(this).val($.trim($(this).val()));
});

$(document).on('blur','#ab_firstName,#ab_lastName,#ab_line1,#ab_line2,#ab_line1,#ab_townCity,#ab_companyName,#postcode,#ab_phone,#ab_email,#ab_middleName2',function() {
	var fieldPattern = /^[a-zA-z0-9\.\:\/\@\,\-\s\(\)\!\#\$\%\^\&\*\~\_]+$/;
	var emailPattern = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,20}$/;
	 var phonePattern = /^[0-9xX+,;#.( )-]{10,25}$/;
	 if($.trim($(this).attr("id")) != "postcode"){
	$(this).parent('.form-group').find('.nonenglish-error-text').css({
    	'display':'none',
    });
	$(this).parent('.form-group').find('.error-text').css({
    	'display':'none',
    });
	 }
   if(($.trim($(this).val()) == '')){
    	$(this).parent('.form-group').find('.error-text').css({
        	'display':'inline',
        });
   }
    else if(($(this).val() != '') && ($.trim($(this).attr("id")) === "ab_phone") && !phonePattern.test($.trim($(this).val()))){
      	isValid = false;
        $(this).parent('.form-group').find('.nonenglish-error-text').css({
        	'display':'inline',
        });
    }else if(($(this).val() != '') && (!fieldPattern.test($(this).val()) && ($.trim($(this).attr("id")) != "ab_phone") && ($.trim($(this).attr("id")) != "ab_email") && ($.trim($(this).attr("id")) != "select-country-list-id"))){
    	$(this).parent('.form-group').find('.nonenglish-error-text').css({
        	'display':'inline',
        });
    }
    else if(($(this).val() != '') && ($.trim($(this).attr("id")) === "ab_email") && ($.trim($(this).attr("id")) != "ab_phone") && !emailPattern.test($.trim($(this).val()))){
      	isValid = false;
        $(this).parent('.form-group').find('.nonenglish-error-text').css({
        	'display':'inline',
        });
    }
   var country="";
   var countryadd = $('#add-select-country-list-id').children(":selected").attr('value');
   var SamplesCountry = $('#samples-select-country-list-id').children(":selected").attr('value');
   var PaidCountryIsoCode = $('#select-country-list-id').children(":selected").attr('value');
   if(SamplesCountry!=null && SamplesCountry!="0" && SamplesCountry !='undefined'){
   	 country= SamplesCountry;
   }else if(PaidCountryIsoCode!=null && PaidCountryIsoCode!="0" && PaidCountryIsoCode !='undefined'){
   	 country= PaidCountryIsoCode;
   }else{
   	 country = countryadd;
   }
   if(country!=""){
	   validateZip();
    }
    $(this).val($.trim($(this).val()));
});

//Validate ZipCode
function validateZip(){
                $('#postcode').parent('.form-group').find('.error-text').css({
                'display':'none',
      });
                $('#postcode').parent('.form-group').find('.nonenglish-error-text').css({
                'display':'none',
      });
                var patternVal=$('#zipCodeFormat').val();
                var zipVal = $('#postcode').val();
                if($('#postcode').hasClass('input-required')&& zipVal!='undefined' && patternVal!='undefined' && patternVal!=""){
                                var postCodePattern=new RegExp(patternVal.slice(1, -1));
                                var zipcodeVal=zipVal.toUpperCase();
                                if(!postCodePattern.test(zipcodeVal)){
                                                $('#postcode').parent('.form-group').find('.error-text').css({
                                                'display':'inline',
                                         });
                                                return false;
                                }else{
                                                $('#postcode').parent('.form-group').find('.error-text').css({
                                                'display':'none',
                                         });
                                                return true;
                                }
                }else{
                    $('#postcode').parent('.form-group').find('.error-text').css({
                        'display':'none',
                    });
                        return true; 
                }

}  

//Validate BillTo ZipCode
function validateBillToZip(){
                $('#billTo_postcode').parent('.form-group').find('.error-text').css({
                'display':'none',
      });
                $('#billTo_postcode').parent('.form-group').find('.nonenglish-error-text').css({
                'display':'none',
      });
                var patternVal=$('#billTo_zipCodeFormat').val();
                var zipVal = $('#billTo_postcode').val();
                
                if($('#billTo_postcode').hasClass('input-required')&& zipVal!='undefined' && patternVal!='undefined' && patternVal!=""){
                                var postCodePattern=new RegExp(patternVal.slice(1, -1));
                                var zipcodeVal=zipVal.toUpperCase();
                                if(!postCodePattern.test(zipcodeVal)){
                                                $('#billTo_postcode').parent('.form-group').find('.nonenglish-error-text').css({
                                                'display':'inline',
                                         });
                                                return false;
                                }else{
                                                $('#billTo_postcode').parent('.form-group').find('.nonenglish-error-text').css({
                                                'display':'none',
                                         });
                                                return true;
                                }
                }else{
                                $('#billTo_postcode').parent('.form-group').find('.nonenglish-error-text').css({
                                'display':'none',
                         });
                                return true;
                }

}  


//Validate paid Shipping address form
function shippingAddressFormvalidation(){
	var countryIsoCode = $('#select-country-list-id').children(":selected").attr('value');
	var isValid=true;
	var isSamples = false;
	var isPaid = false;
	var isValidateMiddleName2 = true;
	var fieldPattern = /^[a-zA-z0-9\.\:\/\@\,\-\s\(\)\!\#\$\%\^\&\*\~\_]+$/;
	setupPhoneEntryGroups();
	//Setting the error message for region and Country from LLC don't match
	if(validRegion()) {
		$('#region-err-txt').attr('style',"display:none;");
	}
	else{
		console.log("it is not valid region---for the given currency");
		var mismatchmessage1=$('#mismatchmessage1').val();
		var mismatchmessage2=$('#mismatchmessage2').val();
		var mismatchmessage3=$('#mismatchmessage3').val();
		var mismatchmessage4=$('#mismatchmessage4').val();
		if(mismatchmessage1 != undefined && mismatchmessage2 != undefined && mismatchmessage3 != undefined && mismatchmessage4 != undefined){
			var errormessage=mismatchmessage1.concat(mismatchmessage2,mismatchmessage3,mismatchmessage4);

		}
		var value=$('#currentCurrency').val();
		console.log("error is"+errormessage);
		if($('#currentLanguage').val() == 'en')
		{
			console.log("in en store");
			if(typeof _tiAnalyticsTrack === "function" && errormessage != undefined && errormessage != null){
				console.log("in en store in tiAnalyticsTrack for mismatch currency");

				_tiAnalyticsTrack("error",errormessage,"currency_new region_"+value);
			}
		}

		else{
			console.log("in zh store");
			if(typeof _tiAnalyticsTrack === "function" && errormessage != undefined && errormessage != null){
				console.log("in zh store in tiAnalyticsTrack for mismatch currency");
				_tiAnalyticsTrack("error",errormessage,"currency_new region_cn_"+value);
			}
		}

	}
	//B2c paid shipping address
	$("#shipping_address_content .input-required").each(function() {
			$(this).parent('.form-group').find('.error-text').css({
	         	'display':'none',
	         });
			$(this).parent('.form-group').find('.nonenglish-error-text').css({
	         	'display':'none',
	         });
		 if ($.trim($(this).val()) == '') {
			 $(this).parent('.form-group').find('.error-text').css({
		         	'display':'inline',
		      });
             isValid = false;
             $('#paid-shipping-address-select').attr('disabled', true);
         }else if((!fieldPattern.test($(this).val())) && ($.trim($(this).attr("id")) != "phone") && ($.trim($(this).attr("id")) != "postcode")){
        	 isValid = false;
        	 $(this).parent('.form-group').find('.nonenglish-error-text').css({
             	'display':'inline',
             });
        	 $('#paid-shipping-address-select').attr('disabled', true);
         }
		 isPaid = true;
	});
	
	//B2C Samples Shipping address
	$("#shipping-address-form .input-required").each(function() {
		$(this).parent('.form-group').find('.error-text').css({
         	'display':'none',
         });
		$(this).parent('.form-group').find('.nonenglish-error-text').css({
         	'display':'none',
         });
		 if ($.trim($(this).val()) == '') {
			 $(this).parent('.form-group').find('.error-text').css({
		         	'display':'inline',
		         });
             isValid = false;
             $("#shipping-address-select").attr('disabled', true);
         }else if(!fieldPattern.test($(this).val())  && ($.trim($(this).attr("id")) != "phone") && ($.trim($(this).attr("id")) != "postcode")){
        	 isValid = false;
        	 $(this).parent('.form-group').find('.nonenglish-error-text').css({
             	'display':'inline',
             });
        	 $("#shipping-address-select").attr('disabled', true);
         }
		 isSamples = true;
	});	
	if(isValid){
		 	isValidZip =validateZip();
			isValidPhone = validatePhone();
			isValidEmail = validateEmail();
			isValidTaxId = validateTaxId();
			isValidcompanyName = validatecompanyName();
			isValidcompanyUrl = validatecompanyUrl();
			isValidTaxExemption = validateTaxExemption();
			isValidTaxExemptCert = validateTaxExemptCertificate();
			isValidRegion = validRegion();
			isValidEuropeCountry = validEuropeCountry();
			saveInAddressBook = $("input[id='saveInAddressBook']:checked").val();
			if(saveInAddressBook){
				isValidateMiddleName2 = validateShippingMiddleName2();
			}
			if($( ".modal.fade" ).hasClass( "address-modal" ) == false){
				//Samples state field Validation
				if(isSamples){
					isValidState = validateSamplesState();
					isValidAddressType =validateAddressType();
				}
				//Paid state field Validation
				else{
					isValidState = validatePaidSate();
					isValidAddressType =validateAddressType();
				}
			}else{
				isValidState = validatePaidSate();
			}
			
			if(!isValidPhone || !isValidZip || !isValidEmail || !isValidTaxId || !isValidState || !isValidAddressType || !isValidateMiddleName2 || !isValidcompanyUrl || !isValidcompanyName || !isValidTaxExemption || !isValidTaxExemptCert || !isValidRegion || !isValidEuropeCountry){
				isValid = false;
			}
			if(!isValid){
				$("#shipping-address-select").attr('disabled', true);
		        $('#paid-shipping-address-select').attr('disabled',true);
		        isValid= false;
			}else if(isValid){
				$("#shipping-address-select").removeAttr('disabled');
		        $('#paid-shipping-address-select').removeAttr('disabled');
		        isValid= true;
			}
	}
	else{
		$("#shipping-address-select").attr('disabled', true);
		$('#paid-shipping-address-select').attr('disabled', true);
		 isValid=false;
	}
	return isValid;	
}

function validEuropeCountry(){
	
	if($('#js-tax-notification').css('display') == 'block'){		
			if($("input[id='checkEuropeanCountry']:checked").val() == "true"){
				return true;
			}
			else{
				return false;
			}
		}
	return true;
}
/*function vatInvoiceFormsvalidation(){
	var isValid=true;
	var isIndForm = true;
	var taxRegPattren= /^[a-zA-Z0-9]{0,20}$/;
	$(".invoice-company-form .input-required").each(function() {
	 if ($.trim($(this).val()) == '') {
		 $(this).parent('.form-group').find('.error-text').css({
	         	'display':'inline',
	      });
         isValid = false;
         $("#tax-invoice-submit").prop("disabled",true);
     }else if((!taxRegPattren.test($(this).val())) && ($.trim($(this).attr("id")) = "taxRegNo")){
    	 isValid = false;
    	 $(this).parent('.form-group').find('..error-text').css({
         	'display':'inline',
         });
    	 $("#tax-invoice-submit").prop("disabled",true);
     }
	 isIndForm = true;
});
}
*/

//Validate paid Billing address form
function billingAddressFormValidation(){	
	var isValid=true;
	var isValidateMiddleName2 = true;
	var fieldPattern = /^[a-zA-z0-9\.\:\/\@\,\-\s\(\)\!\#\$\%\^\&\*\~\_]+$/;
	setupPhoneEntryGroups();
	$("#billing_address_content .input-required").each(function() {
		$(this).parent('.form-group').find('.error-text').css({
         	'display':'none',
         });
		$(this).parent('.form-group').find('.nonenglish-error-text').css({
         	'display':'none',
         });
		 if ($.trim($(this).val()) == '') {
             isValid = false;
             $(this).parent('.form-group').find('.error-text').css({
             	'display':'inline',
             });
         }else if((!fieldPattern.test($(this).val()))  && ($.trim($(this).attr("id")) != "billTo_phone")){
        	 isValid = false;
        	 $(this).parent('.form-group').find('.nonenglish-error-text').css({
             	'display':'inline',
             });
         }
	});	

	if(isValid){
		isValidZip = validateBillToZip();
		isValidPhone = validatePhone();
		isValidEmail = validateBillToEmail();
		isValidTaxId = validateBillToTaxId();
		isValidState = validatePaidSate();
		saveInAddressBook = $("input[id='billTo_middleName2']:checked").val();
		if(saveInAddressBook){
			isValidateMiddleName2 = validateBillingMiddleName2();
		}
		if(!isValidPhone || !isValidZip || !isValidEmail || !isValidTaxId || !isValidState || !isValidateMiddleName2){
			isValid = false;
		}
		if(!isValid){
	        $('#paid-shipping-address-select').attr('disabled',true);
	        return isValid;
		}else if(isValid){
	        $('#paid-shipping-address-select').removeAttr('disabled');
	        return isValid;
		}
	}
	else{
		$('#paid-shipping-address-select').attr('disabled', true);
		return isValid;
	}
}

function validateShippingMiddleName2(){
	$('#middleName2').parent('.form-group').find('.error-text').css({
    	'display':'none',
    });
	$('#middleName2').parent('.form-group').find('.nonenglish-error-text').css({
    	'display':'none',
    });
	
	var isValid=true;
	var fieldPattern = /^[a-zA-z0-9\.\:\/\@\,\'\-\s\(\)\!\#\$\%\^\&\*\~\_]+$/;
	 if(!fieldPattern.test($('#middleName2').val())){
	    	$('#middleName2').parent('.form-group').find('.nonenglish-error-text').css({
	        	'display':'inline',
	        });
	    	isValid=false;
	  }
	  else {
    	$('#middleName2').parent('.form-group').find('.error-text').css({
        	'display':'none',
        });
    	$('#middleName2').parent('.form-group').find('.nonenglish-error-text').css({
        	'display':'none',
        });
    }
	 $('#middleName2').val(($('#middleName2').val()));
	return isValid;
}

function validateBillingMiddleName2(){
	$('#billTo_middleName2').parent('.form-group').find('.error-text').css({
    	'display':'none',
    });
	$('#billTo_middleName2').parent('.form-group').find('.nonenglish-error-text').css({
    	'display':'none',
    });
	
	var isValid=true;
	var fieldPattern = /^[a-zA-z0-9\.\:\/\@\,\'\-\s\(\)\!\#\$\%\^\&\*\~\_]+$/;
	 if(!fieldPattern.test($('#billTo_middleName2').val())){
	    	$('#billTo_middleName2').parent('.form-group').find('.nonenglish-error-text').css({
	        	'display':'inline',
	        });
	    	isValid=false;
	  }
	  else {
    	$('#billTo_middleName2').parent('.form-group').find('.error-text').css({
        	'display':'none',
        });
    	$('#billTo_middleName2').parent('.form-group').find('.nonenglish-error-text').css({
        	'display':'none',
        });
    }
	$('#billTo_middleName2').val($.trim($('#billTo_middleName2').val()));
	return isValid;
}

function validateAddressType(){
	var isValid = false;
	console.log("validateAddressType");
	$('.radio-content').parent('.form-group').find('.error-text').css({
    	'display':'none',
    });
	if(($('input[name="addressType"]:checked').val() =='Business') || ($('input[name="addressType"]:checked').val() == 'Other')){
		$('.radio-content').find('.error-text').css({
	         'display':'none',          
      });
		isValid = true;
	}else{
		console.log("in else of validateAddressType");
		$('.radio-content').find('.error-text').css({
	         'display':'inline',
       });
		 
	}
	return isValid;
}

//phone number validation
function validatePhone(){
	var isValid=true;

    $('.js-phone-entry--group').each(function () {
    	if(!validatePhoneEntryGroup($(this))){
    		isValid=false;
    	}
    });
	return isValid;
}
//Email Validation
function validateEmail(){
	$('#email').parent('.form-group').find('.error-text').css({
    	'display':'none',
    });
	$('#email').parent('.form-group').find('.nonenglish-error-text').css({
    	'display':'none',
    });
	
	var isValid=true;
	 var emailPattern = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,20}$/;
	 if(!emailPattern.test($('#email').val())){
	    	$('#email').parent('.form-group').find('.nonenglish-error-text').css({
	        	'display':'inline',
	        });
	    	isValid=false;
	  }
	  else {
    	$('#email').parent('.form-group').find('.error-text').css({
        	'display':'none',
        });
    	$('#email').parent('.form-group').find('.nonenglish-error-text').css({
        	'display':'none',
        });
    }
	$('#email').val($.trim($('#email').val()));
	return isValid;
}
//TaxId validation
function validateTaxId(){
	$("#taxId").parent('.form-group').find('.error-text').css({
    	'display':'none',
    });
	var isValid=true;
	if($("#taxId").is(":visible") && ($("#taxId").hasClass('input-required') && $.trim($("#taxId").val()) == '')){
		$("#taxId").parent('.form-group').find('.error-text').css({
        	'display':'inline',
        });
		isValid=false;	
	}else if(!$("#taxId").is(":visible") && !$("#taxId").hasClass('input-required')){
    	$("#taxId").parent('.form-group').find('.error-text').css({
        	'display':'none',
        });
    	isValid=true;
	}
	$("#taxId").val($.trim($("#taxId").val()));
	
	return isValid;
}
// Tax exemption validation
function validateTaxExemption(){
	
	var taxExemptionDisplay = $('#js-tax-exemption').css('display');
	if( (!taxExemptionDisplay) || (taxExemptionDisplay == 'none') ){
		return true;
	}
	
	$('#js-tax-exemption').find('.error-text').css('display', 'none');
	if (!$('input[name=isTaxExempt]:checked').val()){
		$('#js-tax-exemption').find('.error-text').css('display', 'inline');
		return false;
	}
	
	return true;
}

//Tax exemption certificate validation
function validateTaxExemptCertificate(){
	
	var taxExemptCertDisplay = $('#js-tax-cert-exemption').css('display');
	if( (!taxExemptCertDisplay) || (taxExemptCertDisplay == 'none') ){
		return true;
	}
	
	$('#js-tax-cert-exemption').find('.error-text').css('display', 'none');
	if (!$('input[name=isTaxCertExempt]:checked').val()){
		$('#js-tax-cert-exemption').find('.error-text').css('display', 'inline');
		return false;
	}
	return true;
}

// Paid State Validation
function validatePaidSate(){
	$('#select-country-list-id').parent('.form-group').find('.error-text').css({
    	'display':'none',
    });
	$('#select-state-list-id').parent('.form-group').find('.error-text').css({
    	'display':'none',
    });
	
	var isValid=true;
	 
	//shipping address country empty validation
	var country = $('#select-country-list-id').children(":selected").attr('value');
	if(country =='0' || country =='Select Region'){
		$('#select-country-list-id').parent('.form-group').find('.error-text').css({
        	'display':'inline',
        });
		isValid = false;
	}else{
		$('#select-country-list-id').parent('.form-group').find('.error-text').css({
        	'display':'none',
        });
	}
	//shipping address state validation
	if($('#state-select-box').css('display') == 'block'){
		   $('#select-state-list-id').removeAttr('disabled');
		   $('#state-input').attr('disabled','disabled');
	   		var countryIsoCode=$('#select-country-list-id').children(":selected").attr('value');
	   		if($('#regionMandatory').val() =='true'){
		       	state = $('#select-state-list-id').children(":selected").attr('value');
		       	if(state=='0'){
		       		$('#select-state-list-id').parent('.form-group').find('.error-text').css({
			        	'display':'inline',
			        });
		       		isValid=false;
	      	    }
	      	}
	   }
	
	if($('#different_billingAddress').val() == 'false'){
		
		$('#billing-select-country-list-id').parent('.form-group').find('.error-text').css({
        	'display':'none',
        });
		$('#billTo-select-state-list-id').parent('.form-group').find('.error-text').css({
        	'display':'none',
        });
		
		//billing address country empty validation
		country = $('#billing-select-country-list-id').children(":selected").attr('value');
		if(country =='0' || country =='Select Region'){
			$('#billing-select-country-list-id').parent('.form-group').find('.error-text').css({
	        	'display':'inline',
	        });
			isValid = false;
		}else{
			$('#billing-select-country-list-id').parent('.form-group').find('.error-text').css({
	        	'display':'none',
	        });
		}
		
		//billing address state validation
		if($('#billTo-state-select-box').css('display') == 'block'){
			 $('#billTo-select-state-list-id').removeAttr('disabled');
			   $('#billTo-state-text-input').attr('disabled','disabled');
		   		var countryIsoCode=$('#billing-select-country-list-id').children(':selected').attr('value');
		   		if($('#billingRegionMandatory').val() =='true'){
			       	state = $('#billTo-select-state-list-id').children(":selected").attr('value');
			       	if(state=='0'){
			       		$('#billTo-select-state-list-id').parent('.form-group').find('.error-text').css({
				        	'display':'inline',
				        });
			       		isValid=false;
		      	    }
		      	}
	  	}
	}
	return isValid;
}

// Samples State Validation
function validateSamplesState(){
	$('#samples-select-country-list-id').parent('.form-group').find('.error-text').css({
    	'display':'none',
    });
	$('#samples-select-state-list-id').parent('.form-group').find('.error-text').css({
    	'display':'none',
    });
	
	var isValid=true;
	 
	//shipping address country empty validation
	var country = $('#samples-select-country-list-id').children(":selected").attr('value');
	if(country =='0' || country =='Select Country/Region'){
		$('#samples-select-country-list-id').parent('.form-group').find('.error-text').css({
        	'display':'inline',
        });
		isValid = false;
	}else{
		$('#samples-select-country-list-id').parent('.form-group').find('.error-text').css({
        	'display':'none',
        });
	}
	//shipping address state validation
	if($('#state-select-box').css('display') == 'block'){
		   $('#samples-select-state-list-id').removeAttr('disabled');
		   $('#state-input').attr('disabled','disabled');
	   		var countryIsoCode=$('#samples-select-country-list-id').children(":selected").attr('value');
	   		if($('#regionMandatory').val() =='true'){
		       	state = $('#samples-select-state-list-id').children(":selected").attr('value');
		       	if(state=='0'){
		       		$('#samples-select-state-list-id').parent('.form-group').find('.error-text').css({
			        	'display':'inline',
			        });
		       		isValid=false;
	      	    }
	      	}
	   }
	return isValid;
}

// Billing Address Handeling

//Email Validation
function validateBillToEmail(){
	$('#billTo_email').parent('.form-group').find('.error-text').css({
    	'display':'none',
    });
	$('#billTo_email').parent('.form-group').find('.nonenglish-error-text').css({
    	'display':'none',
    });
	
	var isValid=true;
	 var emailPattern = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,20}$/;
	 if(!emailPattern.test($('#billTo_email').val())){
	    	$('#billTo_email').parent('.form-group').find('.nonenglish-error-text').css({
	        	'display':'inline',
	        });
	    	isValid=false;
	  }
	  else {
    	$('#billTo_email').parent('.form-group').find('.error-text').css({
        	'display':'none',
        });
    	$('#billTo_email').parent('.form-group').find('.nonenglish-error-text').css({
        	'display':'none',
        });
    }
	$('#billTo_email').val($.trim($('#billTo_email').val()));
	return isValid;
}
//TaxId validation
function validateBillToTaxId(){
	$("#billTo_taxId").parent('.form-group').find('.error-text').css({
    	'display':'none',
    });
	var isValid=true;
	if($("#billTo_taxId").is(":visible") && ($("#billTo_taxId").hasClass('input-required') && $.trim($('#billTo_taxId').val()) == '')){
		$("#billTo_taxId").parent('.form-group').find('.error-text').css({
        	'display':'inline',
        });
		isValid=false;	
	}else if(!$("#billTo_taxId").is(":visible") && !$("#billTo_taxId").hasClass('input-required')){
    	$("#billTo_taxId").parent('.form-group').find('.error-text').css({
        	'display':'none',
        });
    	isValid=true;
	}
	$("#billTo_taxId").val($.trim($("#billTo_taxId").val()));
	
	return isValid;
}


function validateForm(){
isValidPhone = validatePhone();
	if (
		$.trim($('#firstName').val()) != '' && 
		($("input[name='addressType']:checked").val() == "Business" || $("input[name='addressType']:checked").val() == "Other") &&
		$('#select-country-list-id').children(":selected").attr('value') != '0' && $('#samples-select-country-list-id').children(":selected").attr('value') != '0'&&
		((typeof $('#line1').val() == "undefined") && ($('#paid-line1').val().length > 0 ) || (typeof $('#paid-line1').val() == "undefined") && ($('#line1').val().length > 0 )) &&
		$.trim($('#lastName').val()) != '' &&
		$.trim($('#townCity').val()) != '' && 
		$.trim($('#companyName').val()) != '' && 
		$.trim($('#shipping_companyUrl').val()) != '' &&
		(!$("#taxId").is(":visible") || ($("#taxId").hasClass('input-required') && $.trim($('#taxId').val()) != '') || (!$("#taxId").hasClass('input-required') && $("#taxId").is(":visible")))&& 
		$.trim($('#phoneNumber').val()) != '' && isValidPhone &&
		$.trim($('#email').val()) != '') {
		//checkZip();
		//state field validation	
		 if($('#state-select-box').css('display') == 'block'){
			   $('#select-state-list-id').removeAttr('disabled');
			   $('#state-input').attr('disabled','disabled');
		   		var countryIsoCode=$('#select-country-list-id').children(":selected").val();
		   		if($('#regionMandatory').val() =='true'){
			       	state = $('#select-state-list-id').children(":selected").attr('value');
			       	if(state=='0'){
			       		$("#shipping-address-select").attr('disabled', true);
			            $('#paid-shipping-address-select').attr('disabled',true);
		      	    }else{
		      	       $("#shipping-address-select").removeAttr('disabled');
		 		       $('#paid-shipping-address-select').removeAttr('disabled');
		      	    }
		      	}else{
		      		$("#shipping-address-select").removeAttr('disabled');
				    $('#paid-shipping-address-select').removeAttr('disabled');
		      	}
		   }else{
			   $("#shipping-address-select").removeAttr('disabled');
		       $('#paid-shipping-address-select').removeAttr('disabled');
		   }
    } else {
        $("#shipping-address-select").attr('disabled', true);
        $('#paid-shipping-address-select').attr('disabled',true);
        
    }
}
	    
/*//Order Confirmation page Details
$(document).ready(function(){
	var previousPageUrl = document.referrer;
	if(previousPageUrl.match("order-conf")){
	// Disabling -->  browser Back Button
	history.pushState(null, null, null);
	window.onpopstate = function () {
	    history.go(1);
	};
	}
});	 */   
	    
/*------------ Shipping Address Book next Button Disable / Enable  **END**  ------------*/

$(document).on('click','.js-ti-mini-cart-close-button', function(e) {
	var currentUrl = window.location.href;
	var orderConfUrl = '/order-conf/';
	if(currentUrl.indexOf(orderConfUrl) >= 0){
		window.location = ACC.config.encodedContextPath;
	}else {
		window.location = currentUrl;
	}
});
//validation companyName
function validatecompanyName(){
$('#companyName').parent('.form-group').find('.nonenglish-error-text').css({
	'display':'none',
});
var letters = /[a-zA-Z]/g;
	var companyName = $('#companyName').val();
	 if (typeof companyName == 'undefined') {
		 companyName = '';
	    }
	var isValid=true;
	var count = (companyName.match(letters) || []).length;
	if (companyName.length < 2 || count < 2) {
		$('#companyName').parent('.form-group').find('.error-text').css({
		        	'display':'inline',
		        });
		    	isValid = false;

	}else{
		$('#companyName').parent('.form-group').find('.nonenglish-error-text').css({
	    	'display':'none',
	    });
	}
$('#isValid').val($.trim($('#isValid').val()));
return isValid;
}
//validation companyUrl
function validatecompanyUrl(){
$('#shipping_companyUrl').parent('.form-group').find('.nonenglish-error-text').css({
	'display':'none',
});
var urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/HTTP:\/\/WWW\.|HTTPS:\/\/WWW\.|HTTP:\/\/|HTTPS:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{1,10}(:[0-9]{1,5})?(\/.*)?$/;
var companyUrl = $('#shipping_companyUrl').val();
if (typeof companyUrl == 'undefined') {
	companyUrl = '';
   }
var isValid=true;
if (companyUrl == "") {
  	$('#shipping_companyUrl').parent('.form-group').find('.error-text').css({
      	'display':'inline',
      });
  	isValid = false;
  } 
  if(!urlPattern.test(companyUrl) && companyUrl.toLowerCase() != 'none'){
  	$('#shipping_companyUrl').parent('.form-group').find('.nonenglish-error-text').css({
      	'display':'inline',
      });
  	isValid = false;
  }else{
  	$('#shipping_companyUrl').parent('.form-group').find('.nonenglish-error-text').css({
      	'display':'none',
      });
  	isValid = true;
  }
$('#isValid').val($.trim($('#isValid').val()));
return isValid;
}

//setup all phone fields in a group
function setupPhoneEntryGroup(phoneEntryGroupElement){
		phoneEntryGroupElement.find('.error-text').css({
	    	'display':'none',
	    });
		var phoneCountryCodeSelectedElement = phoneEntryGroupElement.find('.js-phone-entry--countrycode').children(":selected");
        var phoneCountryCode = phoneCountryCodeSelectedElement.val();
        var mobile = phoneEntryGroupElement.find('.js-phone-entry--ismobile').is(":checked");
        if(mobile==true){
        	phoneEntryGroupElement.find('.js-phone-entry--extension').css({'display':'none',
            });
        }else{
        	phoneEntryGroupElement.find('.js-phone-entry--extension').css({'display':'inline',
            });        	
        }
        
        if(phoneCountryCode == 0 || (typeof phoneCountryCode === "undefined")){
        	return;
        }
        var index = phoneCountryCode.indexOf("-");
        if(index > 0){
        	phoneCountryCode = phoneCountryCode.substring(0,index);
        }
        var countryCodeText = phoneCountryCodeSelectedElement.attr("display-text");
        phoneCountryCodeSelectedElement.text(countryCodeText);
        	
       
        var phoneNumberElement = phoneEntryGroupElement.find('.js-phone-entry--number');
        var exampleNumber = PhoneUtil.getExampleNumber(phoneCountryCode, mobile);
        
        phoneNumberElement.val(PhoneUtil.formatNumberInput(phoneCountryCode, mobile, phoneNumberElement.val(), false));
        phoneNumberElement.attr('placeholder',exampleNumber);
        phoneNumberElement.attr('maxlength',18);
        phoneNumberElement.attr('minlength',1);
        
}

//enable/disable all phone fields in a group
function disablePhoneEntryGroup(phoneEntryGroupElement, flag){
	phoneEntryGroupElement.find('.js-phone-entry--ismobile').attr('disabled', flag);
	phoneEntryGroupElement.find('.js-phone-entry--countrycode').attr('disabled', flag);
	phoneEntryGroupElement.find('.js-phone-entry--number').attr('disabled', flag);
	phoneEntryGroupElement.find('.js-phone-entry--extension').attr('disabled', flag);
	
	if(flag){
		// hide error messages when the fields are disabled
		phoneEntryGroupElement.find('.error-text').css({
	    	'display':'none',
	    });
	}
}

//validate all phone fields in a group
function validatePhoneEntryGroup(phoneEntryGroupElement){
	
	setupPhoneEntryGroup(phoneEntryGroupElement);

	// validate country code 
	var phoneCountryCode = phoneEntryGroupElement.find('.js-phone-entry--countrycode').children(":selected").val();
	if(phoneCountryCode == 0){
		console.log("country code error");
    	phoneEntryGroupElement.find('.js-phone-error--countrycode').css({
        	'display':'inline',
        });
    	return false;		
	}
	
	// validate number
	var phoneNumberValue = phoneEntryGroupElement.find('.js-phone-entry--number').val();
	var phoneNumberMaxLength = phoneEntryGroupElement.find('.js-phone-entry--number').attr('maxlength');
	var phoneNumberMinLength = phoneEntryGroupElement.find('.js-phone-entry--number').attr('minlength');
	if(phoneNumberMaxLength<phoneNumberValue.length || phoneNumberMinLength>phoneNumberValue.length){
    	console.log("phone number error " + phoneNumberMinLength + " " +  phoneNumberValue.length + " " + phoneNumberMaxLength);
		phoneEntryGroupElement.find('.js-phone-error--number').css({
        	'display':'inline',
        });
    	return false;		
	}	
	
	// validate extension
	var phoneExtensionPattern = /^[0-9-]{0,6}$/;
	var extensionValue = phoneEntryGroupElement.find('.js-phone-entry--extension').val().trim();
	if(extensionValue.length == 0){
		extensionValue = "0";
	}
	if(!phoneExtensionPattern.test(extensionValue)){
		console.log("phone extension error");
    	phoneEntryGroupElement.find('.js-phone-error--extension').css({
        	'display':'inline',
        });
    	return false;		
	}
	
	return true;
}

// setup all phone fields group
function setupPhoneEntryGroups(){
    $('.js-phone-entry--group').each(function () {
    	setupPhoneEntryGroup($(this));
    });
}

$(document).on('change','.js-phone-entry--countrycode,.js-phone-entry--ismobile,.js-phone-entry--number,.js-phone-entry--extension',function() {
	validatePhoneEntryGroup($(this).closest('.js-phone-entry--group'));
	shippingAddressFormvalidation();
	if($('#different_billingAddress').val() == 'false'){
		 billingAddressFormValidation();
	 }
});

$(document).on('mouseover','.js-phone-entry--countrycode',function() {
	$(this).find('option').each(function (){
		$(this).text($(this).attr("dropdown-text"));
	});
});

$(document).on('blur','.js-phone-entry--countrycode',function() {
	var phoneCountryCodeSelectedElement = $(this).children(":selected");
    phoneCountryCodeSelectedElement.text(phoneCountryCodeSelectedElement.attr("display-text"));
});


/* --------- Address Book fields disabled- Start ------------------*/
$(document).on('change','#add-select-country-list-id',function(e) {
	console.log("add-select-country-list-id = "+ $('#add-select-country-list-id').children(":selected").attr('value'));
	 if($('#add-select-country-list-id').children(":selected").attr('value')=='0'){
		 AddressBookCommonDisableTrue();
	 }else{
		 AddressBookCommonDisableFalse();
	 }
});

$(document).on('change','#billing-select-country-list-id',function(e) {
	console.log("billing-select-country-list-id = "+ $('#billing-select-country-list-id').children(":selected").attr('value'));
	 if($('#billing-select-country-list-id').children(":selected").attr('value')=='0' || $('#billing-select-country-list-id').children(":selected").attr('value') == undefined){
		 checkoutBillingAddressCommonDisableTrue();
	 }else{
		 checkoutBillingAddressCommonDisableFalse();
//		 $("#paid_billing_address_list_id").attr('disabled', false);
	 }
});


$(document).ready(function(){
	validateAddressType();
});
$(document).on('change','#addressType',function(e) {
	console.log("addressType change ");
	if($('input[name="addressType"]:checked').val() == ''){
		$('.radio-content').find('.error-text').css({
	         'display':'inline',          
		});
		checkoutShippingAddressCommonDisableTrue();
	}else{
		$('.radio-content').find('.error-text').css({
	         'display':'none',          
    });
		$("#select-country-list-id").attr('disabled', false);
		if($('#select-country-list-id').children(":selected").attr('value') == '0'){
			checkoutShippingAddressCommonDisableTrue(); 
		}else{
			checkoutShippingAddressCommonDisableFalse();
			if ($('#js-different-billing-address').val()=='on'){
				differentbillingaddress();
			}
		}
	}		
});
$(document).on('change','#samples-addressType',function(e) {
	if($('input[name="addressType"]:checked').val() == ''){
		$('.radio-content').find('.error-text').css({
	         'display':'inline',          
		});
		checkoutShippingAddressCommonDisableTrue();
	}else{
		$('.radio-content').find('.error-text').css({
	         'display':'none',          
    });
		$("#samples-select-country-list-id").attr('disabled', false);
		if($('#samples-select-country-list-id').children(":selected").attr('value') == '0'){
			checkoutShippingAddressCommonDisableTrue(); 
		}else{
			checkoutShippingAddressCommonDisableFalse();
		}
		
	}		
});
$(document).on('change','#checkEuropeanCountry',function() {
	
	shippingAddressFormvalidation();
	if($('#different_billingAddress').val() == 'false'){
		 billingAddressFormValidation();
	 }
});

$(document).on('change','#select-country-list-id',function(e) {
	var addressType = $("input[name=addressType]:checked").val();
	console.log("select-country-list-id = "+ $('#select-country-list-id').children(":selected").attr('value'));
	var countryIsoCode = $('#select-country-list-id').children(":selected").attr('value');
	
	
	if(addressType == 'Other'){
		checkEUCountry(countryIsoCode);
}
	 if($('#select-country-list-id').children(":selected").attr('value')=='0'){
		 $("#firstName").attr('disabled', true);
		 $("#lastName").attr('disabled', true);
		 $("#paid-line1").attr('disabled', true);
		 $("#line2").attr('disabled', true);
		 $("#townCity").attr('disabled', true);
		 $("#postcode").attr('disabled', true);
		 $("#state-input").attr('disabled', true);
		 $("#select-state-list-id").attr('disabled', true);
		 $("#companyName").attr('disabled', true);
		 $("#shipping_companyUrl").attr('disabled', true);
		 $("#taxId").attr('disabled', true);
		 disablePhoneEntryGroup($("#shipping_phoneEntryGroup"), true);
		 $("#email").attr('disabled', true);
		 $("#js-same-shipping-address").attr('disabled', true);
		 $("#js-different-billing-address").attr('disabled', true);
	 }else{
		 $("#firstName").attr('disabled', false);
		 $("#lastName").attr('disabled', false);
		 $("#paid-line1").attr('disabled', false);
		 $("#line2").attr('disabled', false);
		 $("#townCity").attr('disabled', false);
		 $("#postcode").attr('disabled', false);
		 if($('#select-country-list-id').children(":selected").attr('value')=='HK'){
			 var countryName=$('#select-country-list-id').children(":selected").text();
			 $("#townCity").val(countryName);
			 $("#townCity").prop("readonly",true);
		 }
		 if($('#tiB2CPaidShippingAddressCheckoutRegionsBoxEnable').val() == 'true'){
			 $("#select-state-list-id").attr('disabled', false);
			 $("#state-input").attr('disabled', true);
		 }else{
			 $("#select-state-list-id").attr('disabled', true);
			 $("#state-input").attr('disabled', false);
		 }
		 $("#companyName").attr('disabled', false);
		 $("#shipping_companyUrl").attr('disabled', false);
		 $("#taxId").attr('disabled', false);
		 disablePhoneEntryGroup($("#shipping_phoneEntryGroup"), false);
		 $("#email").attr('disabled', false);
		 $("#js-same-shipping-address").attr('disabled', false);
		 $("#js-different-billing-address").attr('disabled', false);
	 }
});

$(document).on('change','#js-different-billing-address',function(e) {
	differentbillingaddress();
});

function differentbillingaddress(){
	console.log("js-different-billing-address = "+ $('#js-different-billing-address').val());
	setTimeout(function(){
	 if($('#js-different-billing-address').val()=='on'){
		 if($('#billing-select-country-list-id').children(":selected").attr('value')=='0' || $('#billing-select-country-list-id').children(":selected").attr('value') == undefined){
			 checkoutBillingAddressCommonDisableTrue();
		 }else{
			 checkoutBillingAddressCommonDisableFalse();
		 }
	 }else{
		 checkoutBillingAddressCommonDisableTrue();
	 }
	 }, 500);
}

function checkoutShippingAddressCommonDisableTrue(){
//	$("#samples-select-country-list-id").attr('disabled', true);
//	$("#select-country-list-id").attr('disabled', true);
	 $("#samples-address-list-id").attr('disabled', true);
	 $("#paid-address-list-id").attr('disabled', true);
	 $("#firstName").attr('disabled', true);
	 $("#lastName").attr('disabled', true);
	 $("#line1").attr('disabled', true);
	 $("#paid-line1").attr('disabled', true);
	 $("#line2").attr('disabled', true);
	 $("#townCity").attr('disabled', true);
	 $("#samples-select-state-list-id").attr('disabled', true);
	 $("#select-state-list-id").attr('disabled', true);
	 $("#state-input").attr('disabled', true);
	 $("#postcode").attr('disabled', true);
	 $("#companyName").attr('disabled', true);
	 $("#shipping_companyUrl").attr('disabled', true);
	 disablePhoneEntryGroup($("#shipping_phoneEntryGroup"), true);
	 $("#email").attr('disabled', true);
	 $("#saveInAddressBook").attr('disabled', true);
	 $("#js-same-shipping-address").attr('disabled', true);
	 $("#js-different-billing-address").attr('disabled', true);
}
function checkoutShippingAddressCommonDisableFalse(){
//	 $("#samples-select-country-list-id").attr('disabled', false);
//	 $("#select-country-list-id").attr('disabled', false);
	 $("#samples-address-list-id").attr('disabled', false);
	 $("#paid-address-list-id").attr('disabled', false);
	 $("#firstName").attr('disabled', false);
	 $("#lastName").attr('disabled', false);
	 $("#line1").attr('disabled', false);
	 $("#paid-line1").attr('disabled', false);
	 $("#line2").attr('disabled', false);
	 $("#townCity").attr('disabled', false);
	 if($('#samples-select-country-list-id').children(":selected").attr('value')=='HK'){
		 var countryName=$('#samples-select-country-list-id').children(":selected").text();
		 $("#townCity").val(countryName);
		 $("#townCity").prop("readonly",true);
	 }
	 if($('#select-country-list-id').children(":selected").attr('value')=='HK'){
         var countryName=$('#select-country-list-id').children(":selected").text();
         $("#townCity").val(countryName);
         $("#townCity").prop("readonly",true);
     }
	 if($('#tiB2CPaidShippingAddressCheckoutRegionsBoxEnable').val() == 'true'){
		 $("#select-state-list-id").attr('disabled', false);
		 $("#state-input").attr('disabled', true);
	 }
	 if($('#tiB2CPaidShippingAddressCheckoutRegionsBoxEnable').val() == undefined || $('#tiB2CSamplesShippingAddressCheckoutRegionsBoxEnable').val() == undefined){
		 if($('#tiB2CPaidShippingAddressCheckoutRegionsBoxEnable').val() != 'true' && $('#tiB2CSamplesShippingAddressCheckoutRegionsBoxEnable').val() != 'true'){
			 $("#select-state-list-id").attr('disabled', true);
			 $("#samples-select-state-list-id").attr('disabled', true);
			 $("#state-input").attr('disabled', false);
		 }
	 }
	 if($('#tiB2CSamplesShippingAddressCheckoutRegionsBoxEnable').val() == 'true'){
		 $("#samples-select-state-list-id").attr('disabled', false);
		 $("#state-input").attr('disabled', true);
	 }
	 $("#postcode").attr('disabled', false);
	 $("#companyName").attr('disabled', false);
	 $("#shipping_companyUrl").attr('disabled', false);
	 disablePhoneEntryGroup($("#shipping_phoneEntryGroup"), false);
	 $("#email").attr('disabled', false);
	 console.log("$('#paidShippingAddressIsFromSaml').val() " + $('#paidShippingAddressIsFromSaml').val());
	 if($('#paidShippingAddressIsFromSaml').val() == 'Y'){
		 $("#saveInAddressBook").attr('disabled', true);
	 }else{
		 $("#saveInAddressBook").attr('disabled', false);
	 }
	 $("#js-same-shipping-address").attr('disabled', false);
	 $("#js-different-billing-address").attr('disabled', false);
}

function checkoutBillingAddressCommonDisableTrue(){
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
	 disablePhoneEntryGroup($("#billTo_phoneEntryGroup"), true);
	 $("#billTo_email").attr('disabled', true);
	 $("#billTo_saveInAddressBook").attr('disabled', true);
}
function checkoutBillingAddressCommonDisableFalse(){
	 $("#paid_billing_address_list_id").attr('disabled', false);
	 $("#billTo_firstName").attr('disabled', false);
	 $("#billTo_lastName").attr('disabled', false);
	 $("#billTo_line1").attr('disabled', false);
	 $("#billTo_line2").attr('disabled', false);
	 $("#billTo_townCity").attr('disabled', false);
	 if($('#billing-select-country-list-id').children(":selected").attr('value')=='HK'){
		 var countryName=$('#billing-select-country-list-id').children(":selected").text();
		 $("#billTo_townCity").val(countryName);
		 $("#billTo_townCity").prop("readonly",true);
	 }
	 if($('#tiB2CBillingAddressCheckoutRegionsBoxEnable').val() == 'true'){
		 $("#billTo-select-state-list-id").attr('disabled', false);
		 $("#billTo-state-text-input.form-control.state.input-optional").attr('disabled', true);
	 }else{
       if($('#billTo-state-select-box').css('display') != 'block'){
		 $("#billTo-select-state-list-id").attr('disabled', true);
		 $("#billTo-state-text-input.form-control.state.input-optional").attr('disabled', false);
       }
	 }
	 $("#billTo_postcode").attr('disabled', false);
	 $("#billTo_companyName").attr('disabled', false);
	 $("#billTo_companyUrl").attr('disabled', false);
	 disablePhoneEntryGroup($("#billTo_phoneEntryGroup"), false);
	 $("#billTo_email").attr('disabled', false);
	 if($('#paidBillingAddressIsFromSaml').val() == 'Y'){
		 $("#billTo_saveInAddressBook").attr('disabled', true);
	 }else{
		 $("#billTo_saveInAddressBook").attr('disabled', false);
	 }
}
function AddressBookCommonDisableTrue(){
	 $("#ab_firstName").attr('disabled', true);
	 $("#ab_lastName").attr('disabled', true);
	 $("#ab_line1").attr('disabled', true);
	 $("#ab_line2").attr('disabled', true);
	 $("#ab_townCity").attr('disabled', true);
	 $("#postcode").attr('disabled', true);
	 $("#state-input").attr('disabled', true);
	 $("#ab_companyName").attr('disabled', true);
	 $("#ab_companyUrl").attr('disabled', true);
	 $("#ab_taxId").attr('disabled', true);
	 disablePhoneEntryGroup($("#ab_phoneEntryGroup"), true);
	 $("#ab_email").attr('disabled', true);
}
function AddressBookCommonDisableFalse(){
	$("#ab_firstName").attr('disabled', false);
	 $("#ab_lastName").attr('disabled', false);
	 $("#ab_line1").attr('disabled', false);
	 $("#ab_line2").attr('disabled', false);
	 $("#ab_townCity").attr('disabled', false);
	 $("#postcode").attr('disabled', false);
	 console.log("addressBookRegionsBoxEnable = "+ $('#addressBookRegionsBoxEnable').val());
	 if($('#addressBookRegionsBoxEnable').val() == 'true'){
		 $("#select-state-list-id").attr('disabled', false);
		 $("#state-input").attr('disabled', true);
	 }else{
		 $("#select-state-list-id").attr('disabled', true);
		 $("#state-input").attr('disabled', false);
	 }
	 $("#ab_companyName").attr('disabled', false);
	 $("#ab_companyUrl").attr('disabled', false);
	 $("#ab_taxId").attr('disabled', false);
	 disablePhoneEntryGroup($("#ab_phoneEntryGroup"), false);
	 $("#ab_email").attr('disabled', false);
}

$(document).ready(function(){
$('form').each(function(){
		console.log("Form ID's Found at page" + $(this).attr('id')); // or simple this.id
   if($(this).attr('id') == "paid-shipping-address-form" || $(this).attr('id') == "shipping-address-form"){
	if(($('input[name="addressType"]:checked').val() =='Business') || ($('input[name="addressType"]:checked').val() == 'Other')){
		$('.radio-content').find('.error-text').css({
	         'display':'none',          
		});
		$("#samples-select-country-list-id").attr('disabled', false);
		$("#select-country-list-id").attr('disabled', false);
		if($('#select-country-list-id').children(":selected").attr('value') == '0' || $('#samples-select-country-list-id').children(":selected").attr('value') == '0'){
			$('#select-country-list-id').parent('.form-group').find('.error-text').css({
		    	'display':'inline',
		    });
			$('#samples-select-country-list-id').parent('.form-group').find('.error-text').css({
		    	'display':'inline',
		    });
			checkoutShippingAddressCommonDisableTrue(); 
		}else{
			$('#select-country-list-id').parent('.form-group').find('.error-text').css({
		    	'display':'none',
		    });
			$('#samples-select-country-list-id').parent('.form-group').find('.error-text').css({
		    	'display':'none',
		    });
			checkoutShippingAddressCommonDisableFalse();
		}
		if ($('#js-different-billing-address').val()=='on'){
		differentbillingaddress();
		}
	}else{
		$("#billing-select-country-list-id").attr('disabled', true);
		$("#samples-select-country-list-id").attr('disabled', true);
		$("#select-country-list-id").attr('disabled', true);
		$('.radio-content').find('.error-text').css({
	         'display':'inline',          
       });
		checkoutShippingAddressCommonDisableTrue(); 
		checkoutBillingAddressCommonDisableTrue();
    	}
        }
    })
	
//	alert($('#js-different-billing-address').val());
//	if ($('#js-different-billing-address').val()=='on'){
//		differentbillingaddress();
//	}

});

function validRegion() {
	var addEditAddressBook = $('#addEditAddressBook');
	if(null!=addEditAddressBook && addEditAddressBook.val() =='true'){
		return true;
	} else {
		var currentCountryCode = null;
		if(null!= document.getElementById('currentCountryCode')){
			currentCountryCode = document.getElementById('currentCountryCode').value;
		}
		var llcCurrencyCode = null;
		if(null!=document.getElementById('currentCurrencyIsoCode')){
			llcCurrencyCode = document.getElementById('currentCurrencyIsoCode').value;
		}
				
		var countryIsoCode = $('#select-country-list-id').children(":selected").attr('value');
		var supportedCountriesMap=$('#supportedCountriesForCurrency').val();
		var supportedCountries = currentCountryCode ;
		if(supportedCountriesMap != undefined && supportedCountriesMap != null)
			{
			supportedCountriesMap = JSON.parse(supportedCountriesMap);
			supportedCountries = supportedCountriesMap["supportedCountriesForCurrency"];
			}
		var flag = false;
		
		if(supportedCountries != null && supportedCountries != undefined){     
		if(supportedCountries.indexOf(countryIsoCode) !== -1) {  
			console.log("Country is valid ");
			flag = true; 
		}
		else {
			$("#paid-address-list-id").attr('disabled', true);
			$("#firstName").attr('disabled', true);
			$("#lastName").attr('disabled', true);
			$("#paid-line1").attr('disabled', true);
			$("#line2").attr('disabled', true);
			$("#townCity").prop("readonly",true);
			$("#postcode").attr('disabled', true);
			$("#state-input").attr('disabled', true);
			$("#select-state-list-id").attr('disabled', true);
			$("#companyName").attr('disabled', true);
			$("#shipping_companyUrl").attr('disabled', true);
			$("#taxId").attr('disabled', true);
			disablePhoneEntryGroup($("#shipping_phoneEntryGroup"), true);
			$("#email").attr('disabled', true);
			$("#js-same-shipping-address").attr('disabled', true);
			$("#js-different-billing-address").attr('disabled', true);
		}
		return flag;
		}
		else{
			return true;
		}
	}
	return false;
}





$(document).ready(function() {
	if($("#isExgUpdate").val() == 'true' )  {
	console.log("isExgUpdate is true  for GA analytics");
		var value=$('#currentCurrency').val();
		var errormessage=$('#exchangemessage').val();
		console.log("error is -----------"+errormessage );
		console.log("value is "+value);
		if($('#currentLanguage').val() == 'en')
		{
			console.log("in en store");
			if(typeof _tiAnalyticsTrack === "function"  && errormessage != undefined && errormessage != null){
				console.log("in en store in tiAnalyticsTrack");
				_tiAnalyticsTrack("error",errormessage,"currency_rate change_"+value);
			}


		}
		else{
			console.log("in zh store");
			if(typeof _tiAnalyticsTrack === "function" && errormessage != undefined && errormessage != null	){
				console.log("in zh store in tiAnalyticsTrack");
				_tiAnalyticsTrack("error",errormessage,"currency_rate change_cn_"+value);
			}
		}
	}
	
	if($("#isSaveCartAPIErrors").val() == 'true' ){
		console.log("save cart api has error");
		saveCartAPIErrors();	
		
	}
	if($("#isSaveCartAPIDown").val() == 'true'){
		console.log("save cart api is down");
		saveCartAPIDown();	
		
	}
	if($("#cfaAPIDownGA").val() == 'true'){
		console.log("cfa-api is down");
		cfaAPIDownGA();	
		
	}
	if($("#favAccGA").val() == 'true'){
		console.log("favAccGA is true");
		favAccMsgGA();	
		
	}
	if($("#freeShippingErrGA").val() == 'true'){
		console.log("freeShippingErrGA warning");
		freeShippingErrGA();	
		
	}
	
	if($("#isSaveCartAPIErrorsForOrderSummary").val() == 'true' ){
		console.log("save cart api has error for order summary page");
		var CartAPIMessage=$('#saveCartAPIMessage').val();
		var entryWithNoInventory=$('#entryWithNoInventory').val();
	if(CartAPIMessage != undefined && entryWithNoInventory !=undefined){
		var saveCartAPIMessage=CartAPIMessage.concat(entryWithNoInventory);
		console.log("error mesage is"+saveCartAPIMessage);
		}
	if($('#currentLanguage').val() == 'en')
		{
			checkGATrackFunction(saveCartAPIMessage,"cr_place_order",0);
		}
		
		else{
			checkGATrackFunction(saveCartAPIMessage,"cr_place_order_cn",0);
		}

			
		
	}
	if($("#isSaveCartAPIDownForOrderSummary").val() == 'true'){
		console.log("save cart api is down for order summary page");
	
	var CartAPIMessage=$('#saveCartAPIMessage').val();
	var tapeAndReelEntries=$('#tapeAndReelEntries').val();
	if(CartAPIMessage != undefined && tapeAndReelEntries !=undefined){
		var saveCartAPIMessage=CartAPIMessage.concat(tapeAndReelEntries);
		console.log("error mesage is"+saveCartAPIMessage);
		}
		if($('#currentLanguage').val() == 'en')
		{
			checkGATrackFunction(saveCartAPIMessage,"cr_place_order",0);
			
		}
		
		else{
			checkGATrackFunction(saveCartAPIMessage,"cr_place_order_cn",0);
			
		}
		
	}
	
	
	var CP5invError = $('#productNotvalid').val();
	if(CP5invError != undefined && CP5invError != ""){
		console.log("error mesage is"+CP5invError);
		
	if($('#currentLanguage').val() == 'en')
		{
			checkGATrackFunction(CP5invError,"CP5inv_reg",0);
		}
	if($('#currentLanguage').val() == 'ja')
		{
			checkGATrackFunction(CP5invError,"CP5inv_reg_jp",0);
		}	
		else{
			checkGATrackFunction(CP5invError,"CP5inv_reg_cn",0);
		}
	}
	
	var addressCheckResError = $('#addressCheckRes').val();
	console.log("error mesage is "+addressCheckResError);
	if(addressCheckResError != null && addressCheckResError != undefined && addressCheckResError != ""){
		if(addressCheckResError.includes("CP2")){
			if($('#currentLanguage').val() == 'en')
				{
				checkGATrackFunction(addressCheckResError,"CP2_reg",0);
				}
			else if($('#currentLanguage').val() == 'ja')
				{
				checkGATrackFunction(addressCheckResError,"CP2_reg_jp",0);
				}	
			else{
				checkGATrackFunction(addressCheckResError,"CP2_reg_cn",0);
				}
			}
		}
		
		var regulationsCheckResErrorList = $('#regulationsCheckResMsg').val();
		var regulationsCheckRespMsgs = [];
		if(regulationsCheckResErrorList != "" && regulationsCheckResErrorList != undefined && regulationsCheckResErrorList != null){
			regulationsCheckRespMsgs = regulationsCheckResErrorList.split(",");
		}	
		for(var i=0; i<regulationsCheckRespMsgs.length; i++){
			validateRegualtionErrorType(regulationsCheckRespMsgs[i]);
		}
	
});

function validateRegualtionErrorType(regulationsCheckResError){
	if(regulationsCheckResError != undefined && regulationsCheckResError != null && regulationsCheckResError != ""){
		if(regulationsCheckResError.includes("product restrictions")){
			console.log("error mesage is "+regulationsCheckResError);
			if($('#currentLanguage').val() == 'en')
			{
			checkGATrackFunction(regulationsCheckResError,"SKU_reg",0);
			}
		else if($('#currentLanguage').val() == 'ja')
			{
			checkGATrackFunction(regulationsCheckResError,"SKU_reg_jp",0);
			}
		}
		else if(regulationsCheckResError.includes("产品相关限制")){
			checkGATrackFunction(regulationsCheckResError,"SKU_reg_cn",0);
			}	
		
		if(regulationsCheckResError.includes("export control")){
			console.log("error mesage is "+regulationsCheckResError);
			if($('#currentLanguage').val() == 'en')
			{
			checkGATrackFunction(regulationsCheckResError,"eccn_reg",0);
			}
		else if($('#currentLanguage').val() == 'ja')
			{
			checkGATrackFunction(regulationsCheckResError,"eccn_reg_jp",0);
			}
			
			}
		else if(regulationsCheckResError.includes("根据美国出口管制的规定")){
			checkGATrackFunction(regulationsCheckResError,"eccn_reg_cn",0);
			}	
	if(regulationsCheckResError.includes("CP4")){
		console.log("error mesage is "+regulationsCheckResError);
		if($('#currentLanguage').val() == 'en')
			{
			checkGATrackFunction(regulationsCheckResError,"CP4_reg",0);
			}
		else if($('#currentLanguage').val() == 'ja')
			{
			checkGATrackFunction(regulationsCheckResError,"CP4_reg_jp",0);
			}	
		else{
			checkGATrackFunction(regulationsCheckResError,"CP4_reg_cn",0);
			}
		}
	 if(regulationsCheckResError.includes("CP1")){
		 console.log("error mesage is "+regulationsCheckResError);
			if($('#currentLanguage').val() == 'en')
			{
			checkGATrackFunction(regulationsCheckResError,"CP1_reg",0);
			}
		else if($('#currentLanguage').val() == 'ja')
			{
			checkGATrackFunction(regulationsCheckResError,"CP1_reg_jp",0);
			}
		else{
			checkGATrackFunction(regulationsCheckResError,"CP1_reg_cn",0);
			}	
		}
	if(regulationsCheckResError.includes("CP3")){
		console.log("error mesage is "+regulationsCheckResError);
			if($('#currentLanguage').val() == 'en')
			{
			checkGATrackFunction(regulationsCheckResError,"CP3_reg",0);
			}
		else if($('#currentLanguage').val() == 'ja')
			{
			checkGATrackFunction(regulationsCheckResError,"CP3_reg_jp",0);
			}
		else{
			checkGATrackFunction(regulationsCheckResError,"CP3_reg_cn",0);
			}
		}
	 if(regulationsCheckResError.includes("CP5")){
		 console.log("error mesage is "+regulationsCheckResError);
			if($('#currentLanguage').val() == 'en')
			{
			checkGATrackFunction(regulationsCheckResError,"CP5_reg",0);
			}
		else if($('#currentLanguage').val() == 'ja')
			{
			checkGATrackFunction(regulationsCheckResError,"CP5_reg_jp",0);
			}	
		else{
			checkGATrackFunction(regulationsCheckResError,"CP5_reg_cn",0);
			}
		}
	if(regulationsCheckResError.includes("CP7")){
		console.log("error mesage is "+regulationsCheckResError);
			if($('#currentLanguage').val() == 'en')
			{
			checkGATrackFunction(regulationsCheckResError,"CP7_reg",0);
			}
		else if($('#currentLanguage').val() == 'ja')
			{
			checkGATrackFunction(regulationsCheckResError,"CP7_reg_jp",0);
			}	
		else{
			checkGATrackFunction(regulationsCheckResError,"CP7_reg_cn",0);
			}
		}
	}
	
}


$(document).ready(function() {
	var outOfStockProductsList=$('#outOfStockProductsList').val();
	if(outOfStockProductsList != null && outOfStockProductsList != '' &&  outOfStockProductsList != undefined){
		console.log("outOfStockProductsList is inside if is----" +outOfStockProductsList);
		var value=$('#currentCurrency').val();
		var errormessage=$('#samplesMessage').val();
		console.log("error is----" +errormessage);
		if($('#currentLanguage').val() == 'en')
		{
			console.log("in en store");
			if(typeof _tiAnalyticsTrack === "function" && errormessage != undefined && errormessage != null){
				console.log("in en store in tiAnalyticsTrack for b2c samples");

				_tiAnalyticsTrack("error",errormessage,"samples_1985 stock_"+value);
			}
		}

		else{
			console.log("in zh store");
			if(typeof _tiAnalyticsTrack === "function" && errormessage != undefined && errormessage != null){
				console.log("in zh store in tiAnalyticsTrack");
				_tiAnalyticsTrack("error",errormessage,"samples_1985 stock_cn_"+value);
			}
		}
	}	
		
});

$(document).on('change','#addressType',function(){
	var addressType = $('input[name=addressType]:checked').val();
	console.log("select-country-list-id = "+ $('#select-country-list-id').children(":selected").attr('value'));
	var countryIsoCode = $('#select-country-list-id').children(":selected").attr('value');
	if(addressType =='Other'){
		checkEUCountry(countryIsoCode);
	}else{
		
		$('#js-tax-notification').css('display', 'none');
	}

});


function checkEUCountry(countryIsoCode){
$.ajax({
	url: ACC.config.encodedContextPath + '/checkout/buy/multi/delivery-address/checkEuropeanCountry',
	type:'GET',
	data:{"countryIsocode": countryIsoCode},

	success:function(res){
	console.log("res is" +res);
	if(res === true){
		
		console.log("data is"+res);
		$('#js-tax-notification').css('display', 'block');
		console.log("it is european country" +countryIsoCode);
		
	}
	else{
		
		$('#js-tax-notification').css('display', 'none');
	
}
	
}
});
}

function checkGATrackFunction(message, variablename, retryCount) {
    console.log("variable name is: " + variablename);
    if (typeof _tiAnalyticsTrack != "undefined" && message != undefined && message != null) {
        console.log("in _tiAnalyticsTrack");
        _tiAnalyticsTrack("error", message, variablename);
    } else {
        if (typeof retryCount == "undefined") {
            retryCount = 0;
        }
        if (retryCount < 5) {
            retryCount++;
            setTimeout(function () {
                checkGATrackFunction(message, variablename, retryCount);
            }, 1250);
        }
    }
}


function saveCartAPIDown(){
	console.log("save cart api is down for custom reel");
	var CartAPIMessage=$('#saveCartAPIMessage').val();
	var tapeAndReelEntries=$('#tapeAndReelEntries').val();
	if(CartAPIMessage != undefined && tapeAndReelEntries !=undefined){
		var saveCartAPIMessage=CartAPIMessage.concat(tapeAndReelEntries);
		console.log("error mesage is"+saveCartAPIMessage);
		}
		if($('#currentLanguage').val() == 'en')
		{
			checkGATrackFunction(saveCartAPIMessage,"cr_regulations",0);
			
		}
		
		else{
			checkGATrackFunction(saveCartAPIMessage,"cr_regulations_cn",0);
			
		}
}
function cfaAPIDownGA(){
	console.log("cfa api is down");
	var cfaApiDownMessage=$('#cfaApiDownMsg').val();
	if(cfaApiDownMessage != undefined){
		console.log("cfaApiDownMessage  is"+cfaApiDownMessage);
		}
		if($('#currentLanguage').val() == 'zh')
		{
			checkGATrackFunction(cfaApiDownMessage,"freight_carrier_connection_error_cn",0);
			
		}
		else if($('#currentLanguage').val() == 'ja')
		{
			checkGATrackFunction(cfaApiDownMessage,"freight_carrier_connection_error_jp",0);
			
		}
		
		else{
			checkGATrackFunction(cfaApiDownMessage,"freight_carrier_connection_error",0);
			
		}
}
function freeShippingErrGA(){
	console.log("In freeShippingErrGA");
	var freeShippingErrMessage=$('#freeShippingErrMSG').val();
	if(freeShippingErrMessage != undefined){
		console.log("freeShippingErrMessage  is"+freeShippingErrMessage);
		}
		if($('#currentLanguage').val() == 'zh')
		{
			checkGATrackFunction(freeShippingErrMessage,"warning_Freight_free_shipping_select_TI_cn",0);
			
		}
		else if($('#currentLanguage').val() == 'ja')
		{
			checkGATrackFunction(freeShippingErrMessage,"warning_Freight_free_shipping_select_TI_jp",0);
			
		}
		
		else{
			checkGATrackFunction(freeShippingErrMessage,"warning_Freight_free_shipping_select_TI",0);
			
		}
}


function saveCartAPIErrors(){
	console.log("save cart api has  errors for custom reel");
	var CartAPIMessage=$('#saveCartAPIMessage').val();
	var entryWithNoInventory=$('#entryWithNoInventory').val();
	if(CartAPIMessage != undefined && entryWithNoInventory !=undefined){
		var saveCartAPIMessage=CartAPIMessage.concat(entryWithNoInventory);
		console.log("error mesage is"+saveCartAPIMessage);
		}
	if($('#currentLanguage').val() == 'en')
		{
			checkGATrackFunction(saveCartAPIMessage,"cr_regulations",0);
		}
		
		else{
			checkGATrackFunction(saveCartAPIMessage,"cr_regulations_cn",0);
		}

}	

$(document).ready(function() {
if($("#isSaveCartAPIDownForCart").val() == 'true'  || $("#isSaveCartAPIErrorsForCart").val() == 'true' ) {
	console.log("save cart api is down  or has error  in cart page for custom reel");
	var saveCartAPIMessage=$('#saveCartAPIMessage').val();
	console.log("error mesage is"+saveCartAPIMessage);
	if($('#currentLanguage').val() == 'en')
	{
		checkGATrackFunction(saveCartAPIMessage,"cr_cart",0);
	}
	
	else{
		checkGATrackFunction(saveCartAPIMessage,"cr_cart_cn",0);
	}

	
	
	}

var inventoryError=$('#inventoryError').val();
if(inventoryError != undefined){
	console.log("error mesage is "+inventoryError);

	if($('#currentLanguage').val() == 'en')
	{
		checkGATrackFunction(inventoryError,"inv_place order",0);
	}	
	else{
		checkGATrackFunction(inventoryError,"inv_place order_cn",0);
	}
}

var inventoryRegulationError=$('#inventoryRegulationError').val();
if(inventoryRegulationError != undefined && inventoryRegulationError != ""){
	console.log("error mesage is "+inventoryRegulationError);

	if($('#currentLanguage').val() == 'en')
	{
		checkGATrackFunction(inventoryRegulationError,"inv_regulations",0);
	}	
	else{
		checkGATrackFunction(inventoryRegulationError,"inv_regulations_cn",0);
	}
}
var iorError=$('#iorError').val();
if(iorError != undefined && iorError != "" && iorError == 'true'){
	var iorErrorMsg=$('#iorErrorMsg').val();
	console.log("error mesage is "+iorErrorMsg);

	if($('#currentLanguage').val() == 'zh')
	{
		checkGATrackFunction(iorErrorMsg,"IOR error_TI_cn",0);
	}	
	else if($('#currentLanguage').val() == 'ja'){
		checkGATrackFunction(iorErrorMsg,"IOR error_TI_jp",0);
	}
	else{
		checkGATrackFunction(iorErrorMsg," IOR error_TI",0);
	}
}

var resellerPMsgList = $('#resellerPMsgList').val();
if(resellerPMsgList != "" && resellerPMsgList != undefined && resellerPMsgList != null){
	for(var i=0; i<resellerPMsgList.length; i++)
	{
		var resellerPErrorMsg= resellerPMsgList[i];
		console.log("error mesage is "+resellerPErrorMsg);

		if($('#currentLanguage').val() == 'zh')
		{
			checkGATrackFunction(resellerPErrorMsg,"resellers_block_cn",0);
		}	
		else if($('#currentLanguage').val() == 'ja'){
			checkGATrackFunction(resellerPErrorMsg,"resellers_block_jp",0);
		}
		else{
			checkGATrackFunction(resellerPErrorMsg," resellers_block",0);
		}
	}
}	

var resellerTError=$('#resellerTError').val(); 
if(resellerTError != undefined && resellerTError != "" && resellerTError == 'true'){
	var resellerTErrorMsg=$('#resellerTErrorMsg').val();
	console.log("error mesage is "+resellerTErrorMsg);
		if($('#currentLanguage').val() == 'zh')
		{
			checkGATrackFunction(resellerTErrorMsg,"resellers_threshold_cn",0);
		}	
		else if($('#currentLanguage').val() == 'ja'){
			checkGATrackFunction(resellerTErrorMsg,"resellers_threshold_jp",0);
		}
		else{
			checkGATrackFunction(resellerTErrorMsg," resellers_threshold",0);
		}
	}


});

$('#agreePayment').click(function () {  
	$.ajax({
		url: "saveTierPaymentAcknowledgement",
		cache: false,
		type: 'GET',
		datatype: 'text',
		success: function(res) {
			console.log("res"+ res);
		}
	});
}); 

$(document).ready(function() {
	if($('#gaTracking').val() != undefined){
		var allcookies = document.cookie;
		allcookies = allcookies.split(" ").join("");
		var cookieArray = allcookies.split(';');
		for(var i=0; i<cookieArray.length; i++) {
			name = cookieArray[i].split('=')[0];
			value = cookieArray[i].split('=')[1];
			
			if(name == 'CONSENTMGR')
			{
				document.cookie ="store_CONSENTMGR=" + encodeURIComponent(value) + ";path=/";
			}
			if(name == 'ti_bm')
			{
				document.cookie ="store_ti_bm="+ encodeURIComponent(value) + ";path=/";
			}
		}
	}
});

$("#shipping-method-submit-cart").click(function(e) {
	window.location = ACC.config.encodedContextPath +"/cart";
});


$("#twIndEmail").on("keyup", function(){
	var isValid=true;
	if(validateTwTaxfeildsEmpty()) {
	    $("#twtax-invoice-submit").prop("disabled",false);
	}else{
		$("#twtax-invoice-submit").prop("disabled",true);
	}
});


$("#compEmail").on("keyup", function(){
	var isValid=true;
	if(validateTwTaxfeildsEmpty()) {
	    $("#twtax-invoice-submit").prop("disabled",false);
	}else{
		$("#twtax-invoice-submit").prop("disabled",true);
	}
});

$("#tw-company-name").on("keyup", function(){
	var isValid=true;
	if(validateTwTaxfeildsEmpty()) {
	    $("#twtax-invoice-submit").prop("disabled",false);
	}else{
		$("#twtax-invoice-submit").prop("disabled",true);
	}
});

$("#taxIDNo").on("keyup", function(){
	var isValid=true;
	$("#twTaxRegNo-error-text").css({'display':'none'});
	if(validateTwTaxfeildsEmpty()) {
	    $("#twtax-invoice-submit").prop("disabled",false);
	}else{
		$("#twtax-invoice-submit").prop("disabled",true);
	}
});


function validateTwIndEmail(){
	 var emailPattern = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,20}$/;
	 var isValid=true;

	if($("#twIndEmail").val()=='' || !emailPattern.test($.trim($("#twIndEmail").val()))){
	 	isValid = false;
	 	$("#indemail-error-text").css({
	     	'display':'inline'
	     });
	 }
	else{
		$("#indemail-error-text").css({
	     	'display':'none'
	     });
	}

	return isValid;
}

function validateTwCompEmail(){
	 var emailPattern = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,20}$/;
	 var isValid=true;
	if($("#compEmail").val()=='' || !emailPattern.test($.trim($("#compEmail").val()))){
	 	isValid = false;
	 	$("#compEmail-error-text").css({
	     	'display':'inline'
	     });
	 }
	else{
		$("#compEmail-error-text").css({
	     	'display':'none'
	     });
	}

	return isValid;
}

function twCompanyName(){
	var isValid=true;
	var title = $("#tw-company-name").val().trim();
	var titlelength=$("#tw-company-name").val().length;
	var titlemaxlength = $("#tw-company-name").attr('maxlength');
	if($("#tw-company-name").val()==''|| titlelength>50 || titlelength==0 || !(title.match(/[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]+/g))){
	 isValid = false;
	 	console.log("invalid tw-company-name")
	 	$("#bankName-error-text").css({ 'display':'inline'});
	 }
	else{
		$("#bankName-error-text").css({ 'display':'none'});
	}
return isValid;
}



function validateTwTaxId(){
	var isValid=true;
	if($("#taxIDNo").val()=='' || $("#twTaxRegNo-error-text").is(":visible")){
		var isValid = false;
		$("#twTaxRegNo-error-text").css({'display':'inline'});
	}
	else{
		$("#twTaxRegNo-error-text").css({'display':'none'});
	}
	return isValid;
}

function twIndCheckboxFlag(){
	 var isValid=true;
if($("#twIndCheckboxflag").prop("checked") == false){
	console.log("not checked flag" + $("#twIndCheckboxflag").prop("checked"));
	isValid = false;
}
else{
	console.log("checkbox flag checked" + $("#twIndCheckboxflag").prop("checked"));
	isValid=true;
}
return isValid;
}


function twCmpCheckboxflag(){
	 var isValid=true;
if($("#twCmpCheckboxflag").prop("checked") == false){
	isValid = false;
}
else{
	isValid=true;
}
return isValid;
}

$('#twIndCheckboxflag').change(function() {
	var isValid = true;
	isValid = validateTwTaxfeildsEmpty();
	if(isValid) {
		console.log("checkbox cheked and error message not there");
		$("#twtax-invoice-submit").prop("disabled",false);
	}else{
		$("#twtax-invoice-submit").prop("disabled",true);
	}
});

$('#twCmpCheckboxflag').change(function() {
	var isValid = true;
	isValid = validateTwTaxfeildsEmpty();
	if(isValid) {
		console.log("checkbox cheked and error message not there");
		$("#twtax-invoice-submit").prop("disabled",false);
	}else{
		$("#twtax-invoice-submit").prop("disabled",true);
	}
});

function validateTwTaxfeildsEmpty(){
	var isvalid = true;
	var invoiceRecipientType = $('input[name=recipientType]:checked').val();
	if(invoiceRecipientType =='INDIVIDUAL'){
		if(validateTwIndEmail() && twIndCheckboxFlag())
		{
		  isValid=true;
		}else{
		  isValid = false;
		}
	}else if(invoiceRecipientType =='COMPANY'){
		if(validateTwCompEmail() && twCompanyName() && validateTwTaxId() && twCmpCheckboxflag())
		{
		 isValid=true;
		}else{
		 isValid = false;
		}
	}
	return isValid;

}


$('.pcr-pdfdownload').on('click',function(){
	const isIE = /*@cc_on!@*/false || !!document.documentMode;
	const isEdge = !isIE && !!window.StyleMedia;
	const downloadLinkName = "pcrfile_" + $(this).attr("material");
	if ($('#'+downloadLinkName)[0] === undefined) {
		const linkSource = "data:application/pdf;base64,";
		const downloadLink= $(this);
		const $link = $("<a></a>");
		const URL="/store/ti/en/qci/getPCRDownload";
		const queryString = "?sku=" + $(this).attr("material") + "&lotNumber=" + $(this).attr("lotnumber");	
    	$.ajax({
			url: URL+queryString, 
			cache: false,
			type: 'GET',
			datatype:"json",	
			success: function(data) {
				if (data.errorCode === undefined) {
					if ((isIE) || (isEdge)) {
						if (window.navigator && window.navigator.msSaveOrOpenBlob) {
							const base64Data = data.encodeddatastring.replace(/[\r\n]/g,'');
							const pdfBinaryData = atob(base64Data);
							let byteNumbers = new Array(pdfBinaryData.length);
							for (var i = 0; i < pdfBinaryData.length; i++) {
								byteNumbers[i] = pdfBinaryData.charCodeAt(i);
							}
							const byteArray = new Uint8Array(byteNumbers);
							const blob = new Blob([byteArray], {type: 'application/pdf'});
							window.navigator.msSaveOrOpenBlob(blob, data.filename);
						}
					} else {
						$link.attr('href', linkSource+data.encodeddatastring);
						$link.attr('download', data.filename);
						$link.attr('id', downloadLinkName);
						$("body").append($link);  
						$link.get(0).click();
					}
				} else {
					sendErrorMessageToGA('process-conformance-report-modal-failure-msg','pcr_error');
					$("#process-conformance-report-modal-failure").modal('show');	
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				sendErrorMessageToGA('process-conformance-report-modal-failure-msg','pcr_error');
				$("#process-conformance-report-modal-failure").modal('show');
			}
		});	
	} else {
		$('#'+downloadLinkName).get(0).click();
	}
});	

//////////////Frieght Accounts

$(document).ready(function() {
	//console.log("in shipping mode")
	$('#freight-options-loader').show();
	var isCustomerFreightAccountAvaialable= $("input[name='isCustomerFreightAccountAvaialable']").val();
	var isFreightAccountApiDown = $("#isFreightAccountApiDown").val(); 
	if(isFreightAccountApiDown){
      //  console.log("isFreightAccountApiDown::" + isFreightAccountApiDown);
        $("#freight-options-loader").hide();
		$("#customer-frieght").prop('disabled', true);
		$(".freightAccontTypeCFSpan").css({'color': '#cccccc'});
		$(".shapeButton").click(function() {
			var Shape = $('#customer-frieght').val();
			if($("input[name='freightAccontType'][value='CF']").prop('disabled', true)){
				//console.log("freight changes:::::") 
				$("#cfa-api-na").css({'display':'inline'});
			}
		});
	}
	
	 $("#cfa-isnotFaInvalid").hide();
	 $(".cfa-invalid-msg").hide();
	 $(".cfa-invalid-carrierType-msg").hide();
	 $(".cfa-invalid-serviceType-msg").hide();
	 $(".cfa-invalid-accountNo-msg").hide();
	 $(".cfa-invalid-all-required-msg").hide();
	 $(".cfa-valid-msg").hide();
	 $("#cfa-api-na").hide();
	 $('.freight-reg-warn').hide();
//	 $('#text-content-tf').hide();
//     $('#text-content-cf').hide();
	if(isCustomerFreightAccountAvaialable)
	{
		$("#shipping-method-submit").prop("disabled",true);
		$(".terms-and-conditions").hide();
		$("#CustomerFrieght").hide();
		$("#tiServiceType").hide();
		$(".select-list-freight-carrier").hide();
		$(".fAcount-no").hide();
		$(".cfa-msg").hide();
		$("#frieghtAccountCheckbox").hide(); 
		$(".text-box-wrapper").hide();
		$("#delivery_method").hide();
		$("#faccount-serviceType").hide();
		$("#cfa-api-na").hide();
		$('.freight-reg-warn').hide();
		$("#cfa-isnotFaInvalid").hide();
		$(".cfa-invalid-msg").hide();
		$(".cfa-invalid-carrierType-msg").hide();
		$(".cfa-invalid-serviceType-msg").hide();
		$(".cfa-invalid-accountNo-msg").hide();
		$(".cfa-invalid-all-required-msg").hide();
		$(".cfa-valid-msg").hide();
		$("#text-content-tf").hide();
        $("#text-content-cf").show();
        $(".freight-reg-warn").show();
	}
	
	$("input[name='freightAccontType']").click(function() {
        var radio_frieght_type= $("input[name='freightAccontType']:checked").val();
        setFreightTypeView(radio_frieght_type);
        
    });
	
	getDeliveryModes();
	$("#freight-options-loader").hide();
});

$('#customer-frieght').on('click', function() {
if ($("#customer-frieght").prop("checked")) {
	//console.log("is customer freight checked:::::"); 
	$(".freightDetails").show();
	$(".terms-and-conditions").show();
	  $(".text-box-wrapper").show();
	  $(".cfa-delete-text-info").show();
	  $(".select-list-freight-carrier").show();
	  $(".fAcount-no").show();
	  $('#tf-servicelevel').hide();
	  $('.cfd-msg').show();
	  $('#frieghtAccountCheckbox').show();
	  $('.cfa-delete-text-info').show();
	}else{
	//	console.log("is customer freight not checked:::::"); 
		$(".freightDetails").hide();
		$(".terms-and-conditions").hide();
		 $(".text-box-wrapper").hide();
		 $(".cfa-delete-text-info").hide();
		 $(".select-list-freight-carrier").hide();
		 $('#tf-servicelevel').hide();
	}
});

function deleteFreightAccount(){
		//console.log("on click of delete button");
	    $.ajax({
	    	url: ACC.config.encodedContextPath + '/checkout/buy/multi/delivery-method/deleteFreightAccount',
			type:'GET',
	        success: function(response) {
	        	console.log("response" + response);
	        	if(response == "true")
	            {
	        		//console.log("on click of delete button" + response);
		        		if($('#shipping-method-submit').hasClass('freight-next-btn-with-error')){
	      		    	  $('#shipping-method-submit').removeClass('freight-next-btn-with-error');
	      		      }
	      		      $('#shipping-method-submit').addClass('btn-full-width');
	      		      $("#shipping-method-submit").show();
	      		      $("#shipping-method-submit").prop("disabled",true);
	        		$('#target-modal-delete-cfa').modal('hide');
        			$(".select-list-freight-carrier").hide();
        		    $(".terms-and-conditions").hide();
        		    $('input[name="freightAccontType"]').prop('checked', false);
        			$('.text-box-wrapper').hide();
        			$(".isVFADown-err-msg").hide();
        			$("#isVFA-err-msg").hide();
        			$("#cfa-validation-api-down").hide();
        			$('input[name="termsAccepted"]').prop('checked', false);
        			$('input[name="saveCFAccount"]').prop('checked', false);
        			location.reload();
	            }
	        	/*else{
	        		alert("Email id not found");
	        	}*/
	        }
	    });
	}

function getCarrierSericeTypeandAccountNo(index){
	
	var carrier = $('#carrier-list-id'+index).val();
	var serviceTypes = $('#serviceType'+index).val();
	var pdc = $('#pdc'+index).val();
	var deliveryMethod = $('.service-type-dropdown');
	deliveryMethod.find('option').not(':first').hide();
	//console.log("index = "+ index +"carrier = "+ carrier);
	if(carrier !== ' '){
		$("#faccount-serviceType"+index).show();
		$("#cfa-invalid-carrierType-msg"+index).hide();
	}
	else{
    	 $("#faccount-serviceType"+index).hide();
    	 $("#cfa-invalid-carrierType-msg"+index).show();
    	 $('#cfa-validation-api-down').hide();
    	 $("#cfa-isnotFaInvalid").hide();
    	 $("#cfa-invalid-msg" +index).hide();
	}
	$("#cfa-invalid-accountNo-msg"+index).hide();
	getcarrierServiceType(index);
	getCarrierAccountNumber(index,"onClick");
	
	if(serviceTypes == ' '){
		$('input[name="termsAccepted"]').prop('disabled', true);
	}else{
//		$('input[name="termsAccepted"]').prop('disabled', false);
		 $("#cfa-isnotFaInvalid").hide();
		 $("#cfa-invalid-msg" +index).hide();
		 $("#cfa-valid-msg" +index).hide();
		 $('#cfa-validation-api-down').hide();
	}
	validateCFAFeildsEmptySubmit();
}

function getCarrierAccountNumber(index,status) {
	var pdc = $('#pdc'+index).val();
	var carrier = $('#carrier-list-id'+index).val();
	if(carrier == " "){
		$("#hrefAccountNo"+index).text("");
		//$("#liAccountNo"+index).val("");
		$("#liAccountNo"+index).attr('value','');
		$("#insertAccountNo"+index).val("");
		$("#liAccountNo"+index).hide();
		$("#accountNo"+index).val("");
	}else{
	$.ajax({
		url: "getCarrierAccountNumber?" + "pdc=" + pdc + "&carrier=" + carrier,
		cache: true,
		type: 'GET',
		datatype:"text",
		success: function(res) {
			if(res != null && res != undefined && res != ""){

				var accountSplit =  res.split("|");
			//	console.log("res"+ accountSplit[0] + " index "+ index); 
				$('#accountNo'+index).val(accountSplit[0]);
				$('#lastValidated'+index).val(accountSplit[1]);
				$('#consented'+index).val(accountSplit[2]);
				$("#liAccountNo"+index).show();
				$("#hrefAccountNo"+index).text(accountSplit[0].replace(/\d(?=\d{4})/g, "*"));
				$("#liAccountNo"+index).val(accountSplit[0]);
				if(($("#selectIsCFAValid"+index).val() == "" || $("#selectIsCFAValid"+index).val() == undefined) && ($("#selectAccountNo"+index).val() == null || $("#selectAccountNo"+index).val() == "" || $("#selectAccountNo"+index).val() == undefined)){
					$("#insertAccountNo"+index).val(accountSplit[0].replace(/\d(?=\d{4})/g, "*"));
				}else{
					if($("#carrier-list-id"+index).val() == $("#selectCarrierTypes"+index).val() && $("#cfa-invalid-msg"+index).is(":visible")){
						var selectAccountNo = $("#selectAccountNo"+index).val();
						$("#insertAccountNo"+index).val(selectAccountNo.replace(/\d(?=\d{4})/g, "*"));
						 $("#accountNo"+index).val($("#selectAccountNo"+index).val());
						//		$("#insertAccountNo"+index).prop("disabled",true);  // test
					}else{
						var selectAccountNo = $("#selectAccountNo"+index).val();
						$("#insertAccountNo"+index).val(selectAccountNo.replace(/\d(?=\d{4})/g, "*"));
						//$("#insertAccountNo"+index).val(accountSplit[0].replace(/\d(?=\d{4})/g, "*"));
						//		$("#insertAccountNo"+index).prop("disabled",true);  // test
						 $("#accountNo"+index).val($("#selectAccountNo"+index).val());
					}
				}
				if(accountSplit[0] != null ||  accountSplit[0]!=""){
					//		$("#insertAccountNo"+index).prop("disabled",true);  // test
				}
				else{
					$("#insertAccountNo"+index).prop("disabled",false);
					$("#insertAccountNo"+index).removeAttr("disabled");
				}
				if($("#selectIsCFAValid"+index).val() == "false" && $("#cfa-invalid-msg"+index).is(":visible")){
					//		$("#insertAccountNo"+index).prop("disabled",true);  // test
				}
				$("#cfa-invalid-accountNo-msg"+index).hide();
				validateCFAFeildsEmptySubmit();
			}
			else{
				//$("#insertAccountNo"+index).removeAttr("disabled");
				$("#insertAccountNo"+index).prop("disabled",false);
				var selectAccountNo = $("#selectAccountNo"+index).val();
				if($("#selectIsCFAValid"+index).val() == "false" && status == "selected"){
					$("#insertAccountNo"+index).val(selectAccountNo.replace(/\d(?=\d{4})/g, "*"));
					$('#accountNo'+index).val(selectAccountNo)
					//		$("#insertAccountNo"+index).prop("disabled",true);  // test
				}else{
					$("#insertAccountNo"+index).val('');
					$('#accountNo'+index).val('');
				}
				$("#cfa-invalid-accountNo-msg"+index).hide();
				$("#liAccountNo"+index).hide();
				$("#hrefAccountNo"+index).text("");
				//$("#liAccountNo"+index).val("");
				$("#liAccountNo"+index).attr('value','');
				validateCFAFeildsEmptySubmit();
			}
			if($('#cfa-invalid-msg'+index).is(':visible')){
				$("#cfa-invalid-accountNo-msg"+index).show();
			}
		}
	});
	}
}

function getcarrierServiceType(index){
	var carrier = $('#carrier-list-id'+index).val();
	var pdc = $('#pdc'+index).val();
$.ajax({
	url: "getCarrierServiceType?" + "pdc=" + pdc + "&carrier=" + carrier,
	cache: true,
	type: 'GET',
	datatype:"json",
	success: function(res) {
		var jsonObject = $.parseJSON(res); 
		var mySelect = $('#serviceType'+index);
	//	console.log("mySelect"+ mySelect);
		// Clear drop down list
		$('#serviceType'+index+' option:not(:first)').remove(); // <<<<<< No more issue here
		$.each(jsonObject, function (i, obj) {
			mySelect.append($('<option></option>').attr('value', obj.carrierCode+"-"+obj.spi).text(obj.carrierName));
    	});
		if($("#selectCarrierCodes"+index).val() != null && $("#selectSpis"+index).val() && carrier == $("#selectCarrierTypes"+index).val()){
			var selectCarrier = $("#selectCarrierCodes"+index).val()+"-"+$("#selectSpis"+index).val();
			$("#serviceType"+index).val(selectCarrier).attr("selected","selected");
			validateCFAFeildsEmptySubmit();
			//$("#serviceType option[selectCarrier='" + make + "']").attr("selected","selected");
		}
	}
});
}
function setSelectFreightAccountValue(index){
	 $("input[name='freightAccontType'][value='CF']").prop('checked', true);
	 $("#CustomerFrieght").show();
	 $(".freightDetails").show();
     $(".select-list-freight-carrier").show();
     $(".fAcount-no").show();
     $(".service-type-layout").show();
     $(".cfa-msg").show();
     $("#frieghtAccountCheckbox").show();
     $(".terms-and-conditions").show();
     $("#freightService").show();
     $(".text-box-wrapper").show();
     $("#text-content-cf").hide();
     $("#text-box-cf").hide();
     $("#delivery_method").hide();
     $('#text-content-tf').hide();
		$('#text-content-cf').show();
	    $("#text-box-cf").show();
     $("#carrier-list-id"+index).val($("#selectCarrierTypes"+index).val());
     var pdc = $("#pdc"+index).val();
     var carrier = $("#carrier-list-id"+index).val($("#selectCarrierTypes"+index).val());
     $("#carrierNames"+index).val($("#selectCarrierNames"+index).val());
     $("#carrierCodes"+index).val($("#selectCarrierCodes"+index).val());
     $("#spis"+index).val($("#selectSpis"+index).val());
     $("#lastValidated"+index).val($("#selectLastValidated"+index).val());
     $("#consented"+index).val($("#selectConsented"+index).val());
     $("#accountNo"+index).val($("#selectAccountNo"+index).val());
     $("#freight-service-level").addClass("freight-service-levl-bgColor");
     $(".cfa-delete-text-info").show();
     var selectAccountNo = $("#selectAccountNo"+index).val();
     getcarrierServiceType(index);
     getDeliveryModes();
     if($("#selectIsCFAValid"+index).val() == "true"){
	     $("#liAccountNo"+index).show();
	     $("#hrefAccountNo"+index).text(selectAccountNo.replace(/\d(?=\d{4})/g, "*"));
	     $("#insertAccountNo"+index).val(selectAccountNo.replace(/\d(?=\d{4})/g, "*"));
	     $("#liAccountNo"+index).val(selectAccountNo);
     }else{
    	 $("#insertAccountNo"+index).val(selectAccountNo.replace(/\d(?=\d{4})/g, "*"));
    	 //		$("#insertAccountNo"+index).prop("disabled",true);  // test
    	 getCarrierAccountNumber(index,"selected");
    	 $("#liAccountNo"+index).hide();
    	 $("#cfa-invalid-msg"+index).show();
    	 if($("#isValidateFreightAccountApiDown").val() == "false" || $("#isValidateFreightAccountApiDown").val() == "" || $("#isValidateFreightAccountApiDown").val() == null){
	    	 if($("#selectIsCFAValid"+index).val() == "false") {
	    		 $("#cfa-isnotFaInvalid").show();
	    		 //$("#cfa-invalid-accountNo-msg"+index).show();
	    	 }
    	 }
    	 /*var isValidateFreightAccountApiDown = $("#isValidateFreightAccountApiDown").val(); 
    		 if(isValidateFreightAccountApiDown == "true" && isValidateFreightAccountApiDown == undefined && isValidateFreightAccountApiDown == ""){
    			 return;
    		 }*/
         $("#liAccountNo"+index).val('');
    	 $("#hrefAccountNo"+index).text('');
     }
     if(selectAccountNo!= null ||  selectAccountNo!=''){
         //		$("#insertAccountNo"+index).prop("disabled",true);  // test
      }
     else{
         $("#insertAccountNo"+index).prop("disabled",false);
     }
     
     var valid = validateCFAFeildsEmpty();
     if(!valid){
    	 validateCFAFeildsEmptySubmit();
     }
     
     if ($("#customer-frieght").prop("checked")) {
 		//console.log("is customer freight checked:::::"); 
 		$(".freightDetails").show();
 		$(".terms-and-conditions").show();
 		  $(".text-box-wrapper").show();
 		  $(".cfa-delete-text-info").show();
 		 $(".select-list-freight-carrier").show();
 		 $('#tf-servicelevel').hide();
 		}else{
 		//	console.log("is customer freight not checked:::::"); 
 			$(".freightDetails").hide();
 			$(".terms-and-conditions").hide();
 			 $(".text-box-wrapper").hide();
 			 $(".cfa-delete-text-info").hide();
 			 $(".select-list-freight-carrier").hide();
 			 $('#tf-servicelevel').hide();
 		}
     var enabled = $('.js-checkout-toc-radio').attr('disabled');
     if(enabled == undefined){
    	 $('.js-checkout-toc-radio').prop( "disabled", true);
     }
     
}

function enableFreightAccountNo(index){
	$("#insertAccountNo"+index).removeAttr("disabled");
	$("#insertAccountNo"+index).val('');
	$("#accountNo"+index).val('');
	$("#cfa-invalid-accountNo-msg"+index).hide();
	$("#cfa-invalid-msg"+index).hide();
	 $("#cfa-isnotFaInvalid").hide();
	 $('#cfa-validation-api-down').hide();
	var carrier = $('#carrier-list-id'+index).val();
	if(carrier == " "){
//		$("#insertAccountNo"+index).prop("disabled",true);  // test
	}
	validateCFAFeildsEmptySubmit();
}

function enableFreightAccountNoIfStare(index){
	if($("#insertAccountNo"+index).val().indexOf('*') >= 0){
		$("#insertAccountNo"+index).removeAttr("disabled");
		$("#insertAccountNo"+index).val('');
		$("#accountNo"+index).val('');
		$("#cfa-invalid-accountNo-msg"+index).hide();
		$("#cfa-invalid-msg"+index).hide();
		$('#cfa-validation-api-down').hide();
		var carrier = $('#carrier-list-id'+index).val();
		if(carrier != " "){
			validateCFAFeildsEmptySubmit();
//			$("#insertAccountNo"+index).prop("disabled",true);  // test
		}
		
	}
	$("#cfa-isnotFaInvalid").hide();
	
}

function setOldFreightAccountNo(index){
	//		$("#insertAccountNo"+index).prop("disabled",true);  // test
	$("#insertAccountNo"+index).val($("#hrefAccountNo"+index).text());
	$("#accountNo"+index).val($("#liAccountNo"+index).val());
	$("#cfa-invalid-accountNo-msg"+index).hide();
	$("#cfa-invalid-accountNo-msg"+index).css("display", 'none');
	$("#cfa-invalid-msg"+index).hide();
	$("#cfa-isnotFaInvalid").hide();
	$('#cfa-validation-api-down').hide();
	validateCFAFeildsEmptySubmit();
}

function setValidateAccountNo(index){
	$("#cfa-isnotFaInvalid").hide();
	var carrier = $('#carrier-list-id'+index).val();
	var newAccountNo = $("#insertAccountNo"+index).val();
	if(newAccountNo == '' || newAccountNo == undefined || newAccountNo == null) {
	$("#accountNo"+index).val("");
	if(carrier != " "){
		validateCFAFeildsEmptySubmit();
	}
	}
	else {
		if(carrier == " "){
		$("#cfa-invalid-carrierType-msg"+index).show();
		$("#insertAccountNo"+index).val("");
		}else{
			$("#accountNo"+index).val(newAccountNo);
			var accno_length=$("#insertAccountNo"+index).val().length;
			var accpattern= /^[0-9]+$/
			var accno = $("#insertAccountNo"+index).val().trim();
			if(!accno.match(accpattern) || ((accno_length < 9) || (accno_length > 15))){
			$("#cfa-invalid-accountNo-msg"+index).show();
			validateCFAFeildsEmptySubmit();
			}
			else{
			$("#cfa-invalid-accountNo-msg"+index).hide();
		
			validateCFAFeildsEmptySubmit();
			}
		}
	}
}

function setValidateAccountNoOnPaste(index){
	$("#cfa-invalid-msg"+index).hide();
	 setTimeout(function (){
		 setValidateAccountNo(index);
	 },10);
}

function setValidateAccountNoOnCut(index){
	if($("#insertAccountNo"+index).val("")){
		$("#cfa-invalid-accountNo-msg"+index).show();
	}
	setTimeout(function (){
		 setValidateAccountNo(index);
	 },10);
}
function setCarreirServiceTypeValues(index){
	var serviceTypes = $('#serviceType'+index).val();
	var services = serviceTypes.split("-");
	$('#carrierCodes'+index).val(services[0]);
	$('#spis'+index).val(services[1]);
	var carrierName = $( "#serviceType"+ index +" option:selected" ).text();
	$('#carrierNames'+index).val(carrierName);
	if(serviceTypes != ' '){
		 $("#cfa-isnotFaInvalid").hide();
//		 $("#cfa-invalid-msg" +index).hide();
		 $("#cfa-valid-msg" +index).hide();
		 $('#cfa-validation-api-down').hide();
		 $("#cfa-invalid-serviceType-msg" +index).hide();
	}
	if(serviceTypes == ' '){
		$("#cfa-invalid-serviceType-msg" +index).show();
		$('input[name="termsAccepted"]').prop('disabled', true);
	}
	 $("#cfa-isnotFaInvalid").hide();
	 $("#cfa-invalid-msg" +index).hide();
	validateCFAFeildsEmptySubmit();
}

////////////////Frieght Accounts	
function getCountryCodeLowerCaseFromCurrentLocale(){

    if( $('ti-header-language-selection').val()){
        var llcLocale = $('ti-header-language-selection').val().split('-');
        if(llcLocale.length > 1){
            return llcLocale[1].toLowerCase();
        }
    } 
    
    return "us";
}

function sendErrorMessageToGA(errorMessageElementId,errorCodePrefix){
	var errorMessageText=$("#"+errorMessageElementId).text();
	var countryCodeFromLocale = getCountryCodeLowerCaseFromCurrentLocale();
	var errorCode= countryCodeFromLocale === 'us' ? errorCodePrefix : (errorCodePrefix + "_" + countryCodeFromLocale) ;              
	checkGATrackFunction(errorMessageText,errorCode,0);
}


function visitFaqGA(){
	console.log("clicked on Visit our freight FAQs");
	var visitFaqMSG=$('#visitFAQMSG').val();
	if(visitFaqMSG != undefined){
		console.log("visitFaqMSG mesage is"+visitFaqMSG);
		}
		if($('#currentLanguage').val() == 'zh')
		{
			checkGATrackFunction(visitFaqMSG,"freight_FAQ_cn",0);
			
		}
		else if($('#currentLanguage').val() == 'ja'){
			checkGATrackFunction(visitFaqMSG,"freight_FAQ_jp",0);
		}
		
		else{
			checkGATrackFunction(visitFaqMSG,"freight_FAQ",0);
			
		}
}

function cfaInvalidGA(){
	console.log("display cfa-Invalid msg");
	var cfaInvalidMsgGA=$('#cfaInvalidMsgGA').val();
	if(cfaInvalidMsgGA != undefined){
		console.log("cfaInvalidMsgGA mesage is"+cfaInvalidMsgGA);
		}
		if($('#currentLanguage').val() == 'zh')
		{
			checkGATrackFunction(cfaInvalidMsgGA,"Invalid_Freight_acct_lane_cn",0);
			
		}
		else if($('#currentLanguage').val() == 'ja'){
			checkGATrackFunction(cfaInvalidMsgGA,"Invalid_Freight_acct_lane_jp",0);
		}
		
		else{
			checkGATrackFunction(cfaInvalidMsgGA,"Invalid_Freight_lane_acct",0);
			
		}
}

function favAccMsgGA(){
	console.log("display cfa-isnotFaInvalid");
	var favAccMsg=$('#favAccMsgGA').val();
	if(favAccMsg != undefined){
		console.log("favAccMsg mesage is"+favAccMsg);
		}
		if($('#currentLanguage').val() == 'zh')
		{
			checkGATrackFunction(favAccMsg,"Validation_Fail_Freight_acct_order_cn",0);
			
		}
		else if($('#currentLanguage').val() == 'ja'){
			checkGATrackFunction(favAccMsg,"Validation_Fail_Freight_acct_order_jp",0);
		}
		
		else{
			checkGATrackFunction(favAccMsg,"Validation_Fail_Freight_acct_order",0);
			
		}
}

function useTiShippingGA(){
	console.log("Use TI shipping Instead");
	var cfaValidationMsg=$('#cfaValidationMsg').val();
	if(cfaValidationMsg != undefined){
		console.log("cfaValidationMsg  is"+cfaValidationMsg);
		}
		if($('#currentLanguage').val() == 'zh')
		{
			checkGATrackFunction(cfaValidationMsg,"Use_TI_shipping_cn",0);
			
		}
		else if($('#currentLanguage').val() == 'ja'){
			checkGATrackFunction(cfaValidationMsg,"Use_TI_shipping_jp",0);
		}
		
		else{
			checkGATrackFunction(cfaValidationMsg,"Use_TI_shipping",0);
			
		}
}
function deleteFreightAccGA(){
	console.log("Delete freight account");
	var deleteFreightAccMsg=$('#cfaDeleteMsg').val();
	if(deleteFreightAccMsg != undefined){
		console.log("deleteFreightAccMsg  is"+deleteFreightAccMsg);
		}
		if($('#currentLanguage').val() == 'zh')
		{
			checkGATrackFunctionClick("Link Track",deleteFreightAccMsg,0);
			
		}
		else if($('#currentLanguage').val() == 'ja'){
			checkGATrackFunctionClick("Link Track",deleteFreightAccMsg,0);
		}
		
		else{
			checkGATrackFunctionClick("Link Track",deleteFreightAccMsg,0);
			
		}
}

function deleteCancelFreightAccGA(){
	console.log("cancel button on freight account");
	var deleteCancelFreightAccMsg=$('#cfaDeleteCancelMsg').val();
	if(deleteCancelFreightAccMsg != undefined){
		console.log("deleteCancelFreightAccMsg  is"+deleteCancelFreightAccMsg);
		}
		if($('#currentLanguage').val() == 'zh')
		{
			checkGATrackFunctionClick("Link Track",deleteCancelFreightAccMsg,0);
			
		}
		else if($('#currentLanguage').val() == 'ja'){
			checkGATrackFunctionClick("Link Track",deleteCancelFreightAccMsg,0);
		}
		
		else{
			checkGATrackFunctionClick("Link Track",deleteCancelFreightAccMsg,0);
			
		}
}

function deleteCFAGA(){
	console.log("clicked on delete button on freight account");
	var deleteCFAMsg=$('#deleteCFAMsg').val();
	if(deleteCFAMsg != undefined){
		console.log("deleteCFAMsg  is"+deleteCFAMsg);
		}
		if($('#currentLanguage').val() == 'zh')
		{
			checkGATrackFunctionClick("Link Track",deleteCFAMsg,0);
			
		}
		else if($('#currentLanguage').val() == 'ja'){
			checkGATrackFunctionClick("Link Track",deleteCFAMsg,0);
		}
		
		else{
			checkGATrackFunctionClick("Link Track",deleteCFAMsg,0);
			
		}
}

function customerFreightGA(){
	console.log("clicked on bill shipping charges to third party");
	var customerFreightMsg=$('#customerFreightMsg').val();
	if(customerFreightMsg != undefined){
		console.log("customerFreightMsg  is"+customerFreightMsg);
		}
		if($('#currentLanguage').val() == 'zh')
		{
			checkGATrackFunction(customerFreightMsg,"Freight_grayed_out_cn",0);
			
		}
		else if($('#currentLanguage').val() == 'ja'){
			checkGATrackFunction(customerFreightMsg,"Freight_grayed_out_jp",0);
		}
		
		else{
			checkGATrackFunction(customerFreightMsg,"Freight_grayed_out",0);
			
		}
}

function billShipChargesGA(){
	console.log("clicked on bill shipto thirdparty radio button");
	var customerFreightMsg=$('#customerFreightMsg').val();
	if(customerFreightMsg != undefined){
		console.log("customerFreightMsg  is"+customerFreightMsg);
		}
		if($('#currentLanguage').val() == 'zh')
		{
			checkGATrackFunctionClick("Link Track",customerFreightMsg,0);
			
		}
		else if($('#currentLanguage').val() == 'ja'){
			checkGATrackFunctionClick("Link Track",customerFreightMsg,0);
		}
		
		else{
			checkGATrackFunctionClick("Link Track",customerFreightMsg,0);
			
		}
}
function addShippingChargesGA(){
	console.log("clicked on add shipping charges to my order total");
	var addShippingChargesMsg=$('#addShippingChargesMsg').val();
	if(addShippingChargesMsg != undefined){
		console.log("addShippingChargesMsg is" +addShippingChargesMsg);
		}
		if($('#currentLanguage').val() == 'zh')
		{
			checkGATrackFunctionClick("Link Track","addShippingChargesMsg",0);
			
		}
		else if($('#currentLanguage').val() == 'ja'){
			checkGATrackFunctionClick("Link Track","addShippingChargesMsg",0);
		}
		
		else{
			checkGATrackFunctionClick("Link Track","addShippingChargesMsg",0);
			
		}
}



function getDeliveryModes(){
	var freightAccontType = $('input[name=freightAccontType]:checked').val();
	var countryName = $('#country_Name').val();
	var currentCurrency = $("ti-header-currency-selection").val()
	var currentLang = $("ti-header-language-selection").val()
	if($('#freeShippingCoupon').val() == "true"){
		var contextPath = $('#freightAccountContext').val()
		if(freightAccontType == 'TF')
		{
			$("#text-content-tf").show();
	        $("#text-content-cf").hide();
	        $("#text-box-cf").show();
//	        enableScroll();
			$('#tiFreightAccountForm').attr('action', contextPath +'/checkout/buy/multi/delivery-method/select');
		}
		if(freightAccontType == 'CF')
		{
			$("#text-box-cf").show();
			$("#text-content-tf").hide();
	        $("#text-content-cf").show();
	        customerFreightGA();
	        //validateCFAFeildsEmpty();
			$('#tiFreightAccountForm').attr('action', contextPath + '/checkout/buy/multi/delivery-method/validateFreightAccount');
		}
		return;
	}
	if(freightAccontType == 'TF' || freightAccontType == 'CF')
	{
		
		$.ajax({
			url: "getDeliveryModes?" + "freightAccontType=" + freightAccontType,
			cache: true,
			type: 'GET',
			datatype:"json",
			success: function(res) {
				console.log("res"+ res);
				var jsonObject = $.parseJSON(res); 
				var mySelect = $('#delivery_method');
			//	console.log("mySelect"+ mySelect);
				// Clear drop down list
				$('#delivery_method option').remove();
				$.each(jsonObject, function (i, obj) {
					mySelect.append($('<option></option>').attr('value', obj.code).text(obj.name+" - " + countryName + " - " +com.TI.CurrencyFormat.format(obj.deliveryCost.value,
							false, currentCurrency, currentLang)));
				});
			}
		});
		
		var contextPath = $('#freightAccountContext').val()
		if(freightAccontType == 'TF')
		{
			$('#tiFreightAccountForm').attr('action', contextPath +'/checkout/buy/multi/delivery-method/select');
		}
		if(freightAccontType == 'CF')
		{
			$('#tiFreightAccountForm').attr('action', contextPath + '/checkout/buy/multi/delivery-method/validateFreightAccount');
		}
	}
}

function setFreightTypeView(value){
    if(value=="TF"){
    	  topFunction();
    	  $('input[name="termsAccepted"]').prop('disabled', true);
    	  $('input[name="termsAccepted"]').prop('checked', false);
//    	  enableScroll();
          $(".terms-and-conditions").show();
          $("#tiServiceType").show();
          $("#text-content-cf").show();
          $(".text-box-wrapper").show();
//          $("#text-box-cf").show();
          $("#delivery_method").show();
          $("#CustomerFrieght").hide();
          $(".select-list-freight-carrier").hide();
          $(".fAcount-no").hide();
          $(".cfa-msg").hide();
          $("#freightService").hide();
          $("#frieghtAccountCheckbox").hide();
          $("#cfa-validation").hide();
          $("#cfa-validation-msg").hide();
          $("#tax-invoice-submit").prop("disabled",true);
          $('input[name="customerFrieght"]').prop('checked', false);
          $("#freight-service-level").removeClass("freight-service-levl-bgColor");
          $("#cfa-isnotFaInvalid").hide();
          $("#cfa-api-na").hide();
          $('.cfd-msg').hide();
          $('.freight-reg-warn').hide();
          $('#text-content-tf').show();
	      $("#text-content-cf").hide();
	      $("#text-box-cf").show();
	      $('#tf-servicelevel').show();
	      $("#enableTIFreight").hide();
	      $("#cfa-invalid-all-required-msg").hide();
	      $('#cfa-validation-api-down').hide();
	      if($('#shipping-method-submit').hasClass('freight-next-btn-with-error')){
	    	  $('#shipping-method-submit').removeClass('freight-next-btn-with-error');
	      }
	      $('#shipping-method-submit').addClass('btn-full-width');
   }

    if(value=="CF"){
//    	disableScroll();
    	if($(".cfa-invalid-carrierType-msg").is(":visible") || $(".cfa-invalid-accountNo-msg").is(":visible") || $(".cfa-invalid-serviceType-msg").is(":visible")){
    		$('input[name="termsAccepted"][value="Yes"]').prop('checked', true); 
        	$('input[name="termsAccepted"]').prop('disabled', false);
        	$(".cfa-invalid-all-required-msg").show(); 
        }else{
        	$('input[name="termsAccepted"]').prop('checked', false); 
        	$('input[name="termsAccepted"]').prop('disabled', true);
        }
    	$("#shipping-method-submit").prop("disabled",true);
		$("#CustomerFrieght").show();
		$(".select-list-freight-carrier").show();
		$(".fAcount-no").show();
		$(".cfa-msg").show();
		$("#frieghtAccountCheckbox").show();
		$(".terms-and-conditions").show();
		$("#freightService").show();
		$(".text-box-wrapper").show();
		$("#text-content-cf").hide();
//		$("#text-box-cf").hide();
		$("#delivery_method").hide();
		$("#tiServiceType").hide();
		$("#cfa-isnotFaInvalid").hide();
		$('input[name="tiFrieght"]').prop('checked', false);
		$("#freight-service-level").addClass("freight-service-levl-bgColor");
		$("#cfa-api-na").hide();
		$('.freight-reg-warn').show();
	    $('#text-content-tf').hide();
		$('#text-content-cf').show();
		$('#tf-servicelevel').hide();
	    $("#text-box-cf").show();
	    $('.cfd-msg').show();
	    $('#frieghtAccountCheckbox').show();
	    $('.cfa-delete-text-info').show();
	    if($('#shipping-method-submit').hasClass('freight-next-btn-with-error')){
	    	  $('#shipping-method-submit').removeClass('freight-next-btn-with-error');
	      }
      
		//validateCFAFeildsEmpty();
    }
}

function validateCFAFeildsEmpty(){
	var carrierTypes=document.getElementsByName('carrierType');
	 var serviceTypes=document.getElementsByName('carrierName');
	 var acccountNos=document.getElementsByName('accountNo');
	 var isValid  = true;
    for(var i=0;i<carrierTypes.length;i++){
   	
        if(carrierTypes[i].value == ' '){
       	 isValid = false;
        }else{
         $("#cfa-invalid-carrierType-msg"+i).hide();
        }
        if(serviceTypes[i].value == ' '){
       	 isValid = false;
        }else{
         $("#cfa-invalid-serviceType-msg"+i).hide();
        }
        if(acccountNos[i].value == '' || acccountNos[i].value == null || acccountNos[i].value == undefined){
       	 isValid = false;
        }else{
         $("#cfa-invalid-accountNo-msg"+i).hide();
        }
    }
    if(isValid){
    	$(".cfa-invalid-all-required-msg").hide();
    }
    if($(".cfa-invalid-accountNo-msg").is(":visible")){
    //	console.log("cfa-invalid-accountNo-msg 1");
    	isValid = false;
    }
    if($(".cfa-invalid-msg").is(":visible")){
    	isValid = false;
    }
//    $('.js-checkout-toc-radio').prop( "disabled", true);  
    if(isValid){
//    	enableScroll();
    	if ($('input[name="termsAccepted"]').prop("checked")) {
    		$("#shipping-method-submit").prop("disabled",false);
    		$('input[name="termsAccepted"]').prop('disabled', false);
    	}
    }else{
//    	disableScroll();
//    	$('input[name="termsAccepted"]').prop('checked', false); 
    	$("#shipping-method-submit").prop("disabled",true);
    }
    
    return isValid;
}

$("#shipping-method-submit").on('click', function(e) {
	if ($("#customer-frieght").prop("checked")) {
		setTimeout(function (){
			$("#freight-options-loader").show();
		 },3000);
		var isFormValid = validateCFAFeildsEmptySubmit();
	    if(isFormValid){
	    	$('#tiFreightAccountForm').attr('onsubmit','return true;');
	    	$("#tiFreightAccountForm").submit();
	    	// console.log("Submit Form Submitted!!! :D");
	    }else{
	    	// console.log("Form is not valid :(");
	    	$('#tiFreightAccountForm').attr('onsubmit','return false;');
	    	$("#freight-options-loader").hide();
	        e.preventDefault();
	    }
    }else{
    	$('#tiFreightAccountForm').attr('onsubmit','return true;');
    	$("#tiFreightAccountForm").submit();
    	//console.log("Submit Form Submitted!!! :D");
    }
});

function validateCFAFeildsEmptySubmit(){
	var carrierTypes=document.getElementsByName('carrierType');
	 var serviceTypes=document.getElementsByName('carrierName');
	 var acccountNos=document.getElementsByName('accountNo');
	 var radio_frieght_type= $("input[name='freightAccontType']:checked").val();
	 var isValid  = true;
	 var isValidateFreightAccountApiDown = $("#isValidateFreightAccountApiDown").val(); 
	 if(radio_frieght_type == "CF"){
		/* if(isValidateFreightAccountApiDown){
			 return;
		 }*/
    for(var i=0;i<carrierTypes.length;i++){
    //	console.log(" carrierName = " + carrierTypes[i].value + " serviceType = " + serviceTypes[i].value);
        if(carrierTypes[i].value == ' '){
       	 isValid = false;
       	 $("#cfa-invalid-carrierType-msg"+i).show();
        }else{
         $("#cfa-invalid-carrierType-msg"+i).hide();
        }
        if(serviceTypes[i].value == ' '){
       	 isValid = false;
	       	if($("#faccount-serviceType"+i).is(":visible")){
	       	 $("#cfa-invalid-serviceType-msg"+i).show();
	        }
        }else{
         $("#cfa-invalid-serviceType-msg"+i).hide();
        }
       
        if(acccountNos[i].value == '' || acccountNos[i].value == null || acccountNos[i].value == undefined){
       	 isValid = false;
       	 	$("#cfa-invalid-accountNo-msg"+i).show(); 
        }else{
        	if($('#cfa-invalid-msg'+i).is(':visible') || $('#cfa-invalid-accountNo-msg'+i).is(':visible')){
        		$("#cfa-invalid-accountNo-msg"+i).show();
        	}else{
        		$("#cfa-invalid-accountNo-msg"+i).hide(); 
        	}
        }
    }
    if(isValid){
    	$("#cfa-invalid-all-required-msg").hide();
    }else{
    	if($(".cfa-invalid-msg").is(":visible")){
    		$("#cfa-invalid-all-required-msg").hide();
    	}else{
    		$("#cfa-invalid-all-required-msg").show();
    	}
    }
    if($(".cfa-invalid-accountNo-msg").is(":visible")){
    	isValid = false;
    }
    if($(".cfa-invalid-msg").is(":visible")){
    	isValid = false;
    }
	 }
    if(isValid){
    	//console.log("freight carrier from Submit Success");
    	if ($('input[name="termsAccepted"]').prop("checked")) {
    		$("#shipping-method-submit").prop("disabled",false);
    		$('input[name="termsAccepted"]').prop('disabled', false);
    	}
    }else{
    	//console.log("freight carrier from Submit Failed");
//    	topFunction();
//    	$('input[name="termsAccepted"]').prop('checked', false); 
    	$("#shipping-method-submit").prop("disabled",true);
    }
    
    return isValid;
}

function topFunction() {
	document.getElementById('js-checkout-toc-textbox').scrollTop = 0;
}


function checkAccontNo(index){
		 $("#cfa-isnotFaInvalid").hide();
		 $("#cfa-invalid-msg"+index).hide();
		 $("#cfa-valid-msg"+index).hide();
		 $('#cfa-validation-api-down').hide();
		 validateCFAFeildsEmptySubmit();
}

function onFocusFunction(index,e){
	if($("#cfa-invalid-msg"+index).is(":visible")){
		$(window).keyup(function (e) {
	        var code = (e.keyCode ? e.keyCode : e.which);
	        if (code == 9) {
	        	enableFreightAccountNoIfStare(index);
	        }
	    });
	}
}

function validateApiMessage(index) {
	 var isCFAValid = $("#selectIsCFAValid"+index).val();
	 $('#shipping-method-submit').addClass('freight-next-btn-with-error');
	 if(isCFAValid == 'true'){
	 console.log("is customer freight account valid:::" + isCFAValid)
	 $("#cfa-valid-msg"+index).show();
	 //$("#cfa-invalid-accountNo-msg"+index).hide();
	 }
	 if(isCFAValid == 'false'){
	 console.log("is customer freight account valid:::"+ isCFAValid)
	 $("#cfa-invalid-msg" +index).show();
	 //$("#cfa-invalid-accountNo-msg"+index).show();
	 cfaInvalidGA();
	 $("#cfa-valid-msg"+index).hide();
	 $("#cfa-isnotFaInvalid").show();
	 $("#terms_accept").prop('disabled', true);
	 }
	 validateCFAFeildsEmptySubmit();
	 var errorMsgView1 = document.getElementById("cfa-isnotFaInvalid");
	 errorMsgView1.scrollIntoView();
}

$("#enableTIFreight").click(function(e) {
	onClickTiShipping();
	document.getElementById("fcmsg").scrollIntoView();
});

function validateApiDownMessage(){
var isValidateFreightAccountApiDown = $("#isValidateFreightAccountApiDown").val(); 
if(isValidateFreightAccountApiDown){
    $("#freight-options-loader").hide();
	$('#shipping-method-submit').addClass('freight-next-btn-with-error');
	console.log("isValidateFreightAccountApiDown::" + isValidateFreightAccountApiDown);
	var errorMsgView = document.getElementById("cfa-validation-api-down");
	errorMsgView.scrollIntoView();
	$('.js-checkout-toc-radio').prop( "disabled", true );
	$("#cfa-api-na").hide();
	$("#cfa-isnotFaInvalid").hide();
	$(".cfa-invalid-msg").hide();
	$(".cfa-valid-msg").hide();
	$("#tiServiceType").hide();
	$(".cfa-invalid-carrierType-msg").hide();
	$(".cfa-invalid-serviceType-msg").hide();
	$(".cfa-invalid-accountNo-msg").hide();
	$(".cfa-invalid-all-required-msg").hide();
}
}

function onClickTiShipping() {
	console.log("on click of Ti Shipping");
	 $("input[name='freightAccontType'][value='TF']").prop('checked', true);
	 setFreightTypeView('TF');
	 getDeliveryModes();
}

$('input[name="termsAccepted"]').click(function(e) {
		if ($('input[name="termsAccepted"][value="Yes"]').prop("checked")) {
			if($(".cfa-invalid-msg").is(":visible") || $(".cfa-invalid-accountNo-msg").is(":visible") || $(".cfa-invalid-carrierType-msg").is(":visible") || $(".cfa-invalid-serviceType-msg").is(":visible") || $(".cfa-invalid-all-required-msg").is(":visible")){
				validateCFAFeildsEmptySubmit();
			}else{
				$('#shipping-method-submit').prop( "disabled", false );
			}
			
		}else{
			$('#shipping-method-submit').prop( "disabled", true );
		}
});


function saveFreightAccGA(){
	console.log("clicked on save freight acc for GA");
	var saveFreightAccMsgGA=$('#saveFreightAccMsgGA').val();
	frieghtAccountCheckboxGA = $('#saveFAInfo').is(":checked");
	
	if(frieghtAccountCheckboxGA){
	if(saveFreightAccMsgGA != undefined){
		console.log("saveFreightAccMsgGA mesage is"+saveFreightAccMsgGA);
		}
		if($('#currentLanguage').val() == 'zh')
		{
			checkGATrackFunctionClick("Link Track",saveFreightAccMsgGA,0);
			
		}
		else if($('#currentLanguage').val() == 'ja'){
			checkGATrackFunctionClick("Link Track",saveFreightAccMsgGA,0);
		}
		
		else{
			checkGATrackFunctionClick("Link Track",saveFreightAccMsgGA,0);
			
		}
	}
}

function checkGATrackFunctionClick(message, variablename, retryCount) {
    console.log("variable name is: " + variablename);
    if (typeof _tiAnalyticsTrack != "undefined" && message != undefined && message != null) {
        console.log("in _tiAnalyticsTrack");
        _tiAnalyticsTrack(message, variablename, _metrics_store_data.tiPageName, _metrics_store_data.tiContentGroup);
    } else {
        if (typeof retryCount == "undefined") {
            retryCount = 0;
        }
        if (retryCount < 5) {
            retryCount++;
            setTimeout(function () {
                checkGATrackFunction(message, variablename, retryCount);
            }, 1250);
        }
    }
}


function onClickTiShippingGA(){
	console.log("clicked on Ti Shipping for GA");
	var tiShippingMSG=$('#tiShippingGA').val();
	if(tiShippingMSG != undefined){
		console.log("tiShippingMSG mesage is"+tiShippingMSG);
		}
		if($('#currentLanguage').val() == 'zh')
		{
			checkGATrackFunction(tiShippingMSG,"Freight_free_shipping_select_TI_cn",0);
			
		}
		else if($('#currentLanguage').val() == 'ja'){
			checkGATrackFunction(tiShippingMSG,"Freight_free_shipping_select_TI_jp",0);
		}
		
		else{
			checkGATrackFunction(tiShippingMSG,"Freight_free_shipping_select_TI",0);
			
		}
}
$(document).on('change','#isTaxCertExempt',function(e) {
	shippingAddressFormvalidation();
});




function gotoCart() {
	var cartUrl = $('#cartUrl').val();
	location.href=cartUrl;
}
