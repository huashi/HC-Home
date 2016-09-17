/*!
 * jQuery JavaScript Library v1.11.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-17T15:27Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.2",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on("pageshow.rails", function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data("ujs:enable-with")) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data("ujs:enable-with")) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, ref, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (!browserSupportsTurbolinks) {
      return;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, i, key, len, pageCacheKeys, results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    results = [];
    for (i = 0, len = pageCacheKeys.length; i < len; i++) {
      key = pageCacheKeys[i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      results.push(delete pageCache[key]);
    }
    return results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, i, j, len, len1, nextSibling, parentNode, ref, ref1, script, scripts;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (i = 0, len = scripts.length; i < len; i++) {
      script = scripts[i];
      if (!((ref = script.type) === '' || ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      ref1 = script.attributes;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        attr = ref1[j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(window.history.state, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var ref, value;
    value = ((ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var ref;
      return (400 <= (ref = xhr.status) && ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var i, len, node, ref, results;
      ref = doc.querySelector('head').childNodes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        node = ref[i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var i, len, ref, results, value;
      if (a.length > b.length) {
        ref = [b, a], a = ref[0], b = ref[1];
      }
      results = [];
      for (i = 0, len = a.length; i < len; i++) {
        value = a[i];
        if (indexOf.call(b, value) >= 0) {
          results.push(value);
        }
      }
      return results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  createDocument = function(html) {
    var doc;
    doc = document.documentElement.cloneNode();
    doc.innerHTML = html;
    doc.head = doc.querySelector('head');
    doc.body = doc.querySelector('body');
    return doc;
  };

  ComponentUrl = (function() {
    function ComponentUrl(original1) {
      this.original = original1 != null ? original1 : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      ref = this.link, this.href = ref.href, this.protocol = ref.protocol, this.host = ref.host, this.hostname = ref.hostname, this.port = ref.port, this.pathname = ref.pathname, this.search = ref.search, this.hash = ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(superClass) {
    extend(Link, superClass);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, i, len;
      extensions = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      for (i = 0, len = extensions.length; i < len; i++) {
        extension = extensions[i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link1) {
      this.link = link1;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event1) {
      this.event = event1;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = bind(this._trickle, this);
      this.value = 0;
      this.content = '';
      this.speed = 300;
      this.opacity = 0.99;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var ref;
      if ((value > (ref = this.value) && ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      var originalOpacity;
      originalOpacity = this.opacity;
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = originalOpacity;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, ref;
    if ((ref = event.state) != null ? ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (ref = popCookie('request_method')) === 'GET' || ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
/*!
 * Retina.js v1.3.0
 *
 * Copyright 2014 Imulus, LLC
 * Released under the MIT license
 *
 * Retina.js is an open source script that makes it easy to serve
 * high-resolution images to devices with retina displays.
 */

!function(){function Retina(){}function suffixReplace(match){return config.retinaImageSuffix+match}function RetinaImagePath(path,at_2x_path){if(this.path=path||"","undefined"!=typeof at_2x_path&&null!==at_2x_path)this.at_2x_path=at_2x_path,this.perform_check=!1;else{if(void 0!==document.createElement){var locationObject=document.createElement("a");locationObject.href=this.path,locationObject.pathname=locationObject.pathname.replace(regexMatch,suffixReplace),this.at_2x_path=locationObject.href}else{var parts=this.path.split("?");parts[0]=parts[0].replace(regexMatch,suffixReplace),this.at_2x_path=parts.join("?")}this.perform_check=!0}}function RetinaImage(el){this.el=el,this.path=new RetinaImagePath(this.el.getAttribute("src"),this.el.getAttribute("data-at2x"));var that=this;this.path.check_2x_variant(function(hasVariant){hasVariant&&that.swap()})}var root="undefined"==typeof exports?window:exports,config={retinaImageSuffix:"@2x",check_mime_type:!0,force_original_dimensions:!0};root.Retina=Retina,Retina.configure=function(options){null===options&&(options={});for(var prop in options)options.hasOwnProperty(prop)&&(config[prop]=options[prop])},Retina.init=function(context){null===context&&(context=root);var existing_onload=context.onload||function(){};context.onload=function(){var i,image,images=document.getElementsByTagName("img"),retinaImages=[];for(i=0;i<images.length;i+=1)image=images[i],image.getAttributeNode("data-no-retina")||retinaImages.push(new RetinaImage(image));existing_onload()}},Retina.isRetina=function(){var mediaQuery="(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";return root.devicePixelRatio>1?!0:root.matchMedia&&root.matchMedia(mediaQuery).matches?!0:!1};var regexMatch=/\.\w+$/;root.RetinaImagePath=RetinaImagePath,RetinaImagePath.confirmed_paths=[],RetinaImagePath.prototype.is_external=function(){return!(!this.path.match(/^https?\:/i)||this.path.match("//"+document.domain))},RetinaImagePath.prototype.check_2x_variant=function(callback){var http,that=this;return this.is_external()?callback(!1):this.perform_check||"undefined"==typeof this.at_2x_path||null===this.at_2x_path?this.at_2x_path in RetinaImagePath.confirmed_paths?callback(!0):(http=new XMLHttpRequest,http.open("HEAD",this.at_2x_path),http.onreadystatechange=function(){if(4!==http.readyState)return callback(!1);if(http.status>=200&&http.status<=399){if(config.check_mime_type){var type=http.getResponseHeader("Content-Type");if(null===type||!type.match(/^image/i))return callback(!1)}return RetinaImagePath.confirmed_paths.push(that.at_2x_path),callback(!0)}return callback(!1)},http.send(),void 0):callback(!0)},root.RetinaImage=RetinaImage,RetinaImage.prototype.swap=function(path){function load(){that.el.complete?(config.force_original_dimensions&&(that.el.setAttribute("width",that.el.offsetWidth),that.el.setAttribute("height",that.el.offsetHeight)),that.el.setAttribute("src",path)):setTimeout(load,5)}"undefined"==typeof path&&(path=this.path.at_2x_path);var that=this;load()},Retina.isRetina()&&Retina.init(root)}();var cssua=function(n,l,p){var q=/\s*([\-\w ]+)[\s\/\:]([\d_]+\b(?:[\-\._\/]\w+)*)/,r=/([\w\-\.]+[\s\/][v]?[\d_]+\b(?:[\-\._\/]\w+)*)/g,s=/\b(?:(blackberry\w*|bb10)|(rim tablet os))(?:\/(\d+\.\d+(?:\.\w+)*))?/,t=/\bsilk-accelerated=true\b/,u=/\bfluidapp\b/,v=/(\bwindows\b|\bmacintosh\b|\blinux\b|\bunix\b)/,w=/(\bandroid\b|\bipad\b|\bipod\b|\bwindows phone\b|\bwpdesktop\b|\bxblwp7\b|\bzunewp7\b|\bwindows ce\b|\bblackberry\w*|\bbb10\b|\brim tablet os\b|\bmeego|\bwebos\b|\bpalm|\bsymbian|\bj2me\b|\bdocomo\b|\bpda\b|\bchtml\b|\bmidp\b|\bcldc\b|\w*?mobile\w*?|\w*?phone\w*?)/,x=/(\bxbox\b|\bplaystation\b|\bnintendo\s+\w+)/,k={parse:function(b,d){var a={};if(d&&(a.standalone=d),b=(""+b).toLowerCase(),!b)return a;for(var c,e,g=b.split(/[()]/),f=0,k=g.length;k>f;f++)if(f%2){var m=g[f].split(";");for(c=0,e=m.length;e>c;c++)if(q.exec(m[c])){var h=RegExp.$1.split(" ").join("_"),l=RegExp.$2;(!a[h]||parseFloat(a[h])<parseFloat(l))&&(a[h]=l)}}else if(m=g[f].match(r))for(c=0,e=m.length;e>c;c++)h=m[c].split(/[\/\s]+/),h.length&&"mozilla"!==h[0]&&(a[h[0].split(" ").join("_")]=h.slice(1).join("-"));return w.exec(b)?(a.mobile=RegExp.$1,s.exec(b)&&(delete a[a.mobile],a.blackberry=a.version||RegExp.$3||RegExp.$2||RegExp.$1,RegExp.$1?a.mobile="blackberry":"0.0.1"===a.version&&(a.blackberry="7.1.0.0"))):v.exec(b)?a.desktop=RegExp.$1:x.exec(b)&&(a.game=RegExp.$1,c=a.game.split(" ").join("_"),a.version&&!a[c]&&(a[c]=a.version)),a.intel_mac_os_x?(a.mac_os_x=a.intel_mac_os_x.split("_").join("."),delete a.intel_mac_os_x):a.cpu_iphone_os?(a.ios=a.cpu_iphone_os.split("_").join("."),delete a.cpu_iphone_os):a.cpu_os?(a.ios=a.cpu_os.split("_").join("."),delete a.cpu_os):"iphone"!==a.mobile||a.ios||(a.ios="1"),a.opera&&a.version?(a.opera=a.version,delete a.blackberry):t.exec(b)?a.silk_accelerated=!0:u.exec(b)&&(a.fluidapp=a.version),a.applewebkit?(a.webkit=a.applewebkit,delete a.applewebkit,a.opr&&(a.opera=a.opr,delete a.opr,delete a.chrome),a.safari&&(a.chrome||a.crios||a.opera||a.silk||a.fluidapp||a.phantomjs||a.mobile&&!a.ios?delete a.safari:a.safari=a.version&&!a.rim_tablet_os?a.version:{419:"2.0.4",417:"2.0.3",416:"2.0.2",412:"2.0",312:"1.3",125:"1.2",85:"1.0"}[parseInt(a.safari,10)]||a.safari)):a.msie||a.trident?(a.opera||(a.ie=a.msie||a.rv),delete a.msie,a.windows_phone_os?(a.windows_phone=a.windows_phone_os,delete a.windows_phone_os):("wpdesktop"===a.mobile||"xblwp7"===a.mobile||"zunewp7"===a.mobile)&&(a.mobile="windows desktop",a.windows_phone=9>+a.ie?"7.0":10>+a.ie?"7.5":"8.0",delete a.windows_nt)):(a.gecko||a.firefox)&&(a.gecko=a.rv),a.rv&&delete a.rv,a.version&&delete a.version,a},format:function(b){var a,d="";for(a in b)if(a&&b.hasOwnProperty(a)){var c=a,e=b[a],c=c.split(".").join("-"),g=" ua-"+c;if("string"==typeof e){for(var e=e.split(" ").join("_").split(".").join("-"),f=e.indexOf("-");f>0;)g+=" ua-"+c+"-"+e.substring(0,f),f=e.indexOf("-",f+1);g+=" ua-"+c+"-"+e}d+=g}return d},encode:function(b){var a,d="";for(a in b)a&&b.hasOwnProperty(a)&&(d&&(d+="&"),d+=encodeURIComponent(a)+"="+encodeURIComponent(b[a]));return d}};return k.userAgent=k.ua=k.parse(l,p),l=k.format(k.ua)+" js",n.className=n.className?n.className.replace(/\bno-js\b/g,"")+l:l.substr(1),k}(document.documentElement,navigator.userAgent,navigator.standalone);!function(window){"use strict";var cssremunit=function(){var div=document.createElement("div");return div.style.cssText="font-size: 1rem;",/rem/.test(div.style.fontSize)},isStyleSheet=function(){for(var styles=document.getElementsByTagName("link"),filteredLinks=[],i=0;i<styles.length;i++)"stylesheet"===styles[i].rel.toLowerCase()&&null===styles[i].getAttribute("data-norem")&&filteredLinks.push(styles[i].href);return filteredLinks},processLinks=function(){for(var i=0;i<links.length;i++)xhr(links[i],storeCSS)},storeCSS=function(response,link){if(preCSS.push(response.responseText),CSSLinks.push(link),CSSLinks.length===links.length){for(var j=0;j<CSSLinks.length;j++)matchCSS(preCSS[j],CSSLinks[j]);(links=importLinks.slice(0)).length>0?(CSSLinks=[],preCSS=[],importLinks=[],processLinks()):buildCSS()}},matchCSS=function(sheetCSS,link){for(var importStatement,clean=removeMediaQueries(sheetCSS).replace(/\/\*[\s\S]*?\*\//g,""),pattern=/[\w\d\s\-\/\\\[\]:,.'"*()<>+~%#^$_=|@]+\{[\w\d\s\-\/\\%#:!;,.'"*()]+\d*\.?\d+rem[\w\d\s\-\/\\%#:!;,.'"*()]*\}/g,current=clean.match(pattern),remPattern=/\d*\.?\d+rem/g,remCurrent=clean.match(remPattern),sheetPathPattern=/(.*\/)/,sheetPath=sheetPathPattern.exec(link)[0],importPattern=/@import (?:url\()?['"]?([^'\)"]*)['"]?\)?[^;]*/gm;null!==(importStatement=importPattern.exec(sheetCSS));)importLinks.push(sheetPath+importStatement[1]);null!==current&&0!==current.length&&(found=found.concat(current),foundProps=foundProps.concat(remCurrent))},buildCSS=function(){for(var pattern=/[\w\d\s\-\/\\%#:,.'"*()]+\d*\.?\d+rem[\w\d\s\-\/\\%#:!,.'"*()]*[;}]/g,i=0;i<found.length;i++){rules+=found[i].substr(0,found[i].indexOf("{")+1);for(var current=found[i].match(pattern),j=0;j<current.length;j++)rules+=current[j],j===current.length-1&&"}"!==rules[rules.length-1]&&(rules+="\n}")}parseCSS()},parseCSS=function(){for(var i=0;i<foundProps.length;i++)css[i]=Math.round(parseFloat(foundProps[i].substr(0,foundProps[i].length-3)*fontSize))+"px";loadCSS()},loadCSS=function(){for(var i=0;i<css.length;i++)css[i]&&(rules=rules.replace(foundProps[i],css[i]));var remcss=document.createElement("style");remcss.setAttribute("type","text/css"),remcss.id="remReplace",document.getElementsByTagName("head")[0].appendChild(remcss),remcss.styleSheet?remcss.styleSheet.cssText=rules:remcss.appendChild(document.createTextNode(rules))},xhr=function(url,callback){try{var xhr=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP")||new ActiveXObject("Msxml2.XMLHTTP"):new XMLHttpRequest;xhr.open("GET",url,!0),xhr.onreadystatechange=function(){4===xhr.readyState&&callback(xhr,url)},xhr.send(null)}catch(e){if(window.XDomainRequest){var xdr=new XDomainRequest;xdr.open("get",url),xdr.onload=function(){callback(xdr,url)},xdr.onerror=function(){return!1},xdr.send()}}},removeMediaQueries=function(css){return window.matchMedia||window.msMatchMedia||(css=css.replace(/@media[\s\S]*?\}\s*\}/g,"")),css};if(!cssremunit()){var rules="",links=isStyleSheet(),importLinks=[],found=[],foundProps=[],preCSS=[],CSSLinks=[],css=[],fontSize="";fontSize=function(){var size,doc=document,docElement=doc.documentElement,body=doc.body||doc.createElement("body"),isFakeBody=!doc.body,div=doc.createElement("div"),currentSize=body.style.fontSize;return isFakeBody&&docElement.appendChild(body),div.style.cssText="width:1em; position:absolute; visibility:hidden; padding: 0;",body.style.fontSize="1em",body.appendChild(div),size=div.offsetWidth,isFakeBody?docElement.removeChild(body):(body.removeChild(div),body.style.fontSize=currentSize),size}(),processLinks()}}(window),function(define){"use strict";define(["jquery"],function($){function both(val){return $.isFunction(val)||$.isPlainObject(val)?val:{top:val,left:val}}var $scrollTo=$.scrollTo=function(target,duration,settings){return $(window).scrollTo(target,duration,settings)};return $scrollTo.defaults={axis:"xy",duration:0,limit:!0},$scrollTo.window=function(){return $(window)._scrollable()},$.fn._scrollable=function(){return this.map(function(){var elem=this,isWin=!elem.nodeName||-1!=$.inArray(elem.nodeName.toLowerCase(),["iframe","#document","html","body"]);if(!isWin)return elem;var doc=(elem.contentWindow||elem).document||elem.ownerDocument||elem;return/webkit/i.test(navigator.userAgent)||"BackCompat"==doc.compatMode?doc.body:doc.documentElement})},$.fn.scrollTo=function(target,duration,settings){return"object"==typeof duration&&(settings=duration,duration=0),"function"==typeof settings&&(settings={onAfter:settings}),"max"==target&&(target=9e9),settings=$.extend({},$scrollTo.defaults,settings),duration=duration||settings.duration,settings.queue=settings.queue&&settings.axis.length>1,settings.queue&&(duration/=2),settings.offset=both(settings.offset),settings.over=both(settings.over),this._scrollable().each(function(){function animate(callback){$elem.animate(attr,duration,settings.easing,callback&&function(){callback.call(this,targ,settings)})}if(null!=target){var toff,elem=this,$elem=$(elem),targ=target,attr={},win=$elem.is("html,body");switch(typeof targ){case"number":case"string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}if(targ=win?$(targ):$(targ,this),!targ.length)return;case"object":(targ.is||targ.style)&&(toff=(targ=$(targ)).offset())}var offset=$.isFunction(settings.offset)&&settings.offset(elem,targ)||settings.offset;$.each(settings.axis.split(""),function(i,axis){var Pos="x"==axis?"Left":"Top",pos=Pos.toLowerCase(),key="scroll"+Pos,old=elem[key],max=$scrollTo.max(elem,axis);if(toff)attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]),settings.margin&&(attr[key]-=parseInt(targ.css("margin"+Pos))||0,attr[key]-=parseInt(targ.css("border"+Pos+"Width"))||0),attr[key]+=offset[pos]||0,settings.over[pos]&&(attr[key]+=targ["x"==axis?"width":"height"]()*settings.over[pos]);else{var val=targ[pos];attr[key]=val.slice&&"%"==val.slice(-1)?parseFloat(val)/100*max:val}settings.limit&&/^\d+$/.test(attr[key])&&(attr[key]=attr[key]<=0?0:Math.min(attr[key],max)),!i&&settings.queue&&(old!=attr[key]&&animate(settings.onAfterFirst),delete attr[key])}),animate(settings.onAfter)}}).end()},$scrollTo.max=function(elem,axis){var Dim="x"==axis?"Width":"Height",scroll="scroll"+Dim;if(!$(elem).is("html,body"))return elem[scroll]-$(elem)[Dim.toLowerCase()]();var size="client"+Dim,html=elem.ownerDocument.documentElement,body=elem.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[size],body[size])},$scrollTo})}("function"==typeof define&&define.amd?define:function(deps,factory){"undefined"!=typeof module&&module.exports?module.exports=factory(require("jquery")):factory(jQuery)}),function(){$(document).on("click",".js-scrollto",function(e){return $(document).slideTo($($(this).attr("href"))),e.preventDefault()})}.call(this),function(){}.call(this);
/*
 * For font license information, see the CSS file loaded by this JavaScript.
 */

if(!window.Typekit)window.Typekit={};window.Typekit.config={"a":"306787","c":[".tk-proxima-nova","\"proxima-nova\",sans-serif",".tk-freight-text-pro","\"freight-text-pro\",sans-serif"],"f":"//use.typekit.net/c/5920f5/1w;freight-text-pro,2,WHZ:R:i4,WHc:R:i7,WHY:R:n4;proxima-nova,2,b5x:R:i4,b5w:R:n4,bBh:R:n7/{format}{/extras*}?3bb2a6e53c9684ffdc9a98f41b5b2a62781115c6cc13a8141f0e02b9f0428b466c88a56a3f49c7b8f8cff5ec29091afecbd640383120bf3130121b6e91243ccd4f9402be371767c37f8ca9924695c546596e8624964536b302e332ef07f73548ca13d853f0f02881ce782127da42b9d0e6e2f8f9cd7118fe0f6b12a24710b03a5430cbb70dce1b153afb3bacfbd257bf98a5e6db56c91134ed154612823e06fe035f077e1700a42c798c9779f86bd8bf7ee3ae639233bc739111efce2bd543417b32fbafacbd05626c96e23792ee120cf857a4c9739efcb67e306e0dbf","fi":[139,175,176,13464,13465,13467],"fn":["freight-text-pro",["i4","i7","n4"],"proxima-nova",["i4","n4","n7"]],"ht":"tk","js":"1.12.3","k":"//use.typekit.net/{id}.js","kt":"bbt6nca","p":"//p.typekit.net/p.gif?s=1&k=bbt6nca&ht=tk&h={host}&f=139.175.176.13464.13465.13467&a=306787&_={_}","ps":1,"w":"bbt6nca"};
/*{"k":"1.12.3","auto_updating":true}*/
;(function(window,document,undefined){
    function aa(a,b,c){return a.call.apply(a.bind,arguments)}function ba(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function g(a,b,c){g=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return g.apply(null,arguments)}var ca=Date.now||function(){return+new Date};
    function da(a,b){this.oa=a;this.X=b||a;this.K=this.X.document}da.prototype.createElement=function(a,b,c){a=this.K.createElement(a);if(b)for(var d in b)b.hasOwnProperty(d)&&("style"==d?a.style.cssText=b[d]:a.setAttribute(d,b[d]));c&&a.appendChild(this.K.createTextNode(c));return a};function ea(a,b,c){a=a.K.getElementsByTagName(b)[0];a||(a=document.documentElement);a&&a.lastChild&&a.insertBefore(c,a.lastChild)}function fa(a,b){function c(){a.K.body?b():setTimeout(c,0)}c()}
    function l(a,b,c){b=b||[];c=c||[];for(var d=a.className.split(/\s+/),e=0;e<b.length;e+=1){for(var f=!1,h=0;h<d.length;h+=1)if(b[e]===d[h]){f=!0;break}f||d.push(b[e])}b=[];for(e=0;e<d.length;e+=1){f=!1;for(h=0;h<c.length;h+=1)if(d[e]===c[h]){f=!0;break}f||b.push(d[e])}a.className=b.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function ga(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return!0;return!1}
    function ha(a){if("string"===typeof a.ra)return a.ra;var b=a.X.location.protocol;"about:"==b&&(b=a.oa.location.protocol);return"https:"==b?"https:":"http:"}function ia(a,b){/^http(s)?:$/.test(b)&&(a.ra=b)}function ja(a){return a.X.location.hostname||a.oa.location.hostname}function ka(a,b,c){b=a.createElement("link",{rel:"stylesheet",href:b});var d=!1;b.onload=function(){d||(d=!0,c&&c(null))};b.onerror=function(){d||(d=!0,c&&c(Error("Stylesheet failed to load")))};ea(a,"head",b)}
    function la(a,b,c){var d=a.K.getElementsByTagName("head")[0];if(d){var e=a.createElement("script",{src:b}),f=!1;e.onload=e.onreadystatechange=function(){f||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(f=!0,c&&c(null),e.onload=e.onreadystatechange=null,"HEAD"==e.parentNode.tagName&&d.removeChild(e))};d.appendChild(e);window.setTimeout(function(){f||(f=!0,c&&c(Error("Script load timeout")))},5E3)}}function m(a){this.va=a}
    function n(a,b,c,d){this.l=null!=a?a:null;this.q=null!=b?b:null;this.P=null!=c?c:null;this.h=null!=d?d:null}var ma=/^([0-9]+)(?:[\._-]([0-9]+))?(?:[\._-]([0-9]+))?(?:[\._+-]?(.*))?$/;n.prototype.compare=function(a){return this.l>a.l||this.l===a.l&&this.q>a.q||this.l===a.l&&this.q===a.q&&this.P>a.P?1:this.l<a.l||this.l===a.l&&this.q<a.q||this.l===a.l&&this.q===a.q&&this.P<a.P?-1:0};function q(a,b){return-1===a.compare(b)}function r(a,b){return 0===a.compare(b)||1===a.compare(b)}
    function s(a,b){return 0===a.compare(b)}n.prototype.toString=function(){return[this.l,this.q||"",this.P||"",this.h||""].join("")};function u(a){a=ma.exec(a);var b=null,c=null,d=null,e=null;a&&(null!==a[1]&&a[1]&&(b=parseInt(a[1],10)),null!==a[2]&&a[2]&&(c=parseInt(a[2],10)),null!==a[3]&&a[3]&&(d=parseInt(a[3],10)),null!==a[4]&&a[4]&&(e=/^[0-9]+$/.test(a[4])?parseInt(a[4],10):a[4]));return new n(b,c,d,e)}
    function y(a,b,c,d,e,f,h,k){this.Y=a;this.w=b;this.L=c;this.T=d;this.m=e;this.g=f;this.ca=h;this.D=k}y.prototype.getName=function(){return this.Y};function na(a,b){this.b=a;this.S=b}var oa=new y("Unknown",new n,"Unknown",new n,"Unknown",new n,void 0,new m(!1));
    na.prototype.parse=function(){var a;if(-1!=this.b.indexOf("MSIE")||-1!=this.b.indexOf("Trident/")){a=z(this);var b=u(A(this)),c=null,d=null,e=null,e=B(this.b,/Trident\/([\d\w\.]+)/,1),f=C(this.S),c=-1!=this.b.indexOf("MSIE")?u(B(this.b,/MSIE ([\d\w\.]+)/,1)):u(B(this.b,/rv:([\d\w\.]+)/,1));""!=e?(d="Trident",e=u(e)):(d="Unknown",e=new n);a=new y("MSIE",c,d,e,a,b,f,new m(!1))}else if(-1!=this.b.indexOf("Opera"))a:if(a="Unknown",b=u(B(this.b,/Presto\/([\d\w\.]+)/,1)),c=u(A(this)),d=C(this.S),null!==
        b.l?a="Presto":(-1!=this.b.indexOf("Gecko")&&(a="Gecko"),b=u(B(this.b,/rv:([^\)]+)/,1))),-1!=this.b.indexOf("Opera Mini/"))f=u(B(this.b,/Opera Mini\/([\d\.]+)/,1)),a=new y("OperaMini",f,a,b,z(this),c,d,new m(!1));else{if(-1!=this.b.indexOf("Version/")&&(f=u(B(this.b,/Version\/([\d\.]+)/,1)),null!==f.l)){a=new y("Opera",f,a,b,z(this),c,d,new m(!1));break a}f=u(B(this.b,/Opera[\/ ]([\d\.]+)/,1));a=null!==f.l?new y("Opera",f,a,b,z(this),c,d,new m(!1)):new y("Opera",new n,a,b,z(this),c,d,new m(!1))}else/OPR\/[\d.]+/.test(this.b)?
        a=pa(this):/AppleWeb(K|k)it/.test(this.b)?a=pa(this):-1!=this.b.indexOf("Gecko")?(a="Unknown",b=new n,c=u(A(this)),-1!=this.b.indexOf("Firefox")?(a="Firefox",b=u(B(this.b,/Firefox\/([\d\w\.]+)/,1))):-1!=this.b.indexOf("Mozilla")&&(a="Mozilla"),d=u(B(this.b,/rv:([^\)]+)/,1)),a=new y(a,b,"Gecko",d,z(this),c,C(this.S),new m(!1))):a=oa;return a};
    function z(a){var b=B(a.b,/(iPod|iPad|iPhone|Android|Windows Phone|BB\d{2}|BlackBerry)/,1);if(""!=b)return/BB\d{2}/.test(b)&&(b="BlackBerry"),b;a=B(a.b,/(Linux|Mac_PowerPC|Macintosh|Windows|CrOS|PlayStation|CrKey)/,1);return""!=a?("Mac_PowerPC"==a?a="Macintosh":"PlayStation"==a&&(a="Linux"),a):"Unknown"}
    function A(a){var b=B(a.b,/(OS X|Windows NT|Android) ([^;)]+)/,2);if(b||(b=B(a.b,/Windows Phone( OS)? ([^;)]+)/,2))||(b=B(a.b,/(iPhone )?OS ([\d_]+)/,2)))return b;if(b=B(a.b,/(?:Linux|CrOS|CrKey) ([^;)]+)/,1))for(var b=b.split(/\s/),c=0;c<b.length;c+=1)if(/^[\d\._]+$/.test(b[c]))return b[c];return(a=B(a.b,/(BB\d{2}|BlackBerry).*?Version\/([^\s]*)/,2))?a:"Unknown"}
    function pa(a){var b=z(a),c=u(A(a)),d=u(B(a.b,/AppleWeb(?:K|k)it\/([\d\.\+]+)/,1)),e="Unknown",f=new n,f="Unknown";/OPR\/[\d.]+/.test(a.b)?e="Opera":-1!=a.b.indexOf("Chrome")||-1!=a.b.indexOf("CrMo")||-1!=a.b.indexOf("CriOS")?e="Chrome":/Silk\/\d/.test(a.b)?e="Silk":"BlackBerry"==b||"Android"==b?e="BuiltinBrowser":-1!=a.b.indexOf("PhantomJS")?e="PhantomJS":-1!=a.b.indexOf("Safari")?e="Safari":-1!=a.b.indexOf("AdobeAIR")?e="AdobeAIR":-1!=a.b.indexOf("PlayStation")&&(e="BuiltinBrowser");"BuiltinBrowser"==
    e?f="Unknown":"Silk"==e?f=B(a.b,/Silk\/([\d\._]+)/,1):"Chrome"==e?f=B(a.b,/(Chrome|CrMo|CriOS)\/([\d\.]+)/,2):-1!=a.b.indexOf("Version/")?f=B(a.b,/Version\/([\d\.\w]+)/,1):"AdobeAIR"==e?f=B(a.b,/AdobeAIR\/([\d\.]+)/,1):"Opera"==e?f=B(a.b,/OPR\/([\d.]+)/,1):"PhantomJS"==e&&(f=B(a.b,/PhantomJS\/([\d.]+)/,1));f=u(f);return new y(e,f,"AppleWebKit",d,b,c,C(a.S),new m(536>d.l||536==d.l&&11>d.q))}function B(a,b,c){return(a=a.match(b))&&a[c]?a[c]:""}function C(a){if(a.documentMode)return a.documentMode}
    function qa(a){this.Ea=a||"-"}qa.prototype.h=function(a){for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return b.join(this.Ea)};function ra(a,b){this.e=a;this.u=a.X.document.documentElement;this.$=b;this.o="wf";this.n=new qa("-");this.za=!1!==b.events;this.H=!1!==b.classes}function sa(a){if(a.H){var b=ga(a.u,a.n.h(a.o,"active")),c=[],d=[a.n.h(a.o,"loading")];b||c.push(a.n.h(a.o,"inactive"));l(a.u,c,d)}D(a,"inactive")}
    function D(a,b,c){if(a.za&&a.$[b])if(c)a.$[b](c.getName(),E(c));else a.$[b]()}function F(a,b){this.Y=a;this.ea=4;this.Z="n";var c=(b||"n4").match(/^([nio])([1-9])$/i);c&&(this.Z=c[1],this.ea=parseInt(c[2],10))}F.prototype.getName=function(){return this.Y};function E(a){return a.Z+a.ea}function G(a,b){this.e=a;this.O=b;this.p=this.e.createElement("span",{"aria-hidden":"true"},this.O)}function ta(a){ea(a.e,"body",a.p)}
    function H(a){var b;b=[];for(var c=a.Y.split(/,\s*/),d=0;d<c.length;d++){var e=c[d].replace(/['"]/g,"");-1==e.indexOf(" ")?b.push(e):b.push("'"+e+"'")}b=b.join(",");c="normal";"o"===a.Z?c="oblique":"i"===a.Z&&(c="italic");return"display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+b+";"+("font-style:"+c+";font-weight:"+(a.ea+"00")+";")}
    G.prototype.remove=function(){var a=this.p;a.parentNode&&a.parentNode.removeChild(a)};
    function ua(a,b,c,d,e,f,h,k){this.fa=a;this.Da=b;this.e=c;this.t=d;this.D=e;this.O=k||"BESbswy";this.C={};this.da=f||3E3;this.pa=h||null;this.N=this.B=this.A=null;this.A=new G(this.e,this.O);this.B=new G(this.e,this.O);this.N=new G(this.e,this.O);a=new F("serif",E(this.t));a=H(a);this.A.p.style.cssText=a;a=new F("sans-serif",E(this.t));a=H(a);this.B.p.style.cssText=a;a=new F("monospace",E(this.t));a=H(a);this.N.p.style.cssText=a;ta(this.A);ta(this.B);ta(this.N);this.C.serif=this.A.p.offsetWidth;this.C["sans-serif"]=
        this.B.p.offsetWidth;this.C.monospace=this.N.p.offsetWidth}var I={Ra:"serif",Qa:"sans-serif",Na:"monospace"};ua.prototype.start=function(){this.Ia=ca();var a=new F(this.t.getName()+",serif",E(this.t)),a=H(a);this.A.p.style.cssText=a;a=new F(this.t.getName()+",sans-serif",E(this.t));a=H(a);this.B.p.style.cssText=a;va(this)};function wa(a,b,c){for(var d in I)if(I.hasOwnProperty(d)&&b===a.C[I[d]]&&c===a.C[I[d]])return!0;return!1}
    function va(a){var b=a.A.p.offsetWidth,c=a.B.p.offsetWidth;b===a.C.serif&&c===a.C["sans-serif"]||a.D.va&&wa(a,b,c)?ca()-a.Ia>=a.da?a.D.va&&wa(a,b,c)&&(null===a.pa||a.pa.hasOwnProperty(a.t.getName()))?xa(a,a.fa):xa(a,a.Da):ya(a):xa(a,a.fa)}function ya(a){setTimeout(g(function(){va(this)},a),50)}function xa(a,b){a.A.remove();a.B.remove();a.N.remove();b(a.t)}function za(a,b,c,d){this.e=b;this.F=c;this.ba=0;this.ua=this.na=!1;this.da=d;this.D=a.D}
    za.prototype.Aa=function(a){var b=this.F;b.H&&l(b.u,[b.n.h(b.o,a.getName(),E(a).toString(),"active")],[b.n.h(b.o,a.getName(),E(a).toString(),"loading"),b.n.h(b.o,a.getName(),E(a).toString(),"inactive")]);D(b,"fontactive",a);this.ua=!0;Aa(this)};
    za.prototype.Ba=function(a){var b=this.F;if(b.H){var c=ga(b.u,b.n.h(b.o,a.getName(),E(a).toString(),"active")),d=[],e=[b.n.h(b.o,a.getName(),E(a).toString(),"loading")];c||d.push(b.n.h(b.o,a.getName(),E(a).toString(),"inactive"));l(b.u,d,e)}D(b,"fontinactive",a);Aa(this)};function Aa(a){0==--a.ba&&a.na&&(a.ua?(a=a.F,a.H&&l(a.u,[a.n.h(a.o,"active")],[a.n.h(a.o,"loading"),a.n.h(a.o,"inactive")]),D(a,"active")):sa(a.F))}function J(){this.I=this.Q=-1}J.prototype.now=function(){return(new Date).getTime()};
    J.prototype.start=function(){this.Q=this.now();this.I=-1};J.prototype.stop=function(){this.I=this.now()};function Ba(){var a=[{name:"font-family",value:K.c[L+1]}];this.Ga=[K.c[L]];this.ia=a}function Ca(a){for(var b=a.Ga.join(","),c=[],d=0;d<a.ia.length;d++){var e=a.ia[d];c.push(e.name+":"+e.value+";")}return b+"{"+c.join("")+"}"}function Da(a){this.e=a}Da.prototype.toString=function(){return encodeURIComponent(ja(this.e))};function Ea(a,b){this.r=a;this.s=b}
    Ea.prototype.toString=function(){for(var a=[],b=0;b<this.s.length;b++)for(var c=this.s[b],d=c.G(),c=c.G(this.r),e=0;e<d.length;e++){var f;a:{for(f=0;f<c.length;f++)if(d[e]===c[f]){f=!0;break a}f=!1}a.push(f?1:0)}a=a.join("");a=a.replace(/^0+/,"");b=[];for(d=a.length;0<d;d-=4)b.unshift(parseInt(a.slice(0>d-4?0:d-4,d),2).toString(16));return b.join("")};function M(a){this.Ka=a}
    M.prototype.h=function(a,b){var c=b||{},d=this.Ka.replace(/\{\/?([^*}]*)(\*?)\}/g,function(a,b,d){return d&&c[b]?"/"+c[b].join("/"):c[b]||""});d.match(/^\/\//)&&(d=(a?"https:":"http:")+d);return d.replace(/\/*\?*($|\?)/,"$1")};function Fa(a,b){for(var c=[],d=0;d<b.length;d++)c.push(b[d].toString());return{format:a,extras:c}}function Ga(a,b){this.M=a;this.V=b;this.ka={};this.ja={}}Ga.prototype.G=function(a){return a?(this.ka[a]||this.V).slice(0):this.V.slice(0)};
    function Ha(a,b,c){for(var d=[],e=a.M.split(",")[0].replace(/"|'/g,""),f=a.G(),h,k=[],v={},p=0;p<f.length;p++)h=f[p],0<h.length&&!v[h]&&(v[h]=!0,k.push(h));c=c.ta?c.ta(e,k,d):k;a.ka[b]=c;a.ja[b]=d}function Ia(a,b){for(var c=a.G(b),d=a.ja[b]||[],e=[],f=0;f<c.length;f++)e.push(new F(a.M,c[f]));for(f=0;f<d.length;f++)if(c=d[f].M,c!==a.M)for(var h=d[f].G(),k=0;k<h.length;k++)e.push(new F(c,h[k]));return e}function Ja(a,b){this.M=a;this.V=b}Ja.prototype.G=function(){return this.V};
    function La(a,b,c,d,e,f){this.Ha=a;this.Ca=b;this.U=c||[];this.xa=d||null;this.Ja=e||null;this.version=f||null}
    La.prototype.send=function(a,b,c){var d=new M("//p.typekit.net/p.gif?s={service}&k={token}&app={app}&ht={hosting}&h={host}&f={variations}&a={account}&sl={stylesheetLoadTime}&fl={fontLoadTime}&js={version}&_={_}"),e=encodeURIComponent((window.__adobewebfontsappname__||"").toString().substr(0,20)),f=encodeURIComponent(ja(a)),h=[],k=[];window.Typekit.fonts||(window.Typekit.fonts=[]);for(var k=window.Typekit.fonts,v=0;v<this.U.length;v++){for(var p=!1,x=0;x<k.length;x++)if(this.U[v]===k[x]){p=!0;break}p||
    (h.push(this.U[v]),k.push(this.U[v]))}h.length&&Ma(d.h("https:"===ha(a),{service:this.Ha,token:this.Ja,app:e,hosting:this.Ca,host:f,variations:h.join("."),account:this.xa,stylesheetLoadTime:b,fontLoadTime:c,version:this.version,_:(+new Date).toString()}))};function Ma(a){var b=new Image(1,1),c=!1;b.src=a;b.onload=function(){c=!0;b.onload=null};setTimeout(function(){c||(b.src="about:blank",b.onload=null)},3E3)}function Na(){this.ga=this.wa=this.J=this.W=this.ma=!0}
    function N(a){return"Windows"===a.m}function O(a){return N(a)&&s(a.g,new n(5,1))||N(a)&&s(a.g,new n(5,2))||N(a)&&s(a.g,new n(6,0))||N(a)&&r(a.g,new n(6,1))}function P(a){return"Macintosh"===a.m&&(r(a.g,new n(10,4))||null===a.g.l)}function Oa(a,b){return b.ma&&("iPhone"===a.m||"iPod"===a.m)}function Pa(a,b){return Oa(a,b)&&r(a.g,new n(4,2))&&q(a.g,new n(5))}function Qa(a,b){return b.W&&"iPad"===a.m&&r(a.g,new n(4,2))&&q(a.g,new n(5))}function Q(a,b){return b.J&&"Android"===a.m}
    function Ra(a,b){return Q(a,b)&&r(a.g,new n(2,2))&&q(a.g,new n(3,1))}function Sa(a,b){return Q(a,b)&&r(a.g,new n(3,1))&&q(a.g,new n(4,1))}function S(a){return"Linux"===a.m||"Ubuntu"===a.m}function Ta(a){return"Safari"===a.getName()&&"AppleWebKit"===a.L||"Unknown"===a.getName()&&"AppleWebKit"===a.L&&("iPhone"===a.m||"iPad"===a.m||"iPod"===a.m)}function Ua(a){return"BuiltinBrowser"===a.getName()}function Va(a){this.ta=a}function Wa(a,b){return b}
    var T={Oa:"a",Sa:"d",Ma:"i",Pa:"j",La:"k",NONE:"x"},U={a:function(a,b){return"Safari"===a.getName()&&"AppleWebKit"===a.L&&r(a.T,new n(525,13))&&q(a.T,new n(534,50))&&(O(a)||P(a))||Ua(a)&&(Ra(a,b)||Q(a,b)&&r(a.g,new n(4,1)))||b.J&&"Silk"===a.getName()&&q(a.w,new n(2))&&(Ra(a,b)||P)||b.J&&"Silk"===a.getName()&&r(a.w,new n(2))&&Q(a,b)&&r(a.g,new n(4,1))||Ta(a)&&(Qa(a,b)||Pa(a,b))||"Chrome"===a.getName()&&r(a.w,new n(6))&&(Qa(a,b)||Pa(a,b))||"AdobeAIR"===a.getName()&&r(a.w,new n(2,5))&&(N(a)&&null===
        a.g.l||S(a)||P(a))},d:function(a,b){return"Chrome"===a.getName()&&r(a.w,new n(6))&&(O(a)||S(a)||P(a)||Q(a,b)||"CrOS"===a.m||"CrKey"===a.m||b.W&&"iPad"===a.m&&r(a.g,new n(5))||Oa(a,b)&&r(a.g,new n(5)))||"Gecko"===a.L&&1===a.T.compare(new n(1,9,1))&&(O(a)||S(a)||P(a)||Q(a,b))||"Safari"===a.getName()&&"AppleWebKit"===a.L&&r(a.T,new n(534,50))&&(O(a)||P(a))||Ta(a)&&(b.W&&"iPad"===a.m&&r(a.g,new n(5))||Oa(a,b)&&r(a.g,new n(5)))||"Opera"===a.getName()&&r(a.w,new n(11,10))&&(O(a)||S(a)||P(a)||Q(a,b))||"MSIE"===
        a.getName()&&9<=a.ca&&(N(a)&&r(a.g,new n(6,1))||N(a)&&s(a.g,new n(6,0)))||"MSIE"===a.getName()&&b.wa&&"Windows Phone"===a.m&&r(a.g,new n(8))||Ua(a)&&(b.ga&&"BlackBerry"===a.m&&r(a.g,new n(10))||S(a))},j:function(a,b){return Ua(a)&&Sa(a,b)||b.J&&"Silk"===a.getName()&&r(a.w,new n(2))&&(Sa(a,b)||S(a))},i:function(a){return"MSIE"===a.getName()&&r(a.w,new n(6,0))&&(void 0===a.ca||9>a.ca)&&O(a)},x:function(){return!1}},Xa={};
    Xa.i=new Va(function(a,b,c){for(var d=0;d<b.length;d+=1){var e=b[d],f;f=e;f=a.replace(/(-1|-2)$/,"").slice(0,28)+"-"+f;c.push(new Ja(f,[e]))}a={};for(e=0;e<b.length;e++)c=b[e],d=c.charAt(1),(a[d]||(a[d]=[])).push(c);c=[[4,3,2,1,5,6,7,8,9],[7,8,9,6,5,4,3,2,1]];d=[];for(e=0;e<c.length;e++){f=c[e];for(var h=0;h<f.length;h++){var k=f[h];if(a[k]){d=d.concat(a[k]);break}}}c=d;d={};a=[];for(e=0;e<c.length;e++)f=c[e],d[f]||(d[f]=!0,a.push(f));c=[];for(d=0;d<b.length;d++)for(e=b[d],f=0;f<a.length;f++)h=a[f],
    h==e&&c.push(h);return c});var V={};V.a=V.d=V.j=function(){return[]};V.i=function(a,b,c){return[new Da(a),new Ea(b,c)]};V.k=function(a){return[new Da(a)]};function Ya(a,b,c){return V[b](a,b,c)}function W(a){this.e=a;this.r="x";this.ha=this.b=null;this.s=[];this.R=[];this.la=this.aa=null}W.prototype.supportsConfiguredBrowser=function(){return"x"!==this.r};
    W.prototype.init=function(){if(0<this.R.length){for(var a=[],b=0;b<this.R.length;b++)a.push(Ca(this.R[b]));var b=this.e,a=a.join(""),c=this.e.createElement("style");c.setAttribute("type","text/css");c.styleSheet?c.styleSheet.cssText=a:c.appendChild(document.createTextNode(a));ea(b,"head",c)}};
    W.prototype.load=function(a,b,c){function d(){}var e=this,f=c||{},h=f.contextPath||".",k=f.hostname||this.la;a=f.timeout;c=!1!==f.events;var v=null,p=new J,x=new J;f.active&&(d=f.active);f.active=function(){x.stop();e.qa&&e.qa.send(e.e,-1!==p.Q&&-1!==p.I?p.I-p.Q:-1,-1!==x.Q&&-1!==x.I?x.I-x.Q:-1);d()};v=new ra(this.e,f);if(this.r){for(var f=Xa[this.r]||new Va(Wa),w=0;w<this.s.length;w++)Ha(this.s[w],this.r,f);this.aa&&(f=Ya(this.e,this.r,this.s),f=Fa(this.r,f),f.contextPath=h,k&&(f.hostname=k),h=this.aa.h("https:"===
    ha(this.e),f),p.start(),ka(this.e,h,function(){p.stop();x.start()}));if(c){for(var R=[],Ka={},t=new za(this.b,this.e,v,a),w=0;w<this.s.length;w++)R=R.concat(Ia(this.s[w],this.r));for(w=0;w<R.length;w++)Ka[R[w].getName()]="BESbswy\ue000\ue001\ue002\ue003\ue004\ue005\ue006";fa(this.e,function(){var a=R,c={},d=Ka||{};if(0===a.length&&b)sa(t.F);else{t.ba+=a.length;b&&(t.na=b);for(var e=0;e<a.length;e++){var f=a[e],h=d[f.getName()],k=t.F,p=f;k.H&&l(k.u,[k.n.h(k.o,p.getName(),E(p).toString(),"loading")]);
        D(k,"fontloading",p);k=null;k=new ua(g(t.Aa,t),g(t.Ba,t),t.e,f,t.D,t.da,c,h);k.start()}}})}}};W.prototype.performOptionalActions=function(){};function Za(a,b,c,d){this.Fa=a;this.e=b;this.b=c;this.u=d;this.v=[]}Za.prototype.ya=function(a){this.v.push(a)};
    Za.prototype.load=function(a,b){var c=a,d=b||{};"string"==typeof c?c=[c]:c&&c.length||(d=c||{},c=[]);d.protocol&&ia(this.e,d.protocol);if(c.length)for(var e=this,f=c.length,h=0;h<c.length;h++)$a(this,c[h],function(){0==--f&&ab(e,d)});else ab(this,d)};function $a(a,b,c){b=a.Fa.h("https:"===ha(a.e),{id:encodeURIComponent(b)});la(a.e,b,c)}
    function ab(a,b){if(0!=a.v.length){for(var c=new ra(a.e,b),d=!1,e=0;e<a.v.length;e++)a.v[e].init(),d=d||a.v[e].supportsConfiguredBrowser();if(d)for(c.H&&l(c.u,[c.n.h(c.o,"loading")]),D(c,"loading"),c=0;c<a.v.length;c++)d=a.v[c],d.supportsConfiguredBrowser()&&d.load(null,c==a.v.length-1,b);else sa(c);a.v=[]}}var bb=(new na(navigator.userAgent,document)).parse(),cb=new da(window);window.Typekit||(window.Typekit={});
    if(!window.Typekit.load){var db=window.Typekit.config||{},eb=null;db.k&&(eb=new M(db.k));var X=new Za(eb,cb,bb,document.documentElement);window.Typekit.load=function(){X.load.apply(X,arguments)};window.Typekit.addKit=function(){X.ya.apply(X,arguments)}}var fb,Y,Z,K=window.Typekit.config||{};Z=new W(cb);Z.qa=new La(K.ps,K.ht,K.fi,K.a,K.kt,K.js);Y=new Na;Y.ma=!K.si;Y.W=!K.st;Y.J=!K.sa;Y.wa=!K.sw;Y.ga=!K.sb;Z.ha=Y;K.f&&(fb=new M(K.f),Z.aa=fb);K.hn&&(Z.la=K.hn);var L;
    if(K.fn)for(L=0;L<K.fn.length;L+=2)Z.s.push(new Ga(K.fn[L],K.fn[L+1]));if(K.c)for(L=0;L<K.c.length;L+=2)Z.R.push(new Ba);Z.b=bb;var gb;a:{var hb=Z.b,ib=new Na,jb=Z.ha||ib,kb;for(kb in T){var $=T[kb];if(U[$]&&U[$](hb,jb)){gb=$;break a}}for(kb in T)if($=T[kb],U[$]&&U[$](hb,ib)){gb="x";break a}gb="k"}Z.r=gb;window.Typekit.addKit(Z);if(window.WebFont)try{window.Typekit.load()}catch(lb){};
})(this,document);
(function() {


}).call(this);
(function () {
    $(function () {
        return $(".contact-form").each(function () {
            var $this, requiredFields, validate;
            return $this = $(this), validate = function (field) {
                return "" !== field.val().trim() ? (field.removeClass("is-invalid"), !0) : (field.addClass("is-invalid"), !1)
            }, requiredFields = $this.find(".js-required"), requiredFields.each(function () {
                return $(this).on("blur change", function () {
                    return validate($(this))
                })
            }), $this.on("submit", function (e) {
                var bad, field, _i, _len;
                for (bad = null, _i = 0, _len = requiredFields.length; _len > _i; _i++)field = requiredFields[_i], validate($(field)) || (null == bad && (bad = field), e.preventDefault());
                return bad ? $(document).slideTo(bad, {
                    offset: -24, onAfter: function () {
                        return bad.focus()
                    }
                }) : void 0
            }), $this.find("select").heapbox({effect: {type: "standard"}})
        })
    })
}).call(this), function () {
}.call(this);
(function() {


}).call(this);
(function() {


}).call(this);
// │ Copyright © 2008-2012 Dmitry Baranovskiy (http://raphaeljs.com)    │ \\
// │ Copyright © 2008-2012 Sencha Labs (http://sencha.com)              │ \\
// Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
!function(glob){var current_event,stop,version="0.4.2",has="hasOwnProperty",separator=/[\.\/]/,wildcard="*",fun=function(){},numsort=function(a,b){return a-b},events={n:{}},eve=function(name,scope){name=String(name);var l,oldstop=stop,args=Array.prototype.slice.call(arguments,2),listeners=eve.listeners(name),z=0,indexed=[],queue={},out=[],ce=current_event;current_event=name,stop=0;for(var i=0,ii=listeners.length;ii>i;i++)"zIndex"in listeners[i]&&(indexed.push(listeners[i].zIndex),listeners[i].zIndex<0&&(queue[listeners[i].zIndex]=listeners[i]));for(indexed.sort(numsort);indexed[z]<0;)if(l=queue[indexed[z++]],out.push(l.apply(scope,args)),stop)return stop=oldstop,out;for(i=0;ii>i;i++)if(l=listeners[i],"zIndex"in l)if(l.zIndex==indexed[z]){if(out.push(l.apply(scope,args)),stop)break;do if(z++,l=queue[indexed[z]],l&&out.push(l.apply(scope,args)),stop)break;while(l)}else queue[l.zIndex]=l;else if(out.push(l.apply(scope,args)),stop)break;return stop=oldstop,current_event=ce,out.length?out:null};eve._events=events,eve.listeners=function(name){var item,items,k,i,ii,j,jj,nes,names=name.split(separator),e=events,es=[e],out=[];for(i=0,ii=names.length;ii>i;i++){for(nes=[],j=0,jj=es.length;jj>j;j++)for(e=es[j].n,items=[e[names[i]],e[wildcard]],k=2;k--;)item=items[k],item&&(nes.push(item),out=out.concat(item.f||[]));es=nes}return out},eve.on=function(name,f){if(name=String(name),"function"!=typeof f)return function(){};for(var names=name.split(separator),e=events,i=0,ii=names.length;ii>i;i++)e=e.n,e=e.hasOwnProperty(names[i])&&e[names[i]]||(e[names[i]]={n:{}});for(e.f=e.f||[],i=0,ii=e.f.length;ii>i;i++)if(e.f[i]==f)return fun;return e.f.push(f),function(zIndex){+zIndex==+zIndex&&(f.zIndex=+zIndex)}},eve.f=function(event){var attrs=[].slice.call(arguments,1);return function(){eve.apply(null,[event,null].concat(attrs).concat([].slice.call(arguments,0)))}},eve.stop=function(){stop=1},eve.nt=function(subname){return subname?new RegExp("(?:\\.|\\/|^)"+subname+"(?:\\.|\\/|$)").test(current_event):current_event},eve.nts=function(){return current_event.split(separator)},eve.off=eve.unbind=function(name,f){if(!name)return void(eve._events=events={n:{}});var e,key,splice,i,ii,j,jj,names=name.split(separator),cur=[events];for(i=0,ii=names.length;ii>i;i++)for(j=0;j<cur.length;j+=splice.length-2){if(splice=[j,1],e=cur[j].n,names[i]!=wildcard)e[names[i]]&&splice.push(e[names[i]]);else for(key in e)e[has](key)&&splice.push(e[key]);cur.splice.apply(cur,splice)}for(i=0,ii=cur.length;ii>i;i++)for(e=cur[i];e.n;){if(f){if(e.f){for(j=0,jj=e.f.length;jj>j;j++)if(e.f[j]==f){e.f.splice(j,1);break}!e.f.length&&delete e.f}for(key in e.n)if(e.n[has](key)&&e.n[key].f){var funcs=e.n[key].f;for(j=0,jj=funcs.length;jj>j;j++)if(funcs[j]==f){funcs.splice(j,1);break}!funcs.length&&delete e.n[key].f}}else{delete e.f;for(key in e.n)e.n[has](key)&&e.n[key].f&&delete e.n[key].f}e=e.n}},eve.once=function(name,f){var f2=function(){return eve.unbind(name,f2),f.apply(this,arguments)};return eve.on(name,f2)},eve.version=version,eve.toString=function(){return"You are running Eve "+version},"undefined"!=typeof module&&module.exports?module.exports=eve:"undefined"!=typeof define?define("eve",[],function(){return eve}):glob.eve=eve}(this),// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://raphaeljs.com)   │ \\
// │ Copyright (c) 2008-2011 Sencha Labs (http://sencha.com)             │ \\
    function(glob,factory){"function"==typeof define&&define.amd?define(["eve"],function(eve){return factory(glob,eve)}):factory(glob,glob.eve)}(this,function(window,eve){function R(first){if(R.is(first,"function"))return loaded?first():eve.on("raphael.DOMload",first);if(R.is(first,array))return R._engine.create[apply](R,first.splice(0,3+R.is(first[0],nu))).add(first);var args=Array.prototype.slice.call(arguments,0);if(R.is(args[args.length-1],"function")){var f=args.pop();return loaded?f.call(R._engine.create[apply](R,args)):eve.on("raphael.DOMload",function(){f.call(R._engine.create[apply](R,args))})}return R._engine.create[apply](R,arguments)}function clone(obj){if("function"==typeof obj||Object(obj)!==obj)return obj;var res=new obj.constructor;for(var key in obj)obj[has](key)&&(res[key]=clone(obj[key]));return res}function repush(array,item){for(var i=0,ii=array.length;ii>i;i++)if(array[i]===item)return array.push(array.splice(i,1)[0])}function cacher(f,scope,postprocessor){function newf(){var arg=Array.prototype.slice.call(arguments,0),args=arg.join("\u2400"),cache=newf.cache=newf.cache||{},count=newf.count=newf.count||[];return cache[has](args)?(repush(count,args),postprocessor?postprocessor(cache[args]):cache[args]):(count.length>=1e3&&delete cache[count.shift()],count.push(args),cache[args]=f[apply](scope,arg),postprocessor?postprocessor(cache[args]):cache[args])}return newf}function clrToString(){return this.hex}function catmullRom2bezier(crp,z){for(var d=[],i=0,iLen=crp.length;iLen-2*!z>i;i+=2){var p=[{x:+crp[i-2],y:+crp[i-1]},{x:+crp[i],y:+crp[i+1]},{x:+crp[i+2],y:+crp[i+3]},{x:+crp[i+4],y:+crp[i+5]}];z?i?iLen-4==i?p[3]={x:+crp[0],y:+crp[1]}:iLen-2==i&&(p[2]={x:+crp[0],y:+crp[1]},p[3]={x:+crp[2],y:+crp[3]}):p[0]={x:+crp[iLen-2],y:+crp[iLen-1]}:iLen-4==i?p[3]=p[2]:i||(p[0]={x:+crp[i],y:+crp[i+1]}),d.push(["C",(-p[0].x+6*p[1].x+p[2].x)/6,(-p[0].y+6*p[1].y+p[2].y)/6,(p[1].x+6*p[2].x-p[3].x)/6,(p[1].y+6*p[2].y-p[3].y)/6,p[2].x,p[2].y])}return d}function base3(t,p1,p2,p3,p4){var t1=-3*p1+9*p2-9*p3+3*p4,t2=t*t1+6*p1-12*p2+6*p3;return t*t2-3*p1+3*p2}function bezlen(x1,y1,x2,y2,x3,y3,x4,y4,z){null==z&&(z=1),z=z>1?1:0>z?0:z;for(var z2=z/2,n=12,Tvalues=[-.1252,.1252,-.3678,.3678,-.5873,.5873,-.7699,.7699,-.9041,.9041,-.9816,.9816],Cvalues=[.2491,.2491,.2335,.2335,.2032,.2032,.1601,.1601,.1069,.1069,.0472,.0472],sum=0,i=0;n>i;i++){var ct=z2*Tvalues[i]+z2,xbase=base3(ct,x1,x2,x3,x4),ybase=base3(ct,y1,y2,y3,y4),comb=xbase*xbase+ybase*ybase;sum+=Cvalues[i]*math.sqrt(comb)}return z2*sum}function getTatLen(x1,y1,x2,y2,x3,y3,x4,y4,ll){if(!(0>ll||bezlen(x1,y1,x2,y2,x3,y3,x4,y4)<ll)){var l,t=1,step=t/2,t2=t-step,e=.01;for(l=bezlen(x1,y1,x2,y2,x3,y3,x4,y4,t2);abs(l-ll)>e;)step/=2,t2+=(ll>l?1:-1)*step,l=bezlen(x1,y1,x2,y2,x3,y3,x4,y4,t2);return t2}}function intersect(x1,y1,x2,y2,x3,y3,x4,y4){if(!(mmax(x1,x2)<mmin(x3,x4)||mmin(x1,x2)>mmax(x3,x4)||mmax(y1,y2)<mmin(y3,y4)||mmin(y1,y2)>mmax(y3,y4))){var nx=(x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4),ny=(x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4),denominator=(x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);if(denominator){var px=nx/denominator,py=ny/denominator,px2=+px.toFixed(2),py2=+py.toFixed(2);if(!(px2<+mmin(x1,x2).toFixed(2)||px2>+mmax(x1,x2).toFixed(2)||px2<+mmin(x3,x4).toFixed(2)||px2>+mmax(x3,x4).toFixed(2)||py2<+mmin(y1,y2).toFixed(2)||py2>+mmax(y1,y2).toFixed(2)||py2<+mmin(y3,y4).toFixed(2)||py2>+mmax(y3,y4).toFixed(2)))return{x:px,y:py}}}}function interHelper(bez1,bez2,justCount){var bbox1=R.bezierBBox(bez1),bbox2=R.bezierBBox(bez2);if(!R.isBBoxIntersect(bbox1,bbox2))return justCount?0:[];for(var l1=bezlen.apply(0,bez1),l2=bezlen.apply(0,bez2),n1=mmax(~~(l1/5),1),n2=mmax(~~(l2/5),1),dots1=[],dots2=[],xy={},res=justCount?0:[],i=0;n1+1>i;i++){var p=R.findDotsAtSegment.apply(R,bez1.concat(i/n1));dots1.push({x:p.x,y:p.y,t:i/n1})}for(i=0;n2+1>i;i++)p=R.findDotsAtSegment.apply(R,bez2.concat(i/n2)),dots2.push({x:p.x,y:p.y,t:i/n2});for(i=0;n1>i;i++)for(var j=0;n2>j;j++){var di=dots1[i],di1=dots1[i+1],dj=dots2[j],dj1=dots2[j+1],ci=abs(di1.x-di.x)<.001?"y":"x",cj=abs(dj1.x-dj.x)<.001?"y":"x",is=intersect(di.x,di.y,di1.x,di1.y,dj.x,dj.y,dj1.x,dj1.y);if(is){if(xy[is.x.toFixed(4)]==is.y.toFixed(4))continue;xy[is.x.toFixed(4)]=is.y.toFixed(4);var t1=di.t+abs((is[ci]-di[ci])/(di1[ci]-di[ci]))*(di1.t-di.t),t2=dj.t+abs((is[cj]-dj[cj])/(dj1[cj]-dj[cj]))*(dj1.t-dj.t);t1>=0&&1.001>=t1&&t2>=0&&1.001>=t2&&(justCount?res++:res.push({x:is.x,y:is.y,t1:mmin(t1,1),t2:mmin(t2,1)}))}}return res}function interPathHelper(path1,path2,justCount){path1=R._path2curve(path1),path2=R._path2curve(path2);for(var x1,y1,x2,y2,x1m,y1m,x2m,y2m,bez1,bez2,res=justCount?0:[],i=0,ii=path1.length;ii>i;i++){var pi=path1[i];if("M"==pi[0])x1=x1m=pi[1],y1=y1m=pi[2];else{"C"==pi[0]?(bez1=[x1,y1].concat(pi.slice(1)),x1=bez1[6],y1=bez1[7]):(bez1=[x1,y1,x1,y1,x1m,y1m,x1m,y1m],x1=x1m,y1=y1m);for(var j=0,jj=path2.length;jj>j;j++){var pj=path2[j];if("M"==pj[0])x2=x2m=pj[1],y2=y2m=pj[2];else{"C"==pj[0]?(bez2=[x2,y2].concat(pj.slice(1)),x2=bez2[6],y2=bez2[7]):(bez2=[x2,y2,x2,y2,x2m,y2m,x2m,y2m],x2=x2m,y2=y2m);var intr=interHelper(bez1,bez2,justCount);if(justCount)res+=intr;else{for(var k=0,kk=intr.length;kk>k;k++)intr[k].segment1=i,intr[k].segment2=j,intr[k].bez1=bez1,intr[k].bez2=bez2;res=res.concat(intr)}}}}}return res}function Matrix(a,b,c,d,e,f){null!=a?(this.a=+a,this.b=+b,this.c=+c,this.d=+d,this.e=+e,this.f=+f):(this.a=1,this.b=0,this.c=0,this.d=1,this.e=0,this.f=0)}function x_y_w_h(){return this.x+S+this.y+S+this.width+" \xd7 "+this.height}function CubicBezierAtTime(t,p1x,p1y,p2x,p2y,duration){function sampleCurveX(t){return((ax*t+bx)*t+cx)*t}function solve(x,epsilon){var t=solveCurveX(x,epsilon);return((ay*t+by)*t+cy)*t}function solveCurveX(x,epsilon){var t0,t1,t2,x2,d2,i;for(t2=x,i=0;8>i;i++){if(x2=sampleCurveX(t2)-x,abs(x2)<epsilon)return t2;if(d2=(3*ax*t2+2*bx)*t2+cx,abs(d2)<1e-6)break;t2-=x2/d2}if(t0=0,t1=1,t2=x,t0>t2)return t0;if(t2>t1)return t1;for(;t1>t0;){if(x2=sampleCurveX(t2),abs(x2-x)<epsilon)return t2;x>x2?t0=t2:t1=t2,t2=(t1-t0)/2+t0}return t2}var cx=3*p1x,bx=3*(p2x-p1x)-cx,ax=1-cx-bx,cy=3*p1y,by=3*(p2y-p1y)-cy,ay=1-cy-by;return solve(t,1/(200*duration))}function Animation(anim,ms){var percents=[],newAnim={};if(this.ms=ms,this.times=1,anim){for(var attr in anim)anim[has](attr)&&(newAnim[toFloat(attr)]=anim[attr],percents.push(toFloat(attr)));percents.sort(sortByNumber)}this.anim=newAnim,this.top=percents[percents.length-1],this.percents=percents}function runAnimation(anim,element,percent,status,totalOrigin,times){percent=toFloat(percent);var params,isInAnim,isInAnimSet,next,prev,timestamp,ms=anim.ms,from={},to={},diff={};if(status)for(i=0,ii=animationElements.length;ii>i;i++){var e=animationElements[i];if(e.el.id==element.id&&e.anim==anim){e.percent!=percent?(animationElements.splice(i,1),isInAnimSet=1):isInAnim=e,element.attr(e.totalOrigin);break}}else status=+to;for(var i=0,ii=anim.percents.length;ii>i;i++){if(anim.percents[i]==percent||anim.percents[i]>status*anim.top){percent=anim.percents[i],prev=anim.percents[i-1]||0,ms=ms/anim.top*(percent-prev),next=anim.percents[i+1],params=anim.anim[percent];break}status&&element.attr(anim.anim[anim.percents[i]])}if(params){if(isInAnim)isInAnim.initstatus=status,isInAnim.start=new Date-isInAnim.ms*status;else{for(var attr in params)if(params[has](attr)&&(availableAnimAttrs[has](attr)||element.paper.customAttributes[has](attr)))switch(from[attr]=element.attr(attr),null==from[attr]&&(from[attr]=availableAttrs[attr]),to[attr]=params[attr],availableAnimAttrs[attr]){case nu:diff[attr]=(to[attr]-from[attr])/ms;break;case"colour":from[attr]=R.getRGB(from[attr]);var toColour=R.getRGB(to[attr]);diff[attr]={r:(toColour.r-from[attr].r)/ms,g:(toColour.g-from[attr].g)/ms,b:(toColour.b-from[attr].b)/ms};break;case"path":var pathes=path2curve(from[attr],to[attr]),toPath=pathes[1];for(from[attr]=pathes[0],diff[attr]=[],i=0,ii=from[attr].length;ii>i;i++){diff[attr][i]=[0];for(var j=1,jj=from[attr][i].length;jj>j;j++)diff[attr][i][j]=(toPath[i][j]-from[attr][i][j])/ms}break;case"transform":var _=element._,eq=equaliseTransform(_[attr],to[attr]);if(eq)for(from[attr]=eq.from,to[attr]=eq.to,diff[attr]=[],diff[attr].real=!0,i=0,ii=from[attr].length;ii>i;i++)for(diff[attr][i]=[from[attr][i][0]],j=1,jj=from[attr][i].length;jj>j;j++)diff[attr][i][j]=(to[attr][i][j]-from[attr][i][j])/ms;else{var m=element.matrix||new Matrix,to2={_:{transform:_.transform},getBBox:function(){return element.getBBox(1)}};from[attr]=[m.a,m.b,m.c,m.d,m.e,m.f],extractTransform(to2,to[attr]),to[attr]=to2._.transform,diff[attr]=[(to2.matrix.a-m.a)/ms,(to2.matrix.b-m.b)/ms,(to2.matrix.c-m.c)/ms,(to2.matrix.d-m.d)/ms,(to2.matrix.e-m.e)/ms,(to2.matrix.f-m.f)/ms]}break;case"csv":var values=Str(params[attr])[split](separator),from2=Str(from[attr])[split](separator);if("clip-rect"==attr)for(from[attr]=from2,diff[attr]=[],i=from2.length;i--;)diff[attr][i]=(values[i]-from[attr][i])/ms;to[attr]=values;break;default:for(values=[][concat](params[attr]),from2=[][concat](from[attr]),diff[attr]=[],i=element.paper.customAttributes[attr].length;i--;)diff[attr][i]=((values[i]||0)-(from2[i]||0))/ms}var easing=params.easing,easyeasy=R.easing_formulas[easing];if(!easyeasy)if(easyeasy=Str(easing).match(bezierrg),easyeasy&&5==easyeasy.length){var curve=easyeasy;easyeasy=function(t){return CubicBezierAtTime(t,+curve[1],+curve[2],+curve[3],+curve[4],ms)}}else easyeasy=pipe;if(timestamp=params.start||anim.start||+new Date,e={anim:anim,percent:percent,timestamp:timestamp,start:timestamp+(anim.del||0),status:0,initstatus:status||0,stop:!1,ms:ms,easing:easyeasy,from:from,diff:diff,to:to,el:element,callback:params.callback,prev:prev,next:next,repeat:times||anim.times,origin:element.attr(),totalOrigin:totalOrigin},animationElements.push(e),status&&!isInAnim&&!isInAnimSet&&(e.stop=!0,e.start=new Date-ms*status,1==animationElements.length))return animation();isInAnimSet&&(e.start=new Date-e.ms*status),1==animationElements.length&&requestAnimFrame(animation)}eve("raphael.anim.start."+element.id,element,anim)}}function stopAnimation(paper){for(var i=0;i<animationElements.length;i++)animationElements[i].el.paper==paper&&animationElements.splice(i--,1)}R.version="2.1.0",R.eve=eve;var loaded,paperproto,separator=/[, ]+/,elements={circle:1,rect:1,path:1,ellipse:1,text:1,image:1},formatrg=/\{(\d+)\}/g,has="hasOwnProperty",g={doc:document,win:window},oldRaphael={was:Object.prototype[has].call(g.win,"Raphael"),is:g.win.Raphael},Paper=function(){this.ca=this.customAttributes={}},apply="apply",concat="concat",supportsTouch="ontouchstart"in g.win||g.win.DocumentTouch&&g.doc instanceof DocumentTouch,E="",S=" ",Str=String,split="split",events="click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[split](S),touchMap={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"},lowerCase=Str.prototype.toLowerCase,math=Math,mmax=math.max,mmin=math.min,abs=math.abs,pow=math.pow,PI=math.PI,nu="number",string="string",array="array",objectToString=Object.prototype.toString,colourRegExp=(R._ISURL=/^url\(['"]?([^\)]+?)['"]?\)$/i,/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i),isnan={NaN:1,Infinity:1,"-Infinity":1},bezierrg=/^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,round=math.round,toFloat=parseFloat,toInt=parseInt,upperCase=Str.prototype.toUpperCase,availableAttrs=R._availableAttrs={"arrow-end":"none","arrow-start":"none",blur:0,"clip-rect":"0 0 1e9 1e9",cursor:"default",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"http://raphaeljs.com/","letter-spacing":0,opacity:1,path:"M0,0",r:0,rx:0,ry:0,src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt","stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",title:"Raphael",transform:"",width:0,x:0,y:0},availableAnimAttrs=R._availableAnimAttrs={blur:nu,"clip-rect":"csv",cx:nu,cy:nu,fill:"colour","fill-opacity":nu,"font-size":nu,height:nu,opacity:nu,path:"path",r:nu,rx:nu,ry:nu,stroke:"colour","stroke-opacity":nu,"stroke-width":nu,transform:"transform",width:nu,x:nu,y:nu},commaSpaces=/[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,hsrg={hs:1,rg:1},p2s=/,?([achlmqrstvxz]),?/gi,pathCommand=/([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,tCommand=/([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,pathValues=/(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi,eldata=(R._radial_gradient=/^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,{}),sortByNumber=function(a,b){return toFloat(a)-toFloat(b)},fun=function(){},pipe=function(x){return x},rectPath=R._rectPath=function(x,y,w,h,r){return r?[["M",x+r,y],["l",w-2*r,0],["a",r,r,0,0,1,r,r],["l",0,h-2*r],["a",r,r,0,0,1,-r,r],["l",2*r-w,0],["a",r,r,0,0,1,-r,-r],["l",0,2*r-h],["a",r,r,0,0,1,r,-r],["z"]]:[["M",x,y],["l",w,0],["l",0,h],["l",-w,0],["z"]]},ellipsePath=function(x,y,rx,ry){return null==ry&&(ry=rx),[["M",x,y],["m",0,-ry],["a",rx,ry,0,1,1,0,2*ry],["a",rx,ry,0,1,1,0,-2*ry],["z"]]},getPath=R._getPath={path:function(el){return el.attr("path")},circle:function(el){var a=el.attrs;return ellipsePath(a.cx,a.cy,a.r)},ellipse:function(el){var a=el.attrs;return ellipsePath(a.cx,a.cy,a.rx,a.ry)},rect:function(el){var a=el.attrs;return rectPath(a.x,a.y,a.width,a.height,a.r)},image:function(el){var a=el.attrs;return rectPath(a.x,a.y,a.width,a.height)},text:function(el){var bbox=el._getBBox();return rectPath(bbox.x,bbox.y,bbox.width,bbox.height)},set:function(el){var bbox=el._getBBox();return rectPath(bbox.x,bbox.y,bbox.width,bbox.height)}},mapPath=R.mapPath=function(path,matrix){if(!matrix)return path;var x,y,i,j,ii,jj,pathi;for(path=path2curve(path),i=0,ii=path.length;ii>i;i++)for(pathi=path[i],j=1,jj=pathi.length;jj>j;j+=2)x=matrix.x(pathi[j],pathi[j+1]),y=matrix.y(pathi[j],pathi[j+1]),pathi[j]=x,pathi[j+1]=y;return path};if(R._g=g,R.type=g.win.SVGAngle||g.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML","VML"==R.type){var b,d=g.doc.createElement("div");if(d.innerHTML='<v:shape adj="1"/>',b=d.firstChild,b.style.behavior="url(#default#VML)",!b||"object"!=typeof b.adj)return R.type=E;d=null}R.svg=!(R.vml="VML"==R.type),R._Paper=Paper,R.fn=paperproto=Paper.prototype=R.prototype,R._id=0,R._oid=0,R.is=function(o,type){return type=lowerCase.call(type),"finite"==type?!isnan[has](+o):"array"==type?o instanceof Array:"null"==type&&null===o||type==typeof o&&null!==o||"object"==type&&o===Object(o)||"array"==type&&Array.isArray&&Array.isArray(o)||objectToString.call(o).slice(8,-1).toLowerCase()==type},R.angle=function(x1,y1,x2,y2,x3,y3){if(null==x3){var x=x1-x2,y=y1-y2;return x||y?(180+180*math.atan2(-y,-x)/PI+360)%360:0}return R.angle(x1,y1,x3,y3)-R.angle(x2,y2,x3,y3)},R.rad=function(deg){return deg%360*PI/180},R.deg=function(rad){return 180*rad/PI%360},R.snapTo=function(values,value,tolerance){if(tolerance=R.is(tolerance,"finite")?tolerance:10,R.is(values,array)){for(var i=values.length;i--;)if(abs(values[i]-value)<=tolerance)return values[i]}else{values=+values;var rem=value%values;if(tolerance>rem)return value-rem;if(rem>values-tolerance)return value-rem+values}return value};R.createUUID=function(uuidRegEx,uuidReplacer){return function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(uuidRegEx,uuidReplacer).toUpperCase()}}(/[xy]/g,function(c){var r=16*math.random()|0,v="x"==c?r:3&r|8;return v.toString(16)});R.setWindow=function(newwin){eve("raphael.setWindow",R,g.win,newwin),g.win=newwin,g.doc=g.win.document,R._engine.initWin&&R._engine.initWin(g.win)};var toHex=function(color){if(R.vml){var bod,trim=/^\s+|\s+$/g;try{var docum=new ActiveXObject("htmlfile");docum.write("<body>"),docum.close(),bod=docum.body}catch(e){bod=createPopup().document.body}var range=bod.createTextRange();toHex=cacher(function(color){try{bod.style.color=Str(color).replace(trim,E);var value=range.queryCommandValue("ForeColor");return value=(255&value)<<16|65280&value|(16711680&value)>>>16,"#"+("000000"+value.toString(16)).slice(-6)}catch(e){return"none"}})}else{var i=g.doc.createElement("i");i.title="Rapha\xebl Colour Picker",i.style.display="none",g.doc.body.appendChild(i),toHex=cacher(function(color){return i.style.color=color,g.doc.defaultView.getComputedStyle(i,E).getPropertyValue("color")})}return toHex(color)},hsbtoString=function(){return"hsb("+[this.h,this.s,this.b]+")"},hsltoString=function(){return"hsl("+[this.h,this.s,this.l]+")"},rgbtoString=function(){return this.hex},prepareRGB=function(r,g,b){if(null==g&&R.is(r,"object")&&"r"in r&&"g"in r&&"b"in r&&(b=r.b,g=r.g,r=r.r),null==g&&R.is(r,string)){var clr=R.getRGB(r);r=clr.r,g=clr.g,b=clr.b}return(r>1||g>1||b>1)&&(r/=255,g/=255,b/=255),[r,g,b]},packageRGB=function(r,g,b,o){r*=255,g*=255,b*=255;var rgb={r:r,g:g,b:b,hex:R.rgb(r,g,b),toString:rgbtoString};return R.is(o,"finite")&&(rgb.opacity=o),rgb};R.color=function(clr){var rgb;return R.is(clr,"object")&&"h"in clr&&"s"in clr&&"b"in clr?(rgb=R.hsb2rgb(clr),clr.r=rgb.r,clr.g=rgb.g,clr.b=rgb.b,clr.hex=rgb.hex):R.is(clr,"object")&&"h"in clr&&"s"in clr&&"l"in clr?(rgb=R.hsl2rgb(clr),clr.r=rgb.r,clr.g=rgb.g,clr.b=rgb.b,clr.hex=rgb.hex):(R.is(clr,"string")&&(clr=R.getRGB(clr)),R.is(clr,"object")&&"r"in clr&&"g"in clr&&"b"in clr?(rgb=R.rgb2hsl(clr),clr.h=rgb.h,clr.s=rgb.s,clr.l=rgb.l,rgb=R.rgb2hsb(clr),clr.v=rgb.b):(clr={hex:"none"},clr.r=clr.g=clr.b=clr.h=clr.s=clr.v=clr.l=-1)),clr.toString=rgbtoString,clr},R.hsb2rgb=function(h,s,v,o){this.is(h,"object")&&"h"in h&&"s"in h&&"b"in h&&(v=h.b,s=h.s,h=h.h,o=h.o),h*=360;var R,G,B,X,C;return h=h%360/60,C=v*s,X=C*(1-abs(h%2-1)),R=G=B=v-C,h=~~h,R+=[C,X,0,0,X,C][h],G+=[X,C,C,X,0,0][h],B+=[0,0,X,C,C,X][h],packageRGB(R,G,B,o)},R.hsl2rgb=function(h,s,l,o){this.is(h,"object")&&"h"in h&&"s"in h&&"l"in h&&(l=h.l,s=h.s,h=h.h),(h>1||s>1||l>1)&&(h/=360,s/=100,l/=100),h*=360;var R,G,B,X,C;return h=h%360/60,C=2*s*(.5>l?l:1-l),X=C*(1-abs(h%2-1)),R=G=B=l-C/2,h=~~h,R+=[C,X,0,0,X,C][h],G+=[X,C,C,X,0,0][h],B+=[0,0,X,C,C,X][h],packageRGB(R,G,B,o)},R.rgb2hsb=function(r,g,b){b=prepareRGB(r,g,b),r=b[0],g=b[1],b=b[2];var H,S,V,C;return V=mmax(r,g,b),C=V-mmin(r,g,b),H=0==C?null:V==r?(g-b)/C:V==g?(b-r)/C+2:(r-g)/C+4,H=(H+360)%6*60/360,S=0==C?0:C/V,{h:H,s:S,b:V,toString:hsbtoString}},R.rgb2hsl=function(r,g,b){b=prepareRGB(r,g,b),r=b[0],g=b[1],b=b[2];var H,S,L,M,m,C;return M=mmax(r,g,b),m=mmin(r,g,b),C=M-m,H=0==C?null:M==r?(g-b)/C:M==g?(b-r)/C+2:(r-g)/C+4,H=(H+360)%6*60/360,L=(M+m)/2,S=0==C?0:.5>L?C/(2*L):C/(2-2*L),{h:H,s:S,l:L,toString:hsltoString}},R._path2string=function(){return this.join(",").replace(p2s,"$1")};R._preload=function(src,f){var img=g.doc.createElement("img");img.style.cssText="position:absolute;left:-9999em;top:-9999em",img.onload=function(){f.call(this),this.onload=null,g.doc.body.removeChild(this)},img.onerror=function(){g.doc.body.removeChild(this)},g.doc.body.appendChild(img),img.src=src};R.getRGB=cacher(function(colour){if(!colour||(colour=Str(colour)).indexOf("-")+1)return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:clrToString};if("none"==colour)return{r:-1,g:-1,b:-1,hex:"none",toString:clrToString};!(hsrg[has](colour.toLowerCase().substring(0,2))||"#"==colour.charAt())&&(colour=toHex(colour));var red,green,blue,opacity,t,values,rgb=colour.match(colourRegExp);return rgb?(rgb[2]&&(blue=toInt(rgb[2].substring(5),16),green=toInt(rgb[2].substring(3,5),16),red=toInt(rgb[2].substring(1,3),16)),rgb[3]&&(blue=toInt((t=rgb[3].charAt(3))+t,16),green=toInt((t=rgb[3].charAt(2))+t,16),red=toInt((t=rgb[3].charAt(1))+t,16)),rgb[4]&&(values=rgb[4][split](commaSpaces),red=toFloat(values[0]),"%"==values[0].slice(-1)&&(red*=2.55),green=toFloat(values[1]),"%"==values[1].slice(-1)&&(green*=2.55),blue=toFloat(values[2]),"%"==values[2].slice(-1)&&(blue*=2.55),"rgba"==rgb[1].toLowerCase().slice(0,4)&&(opacity=toFloat(values[3])),values[3]&&"%"==values[3].slice(-1)&&(opacity/=100)),rgb[5]?(values=rgb[5][split](commaSpaces),red=toFloat(values[0]),"%"==values[0].slice(-1)&&(red*=2.55),green=toFloat(values[1]),"%"==values[1].slice(-1)&&(green*=2.55),blue=toFloat(values[2]),"%"==values[2].slice(-1)&&(blue*=2.55),("deg"==values[0].slice(-3)||"\xb0"==values[0].slice(-1))&&(red/=360),"hsba"==rgb[1].toLowerCase().slice(0,4)&&(opacity=toFloat(values[3])),values[3]&&"%"==values[3].slice(-1)&&(opacity/=100),R.hsb2rgb(red,green,blue,opacity)):rgb[6]?(values=rgb[6][split](commaSpaces),red=toFloat(values[0]),"%"==values[0].slice(-1)&&(red*=2.55),green=toFloat(values[1]),"%"==values[1].slice(-1)&&(green*=2.55),blue=toFloat(values[2]),"%"==values[2].slice(-1)&&(blue*=2.55),("deg"==values[0].slice(-3)||"\xb0"==values[0].slice(-1))&&(red/=360),"hsla"==rgb[1].toLowerCase().slice(0,4)&&(opacity=toFloat(values[3])),values[3]&&"%"==values[3].slice(-1)&&(opacity/=100),R.hsl2rgb(red,green,blue,opacity)):(rgb={r:red,g:green,b:blue,toString:clrToString},rgb.hex="#"+(16777216|blue|green<<8|red<<16).toString(16).slice(1),R.is(opacity,"finite")&&(rgb.opacity=opacity),rgb)):{r:-1,g:-1,b:-1,hex:"none",error:1,toString:clrToString}},R),R.hsb=cacher(function(h,s,b){return R.hsb2rgb(h,s,b).hex}),R.hsl=cacher(function(h,s,l){return R.hsl2rgb(h,s,l).hex}),R.rgb=cacher(function(r,g,b){return"#"+(16777216|b|g<<8|r<<16).toString(16).slice(1)}),R.getColor=function(value){var start=this.getColor.start=this.getColor.start||{h:0,s:1,b:value||.75},rgb=this.hsb2rgb(start.h,start.s,start.b);return start.h+=.075,start.h>1&&(start.h=0,start.s-=.2,start.s<=0&&(this.getColor.start={h:0,s:1,b:start.b})),rgb.hex},R.getColor.reset=function(){delete this.start},R.parsePathString=function(pathString){if(!pathString)return null;var pth=paths(pathString);if(pth.arr)return pathClone(pth.arr);var paramCounts={a:7,c:6,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,z:0},data=[];return R.is(pathString,array)&&R.is(pathString[0],array)&&(data=pathClone(pathString)),data.length||Str(pathString).replace(pathCommand,function(a,b,c){var params=[],name=b.toLowerCase();if(c.replace(pathValues,function(a,b){b&&params.push(+b)}),"m"==name&&params.length>2&&(data.push([b][concat](params.splice(0,2))),name="l",b="m"==b?"l":"L"),"r"==name)data.push([b][concat](params));else for(;params.length>=paramCounts[name]&&(data.push([b][concat](params.splice(0,paramCounts[name]))),paramCounts[name]););}),data.toString=R._path2string,pth.arr=pathClone(data),data},R.parseTransformString=cacher(function(TString){if(!TString)return null;var data=[];return R.is(TString,array)&&R.is(TString[0],array)&&(data=pathClone(TString)),data.length||Str(TString).replace(tCommand,function(a,b,c){{var params=[];lowerCase.call(b)}c.replace(pathValues,function(a,b){b&&params.push(+b)}),data.push([b][concat](params))}),data.toString=R._path2string,data});var paths=function(ps){var p=paths.ps=paths.ps||{};return p[ps]?p[ps].sleep=100:p[ps]={sleep:100},setTimeout(function(){for(var key in p)p[has](key)&&key!=ps&&(p[key].sleep--,!p[key].sleep&&delete p[key])}),p[ps]};R.findDotsAtSegment=function(p1x,p1y,c1x,c1y,c2x,c2y,p2x,p2y,t){var t1=1-t,t13=pow(t1,3),t12=pow(t1,2),t2=t*t,t3=t2*t,x=t13*p1x+3*t12*t*c1x+3*t1*t*t*c2x+t3*p2x,y=t13*p1y+3*t12*t*c1y+3*t1*t*t*c2y+t3*p2y,mx=p1x+2*t*(c1x-p1x)+t2*(c2x-2*c1x+p1x),my=p1y+2*t*(c1y-p1y)+t2*(c2y-2*c1y+p1y),nx=c1x+2*t*(c2x-c1x)+t2*(p2x-2*c2x+c1x),ny=c1y+2*t*(c2y-c1y)+t2*(p2y-2*c2y+c1y),ax=t1*p1x+t*c1x,ay=t1*p1y+t*c1y,cx=t1*c2x+t*p2x,cy=t1*c2y+t*p2y,alpha=90-180*math.atan2(mx-nx,my-ny)/PI;return(mx>nx||ny>my)&&(alpha+=180),{x:x,y:y,m:{x:mx,y:my},n:{x:nx,y:ny},start:{x:ax,y:ay},end:{x:cx,y:cy},alpha:alpha}},R.bezierBBox=function(p1x,p1y,c1x,c1y,c2x,c2y,p2x,p2y){R.is(p1x,"array")||(p1x=[p1x,p1y,c1x,c1y,c2x,c2y,p2x,p2y]);var bbox=curveDim.apply(null,p1x);return{x:bbox.min.x,y:bbox.min.y,x2:bbox.max.x,y2:bbox.max.y,width:bbox.max.x-bbox.min.x,height:bbox.max.y-bbox.min.y}},R.isPointInsideBBox=function(bbox,x,y){return x>=bbox.x&&x<=bbox.x2&&y>=bbox.y&&y<=bbox.y2},R.isBBoxIntersect=function(bbox1,bbox2){var i=R.isPointInsideBBox;return i(bbox2,bbox1.x,bbox1.y)||i(bbox2,bbox1.x2,bbox1.y)||i(bbox2,bbox1.x,bbox1.y2)||i(bbox2,bbox1.x2,bbox1.y2)||i(bbox1,bbox2.x,bbox2.y)||i(bbox1,bbox2.x2,bbox2.y)||i(bbox1,bbox2.x,bbox2.y2)||i(bbox1,bbox2.x2,bbox2.y2)||(bbox1.x<bbox2.x2&&bbox1.x>bbox2.x||bbox2.x<bbox1.x2&&bbox2.x>bbox1.x)&&(bbox1.y<bbox2.y2&&bbox1.y>bbox2.y||bbox2.y<bbox1.y2&&bbox2.y>bbox1.y)},R.pathIntersection=function(path1,path2){return interPathHelper(path1,path2)},R.pathIntersectionNumber=function(path1,path2){return interPathHelper(path1,path2,1)},R.isPointInsidePath=function(path,x,y){var bbox=R.pathBBox(path);return R.isPointInsideBBox(bbox,x,y)&&interPathHelper(path,[["M",x,y],["H",bbox.x2+10]],1)%2==1},R._removedFactory=function(methodname){return function(){eve("raphael.log",null,"Rapha\xebl: you are calling to method \u201c"+methodname+"\u201d of removed object",methodname)}};var pathDimensions=R.pathBBox=function(path){var pth=paths(path);if(pth.bbox)return clone(pth.bbox);if(!path)return{x:0,y:0,width:0,height:0,x2:0,y2:0};path=path2curve(path);for(var p,x=0,y=0,X=[],Y=[],i=0,ii=path.length;ii>i;i++)if(p=path[i],"M"==p[0])x=p[1],y=p[2],X.push(x),Y.push(y);else{var dim=curveDim(x,y,p[1],p[2],p[3],p[4],p[5],p[6]);X=X[concat](dim.min.x,dim.max.x),Y=Y[concat](dim.min.y,dim.max.y),x=p[5],y=p[6]}var xmin=mmin[apply](0,X),ymin=mmin[apply](0,Y),xmax=mmax[apply](0,X),ymax=mmax[apply](0,Y),width=xmax-xmin,height=ymax-ymin,bb={x:xmin,y:ymin,x2:xmax,y2:ymax,width:width,height:height,cx:xmin+width/2,cy:ymin+height/2};return pth.bbox=clone(bb),bb},pathClone=function(pathArray){var res=clone(pathArray);return res.toString=R._path2string,res},pathToRelative=R._pathToRelative=function(pathArray){var pth=paths(pathArray);if(pth.rel)return pathClone(pth.rel);R.is(pathArray,array)&&R.is(pathArray&&pathArray[0],array)||(pathArray=R.parsePathString(pathArray));var res=[],x=0,y=0,mx=0,my=0,start=0;"M"==pathArray[0][0]&&(x=pathArray[0][1],y=pathArray[0][2],mx=x,my=y,start++,res.push(["M",x,y]));for(var i=start,ii=pathArray.length;ii>i;i++){var r=res[i]=[],pa=pathArray[i];if(pa[0]!=lowerCase.call(pa[0]))switch(r[0]=lowerCase.call(pa[0]),r[0]){case"a":r[1]=pa[1],r[2]=pa[2],r[3]=pa[3],r[4]=pa[4],r[5]=pa[5],r[6]=+(pa[6]-x).toFixed(3),r[7]=+(pa[7]-y).toFixed(3);break;case"v":r[1]=+(pa[1]-y).toFixed(3);break;case"m":mx=pa[1],my=pa[2];default:for(var j=1,jj=pa.length;jj>j;j++)r[j]=+(pa[j]-(j%2?x:y)).toFixed(3)}else{r=res[i]=[],"m"==pa[0]&&(mx=pa[1]+x,my=pa[2]+y);for(var k=0,kk=pa.length;kk>k;k++)res[i][k]=pa[k]}var len=res[i].length;switch(res[i][0]){case"z":x=mx,y=my;break;case"h":x+=+res[i][len-1];break;case"v":y+=+res[i][len-1];break;default:x+=+res[i][len-2],y+=+res[i][len-1]}}return res.toString=R._path2string,pth.rel=pathClone(res),res},pathToAbsolute=R._pathToAbsolute=function(pathArray){var pth=paths(pathArray);if(pth.abs)return pathClone(pth.abs);if(R.is(pathArray,array)&&R.is(pathArray&&pathArray[0],array)||(pathArray=R.parsePathString(pathArray)),!pathArray||!pathArray.length)return[["M",0,0]];var res=[],x=0,y=0,mx=0,my=0,start=0;"M"==pathArray[0][0]&&(x=+pathArray[0][1],y=+pathArray[0][2],mx=x,my=y,start++,res[0]=["M",x,y]);for(var r,pa,crz=3==pathArray.length&&"M"==pathArray[0][0]&&"R"==pathArray[1][0].toUpperCase()&&"Z"==pathArray[2][0].toUpperCase(),i=start,ii=pathArray.length;ii>i;i++){if(res.push(r=[]),pa=pathArray[i],pa[0]!=upperCase.call(pa[0]))switch(r[0]=upperCase.call(pa[0]),r[0]){case"A":r[1]=pa[1],r[2]=pa[2],r[3]=pa[3],r[4]=pa[4],r[5]=pa[5],r[6]=+(pa[6]+x),r[7]=+(pa[7]+y);break;case"V":r[1]=+pa[1]+y;break;case"H":r[1]=+pa[1]+x;break;case"R":for(var dots=[x,y][concat](pa.slice(1)),j=2,jj=dots.length;jj>j;j++)dots[j]=+dots[j]+x,dots[++j]=+dots[j]+y;res.pop(),res=res[concat](catmullRom2bezier(dots,crz));break;case"M":mx=+pa[1]+x,my=+pa[2]+y;default:for(j=1,jj=pa.length;jj>j;j++)r[j]=+pa[j]+(j%2?x:y)}else if("R"==pa[0])dots=[x,y][concat](pa.slice(1)),res.pop(),res=res[concat](catmullRom2bezier(dots,crz)),r=["R"][concat](pa.slice(-2));else for(var k=0,kk=pa.length;kk>k;k++)r[k]=pa[k];switch(r[0]){case"Z":x=mx,y=my;break;case"H":x=r[1];break;case"V":y=r[1];break;case"M":mx=r[r.length-2],my=r[r.length-1];default:x=r[r.length-2],y=r[r.length-1]}}return res.toString=R._path2string,pth.abs=pathClone(res),res},l2c=function(x1,y1,x2,y2){return[x1,y1,x2,y2,x2,y2]},q2c=function(x1,y1,ax,ay,x2,y2){var _13=1/3,_23=2/3;return[_13*x1+_23*ax,_13*y1+_23*ay,_13*x2+_23*ax,_13*y2+_23*ay,x2,y2]},a2c=function(x1,y1,rx,ry,angle,large_arc_flag,sweep_flag,x2,y2,recursive){var xy,_120=120*PI/180,rad=PI/180*(+angle||0),res=[],rotate=cacher(function(x,y,rad){var X=x*math.cos(rad)-y*math.sin(rad),Y=x*math.sin(rad)+y*math.cos(rad);return{x:X,y:Y}});if(recursive)f1=recursive[0],f2=recursive[1],cx=recursive[2],cy=recursive[3];else{xy=rotate(x1,y1,-rad),x1=xy.x,y1=xy.y,xy=rotate(x2,y2,-rad),x2=xy.x,y2=xy.y;var x=(math.cos(PI/180*angle),math.sin(PI/180*angle),(x1-x2)/2),y=(y1-y2)/2,h=x*x/(rx*rx)+y*y/(ry*ry);h>1&&(h=math.sqrt(h),rx=h*rx,ry=h*ry);var rx2=rx*rx,ry2=ry*ry,k=(large_arc_flag==sweep_flag?-1:1)*math.sqrt(abs((rx2*ry2-rx2*y*y-ry2*x*x)/(rx2*y*y+ry2*x*x))),cx=k*rx*y/ry+(x1+x2)/2,cy=k*-ry*x/rx+(y1+y2)/2,f1=math.asin(((y1-cy)/ry).toFixed(9)),f2=math.asin(((y2-cy)/ry).toFixed(9));f1=cx>x1?PI-f1:f1,f2=cx>x2?PI-f2:f2,0>f1&&(f1=2*PI+f1),0>f2&&(f2=2*PI+f2),sweep_flag&&f1>f2&&(f1-=2*PI),!sweep_flag&&f2>f1&&(f2-=2*PI)}var df=f2-f1;if(abs(df)>_120){var f2old=f2,x2old=x2,y2old=y2;f2=f1+_120*(sweep_flag&&f2>f1?1:-1),x2=cx+rx*math.cos(f2),y2=cy+ry*math.sin(f2),res=a2c(x2,y2,rx,ry,angle,0,sweep_flag,x2old,y2old,[f2,f2old,cx,cy])}df=f2-f1;var c1=math.cos(f1),s1=math.sin(f1),c2=math.cos(f2),s2=math.sin(f2),t=math.tan(df/4),hx=4/3*rx*t,hy=4/3*ry*t,m1=[x1,y1],m2=[x1+hx*s1,y1-hy*c1],m3=[x2+hx*s2,y2-hy*c2],m4=[x2,y2];if(m2[0]=2*m1[0]-m2[0],m2[1]=2*m1[1]-m2[1],recursive)return[m2,m3,m4][concat](res);res=[m2,m3,m4][concat](res).join()[split](",");for(var newres=[],i=0,ii=res.length;ii>i;i++)newres[i]=i%2?rotate(res[i-1],res[i],rad).y:rotate(res[i],res[i+1],rad).x;return newres},findDotAtSegment=function(p1x,p1y,c1x,c1y,c2x,c2y,p2x,p2y,t){var t1=1-t;return{x:pow(t1,3)*p1x+3*pow(t1,2)*t*c1x+3*t1*t*t*c2x+pow(t,3)*p2x,y:pow(t1,3)*p1y+3*pow(t1,2)*t*c1y+3*t1*t*t*c2y+pow(t,3)*p2y}},curveDim=cacher(function(p1x,p1y,c1x,c1y,c2x,c2y,p2x,p2y){var dot,a=c2x-2*c1x+p1x-(p2x-2*c2x+c1x),b=2*(c1x-p1x)-2*(c2x-c1x),c=p1x-c1x,t1=(-b+math.sqrt(b*b-4*a*c))/2/a,t2=(-b-math.sqrt(b*b-4*a*c))/2/a,y=[p1y,p2y],x=[p1x,p2x];return abs(t1)>"1e12"&&(t1=.5),abs(t2)>"1e12"&&(t2=.5),t1>0&&1>t1&&(dot=findDotAtSegment(p1x,p1y,c1x,c1y,c2x,c2y,p2x,p2y,t1),x.push(dot.x),y.push(dot.y)),t2>0&&1>t2&&(dot=findDotAtSegment(p1x,p1y,c1x,c1y,c2x,c2y,p2x,p2y,t2),x.push(dot.x),y.push(dot.y)),a=c2y-2*c1y+p1y-(p2y-2*c2y+c1y),b=2*(c1y-p1y)-2*(c2y-c1y),c=p1y-c1y,t1=(-b+math.sqrt(b*b-4*a*c))/2/a,t2=(-b-math.sqrt(b*b-4*a*c))/2/a,abs(t1)>"1e12"&&(t1=.5),abs(t2)>"1e12"&&(t2=.5),t1>0&&1>t1&&(dot=findDotAtSegment(p1x,p1y,c1x,c1y,c2x,c2y,p2x,p2y,t1),x.push(dot.x),y.push(dot.y)),t2>0&&1>t2&&(dot=findDotAtSegment(p1x,p1y,c1x,c1y,c2x,c2y,p2x,p2y,t2),x.push(dot.x),y.push(dot.y)),{min:{x:mmin[apply](0,x),y:mmin[apply](0,y)},max:{x:mmax[apply](0,x),y:mmax[apply](0,y)}}
    }),path2curve=R._path2curve=cacher(function(path,path2){var pth=!path2&&paths(path);if(!path2&&pth.curve)return pathClone(pth.curve);for(var p=pathToAbsolute(path),p2=path2&&pathToAbsolute(path2),attrs={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},attrs2={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},processPath=(function(path,d,pcom){var nx,ny;if(!path)return["C",d.x,d.y,d.x,d.y,d.x,d.y];switch(!(path[0]in{T:1,Q:1})&&(d.qx=d.qy=null),path[0]){case"M":d.X=path[1],d.Y=path[2];break;case"A":path=["C"][concat](a2c[apply](0,[d.x,d.y][concat](path.slice(1))));break;case"S":"C"==pcom||"S"==pcom?(nx=2*d.x-d.bx,ny=2*d.y-d.by):(nx=d.x,ny=d.y),path=["C",nx,ny][concat](path.slice(1));break;case"T":"Q"==pcom||"T"==pcom?(d.qx=2*d.x-d.qx,d.qy=2*d.y-d.qy):(d.qx=d.x,d.qy=d.y),path=["C"][concat](q2c(d.x,d.y,d.qx,d.qy,path[1],path[2]));break;case"Q":d.qx=path[1],d.qy=path[2],path=["C"][concat](q2c(d.x,d.y,path[1],path[2],path[3],path[4]));break;case"L":path=["C"][concat](l2c(d.x,d.y,path[1],path[2]));break;case"H":path=["C"][concat](l2c(d.x,d.y,path[1],d.y));break;case"V":path=["C"][concat](l2c(d.x,d.y,d.x,path[1]));break;case"Z":path=["C"][concat](l2c(d.x,d.y,d.X,d.Y))}return path}),fixArc=function(pp,i){if(pp[i].length>7){pp[i].shift();for(var pi=pp[i];pi.length;)pp.splice(i++,0,["C"][concat](pi.splice(0,6)));pp.splice(i,1),ii=mmax(p.length,p2&&p2.length||0)}},fixM=function(path1,path2,a1,a2,i){path1&&path2&&"M"==path1[i][0]&&"M"!=path2[i][0]&&(path2.splice(i,0,["M",a2.x,a2.y]),a1.bx=0,a1.by=0,a1.x=path1[i][1],a1.y=path1[i][2],ii=mmax(p.length,p2&&p2.length||0))},i=0,ii=mmax(p.length,p2&&p2.length||0);ii>i;i++){p[i]=processPath(p[i],attrs),fixArc(p,i),p2&&(p2[i]=processPath(p2[i],attrs2)),p2&&fixArc(p2,i),fixM(p,p2,attrs,attrs2,i),fixM(p2,p,attrs2,attrs,i);var seg=p[i],seg2=p2&&p2[i],seglen=seg.length,seg2len=p2&&seg2.length;attrs.x=seg[seglen-2],attrs.y=seg[seglen-1],attrs.bx=toFloat(seg[seglen-4])||attrs.x,attrs.by=toFloat(seg[seglen-3])||attrs.y,attrs2.bx=p2&&(toFloat(seg2[seg2len-4])||attrs2.x),attrs2.by=p2&&(toFloat(seg2[seg2len-3])||attrs2.y),attrs2.x=p2&&seg2[seg2len-2],attrs2.y=p2&&seg2[seg2len-1]}return p2||(pth.curve=pathClone(p)),p2?[p,p2]:p},null,pathClone),tear=(R._parseDots=cacher(function(gradient){for(var dots=[],i=0,ii=gradient.length;ii>i;i++){var dot={},par=gradient[i].match(/^([^:]*):?([\d\.]*)/);if(dot.color=R.getRGB(par[1]),dot.color.error)return null;dot.color=dot.color.hex,par[2]&&(dot.offset=par[2]+"%"),dots.push(dot)}for(i=1,ii=dots.length-1;ii>i;i++)if(!dots[i].offset){for(var start=toFloat(dots[i-1].offset||0),end=0,j=i+1;ii>j;j++)if(dots[j].offset){end=dots[j].offset;break}end||(end=100,j=ii),end=toFloat(end);for(var d=(end-start)/(j-i+1);j>i;i++)start+=d,dots[i].offset=start+"%"}return dots}),R._tear=function(el,paper){el==paper.top&&(paper.top=el.prev),el==paper.bottom&&(paper.bottom=el.next),el.next&&(el.next.prev=el.prev),el.prev&&(el.prev.next=el.next)}),toMatrix=(R._tofront=function(el,paper){paper.top!==el&&(tear(el,paper),el.next=null,el.prev=paper.top,paper.top.next=el,paper.top=el)},R._toback=function(el,paper){paper.bottom!==el&&(tear(el,paper),el.next=paper.bottom,el.prev=null,paper.bottom.prev=el,paper.bottom=el)},R._insertafter=function(el,el2,paper){tear(el,paper),el2==paper.top&&(paper.top=el),el2.next&&(el2.next.prev=el),el.next=el2.next,el.prev=el2,el2.next=el},R._insertbefore=function(el,el2,paper){tear(el,paper),el2==paper.bottom&&(paper.bottom=el),el2.prev&&(el2.prev.next=el),el.prev=el2.prev,el2.prev=el,el.next=el2},R.toMatrix=function(path,transform){var bb=pathDimensions(path),el={_:{transform:E},getBBox:function(){return bb}};return extractTransform(el,transform),el.matrix}),extractTransform=(R.transformPath=function(path,transform){return mapPath(path,toMatrix(path,transform))},R._extractTransform=function(el,tstr){if(null==tstr)return el._.transform;tstr=Str(tstr).replace(/\.{3}|\u2026/g,el._.transform||E);var tdata=R.parseTransformString(tstr),deg=0,dx=0,dy=0,sx=1,sy=1,_=el._,m=new Matrix;if(_.transform=tdata||[],tdata)for(var i=0,ii=tdata.length;ii>i;i++){var x1,y1,x2,y2,bb,t=tdata[i],tlen=t.length,command=Str(t[0]).toLowerCase(),absolute=t[0]!=command,inver=absolute?m.invert():0;"t"==command&&3==tlen?absolute?(x1=inver.x(0,0),y1=inver.y(0,0),x2=inver.x(t[1],t[2]),y2=inver.y(t[1],t[2]),m.translate(x2-x1,y2-y1)):m.translate(t[1],t[2]):"r"==command?2==tlen?(bb=bb||el.getBBox(1),m.rotate(t[1],bb.x+bb.width/2,bb.y+bb.height/2),deg+=t[1]):4==tlen&&(absolute?(x2=inver.x(t[2],t[3]),y2=inver.y(t[2],t[3]),m.rotate(t[1],x2,y2)):m.rotate(t[1],t[2],t[3]),deg+=t[1]):"s"==command?2==tlen||3==tlen?(bb=bb||el.getBBox(1),m.scale(t[1],t[tlen-1],bb.x+bb.width/2,bb.y+bb.height/2),sx*=t[1],sy*=t[tlen-1]):5==tlen&&(absolute?(x2=inver.x(t[3],t[4]),y2=inver.y(t[3],t[4]),m.scale(t[1],t[2],x2,y2)):m.scale(t[1],t[2],t[3],t[4]),sx*=t[1],sy*=t[2]):"m"==command&&7==tlen&&m.add(t[1],t[2],t[3],t[4],t[5],t[6]),_.dirtyT=1,el.matrix=m}el.matrix=m,_.sx=sx,_.sy=sy,_.deg=deg,_.dx=dx=m.e,_.dy=dy=m.f,1==sx&&1==sy&&!deg&&_.bbox?(_.bbox.x+=+dx,_.bbox.y+=+dy):_.dirtyT=1}),getEmpty=function(item){var l=item[0];switch(l.toLowerCase()){case"t":return[l,0,0];case"m":return[l,1,0,0,1,0,0];case"r":return 4==item.length?[l,0,item[2],item[3]]:[l,0];case"s":return 5==item.length?[l,1,1,item[3],item[4]]:3==item.length?[l,1,1]:[l,1]}},equaliseTransform=R._equaliseTransform=function(t1,t2){t2=Str(t2).replace(/\.{3}|\u2026/g,t1),t1=R.parseTransformString(t1)||[],t2=R.parseTransformString(t2)||[];for(var j,jj,tt1,tt2,maxlength=mmax(t1.length,t2.length),from=[],to=[],i=0;maxlength>i;i++){if(tt1=t1[i]||getEmpty(t2[i]),tt2=t2[i]||getEmpty(tt1),tt1[0]!=tt2[0]||"r"==tt1[0].toLowerCase()&&(tt1[2]!=tt2[2]||tt1[3]!=tt2[3])||"s"==tt1[0].toLowerCase()&&(tt1[3]!=tt2[3]||tt1[4]!=tt2[4]))return;for(from[i]=[],to[i]=[],j=0,jj=mmax(tt1.length,tt2.length);jj>j;j++)j in tt1&&(from[i][j]=tt1[j]),j in tt2&&(to[i][j]=tt2[j])}return{from:from,to:to}};R._getContainer=function(x,y,w,h){var container;return container=null!=h||R.is(x,"object")?x:g.doc.getElementById(x),null!=container?container.tagName?null==y?{container:container,width:container.style.pixelWidth||container.offsetWidth,height:container.style.pixelHeight||container.offsetHeight}:{container:container,width:y,height:w}:{container:1,x:x,y:y,width:w,height:h}:void 0},R.pathToRelative=pathToRelative,R._engine={},R.path2curve=path2curve,R.matrix=function(a,b,c,d,e,f){return new Matrix(a,b,c,d,e,f)},function(matrixproto){function norm(a){return a[0]*a[0]+a[1]*a[1]}function normalize(a){var mag=math.sqrt(norm(a));a[0]&&(a[0]/=mag),a[1]&&(a[1]/=mag)}matrixproto.add=function(a,b,c,d,e,f){var x,y,z,res,out=[[],[],[]],m=[[this.a,this.c,this.e],[this.b,this.d,this.f],[0,0,1]],matrix=[[a,c,e],[b,d,f],[0,0,1]];for(a&&a instanceof Matrix&&(matrix=[[a.a,a.c,a.e],[a.b,a.d,a.f],[0,0,1]]),x=0;3>x;x++)for(y=0;3>y;y++){for(res=0,z=0;3>z;z++)res+=m[x][z]*matrix[z][y];out[x][y]=res}this.a=out[0][0],this.b=out[1][0],this.c=out[0][1],this.d=out[1][1],this.e=out[0][2],this.f=out[1][2]},matrixproto.invert=function(){var me=this,x=me.a*me.d-me.b*me.c;return new Matrix(me.d/x,-me.b/x,-me.c/x,me.a/x,(me.c*me.f-me.d*me.e)/x,(me.b*me.e-me.a*me.f)/x)},matrixproto.clone=function(){return new Matrix(this.a,this.b,this.c,this.d,this.e,this.f)},matrixproto.translate=function(x,y){this.add(1,0,0,1,x,y)},matrixproto.scale=function(x,y,cx,cy){null==y&&(y=x),(cx||cy)&&this.add(1,0,0,1,cx,cy),this.add(x,0,0,y,0,0),(cx||cy)&&this.add(1,0,0,1,-cx,-cy)},matrixproto.rotate=function(a,x,y){a=R.rad(a),x=x||0,y=y||0;var cos=+math.cos(a).toFixed(9),sin=+math.sin(a).toFixed(9);this.add(cos,sin,-sin,cos,x,y),this.add(1,0,0,1,-x,-y)},matrixproto.x=function(x,y){return x*this.a+y*this.c+this.e},matrixproto.y=function(x,y){return x*this.b+y*this.d+this.f},matrixproto.get=function(i){return+this[Str.fromCharCode(97+i)].toFixed(4)},matrixproto.toString=function(){return R.svg?"matrix("+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)].join()+")":[this.get(0),this.get(2),this.get(1),this.get(3),0,0].join()},matrixproto.toFilter=function(){return"progid:DXImageTransform.Microsoft.Matrix(M11="+this.get(0)+", M12="+this.get(2)+", M21="+this.get(1)+", M22="+this.get(3)+", Dx="+this.get(4)+", Dy="+this.get(5)+", sizingmethod='auto expand')"},matrixproto.offset=function(){return[this.e.toFixed(4),this.f.toFixed(4)]},matrixproto.split=function(){var out={};out.dx=this.e,out.dy=this.f;var row=[[this.a,this.c],[this.b,this.d]];out.scalex=math.sqrt(norm(row[0])),normalize(row[0]),out.shear=row[0][0]*row[1][0]+row[0][1]*row[1][1],row[1]=[row[1][0]-row[0][0]*out.shear,row[1][1]-row[0][1]*out.shear],out.scaley=math.sqrt(norm(row[1])),normalize(row[1]),out.shear/=out.scaley;var sin=-row[0][1],cos=row[1][1];return 0>cos?(out.rotate=R.deg(math.acos(cos)),0>sin&&(out.rotate=360-out.rotate)):out.rotate=R.deg(math.asin(sin)),out.isSimple=!(+out.shear.toFixed(9)||out.scalex.toFixed(9)!=out.scaley.toFixed(9)&&out.rotate),out.isSuperSimple=!+out.shear.toFixed(9)&&out.scalex.toFixed(9)==out.scaley.toFixed(9)&&!out.rotate,out.noRotation=!+out.shear.toFixed(9)&&!out.rotate,out},matrixproto.toTransformString=function(shorter){var s=shorter||this[split]();return s.isSimple?(s.scalex=+s.scalex.toFixed(4),s.scaley=+s.scaley.toFixed(4),s.rotate=+s.rotate.toFixed(4),(s.dx||s.dy?"t"+[s.dx,s.dy]:E)+(1!=s.scalex||1!=s.scaley?"s"+[s.scalex,s.scaley,0,0]:E)+(s.rotate?"r"+[s.rotate,0,0]:E)):"m"+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)]}}(Matrix.prototype);var version=navigator.userAgent.match(/Version\/(.*?)\s/)||navigator.userAgent.match(/Chrome\/(\d+)/);paperproto.safari="Apple Computer, Inc."==navigator.vendor&&(version&&version[1]<4||"iP"==navigator.platform.slice(0,2))||"Google Inc."==navigator.vendor&&version&&version[1]<8?function(){var rect=this.rect(-99,-99,this.width+99,this.height+99).attr({stroke:"none"});setTimeout(function(){rect.remove()})}:fun;for(var preventDefault=function(){this.returnValue=!1},preventTouch=function(){return this.originalEvent.preventDefault()},stopPropagation=function(){this.cancelBubble=!0},stopTouch=function(){return this.originalEvent.stopPropagation()},getEventPosition=function(e){var scrollY=g.doc.documentElement.scrollTop||g.doc.body.scrollTop,scrollX=g.doc.documentElement.scrollLeft||g.doc.body.scrollLeft;return{x:e.clientX+scrollX,y:e.clientY+scrollY}},addEvent=function(){return g.doc.addEventListener?function(obj,type,fn,element){var f=function(e){var pos=getEventPosition(e);return fn.call(element,e,pos.x,pos.y)};if(obj.addEventListener(type,f,!1),supportsTouch&&touchMap[type]){var _f=function(e){for(var pos=getEventPosition(e),olde=e,i=0,ii=e.targetTouches&&e.targetTouches.length;ii>i;i++)if(e.targetTouches[i].target==obj){e=e.targetTouches[i],e.originalEvent=olde,e.preventDefault=preventTouch,e.stopPropagation=stopTouch;break}return fn.call(element,e,pos.x,pos.y)};obj.addEventListener(touchMap[type],_f,!1)}return function(){return obj.removeEventListener(type,f,!1),supportsTouch&&touchMap[type]&&obj.removeEventListener(touchMap[type],f,!1),!0}}:g.doc.attachEvent?function(obj,type,fn,element){var f=function(e){e=e||g.win.event;var scrollY=g.doc.documentElement.scrollTop||g.doc.body.scrollTop,scrollX=g.doc.documentElement.scrollLeft||g.doc.body.scrollLeft,x=e.clientX+scrollX,y=e.clientY+scrollY;return e.preventDefault=e.preventDefault||preventDefault,e.stopPropagation=e.stopPropagation||stopPropagation,fn.call(element,e,x,y)};obj.attachEvent("on"+type,f);var detacher=function(){return obj.detachEvent("on"+type,f),!0};return detacher}:void 0}(),drag=[],dragMove=function(e){for(var dragi,x=e.clientX,y=e.clientY,scrollY=g.doc.documentElement.scrollTop||g.doc.body.scrollTop,scrollX=g.doc.documentElement.scrollLeft||g.doc.body.scrollLeft,j=drag.length;j--;){if(dragi=drag[j],supportsTouch&&e.touches){for(var touch,i=e.touches.length;i--;)if(touch=e.touches[i],touch.identifier==dragi.el._drag.id){x=touch.clientX,y=touch.clientY,(e.originalEvent?e.originalEvent:e).preventDefault();break}}else e.preventDefault();var o,node=dragi.el.node,next=node.nextSibling,parent=node.parentNode,display=node.style.display;g.win.opera&&parent.removeChild(node),node.style.display="none",o=dragi.el.paper.getElementByPoint(x,y),node.style.display=display,g.win.opera&&(next?parent.insertBefore(node,next):parent.appendChild(node)),o&&eve("raphael.drag.over."+dragi.el.id,dragi.el,o),x+=scrollX,y+=scrollY,eve("raphael.drag.move."+dragi.el.id,dragi.move_scope||dragi.el,x-dragi.el._drag.x,y-dragi.el._drag.y,x,y,e)}},dragUp=function(e){R.unmousemove(dragMove).unmouseup(dragUp);for(var dragi,i=drag.length;i--;)dragi=drag[i],dragi.el._drag={},eve("raphael.drag.end."+dragi.el.id,dragi.end_scope||dragi.start_scope||dragi.move_scope||dragi.el,e);drag=[]},elproto=R.el={},i=events.length;i--;)!function(eventName){R[eventName]=elproto[eventName]=function(fn,scope){return R.is(fn,"function")&&(this.events=this.events||[],this.events.push({name:eventName,f:fn,unbind:addEvent(this.shape||this.node||g.doc,eventName,fn,scope||this)})),this},R["un"+eventName]=elproto["un"+eventName]=function(fn){for(var events=this.events||[],l=events.length;l--;)events[l].name!=eventName||!R.is(fn,"undefined")&&events[l].f!=fn||(events[l].unbind(),events.splice(l,1),!events.length&&delete this.events);return this}}(events[i]);elproto.data=function(key,value){var data=eldata[this.id]=eldata[this.id]||{};if(0==arguments.length)return data;if(1==arguments.length){if(R.is(key,"object")){for(var i in key)key[has](i)&&this.data(i,key[i]);return this}return eve("raphael.data.get."+this.id,this,data[key],key),data[key]}return data[key]=value,eve("raphael.data.set."+this.id,this,value,key),this},elproto.removeData=function(key){return null==key?eldata[this.id]={}:eldata[this.id]&&delete eldata[this.id][key],this},elproto.getData=function(){return clone(eldata[this.id]||{})},elproto.hover=function(f_in,f_out,scope_in,scope_out){return this.mouseover(f_in,scope_in).mouseout(f_out,scope_out||scope_in)},elproto.unhover=function(f_in,f_out){return this.unmouseover(f_in).unmouseout(f_out)};var draggable=[];elproto.drag=function(onmove,onstart,onend,move_scope,start_scope,end_scope){function start(e){(e.originalEvent||e).preventDefault();var x=e.clientX,y=e.clientY,scrollY=g.doc.documentElement.scrollTop||g.doc.body.scrollTop,scrollX=g.doc.documentElement.scrollLeft||g.doc.body.scrollLeft;if(this._drag.id=e.identifier,supportsTouch&&e.touches)for(var touch,i=e.touches.length;i--;)if(touch=e.touches[i],this._drag.id=touch.identifier,touch.identifier==this._drag.id){x=touch.clientX,y=touch.clientY;break}this._drag.x=x+scrollX,this._drag.y=y+scrollY,!drag.length&&R.mousemove(dragMove).mouseup(dragUp),drag.push({el:this,move_scope:move_scope,start_scope:start_scope,end_scope:end_scope}),onstart&&eve.on("raphael.drag.start."+this.id,onstart),onmove&&eve.on("raphael.drag.move."+this.id,onmove),onend&&eve.on("raphael.drag.end."+this.id,onend),eve("raphael.drag.start."+this.id,start_scope||move_scope||this,e.clientX+scrollX,e.clientY+scrollY,e)}return this._drag={},draggable.push({el:this,start:start}),this.mousedown(start),this},elproto.onDragOver=function(f){f?eve.on("raphael.drag.over."+this.id,f):eve.unbind("raphael.drag.over."+this.id)},elproto.undrag=function(){for(var i=draggable.length;i--;)draggable[i].el==this&&(this.unmousedown(draggable[i].start),draggable.splice(i,1),eve.unbind("raphael.drag.*."+this.id));!draggable.length&&R.unmousemove(dragMove).unmouseup(dragUp),drag=[]},paperproto.circle=function(x,y,r){var out=R._engine.circle(this,x||0,y||0,r||0);return this.__set__&&this.__set__.push(out),out},paperproto.rect=function(x,y,w,h,r){var out=R._engine.rect(this,x||0,y||0,w||0,h||0,r||0);return this.__set__&&this.__set__.push(out),out},paperproto.ellipse=function(x,y,rx,ry){var out=R._engine.ellipse(this,x||0,y||0,rx||0,ry||0);return this.__set__&&this.__set__.push(out),out},paperproto.path=function(pathString){pathString&&!R.is(pathString,string)&&!R.is(pathString[0],array)&&(pathString+=E);var out=R._engine.path(R.format[apply](R,arguments),this);return this.__set__&&this.__set__.push(out),out},paperproto.image=function(src,x,y,w,h){var out=R._engine.image(this,src||"about:blank",x||0,y||0,w||0,h||0);return this.__set__&&this.__set__.push(out),out},paperproto.text=function(x,y,text){var out=R._engine.text(this,x||0,y||0,Str(text));return this.__set__&&this.__set__.push(out),out},paperproto.set=function(itemsArray){!R.is(itemsArray,"array")&&(itemsArray=Array.prototype.splice.call(arguments,0,arguments.length));var out=new Set(itemsArray);return this.__set__&&this.__set__.push(out),out.paper=this,out.type="set",out},paperproto.setStart=function(set){this.__set__=set||this.set()},paperproto.setFinish=function(){var out=this.__set__;return delete this.__set__,out},paperproto.setSize=function(width,height){return R._engine.setSize.call(this,width,height)},paperproto.setViewBox=function(x,y,w,h,fit){return R._engine.setViewBox.call(this,x,y,w,h,fit)},paperproto.top=paperproto.bottom=null,paperproto.raphael=R;var getOffset=function(elem){var box=elem.getBoundingClientRect(),doc=elem.ownerDocument,body=doc.body,docElem=doc.documentElement,clientTop=docElem.clientTop||body.clientTop||0,clientLeft=docElem.clientLeft||body.clientLeft||0,top=box.top+(g.win.pageYOffset||docElem.scrollTop||body.scrollTop)-clientTop,left=box.left+(g.win.pageXOffset||docElem.scrollLeft||body.scrollLeft)-clientLeft;return{y:top,x:left}};paperproto.getElementByPoint=function(x,y){var paper=this,svg=paper.canvas,target=g.doc.elementFromPoint(x,y);if(g.win.opera&&"svg"==target.tagName){var so=getOffset(svg),sr=svg.createSVGRect();sr.x=x-so.x,sr.y=y-so.y,sr.width=sr.height=1;var hits=svg.getIntersectionList(sr,null);hits.length&&(target=hits[hits.length-1])}if(!target)return null;for(;target.parentNode&&target!=svg.parentNode&&!target.raphael;)target=target.parentNode;return target==paper.canvas.parentNode&&(target=svg),target=target&&target.raphael?paper.getById(target.raphaelid):null},paperproto.getElementsByBBox=function(bbox){var set=this.set();return this.forEach(function(el){R.isBBoxIntersect(el.getBBox(),bbox)&&set.push(el)}),set},paperproto.getById=function(id){for(var bot=this.bottom;bot;){if(bot.id==id)return bot;bot=bot.next}return null},paperproto.forEach=function(callback,thisArg){for(var bot=this.bottom;bot;){if(callback.call(thisArg,bot)===!1)return this;bot=bot.next}return this},paperproto.getElementsByPoint=function(x,y){var set=this.set();return this.forEach(function(el){el.isPointInside(x,y)&&set.push(el)}),set},elproto.isPointInside=function(x,y){var rp=this.realPath=getPath[this.type](this);return this.attr("transform")&&this.attr("transform").length&&(rp=R.transformPath(rp,this.attr("transform"))),R.isPointInsidePath(rp,x,y)},elproto.getBBox=function(isWithoutTransform){if(this.removed)return{};var _=this._;return isWithoutTransform?((_.dirty||!_.bboxwt)&&(this.realPath=getPath[this.type](this),_.bboxwt=pathDimensions(this.realPath),_.bboxwt.toString=x_y_w_h,_.dirty=0),_.bboxwt):((_.dirty||_.dirtyT||!_.bbox)&&((_.dirty||!this.realPath)&&(_.bboxwt=0,this.realPath=getPath[this.type](this)),_.bbox=pathDimensions(mapPath(this.realPath,this.matrix)),_.bbox.toString=x_y_w_h,_.dirty=_.dirtyT=0),_.bbox)},elproto.clone=function(){if(this.removed)return null;var out=this.paper[this.type]().attr(this.attr());return this.__set__&&this.__set__.push(out),out},elproto.glow=function(glow){if("text"==this.type)return null;glow=glow||{};var s={width:(glow.width||10)+(+this.attr("stroke-width")||1),fill:glow.fill||!1,opacity:glow.opacity||.5,offsetx:glow.offsetx||0,offsety:glow.offsety||0,color:glow.color||"#000"},c=s.width/2,r=this.paper,out=r.set(),path=this.realPath||getPath[this.type](this);path=this.matrix?mapPath(path,this.matrix):path;for(var i=1;c+1>i;i++)out.push(r.path(path).attr({stroke:s.color,fill:s.fill?s.color:"none","stroke-linejoin":"round","stroke-linecap":"round","stroke-width":+(s.width/c*i).toFixed(3),opacity:+(s.opacity/c).toFixed(3)}));return out.insertBefore(this).translate(s.offsetx,s.offsety)};var getPointAtSegmentLength=function(p1x,p1y,c1x,c1y,c2x,c2y,p2x,p2y,length){return null==length?bezlen(p1x,p1y,c1x,c1y,c2x,c2y,p2x,p2y):R.findDotsAtSegment(p1x,p1y,c1x,c1y,c2x,c2y,p2x,p2y,getTatLen(p1x,p1y,c1x,c1y,c2x,c2y,p2x,p2y,length))},getLengthFactory=function(istotal,subpath){return function(path,length,onlystart){path=path2curve(path);for(var x,y,p,l,point,sp="",subpaths={},len=0,i=0,ii=path.length;ii>i;i++){if(p=path[i],"M"==p[0])x=+p[1],y=+p[2];else{if(l=getPointAtSegmentLength(x,y,p[1],p[2],p[3],p[4],p[5],p[6]),len+l>length){if(subpath&&!subpaths.start){if(point=getPointAtSegmentLength(x,y,p[1],p[2],p[3],p[4],p[5],p[6],length-len),sp+=["C"+point.start.x,point.start.y,point.m.x,point.m.y,point.x,point.y],onlystart)return sp;subpaths.start=sp,sp=["M"+point.x,point.y+"C"+point.n.x,point.n.y,point.end.x,point.end.y,p[5],p[6]].join(),len+=l,x=+p[5],y=+p[6];continue}if(!istotal&&!subpath)return point=getPointAtSegmentLength(x,y,p[1],p[2],p[3],p[4],p[5],p[6],length-len),{x:point.x,y:point.y,alpha:point.alpha}}len+=l,x=+p[5],y=+p[6]}sp+=p.shift()+p}return subpaths.end=sp,point=istotal?len:subpath?subpaths:R.findDotsAtSegment(x,y,p[0],p[1],p[2],p[3],p[4],p[5],1),point.alpha&&(point={x:point.x,y:point.y,alpha:point.alpha}),point}},getTotalLength=getLengthFactory(1),getPointAtLength=getLengthFactory(),getSubpathsAtLength=getLengthFactory(0,1);R.getTotalLength=getTotalLength,R.getPointAtLength=getPointAtLength,R.getSubpath=function(path,from,to){if(this.getTotalLength(path)-to<1e-6)return getSubpathsAtLength(path,from).end;var a=getSubpathsAtLength(path,to,1);return from?getSubpathsAtLength(a,from).end:a},elproto.getTotalLength=function(){var path=this.getPath();if(path)return this.node.getTotalLength?this.node.getTotalLength():getTotalLength(path)},elproto.getPointAtLength=function(length){var path=this.getPath();if(path)return getPointAtLength(path,length)},elproto.getPath=function(){var path,getPath=R._getPath[this.type];if("text"!=this.type&&"set"!=this.type)return getPath&&(path=getPath(this)),path},elproto.getSubpath=function(from,to){var path=this.getPath();if(path)return R.getSubpath(path,from,to)};var ef=R.easing_formulas={linear:function(n){return n},"<":function(n){return pow(n,1.7)},">":function(n){return pow(n,.48)},"<>":function(n){var q=.48-n/1.04,Q=math.sqrt(.1734+q*q),x=Q-q,X=pow(abs(x),1/3)*(0>x?-1:1),y=-Q-q,Y=pow(abs(y),1/3)*(0>y?-1:1),t=X+Y+.5;return 3*(1-t)*t*t+t*t*t},backIn:function(n){var s=1.70158;return n*n*((s+1)*n-s)},backOut:function(n){n-=1;var s=1.70158;return n*n*((s+1)*n+s)+1},elastic:function(n){return n==!!n?n:pow(2,-10*n)*math.sin(2*(n-.075)*PI/.3)+1},bounce:function(n){var l,s=7.5625,p=2.75;return 1/p>n?l=s*n*n:2/p>n?(n-=1.5/p,l=s*n*n+.75):2.5/p>n?(n-=2.25/p,l=s*n*n+.9375):(n-=2.625/p,l=s*n*n+.984375),l}};ef.easeIn=ef["ease-in"]=ef["<"],ef.easeOut=ef["ease-out"]=ef[">"],ef.easeInOut=ef["ease-in-out"]=ef["<>"],ef["back-in"]=ef.backIn,ef["back-out"]=ef.backOut;var animationElements=[],requestAnimFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){setTimeout(callback,16)},animation=function(){for(var Now=+new Date,l=0;l<animationElements.length;l++){var e=animationElements[l];if(!e.el.removed&&!e.paused){var now,key,time=Now-e.start,ms=e.ms,easing=e.easing,from=e.from,diff=e.diff,to=e.to,that=(e.t,e.el),set={},init={};if(e.initstatus?(time=(e.initstatus*e.anim.top-e.prev)/(e.percent-e.prev)*ms,e.status=e.initstatus,delete e.initstatus,e.stop&&animationElements.splice(l--,1)):e.status=(e.prev+(e.percent-e.prev)*(time/ms))/e.anim.top,!(0>time))if(ms>time){var pos=easing(time/ms);for(var attr in from)if(from[has](attr)){switch(availableAnimAttrs[attr]){case nu:now=+from[attr]+pos*ms*diff[attr];break;case"colour":now="rgb("+[upto255(round(from[attr].r+pos*ms*diff[attr].r)),upto255(round(from[attr].g+pos*ms*diff[attr].g)),upto255(round(from[attr].b+pos*ms*diff[attr].b))].join(",")+")";break;case"path":now=[];for(var i=0,ii=from[attr].length;ii>i;i++){now[i]=[from[attr][i][0]];for(var j=1,jj=from[attr][i].length;jj>j;j++)now[i][j]=+from[attr][i][j]+pos*ms*diff[attr][i][j];now[i]=now[i].join(S)}now=now.join(S);break;case"transform":if(diff[attr].real)for(now=[],i=0,ii=from[attr].length;ii>i;i++)for(now[i]=[from[attr][i][0]],j=1,jj=from[attr][i].length;jj>j;j++)now[i][j]=from[attr][i][j]+pos*ms*diff[attr][i][j];else{var get=function(i){return+from[attr][i]+pos*ms*diff[attr][i]};now=[["m",get(0),get(1),get(2),get(3),get(4),get(5)]]}break;case"csv":if("clip-rect"==attr)for(now=[],i=4;i--;)now[i]=+from[attr][i]+pos*ms*diff[attr][i];break;default:var from2=[][concat](from[attr]);for(now=[],i=that.paper.customAttributes[attr].length;i--;)now[i]=+from2[i]+pos*ms*diff[attr][i]}set[attr]=now}that.attr(set),function(id,that,anim){setTimeout(function(){eve("raphael.anim.frame."+id,that,anim)})}(that.id,that,e.anim)}else{if(function(f,el,a){setTimeout(function(){eve("raphael.anim.frame."+el.id,el,a),eve("raphael.anim.finish."+el.id,el,a),R.is(f,"function")&&f.call(el)})}(e.callback,that,e.anim),that.attr(to),animationElements.splice(l--,1),e.repeat>1&&!e.next){for(key in to)to[has](key)&&(init[key]=e.totalOrigin[key]);e.el.attr(init),runAnimation(e.anim,e.el,e.anim.percents[0],null,e.totalOrigin,e.repeat-1)}e.next&&!e.stop&&runAnimation(e.anim,e.el,e.next,null,e.totalOrigin,e.repeat)}}}R.svg&&that&&that.paper&&that.paper.safari(),animationElements.length&&requestAnimFrame(animation)},upto255=function(color){return color>255?255:0>color?0:color};elproto.animateWith=function(el,anim,params,ms,easing,callback){var element=this;if(element.removed)return callback&&callback.call(element),element;var a=params instanceof Animation?params:R.animation(params,ms,easing,callback);runAnimation(a,element,a.percents[0],null,element.attr());for(var i=0,ii=animationElements.length;ii>i;i++)if(animationElements[i].anim==anim&&animationElements[i].el==el){animationElements[ii-1].start=animationElements[i].start;break}return element},elproto.onAnimation=function(f){return f?eve.on("raphael.anim.frame."+this.id,f):eve.unbind("raphael.anim.frame."+this.id),this},Animation.prototype.delay=function(delay){var a=new Animation(this.anim,this.ms);return a.times=this.times,a.del=+delay||0,a},Animation.prototype.repeat=function(times){var a=new Animation(this.anim,this.ms);return a.del=this.del,a.times=math.floor(mmax(times,0))||1,a},R.animation=function(params,ms,easing,callback){if(params instanceof Animation)return params;(R.is(easing,"function")||!easing)&&(callback=callback||easing||null,easing=null),params=Object(params),ms=+ms||0;var json,attr,p={};for(attr in params)params[has](attr)&&toFloat(attr)!=attr&&toFloat(attr)+"%"!=attr&&(json=!0,p[attr]=params[attr]);return json?(easing&&(p.easing=easing),callback&&(p.callback=callback),new Animation({100:p},ms)):new Animation(params,ms)},elproto.animate=function(params,ms,easing,callback){var element=this;if(element.removed)return callback&&callback.call(element),element;var anim=params instanceof Animation?params:R.animation(params,ms,easing,callback);return runAnimation(anim,element,anim.percents[0],null,element.attr()),element},elproto.setTime=function(anim,value){return anim&&null!=value&&this.status(anim,mmin(value,anim.ms)/anim.ms),this},elproto.status=function(anim,value){var len,e,out=[],i=0;if(null!=value)return runAnimation(anim,this,-1,mmin(value,1)),this;for(len=animationElements.length;len>i;i++)if(e=animationElements[i],e.el.id==this.id&&(!anim||e.anim==anim)){if(anim)return e.status;out.push({anim:e.anim,status:e.status})}return anim?0:out},elproto.pause=function(anim){for(var i=0;i<animationElements.length;i++)animationElements[i].el.id!=this.id||anim&&animationElements[i].anim!=anim||eve("raphael.anim.pause."+this.id,this,animationElements[i].anim)!==!1&&(animationElements[i].paused=!0);return this},elproto.resume=function(anim){for(var i=0;i<animationElements.length;i++)if(animationElements[i].el.id==this.id&&(!anim||animationElements[i].anim==anim)){var e=animationElements[i];eve("raphael.anim.resume."+this.id,this,e.anim)!==!1&&(delete e.paused,this.status(e.anim,e.status))}return this},elproto.stop=function(anim){for(var i=0;i<animationElements.length;i++)animationElements[i].el.id!=this.id||anim&&animationElements[i].anim!=anim||eve("raphael.anim.stop."+this.id,this,animationElements[i].anim)!==!1&&animationElements.splice(i--,1);return this},eve.on("raphael.remove",stopAnimation),eve.on("raphael.clear",stopAnimation),elproto.toString=function(){return"Rapha\xebl\u2019s object"};var Set=function(items){if(this.items=[],this.length=0,this.type="set",items)for(var i=0,ii=items.length;ii>i;i++)!items[i]||items[i].constructor!=elproto.constructor&&items[i].constructor!=Set||(this[this.items.length]=this.items[this.items.length]=items[i],this.length++)},setproto=Set.prototype;setproto.push=function(){for(var item,len,i=0,ii=arguments.length;ii>i;i++)item=arguments[i],!item||item.constructor!=elproto.constructor&&item.constructor!=Set||(len=this.items.length,this[len]=this.items[len]=item,this.length++);return this},setproto.pop=function(){return this.length&&delete this[this.length--],this.items.pop()},setproto.forEach=function(callback,thisArg){for(var i=0,ii=this.items.length;ii>i;i++)if(callback.call(thisArg,this.items[i],i)===!1)return this;return this};for(var method in elproto)elproto[has](method)&&(setproto[method]=function(methodname){return function(){var arg=arguments;return this.forEach(function(el){el[methodname][apply](el,arg)})}}(method));// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://raphaeljs.com)   │ \\
// │ Copyright (c) 2008-2011 Sencha Labs (http://sencha.com)             │ \\
// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://raphaeljs.com)   │ \\
// │ Copyright (c) 2008-2011 Sencha Labs (http://sencha.com)             │ \\
        return setproto.attr=function(name,value){if(name&&R.is(name,array)&&R.is(name[0],"object"))for(var j=0,jj=name.length;jj>j;j++)this.items[j].attr(name[j]);else for(var i=0,ii=this.items.length;ii>i;i++)this.items[i].attr(name,value);return this},setproto.clear=function(){for(;this.length;)this.pop()},setproto.splice=function(index,count){index=0>index?mmax(this.length+index,0):index,count=mmax(0,mmin(this.length-index,count));var i,tail=[],todel=[],args=[];for(i=2;i<arguments.length;i++)args.push(arguments[i]);for(i=0;count>i;i++)todel.push(this[index+i]);for(;i<this.length-index;i++)tail.push(this[index+i]);var arglen=args.length;for(i=0;i<arglen+tail.length;i++)this.items[index+i]=this[index+i]=arglen>i?args[i]:tail[i-arglen];for(i=this.items.length=this.length-=count-arglen;this[i];)delete this[i++];return new Set(todel)},setproto.exclude=function(el){for(var i=0,ii=this.length;ii>i;i++)if(this[i]==el)return this.splice(i,1),!0},setproto.animate=function(params,ms,easing,callback){(R.is(easing,"function")||!easing)&&(callback=easing||null);var item,collector,len=this.items.length,i=len,set=this;if(!len)return this;callback&&(collector=function(){!--len&&callback.call(set)}),easing=R.is(easing,string)?easing:collector;var anim=R.animation(params,ms,easing,collector);for(item=this.items[--i].animate(anim);i--;)this.items[i]&&!this.items[i].removed&&this.items[i].animateWith(item,anim,anim),this.items[i]&&!this.items[i].removed||len--;return this},setproto.insertAfter=function(el){for(var i=this.items.length;i--;)this.items[i].insertAfter(el);return this},setproto.getBBox=function(){for(var x=[],y=[],x2=[],y2=[],i=this.items.length;i--;)if(!this.items[i].removed){var box=this.items[i].getBBox();x.push(box.x),y.push(box.y),x2.push(box.x+box.width),y2.push(box.y+box.height)}return x=mmin[apply](0,x),y=mmin[apply](0,y),x2=mmax[apply](0,x2),y2=mmax[apply](0,y2),{x:x,y:y,x2:x2,y2:y2,width:x2-x,height:y2-y}},setproto.clone=function(s){s=this.paper.set();for(var i=0,ii=this.items.length;ii>i;i++)s.push(this.items[i].clone());return s},setproto.toString=function(){return"Rapha\xebl\u2018s set"},setproto.glow=function(glowConfig){var ret=this.paper.set();return this.forEach(function(shape){var g=shape.glow(glowConfig);null!=g&&g.forEach(function(shape2){ret.push(shape2)})}),ret},setproto.isPointInside=function(x,y){var isPointInside=!1;return this.forEach(function(el){return el.isPointInside(x,y)?(console.log("runned"),isPointInside=!0,!1):void 0}),isPointInside},R.registerFont=function(font){if(!font.face)return font;this.fonts=this.fonts||{};var fontcopy={w:font.w,face:{},glyphs:{}},family=font.face["font-family"];for(var prop in font.face)font.face[has](prop)&&(fontcopy.face[prop]=font.face[prop]);if(this.fonts[family]?this.fonts[family].push(fontcopy):this.fonts[family]=[fontcopy],!font.svg){fontcopy.face["units-per-em"]=toInt(font.face["units-per-em"],10);for(var glyph in font.glyphs)if(font.glyphs[has](glyph)){var path=font.glyphs[glyph];if(fontcopy.glyphs[glyph]={w:path.w,k:{},d:path.d&&"M"+path.d.replace(/[mlcxtrv]/g,function(command){return{l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"}[command]||"M"})+"z"},path.k)for(var k in path.k)path[has](k)&&(fontcopy.glyphs[glyph].k[k]=path.k[k])}}return font},paperproto.getFont=function(family,weight,style,stretch){if(stretch=stretch||"normal",style=style||"normal",weight=+weight||{normal:400,bold:700,lighter:300,bolder:800}[weight]||400,R.fonts){var font=R.fonts[family];if(!font){var name=new RegExp("(^|\\s)"+family.replace(/[^\w\d\s+!~.:_-]/g,E)+"(\\s|$)","i");for(var fontName in R.fonts)if(R.fonts[has](fontName)&&name.test(fontName)){font=R.fonts[fontName];break}}var thefont;if(font)for(var i=0,ii=font.length;ii>i&&(thefont=font[i],thefont.face["font-weight"]!=weight||thefont.face["font-style"]!=style&&thefont.face["font-style"]||thefont.face["font-stretch"]!=stretch);i++);return thefont}},paperproto.print=function(x,y,string,font,size,origin,letter_spacing,line_spacing){origin=origin||"middle",letter_spacing=mmax(mmin(letter_spacing||0,1),-1),line_spacing=mmax(mmin(line_spacing||1,3),1);var scale,letters=Str(string)[split](E),shift=0,notfirst=0,path=E;if(R.is(font,"string")&&(font=this.getFont(font)),font){scale=(size||16)/font.face["units-per-em"];for(var bb=font.face.bbox[split](separator),top=+bb[0],lineHeight=bb[3]-bb[1],shifty=0,height=+bb[1]+("baseline"==origin?lineHeight+ +font.face.descent:lineHeight/2),i=0,ii=letters.length;ii>i;i++){if("\n"==letters[i])shift=0,curr=0,notfirst=0,shifty+=lineHeight*line_spacing;else{var prev=notfirst&&font.glyphs[letters[i-1]]||{},curr=font.glyphs[letters[i]];shift+=notfirst?(prev.w||font.w)+(prev.k&&prev.k[letters[i]]||0)+font.w*letter_spacing:0,notfirst=1}curr&&curr.d&&(path+=R.transformPath(curr.d,["t",shift*scale,shifty*scale,"s",scale,scale,top,height,"t",(x-top)/scale,(y-height)/scale]))}}return this.path(path).attr({fill:"#000",stroke:"none"})},paperproto.add=function(json){if(R.is(json,"array"))for(var j,res=this.set(),i=0,ii=json.length;ii>i;i++)j=json[i]||{},elements[has](j.type)&&res.push(this[j.type]().attr(j));return res},R.format=function(token,params){var args=R.is(params,array)?[0][concat](params):arguments;return token&&R.is(token,string)&&args.length-1&&(token=token.replace(formatrg,function(str,i){return null==args[++i]?E:args[i]})),token||E},R.fullfill=function(){var tokenRegex=/\{([^\}]+)\}/g,objNotationRegex=/(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,replacer=function(all,key,obj){var res=obj;return key.replace(objNotationRegex,function(all,name,quote,quotedName,isFunc){name=name||quotedName,res&&(name in res&&(res=res[name]),"function"==typeof res&&isFunc&&(res=res()))}),res=(null==res||res==obj?all:res)+""};return function(str,obj){return String(str).replace(tokenRegex,function(all,key){return replacer(all,key,obj)})}}(),R.ninja=function(){return oldRaphael.was?g.win.Raphael=oldRaphael.is:delete Raphael,R},R.st=setproto,function(doc,loaded,f){function isLoaded(){/in/.test(doc.readyState)?setTimeout(isLoaded,9):R.eve("raphael.DOMload")}null==doc.readyState&&doc.addEventListener&&(doc.addEventListener(loaded,f=function(){doc.removeEventListener(loaded,f,!1),doc.readyState="complete"},!1),doc.readyState="loading"),isLoaded()}(document,"DOMContentLoaded"),eve.on("raphael.DOMload",function(){loaded=!0}),function(){if(R.svg){var has="hasOwnProperty",Str=String,toFloat=parseFloat,toInt=parseInt,math=Math,mmax=math.max,abs=math.abs,pow=math.pow,separator=/[, ]+/,eve=R.eve,E="",S=" ",xlink="http://www.w3.org/1999/xlink",markers={block:"M5,0 0,2.5 5,5z",classic:"M5,0 0,2.5 5,5 3.5,3 3.5,2z",diamond:"M2.5,0 5,2.5 2.5,5 0,2.5z",open:"M6,1 1,3.5 6,6",oval:"M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"},markerCounter={};R.toString=function(){return"Your browser supports SVG.\nYou are running Rapha\xebl "+this.version};var $=function(el,attr){if(attr){"string"==typeof el&&(el=$(el));for(var key in attr)attr[has](key)&&("xlink:"==key.substring(0,6)?el.setAttributeNS(xlink,key.substring(6),Str(attr[key])):el.setAttribute(key,Str(attr[key])))}else el=R._g.doc.createElementNS("http://www.w3.org/2000/svg",el),el.style&&(el.style.webkitTapHighlightColor="rgba(0,0,0,0)");return el},addGradientFill=function(element,gradient){var type="linear",id=element.id+gradient,fx=.5,fy=.5,o=element.node,SVG=element.paper,s=o.style,el=R._g.doc.getElementById(id);if(!el){if(gradient=Str(gradient).replace(R._radial_gradient,function(all,_fx,_fy){if(type="radial",_fx&&_fy){fx=toFloat(_fx),fy=toFloat(_fy);var dir=2*(fy>.5)-1;pow(fx-.5,2)+pow(fy-.5,2)>.25&&(fy=math.sqrt(.25-pow(fx-.5,2))*dir+.5)&&.5!=fy&&(fy=fy.toFixed(5)-1e-5*dir)}return E}),gradient=gradient.split(/\s*\-\s*/),"linear"==type){var angle=gradient.shift();if(angle=-toFloat(angle),isNaN(angle))return null;var vector=[0,0,math.cos(R.rad(angle)),math.sin(R.rad(angle))],max=1/(mmax(abs(vector[2]),abs(vector[3]))||1);vector[2]*=max,vector[3]*=max,vector[2]<0&&(vector[0]=-vector[2],vector[2]=0),vector[3]<0&&(vector[1]=-vector[3],vector[3]=0)}var dots=R._parseDots(gradient);if(!dots)return null;if(id=id.replace(/[\(\)\s,\xb0#]/g,"_"),element.gradient&&id!=element.gradient.id&&(SVG.defs.removeChild(element.gradient),delete element.gradient),!element.gradient){el=$(type+"Gradient",{id:id}),element.gradient=el,$(el,"radial"==type?{fx:fx,fy:fy}:{x1:vector[0],y1:vector[1],x2:vector[2],y2:vector[3],gradientTransform:element.matrix.invert()}),SVG.defs.appendChild(el);for(var i=0,ii=dots.length;ii>i;i++)el.appendChild($("stop",{offset:dots[i].offset?dots[i].offset:i?"100%":"0%","stop-color":dots[i].color||"#fff"}))}}return $(o,{fill:"url(#"+id+")",opacity:1,"fill-opacity":1}),s.fill=E,s.opacity=1,s.fillOpacity=1,1},updatePosition=function(o){var bbox=o.getBBox(1);$(o.pattern,{patternTransform:o.matrix.invert()+" translate("+bbox.x+","+bbox.y+")"})},addArrow=function(o,value,isEnd){if("path"==o.type){for(var from,to,dx,refX,attr,values=Str(value).toLowerCase().split("-"),p=o.paper,se=isEnd?"end":"start",node=o.node,attrs=o.attrs,stroke=attrs["stroke-width"],i=values.length,type="classic",w=3,h=3,t=5;i--;)switch(values[i]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":type=values[i];break;case"wide":h=5;break;case"narrow":h=2;break;case"long":w=5;break;case"short":w=2}if("open"==type?(w+=2,h+=2,t+=2,dx=1,refX=isEnd?4:1,attr={fill:"none",stroke:attrs.stroke}):(refX=dx=w/2,attr={fill:attrs.stroke,stroke:"none"}),o._.arrows?isEnd?(o._.arrows.endPath&&markerCounter[o._.arrows.endPath]--,o._.arrows.endMarker&&markerCounter[o._.arrows.endMarker]--):(o._.arrows.startPath&&markerCounter[o._.arrows.startPath]--,o._.arrows.startMarker&&markerCounter[o._.arrows.startMarker]--):o._.arrows={},"none"!=type){var pathId="raphael-marker-"+type,markerId="raphael-marker-"+se+type+w+h;R._g.doc.getElementById(pathId)?markerCounter[pathId]++:(p.defs.appendChild($($("path"),{"stroke-linecap":"round",d:markers[type],id:pathId})),markerCounter[pathId]=1);var use,marker=R._g.doc.getElementById(markerId);marker?(markerCounter[markerId]++,use=marker.getElementsByTagName("use")[0]):(marker=$($("marker"),{id:markerId,markerHeight:h,markerWidth:w,orient:"auto",refX:refX,refY:h/2}),use=$($("use"),{"xlink:href":"#"+pathId,transform:(isEnd?"rotate(180 "+w/2+" "+h/2+") ":E)+"scale("+w/t+","+h/t+")","stroke-width":(1/((w/t+h/t)/2)).toFixed(4)}),marker.appendChild(use),p.defs.appendChild(marker),markerCounter[markerId]=1),$(use,attr);var delta=dx*("diamond"!=type&&"oval"!=type);isEnd?(from=o._.arrows.startdx*stroke||0,to=R.getTotalLength(attrs.path)-delta*stroke):(from=delta*stroke,to=R.getTotalLength(attrs.path)-(o._.arrows.enddx*stroke||0)),attr={},attr["marker-"+se]="url(#"+markerId+")",(to||from)&&(attr.d=R.getSubpath(attrs.path,from,to)),$(node,attr),o._.arrows[se+"Path"]=pathId,o._.arrows[se+"Marker"]=markerId,o._.arrows[se+"dx"]=delta,o._.arrows[se+"Type"]=type,o._.arrows[se+"String"]=value}else isEnd?(from=o._.arrows.startdx*stroke||0,to=R.getTotalLength(attrs.path)-from):(from=0,to=R.getTotalLength(attrs.path)-(o._.arrows.enddx*stroke||0)),o._.arrows[se+"Path"]&&$(node,{d:R.getSubpath(attrs.path,from,to)}),delete o._.arrows[se+"Path"],delete o._.arrows[se+"Marker"],delete o._.arrows[se+"dx"],delete o._.arrows[se+"Type"],delete o._.arrows[se+"String"];for(attr in markerCounter)if(markerCounter[has](attr)&&!markerCounter[attr]){var item=R._g.doc.getElementById(attr);item&&item.parentNode.removeChild(item)}}},dasharray={"":[0],none:[0],"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},addDashes=function(o,value,params){if(value=dasharray[Str(value).toLowerCase()]){for(var width=o.attrs["stroke-width"]||"1",butt={round:width,square:width,butt:0}[o.attrs["stroke-linecap"]||params["stroke-linecap"]]||0,dashes=[],i=value.length;i--;)dashes[i]=value[i]*width+(i%2?1:-1)*butt;$(o.node,{"stroke-dasharray":dashes.join(",")})}},setFillAndStroke=function(o,params){var node=o.node,attrs=o.attrs,vis=node.style.visibility;node.style.visibility="hidden";for(var att in params)if(params[has](att)){if(!R._availableAttrs[has](att))continue;var value=params[att];switch(attrs[att]=value,att){case"blur":o.blur(value);break;case"href":case"title":var hl=$("title"),val=R._g.doc.createTextNode(value);hl.appendChild(val),node.appendChild(hl);break;case"target":var pn=node.parentNode;if("a"!=pn.tagName.toLowerCase()){var hl=$("a");pn.insertBefore(hl,node),hl.appendChild(node),pn=hl}"target"==att?pn.setAttributeNS(xlink,"show","blank"==value?"new":value):pn.setAttributeNS(xlink,att,value);break;case"cursor":node.style.cursor=value;break;case"transform":o.transform(value);break;case"arrow-start":addArrow(o,value);break;case"arrow-end":addArrow(o,value,1);break;case"clip-rect":var rect=Str(value).split(separator);if(4==rect.length){o.clip&&o.clip.parentNode.parentNode.removeChild(o.clip.parentNode);var el=$("clipPath"),rc=$("rect");el.id=R.createUUID(),$(rc,{x:rect[0],y:rect[1],width:rect[2],height:rect[3]}),el.appendChild(rc),o.paper.defs.appendChild(el),$(node,{"clip-path":"url(#"+el.id+")"}),o.clip=rc}if(!value){var path=node.getAttribute("clip-path");if(path){var clip=R._g.doc.getElementById(path.replace(/(^url\(#|\)$)/g,E));clip&&clip.parentNode.removeChild(clip),$(node,{"clip-path":E}),delete o.clip}}break;case"path":"path"==o.type&&($(node,{d:value?attrs.path=R._pathToAbsolute(value):"M0,0"}),o._.dirty=1,o._.arrows&&("startString"in o._.arrows&&addArrow(o,o._.arrows.startString),"endString"in o._.arrows&&addArrow(o,o._.arrows.endString,1)));break;case"width":if(node.setAttribute(att,value),o._.dirty=1,!attrs.fx)break;att="x",value=attrs.x;case"x":attrs.fx&&(value=-attrs.x-(attrs.width||0));case"rx":if("rx"==att&&"rect"==o.type)break;case"cx":node.setAttribute(att,value),o.pattern&&updatePosition(o),o._.dirty=1;break;case"height":if(node.setAttribute(att,value),o._.dirty=1,!attrs.fy)break;att="y",value=attrs.y;case"y":attrs.fy&&(value=-attrs.y-(attrs.height||0));case"ry":if("ry"==att&&"rect"==o.type)break;case"cy":node.setAttribute(att,value),o.pattern&&updatePosition(o),o._.dirty=1;break;case"r":"rect"==o.type?$(node,{rx:value,ry:value}):node.setAttribute(att,value),o._.dirty=1;break;case"src":"image"==o.type&&node.setAttributeNS(xlink,"href",value);break;case"stroke-width":(1!=o._.sx||1!=o._.sy)&&(value/=mmax(abs(o._.sx),abs(o._.sy))||1),o.paper._vbSize&&(value*=o.paper._vbSize),node.setAttribute(att,value),attrs["stroke-dasharray"]&&addDashes(o,attrs["stroke-dasharray"],params),o._.arrows&&("startString"in o._.arrows&&addArrow(o,o._.arrows.startString),"endString"in o._.arrows&&addArrow(o,o._.arrows.endString,1));break;case"stroke-dasharray":addDashes(o,value,params);break;case"fill":var isURL=Str(value).match(R._ISURL);if(isURL){el=$("pattern");var ig=$("image");el.id=R.createUUID(),$(el,{x:0,y:0,patternUnits:"userSpaceOnUse",height:1,width:1}),$(ig,{x:0,y:0,"xlink:href":isURL[1]}),el.appendChild(ig),function(el){R._preload(isURL[1],function(){var w=this.offsetWidth,h=this.offsetHeight;$(el,{width:w,height:h}),$(ig,{width:w,height:h}),o.paper.safari()})}(el),o.paper.defs.appendChild(el),$(node,{fill:"url(#"+el.id+")"}),o.pattern=el,o.pattern&&updatePosition(o);break}var clr=R.getRGB(value);if(clr.error){if(("circle"==o.type||"ellipse"==o.type||"r"!=Str(value).charAt())&&addGradientFill(o,value)){if("opacity"in attrs||"fill-opacity"in attrs){var gradient=R._g.doc.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g,E));if(gradient){var stops=gradient.getElementsByTagName("stop");$(stops[stops.length-1],{"stop-opacity":("opacity"in attrs?attrs.opacity:1)*("fill-opacity"in attrs?attrs["fill-opacity"]:1)})}}attrs.gradient=value,attrs.fill="none";break}}else delete params.gradient,delete attrs.gradient,!R.is(attrs.opacity,"undefined")&&R.is(params.opacity,"undefined")&&$(node,{opacity:attrs.opacity}),!R.is(attrs["fill-opacity"],"undefined")&&R.is(params["fill-opacity"],"undefined")&&$(node,{"fill-opacity":attrs["fill-opacity"]});clr[has]("opacity")&&$(node,{"fill-opacity":clr.opacity>1?clr.opacity/100:clr.opacity});case"stroke":clr=R.getRGB(value),node.setAttribute(att,clr.hex),"stroke"==att&&clr[has]("opacity")&&$(node,{"stroke-opacity":clr.opacity>1?clr.opacity/100:clr.opacity}),"stroke"==att&&o._.arrows&&("startString"in o._.arrows&&addArrow(o,o._.arrows.startString),"endString"in o._.arrows&&addArrow(o,o._.arrows.endString,1));break;case"gradient":("circle"==o.type||"ellipse"==o.type||"r"!=Str(value).charAt())&&addGradientFill(o,value);break;case"opacity":attrs.gradient&&!attrs[has]("stroke-opacity")&&$(node,{"stroke-opacity":value>1?value/100:value});case"fill-opacity":if(attrs.gradient){gradient=R._g.doc.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g,E)),gradient&&(stops=gradient.getElementsByTagName("stop"),$(stops[stops.length-1],{"stop-opacity":value}));break}default:"font-size"==att&&(value=toInt(value,10)+"px");var cssrule=att.replace(/(\-.)/g,function(w){return w.substring(1).toUpperCase()});node.style[cssrule]=value,o._.dirty=1,node.setAttribute(att,value)}}tuneText(o,params),node.style.visibility=vis},leading=1.2,tuneText=function(el,params){if("text"==el.type&&(params[has]("text")||params[has]("font")||params[has]("font-size")||params[has]("x")||params[has]("y"))){var a=el.attrs,node=el.node,fontSize=node.firstChild?toInt(R._g.doc.defaultView.getComputedStyle(node.firstChild,E).getPropertyValue("font-size"),10):10;if(params[has]("text")){for(a.text=params.text;node.firstChild;)node.removeChild(node.firstChild);for(var tspan,texts=Str(params.text).split("\n"),tspans=[],i=0,ii=texts.length;ii>i;i++)tspan=$("tspan"),i&&$(tspan,{dy:fontSize*leading,x:a.x}),tspan.appendChild(R._g.doc.createTextNode(texts[i])),node.appendChild(tspan),tspans[i]=tspan}else for(tspans=node.getElementsByTagName("tspan"),i=0,ii=tspans.length;ii>i;i++)i?$(tspans[i],{dy:fontSize*leading,x:a.x}):$(tspans[0],{dy:0});$(node,{x:a.x,y:a.y}),el._.dirty=1;var bb=el._getBBox(),dif=a.y-(bb.y+bb.height/2);dif&&R.is(dif,"finite")&&$(tspans[0],{dy:dif})}},Element=function(node,svg){this[0]=this.node=node,node.raphael=!0,this.id=R._oid++,node.raphaelid=this.id,this.matrix=R.matrix(),this.realPath=null,this.paper=svg,this.attrs=this.attrs||{},this._={transform:[],sx:1,sy:1,deg:0,dx:0,dy:0,dirty:1},!svg.bottom&&(svg.bottom=this),this.prev=svg.top,svg.top&&(svg.top.next=this),svg.top=this,this.next=null},elproto=R.el;Element.prototype=elproto,elproto.constructor=Element,R._engine.path=function(pathString,SVG){var el=$("path");SVG.canvas&&SVG.canvas.appendChild(el);var p=new Element(el,SVG);return p.type="path",setFillAndStroke(p,{fill:"none",stroke:"#000",path:pathString}),p},elproto.rotate=function(deg,cx,cy){if(this.removed)return this;if(deg=Str(deg).split(separator),deg.length-1&&(cx=toFloat(deg[1]),cy=toFloat(deg[2])),deg=toFloat(deg[0]),null==cy&&(cx=cy),null==cx||null==cy){var bbox=this.getBBox(1);cx=bbox.x+bbox.width/2,cy=bbox.y+bbox.height/2}return this.transform(this._.transform.concat([["r",deg,cx,cy]])),this},elproto.scale=function(sx,sy,cx,cy){if(this.removed)return this;if(sx=Str(sx).split(separator),sx.length-1&&(sy=toFloat(sx[1]),cx=toFloat(sx[2]),cy=toFloat(sx[3])),sx=toFloat(sx[0]),null==sy&&(sy=sx),null==cy&&(cx=cy),null==cx||null==cy)var bbox=this.getBBox(1);return cx=null==cx?bbox.x+bbox.width/2:cx,cy=null==cy?bbox.y+bbox.height/2:cy,this.transform(this._.transform.concat([["s",sx,sy,cx,cy]])),this},elproto.translate=function(dx,dy){return this.removed?this:(dx=Str(dx).split(separator),dx.length-1&&(dy=toFloat(dx[1])),dx=toFloat(dx[0])||0,dy=+dy||0,this.transform(this._.transform.concat([["t",dx,dy]])),this)},elproto.transform=function(tstr){var _=this._;if(null==tstr)return _.transform;if(R._extractTransform(this,tstr),this.clip&&$(this.clip,{transform:this.matrix.invert()}),this.pattern&&updatePosition(this),this.node&&$(this.node,{transform:this.matrix}),1!=_.sx||1!=_.sy){var sw=this.attrs[has]("stroke-width")?this.attrs["stroke-width"]:1;this.attr({"stroke-width":sw})}return this},elproto.hide=function(){return!this.removed&&this.paper.safari(this.node.style.display="none"),this},elproto.show=function(){return!this.removed&&this.paper.safari(this.node.style.display=""),this},elproto.remove=function(){if(!this.removed&&this.node.parentNode){var paper=this.paper;paper.__set__&&paper.__set__.exclude(this),eve.unbind("raphael.*.*."+this.id),this.gradient&&paper.defs.removeChild(this.gradient),R._tear(this,paper),"a"==this.node.parentNode.tagName.toLowerCase()?this.node.parentNode.parentNode.removeChild(this.node.parentNode):this.node.parentNode.removeChild(this.node);for(var i in this)this[i]="function"==typeof this[i]?R._removedFactory(i):null;this.removed=!0}},elproto._getBBox=function(){if("none"==this.node.style.display){this.show();var hide=!0}var bbox={};try{bbox=this.node.getBBox()}catch(e){}finally{bbox=bbox||{}}return hide&&this.hide(),bbox},elproto.attr=function(name,value){if(this.removed)return this;if(null==name){var res={};for(var a in this.attrs)this.attrs[has](a)&&(res[a]=this.attrs[a]);return res.gradient&&"none"==res.fill&&(res.fill=res.gradient)&&delete res.gradient,res.transform=this._.transform,res}if(null==value&&R.is(name,"string")){if("fill"==name&&"none"==this.attrs.fill&&this.attrs.gradient)return this.attrs.gradient;if("transform"==name)return this._.transform;for(var names=name.split(separator),out={},i=0,ii=names.length;ii>i;i++)name=names[i],out[name]=name in this.attrs?this.attrs[name]:R.is(this.paper.customAttributes[name],"function")?this.paper.customAttributes[name].def:R._availableAttrs[name];return ii-1?out:out[names[0]]}if(null==value&&R.is(name,"array")){for(out={},i=0,ii=name.length;ii>i;i++)out[name[i]]=this.attr(name[i]);return out}if(null!=value){var params={};params[name]=value}else null!=name&&R.is(name,"object")&&(params=name);for(var key in params)eve("raphael.attr."+key+"."+this.id,this,params[key]);for(key in this.paper.customAttributes)if(this.paper.customAttributes[has](key)&&params[has](key)&&R.is(this.paper.customAttributes[key],"function")){var par=this.paper.customAttributes[key].apply(this,[].concat(params[key]));this.attrs[key]=params[key];for(var subkey in par)par[has](subkey)&&(params[subkey]=par[subkey])}return setFillAndStroke(this,params),this},elproto.toFront=function(){if(this.removed)return this;"a"==this.node.parentNode.tagName.toLowerCase()?this.node.parentNode.parentNode.appendChild(this.node.parentNode):this.node.parentNode.appendChild(this.node);var svg=this.paper;return svg.top!=this&&R._tofront(this,svg),this},elproto.toBack=function(){if(this.removed)return this;var parent=this.node.parentNode;"a"==parent.tagName.toLowerCase()?parent.parentNode.insertBefore(this.node.parentNode,this.node.parentNode.parentNode.firstChild):parent.firstChild!=this.node&&parent.insertBefore(this.node,this.node.parentNode.firstChild),R._toback(this,this.paper);this.paper;return this},elproto.insertAfter=function(element){if(this.removed)return this;var node=element.node||element[element.length-1].node;return node.nextSibling?node.parentNode.insertBefore(this.node,node.nextSibling):node.parentNode.appendChild(this.node),R._insertafter(this,element,this.paper),this},elproto.insertBefore=function(element){if(this.removed)return this;var node=element.node||element[0].node;return node.parentNode.insertBefore(this.node,node),R._insertbefore(this,element,this.paper),this},elproto.blur=function(size){var t=this;if(0!==+size){var fltr=$("filter"),blur=$("feGaussianBlur");t.attrs.blur=size,fltr.id=R.createUUID(),$(blur,{stdDeviation:+size||1.5}),fltr.appendChild(blur),t.paper.defs.appendChild(fltr),t._blur=fltr,$(t.node,{filter:"url(#"+fltr.id+")"})}else t._blur&&(t._blur.parentNode.removeChild(t._blur),delete t._blur,delete t.attrs.blur),t.node.removeAttribute("filter");return t},R._engine.circle=function(svg,x,y,r){var el=$("circle");svg.canvas&&svg.canvas.appendChild(el);var res=new Element(el,svg);return res.attrs={cx:x,cy:y,r:r,fill:"none",stroke:"#000"},res.type="circle",$(el,res.attrs),res},R._engine.rect=function(svg,x,y,w,h,r){var el=$("rect");svg.canvas&&svg.canvas.appendChild(el);var res=new Element(el,svg);return res.attrs={x:x,y:y,width:w,height:h,r:r||0,rx:r||0,ry:r||0,fill:"none",stroke:"#000"},res.type="rect",$(el,res.attrs),res},R._engine.ellipse=function(svg,x,y,rx,ry){var el=$("ellipse");svg.canvas&&svg.canvas.appendChild(el);var res=new Element(el,svg);return res.attrs={cx:x,cy:y,rx:rx,ry:ry,fill:"none",stroke:"#000"},res.type="ellipse",$(el,res.attrs),res},R._engine.image=function(svg,src,x,y,w,h){var el=$("image");$(el,{x:x,y:y,width:w,height:h,preserveAspectRatio:"none"}),el.setAttributeNS(xlink,"href",src),svg.canvas&&svg.canvas.appendChild(el);var res=new Element(el,svg);return res.attrs={x:x,y:y,width:w,height:h,src:src},res.type="image",res},R._engine.text=function(svg,x,y,text){var el=$("text");svg.canvas&&svg.canvas.appendChild(el);var res=new Element(el,svg);return res.attrs={x:x,y:y,"text-anchor":"middle",text:text,font:R._availableAttrs.font,stroke:"none",fill:"#000"},res.type="text",setFillAndStroke(res,res.attrs),res},R._engine.setSize=function(width,height){return this.width=width||this.width,this.height=height||this.height,this.canvas.setAttribute("width",this.width),this.canvas.setAttribute("height",this.height),this._viewBox&&this.setViewBox.apply(this,this._viewBox),this},R._engine.create=function(){var con=R._getContainer.apply(0,arguments),container=con&&con.container,x=con.x,y=con.y,width=con.width,height=con.height;if(!container)throw new Error("SVG container not found.");var isFloating,cnvs=$("svg"),css="overflow:hidden;";return x=x||0,y=y||0,width=width||512,height=height||342,$(cnvs,{height:height,version:1.1,width:width,xmlns:"http://www.w3.org/2000/svg"}),1==container?(cnvs.style.cssText=css+"position:absolute;left:"+x+"px;top:"+y+"px",R._g.doc.body.appendChild(cnvs),isFloating=1):(cnvs.style.cssText=css+"position:relative",container.firstChild?container.insertBefore(cnvs,container.firstChild):container.appendChild(cnvs)),container=new R._Paper,container.width=width,container.height=height,container.canvas=cnvs,container.clear(),container._left=container._top=0,isFloating&&(container.renderfix=function(){}),container.renderfix(),container},R._engine.setViewBox=function(x,y,w,h,fit){eve("raphael.setViewBox",this,this._viewBox,[x,y,w,h,fit]);var vb,sw,size=mmax(w/this.width,h/this.height),top=this.top,aspectRatio=fit?"meet":"xMinYMin";for(null==x?(this._vbSize&&(size=1),delete this._vbSize,vb="0 0 "+this.width+S+this.height):(this._vbSize=size,vb=x+S+y+S+w+S+h),$(this.canvas,{viewBox:vb,preserveAspectRatio:aspectRatio});size&&top;)sw="stroke-width"in top.attrs?top.attrs["stroke-width"]:1,top.attr({"stroke-width":sw}),top._.dirty=1,top._.dirtyT=1,top=top.prev;return this._viewBox=[x,y,w,h,!!fit],this},R.prototype.renderfix=function(){var pos,cnvs=this.canvas,s=cnvs.style;try{pos=cnvs.getScreenCTM()||cnvs.createSVGMatrix()}catch(e){pos=cnvs.createSVGMatrix()}var left=-pos.e%1,top=-pos.f%1;(left||top)&&(left&&(this._left=(this._left+left)%1,s.left=this._left+"px"),top&&(this._top=(this._top+top)%1,s.top=this._top+"px"))},R.prototype.clear=function(){R.eve("raphael.clear",this);for(var c=this.canvas;c.firstChild;)c.removeChild(c.firstChild);this.bottom=this.top=null,(this.desc=$("desc")).appendChild(R._g.doc.createTextNode("Created with Rapha\xebl "+R.version)),c.appendChild(this.desc),c.appendChild(this.defs=$("defs"))},R.prototype.remove=function(){eve("raphael.remove",this),this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);for(var i in this)this[i]="function"==typeof this[i]?R._removedFactory(i):null};var setproto=R.st;for(var method in elproto)elproto[has](method)&&!setproto[has](method)&&(setproto[method]=function(methodname){return function(){var arg=arguments;return this.forEach(function(el){el[methodname].apply(el,arg)})}}(method))}}(),function(){if(R.vml){var has="hasOwnProperty",Str=String,toFloat=parseFloat,math=Math,round=math.round,mmax=math.max,mmin=math.min,abs=math.abs,fillString="fill",separator=/[, ]+/,eve=R.eve,ms=" progid:DXImageTransform.Microsoft",S=" ",E="",map={M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"},bites=/([clmz]),?([^clmz]*)/gi,blurregexp=/ progid:\S+Blur\([^\)]+\)/g,val=/-?[^,\s-]+/g,cssDot="position:absolute;left:0;top:0;width:1px;height:1px",zoom=21600,pathTypes={path:1,rect:1,image:1},ovalTypes={circle:1,ellipse:1},path2vml=function(path){var total=/[ahqstv]/gi,command=R._pathToAbsolute;if(Str(path).match(total)&&(command=R._path2curve),total=/[clmz]/g,command==R._pathToAbsolute&&!Str(path).match(total)){var res=Str(path).replace(bites,function(all,command,args){var vals=[],isMove="m"==command.toLowerCase(),res=map[command];return args.replace(val,function(value){isMove&&2==vals.length&&(res+=vals+map["m"==command?"l":"L"],vals=[]),vals.push(round(value*zoom))}),res+vals});return res}var p,r,pa=command(path);res=[];for(var i=0,ii=pa.length;ii>i;i++){p=pa[i],r=pa[i][0].toLowerCase(),"z"==r&&(r="x");for(var j=1,jj=p.length;jj>j;j++)r+=round(p[j]*zoom)+(j!=jj-1?",":E);res.push(r)}return res.join(S)},compensation=function(deg,dx,dy){var m=R.matrix();return m.rotate(-deg,.5,.5),{dx:m.x(dx,dy),dy:m.y(dx,dy)}},setCoords=function(p,sx,sy,dx,dy,deg){var _=p._,m=p.matrix,fillpos=_.fillpos,o=p.node,s=o.style,y=1,flip="",kx=zoom/sx,ky=zoom/sy;if(s.visibility="hidden",sx&&sy){if(o.coordsize=abs(kx)+S+abs(ky),s.rotation=deg*(0>sx*sy?-1:1),deg){var c=compensation(deg,dx,dy);dx=c.dx,dy=c.dy}if(0>sx&&(flip+="x"),0>sy&&(flip+=" y")&&(y=-1),s.flip=flip,o.coordorigin=dx*-kx+S+dy*-ky,fillpos||_.fillsize){var fill=o.getElementsByTagName(fillString);fill=fill&&fill[0],o.removeChild(fill),fillpos&&(c=compensation(deg,m.x(fillpos[0],fillpos[1]),m.y(fillpos[0],fillpos[1])),fill.position=c.dx*y+S+c.dy*y),_.fillsize&&(fill.size=_.fillsize[0]*abs(sx)+S+_.fillsize[1]*abs(sy)),o.appendChild(fill)}s.visibility="visible"}};R.toString=function(){return"Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl "+this.version};var addArrow=function(o,value,isEnd){for(var values=Str(value).toLowerCase().split("-"),se=isEnd?"end":"start",i=values.length,type="classic",w="medium",h="medium";i--;)switch(values[i]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":type=values[i];break;case"wide":case"narrow":h=values[i];break;case"long":case"short":w=values[i]}var stroke=o.node.getElementsByTagName("stroke")[0];stroke[se+"arrow"]=type,stroke[se+"arrowlength"]=w,stroke[se+"arrowwidth"]=h},setFillAndStroke=function(o,params){o.attrs=o.attrs||{};var node=o.node,a=o.attrs,s=node.style,newpath=pathTypes[o.type]&&(params.x!=a.x||params.y!=a.y||params.width!=a.width||params.height!=a.height||params.cx!=a.cx||params.cy!=a.cy||params.rx!=a.rx||params.ry!=a.ry||params.r!=a.r),isOval=ovalTypes[o.type]&&(a.cx!=params.cx||a.cy!=params.cy||a.r!=params.r||a.rx!=params.rx||a.ry!=params.ry),res=o;for(var par in params)params[has](par)&&(a[par]=params[par]);if(newpath&&(a.path=R._getPath[o.type](o),o._.dirty=1),params.href&&(node.href=params.href),params.title&&(node.title=params.title),params.target&&(node.target=params.target),params.cursor&&(s.cursor=params.cursor),"blur"in params&&o.blur(params.blur),(params.path&&"path"==o.type||newpath)&&(node.path=path2vml(~Str(a.path).toLowerCase().indexOf("r")?R._pathToAbsolute(a.path):a.path),"image"==o.type&&(o._.fillpos=[a.x,a.y],o._.fillsize=[a.width,a.height],setCoords(o,1,1,0,0,0))),"transform"in params&&o.transform(params.transform),isOval){var cx=+a.cx,cy=+a.cy,rx=+a.rx||+a.r||0,ry=+a.ry||+a.r||0;node.path=R.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x",round((cx-rx)*zoom),round((cy-ry)*zoom),round((cx+rx)*zoom),round((cy+ry)*zoom),round(cx*zoom)),o._.dirty=1}if("clip-rect"in params){var rect=Str(params["clip-rect"]).split(separator);if(4==rect.length){rect[2]=+rect[2]+ +rect[0],rect[3]=+rect[3]+ +rect[1];var div=node.clipRect||R._g.doc.createElement("div"),dstyle=div.style;dstyle.clip=R.format("rect({1}px {2}px {3}px {0}px)",rect),node.clipRect||(dstyle.position="absolute",dstyle.top=0,dstyle.left=0,dstyle.width=o.paper.width+"px",dstyle.height=o.paper.height+"px",node.parentNode.insertBefore(div,node),div.appendChild(node),node.clipRect=div)}params["clip-rect"]||node.clipRect&&(node.clipRect.style.clip="auto")}if(o.textpath){var textpathStyle=o.textpath.style;params.font&&(textpathStyle.font=params.font),params["font-family"]&&(textpathStyle.fontFamily='"'+params["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g,E)+'"'),params["font-size"]&&(textpathStyle.fontSize=params["font-size"]),params["font-weight"]&&(textpathStyle.fontWeight=params["font-weight"]),params["font-style"]&&(textpathStyle.fontStyle=params["font-style"])
        }if("arrow-start"in params&&addArrow(res,params["arrow-start"]),"arrow-end"in params&&addArrow(res,params["arrow-end"],1),null!=params.opacity||null!=params["stroke-width"]||null!=params.fill||null!=params.src||null!=params.stroke||null!=params["stroke-width"]||null!=params["stroke-opacity"]||null!=params["fill-opacity"]||null!=params["stroke-dasharray"]||null!=params["stroke-miterlimit"]||null!=params["stroke-linejoin"]||null!=params["stroke-linecap"]){var fill=node.getElementsByTagName(fillString),newfill=!1;if(fill=fill&&fill[0],!fill&&(newfill=fill=createNode(fillString)),"image"==o.type&&params.src&&(fill.src=params.src),params.fill&&(fill.on=!0),(null==fill.on||"none"==params.fill||null===params.fill)&&(fill.on=!1),fill.on&&params.fill){var isURL=Str(params.fill).match(R._ISURL);if(isURL){fill.parentNode==node&&node.removeChild(fill),fill.rotate=!0,fill.src=isURL[1],fill.type="tile";var bbox=o.getBBox(1);fill.position=bbox.x+S+bbox.y,o._.fillpos=[bbox.x,bbox.y],R._preload(isURL[1],function(){o._.fillsize=[this.offsetWidth,this.offsetHeight]})}else fill.color=R.getRGB(params.fill).hex,fill.src=E,fill.type="solid",R.getRGB(params.fill).error&&(res.type in{circle:1,ellipse:1}||"r"!=Str(params.fill).charAt())&&addGradientFill(res,params.fill,fill)&&(a.fill="none",a.gradient=params.fill,fill.rotate=!1)}if("fill-opacity"in params||"opacity"in params){var opacity=((+a["fill-opacity"]+1||2)-1)*((+a.opacity+1||2)-1)*((+R.getRGB(params.fill).o+1||2)-1);opacity=mmin(mmax(opacity,0),1),fill.opacity=opacity,fill.src&&(fill.color="none")}node.appendChild(fill);var stroke=node.getElementsByTagName("stroke")&&node.getElementsByTagName("stroke")[0],newstroke=!1;!stroke&&(newstroke=stroke=createNode("stroke")),(params.stroke&&"none"!=params.stroke||params["stroke-width"]||null!=params["stroke-opacity"]||params["stroke-dasharray"]||params["stroke-miterlimit"]||params["stroke-linejoin"]||params["stroke-linecap"])&&(stroke.on=!0),("none"==params.stroke||null===params.stroke||null==stroke.on||0==params.stroke||0==params["stroke-width"])&&(stroke.on=!1);var strokeColor=R.getRGB(params.stroke);stroke.on&&params.stroke&&(stroke.color=strokeColor.hex),opacity=((+a["stroke-opacity"]+1||2)-1)*((+a.opacity+1||2)-1)*((+strokeColor.o+1||2)-1);var width=.75*(toFloat(params["stroke-width"])||1);if(opacity=mmin(mmax(opacity,0),1),null==params["stroke-width"]&&(width=a["stroke-width"]),params["stroke-width"]&&(stroke.weight=width),width&&1>width&&(opacity*=width)&&(stroke.weight=1),stroke.opacity=opacity,params["stroke-linejoin"]&&(stroke.joinstyle=params["stroke-linejoin"]||"miter"),stroke.miterlimit=params["stroke-miterlimit"]||8,params["stroke-linecap"]&&(stroke.endcap="butt"==params["stroke-linecap"]?"flat":"square"==params["stroke-linecap"]?"square":"round"),params["stroke-dasharray"]){var dasharray={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"};stroke.dashstyle=dasharray[has](params["stroke-dasharray"])?dasharray[params["stroke-dasharray"]]:E}newstroke&&node.appendChild(stroke)}if("text"==res.type){res.paper.canvas.style.display=E;var span=res.paper.span,m=100,fontSize=a.font&&a.font.match(/\d+(?:\.\d*)?(?=px)/);s=span.style,a.font&&(s.font=a.font),a["font-family"]&&(s.fontFamily=a["font-family"]),a["font-weight"]&&(s.fontWeight=a["font-weight"]),a["font-style"]&&(s.fontStyle=a["font-style"]),fontSize=toFloat(a["font-size"]||fontSize&&fontSize[0])||10,s.fontSize=fontSize*m+"px",res.textpath.string&&(span.innerHTML=Str(res.textpath.string).replace(/</g,"&#60;").replace(/&/g,"&#38;").replace(/\n/g,"<br>"));var brect=span.getBoundingClientRect();res.W=a.w=(brect.right-brect.left)/m,res.H=a.h=(brect.bottom-brect.top)/m,res.X=a.x,res.Y=a.y+res.H/2,("x"in params||"y"in params)&&(res.path.v=R.format("m{0},{1}l{2},{1}",round(a.x*zoom),round(a.y*zoom),round(a.x*zoom)+1));for(var dirtyattrs=["x","y","text","font","font-family","font-weight","font-style","font-size"],d=0,dd=dirtyattrs.length;dd>d;d++)if(dirtyattrs[d]in params){res._.dirty=1;break}switch(a["text-anchor"]){case"start":res.textpath.style["v-text-align"]="left",res.bbx=res.W/2;break;case"end":res.textpath.style["v-text-align"]="right",res.bbx=-res.W/2;break;default:res.textpath.style["v-text-align"]="center",res.bbx=0}res.textpath.style["v-text-kern"]=!0}},addGradientFill=function(o,gradient,fill){o.attrs=o.attrs||{};var pow=(o.attrs,Math.pow),type="linear",fxfy=".5 .5";if(o.attrs.gradient=gradient,gradient=Str(gradient).replace(R._radial_gradient,function(all,fx,fy){return type="radial",fx&&fy&&(fx=toFloat(fx),fy=toFloat(fy),pow(fx-.5,2)+pow(fy-.5,2)>.25&&(fy=math.sqrt(.25-pow(fx-.5,2))*(2*(fy>.5)-1)+.5),fxfy=fx+S+fy),E}),gradient=gradient.split(/\s*\-\s*/),"linear"==type){var angle=gradient.shift();if(angle=-toFloat(angle),isNaN(angle))return null}var dots=R._parseDots(gradient);if(!dots)return null;if(o=o.shape||o.node,dots.length){o.removeChild(fill),fill.on=!0,fill.method="none",fill.color=dots[0].color,fill.color2=dots[dots.length-1].color;for(var clrs=[],i=0,ii=dots.length;ii>i;i++)dots[i].offset&&clrs.push(dots[i].offset+S+dots[i].color);fill.colors=clrs.length?clrs.join():"0% "+fill.color,"radial"==type?(fill.type="gradientTitle",fill.focus="100%",fill.focussize="0 0",fill.focusposition=fxfy,fill.angle=0):(fill.type="gradient",fill.angle=(270-angle)%360),o.appendChild(fill)}return 1},Element=function(node,vml){this[0]=this.node=node,node.raphael=!0,this.id=R._oid++,node.raphaelid=this.id,this.X=0,this.Y=0,this.attrs={},this.paper=vml,this.matrix=R.matrix(),this._={transform:[],sx:1,sy:1,dx:0,dy:0,deg:0,dirty:1,dirtyT:1},!vml.bottom&&(vml.bottom=this),this.prev=vml.top,vml.top&&(vml.top.next=this),vml.top=this,this.next=null},elproto=R.el;Element.prototype=elproto,elproto.constructor=Element,elproto.transform=function(tstr){if(null==tstr)return this._.transform;var oldt,vbs=this.paper._viewBoxShift,vbt=vbs?"s"+[vbs.scale,vbs.scale]+"-1-1t"+[vbs.dx,vbs.dy]:E;vbs&&(oldt=tstr=Str(tstr).replace(/\.{3}|\u2026/g,this._.transform||E)),R._extractTransform(this,vbt+tstr);var split,matrix=this.matrix.clone(),skew=this.skew,o=this.node,isGrad=~Str(this.attrs.fill).indexOf("-"),isPatt=!Str(this.attrs.fill).indexOf("url(");if(matrix.translate(1,1),isPatt||isGrad||"image"==this.type)if(skew.matrix="1 0 0 1",skew.offset="0 0",split=matrix.split(),isGrad&&split.noRotation||!split.isSimple){o.style.filter=matrix.toFilter();var bb=this.getBBox(),bbt=this.getBBox(1),dx=bb.x-bbt.x,dy=bb.y-bbt.y;o.coordorigin=dx*-zoom+S+dy*-zoom,setCoords(this,1,1,dx,dy,0)}else o.style.filter=E,setCoords(this,split.scalex,split.scaley,split.dx,split.dy,split.rotate);else o.style.filter=E,skew.matrix=Str(matrix),skew.offset=matrix.offset();return oldt&&(this._.transform=oldt),this},elproto.rotate=function(deg,cx,cy){if(this.removed)return this;if(null!=deg){if(deg=Str(deg).split(separator),deg.length-1&&(cx=toFloat(deg[1]),cy=toFloat(deg[2])),deg=toFloat(deg[0]),null==cy&&(cx=cy),null==cx||null==cy){var bbox=this.getBBox(1);cx=bbox.x+bbox.width/2,cy=bbox.y+bbox.height/2}return this._.dirtyT=1,this.transform(this._.transform.concat([["r",deg,cx,cy]])),this}},elproto.translate=function(dx,dy){return this.removed?this:(dx=Str(dx).split(separator),dx.length-1&&(dy=toFloat(dx[1])),dx=toFloat(dx[0])||0,dy=+dy||0,this._.bbox&&(this._.bbox.x+=dx,this._.bbox.y+=dy),this.transform(this._.transform.concat([["t",dx,dy]])),this)},elproto.scale=function(sx,sy,cx,cy){if(this.removed)return this;if(sx=Str(sx).split(separator),sx.length-1&&(sy=toFloat(sx[1]),cx=toFloat(sx[2]),cy=toFloat(sx[3]),isNaN(cx)&&(cx=null),isNaN(cy)&&(cy=null)),sx=toFloat(sx[0]),null==sy&&(sy=sx),null==cy&&(cx=cy),null==cx||null==cy)var bbox=this.getBBox(1);return cx=null==cx?bbox.x+bbox.width/2:cx,cy=null==cy?bbox.y+bbox.height/2:cy,this.transform(this._.transform.concat([["s",sx,sy,cx,cy]])),this._.dirtyT=1,this},elproto.hide=function(){return!this.removed&&(this.node.style.display="none"),this},elproto.show=function(){return!this.removed&&(this.node.style.display=E),this},elproto._getBBox=function(){return this.removed?{}:{x:this.X+(this.bbx||0)-this.W/2,y:this.Y-this.H,width:this.W,height:this.H}},elproto.remove=function(){if(!this.removed&&this.node.parentNode){this.paper.__set__&&this.paper.__set__.exclude(this),R.eve.unbind("raphael.*.*."+this.id),R._tear(this,this.paper),this.node.parentNode.removeChild(this.node),this.shape&&this.shape.parentNode.removeChild(this.shape);for(var i in this)this[i]="function"==typeof this[i]?R._removedFactory(i):null;this.removed=!0}},elproto.attr=function(name,value){if(this.removed)return this;if(null==name){var res={};for(var a in this.attrs)this.attrs[has](a)&&(res[a]=this.attrs[a]);return res.gradient&&"none"==res.fill&&(res.fill=res.gradient)&&delete res.gradient,res.transform=this._.transform,res}if(null==value&&R.is(name,"string")){if(name==fillString&&"none"==this.attrs.fill&&this.attrs.gradient)return this.attrs.gradient;for(var names=name.split(separator),out={},i=0,ii=names.length;ii>i;i++)name=names[i],out[name]=name in this.attrs?this.attrs[name]:R.is(this.paper.customAttributes[name],"function")?this.paper.customAttributes[name].def:R._availableAttrs[name];return ii-1?out:out[names[0]]}if(this.attrs&&null==value&&R.is(name,"array")){for(out={},i=0,ii=name.length;ii>i;i++)out[name[i]]=this.attr(name[i]);return out}var params;null!=value&&(params={},params[name]=value),null==value&&R.is(name,"object")&&(params=name);for(var key in params)eve("raphael.attr."+key+"."+this.id,this,params[key]);if(params){for(key in this.paper.customAttributes)if(this.paper.customAttributes[has](key)&&params[has](key)&&R.is(this.paper.customAttributes[key],"function")){var par=this.paper.customAttributes[key].apply(this,[].concat(params[key]));this.attrs[key]=params[key];for(var subkey in par)par[has](subkey)&&(params[subkey]=par[subkey])}params.text&&"text"==this.type&&(this.textpath.string=params.text),setFillAndStroke(this,params)}return this},elproto.toFront=function(){return!this.removed&&this.node.parentNode.appendChild(this.node),this.paper&&this.paper.top!=this&&R._tofront(this,this.paper),this},elproto.toBack=function(){return this.removed?this:(this.node.parentNode.firstChild!=this.node&&(this.node.parentNode.insertBefore(this.node,this.node.parentNode.firstChild),R._toback(this,this.paper)),this)},elproto.insertAfter=function(element){return this.removed?this:(element.constructor==R.st.constructor&&(element=element[element.length-1]),element.node.nextSibling?element.node.parentNode.insertBefore(this.node,element.node.nextSibling):element.node.parentNode.appendChild(this.node),R._insertafter(this,element,this.paper),this)},elproto.insertBefore=function(element){return this.removed?this:(element.constructor==R.st.constructor&&(element=element[0]),element.node.parentNode.insertBefore(this.node,element.node),R._insertbefore(this,element,this.paper),this)},elproto.blur=function(size){var s=this.node.runtimeStyle,f=s.filter;return f=f.replace(blurregexp,E),0!==+size?(this.attrs.blur=size,s.filter=f+S+ms+".Blur(pixelradius="+(+size||1.5)+")",s.margin=R.format("-{0}px 0 0 -{0}px",round(+size||1.5))):(s.filter=f,s.margin=0,delete this.attrs.blur),this},R._engine.path=function(pathString,vml){var el=createNode("shape");el.style.cssText=cssDot,el.coordsize=zoom+S+zoom,el.coordorigin=vml.coordorigin;var p=new Element(el,vml),attr={fill:"none",stroke:"#000"};pathString&&(attr.path=pathString),p.type="path",p.path=[],p.Path=E,setFillAndStroke(p,attr),vml.canvas.appendChild(el);var skew=createNode("skew");return skew.on=!0,el.appendChild(skew),p.skew=skew,p.transform(E),p},R._engine.rect=function(vml,x,y,w,h,r){var path=R._rectPath(x,y,w,h,r),res=vml.path(path),a=res.attrs;return res.X=a.x=x,res.Y=a.y=y,res.W=a.width=w,res.H=a.height=h,a.r=r,a.path=path,res.type="rect",res},R._engine.ellipse=function(vml,x,y,rx,ry){{var res=vml.path();res.attrs}return res.X=x-rx,res.Y=y-ry,res.W=2*rx,res.H=2*ry,res.type="ellipse",setFillAndStroke(res,{cx:x,cy:y,rx:rx,ry:ry}),res},R._engine.circle=function(vml,x,y,r){{var res=vml.path();res.attrs}return res.X=x-r,res.Y=y-r,res.W=res.H=2*r,res.type="circle",setFillAndStroke(res,{cx:x,cy:y,r:r}),res},R._engine.image=function(vml,src,x,y,w,h){var path=R._rectPath(x,y,w,h),res=vml.path(path).attr({stroke:"none"}),a=res.attrs,node=res.node,fill=node.getElementsByTagName(fillString)[0];return a.src=src,res.X=a.x=x,res.Y=a.y=y,res.W=a.width=w,res.H=a.height=h,a.path=path,res.type="image",fill.parentNode==node&&node.removeChild(fill),fill.rotate=!0,fill.src=src,fill.type="tile",res._.fillpos=[x,y],res._.fillsize=[w,h],node.appendChild(fill),setCoords(res,1,1,0,0,0),res},R._engine.text=function(vml,x,y,text){var el=createNode("shape"),path=createNode("path"),o=createNode("textpath");x=x||0,y=y||0,text=text||"",path.v=R.format("m{0},{1}l{2},{1}",round(x*zoom),round(y*zoom),round(x*zoom)+1),path.textpathok=!0,o.string=Str(text),o.on=!0,el.style.cssText=cssDot,el.coordsize=zoom+S+zoom,el.coordorigin="0 0";var p=new Element(el,vml),attr={fill:"#000",stroke:"none",font:R._availableAttrs.font,text:text};p.shape=el,p.path=path,p.textpath=o,p.type="text",p.attrs.text=Str(text),p.attrs.x=x,p.attrs.y=y,p.attrs.w=1,p.attrs.h=1,setFillAndStroke(p,attr),el.appendChild(o),el.appendChild(path),vml.canvas.appendChild(el);var skew=createNode("skew");return skew.on=!0,el.appendChild(skew),p.skew=skew,p.transform(E),p},R._engine.setSize=function(width,height){var cs=this.canvas.style;return this.width=width,this.height=height,width==+width&&(width+="px"),height==+height&&(height+="px"),cs.width=width,cs.height=height,cs.clip="rect(0 "+width+" "+height+" 0)",this._viewBox&&R._engine.setViewBox.apply(this,this._viewBox),this},R._engine.setViewBox=function(x,y,w,h,fit){R.eve("raphael.setViewBox",this,this._viewBox,[x,y,w,h,fit]);var H,W,width=this.width,height=this.height,size=1/mmax(w/width,h/height);return fit&&(H=height/h,W=width/w,width>w*H&&(x-=(width-w*H)/2/H),height>h*W&&(y-=(height-h*W)/2/W)),this._viewBox=[x,y,w,h,!!fit],this._viewBoxShift={dx:-x,dy:-y,scale:size},this.forEach(function(el){el.transform("...")}),this};var createNode;R._engine.initWin=function(win){var doc=win.document;doc.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");try{!doc.namespaces.rvml&&doc.namespaces.add("rvml","urn:schemas-microsoft-com:vml"),createNode=function(tagName){return doc.createElement("<rvml:"+tagName+' class="rvml">')}}catch(e){createNode=function(tagName){return doc.createElement("<"+tagName+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')}}},R._engine.initWin(R._g.win),R._engine.create=function(){var con=R._getContainer.apply(0,arguments),container=con.container,height=con.height,width=con.width,x=con.x,y=con.y;if(!container)throw new Error("VML container not found.");var res=new R._Paper,c=res.canvas=R._g.doc.createElement("div"),cs=c.style;return x=x||0,y=y||0,width=width||512,height=height||342,res.width=width,res.height=height,width==+width&&(width+="px"),height==+height&&(height+="px"),res.coordsize=1e3*zoom+S+1e3*zoom,res.coordorigin="0 0",res.span=R._g.doc.createElement("span"),res.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;",c.appendChild(res.span),cs.cssText=R.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden",width,height),1==container?(R._g.doc.body.appendChild(c),cs.left=x+"px",cs.top=y+"px",cs.position="absolute"):container.firstChild?container.insertBefore(c,container.firstChild):container.appendChild(c),res.renderfix=function(){},res},R.prototype.clear=function(){R.eve("raphael.clear",this),this.canvas.innerHTML=E,this.span=R._g.doc.createElement("span"),this.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;",this.canvas.appendChild(this.span),this.bottom=this.top=null},R.prototype.remove=function(){R.eve("raphael.remove",this),this.canvas.parentNode.removeChild(this.canvas);for(var i in this)this[i]="function"==typeof this[i]?R._removedFactory(i):null;return!0};var setproto=R.st;for(var method in elproto)elproto[has](method)&&!setproto[has](method)&&(setproto[method]=function(methodname){return function(){var arg=arguments;return this.forEach(function(el){el[methodname].apply(el,arg)})}}(method))}}(),oldRaphael.was?g.win.Raphael=R:Raphael=R,R}),function(){$(function(){return $(".how-we-work--lines").each(function(){var $this,circleX,circleY,createCircle,createShapes,getProgress,initialize,linePath,onscroll,paper,params,progressDC,shapes,updateCircles,updateShapes,x,y;return $this=$(this),paper=null,shapes={},params={A:85,B:150,C:27,M:.25,R:6,color:"#00AFE5"},progressDC=new DirtyChecker,params.update=function(attrs){return _.assign(this,attrs),this.w=this.width/8,this.height=this.A+this.B+3*this.w*this.M},initialize=function(){return params.update({width:$this.width()}),paper=Raphael($this[0],params.width,params.height),createShapes(),updateShapes(),$(window).on("resize",updateShapes),$(window).on("scroll",onscroll)},createShapes=function(){var i;return shapes.circles=function(){var _i,_results;for(_results=[],i=_i=0;4>_i;i=++_i)_results.push(createCircle(i));return _results}(),shapes.line=paper.path("").attr({stroke:params.color})},updateShapes=function(){return params.update({width:$this.width()}),paper.setSize(params.width,params.height),paper.setViewBox(-params.width/2,0,params.width,params.height),shapes.line.attr({path:linePath()}),updateCircles()},createCircle=function(i){return paper.circle(circleX(i),circleY(i),params.R).attr({"stroke-width":0,fill:params.color})},getProgress=function(){var delta,progress;return delta=window.pageYOffset-$this.offset().top,progress=Math.max(0,Math.min(1,(delta+400)/params.height*1.3))},onscroll=function(){return progressDC.apply(getProgress(),function(){return updateCircles()})},updateCircles=function(){var i,progress,shape,_i,_len,_ref,_results;for(progress=getProgress(),_ref=shapes.circles,_results=[],i=_i=0,_len=_ref.length;_len>_i;i=++_i)shape=_ref[i],_results.push(shape.attr({cx:circleX(i,progress),cy:circleY(i,progress)}));return _results},circleX=function(i,progress){var cx,cy,mx;return cy=circleY(i,progress),cx=(params.height-cy-params.B)/params.M,mx=Math.abs((2*i-3)*params.width/8),Math.min(mx,Math.max(7.5,cx))*(2>i?-1:1)},circleY=function(i,progress){return params.R+1+params.height*progress},y=function(x){return params.height-params.B-Math.abs(x)*params.M},x=function(i){return params.w*i},linePath=function(){var h;return h=params.height,"M -5 "+h+"\n  L -5 "+y(-5)+"\n  L "+x(-3)+" "+y(x(-3))+"\n  L "+x(-3)+" "+params.R+"\nM 5 "+h+"\n  L 5 "+y(5)+"\n  L "+x(3)+" "+y(x(3))+"\n  L "+x(3)+" "+params.R+"\nM -10   "+y(-10)+"        L -10   "+h+"\nM 10   "+y(10)+"        L 10   "+h+"\nM "+x(-1)+" "+y(x(-1))+"      L "+x(-1)+" "+params.R+"\nM "+x(1)+" "+y(x(1))+"      L "+x(1)+" "+params.R},initialize()})})}.call(this),function(){$(function(){return $(".jumbotron-m-index").eq(0).each(function(){var $this,getHeight,storedHeight;return $this=$(this),getHeight=function(){return $this[0].offsetHeight},storedHeight=getHeight(),$(window).on("resize",function(){var delta,height;return height=getHeight(),delta=height-storedHeight,storedHeight=height,!isNaN(delta)&&window.pageYOffset>height/2?window.scrollBy(0,delta):void 0})})})}.call(this),function(){$(function(){return $(".magic-circle").each(function(){var $target,$this,move,progressDC,update,updateCircle,updateRocket;return $this=$(this),$target=$(".process").addClass("is-magic-circle-active"),progressDC=new DirtyChecker,update=function(){var bottom,height,path,progress,scrollBottom,scrollTop,top;return top=$target.offset().top,height=$target[0].offsetHeight,bottom=top+height,path=[{x:0,y:top,fixed:!0},{x:0,y:top+100},{x:-590,y:top+100+210,fixed:!0},{x:-590,y:bottom-100-208},{x:0,y:bottom-100,fixed:!0},{x:0,y:bottom+120}],function(){var i,length,point,position,total,_i,_j,_len,_ref,_results;for(total=0,i=_i=0,_ref=path.length-1;_ref>=0?_ref>_i:_i>_ref;i=_ref>=0?++_i:--_i)length=path[i+1].y-path[i].y,path[i].length=length,total+=length;for(path[path.length-1].length=0,position=0,_results=[],_j=0,_len=path.length;_len>_j;_j++)point=path[_j],point.t=position,_results.push(position+=point.length/total);return _results}(),scrollTop=null,scrollBottom=null,progress=null,function(){return scrollTop=top-450,scrollBottom=bottom-100,progress=Math.min(1,Math.max(0,(window.pageYOffset-scrollTop)/(scrollBottom-scrollTop)))}(),progressDC.apply(progress,function(){return updateCircle(path,progress)}),updateRocket(Math.max(0,window.pageYOffset-scrollBottom))},updateCircle=function(){var visibilityDC;return visibilityDC=new DirtyChecker,function(path,progress){return function(){var dt,fraction,i,t,x,y,_i,_ref,_ref1;for(visibilityDC.apply(0===progress?"hidden":"visible",function(visibility){return $this.css({visibility:visibility})}),i=_i=0,_ref=path.length-1;_ref>=0?_ref>_i:_i>_ref;i=_ref>=0?++_i:--_i)if(t=path[i].t,dt=path[i+1].t-t,progress>=t&&t+dt>progress)return fraction=(progress-t)/dt,x=path[i].x+(path[i+1].x-path[i].x)*fraction,y=path[i].y+(path[i+1].y-path[i].y)*fraction,void move(x,y,{fixed:path[i].fixed});return _ref1=path[path.length-1],x=_ref1.x,y=_ref1.y,console.log(x,y),move(x,y,{fixed:path[i].fixed})}()}}(),updateRocket=function(){var exceedDC;return exceedDC=new DirtyChecker,function(exceed){return exceed=Math.min(exceed,800),exceedDC.apply(exceed,function(){var s,y;return y=exceed/-3,s=1+exceed/2800,$(".launch-image--rocket").css({transform:"translateY("+y+"px) translateZ(0)"}),$(".launch-image--smoke").css({transform:"scaleX("+s+") translateZ(0)"})})}}(),move=function(x,y,_arg){var fixed;return fixed=_arg.fixed,fixed&&(x-=window.pageXOffset,y-=window.pageYOffset),$this.css({top:y-7,"margin-left":x-7,position:fixed?"fixed":"absolute"})},update(),$(window).on("scroll",update)})})}.call(this),function(){}.call(this);
/*! jQuery v1.11.3 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */

!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l="1.11.3",m=function(a,b){return new m.fn.init(a,b)},n=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,o=/^-ms-/,p=/-([\da-z])/gi,q=function(a,b){return b.toUpperCase()};m.fn=m.prototype={jquery:l,constructor:m,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=m.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return m.each(this,a,b)},map:function(a){return this.pushStack(m.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},m.extend=m.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||m.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(m.isPlainObject(c)||(b=m.isArray(c)))?(b?(b=!1,f=a&&m.isArray(a)?a:[]):f=a&&m.isPlainObject(a)?a:{},g[d]=m.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},m.extend({expando:"jQuery"+(l+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===m.type(a)},isArray:Array.isArray||function(a){return"array"===m.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return!m.isArray(a)&&a-parseFloat(a)+1>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==m.type(a)||a.nodeType||m.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(k.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&m.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(o,"ms-").replace(p,q)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=r(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(n,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(r(Object(a))?m.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=r(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),m.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||m.guid++,e):void 0},now:function(){return+new Date},support:k}),m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function r(a){var b="length"in a&&a.length,c=m.type(a);return"function"===c||m.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var s=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,aa=/[+~]/,ba=/'|\\/g,ca=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),da=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ea=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fa){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(ba,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+ra(o[l]);w=aa.test(a)&&pa(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",ea,!1):e.attachEvent&&e.attachEvent("onunload",ea)),p=!f(g),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?la(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ca,da),a[3]=(a[3]||a[4]||a[5]||"").replace(ca,da),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ca,da).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(ca,da),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return W.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(ca,da).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:oa(function(){return[0]}),last:oa(function(a,b){return[b-1]}),eq:oa(function(a,b,c){return[0>c?c+b:c]}),even:oa(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:oa(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:oa(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:oa(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function qa(){}qa.prototype=d.filters=d.pseudos,d.setFilters=new qa,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function ra(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sa(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function ta(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ua(a,b,c){for(var d=0,e=b.length;e>d;d++)ga(a,b[d],c);return c}function va(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wa(a,b,c,d,e,f){return d&&!d[u]&&(d=wa(d)),e&&!e[u]&&(e=wa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ua(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:va(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=va(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=va(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sa(function(a){return a===b},h,!0),l=sa(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sa(ta(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wa(i>1&&ta(m),i>1&&ra(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xa(a.slice(i,e)),f>e&&xa(a=a.slice(e)),f>e&&ra(a))}m.push(c)}return ta(m)}function ya(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=va(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&ga.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,ya(e,d)),f.selector=a}return f},i=ga.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ca,da),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ca,da),aa.test(j[0].type)&&pa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&ra(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,aa.test(a)&&pa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);m.find=s,m.expr=s.selectors,m.expr[":"]=m.expr.pseudos,m.unique=s.uniqueSort,m.text=s.getText,m.isXMLDoc=s.isXML,m.contains=s.contains;var t=m.expr.match.needsContext,u=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,v=/^.[^:#\[\.,]*$/;function w(a,b,c){if(m.isFunction(b))return m.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return m.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(v.test(b))return m.filter(b,a,c);b=m.filter(b,a)}return m.grep(a,function(a){return m.inArray(a,b)>=0!==c})}m.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?m.find.matchesSelector(d,a)?[d]:[]:m.find.matches(a,m.grep(b,function(a){return 1===a.nodeType}))},m.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(m(a).filter(function(){for(b=0;e>b;b++)if(m.contains(d[b],this))return!0}));for(b=0;e>b;b++)m.find(a,d[b],c);return c=this.pushStack(e>1?m.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(w(this,a||[],!1))},not:function(a){return this.pushStack(w(this,a||[],!0))},is:function(a){return!!w(this,"string"==typeof a&&t.test(a)?m(a):a||[],!1).length}});var x,y=a.document,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=m.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||x).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof m?b[0]:b,m.merge(this,m.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:y,!0)),u.test(c[1])&&m.isPlainObject(b))for(c in b)m.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=y.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return x.find(a);this.length=1,this[0]=d}return this.context=y,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):m.isFunction(a)?"undefined"!=typeof x.ready?x.ready(a):a(m):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),m.makeArray(a,this))};A.prototype=m.fn,x=m(y);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};m.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!m(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),m.fn.extend({has:function(a){var b,c=m(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(m.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=t.test(a)||"string"!=typeof a?m(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&m.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?m.unique(f):f)},index:function(a){return a?"string"==typeof a?m.inArray(this[0],m(a)):m.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(m.unique(m.merge(this.get(),m(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}m.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return m.dir(a,"parentNode")},parentsUntil:function(a,b,c){return m.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return m.dir(a,"nextSibling")},prevAll:function(a){return m.dir(a,"previousSibling")},nextUntil:function(a,b,c){return m.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return m.dir(a,"previousSibling",c)},siblings:function(a){return m.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return m.sibling(a.firstChild)},contents:function(a){return m.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:m.merge([],a.childNodes)}},function(a,b){m.fn[a]=function(c,d){var e=m.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=m.filter(d,e)),this.length>1&&(C[a]||(e=m.unique(e)),B.test(a)&&(e=e.reverse())),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return m.each(a.match(E)||[],function(a,c){b[c]=!0}),b}m.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):m.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){m.each(b,function(b,c){var d=m.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&m.each(arguments,function(a,c){var d;while((d=m.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?m.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},m.extend({Deferred:function(a){var b=[["resolve","done",m.Callbacks("once memory"),"resolved"],["reject","fail",m.Callbacks("once memory"),"rejected"],["notify","progress",m.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return m.Deferred(function(c){m.each(b,function(b,f){var g=m.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&m.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?m.extend(a,d):d}},e={};return d.pipe=d.then,m.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&m.isFunction(a.promise)?e:0,g=1===f?a:m.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&m.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;m.fn.ready=function(a){return m.ready.promise().done(a),this},m.extend({isReady:!1,readyWait:1,holdReady:function(a){a?m.readyWait++:m.ready(!0)},ready:function(a){if(a===!0?!--m.readyWait:!m.isReady){if(!y.body)return setTimeout(m.ready);m.isReady=!0,a!==!0&&--m.readyWait>0||(H.resolveWith(y,[m]),m.fn.triggerHandler&&(m(y).triggerHandler("ready"),m(y).off("ready")))}}});function I(){y.addEventListener?(y.removeEventListener("DOMContentLoaded",J,!1),a.removeEventListener("load",J,!1)):(y.detachEvent("onreadystatechange",J),a.detachEvent("onload",J))}function J(){(y.addEventListener||"load"===event.type||"complete"===y.readyState)&&(I(),m.ready())}m.ready.promise=function(b){if(!H)if(H=m.Deferred(),"complete"===y.readyState)setTimeout(m.ready);else if(y.addEventListener)y.addEventListener("DOMContentLoaded",J,!1),a.addEventListener("load",J,!1);else{y.attachEvent("onreadystatechange",J),a.attachEvent("onload",J);var c=!1;try{c=null==a.frameElement&&y.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!m.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}I(),m.ready()}}()}return H.promise(b)};var K="undefined",L;for(L in m(k))break;k.ownLast="0"!==L,k.inlineBlockNeedsLayout=!1,m(function(){var a,b,c,d;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",k.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(d))}),function(){var a=y.createElement("div");if(null==k.deleteExpando){k.deleteExpando=!0;try{delete a.test}catch(b){k.deleteExpando=!1}}a=null}(),m.acceptData=function(a){var b=m.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var M=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,N=/([A-Z])/g;function O(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(N,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:M.test(c)?m.parseJSON(c):c}catch(e){}m.data(a,b,c)}else c=void 0}return c}function P(a){var b;for(b in a)if(("data"!==b||!m.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;

return!0}function Q(a,b,d,e){if(m.acceptData(a)){var f,g,h=m.expando,i=a.nodeType,j=i?m.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||m.guid++:h),j[k]||(j[k]=i?{}:{toJSON:m.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=m.extend(j[k],b):j[k].data=m.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[m.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[m.camelCase(b)])):f=g,f}}function R(a,b,c){if(m.acceptData(a)){var d,e,f=a.nodeType,g=f?m.cache:a,h=f?a[m.expando]:m.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){m.isArray(b)?b=b.concat(m.map(b,m.camelCase)):b in d?b=[b]:(b=m.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!P(d):!m.isEmptyObject(d))return}(c||(delete g[h].data,P(g[h])))&&(f?m.cleanData([a],!0):k.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}m.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?m.cache[a[m.expando]]:a[m.expando],!!a&&!P(a)},data:function(a,b,c){return Q(a,b,c)},removeData:function(a,b){return R(a,b)},_data:function(a,b,c){return Q(a,b,c,!0)},_removeData:function(a,b){return R(a,b,!0)}}),m.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=m.data(f),1===f.nodeType&&!m._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=m.camelCase(d.slice(5)),O(f,d,e[d])));m._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){m.data(this,a)}):arguments.length>1?this.each(function(){m.data(this,a,b)}):f?O(f,a,m.data(f,a)):void 0},removeData:function(a){return this.each(function(){m.removeData(this,a)})}}),m.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=m._data(a,b),c&&(!d||m.isArray(c)?d=m._data(a,b,m.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=m.queue(a,b),d=c.length,e=c.shift(),f=m._queueHooks(a,b),g=function(){m.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return m._data(a,c)||m._data(a,c,{empty:m.Callbacks("once memory").add(function(){m._removeData(a,b+"queue"),m._removeData(a,c)})})}}),m.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?m.queue(this[0],a):void 0===b?this:this.each(function(){var c=m.queue(this,a,b);m._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&m.dequeue(this,a)})},dequeue:function(a){return this.each(function(){m.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=m.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=m._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=["Top","Right","Bottom","Left"],U=function(a,b){return a=b||a,"none"===m.css(a,"display")||!m.contains(a.ownerDocument,a)},V=m.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===m.type(c)){e=!0;for(h in c)m.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,m.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(m(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},W=/^(?:checkbox|radio)$/i;!function(){var a=y.createElement("input"),b=y.createElement("div"),c=y.createDocumentFragment();if(b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",k.leadingWhitespace=3===b.firstChild.nodeType,k.tbody=!b.getElementsByTagName("tbody").length,k.htmlSerialize=!!b.getElementsByTagName("link").length,k.html5Clone="<:nav></:nav>"!==y.createElement("nav").cloneNode(!0).outerHTML,a.type="checkbox",a.checked=!0,c.appendChild(a),k.appendChecked=a.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,c.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,k.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){k.noCloneEvent=!1}),b.cloneNode(!0).click()),null==k.deleteExpando){k.deleteExpando=!0;try{delete b.test}catch(d){k.deleteExpando=!1}}}(),function(){var b,c,d=y.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(k[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),k[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var X=/^(?:input|select|textarea)$/i,Y=/^key/,Z=/^(?:mouse|pointer|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=/^([^.]*)(?:\.(.+)|)$/;function aa(){return!0}function ba(){return!1}function ca(){try{return y.activeElement}catch(a){}}m.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=m.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof m===K||a&&m.event.triggered===a.type?void 0:m.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(E)||[""],h=b.length;while(h--)f=_.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=m.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=m.event.special[o]||{},l=m.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&m.expr.match.needsContext.test(e),namespace:p.join(".")},i),(n=g[o])||(n=g[o]=[],n.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?n.splice(n.delegateCount++,0,l):n.push(l),m.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m.hasData(a)&&m._data(a);if(r&&(k=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=_.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=m.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,n=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=n.length;while(f--)g=n[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(n.splice(f,1),g.selector&&n.delegateCount--,l.remove&&l.remove.call(a,g));i&&!n.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||m.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)m.event.remove(a,o+b[j],c,d,!0);m.isEmptyObject(k)&&(delete r.handle,m._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,o=[d||y],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||y,3!==d.nodeType&&8!==d.nodeType&&!$.test(p+m.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[m.expando]?b:new m.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:m.makeArray(c,[b]),k=m.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!m.isWindow(d)){for(i=k.delegateType||p,$.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||y)&&o.push(l.defaultView||l.parentWindow||a)}n=0;while((h=o[n++])&&!b.isPropagationStopped())b.type=n>1?i:k.bindType||p,f=(m._data(h,"events")||{})[b.type]&&m._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&m.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&m.acceptData(d)&&g&&d[p]&&!m.isWindow(d)){l=d[g],l&&(d[g]=null),m.event.triggered=p;try{d[p]()}catch(r){}m.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=m.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(m._data(this,"events")||{})[a.type]||[],k=m.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=m.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((m.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?m(c,this).index(i)>=0:m.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[m.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=Z.test(e)?this.mouseHooks:Y.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new m.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||y),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||y,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==ca()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===ca()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return m.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return m.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=m.extend(new m.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?m.event.trigger(e,null,b):m.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},m.removeEvent=y.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===K&&(a[d]=null),a.detachEvent(d,c))},m.Event=function(a,b){return this instanceof m.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?aa:ba):this.type=a,b&&m.extend(this,b),this.timeStamp=a&&a.timeStamp||m.now(),void(this[m.expando]=!0)):new m.Event(a,b)},m.Event.prototype={isDefaultPrevented:ba,isPropagationStopped:ba,isImmediatePropagationStopped:ba,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=aa,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=aa,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=aa,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},m.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){m.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!m.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.submitBubbles||(m.event.special.submit={setup:function(){return m.nodeName(this,"form")?!1:void m.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=m.nodeName(b,"input")||m.nodeName(b,"button")?b.form:void 0;c&&!m._data(c,"submitBubbles")&&(m.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),m._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&m.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return m.nodeName(this,"form")?!1:void m.event.remove(this,"._submit")}}),k.changeBubbles||(m.event.special.change={setup:function(){return X.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(m.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),m.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),m.event.simulate("change",this,a,!0)})),!1):void m.event.add(this,"beforeactivate._change",function(a){var b=a.target;X.test(b.nodeName)&&!m._data(b,"changeBubbles")&&(m.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||m.event.simulate("change",this.parentNode,a,!0)}),m._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return m.event.remove(this,"._change"),!X.test(this.nodeName)}}),k.focusinBubbles||m.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){m.event.simulate(b,a.target,m.event.fix(a),!0)};m.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=m._data(d,b);e||d.addEventListener(a,c,!0),m._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=m._data(d,b)-1;e?m._data(d,b,e):(d.removeEventListener(a,c,!0),m._removeData(d,b))}}}),m.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=ba;else if(!d)return this;return 1===e&&(g=d,d=function(a){return m().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=m.guid++)),this.each(function(){m.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,m(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=ba),this.each(function(){m.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){m.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?m.event.trigger(a,b,c,!0):void 0}});function da(a){var b=ea.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var ea="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",fa=/ jQuery\d+="(?:null|\d+)"/g,ga=new RegExp("<(?:"+ea+")[\\s/>]","i"),ha=/^\s+/,ia=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ja=/<([\w:]+)/,ka=/<tbody/i,la=/<|&#?\w+;/,ma=/<(?:script|style|link)/i,na=/checked\s*(?:[^=]|=\s*.checked.)/i,oa=/^$|\/(?:java|ecma)script/i,pa=/^true\/(.*)/,qa=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ra={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:k.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},sa=da(y),ta=sa.appendChild(y.createElement("div"));ra.optgroup=ra.option,ra.tbody=ra.tfoot=ra.colgroup=ra.caption=ra.thead,ra.th=ra.td;function ua(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==K?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==K?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||m.nodeName(d,b)?f.push(d):m.merge(f,ua(d,b));return void 0===b||b&&m.nodeName(a,b)?m.merge([a],f):f}function va(a){W.test(a.type)&&(a.defaultChecked=a.checked)}function wa(a,b){return m.nodeName(a,"table")&&m.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function xa(a){return a.type=(null!==m.find.attr(a,"type"))+"/"+a.type,a}function ya(a){var b=pa.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function za(a,b){for(var c,d=0;null!=(c=a[d]);d++)m._data(c,"globalEval",!b||m._data(b[d],"globalEval"))}function Aa(a,b){if(1===b.nodeType&&m.hasData(a)){var c,d,e,f=m._data(a),g=m._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)m.event.add(b,c,h[c][d])}g.data&&(g.data=m.extend({},g.data))}}function Ba(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!k.noCloneEvent&&b[m.expando]){e=m._data(b);for(d in e.events)m.removeEvent(b,d,e.handle);b.removeAttribute(m.expando)}"script"===c&&b.text!==a.text?(xa(b).text=a.text,ya(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),k.html5Clone&&a.innerHTML&&!m.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&W.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}m.extend({clone:function(a,b,c){var d,e,f,g,h,i=m.contains(a.ownerDocument,a);if(k.html5Clone||m.isXMLDoc(a)||!ga.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(ta.innerHTML=a.outerHTML,ta.removeChild(f=ta.firstChild)),!(k.noCloneEvent&&k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||m.isXMLDoc(a)))for(d=ua(f),h=ua(a),g=0;null!=(e=h[g]);++g)d[g]&&Ba(e,d[g]);if(b)if(c)for(h=h||ua(a),d=d||ua(f),g=0;null!=(e=h[g]);g++)Aa(e,d[g]);else Aa(a,f);return d=ua(f,"script"),d.length>0&&za(d,!i&&ua(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,l,n=a.length,o=da(b),p=[],q=0;n>q;q++)if(f=a[q],f||0===f)if("object"===m.type(f))m.merge(p,f.nodeType?[f]:f);else if(la.test(f)){h=h||o.appendChild(b.createElement("div")),i=(ja.exec(f)||["",""])[1].toLowerCase(),l=ra[i]||ra._default,h.innerHTML=l[1]+f.replace(ia,"<$1></$2>")+l[2],e=l[0];while(e--)h=h.lastChild;if(!k.leadingWhitespace&&ha.test(f)&&p.push(b.createTextNode(ha.exec(f)[0])),!k.tbody){f="table"!==i||ka.test(f)?"<table>"!==l[1]||ka.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)m.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}m.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),k.appendChecked||m.grep(ua(p,"input"),va),q=0;while(f=p[q++])if((!d||-1===m.inArray(f,d))&&(g=m.contains(f.ownerDocument,f),h=ua(o.appendChild(f),"script"),g&&za(h),c)){e=0;while(f=h[e++])oa.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=m.expando,j=m.cache,l=k.deleteExpando,n=m.event.special;null!=(d=a[h]);h++)if((b||m.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)n[e]?m.event.remove(d,e):m.removeEvent(d,e,g.handle);j[f]&&(delete j[f],l?delete d[i]:typeof d.removeAttribute!==K?d.removeAttribute(i):d[i]=null,c.push(f))}}}),m.fn.extend({text:function(a){return V(this,function(a){return void 0===a?m.text(this):this.empty().append((this[0]&&this[0].ownerDocument||y).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wa(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wa(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?m.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||m.cleanData(ua(c)),c.parentNode&&(b&&m.contains(c.ownerDocument,c)&&za(ua(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&m.cleanData(ua(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&m.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return m.clone(this,a,b)})},html:function(a){return V(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(fa,""):void 0;if(!("string"!=typeof a||ma.test(a)||!k.htmlSerialize&&ga.test(a)||!k.leadingWhitespace&&ha.test(a)||ra[(ja.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(ia,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(m.cleanData(ua(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,m.cleanData(ua(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,n=this,o=l-1,p=a[0],q=m.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&na.test(p))return this.each(function(c){var d=n.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(i=m.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=m.map(ua(i,"script"),xa),f=g.length;l>j;j++)d=i,j!==o&&(d=m.clone(d,!0,!0),f&&m.merge(g,ua(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,m.map(g,ya),j=0;f>j;j++)d=g[j],oa.test(d.type||"")&&!m._data(d,"globalEval")&&m.contains(h,d)&&(d.src?m._evalUrl&&m._evalUrl(d.src):m.globalEval((d.text||d.textContent||d.innerHTML||"").replace(qa,"")));i=c=null}return this}}),m.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){m.fn[a]=function(a){for(var c,d=0,e=[],g=m(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),m(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Ca,Da={};function Ea(b,c){var d,e=m(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:m.css(e[0],"display");return e.detach(),f}function Fa(a){var b=y,c=Da[a];return c||(c=Ea(a,b),"none"!==c&&c||(Ca=(Ca||m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Ca[0].contentWindow||Ca[0].contentDocument).document,b.write(),b.close(),c=Ea(a,b),Ca.detach()),Da[a]=c),c}!function(){var a;k.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,d;return c=y.getElementsByTagName("body")[0],c&&c.style?(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(y.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(d),a):void 0}}();var Ga=/^margin/,Ha=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ia,Ja,Ka=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ia=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)},Ja=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ia(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||m.contains(a.ownerDocument,a)||(g=m.style(a,b)),Ha.test(g)&&Ga.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):y.documentElement.currentStyle&&(Ia=function(a){return a.currentStyle},Ja=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ia(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Ha.test(g)&&!Ka.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function La(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h;if(b=y.createElement("div"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=d&&d.style){c.cssText="float:left;opacity:.5",k.opacity="0.5"===c.opacity,k.cssFloat=!!c.cssFloat,b.style.backgroundClip="content-box",b.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===b.style.backgroundClip,k.boxSizing=""===c.boxSizing||""===c.MozBoxSizing||""===c.WebkitBoxSizing,m.extend(k,{reliableHiddenOffsets:function(){return null==g&&i(),g},boxSizingReliable:function(){return null==f&&i(),f},pixelPosition:function(){return null==e&&i(),e},reliableMarginRight:function(){return null==h&&i(),h}});function i(){var b,c,d,i;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),b.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",e=f=!1,h=!0,a.getComputedStyle&&(e="1%"!==(a.getComputedStyle(b,null)||{}).top,f="4px"===(a.getComputedStyle(b,null)||{width:"4px"}).width,i=b.appendChild(y.createElement("div")),i.style.cssText=b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",b.style.width="1px",h=!parseFloat((a.getComputedStyle(i,null)||{}).marginRight),b.removeChild(i)),b.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=b.getElementsByTagName("td"),i[0].style.cssText="margin:0;border:0;padding:0;display:none",g=0===i[0].offsetHeight,g&&(i[0].style.display="",i[1].style.display="none",g=0===i[0].offsetHeight),c.removeChild(d))}}}(),m.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Ma=/alpha\([^)]*\)/i,Na=/opacity\s*=\s*([^)]*)/,Oa=/^(none|table(?!-c[ea]).+)/,Pa=new RegExp("^("+S+")(.*)$","i"),Qa=new RegExp("^([+-])=("+S+")","i"),Ra={position:"absolute",visibility:"hidden",display:"block"},Sa={letterSpacing:"0",fontWeight:"400"},Ta=["Webkit","O","Moz","ms"];function Ua(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Ta.length;while(e--)if(b=Ta[e]+c,b in a)return b;return d}function Va(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=m._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&U(d)&&(f[g]=m._data(d,"olddisplay",Fa(d.nodeName)))):(e=U(d),(c&&"none"!==c||!e)&&m._data(d,"olddisplay",e?c:m.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Wa(a,b,c){var d=Pa.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Xa(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=m.css(a,c+T[f],!0,e)),d?("content"===c&&(g-=m.css(a,"padding"+T[f],!0,e)),"margin"!==c&&(g-=m.css(a,"border"+T[f]+"Width",!0,e))):(g+=m.css(a,"padding"+T[f],!0,e),"padding"!==c&&(g+=m.css(a,"border"+T[f]+"Width",!0,e)));return g}function Ya(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ia(a),g=k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Ja(a,b,f),(0>e||null==e)&&(e=a.style[b]),Ha.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Xa(a,b,c||(g?"border":"content"),d,f)+"px"}m.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Ja(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":k.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=m.camelCase(b),i=a.style;if(b=m.cssProps[h]||(m.cssProps[h]=Ua(i,h)),g=m.cssHooks[b]||m.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Qa.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(m.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||m.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=m.camelCase(b);return b=m.cssProps[h]||(m.cssProps[h]=Ua(a.style,h)),g=m.cssHooks[b]||m.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Ja(a,b,d)),"normal"===f&&b in Sa&&(f=Sa[b]),""===c||c?(e=parseFloat(f),c===!0||m.isNumeric(e)?e||0:f):f}}),m.each(["height","width"],function(a,b){m.cssHooks[b]={get:function(a,c,d){return c?Oa.test(m.css(a,"display"))&&0===a.offsetWidth?m.swap(a,Ra,function(){return Ya(a,b,d)}):Ya(a,b,d):void 0},set:function(a,c,d){var e=d&&Ia(a);return Wa(a,c,d?Xa(a,b,d,k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,e),e):0)}}}),k.opacity||(m.cssHooks.opacity={get:function(a,b){return Na.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=m.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===m.trim(f.replace(Ma,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Ma.test(f)?f.replace(Ma,e):f+" "+e)}}),m.cssHooks.marginRight=La(k.reliableMarginRight,function(a,b){return b?m.swap(a,{display:"inline-block"},Ja,[a,"marginRight"]):void 0}),m.each({margin:"",padding:"",border:"Width"},function(a,b){m.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+T[d]+b]=f[d]||f[d-2]||f[0];return e}},Ga.test(a)||(m.cssHooks[a+b].set=Wa)}),m.fn.extend({css:function(a,b){return V(this,function(a,b,c){var d,e,f={},g=0;if(m.isArray(b)){for(d=Ia(a),e=b.length;e>g;g++)f[b[g]]=m.css(a,b[g],!1,d);return f}return void 0!==c?m.style(a,b,c):m.css(a,b)},a,b,arguments.length>1)},show:function(){return Va(this,!0)},hide:function(){return Va(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){U(this)?m(this).show():m(this).hide()})}});function Za(a,b,c,d,e){
return new Za.prototype.init(a,b,c,d,e)}m.Tween=Za,Za.prototype={constructor:Za,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(m.cssNumber[c]?"":"px")},cur:function(){var a=Za.propHooks[this.prop];return a&&a.get?a.get(this):Za.propHooks._default.get(this)},run:function(a){var b,c=Za.propHooks[this.prop];return this.options.duration?this.pos=b=m.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Za.propHooks._default.set(this),this}},Za.prototype.init.prototype=Za.prototype,Za.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=m.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){m.fx.step[a.prop]?m.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[m.cssProps[a.prop]]||m.cssHooks[a.prop])?m.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Za.propHooks.scrollTop=Za.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},m.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},m.fx=Za.prototype.init,m.fx.step={};var $a,_a,ab=/^(?:toggle|show|hide)$/,bb=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),cb=/queueHooks$/,db=[ib],eb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=bb.exec(b),f=e&&e[3]||(m.cssNumber[a]?"":"px"),g=(m.cssNumber[a]||"px"!==f&&+d)&&bb.exec(m.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,m.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function fb(){return setTimeout(function(){$a=void 0}),$a=m.now()}function gb(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=T[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function hb(a,b,c){for(var d,e=(eb[b]||[]).concat(eb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ib(a,b,c){var d,e,f,g,h,i,j,l,n=this,o={},p=a.style,q=a.nodeType&&U(a),r=m._data(a,"fxshow");c.queue||(h=m._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,n.always(function(){n.always(function(){h.unqueued--,m.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=m.css(a,"display"),l="none"===j?m._data(a,"olddisplay")||Fa(a.nodeName):j,"inline"===l&&"none"===m.css(a,"float")&&(k.inlineBlockNeedsLayout&&"inline"!==Fa(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",k.shrinkWrapBlocks()||n.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],ab.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||m.style(a,d)}else j=void 0;if(m.isEmptyObject(o))"inline"===("none"===j?Fa(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=m._data(a,"fxshow",{}),f&&(r.hidden=!q),q?m(a).show():n.done(function(){m(a).hide()}),n.done(function(){var b;m._removeData(a,"fxshow");for(b in o)m.style(a,b,o[b])});for(d in o)g=hb(q?r[d]:0,d,n),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function jb(a,b){var c,d,e,f,g;for(c in a)if(d=m.camelCase(c),e=b[d],f=a[c],m.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=m.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kb(a,b,c){var d,e,f=0,g=db.length,h=m.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=$a||fb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:m.extend({},b),opts:m.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:$a||fb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=m.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jb(k,j.opts.specialEasing);g>f;f++)if(d=db[f].call(j,a,k,j.opts))return d;return m.map(k,hb,j),m.isFunction(j.opts.start)&&j.opts.start.call(a,j),m.fx.timer(m.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}m.Animation=m.extend(kb,{tweener:function(a,b){m.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],eb[c]=eb[c]||[],eb[c].unshift(b)},prefilter:function(a,b){b?db.unshift(a):db.push(a)}}),m.speed=function(a,b,c){var d=a&&"object"==typeof a?m.extend({},a):{complete:c||!c&&b||m.isFunction(a)&&a,duration:a,easing:c&&b||b&&!m.isFunction(b)&&b};return d.duration=m.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in m.fx.speeds?m.fx.speeds[d.duration]:m.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){m.isFunction(d.old)&&d.old.call(this),d.queue&&m.dequeue(this,d.queue)},d},m.fn.extend({fadeTo:function(a,b,c,d){return this.filter(U).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=m.isEmptyObject(a),f=m.speed(b,c,d),g=function(){var b=kb(this,m.extend({},a),f);(e||m._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=m.timers,g=m._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&cb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&m.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=m._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=m.timers,g=d?d.length:0;for(c.finish=!0,m.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),m.each(["toggle","show","hide"],function(a,b){var c=m.fn[b];m.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gb(b,!0),a,d,e)}}),m.each({slideDown:gb("show"),slideUp:gb("hide"),slideToggle:gb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){m.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),m.timers=[],m.fx.tick=function(){var a,b=m.timers,c=0;for($a=m.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||m.fx.stop(),$a=void 0},m.fx.timer=function(a){m.timers.push(a),a()?m.fx.start():m.timers.pop()},m.fx.interval=13,m.fx.start=function(){_a||(_a=setInterval(m.fx.tick,m.fx.interval))},m.fx.stop=function(){clearInterval(_a),_a=null},m.fx.speeds={slow:600,fast:200,_default:400},m.fn.delay=function(a,b){return a=m.fx?m.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e;b=y.createElement("div"),b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=y.createElement("select"),e=c.appendChild(y.createElement("option")),a=b.getElementsByTagName("input")[0],d.style.cssText="top:1px",k.getSetAttribute="t"!==b.className,k.style=/top/.test(d.getAttribute("style")),k.hrefNormalized="/a"===d.getAttribute("href"),k.checkOn=!!a.value,k.optSelected=e.selected,k.enctype=!!y.createElement("form").enctype,c.disabled=!0,k.optDisabled=!e.disabled,a=y.createElement("input"),a.setAttribute("value",""),k.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),k.radioValue="t"===a.value}();var lb=/\r/g;m.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=m.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,m(this).val()):a,null==e?e="":"number"==typeof e?e+="":m.isArray(e)&&(e=m.map(e,function(a){return null==a?"":a+""})),b=m.valHooks[this.type]||m.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=m.valHooks[e.type]||m.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(lb,""):null==c?"":c)}}}),m.extend({valHooks:{option:{get:function(a){var b=m.find.attr(a,"value");return null!=b?b:m.trim(m.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&m.nodeName(c.parentNode,"optgroup"))){if(b=m(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=m.makeArray(b),g=e.length;while(g--)if(d=e[g],m.inArray(m.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),m.each(["radio","checkbox"],function(){m.valHooks[this]={set:function(a,b){return m.isArray(b)?a.checked=m.inArray(m(a).val(),b)>=0:void 0}},k.checkOn||(m.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var mb,nb,ob=m.expr.attrHandle,pb=/^(?:checked|selected)$/i,qb=k.getSetAttribute,rb=k.input;m.fn.extend({attr:function(a,b){return V(this,m.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){m.removeAttr(this,a)})}}),m.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===K?m.prop(a,b,c):(1===f&&m.isXMLDoc(a)||(b=b.toLowerCase(),d=m.attrHooks[b]||(m.expr.match.bool.test(b)?nb:mb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=m.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void m.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=m.propFix[c]||c,m.expr.match.bool.test(c)?rb&&qb||!pb.test(c)?a[d]=!1:a[m.camelCase("default-"+c)]=a[d]=!1:m.attr(a,c,""),a.removeAttribute(qb?c:d)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&m.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),nb={set:function(a,b,c){return b===!1?m.removeAttr(a,c):rb&&qb||!pb.test(c)?a.setAttribute(!qb&&m.propFix[c]||c,c):a[m.camelCase("default-"+c)]=a[c]=!0,c}},m.each(m.expr.match.bool.source.match(/\w+/g),function(a,b){var c=ob[b]||m.find.attr;ob[b]=rb&&qb||!pb.test(b)?function(a,b,d){var e,f;return d||(f=ob[b],ob[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,ob[b]=f),e}:function(a,b,c){return c?void 0:a[m.camelCase("default-"+b)]?b.toLowerCase():null}}),rb&&qb||(m.attrHooks.value={set:function(a,b,c){return m.nodeName(a,"input")?void(a.defaultValue=b):mb&&mb.set(a,b,c)}}),qb||(mb={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},ob.id=ob.name=ob.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},m.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:mb.set},m.attrHooks.contenteditable={set:function(a,b,c){mb.set(a,""===b?!1:b,c)}},m.each(["width","height"],function(a,b){m.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),k.style||(m.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var sb=/^(?:input|select|textarea|button|object)$/i,tb=/^(?:a|area)$/i;m.fn.extend({prop:function(a,b){return V(this,m.prop,a,b,arguments.length>1)},removeProp:function(a){return a=m.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),m.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!m.isXMLDoc(a),f&&(b=m.propFix[b]||b,e=m.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=m.find.attr(a,"tabindex");return b?parseInt(b,10):sb.test(a.nodeName)||tb.test(a.nodeName)&&a.href?0:-1}}}}),k.hrefNormalized||m.each(["href","src"],function(a,b){m.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),k.optSelected||(m.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),m.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){m.propFix[this.toLowerCase()]=this}),k.enctype||(m.propFix.enctype="encoding");var ub=/[\t\r\n\f]/g;m.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ub," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=m.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ub," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?m.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(m.isFunction(a)?function(c){m(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=m(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===K||"boolean"===c)&&(this.className&&m._data(this,"__className__",this.className),this.className=this.className||a===!1?"":m._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ub," ").indexOf(b)>=0)return!0;return!1}}),m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){m.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),m.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var vb=m.now(),wb=/\?/,xb=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;m.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=m.trim(b+"");return e&&!m.trim(e.replace(xb,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():m.error("Invalid JSON: "+b)},m.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||m.error("Invalid XML: "+b),c};var yb,zb,Ab=/#.*$/,Bb=/([?&])_=[^&]*/,Cb=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Db=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Eb=/^(?:GET|HEAD)$/,Fb=/^\/\//,Gb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Hb={},Ib={},Jb="*/".concat("*");try{zb=location.href}catch(Kb){zb=y.createElement("a"),zb.href="",zb=zb.href}yb=Gb.exec(zb.toLowerCase())||[];function Lb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(m.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Mb(a,b,c,d){var e={},f=a===Ib;function g(h){var i;return e[h]=!0,m.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Nb(a,b){var c,d,e=m.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&m.extend(!0,a,c),a}function Ob(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Pb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}m.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:zb,type:"GET",isLocal:Db.test(yb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Jb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":m.parseJSON,"text xml":m.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Nb(Nb(a,m.ajaxSettings),b):Nb(m.ajaxSettings,a)},ajaxPrefilter:Lb(Hb),ajaxTransport:Lb(Ib),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=m.ajaxSetup({},b),l=k.context||k,n=k.context&&(l.nodeType||l.jquery)?m(l):m.event,o=m.Deferred(),p=m.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Cb.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||zb)+"").replace(Ab,"").replace(Fb,yb[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=m.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(c=Gb.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===yb[1]&&c[2]===yb[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(yb[3]||("http:"===yb[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=m.param(k.data,k.traditional)),Mb(Hb,k,b,v),2===t)return v;h=m.event&&k.global,h&&0===m.active++&&m.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Eb.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(wb.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Bb.test(e)?e.replace(Bb,"$1_="+vb++):e+(wb.test(e)?"&":"?")+"_="+vb++)),k.ifModified&&(m.lastModified[e]&&v.setRequestHeader("If-Modified-Since",m.lastModified[e]),m.etag[e]&&v.setRequestHeader("If-None-Match",m.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Jb+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Mb(Ib,k,b,v)){v.readyState=1,h&&n.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Ob(k,v,c)),u=Pb(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(m.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(m.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&n.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(n.trigger("ajaxComplete",[v,k]),--m.active||m.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return m.get(a,b,c,"json")},getScript:function(a,b){return m.get(a,void 0,b,"script")}}),m.each(["get","post"],function(a,b){m[b]=function(a,c,d,e){return m.isFunction(c)&&(e=e||d,d=c,c=void 0),m.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),m._evalUrl=function(a){return m.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},m.fn.extend({wrapAll:function(a){if(m.isFunction(a))return this.each(function(b){m(this).wrapAll(a.call(this,b))});if(this[0]){var b=m(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(m.isFunction(a)?function(b){m(this).wrapInner(a.call(this,b))}:function(){var b=m(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=m.isFunction(a);return this.each(function(c){m(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){m.nodeName(this,"body")||m(this).replaceWith(this.childNodes)}).end()}}),m.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!k.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||m.css(a,"display"))},m.expr.filters.visible=function(a){return!m.expr.filters.hidden(a)};var Qb=/%20/g,Rb=/\[\]$/,Sb=/\r?\n/g,Tb=/^(?:submit|button|image|reset|file)$/i,Ub=/^(?:input|select|textarea|keygen)/i;function Vb(a,b,c,d){var e;if(m.isArray(b))m.each(b,function(b,e){c||Rb.test(a)?d(a,e):Vb(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==m.type(b))d(a,b);else for(e in b)Vb(a+"["+e+"]",b[e],c,d)}m.param=function(a,b){var c,d=[],e=function(a,b){b=m.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=m.ajaxSettings&&m.ajaxSettings.traditional),m.isArray(a)||a.jquery&&!m.isPlainObject(a))m.each(a,function(){e(this.name,this.value)});else for(c in a)Vb(c,a[c],b,e);return d.join("&").replace(Qb,"+")},m.fn.extend({serialize:function(){return m.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=m.prop(this,"elements");return a?m.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!m(this).is(":disabled")&&Ub.test(this.nodeName)&&!Tb.test(a)&&(this.checked||!W.test(a))}).map(function(a,b){var c=m(this).val();return null==c?null:m.isArray(c)?m.map(c,function(a){return{name:b.name,value:a.replace(Sb,"\r\n")}}):{name:b.name,value:c.replace(Sb,"\r\n")}}).get()}}),m.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&Zb()||$b()}:Zb;var Wb=0,Xb={},Yb=m.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Xb)Xb[a](void 0,!0)}),k.cors=!!Yb&&"withCredentials"in Yb,Yb=k.ajax=!!Yb,Yb&&m.ajaxTransport(function(a){if(!a.crossDomain||k.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Wb;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Xb[g],b=void 0,f.onreadystatechange=m.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Xb[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function Zb(){try{return new a.XMLHttpRequest}catch(b){}}function $b(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}m.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return m.globalEval(a),a}}}),m.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),m.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=y.head||m("head")[0]||y.documentElement;return{send:function(d,e){b=y.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var _b=[],ac=/(=)\?(?=&|$)|\?\?/;m.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=_b.pop()||m.expando+"_"+vb++;return this[a]=!0,a}}),m.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(ac.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&ac.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=m.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(ac,"$1"+e):b.jsonp!==!1&&(b.url+=(wb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||m.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,_b.push(e)),g&&m.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),m.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||y;var d=u.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=m.buildFragment([a],b,e),e&&e.length&&m(e).remove(),m.merge([],d.childNodes))};var bc=m.fn.load;m.fn.load=function(a,b,c){if("string"!=typeof a&&bc)return bc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=m.trim(a.slice(h,a.length)),a=a.slice(0,h)),m.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&m.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?m("<div>").append(m.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},m.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){m.fn[b]=function(a){return this.on(b,a)}}),m.expr.filters.animated=function(a){return m.grep(m.timers,function(b){return a===b.elem}).length};var cc=a.document.documentElement;function dc(a){return m.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}m.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=m.css(a,"position"),l=m(a),n={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=m.css(a,"top"),i=m.css(a,"left"),j=("absolute"===k||"fixed"===k)&&m.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),m.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(n.top=b.top-h.top+g),null!=b.left&&(n.left=b.left-h.left+e),"using"in b?b.using.call(a,n):l.css(n)}},m.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){m.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,m.contains(b,e)?(typeof e.getBoundingClientRect!==K&&(d=e.getBoundingClientRect()),c=dc(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===m.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),m.nodeName(a[0],"html")||(c=a.offset()),c.top+=m.css(a[0],"borderTopWidth",!0),c.left+=m.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-m.css(d,"marginTop",!0),left:b.left-c.left-m.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||cc;while(a&&!m.nodeName(a,"html")&&"static"===m.css(a,"position"))a=a.offsetParent;return a||cc})}}),m.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);m.fn[a]=function(d){return V(this,function(a,d,e){var f=dc(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?m(f).scrollLeft():e,c?e:m(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),m.each(["top","left"],function(a,b){m.cssHooks[b]=La(k.pixelPosition,function(a,c){return c?(c=Ja(a,b),Ha.test(c)?m(a).position()[b]+"px":c):void 0})}),m.each({Height:"height",Width:"width"},function(a,b){m.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){m.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return V(this,function(b,c,d){var e;return m.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?m.css(b,c,g):m.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),m.fn.size=function(){return this.length},m.fn.andSelf=m.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return m});var ec=a.jQuery,fc=a.$;return m.noConflict=function(b){return a.$===m&&(a.$=fc),b&&a.jQuery===m&&(a.jQuery=ec),m},typeof b===K&&(a.jQuery=a.$=m),m});
/*! jQuery v2.1.1 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */

!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l=a.document,m="2.1.1",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return!n.isArray(a)&&a-parseFloat(a)>=0},isPlainObject:function(a){return"object"!==n.type(a)||a.nodeType||n.isWindow(a)?!1:a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=l.createElement("script"),b.text=a,l.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:k}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+-new Date,v=a.document,w=0,x=0,y=gb(),z=gb(),A=gb(),B=function(a,b){return a===b&&(l=!0),0},C="undefined",D=1<<31,E={}.hasOwnProperty,F=[],G=F.pop,H=F.push,I=F.push,J=F.slice,K=F.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},L="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",N="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=N.replace("w","w#"),P="\\["+M+"*("+N+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+O+"))|)"+M+"*\\]",Q=":("+N+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+P+")*)|.*)\\)|)",R=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),S=new RegExp("^"+M+"*,"+M+"*"),T=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp("="+M+"*([^\\]'\"]*?)"+M+"*\\]","g"),V=new RegExp(Q),W=new RegExp("^"+O+"$"),X={ID:new RegExp("^#("+N+")"),CLASS:new RegExp("^\\.("+N+")"),TAG:new RegExp("^("+N.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+Q),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+L+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ab=/[+~]/,bb=/'|\\/g,cb=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),db=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{I.apply(F=J.call(v.childNodes),v.childNodes),F[v.childNodes.length].nodeType}catch(eb){I={apply:F.length?function(a,b){H.apply(a,J.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fb(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],!a||"string"!=typeof a)return d;if(1!==(k=b.nodeType)&&9!==k)return[];if(p&&!e){if(f=_.exec(a))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return I.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return I.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=9===k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(bb,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+qb(o[l]);w=ab.test(a)&&ob(b.parentNode)||b,x=o.join(",")}if(x)try{return I.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function gb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function hb(a){return a[u]=!0,a}function ib(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function jb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function kb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||D)-(~a.sourceIndex||D);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function lb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function mb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function nb(a){return hb(function(b){return b=+b,hb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function ob(a){return a&&typeof a.getElementsByTagName!==C&&a}c=fb.support={},f=fb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fb.setDocument=function(a){var b,e=a?a.ownerDocument||a:v,g=e.defaultView;return e!==n&&9===e.nodeType&&e.documentElement?(n=e,o=e.documentElement,p=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){m()},!1):g.attachEvent&&g.attachEvent("onunload",function(){m()})),c.attributes=ib(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ib(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(e.getElementsByClassName)&&ib(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=ib(function(a){return o.appendChild(a).id=u,!e.getElementsByName||!e.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==C&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){var c=typeof a.getAttributeNode!==C&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==C?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==C&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(e.querySelectorAll))&&(ib(function(a){a.innerHTML="<select msallowclip=''><option selected=''></option></select>",a.querySelectorAll("[msallowclip^='']").length&&q.push("[*^$]="+M+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+M+"*(?:value|"+L+")"),a.querySelectorAll(":checked").length||q.push(":checked")}),ib(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+M+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ib(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",Q)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===v&&t(v,a)?-1:b===e||b.ownerDocument===v&&t(v,b)?1:k?K.call(k,a)-K.call(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],i=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:k?K.call(k,a)-K.call(k,b):0;if(f===g)return kb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?kb(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},e):n},fb.matches=function(a,b){return fb(a,null,null,b)},fb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fb(b,n,null,[a]).length>0},fb.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fb.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&E.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fb.selectors={cacheLength:50,createPseudo:hb,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(cb,db),a[3]=(a[3]||a[4]||a[5]||"").replace(cb,db),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(cb,db).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+M+")"+a+"("+M+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==C&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fb.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?hb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=K.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:hb(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?hb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:hb(function(a){return function(b){return fb(a,b).length>0}}),contains:hb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:hb(function(a){return W.test(a||"")||fb.error("unsupported lang: "+a),a=a.replace(cb,db).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:nb(function(){return[0]}),last:nb(function(a,b){return[b-1]}),eq:nb(function(a,b,c){return[0>c?c+b:c]}),even:nb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:nb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:nb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:nb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=lb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=mb(b);function pb(){}pb.prototype=d.filters=d.pseudos,d.setFilters=new pb,g=fb.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fb.error(a):z(a,i).slice(0)};function qb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function rb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function sb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function tb(a,b,c){for(var d=0,e=b.length;e>d;d++)fb(a,b[d],c);return c}function ub(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function vb(a,b,c,d,e,f){return d&&!d[u]&&(d=vb(d)),e&&!e[u]&&(e=vb(e,f)),hb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||tb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ub(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ub(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?K.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ub(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):I.apply(g,r)})}function wb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=rb(function(a){return a===b},h,!0),l=rb(function(a){return K.call(b,a)>-1},h,!0),m=[function(a,c,d){return!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>i;i++)if(c=d.relative[a[i].type])m=[rb(sb(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return vb(i>1&&sb(m),i>1&&qb(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&wb(a.slice(i,e)),f>e&&wb(a=a.slice(e)),f>e&&qb(a))}m.push(c)}return sb(m)}function xb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=G.call(i));s=ub(s)}I.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&fb.uniqueSort(i)}return k&&(w=v,j=t),r};return c?hb(f):f}return h=fb.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wb(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xb(e,d)),f.selector=a}return f},i=fb.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(cb,db),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(cb,db),ab.test(j[0].type)&&ob(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qb(j),!a)return I.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,ab.test(a)&&ob(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ib(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ib(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||jb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ib(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||jb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ib(function(a){return null==a.getAttribute("disabled")})||jb(L,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fb}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return g.call(b,a)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:l,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=l.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=l,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};A.prototype=n.fn,y=n(l);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(n(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(C[a]||n.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return n.each(a.match(E)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&n.each(arguments,function(a,b){var c;while((c=n.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(H.resolveWith(l,[n]),n.fn.triggerHandler&&(n(l).triggerHandler("ready"),n(l).off("ready"))))}});function I(){l.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),n.ready()}n.ready.promise=function(b){return H||(H=n.Deferred(),"complete"===l.readyState?setTimeout(n.ready):(l.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},n.ready.promise();var J=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};n.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=n.expando+Math.random()}K.uid=1,K.accepts=n.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,n.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(n.isEmptyObject(f))n.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!n.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)
},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=n.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||n.isArray(c)?d=L.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:n.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=l.createDocumentFragment(),b=a.appendChild(l.createElement("div")),c=l.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";k.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|pointer|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return l.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof n!==U&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,m,o,p=[d||l],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||l,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+n.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},e||!o.trigger||o.trigger.apply(d,c)!==!1)){if(!e&&!o.noBubble&&!n.isWindow(d)){for(i=o.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||l)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:o.bindType||q,m=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),m&&m.apply(g,c),m=k&&g[k],m&&m.apply&&n.acceptData(g)&&(b.result=m.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!n.acceptData(d)||k&&n.isFunction(d[q])&&!n.isWindow(d)&&(h=d[k],h&&(d[k]=null),n.event.triggered=q,d[q](),n.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>=0:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||l,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=l),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?Z:$):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=Z,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return n().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var ab=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bb=/<([\w:]+)/,cb=/<|&#?\w+;/,db=/<(?:script|style|link)/i,eb=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/^$|\/(?:java|ecma)script/i,gb=/^true\/(.*)/,hb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ib={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ib.optgroup=ib.option,ib.tbody=ib.tfoot=ib.colgroup=ib.caption=ib.thead,ib.th=ib.td;function jb(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function kb(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function lb(a){var b=gb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function mb(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function nb(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=n.extend({},h),M.set(b,i))}}function ob(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function pb(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}n.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=ob(h),f=ob(a),d=0,e=f.length;e>d;d++)pb(f[d],g[d]);if(b)if(c)for(f=f||ob(a),g=g||ob(h),d=0,e=f.length;e>d;d++)nb(f[d],g[d]);else nb(a,h);return g=ob(h,"script"),g.length>0&&mb(g,!i&&ob(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,o=a.length;o>m;m++)if(e=a[m],e||0===e)if("object"===n.type(e))n.merge(l,e.nodeType?[e]:e);else if(cb.test(e)){f=f||k.appendChild(b.createElement("div")),g=(bb.exec(e)||["",""])[1].toLowerCase(),h=ib[g]||ib._default,f.innerHTML=h[1]+e.replace(ab,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;n.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===n.inArray(e,d))&&(i=n.contains(e.ownerDocument,e),f=ob(k.appendChild(e),"script"),i&&mb(f),c)){j=0;while(e=f[j++])fb.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f=n.event.special,g=0;void 0!==(c=a[g]);g++){if(n.acceptData(c)&&(e=c[L.expando],e&&(b=L.cache[e]))){if(b.events)for(d in b.events)f[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);L.cache[e]&&delete L.cache[e]}delete M.cache[c[M.expando]]}}}),n.fn.extend({text:function(a){return J(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(ob(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&mb(ob(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(ob(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!db.test(a)&&!ib[(bb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(ab,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(ob(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(ob(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,m=this,o=l-1,p=a[0],q=n.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&eb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(c=n.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=n.map(ob(c,"script"),kb),g=f.length;l>j;j++)h=c,j!==o&&(h=n.clone(h,!0,!0),g&&n.merge(f,ob(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,n.map(f,lb),j=0;g>j;j++)h=f[j],fb.test(h.type||"")&&!L.access(h,"globalEval")&&n.contains(i,h)&&(h.src?n._evalUrl&&n._evalUrl(h.src):n.globalEval(h.textContent.replace(hb,"")))}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),n(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qb,rb={};function sb(b,c){var d,e=n(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:n.css(e[0],"display");return e.detach(),f}function tb(a){var b=l,c=rb[a];return c||(c=sb(a,b),"none"!==c&&c||(qb=(qb||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qb[0].contentDocument,b.write(),b.close(),c=sb(a,b),qb.detach()),rb[a]=c),c}var ub=/^margin/,vb=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)};function xb(a,b,c){var d,e,f,g,h=a.style;return c=c||wb(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),vb.test(g)&&ub.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function yb(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d=l.documentElement,e=l.createElement("div"),f=l.createElement("div");if(f.style){f.style.backgroundClip="content-box",f.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===f.style.backgroundClip,e.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",e.appendChild(f);function g(){f.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",f.innerHTML="",d.appendChild(e);var g=a.getComputedStyle(f,null);b="1%"!==g.top,c="4px"===g.width,d.removeChild(e)}a.getComputedStyle&&n.extend(k,{pixelPosition:function(){return g(),b},boxSizingReliable:function(){return null==c&&g(),c},reliableMarginRight:function(){var b,c=f.appendChild(l.createElement("div"));return c.style.cssText=f.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",f.style.width="1px",d.appendChild(e),b=!parseFloat(a.getComputedStyle(c,null).marginRight),d.removeChild(e),b}})}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var zb=/^(none|table(?!-c[ea]).+)/,Ab=new RegExp("^("+Q+")(.*)$","i"),Bb=new RegExp("^([+-])=("+Q+")","i"),Cb={position:"absolute",visibility:"hidden",display:"block"},Db={letterSpacing:"0",fontWeight:"400"},Eb=["Webkit","O","Moz","ms"];function Fb(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Eb.length;while(e--)if(b=Eb[e]+c,b in a)return b;return d}function Gb(a,b,c){var d=Ab.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Hb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+R[f]+"Width",!0,e))):(g+=n.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ib(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wb(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xb(a,b,f),(0>e||null==e)&&(e=a.style[b]),vb.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Hb(a,b,c||(g?"border":"content"),d,f)+"px"}function Jb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",tb(d.nodeName)))):(e=S(d),"none"===c&&e||L.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Fb(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Bb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Fb(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xb(a,b,d)),"normal"===e&&b in Db&&(e=Db[b]),""===c||c?(f=parseFloat(e),c===!0||n.isNumeric(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?zb.test(n.css(a,"display"))&&0===a.offsetWidth?n.swap(a,Cb,function(){return Ib(a,b,d)}):Ib(a,b,d):void 0},set:function(a,c,d){var e=d&&wb(a);return Gb(a,c,d?Hb(a,b,d,"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),n.cssHooks.marginRight=yb(k.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},xb,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ub.test(a)||(n.cssHooks[a+b].set=Gb)}),n.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=wb(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Jb(this,!0)},hide:function(){return Jb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?n(this).show():n(this).hide()})}});function Kb(a,b,c,d,e){return new Kb.prototype.init(a,b,c,d,e)}n.Tween=Kb,Kb.prototype={constructor:Kb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Kb.propHooks[this.prop];return a&&a.get?a.get(this):Kb.propHooks._default.get(this)},run:function(a){var b,c=Kb.propHooks[this.prop];return this.pos=b=this.options.duration?n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Kb.propHooks._default.set(this),this}},Kb.prototype.init.prototype=Kb.prototype,Kb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Kb.propHooks.scrollTop=Kb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=Kb.prototype.init,n.fx.step={};var Lb,Mb,Nb=/^(?:toggle|show|hide)$/,Ob=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pb=/queueHooks$/,Qb=[Vb],Rb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Ob.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&Ob.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sb(){return setTimeout(function(){Lb=void 0}),Lb=n.now()}function Tb(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ub(a,b,c){for(var d,e=(Rb[b]||[]).concat(Rb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Vb(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&S(a),q=L.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?L.get(a,"olddisplay")||tb(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Nb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?tb(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=L.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;L.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ub(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wb(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xb(a,b,c){var d,e,f=0,g=Qb.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Lb||Sb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Lb||Sb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wb(k,j.opts.specialEasing);g>f;f++)if(d=Qb[f].call(j,a,k,j.opts))return d;return n.map(k,Ub,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(Xb,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Rb[c]=Rb[c]||[],Rb[c].unshift(b)},prefilter:function(a,b){b?Qb.unshift(a):Qb.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=Xb(this,n.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Tb(b,!0),a,d,e)}}),n.each({slideDown:Tb("show"),slideUp:Tb("hide"),slideToggle:Tb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(Lb=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),Lb=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Mb||(Mb=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(Mb),Mb=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=l.createElement("input"),b=l.createElement("select"),c=b.appendChild(l.createElement("option"));a.type="checkbox",k.checkOn=""!==a.value,k.optSelected=c.selected,b.disabled=!0,k.optDisabled=!c.disabled,a=l.createElement("input"),a.value="t",a.type="radio",k.radioValue="t"===a.value}();var Yb,Zb,$b=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return J(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?Zb:Yb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))
},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Zb={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$b[b]||n.find.attr;$b[b]=function(a,b,d){var e,f;return d||(f=$b[b],$b[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$b[b]=f),e}});var _b=/^(?:input|select|textarea|button)$/i;n.fn.extend({prop:function(a,b){return J(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_b.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),k.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var ac=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ac," ").indexOf(b)>=0)return!0;return!1}});var bc=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bc,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},k.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cc=n.now(),dc=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&n.error("Invalid XML: "+a),b};var ec,fc,gc=/#.*$/,hc=/([?&])_=[^&]*/,ic=/^(.*?):[ \t]*([^\r\n]*)$/gm,jc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,kc=/^(?:GET|HEAD)$/,lc=/^\/\//,mc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,nc={},oc={},pc="*/".concat("*");try{fc=location.href}catch(qc){fc=l.createElement("a"),fc.href="",fc=fc.href}ec=mc.exec(fc.toLowerCase())||[];function rc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function sc(a,b,c,d){var e={},f=a===oc;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function tc(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function uc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function vc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:fc,type:"GET",isLocal:jc.test(ec[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":pc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?tc(tc(a,n.ajaxSettings),b):tc(n.ajaxSettings,a)},ajaxPrefilter:rc(nc),ajaxTransport:rc(oc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=ic.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||fc)+"").replace(gc,"").replace(lc,ec[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=mc.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===ec[1]&&h[2]===ec[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(ec[3]||("http:"===ec[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),sc(nc,k,b,v),2===t)return v;i=k.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!kc.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(dc.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=hc.test(d)?d.replace(hc,"$1_="+cc++):d+(dc.test(d)?"&":"?")+"_="+cc++)),k.ifModified&&(n.lastModified[d]&&v.setRequestHeader("If-Modified-Since",n.lastModified[d]),n.etag[d]&&v.setRequestHeader("If-None-Match",n.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+pc+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=sc(oc,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=uc(k,v,f)),u=vc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(n.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var wc=/%20/g,xc=/\[\]$/,yc=/\r?\n/g,zc=/^(?:submit|button|image|reset|file)$/i,Ac=/^(?:input|select|textarea|keygen)/i;function Bc(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||xc.test(a)?d(a,e):Bc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Bc(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Bc(c,a[c],b,e);return d.join("&").replace(wc,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&Ac.test(this.nodeName)&&!zc.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(yc,"\r\n")}}):{name:b.name,value:c.replace(yc,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Cc=0,Dc={},Ec={0:200,1223:204},Fc=n.ajaxSettings.xhr();a.ActiveXObject&&n(a).on("unload",function(){for(var a in Dc)Dc[a]()}),k.cors=!!Fc&&"withCredentials"in Fc,k.ajax=Fc=!!Fc,n.ajaxTransport(function(a){var b;return k.cors||Fc&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Cc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Dc[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Ec[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Dc[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=n("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),l.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Gc=[],Hc=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Gc.pop()||n.expando+"_"+cc++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Hc.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Hc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Hc,"$1"+e):b.jsonp!==!1&&(b.url+=(dc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Gc.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||l;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var Ic=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Ic)return Ic.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var Jc=a.document.documentElement;function Kc(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Kc(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Jc;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Jc})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;n.fn[b]=function(e){return J(this,function(b,e,f){var g=Kc(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=yb(k.pixelPosition,function(a,c){return c?(c=xb(a,b),vb.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Lc=a.jQuery,Mc=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Mc),b&&a.jQuery===n&&(a.jQuery=Lc),n},typeof b===U&&(a.jQuery=a.$=n),n});
/*! Swipebox v1.3.0.2 | Constantin Saguin csag.co | MIT License | github.com/brutaldesign/swipebox */

!function(a,b,c,d){c.swipebox=function(e,f){var g,h,i={useCSS:!0,useSVG:!0,initialIndexOnArray:0,hideCloseButtonOnMobile:!1,hideBarsDelay:3e3,videoMaxWidth:1140,vimeoColor:"cccccc",beforeOpen:null,afterOpen:null,afterClose:null,loopAtEnd:!1,autoplayVideos:!1},j=this,k=[],l=e.selector,m=c(l),n=navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i),o=null!==n||b.createTouch!==d||"ontouchstart"in a||"onmsgesturechange"in a||navigator.msMaxTouchPoints,p=!!b.createElementNS&&!!b.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,q=a.innerWidth?a.innerWidth:c(a).width(),r=a.innerHeight?a.innerHeight:c(a).height(),s=0,t='<div id="swipebox-overlay">					<div id="swipebox-container">						<div id="swipebox-slider"></div>						<div id="swipebox-top-bar">							<div id="swipebox-title"></div>						</div>						<div id="swipebox-bottom-bar">							<div id="swipebox-arrows">								<a id="swipebox-prev"></a>								<a id="swipebox-next"></a>							</div>						</div>						<a id="swipebox-close"></a>					</div>			</div>';j.settings={},c.swipebox.close=function(){g.closeSlide()},c.swipebox.extend=function(){return g},j.init=function(){j.settings=c.extend({},i,f),c.isArray(e)?(k=e,g.target=c(a),g.init(j.settings.initialIndexOnArray)):c(b).on("click",l,function(a){if("slide current"===a.target.parentNode.className)return!1;c.isArray(e)||(g.destroy(),h=c(l),g.actions()),k=[];var b,d,f;f||(d="data-rel",f=c(this).attr(d)),f||(d="rel",f=c(this).attr(d)),h=f&&""!==f&&"nofollow"!==f?m.filter("["+d+'="'+f+'"]'):c(l),h.each(function(){var a=null,b=null;c(this).attr("title")&&(a=c(this).attr("title")),c(this).attr("href")&&(b=c(this).attr("href")),k.push({href:b,title:a})}),b=h.index(c(this)),a.preventDefault(),a.stopPropagation(),g.target=c(a.target),g.init(b)})},g={init:function(a){j.settings.beforeOpen&&j.settings.beforeOpen(),this.target.trigger("swipebox-start"),c.swipebox.isOpen=!0,this.build(),this.openSlide(a),this.openMedia(a),this.preloadMedia(a+1),this.preloadMedia(a-1),j.settings.afterOpen&&j.settings.afterOpen()},build:function(){var a,b=this;c("body").append(t),p&&j.settings.useSVG===!0&&(a=c("#swipebox-close").css("background-image"),a=a.replace("png","svg"),c("#swipebox-prev, #swipebox-next, #swipebox-close").css({"background-image":a})),n&&c("#swipebox-bottom-bar, #swipebox-top-bar").remove(),c.each(k,function(){c("#swipebox-slider").append('<div class="slide"></div>')}),b.setDim(),b.actions(),o&&b.gesture(),b.keyboard(),b.animBars(),b.resize()},setDim:function(){var b,d,e={};"onorientationchange"in a?a.addEventListener("orientationchange",function(){0===a.orientation?(b=q,d=r):(90===a.orientation||-90===a.orientation)&&(b=r,d=q)},!1):(b=a.innerWidth?a.innerWidth:c(a).width(),d=a.innerHeight?a.innerHeight:c(a).height()),e={width:b,height:d},c("#swipebox-overlay").css(e)},resize:function(){var b=this;c(a).resize(function(){b.setDim()}).resize()},supportTransition:function(){var a,c="transition WebkitTransition MozTransition OTransition msTransition KhtmlTransition".split(" ");for(a=0;a<c.length;a++)if(b.createElement("div").style[c[a]]!==d)return c[a];return!1},doCssTrans:function(){return j.settings.useCSS&&this.supportTransition()?!0:void 0},gesture:function(){var a,b,d,e,f,g,h=this,i=!1,j=!1,l=10,m=50,n={},o={},p=c("#swipebox-top-bar, #swipebox-bottom-bar"),r=c("#swipebox-slider");p.addClass("visible-bars"),h.setTimeout(),c("body").bind("touchstart",function(h){return c(this).addClass("touching"),a=c("#swipebox-slider .slide").index(c("#swipebox-slider .slide.current")),o=h.originalEvent.targetTouches[0],n.pageX=h.originalEvent.targetTouches[0].pageX,n.pageY=h.originalEvent.targetTouches[0].pageY,c("#swipebox-slider").css({"-webkit-transform":"translate3d("+s+"%, 0, 0)",transform:"translate3d("+s+"%, 0, 0)"}),c(".touching").bind("touchmove",function(h){if(h.preventDefault(),h.stopPropagation(),o=h.originalEvent.targetTouches[0],!j&&(f=d,d=o.pageY-n.pageY,Math.abs(d)>=m||i)){var p=.75-Math.abs(d)/r.height();r.css({top:d+"px"}),r.css({opacity:p}),i=!0}e=b,b=o.pageX-n.pageX,g=100*b/q,!j&&!i&&Math.abs(b)>=l&&(c("#swipebox-slider").css({"-webkit-transition":"",transition:""}),j=!0),j&&(b>0?0===a?c("#swipebox-overlay").addClass("leftSpringTouch"):(c("#swipebox-overlay").removeClass("leftSpringTouch").removeClass("rightSpringTouch"),c("#swipebox-slider").css({"-webkit-transform":"translate3d("+(s+g)+"%, 0, 0)",transform:"translate3d("+(s+g)+"%, 0, 0)"})):0>b&&(k.length===a+1?c("#swipebox-overlay").addClass("rightSpringTouch"):(c("#swipebox-overlay").removeClass("leftSpringTouch").removeClass("rightSpringTouch"),c("#swipebox-slider").css({"-webkit-transform":"translate3d("+(s+g)+"%, 0, 0)",transform:"translate3d("+(s+g)+"%, 0, 0)"}))))}),!1}).bind("touchend",function(a){if(a.preventDefault(),a.stopPropagation(),c("#swipebox-slider").css({"-webkit-transition":"-webkit-transform 0.4s ease",transition:"transform 0.4s ease"}),d=o.pageY-n.pageY,b=o.pageX-n.pageX,g=100*b/q,i)if(i=!1,Math.abs(d)>=2*m&&Math.abs(d)>Math.abs(f)){var k=d>0?r.height():-r.height();r.animate({top:k+"px",opacity:0},300,function(){h.closeSlide()})}else r.animate({top:0,opacity:1},300);else j?(j=!1,b>=l&&b>=e?h.getPrev():-l>=b&&e>=b&&h.getNext()):p.hasClass("visible-bars")?(h.clearTimeout(),h.hideBars()):(h.showBars(),h.setTimeout());c("#swipebox-slider").css({"-webkit-transform":"translate3d("+s+"%, 0, 0)",transform:"translate3d("+s+"%, 0, 0)"}),c("#swipebox-overlay").removeClass("leftSpringTouch").removeClass("rightSpringTouch"),c(".touching").off("touchmove").removeClass("touching")})},setTimeout:function(){if(j.settings.hideBarsDelay>0){var b=this;b.clearTimeout(),b.timeout=a.setTimeout(function(){b.hideBars()},j.settings.hideBarsDelay)}},clearTimeout:function(){a.clearTimeout(this.timeout),this.timeout=null},showBars:function(){var a=c("#swipebox-top-bar, #swipebox-bottom-bar");this.doCssTrans()?a.addClass("visible-bars"):(c("#swipebox-top-bar").animate({top:0},500),c("#swipebox-bottom-bar").animate({bottom:0},500),setTimeout(function(){a.addClass("visible-bars")},1e3))},hideBars:function(){var a=c("#swipebox-top-bar, #swipebox-bottom-bar");this.doCssTrans()?a.removeClass("visible-bars"):(c("#swipebox-top-bar").animate({top:"-50px"},500),c("#swipebox-bottom-bar").animate({bottom:"-50px"},500),setTimeout(function(){a.removeClass("visible-bars")},1e3))},animBars:function(){var a=this,b=c("#swipebox-top-bar, #swipebox-bottom-bar");b.addClass("visible-bars"),a.setTimeout(),c("#swipebox-slider").click(function(){b.hasClass("visible-bars")||(a.showBars(),a.setTimeout())}),c("#swipebox-bottom-bar").hover(function(){a.showBars(),b.addClass("visible-bars"),a.clearTimeout()},function(){j.settings.hideBarsDelay>0&&(b.removeClass("visible-bars"),a.setTimeout())})},keyboard:function(){var b=this;c(a).bind("keyup",function(a){a.preventDefault(),a.stopPropagation(),37===a.keyCode?b.getPrev():39===a.keyCode?b.getNext():27===a.keyCode&&b.closeSlide()})},actions:function(){var a=this,b="touchend click";k.length<2?(c("#swipebox-bottom-bar").hide(),d===k[1]&&c("#swipebox-top-bar").hide()):(c("#swipebox-prev").bind(b,function(b){b.preventDefault(),b.stopPropagation(),a.getPrev(),a.setTimeout()}),c("#swipebox-next").bind(b,function(b){b.preventDefault(),b.stopPropagation(),a.getNext(),a.setTimeout()})),c("#swipebox-close").bind(b,function(){a.closeSlide()})},setSlide:function(a,b){b=b||!1;var d=c("#swipebox-slider");s=100*-a,this.doCssTrans()?d.css({"-webkit-transform":"translate3d("+100*-a+"%, 0, 0)",transform:"translate3d("+100*-a+"%, 0, 0)"}):d.animate({left:100*-a+"%"}),c("#swipebox-slider .slide").removeClass("current"),c("#swipebox-slider .slide").eq(a).addClass("current"),this.setTitle(a),b&&d.fadeIn(),c("#swipebox-prev, #swipebox-next").removeClass("disabled"),0===a?c("#swipebox-prev").addClass("disabled"):a===k.length-1&&j.settings.loopAtEnd!==!0&&c("#swipebox-next").addClass("disabled")},openSlide:function(b){c("html").addClass("swipebox-html"),o?(c("html").addClass("swipebox-touch"),j.settings.hideCloseButtonOnMobile&&c("html").addClass("swipebox-no-close-button")):c("html").addClass("swipebox-no-touch"),c(a).trigger("resize"),this.setSlide(b,!0)},preloadMedia:function(a){var b=this,c=null;k[a]!==d&&(c=k[a].href),b.isVideo(c)?b.openMedia(a):setTimeout(function(){b.openMedia(a)},1e3)},openMedia:function(a){var b,e,f=this;return k[a]!==d&&(b=k[a].href),0>a||a>=k.length?!1:(e=c("#swipebox-slider .slide").eq(a),void(f.isVideo(b)?e.html(f.getVideo(b)):(e.addClass("slide-loading"),f.loadMedia(b,function(){e.removeClass("slide-loading"),e.html(this)}))))},setTitle:function(a){var b=null;c("#swipebox-title").empty(),k[a]!==d&&(b=k[a].title),b?(c("#swipebox-top-bar").show(),c("#swipebox-title").append(b)):c("#swipebox-top-bar").hide()},isVideo:function(a){if(a){if(a.match(/youtube\.com\/watch\?v=([a-zA-Z0-9\-_]+)/)||a.match(/vimeo\.com\/([0-9]*)/)||a.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/))return!0;if(a.toLowerCase().indexOf("swipeboxvideo=1")>=0)return!0}},getVideo:function(a){var b="",c=a.match(/watch\?v=([a-zA-Z0-9\-_]+)/),d=a.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/),e=a.match(/vimeo\.com\/([0-9]*)/);return c||d?(d&&(c=d),b='<iframe width="560" height="315" src="//www.youtube.com/embed/'+c[1]+"?autoplay="+j.settings.autoplayVideos+'" frameborder="0" allowfullscreen></iframe>'):e&&(b='<iframe width="560" height="315"  src="//player.vimeo.com/video/'+e[1]+"?byline=0&amp;portrait=0&amp;color="+j.settings.vimeoColor+"&autoplay="+j.settings.autoplayVideos+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'),c||d||e||(b='<iframe width="560" height="315" src="'+a+'" frameborder="0" allowfullscreen></iframe>'),'<div class="swipebox-video-container" style="max-width:'+j.settings.videomaxWidth+'px"><div class="swipebox-video">'+b+"</div></div>"},loadMedia:function(a,b){if(!this.isVideo(a)){var d=c("<img>").on("load",function(){b.call(d)});d.attr("src",a)}},getNext:function(){var a,b=this,d=c("#swipebox-slider .slide").index(c("#swipebox-slider .slide.current"));d+1<k.length?(a=c("#swipebox-slider .slide").eq(d).contents().find("iframe").attr("src"),c("#swipebox-slider .slide").eq(d).contents().find("iframe").attr("src",a),d++,b.setSlide(d),b.preloadMedia(d+1)):j.settings.loopAtEnd===!0?(a=c("#swipebox-slider .slide").eq(d).contents().find("iframe").attr("src"),c("#swipebox-slider .slide").eq(d).contents().find("iframe").attr("src",a),d=0,b.preloadMedia(d),b.setSlide(d),b.preloadMedia(d+1)):(c("#swipebox-overlay").addClass("rightSpring"),setTimeout(function(){c("#swipebox-overlay").removeClass("rightSpring")},500))},getPrev:function(){var a,b=c("#swipebox-slider .slide").index(c("#swipebox-slider .slide.current"));b>0?(a=c("#swipebox-slider .slide").eq(b).contents().find("iframe").attr("src"),c("#swipebox-slider .slide").eq(b).contents().find("iframe").attr("src",a),b--,this.setSlide(b),this.preloadMedia(b-1)):(c("#swipebox-overlay").addClass("leftSpring"),setTimeout(function(){c("#swipebox-overlay").removeClass("leftSpring")},500))},closeSlide:function(){c("html").removeClass("swipebox-html"),c("html").removeClass("swipebox-touch"),c(a).trigger("resize"),this.destroy()},destroy:function(){c(a).unbind("keyup"),c("body").unbind("touchstart"),c("body").unbind("touchmove"),c("body").unbind("touchend"),c("#swipebox-slider").unbind(),c("#swipebox-overlay").remove(),c.isArray(e)||e.removeData("_swipebox"),this.target&&this.target.trigger("swipebox-destroy"),c.swipebox.isOpen=!1,j.settings.afterClose&&j.settings.afterClose()}},j.init()},c.fn.swipebox=function(a){if(!c.data(this,"_swipebox")){var b=new c.swipebox(this,a);this.data("_swipebox",b)}return this.data("_swipebox")}}(window,document,jQuery);/*  |xGv00|5d44319b1423dc9f1f497ccc3c131263 */
;
/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modern -o ./dist/lodash.js`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

(function(){function baseIndexOf(array,value,fromIndex){for(var index=(fromIndex||0)-1,length=array?array.length:0;++index<length;)if(array[index]===value)return index;return-1}function cacheIndexOf(cache,value){var type=typeof value;if(cache=cache.cache,"boolean"==type||null==value)return cache[value]?0:-1;"number"!=type&&"string"!=type&&(type="object");var key="number"==type?value:keyPrefix+value;return cache=(cache=cache[type])&&cache[key],"object"==type?cache&&baseIndexOf(cache,value)>-1?0:-1:cache?0:-1}function cachePush(value){var cache=this.cache,type=typeof value;if("boolean"==type||null==value)cache[value]=!0;else{"number"!=type&&"string"!=type&&(type="object");var key="number"==type?value:keyPrefix+value,typeCache=cache[type]||(cache[type]={});"object"==type?(typeCache[key]||(typeCache[key]=[])).push(value):typeCache[key]=!0}}function charAtCallback(value){return value.charCodeAt(0)}function compareAscending(a,b){for(var ac=a.criteria,bc=b.criteria,index=-1,length=ac.length;++index<length;){var value=ac[index],other=bc[index];if(value!==other){if(value>other||"undefined"==typeof value)return 1;if(other>value||"undefined"==typeof other)return-1}}return a.index-b.index}function createCache(array){var index=-1,length=array.length,first=array[0],mid=array[length/2|0],last=array[length-1];if(first&&"object"==typeof first&&mid&&"object"==typeof mid&&last&&"object"==typeof last)return!1;var cache=getObject();cache["false"]=cache["null"]=cache["true"]=cache.undefined=!1;var result=getObject();for(result.array=array,result.cache=cache,result.push=cachePush;++index<length;)result.push(array[index]);return result}function escapeStringChar(match){return"\\"+stringEscapes[match]}function getArray(){return arrayPool.pop()||[]}function getObject(){return objectPool.pop()||{array:null,cache:null,criteria:null,"false":!1,index:0,"null":!1,number:null,object:null,push:null,string:null,"true":!1,undefined:!1,value:null}}function releaseArray(array){array.length=0,arrayPool.length<maxPoolSize&&arrayPool.push(array)}function releaseObject(object){var cache=object.cache;cache&&releaseObject(cache),object.array=object.cache=object.criteria=object.object=object.number=object.string=object.value=null,objectPool.length<maxPoolSize&&objectPool.push(object)}function slice(array,start,end){start||(start=0),"undefined"==typeof end&&(end=array?array.length:0);for(var index=-1,length=end-start||0,result=Array(0>length?0:length);++index<length;)result[index]=array[start+index];return result}function runInContext(context){function lodash(value){return value&&"object"==typeof value&&!isArray(value)&&hasOwnProperty.call(value,"__wrapped__")?value:new lodashWrapper(value)}function lodashWrapper(value,chainAll){this.__chain__=!!chainAll,this.__wrapped__=value}function baseBind(bindData){function bound(){if(partialArgs){var args=slice(partialArgs);push.apply(args,arguments)}if(this instanceof bound){var thisBinding=baseCreate(func.prototype),result=func.apply(thisBinding,args||arguments);return isObject(result)?result:thisBinding}return func.apply(thisArg,args||arguments)}var func=bindData[0],partialArgs=bindData[2],thisArg=bindData[4];return setBindData(bound,bindData),bound}function baseClone(value,isDeep,callback,stackA,stackB){if(callback){var result=callback(value);if("undefined"!=typeof result)return result}var isObj=isObject(value);if(!isObj)return value;var className=toString.call(value);if(!cloneableClasses[className])return value;var ctor=ctorByClass[className];switch(className){case boolClass:case dateClass:return new ctor(+value);case numberClass:case stringClass:return new ctor(value);case regexpClass:return result=ctor(value.source,reFlags.exec(value)),result.lastIndex=value.lastIndex,result}var isArr=isArray(value);if(isDeep){var initedStack=!stackA;stackA||(stackA=getArray()),stackB||(stackB=getArray());for(var length=stackA.length;length--;)if(stackA[length]==value)return stackB[length];result=isArr?ctor(value.length):{}}else result=isArr?slice(value):assign({},value);return isArr&&(hasOwnProperty.call(value,"index")&&(result.index=value.index),hasOwnProperty.call(value,"input")&&(result.input=value.input)),isDeep?(stackA.push(value),stackB.push(result),(isArr?forEach:forOwn)(value,function(objValue,key){result[key]=baseClone(objValue,isDeep,callback,stackA,stackB)}),initedStack&&(releaseArray(stackA),releaseArray(stackB)),result):result}function baseCreate(prototype){return isObject(prototype)?nativeCreate(prototype):{}}function baseCreateCallback(func,thisArg,argCount){if("function"!=typeof func)return identity;if("undefined"==typeof thisArg||!("prototype"in func))return func;var bindData=func.__bindData__;if("undefined"==typeof bindData&&(support.funcNames&&(bindData=!func.name),bindData=bindData||!support.funcDecomp,!bindData)){var source=fnToString.call(func);support.funcNames||(bindData=!reFuncName.test(source)),bindData||(bindData=reThis.test(source),setBindData(func,bindData))}if(bindData===!1||bindData!==!0&&1&bindData[1])return func;switch(argCount){case 1:return function(value){return func.call(thisArg,value)};case 2:return function(a,b){return func.call(thisArg,a,b)};case 3:return function(value,index,collection){return func.call(thisArg,value,index,collection)};case 4:return function(accumulator,value,index,collection){return func.call(thisArg,accumulator,value,index,collection)}}return bind(func,thisArg)}function baseCreateWrapper(bindData){function bound(){var thisBinding=isBind?thisArg:this;if(partialArgs){var args=slice(partialArgs);push.apply(args,arguments)}if((partialRightArgs||isCurry)&&(args||(args=slice(arguments)),partialRightArgs&&push.apply(args,partialRightArgs),isCurry&&args.length<arity))return bitmask|=16,baseCreateWrapper([func,isCurryBound?bitmask:-4&bitmask,args,null,thisArg,arity]);if(args||(args=arguments),isBindKey&&(func=thisBinding[key]),this instanceof bound){thisBinding=baseCreate(func.prototype);var result=func.apply(thisBinding,args);return isObject(result)?result:thisBinding}return func.apply(thisBinding,args)}var func=bindData[0],bitmask=bindData[1],partialArgs=bindData[2],partialRightArgs=bindData[3],thisArg=bindData[4],arity=bindData[5],isBind=1&bitmask,isBindKey=2&bitmask,isCurry=4&bitmask,isCurryBound=8&bitmask,key=func;return setBindData(bound,bindData),bound}function baseDifference(array,values){var index=-1,indexOf=getIndexOf(),length=array?array.length:0,isLarge=length>=largeArraySize&&indexOf===baseIndexOf,result=[];if(isLarge){var cache=createCache(values);cache?(indexOf=cacheIndexOf,values=cache):isLarge=!1}for(;++index<length;){var value=array[index];indexOf(values,value)<0&&result.push(value)}return isLarge&&releaseObject(values),result}function baseFlatten(array,isShallow,isStrict,fromIndex){for(var index=(fromIndex||0)-1,length=array?array.length:0,result=[];++index<length;){var value=array[index];if(value&&"object"==typeof value&&"number"==typeof value.length&&(isArray(value)||isArguments(value))){isShallow||(value=baseFlatten(value,isShallow,isStrict));var valIndex=-1,valLength=value.length,resIndex=result.length;for(result.length+=valLength;++valIndex<valLength;)result[resIndex++]=value[valIndex]}else isStrict||result.push(value)}return result}function baseIsEqual(a,b,callback,isWhere,stackA,stackB){if(callback){var result=callback(a,b);if("undefined"!=typeof result)return!!result}if(a===b)return 0!==a||1/a==1/b;var type=typeof a,otherType=typeof b;if(!(a!==a||a&&objectTypes[type]||b&&objectTypes[otherType]))return!1;if(null==a||null==b)return a===b;var className=toString.call(a),otherClass=toString.call(b);if(className==argsClass&&(className=objectClass),otherClass==argsClass&&(otherClass=objectClass),className!=otherClass)return!1;switch(className){case boolClass:case dateClass:return+a==+b;case numberClass:return a!=+a?b!=+b:0==a?1/a==1/b:a==+b;case regexpClass:case stringClass:return a==String(b)}var isArr=className==arrayClass;if(!isArr){var aWrapped=hasOwnProperty.call(a,"__wrapped__"),bWrapped=hasOwnProperty.call(b,"__wrapped__");if(aWrapped||bWrapped)return baseIsEqual(aWrapped?a.__wrapped__:a,bWrapped?b.__wrapped__:b,callback,isWhere,stackA,stackB);if(className!=objectClass)return!1;var ctorA=a.constructor,ctorB=b.constructor;if(ctorA!=ctorB&&!(isFunction(ctorA)&&ctorA instanceof ctorA&&isFunction(ctorB)&&ctorB instanceof ctorB)&&"constructor"in a&&"constructor"in b)return!1}var initedStack=!stackA;stackA||(stackA=getArray()),stackB||(stackB=getArray());for(var length=stackA.length;length--;)if(stackA[length]==a)return stackB[length]==b;var size=0;if(result=!0,stackA.push(a),stackB.push(b),isArr){if(length=a.length,size=b.length,result=size==length,result||isWhere)for(;size--;){var index=length,value=b[size];if(isWhere)for(;index--&&!(result=baseIsEqual(a[index],value,callback,isWhere,stackA,stackB)););else if(!(result=baseIsEqual(a[size],value,callback,isWhere,stackA,stackB)))break}}else forIn(b,function(value,key,b){return hasOwnProperty.call(b,key)?(size++,result=hasOwnProperty.call(a,key)&&baseIsEqual(a[key],value,callback,isWhere,stackA,stackB)):void 0}),result&&!isWhere&&forIn(a,function(value,key,a){return hasOwnProperty.call(a,key)?result=--size>-1:void 0});return stackA.pop(),stackB.pop(),initedStack&&(releaseArray(stackA),releaseArray(stackB)),result}function baseMerge(object,source,callback,stackA,stackB){(isArray(source)?forEach:forOwn)(source,function(source,key){var found,isArr,result=source,value=object[key];if(source&&((isArr=isArray(source))||isPlainObject(source))){for(var stackLength=stackA.length;stackLength--;)if(found=stackA[stackLength]==source){value=stackB[stackLength];break}if(!found){var isShallow;callback&&(result=callback(value,source),(isShallow="undefined"!=typeof result)&&(value=result)),isShallow||(value=isArr?isArray(value)?value:[]:isPlainObject(value)?value:{}),stackA.push(source),stackB.push(value),isShallow||baseMerge(value,source,callback,stackA,stackB)}}else callback&&(result=callback(value,source),"undefined"==typeof result&&(result=source)),"undefined"!=typeof result&&(value=result);object[key]=value})}function baseRandom(min,max){return min+floor(nativeRandom()*(max-min+1))}function baseUniq(array,isSorted,callback){var index=-1,indexOf=getIndexOf(),length=array?array.length:0,result=[],isLarge=!isSorted&&length>=largeArraySize&&indexOf===baseIndexOf,seen=callback||isLarge?getArray():result;if(isLarge){var cache=createCache(seen);indexOf=cacheIndexOf,seen=cache}for(;++index<length;){var value=array[index],computed=callback?callback(value,index,array):value;(isSorted?!index||seen[seen.length-1]!==computed:indexOf(seen,computed)<0)&&((callback||isLarge)&&seen.push(computed),result.push(value))}return isLarge?(releaseArray(seen.array),releaseObject(seen)):callback&&releaseArray(seen),result}function createAggregator(setter){return function(collection,callback,thisArg){var result={};callback=lodash.createCallback(callback,thisArg,3);var index=-1,length=collection?collection.length:0;if("number"==typeof length)for(;++index<length;){var value=collection[index];setter(result,value,callback(value,index,collection),collection)}else forOwn(collection,function(value,key,collection){setter(result,value,callback(value,key,collection),collection)});return result}}function createWrapper(func,bitmask,partialArgs,partialRightArgs,thisArg,arity){var isBind=1&bitmask,isBindKey=2&bitmask,isCurry=4&bitmask,isPartial=16&bitmask,isPartialRight=32&bitmask;if(!isBindKey&&!isFunction(func))throw new TypeError;isPartial&&!partialArgs.length&&(bitmask&=-17,isPartial=partialArgs=!1),isPartialRight&&!partialRightArgs.length&&(bitmask&=-33,isPartialRight=partialRightArgs=!1);var bindData=func&&func.__bindData__;if(bindData&&bindData!==!0)return bindData=slice(bindData),bindData[2]&&(bindData[2]=slice(bindData[2])),bindData[3]&&(bindData[3]=slice(bindData[3])),!isBind||1&bindData[1]||(bindData[4]=thisArg),!isBind&&1&bindData[1]&&(bitmask|=8),!isCurry||4&bindData[1]||(bindData[5]=arity),isPartial&&push.apply(bindData[2]||(bindData[2]=[]),partialArgs),isPartialRight&&unshift.apply(bindData[3]||(bindData[3]=[]),partialRightArgs),bindData[1]|=bitmask,createWrapper.apply(null,bindData);var creater=1==bitmask||17===bitmask?baseBind:baseCreateWrapper;return creater([func,bitmask,partialArgs,partialRightArgs,thisArg,arity])}function escapeHtmlChar(match){return htmlEscapes[match]}function getIndexOf(){var result=(result=lodash.indexOf)===indexOf?baseIndexOf:result;return result}function isNative(value){return"function"==typeof value&&reNative.test(value)}function shimIsPlainObject(value){var ctor,result;return value&&toString.call(value)==objectClass&&(ctor=value.constructor,!isFunction(ctor)||ctor instanceof ctor)?(forIn(value,function(value,key){result=key}),"undefined"==typeof result||hasOwnProperty.call(value,result)):!1}function unescapeHtmlChar(match){return htmlUnescapes[match]}function isArguments(value){return value&&"object"==typeof value&&"number"==typeof value.length&&toString.call(value)==argsClass||!1}function clone(value,isDeep,callback,thisArg){return"boolean"!=typeof isDeep&&null!=isDeep&&(thisArg=callback,callback=isDeep,isDeep=!1),baseClone(value,isDeep,"function"==typeof callback&&baseCreateCallback(callback,thisArg,1))}function cloneDeep(value,callback,thisArg){return baseClone(value,!0,"function"==typeof callback&&baseCreateCallback(callback,thisArg,1))}function create(prototype,properties){var result=baseCreate(prototype);return properties?assign(result,properties):result}function findKey(object,callback,thisArg){var result;return callback=lodash.createCallback(callback,thisArg,3),forOwn(object,function(value,key,object){return callback(value,key,object)?(result=key,!1):void 0}),result}function findLastKey(object,callback,thisArg){var result;return callback=lodash.createCallback(callback,thisArg,3),forOwnRight(object,function(value,key,object){return callback(value,key,object)?(result=key,!1):void 0}),result}function forInRight(object,callback,thisArg){var pairs=[];forIn(object,function(value,key){pairs.push(key,value)});var length=pairs.length;for(callback=baseCreateCallback(callback,thisArg,3);length--&&callback(pairs[length--],pairs[length],object)!==!1;);return object}function forOwnRight(object,callback,thisArg){var props=keys(object),length=props.length;for(callback=baseCreateCallback(callback,thisArg,3);length--;){var key=props[length];if(callback(object[key],key,object)===!1)break}return object}function functions(object){var result=[];return forIn(object,function(value,key){isFunction(value)&&result.push(key)}),result.sort()}function has(object,key){return object?hasOwnProperty.call(object,key):!1}function invert(object){for(var index=-1,props=keys(object),length=props.length,result={};++index<length;){var key=props[index];result[object[key]]=key}return result}function isBoolean(value){return value===!0||value===!1||value&&"object"==typeof value&&toString.call(value)==boolClass||!1}function isDate(value){return value&&"object"==typeof value&&toString.call(value)==dateClass||!1}function isElement(value){return value&&1===value.nodeType||!1}function isEmpty(value){var result=!0;if(!value)return result;var className=toString.call(value),length=value.length;return className==arrayClass||className==stringClass||className==argsClass||className==objectClass&&"number"==typeof length&&isFunction(value.splice)?!length:(forOwn(value,function(){return result=!1}),result)}function isEqual(a,b,callback,thisArg){return baseIsEqual(a,b,"function"==typeof callback&&baseCreateCallback(callback,thisArg,2))}function isFinite(value){return nativeIsFinite(value)&&!nativeIsNaN(parseFloat(value))}function isFunction(value){return"function"==typeof value}function isObject(value){return!(!value||!objectTypes[typeof value])}function isNaN(value){return isNumber(value)&&value!=+value}function isNull(value){return null===value}function isNumber(value){return"number"==typeof value||value&&"object"==typeof value&&toString.call(value)==numberClass||!1}function isRegExp(value){return value&&"object"==typeof value&&toString.call(value)==regexpClass||!1}function isString(value){return"string"==typeof value||value&&"object"==typeof value&&toString.call(value)==stringClass||!1}function isUndefined(value){return"undefined"==typeof value}function mapValues(object,callback,thisArg){var result={};return callback=lodash.createCallback(callback,thisArg,3),forOwn(object,function(value,key,object){result[key]=callback(value,key,object)}),result}function merge(object){var args=arguments,length=2;if(!isObject(object))return object;if("number"!=typeof args[2]&&(length=args.length),length>3&&"function"==typeof args[length-2])var callback=baseCreateCallback(args[--length-1],args[length--],2);else length>2&&"function"==typeof args[length-1]&&(callback=args[--length]);for(var sources=slice(arguments,1,length),index=-1,stackA=getArray(),stackB=getArray();++index<length;)baseMerge(object,sources[index],callback,stackA,stackB);return releaseArray(stackA),releaseArray(stackB),object}function omit(object,callback,thisArg){var result={};if("function"!=typeof callback){var props=[];forIn(object,function(value,key){props.push(key)}),props=baseDifference(props,baseFlatten(arguments,!0,!1,1));for(var index=-1,length=props.length;++index<length;){var key=props[index];result[key]=object[key]}}else callback=lodash.createCallback(callback,thisArg,3),forIn(object,function(value,key,object){callback(value,key,object)||(result[key]=value)});return result}function pairs(object){for(var index=-1,props=keys(object),length=props.length,result=Array(length);++index<length;){var key=props[index];result[index]=[key,object[key]]}return result}function pick(object,callback,thisArg){var result={};if("function"!=typeof callback)for(var index=-1,props=baseFlatten(arguments,!0,!1,1),length=isObject(object)?props.length:0;++index<length;){var key=props[index];key in object&&(result[key]=object[key])}else callback=lodash.createCallback(callback,thisArg,3),forIn(object,function(value,key,object){callback(value,key,object)&&(result[key]=value)});return result}function transform(object,callback,accumulator,thisArg){var isArr=isArray(object);if(null==accumulator)if(isArr)accumulator=[];else{var ctor=object&&object.constructor,proto=ctor&&ctor.prototype;accumulator=baseCreate(proto)}return callback&&(callback=lodash.createCallback(callback,thisArg,4),(isArr?forEach:forOwn)(object,function(value,index,object){return callback(accumulator,value,index,object)})),accumulator}function values(object){for(var index=-1,props=keys(object),length=props.length,result=Array(length);++index<length;)result[index]=object[props[index]];return result}function at(collection){for(var args=arguments,index=-1,props=baseFlatten(args,!0,!1,1),length=args[2]&&args[2][args[1]]===collection?1:props.length,result=Array(length);++index<length;)result[index]=collection[props[index]];return result}function contains(collection,target,fromIndex){var index=-1,indexOf=getIndexOf(),length=collection?collection.length:0,result=!1;return fromIndex=(0>fromIndex?nativeMax(0,length+fromIndex):fromIndex)||0,isArray(collection)?result=indexOf(collection,target,fromIndex)>-1:"number"==typeof length?result=(isString(collection)?collection.indexOf(target,fromIndex):indexOf(collection,target,fromIndex))>-1:forOwn(collection,function(value){return++index>=fromIndex?!(result=value===target):void 0}),result}function every(collection,callback,thisArg){var result=!0;callback=lodash.createCallback(callback,thisArg,3);var index=-1,length=collection?collection.length:0;if("number"==typeof length)for(;++index<length&&(result=!!callback(collection[index],index,collection)););else forOwn(collection,function(value,index,collection){return result=!!callback(value,index,collection)});return result}function filter(collection,callback,thisArg){var result=[];callback=lodash.createCallback(callback,thisArg,3);var index=-1,length=collection?collection.length:0;if("number"==typeof length)for(;++index<length;){var value=collection[index];callback(value,index,collection)&&result.push(value)}else forOwn(collection,function(value,index,collection){callback(value,index,collection)&&result.push(value)});return result}function find(collection,callback,thisArg){callback=lodash.createCallback(callback,thisArg,3);var index=-1,length=collection?collection.length:0;if("number"!=typeof length){var result;return forOwn(collection,function(value,index,collection){return callback(value,index,collection)?(result=value,!1):void 0}),result}for(;++index<length;){var value=collection[index];if(callback(value,index,collection))return value}}function findLast(collection,callback,thisArg){var result;return callback=lodash.createCallback(callback,thisArg,3),forEachRight(collection,function(value,index,collection){return callback(value,index,collection)?(result=value,!1):void 0}),result}function forEach(collection,callback,thisArg){var index=-1,length=collection?collection.length:0;if(callback=callback&&"undefined"==typeof thisArg?callback:baseCreateCallback(callback,thisArg,3),"number"==typeof length)for(;++index<length&&callback(collection[index],index,collection)!==!1;);else forOwn(collection,callback);return collection}function forEachRight(collection,callback,thisArg){var length=collection?collection.length:0;if(callback=callback&&"undefined"==typeof thisArg?callback:baseCreateCallback(callback,thisArg,3),"number"==typeof length)for(;length--&&callback(collection[length],length,collection)!==!1;);else{var props=keys(collection);length=props.length,forOwn(collection,function(value,key,collection){return key=props?props[--length]:--length,callback(collection[key],key,collection)})}return collection}function invoke(collection,methodName){var args=slice(arguments,2),index=-1,isFunc="function"==typeof methodName,length=collection?collection.length:0,result=Array("number"==typeof length?length:0);return forEach(collection,function(value){result[++index]=(isFunc?methodName:value[methodName]).apply(value,args)}),result}function map(collection,callback,thisArg){var index=-1,length=collection?collection.length:0;if(callback=lodash.createCallback(callback,thisArg,3),"number"==typeof length)for(var result=Array(length);++index<length;)result[index]=callback(collection[index],index,collection);else result=[],forOwn(collection,function(value,key,collection){result[++index]=callback(value,key,collection)});return result}function max(collection,callback,thisArg){var computed=-1/0,result=computed;if("function"!=typeof callback&&thisArg&&thisArg[callback]===collection&&(callback=null),null==callback&&isArray(collection))for(var index=-1,length=collection.length;++index<length;){var value=collection[index];value>result&&(result=value)}else callback=null==callback&&isString(collection)?charAtCallback:lodash.createCallback(callback,thisArg,3),forEach(collection,function(value,index,collection){var current=callback(value,index,collection);current>computed&&(computed=current,result=value)});return result}function min(collection,callback,thisArg){var computed=1/0,result=computed;if("function"!=typeof callback&&thisArg&&thisArg[callback]===collection&&(callback=null),null==callback&&isArray(collection))for(var index=-1,length=collection.length;++index<length;){var value=collection[index];result>value&&(result=value)}else callback=null==callback&&isString(collection)?charAtCallback:lodash.createCallback(callback,thisArg,3),forEach(collection,function(value,index,collection){var current=callback(value,index,collection);computed>current&&(computed=current,result=value)});return result}function reduce(collection,callback,accumulator,thisArg){if(!collection)return accumulator;var noaccum=arguments.length<3;callback=lodash.createCallback(callback,thisArg,4);var index=-1,length=collection.length;if("number"==typeof length)for(noaccum&&(accumulator=collection[++index]);++index<length;)accumulator=callback(accumulator,collection[index],index,collection);else forOwn(collection,function(value,index,collection){accumulator=noaccum?(noaccum=!1,value):callback(accumulator,value,index,collection)});return accumulator}function reduceRight(collection,callback,accumulator,thisArg){var noaccum=arguments.length<3;return callback=lodash.createCallback(callback,thisArg,4),forEachRight(collection,function(value,index,collection){accumulator=noaccum?(noaccum=!1,value):callback(accumulator,value,index,collection)}),accumulator}function reject(collection,callback,thisArg){return callback=lodash.createCallback(callback,thisArg,3),filter(collection,function(value,index,collection){return!callback(value,index,collection)})}function sample(collection,n,guard){if(collection&&"number"!=typeof collection.length&&(collection=values(collection)),null==n||guard)return collection?collection[baseRandom(0,collection.length-1)]:undefined;var result=shuffle(collection);return result.length=nativeMin(nativeMax(0,n),result.length),result}function shuffle(collection){var index=-1,length=collection?collection.length:0,result=Array("number"==typeof length?length:0);return forEach(collection,function(value){var rand=baseRandom(0,++index);result[index]=result[rand],result[rand]=value}),result}function size(collection){var length=collection?collection.length:0;return"number"==typeof length?length:keys(collection).length}function some(collection,callback,thisArg){var result;callback=lodash.createCallback(callback,thisArg,3);var index=-1,length=collection?collection.length:0;if("number"==typeof length)for(;++index<length&&!(result=callback(collection[index],index,collection)););else forOwn(collection,function(value,index,collection){return!(result=callback(value,index,collection))});return!!result}function sortBy(collection,callback,thisArg){var index=-1,isArr=isArray(callback),length=collection?collection.length:0,result=Array("number"==typeof length?length:0);for(isArr||(callback=lodash.createCallback(callback,thisArg,3)),forEach(collection,function(value,key,collection){var object=result[++index]=getObject();isArr?object.criteria=map(callback,function(key){return value[key]}):(object.criteria=getArray())[0]=callback(value,key,collection),object.index=index,object.value=value}),length=result.length,result.sort(compareAscending);length--;){var object=result[length];result[length]=object.value,isArr||releaseArray(object.criteria),releaseObject(object)}return result}function toArray(collection){return collection&&"number"==typeof collection.length?slice(collection):values(collection)}function compact(array){for(var index=-1,length=array?array.length:0,result=[];++index<length;){var value=array[index];value&&result.push(value)}return result}function difference(array){return baseDifference(array,baseFlatten(arguments,!0,!0,1))}function findIndex(array,callback,thisArg){var index=-1,length=array?array.length:0;for(callback=lodash.createCallback(callback,thisArg,3);++index<length;)if(callback(array[index],index,array))return index;return-1}function findLastIndex(array,callback,thisArg){var length=array?array.length:0;for(callback=lodash.createCallback(callback,thisArg,3);length--;)if(callback(array[length],length,array))return length;return-1}function first(array,callback,thisArg){var n=0,length=array?array.length:0;if("number"!=typeof callback&&null!=callback){var index=-1;for(callback=lodash.createCallback(callback,thisArg,3);++index<length&&callback(array[index],index,array);)n++}else if(n=callback,null==n||thisArg)return array?array[0]:undefined;return slice(array,0,nativeMin(nativeMax(0,n),length))}function flatten(array,isShallow,callback,thisArg){return"boolean"!=typeof isShallow&&null!=isShallow&&(thisArg=callback,callback="function"!=typeof isShallow&&thisArg&&thisArg[isShallow]===array?null:isShallow,isShallow=!1),null!=callback&&(array=map(array,callback,thisArg)),baseFlatten(array,isShallow)}function indexOf(array,value,fromIndex){if("number"==typeof fromIndex){var length=array?array.length:0;fromIndex=0>fromIndex?nativeMax(0,length+fromIndex):fromIndex||0}else if(fromIndex){var index=sortedIndex(array,value);return array[index]===value?index:-1}return baseIndexOf(array,value,fromIndex)}function initial(array,callback,thisArg){var n=0,length=array?array.length:0;if("number"!=typeof callback&&null!=callback){var index=length;for(callback=lodash.createCallback(callback,thisArg,3);index--&&callback(array[index],index,array);)n++}else n=null==callback||thisArg?1:callback||n;return slice(array,0,nativeMin(nativeMax(0,length-n),length))}function intersection(){for(var args=[],argsIndex=-1,argsLength=arguments.length,caches=getArray(),indexOf=getIndexOf(),trustIndexOf=indexOf===baseIndexOf,seen=getArray();++argsIndex<argsLength;){var value=arguments[argsIndex];(isArray(value)||isArguments(value))&&(args.push(value),caches.push(trustIndexOf&&value.length>=largeArraySize&&createCache(argsIndex?args[argsIndex]:seen)))}var array=args[0],index=-1,length=array?array.length:0,result=[];outer:for(;++index<length;){var cache=caches[0];if(value=array[index],(cache?cacheIndexOf(cache,value):indexOf(seen,value))<0){for(argsIndex=argsLength,(cache||seen).push(value);--argsIndex;)if(cache=caches[argsIndex],(cache?cacheIndexOf(cache,value):indexOf(args[argsIndex],value))<0)continue outer;result.push(value)}}for(;argsLength--;)cache=caches[argsLength],cache&&releaseObject(cache);return releaseArray(caches),releaseArray(seen),result}function last(array,callback,thisArg){var n=0,length=array?array.length:0;if("number"!=typeof callback&&null!=callback){var index=length;for(callback=lodash.createCallback(callback,thisArg,3);index--&&callback(array[index],index,array);)n++}else if(n=callback,null==n||thisArg)return array?array[length-1]:undefined;return slice(array,nativeMax(0,length-n))}function lastIndexOf(array,value,fromIndex){var index=array?array.length:0;for("number"==typeof fromIndex&&(index=(0>fromIndex?nativeMax(0,index+fromIndex):nativeMin(fromIndex,index-1))+1);index--;)if(array[index]===value)return index;return-1}function pull(array){for(var args=arguments,argsIndex=0,argsLength=args.length,length=array?array.length:0;++argsIndex<argsLength;)for(var index=-1,value=args[argsIndex];++index<length;)array[index]===value&&(splice.call(array,index--,1),length--);return array}function range(start,end,step){start=+start||0,step="number"==typeof step?step:+step||1,null==end&&(end=start,start=0);for(var index=-1,length=nativeMax(0,ceil((end-start)/(step||1))),result=Array(length);++index<length;)result[index]=start,start+=step;return result}function remove(array,callback,thisArg){var index=-1,length=array?array.length:0,result=[];for(callback=lodash.createCallback(callback,thisArg,3);++index<length;){var value=array[index];callback(value,index,array)&&(result.push(value),splice.call(array,index--,1),length--)}return result}function rest(array,callback,thisArg){if("number"!=typeof callback&&null!=callback){var n=0,index=-1,length=array?array.length:0;for(callback=lodash.createCallback(callback,thisArg,3);++index<length&&callback(array[index],index,array);)n++}else n=null==callback||thisArg?1:nativeMax(0,callback);return slice(array,n)}function sortedIndex(array,value,callback,thisArg){var low=0,high=array?array.length:low;for(callback=callback?lodash.createCallback(callback,thisArg,1):identity,value=callback(value);high>low;){var mid=low+high>>>1;callback(array[mid])<value?low=mid+1:high=mid}return low}function union(){return baseUniq(baseFlatten(arguments,!0,!0))}function uniq(array,isSorted,callback,thisArg){return"boolean"!=typeof isSorted&&null!=isSorted&&(thisArg=callback,callback="function"!=typeof isSorted&&thisArg&&thisArg[isSorted]===array?null:isSorted,isSorted=!1),null!=callback&&(callback=lodash.createCallback(callback,thisArg,3)),baseUniq(array,isSorted,callback)}function without(array){return baseDifference(array,slice(arguments,1))}function xor(){for(var index=-1,length=arguments.length;++index<length;){var array=arguments[index];if(isArray(array)||isArguments(array))var result=result?baseUniq(baseDifference(result,array).concat(baseDifference(array,result))):array}return result||[]}function zip(){for(var array=arguments.length>1?arguments:arguments[0],index=-1,length=array?max(pluck(array,"length")):0,result=Array(0>length?0:length);++index<length;)result[index]=pluck(array,index);return result}function zipObject(keys,values){var index=-1,length=keys?keys.length:0,result={};for(values||!length||isArray(keys[0])||(values=[]);++index<length;){var key=keys[index];values?result[key]=values[index]:key&&(result[key[0]]=key[1])}return result}function after(n,func){if(!isFunction(func))throw new TypeError;return function(){return--n<1?func.apply(this,arguments):void 0}}function bind(func,thisArg){return arguments.length>2?createWrapper(func,17,slice(arguments,2),null,thisArg):createWrapper(func,1,null,null,thisArg)
}function bindAll(object){for(var funcs=arguments.length>1?baseFlatten(arguments,!0,!1,1):functions(object),index=-1,length=funcs.length;++index<length;){var key=funcs[index];object[key]=createWrapper(object[key],1,null,null,object)}return object}function bindKey(object,key){return arguments.length>2?createWrapper(key,19,slice(arguments,2),null,object):createWrapper(key,3,null,null,object)}function compose(){for(var funcs=arguments,length=funcs.length;length--;)if(!isFunction(funcs[length]))throw new TypeError;return function(){for(var args=arguments,length=funcs.length;length--;)args=[funcs[length].apply(this,args)];return args[0]}}function curry(func,arity){return arity="number"==typeof arity?arity:+arity||func.length,createWrapper(func,4,null,null,null,arity)}function debounce(func,wait,options){var args,maxTimeoutId,result,stamp,thisArg,timeoutId,trailingCall,lastCalled=0,maxWait=!1,trailing=!0;if(!isFunction(func))throw new TypeError;if(wait=nativeMax(0,wait)||0,options===!0){var leading=!0;trailing=!1}else isObject(options)&&(leading=options.leading,maxWait="maxWait"in options&&(nativeMax(wait,options.maxWait)||0),trailing="trailing"in options?options.trailing:trailing);var delayed=function(){var remaining=wait-(now()-stamp);if(0>=remaining){maxTimeoutId&&clearTimeout(maxTimeoutId);var isCalled=trailingCall;maxTimeoutId=timeoutId=trailingCall=undefined,isCalled&&(lastCalled=now(),result=func.apply(thisArg,args),timeoutId||maxTimeoutId||(args=thisArg=null))}else timeoutId=setTimeout(delayed,remaining)},maxDelayed=function(){timeoutId&&clearTimeout(timeoutId),maxTimeoutId=timeoutId=trailingCall=undefined,(trailing||maxWait!==wait)&&(lastCalled=now(),result=func.apply(thisArg,args),timeoutId||maxTimeoutId||(args=thisArg=null))};return function(){if(args=arguments,stamp=now(),thisArg=this,trailingCall=trailing&&(timeoutId||!leading),maxWait===!1)var leadingCall=leading&&!timeoutId;else{maxTimeoutId||leading||(lastCalled=stamp);var remaining=maxWait-(stamp-lastCalled),isCalled=0>=remaining;isCalled?(maxTimeoutId&&(maxTimeoutId=clearTimeout(maxTimeoutId)),lastCalled=stamp,result=func.apply(thisArg,args)):maxTimeoutId||(maxTimeoutId=setTimeout(maxDelayed,remaining))}return isCalled&&timeoutId?timeoutId=clearTimeout(timeoutId):timeoutId||wait===maxWait||(timeoutId=setTimeout(delayed,wait)),leadingCall&&(isCalled=!0,result=func.apply(thisArg,args)),!isCalled||timeoutId||maxTimeoutId||(args=thisArg=null),result}}function defer(func){if(!isFunction(func))throw new TypeError;var args=slice(arguments,1);return setTimeout(function(){func.apply(undefined,args)},1)}function delay(func,wait){if(!isFunction(func))throw new TypeError;var args=slice(arguments,2);return setTimeout(function(){func.apply(undefined,args)},wait)}function memoize(func,resolver){if(!isFunction(func))throw new TypeError;var memoized=function(){var cache=memoized.cache,key=resolver?resolver.apply(this,arguments):keyPrefix+arguments[0];return hasOwnProperty.call(cache,key)?cache[key]:cache[key]=func.apply(this,arguments)};return memoized.cache={},memoized}function once(func){var ran,result;if(!isFunction(func))throw new TypeError;return function(){return ran?result:(ran=!0,result=func.apply(this,arguments),func=null,result)}}function partial(func){return createWrapper(func,16,slice(arguments,1))}function partialRight(func){return createWrapper(func,32,null,slice(arguments,1))}function throttle(func,wait,options){var leading=!0,trailing=!0;if(!isFunction(func))throw new TypeError;return options===!1?leading=!1:isObject(options)&&(leading="leading"in options?options.leading:leading,trailing="trailing"in options?options.trailing:trailing),debounceOptions.leading=leading,debounceOptions.maxWait=wait,debounceOptions.trailing=trailing,debounce(func,wait,debounceOptions)}function wrap(value,wrapper){return createWrapper(wrapper,16,[value])}function constant(value){return function(){return value}}function createCallback(func,thisArg,argCount){var type=typeof func;if(null==func||"function"==type)return baseCreateCallback(func,thisArg,argCount);if("object"!=type)return property(func);var props=keys(func),key=props[0],a=func[key];return 1!=props.length||a!==a||isObject(a)?function(object){for(var length=props.length,result=!1;length--&&(result=baseIsEqual(object[props[length]],func[props[length]],null,!0)););return result}:function(object){var b=object[key];return a===b&&(0!==a||1/a==1/b)}}function escape(string){return null==string?"":String(string).replace(reUnescapedHtml,escapeHtmlChar)}function identity(value){return value}function mixin(object,source,options){var chain=!0,methodNames=source&&functions(source);source&&(options||methodNames.length)||(null==options&&(options=source),ctor=lodashWrapper,source=object,object=lodash,methodNames=functions(source)),options===!1?chain=!1:isObject(options)&&"chain"in options&&(chain=options.chain);var ctor=object,isFunc=isFunction(ctor);forEach(methodNames,function(methodName){var func=object[methodName]=source[methodName];isFunc&&(ctor.prototype[methodName]=function(){var chainAll=this.__chain__,value=this.__wrapped__,args=[value];push.apply(args,arguments);var result=func.apply(object,args);if(chain||chainAll){if(value===result&&isObject(result))return this;result=new ctor(result),result.__chain__=chainAll}return result})})}function noConflict(){return context._=oldDash,this}function noop(){}function property(key){return function(object){return object[key]}}function random(min,max,floating){var noMin=null==min,noMax=null==max;if(null==floating&&("boolean"==typeof min&&noMax?(floating=min,min=1):noMax||"boolean"!=typeof max||(floating=max,noMax=!0)),noMin&&noMax&&(max=1),min=+min||0,noMax?(max=min,min=0):max=+max||0,floating||min%1||max%1){var rand=nativeRandom();return nativeMin(min+rand*(max-min+parseFloat("1e-"+((rand+"").length-1))),max)}return baseRandom(min,max)}function result(object,key){if(object){var value=object[key];return isFunction(value)?object[key]():value}}function template(text,data,options){var settings=lodash.templateSettings;text=String(text||""),options=defaults({},options,settings);var isEvaluating,imports=defaults({},options.imports,settings.imports),importsKeys=keys(imports),importsValues=values(imports),index=0,interpolate=options.interpolate||reNoMatch,source="__p += '",reDelimiters=RegExp((options.escape||reNoMatch).source+"|"+interpolate.source+"|"+(interpolate===reInterpolate?reEsTemplate:reNoMatch).source+"|"+(options.evaluate||reNoMatch).source+"|$","g");text.replace(reDelimiters,function(match,escapeValue,interpolateValue,esTemplateValue,evaluateValue,offset){return interpolateValue||(interpolateValue=esTemplateValue),source+=text.slice(index,offset).replace(reUnescapedString,escapeStringChar),escapeValue&&(source+="' +\n__e("+escapeValue+") +\n'"),evaluateValue&&(isEvaluating=!0,source+="';\n"+evaluateValue+";\n__p += '"),interpolateValue&&(source+="' +\n((__t = ("+interpolateValue+")) == null ? '' : __t) +\n'"),index=offset+match.length,match}),source+="';\n";var variable=options.variable,hasVariable=variable;hasVariable||(variable="obj",source="with ("+variable+") {\n"+source+"\n}\n"),source=(isEvaluating?source.replace(reEmptyStringLeading,""):source).replace(reEmptyStringMiddle,"$1").replace(reEmptyStringTrailing,"$1;"),source="function("+variable+") {\n"+(hasVariable?"":variable+" || ("+variable+" = {});\n")+"var __t, __p = '', __e = _.escape"+(isEvaluating?", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n":";\n")+source+"return __p\n}";var sourceURL="\n/*\n//# sourceURL="+(options.sourceURL||"/lodash/template/source["+templateCounter++ +"]")+"\n*/";try{var result=Function(importsKeys,"return "+source+sourceURL).apply(undefined,importsValues)}catch(e){throw e.source=source,e}return data?result(data):(result.source=source,result)}function times(n,callback,thisArg){n=(n=+n)>-1?n:0;var index=-1,result=Array(n);for(callback=baseCreateCallback(callback,thisArg,1);++index<n;)result[index]=callback(index);return result}function unescape(string){return null==string?"":String(string).replace(reEscapedHtml,unescapeHtmlChar)}function uniqueId(prefix){var id=++idCounter;return String(null==prefix?"":prefix)+id}function chain(value){return value=new lodashWrapper(value),value.__chain__=!0,value}function tap(value,interceptor){return interceptor(value),value}function wrapperChain(){return this.__chain__=!0,this}function wrapperToString(){return String(this.__wrapped__)}function wrapperValueOf(){return this.__wrapped__}context=context?_.defaults(root.Object(),context,_.pick(root,contextProps)):root;var Array=context.Array,Boolean=context.Boolean,Date=context.Date,Function=context.Function,Math=context.Math,Number=context.Number,Object=context.Object,RegExp=context.RegExp,String=context.String,TypeError=context.TypeError,arrayRef=[],objectProto=Object.prototype,oldDash=context._,toString=objectProto.toString,reNative=RegExp("^"+String(toString).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),ceil=Math.ceil,clearTimeout=context.clearTimeout,floor=Math.floor,fnToString=Function.prototype.toString,getPrototypeOf=isNative(getPrototypeOf=Object.getPrototypeOf)&&getPrototypeOf,hasOwnProperty=objectProto.hasOwnProperty,push=arrayRef.push,setTimeout=context.setTimeout,splice=arrayRef.splice,unshift=arrayRef.unshift,defineProperty=function(){try{var o={},func=isNative(func=Object.defineProperty)&&func,result=func(o,o,o)&&func}catch(e){}return result}(),nativeCreate=isNative(nativeCreate=Object.create)&&nativeCreate,nativeIsArray=isNative(nativeIsArray=Array.isArray)&&nativeIsArray,nativeIsFinite=context.isFinite,nativeIsNaN=context.isNaN,nativeKeys=isNative(nativeKeys=Object.keys)&&nativeKeys,nativeMax=Math.max,nativeMin=Math.min,nativeParseInt=context.parseInt,nativeRandom=Math.random,ctorByClass={};ctorByClass[arrayClass]=Array,ctorByClass[boolClass]=Boolean,ctorByClass[dateClass]=Date,ctorByClass[funcClass]=Function,ctorByClass[objectClass]=Object,ctorByClass[numberClass]=Number,ctorByClass[regexpClass]=RegExp,ctorByClass[stringClass]=String,lodashWrapper.prototype=lodash.prototype;var support=lodash.support={};support.funcDecomp=!isNative(context.WinRTError)&&reThis.test(runInContext),support.funcNames="string"==typeof Function.name,lodash.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:reInterpolate,variable:"",imports:{_:lodash}},nativeCreate||(baseCreate=function(){function Object(){}return function(prototype){if(isObject(prototype)){Object.prototype=prototype;var result=new Object;Object.prototype=null}return result||context.Object()}}());var setBindData=defineProperty?function(func,value){descriptor.value=value,defineProperty(func,"__bindData__",descriptor)}:noop,isArray=nativeIsArray||function(value){return value&&"object"==typeof value&&"number"==typeof value.length&&toString.call(value)==arrayClass||!1},shimKeys=function(object){var index,iterable=object,result=[];if(!iterable)return result;if(!objectTypes[typeof object])return result;for(index in iterable)hasOwnProperty.call(iterable,index)&&result.push(index);return result},keys=nativeKeys?function(object){return isObject(object)?nativeKeys(object):[]}:shimKeys,htmlEscapes={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},htmlUnescapes=invert(htmlEscapes),reEscapedHtml=RegExp("("+keys(htmlUnescapes).join("|")+")","g"),reUnescapedHtml=RegExp("["+keys(htmlEscapes).join("")+"]","g"),assign=function(object,source,guard){var index,iterable=object,result=iterable;if(!iterable)return result;var args=arguments,argsIndex=0,argsLength="number"==typeof guard?2:args.length;if(argsLength>3&&"function"==typeof args[argsLength-2])var callback=baseCreateCallback(args[--argsLength-1],args[argsLength--],2);else argsLength>2&&"function"==typeof args[argsLength-1]&&(callback=args[--argsLength]);for(;++argsIndex<argsLength;)if(iterable=args[argsIndex],iterable&&objectTypes[typeof iterable])for(var ownIndex=-1,ownProps=objectTypes[typeof iterable]&&keys(iterable),length=ownProps?ownProps.length:0;++ownIndex<length;)index=ownProps[ownIndex],result[index]=callback?callback(result[index],iterable[index]):iterable[index];return result},defaults=function(object,source,guard){var index,iterable=object,result=iterable;if(!iterable)return result;for(var args=arguments,argsIndex=0,argsLength="number"==typeof guard?2:args.length;++argsIndex<argsLength;)if(iterable=args[argsIndex],iterable&&objectTypes[typeof iterable])for(var ownIndex=-1,ownProps=objectTypes[typeof iterable]&&keys(iterable),length=ownProps?ownProps.length:0;++ownIndex<length;)index=ownProps[ownIndex],"undefined"==typeof result[index]&&(result[index]=iterable[index]);return result},forIn=function(collection,callback,thisArg){var index,iterable=collection,result=iterable;if(!iterable)return result;if(!objectTypes[typeof iterable])return result;callback=callback&&"undefined"==typeof thisArg?callback:baseCreateCallback(callback,thisArg,3);for(index in iterable)if(callback(iterable[index],index,collection)===!1)return result;return result},forOwn=function(collection,callback,thisArg){var index,iterable=collection,result=iterable;if(!iterable)return result;if(!objectTypes[typeof iterable])return result;callback=callback&&"undefined"==typeof thisArg?callback:baseCreateCallback(callback,thisArg,3);for(var ownIndex=-1,ownProps=objectTypes[typeof iterable]&&keys(iterable),length=ownProps?ownProps.length:0;++ownIndex<length;)if(index=ownProps[ownIndex],callback(iterable[index],index,collection)===!1)return result;return result},isPlainObject=getPrototypeOf?function(value){if(!value||toString.call(value)!=objectClass)return!1;var valueOf=value.valueOf,objProto=isNative(valueOf)&&(objProto=getPrototypeOf(valueOf))&&getPrototypeOf(objProto);return objProto?value==objProto||getPrototypeOf(value)==objProto:shimIsPlainObject(value)}:shimIsPlainObject,countBy=createAggregator(function(result,value,key){hasOwnProperty.call(result,key)?result[key]++:result[key]=1}),groupBy=createAggregator(function(result,value,key){(hasOwnProperty.call(result,key)?result[key]:result[key]=[]).push(value)}),indexBy=createAggregator(function(result,value,key){result[key]=value}),pluck=map,where=filter,now=isNative(now=Date.now)&&now||function(){return(new Date).getTime()},parseInt=8==nativeParseInt(whitespace+"08")?nativeParseInt:function(value,radix){return nativeParseInt(isString(value)?value.replace(reLeadingSpacesAndZeros,""):value,radix||0)};return lodash.after=after,lodash.assign=assign,lodash.at=at,lodash.bind=bind,lodash.bindAll=bindAll,lodash.bindKey=bindKey,lodash.chain=chain,lodash.compact=compact,lodash.compose=compose,lodash.constant=constant,lodash.countBy=countBy,lodash.create=create,lodash.createCallback=createCallback,lodash.curry=curry,lodash.debounce=debounce,lodash.defaults=defaults,lodash.defer=defer,lodash.delay=delay,lodash.difference=difference,lodash.filter=filter,lodash.flatten=flatten,lodash.forEach=forEach,lodash.forEachRight=forEachRight,lodash.forIn=forIn,lodash.forInRight=forInRight,lodash.forOwn=forOwn,lodash.forOwnRight=forOwnRight,lodash.functions=functions,lodash.groupBy=groupBy,lodash.indexBy=indexBy,lodash.initial=initial,lodash.intersection=intersection,lodash.invert=invert,lodash.invoke=invoke,lodash.keys=keys,lodash.map=map,lodash.mapValues=mapValues,lodash.max=max,lodash.memoize=memoize,lodash.merge=merge,lodash.min=min,lodash.omit=omit,lodash.once=once,lodash.pairs=pairs,lodash.partial=partial,lodash.partialRight=partialRight,lodash.pick=pick,lodash.pluck=pluck,lodash.property=property,lodash.pull=pull,lodash.range=range,lodash.reject=reject,lodash.remove=remove,lodash.rest=rest,lodash.shuffle=shuffle,lodash.sortBy=sortBy,lodash.tap=tap,lodash.throttle=throttle,lodash.times=times,lodash.toArray=toArray,lodash.transform=transform,lodash.union=union,lodash.uniq=uniq,lodash.values=values,lodash.where=where,lodash.without=without,lodash.wrap=wrap,lodash.xor=xor,lodash.zip=zip,lodash.zipObject=zipObject,lodash.collect=map,lodash.drop=rest,lodash.each=forEach,lodash.eachRight=forEachRight,lodash.extend=assign,lodash.methods=functions,lodash.object=zipObject,lodash.select=filter,lodash.tail=rest,lodash.unique=uniq,lodash.unzip=zip,mixin(lodash),lodash.clone=clone,lodash.cloneDeep=cloneDeep,lodash.contains=contains,lodash.escape=escape,lodash.every=every,lodash.find=find,lodash.findIndex=findIndex,lodash.findKey=findKey,lodash.findLast=findLast,lodash.findLastIndex=findLastIndex,lodash.findLastKey=findLastKey,lodash.has=has,lodash.identity=identity,lodash.indexOf=indexOf,lodash.isArguments=isArguments,lodash.isArray=isArray,lodash.isBoolean=isBoolean,lodash.isDate=isDate,lodash.isElement=isElement,lodash.isEmpty=isEmpty,lodash.isEqual=isEqual,lodash.isFinite=isFinite,lodash.isFunction=isFunction,lodash.isNaN=isNaN,lodash.isNull=isNull,lodash.isNumber=isNumber,lodash.isObject=isObject,lodash.isPlainObject=isPlainObject,lodash.isRegExp=isRegExp,lodash.isString=isString,lodash.isUndefined=isUndefined,lodash.lastIndexOf=lastIndexOf,lodash.mixin=mixin,lodash.noConflict=noConflict,lodash.noop=noop,lodash.now=now,lodash.parseInt=parseInt,lodash.random=random,lodash.reduce=reduce,lodash.reduceRight=reduceRight,lodash.result=result,lodash.runInContext=runInContext,lodash.size=size,lodash.some=some,lodash.sortedIndex=sortedIndex,lodash.template=template,lodash.unescape=unescape,lodash.uniqueId=uniqueId,lodash.all=every,lodash.any=some,lodash.detect=find,lodash.findWhere=find,lodash.foldl=reduce,lodash.foldr=reduceRight,lodash.include=contains,lodash.inject=reduce,mixin(function(){var source={};return forOwn(lodash,function(func,methodName){lodash.prototype[methodName]||(source[methodName]=func)}),source}(),!1),lodash.first=first,lodash.last=last,lodash.sample=sample,lodash.take=first,lodash.head=first,forOwn(lodash,function(func,methodName){var callbackable="sample"!==methodName;lodash.prototype[methodName]||(lodash.prototype[methodName]=function(n,guard){var chainAll=this.__chain__,result=func(this.__wrapped__,n,guard);return chainAll||null!=n&&(!guard||callbackable&&"function"==typeof n)?new lodashWrapper(result,chainAll):result})}),lodash.VERSION="2.4.1",lodash.prototype.chain=wrapperChain,lodash.prototype.toString=wrapperToString,lodash.prototype.value=wrapperValueOf,lodash.prototype.valueOf=wrapperValueOf,forEach(["join","pop","shift"],function(methodName){var func=arrayRef[methodName];lodash.prototype[methodName]=function(){var chainAll=this.__chain__,result=func.apply(this.__wrapped__,arguments);return chainAll?new lodashWrapper(result,chainAll):result}}),forEach(["push","reverse","sort","unshift"],function(methodName){var func=arrayRef[methodName];lodash.prototype[methodName]=function(){return func.apply(this.__wrapped__,arguments),this}}),forEach(["concat","slice","splice"],function(methodName){var func=arrayRef[methodName];lodash.prototype[methodName]=function(){return new lodashWrapper(func.apply(this.__wrapped__,arguments),this.__chain__)}}),lodash}var undefined,arrayPool=[],objectPool=[],idCounter=0,keyPrefix=+new Date+"",largeArraySize=75,maxPoolSize=40,whitespace=" 	\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000",reEmptyStringLeading=/\b__p \+= '';/g,reEmptyStringMiddle=/\b(__p \+=) '' \+/g,reEmptyStringTrailing=/(__e\(.*?\)|\b__t\)) \+\n'';/g,reEsTemplate=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,reFlags=/\w*$/,reFuncName=/^\s*function[ \n\r\t]+\w/,reInterpolate=/<%=([\s\S]+?)%>/g,reLeadingSpacesAndZeros=RegExp("^["+whitespace+"]*0+(?=.$)"),reNoMatch=/($^)/,reThis=/\bthis\b/,reUnescapedString=/['\n\r\t\u2028\u2029\\]/g,contextProps=["Array","Boolean","Date","Function","Math","Number","Object","RegExp","String","_","attachEvent","clearTimeout","isFinite","isNaN","parseInt","setTimeout"],templateCounter=0,argsClass="[object Arguments]",arrayClass="[object Array]",boolClass="[object Boolean]",dateClass="[object Date]",funcClass="[object Function]",numberClass="[object Number]",objectClass="[object Object]",regexpClass="[object RegExp]",stringClass="[object String]",cloneableClasses={};cloneableClasses[funcClass]=!1,cloneableClasses[argsClass]=cloneableClasses[arrayClass]=cloneableClasses[boolClass]=cloneableClasses[dateClass]=cloneableClasses[numberClass]=cloneableClasses[objectClass]=cloneableClasses[regexpClass]=cloneableClasses[stringClass]=!0;var debounceOptions={leading:!1,maxWait:0,trailing:!1},descriptor={configurable:!1,enumerable:!1,value:null,writable:!1},objectTypes={"boolean":!1,"function":!0,object:!0,number:!1,string:!1,undefined:!1},stringEscapes={"\\":"\\","'":"'","\n":"n","\r":"r","	":"t","\u2028":"u2028","\u2029":"u2029"},root=objectTypes[typeof window]&&window||this,freeExports=objectTypes[typeof exports]&&exports&&!exports.nodeType&&exports,freeModule=objectTypes[typeof module]&&module&&!module.nodeType&&module,moduleExports=freeModule&&freeModule.exports===freeExports&&freeExports,freeGlobal=objectTypes[typeof global]&&global;!freeGlobal||freeGlobal.global!==freeGlobal&&freeGlobal.window!==freeGlobal||(root=freeGlobal);var _=runInContext();"function"==typeof define&&"object"==typeof define.amd&&define.amd?(root._=_,define(function(){return _})):freeExports&&freeModule?moduleExports?(freeModule.exports=_)._=_:freeExports._=_:root._=_}).call(this),function($,window,document,undefined){function Plugin(element,options){this.element=element,this.options=$.extend({},defaults,options),this._defaults=defaults,this._name=pluginName,this.instance,this.callbackManager=new Array,this.elem_isVisible="",this.init()}var pluginName="heapbox",defaults={effect:{type:"slide",speed:"slow"},insert:"before",heapsize:undefined,emptyMessage:"Empty",tabindex:"undefined",title:undefined,showFirst:!0,inheritVisibility:!0,openStart:function(){},openComplete:function(){},closeStart:function(){},closeComplete:function(){},onChange:function(){}};Plugin.prototype={init:function(){this._hideSourceElement(),this._isSourceSelectbox(),this.instance=this.createInstance(),this._createElements(),this._setDefaultValues()},createInstance:function(){return{heapId:$(this.element).attr("id")||Math.round(99999999*Math.random()),state:!1}},_setEvents:function(){var self=this;this._setControlsEvents(),$(document).on("click","html",function(e){e.stopPropagation(),self._closeheap(!0,function(){},function(){})})},_setSliderEvents:function(){var self=this;this.scrollingStatus=!1,heap=$("#heapbox_"+this.instance.heapId+" .heap"),heap.find(".sliderDown").click(function(e){e.preventDefault(),e.stopPropagation(),self._setHeapboxFocus()}),heap.find(".sliderDown").mousedown(function(){self.scrollingStatus=!0,self._keyArrowHandler($("#heapbox_"+self.instance.heapId),"down"),self.interval=setInterval(function(){self._keyArrowHandler($("#heapbox_"+self.instance.heapId),"down")},300)}).mouseup(function(){clearInterval(self.interval),self.scrollingStatus=!1}).mouseout(function(){clearInterval(self.interval),self.scrollingStatus=!1}),heap.find(".sliderUp").click(function(e){e.preventDefault(),e.stopPropagation(),self._setHeapboxFocus()}),heap.find(".sliderUp").mousedown(function(){self.scrollingStatus=!0,self._keyArrowHandler($("#heapbox_"+self.instance.heapId),"up"),self.interval=setInterval(function(){self._keyArrowHandler($("#heapbox_"+self.instance.heapId),"up")},300)}).mouseup(function(){clearInterval(self.interval),self.scrollingStatus=!1}).mouseout(function(){clearInterval(self.interval),self.scrollingStatus=!1})},_setViewPosition:function(heapbox){heap=$("div#heapbox_"+this.instance.heapId+" .heap"),heap.show();selected=heapbox.find(".heapOptions li a.selected"),firstTop=heapbox.find(".heapOptions li a").first().offset().top,actTop=$(selected).offset().top,newTop=firstTop-actTop+this.sliderUpHeight,heapHeight=$("div#heapbox_"+this.instance.heapId+" .heapOptions").height(),maxPosition=heapHeight-parseInt(this.options.heapsize,10)+this.sliderDownHeight,minPosition=0+this.sliderUpHeight,-1*newTop>maxPosition&&(newTop=-1*maxPosition),heapbox.find(".heapOptions").css("top",newTop),this.instance.state||heap.hide()},_setKeyboardEvents:function(){var self=this;heapbox=$("#heapbox_"+this.instance.heapId),heapbox.keydown(function(e){switch(e.which){case 13:return self._handlerClicked(),!1;case 27:self._closeheap();break;case 37:self._keyArrowHandler($("#heapbox_"+self.instance.heapId),"up"),e.preventDefault();break;case 39:self._keyArrowHandler($("#heapbox_"+self.instance.heapId),"down"),e.preventDefault();break;case 38:self._keyArrowHandler($("#heapbox_"+self.instance.heapId),"up"),e.preventDefault();break;case 40:self._keyArrowHandler($("#heapbox_"+self.instance.heapId),"down"),e.preventDefault()}})},_setMouseWheelEvents:function(){var heapBoxEl=$("div#heapbox_"+this.instance.heapId+" .handler"),heap=heapBoxEl.find("div.heap");heapBoxEl.on("mousewheel",function(event,delta){event.preventDefault(),-1==delta?heap.find(".sliderDown").mousedown().mouseup():heap.find(".sliderUp").mousedown().mouseup()})},_keyArrowHandler:function(heapboxEl,direction){var self=this,selected=!1;heapboxEl.find("div.heap ul li").each(function(){return $(this).find("a").hasClass("selected")&&(selected=!0,selectItem="down"==direction?self._findNext($(this)):self._findPrev($(this)))?(self._heapChanged(self,selectItem,!0),!1):void 0}),0==selected&&(selectItem=$("div#heapbox_"+self.instance.heapId+" .heapOptions .heapOption").first().find("a").addClass("selected"),self._heapChanged(self,selectItem,!0)),self._setViewPosition($("#heapbox_"+self.instance.heapId))},_setMouseWheelEvents:function(){var heapBoxEl=$("div#heapbox_"+this.instance.heapId),heap=heapBoxEl.find("div.heap");heapBoxEl.on("mousewheel",function(event,delta){event.preventDefault(),-1==delta?heap.find(".sliderDown").mousedown().mouseup():heap.find(".sliderUp").mousedown().mouseup()})},_findPrev:function(startItem){return startItem.prev().length>0?startItem.prev().find("a").hasClass("disabled")?this._findPrev(startItem.prev()):startItem.prev().find("a"):void 0},_findNext:function(startItem){return startItem.next().length>0?startItem.next().find("a").hasClass("disabled")?this._findNext(startItem.next()):startItem.next().find("a"):void 0},_createElements:function(){var self=this;heapBoxEl=$("<div/>",{id:"heapbox_"+this.instance.heapId,"class":"heapBox",data:{sourceElement:this.element}}),1==self.options.inheritVisibility&&0==self.elem_isVisible&&heapBoxEl.css("display","none"),heapBoxHolderEl=$("<a/>",{href:"","class":"holder"}),heapBoxHandlerEl=$("<a/>",{href:"","class":"handler"}),heapBoxheapEl=$("<div/>",{"class":"heap"}),heapBoxEl.append(heapBoxHolderEl),heapBoxEl.append(heapBoxHandlerEl),heapBoxEl.append(heapBoxheapEl),this.heapBoxEl=heapBoxEl,this._insertHeapbox(this.heapBoxEl)},_insertHeapbox:function(heapbox){switch(this.isSourceElementSelect&&"inside"==this.options.insert&&(this.options.insert="before"),this.options.insert){case"before":$(this.element).before(heapbox);break;case"after":$(this.element).after(heapbox);break;case"inside":$(this.element).html(heapbox),this._showSourceElement();break;default:$(this.element).before(heapbox)}},_setDefaultValues:function(){this._initHeap(),this._initView(heapBoxEl),this._setHolderTitle(),this._setTabindex(),this._setEvents(),this._handleFirst()},_setHeapboxFocus:function(){heapbox=$("div#heapbox_"+this.instance.heapId+" .handler"),heapbox.focus()},_setHeapSize:function(){if(this.options.heapsize){if(heapBoxheapEl.height()<parseInt(this.options.heapsize,10))return void delete this.options.heapsize;heapBoxheapEl.css("height",this.options.heapsize)}},_initHeap:function(){var initData;this.isSourceElementSelect&&(initData=this._optionsToJson(),this._setData(initData))},_initView:function(heapbox){this._isHeapEmpty()||this._setViewPosition(heapbox)},_handleFirst:function(){this.options.showFirst||$("div#heapbox_"+this.instance.heapId+" .heapOptions .heapOption").first().remove()},_setHolderTitle:function(){holderEl=$("#heapbox_"+this.instance.heapId).find(".holder"),selectedEl=$("#heapbox_"+this.instance.heapId).find(".heap ul li a.selected").last(),0!=selectedEl.length?(holderEl.text(this.options.title?this.options.title:selectedEl.text()),holderEl.attr("rel",selectedEl.attr("rel")),selectedEl.attr("data-icon-src")&&(iconEl=this._createIconElement(selectedEl.attr("data-icon-src")),holderEl.append(iconEl))):(holderEl.text(this.options.emptyMessage),this._removeHeapboxHolderEvents(),this._removeHeapboxHandlerEvents())},_setTabindex:function(){var tabindex;tabindex="undefined"!=this.options.tabindex?this.options.tabindex:$(this.element).attr("tabindex"),"undefined"!=tabindex&&$("#heapbox_"+this.instance.heapId).attr("tabindex",tabindex)},_setData:function(data){var self=this,_data=jQuery.parseJSON(data),selected=!1;heapBoxheapOptionsEl=$("<ul/>",{"class":"heapOptions"}),$.each(_data,function(){this.selected&&(selected=!0),heapBoxOptionLiEl=$("<li/>",{"class":"heapOption"}),heapBoxheapOptionAEl=$("<a/>",{href:"",rel:this.value,title:this.text,text:this.text,"class":this.selected?"selected":"",click:function(e){e.preventDefault(),e.stopPropagation(),self._heapChanged(self,this)}}),this.disabled&&(heapBoxheapOptionAEl.unbind("click"),heapBoxheapOptionAEl.addClass("disabled"),heapBoxheapOptionAEl.click(function(e){e.preventDefault(),e.stopPropagation()})),this.icon&&(heapBoxheapOptionAEl.attr("data-icon-src",this.icon),heapBoxOptionIcon=self._createIconElement(this.icon),heapBoxheapOptionAEl.append(heapBoxOptionIcon)),heapBoxOptionLiEl.append(heapBoxheapOptionAEl),heapBoxheapOptionsEl.append(heapBoxOptionLiEl)}),$("div#heapbox_"+this.instance.heapId+" .heap ul").remove(),$("div#heapbox_"+this.instance.heapId+" .heap").append(heapBoxheapOptionsEl),this._setHeapSize(),this._isHeapsizeSet()&&(this._createSliderUpElement(),this._createSliderDownElement()),1!=selected&&$("div#heapbox_"+this.instance.heapId+" .heap ul li a").first().addClass("selected")},_createSliderUpElement:function(){slideUp=$("<a/>",{"class":"sliderUp",href:""}),$("div#heapbox_"+this.instance.heapId+" .heap .heapOptions").before(slideUp),sliderUp=$("#heapbox_"+this.instance.heapId+" .sliderUp"),this.sliderUpHeight=parseInt(sliderUp.css("height"),10)+parseInt(sliderUp.css("border-top-width"),10)+parseInt(sliderUp.css("border-bottom-width"),10),$("#heapbox_"+this.instance.heapId+" .heapOptions").css("top",this.sliderUpHeight)},_createSliderDownElement:function(){slideDown=$("<a/>",{"class":"sliderDown",href:""}),$("div#heapbox_"+this.instance.heapId+" .heap .heapOptions").after(slideDown),sliderDown=$("#heapbox_"+this.instance.heapId+" .sliderDown"),this.sliderDownHeight=parseInt(sliderDown.css("height"),10)+parseInt(sliderDown.css("border-top-width"))+parseInt(sliderDown.css("border-bottom-width"))},_createIconElement:function(iconSrc){return heapBoxOptionIcon=$("<img/>",{src:iconSrc,alt:iconSrc})},_optionsToJson:function(){var options=[];$(this.element).find("option").each(function(){options.push({value:$(this).attr("value"),text:$(this).text(),icon:$(this).attr("data-icon-src"),disabled:$(this).attr("disabled"),selected:$(this).is(":selected")?"selected":""})});var jsonText=JSON.stringify(options);return jsonText},_heapboxToJson:function(){var options=[];$("div#heapbox_"+this.instance.heapId+" .heap ul li a").each(function(){options.push({value:$(this).attr("rel"),text:$(this).text(),selected:$(this).is(":selected")?"selected":""})});var jsonText=JSON.stringify(options);return jsonText},_isHeapEmpty:function(){var length=$("div#heapbox_"+this.instance.heapId+" .heap ul li").length;return 0==length},_setControlsEvents:function(){this._isHeapEmpty()||(this._setHeapboxHolderEvents(),this._setHeapboxHandlerEvents(),this._setKeyboardEvents(),this._setSliderEvents(),"object"==typeof $.event.special.mousewheel&&this._setMouseWheelEvents())},_isSourceSelectbox:function(){this.isSourceElementSelect=$(this.element).is("select")},_isHeapsizeSet:function(){return this.options.heapsize?!0:!1},_refreshSourceSelectbox:function(data){var self=this,selected=!1;$(this.element).find("option").remove(),$.each(data,function(){option=$("<option/>",{value:this.value,text:this.text}),this.selected&&(option.attr("selected","selected"),selected=!0),$(self.element).append(option)}),1!=selected&&$(self.element).find("option").first().attr("selected","selected")},_setSelectedOption:function(value){this._deselectSelectedOptions(),$(this.element).val(value),$(this.element).find("option[value='"+value+"']").attr("selected","selected")},_deselectSelectedOptions:function(){select=$(this.element).find("option"),select.each(function(){$(this).removeAttr("selected")})},_setHeapboxHolderEvents:function(){var self=this;heapBoxEl=$("div#heapbox_"+this.instance.heapId),heapBoxEl.find(".holder").click(function(e){e.preventDefault(),e.stopPropagation(),self._setHeapboxFocus(),self._handlerClicked()
})},_setHeapboxHandlerEvents:function(){var self=this;heapBoxEl=$("div#heapbox_"+this.instance.heapId),heapBoxEl.find(".handler").click(function(e){e.preventDefault(),e.stopPropagation(),self._setHeapboxFocus(),self._handlerClicked()})},_removeHeapboxHolderEvents:function(){heapBoxEl=$("div#heapbox_"+this.instance.heapId),heapBoxEl.find(".holder").unbind("click"),heapBoxEl.find(".holder").click(function(e){e.preventDefault()}),heapBoxEl.unbind("keydown")},_removeHeapboxHandlerEvents:function(){heapBoxEl=$("div#heapbox_"+this.instance.heapId),heapBoxEl.find(".handler").unbind("click"),heapBoxEl.find(".handler").click(function(e){e.preventDefault()})},_handlerClicked:function(stageReady){this.instance.state?this._closeheap():stageReady?this._openheap():this._closeOthers()},_heapChanged:function(self,clickedEl,keepOpened){keepOpened||this._closeheap(!0,function(){},function(){}),this._setSelected($(clickedEl)),this._setHolderTitle(),this._setHeapboxFocus(),this._setSelectedOption($(clickedEl).attr("rel")),this.options.onChange($(clickedEl).attr("rel"),$(this.element))},_setSelected:function(selectedEl){this._deselectAll(),selectedEl.addClass("selected")},_deselectAll:function(){heapLinks=$("#heapbox_"+this.instance.heapId).find(".heap ul li a"),heapLinks.each(function(){$(this).removeClass("selected")})},_closeheap:function(internal,closeStartEvent,closeCompleteEvent){if(heapEl=$("#heapbox_"+this.instance.heapId).removeClass("open").find(".heap"),heapEl.is(":animated")&&!internal)return!1;switch(this.instance.state=!1,internal?(closeStartEvent=closeStartEvent,closeCompleteEvent=closeCompleteEvent):(closeStartEvent=this.options.closeStart,closeCompleteEvent=this.options.closeComplete),closeStartEvent.call(),this.options.effect.type){case"fade":heapEl.fadeOut(this.options.effect.speed,closeCompleteEvent);break;case"slide":heapEl.slideUp(this.options.effect.speed,closeCompleteEvent);break;case"standard":heapEl.css("display","none"),closeCompleteEvent.call();break;default:heapEl.slideUp(this.options.effect.speed,closeCompleteEvent)}},_openheap:function(){if(this._isHeapsizeSet()&&this._setViewPosition($("div#heapbox_"+this.instance.heapId)),heapEl=$("#heapbox_"+this.instance.heapId).addClass("open").find(".heap"),heapEl.is(":animated"))return!1;switch(this.instance.state=!0,this.options.openStart.call(),this.options.effect.type){case"fade":heapEl.fadeIn(this.options.effect.speed,this.options.openComplete);break;case"slide":heapEl.slideDown(this.options.effect.speed,this.options.openComplete);break;case"standard":heapEl.css("display","block"),this.options.openComplete.call();break;default:heapEl.slideDown(this.options.effect.speed,this.options.openComplete)}},_closeOthers:function(){var self=this;$("div[id^=heapbox_]").each(function(){el=$("div#"+$(this).attr("id")),el.data("sourceElement")&&(sourceEl=$.data(this,"sourceElement"),heapBoxInst=$.data(sourceEl,"plugin_"+pluginName),self.instance.heapId!=heapBoxInst.instance.heapId&&heapBoxInst.instance.state&&(self._callbackManager("change","_closeOthers",!0),heapBoxInst._closeheap(!0,function(){},function(){self._callbackManager("change","_closeOthers",!1)})))}),self._callbackManager("test","_closeOthers")},_callbackManager:function(type,identificator,state){this.callbackManager[identificator]||(this.callbackManager[identificator]=0),"change"==type?(state?this.callbackManager[identificator]++:this.callbackManager[identificator]--,this._callbackManager("test",identificator)):"test"==type&&0==this.callbackManager[identificator]&&this._handlerClicked(!0)},set:function(data){this._setData(data),this._setHolderTitle(),this._setEvents()},select:function(value){heapBoxEl=$("div#heapbox_"+this.instance.heapId),this._heapChanged(this,heapBoxEl.find('.heapOptions [rel="'+value+'"]'))},update:function(){this._setDefaultValues()},_hideSourceElement:function(){this.elem_isVisible=$(this.element).is(":visible"),$(this.element).css("display","none")},_showSourceElement:function(){$(this.element).css("display","block")},hide:function(){$("div#heapbox_"+this.instance.heapId).css("visibility","hidden")},show:function(){$("div#heapbox_"+this.instance.heapId).css("visibility","visible")},disable:function(){return heapBoxEl=$("div#heapbox_"+this.instance.heapId),heapBoxEl.addClass("disabled"),this._removeHeapboxHandlerEvents(),this._removeHeapboxHolderEvents(),this},enable:function(){return heapBoxEl=$("div#heapbox_"+this.instance.heapId),heapBoxEl.removeClass("disabled"),this._setEvents(),this},_remove:function(){heapBoxEl=$("div#heapbox_"+this.instance.heapId),heapBoxEl.remove(),this._showSourceElement()}},$.fn[pluginName]=function(options,optional){return this.each(function(){if($.data(this,"plugin_"+pluginName))switch(heapBoxInst=$.data(this,"plugin_"+pluginName),options){case"select":heapBoxInst.select(optional);break;case"update":heapBoxInst.update();break;case"set":heapBoxInst.set(optional);break;case"hide":heapBoxInst.hide();break;case"show":heapBoxInst.show();break;case"disable":heapBoxInst.disable();break;case"enable":heapBoxInst.enable();break;case"remove":heapBoxInst._remove()}else $.data(this,"plugin_"+pluginName,new Plugin(this,options))})}}(jQuery,window,document),/** * Copyright (c) 2008 Tom Deater (http://www.tomdeater.com)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * Updated by Dirk Ginader: 2013-03-31
 */
jQuery.onFontResize=function(e){return e(document).ready(function(){var t=e("<iframe />").attr("id","frame-onFontResize"+Date.parse(new Date)).css({width:"100em",height:"10px",position:"absolute",borderWidth:0,top:"-5000px",left:"-5000px"}).appendTo("body"),n=/(msie) ([\w.]+)/.exec(navigator.userAgent.toLowerCase())||[],i=n[1]||"";if("msie"===i)t.bind("resize",function(){e.onFontResize.trigger(t[0].offsetWidth/100)});else{var o=t[0].contentWindow||t[0].contentDocument||t[0].document;o=o.document||o,o.open(),o.write('<div id="em" style="width:100em;height:10px;"></div>'),o.write('<script>window.onload = function(){var em = document.getElementById("em");window.onresize = function(){if(parent.jQuery.onFontResize){parent.jQuery.onFontResize.trigger(em.offsetWidth / 100);}}};</script>'),o.close()}}),{trigger:function(t){e(document).trigger("fontresize",[t])}}}(jQuery),/**
 * Html5 Placeholder Polyfill - v2.0.9 - 2014-01-21
 * web: http://blog.ginader.de/dev/jquery/HTML5-placeholder-polyfill/
 * issues: https://github.com/ginader/HTML5-placeholder-polyfill/issues
 * Copyright (c) 2014 Dirk Ginader; Licensed MIT, GPL
 */
function(e){function o(e,o){""===e.val()?e.data("placeholder").removeClass(o.hideClass):e.data("placeholder").addClass(o.hideClass)}function t(e,o){e.data("placeholder").addClass(o.hideClass)}function i(e,o){var t=o.is("textarea"),i=parseFloat(o.css("padding-top")),a=parseFloat(o.css("padding-left")),n=o.offset();i&&(n.top+=i),a&&(n.left+=a),e.css({width:o.innerWidth()-(t?20:4),height:o.innerHeight()-6,lineHeight:o.css("line-height"),whiteSpace:t?"normal":"nowrap",overflow:"hidden"}).offset(n)}function a(e,o){var i=e.val();!function a(){r=requestAnimationFrame(a),e.val()!==i&&(t(e,o),s(),n(e,o))}()}function n(e,t){!function i(){r=requestAnimationFrame(i),o(e,t)}()}function s(){window.cancelAnimationFrame&&cancelAnimationFrame(r)}function l(e){d&&window.console&&window.console.log&&window.console.log(e)}var r,d=!1;e.fn.placeHolder=function(n){l("init placeHolder");var r=this,d=e(this).length;return this.options=e.extend({className:"placeholder",visibleToScreenreaders:!0,visibleToScreenreadersHideClass:"placeholder-hide-except-screenreader",visibleToNoneHideClass:"placeholder-hide",hideOnFocus:!1,removeLabelClass:"visuallyhidden",hiddenOverrideClass:"visuallyhidden-with-placeholder",forceHiddenOverride:!0,forceApply:!1,autoInit:!0},n),this.options.hideClass=this.options.visibleToScreenreaders?this.options.visibleToScreenreadersHideClass:this.options.visibleToNoneHideClass,e(this).each(function(n){function c(){!r.options.hideOnFocus&&window.requestAnimationFrame?a(v,r.options):t(v,r.options)}var h,p,u,f,v=e(this),m=v.attr("placeholder"),w=v.attr("id");return(""===m||void 0===m)&&(m=v[0].attributes.placeholder.value),h=v.closest("label"),v.removeAttr("placeholder"),h.length||w?(h=h.length?h:e('label[for="'+w+'"]').first(),h.length?(f=e(h).find(".placeholder"),f.length?(i(f,v),f.text(m),v):(h.hasClass(r.options.removeLabelClass)&&h.removeClass(r.options.removeLabelClass).addClass(r.options.hiddenOverrideClass),p=e("<span>").addClass(r.options.className).text(m).appendTo(h),u=p.width()>v.width(),u&&p.attr("title",m),i(p,v),v.data("placeholder",p),p.data("input",v),p.click(function(){e(this).data("input").focus()}),v.focusin(c),v.focusout(function(){o(e(this),r.options),r.options.hideOnFocus||s()}),o(v,r.options),e(document).bind("fontresize resize",function(){i(p,v)}),e.event.special.resize?e("textarea").bind("resize",function(o){e(this).is(":visible")&&i(p,v),o.stopPropagation(),o.preventDefault()}):e("textarea").css("resize","none"),n>=d-1&&void 0!==e.attrHooks&&(e.attrHooks.placeholder={get:function(o){return"input"===o.nodeName.toLowerCase()||"textarea"===o.nodeName.toLowerCase()?e(o).data("placeholder")?e(e(o).data("placeholder")).text():e(o)[0].placeholder:void 0},set:function(o,t){return e(e(o).data("placeholder")).text(t)}}),void(v.is(":focus")&&c()))):void l("the input element with the placeholder needs a label!")):void l("the input element with the placeholder needs an id!")})},e(function(){var o=window.placeHolderConfig||{};return o.autoInit===!1?void l("placeholder:abort because autoInit is off"):("placeholder"in e("<input>")[0]||"placeHolder"in e("<input>")[0])&&!o.forceApply?void l("placeholder:abort because browser has native support"):void e("input[placeholder], textarea[placeholder]").placeHolder(o)})}(jQuery),function(){window.DirtyChecker=function(){function DirtyChecker(value){this.value=value}return DirtyChecker.prototype.apply=function(value,fn){return value!==this.value?(this.value=value,fn(value)):void 0},DirtyChecker}()}.call(this),function(){$.maps=function(){var load,promise;return promise=null,load=function(){var deferred,script;return deferred=$.Deferred(),window.onMapsLoad=function(){return deferred.resolve()},script=document.createElement("script"),script.type="text/javascript",script.src="https://maps.googleapis.com/maps/api/js?v=3.exp&callback=onMapsLoad",document.body.appendChild(script),deferred.promise()},function(){return promise||(promise=load())}}()}.call(this),function(){$(function(){return $('script[type="text/x-lazy-loaded-html"]').each(function(){var $parent,$this,handler,isVisible,threshold;return $this=$(this),$parent=$this.parent(),threshold=+$this.attr("data-threshold")||0,isVisible=function(){var rect;return rect=$parent[0].getBoundingClientRect(),rect.top-window.innerHeight<threshold&&rect.bottom>=0},handler=function(){return isVisible()?($parent.append($this[0].textContent),$(window).off("scroll",handler)):void 0},$(window).on("scroll",handler),handler()})})}.call(this),function(){$.fn.slideTo=function(element,options){return null==options&&(options={}),options.duration||(options.duration=500),options.offset||(options.offset=0),options.offset-=$(".navbar").height(),this.scrollTo(element,options)}}.call(this),function(){$(function(){return $(".js-sticky").each(function(){var $this,update;return $this=$(this),update=function(){return $this.toggleClass("is-sticky",$this[0].getBoundingClientRect().top<0)},$(window).on("scroll resize",update),update()})})}.call(this),function(){$(function(){return $("[data-subhover]").each(function(){var $this,selector;return $this=$(this),selector=$this.attr("data-subhover"),$this.on("mouseenter",selector,function(){return $this.addClass("is-subhover")}),$this.on("mouseleave",selector,function(){return $this.removeClass("is-subhover")})})})}.call(this),function(){$(function(){return $(".js-google-map").each(function(){var $this;return $this=$(this),$.maps().then(function(){var icon,map,marker,options,position;return position=new google.maps.LatLng(+$this.attr("data-lat"),+$this.attr("data-lng")),options={center:position,zoom:+$this.attr("data-zoom"),draggable:!0,scrollwheel:!1,disableDefaultUI:!0,mapTypeId:google.maps.MapTypeId.ROADMAP},map=new google.maps.Map($this[0],options),$(map.getDiv()).on("mouseenter",function(){return map.setOptions(_.assign({},options,{disableDefaultUI:!1}))}),$(map.getDiv()).on("mouseleave",function(){return map.setOptions(_.assign({},options,{disableDefaultUI:!0}))}),icon={url:"/images/common/map/place-3bc8a892.svg",size:new google.maps.Size(160,160),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(80,80)},marker=new google.maps.Marker({position:position,map:map,title:$this.attr("data-title"),icon:icon}),google.maps.event.addListener(marker,"click",function(){return window.open($this.attr("data-link"),"_blank")}),$(window).on("resize",function(){return map.setCenter(position)}),$this.on("mouseleave",function(){return map.setCenter(position)})})})})}.call(this),function(){Retina.configure({retinaImageSuffix:"_2x"})}.call(this);
(function() {


}).call(this);
(function(){window.UpUpDownDownLeftRightLeftRightBA=new(function(){function _Class(){this.actions=[function(){return $('<div class="flying-rocket flying-rocket-m-1"></div>').appendTo("body")},function(){return $('<div class="flying-rocket flying-rocket-m-2"></div>').appendTo("body")},function(){return $('<div class="flying-rocket flying-rocket-m-3"></div>').appendTo("body")}],this._watch()}return _Class.prototype.unleash=function(){var _base;return"function"==typeof(_base=this.actions.shift())?_base():void 0},_Class.prototype._watch=function(){var reference,s;return s=[],reference=[38,38,40,40,37,39,37,39,66,65],$(window).on("keydown",function(_this){return function(e){var expected,i,_i,_len;for(s.push(e.keyCode),s.length>10&&s.shift(),i=_i=0,_len=reference.length;_len>_i;i=++_i)if(expected=reference[i],s[i]!==expected)return;return _this.unleash()}}(this))},_Class}())}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//




;
