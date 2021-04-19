
/* --------- Price Formatting from TI.com Start ----------*/

// Add to cart pop-up in Search results and PDP page
$(window).load(function() {
	var addToCartTarget = $("#add-to-cart-modal-body")[0];
	
	var addToCartObserver = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			formatDisplayedPrice();
		});
	});
	var config = {
		attributes : true,
		childList : true,
		characterData : true
	};
	if(addToCartTarget !== undefined ) {
		addToCartObserver.observe(addToCartTarget, config);
	}
});

//Minicart Popup
$(window).load(function() {
	var minicartTarget = $("#mini-cart-body")[0];
	
	var addToCartObserver = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			formatDisplayedPrice();
		});
	});
	var config = {
		attributes : true,
		childList : true,
		characterData : true
	};
	if(minicartTarget !== undefined ) {
		addToCartObserver.observe(minicartTarget, config);
	}
});

//Shipping method selector
$(window).load(function() {
	$("#delivery_method > option").each(function()
	{
		var shippingCost = $(this).data("shippingcost")
		var shippingCountry = $(this).data("shippingcountry")
		var currentCurrency = $("ti-header-currency-selection").val()
		var currentLang = $("ti-header-language-selection").val()
		var fmtShippingCost= com.TI.CurrencyFormat.format(shippingCost, false, currentCurrency, currentLang);
		if(fmtShippingCost.includes("NaN")){
			fmtShippingCost = shippingCost;
		}
		if(shippingCost > 0){
			$(this). html(this.id + " - " + shippingCountry + " - " + fmtShippingCost);
		}
		else {
			$(this). html(this.id + " - " + fmtShippingCost);
		}
	});
});

// MiniCart Counter Observer
$(document).on('ready',function() {
	var miniCartPriceSelectorTarget = $(".mini-cart-price")[0];
	var miniCartPriceSelectorObserver = new MutationObserver(function(mutations) {
			var miniCartPrice = $('.mini-cart-price span').text();
			var currentCurrency = $("ti-header-currency-selection").val()
			var currentLang = $("ti-header-language-selection").val()
			var fmtMiniCartPrice = com.TI.CurrencyFormat.format(miniCartPrice, false, currentCurrency, currentLang);
			if(fmtMiniCartPrice.includes("NaN")){
				fmtMiniCartPrice = miniCartPrice;
			}
			$('.mini-cart-price span').text(fmtMiniCartPrice);
			$('.mini-cart-price span').data('isformatted', true);					
	});
	var config =  {
		attributes : true,
		childList : true,
		characterData : true
	};
	if(miniCartPriceSelectorTarget !== undefined ) {
		miniCartPriceSelectorObserver.observe(miniCartPriceSelectorTarget, config);
	}
});

var tiCurrencyReadyState = {'format': false, 'currency': false, 'language': false};
var isFormatDisplayedPriceInvoked = false;

function isCurrencyFormatReady() {
	 const win = typeof window !== 'undefined' ? window : {};
	 var currencyFormatReady =  win.com && win.com.TI && win.com.TI.CurrencyFormat;
	 if(currencyFormatReady.getInstance !== 'undefined'){
		 tiCurrencyReadyState['format'] = true;
	 }
	 return currencyFormatReady;
}


function isCurrencyStateReady() {
	return (tiCurrencyReadyState['format'] || isCurrencyFormatReady()) && tiCurrencyReadyState['currency'] && tiCurrencyReadyState['language'];
}

document.addEventListener('tiCurrencyFormatReady', function() {
	tiCurrencyReadyState['format'] = true;
	if(isCurrencyStateReady()){
		formatDisplayedPrice();	
	}
});

document.addEventListener('tiLanguageReady', function() {
	tiCurrencyReadyState['language'] = true;
	if(isCurrencyStateReady()){
		formatDisplayedPrice();	
	}
});



document.addEventListener('tiCurrencyReady', function() {
	tiCurrencyReadyState['currency'] = true;
	if(isCurrencyStateReady()){
		formatDisplayedPrice();	
	}
});

function formatDisplayedPrice(){
	var currentCurrency = $("ti-header-currency-selection").val()
	var currentLang = $("ti-header-language-selection").val()
	
		$(".js-calculated-price").each(
			function() {
				var fmtCalcPrice;
				var isFormatted = $(this).data("isformatted");
				if (isFormatted !== undefined && isFormatted === false) {
					
					var calcPrice = $(this).text();
					var currencyIso = $(this).data("currencyiso");
					if (currencyIso !== undefined && currencyIso !== '') {
						fmtCalcPrice = com.TI.CurrencyFormat.format(calcPrice,
								false, currencyIso, currentLang);
					} else {
						fmtCalcPrice = com.TI.CurrencyFormat.format(calcPrice,
								false, currentCurrency, currentLang);
					}
					if(fmtCalcPrice.includes("NaN")){
						fmtCalcPrice = calcPrice;
					}
					$(this).text(fmtCalcPrice);
					$(this).data("isformatted", true)
				}

			});
	
	$(".js-unit-price").each(function(){
		var fmtUnitPrice;
		var isFormatted = $(this).data("isformatted");
		if(isFormatted !== undefined && isFormatted === false) {
			var currencyIso = $(this).data("currencyiso");
			var unitPrice = $(this).text();
			if (currencyIso !== undefined && currencyIso !== '') {
				fmtUnitPrice= com.TI.CurrencyFormat.format(unitPrice, true, currencyIso, currentLang);
			}
			else{
				fmtUnitPrice= com.TI.CurrencyFormat.format(unitPrice, true, currentCurrency, currentLang);
			}
			if(fmtUnitPrice.includes("NaN")){
				fmtUnitPrice = unitPrice;
			}
			$(this).text(fmtUnitPrice);
			$(this).data("isformatted", true)
		}
	});
	
	isFormatDisplayedPriceInvoked = true;
	
}

$(window).load(function() {
	
	if(!isFormatDisplayedPriceInvoked && isCurrencyFormatReady()){
		formatDisplayedPrice();
	}
});

/* --------- Price Formatting from TI.com End ---------- */
