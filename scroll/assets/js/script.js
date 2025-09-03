var page1 = 1;
var page2 = 1;

function responsive() {
  var w_h = window.innerHeight;
  var w_w = window.innerWidth;
  $("#WRAP").height(w_h);
  $("#WRAP").width(w_w);
  var currentWidth = $("#container").outerWidth();
  var currentHeight = $("#container").outerHeight();

  var availableHeight = window.innerHeight;
  var availableWidth = window.innerWidth;

  var scaleX = availableWidth / currentWidth;
  var scaleY = availableHeight / currentHeight;

  scaleX = Math.min(scaleX, scaleY);
  scaleY = Math.min(scaleX, scaleY);

  var translationX = Math.round((availableWidth - currentWidth * scaleX) / 2);
  var translationY = Math.round((availableHeight - currentHeight * scaleY) / 2);

  var choki = 1;

  $("#container").css({
    position: "absolute",
    left: "0px",
    top: "0px",
    "-webkit-transform": "translate(" + translationX + "px, " + translationY + "px) scale3d(" + scaleX + ", " + scaleY + ", 1)",
    "-moz-transform": "translate(" + translationX + "px, " + translationY + "px) scale3d(" + scaleX + ", " + scaleY + ", 1)",
    "-ms-transform": "translate(" + translationX + "px, " + translationY + "px) scale3d(" + scaleX + ", " + scaleY + ", 1)",
    "-o-transform": "translate(" + translationX + "px, " + translationY + "px) scale3d(" + scaleX + ", " + scaleY + ", 1)",
    transform: "translate(" + translationX + "px, " + translationY + "px) scale3d(" + scaleX + ", " + scaleY + ", 1)",
    "-webkit-transform-origin": "0 0",
    "-moz-transform-origin": "0 0",
    "-ms-transform-origin": "0 0",
    "-o-transform-origin": "0 0",
    "transform-origin": "0 0",
  });
}

$(window).resize(function (e) {
  responsive();
});

