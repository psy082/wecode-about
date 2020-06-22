let didscroll, lastScrollTop = 0, delta = 50, header = $('header'), headerHeight = header.outerHeight();

const hasScrolled = _ => {
  const st = $(window).scrollTop();

  if (Math.abs(lastScrollTop - st) <= delta) return;

  if (st > lastScrollTop && st > headerHeight / 4) {
    header.removeClass('header-fade-in').addClass('header-fade-out');
  } else {
    if (st < lastScrollTop && st < headerHeight / 4) {
      header.removeClass('header-fade-out').addClass('header-fade-in');
    }
  }

  lastScrollTop = st;
}

$(window).scroll(event => {
  didscroll = true;
});

setInterval(_ => {
  if (didscroll) {
    hasScrolled();
    didscroll = false;
  }
}, 250);

