/*
* Crafty v0.4.2
* http://craftyjs.com
*
* Copyright 2010, Louis Stowasser
* Dual licensed under the MIT or GPL licenses.
*/
(function(h, g) {
    var q = function(w) {
            return new q.fn.init(w)
        },
        v = 1,
        e = 50,
        n = 1,
        m = {},
        c = {},
        o = {},
        r = [],
        s,
        i,
        a,
        f = 0,
        k = 1000 / e,
        b = (new Date).getTime(),
        p = Array.prototype.slice,
        d = /\s*,\s*/,
        t = /\s+/;
    q.fn = q.prototype = {
        init: function(A) {
            if (typeof A === "string") {
                var y = 0,
                    E,
                    F,
                    D = false,
                    C = false,
                    G;
                if (A === "*") {
                    for (E in c) {
                        this[+E] = c[E];
                        y++
                    }
                    this.length = y;
                    return this
                }
                if (A.indexOf(",") !== -1) {
                    C = true;
                    G = d
                } else {
                    if (A.indexOf(" ") !== -1) {
                        D = true;
                        G = t
                    }
                }
                for (E in c) {
                    if (!c.hasOwnProperty(E)) {
                        continue
                    }
                    F = c[E];
                    if (D || C) {
                        var w = A.split(G),
                            B = 0,
                            z = w.length,
                            x = 0;
                        for (; B < z; B++) {
                            if (F.__c[w[B]]) {
                                x++
                            }
                        }
                        if (D && x === z || C && x > 0) {
                            this[y++] = +E
                        }
                    } else {
                        if (F.__c[A]) {
                            this[y++] = +E
                        }
                    }
                }
                if (y > 0 && !D && !C) {
                    this.extend(m[A])
                }
                if (w && D) {
                    for (B = 0; B < z; B++) {
                        this.extend(m[w[B]])
                    }
                }
                this.length = y
            } else {
                if (!A) {
                    A = 0;
                    if (!(A in c)) {
                        c[A] = this
                    }
                }
                if (!(A in c)) {
                    this.length = 0;
                    return this
                }
                this[0] = A;
                this.length = 1;
                if (!this.__c) {
                    this.__c = {}
                }
                if (!c[A]) {
                    c[A] = this
                }
                return c[A]
            }
            return this
        },
        addComponent: function(C) {
            var z = [],
                B = 0,
                y;
            if (arguments.length > 1) {
                var x = 0,
                    w = arguments.length;
                for (; x < w; x++) {
                    this.__c[arguments[x]] = true;
                    z.push(arguments[x])
                }
            } else {
                if (C.indexOf(",") !== -1) {
                    var A = C.split(d),
                        x = 0,
                        w = A.length;
                    for (; x < w; x++) {
                        this.__c[A[x]] = true;
                        z.push(A[x])
                    }
                } else {
                    this.__c[C] = true;
                    z.push(C)
                }
            }
            y = z.length;
            for (; B < y; B++) {
                comp = m[z[B]];
                if (typeof comp == "undefined") {
                    comp = m[z[B].substr(0, 1).toUpperCase() + z[B].substr(1)]
                }
                this.extend(comp);
                if (comp && "init" in comp) {
                    comp.init.call(this)
                }
            }
            this.trigger("component");
            return this
        },
        requires: function(z) {
            var A = z.split(d),
                y = 0,
                w = A.length,
                x;
            for (; y < w; ++y) {
                x = A[y];
                if (!this.has(x)) {
                    this.addComponent(x)
                }
            }
            return this
        },
        removeComponent: function(w) {
            delete this.__c[w];
            return this
        },
        has: function(w) {
            return !!this.__c[w]
        },
        attr: function(w, x) {
            if (arguments.length === 1) {
                if (typeof w === "string") {
                    return this[w]
                }
                this.extend(w);
                this.trigger("change");
                return this
            }
            this[w] = x;
            this.trigger("change");
            return this
        },
        toArray: function() {
            return p.call(this, 0)
        },
        delay: function(w, x) {
            this.each(function() {
                var y = this;
                setTimeout(function() {
                    w.call(y)
                }, x)
            });
            return this
        },
        bind: function(y, x) {
            if (this.length === 1) {
                if (!o[y]) {
                    o[y] = {}
                }
                var w = o[y];
                if (!w[this[0]]) {
                    w[this[0]] = []
                }
                w[this[0]].push(x);
                return this
            }
            this.each(function() {
                if (!o[y]) {
                    o[y] = {}
                }
                var z = o[y];
                if (!z[this[0]]) {
                    z[this[0]] = []
                }
                z[this[0]].push(x)
            });
            return this
        },
        unbind: function(x, w) {
            this.each(function() {
                var A = o[x],
                    z = 0,
                    y,
                    B;
                if (A && A[this[0]]) {
                    y = A[this[0]].length
                } else {
                    return this
                }
                if (y === 1 || !w) {
                    delete A[this[0]];
                    return this
                }
                for (; z < y; z++) {
                    B = A[this[0]];
                    if (B[z] == w) {
                        B.splice(z, 1);
                        z--
                    }
                }
            });
            return this
        },
        trigger: function(z, A) {
            if (this.length === 1) {
                if (o[z] && o[z][this[0]]) {
                    var y = o[z][this[0]],
                        x = 0,
                        w = y.length;
                    for (; x < w; x++) {
                        y[x].call(this, A)
                    }
                }
                return this
            }
            this.each(function() {
                if (o[z] && o[z][this[0]]) {
                    var D = o[z][this[0]],
                        C = 0,
                        B = D.length;
                    for (; C < B; C++) {
                        D[C].call(this, A)
                    }
                }
            });
            return this
        },
        each: function(y) {
            var x = 0,
                w = this.length;
            for (; x < w; x++) {
                if (!c[this[x]]) {
                    continue
                }
                y.call(c[this[x]], x)
            }
            return this
        },
        clone: function() {
            var z = this.__c,
                w,
                y,
                x = q.e();
            for (w in z) {
                x.addComponent(w)
            }
            for (y in this) {
                x[y] = this[y]
            }
            return x
        },
        setter: function(x, w) {
            if (q.support.setter) {
                this.__defineSetter__(property, w)
            } else {
                if (q.support.defineProperty) {
                    Object.defineProperty(this, property, {
                        set: w,
                        configurable: true
                    })
                } else {
                    a.push({
                        prop: x,
                        obj: this,
                        fn: w
                    })
                }
            }
        },
        destroy: function() {
            this.each(function() {
                this.trigger("remove");
                for (var w in o) {
                    this.unbind(w)
                }
                delete c[this[0]]
            })
        }
    };
    q.fn.init.prototype = q.fn;
    q.extend = q.fn.extend = function(x) {
        var w = this;
        if (!x) {
            return w
        }
        for (key in x) {
            if (w === x[key]) {
                continue
            }
            w[key] = x[key]
        }
        return w
    };
    q.extend({
        init: function(z, x, y) {
            if (arguments.length === 2) {
                y = x;
                x = z;
                z = 60
            }
            e = z || 60;
            q.viewport.init(x, y);
            this.trigger("Load");
            this.timer.init();
            return this
        },
        stop: function() {
            this.timer.stop();
            q.stage.elem.parentNode.removeChild(q.stage.elem);
            return this
        },
        pause: function() {
            if (!this._paused) {
                this.trigger("Pause");
                this._paused = true;
                q.timer.stop();
                q.keydown = {}
            } else {
                this.trigger("Unpause");
                this._paused = false;
                q.timer.init()
            }
            return this
        },
        timer: {
            prev: (+new Date),
            current: (+new Date),
            fps: 0,
            init: function() {
                var w = h.requestAnimationFrame || h.webkitRequestAnimationFrame || h.mozRequestAnimationFrame || h.oRequestAnimationFrame || h.msRequestAnimationFrame || null;
                if (w) {
                    function x() {
                        q.timer.step();
                        i = w(x)
                    }
                    x()
                } else {
                    x = setInterval(q.timer.step, 1000 / e)
                }
            },
            stop: function() {
                if (typeof s === "number") {
                    clearInterval(s)
                }
                var w = h.cancelRequestAnimationFrame || h.webkitCancelRequestAnimationFrame || h.mozCancelRequestAnimationFrame || h.oCancelRequestAnimationFrame || h.msCancelRequestAnimationFrame || null;
                if (w) {
                    w(i)
                }
                s = null
            },
            step: function() {
                f = 0;
                while ((new Date).getTime() > b) {
                    q.trigger("enterframe", {
                        frame: n++
                    });
                    b += k;
                    f++
                }
                if (f) {
                    q.DrawManager.draw()
                }
            },
            getFPS: function() {
                return this.fps
            }
        },
        e: function() {
            var x = j(),
                w;
            c[x] = null;
            c[x] = w = q(x);
            if (arguments.length > 0) {
                w.addComponent.apply(w, arguments)
            }
            w.addComponent("obj");
            return w
        },
        c: function(x, w) {
            m[x] = w
        },
        trigger: function(A, B) {
            var z = o[A],
                y,
                x,
                w;
            for (y in z) {
                if (!z.hasOwnProperty(y)) {
                    continue
                }
                for (x = 0, w = z[y].length; x < w; x++) {
                    if (z[y] && z[y][x]) {
                        if (c[y]) {
                            z[y][x].call(q(+y), B)
                        } else {
                            z[y][x].call(q, B)
                        }
                    }
                }
            }
        },
        bind: function(x, y) {
            if (!o[x]) {
                o[x] = {}
            }
            var w = o[x];
            if (!w.global) {
                w.global = []
            }
            return w.global.push(y) - 1
        },
        unbind: function(A, B) {
            var z = o[A],
                y,
                x,
                w;
            for (y in z) {
                if (!z.hasOwnProperty(y)) {
                    continue
                }
                if (typeof B === "number") {
                    delete z[y][B];
                    return true
                }
                for (x = 0, w = z[y].length; x < w; x++) {
                    if (z[y][x] === B) {
                        delete z[y][x];
                        return true
                    }
                }
            }
            return false
        },
        frame: function() {
            return n
        },
        components: function() {
            return m
        },
        settings: (function() {
            var w = {},
                x = {};
            return {
                register: function(y, z) {
                    x[y] = z
                },
                modify: function(y, z) {
                    x[y].call(w[y], z);
                    w[y] = z
                },
                get: function(y) {
                    return w[y]
                }
            }
        })(),
        clone: u
    });
    function j() {
        var w = v++;
        if (w in c) {
            return j()
        }
        return w
    }
    function u(y) {
        if (y == null || typeof (y) != "object") {
            return y
        }
        var w = y.constructor();
        for (var x in y) {
            w[x] = u(y[x])
        }
        return w
    }
    q.bind("Load", function() {
        if (!q.support.setter && q.support.defineProperty) {
            a = [];
            q.bind("enterframe", function() {
                var x = 0,
                    w = a.length,
                    y;
                for (; x < w; ++x) {
                    y = a[x];
                    if (y.obj[y.prop] !== y.obj["_" + y.prop]) {
                        y.fn.call(y.obj, y.obj[y.prop])
                    }
                }
            })
        }
    });
    h.Crafty = q
})(window);
(function(h, d, g) {
    (function(n) {
        var m,
            p = function(q) {
                m = q || 64;
                this.map = {}
            },
            o = " ";
        p.prototype = {
            insert: function(v) {
                var t = p.key(v),
                    s = new e(t, v, this),
                    r = 0,
                    q,
                    u;
                for (r = t.x1; r <= t.x2; r++) {
                    for (q = t.y1; q <= t.y2; q++) {
                        u = r + o + q;
                        if (!this.map[u]) {
                            this.map[u] = []
                        }
                        this.map[u].push(v)
                    }
                }
                return s
            },
            search: function(y, r) {
                var z = p.key(y),
                    x,
                    t,
                    v,
                    w,
                    q,
                    u = [],
                    s = [],
                    A = {};
                if (r === undefined) {
                    r = true
                }
                for (x = z.x1; x <= z.x2; x++) {
                    for (t = z.y1; t <= z.y2; t++) {
                        v = x + o + t;
                        if (this.map[v]) {
                            u = u.concat(this.map[v])
                        }
                    }
                }
                if (r) {
                    for (x = 0, l = u.length; x < l; x++) {
                        w = u[x];
                        if (!w) {
                            continue
                        }
                        q = w[0];
                        if (!A[q] && w.x < y._x + y._w && w._x + w._w > y._x && w.y < y._y + y._h && w._h + w._y > y._y) {
                            A[q] = u[x]
                        }
                    }
                    for (w in A) {
                        s.push(A[w])
                    }
                    return s
                } else {
                    return u
                }
            },
            remove: function(u, w) {
                var t = 0,
                    s,
                    v;
                if (arguments.length == 1) {
                    w = u;
                    u = p.key(w)
                }
                for (t = u.x1; t <= u.x2; t++) {
                    for (s = u.y1; s <= u.y2; s++) {
                        v = t + o + s;
                        if (this.map[v]) {
                            var r = this.map[v],
                                q = 0,
                                x = r.length;
                            for (; q < x; q++) {
                                if (r[q] && r[q][0] === w[0]) {
                                    r.splice(q, 1)
                                }
                            }
                        }
                    }
                }
            }
        };
        p.key = function(u) {
            var r = ~~(u._x / m),
                t = ~~(u._y / m),
                q = ~~((u._w + u._x) / m),
                s = ~~((u._h + u._y) / m);
            return {
                x1: r,
                y1: t,
                x2: q,
                y2: s
            }
        };
        p.hash = function(q) {
            return q.x1 + o + q.y1 + o + q.x2 + o + q.y2
        };
        function e(q, s, r) {
            this.keys = q;
            this.map = r;
            this.obj = s
        }
        e.prototype = {
            update: function(q) {
                if (p.hash(p.key(q)) != p.hash(this.keys)) {
                    this.map.remove(this.keys, this.obj);
                    var r = this.map.insert(this.obj);
                    this.keys = r.keys
                }
            }
        };
        n.HashMap = p
    })(h);
    h.map = new h.HashMap();
    var f = Math,
        j = f.cos,
        a = f.sin,
        k = f.PI,
        i = k / 180;
    h.c("2D", {
        _x: 0,
        _y: 0,
        _w: 0,
        _h: 0,
        _z: 0,
        _rotation: 0,
        _alpha: 1,
        _visible: true,
        _global: null,
        _origin: null,
        _mbr: null,
        _entry: null,
        _attachy: [],
        _changed: false,
        init: function() {
            this._global = this[0];
            this._origin = {
                x: 0,
                y: 0
            };
            if (h.support.setter) {
                this.__defineSetter__("x", function(e) {
                    this._attr("_x", e)
                });
                this.__defineSetter__("y", function(e) {
                    this._attr("_y", e)
                });
                this.__defineSetter__("w", function(e) {
                    this._attr("_w", e)
                });
                this.__defineSetter__("h", function(e) {
                    this._attr("_h", e)
                });
                this.__defineSetter__("z", function(e) {
                    this._attr("_z", e)
                });
                this.__defineSetter__("rotation", function(e) {
                    this._attr("_rotation", e)
                });
                this.__defineSetter__("alpha", function(e) {
                    this._attr("_alpha", e)
                });
                this.__defineSetter__("visible", function(e) {
                    this._attr("_visible", e)
                });
                this.__defineGetter__("x", function() {
                    return this._x
                });
                this.__defineGetter__("y", function() {
                    return this._y
                });
                this.__defineGetter__("w", function() {
                    return this._w
                });
                this.__defineGetter__("h", function() {
                    return this._h
                });
                this.__defineGetter__("z", function() {
                    return this._z
                });
                this.__defineGetter__("rotation", function() {
                    return this._rotation
                });
                this.__defineGetter__("alpha", function() {
                    return this._alpha
                });
                this.__defineGetter__("visible", function() {
                    return this._visible
                })
            } else {
                if (h.support.defineProperty) {
                    Object.defineProperty(this, "x", {
                        set: function(e) {
                            this._attr("_x", e)
                        },
                        get: function() {
                            return this._x
                        }
                    });
                    Object.defineProperty(this, "y", {
                        set: function(e) {
                            this._attr("_y", e)
                        },
                        get: function() {
                            return this._y
                        }
                    });
                    Object.defineProperty(this, "w", {
                        set: function(e) {
                            this._attr("_w", e)
                        },
                        get: function() {
                            return this._w
                        }
                    });
                    Object.defineProperty(this, "h", {
                        set: function(e) {
                            this._attr("_h", e)
                        },
                        get: function() {
                            return this._h
                        }
                    });
                    Object.defineProperty(this, "z", {
                        set: function(e) {
                            this._attr("_z", e)
                        },
                        get: function() {
                            return this._z
                        }
                    });
                    Object.defineProperty(this, "rotation", {
                        set: function(e) {
                            this._attr("_rotation", e)
                        },
                        get: function() {
                            return this._rotation
                        }
                    });
                    Object.defineProperty(this, "alpha", {
                        set: function(e) {
                            this._attr("_alpha", e)
                        },
                        get: function() {
                            return this._alpha
                        }
                    });
                    Object.defineProperty(this, "visible", {
                        set: function(e) {
                            this._attr("_visible", e)
                        },
                        get: function() {
                            return this._visible
                        }
                    })
                } else {
                    this.x = this._x;
                    this.y = this._y;
                    this.w = this._w;
                    this.h = this._h;
                    this.z = this._z;
                    this.rotation = this._rotation;
                    this.alpha = this._alpha;
                    this.visible = this._visible;
                    this.bind("enterframe", function() {
                        if (this.x !== this._x || this.y !== this._y || this.w !== this._w || this.h !== this._h || this.z !== this._z || this.rotation !== this._rotation || this.alpha !== this._alpha || this.visible !== this._visible) {
                            var e = this.mbr() || this.pos();
                            if (this.rotation !== this._rotation) {
                                this._rotate(this.rotation)
                            } else {
                                var n = this._mbr,
                                    m = false;
                                if (n) {
                                    if (this.x !== this._x) {
                                        n._x -= this.x - this._x;
                                        m = true
                                    } else {
                                        if (this.y !== this._y) {
                                            n._y -= this.y - this._y;
                                            m = true
                                        } else {
                                            if (this.w !== this._w) {
                                                n._w -= this.w - this._w;
                                                m = true
                                            } else {
                                                if (this.h !== this._h) {
                                                    n._h -= this.h - this._h;
                                                    m = true
                                                } else {
                                                    if (this.z !== this._z) {
                                                        n._z -= this.z - this._z;
                                                        m = true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if (m) {
                                    this.trigger("move", e)
                                }
                            }
                            this._x = this.x;
                            this._y = this.y;
                            this._w = this.w;
                            this._h = this.h;
                            this._z = this.z;
                            this._rotation = this.rotation;
                            this._alpha = this.alpha;
                            this._visible = this.visible;
                            this.trigger("change", e)
                        }
                    })
                }
            }
            this._entry = h.map.insert(this);
            this.bind("move", function() {
                var e = this._mbr || this;
                this._entry.update(e)
            });
            this.bind("rotate", function(n) {
                var m = this._mbr || this;
                this._entry.update(m)
            });
            this.bind("remove", function() {
                h.map.remove(this);
                this.detach()
            })
        },
        _rotate: function(x) {
            var w = -1 * (x % 360),
                G = w * i,
                u = Math.cos(G),
                z = Math.sin(G),
                y = {
                    x: this._origin.x + this._x,
                    y: this._origin.y + this._y
                };
            if (!w) {
                this._mbr = null;
                if (!this._rotation % 360) {
                    return
                }
            }
            var D = y.x + (this._x - y.x) * u + (this._y - y.y) * z,
                q = y.y - (this._x - y.x) * z + (this._y - y.y) * u,
                C = y.x + (this._x + this._w - y.x) * u + (this._y - y.y) * z,
                n = y.y - (this._x + this._w - y.x) * z + (this._y - y.y) * u,
                B = y.x + (this._x + this._w - y.x) * u + (this._y + this._h - y.y) * z,
                m = y.y - (this._x + this._w - y.x) * z + (this._y + this._h - y.y) * u,
                A = y.x + (this._x - y.x) * u + (this._y + this._h - y.y) * z,
                e = y.y - (this._x - y.x) * z + (this._y + this._h - y.y) * u,
                t = Math.floor(Math.min(D, C, B, A)),
                r = Math.floor(Math.min(q, n, m, e)),
                s = Math.ceil(Math.max(D, C, B, A)),
                p = Math.ceil(Math.max(q, n, m, e));
            this._mbr = {
                _x: t,
                _y: r,
                _w: s - t,
                _h: p - r
            };
            var F = this._rotation - x,
                E = F * i;
            this.trigger("rotate", {
                cos: Math.cos(E),
                sin: Math.sin(E),
                deg: F,
                rad: E,
                o: {
                    x: y.x,
                    y: y.y
                },
                matrix: {
                    M11: u,
                    M12: z,
                    M21: -z,
                    M22: u
                }
            })
        },
        area: function() {
            return this._w * this._h
        },
        intersect: function(e, q, m, n) {
            var o,
                p = this._mbr || this;
            if (typeof e === "object") {
                o = e
            } else {
                o = {
                    x: e,
                    y: q,
                    w: m,
                    h: n
                }
            }
            return p._x < o.x + o.w && p._x + p._w > o.x && p._y < o.y + o.h && p._h + p._y > o.y
        },
        within: function(e, p, m, n) {
            var o;
            if (typeof e === "object") {
                o = e
            } else {
                o = {
                    x: e,
                    y: p,
                    w: m,
                    h: n
                }
            }
            return o.x <= this.x && o.x + o.w >= this.x + this.w && o.y <= this.y && o.y + o.h >= this.y + this.h
        },
        contains: function(e, p, m, n) {
            var o;
            if (typeof e === "object") {
                o = e
            } else {
                o = {
                    x: e,
                    y: p,
                    w: m,
                    h: n
                }
            }
            return o.x >= this.x && o.x + o.w <= this.x + this.w && o.y >= this.y && o.y + o.h <= this.y + this.h
        },
        pos: function() {
            return {
                _x: (this._x),
                _y: (this._y),
                _w: (this._w),
                _h: (this._h)
            }
        },
        mbr: function() {
            if (!this._mbr) {
                return this.pos()
            }
            return {
                _x: (this._mbr._x),
                _y: (this._mbr._y),
                _w: (this._mbr._w),
                _h: (this._mbr._h)
            }
        },
        isAt: function(e, m) {
            return this.x <= e && this.x + this.w >= e && this.y <= m && this.y + this.h >= m
        },
        move: function(e, m) {
            if (e.charAt(0) === "n") {
                this.y -= m
            }
            if (e.charAt(0) === "s") {
                this.y += m
            }
            if (e === "e" || e.charAt(1) === "e") {
                this.x += m
            }
            if (e === "w" || e.charAt(1) === "w") {
                this.x -= m
            }
            return this
        },
        shift: function(e, o, m, n) {
            if (e) {
                this.x += e
            }
            if (o) {
                this.y += o
            }
            if (m) {
                this.w += m
            }
            if (n) {
                this.h += n
            }
            return this
        },
        attach: function(e) {
            function m(o) {
                if (!o) {
                    return
                }
                if (o.cos) {
                    if ("rotate" in e) {
                        e.rotate(o)
                    }
                } else {
                    var n = this._mbr || this;
                    dx = n._x - o._x, dy = n._y - o._y, dw = n._w - o._w, dh = n._h - o._h;
                    e.shift(dx, dy, dw, dh)
                }
            }
            this.bind("move", m);
            this.bind("rotate", m);
            this._attachy[e[0]] = m;
            return this
        },
        detach: function(o) {
            if (!o) {
                var m,
                    e = this._attachy;
                for (m in e) {
                    if (!e.hasOwnProperty(m)) {
                        continue
                    }
                    this.unbind("move", e[m]);
                    this._attachy[m] = null;
                    delete this._attachy[m]
                }
                return this
            }
            var n = this._attachy[o[0]];
            this.unbind("move", n);
            this._attachy[o[0]] = null;
            delete this._attachy[o[0]];
            return this
        },
        origin: function(e, n) {
            if (typeof e === "string") {
                if (e === "centre" || e === "center" || e.indexOf(" ") === -1) {
                    e = this._w / 2;
                    n = this._h / 2
                } else {
                    var m = e.split(" ");
                    if (m[0] === "top") {
                        n = 0
                    } else {
                        if (m[0] === "bottom") {
                            n = this._h
                        } else {
                            if (m[0] === "middle" || m[1] === "center" || m[1] === "centre") {
                                n = this._h / 2
                            }
                        }
                    }
                    if (m[1] === "center" || m[1] === "centre" || m[1] === "middle") {
                        e = this._w / 2
                    } else {
                        if (m[1] === "left") {
                            e = 0
                        } else {
                            if (m[1] === "right") {
                                e = this._w
                            }
                        }
                    }
                }
            } else {
                if (e > this._w || n > this._h || e < 0 || n < 0) {
                    return this
                }
            }
            this._origin.x = e;
            this._origin.y = n;
            return this
        },
        rotate: function(m) {
            this._origin.x = m.o.x - this._x;
            this._origin.y = m.o.y - this._y;
            this._attr("_rotation", m.theta)
        },
        _attr: function(m, n) {
            var p = this.pos(),
                e = this.mbr() || p;
            if (m === "_rotation") {
                this._rotate(n)
            } else {
                if (m === "_z") {
                    this._global = parseInt(n + h.zeroFill(this[0], 5), 10);
                    this.trigger("reorder")
                } else {
                    if (m == "_x" || m === "_y" || m === "_w" || m === "_h") {
                        var o = this._mbr;
                        if (o) {
                            o[m] -= this[m] - n
                        }
                        this[m] = n;
                        this.trigger("move", e)
                    }
                }
            }
            this[m] = n;
            this.trigger("change", e)
        }
    });
    h.c("Gravity", {
        _gravity: 0.2,
        _gy: 0,
        _falling: true,
        _anti: null,
        init: function() {
            if (!this.has("2D")) {
                this.addComponent("2D")
            }
        },
        gravity: function(e) {
            if (e) {
                this._anti = e
            }
            this.bind("enterframe", this._enterframe);
            return this
        },
        _enterframe: function() {
            if (this._falling) {
                this._gy += this._gravity * 2;
                this.y += this._gy
            } else {
                this._gy = 0
            }
            var p,
                o = false,
                r = this.pos(),
                n,
                m = 0,
                e;
            r._y++;
            r.x = r._x;
            r.y = r._y;
            r.w = r._w;
            r.h = r._h;
            n = h.map.search(r);
            e = n.length;
            for (; m < e; ++m) {
                p = n[m];
                if (p !== this && p.has(this._anti) && p.intersect(r)) {
                    o = p;
                    break
                }
            }
            if (o) {
                if (this._falling) {
                    this.stopFalling(o)
                }
            } else {
                this._falling = true
            }
        },
        stopFalling: function(m) {
            if (m) {
                this.y = m._y - this._h
            }
            this._falling = false;
            if (this._up) {
                this._up = false
            }
            this.trigger("hit")
        },
        antigravity: function() {
            this.unbind("enterframe", this._enterframe)
        }
    });
    h.polygon = function(e) {
        if (arguments.length > 1) {
            e = Array.prototype.slice.call(arguments, 0)
        }
        this.points = e
    };
    h.polygon.prototype = {
        containsPoint: function(e, r) {
            var o = this.points,
                n,
                m,
                q = false;
            for (n = 0, m = o.length - 1; n < o.length; m = n++) {
                if (((o[n][1] > r) != (o[m][1] > r)) && (e < (o[m][0] - o[n][0]) * (r - o[n][1]) / (o[m][1] - o[n][1]) + o[n][0])) {
                    q = !q
                }
            }
            return q
        },
        shift: function(e, p) {
            var n = 0,
                m = this.points.length,
                o;
            for (; n < m; n++) {
                o = this.points[n];
                o[0] += e;
                o[1] += p
            }
        },
        rotate: function(q) {
            var o = 0,
                n = this.points.length,
                p,
                m,
                r;
            for (; o < n; o++) {
                p = this.points[o];
                m = q.o.x + (p[0] - q.o.x) * q.cos + (p[1] - q.o.y) * q.sin;
                r = q.o.y - (p[0] - q.o.x) * q.sin + (p[1] - q.o.y) * q.cos;
                p[0] = Math.floor(m);
                p[1] = Math.floor(r)
            }
        },
        draw: function(q) {
            var o = 0,
                n = this.points.length,
                p,
                m,
                r;
            for (; o < n; o++) {
                p = this.points[o];
                h.e("2D, DOM, color").attr({
                    x: p[0],
                    y: p[1],
                    w: 5,
                    h: 5
                }).color("red")
            }
        }
    };
    h.c("Collision", {
        init: function() {
            this.requires("2D")
        },
        collision: function(m) {
            var e = this._mbr || this;
            if (!m) {
                m = new h.polygon([0, 0], [e._w, 0], [e._w, e._h], [0, e._h])
            }
            this.map = m;
            this.attach(this.map);
            this.map.shift(e._x, e._y);
            return this
        },
        hit: function(t) {
            var m = this._mbr || this,
                q = h.map.search(m, false),
                r = 0,
                o = q.length,
                x = {},
                e,
                p,
                s,
                w,
                u = ("map" in this && "containsPoint" in this.map),
                n = [];
            if (!o) {
                return false
            }
            for (; r < o; ++r) {
                p = q[r];
                s = p._mbr || p;
                if (!p) {
                    continue
                }
                e = p[0];
                if (!x[e] && this[0] !== e && p.__c[t] && s._x < m._x + m._w && s._x + s._w > m._x && s._y < m._y + m._h && s._h + s._y > m._y) {
                    x[e] = p
                }
            }
            for (w in x) {
                p = x[w];
                if (u && "map" in p) {
                    var v = this._SAT(this.map, p.map);
                    v.obj = p;
                    v.type = "SAT";
                    if (v) {
                        n.push(v)
                    }
                } else {
                    n.push({
                        obj: p,
                        type: "MBR"
                    })
                }
            }
            if (!n.length) {
                return false
            }
            return n
        },
        onHit: function(n, o, e) {
            var m = false;
            this.bind("enterframe", function() {
                var p = this.hit(n);
                if (p) {
                    m = true;
                    o.call(this, p)
                } else {
                    if (m) {
                        if (typeof e == "function") {
                            e.call(this)
                        }
                        m = false
                    }
                }
            });
            return this
        },
        _SAT: function(p, o) {
            var B = p.points,
                A = o.points,
                y = 0,
                u = B.length,
                x,
                w = A.length,
                D = {
                    x: 0,
                    y: 0
                },
                e,
                v,
                s,
                t,
                r,
                C,
                m = null,
                q,
                z,
                n;
            for (; y < u; y++) {
                z = B[(y == u - 1 ? 0 : y + 1)];
                n = B[y];
                D.x = -(z[1] - n[1]);
                D.y = (z[0] - n[0]);
                e = Math.sqrt(D.x * D.x + D.y * D.y);
                D.x /= e;
                D.y /= e;
                v = s = -1;
                t = r = -1;
                for (x = 0; x < u; ++x) {
                    q = B[x][0] * D.x + B[x][1] * D.y;
                    if (q > t || t === -1) {
                        t = q
                    }
                    if (q < v || v === -1) {
                        v = q
                    }
                }
                for (x = 0; x < w; ++x) {
                    q = A[x][0] * D.x + A[x][1] * D.y;
                    if (q > r || r === -1) {
                        r = q
                    }
                    if (q < s || s === -1) {
                        s = q
                    }
                }
                C = (v < s) ? s - t : v - r;
                if (C > 0) {
                    return false
                }
                if (C > m || m === null) {
                    m = C
                }
            }
            for (y = 0; y < w; y++) {
                z = A[(y == w - 1 ? 0 : y + 1)];
                n = A[y];
                D.x = -(z[1] - n[1]);
                D.y = (z[0] - n[0]);
                e = Math.sqrt(D.x * D.x + D.y * D.y);
                D.x /= e;
                D.y /= e;
                v = s = -1;
                t = r = -1;
                for (x = 0; x < u; ++x) {
                    q = B[x][0] * D.x + B[x][1] * D.y;
                    if (q > t || t === -1) {
                        t = q
                    }
                    if (q < v || v === -1) {
                        v = q
                    }
                }
                for (x = 0; x < w; ++x) {
                    q = A[x][0] * D.x + A[x][1] * D.y;
                    if (q > r || r === -1) {
                        r = q
                    }
                    if (q < s || s === -1) {
                        s = q
                    }
                }
                C = (v < s) ? s - t : v - r;
                if (C > 0) {
                    return false
                }
                if (C > m || m === null) {
                    m = C
                }
            }
            return {
                overlap: m
            }
        }
    });
    h.c("DOM", {
        _element: null,
        init: function() {
            this._element = g.createElement("div");
            h.stage.inner.appendChild(this._element);
            this._element.style.position = "absolute";
            this._element.id = "ent" + this[0];
            this.bind("change", function() {
                if (!this._changed) {
                    this._changed = true;
                    h.DrawManager.add(this)
                }
            });
            if (h.support.prefix === "ms" && h.support.version < 9) {
                this._filters = {};
                this.bind("rotate", function(t) {
                    var n = t.matrix,
                        s = this._element.style,
                        p = n.M11.toFixed(8),
                        o = n.M12.toFixed(8),
                        r = n.M21.toFixed(8),
                        q = n.M22.toFixed(8);
                    this._filters.rotation = "progid:DXImageTransform.Microsoft.Matrix(M11=" + p + ", M12=" + o + ", M21=" + r + ", M22=" + q + ", sizingMethod='auto expand')"
                })
            }
            this.bind("remove", this.undraw)
        },
        DOM: function(e) {
            if (e && e.nodeType) {
                this.undraw();
                this._element = e;
                this._element.style.position = "absolute"
            }
            return this
        },
        draw: function() {
            var m = this._element.style,
                q = this.__coord || [0, 0, 0, 0],
                p = {
                    x: q[0],
                    y: q[1]
                },
                o = h.support.prefix;
            m.top = ~~(this._y) + "px";
            m.left = ~~(this._x) + "px";
            m.width = ~~(this._w) + "px";
            m.height = ~~(this._h) + "px";
            m.zIndex = this._z;
            m.opacity = this._alpha;
            m[o + "Opacity"] = this._alpha;
            if (h.support.prefix === "ms" && h.support.version < 9) {
                if (h.support.version === 8) {
                    this._filters.alpha = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + (this._alpha * 100) + ")"
                } else {
                    this._filters.alpha = "alpha(opacity=" + (this._alpha * 100) + ")"
                }
                this.applyFilters()
            }
            if (this._mbr) {
                var n = "rotate(" + this._rotation + "deg)",
                    e = this._origin.x + "px " + this._origin.y + "px";
                m.transformOrigin = e;
                m[o + "TransformOrigin"] = e;
                m.transform = n;
                m[o + "Transform"] = n
            }
            this.trigger("draw", {
                style: m,
                type: "DOM",
                co: p
            });
            return this
        },
        applyFilters: function() {
            this._element.style.filter = "";
            for (var e in this._filters) {
                if (!this._filters.hasOwnProperty(e)) {
                    continue
                }
                this._element.style.filter += this._filters[e] + " "
            }
        },
        undraw: function() {
            h.stage.inner.removeChild(this._element);
            return this
        },
        css: function(p, o) {
            var e,
                n = this._element,
                q,
                m = n.style;
            if (typeof p === "object") {
                for (e in p) {
                    if (!p.hasOwnProperty(e)) {
                        continue
                    }
                    q = p[e];
                    if (typeof q === "number") {
                        q += "px"
                    }
                    m[h.DOM.camelize(e)] = q
                }
            } else {
                if (o) {
                    if (typeof o === "number") {
                        o += "px"
                    }
                    m[h.DOM.camelize(p)] = o
                } else {
                    return h.DOM.getStyle(n, p)
                }
            }
            this.trigger("change");
            return this
        }
    });
    try {
        g.execCommand("BackgroundImageCache", false, true)
    } catch (c) {}
    h.extend({
        DOM: {
            window: {
                init: function() {
                    this.width = d.innerWidth || (d.document.documentElement.clientWidth || d.document.body.clientWidth);
                    this.height = d.innerHeight || (d.document.documentElement.clientHeight || d.document.body.clientHeight)
                },
                width: 0,
                height: 0
            },
            inner: function(p) {
                var o = p.getBoundingClientRect(),
                    e = o.left,
                    q = o.top,
                    n,
                    m;
                n = parseInt(this.getStyle(p, "border-left-width") || 0, 10);
                m = parseInt(this.getStyle(p, "border-top-width") || 0, 10);
                if (!n || !m) {
                    n = parseInt(this.getStyle(p, "borderLeftWidth") || 0, 10);
                    m = parseInt(this.getStyle(p, "borderTopWidth") || 0, 10)
                }
                e += n;
                q += m;
                return {
                    x: e,
                    y: q
                }
            },
            getStyle: function(m, n) {
                var e;
                if (m.currentStyle) {
                    e = m.currentStyle[this.camelize(n)]
                } else {
                    if (d.getComputedStyle) {
                        e = g.defaultView.getComputedStyle(m, null).getPropertyValue(this.csselize(n))
                    }
                }
                return e
            },
            camelize: function(e) {
                return e.replace(/-+(.)?/g, function(m, n) {
                    return n ? n.toUpperCase() : ""
                })
            },
            csselize: function(e) {
                return e.replace(/[A-Z]/g, function(m) {
                    return m ? "-" + m.toLowerCase() : ""
                })
            },
            translate: function(e, m) {
                return {
                    x: e - h.stage.x + g.body.scrollLeft + g.documentElement.scrollLeft - h.viewport._x,
                    y: m - h.stage.y + g.body.scrollTop + g.documentElement.scrollTop - h.viewport._y
                }
            }
        }
    });
    h.extend({
        randRange: function(m, e) {
            return Math.round(Math.random() * (e - m) + m)
        },
        zeroFill: function(m, e) {
            e -= m.toString().length;
            if (e > 0) {
                return new Array(e + (/\./.test(m) ? 2 : 1)).join("0") + m
            }
            return m.toString()
        },
        sprite: function(r, m, e, o, n) {
            var t,
                z,
                u,
                s,
                v,
                q,
                p;
            if (typeof r === "string") {
                e = m;
                m = r;
                r = 1
            }
            if (!n && o) {
                n = o
            }
            o = parseInt(o || 0, 10);
            n = parseInt(n || 0, 10);
            p = h.assets[m];
            if (!p) {
                p = new Image();
                p.src = m;
                h.assets[m] = p;
                p.onload = function() {
                    for (var w in e) {
                        h(w).each(function() {
                            this.ready = true;
                            this.trigger("change")
                        })
                    }
                }
            }
            for (t in e) {
                if (!e.hasOwnProperty(t)) {
                    continue
                }
                z = e[t];
                u = z[0] * r + o;
                s = z[1] * r + n;
                v = z[2] * r || r;
                q = z[3] * r || r;
                h.c(t, {
                    __image: m,
                    __coord: [u, s, v, q],
                    __tile: r,
                    __padding: [o, n],
                    __trim: null,
                    img: p,
                    ready: false,
                    init: function() {
                        this.addComponent("Sprite");
                        this.__trim = [0, 0, 0, 0];
                        if (this.img.complete && this.img.width > 0) {
                            this.ready = true;
                            this.trigger("change")
                        }
                        this.w = this.__coord[2];
                        this.h = this.__coord[3];
                        this.bind("draw", function(x) {
                            var y = x.co,
                                A = x.pos,
                                w = x.ctx;
                            if (x.type === "canvas") {
                                w.drawImage(this.img, y.x, y.y, y.w, y.h, A._x, A._y, A._w, A._h)
                            } else {
                                if (x.type === "DOM") {
                                    this._element.style.background = "url('" + this.__image + "') no-repeat -" + y.x + "px -" + y.y + "px"
                                }
                            }
                        })
                    },
                    sprite: function(A, D, B, C) {
                        this.__coord = [A * this.__tile + this.__padding[0] + this.__trim[0], D * this.__tile + this.__padding[1] + this.__trim[1], this.__trim[2] || B * this.__tile || this.__tile, this.__trim[3] || C * this.__tile || this.__tile];
                        this.trigger("change")
                    },
                    crop: function(A, E, C, D) {
                        var B = this._mbr || this.pos();
                        this.__trim = [];
                        this.__trim[0] = A;
                        this.__trim[1] = E;
                        this.__trim[2] = C;
                        this.__trim[3] = D;
                        this.__coord[0] += A;
                        this.__coord[1] += E;
                        this.__coord[2] = C;
                        this.__coord[3] = D;
                        this._w = C;
                        this._h = D;
                        this.trigger("change", B);
                        return this
                    }
                })
            }
            return this
        },
        _events: {},
        addEvent: function(e, p, o, n) {
            if (arguments.length === 3) {
                n = o;
                o = p;
                p = d.document
            }
            var m = function(r) {
                    var r = r || d.event;
                    n.call(e, r)
                },
                q = e[0] || "";
            if (!this._events[q + p + o + n]) {
                this._events[q + p + o + n] = m
            } else {
                return
            }
            if (p.attachEvent) {
                p.attachEvent("on" + o, m)
            } else {
                p.addEventListener(o, m, false)
            }
        },
        removeEvent: function(e, p, o, n) {
            if (arguments.length === 3) {
                n = o;
                o = p;
                p = d.document
            }
            var q = e[0] || "",
                m = this._events[q + p + o + n];
            if (m) {
                if (p.detachEvent) {
                    p.detachEvent("on" + o, m)
                } else {
                    p.removeEventListener(o, m, false)
                }
                delete this._events[q + p + o + n]
            }
        },
        background: function(e) {
            h.stage.elem.style.background = e
        },
        viewport: {
            width: 0,
            height: 0,
            _x: 0,
            _y: 0,
            scroll: function(p, e) {
                e = Math.floor(e);
                var q = (e - this[p]),
                    n = h.context,
                    o = h.stage.inner.style,
                    m;
                this[p] = e;
                if (p == "_x") {
                    if (n) {
                        n.translate(q, 0)
                    }
                } else {
                    if (n) {
                        n.translate(0, q)
                    }
                }
                if (n) {
                    h.DrawManager.drawAll()
                }
                o[p == "_x" ? "left" : "top"] = ~~e + "px"
            },
            rect: function() {
                return {
                    _x: -this._x,
                    _y: -this._y,
                    _w: this.width,
                    _h: this.height
                }
            },
            init: function(e, m) {
                h.DOM.window.init();
                this.width = (!e || h.mobile) ? h.DOM.window.width : e;
                this.height = (!m || h.mobile) ? h.DOM.window.height : m;
                var o = g.getElementById("cr-stage");
                h.stage = {
                    x: 0,
                    y: 0,
                    fullscreen: false,
                    elem: (o ? o : g.createElement("div")),
                    inner: g.createElement("div")
                };
                if ((!e && !m) || h.mobile) {
                    g.body.style.overflow = "hidden";
                    h.stage.fullscreen = true
                }
                h.addEvent(this, d, "resize", function() {
                    h.DOM.window.init();
                    var q = h.DOM.window.width,
                        r = h.DOM.window.height,
                        s;
                    if (h.stage.fullscreen) {
                        this.width = q;
                        this.height = r;
                        h.stage.elem.style.width = q + "px";
                        h.stage.elem.style.height = r + "px";
                        if (h._canvas) {
                            h._canvas.width = q + "px";
                            h._canvas.height = r + "px";
                            h.DrawManager.drawAll()
                        }
                    }
                    s = h.DOM.inner(h.stage.elem);
                    h.stage.x = s.x;
                    h.stage.y = s.y
                });
                h.addEvent(this, d, "blur", function() {
                    if (h.settings.get("autoPause")) {
                        h.pause()
                    }
                });
                h.addEvent(this, d, "focus", function() {
                    if (h._paused) {
                        h.pause()
                    }
                });
                h.settings.register("stageSelectable", function(q) {
                    h.stage.elem.onselectstart = q ? function() {
                        return true
                    } : function() {
                        return false
                    }
                });
                h.settings.modify("stageSelectable", false);
                h.settings.register("stageContextMenu", function(q) {
                    h.stage.elem.oncontextmenu = q ? function() {
                        return true
                    } : function() {
                        return false
                    }
                });
                h.settings.modify("stageContextMenu", false);
                if (!o) {
                    g.body.appendChild(h.stage.elem);
                    h.stage.elem.id = "cr-stage"
                }
                var n = h.stage.elem.style,
                    p;
                h.stage.elem.appendChild(h.stage.inner);
                h.stage.inner.style.position = "absolute";
                h.stage.inner.style.zIndex = "1";
                n.width = this.width + "px";
                n.height = this.height + "px";
                n.overflow = "hidden";
                n.position = "relative";
                if (h.mobile) {
                    n.position = "absolute";
                    n.left = "0px";
                    n.top = "0px";
                    g.getElementsByTagName("HEAD")[0].innerHTML += '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">';
                    h.addEvent(this, d, "touchmove", function(q) {
                        q.preventDefault()
                    })
                }
                p = h.DOM.inner(h.stage.elem);
                h.stage.x = p.x;
                h.stage.y = p.y;
                if (h.support.setter) {
                    this.__defineSetter__("x", function(q) {
                        this.scroll("_x", q)
                    });
                    this.__defineSetter__("y", function(q) {
                        this.scroll("_y", q)
                    });
                    this.__defineGetter__("x", function() {
                        return this._x
                    });
                    this.__defineGetter__("y", function() {
                        return this._y
                    })
                } else {
                    if (h.support.defineProperty) {
                        Object.defineProperty(this, "x", {
                            set: function(q) {
                                this.scroll("_x", q)
                            },
                            get: function() {
                                return this._x
                            }
                        });
                        Object.defineProperty(this, "y", {
                            set: function(q) {
                                this.scroll("_y", q)
                            },
                            get: function() {
                                return this._y
                            }
                        })
                    } else {
                        this.x = this._x;
                        this.y = this._y;
                        h.e("viewport")
                    }
                }
            }
        },
        support: {},
        keys: {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            PAUSE: 19,
            CAPS: 20,
            ESC: 27,
            SPACE: 32,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            LEFT_ARROW: 37,
            UP_ARROW: 38,
            RIGHT_ARROW: 39,
            DOWN_ARROW: 40,
            INSERT: 45,
            DELETE: 46,
            "0": 48,
            "1": 49,
            "2": 50,
            "3": 51,
            "4": 52,
            "5": 53,
            "6": 54,
            "7": 55,
            "8": 56,
            "9": 57,
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82,
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            NUMPAD_0: 96,
            NUMPAD_1: 97,
            NUMPAD_2: 98,
            NUMPAD_3: 99,
            NUMPAD_4: 100,
            NUMPAD_5: 101,
            NUMPAD_6: 102,
            NUMPAD_7: 103,
            NUMPAD_8: 104,
            NUMPAD_9: 105,
            MULTIPLY: 106,
            ADD: 107,
            SUBSTRACT: 109,
            DECIMAL: 110,
            DIVIDE: 111,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123,
            SHIFT: 16,
            CTRL: 17,
            ALT: 18,
            PLUS: 187,
            COMMA: 188,
            MINUS: 189,
            PERIOD: 190
        }
    });
    (function b() {
        var o = h.support,
            n = navigator.userAgent.toLowerCase(),
            m = /(webkit)[ \/]([\w.]+)/.exec(n) || /(o)pera(?:.*version)?[ \/]([\w.]+)/.exec(n) || /(ms)ie ([\w.]+)/.exec(n) || /(moz)illa(?:.*? rv:([\w.]+))?/.exec(n) || [],
            e = /iPad|iPod|iPhone|Android|webOS/i.exec(n);
        if (e) {
            h.mobile = e[0]
        }
        o.setter = ("__defineSetter__" in this && "__defineGetter__" in this);
        o.defineProperty = (function() {
            if (!"defineProperty" in Object) {
                return false
            }
            try {
                Object.defineProperty({}, "x", {})
            } catch (p) {
                return false
            }
            return true
        })();
        o.audio = ("Audio" in d);
        o.prefix = (m[1] || m[0]);
        if (o.prefix === "moz") {
            o.prefix = "Moz"
        }
        if (m[2]) {
            o.versionName = m[2];
            o.version = +(m[2].split("."))[0]
        }
        o.canvas = ("getContext" in g.createElement("canvas"))
    })();
    h.c("viewport", {
        init: function() {
            this.bind("enterframe", function() {
                if (h.viewport._x !== h.viewport.x) {
                    h.viewport.scroll("_x", h.viewport.x)
                }
                if (h.viewport._y !== h.viewport.y) {
                    h.viewport.scroll("_y", h.viewport.y)
                }
            })
        }
    });
    h.c("Canvas", {
        buffer: 50,
        init: function() {
            h.DrawManager.total2D++;
            this.bind("change", function(m) {
                if (this._changed === false) {
                    this._changed = h.DrawManager.add(m || this, this)
                } else {
                    if (m) {
                        this._changed = h.DrawManager.add(m, this)
                    }
                }
            });
            this.bind("remove", function() {
                h.DrawManager.total2D--;
                h.DrawManager.add(this, this)
            })
        },
        draw: function(u, r, p, s, m) {
            if (!this.ready) {
                return
            }
            if (arguments.length === 4) {
                m = s;
                s = p;
                p = r;
                r = u;
                u = h.context
            }
            var q = {
                    _x: (this._x + (r || 0)),
                    _y: (this._y + (p || 0)),
                    _w: (s || this._w),
                    _h: (m || this._h)
                },
                e = u || h.context,
                n = this.__coord || [0, 0, 0, 0],
                o = {
                    x: n[0] + (r || 0),
                    y: n[1] + (p || 0),
                    w: s || n[2],
                    h: m || n[3]
                };
            if (this._mbr) {
                e.save();
                e.translate(this._origin.x + this._x, this._origin.y + this._y);
                q._x = -this._origin.x;
                q._y = -this._origin.y;
                e.rotate((this._rotation % 360) * (Math.PI / 180))
            }
            if (this._alpha < 1) {
                var t = e.globalAlpha;
                e.globalAlpha = this._alpha
            }
            this.trigger("draw", {
                type: "canvas",
                pos: q,
                co: o,
                ctx: e
            });
            if (this._mbr) {
                e.restore()
            }
            if (this._alpha < 1) {
                e.globalAlpha = t
            }
            return this
        }
    });
    h.extend({
        context: null,
        _canvas: null,
        canvas: function() {
            if (!h.support.canvas) {
                h.trigger("nocanvas");
                h.stop();
                return
            }
            var e;
            e = g.createElement("canvas");
            e.width = h.viewport.width;
            e.height = h.viewport.height;
            e.style.position = "absolute";
            e.style.left = "0px";
            e.style.top = "0px";
            h.stage.elem.appendChild(e);
            h.context = e.getContext("2d");
            h._canvas = e
        }
    });
    h.extend({
        down: null,
        over: null,
        mouseObjs: 0,
        keydown: {},
        mouseDispatch: function(s) {
            if (!h.mouseObjs) {
                return
            }
            if (s.type === "touchstart") {
                s.type = "mousedown"
            } else {
                if (s.type === "touchmove") {
                    s.type = "mousemove"
                } else {
                    if (s.type === "touchend") {
                        s.type = "mouseup"
                    }
                }
            }
            var t = -1,
                n,
                m,
                p = 0,
                o,
                w = h.DOM.translate(s.clientX, s.clientY),
                z,
                v;
            s.realX = z = w.x;
            s.realY = v = w.y;
            m = h.map.search({
                _x: z,
                _y: v,
                _w: 1,
                _h: 1
            });
            for (o = m.length; p < o; ++p) {
                if (!m[p].has("Mouse")) {
                    continue
                }
                var r = m[p],
                    u = false;
                if (r.map) {
                    if (r.map.containsPoint(z, v)) {
                        u = true
                    }
                } else {
                    if (r.isAt(z, v)) {
                        u = true
                    }
                }
                if (u && (r._z >= t || t === -1)) {
                    if (r._z === t && r[0] < n[0]) {
                        continue
                    }
                    t = r._z;
                    n = r
                }
            }
            if (n) {
                if (s.type === "mousedown") {
                    this.down = n;
                    this.down.trigger("mousedown", s)
                } else {
                    if (s.type === "mouseup") {
                        if (this.down && n === this.down) {
                            this.down.trigger("click", s)
                        }
                        this.down = null
                    } else {
                        if (s.type === "mousemove") {
                            if (this.over !== n) {
                                if (this.over) {
                                    this.over.trigger("mouseout", s);
                                    this.over = null
                                }
                                this.over = n;
                                n.trigger("mouseover", s)
                            }
                        } else {
                            n.trigger(s.type, s)
                        }
                    }
                }
            } else {
                if (s.type === "mousemove" && this.over) {
                    this.over.trigger("mouseout", s);
                    this.over = null
                }
            }
        }
    });
    h.bind("Load", function() {
        h.addEvent(this, h.stage.elem, "mousedown", h.mouseDispatch);
        h.addEvent(this, h.stage.elem, "mouseup", h.mouseDispatch);
        h.addEvent(this, h.stage.elem, "mousemove", h.mouseDispatch);
        h.addEvent(this, h.stage.elem, "touchstart", h.mouseDispatch);
        h.addEvent(this, h.stage.elem, "touchmove", h.mouseDispatch);
        h.addEvent(this, h.stage.elem, "touchend", h.mouseDispatch)
    });
    h.c("Mouse", {
        init: function() {
            h.mouseObjs++;
            this.bind("remove", function() {
                h.mouseObjs--
            })
        },
        areaMap: function(m) {
            if (arguments.length > 1) {
                var e = Array.prototype.slice.call(arguments, 0);
                m = new h.polygon(e)
            }
            m.shift(this._x, this._y);
            this.map = m;
            this.attach(this.map);
            return this
        }
    });
    h.c("Draggable", {
        _startX: 0,
        _startY: 0,
        init: function() {
            if (!this.has("mouse")) {
                this.addComponent("mouse")
            }
            function m(n) {
                var o = h.DOM.translate(n.clientX, n.clientY);
                this.x = o.x - this._startX;
                this.y = o.y - this._startY;
                this.trigger("Dragging", n)
            }
            this.bind("mousedown", function(n) {
                this._startX = n.realX - this._x;
                this._startY = n.realY - this._y;
                h.addEvent(this, h.stage.elem, "mousemove", m);
                this.trigger("StartDrag", n)
            });
            h.addEvent(this, h.stage.elem, "mouseup", function e(n) {
                h.removeEvent(this, h.stage.elem, "mousemove", m);
                h.removeEvent(this, h.stage.elem, "mouseup", e);
                this.trigger("StopDrag", n)
            })
        },
        disable: function() {
            this.unbind("mousedown")
        }
    });
    h.c("Controls", {
        init: function() {
            function e(m) {
                m.key = m.keyCode || m.which;
                if (m.type === "keydown") {
                    h.keydown[m.key] = true
                } else {
                    if (m.type === "keyup") {
                        delete h.keydown[m.key]
                    }
                }
                this.trigger(m.type, m);
                if (!(m.metaKey || m.altKey || m.ctrlKey) && !(m.key == 8 || m.key >= 112 && m.key <= 135)) {
                    if (m.preventDefault) {
                        m.preventDefault()
                    } else {
                        m.returnValue = false
                    }
                    return false
                }
            }
            h.addEvent(this, "keydown", e);
            h.addEvent(this, "keyup", e);
            this.bind("remove", function() {
                h.removeEvent(this, "keydown", e);
                h.removeEvent(this, "keyup", e)
            })
        },
        isDown: function(e) {
            if (typeof e === "string") {
                e = h.keys[e]
            }
            return !!h.keydown[e]
        }
    });
    h.c("Fourway", {
        _speed: 3,
        init: function() {
            this.requires("controls")
        },
        fourway: function(e) {
            if (e) {
                this._speed = e
            }
            this.bind("enterframe", function() {
                if (this.disableControls) {
                    return
                }
                if (this.isDown("RIGHT_ARROW") || this.isDown("D")) {
                    this.x += this._speed
                }
                if (this.isDown("LEFT_ARROW") || this.isDown("A")) {
                    this.x -= this._speed
                }
                if (this.isDown("UP_ARROW") || this.isDown("W")) {
                    this.y -= this._speed
                }
                if (this.isDown("DOWN_ARROW") || this.isDown("S")) {
                    this.y += this._speed
                }
            });
            return this
        }
    });
    h.c("Twoway", {
        _speed: 3,
        _up: false,
        init: function() {
            this.requires("controls")
        },
        twoway: function(m, e) {
            if (m) {
                this._speed = m
            }
            e = e || this._speed * 2;
            this.bind("enterframe", function() {
                if (this.disableControls) {
                    return
                }
                if (this.isDown("RIGHT_ARROW") || this.isDown("D")) {
                    this.x += this._speed
                }
                if (this.isDown("LEFT_ARROW") || this.isDown("A")) {
                    this.x -= this._speed
                }
                if (this._up) {
                    this.y -= e;
                    this._falling = true
                }
            }).bind("keydown", function() {
                if (this.isDown("UP_ARROW") || this.isDown("W")) {
                    this._up = true
                }
            });
            return this
        }
    });
    h.c("Animate", {
        _reels: null,
        _frame: null,
        _current: null,
        init: function() {
            this._reels = {}
        },
        animate: function(s, m, r, e) {
            if (arguments.length < 4 && typeof m === "number") {
                this._current = s;
                var p = this._reels[s],
                    q = m;
                this._frame = {
                    reel: p,
                    frameTime: Math.ceil(q / p.length),
                    frame: 0,
                    current: 0,
                    repeat: 0
                };
                if (arguments.length === 3 && typeof r === "number") {
                    if (r === -1) {
                        this._frame.repeatInfinitly = true
                    } else {
                        this._frame.repeat = r
                    }
                }
                this.bind("enterframe", this.drawFrame);
                return this
            }
            if (typeof m === "number") {
                var n = m,
                    p = [],
                    o = this.__tile;
                if (e > m) {
                    for (; n <= e; n++) {
                        p.push([n * o, r * o])
                    }
                } else {
                    for (; n >= e; n--) {
                        p.push([n * o, r * o])
                    }
                }
                this._reels[s] = p
            } else {
                if (typeof m === "object") {
                    this._reels[s] = m
                }
            }
            return this
        },
        drawFrame: function(n) {
            var m = this._frame;
            if (this._frame.current++ === m.frameTime) {
                var o = m.reel[m.frame++];
                this.__coord[0] = o[0];
                this.__coord[1] = o[1];
                this._frame.current = 0
            }
            if (m.frame === m.reel.length && this._frame.current === m.frameTime) {
                m.frame = 0;
                if (this._frame.repeatInfinitly === true || this._frame.repeat > 0) {
                    if (this._frame.repeat) {
                        this._frame.repeat--
                    }
                    this._frame.current = 0;
                    this._frame.frame = 0
                } else {
                    this.trigger("AnimationEnd", {
                        reel: m.reel
                    });
                    this.stop();
                    return
                }
            }
            this.trigger("change")
        },
        stop: function() {
            this.unbind("enterframe", this.drawFrame);
            this.unbind("AnimationEnd");
            this._current = null;
            this._frame = null;
            return this
        },
        reset: function() {
            if (!this._frame) {
                return this
            }
            var e = this._frame.reel[0];
            this.__coord[0] = e[0];
            this.__coord[1] = e[1];
            this.stop();
            return this
        },
        isPlaying: function(e) {
            if (!e) {
                return !!this._interval
            }
            return this._current === e
        }
    });
    h.c("Tween", {
        tween: function(o, q) {
            var s,
                e = {},
                p = {},
                n = h.frame(),
                m = n + q;
            for (s in o) {
                e[s] = this["_" + s];
                p[s] = (o[s] - e[s]) / q
            }
            this.bind("enterframe", function r(t) {
                if (t.frame >= m) {
                    this.unbind("enterframe", r);
                    return
                }
                for (s in o) {
                    this[s] += p[s]
                }
            })
        }
    });
    h.c("Color", {
        _color: "",
        ready: true,
        init: function() {
            this.bind("draw", function(m) {
                if (m.type === "DOM") {
                    m.style.background = this._color;
                    m.style.lineHeight = 0
                } else {
                    if (m.type === "canvas") {
                        if (this._color) {
                            m.ctx.fillStyle = this._color
                        }
                        m.ctx.fillRect(m.pos._x, m.pos._y, m.pos._w, m.pos._h)
                    }
                }
            })
        },
        color: function(e) {
            this._color = e;
            this.trigger("change");
            return this
        }
    });
    h.c("Tint", {
        _color: null,
        _strength: 1,
        init: function() {
            this.bind("draw", function e(n) {
                var m = n.ctx || h.context;
                m.fillStyle = this._color || "rgb(0,0,0)";
                m.fillRect(n.pos._x, n.pos._y, n.pos._w, n.pos._h)
            })
        },
        tint: function(e, m) {
            this._strength = m;
            this._color = h.toRGB(e, this._strength);
            this.trigger("change")
        }
    });
    h.c("Image", {
        _repeat: "repeat",
        ready: false,
        init: function() {
            this.bind("draw", function(n) {
                if (n.type === "canvas") {
                    if (!this.ready || !this._pattern) {
                        return
                    }
                    var m = n.ctx;
                    m.fillStyle = this._pattern;
                    m.fillRect(this._x, this._y, this._w, this._h)
                } else {
                    if (n.type === "DOM") {
                        if (this.__image) {
                            n.style.background = "url(" + this.__image + ") " + this._repeat
                        }
                    }
                }
            })
        },
        image: function(m, n) {
            this.__image = m;
            this._repeat = n || "no-repeat";
            this.img = h.assets[m];
            if (!this.img) {
                this.img = new Image();
                h.assets[m] = this.img;
                this.img.src = m;
                var e = this;
                this.img.onload = function() {
                    if (e.has("Canvas")) {
                        e._pattern = h.context.createPattern(e.img, e._repeat)
                    }
                    e.ready = true;
                    if (e._repeat === "no-repeat") {
                        e.w = e.img.width;
                        e.h = e.img.height
                    }
                    e.trigger("change")
                };
                return this
            } else {
                this.ready = true;
                if (this.has("Canvas")) {
                    this._pattern = h.context.createPattern(this.img, this._repeat)
                }
                if (this._repeat === "no-repeat") {
                    this.w = this.img.width;
                    this.h = this.img.height
                }
            }
            this.trigger("change");
            return this
        }
    });
    h.extend({
        _scenes: [],
        _current: null,
        scene: function(e, m) {
            if (arguments.length === 1) {
                h("2D").each(function() {
                    if (!this.has("persist")) {
                        this.destroy()
                    }
                });
                this._scenes[e].call(this);
                this._current = e;
                return
            }
            this._scenes[e] = m;
            return
        },
        rgbLookup: {},
        toRGB: function(m, o) {
            var n = this.rgbLookup[m];
            if (n) {
                return n
            }
            var m = (m.charAt(0) === "#") ? m.substr(1) : m,
                p = [],
                e;
            p[0] = parseInt(m.substr(0, 2), 16);
            p[1] = parseInt(m.substr(2, 2), 16);
            p[2] = parseInt(m.substr(4, 2), 16);
            e = o === undefined ? "rgb(" + p.join(",") + ")" : "rgba(" + p.join(",") + "," + o + ")";
            n = e;
            return e
        }
    });
    h.DrawManager = (function() {
        var m = [],
            o = [];
        return {
            total2D: h("2D").length,
            onScreen: function(p) {
                return h.viewport._x + p._x + p._w > 0 && h.viewport._y + p._y + p._h > 0 && h.viewport._x + p._x < h.viewport.width && h.viewport._y + p._y < h.viewport.height
            },
            merge: function(w) {
                do {
                    var v = [],
                        p = false,
                        r = 0,
                        q = w.length,
                        u,
                        s,
                        t;
                    while (r < q) {
                        u = w[r];
                        s = w[r + 1];
                        if (r < q - 1 && u._x < s._x + s._w && u._x + u._w > s._x && u._y < s._y + s._h && u._h + u._y > s._y) {
                            t = {
                                _x: ~~Math.min(u._x, s._x),
                                _y: ~~Math.min(u._y, s._y),
                                _w: Math.max(u._x, s._x) + Math.max(u._w, s._w),
                                _h: Math.max(u._y, s._y) + Math.max(u._h, s._h)
                            };
                            t._w = t._w - t._x;
                            t._h = t._h - t._y;
                            t._w = (t._w == ~~t._w) ? t._w : t._w + 1 | 0;
                            t._h = (t._h == ~~t._h) ? t._h : t._h + 1 | 0;
                            v.push(t);
                            r++;
                            p = true
                        } else {
                            v.push(u)
                        }
                        r++
                    }
                    w = v.length ? h.clone(v) : w;
                    if (p) {
                        r = 0
                    }
                } while (p);
                return w
            },
            add: function n(p, s) {
                if (!s) {
                    o.push(p);
                    return
                }
                var q,
                    r = p._mbr || p,
                    t = s._mbr || s;
                if (p === s) {
                    q = p.mbr() || p.pos()
                } else {
                    q = {
                        _x: ~~Math.min(r._x, t._x),
                        _y: ~~Math.min(r._y, t._y),
                        _w: Math.max(r._w, t._w) + Math.max(r._x, t._x),
                        _h: Math.max(r._h, t._h) + Math.max(r._y, t._y)
                    };
                    q._w = (q._w - q._x);
                    q._h = (q._h - q._y)
                }
                if (q._w === 0 || q._h === 0 || !this.onScreen(q)) {
                    return false
                }
                q._x = ~~q._x;
                q._y = ~~q._y;
                q._w = (q._w === ~~q._w) ? q._w : q._w + 1 | 0;
                q._h = (q._h === ~~q._h) ? q._h : q._h + 1 | 0;
                m.push(q);
                return true
            },
            debug: function() {
                console.log(m, o)
            },
            drawAll: function(t) {
                var t = t || h.viewport.rect(),
                    u,
                    s = 0,
                    r,
                    p = h.context,
                    v;
                u = h.map.search(t);
                r = u.length;
                p.clearRect(t._x, t._y, t._w, t._h);
                u.sort(function(w, q) {
                    return w._global - q._global
                });
                for (; s < r; s++) {
                    v = u[s];
                    if (v._visible && v.__c.Canvas) {
                        v.draw();
                        v._changed = false
                    }
                }
            },
            boundingRect: function(v) {
                if (!v || !v.length) {
                    return
                }
                var u = [],
                    r = 1,
                    p = v.length,
                    t,
                    s = v[0],
                    q;
                s = [s._x, s._y, s._x + s._w, s._y + s._h];
                while (r < p) {
                    t = v[r];
                    q = [t._x, t._y, t._x + t._w, t._y + t._h];
                    if (q[0] < s[0]) {
                        s[0] = q[0]
                    }
                    if (q[1] < s[1]) {
                        s[1] = q[1]
                    }
                    if (q[2] > s[2]) {
                        s[2] = q[2]
                    }
                    if (q[3] > s[3]) {
                        s[3] = q[3]
                    }
                    r++
                }
                q = s;
                s = {
                    _x: q[0],
                    _y: q[1],
                    _w: q[2] - q[0],
                    _h: q[3] - q[1]
                };
                return s
            },
            draw: function e() {
                if (!m.length && !o.length) {
                    return
                }
                var z = 0,
                    s = m.length,
                    t = o.length,
                    F,
                    p,
                    u,
                    C,
                    J,
                    v,
                    D,
                    B = [],
                    I = h.context;
                for (; z < t; ++z) {
                    o[z].draw()._changed = false
                }
                o.length = z = 0;
                if (!s) {
                    return
                }
                if (s / this.total2D > 0.6) {
                    this.drawAll();
                    m.length = 0;
                    return
                }
                m = this.merge(m);
                for (; z < s; ++z) {
                    F = m[z];
                    if (!F) {
                        continue
                    }
                    p = h.map.search(F);
                    J = {};
                    for (u = 0, C = p.length; u < C; ++u) {
                        v = p[u];
                        if (J[v[0]] || !v._visible || !v.has("Canvas")) {
                            continue
                        }
                        J[v[0]] = true;
                        B.push({
                            obj: v,
                            rect: F
                        })
                    }
                    I.clearRect(F._x, F._y, F._w, F._h)
                }
                B.sort(function(w, q) {
                    return w.obj._global - q.obj._global
                });
                if (!B.length) {
                    return
                }
                for (z = 0, s = B.length; z < s; ++z) {
                    v = B[z];
                    F = v.rect;
                    D = v.obj;
                    var r = D._mbr || D,
                        G = (F._x - r._x <= 0) ? 0 : ~~(F._x - r._x),
                        E = (F._y - r._y < 0) ? 0 : ~~(F._y - r._y),
                        H = ~~Math.min(r._w - G, F._w - (r._x - F._x), F._w, r._w),
                        A = ~~Math.min(r._h - E, F._h - (r._y - F._y), F._h, r._h);
                    if (A === 0 || H === 0) {
                        continue
                    }
                    if (D.has("Image") || D._mbr) {
                        I.save();
                        I.beginPath();
                        I.moveTo(G, E);
                        I.lineTo(G + H, E);
                        I.lineTo(G + H, A + E);
                        I.lineTo(G, A + E);
                        I.lineTo(G, E);
                        I.clip();
                        D.draw();
                        I.restore()
                    } else {
                        D.draw(G, E, H, A)
                    }
                    D._changed = false
                }
                m.length = 0;
                merged = {}
            }
        }
    })();
    h.extend({
        isometric: {
            _tile: 0,
            _z: 0,
            init: function(e) {
                this._tile = e;
                return this
            },
            place: function(o, s, q, p) {
                var e = o * this._tile + (s & 1) * (this._tile / 2),
                    r = s * this._tile / 4,
                    r = r - q * (this._tile / 2);
                p.attr({
                    x: e + h.viewport._x,
                    y: r + h.viewport._y
                }).z += q;
                return this
            },
            zoom: function(e) {
                this._tile = e;
                h.trigger("zoom", {
                    tile: e
                });
                return this
            }
        }
    });
    h.c("particles", {
        init: function() {
            this._Particles = h.clone(this._Particles)
        },
        particles: function(m) {
            if (!h.support.canvas || h.deactivateParticles) {
                return this
            }
            var r,
                e,
                p,
                n,
                q;
            r = g.createElement("canvas");
            r.width = h.viewport.width;
            r.height = h.viewport.height;
            r.style.position = "absolute";
            h.stage.elem.appendChild(r);
            e = r.getContext("2d");
            this._Particles.init(m);
            p = this.x + h.viewport.x;
            n = this.y + h.viewport.y;
            this._Particles.position = this._Particles.vectorHelpers.create(p, n);
            var o = {
                x: h.viewport.x,
                y: h.viewport.y
            };
            this.bind("enterframe", function() {
                p = this.x + h.viewport.x;
                n = this.y + h.viewport.y;
                this._Particles.viewportDelta = {
                    x: h.viewport.x - o.x,
                    y: h.viewport.y - o.y
                };
                o = {
                    x: h.viewport.x,
                    y: h.viewport.y
                };
                this._Particles.position = this._Particles.vectorHelpers.create(p, n);
                if (typeof h.DrawManager.boundingRect == "function") {
                    q = h.DrawManager.boundingRect(this._Particles.register);
                    if (q) {
                        e.clearRect(q._x, q._y, q._w, q._h)
                    }
                } else {
                    e.clearRect(0, 0, h.viewport.width, h.viewport.height)
                }
                this._Particles.update();
                this._Particles.render(e)
            });
            return this
        },
        _Particles: {
            presets: {
                maxParticles: 150,
                size: 18,
                sizeRandom: 4,
                speed: 1,
                speedRandom: 1.2,
                lifeSpan: 29,
                lifeSpanRandom: 7,
                angle: 65,
                angleRandom: 34,
                startColour: [255, 131, 0, 1],
                startColourRandom: [48, 50, 45, 0],
                endColour: [245, 35, 0, 0],
                endColourRandom: [60, 60, 60, 0],
                sharpness: 20,
                sharpnessRandom: 10,
                spread: 10,
                duration: -1,
                fastMode: false,
                gravity: {
                    x: 0,
                    y: 0.1
                },
                jitter: 0,
                particles: [],
                active: true,
                particleCount: 0,
                elapsedFrames: 0,
                emissionRate: 0,
                emitCounter: 0,
                particleIndex: 0
            },
            init: function(e) {
                this.position = this.vectorHelpers.create(0, 0);
                if (typeof e == "undefined") {
                    var e = {}
                }
                for (key in this.presets) {
                    if (typeof e[key] != "undefined") {
                        this[key] = e[key]
                    } else {
                        this[key] = this.presets[key]
                    }
                }
                this.emissionRate = this.maxParticles / this.lifeSpan;
                this.positionRandom = this.vectorHelpers.create(this.spread, this.spread)
            },
            addParticle: function() {
                if (this.particleCount == this.maxParticles) {
                    return false
                }
                var e = new this.particle(this.vectorHelpers);
                this.initParticle(e);
                this.particles[this.particleCount] = e;
                this.particleCount++;
                return true
            },
            RANDM1TO1: function() {
                return Math.random() * 2 - 1
            },
            initParticle: function(q) {
                q.position.x = this.position.x + this.positionRandom.x * this.RANDM1TO1();
                q.position.y = this.position.y + this.positionRandom.y * this.RANDM1TO1();
                var p = (this.angle + this.angleRandom * this.RANDM1TO1()) * (Math.PI / 180);
                var m = this.vectorHelpers.create(Math.sin(p), -Math.cos(p));
                var n = this.speed + this.speedRandom * this.RANDM1TO1();
                q.direction = this.vectorHelpers.multiply(m, n);
                q.size = this.size + this.sizeRandom * this.RANDM1TO1();
                q.size = q.size < 0 ? 0 : ~~q.size;
                q.timeToLive = this.lifeSpan + this.lifeSpanRandom * this.RANDM1TO1();
                q.sharpness = this.sharpness + this.sharpnessRandom * this.RANDM1TO1();
                q.sharpness = q.sharpness > 100 ? 100 : q.sharpness < 0 ? 0 : q.sharpness;
                q.sizeSmall = ~~((q.size / 200) * q.sharpness);
                var o = [this.startColour[0] + this.startColourRandom[0] * this.RANDM1TO1(), this.startColour[1] + this.startColourRandom[1] * this.RANDM1TO1(), this.startColour[2] + this.startColourRandom[2] * this.RANDM1TO1(), this.startColour[3] + this.startColourRandom[3] * this.RANDM1TO1()];
                var e = [this.endColour[0] + this.endColourRandom[0] * this.RANDM1TO1(), this.endColour[1] + this.endColourRandom[1] * this.RANDM1TO1(), this.endColour[2] + this.endColourRandom[2] * this.RANDM1TO1(), this.endColour[3] + this.endColourRandom[3] * this.RANDM1TO1()];
                q.colour = o;
                q.deltaColour[0] = (e[0] - o[0]) / q.timeToLive;
                q.deltaColour[1] = (e[1] - o[1]) / q.timeToLive;
                q.deltaColour[2] = (e[2] - o[2]) / q.timeToLive;
                q.deltaColour[3] = (e[3] - o[3]) / q.timeToLive
            },
            update: function() {
                if (this.active && this.emissionRate > 0) {
                    var o = 1 / this.emissionRate;
                    this.emitCounter++;
                    while (this.particleCount < this.maxParticles && this.emitCounter > o) {
                        this.addParticle();
                        this.emitCounter -= o
                    }
                    this.elapsedFrames++;
                    if (this.duration != -1 && this.duration < this.elapsedFrames) {
                        this.stop()
                    }
                }
                this.particleIndex = 0;
                this.register = [];
                var m;
                while (this.particleIndex < this.particleCount) {
                    var t = this.particles[this.particleIndex];
                    if (t.timeToLive > 0) {
                        t.direction = this.vectorHelpers.add(t.direction, this.gravity);
                        t.position = this.vectorHelpers.add(t.position, t.direction);
                        t.position = this.vectorHelpers.add(t.position, this.viewportDelta);
                        if (this.jitter) {
                            t.position.x += this.jitter * this.RANDM1TO1();
                            t.position.y += this.jitter * this.RANDM1TO1()
                        }
                        t.timeToLive--;
                        var s = t.colour[0] += t.deltaColour[0];
                        var q = t.colour[1] += t.deltaColour[1];
                        var e = t.colour[2] += t.deltaColour[2];
                        var n = t.colour[3] += t.deltaColour[3];
                        m = [];
                        m.push("rgba(" + (s > 255 ? 255 : s < 0 ? 0 : ~~s));
                        m.push(q > 255 ? 255 : q < 0 ? 0 : ~~q);
                        m.push(e > 255 ? 255 : e < 0 ? 0 : ~~e);
                        m.push((n > 1 ? 1 : n < 0 ? 0 : n.toFixed(2)) + ")");
                        t.drawColour = m.join(",");
                        if (!this.fastMode) {
                            m[3] = "0)";
                            t.drawColourEnd = m.join(",")
                        }
                        this.particleIndex++
                    } else {
                        if (this.particleIndex != this.particleCount - 1) {
                            this.particles[this.particleIndex] = this.particles[this.particleCount - 1]
                        }
                        this.particleCount--
                    }
                    var p = {};
                    p._x = ~~t.position.x;
                    p._y = ~~t.position.y;
                    p._w = t.size;
                    p._h = t.size;
                    this.register.push(p)
                }
            },
            stop: function() {
                this.active = false;
                this.elapsedFrames = 0;
                this.emitCounter = 0
            },
            render: function(e) {
                for (var n = 0, m = this.particleCount; n < m; n++) {
                    var p = this.particles[n];
                    var t = p.size;
                    var o = t >> 1;
                    if (p.position.x + t < 0 || p.position.y + t < 0 || p.position.x - t > h.viewport.width || p.position.y - t > h.viewport.height) {
                        continue
                    }
                    var s = ~~p.position.x;
                    var r = ~~p.position.y;
                    if (this.fastMode) {
                        e.fillStyle = p.drawColour
                    } else {
                        var q = e.createRadialGradient(s + o, r + o, p.sizeSmall, s + o, r + o, o);
                        q.addColorStop(0, p.drawColour);
                        q.addColorStop(0.9, p.drawColourEnd);
                        e.fillStyle = q
                    }
                    e.fillRect(s, r, t, t)
                }
            },
            particle: function(e) {
                this.position = e.create(0, 0);
                this.direction = e.create(0, 0);
                this.size = 0;
                this.sizeSmall = 0;
                this.timeToLive = 0;
                this.colour = [];
                this.drawColour = "";
                this.deltaColour = [];
                this.sharpness = 0
            },
            vectorHelpers: {
                create: function(e, m) {
                    return {
                        x: e,
                        y: m
                    }
                },
                multiply: function(e, m) {
                    e.x *= m;
                    e.y *= m;
                    return e
                },
                add: function(m, e) {
                    m.x += e.x;
                    m.y += e.y;
                    return m
                }
            }
        }
    });
    h.extend({
        audio: {
            _elems: {},
            _muted: false,
            _mutedAudio: [],
            MAX_CHANNELS: 5,
            type: {
                mp3: "audio/mpeg;",
                ogg: 'audio/ogg; codecs="vorbis"',
                wav: 'audio/wav; codecs="1"',
                mp4: 'audio/mp4; codecs="mp4a.40.2"'
            },
            add: function(o, n) {
                if (!h.support.audio) {
                    return this
                }
                var r,
                    v,
                    t = new Audio(),
                    p,
                    u = 0,
                    q = [];
                if (arguments.length === 1 && typeof o === "object") {
                    for (v in o) {
                        if (!o.hasOwnProperty(v)) {
                            continue
                        }
                        if (typeof o[v] !== "string") {
                            var m = o[v],
                                u = 0,
                                s = m.length,
                                e;
                            for (; u < s; ++u) {
                                e = m[u];
                                ext = e.substr(e.lastIndexOf(".") + 1).toLowerCase();
                                p = t.canPlayType(this.type[ext]);
                                if (p !== "" && p !== "no") {
                                    n = e;
                                    break
                                }
                            }
                        } else {
                            n = o[v]
                        }
                        for (; u < this.MAX_CHANNELS; u++) {
                            t = new Audio(n);
                            t.preload = "auto";
                            t.load();
                            q.push(t)
                        }
                        this._elems[v] = q;
                        if (!h.assets[n]) {
                            h.assets[n] = this._elems[v][0]
                        }
                    }
                    return this
                }
                if (typeof n !== "string") {
                    var u = 0,
                        s = n.length,
                        e;
                    for (; u < s; ++u) {
                        e = n[u];
                        ext = e.substr(e.lastIndexOf(".") + 1);
                        p = t.canPlayType(this.type[ext]);
                        if (p !== "" && p !== "no") {
                            n = e;
                            break
                        }
                    }
                }
                for (; u < this.MAX_CHANNELS; u++) {
                    t = new Audio(n);
                    t.preload = "auto";
                    t.load();
                    q.push(t)
                }
                this._elems[o] = q;
                if (!h.assets[n]) {
                    h.assets[n] = this._elems[o][0]
                }
                return this
            },
            play: function(r, p) {
                if (!h.support.audio) {
                    return
                }
                var e = this._elems[r],
                    q,
                    o = 0,
                    m = e.length;
                for (; o < m; o++) {
                    q = e[o];
                    if (q.ended || !q.currentTime) {
                        q.play();
                        break
                    } else {
                        if (o === m - 1) {
                            q.currentTime = 0;
                            q.play()
                        }
                    }
                }
                if (typeof p == "number") {
                    var n = 0;
                    e[o].addEventListener("ended", function() {
                        if (p == -1 || n <= p) {
                            this.currentTime = 0;
                            n++
                        }
                    }, false)
                }
                return this
            },
            settings: function(s, q) {
                if (!q) {
                    for (var o in this._elems) {
                        this.settings(o, s)
                    }
                    return this
                }
                var e = this._elems[s],
                    r,
                    p,
                    n = 0,
                    m = e.length;
                for (var p in q) {
                    for (; n < m; n++) {
                        r = e[n];
                        r[p] = q[p]
                    }
                }
                return this
            },
            mute: function() {
                this._muted = true;
                var e,
                    p,
                    n,
                    m,
                    o;
                for (e in this._elems) {
                    o = this._elems[e];
                    for (n = 0, m = o.length; n < m; ++n) {
                        p = o[n];
                        if (!p.ended && p.currentTime) {
                            this._mutedAudio.push(p);
                            p.pause()
                        }
                    }
                }
            },
            unMute: function() {
                this._muted = false;
                for (var e = 0; e < this._mutedAudio.length; e++) {
                    this._mutedAudio[e].play()
                }
                this._mutedAudio = []
            }
        }
    });
    h.bind("Pause", function() {
        h.audio.mute()
    });
    h.bind("Unpause", function() {
        h.audio.unMute()
    });
    h.c("Text", {
        _text: "",
        _font: "",
        init: function() {
            this.bind("draw", function(o) {
                if (o.type === "DOM") {
                    var n = this._element,
                        m = n.style;
                    n.innerHTML = this._text;
                    if (this._font) {
                        m.font = this._font
                    }
                }
            })
        },
        text: function(e) {
            if (!e) {
                return this._text
            }
            this._text = e;
            this.trigger("change");
            return this
        },
        font: function(e) {
            this._font = e;
            this.trigger("change");
            return this
        }
    });
    h.extend({
        assets: {},
        load: function(q, m, e, t) {
            var r = 0,
                n = q.length,
                s,
                p,
                u = n,
                o = 0;
            for (; r < n; ++r) {
                s = q[r];
                ext = s.substr(s.lastIndexOf(".") + 1).toLowerCase();
                if (h.support.audio && (ext === "mp3" || ext === "wav" || ext === "ogg" || ext === "mp4")) {
                    p = new Audio(s);
                    if (navigator.userAgent.indexOf("Chrome") != -1) {
                        o++
                    }
                } else {
                    if (ext === "jpg" || ext === "jpeg" || ext === "gif" || ext === "png") {
                        p = new Image();
                        p.src = s
                    } else {
                        u--;
                        continue
                    }
                }
                this.assets[s] = p;
                p.onload = function() {
                    ++o;
                    if (e) {
                        e.call(this, {
                            loaded: o,
                            total: u,
                            percent: (o / u * 100)
                        })
                    }
                    if (o === u) {
                        if (m) {
                            m()
                        }
                    }
                };
                p.onerror = function() {
                    if (t) {
                        t.call(this, {
                            loaded: o,
                            total: u,
                            percent: (o / u * 100)
                        })
                    } else {
                        o++;
                        if (o === u) {
                            if (m) {
                                m()
                            }
                        }
                    }
                }
            }
        }
    })
})(Crafty, window, window.document);