window.onload = function () {
  responsive();

  // 페이지 이동 이벤트
  
  // 페이지 이동 이벤트 1페이지
  $(".page2 .leftpage").on("click", function () {
    $(".conpage1 div.leftimg").css("background-image", "url(./assets/images/page2_img.png)")
    $(".conpage1 div.leftimg").css("background-size", "457px 308px")
    $(".conpage1 div.leftimg").css("width", "457px")
    $(".conpage1 div.leftimg").css("height", "308px")
    $(".conpage1 div.leftimg").css("left", "480px")
    $(".page2 .leftpage").hide()
    $(".page2 .rightpage").show()
    $(".page2 .bottompage").html("1/2")
    $(".page2 .p1").html("“관장님! ㅇㅇ이가 다쳤습니다...”")
    $(".page2 .p1").css("margin-top", "110px")
    $(".page2 .p2").html("1960년대, 태권도 경기의 인기와 함께 부상 빈도가 증가하면서, 보호대의 필요성이 대두되었습니다.<br />당시 태권도 선수들이 처음 시도했던 검도 보호대는<br />태권도의 동작에 맞지 않았습니다.")
  });

  // 페이지 이동 이벤트 1페이지
  $(".page2 .rightpage").on("click", function () {
    $(".conpage1 div.leftimg").css("background-image", "url(./assets/images/page2_img2.png)")
    $(".conpage1 div.leftimg").css("background-size", "236px 321px")
    $(".conpage1 div.leftimg").css("width", "236px")
    $(".conpage1 div.leftimg").css("height", "321px")
    $(".conpage1 div.leftimg").css("left", "580px")
    $(".page2 .rightpage").hide()
    $(".page2 .leftpage").show()
    $(".page2 .bottompage").html("2/2")
    $(".page2 .p1").html("태권도의 안전,<br />지속적인 발전에 기여한 보호대")
    $(".page2 .p1").css("margin-top", "80px")
    $(".page2 .p2").html("이를 계기로 태권도 지도자들은<br />태권도에 특화된 보호대를 개발하기 시작했고,<br />대나무 골격에 천을 감싼 형태의<br />최초의 태권도 보호대가 탄생했습니다.<br />이는 태권도의 안전하고<br />지속적인 발전에 큰 기여를 했습니다.")
  });

  // 페이지 이동 이벤트 2페이지
  $(".page3 .leftpage").on("click", function () {
    if (page2 == 2) {
      $(".page3 .conpage2 .topimg").attr("src", "./assets/images/page3topimg.png")
      $(".page3 .conpage2 div.leftimg").css("background-image", "url(./assets/images/page3_img.png)")
      $(".page3 .conpage2 .bottomimg").attr("src", "./assets/images/page3_imgtext.png")
      $(".page3 .leftpage").hide()
      $(".page3 .bottompage").html("1/3")
      page2 = 1;
    }
    else if (page2 == 3) {
      $(".page3 .conpage2 .topimg").attr("src", "./assets/images/page3topimg2.png")
      $(".page3 .conpage2 div.leftimg").css("background-image", "url(./assets/images/page3_img2.png)")
      $(".page3 .conpage2 .bottomimg").attr("src", "./assets/images/page3_imgtext2.png")
      $(".page3 .rightpage").show()
      $(".page3 .bottompage").html("2/3")
      page2 = 2;
    }
  });

  // 페이지 이동 이벤트 1페이지
  $(".page3 .rightpage").on("click", function () {
    console.log(page2)
    if (page2 == 1) {
      $(".page3 .conpage2 .topimg").attr("src", "./assets/images/page3topimg2.png")
      $(".page3 .conpage2 div.leftimg").css("background-image", "url(./assets/images/page3_img2.png)")
      $(".page3 .conpage2 .bottomimg").attr("src", "./assets/images/page3_imgtext2.png")
      $(".page3 .leftpage").show()
      $(".page3 .bottompage").html("2/3")
      page2 = 2;
    } else if (page2 == 2) {
      $(".page3 .conpage2 .topimg").attr("src", "./assets/images/page3topimg3.png")
      $(".page3 .conpage2 div.leftimg").css("background-image", "url(./assets/images/page3_img3.png)")
      $(".page3 .conpage2 .bottomimg").attr("src", "./assets/images/page3_imgtext3.png")
      $(".page3 .rightpage").hide()
      $(".page3 .bottompage").html("3/3")
      page2 = 3;
    }
  });

  $(window).on("orientationchange", function (event) {
    responsive();
  });

  $(function () {
  // $("#slick").slick({
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: true,
  //   fade: true,
  //   dots: false,
  //   draggable: false,
  //   infinite: false,
  //   // variableWidth: true,
  //   prevArrow: "#slick-navi>.slickBtns>li.slick-prev",
  //   nextArrow: "#slick-navi>.slickBtns>li.slick-next",
  // });

  // $("#slick-navi>.navi2>li").on("click", function () {
  //   var slideNo = $(this).index();
  //   $("#slick").slick("slickGoTo", slideNo);
  // });



  // var currentIndex = 0; // 초기 인덱스를 설정
  // var navItems = $('#slick-navi > .navi > li'); // 네비게이션 항목을 선택
  // var maxIndex = navItems.length - 1; // 최대 인덱스 값을 계산
  // var throttleTimeout = null; // 쓰로틀링 타임아웃을 관리

  // function updateNavigation(delta) {
  //     if (delta > 0) { // 아래로 스크롤하는 경우 (휠을 아래로 굴릴 때)
  //         currentIndex = (currentIndex + 1 > maxIndex) ? 0 : currentIndex + 1; // 다음 인덱스로 업데이트하거나 처음으로
  //     } else if (delta < 0) { // 위로 스크롤하는 경우 (휠을 위로 굴릴 때)
  //         currentIndex = (currentIndex - 1 < 0) ? maxIndex : currentIndex - 1; // 이전 인덱스로 업데이트하거나 마지막으로
  //     }

  //     // 현재 활성화된 탭을 업데이트하고 클릭합니다.
  //     navItems.removeClass('active').eq(currentIndex).addClass('active').click();
  // }

  // // 마우스 휠 이벤트를 바인딩합니다.
  // $(window).on('wheel', function(event) {
  //     var delta = event.originalEvent.deltaY; // 휠 이벤트의 방향

  //     if (throttleTimeout) { // 쓰로틀링 대기 중엔 새 이벤트 무시
  //         return;
  //     }

  //     updateNavigation(delta); // 네비게이션 업데이트 함수 호출

  //     throttleTimeout = setTimeout(function() { // 일정 시간 후에 다시 이벤트를 받을 수 있도록 타임아웃 설정
  //         throttleTimeout = null;
  //     }, 250); // 250ms 간격으로 쓰로틀링
  // });

    // $("#slick").on("beforeChange", function (event, slick, currentSlide, nextSlide) {
    //   $("#slick-navi>.navi2>li").removeClass("active");
    //   $("#slick-navi>.navi2>li").eq(nextSlide).addClass("active");
    // });
    

    $("#slick .item.page4>.context>.navi2>li").on("click", function (e) {
      var $this = $(this);
      var $index = $this.index();

      $this.addClass("active");
      $this.siblings().removeClass("active");

      $("#slick .item.page4>.context>.text>li").removeClass("active");
      $("#slick .item.page4>.context>.text>li").eq($index).addClass("active");

      if ($(".p4tab1").hasClass("active")) {
        $(".bar1").css("background-color", "#fff")
      }
      if ($(".p4tab2").hasClass("active")) {
        $(".bar2").css("background-color", "#fff")
      }
      if ($(".p4tab2").hasClass("active")) {
        $(".bar3").css("background-color", "#fff")
      }
    });
  });

  var items = document.querySelectorAll('.item');
  var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
          if (entry.isIntersecting) {
              var index = Array.prototype.indexOf.call(items, entry.target);
              $(".navi > li").removeClass("active");
              $(".navi > li").eq(index).addClass("active");
              pagereset()
          }
      });
  }, { threshold: 0.5 });

  items.forEach(function(item) {
      observer.observe(item);
  });

  // 네비게이션 클릭 시 해당 페이지로 스크롤
  $(".navi > li").on("click", function() {
    var index = $(this).index();
    var targetPage = $(".item").eq(index)[0];
    console.log("항 아퍼")
    console.log(this + "아우 씹발")
    targetPage.scrollIntoView({ behavior: "smooth" });
    pagereset()

    $("#bookmark").contents().find("video").each(function() {this.pause();});
});

  $(".sc6").on("click", function() {
    setTimeout(() => {
      $("#bookmark").contents().find("video").each(function() {this.play();});
    }, 700);
  });

  $(".send").on("click", function() {
    alert("의견을 남겨주셔서 감사합니다.")
  });



  $(".leftpage, .rightpage").on("mouseover", function() {
    var src = $(this).attr("src");
    var newSrc = src.replace(".png", "_h.png");
    $(this).attr("src", newSrc);
  });

  $(".leftpage, .rightpage").on("mouseout", function() {
    var src = $(this).attr("src");
    var originalSrc = src.replace("_h.png", ".png");
    $(this).attr("src", originalSrc);
  });
};


