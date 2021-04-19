//Checkout flow
//Display tax exemption fields based on country and province

function hideOrShowTaxExemptionFields(res){

		var jsonObject = $.parseJSON(res); 
		var showApplyTaxBtn = false;
		hideTaxExemptionCertificateFields();
		if(Object.keys(jsonObject).length > 0){
		$.each(jsonObject, function (i, obj) {
 		var active = obj.active;
 		var mandatory = obj.mandatory
 		var exemptionType = obj.exemptionType;
 		var exemptionFormat = obj.exemptionFormat;
 		showApplyTaxBtn = obj.applyExemption;
 		//Tax exemption
 		if(exemptionType !== undefined && exemptionType !== ''){
 			var exemptPrefix = exemptionType.toLowerCase();
 			
 			if(active === true){
 				$('#js-'+exemptPrefix+'ExemptCert').css({ 'display':'block'});
 			}else {
 				$('#js-'+exemptPrefix+'ExemptCert').css({ 'display':'none'});
 			}
 			if(mandatory === true){
 				$('#'+exemptPrefix+'ExemptCert').addClass('input-required');
 			} else {
 				$('#'+exemptPrefix+'ExemptCert').removeClass('input-required');
 			}
 			if(exemptionFormat != undefined && exemptionFormat !== ''){
 				$('#'+exemptPrefix+'FieldFormat').val(exemptionFormat)
 			}
 		}
 	});
		if(showApplyTaxBtn){
			$('#js-tax-cert-exemption').css({ 'display':'block'});
			shippingAddressFormvalidation();
		} else{
			$('#js-tax-cert-exemption').css({ 'display':'none'});
		}
		
		
	} 
	else {

	}
}

function hideTaxExemptionCertificateFields(){
	$('#js-gstExemptCert').css({ 'display':'none'});
	$('#js-pstExemptCert').css({ 'display':'none'});
	$('#js-qstExemptCert').css({ 'display':'none'});
	$('#js-tax-cert-exemption').css({ 'display':'none'});
}


$(document).on('change','#addressType,#select-state-list-id',function(){
	populateTaxExemptionCertificateFields();
});


function populateTaxExemptionCertificateFields(){
	var addressType = $('input[name=addressType]:checked').val();
	var countryIsoCode = $('#select-country-list-id').children(":selected").attr('value');
 	var selectedState = $('#select-state-list-id').children(":selected").attr('value');
	if(addressType !== undefined && addressType =='Business' && (countryIsoCode != undefined || countryIsoCode != '') && (selectedState != undefined || selectedState != '') ){
		$('#js-pstExemptCert-region').val(selectedState)
		$('#js-qstExemptCert-region').val(selectedState)
	 	$('#js-gstExemptCert-country').val(countryIsoCode)
		$.ajax({
		        url: "tax-exempt-config",
		        data:{"countryCode": countryIsoCode , "provinceCode": selectedState},        
		        type: 'GET',
		        datatype:"json",
		        cache: 'true',
		        success:function(res){
		        	hideOrShowTaxExemptionFields(res)
		        },
		        error: function(xhr, errorType, exception){
		        	console.error("Error while fetching the tax exemption certificate configurations")
		     }
		    });
	}else{
		hideTaxExemptionCertificateFields();
	}
}

$(document).on('provincechange','#select-state-list-id',function(){
	populateTaxExemptionCertificateFields();
});




/* Update Address Book */
$(document).on('change','#select-state-list-id',function(){
	console.log("Update Address Book")
	var countryIsoCode = $('#add-select-country-list-id').children(":selected").attr('value');
 	var selectedState = $('#select-state-list-id').children(":selected").attr('value');
 	var addressPage =  $(this).data("addresspage");
	if((addressPage != undefined && addressPage == 'true') && (countryIsoCode != undefined || countryIsoCode != '') && (selectedState != undefined || selectedState != '') ){
		$('#js-ab_gstExemptCert-country').val(countryIsoCode)
		$('#js-ab_pstExemptCert-region').val(selectedState)
		$('#js-ab_qstExemptCert-region').val(selectedState)
	 	
		$.ajax({
		        url: "tax-exempt-config",
		        data:{"countryCode": countryIsoCode , "provinceCode": selectedState},        
		        type: 'GET',
		        datatype:"json",
		        cache: 'true',
		        success:function(res){
		        	hideOrShowTaxExemptionFieldsForAddressBook(res)
		        },
		        error: function(xhr, errorType, exception){
		        	console.error("Error while fetching the tax exemption certificate configurations")
		     }
		    });
	}
});

//Restore GET Method for Details Page
$('#js_navigate_to_regulations').click(function(e) {
	var currentUrl = window.location.href;
	var regulationsUrl = $(this).data('regulationsUrl')
		 window.location = (regulationsUrl != undefined && regulationsUrl != "") ? regulationsUrl : currentUrl;
});




//Restore GET Method for Details Page
$('#js_clear_tax_exempt_val').click(function(e) {
	$.ajax({
	    url: 'clear-tax-exempt-certificates',
	    type: 'GET',
		async: false,
	    success:function(res){
	       console.log("Tax exemption certificates cleared ::", res)
	       location.reload();  //Refresh page 
	    },
	    error: function(xhr, errorType, exception){
	    	console.error("Error while clearing the tax exemption certificates")
     }
	});
});


function hideOrShowTaxExemptionFieldsForAddressBook(res){

	var jsonObject = $.parseJSON(res); 
	var hideTaxIdField = false;
	hideTaxExemptionCertificateFieldsForAddressBook();
	if(Object.keys(jsonObject).length > 0){
	$.each(jsonObject, function (i, obj) {
		var active = obj.active;
		var mandatory = obj.mandatory
		var exemptionType = obj.exemptionType;
		var exemptionFormat = obj.exemptionFormat;
		
		//Tax exemption
		if(exemptionType !== undefined && exemptionType !== ''){
			var exemptPrefix = exemptionType.toLowerCase();
			
			if(active === true){
				$('#js-ab_'+exemptPrefix+'ExemptCert').css({ 'display':'block'});
				if(!hideTaxIdField){
					hideTaxIdField = true;
				}
			}else {
				$('#js-ab_'+exemptPrefix+'ExemptCert').css({ 'display':'none'});
			}
			if(mandatory === true){
				$('#ab_'+exemptPrefix+'ExemptCert').addClass('input-required');
			} else {
				$('#ab_'+exemptPrefix+'ExemptCert').removeClass('input-required');
			}
			if(exemptionFormat != undefined && exemptionFormat !== ''){
				$('#ab_'+exemptPrefix+'FieldFormat').val(exemptionFormat)
			}
		}
	});
	if(hideTaxIdField){
		$('#js-ab_tax-cert-exemption').css({ 'display':'none'});
	} else{
		$('#js-ab_tax-cert-exemption').css({ 'display':'block'});
	}
	
} 
}

function hideTaxExemptionCertificateFieldsForAddressBook(){
	$('#js-ab_gstExemptCert').css({ 'display':'none'});
	$('#js-ab_pstExemptCert').css({ 'display':'none'});
	$('#js-ab_qstExemptCert').css({ 'display':'none'});
	$('#js-ab_tax-cert-exemption').css({ 'display':'block'});
}

