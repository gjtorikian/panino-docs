$(function () {
    'use strict';

    var baseTitle = document.title, // base (general) part of title
    pathName = window.location.pathname,
    fileName = pathName.substring(window.location.pathname.lastIndexOf("/") + 1);
  
    if(window.addEventListener)
        window.addEventListener('load', loadCallback, true);
    else
        window.attachEvent('load', loadCallback, true);

    if (pathName.indexOf("nodejs_ref_guide") >= 0)
        $('li#node_js_ref').addClass("active");
    else if (pathName.indexOf("nodejs_dev_guide") >= 0)
        $('li#nodejs_dev_guide').addClass("active");
    else if (pathName.indexOf("js_doc") >= 0)
        $('li#js_doc').addClass("active");
            
    function loadCallback(evt){
        var form = document.getElementById("searchbox");
        var input = form.query;
        form.onsubmit = function (evt) {
            var query = input.value;
            if (query) {
                input.value = "";
                input.blur();
                var currentVersion = $('#currentVersion').text();
                var url = "https://www.google.com/search?q=" + encodeURIComponent("site:nodemanual.org/" + currentVersion + " " + query);
                window.open(url);
            }
            return false;
        };
    }

    var fileNameRE = new RegExp("^" + fileName, "i");

    $('a.menuLink').each(function(index) {
        if ($(this).attr("href").match(fileNameRE))
        {
            $(this).addClass("currentItem");
            return false;
        }
    });

    // init search
    $('#search')
    // prevent from form submit
    .on('submit', function () {
        return false;
    })
    .find('input');

    // init prettyprint
    $('pre > code').addClass('prettyprint');
    prettyPrint();
  
    //set the height of the sidebar
    var bgHeightSet = false;

    // handle header transformations
    var $pagination    = $('.members');
    var $paginationContent = $('.membersContent');
    var $tabs = $('.tabs');
    var $topSection = $('#topSection');

    var paginationItr = -1;

    function handleScroll() {
        var s, sx;
        
        // scrolling offset calculation via www.quirksmode.org
        if (window.pageYOffset || window.pageXOffset) {
            s = window.pageYOffset;
            sx = window.pageXOffset;
        }
        else if (document.documentElement 
          && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
            s = document.documentElement.scrollTop;
            sx = document.documentElement.scrollLeft;
        }
        else if (document.body) {
            s = document.body.scrollTop;
            sx = document.body.scrollLeft;
        }

        if (document.documentElement.offsetWidth < 1010) {
            if (sx <= 0) sx = 0;
            else if (sx + document.documentElement.offsetWidth > 1010) 
                sx = 1010 - document.documentElement.offsetWidth;
        }
        else
            sx = 0;

        $topSection.css({'left': -1 * sx});
        
        if (s > 163) { //header_offset - 35) {
            $paginationContent.eq(paginationItr).css('left', -1 * sx);
            
            if (bgHeightSet)
                return;
            
            paginationItr++;

            $paginationContent.eq(paginationItr).css('top', 0);
            
            $pagination.eq(paginationItr)
            .addClass('shadow')
            .stop().css({height: 31})
            .closest('.content').addClass('srolled');

            $tabs.eq(paginationItr).addClass('tabsSansBorder');
            
            bgHeightSet = true;
        }
        else {
            if (!bgHeightSet)
                return;
            

            $paginationContent.eq(paginationItr).stop().css({top:11});
            $pagination.eq(paginationItr).css({'position': 'absolute', 'top': 193});

            // seem to not be able to combine stop() with removeClass()/css()
            $pagination.eq(paginationItr).removeClass('shadow').css({height: 42});
            $pagination.eq(paginationItr).stop();

            $paginationContent.eq(paginationItr).css('left', 0);
              
              setTimeout(function(){
                    $pagination.eq(paginationItr)
                    $paginationContent.eq(paginationItr).css({'top': ''});
                    $pagination.eq(paginationItr).css({'position': '', 'top': ''});
                    $paginationContent.eq(paginationItr).css('left', 0);
                    $pagination.eq(paginationItr).closest('.content').removeClass('srolled')
                    $tabs.eq(paginationItr).removeClass('tabsSansBorder');
                    paginationItr--;
            }, 300);

            bgHeightSet = false;
        }
    }
    
    
    $(window)
    .scroll(function(){//auto kanei to header na metakinhtai kai na einai panta visible;
        handleScroll();
    }).resize(function(){
       //handleWinSize(); 
    });
    handleScroll();
    //handleWinSize();
});

$(document).ready(function(){
    var d = 'a.menu, .dropdown-toggle'
    function clearMenus() {
        $(d).parent('li').each(function(){
            $(this).removeClass('open')
        });
    }
    
    $('span.methodClicker, article.article, h3.methodClicker').each(function(){
        var a = $(this);
        var constructorPos = a.attr("id").indexOf("new ");

        var objName = a.attr("id");
        if (constructorPos >= 0)
        {
            objName = objName.substring(constructorPos + 4);
            objName += ".new";  
        }
       
        a.attr("id", "js_" + objName);
    });
    
    $('.brand').parent('.dropdown').hover(
        function(){
            $(this).addClass('open');
        }, 
        function(){
            clearMenus();
        });
    
    $('.versions').hover(
        function(){
            $(this).addClass('open');
        }, 
        function(){
            clearMenus();
        });

    function showMethodContent(){
        if(!location.hash)
            return;

        var $clickerEl = $('span#js_' + location.hash.replace(/^#/,'').replace(/\./g, '\\.'));
        if ($clickerEl.length > 0 && $clickerEl.hasClass('methodClicker')) {
            var p = $clickerEl.parent();
            p[0].force = true;
            p.trigger('click');
            p[0].force = false;
        }
    }
    
    if (location.hash) {
        showMethodContent();
        var data = location.hash;
        scrollTo(null, data.substr(1));
    }
    
    window.onhashchange = function(){
        showMethodContent();
    }
    
    //$('#content article:last').css('padding-bottom', 50);
});

function scrollTo(el, data){
    if (!data) {
        data = el.getAttribute("data-id");
        location.hash = data;
    }
    var el = $("span#js_" + data.replace(/\./g, "\\."))[0];
    if (!el) return;
    
    var article = $(el).closest('.article')[0];

    var top = article.offsetTop - 100;

    if (document.body.scrollTop > top 
      || document.body.scrollTop != top && document.body.scrollTop 
        + (window.innerHeight || document.documentElement.offsetHeight) <
          top + article.offsetHeight) {
         $('body').animate({scrollTop : top}, {
             duration: 200,
             easing : "swing"
         });
    }
}