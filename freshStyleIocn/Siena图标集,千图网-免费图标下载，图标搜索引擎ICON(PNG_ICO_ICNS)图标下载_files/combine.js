
jQuery.ui || (function(c) {
	var i = c.fn.remove,
	d = c.browser.mozilla && (parseFloat(c.browser.version) < 1.9);
	c.ui = {
		version: "1.7.2",
		plugin: {
			add: function(k, l, n) {
				var m = c.ui[k].prototype;
				for (var j in n) {
					m.plugins[j] = m.plugins[j] || [];
					m.plugins[j].push([l, n[j]])
				}
			},
			call: function(j, l, k) {
				var n = j.plugins[l];
				if (!n || !j.element[0].parentNode) {
					return
				}
				for (var m = 0; m < n.length; m++) {
					if (j.options[n[m][0]]) {
						n[m][1].apply(j.element, k)
					}
				}
			}
		},
		contains: function(k, j) {
			return document.compareDocumentPosition ? k.compareDocumentPosition(j) & 16: k !== j && k.contains(j)
		},
		hasScroll: function(m, k) {
			if (c(m).css("overflow") == "hidden") {
				return false
			}
			var j = (k && k == "left") ? "scrollLeft": "scrollTop",
			l = false;
			if (m[j] > 0) {
				return true
			}
			m[j] = 1;
			l = (m[j] > 0);
			m[j] = 0;
			return l
		},
		isOverAxis: function(k, j, l) {
			return (k > j) && (k < (j + l))
		},
		isOver: function(o, k, n, m, j, l) {
			return c.ui.isOverAxis(o, n, j) && c.ui.isOverAxis(k, m, l)
		},
		keyCode: {
			BACKSPACE: 8,
			CAPS_LOCK: 20,
			COMMA: 188,
			CONTROL: 17,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			INSERT: 45,
			LEFT: 37,
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SHIFT: 16,
			SPACE: 32,
			TAB: 9,
			UP: 38
		}
	};
	if (d) {
		var f = c.attr,
		e = c.fn.removeAttr,
		h = "http://www.w3.org/2005/07/aaa",
		a = /^aria-/,
		b = /^wairole:/;
		c.attr = function(k, j, l) {
			var m = l !== undefined;
			return (j == "role" ? (m ? f.call(this, k, j, "wairole:" + l) : (f.apply(this, arguments) || "").replace(b, "")) : (a.test(j) ? (m ? k.setAttributeNS(h, j.replace(a, "aaa:"), l) : f.call(this, k, j.replace(a, "aaa:"))) : f.apply(this, arguments)))
		};
		c.fn.removeAttr = function(j) {
			return (a.test(j) ? this.each(function() {
				this.removeAttributeNS(h, j.replace(a, ""))
			}) : e.call(this, j))
		}
	}
	c.fn.extend({
		remove: function() {
			c("*", this).add(this).each(function() {
				c(this).triggerHandler("remove")
			});
			return i.apply(this, arguments)
		},
		enableSelection: function() {
			return this.attr("unselectable", "off").css("MozUserSelect", "").unbind("selectstart.ui")
		},
		disableSelection: function() {
			return this.attr("unselectable", "on").css("MozUserSelect", "none").bind("selectstart.ui",
			function() {
				return false
			})
		},
		scrollParent: function() {
			var j;
			if ((c.browser.msie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {
				j = this.parents().filter(function() {
					return (/(relative|absolute|fixed)/).test(c.curCSS(this, "position", 1)) && (/(auto|scroll)/).test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
				}).eq(0)
			} else {
				j = this.parents().filter(function() {
					return (/(auto|scroll)/).test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
				}).eq(0)
			}
			return (/fixed/).test(this.css("position")) || !j.length ? c(document) : j
		}
	});
	c.extend(c.expr[":"], {
		data: function(l, k, j) {
			return !! c.data(l, j[3])
		},
		focusable: function(k) {
			var l = k.nodeName.toLowerCase(),
			j = c.attr(k, "tabindex");
			return (/input|select|textarea|button|object/.test(l) ? !k.disabled: "a" == l || "area" == l ? k.href || !isNaN(j) : !isNaN(j)) && !c(k)["area" == l ? "parents": "closest"](":hidden").length
		},
		tabbable: function(k) {
			var j = c.attr(k, "tabindex");
			return (isNaN(j) || j >= 0) && c(k).is(":focusable")
		}
	});
	function g(m, n, o, l) {
		function k(q) {
			var p = c[m][n][q] || [];
			return (typeof p == "string" ? p.split(/,?\s+/) : p)
		}
		var j = k("getter");
		if (l.length == 1 && typeof l[0] == "string") {
			j = j.concat(k("getterSetter"))
		}
		return (c.inArray(o, j) != -1)
	}
	c.widget = function(k, j) {
		var l = k.split(".")[0];
		k = k.split(".")[1];
		c.fn[k] = function(p) {
			var n = (typeof p == "string"),
			o = Array.prototype.slice.call(arguments, 1);
			if (n && p.substring(0, 1) == "_") {
				return this
			}
			if (n && g(l, k, p, o)) {
				var m = c.data(this[0], k);
				return (m ? m[p].apply(m, o) : undefined)
			}
			return this.each(function() {
				var q = c.data(this, k); (!q && !n && c.data(this, k, new c[l][k](this, p))._init()); (q && n && c.isFunction(q[p]) && q[p].apply(q, o))
			})
		};
		c[l] = c[l] || {};
		c[l][k] = function(o, n) {
			var m = this;
			this.namespace = l;
			this.widgetName = k;
			this.widgetEventPrefix = c[l][k].eventPrefix || k;
			this.widgetBaseClass = l + "-" + k;
			this.options = c.extend({},
			c.widget.defaults, c[l][k].defaults, c.metadata && c.metadata.get(o)[k], n);
			this.element = c(o).bind("setData." + k,
			function(q, p, r) {
				if (q.target == o) {
					return m._setData(p, r)
				}
			}).bind("getData." + k,
			function(q, p) {
				if (q.target == o) {
					return m._getData(p)
				}
			}).bind("remove",
			function() {
				return m.destroy()
			})
		};
		c[l][k].prototype = c.extend({},
		c.widget.prototype, j);
		c[l][k].getterSetter = "option"
	};
	c.widget.prototype = {
		_init: function() {},
		destroy: function() {
			this.element.removeData(this.widgetName).removeClass(this.widgetBaseClass + "-disabled " + this.namespace + "-state-disabled").removeAttr("aria-disabled")
		},
		option: function(l, m) {
			var k = l,
			j = this;
			if (typeof l == "string") {
				if (m === undefined) {
					return this._getData(l)
				}
				k = {};
				k[l] = m
			}
			c.each(k,
			function(n, o) {
				j._setData(n, o)
			})
		},
		_getData: function(j) {
			return this.options[j]
		},
		_setData: function(j, k) {
			this.options[j] = k;
			if (j == "disabled") {
				this.element[k ? "addClass": "removeClass"](this.widgetBaseClass + "-disabled " + this.namespace + "-state-disabled").attr("aria-disabled", k)
			}
		},
		enable: function() {
			this._setData("disabled", false)
		},
		disable: function() {
			this._setData("disabled", true)
		},
		_trigger: function(l, m, n) {
			var p = this.options[l],
			j = (l == this.widgetEventPrefix ? l: this.widgetEventPrefix + l);
			m = c.Event(m);
			m.type = j;
			if (m.originalEvent) {
				for (var k = c.event.props.length, o; k;) {
					o = c.event.props[--k];
					m[o] = m.originalEvent[o]
				}
			}
			this.element.trigger(m, n);
			return ! (c.isFunction(p) && p.call(this.element[0], m, n) === false || m.isDefaultPrevented())
		}
	};
	c.widget.defaults = {
		disabled: false
	};
	c.ui.mouse = {
		_mouseInit: function() {
			var j = this;
			this.element.bind("mousedown." + this.widgetName,
			function(k) {
				return j._mouseDown(k)
			}).bind("click." + this.widgetName,
			function(k) {
				if (j._preventClickEvent) {
					j._preventClickEvent = false;
					k.stopImmediatePropagation();
					return false
				}
			});
			if (c.browser.msie) {
				this._mouseUnselectable = this.element.attr("unselectable");
				this.element.attr("unselectable", "on")
			}
			this.started = false
		},
		_mouseDestroy: function() {
			this.element.unbind("." + this.widgetName); (c.browser.msie && this.element.attr("unselectable", this._mouseUnselectable))
		},
		_mouseDown: function(l) {
			l.originalEvent = l.originalEvent || {};
			if (l.originalEvent.mouseHandled) {
				return
			} (this._mouseStarted && this._mouseUp(l));
			this._mouseDownEvent = l;
			var k = this,
			m = (l.which == 1),
			j = (typeof this.options.cancel == "string" ? c(l.target).parents().add(l.target).filter(this.options.cancel).length: false);
			if (!m || j || !this._mouseCapture(l)) {
				return true
			}
			this.mouseDelayMet = !this.options.delay;
			if (!this.mouseDelayMet) {
				this._mouseDelayTimer = setTimeout(function() {
					k.mouseDelayMet = true
				},
				this.options.delay)
			}
			if (this._mouseDistanceMet(l) && this._mouseDelayMet(l)) {
				this._mouseStarted = (this._mouseStart(l) !== false);
				if (!this._mouseStarted) {
					l.preventDefault();
					return true
				}
			}
			this._mouseMoveDelegate = function(n) {
				return k._mouseMove(n)
			};
			this._mouseUpDelegate = function(n) {
				return k._mouseUp(n)
			};
			c(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate); (c.browser.safari || l.preventDefault());
			l.originalEvent.mouseHandled = true;
			return true
		},
		_mouseMove: function(j) {
			if (c.browser.msie && !j.button) {
				return this._mouseUp(j)
			}
			if (this._mouseStarted) {
				this._mouseDrag(j);
				return j.preventDefault()
			}
			if (this._mouseDistanceMet(j) && this._mouseDelayMet(j)) {
				this._mouseStarted = (this._mouseStart(this._mouseDownEvent, j) !== false); (this._mouseStarted ? this._mouseDrag(j) : this._mouseUp(j))
			}
			return ! this._mouseStarted
		},
		_mouseUp: function(j) {
			c(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
			if (this._mouseStarted) {
				this._mouseStarted = false;
				this._preventClickEvent = (j.target == this._mouseDownEvent.target);
				this._mouseStop(j)
			}
			return false
		},
		_mouseDistanceMet: function(j) {
			return (Math.max(Math.abs(this._mouseDownEvent.pageX - j.pageX), Math.abs(this._mouseDownEvent.pageY - j.pageY)) >= this.options.distance)
		},
		_mouseDelayMet: function(j) {
			return this.mouseDelayMet
		},
		_mouseStart: function(j) {},
		_mouseDrag: function(j) {},
		_mouseStop: function(j) {},
		_mouseCapture: function(j) {
			return true
		}
	};
	c.ui.mouse.defaults = {
		cancel: null,
		distance: 1,
		delay: 0
	}
})(jQuery);; (function(a) {
	a.widget("ui.slider", a.extend({},
	a.ui.mouse, {
		_init: function() {
			var b = this,
			c = this.options;
			this._keySliding = false;
			this._handleIndex = null;
			this._detectOrientation();
			this._mouseInit();
			this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all");
			this.range = a([]);
			if (c.range) {
				if (c.range === true) {
					this.range = a("<div></div>");
					if (!c.values) {
						c.values = [this._valueMin(), this._valueMin()]
					}
					if (c.values.length && c.values.length != 2) {
						c.values = [c.values[0], c.values[0]]
					}
				} else {
					this.range = a("<div></div>")
				}
				this.range.appendTo(this.element).addClass("ui-slider-range");
				if (c.range == "min" || c.range == "max") {
					this.range.addClass("ui-slider-range-" + c.range)
				}
				this.range.addClass("ui-widget-header")
			}
			if (a(".ui-slider-handle", this.element).length == 0) {
				a('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle")
			}
			if (c.values && c.values.length) {
				while (a(".ui-slider-handle", this.element).length < c.values.length) {
					a('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle")
				}
			}
			this.handles = a(".ui-slider-handle", this.element).addClass("ui-state-default ui-corner-all");
			this.handle = this.handles.eq(0);
			this.handles.add(this.range).filter("a").click(function(d) {
				d.preventDefault()
			}).hover(function() {
				if (!c.disabled) {
					a(this).addClass("ui-state-hover")
				}
			},
			function() {
				a(this).removeClass("ui-state-hover")
			}).focus(function() {
				if (!c.disabled) {
					a(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
					a(this).addClass("ui-state-focus")
				} else {
					a(this).blur()
				}
			}).blur(function() {
				a(this).removeClass("ui-state-focus")
			});
			this.handles.each(function(d) {
				a(this).data("index.ui-slider-handle", d)
			});
			this.handles.keydown(function(i) {
				var f = true;
				var e = a(this).data("index.ui-slider-handle");
				if (b.options.disabled) {
					return
				}
				switch (i.keyCode) {
				case a.ui.keyCode.HOME:
				case a.ui.keyCode.END:
				case a.ui.keyCode.UP:
				case a.ui.keyCode.RIGHT:
				case a.ui.keyCode.DOWN:
				case a.ui.keyCode.LEFT:
					f = false;
					if (!b._keySliding) {
						b._keySliding = true;
						a(this).addClass("ui-state-active");
						b._start(i, e)
					}
					break
				}
				var g,
				d,
				h = b._step();
				if (b.options.values && b.options.values.length) {
					g = d = b.values(e)
				} else {
					g = d = b.value()
				}
				switch (i.keyCode) {
				case a.ui.keyCode.HOME:
					d = b._valueMin();
					break;
				case a.ui.keyCode.END:
					d = b._valueMax();
					break;
				case a.ui.keyCode.UP:
				case a.ui.keyCode.RIGHT:
					if (g == b._valueMax()) {
						return
					}
					d = g + h;
					break;
				case a.ui.keyCode.DOWN:
				case a.ui.keyCode.LEFT:
					if (g == b._valueMin()) {
						return
					}
					d = g - h;
					break
				}
				b._slide(i, e, d);
				return f
			}).keyup(function(e) {
				var d = a(this).data("index.ui-slider-handle");
				if (b._keySliding) {
					b._stop(e, d);
					b._change(e, d);
					b._keySliding = false;
					a(this).removeClass("ui-state-active")
				}
			});
			this._refreshValue()
		},
		destroy: function() {
			this.handles.remove();
			this.range.remove();
			this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
			this._mouseDestroy()
		},
		_mouseCapture: function(d) {
			var e = this.options;
			if (e.disabled) {
				return false
			}
			this.elementSize = {
				width: this.element.outerWidth(),
				height: this.element.outerHeight()
			};
			this.elementOffset = this.element.offset();
			var h = {
				x: d.pageX,
				y: d.pageY
			};
			var j = this._normValueFromMouse(h);
			var c = this._valueMax() - this._valueMin() + 1,
			f;
			var k = this,
			i;
			this.handles.each(function(l) {
				var m = Math.abs(j - k.values(l));
				if (c > m) {
					c = m;
					f = a(this);
					i = l
				}
			});
			if (e.range == true && this.values(1) == e.min) {
				f = a(this.handles[++i])
			}
			this._start(d, i);
			k._handleIndex = i;
			f.addClass("ui-state-active").focus();
			var g = f.offset();
			var b = !a(d.target).parents().andSelf().is(".ui-slider-handle");
			this._clickOffset = b ? {
				left: 0,
				top: 0
			}: {
				left: d.pageX - g.left - (f.width() / 2),
				top: d.pageY - g.top - (f.height() / 2) - (parseInt(f.css("borderTopWidth"), 10) || 0) - (parseInt(f.css("borderBottomWidth"), 10) || 0) + (parseInt(f.css("marginTop"), 10) || 0)
			};
			j = this._normValueFromMouse(h);
			this._slide(d, i, j);
			return true
		},
		_mouseStart: function(b) {
			return true
		},
		_mouseDrag: function(d) {
			var b = {
				x: d.pageX,
				y: d.pageY
			};
			var c = this._normValueFromMouse(b);
			this._slide(d, this._handleIndex, c);
			return false
		},
		_mouseStop: function(b) {
			this.handles.removeClass("ui-state-active");
			this._stop(b, this._handleIndex);
			this._change(b, this._handleIndex);
			this._handleIndex = null;
			this._clickOffset = null;
			return false
		},
		_detectOrientation: function() {
			this.orientation = this.options.orientation == "vertical" ? "vertical": "horizontal"
		},
		_normValueFromMouse: function(d) {
			var c,
			h;
			if ("horizontal" == this.orientation) {
				c = this.elementSize.width;
				h = d.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left: 0)
			} else {
				c = this.elementSize.height;
				h = d.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top: 0)
			}
			var f = (h / c);
			if (f > 1) {
				f = 1
			}
			if (f < 0) {
				f = 0
			}
			if ("vertical" == this.orientation) {
				f = 1 - f
			}
			var e = this._valueMax() - this._valueMin(),
			i = f * e,
			b = i % this.options.step,
			g = this._valueMin() + i - b;
			if (b > (this.options.step / 2)) {
				g += this.options.step
			}
			return parseFloat(g.toFixed(5))
		},
		_start: function(d, c) {
			var b = {
				handle: this.handles[c],
				value: this.value()
			};
			if (this.options.values && this.options.values.length) {
				b.value = this.values(c);
				b.values = this.values()
			}
			this._trigger("start", d, b)
		},
		_slide: function(f, e, d) {
			var g = this.handles[e];
			if (this.options.values && this.options.values.length) {
				var b = this.values(e ? 0: 1);
				if ((this.options.values.length == 2 && this.options.range === true) && ((e == 0 && d > b) || (e == 1 && d < b))) {
					d = b
				}
				if (d != this.values(e)) {
					var c = this.values();
					c[e] = d;
					var h = this._trigger("slide", f, {
						handle: this.handles[e],
						value: d,
						values: c
					});
					var b = this.values(e ? 0: 1);
					if (h !== false) {
						this.values(e, d, (f.type == "mousedown" && this.options.animate), true)
					}
				}
			} else {
				if (d != this.value()) {
					var h = this._trigger("slide", f, {
						handle: this.handles[e],
						value: d
					});
					if (h !== false) {
						this._setData("value", d, (f.type == "mousedown" && this.options.animate))
					}
				}
			}
		},
		_stop: function(d, c) {
			var b = {
				handle: this.handles[c],
				value: this.value()
			};
			if (this.options.values && this.options.values.length) {
				b.value = this.values(c);
				b.values = this.values()
			}
			this._trigger("stop", d, b)
		},
		_change: function(d, c) {
			var b = {
				handle: this.handles[c],
				value: this.value()
			};
			if (this.options.values && this.options.values.length) {
				b.value = this.values(c);
				b.values = this.values()
			}
			this._trigger("change", d, b)
		},
		value: function(b) {
			if (arguments.length) {
				this._setData("value", b);
				this._change(null, 0)
			}
			return this._value()
		},
		values: function(b, e, c, d) {
			if (arguments.length > 1) {
				this.options.values[b] = e;
				this._refreshValue(c);
				if (!d) {
					this._change(null, b)
				}
			}
			if (arguments.length) {
				if (this.options.values && this.options.values.length) {
					return this._values(b)
				} else {
					return this.value()
				}
			} else {
				return this._values()
			}
		},
		_setData: function(b, d, c) {
			a.widget.prototype._setData.apply(this, arguments);
			switch (b) {
			case "disabled":
				if (d) {
					this.handles.filter(".ui-state-focus").blur();
					this.handles.removeClass("ui-state-hover");
					this.handles.attr("disabled", "disabled")
				} else {
					this.handles.removeAttr("disabled")
				}
			case "orientation":
				this._detectOrientation();
				this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
				this._refreshValue(c);
				break;
			case "value":
				this._refreshValue(c);
				break
			}
		},
		_step: function() {
			var b = this.options.step;
			return b
		},
		_value: function() {
			var b = this.options.value;
			if (b < this._valueMin()) {
				b = this._valueMin()
			}
			if (b > this._valueMax()) {
				b = this._valueMax()
			}
			return b
		},
		_values: function(b) {
			if (arguments.length) {
				var c = this.options.values[b];
				if (c < this._valueMin()) {
					c = this._valueMin()
				}
				if (c > this._valueMax()) {
					c = this._valueMax()
				}
				return c
			} else {
				return this.options.values
			}
		},
		_valueMin: function() {
			var b = this.options.min;
			return b
		},
		_valueMax: function() {
			var b = this.options.max;
			return b
		},
		_refreshValue: function(c) {
			var f = this.options.range,
			d = this.options,
			l = this;
			if (this.options.values && this.options.values.length) {
				var i,
				h;
				this.handles.each(function(p, n) {
					var o = (l.values(p) - l._valueMin()) / (l._valueMax() - l._valueMin()) * 100;
					var m = {};
					m[l.orientation == "horizontal" ? "left": "bottom"] = o + "%";
					a(this).stop(1, 1)[c ? "animate": "css"](m, d.animate);
					if (l.options.range === true) {
						if (l.orientation == "horizontal") { (p == 0) && l.range.stop(1, 1)[c ? "animate": "css"]({
								left: o + "%"
							},
							d.animate); (p == 1) && l.range[c ? "animate": "css"]({
								width: (o - lastValPercent) + "%"
							},
							{
								queue: false,
								duration: d.animate
							})
						} else { (p == 0) && l.range.stop(1, 1)[c ? "animate": "css"]({
								bottom: (o) + "%"
							},
							d.animate); (p == 1) && l.range[c ? "animate": "css"]({
								height: (o - lastValPercent) + "%"
							},
							{
								queue: false,
								duration: d.animate
							})
						}
					}
					lastValPercent = o
				})
			} else {
				var j = this.value(),
				g = this._valueMin(),
				k = this._valueMax(),
				e = k != g ? (j - g) / (k - g) * 100: 0;
				var b = {};
				b[l.orientation == "horizontal" ? "left": "bottom"] = e + "%";
				this.handle.stop(1, 1)[c ? "animate": "css"](b, d.animate); (f == "min") && (this.orientation == "horizontal") && this.range.stop(1, 1)[c ? "animate": "css"]({
					width: e + "%"
				},
				d.animate); (f == "max") && (this.orientation == "horizontal") && this.range[c ? "animate": "css"]({
					width: (100 - e) + "%"
				},
				{
					queue: false,
					duration: d.animate
				}); (f == "min") && (this.orientation == "vertical") && this.range.stop(1, 1)[c ? "animate": "css"]({
					height: e + "%"
				},
				d.animate); (f == "max") && (this.orientation == "vertical") && this.range[c ? "animate": "css"]({
					height: (100 - e) + "%"
				},
				{
					queue: false,
					duration: d.animate
				})
			}
		}
	}));
	a.extend(a.ui.slider, {
		getter: "value values",
		version: "1.7.2",
		eventPrefix: "slide",
		defaults: {
			animate: false,
			delay: 0,
			distance: 0,
			max: 100,
			min: 0,
			orientation: "horizontal",
			range: false,
			step: 1,
			value: 0,
			values: null
		}
	})
})(jQuery);;; 
(function($) {
	$.fn.extend({
		autocomplete: function(urlOrData, options) {
			var isUrl = typeof urlOrData == "string";
			options = $.extend({},
			$.Autocompleter.defaults, {
				url: isUrl ? urlOrData: null,
				data: isUrl ? null: urlOrData,
				delay: isUrl ? $.Autocompleter.defaults.delay: 10,
				max: options && !options.scroll ? 10: 150
			},
			options);
			options.highlight = options.highlight ||
			function(value) {
				return value;
			};
			options.formatMatch = options.formatMatch || options.formatItem;
			return this.each(function() {
				new $.Autocompleter(this, options);
			});
		},
		result: function(handler) {
			return this.bind("result", handler);
		},
		search: function(handler) {
			return this.trigger("search", [handler]);
		},
		flushCache: function() {
			return this.trigger("flushCache");
		},
		setOptions: function(options) {
			return this.trigger("setOptions", [options]);
		},
		unautocomplete: function() {
			return this.trigger("unautocomplete");
		}
	});
	$.Autocompleter = function(input, options) {
		var KEY = {
			UP: 38,
			DOWN: 40,
			DEL: 46,
			TAB: 9,
			RETURN: 13,
			ESC: 27,
			COMMA: 188,
			PAGEUP: 33,
			PAGEDOWN: 34,
			BACKSPACE: 8
		};
		var $input = $(input).attr("autocomplete", "off").addClass(options.inputClass);
		var timeout;
		var previousValue = "";
		var cache = $.Autocompleter.Cache(options);
		var hasFocus = 0;
		var lastKeyPressCode;
		var config = {
			mouseDownOnSelect: false
		};
		var select = $.Autocompleter.Select(options, input, selectCurrent, config);
		var blockSubmit;
		$.browser.opera && $(input.form).bind("submit.autocomplete",
		function() {
			if (blockSubmit) {
				blockSubmit = false;
				return false;
			}
		});
		$input.bind(($.browser.opera ? "keypress": "keydown") + ".autocomplete",
		function(event) {
			hasFocus = 1;
			lastKeyPressCode = event.keyCode;
			switch (event.keyCode) {
			case KEY.UP:
				event.preventDefault();
				if (select.visible()) {
					select.prev();
				} else {
					onChange(0, true);
				}
				break;
			case KEY.DOWN:
				event.preventDefault();
				if (select.visible()) {
					select.next();
				} else {
					onChange(0, true);
				}
				break;
			case KEY.PAGEUP:
				event.preventDefault();
				if (select.visible()) {
					select.pageUp();
				} else {
					onChange(0, true);
				}
				break;
			case KEY.PAGEDOWN:
				event.preventDefault();
				if (select.visible()) {
					select.pageDown();
				} else {
					onChange(0, true);
				}
				break;
			case options.multiple && $.trim(options.multipleSeparator) == "," && KEY.COMMA: case KEY.TAB:
			case KEY.RETURN:
				if (selectCurrent()) {
					event.preventDefault();
					blockSubmit = true;
					return false;
				}
				break;
			case KEY.ESC:
				select.hide();
				break;
			default:
				clearTimeout(timeout);
				timeout = setTimeout(onChange, options.delay);
				break;
			}
		}).focus(function() {
			hasFocus++;
		}).blur(function() {
			hasFocus = 0;
			if (!config.mouseDownOnSelect) {
				hideResults();
			}
		}).click(function() {
			if (hasFocus++>1 && !select.visible()) {
				onChange(0, true);
			}
		}).bind("search",
		function() {
			var fn = (arguments.length > 1) ? arguments[1] : null;
			function findValueCallback(q, data) {
				var result;
				if (data && data.length) {
					for (var i = 0; i < data.length; i++) {
						if (data[i].result.toLowerCase() == q.toLowerCase()) {
							result = data[i];
							break;
						}
					}
				}
				if (typeof fn == "function") fn(result);
				else $input.trigger("result", result && [result.data, result.value]);
			}
			$.each(trimWords($input.val()),
			function(i, value) {
				request(value, findValueCallback, findValueCallback);
			});
		}).bind("flushCache",
		function() {
			cache.flush();
		}).bind("setOptions",
		function() {
			$.extend(options, arguments[1]);
			if ("data" in arguments[1])
			 cache.populate();
		}).bind("unautocomplete",
		function() {
			select.unbind();
			$input.unbind();
			$(input.form).unbind(".autocomplete");
		});
		function selectCurrent() {
			var selected = select.selected();
			if (!selected)
			 return false;
			var v = selected.result;
			previousValue = v;
			if (options.multiple) {
				var words = trimWords($input.val());
				if (words.length > 1) {
					var seperator = options.multipleSeparator.length;
					var cursorAt = $(input).selection().start;
					var wordAt,
					progress = 0;
					$.each(words,
					function(i, word) {
						progress += word.length;
						if (cursorAt <= progress) {
							wordAt = i;
							return false;
						}
						progress += seperator;
					});
					words[wordAt] = v;
					v = words.join(options.multipleSeparator);
				}
				v += options.multipleSeparator;
			}
			$input.val(v.split("<span>", 1));
			hideResultsNow();
			$input.trigger("result", [selected.data, selected.value]);
			return true;
		}
		function onChange(crap, skipPrevCheck) {
			if (lastKeyPressCode == KEY.DEL) {
				select.hide();
				return;
			}
			var currentValue = $input.val();
			if (!skipPrevCheck && currentValue == previousValue)
			 return;
			previousValue = currentValue;
			currentValue = lastWord(currentValue);
			if (currentValue.length >= options.minChars) {
				$input.addClass(options.loadingClass);
				if (!options.matchCase)
				 currentValue = currentValue.toLowerCase();
				request(currentValue, receiveData, hideResultsNow);
			} else {
				stopLoading();
				select.hide();
			}
		};
		function trimWords(value) {
			if (!value)
			 return [""];
			if (!options.multiple)
			 return [$.trim(value)];
			return $.map(value.split(options.multipleSeparator),
			function(word) {
				return $.trim(value).length ? $.trim(word) : null;
			});
		}
		function lastWord(value) {
			if (!options.multiple)
			 return value;
			var words = trimWords(value);
			if (words.length == 1)
			 return words[0];
			var cursorAt = $(input).selection().start;
			if (cursorAt == value.length) {
				words = trimWords(value)
			} else {
				words = trimWords(value.replace(value.substring(cursorAt), ""));
			}
			return words[words.length - 1];
		}
		function autoFill(q, sValue) {
			if (options.autoFill && (lastWord($input.val()).toLowerCase() == q.toLowerCase()) && lastKeyPressCode != KEY.BACKSPACE) {
				var value = $input.val() + sValue.substring(lastWord(previousValue).length)
				 $input.val(value.split("<span>", 1));
				$(input).selection(previousValue.length, previousValue.length + sValue.length);
			}
		};
		function hideResults() {
			clearTimeout(timeout);
			timeout = setTimeout(hideResultsNow, 200);
		};
		function hideResultsNow() {
			var wasVisible = select.visible();
			select.hide();
			clearTimeout(timeout);
			stopLoading();
			if (options.mustMatch) {
				$input.search(function(result) {
					if (!result) {
						if (options.multiple) {
							var words = trimWords($input.val()).slice(0, -1);
							$input.val(words.join(options.multipleSeparator) + (words.length ? options.multipleSeparator: ""));
						}
						 else {
							$input.val("");
							$input.trigger("result", null);
						}
					}
				});
			}
		};
		function receiveData(q, data) {
			if (data && data.length && hasFocus) {
				stopLoading();
				select.display(data, q);
				autoFill(q, data[0].value);
				select.show();
			} else {
				hideResultsNow();
			}
		};
		function request(term, success, failure) {
			if (!options.matchCase)
			 term = term.toLowerCase();
			var data = cache.load(term);
			if (data && data.length) {
				success(term, data);
			} else if ((typeof options.url == "string") && (options.url.length > 0)) {
				var extraParams = {
					timestamp: +new Date()
				};
				$.each(options.extraParams,
				function(key, param) {
					extraParams[key] = typeof param == "function" ? param() : param;
				});
				$.ajax({
					mode: "abort",
					port: "autocomplete" + input.name,
					dataType: options.dataType,
					url: options.url,
					data: $.extend({
						q: lastWord(term),
						limit: options.max
					},
					extraParams),
					success: function(data) {
						var parsed = options.parse && options.parse(data) || parse(data);
						cache.add(term, parsed);
						success(term, parsed);
					}
				});
			} else {
				select.emptyList();
				failure(term);
			}
		};
		function parse(data) {
			var parsed = [];
			var rows = data.split("\n");
			for (var i = 0; i < rows.length; i++) {
				var row = $.trim(rows[i]);
				if (row) {
					row = row.split("|");
					parsed[parsed.length] = {
						data: row,
						value: row[0],
						result: options.formatResult && options.formatResult(row, row[0]) || row[0]
					};
				}
			}
			return parsed;
		};
		function stopLoading() {
			$input.removeClass(options.loadingClass);
		};
	};
	$.Autocompleter.defaults = {
		inputClass: "ac_input",
		resultsClass: "ac_results",
		loadingClass: "ac_loading",
		minChars: 1,
		delay: 400,
		matchCase: false,
		matchSubset: true,
		matchContains: false,
		cacheLength: 10,
		max: 100,
		mustMatch: false,
		extraParams: {},
		selectFirst: true,
		formatItem: function(row) {
			return row[0];
		},
		formatMatch: null,
		autoFill: false,
		width: 0,
		multiple: false,
		multipleSeparator: ", ",
		highlight: function(value, term) {
			return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
		},
		scroll: true,
		scrollHeight: 180
	};
	$.Autocompleter.Cache = function(options) {
		var data = {};
		var length = 0;
		function matchSubset(s, sub) {
			if (!options.matchCase)
			 s = s.toLowerCase();
			var i = s.indexOf(sub);
			if (options.matchContains == "word") {
				i = s.toLowerCase().search("\\b" + sub.toLowerCase());
			}
			if (i == -1) return false;
			return i == 0 || options.matchContains;
		};
		function add(q, value) {
			if (length > options.cacheLength) {
				flush();
			}
			if (!data[q]) {
				length++;
			}
			data[q] = value;
		}
		function populate() {
			if (!options.data) return false;
			var stMatchSets = {},
			nullData = 0;
			if (!options.url) options.cacheLength = 1;
			stMatchSets[""] = [];
			for (var i = 0, ol = options.data.length; i < ol; i++) {
				var rawValue = options.data[i];
				rawValue = (typeof rawValue == "string") ? [rawValue] : rawValue;
				var value = options.formatMatch(rawValue, i + 1, options.data.length);
				if (value === false)
				 continue;
				var firstChar = value.charAt(0).toLowerCase();
				if (!stMatchSets[firstChar])
				 stMatchSets[firstChar] = [];
				var row = {
					value: value,
					data: rawValue,
					result: options.formatResult && options.formatResult(rawValue) || value
				};
				stMatchSets[firstChar].push(row);
				if (nullData++<options.max) {
					stMatchSets[""].push(row);
				}
			};
			$.each(stMatchSets,
			function(i, value) {
				options.cacheLength++;
				add(i, value);
			});
		}
		setTimeout(populate, 25);
		function flush() {
			data = {};
			length = 0;
		}
		return {
			flush: flush,
			add: add,
			populate: populate,
			load: function(q) {
				if (!options.cacheLength || !length)
				 return null;
				if (!options.url && options.matchContains) {
					var csub = [];
					for (var k in data) {
						if (k.length > 0) {
							var c = data[k];
							$.each(c,
							function(i, x) {
								if (matchSubset(x.value, q)) {
									csub.push(x);
								}
							});
						}
					}
					return csub;
				} else
				 if (data[q]) {
					return data[q];
				} else
				 if (options.matchSubset) {
					for (var i = q.length - 1; i >= options.minChars; i--) {
						var c = data[q.substr(0, i)];
						if (c) {
							var csub = [];
							$.each(c,
							function(i, x) {
								if (matchSubset(x.value, q)) {
									csub[csub.length] = x;
								}
							});
							return csub;
						}
					}
				}
				return null;
			}
		};
	};
	$.Autocompleter.Select = function(options, input, select, config) {
		var CLASSES = {
			ACTIVE: "ac_over"
		};
		var listItems,
		active = -1,
		data,
		term = "",
		needsInit = true,
		element,
		list;
		function init() {
			if (!needsInit)
			 return;
			element = $("<div/>").hide().addClass(options.resultsClass).css("position", "absolute").appendTo(document.body);
			list = $("<ul/>").appendTo(element).mouseover(function(event) {
				if (target(event).nodeName && target(event).nodeName.toUpperCase() == 'LI') {
					active = $("li", list).removeClass(CLASSES.ACTIVE).index(target(event));
					$(target(event)).addClass(CLASSES.ACTIVE);
				}
			}).click(function(event) {
				$(target(event)).addClass(CLASSES.ACTIVE);
				select();
				input.focus();
				return false;
			}).mousedown(function() {
				config.mouseDownOnSelect = true;
			}).mouseup(function() {
				config.mouseDownOnSelect = false;
			});
			if (options.width > 0)
			 element.css("width", options.width);
			needsInit = false;
		}
		function target(event) {
			var element = event.target;
			while (element && element.tagName != "LI")
			 element = element.parentNode;
			if (!element)
			 return [];
			return element;
		}
		function moveSelect(step) {
			listItems.slice(active, active + 1).removeClass(CLASSES.ACTIVE);
			movePosition(step);
			var activeItem = listItems.slice(active, active + 1).addClass(CLASSES.ACTIVE);
			if (options.scroll) {
				var offset = 0;
				listItems.slice(0, active).each(function() {
					offset += this.offsetHeight;
				});
				if ((offset + activeItem[0].offsetHeight - list.scrollTop()) > list[0].clientHeight) {
					list.scrollTop(offset + activeItem[0].offsetHeight - list.innerHeight());
				} else if (offset < list.scrollTop()) {
					list.scrollTop(offset);
				}
			}
		};
		function movePosition(step) {
			active += step;
			if (active < 0) {
				active = listItems.size() - 1;
			} else if (active >= listItems.size()) {
				active = 0;
			}
		}
		function limitNumberOfItems(available) {
			return options.max && options.max < available ? options.max: available;
		}
		function fillList() {
			list.empty();
			var max = limitNumberOfItems(data.length);
			for (var i = 0; i < max; i++) {
				if (!data[i])
				 continue;
				var formatted = options.formatItem(data[i].data, i + 1, max, data[i].value, term);
				if (formatted === false)
				 continue;
				var li = $("<li/>").html(options.highlight(formatted, term)).addClass(i % 2 == 0 ? "ac_even": "ac_odd").appendTo(list)[0];
				$.data(li, "ac_data", data[i]);
			}
			listItems = list.find("li");
			if (options.selectFirst) {
				listItems.slice(0, 1).addClass(CLASSES.ACTIVE);
				active = 0;
			}
			if ($.fn.bgiframe)
			 list.bgiframe();
		}
		return {
			display: function(d, q) {
				init();
				data = d;
				term = q;
				fillList();
			},
			next: function() {
				moveSelect(1);
			},
			prev: function() {
				moveSelect( - 1);
			},
			pageUp: function() {
				if (active != 0 && active - 8 < 0) {
					moveSelect( - active);
				} else {
					moveSelect( - 8);
				}
			},
			pageDown: function() {
				if (active != listItems.size() - 1 && active + 8 > listItems.size()) {
					moveSelect(listItems.size() - 1 - active);
				} else {
					moveSelect(8);
				}
			},
			hide: function() {
				element && element.hide();
				listItems && listItems.removeClass(CLASSES.ACTIVE);
				active = -1;
			},
			visible: function() {
				return element && element.is(":visible");
			},
			current: function() {
				return this.visible() && (listItems.filter("." + CLASSES.ACTIVE)[0] || options.selectFirst && listItems[0]);
			},
			show: function() {
				var offset = $(input).offset();
				element.css({
					width: typeof options.width == "string" || options.width > 0 ? options.width: $(input).width(),
					top: offset.top + input.offsetHeight,
					left: offset.left
				}).show();
				if (options.scroll) {
					list.scrollTop(0);
					list.css({
						maxHeight: options.scrollHeight,
						overflow: 'auto'
					});
					if ($.browser.msie && typeof document.body.style.maxHeight === "undefined") {
						var listHeight = 0;
						listItems.each(function() {
							listHeight += this.offsetHeight;
						});
						var scrollbarsVisible = listHeight > options.scrollHeight;
						list.css('height', scrollbarsVisible ? options.scrollHeight: listHeight);
						if (!scrollbarsVisible) {
							listItems.width(list.width() - parseInt(listItems.css("padding-left")) - parseInt(listItems.css("padding-right")));
						}
					}
				}
			},
			selected: function() {
				var selected = listItems && listItems.filter("." + CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);
				return selected && selected.length && $.data(selected[0], "ac_data");
			},
			emptyList: function() {
				list && list.empty();
			},
			unbind: function() {
				element && element.remove();
			}
		};
	};
	$.fn.selection = function(start, end) {
		if (start !== undefined) {
			return this.each(function() {
				if (this.createTextRange) {
					var selRange = this.createTextRange();
					if (end === undefined || start == end) {
						selRange.move("character", start);
						selRange.select();
					} else {
						selRange.collapse(true);
						selRange.moveStart("character", start);
						selRange.moveEnd("character", end);
						selRange.select();
					}
				} else if (this.setSelectionRange) {
					this.setSelectionRange(start, end);
				} else if (this.selectionStart) {
					this.selectionStart = start;
					this.selectionEnd = end;
				}
			});
		}
		var field = this[0];
		if (field.createTextRange) {
			var range = document.selection.createRange(),
			orig = field.value,
			teststring = "<->",
			textLength = range.text.length;
			range.text = teststring;
			var caretAt = field.value.indexOf(teststring);
			field.value = orig;
			this.selection(caretAt, caretAt + textLength);
			return {
				start: caretAt,
				end: caretAt + textLength
			}
		} else if (field.selectionStart !== undefined) {
			return {
				start: field.selectionStart,
				end: field.selectionEnd
			}
		}
	};
})(jQuery);
jQuery.fn.extend({
	selectbox: function(options) {
		return this.each(function() {
			new jQuery.SelectBox(this, options);
		});
	}
});
if (!window.console) {
	var console = {
		log: function(msg) {}
	}
}
jQuery.SelectBox = function(selectobj, options) {
	var opt = options || {};
	opt.inputClass = opt.inputClass || "selectbox";
	opt.containerClass = opt.containerClass || "selectbox-wrapper";
	opt.hoverClass = opt.hoverClass || "current";
	opt.currentClass = opt.selectedClass || "selected"
	opt.onChangeCallback = opt.onChangeCallback || false;
	opt.onChangeParams = opt.onChangeParams || false;
	opt.debug = opt.debug || false;
	var elm_id = selectobj.id;
	var active = -1;
	var inFocus = false;
	var hasfocus = 0;
	var $select = $(selectobj);
	var $container = setupContainer(opt);
	var $input = setupInput(opt);
	$select.hide().before($input).before($container);
	init();
	$input.click(function() {
		if (!inFocus) {
			$container.toggle();
		}
	}).focus(function() {
		if ($container.not(':visible')) {
			inFocus = true;
			$container.show();
		}
	}).keydown(function(event) {
		switch (event.keyCode) {
		case 38:
			event.preventDefault();
			moveSelect( - 1);
			break;
		case 40:
			event.preventDefault();
			moveSelect(1);
			break;
		case 13:
			event.preventDefault();
			$('li.' + opt.hoverClass).trigger('click');
			break;
		case 27:
			hideMe();
			break;
		}
	}).blur(function() {
		if ($container.is(':visible') && hasfocus > 0) {
			if (opt.debug) console.log('container visible and has focus')
		} else {
			hideMe();
		}
	});
	function hideMe() {
		hasfocus = 0;
		$container.hide();
	}
	function init() {
		$container.append(getSelectOptions($input.attr('id'))).hide();
		var width = $input.css('width');
		$container.width(width);
	}
	function setupContainer(options) {
		var container = document.createElement("div");
		$container = $(container);
		$container.attr('id', elm_id + '_container');
		$container.addClass(options.containerClass);
		return $container;
	}
	function setupInput(options) {
		var input = document.createElement("input");
		var $input = $(input);
		$input.attr("id", elm_id + "_input");
		$input.attr("type", "text");
		$input.addClass(options.inputClass);
		$input.attr("autocomplete", "off");
		$input.attr("readonly", "readonly");
		$input.attr("tabIndex", $select.attr("tabindex"));
		return $input;
	}
	function moveSelect(step) {
		var lis = $("li", $container);
		if (!lis) return;
		active += step;
		if (active < 0) {
			active = 0;
		} else if (active >= lis.size()) {
			active = lis.size() - 1;
		}
		lis.removeClass(opt.hoverClass);
		$(lis[active]).addClass(opt.hoverClass);
	}
	function setCurrent() {
		var li = $("li." + opt.currentClass, $container).get(0);
		var ar = ('' + li.id).split('_');
		var el = ar[ar.length - 1];
		if (opt.onChangeCallback) {
			$select.get(0).selectedIndex = $('li', $container).index(li);
			opt.onChangeParams = {
				selectedVal: $select.val()
			};
			opt.onChangeCallback(opt.onChangeParams);
		} else {
			$select.val(el);
			$select.change();
		}
		$input.val($(li).html());
		return true;
	}
	function getCurrentSelected() {
		return $select.val();
	}
	function getCurrentValue() {
		return $input.val();
	}
	function getSelectOptions(parentid) {
		var select_options = new Array();
		var ul = document.createElement('ul');
		$select.children('option').each(function() {
			var li = document.createElement('li');
			li.setAttribute('id', parentid + '_' + $(this).val());
			li.innerHTML = $(this).html();
			if ($(this).is(':selected')) {
				$input.val($(this).html());
				$(li).addClass(opt.currentClass);
			}
			ul.appendChild(li);
			$(li).mouseover(function(event) {
				hasfocus = 1;
				if (opt.debug) console.log('over on : ' + this.id);
				jQuery(event.target, $container).addClass(opt.hoverClass);
			}).mouseout(function(event) {
				hasfocus = -1;
				if (opt.debug) console.log('out on : ' + this.id);
				jQuery(event.target, $container).removeClass(opt.hoverClass);
			}).click(function(event) {
				var fl = $('li.' + opt.hoverClass, $container).get(0);
				if (opt.debug) console.log('click on :' + this.id);
				$('li.' + opt.currentClass).removeClass(opt.currentClass);
				$(this).addClass(opt.currentClass);
				setCurrent();
				hideMe();
			});
		});
		return ul;
	}
}; 

(function ($, document, window) {
	var
	// Default settings object.	
	// See http://jacklmoore.com/colorbox for details.
	defaults = {
		transition: "elastic",
		speed: 300,
		width: false,
		initialWidth: "600",
		innerWidth: false,
		maxWidth: false,
		height: false,
		initialHeight: "450",
		innerHeight: false,
		maxHeight: false,
		scalePhotos: true,
		scrolling: true,
		inline: false,
		html: false,
		iframe: false,
		fastIframe: true,
		photo: false,
		href: false,
		title: false,
		rel: false,
		opacity: 0.9,
		preloading: true,
		current: "image {current} of {total}",
		previous: "previous",
		next: "next",
		close: "close",
		open: false,
		returnFocus: true,
		loop: true,
		slideshow: false,
		slideshowAuto: true,
		slideshowSpeed: 2500,
		slideshowStart: "start slideshow",
		slideshowStop: "stop slideshow",
		onOpen: false,
		onLoad: false,
		onComplete: false,
		onCleanup: false,
		onClosed: false,
		overlayClose: true,		
		escKey: true,
		arrowKey: true,
		top: false,
		bottom: false,
		left: false,
		right: false,
		fixed: false,
		data: undefined
	},
	
	// Abstracting the HTML and event identifiers for easy rebranding
	colorbox = 'colorbox',
	prefix = 'cbox',
	boxElement = prefix + 'Element',
	
	// Events	
	event_open = prefix + '_open',
	event_load = prefix + '_load',
	event_complete = prefix + '_complete',
	event_cleanup = prefix + '_cleanup',
	event_closed = prefix + '_closed',
	event_purge = prefix + '_purge',
	
	// Special Handling for IE
	isIE = $.browser.msie && !$.support.opacity, // Detects IE6,7,8.  IE9 supports opacity.  Feature detection alone gave a false positive on at least one phone browser and on some development versions of Chrome, hence the user-agent test.
	isIE6 = isIE && $.browser.version < 7,
	event_ie6 = prefix + '_IE6',
	
	// Cached jQuery Object Variables
	$overlay,
	$box,
	$wrap,
	$content,
	$topBorder,
	$leftBorder,
	$rightBorder,
	$bottomBorder,
	$related,
	$window,
	$loaded,
	$loadingBay,
	$loadingOverlay,
	$title,
	$current,
	$slideshow,
	$next,
	$prev,
	$close,
	$groupControls,
	
	// Variables for cached values or use across multiple functions
	settings,
	interfaceHeight,
	interfaceWidth,
	loadedHeight,
	loadedWidth,
	element,
	index,
	photo,
	open,
	active,
	closing,
	loadingTimer,
	publicMethod,
	div = "div";

	// ****************
	// HELPER FUNCTIONS
	// ****************
	
	// Convience function for creating new jQuery objects
	function $tag(tag, id, css) {
		var element = document.createElement(tag);
		
		if (id) {
			element.id = prefix + id;
		}
		
		if (css) {
			element.style.cssText = css;
		}
		
		return $(element);
	}

	// Determine the next and previous members in a group.
	function getIndex(increment) {
		var 
		max = $related.length, 
		newIndex = (index + increment) % max;
		
		return (newIndex < 0) ? max + newIndex : newIndex;
	}

	// Convert '%' and 'px' values to integers
	function setSize(size, dimension) {
		return Math.round((/%/.test(size) ? ((dimension === 'x' ? $window.width() : $window.height()) / 100) : 1) * parseInt(size, 10));
	}
	
	// Checks an href to see if it is a photo.
	// There is a force photo option (photo: true) for hrefs that cannot be matched by this regex.
	function isImage(url) {
		return settings.photo || /\.(gif|png|jpe?g|bmp|ico)((#|\?).*)?$/i.test(url);
	}
	
	// Assigns function results to their respective properties
	function makeSettings() {
		var i;
		settings = $.extend({}, $.data(element, colorbox));
		
		for (i in settings) {
			if ($.isFunction(settings[i]) && i.slice(0, 2) !== 'on') { // checks to make sure the function isn't one of the callbacks, they will be handled at the appropriate time.
				settings[i] = settings[i].call(element);
			}
		}
		
		settings.rel = settings.rel || element.rel || 'nofollow';
		settings.href = settings.href || $(element).attr('href');
		settings.title = settings.title || element.title;
		
		if (typeof settings.href === "string") {
			settings.href = $.trim(settings.href);
		}
	}

	function trigger(event, callback) {
		$.event.trigger(event);
		if (callback) {
			callback.call(element);
		}
	}

	// Slideshow functionality
	function slideshow() {
		var
		timeOut,
		className = prefix + "Slideshow_",
		click = "click." + prefix,
		start,
		stop,
		clear;
		
		if (settings.slideshow && $related[1]) {
			start = function () {
				$slideshow
					.text(settings.slideshowStop)
					.unbind(click)
					.bind(event_complete, function () {
						if (index < $related.length - 1 || settings.loop) {
							timeOut = setTimeout(publicMethod.next, settings.slideshowSpeed);
						}
					})
					.bind(event_load, function () {
						clearTimeout(timeOut);
					})
					.one(click + ' ' + event_cleanup, stop);
				$box.removeClass(className + "off").addClass(className + "on");
				timeOut = setTimeout(publicMethod.next, settings.slideshowSpeed);
			};
			
			stop = function () {
				clearTimeout(timeOut);
				$slideshow
					.text(settings.slideshowStart)
					.unbind([event_complete, event_load, event_cleanup, click].join(' '))
					.one(click, function () {
						publicMethod.next();
						start();
					});
				$box.removeClass(className + "on").addClass(className + "off");
			};
			
			if (settings.slideshowAuto) {
				start();
			} else {
				stop();
			}
		} else {
			$box.removeClass(className + "off " + className + "on");
		}
	}

	function launch(target) {
		if (!closing) {
			
			element = target;
			
			makeSettings();
			
			$related = $(element);
			
			index = 0;
			
			if (settings.rel !== 'nofollow') {
				$related = $('.' + boxElement).filter(function () {
					var relRelated = $.data(this, colorbox).rel || this.rel;
					return (relRelated === settings.rel);
				});
				index = $related.index(element);
				
				// Check direct calls to ColorBox.
				if (index === -1) {
					$related = $related.add(element);
					index = $related.length - 1;
				}
			}
			
			if (!open) {
				open = active = true; // Prevents the page-change action from queuing up if the visitor holds down the left or right keys.
				
				$box.show();
				
				if (settings.returnFocus) {
					try {
						element.blur();
						$(element).one(event_closed, function () {
							try {
								this.focus();
							} catch (e) {
								// do nothing
							}
						});
					} catch (e) {
						// do nothing
					}
				}
				
				// +settings.opacity avoids a problem in IE when using non-zero-prefixed-string-values, like '.5'
				$overlay.css({"opacity": +settings.opacity, "cursor": settings.overlayClose ? "pointer" : "auto"}).show();
				
				// Opens inital empty ColorBox prior to content being loaded.
				settings.w = setSize(settings.initialWidth, 'x');
				settings.h = setSize(settings.initialHeight, 'y');
				publicMethod.position();
				
				if (isIE6) {
					$window.bind('resize.' + event_ie6 + ' scroll.' + event_ie6, function () {
						$overlay.css({width: $window.width(), height: $window.height(), top: $window.scrollTop(), left: $window.scrollLeft()});
					}).trigger('resize.' + event_ie6);
				}
				
				trigger(event_open, settings.onOpen);
				
				$groupControls.add($title).hide();
				
				$close.html(settings.close).show();
			}
			
			publicMethod.load(true);
		}
	}

	// ****************
	// PUBLIC FUNCTIONS
	// Usage format: $.fn.colorbox.close();
	// Usage from within an iframe: parent.$.fn.colorbox.close();
	// ****************
	
	publicMethod = $.fn[colorbox] = $[colorbox] = function (options, callback) {
		var $this = this;
		
		options = options || {};
		
		publicMethod.init();
		
		if (!$this[0]) {
			if ($this.selector) { // if a selector was given and it didn't match any elements, go ahead and exit.
				return $this;
			}
			// if no selector was given (ie. $.colorbox()), create a temporary element to work with
			$this = $('<a/>');
			options.open = true; // assume an immediate open
		}
		
		if (callback) {
			options.onComplete = callback;
		}
		
		$this.each(function () {
			$.data(this, colorbox, $.extend({}, $.data(this, colorbox) || defaults, options));
			$(this).addClass(boxElement);
		});
		
		if (($.isFunction(options.open) && options.open.call($this)) || options.open) {
			launch($this[0]);
		}
		
		return $this;
	};

	// Initialize ColorBox: store common calculations, preload the interface graphics, append the html.
	// This preps ColorBox for a speedy open when clicked, and minimizes the burdon on the browser by only
	// having to run once, instead of each time colorbox is opened.
	publicMethod.init = function () {
		if (!$box) {
			
			// If the body is not present yet, wait for DOM ready
			if (!$('body')[0]) {
				$(publicMethod.init);
				return;
			}
			
			// Create the markup and append to BODY
			$window = $(window);
			$box = $tag(div).attr({id: colorbox, 'class': isIE ? prefix + (isIE6 ? 'IE6' : 'IE') : ''});
			$overlay = $tag(div, "Overlay", isIE6 ? 'position:absolute' : '').hide();
			$wrap = $tag(div, "Wrapper");
			$content = $tag(div, "Content").append(
				$loaded = $tag(div, "LoadedContent", 'width:0; height:0; overflow:hidden'),
				$loadingOverlay = $tag(div, "LoadingOverlay").add($tag(div, "LoadingGraphic")),
				$title = $tag(div, "Title"),
				$current = $tag(div, "Current"),
				$next = $tag(div, "Next"),
				$prev = $tag(div, "Previous"),
				$slideshow = $tag(div, "Slideshow").bind(event_open, slideshow),
				$close = $tag(div, "Close")
			);
			
			$wrap.append( // The 3x3 Grid that makes up ColorBox
				$tag(div).append(
					$tag(div, "TopLeft"),
					$topBorder = $tag(div, "TopCenter"),
					$tag(div, "TopRight")
				),
				$tag(div, false, 'clear:left').append(
					$leftBorder = $tag(div, "MiddleLeft"),
					$content,
					$rightBorder = $tag(div, "MiddleRight")
				),
				$tag(div, false, 'clear:left').append(
					$tag(div, "BottomLeft"),
					$bottomBorder = $tag(div, "BottomCenter"),
					$tag(div, "BottomRight")
				)
			).find('div div').css({'float': 'left'});
			
			$loadingBay = $tag(div, false, 'position:absolute; width:9999px; visibility:hidden; display:none');
			
			$('body').prepend($overlay, $box.append($wrap, $loadingBay));
			
			// Cache values needed for size calculations
			interfaceHeight = $topBorder.height() + $bottomBorder.height() + $content.outerHeight(true) - $content.height();//Subtraction needed for IE6
			interfaceWidth = $leftBorder.width() + $rightBorder.width() + $content.outerWidth(true) - $content.width();
			loadedHeight = $loaded.outerHeight(true);
			loadedWidth = $loaded.outerWidth(true);
			
			// Setting padding to remove the need to do size conversions during the animation step.
			$box.css({"padding-bottom": interfaceHeight, "padding-right": interfaceWidth}).hide();
			
			// Setup button events.
			// Anonymous functions here keep the public method from being cached, thereby allowing them to be redefined on the fly.
			$next.click(function () {
				publicMethod.next();
			});
			$prev.click(function () {
				publicMethod.prev();
			});
			$close.click(function () {
				publicMethod.close();
			});
			
			$groupControls = $next.add($prev).add($current).add($slideshow);
			
			$overlay.click(function () {
				if (settings.overlayClose) {
					publicMethod.close();
				}
			});
			
			// Set Navigation Key Bindings
			$(document).bind('keydown.' + prefix, function (e) {
				var key = e.keyCode;
				if (open && settings.escKey && key === 27) {
					e.preventDefault();
					publicMethod.close();
				}
				if (open && settings.arrowKey && $related[1]) {
					if (key === 37) {
						e.preventDefault();
						$prev.click();
					} else if (key === 39) {
						e.preventDefault();
						$next.click();
					}
				}
			});
		}
	};
	
	publicMethod.remove = function () {
		$box.add($overlay).remove();
		$box = null;
		$('.' + boxElement).removeData(colorbox).removeClass(boxElement);
	};

	publicMethod.position = function (speed, loadedCallback) {
		var 
		top = 0, 
		left = 0, 
		offset = $box.offset(),
		scrollTop = $window.scrollTop(), 
		scrollLeft = $window.scrollLeft();
		
		$window.unbind('resize.' + prefix);

		// remove the modal so that it doesn't influence the document width/height        
		$box.css({top: -9e4, left: -9e4});

		if (settings.fixed && !isIE6) {
			offset.top -= scrollTop;
			offset.left -= scrollLeft;
			$box.css({position: 'fixed'});
		} else {
			top = scrollTop;
			left = scrollLeft;
			$box.css({position: 'absolute'});
		}

		// keeps the top and left positions within the browser's viewport.
		if (settings.right !== false) {
			left += Math.max($window.width() - settings.w - loadedWidth - interfaceWidth - setSize(settings.right, 'x'), 0);
		} else if (settings.left !== false) {
			left += setSize(settings.left, 'x');
		} else {
			left += Math.round(Math.max($window.width() - settings.w - loadedWidth - interfaceWidth, 0) / 2);
		}
		
		if (settings.bottom !== false) {
			top += Math.max($window.height() - settings.h - loadedHeight - interfaceHeight - setSize(settings.bottom, 'y'), 0);
		} else if (settings.top !== false) {
			top += setSize(settings.top, 'y');
		} else {
			top += Math.round(Math.max($window.height() - settings.h - loadedHeight - interfaceHeight, 0) / 2);
		}
		
		$box.css({top: offset.top, left: offset.left});
		
		// setting the speed to 0 to reduce the delay between same-sized content.
		speed = ($box.width() === settings.w + loadedWidth && $box.height() === settings.h + loadedHeight) ? 0 : speed || 0;
		
		// this gives the wrapper plenty of breathing room so it's floated contents can move around smoothly,
		// but it has to be shrank down around the size of div#colorbox when it's done.  If not,
		// it can invoke an obscure IE bug when using iframes.
		$wrap[0].style.width = $wrap[0].style.height = "9999px";
		
		function modalDimensions(that) {
			// loading overlay height has to be explicitly set for IE6.
			$topBorder[0].style.width = $bottomBorder[0].style.width = $content[0].style.width = that.style.width;
			$loadingOverlay[0].style.height = $loadingOverlay[1].style.height = $content[0].style.height = $leftBorder[0].style.height = $rightBorder[0].style.height = that.style.height;
		}
		
		$box.dequeue().animate({width: settings.w + loadedWidth, height: settings.h + loadedHeight, top: top, left: left}, {
			duration: speed,
			complete: function () {
				modalDimensions(this);
				
				active = false;
				
				// shrink the wrapper down to exactly the size of colorbox to avoid a bug in IE's iframe implementation.
				$wrap[0].style.width = (settings.w + loadedWidth + interfaceWidth) + "px";
				$wrap[0].style.height = (settings.h + loadedHeight + interfaceHeight) + "px";
				
				if (loadedCallback) {
					loadedCallback();
				}
				
				setTimeout(function () {  // small delay before binding onresize due to an IE8 bug.
					$window.bind('resize.' + prefix, publicMethod.position);
				}, 1);
			},
			step: function () {
				modalDimensions(this);
			}
		});
	};

	publicMethod.resize = function (options) {
		if (open) {
			options = options || {};
			
			if (options.width) {
				settings.w = setSize(options.width, 'x') - loadedWidth - interfaceWidth;
			}
			if (options.innerWidth) {
				settings.w = setSize(options.innerWidth, 'x');
			}
			$loaded.css({width: settings.w});
			
			if (options.height) {
				settings.h = setSize(options.height, 'y') - loadedHeight - interfaceHeight;
			}
			if (options.innerHeight) {
				settings.h = setSize(options.innerHeight, 'y');
			}
			if (!options.innerHeight && !options.height) {
				$loaded.css({height: "auto"});
				settings.h = $loaded.height();
			}
			$loaded.css({height: settings.h});
			
			publicMethod.position(settings.transition === "none" ? 0 : settings.speed);
		}
	};

	publicMethod.prep = function (object) {
		if (!open) {
			return;
		}
		
		var callback, speed = settings.transition === "none" ? 0 : settings.speed;
		
		$loaded.remove();
		$loaded = $tag(div, 'LoadedContent').append(object);
		
		function getWidth() {
			settings.w = settings.w || $loaded.width();
			settings.w = settings.mw && settings.mw < settings.w ? settings.mw : settings.w;
			return settings.w;
		}
		function getHeight() {
			settings.h = settings.h || $loaded.height();
			settings.h = settings.mh && settings.mh < settings.h ? settings.mh : settings.h;
			return settings.h;
		}
		
		$loaded.hide()
		.appendTo($loadingBay.show())// content has to be appended to the DOM for accurate size calculations.
		.css({width: getWidth(), overflow: settings.scrolling ? 'auto' : 'hidden'})
		.css({height: getHeight()})// sets the height independently from the width in case the new width influences the value of height.
		.prependTo($content);
		
		$loadingBay.hide();
		
		// floating the IMG removes the bottom line-height and fixed a problem where IE miscalculates the width of the parent element as 100% of the document width.
		//$(photo).css({'float': 'none', marginLeft: 'auto', marginRight: 'auto'});
		
		$(photo).css({'float': 'none'});
		
		// Hides SELECT elements in IE6 because they would otherwise sit on top of the overlay.
		if (isIE6) {
			$('select').not($box.find('select')).filter(function () {
				return this.style.visibility !== 'hidden';
			}).css({'visibility': 'hidden'}).one(event_cleanup, function () {
				this.style.visibility = 'inherit';
			});
		}
		
		callback = function () {
			var preload, i, total = $related.length, iframe, frameBorder = 'frameBorder', allowTransparency = 'allowTransparency', complete, src, img;
			
			if (!open) {
				return;
			}
			
			function removeFilter() {
				if (isIE) {
					$box[0].style.removeAttribute('filter');
				}
			}
			
			complete = function () {
				clearTimeout(loadingTimer);
				$loadingOverlay.hide();
				trigger(event_complete, settings.onComplete);
			};
			
			if (isIE) {
				//This fadeIn helps the bicubic resampling to kick-in.
				if (photo) {
					$loaded.fadeIn(100);
				}
			}
			
			$title.html(settings.title).add($loaded).show();
			
			if (total > 1) { // handle grouping
				if (typeof settings.current === "string") {
					$current.html(settings.current.replace('{current}', index + 1).replace('{total}', total)).show();
				}
				
				$next[(settings.loop || index < total - 1) ? "show" : "hide"]().html(settings.next);
				$prev[(settings.loop || index) ? "show" : "hide"]().html(settings.previous);
				
				if (settings.slideshow) {
					$slideshow.show();
				}
				
				// Preloads images within a rel group
				if (settings.preloading) {
					preload = [
						getIndex(-1),
						getIndex(1)
					];
					while ((i = $related[preload.pop()])) {
						src = $.data(i, colorbox).href || i.href;
						if ($.isFunction(src)) {
							src = src.call(i);
						}
						if (isImage(src)) {
							img = new Image();
							img.src = src;
						}
					}
				}
			} else {
				$groupControls.hide();
			}
			
			if (settings.iframe) {
				iframe = $tag('iframe')[0];
				
				if (frameBorder in iframe) {
					iframe[frameBorder] = 0;
				}
				if (allowTransparency in iframe) {
					iframe[allowTransparency] = "true";
				}
				// give the iframe a unique name to prevent caching
				iframe.name = prefix + (+new Date());
				if (settings.fastIframe) {
					complete();
				} else {
					$(iframe).one('load', complete);
				}
				iframe.src = settings.href;
				if (!settings.scrolling) {
					iframe.scrolling = "no";
				}
				$(iframe).addClass(prefix + 'Iframe').appendTo($loaded).one(event_purge, function () {
					iframe.src = "//about:blank";
				});
			} else {
				complete();
			}
			
			if (settings.transition === 'fade') {
				$box.fadeTo(speed, 1, removeFilter);
			} else {
				removeFilter();
			}
		};
		
		if (settings.transition === 'fade') {
			$box.fadeTo(speed, 0, function () {
				publicMethod.position(0, callback);
			});
		} else {
			publicMethod.position(speed, callback);
		}
	};

	publicMethod.load = function (launched) {
		var href, setResize, prep = publicMethod.prep;
		
		active = true;
		
		photo = false;
		
		element = $related[index];
		
		if (!launched) {
			makeSettings();
		}
		
		trigger(event_purge);
		
		trigger(event_load, settings.onLoad);
		
		settings.h = settings.height ?
				setSize(settings.height, 'y') - loadedHeight - interfaceHeight :
				settings.innerHeight && setSize(settings.innerHeight, 'y');
		
		settings.w = settings.width ?
				setSize(settings.width, 'x') - loadedWidth - interfaceWidth :
				settings.innerWidth && setSize(settings.innerWidth, 'x');
		
		// Sets the minimum dimensions for use in image scaling
		settings.mw = settings.w;
		settings.mh = settings.h;
		
		// Re-evaluate the minimum width and height based on maxWidth and maxHeight values.
		// If the width or height exceed the maxWidth or maxHeight, use the maximum values instead.
		if (settings.maxWidth) {
			settings.mw = setSize(settings.maxWidth, 'x') - loadedWidth - interfaceWidth;
			settings.mw = settings.w && settings.w < settings.mw ? settings.w : settings.mw;
		}
		if (settings.maxHeight) {
			settings.mh = setSize(settings.maxHeight, 'y') - loadedHeight - interfaceHeight;
			settings.mh = settings.h && settings.h < settings.mh ? settings.h : settings.mh;
		}
		
		href = settings.href;
		
		loadingTimer = setTimeout(function () {
			$loadingOverlay.show();
		}, 100);
		
		if (settings.inline) {
			// Inserts an empty placeholder where inline content is being pulled from.
			// An event is bound to put inline content back when ColorBox closes or loads new content.
			$tag(div).hide().insertBefore($(href)[0]).one(event_purge, function () {
				$(this).replaceWith($loaded.children());
			});
			prep($(href));
		} else if (settings.iframe) {
			// IFrame element won't be added to the DOM until it is ready to be displayed,
			// to avoid problems with DOM-ready JS that might be trying to run in that iframe.
			prep(" ");
		} else if (settings.html) {
			prep(settings.html);
		} else if (isImage(href)) {
			$(photo = new Image())
			.addClass(prefix + 'Photo')
			.error(function () {
				settings.title = false;
				prep($tag(div, 'Error').text('This image could not be loaded'));
			})
			.load(function () {
				var percent;
				photo.onload = null; //stops animated gifs from firing the onload repeatedly.
				
				if (settings.scalePhotos) {
					setResize = function () {
						photo.height -= photo.height * percent;
						photo.width -= photo.width * percent;	
					};
					if (settings.mw && photo.width > settings.mw) {
						percent = (photo.width - settings.mw) / photo.width;
						setResize();
					}
					if (settings.mh && photo.height > settings.mh) {
						percent = (photo.height - settings.mh) / photo.height;
						setResize();
					}
				}
				
				if (settings.h) {
					photo.style.marginTop = Math.max(settings.h - photo.height, 0) / 2 + 'px';
				}
				
				if ($related[1] && (index < $related.length - 1 || settings.loop)) {
					photo.style.cursor = 'pointer';
					photo.onclick = function () {
						publicMethod.next();
					};
				}
				
				if (isIE) {
					photo.style.msInterpolationMode = 'bicubic';
				}
				
				setTimeout(function () { // A pause because Chrome will sometimes report a 0 by 0 size otherwise.
					prep(photo);
				}, 1);
			});
			
			setTimeout(function () { // A pause because Opera 10.6+ will sometimes not run the onload function otherwise.
				photo.src = href;
			}, 1);
		} else if (href) {
			$loadingBay.load(href, settings.data, function (data, status, xhr) {
				prep(status === 'error' ? $tag(div, 'Error').text('Request unsuccessful: ' + xhr.statusText) : $(this).contents());
			});
		}
	};
		
	// Navigates to the next page/image in a set.
	publicMethod.next = function () {
		if (!active && $related[1] && (index < $related.length - 1 || settings.loop)) {
			index = getIndex(1);
			publicMethod.load();
		}
	};
	
	publicMethod.prev = function () {
		if (!active && $related[1] && (index || settings.loop)) {
			index = getIndex(-1);
			publicMethod.load();
		}
	};

	// Note: to use this within an iframe use the following format: parent.$.fn.colorbox.close();
	publicMethod.close = function () {
		if (open && !closing) {
			
			closing = true;
			
			open = false;
			
			trigger(event_cleanup, settings.onCleanup);
			
			$window.unbind('.' + prefix + ' .' + event_ie6);
			
			$overlay.fadeTo(200, 0);
			
			$box.stop().fadeTo(300, 0, function () {
				 
				$box.add($overlay).css({'opacity': 1, cursor: 'auto'}).hide();
				
				trigger(event_purge);
				
				$loaded.remove();
				
				setTimeout(function () {
					closing = false;
					trigger(event_closed, settings.onClosed);
				}, 1);
			});
		}
	};

	// A method for fetching the current element ColorBox is referencing.
	// returns a jQuery object.
	publicMethod.element = function () {
		return $(element);
	};

	publicMethod.settings = defaults;
	
	// Bind the live event before DOM-ready for maximum performance in IE6 & 7.
	$('.' + boxElement, document).live('click', function (e) {
		// ignore non-left-mouse-clicks and clicks modified with ctrl / command, shift, or alt.
		// See: http://jacklmoore.com/notes/click-events/
		if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey)) {
			e.preventDefault();
			launch(this);
		}
	});

	// Setup ColorBox
	publicMethod.init();

}(jQuery, document, this));

/*user functions*/
function bindDownloadButton() {
    $('a.header_download_link').click(function(event) {
        var url = $(this).attr('rel');
        event.preventDefault();
        $.ajax({url:"http://ico.58pic.com/ajax/fastControl",type:'post',dataType:'json',data:{test:1}})
            .success(function(data){
                if (data.info == 2) {
                    location.href= url;
//                    alert("低于！");

                } else if (data.info == 1){
//                    alert('高于！');
                    $(".recom_Application,#BJ").show();
                    $("#BJ").css({height:$(document).height()});
                    $(".recom_Application").css({left:($(window).width()-537)/2+"px",top:($(window).height()-370)/2+"px"});

                }
            })
            .fail(function(data){
                console.log(data);
            })
    })
}


function bindPNGButton(png_selector) {
	png_selector.mouseover(function() {
		$(this).siblings('a.more_link').css('color', '#8F8F8F').css('background', '#fff');
		$(this).parent().siblings('div.more_box').hide();
	})
}
function bindICOButton(ico_selector) {
	ico_selector.mouseover(function() {
		$(this).siblings('a.more_link').css('color', '#8F8F8F').css('background', '#fff');
		$(this).parent().siblings('div.more_box').hide();
	})
}
function bindRightButton(right_button_selector) {
	right_button_selector.mouseover(function() {
		$(this).parent().find('a.more_link').css('color', '#8F8F8F').css('background', '#fff');
		$(this).parent().find('div.more_box').hide();
	})
}
function bindMoreButton() {
	$("a.more_link").click(function(event) {
		var div = $(this).parent("label").parent("dt").find(".more_box")
		 event.preventDefault();
		if (div.is(':visible') == true) {
			$(this).css('color', '#8F8F8F').css('background', '#fff');
			div.hide()
		}
		 else {
			$('div.more_box').hide();
			$('a.more_link').css('color', '#8F8F8F').css('background', '#fff');
			$(this).css('color', '#fff').css('background', '#3b5998');
			div.show();
			bindPNGButton($(this).siblings('a.png_link'));
			bindICOButton($(this).siblings('a.ico_link'));
			bindRightButton($(this).parent().siblings('span'));
			bindMoreFormatButton(div.find('a.more_format'));
		}
	});
}
function bindMoreFormatButton(button_selector) {
	button_selector.click(function(event) {
		var icon_id = $(this).attr('rel')
		 var image_url = $('img#image_' + icon_id).attr('src')
		 var url = '/index.php/ajax/download?id=' + icon_id + '&format=' + $(this).html().toLowerCase()
		 event.preventDefault();
		 location.href = url;
	})
}
function bindInfoBox() {
	$('div.info_box').click(function(event) {
		var x = event.pageX - this.offsetLeft;
		var y = event.pageY - this.offsetTop;
		if (x < 20 | y < 20) {
			$(this).parent().find('a.info_link img').attr('src', '/public/images/info_g.png');
			$(this).remove();
		}
	})
}
function bindInfoButton() {
	$("a.info_link").click(function(event) {
		var baseid = $(this).attr('id').replace('info_', '')
		var width = $(this).attr('rel')
		var url = '/index.php/ajax/iconinfo/?id=' + baseid + '&width=' + width+ '&t=' + Math.random();
		var div = $(this).parent("span").parent("dt").find(".info_box")
		var dt = $(this).parent('span').parent('dt')
		event.preventDefault();
		$('div.info_box').remove();
		if (div.is(':visible') == true) {
			$(this).find('img').attr('src', '/public/images/info_g.png');
			div.hide()
		} else {
			$('a.info_link img').attr('src', '/public/images/info_g.png');
			$(this).find('img').attr('src', '/public/images/info.png');
			$.get(url, {},
			function(data) {
				if (data != '') {
					dt.append(data);
					info_box = dt.find('div.info_box')
					info_box.show();
					bindInfoBox();
				}
			});
		}
	});
}
function bindConvertButton() {
	$('a.convert, a.convert span, a.convert_btn').each(function(i) {
		var convert_dialog = $('div#convert_dialog')
		 $(this).colorbox({
			width: '378px',
			inline: true,
			href: '#convert_dialog',
			close: '',
			transition: 'elastic',
			opacity: 0.65,
			onOpen: function() {
				convert_dialog.find('div.dialog_button').html('<a href="#" id="convert_save" title=""><span>Save<\/span><\/a>');
				convert_dialog.find('input[name=icon]').attr('value', $(this).attr('id'));
				image_url = $(this).parent().parent().parent().find('dd img').attr('src');
				if (image_url == undefined)
				 image_url = $('div.detail_head img').attr('src');
				convert_dialog.find('input[name=png_file]').attr('value', image_url);
				convert_dialog.find('a#convert_save').click(function(event) {
					event.preventDefault();
					$(this).parent().html('<img src="/public/images/loading_yellow.gif" width="25" height="25"\/>Converting')
					 $.ajax({
						type: 'GET',
						url: '/ajax/convert',
						data: convert_dialog.find('form[name=convert_icon]').serialize(),
						dataType: 'json',
						success: function(json) {
							if (json['success'])
							 location.href = '/ajax/download?filename=' + json['data']
							 else
							 $.prompt(json['error']);
						}
					});
					$(this).colorbox.close();
				});
				convert_dialog.find('a.close_dialog').click(function() {
					$(this).colorbox.close()
				});
			}
		});
	});
}
function bindCloseMessageButton() {
	$("a.close").click(function() {
		$(this).parent().parent().fadeTo(400, 0,
		function() {
			$(this).slideUp(400);
		});
		return false;
	});
}

$(document).ready(function() {
	$('div.login_box input').keyup(function(e) {
		var code = (e.keyCode ? e.keyCode: e.which);
		if (code == 13) {
			$('form[name=signin]').submit();
		}
	})
	 $('input#keyword').autocomplete('/ajax/search/suggest', {
		width: 428,
		max: 10,
		autoFill: false,
		selectFirst: false,
		highlight: false,
		matchContains: true,
		scroll: true,
		scrollHeight: 385
	}).result(function(event, item) {
		var keyword = String(item).split("<span>", 1);
		location.href = '/search/' + keyword;
	});
	$('a.adbox').click(function() {
		var url = $(this).attr('href')
		 var from_url = window.location.href.replace("#", "")
		 var adbox = $(this).attr('rel')
		 $.get("/advertise/log?url=" + url + "&from_url=" + from_url + "&adbox=" + adbox);
	});
	$('div.toggle_top_box').click(function() {
		var id = $(this).attr('id');
		if (id == 'close_top_box') {
			$('div#top_box').css('margin-top', '-27px');
			$(this).attr('id', 'open_top_box');
		}
		 else if (id == 'open_top_box') {
			$('div#top_box').css('margin-top', '-0px');
			$(this).attr('id', 'close_top_box');
		}
	})
	 $('div.sidebar_arrow').click(function() {
		var id = $(this).attr('id');
		if (id == 'side_close') {
			$('div.sidebar').css('margin-left', '-200px');
			$(this).attr('id', 'side_open');
		}
		 else if (id == 'side_open') {
			$('div.sidebar').css('margin-left', '0px');
			$(this).attr('id', 'side_close');
		}
	});
	$('div.search_top_arrow').click(function() {
		var id = $(this).attr('id');
		if (id == 'search_top_close') {
			$('div.sidebar').css('height', '1px');
			$(this).attr('id', 'search_top_open');
		}
		 else if (id == 'search_top_open') {
			$('div.sidebar').css('height', '70px');
			$(this).attr('id', 'search_top_close');
		}
	});
	$('a.panel_location').click(function() {
		var id = $(this).attr('id');
		var width = $(window).width();
		if (id == 'float_to_top') {
			$.get('/ajax/session?panel=top&width=' + width);
		}
		 else if (id == 'float_to_left') {
			$.get('/ajax/session?panel=left&width=' + width);
		}
		setTimeout(function() {
			location.reload(true);
		},
		500);
	});
	$('div.refine_search div.page_bg dd').click(function() {
		var value = $.trim($(this).text());
		$(this).parent().find('dd').removeClass('active');
		$(this).addClass('active');
		if (value == 'white' | value == 'blue' | value == 'transparent' | value == 'black') {
			$('div.icon_list li').attr('class', value);
			$.get('/ajax/session?background_color=' + value)
		}
		 else {
			input = $('input[name=icons]').attr('value', value);
			UpdateSearch();
		}
	});
//    moses新增
    $('div.search_wrapper div.w1222 div.arrangement span').click(function() {
        $(this).siblings('input').attr('value',$(this).text());
//        $(this).siblings('ul').find('li').removeClass('active');
//        $(this).addClass('active');
//        $('select[name=order]:first-child').html('will');
        UpdateSearch();
    });
//

	$('div.search_info div.color_filter span').click(function() {
		$(this).siblings('input').attr('value', $(this).text());
		$(this).parent().find('span').removeClass('active');
		$(this).addClass('active');
		$(this).siblings('div').removeClass('active');
		UpdateSearch();
	});
	$('div.search_info div.color_filter div').click(function() {
		$(this).siblings('input').attr('value', 'all');
		$(this).find('span').removeClass('active');
		$(this).addClass('active');
//		$('select[name=order]:first-child').html('Relevancy');
		UpdateSearch();
	});
	$('select.better_combo').selectbox();
	bindDownloadButton();
	bindMoreButton();
	bindInfoButton();
	//bindConvertButton();
	$('input#tags').focus(function() {
		if ($(this).val() == 'tag1,tag2,tag3,...')
		 $(this).val('')
	}).blur(function() {
		if ($(this).val() == '')
		 $(this).val('tag1,tag2,tag3,...')
	})
	$('ul.other-size li').hover(function() {
		$(this).children('h1').show();
	},
	function() {
		$(this).children('h1').hide();
	});
	$('div.detail_head').hover(function() {
		$(this).children('h1').show();
	},
	function() {
		$(this).children('h1').hide();
	});

	 $('a#contact_button').click(function(event) {
		event.preventDefault();
		if ($('select[name=subject]').val() == 'none')
		 $.prompt(window.choose_subject_first)
		 else
		 $('form#contact').submit();
	})
	 $('a#reportbug_button').click(function(event) {
		event.preventDefault();
		$('form#reportbug').submit();
	})
	 $("div.faq .faq_title").toggle(function() {
		$(this).next("div").slideDown("fast");
		$(this).addClass("faq-open");
	},
	function() {
		$(this).next("div").slideUp("fast");
		$(this).removeClass("faq-open");
	}).hover(function() {
		$(this).addClass("active");
	},
	function() {
		$(this).removeClass("active");
	});
	$(document).click(function(event) {
		var target = $(event.target)
		 if (target.parents('a.info_link').length < 1 && target.parents('div.info_box').length < 1 && $('div.info_box:visible').length >= 1) {
			event.preventDefault();
			$('div.info_box').remove();
			$('a.info_link img').attr('src', '/public/images/info_g.png')
		}
		 else if (target.hasClass('more_link') == false && target.parents('div.more_box').length < 1 && $('div.more_box:visible').length >= 1) {
			event.preventDefault();
			$('div.more_box').hide();
			$('a.more_link').css('color', '#8F8F8F').css('background', '#fff');
		}
	});
	$('a#captcha_button').click(function(event) {
		event.preventDefault();
		$('form#captcha').submit();
	})
	bindCloseMessageButton();
});
function setTab(name, cursel, n) {
	for (i = 1; i <= n; i++) {
		var menu = document.getElementById(name + i);
		var con = document.getElementById("con_" + name + "_" + i);
		menu.className = i == cursel ? "active": "";
		con.style.display = i == cursel ? "block": "none";
	}
}
function SetHome(obj,vrl){
        try{
                obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
        }
        catch(e){
                if(window.netscape) {
                        try {
                                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                        }
                        catch (e) {
                                window.open("http://www.58pic.com/index.php?m=index&a=setHome");
                        }
                        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                        prefs.setCharPref('browser.startup.homepage',vrl);
                 }else{
                     window.open("http://www.58pic.com/index.php?m=index&a=setHome");
                 }              
        }
}

// 加入收藏 兼容360和IE6
function addFavorite(sTitle,sURL)
{       
       try
        {
            window.external.addFavorite(sURL, sTitle);
        }
        catch (e)
        {
            try
            {
                window.sidebar.addPanel(sTitle, sURL, "");
            }
            catch (e)
            {
                alert("加入收藏失败，请使用Ctrl+D进行添加");
            }
        }
}