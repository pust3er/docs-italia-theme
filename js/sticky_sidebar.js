// Module dependencies
var StickySidebar = require('sticky-sidebar');

// This Function will always return the initial font-size of the html element
var rem = function rem() {
  var html = document.getElementsByTagName('html')[0];

  return function () {
    return parseInt(window.getComputedStyle(html)['fontSize']);
  }
}();

// This function will convert pixel to rem
function toRem(length) {
  return (parseInt(length) / rem());
}

function toPix(length) {
  return (parseInt(length) * rem());
}

// Sticky sidebar
module.exports = themeStickySidebar = (function ($) {

  return {
    init: function(callback) {

      $(document).ready(function () {

        $(window).on('scroll', function(event) {
            var scrollPosition = $(window).scrollTop(),
              scroll_offset = $('header').outerHeight(),
              sidebar = $('#desktop-menu'),
              sidebar_container_height = sidebar.closest('.docs-italia-menu').outerHeight(),
              sidebar_main_container = sidebar.closest('#main'),
              window_height = $(window).outerHeight();

            function sidebar_offset() {
              // return sidebar.offset().top - $('.doc-header-room').outerHeight(true) + parseInt($('.docs-italia-menu').css('padding-top'));
              // return sidebar.offset().top - parseInt($('.docs-italia-menu').css('padding-top'));
              // 132 invece di 200
              // return sidebar.offset().top - $('.doc-header-room').outerHeight(true) - parseInt($('.docs-italia-menu').css('padding-top'));
              // console.log(sidebar_container.offset().top  + $('header').outerHeight(true));
              return sidebar_main_container.offset().top  + $('header').outerHeight(true) < scrollPosition;
            }

            function below_sidebar_bottom(arbitrary_offset) {
              return scrollPosition + window_height >= sidebar_container_height + scroll_offset + arbitrary_offset;
            }

            function above_sidebar_top() {
              return scrollPosition < sidebar.offset().top;
            }

            function addStickyStyle() {
              sidebar.addClass('sticky');
              var width = sidebar.outerWidth(),
                left = sidebar.offset().left,
                top = 'auto';
              sidebar.css('position', 'fixed')
                .css('width', width)
                .css('left', left)
                .css('top', top)
                .css('transform', '');
            }

            function addBottomStyle(arbitrary_offset) {
              console.log('added bottom style');
              console.log(scrollPosition + window_height, sidebar_container_height + scroll_offset, '=?=', sidebar_main_container.outerHeight() + scroll_offset);
              addTopStyle();
              var height = Math.min(
                (scrollPosition + window_height) - (sidebar_container_height + scroll_offset + arbitrary_offset),
                (sidebar_main_container.outerHeight() + scroll_offset) - (sidebar_container_height + scroll_offset + arbitrary_offset)
              );
              console.log('height', height);
              sidebar.css('transform',
                'translateY(' + height +'px)');
            }

            function addTopStyle() {
              sidebar.removeClass('sticky');
              sidebar.css('position', '')
                .css('width', '')
                .css('left', '')
                .css('top', '')
                .css('transform', '');
            }

            if (below_sidebar_bottom(20 /* space from the bottom edge of the window */)) {
              // console.log('you are below');
              addBottomStyle(20 /* space from the bottom edge of the window */);
            } else if (above_sidebar_top()) {
              // console.log('you are above');
              addTopStyle();
            }
            //  else {
            //   console.log('you are in the middle');
            //   addStickyStyle();
            // }
        });

        $('#desktop-menu .collapse').on('shown.bs.collapse', function() {
          // console.log('triggered collapse stuff');
          $(window).scroll();
        }).on('hidden.bs.collapse', function() {

          $(window).scroll();
          // console.log('triggered collapse stuff');
        });

        $(document).on('resize', function() {
          // console.log('triggered collapse stuff');
          $(window).scroll();
        });

      });



    }
  }

})(jQuery);
