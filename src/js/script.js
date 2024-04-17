jQuery(function ($) {
  // WordPressで$を使用できるようにする
  const pageTop = $(".js-fixed");
  pageTop.hide();

  // グローバル変数としてscrollPositionを管理
  let scrollPosition = 0;

  $(window).scroll(function () {
    let currentScrollPosition = $(this).scrollTop();
    let windowHeight = $(this).height();
    let bodyHeight = $(document).height();
    let footerHeight = $(".footer").outerHeight();

    if (currentScrollPosition > 70) {
      pageTop.fadeIn();
    } else {
      pageTop.fadeOut();
    }
  });

  pageTop.click(function () {
    $("body,html").animate({ scrollTop: 0 }, 300, "swing");
    return false;
  });

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

  $(".js-faq").on("click", function () {
    $(this).next().slideToggle();
    $(this).toggleClass("is-open");
  });

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

  $(window).on("load", function () {
    adjustScrollPosition();
  });

  function adjustScrollPosition() {
    const headerHeight = $(".js-header").outerHeight();
    const hash = window.location.hash;

    if (hash && $(hash).length) {
      const target = $(hash);
      const position = target.offset().top - headerHeight;
      $("html, body").scrollTop(position);
    }
  }

  $('a[href^="#"]').click(function (e) {
    e.preventDefault();
    const headerHeight = $(".js-header").outerHeight();
    const href = $(this).attr("href");
    const target = $(href === "#" || href === "" ? "html" : href);

    if (target.length) {
      const position = target.offset().top - headerHeight;
      $("html, body").animate({ scrollTop: position }, 400, "swing");
    }
  });
});
