/* global Spark */
'use strict';

function validatePassword(input, val) {

}

function debounce(func, delay) {
    var timer;
    return function () {
        var args = arguments;
        if (timer) window.clearTimeout(timer);
        timer = window.setTimeout(function () {
            func.apply(this, args);
        }, delay);
    };
}

function getBool(val) {
    var num;
    return val != null && (!isNaN(num = +val) ? !!num : !!String(val).toLowerCase().replace(!!0, ''));
}

function incrementProgress(obj, val, stop) {
    val = val || 0.01;
    stop = stop || 1;
    obj.set(Math.min(val, 1));
    if (val < 1 && val < stop) {
        window.setTimeout(function () {
            incrementProgress(obj, val + 0.01, stop);
        }, 50);
    }
    else if (val >= stop) {
        // STOP THE MADNESS
        return;
    }
    else {
        window.setTimeout(function () {
            obj.set(0);
            window.setTimeout(function () {
                incrementProgress(obj, 0);
            }, 500);
        }, 2000);
    }
}

function daysTill() {
    //----------  EDIT THE VARIABLES BELOW  ------------------
    // EDIT THE VARIABLES BELOW
    var day = 2; // Day
    var month = 11; // Month
    var year = 2015; //Year
    //----------  END OF EDIT  -------------------------------

    var daystocount = new Date(year, month - 1, day);
    var today = new Date();
    if (today.getMonth() === month && today.getDate() > day);
    daystocount.setFullYear(daystocount.getFullYear());
    var oneday = 1000 * 60 * 60 * 24;
    return (Math.ceil((daystocount.getTime() - today.getTime()) / (oneday)));
}


document.addEventListener('DOMContentLoaded', function () {

    $('.spark-panel .spark-panel__heading[data-href]').on('click', function () {
        window.location = $(this).attr('data-href');
    });

    var inputs = document.querySelectorAll('.spark-input');
    for (var i = 0, len = inputs.length; i < len; i++) {
        new Spark.TextInput(inputs[i], {
            onChange: debounce(validatePassword, 750)
        });
    }

    var selects = document.querySelectorAll('.spark-select');
    for (i = 0, len = selects.length; i < len; i++) {
        new Spark.SelectInput(selects[i]);
    }

    // $('.spark-slider').sparkSlider();
    var sliders = document.querySelectorAll('.spark-slider, .spark-slider--input, .spark-slider--integrated');
    for (i = 0, len = sliders.length; i < len; i++) {
        new Spark.Slider(sliders[i]);
    }

    // $('.spark-range-slider').sparkRangeSlider();
    var rangeSliders = document.querySelectorAll('.spark-range-slider');
    for (i = 0, len = rangeSliders.length; i < len; i++) {
        new Spark.RangeSlider(rangeSliders[i]);
    }

    // $('.spark-tabs').sparkTabs();
    var tabs = document.querySelectorAll('.spark-tabs');
    for (i = 0, len = tabs.length; i < len; i++) {
        new Spark.Tabs(tabs[i]);
    }

    // $('.spark-table').sparkTable();
    var table = document.querySelectorAll('.spark-table');
    for (i = 0, len = table.length; i < len; i++) {
        new Spark.Table(table[i]);
    }

    // $('.spark-menu:not(.spark-header__menu)').sparkMenu();
    var menu = document.querySelectorAll('.spark-menu:not(.spark-header__menu)');
    for (i = 0, len = menu.length; i < len; i++) {
        new Spark.Menu(menu[i]);
    }

    // $('.spark-header').sparkHeader();
    var header = document.querySelectorAll('.spark-header');
    for (i = 0, len = header.length; i < len; i++) {
        new Spark.Header(header[i]);
    }

  // $('.spark-modal').sparkModal();
  var modal = document.querySelectorAll('[data-modal]');
  for(i = 0, len = modal.length; i < len; i++) {
    new Spark.Modal(modal[i]);
  }

    // $('[role="progressbar"]').sparkProgressIndicator();
    // $('[role="progressbar"]').sparkProgressIndicator.set(25); @todo: make this work
    //  var progress = document.querySelectorAll('[role="progressbar"]');
    var progress = document.querySelectorAll('.spark-progress');
    for (i = 0, len = progress.length; i < len; i++) {
        if (progress[i].querySelector('progress').getAttribute('value') === null)
            new Spark.ProgressIndicator(progress[i]);
        else if (progress[i].querySelector('progress').getAttribute('type') === 'brand') {
            // calculate percentage between dates
            var totalDays = 30;
            console.log(daysTill());
            var remainingDays = daysTill();
            var sub = totalDays - remainingDays || 1;
            var percentage = ((sub) / totalDays);
            incrementProgress(new Spark.ProgressIndicator(progress[i]), 0, percentage);
        }
        else
            incrementProgress(new Spark.ProgressIndicator(progress[i]));
    }

    // $('[data-role="expand"]').sparkExpand();
    var expands = document.querySelectorAll('.spark-expand, .spark-panel--expand');
    for (i = 0, len = expands.length; i < len; i++) {
        new Spark.Expand(expands[i]);
    }

    var popovers = document.querySelectorAll('.spark-popover');
    for (i = 0, len = popovers.length; i < len; i++) {
        new Spark.Popover(popovers[i]);
    }

    $('button[data-role="expand-code"]').off().on('click', function () {
        // Grab state, since it might be different on exapnd
        var code = $(this).parents('.expand-code-wrapper').find('.live-example[data-expand-code]');
        var state = code.attr('data-expand-code');
        if (state) {
            state = getBool(state);
            $(this).text($(this).attr('data-label-' + state));
            //Toggle state
            code.attr('data-expand-code', !state);
        }
    });

    $('button[data-role="expand-all-code"]').off().on('click', function () {
        var state = $(this).attr('data-expand-code');
        if (state) {
            state = getBool(state);
            $(this).text($(this).attr('data-label-' + state));
            // Toggle state
            $(this).attr('data-expand-code', !state);
            // Click all buttons with same state
            $('pre[data-expand-code="' + state + '"]').siblings('button[data-role="expand-code"]').click();
        }
    });

    // Make buttons lose focus after they're clicked - for demo purposes since they're placeholders.
    $('#main__content').find('.spark-btn').click(function () {
        this.blur();
    });

    // Remove checkbox group error state for demo purposes
    $('.spark-checkbox-group[data-error] [type="checkbox"]').on('change', function () {
        var parent = $(this).parents('.spark-checkbox-group');
        var hasValue = parent.find('[type="checkbox"]:checked').length;
        parent.get(0)[hasValue ? 'removeAttribute' : 'setAttribute']('data-error', true);
    });
});


// Scrolling Functions
$(window).scroll(function () {

    // How many pixels from top of page
    var wScroll = $(this).scrollTop();

    // Condense the Header
    if (wScroll < 90) {
        $('.spark-header').removeClass('spark-header--condensed spark-header--opacity');
    } else {
        $('.spark-header').addClass('spark-header--condensed spark-header--opacity');
    }
});