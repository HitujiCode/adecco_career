jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる
  $(function () {
    const height = $(".js-header").height();
    $("main").css("margin-top", height);
  });

  // ハンバーガーメニュー
  let scrollPosition = 0;

  function openDrawer() {
    scrollPosition = $(window).scrollTop();
    $(".js-header .header__inner").addClass("is-open");
    $(".js-drawer").addClass("is-open");
    $(".js-hamburger").addClass("is-open");
    $("body").addClass("is-fixed").css("top", -scrollPosition);
  }

  function closeDrawer() {
    $(".js-header .header__inner").removeClass("is-open");
    $(".js-drawer").removeClass("is-open");
    $(".js-hamburger").removeClass("is-open");
    $("body").removeClass("is-fixed").css("top", "");
    $(window).scrollTop(scrollPosition);
  }

  $(".js-hamburger").click(function () {
    $(this).toggleClass("is-open");
    if ($(this).hasClass("is-open")) {
      openDrawer();
    } else {
      closeDrawer();
    }
  });

  $(".js-drawer, .js-drawer a[href]").on("click", function () {
    closeDrawer();
  });

  $(window).on("resize", function () {
    if (window.matchMedia("(min-width: 768px)").matches) {
      closeDrawer();
    }
  });

  // Q&Aアコーディオン
  $(".js-faq").on("click", function () {
    $(this).next().slideToggle();
    $(this).toggleClass("is-open");
  });

  // スクロールに応じてヘッダーにactiveクラスを付与
  $(document).ready(function () {
    $(window).scroll(function () {
      const currentPosition =
        $(window).scrollTop() + $(".js-header").outerHeight() + 200;

      $("section").each(function () {
        const sectionTop = $(this).offset().top;
        const sectionHeight = $(this).outerHeight();
        const nextSectionTop =
          $(this).next("section").length > 0
            ? $(this).next("section").offset().top
            : $(document).height();

        if (currentPosition >= sectionTop && currentPosition < nextSectionTop) {
          $(".header__nav-item").removeClass("is-current");
          const id = $(this).attr("id");
          $('.header__nav-item a[href="#' + id + '"]')
            .parent()
            .addClass("is-current");
        }
      });
    });
  });
});

// ページ内リンクのスムーススクロール
$(function () {
  $(window).on("load", function () {
    adjustScrollPosition();
  });

  // ハッシュ値を考慮してスクロール位置を調整
  function adjustScrollPosition() {
    const headerHeight = $(".js-header").outerHeight();
    const hash = window.location.hash;

    if (hash) {
      const target = $(hash);
      if (target.length) {
        const position = target.offset().top - headerHeight;
        $("html, body").scrollTop(position);
      }
    }
  }

  // ページ内リンクのクリックイベントハンドラー
  $('a[href^="#"]').click(function (e) {
    e.preventDefault();
    const headerHeight = $(".js-header").outerHeight();
    const href = $(this).attr("href");
    const target = $(href === "#" || href === "" ? "html" : href);
    const position = target.offset().top - headerHeight;

    // スムーズスクロール
    $("html, body").animate(
      {
        scrollTop: position,
      },
      400,
      "swing"
    );
  });
});
