// var data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ]

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
