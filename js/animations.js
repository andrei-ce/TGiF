// ================================
// SCROLL TO TOP BUTTON
// ================================
window.onscroll = function () { showButton() };

function showButton() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    $('.btn-warning').css("height", "30px");
  } else {
    $('.btn-warning').css("height", "0px");
  }
}

$("#buttonTop").on("click", function () {
  $('html, body').animate({
    scrollTop: 0,
  }, 750);
});