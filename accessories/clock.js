/*
  Studio 60's countdown script 
*/

var ms_second = 1000;
var ms_minute = ms_second * 60;
var ms_hour = ms_minute * 60;
var ms_day = ms_hour * 24;

// initialise the paramters, then start the countdown
var year = null;
var month = null;
var day = null;
var hour = null;
var minute = null;
var title = 'TIME REMAINING';

$(document).ready(function(){
    var params = getUrlParams();
    if (params['title'] !== undefined) {
        title = params['title'].replace(/\%20/g, ' ');
    }
    $('title').text(title);
    $('#title').text(title);
    year = ensureNumeric(params['year']);
    month = ensureNumeric(params['month']);
    day = ensureNumeric(params['day']);
    hour = ensureNumeric(params['hour']);
    minute = ensureNumeric(params['minute']);
    countdown();
});

// Function to read a page's GET URL variables and return them as an associative array.
function getUrlParams()
{
    var params = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        params.push(hash[0]);
        params[hash[0]] = hash[1];
    }
    return params;
}

// ensure something is some number, default to 0 
function ensureNumeric(x)
{
    x = parseInt(x);
    if (isNaN(x)){
        x = 0;
    }
    return x;
}

// pad number with leading zeros until string has reached a certain length
function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}


function countdown(){
    // this gets called once per second
    var interval_id = setInterval(function(){
        var now = new Date();
        var then = new Date(year, month-1, day, hour, minute);
        if (now >= then){
            // stop updating
            clearInterval(interval_id);
            // show message?
            $('#clock > tbody > tr > td > h1').html('YOUR TIME IS UP!');
        }
        else
        {
            var diff = then.getTime() - now.getTime();
            // find out with what to update each number on the page
            var days_left = parseInt(diff/ms_day);
            var hours_left = parseInt((diff - (days_left * ms_day)) / ms_hour); 
            var minutes_left = parseInt((diff - (days_left * ms_day) - (hours_left * ms_hour)) / ms_minute); 
            var seconds_left = parseInt((diff - (days_left * ms_day) - (hours_left * ms_hour) - (minutes_left * ms_minute)) / ms_second); 
            // update numbers
            $($('#content').children()[0]).html(pad(days_left, 3));
            $($('#content').children()[1]).html(pad(hours_left, 2));
            $($('#content').children()[2]).html(pad(minutes_left, 2));
            $($('#content').children()[3]).html(pad(seconds_left, 2));
        }
    }, 1000);
}



