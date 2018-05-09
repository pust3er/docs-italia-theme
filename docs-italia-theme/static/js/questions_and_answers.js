$('.question-and-answers .glossary dt').each(function() {
  var keywords = $('.question-and-answers .pull-quote li a[href="#' + $(this).attr('id') + '"]');
  var id = $(this).attr('id');
  var term = $(this).next('dd');
  keywords.each(function(index) {
    var trigger_id = id + '-' + index;
    var definition = $(document.createElement('div'))
      .addClass('Dropdown-menu u-borderShadow-l u-background-white u-layout-prose u-padding-r-all u-textWeight-400')
      .attr('id', trigger_id).attr('data-menu', '');
    $(document.createElement('span'))
      .addClass('Icon-drop-down Dropdown-arrow u-color-white')
      .appendTo(definition);
    $(document.createElement('span'))
      .addClass('u-layout-prose u-text-r-xs')
      .html(term.html())
      .appendTo(definition);
    $(this).closest('li').append(definition);
    $(this).attr('data-menu-trigger', trigger_id).addClass('Tooltip-toggle');
    $(this).click(function() {
      $(this).focus();
    });
  });
});
