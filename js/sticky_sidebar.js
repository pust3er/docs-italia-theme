// Sticky sidebar
module.exports = themeStickySidebar = (function ($) {

  return {
    init: function() {
      var stickySidebar = new StickySidebar('.sidebar', {
        containerSelector: '.main',
        innerWrapperSelector: '.sidebar__nav',
        topSpacing: 68,
        bottomSpacing: 150
      });

      $('.sidebar__nav .collapse').on('show.bs.collapse', function() {
        $(window).scrollTop($(window).scrollTop()-10);
        $(window).scrollTop($(window).scrollTop()+10);
        stickySidebar.updateSticky();
        // $(window).scroll(); //non sono certo che serva a qualcosa
      }).on('hide.bs.collapse', function() {
        $(window).scrollTop($(window).scrollTop()-10);
        $(window).scrollTop($(window).scrollTop()+10);
        stickySidebar.updateSticky();
        // $(window).scroll();
      });
    }
  }
})(jQuery);
