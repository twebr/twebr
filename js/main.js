$(function() {
    var $hero = $('#js-hero');

  $hero.typed({
    // stringsElement: $('#js-typed-strings'),
    typeSpeed: 0,
    backDelay: 500,
    onStringTyped: function() {
        // console.log(this);
        // $hero.typed('pause');
        $(".typed-cursor").addClass("typed-cursor__stationary");
    },
    preStringTyped: function() {
        // $hero.typed('pause');
    }
  });

    // $('.stop').on('click', function() {
    //   $hero.data('typed').pauseTyping();
    // });

  $('.js-retype').on('click', function() {
        $hero.typed('toggleTyped');
      // $hero.data('typed').continueTyping();
    });
});




// $(function(){

//     options = {
//         // strings: ["Typed.js is a <strong>jQuery</strong> plugin.", "It <em>types</em> out sentences.", "And then deletes them.", "Try it out!"],
//         stringsElement: $('#js-typed-strings'),
//         typeSpeed: 10,
//         backDelay: 500,
//         // loop: false,
//         // contentType: 'html', // or text
//         // defaults to false for infinite loop
//         // loopCount: false,
//         callback: function(){
//             // In a perfect world, '.typed-cursor' would refer to the option set in the $typed function (but I don't know how to do that and this works as well)
//             $(".typed-cursor").addClass("typed-cursor__stationary");
//         },

//         onStringTyped: function() {
//             console.log(this);
//             // this.backDelay = 10000;
//         }

//         // resetCallback: function() { newTyped(); }
//     };

//     $("#js-typed").typed(options);

//     $(".js-reset").click(function(){

//         console.log(options.stringsElement);

//         $("#js-typed").typed(options);
//     });

// });
