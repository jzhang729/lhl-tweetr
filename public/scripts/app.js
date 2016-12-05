/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
function createTweetElement (tweet) {
var $tweet = $('<article>').addClass('tweet')
    .append(
        $('<header class="tweet-header">')
            .append($('<img>').addClass('avatar').attr('src', tweet.user.avatars.small))
            .append($('<span>').addClass('name').text(tweet.user.name))
            .append($('<span>').addClass('username').text(tweet.user.handle))
        )
    .append($('<main>').text(tweet.content.text))
    .append($('<footer>')
        .append($('<span class="time-ago">').text(tweet.created_at))
        .append($('<div>').addClass('icons')
            .append($('<i class="fa fa-flag" aria-hidden="true">'))
            .append($('<i class="fa fa-refresh" aria-hidden="true">'))
            .append($('<i class="fa fa-heart" aria-hidden="true">'))
        )
    )

return $tweet;

}

function parseData (timestamp) {
 // parse data here
}

function bindTweetHover () {
    $('article').on('mouseenter', function () {
        $(this).find('div.icons').css({'display':'inline-block'})
    }).on('mouseleave', function () {
        $(this).find('div.icons').css({'display':'none'})
    });
}

function renderTweets (tweets) {
 tweets.forEach((tweet) => {
     $('div#tweets-container').prepend(createTweetElement(tweet));;
 })
 bindTweetHover();
}

$(function () {

    function validateForm (input) {
        var input = $(input);
        if (input.val().length === 0) {
            input.closest('form').find('span.error').text('You must enter some data');
            input.addClass('error');
            return false;
        } else if (input.val().length > 140) {
            input.closest('form').find('span.error').text('Your message is too long');
            input.addClass('error');
            return false;
        } else {
            return true;
        }
    }

    $('form#compose-tweet').on('focus', 'textarea', function (e) {
        $(this).removeClass('error');
        $(this).closest('form').find('span.error').text('');
    });

    $('form#compose-tweet').on('submit', function (e) {
        e.preventDefault();
        $counter = parseInt($('span.counter').text())
        console.log(validateForm('textarea'));

        if (validateForm('textarea')) {
            $.ajax({
                url: '/tweets',
                method: 'POST',
                data: $(this).serialize(),
                success: () => {
                    $(this).find('textarea').val('');
                    $(this).find('textarea').val('').removeClass('error');
                    $(this).find('textarea').trigger('keyup');
                    $(this).find('span.error').text('');
                    loadTweets();
                }
            });
        }

    });

    function loadTweets () {
        $.ajax({
            url: '/tweets',
            method: 'GET',
            dataType: 'json',
            success: function (result) {
                renderTweets(result);
            }
        });
    }

    loadTweets();

});
