$(function () {
    function updateCounter () {
        var remainingChars = 140 - $('form#compose-tweet textarea').val().length;
        var $counter = $(this).closest('form').find('span.counter')
        if (remainingChars < 0) {
            $counter.addClass('negative');
        } else {
            $counter.removeClass('negative');
        }
        $counter.text(remainingChars);
    }

    $('section.new-tweet').on('keyup', 'textarea', updateCounter);
});
