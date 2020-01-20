/* drop DOM method for jquery */
/*
function toggle(showHideContent, headerCollapsed) {
    var content = document.getElementById(showHideContent);
    var header = document.getElementById(headerCollapsed);
    if(content.style.display == "block") {
        content.style.display = "none";
        header.className = "lc_header collapsed"
    } else {
        content.style.display = "block";
        header.className = "lc_header expanded"
    }
}
*/


require(['jquery'], function($) {

    $('div.toggle').hide();
    $("h3.lc_section").click(function(event) {
        $(this).next().slideToggle(300);
        $(this).toggleClass("active");
    });
});