$(document).ready(function() {
  $('#toggle-dark').click(function () {
    $('html').toggleClass('light');
    $(this).toggleClass('btn-light');
    $(this).toggleClass('btn-dark');
  });
  
  var $carousel = $(".main-carousel").flickity({
    cellAlign: "center",
    contain: true,
    pageDots: false,
    wrapAround: true
  });

  $carousel.on("staticClick.flickity", function(
    event,
    pointer,
    cellElement,
    cellIndex
  ) {
    if (typeof cellIndex == "number") {
      $carousel.flickity("selectCell", cellIndex);

      $(".carousel-cell").removeClass("is-clicked");
      $(".carousel-cell.is-selected").addClass("is-clicked");

      var filter = $(".carousel-cell.is-selected figure").attr("class");

      $(".base-img div")
        .removeClass()
        .addClass(filter);
    }
  });

  function UrlExists(url, cb) {
    jQuery.ajax({
      url: url,
      dataType: "text",
      type: "GET",
      complete: function(xhr) {
        if (typeof cb === "function") cb.apply(this, [xhr.status]);
      }
    });
  }

  var baseImg = $(".base-img img").attr("src");
  var secretPup = "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=700&h=700&q=80"

  $(".custom-img").change(function() {
    var url = $(this).val();

    if (url.length == 0) {
      $(".base-img img").attr("src", baseImg);
      $(".error").css("display", "none");
    } else {
      UrlExists(url, function(status) {
        if (status === 200) {
          $(".base-img img").attr("src", url);
          $(".error").css("display", "none");
        } else {
          $(".base-img img").attr("src", secretPup);
          $(".error").css("display", "block");
        }
      });
    }
  });
});