!(function () {
  var e = addEventListener,
    t = function (e) {
      return document.querySelector(e);
    },
    i = function (e) {
      return document.querySelectorAll(e);
    },
    n = document.body,
    s =
      (t(".inner"),
        (function () {
          var e,
            t,
            i = {
              browser: "other",
              browserVersion: 0,
              os: "other",
              osVersion: 0,
              canUse: null
            },
            n = navigator.userAgent;
          for (
            e = [
              ["firefox", /Firefox\/([0-9\.]+)/],
              ["edge", /Edge\/([0-9\.]+)/],
              ["safari", /Version\/([0-9\.]+).+Safari/],
              ["chrome", /Chrome\/([0-9\.]+)/],
              ["ie", /Trident\/.+rv:([0-9]+)/]
            ],
            t = 0;
            t < e.length;
            t++
          )
            if (n.match(e[t][1])) {
              (i.browser = e[t][0]), (i.browserVersion = parseFloat(RegExp.$1));
              break;
            }
          for (
            e = [
              [
                "ios",
                /([0-9_]+) like Mac OS X/,
                function (e) {
                  return e.replace("_", ".").replace("_", "");
                }
              ],
              [
                "ios",
                /CPU like Mac OS X/,
                function (e) {
                  return 0;
                }
              ],
              [
                "ios",
                /iPad; CPU/,
                function (e) {
                  return 0;
                }
              ],
              ["android", /Android ([0-9\.]+)/, null],
              [
                "mac",
                /Macintosh.+Mac OS X ([0-9_]+)/,
                function (e) {
                  return e.replace("_", ".").replace("_", "");
                }
              ],
              ["windows", /Windows NT ([0-9\.]+)/, null],
              ["undefined", /Undefined/, null]
            ],
            t = 0;
            t < e.length;
            t++
          )
            if (n.match(e[t][1])) {
              (i.os = e[t][0]),
                (i.osVersion = parseFloat(
                  e[t][2] ? e[t][2](RegExp.$1) : RegExp.$1
                ));
              break;
            }
          "mac" == i.os &&
            "ontouchstart" in window &&
            ((1024 == screen.width && 1366 == screen.height) ||
              (834 == screen.width && 1112 == screen.height) ||
              (810 == screen.width && 1080 == screen.height) ||
              (768 == screen.width && 1024 == screen.height)) &&
            (i.os = "ios");
          var s = document.createElement("div");
          return (
            (i.canUse = function (e) {
              var t = s.style,
                i = e.charAt(0).toUpperCase() + e.slice(1);
              return (
                e in t ||
                "Moz" + i in t ||
                "Webkit" + i in t ||
                "O" + i in t ||
                "ms" + i in t
              );
            }),
            i
          );
        })()),
    o = function () {
      var e,
        t = location.hash ? location.hash.substring(1) : null;
      return t
        ? (t.match(/\?/) &&
          ((e = t.split("?")),
            (t = e[0]),
            history.replaceState(void 0, void 0, "#" + t),
            (window.location.search = e[1])),
          t.length > 0 && !t.match(/^[a-zA-Z]/) && (t = "x" + t),
          t)
        : null;
    },
    a = function (e, t, i) {
      var n, s, o, a, l, r, c;
      if (e)
        switch (
        ((r =
          (e.dataset.scrollOffset ? parseInt(e.dataset.scrollOffset) : 0) *
          parseFloat(getComputedStyle(document.documentElement).fontSize)),
          e.dataset.scrollBehavior ? e.dataset.scrollBehavior : "default")
        ) {
          case "default":
          default:
            n = e.offsetTop + r;
            break;
          case "center":
            n =
              e.offsetHeight < window.innerHeight
                ? e.offsetTop - (window.innerHeight - e.offsetHeight) / 2 + r
                : e.offsetTop - r;
            break;
          case "previous":
            n = e.previousElementSibling
              ? e.previousElementSibling.offsetTop +
              e.previousElementSibling.offsetHeight +
              r
              : e.offsetTop + r;
        }
      else n = 0;
      if ((t || (t = "smooth"), i || (i = 750), "instant" != t)) {
        switch (((a = Date.now()), (s = window.scrollY), (o = n - s), t)) {
          case "linear":
            l = function (e) {
              return e;
            };
            break;
          case "smooth":
            l = function (e) {
              return e < 0.5
                ? 4 * e * e * e
                : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1;
            };
        }
        (c = function () {
          var e = Date.now() - a;
          e >= i
            ? window.scroll(0, n)
            : (window.scroll(0, s + o * l(e / i)), requestAnimationFrame(c));
        })();
      } else window.scrollTo(0, n);
    };
  window._scrollToTop = function () {
    a(null);
  };
  var l, r, c, d, u, h, f;
  function m() {
    (this.id = "gallery"),
      (this.$wrapper = t("#" + this.id)),
      (this.$modal = null),
      (this.$modalImage = null),
      (this.$modalNext = null),
      (this.$modalPrevious = null),
      (this.$links = null),
      (this.locked = !1),
      (this.current = null),
      (this.delay = 375),
      (this.navigation = null),
      this.initModal();
  }
  e("load", function () {
    setTimeout(function () {
      (n.className = n.className.replace(/\bis-loading\b/, "is-playing")),
        setTimeout(function () {
          n.className = n.className.replace(/\bis-playing\b/, "is-ready");
        }, 1e3);
    }, 100);
  }),
    (function () {
      var n,
        l,
        r,
        c,
        d,
        u,
        h,
        f,
        m,
        p,
        g,
        y,
        v = !1,
        b = function (e) {
          var t, i;
          for (
            t = e.querySelectorAll('iframe[data-src]:not([data-src=""])'),
            i = 0;
            i < t.length;
            i++
          )
            (t[i].src = t[i].dataset.src), (t[i].dataset.src = "");
        },
        w = {};
      (window._next = function () {
        var e;
        (e = t("#main > .inner > section.active").nextElementSibling) &&
          "SECTION" == e.tagName &&
          (location.href = "#" + e.id.replace(/-section$/, ""));
      }),
        (window._previous = function () {
          var e;
          (e = t("#main > .inner > section.active").previousElementSibling) &&
            "SECTION" == e.tagName &&
            (location.href =
              "#" +
              (e.matches(":first-child") ? "" : e.id.replace(/-section$/, "")));
        }),
        (window._first = function () {
          var e;
          (e = t("#main > .inner > section:first-of-type")) &&
            "SECTION" == e.tagName &&
            (location.href = "#" + e.id.replace(/-section$/, ""));
        }),
        (window._last = function () {
          var e;
          (e = t("#main > .inner > section:last-of-type")) &&
            "SECTION" == e.tagName &&
            (location.href = "#" + e.id.replace(/-section$/, ""));
        }),
        (window._scrollToTop = function () {
          var e, i;
          a(null),
            (e = t("section.active")) &&
            ("home" == (i = e.id.replace(/-section$/, "")) && (i = ""),
              history.pushState(null, null, "#" + i));
        }),
        "scrollRestoration" in history &&
        (history.scrollRestoration = "manual"),
        (c = t("#header")),
        (d = t("#footer")),
        (m = o()) && !m.match(/^[a-zA-Z0-9\-]+$/) && (m = null),
        (p = t('[data-scroll-id="' + m + '"]'))
          ? (r = (n = (l = p).parentElement).id)
          : (p = t("#" + (m || "home") + "-section")) &&
          ((l = null), (r = (n = p).id)),
        n ||
        ((l = null),
          (r = (n = t("#home-section")).id),
          history.replaceState(void 0, void 0, "#")),
        (h =
          !!(u = m || "home") &&
          (u in w && "hideHeader" in w[u] && w[u].hideHeader)),
        (f = !!u && (u in w && "hideFooter" in w[u] && w[u].hideFooter)),
        c && h && (c.classList.add("hidden"), (c.style.display = "none")),
        d && f && (d.classList.add("hidden"), (d.style.display = "none")),
        (g = i('#main > .inner > section:not([id="' + r + '"])'));
      for (y = 0; y < g.length; y++)
        (g[y].className = "inactive"), (g[y].style.display = "none");
      n.classList.add("active"),
        b(n),
        a(null, "instant"),
        e("load", function () {
          l && a(l, "instant");
        }),
        e("hashchange", function (e) {
          var i, n, l, r, u, h, f, m, p, g;
          return (
            !v &&
            (!((p = o()) && !p.match(/^[a-zA-Z0-9\-]+$/)) &&
              ((g = t('[data-scroll-id="' + p + '"]'))
                ? (i = (n = g).parentElement).id
                : (g = t("#" + (p || "home") + "-section"))
                  ? ((n = null), (i = g).id)
                  : ((n = null),
                    (i = t("#home-section")).id,
                    history.replaceState(void 0, void 0, "#")),
                !!i &&
                (i.classList.contains("inactive")
                  ? ((v = !0),
                    "#home" == location.hash &&
                    history.replaceState(null, null, "#"),
                    (h = i ? i.id.replace(/-section$/, "") : null),
                    (f =
                      !!h &&
                      (h in w && "hideHeader" in w[h] && w[h].hideHeader)),
                    (m =
                      !!h &&
                      (h in w && "hideFooter" in w[h] && w[h].hideFooter)),
                    c &&
                    f &&
                    (c.classList.add("hidden"),
                      setTimeout(function () {
                        c.style.display = "none";
                      }, 250)),
                    d &&
                    m &&
                    (d.classList.add("hidden"),
                      setTimeout(function () {
                        d.style.display = "none";
                      }, 250)),
                    (r = t("#main > .inner > section:not(.inactive)")) &&
                    ((u = r.offsetHeight),
                      r.classList.add("inactive"),
                      (function (e) {
                        var t, i;
                        for (
                          t = e.querySelectorAll('iframe[data-src=""]'), i = 0;
                          i < t.length;
                          i++
                        )
                          (t[i].dataset.src = t[i].src), (t[i].src = "");
                        for (
                          t = e.querySelectorAll("video"), i = 0;
                          i < t.length;
                          i++
                        )
                          t[i].pause();
                      })(r),
                      setTimeout(function () {
                        (r.style.display = "none"),
                          r.classList.remove("active");
                      }, 250)),
                    setTimeout(function () {
                      c &&
                        !f &&
                        ((c.style.display = ""),
                          setTimeout(function () {
                            c.classList.remove("hidden");
                          }, 0)),
                        d &&
                        !m &&
                        ((d.style.display = ""),
                          setTimeout(function () {
                            d.classList.remove("hidden");
                          }, 0)),
                        (i.style.display = ""),
                        (function (e) {
                          if ("ie" == s.browser) {
                            var t = document.createEvent("Event");
                            t.initEvent(e, !1, !0), dispatchEvent(t);
                          } else dispatchEvent(new Event(e));
                        })("resize"),
                        a(null, "instant"),
                        (l = i.offsetHeight) > u
                          ? ((i.style.maxHeight = u + "px"),
                            (i.style.minHeight = "0"))
                          : ((i.style.maxHeight = ""),
                            (i.style.minHeight = u + "px")),
                        setTimeout(function () {
                          i.classList.remove("inactive"),
                            i.classList.add("active"),
                            (i.style.minHeight = l + "px"),
                            (i.style.maxHeight = l + "px"),
                            setTimeout(function () {
                              (i.style.transition = "none"),
                                (i.style.minHeight = ""),
                                (i.style.maxHeight = ""),
                                b(i),
                                n && a(n, "instant"),
                                setTimeout(function () {
                                  (i.style.transition = ""), (v = !1);
                                }, 75);
                            }, 500);
                        }, 75);
                    }, 250),
                    !1)
                  : (a(n || null), !1))))
          );
        }),
        e("click", function (e) {
          var t = e.target;
          switch (t.tagName.toUpperCase()) {
            case "IMG":
            case "SVG":
            case "USE":
            case "U":
            case "STRONG":
            case "EM":
            case "CODE":
            case "S":
            case "MARK":
            case "SPAN":
              for (; (t = t.parentElement) && "A" != t.tagName;);
              if (!t) return;
          }
          "A" == t.tagName &&
            "#" == t.getAttribute("href").substr(0, 1) &&
            t.hash == window.location.hash &&
            (e.preventDefault(),
              history.replaceState(void 0, void 0, "#"),
              location.replace(t.hash));
        });
    })(),
    (l = document.createElement("style")).appendChild(
      document.createTextNode("")
    ),
    document.head.appendChild(l),
    (r = l.sheet),
    "android" == s.os
      ? (!(function () {
        r.insertRule("body::after { }", 0), (c = r.cssRules[0]);
        var t = function () {
          c.style.cssText =
            "height: " + Math.max(screen.width, screen.height) + "px";
        };
        e("load", t), e("orientationchange", t), e("touchmove", t);
      })(),
        n.classList.add("is-touch"))
      : "ios" == s.os
        ? (s.osVersion <= 11 &&
          (r.insertRule("body::after { }", 0),
            ((c = r.cssRules[0]).style.cssText =
              "-webkit-transform: scale(1.0)")),
          s.osVersion <= 11 &&
          (r.insertRule("body.ios-focus-fix::before { }", 0),
            ((c = r.cssRules[0]).style.cssText = "height: calc(100% + 60px)"),
            e(
              "focus",
              function (e) {
                n.classList.add("ios-focus-fix");
              },
              !0
            ),
            e(
              "blur",
              function (e) {
                n.classList.remove("ios-focus-fix");
              },
              !0
            )),
          n.classList.add("is-touch"))
        : "ie" == s.browser
          ? ("matches" in Element.prototype ||
            (Element.prototype.matches =
              Element.prototype.msMatchesSelector ||
              Element.prototype.webkitMatchesSelector),
            (f = (function (e) {
              var t,
                i = document.styleSheets,
                n = [],
                s = function (t) {
                  var i,
                    o = t.cssRules;
                  for (i = 0; i < o.length; i++)
                    o[i] instanceof CSSMediaRule &&
                      matchMedia(o[i].conditionText).matches
                      ? s(o[i])
                      : o[i] instanceof CSSStyleRule &&
                      o[i].selectorText == e &&
                      n.push(o[i]);
                };
              for (t = 0; t < i.length; t++) s(i[t]);
              return n;
            })("body::before")).length > 0 &&
            ((h = f[0]).style.width.match("calc")
              ? ((h.style.opacity = 0.9999),
                setTimeout(function () {
                  h.style.opacity = 1;
                }, 100))
              : (document.styleSheets[0].addRule(
                "body::before",
                "content: none !important;"
              ),
                (n.style.backgroundImage = h.style.backgroundImage.replace(
                  'url("images/',
                  'url("assets/images/'
                )),
                (n.style.backgroundPosition = h.style.backgroundPosition),
                (n.style.backgroundRepeat = h.style.backgroundRepeat),
                (n.style.backgroundColor = h.style.backgroundColor),
                (n.style.backgroundAttachment = "fixed"),
                (n.style.backgroundSize = h.style.backgroundSize))),
            (u = function () {
              var e, n, s, o, a, l;
              for (
                (a = t("#wrapper")).style.height = "auto",
                a.scrollHeight <= innerHeight && (a.style.height = "100vh"),
                o = i(".container.full"),
                l = 0;
                l < o.length;
                l++
              )
                (a = o[l]),
                  (s = getComputedStyle(a)),
                  (a.style.minHeight = ""),
                  (a.style.height = ""),
                  (e = s.minHeight),
                  (a.style.minHeight = 0),
                  (a.style.height = ""),
                  (n = s.height),
                  0 != e && (a.style.height = n > e ? "auto" : e);
            })(),
            e("resize", function () {
              clearTimeout(d), (d = setTimeout(u, 250));
            }),
            e("load", u))
          : "edge" == s.browser &&
          (function () {
            var e,
              t,
              n,
              s = i(".container > .inner > div:last-child");
            for (n = 0; n < s.length; n++)
              (e = s[n]),
                ("flex" != (t = getComputedStyle(e.parentNode)).display &&
                  "inline-flex" != t.display) ||
                (e.style.marginLeft = "-1px");
          })(),
    s.canUse("object-fit") ||
    ((function () {
      var t,
        n,
        s,
        o,
        a,
        l = i(".image[data-position]");
      for (o = 0; o < l.length; o++)
        "IMG" != (s = (t = l[o]).firstElementChild).tagName &&
          ((n = s), (s = s.firstElementChild)),
          s.parentNode.classList.contains("deferred")
            ? (s.parentNode.classList.remove("deferred"),
              (a = s.getAttribute("data-src")),
              s.removeAttribute("data-src"))
            : (a = s.getAttribute("src")),
          (s.style.backgroundImage = "url('" + a + "')"),
          (s.style.backgroundSize = "cover"),
          (s.style.backgroundPosition = t.dataset.position),
          (s.style.backgroundRepeat = "no-repeat"),
          (s.src =
            "data:image/svg+xml;charset=utf8," +
            escape(
              '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1" viewBox="0 0 1 1"></svg>'
            )),
          t.classList.contains("full") &&
          t.parentNode &&
          t.parentNode.classList.contains("full") &&
          t.parentNode.parentNode &&
          t.parentNode.parentNode.parentNode &&
          t.parentNode.parentNode.parentNode.classList.contains(
            "container"
          ) &&
          1 == t.parentNode.children.length &&
          (function (t, i) {
            var n,
              s = t.parentNode.parentNode,
              o = function () {
                (t.style.height = "0px"),
                  clearTimeout(n),
                  (n = setTimeout(function () {
                    "row" == getComputedStyle(s).flexDirection
                      ? (i && (i.style.height = "100%"),
                        (t.style.height = s.scrollHeight + 1 + "px"))
                      : (i && (i.style.height = "auto"),
                        (t.style.height = "auto"));
                  }, 125));
              };
            e("resize", o), e("load", o), o();
          })(t, n);
    })(),
      (function () {
        var e,
          t,
          n,
          s,
          o = i(".gallery img");
        for (n = 0; n < o.length; n++)
          (t = (e = o[n]).parentNode).classList.contains("deferred")
            ? (t.classList.remove("deferred"), (s = e.getAttribute("data-src")))
            : (s = e.getAttribute("src")),
            (t.style.backgroundImage = "url('" + s + "')"),
            (t.style.backgroundSize = "cover"),
            (t.style.backgroundPosition = "center"),
            (t.style.backgroundRepeat = "no-repeat"),
            (e.style.opacity = "0");
      })()),
    (function () {
      var t,
        n = i(".deferred");
      "forEach" in NodeList.prototype ||
        (NodeList.prototype.forEach = Array.prototype.forEach),
        n.forEach(function (e) {
          var t = e.firstElementChild;
          (e.style.backgroundImage = "url(" + t.src + ")"),
            (e.style.backgroundSize = "100% 100%"),
            (e.style.backgroundPosition = "top left"),
            (e.style.backgroundRepeat = "no-repeat"),
            (t.style.opacity = 0),
            (t.style.transition = "opacity 0.375s ease-in-out"),
            t.addEventListener("load", function (i) {
              "done" === t.dataset.src &&
                (Date.now() - t._startLoad < 375
                  ? (e.classList.remove("loading"),
                    (e.style.backgroundImage = "none"),
                    (t.style.transition = ""),
                    (t.style.opacity = 1))
                  : (e.classList.remove("loading"),
                    (t.style.opacity = 1),
                    setTimeout(function () {
                      e.style.backgroundImage = "none";
                    }, 375)));
            });
        }),
        e(
          "load",
          (t = function () {
            var e = document.documentElement.clientHeight,
              t =
                "ios" == s.os
                  ? document.body.scrollTop
                  : document.documentElement.scrollTop,
              i = t + e;
            n.forEach(function (n) {
              var s = n.firstElementChild;
              if (null === s.offsetParent) return !0;
              if ("done" === s.dataset.src) return !0;
              var o,
                a = s.getBoundingClientRect(),
                l = t + Math.floor(a.top) - e,
                r = t + Math.ceil(a.bottom) + e;
              l <= i &&
                r >= t &&
                ((o = s.dataset.src),
                  (s.dataset.src = "done"),
                  n.classList.add("loading"),
                  (s._startLoad = Date.now()),
                  (s.src = o));
            });
          })
        ),
        e("resize", t),
        e("scroll", t);
    })(),
    (m.prototype.init = function (e) {
      var t,
        n = this,
        s = i("#" + e.id + " .thumbnail"),
        o = e.navigation && s.length > 1;
      for (t = 0; t < s.length; t++)
        !(function (e) {
          s[e].addEventListener("click", function (t) {
            t.stopPropagation(),
              t.preventDefault(),
              n.show(e, { $links: s, navigation: o });
          });
        })(t);
    }),
    (m.prototype.initModal = function () {
      var e,
        i,
        s,
        o,
        a = this;
      ((e = document.createElement("div")).id = this.id + "-modal"),
        (e.tabIndex = -1),
        (e.className = "gallery-modal"),
        (e.innerHTML =
          '<div class="inner"><img src="" /></div><div class="nav previous"></div><div class="nav next"></div><div class="close"></div>'),
        n.appendChild(e),
        (i = t("#" + this.id + "-modal img")).addEventListener(
          "load",
          function () {
            setTimeout(
              function () {
                e.classList.contains("visible") &&
                  (e.classList.add("loaded"),
                    setTimeout(function () {
                      e.classList.remove("switching");
                    }, a.delay));
              },
              e.classList.contains("switching") ? 0 : a.delay
            );
          }
        ),
        (s = t("#" + this.id + "-modal .next")),
        (o = t("#" + this.id + "-modal .previous")),
        (e.show = function (t) {
          var n;
          a.locked ||
            (t < 0
              ? (t = a.$links.length - 1)
              : t >= a.$links.length && (t = 0),
              t != a.current &&
              (n = a.$links.item(t)) &&
              ((a.locked = !0),
                null !== a.current
                  ? (e.classList.remove("loaded"),
                    e.classList.add("switching"),
                    setTimeout(function () {
                      (a.current = t),
                        (i.src = n.href),
                        setTimeout(function () {
                          e.focus(), (a.locked = !1);
                        }, a.delay);
                    }, a.delay))
                  : ((a.current = t),
                    (i.src = n.href),
                    e.classList.add("visible"),
                    setTimeout(function () {
                      e.focus(), (a.locked = !1);
                    }, a.delay))));
        }),
        (e.hide = function () {
          a.locked ||
            (e.classList.contains("visible") &&
              ((a.locked = !0),
                e.classList.remove("visible"),
                e.classList.remove("loaded"),
                e.classList.remove("switching"),
                setTimeout(function () {
                  (i.src = ""), (a.locked = !1), n.focus(), (a.current = null);
                }, a.delay)));
        }),
        (e.next = function () {
          e.show(a.current + 1);
        }),
        (e.previous = function () {
          e.show(a.current - 1);
        }),
        (e.first = function () {
          e.show(0);
        }),
        (e.last = function () {
          e.show(a.$links.length - 1);
        }),
        e.addEventListener("click", function (t) {
          e.hide();
        }),
        e.addEventListener("keydown", function (t) {
          if (e.classList.contains("visible"))
            switch (t.keyCode) {
              case 39:
              case 32:
                if (!a.navigation) break;
                t.preventDefault(), t.stopPropagation(), e.next();
                break;
              case 37:
                if (!a.navigation) break;
                t.preventDefault(), t.stopPropagation(), e.previous();
                break;
              case 36:
                if (!a.navigation) break;
                t.preventDefault(), t.stopPropagation(), e.first();
                break;
              case 35:
                if (!a.navigation) break;
                t.preventDefault(), t.stopPropagation(), e.last();
                break;
              case 27:
                t.preventDefault(), t.stopPropagation(), e.hide();
            }
        }),
        s.addEventListener("click", function (t) {
          e.next();
        }),
        o.addEventListener("click", function (t) {
          e.previous();
        }),
        (this.$modal = e),
        (this.$modalImage = i),
        (this.$modalNext = s),
        (this.$modalPrevious = o);
    }),
    (m.prototype.show = function (e, t) {
      (this.$links = t.$links),
        (this.navigation = t.navigation),
        this.navigation
          ? ((this.$modalNext.style.display = ""),
            (this.$modalPrevious.style.display = ""))
          : ((this.$modalNext.style.display = "none"),
            (this.$modalPrevious.style.display = "none")),
        this.$modal.show(e);
    }),
    new m().init({ id: "gallery01", navigation: !0 });
})();

window.addEventListener("load", event => {
  var discord = document.getElementsByClassName("n05")[0];
  var discordLabel = document.querySelectorAll(".n05 .label")[0];
  discord.addEventListener("click", showDiscordDetails, false);
  function showDiscordDetails() {
    discordLabel.textContent = 'Copied!'
    navigator.clipboard.writeText("Daksh777#7688")
    setTimeout(() => discordLabel.textContent = 'Click to copy', 2000)
  }
});
