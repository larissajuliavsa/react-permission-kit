import { createContext as e, useCallback as t, useContext as n, useState as r } from "react";
//#region \0rolldown/runtime.js
var i = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), a = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (e, t) => (typeof require < "u" ? require : e)[t] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
}), o = e(void 0), s = () => {
	let e = n(o);
	if (e === void 0) throw Error("usePermission must be used within a PermissionProvider");
	return e;
}, c = /* @__PURE__ */ i(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), l = /* @__PURE__ */ i(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === k ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case v: return "Fragment";
				case b: return "Profiler";
				case y: return "StrictMode";
				case w: return "Suspense";
				case T: return "SuspenseList";
				case O: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case _: return "Portal";
				case S: return e.displayName || "Context";
				case x: return (e._context.displayName || "Context") + ".Consumer";
				case C:
					var n = e.render;
					return e = e.displayName, e ||= (e = n.displayName || n.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case E: return n = e.displayName || null, n === null ? t(e.type) || "Memo" : n;
				case D:
					n = e._payload, e = e._init;
					try {
						return t(e(n));
					} catch {}
			}
			return null;
		}
		function n(e) {
			return "" + e;
		}
		function r(e) {
			try {
				n(e);
				var t = !1;
			} catch {
				t = !0;
			}
			if (t) {
				t = console;
				var r = t.error, i = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
				return r.call(t, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", i), n(e);
			}
		}
		function i(e) {
			if (e === v) return "<>";
			if (typeof e == "object" && e && e.$$typeof === D) return "<...>";
			try {
				var n = t(e);
				return n ? "<" + n + ">" : "<...>";
			} catch {
				return "<...>";
			}
		}
		function o() {
			var e = A.A;
			return e === null ? null : e.getOwner();
		}
		function s() {
			return Error("react-stack-top-frame");
		}
		function c(e) {
			if (j.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function l(e, t) {
			function n() {
				P || (P = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
			}
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function u() {
			var e = t(this.type);
			return F[e] || (F[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
		}
		function d(e, t, n, r, i, a) {
			var o = n.ref;
			return e = {
				$$typeof: g,
				type: e,
				key: t,
				props: n,
				_owner: r
			}, (o === void 0 ? null : o) === null ? Object.defineProperty(e, "ref", {
				enumerable: !1,
				value: null
			}) : Object.defineProperty(e, "ref", {
				enumerable: !1,
				get: u
			}), e._store = {}, Object.defineProperty(e._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			}), Object.defineProperty(e, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			}), Object.defineProperty(e, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: i
			}), Object.defineProperty(e, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: a
			}), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
		}
		function f(e, n, i, a, s, u) {
			var f = n.children;
			if (f !== void 0) if (a) if (M(f)) {
				for (a = 0; a < f.length; a++) p(f[a]);
				Object.freeze && Object.freeze(f);
			} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
			else p(f);
			if (j.call(n, "key")) {
				f = t(e);
				var m = Object.keys(n).filter(function(e) {
					return e !== "key";
				});
				a = 0 < m.length ? "{key: someKey, " + m.join(": ..., ") + ": ...}" : "{key: someKey}", R[f + a] || (m = 0 < m.length ? "{" + m.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", a, f, m, f), R[f + a] = !0);
			}
			if (f = null, i !== void 0 && (r(i), f = "" + i), c(n) && (r(n.key), f = "" + n.key), "key" in n) for (var h in i = {}, n) h !== "key" && (i[h] = n[h]);
			else i = n;
			return f && l(i, typeof e == "function" ? e.displayName || e.name || "Unknown" : e), d(e, f, i, o(), s, u);
		}
		function p(e) {
			m(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === D && (e._payload.status === "fulfilled" ? m(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function m(e) {
			return typeof e == "object" && !!e && e.$$typeof === g;
		}
		var h = a("react"), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), S = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), T = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), O = Symbol.for("react.activity"), k = Symbol.for("react.client.reference"), A = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, j = Object.prototype.hasOwnProperty, M = Array.isArray, N = console.createTask ? console.createTask : function() {
			return null;
		};
		h = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var P, F = {}, I = h.react_stack_bottom_frame.bind(h, s)(), L = N(i(s)), R = {};
		e.Fragment = v, e.jsx = function(e, t, n) {
			var r = 1e4 > A.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !1, r ? Error("react-stack-top-frame") : I, r ? N(i(e)) : L);
		}, e.jsxs = function(e, t, n) {
			var r = 1e4 > A.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !0, r ? Error("react-stack-top-frame") : I, r ? N(i(e)) : L);
		};
	})();
})), u = (/* @__PURE__ */ i(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = c() : t.exports = l();
})))(), d = ({ permission: e, role: t, fallback: n = null, children: r }) => {
	let { can: i, hasRole: a } = s();
	return /* @__PURE__ */ (0, u.jsx)(u.Fragment, { children: (e && t ? i(e) && a(t) : e ? i(e) : !t || a(t)) ? r : n });
}, f = ({ permission: e, role: t, mode: n = "all", fallback: r = null, children: i }) => {
	let { can: a, canAll: o, canAny: c, hasRole: l } = s(), d = e ? typeof e == "string" ? a(e) : n === "any" ? c(e) : o(e) : !0, f = t ? l(t) : !0;
	return /* @__PURE__ */ (0, u.jsx)(u.Fragment, { children: d && f ? i : r });
}, p = ({ component: e, permission: t, role: n, fallback: r = /* @__PURE__ */ (0, u.jsx)("div", { children: "Acesso Negado" }), path: i, ...a }) => {
	let { can: o, canAll: c, canAny: l, hasRole: d } = s(), f = t ? typeof t == "string" ? o(t) : (a.mode || "all") === "any" ? l(t) : c(t) : !0, p = n ? d(n) : !0;
	return f && p ? /* @__PURE__ */ (0, u.jsx)(e, {}) : /* @__PURE__ */ (0, u.jsx)(u.Fragment, { children: r });
}, m = (e, t, n = "all") => {
	let { can: r, canAll: i, canAny: a, hasRole: o } = s(), c = e ? typeof e == "string" ? r(e) : n === "any" ? a(e) : i(e) : !0, l = t ? o(t) : !0;
	return c && l;
}, h = ({ initialPermissions: e = [], initialRoles: n = [], children: i }) => {
	let [a, s] = r(e), [c, l] = r(n), d = {
		permissions: a,
		roles: c,
		can: t((e) => (Array.isArray(e) ? e : [e]).every((e) => a.includes(e)), [a]),
		canAny: t((e) => e.some((e) => a.includes(e)), [a]),
		canAll: t((e) => e.every((e) => a.includes(e)), [a]),
		hasRole: t((e) => c.includes(e), [c]),
		setPermissions: s,
		setRoles: l,
		addPermission: t((e) => {
			s((t) => t.includes(e) ? t : [...t, e]);
		}, []),
		removePermission: t((e) => {
			s((t) => t.filter((t) => t !== e));
		}, []),
		addRole: t((e) => {
			l((t) => t.includes(e) ? t : [...t, e]);
		}, []),
		removeRole: t((e) => {
			l((t) => t.filter((t) => t !== e));
		}, [])
	};
	return /* @__PURE__ */ (0, u.jsx)(o.Provider, {
		value: d,
		children: i
	});
}, g = (e, t) => {
	if (!e.includes("*")) return e === t;
	let n = e.split(".").map((e) => e === "*" ? ".*" : e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("\\.");
	return RegExp(`^${n}$`).test(t);
}, _ = (e, t) => (Array.isArray(t) ? t : [t]).some((t) => e.some((e) => g(t, e))), v = (e, t) => t.every((t) => e.some((e) => g(t, e))), y = (e) => ({
	canWithWildcard: (t) => typeof t == "string" ? e.some((e) => g(t, e)) : v(e, t),
	canAnyWithWildcard: (t) => _(e, t),
	canAllWithWildcard: (t) => v(e, t)
});
//#endregion
export { d as Can, f as CanMulti, o as PermissionContext, h as PermissionProvider, p as PermissionRoute, g as matchesPermissionPattern, v as permissionMatchesAll, _ as permissionMatchesAny, m as useCanAccessRoute, s as usePermission, y as useWildcardPermission };
