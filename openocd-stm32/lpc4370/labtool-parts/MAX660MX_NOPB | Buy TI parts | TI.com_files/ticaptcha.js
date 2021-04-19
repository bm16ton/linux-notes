ACC.captcha = {
	bindAll: function ()
	{
		this.renderWidget();
	},

	renderWidget: function ()
	{
		$.ajax({
			url: ACC.config.encodedContextPath + "/register/captcha/widget/recaptcha",
			type: 'GET',
			cache: false,
			success: function (html)
			{
				if ($(html) != [])
				{
					$(html).appendTo('.js-recaptcha-ticaptcha');
					$.getScript('https://www.recaptcha.net/recaptcha/api.js?hl=' + document.documentElement.lang, function ()
					{
						if ($('#recaptchaChallangeAnswered').val() == 'false')
						{
							$('#g-recaptcha_incorrect').show();
						}
					});
				}
			}
		});
	}
};

$(document).ready(function ()
{
	if ($('#orderDetailForm').html() != null)
	{
		ACC.captcha.bindAll();
	}
});
