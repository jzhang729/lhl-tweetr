$(function () {
    $('section.new-tweet').on('keydown', 'textarea', function () {
        var remainingChars = 140 - $(this).val().length;
        $counter = $(this).closest('form').find('span.counter')
        if (remainingChars < 0) {
            $counter.addClass('negative');
        } else {
            $counter.removeClass('negative');
        }
        $counter.text(remainingChars);
    });
});