function pagereset() {
  $(".conpage1 div.leftimg").css("background-image", "url(./assets/images/page2_img.png)")
  $(".conpage1 div.leftimg").css("background-size", "457px 308px")
  $(".conpage1 div.leftimg").css("width", "457px")
  $(".conpage1 div.leftimg").css("height", "308px")
  $(".conpage1 div.leftimg").css("left", "480px")
  $(".page2 .leftpage").hide()
  $(".page2 .rightpage").show()
  $(".page2 .bottompage").html("1/2")
  $(".page2 .p1").html("“관장님! ㅇㅇ이가 다쳤습니다...”")
  $(".page2 .p1").css("margin-top", "110px")
  $(".page2 .p2").html("1960년대, 태권도 경기의 인기와 함께 부상 빈도가 증가하면서, 보호대의 필요성이 대두되었습니다.<br />당시 태권도 선수들이 처음 시도했던 검도 보호대는<br />태권도의 동작에 맞지 않았습니다.")
  $(".page3 .conpage2 .topimg").attr("src", "./assets/images/page3topimg.png")
  $(".page3 .conpage2 div.leftimg").css("background-image", "url(./assets/images/page3_img.png)")
  $(".page3 .conpage2 .bottomimg").attr("src", "./assets/images/page3_imgtext.png")
  $(".page3 .leftpage").hide()
  $(".page3 .bottompage").html("1/3")
  $(".navi2 > li").removeClass("active");
  $(".p4tab1").addClass("active");
  $(".page3 .rightpage").show()
  page2 = 1;
  $("#slick .item.page4>.context>.text>li").removeClass("active");
  $("#slick .item.page4>.context>.text>li:first-child").addClass("active");
  
  var radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach(radio => {
      radio.checked = false;
  });
  var textarea = document.getElementById('textarea');
  textarea.value = '';

  var iframe = document.getElementById('bookmark')
  var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  var video = iframeDoc.getElementById('video');
  video.currentTime = 0;
}