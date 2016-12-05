// $(function() {
//     var $hero = $('#js-hero');

//   $hero.typed({
//     // stringsElement: $('#js-typed-strings'),
//     typeSpeed: 0,
//     backDelay: 500,
//     onStringTyped: function() {
//         // console.log(this);
//         // $hero.typed('pause');
//         $(".typed-cursor").addClass("typed-cursor__stationary");
//     },
//     preStringTyped: function() {
//         // $hero.typed('pause');
//     }
//   });

//     // $('.stop').on('click', function() {
//     //   $hero.data('typed').pauseTyping();
//     // });

//   $('.js-retype').on('click', function() {
//         $hero.typed('toggleTyped');
//       // $hero.data('typed').continueTyping();
//     });
// });

$(document).ready(function() {
    var $hero = $('#js-hero');
    var $stringElement = $('#js-typed-strings');
    var $cursor = $("<span class=\"js-typed-cursor\">|</span>");
    var cursorStationaryClass = 'js-typed-cursor__stationary';

    // Print the cursor to the DOM
    $hero.after($cursor);

    // Hide stringElement
    $stringElement.hide();

    var getStrings = function() {
        // Build a strings variable containing all strings to be shown
        var $strings = $stringElement.children();
        var strings = [];
        $.each($strings, function(key, value){
            strings.push($(value).html());
        });

        // Shuffle the strings, *except* the first
        var shuffledStrings = [strings[0]];

        // Remove the first element...
        strings.shift();

        // Shuffle things up a bit...
        shuffle(strings);

        // And return the concatenation of both arrays
        return shuffledStrings.concat(strings);
    }

    var strings = getStrings();

    console.log(strings);

    var typewriteString = function(curString, curStrPos, backspace) {
        // Remove stationary class from cursor
        if(curStrPos === 0) {
            $cursor.removeClass(cursorStationaryClass);
        }

        // skip over html tags while typing
        var curChar = curString.substr(curStrPos).charAt(0)
        if (curChar === '<' || curChar === '&') {
            var tag = '';
            var endTag = '';
            if (curChar === '<') {
                endTag = '>'
            }
            else {
                endTag = ';'
            }
            while (curString.substr(curStrPos + 1).charAt(0) !== endTag) {
                tag += curString.substr(curStrPos).charAt(0);
                curStrPos++;
                if (curStrPos + 1 > curString.length) { break; }
            }
            curStrPos++;
            tag += endTag;
        }

        var randomDelay = Math.round(10 + Math.random() * 70)

        // timeout for any pause after a character
        setTimeout(function() {
            if (curStrPos === curString.length) {
                // When we are finished typing, add/remove class to cursor
                $cursor.addClass(cursorStationaryClass);
            } else {
                // add characters one by one
                curStrPos++;

                $hero.html(curString.substr(0,curStrPos));

                // loop the function
                typewriteString(curString, curStrPos, backspace);
            }
            // end of character pause
        }, randomDelay);
    }

    var backspaceString = function(curString, curStrPos, callback) {
        // Remove stationary class from cursor
        if(curStrPos === curString.length) {
            $cursor.removeClass(cursorStationaryClass);
        }

        // skip over html tags while backspacing
        if (curString.substr(curStrPos).charAt(0) === '>') {
            var tag = '';
            while (curString.substr(curStrPos - 1).charAt(0) !== '<') {
                tag -= curString.substr(curStrPos).charAt(0);
                curStrPos--;
                if (curStrPos < 0) { break; }
            }
            curStrPos--;
            tag += '<';
        }

        var randomDelay = Math.round(10 + Math.random() * 70)

        // timeout for any pause after a character
        setTimeout(function() {
            if (curStrPos === 0) {
                // When we are finished backspacing, add/remove class to cursor
                $cursor.addClass(cursorStationaryClass);

                // And execute the callback
                if(typeof callback == 'function') {
                    callback();
                }
            } else {
                // remove characters one by one
                curStrPos--;
                $hero.html(curString.substr(0,curStrPos));

                // loop the function
                backspaceString(curString, curStrPos, callback);
            }
            // end of character pause
        }, randomDelay);
    }

    var counter = 0;
    var printNextString = function() {
        var oldCounter = counter;
        counter = (counter + 1) % strings.length;

        // Remove the string currently visible
        backspaceString(strings[oldCounter], strings[oldCounter].length, function() {
            typewriteString(strings[counter], 0);
        });

        // Print the next string
        // typewriteString(strings[counter], 0);
    }

    // Print the first string
    typewriteString(strings[0], 0);

    $(".js-retype").on("click", function() {
        printNextString();
    });

});

/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}
