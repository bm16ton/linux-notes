
//Validate email in the coc modal on change
$("#coc-email").change(function(){ 
       var deliveryEmailId = $('#coc-email').val();
       if (deliveryEmailId == "" || !validateEmailForCoC(deliveryEmailId)) {
           $('#coc-email-error').css('display', 'block');
       }
       else{
           $('#coc-email-error').css('display', 'none');
}
});

//Populate the hidden inputs of #target-coc-main-modal on clicking .coc-request-link-standard
$('.coc-request-link-standard').click(function(e) {
	var defaultEmail = $('#tiB2CPaid-defaultEmail').val();
    $(".modal-body #coc-email").val(defaultEmail);
    $(".modal-body #coc-deliveryNo").val($(this).attr('data-deliveryNo'));
    $(".modal-body #coc-entryId").val($(this).attr('data-entryId'));
    if(defaultEmail !=null && defaultEmail!=''){
    	 $('#coc-email-error').css({
    	    	'display':'none',
    	    });
    }
});

//Trigger CoC email request to backend if valid email is provided and display the appropriate response modal depending on API call result.
$('#coc-email-modal-send-button').click(function(e) {
    e.preventDefault();
    $('#coc-email-error').css({
        'display': 'none',
    });

    var orderCodeOriginal = $('#paid-invoice-orderCode').val();
    var guestCustomer = $('#guestCustomer').val();
    var orderGuid = $('#paid-invoice-orderGuid').val();

    var deliveryEmailId = $('#coc-email').val();
    var deliveryNo = $('#coc-deliveryNo').val();
    var orderEntryId = $('#coc-entryId').val();

    var url,orderCode;
    if(guestCustomer  === 'true')
	{
	url = ACC.config.encodedContextPath+"/guest/coc-email?"
	orderCode = orderGuid;
	}
    else
	{
	url = ACC.config.encodedContextPath+"/myaccount/coc-email?"
	orderCode = orderCodeOriginal;
	}

    if (deliveryEmailId == "" || !validateEmailForCoC(deliveryEmailId)) {
        $('#coc-email-error').css('display', 'block');
    } else {
        $('#coc-email-error').css('display', 'none');
        $.ajax({
            url: url,
            data: {
                orderCode: orderCode,
                deliveryEmailId: deliveryEmailId,
                deliveryNo: deliveryNo,
                orderEntryId: orderEntryId
            },
            success: function(res) {
                if (res === true) {
                    $("#target-coc-main-modal").modal('hide');
                    $("#coc-email-confirm-modal").modal('show');
                } else {
                    sendErrorMessageToGA('coc-email-failure-msg','cofc_error');
                    $("#target-coc-main-modal").modal('hide');
                    $("#coc-email-failure-modal").modal('show');
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                console.log("Error while making coc email request.Status: " + textStatus +",Error: " + errorThrown); 
                sendErrorMessageToGA('coc-email-failure-msg','cofc_error');
                $("#target-coc-main-modal").modal('hide');
                $("#coc-email-failure-modal").modal('show');
            }    
        });
    }
});

//Close the target-coc-main-modal on clicking the cancel button within it
$('#coc-email-modal-cancel-button').click(function(e){
    $("#target-coc-main-modal").modal('hide');
});

//Email Validator
function validateEmailForCoC(emailId) {
    var emailPattern = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,20}$/;
    return emailPattern.test(emailId);
}

// Send Error message to GA on clicking the C-of-c special link
$('#target-coc-special-modal').click(function(e){  
    sendErrorMessageToGA('coc-email-special-msg','cofc_special');
});