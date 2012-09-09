$(function () {
    /*
	// addDelay funtion: randomly adds the 'live' class to each item
	// param: elements = item container element ie addDelay($('article'));
	*/
    function addDelay(elements) {
        var timeArray = new Array(200, 600, 1000, 1400, 1800, 2200, 2600);

        for (var count = 0; count < elements.length; count++) {
            setTimeout('$("article").eq(' + count + ').addClass("live")', timeArray[parseInt(Math.random() * 6)]);
        }
    }

    /*
	// fullySupported funtion: code for supportive browsers
	*/
    function fullySupported() {
        // cache the clicked item
        var $element = $(this);

        $("article").click(function () {
            $("article").not($element).toggleClass("gone");
            $element.toggleClass("full");
            $element.toggleClass("live");
        });
        addDelay($("article"));
    }

    /*
	// nonSupportive funtion: code for non-supportive browsers
	*/
    function nonSupportive() {
        /* here is where you fall back would go */
        /* fold IE and pre firefox 3.5 browsers */

        // Using the below (the same as for supportive browsers, you'll get instant, non animated changes /effects
        /*
		$("article").click(function () {
			$("article").not($(this)).toggleClass("gone");
			$(this).toggleClass("full");
			$(this).toggleClass("live");
		}); 
		*/

        // Or you can use this code, and get jquery animation effects to replace the css transitions
        $("article").click(function () {

            // cache the clicked item
            var $element = $(this);

            if (!$element.hasClass("full")) {

                $("article").not($element).animate({ 'opacity': 0 }, 1000);

                $element.animate({
                    'width': '915px',
                    'height': '350px',
                    'opacity': 1
                }, 4000, function () {
                    $(this).addClass("full");
                });

            } else {
                $("article").not($element).animate({ 'opacity': 1 }, 1000);

                $element.animate({
                    'width': '278px',
                    'height': '150px',
                    'opacity': 1
                }, 4000, function () {
                    $element.removeClass("full");
                    $element.addClass("live");
                });
            }
        });

        addDelay($("article"));
    }

    /*
	// Modernizr test for css transition support
	*/
    if (!Modernizr.csstransitions) {
        nonSupportive();
    }
    else {
        fullySupported();
    }
});
