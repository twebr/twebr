(function () {
    (function ($) {
        'use strict';
        var floatingLabel;
        floatingLabel = function (onload) {
            var $input;
            $input = $(this);
            if (onload) {
                $.each($('.bt-flabels__wrapper input, .bt-flabels__wrapper textarea'), function (index, value) {
                    var $current_input;
                    $current_input = $(value);
                    if ($current_input.val()) {
                        $current_input.closest('.bt-flabels__wrapper').addClass('bt-flabel__float');
                    }
                });
            }
            setTimeout(function () {
                if ($input.val()) {
                    $input.closest('.bt-flabels__wrapper').addClass('bt-flabel__float');
                } else {
                    $input.closest('.bt-flabels__wrapper').removeClass('bt-flabel__float');
                }
            }, 1);
        };
        $('.bt-flabels__wrapper input, .bt-flabels__wrapper textarea').keydown(floatingLabel);
        $('.bt-flabels__wrapper input, .bt-flabels__wrapper textarea').change(floatingLabel);
        window.addEventListener('load', floatingLabel(true), false);
        $('.js-flabels').parsley().on('form:error', function () {
            $.each(this.fields, function (key, field) {
                if (field.validationResult !== true) {
                    field.$element.closest('.bt-flabels__wrapper').addClass('bt-flabels__error');
                }
            });
        });
        $('.js-flabels').parsley().on('field:validated', function () {
            if (this.validationResult === true) {
                this.$element.closest('.bt-flabels__wrapper').removeClass('bt-flabels__error');
            } else {
                this.$element.closest('.bt-flabels__wrapper').addClass('bt-flabels__error');
            }
        });
    }(jQuery));
}.call(this));

// Check if form has been submitted
var params = parseURLParams(window.location.search);

// console.log(params);

if(params !== undefined && params.name !== undefined) {
    $(".js-form-confirmation").text("Thanks " + capitalizeFirstLetter(params.name[0]) + "! I received your message.");
    console.log("Form filled out by " + params.name[0]);
}

function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") {
        return;
    }

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=");
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) {
            parms[n] = [];
        }

        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
