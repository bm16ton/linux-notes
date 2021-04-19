// @licstart  The following is the entire license notice for the
//  JavaScript code in this page.
//
// Copyright (C) 2010-2019 Jacob Barkdull
// This file is part of HashOver.
//
// HashOver is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// HashOver is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with HashOver.  If not, see <http://www.gnu.org/licenses/>.
//
// @licend  The above is the entire license notice for the
//  JavaScript code in this page.

"use strict";

// Initial constructor or use loader constructor (constructor.js)
var HashOver = HashOver || function HashOver (id, options, instance) {
	this.createThread.apply (this, arguments);
};

// Set frontend as ready (constructor.js)
HashOver.frontendReady = true;

// Indicator that backend information has been received (constructor.js)
HashOver.backendReady = false;

// Initial HashOver instance count (constructor.js)
HashOver.instanceCount = 1;

// Constructor to add shared methods to (constructor.js)
var HashOverConstructor = HashOver;

// Execute a callback when the page HTML is parsed and ready (onready.js)
HashOverConstructor.onReady = function (callback)
{
	// Ready state
	var state = document.readyState;

	// Check if document HTML has been parsed
	if (state === 'interactive' || state === 'complete') {
		// If so, execute callback immediately
		callback ();
	} else {
		// If not, execute callback after the DOM is parsed
		document.addEventListener ('DOMContentLoaded', function () {
			callback ();
		}, false);
	}
};

// Get the current HashOver script tag (script.js)
HashOverConstructor.script = (function () {
	// Get various scripts
	var loaderScript = document.getElementById ('hashover-loader');
	var scripts = document.getElementsByTagName ('script');

	// Use either the current script or an identified loader script
	var currentScript = document.currentScript || loaderScript;

	// Otherwise, fallback to the last script encountered
	return currentScript || scripts[scripts.length - 1];
}) ();

// Get URL from canonical link element (geturl.js)
HashOverConstructor.getCanonical = function ()
{
	// Check if we have query selector support
	if (typeof (document.querySelector) === 'function') {
		// If so, get the canonical link element
		var canonical = document.querySelector ('link[rel="canonical"]');

		// Return canonical link element URL is one was found
		if (canonical !== null && canonical.href) {
			return canonical.href;
		}
	}

	// Otherwise, get document head element
	var head = document.head || document.getElementsByTagName ('head')[0];

	// Get link elements in document head
	var links = head.getElementsByTagName ('link');

	// Run through link elements
	for (var i = 0, il = links.length; i < il; i++) {
		// Return canonical link element URL is one was found
		if (links[i].rel === 'canonical' && links[i].href) {
			return links[i].href;
		}
	}

	// Otherwise, return actual page URL
	return window.location.href.split ('#')[0];
};

// Get actual page URL or canonical URL (geturl.js)
HashOverConstructor.getURL = function (canonical)
{
	// Return actual page URL if told to
	if (canonical === false) {
		return window.location.href.split ('#')[0];
	}

	// Otherwise, return canonical URL
	return HashOverConstructor.getCanonical ();
};

// Get the page title (gettitle.js)
HashOverConstructor.getTitle = function ()
{
	return document.title;
};

// Converts an object in a series of URL queries (cfgqueries.js)
HashOverConstructor.cfgQueries = function (value, name, queries)
{
	// Current URL query matrix
	name = name || [];

	// All settings URL queries to return
	queries = queries || [];

	// Check if value is an object
	if (typeof (value) !== 'object') {
		// If so, get query matrix as string
		var matrix = '[' + name.join ('][') + ']';

		// Encode current URL query value
		var value = encodeURIComponent (value);

		// Add current URL query to return array
		queries.push ('cfg' + matrix + '=' + value);

		// And do nothing else
		return;
	}

	// Otherwise, descend in setting object
	for (var key in value) {
		HashOverConstructor.cfgQueries (value[key], name.concat (key), queries);
	}

	// And return settings URL queries
	return queries;
};

// Returns current client 24-hour time (getclienttime.js)
HashOverConstructor.getClientTime = function ()
{
	// Get current date and time
	var datetime = new Date ();

	// Get 24-hour current time
	var hours = datetime.getHours ();
	var minutes = datetime.getMinutes ();
	var time = hours + ':' + minutes;

	return time;
};

// Get supported HashOver backend queries from options (getbackendqueries.js)
HashOver.getBackendQueries = function (options, instance)
{
	// Ensure options is an object
	options = options || {};

	// URL query data object
	var data = {};

	// Options passed to loader constructor
	var loaderOptions = HashOver.loaderOptions;

	// URL queries array
	var queries = [];

	// Check for carryover options from loader constructor
	if (loaderOptions && loaderOptions.constructor === Object) {
		// If present, merge them into given options
		for (var key in loaderOptions) {
			if (options[key] === undefined) {
				options[key] = loaderOptions[key];
			}
		}
	}

	// Add instance number to data
	data.instance = instance;

	// Use URL and title options if available
	data.url = options.url || this.getURL (options.canonical);
	data.title = options.title || this.getTitle ();

	// Add website to request if told to
	if (typeof (options.website) === 'string') {
		data.website = options.website;
	}

	// Add thread to request if told to
	if (typeof (options.thread) === 'string') {
		data.thread = options.thread;
	}

	// Convert URL query data into query strings array
	for (var name in data) {
		if (data.hasOwnProperty (name) === true) {
			queries.push (name + '=' + encodeURIComponent (data[name]));
		}
	}

	// Add loader settings object to request if they exist
	if (options.settings && options.settings.constructor === Object) {
		// Get cfg URL queries array
		var cfgQueries = HashOver.cfgQueries (loaderOptions.settings);

		// And add cfg queries
		queries = queries.concat (cfgQueries);
	}

	// Set request backend information for the first instance
	if (HashOver.backendReady !== true) {
		queries.push ('prepare=true');
	}

	return queries;
};

// Array of JSONP callbacks, starting with default error handler (ajax.js)
HashOverConstructor.jsonp = [
	function (json) { alert (json.message); }
];

// Send HTTP requests using JSONP as a fallback (ajax.js)
HashOverConstructor.prototype.jsonp = function (method, path, data, callback, async)
{
	// Get constructor name
	var source = this.constructor.toString ();
	var constructor = source.match (/function (\w+)/)[1];

	// Push callback into JSONP array
	this.constructor.jsonp.push (callback);

	// Add JSONP callback index and constructor to request data
	data.push ('jsonp=' + (this.constructor.jsonp.length - 1));
	data.push ('jsonp_object=' + constructor || 'HashOver');

	// Create request script
	var script = document.createElement ('script');

	// Set request script path
	script.src = path + '?' + data.join ('&');

	// Set request script to load type
	script.async = async;

	// Append request script to page
	document.body.appendChild (script);
};

// Send HTTP requests using either XMLHttpRequest or JSONP (ajax.js)
HashOverConstructor.prototype.ajax = function (method, path, data, callback, async)
{
	// Reference to this object
	var hashover = this;

	// Arguments to this method
	var args = arguments;

	// Successful request handler
	var onSuccess = function ()
	{
		// Parse JSON response
		var json = JSON.parse (this.responseText);

		// And execute callback
		callback.apply (this, [ json ]);
	};

	// CORS error handler
	var onError = function ()
	{
		// Call JSONP fallback
		hashover.jsonp.apply (hashover, args);

		// And set AJAX to use JSONP
		hashover.ajax = hashover.jsonp;
	};

	// Check for XHR with credentials support
	if ('withCredentials' in new XMLHttpRequest ()) {
		// If supported, create XHR request
		var xhr = new XMLHttpRequest ();

		// Set ready state change handler
		xhr.onreadystatechange = function ()
		{
			// Do nothing if request isn't ready
			if (this.readyState !== 4) {
				return;
			}

			// Handle successful request response
			if (this.status === 200) {
				return onSuccess.apply (this);
			}

			// Handle failed request response, likely CORS error
			if (this.status === 0) {
				return onError ();
			}
		};

		// Open XHR request
		xhr.open (method, path, async);

		// Set request headers
		xhr.setRequestHeader ('Content-type', 'application/x-www-form-urlencoded');

		// Set request to include credentials, mostly cookies
		xhr.withCredentials = true;

		// Send XHR request
		xhr.send (data.join ('&'));

		// And do nothing else
		return;
	}

	// Try to fallback to XDomainRequest if supported
	if (typeof (XDomainRequest) !== 'undefined') {
		// If so, create XDR request
		var xdr = new XDomainRequest ();

		// Open request
		xdr.open (method, path);

		// Set successful request response handler
		xdr.onload = onSuccess;

		// Set failed request response handler
		xdr.onerror = onError;

		// Send XDR request
		setTimeout (xdr.send, 0);

		// And do nothing else
		return;
	}

	// If all else fails fallback to JSONP
	onError ();
};

// Root path (rootpath.js)
HashOverConstructor.rootPath = (function () {
	// Get the HashOver script source URL
	var scriptSrc = HashOverConstructor.script.getAttribute ('src');

	// Get HashOver root path
	var root = scriptSrc.replace (/\/[^\/]*\/?$/, '');

	// And return HashOver root path
	return root;
}) ();

// Backend path (backendpath.js)
HashOverConstructor.backendPath = (function () {
	return HashOverConstructor.rootPath + '/backend';
}) ();

// Real constructor (instantiator.js)
HashOver.instantiator = function (id, options, instance)
{
	// Reference to this object
	var hashover = this;

	// Check if we are instantiating a specific instance
	var specific = this.rx.integer.test (instance);

	// Use given instance or instance count
	var instance = specific ? instance : HashOver.instanceCount;

	// Backend request path
	var requestPath = HashOver.backendPath + '/comments-ajax.php';

	// Get backend queries
	var backendQueries = HashOver.getBackendQueries (options, instance);

	// Add current client time to queries
	var queries = backendQueries.concat ([
		'time=' + HashOver.getClientTime ()
	]);

	// Set instance number
	this.instanceNumber = instance;

	// Store options and backend queries
	this.options = options;
	this.queries = backendQueries;

	// Handle backend request
	this.ajax ('POST', requestPath, queries, function (json) {
		// Handle error messages
		if (json.message !== undefined) {
			hashover.displayError (json);
			return;
		}

		// Set the backend information
		if (HashOver.backendReady !== true) {
			// Locales from backend
			HashOver.prototype.locale = json.locale;

			// Setup information from backend
			HashOver.prototype.setup = json.setup;

			// Templatify UI HTML from backend
			HashOver.prototype.ui = hashover.strings.templatify (json.ui);

			// Mark backend as ready
			HashOver.backendReady = true;
		}

		// Thread information from backend
		hashover.instance = json.instance;

		// Initial number of collapsed comments
		hashover.instance.collapseLimit = 0;

		// Backend execution time and memory usage statistics
		hashover.statistics = json.statistics;

		// And log backend execution time and memory usage in console
		console.log (hashover.strings.sprintf (
			'HashOver: backend %d ms, %s', [
				json.statistics['execution-time'],
				json.statistics['script-memory']
			]
		));

		// Initiate HashOver
		hashover.init (id);
	}, true);

	// And increment instance count where appropriate
	if (specific === false) {
		HashOver.instanceCount++;
	}
};

// Create a new comment thread/section (createthread.js)
HashOver.prototype.createThread = function (id, options, instance)
{
	// Reference to this object
	var hashover = this;

	// Arguments to this method
	var args = arguments;

	// Check if we're on the first instance or if the backend is ready
	if (HashOver.backendReady === true || HashOver.instanceCount === 1) {
		// If so, create the thread when the page is ready
		HashOver.onReady (function () {
			HashOver.instantiator.apply (hashover, args);
		});
	} else {
		// If not, check again in 10 milliseconds
		setTimeout (function () {
			hashover.createThread.apply (hashover, args);
		}, 10);
	}
};

// Adds properties to an element (createelement.js)
HashOverConstructor.prototype.addProperties = function (element, properties)
{
	// Do nothing if no element or properties were given
	if (!element || !properties || properties.constructor !== Object) {
		return element;
	}

	// Add each property to element
	for (var property in properties) {
		// Do nothing if property was inherited
		if (properties.hasOwnProperty (property) === false) {
			continue;
		}

		// Property value
		var value = properties[property];

		// If the property is an object add each item to existing property
		if (!!value && value.constructor === Object) {
			this.addProperties (element[property], value);
			continue;
		}

		element[property] = value;
	}

	return element;
};

// Creates an element with attributes (createelement.js)
HashOverConstructor.prototype.createElement = function (name, attr)
{
	// Create element
	var element = document.createElement (name || 'span');

	// Add properties to element
	if (attr && attr.constructor === Object) {
		element = this.addProperties (element, attr);
	}

	return element;
};

// Collection of element class related functions (classes.js)
HashOverConstructor.prototype.classes = new (function () {
	// If browser supports classList define wrapper functions
	if (document.documentElement.classList) {
		// classList.contains method
		this.contains = function (element, name) {
			return element.classList.contains (name);
		};

		// classList.add method
		this.add = function (element, name) {
			element.classList.add (name);
		};

		// classList.remove method
		this.remove = function (element, name) {
			element.classList.remove (name);
		};

		// And do nothing else
		return;
	}

	// Otherwise, define reasonable classList.contains fallback
	this.contains = function (element, name)
	{
		// Check if element exists with classes
		if (element && element.className) {
			// If so, compile regular expression for class
			var rx = new RegExp ('(^|\\s)' + name + '(\\s|$)');

			// Test class attribute for class name
			return rx.test (element.className);
		}

		// Otherwise, return false
		return false;
	};

	// Define reasonable classList.add fallback
	this.add = function (element, name)
	{
		// Append class if element doesn't already contain the class
		if (element && !this.contains (element, name)) {
			element.className += (element.className ? ' ' : '') + name;
		}
	};

	// Define reasonable classList.remove fallback
	this.remove = function (element, name)
	{
		// Check if element exists with classes
		if (element && element.className) {
			// If so, compile regular expression for class
			var rx = new RegExp ('(^|\\s)' + name + '(\\s|$)', 'g');

			// Remove class from class attribute
			element.className = element.className.replace (rx, '$2');
		}
	};
}) ();

// Get main HashOver UI element (getmainelement.js)
HashOverConstructor.prototype.getMainElement = function (id)
{
	// Given element ID or default
	id = id || this.prefix ();

	// Attempt to get main HashOver element
	var element = document.getElementById (id);

	// Check if the HashOver element exists
	if (element === null) {
		// If not, get script tag
		var script = this.constructor.script;

		// Create div for comments to appear in
		element = this.createElement ('div', { id: id });

		// Check if script tag is in the body
		if (document.body.contains (script) === true) {
			// If so, place HashOver element before script tag
			script.parentNode.insertBefore (element, script);
		} else {
			// If not, place HashOver element in the body
			document.body.appendChild (element);
		}
	}

	// Add main HashOver class
	this.classes.add (element, 'hashover');

	// Check if backend is ready
	if (this.constructor.backendReady === true) {
		// If so, add class indictating desktop or mobile styling
		this.classes.add (element, 'hashover-' + this.setup['device-type']);

		// Add class for raster or vector images
		if (this.setup['image-format'] === 'svg') {
			this.classes.add (element, 'hashover-vector');
		} else {
			this.classes.add (element, 'hashover-raster');
		}

		// And add class to indicate user login status
		if (this.setup['user-is-logged-in'] === true) {
			this.classes.add (element, 'hashover-logged-in');
		} else {
			this.classes.add (element, 'hashover-logged-out');
		}
	}

	return element;
};

// Get main HashOver UI element (displayerror.js)
HashOverConstructor.prototype.displayError = function (json, id)
{
	// Get main HashOver element
	var mainElement = this.getMainElement (id);

	// Error message HTML code
	var messageHTML = '<b>HashOver</b>: ' + json.message;

	// Display error in main HashOver element
	mainElement.innerHTML = messageHTML;
};

// Returns instantiated pseudo-namespaced ID (prefix.js)
HashOverConstructor.prototype.prefix = function (id)
{
	// Initial prefix
	var prefix = 'hashover';

	// Append instance number to prefix
	if (this.instanceNumber > 1) {
		prefix += '-' + this.instanceNumber;
	}

	// Return prefixed ID if one is given
	if (id) {
		return prefix + '-' + id;
	}

	// Otherwise, return prefix by itself
	return prefix;
};

// Pre-compiled regular expressions (regex.js)
HashOverConstructor.prototype.rx = new (function () {
	this.urls		= '((http|https|ftp):\/\/[a-z0-9-@:;%_\+.~#?&\/=]+)',
	this.links		= new RegExp (this.urls + '( {0,1})', 'ig'),
	this.thread		= /^(c[0-9r]+)r[0-9\-pop]+$/,
	this.imageTags		= new RegExp ('\\[img\\](<a.*?>' + this.urls + '</a>)\\[/img\\]', 'ig'),
	this.EOLTrim		= /^[\r\n]+|[\r\n]+$/g,
	this.paragraphs		= /(?:\r\n|\r|\n){2}/g,
	this.email		= /\S+@\S+/,
	this.integer		= /^\d+$/
}) ();

// Trims leading and trailing newlines from a string (eoltrim.js)
HashOverConstructor.prototype.EOLTrim = function (string)
{
	return string.replace (this.rx.EOLTrim, '');
};

// Collection of convenient string related functions (strings.js)
HashOverConstructor.prototype.strings = {
	// sprintf specifiers regular expression
	specifiers: /%([cdfs])/g,

	// Curly-brace variable regular expression
	curlyBraces: /(\{.+?\})/g,

	// Curly-brace variable name regular expression
	curlyNames: /\{(.+?)\}/,

	// Simplistic JavaScript port of sprintf function in C
	sprintf: function (string, args)
	{
		var string = string || '';
		var args = args || [];
		var count = 0;

		// Replace specifiers with array items
		return string.replace (this.specifiers, function (match, type)
		{
			// Return original specifier if there isn't an item for it
			if (args[count] === undefined) {
				return match;
			}

			// Switch through each specific type
			switch (type) {
				// Single characters
				case 'c': {
					// Use only first character
					return args[count++][0];
				}

				// Integer numbers
				case 'd': {
					// Parse item as integer
					return parseInt (args[count++]);
				}

				// Floating point numbers
				case 'f': {
					// Parse item as float
					return parseFloat (args[count++]);
				}

				// Strings
				case 's': {
					// Use string as-is
					return args[count++];
				}
			}
		});
	},

	// Converts a string containing {curly} variables into an array
	templatifier: function (text)
	{
		// Split string by curly variables
		var template = text.split (this.curlyBraces);

		// Initial variable indexes
		var indexes = {};

		// Run through template
		for (var i = 0, il = template.length; i < il; i++) {
			// Get curly variable names
			var curly = template[i].match (this.curlyNames);

			// Check if any curly variables exist
			if (curly !== null && curly[1] !== undefined) {
				// If so, store the name
				var name = curly[1];

				// Check if variable was previously encountered
				if (indexes[name] !== undefined) {
					// If so, add index to existing indexes
					indexes[name].push (i);
				} else {
					// If not, create indexes
					indexes[name] = [ i ];
				}

				// And remove curly variable from template
				template[i] = '';
			}
		}

		// Return template and indexes
		return {
			template: template,
			indexes: indexes
		}
	},

	// Templatify UI HTML from backend
	templatify: function (ui)
	{
		// Initial template
		var template = {};

		// Templatify each UI HTML string
		for (var name in ui) {
			if (ui.hasOwnProperty (name) === true) {
				template[name] = this.templatifier (ui[name]);
			}
		}

		return template;
	},

	// Parses an HTML template
	parseTemplate: function (template, data)
	{
		// Clone template
		var textClone = template.template.slice ();

		// Run through template data
		for (var name in data) {
			// Store indexes
			var indexes = template.indexes[name];

			// Do nothing if no indexes exist for data
			if (indexes === undefined) {
				continue;
			}

			// Otherwise, add data at each index of template
			for (var i = 0, il = indexes.length; i < il; i++) {
				textClone[(indexes[i])] = data[name];
			}
		}

		// Merge template clone to string
		var text = textClone.join ('');

		return text;
	}
};

// Returns the permalink of a comment's parent (permalinks.js)
HashOverConstructor.prototype.permalinkParent = function (permalink)
{
	// Split permalink by reply 'r'
	var parent = permalink.split ('r');

	// Number of replies
	var length = parent.length - 1;

	// Limit depth if in stream mode
	if (this.setup['stream-mode'] === true) {
		length = Math.min (this.setup['stream-depth'], length);
	}

	// Check if there is a parent after flatten
	if (length > 0) {
		// If so, remove child from permalink
		parent = parent.slice (0, length);

		// Return parent permalink as string
		return parent.join ('r');
	}

	return null;
};

// Find a comment by its permalink (permalinks.js)
HashOverConstructor.prototype.permalinkComment = function (permalink, comments)
{
	// Run through all comments
	for (var i = 0, il = comments.length; i < il; i++) {
		// Current comment
		var comment = comments[i];

		// Return comment if its permalink matches
		if (comment.permalink === permalink) {
			return comment;
		}

		// Recursively check replies when present
		if (comment.replies !== undefined) {
			// Get attempt to get reply by permalink
			var reply = this.permalinkComment (permalink, comment.replies);

			// Return reply if its permalink matches
			if (reply !== null) {
				return reply;
			}
		}
	}

	// Otherwise return null
	return null;
};

// Add Like/Dislike link and count to template (addratings.js)
HashOver.prototype.addRatings = function (comment, template, action, commentKey)
{
	// The opposite action
	var opposite = (action === 'like') ? 'dislike' : 'like';

	// Get instantiated prefix
	var prefix = this.prefix ();

	// Check if the comment doesn't belong to the logged in user
	if (comment['user-owned'] === undefined) {
		// Check whether this comment was liked/disliked by the visitor
		if (comment[action + 'd'] !== undefined) {
			// If so, setup indicators that comment was liked/disliked
			var className = 'hashover-' + action + 'd';
			var title = this.locale[action + 'd-comment'];
			var text = this.locale[action + 'd'];
		} else {
			// If not, setup indicators that comment can be liked/disliked
			var className = 'hashover-' + action;
			var title = this.locale[action + '-comment'];
			var text = this.locale[action];
		}

		// Append class to indicate dislikes are enabled
		if (this.setup['allows-' + opposite + 's'] === true) {
			className += ' hashover-' + opposite + 's-enabled';
		}

		// Add like/dislike link to HTML template
		template[action + '-link'] = this.strings.parseTemplate (
			this.ui[action + '-link'], {
				hashover: prefix,
				permalink: commentKey,
				class: className,
				title: title,
				text: text
			}
		);
	}

	// Check if the comment has been likes/dislikes
	if (comment[action + 's'] !== undefined) {
		// Add likes/dislikes to HTML template
		template[action + 's'] = comment[action + 's'];

		// Check if there is more than one like/dislike
		if (comment[action + 's'] !== 1) {
			// If so, use "X Likes/Dislikes" locale
			var count = comment[action + 's'] + ' ' + this.locale[action + 's'];
		} else {
			// If not, use "X Like/Dislike" locale
			var count = comment[action + 's'] + ' ' + this.locale[action];
		}
	}

	// Add like count to HTML template
	template[action + '-count'] = this.strings.parseTemplate (
		this.ui[action + '-count'], {
			hashover: prefix,
			permalink: commentKey,
			text: count || ''
		}
	);
};

// Calls a method that may or may not exist (optionalmethod.js)
HashOverConstructor.prototype.optionalMethod = function (name, args, object)
{
	var method = object ? this[object][name] : this[name];
	var context = object ? this[object] : this;

	// Check if the method exists
	if (method && typeof (method) === 'function') {
		return method.apply (context, args);
	}
};

// Add markdown regular expressions (markdown.js)
HashOverConstructor.prototype.rx.md = {
	// Matches a markdown code block
	blockCode: /```([\s\S]+?)```/g,

	// Matches markdown inline code
	inlineCode: /(^|[^a-z0-9`])`((?!`)[\s\S]+?)`([^a-z0-9`]|$)/ig,

	// Matches temporary code block placeholder
	blockMarker: /CODE_BLOCK\[([0-9]+)\]/g,

	// Matches temporary inline code placeholder
	inlineMarker: /CODE_INLINE\[([0-9]+)\]/g,

	// Markdown patterns to search for
	search: [
		// Matches **bold** text
		/\*\*([^ *])([\s\S]+?)([^ *])\*\*/g,

		// Matches *italic* text
		/\*([^ *])([\s\S]+?)([^ *])\*/g,

		// Matches _underlined_ text
		/(^|\W)_((?!_)[\s\S]+?)_(\W|$)/g,

		// Matches forced __underlined__ text
		/__([^ _])([\s\S]+?)([^ _])__/g,

		// Matches ~~strikethrough~~ text
		/~~([^ ~])([\s\S]+?)([^ ~])~~/g
	],

	// HTML replacements for markdown patterns
	replace: [
		'<strong>$1$2$3</strong>',
		'<em>$1$2$3</em>',
		'$1<u>$2</u>$3',
		'<u>$1$2$3</u>',
		'<s>$1$2$3</s>'
	]
};

// Parses markdown code (markdown.js)
HashOverConstructor.prototype.parseMarkdown = function (string)
{
	// Reference to this object
	var hashover = this;

	// Initial marker arrays
	var block = { marks: [], count: 0 };
	var inline = { marks: [], count: 0 };

	// Replaces inline code with markers
	var inlineReplacer = function (m, first, code, third)
	{
		// Increase inline code count
		var markCount = inline.count++;

		// Inline code marker
		var marker = 'CODE_INLINE[' + markCount + ']';

		// Add inline code to marker array
		inline.marks[markCount] = hashover.EOLTrim (code);

		// And return first match, inline marker, and third match
		return first + marker + third;
	};

	// Replace code blocks with markers
	string = string.replace (this.rx.md.blockCode, function (m, code) {
		// Increase block code count
		var markCount = block.count++;

		// Add block code to marker array
		block.marks[markCount] = hashover.EOLTrim (code);

		// And return block marker
		return 'CODE_BLOCK[' + markCount + ']';
	});

	// Break string into paragraphs
	var ps = string.split (this.rx.paragraphs);

	// Run through each paragraph replacing markdown patterns
	for (var i = 0, il = ps.length; i < il; i++) {
		// Replace code tags with marker text
		ps[i] = ps[i].replace (this.rx.md.inlineCode, inlineReplacer);

		// Perform each markdown regular expression on the current paragraph
		for (var r = 0, rl = this.rx.md.search.length; r < rl; r++) {
			ps[i] = ps[i].replace (this.rx.md.search[r], this.rx.md.replace[r]);
		}

		// Return the original markdown code with HTML replacement
		ps[i] = ps[i].replace (this.rx.md.inlineMarker, function (marker, number) {
			return '<code class="hashover-inline">' + inline.marks[number] + '</code>';
		});
	}

	// Join paragraphs
	string = ps.join (this.setup['server-eol'] + this.setup['server-eol']);

	// Replace code block markers with original markdown code
	string = string.replace (this.rx.md.blockMarker, function (marker, number) {
		return '<code>' + block.marks[number] + '</code>';
	});

	return string;
};

// Callback to close the embedded image (openembeddedimage.js)
HashOverConstructor.prototype.closeEmbeddedImage = function (image)
{
	// Set image load event handler
	image.onload = function ()
	{
		// Reset title
		this.title = hashover.locale['external-image-tip'];

		// Remove loading class from wrapper
		hashover.classes.remove (this.parentNode, 'hashover-loading');

		// Remove open class from wrapper
		hashover.classes.remove (this.parentNode, 'hashover-embedded-image-open');

		// Remove load event handler
		this.onload = null;
	};

	// Reset source
	image.src = image.dataset.placeholder;
};

// Onclick callback function for embedded images (openembeddedimage.js)
HashOverConstructor.prototype.openEmbeddedImage = function (image)
{
	// Reference to this object
	var hashover = this;

	// Check if embedded image is open
	if (image.src === image.dataset.url) {
		// If so, close it
		this.closeEmbeddedImage (image);

		// And return void
		return;
	}

	// Set title
	image.title = this.locale['loading'];

	// Add loading class to wrapper
	this.classes.add (image.parentNode, 'hashover-loading');

	// Set image load event handler
	image.onload = function ()
	{
		// Set title to "Click to close" locale
		this.title = hashover.locale['click-to-close'];

		// Remove loading class from wrapper
		hashover.classes.remove (this.parentNode, 'hashover-loading');

		// Add open class to wrapper
		hashover.classes.add (this.parentNode, 'hashover-embedded-image-open');

		// Remove load event handler
		this.onload = null;
	};

	// Close embedded image if any error occurs
	image.onerror = function () {
		hashover.closeEmbeddedImage (this);
	};

	// Set placeholder image to embedded source
	image.src = image.dataset.url;
};

// Convert URL to embed image HTML (embedimage.js)
HashOverConstructor.prototype.embedImage = function (m, link, url)
{
	// Reference to this object
	var hashover = this;

	// Remove hash from image URL
	var urlExtension = url.split ('#')[0];

	// Remove queries from image URL
	urlExtension = urlExtension.split ('?')[0];

	// Get file extendion
	urlExtension = urlExtension.split ('.');
	urlExtension = urlExtension.pop ();

	// Check if the image extension is an allowed type
	if (this.setup['image-extensions'].indexOf (urlExtension) > -1) {
		// If so, create a wrapper element for the embedded image
		var embeddedImage = this.createElement ('span', {
			className: 'hashover-embedded-image-wrapper'
		});

		// Append an image tag to the embedded image wrapper
		embeddedImage.appendChild (this.createElement ('img', {
			className: 'hashover-embedded-image',
			src: this.setup['image-placeholder'],
			title: this.locale['external-image-tip'],
			alt: 'External Image',

			dataset: {
				placeholder: hashover.setup['image-placeholder'],
				url: url
			}
		}));

		// And return the embedded image HTML
		return embeddedImage.outerHTML;
	}

	// Otherwise, return original link
	return link;
};

// Add comment parsing regular expressions (parsecomment.js)
HashOverConstructor.prototype.rx.html = {
	// URL replacement for automatic hyperlinks
	linksReplace: '<a href="$1" rel="noopener noreferrer" target="_blank">$1</a>',

	// Matches various line ending styles
	lines: /(?:\r\n|\r|\n)/g,

	// For <code> tags
	code: {
		// Matches <code> opening
		open: /<code>/i,

		// Replacement for code tag processing
		replace: /(<code>)([\s\S]*?)(<\/code>)/ig,

		// Matches code tag markers
		marker: /CODE_TAG\[([0-9]+)\]/g
	},

	// For <pre> tags
	pre: {
		// Matches <pre> opening
		open: /<pre>/i,

		// Replacement for pre tag processing
		replace: /(<pre>)([\s\S]*?)(<\/pre>)/ig,

		// Matches pre tag markers
		marker: /PRE_TAG\[([0-9]+)\]/g
	},

	// Tags that will have their inner HTML trimmed
	trimTags: {
		// Matches blockquote/ul/ol tags openings
		open: /<(blockquote|ul|ol)>/,

		// Replacement for blockquote/ul/ol trimming
		replace: /(<(blockquote|ul|ol)>)([\s\S]*?)(<\/\2>)/ig
	}
};

// Add comment content to HTML template (parsecomment.js)
HashOverConstructor.prototype.parseComment = function (comment, parent, collapse, popular)
{
	// Parameter defaults
	parent = parent || null;

	// Reference to this object
	var hashover = this;

	var commentKey = comment.permalink;
	var permalink = this.prefix (commentKey);
	var nameClass = 'hashover-name-plain';
	var commentDate = comment.date;
	var codeTagCount = 0;
	var codeTags = [];
	var preTagCount = 0;
	var preTags = [];
	var classes = '';
	var replies = '';

	// Get instantiated prefix
	var prefix = this.prefix ();

	// Initial template
	var template = {
		hashover: prefix,
		permalink: commentKey
	};

	// Text for avatar image alt attribute
	var permatext = commentKey.slice(1).split('r').pop();

	// Check if this comment is a popular comment
	if (popular === true) {
		// Attempt to get parent comment permalink
		parent = this.permalinkParent (commentKey);

		// Get parent comment by its permalink if it exists
		if (parent !== null) {
			parent = this.permalinkComment (parent, this.instance.comments.primary);
		}

		// And remove "-pop" from text for avatar
		permatext = permatext.replace ('-pop', '');
	} else {
		// Append class to indicate comment is a reply when appropriate
		if (parent !== null) {
			classes += ' hashover-reply';
		}

		// Check if we have comments to collapse
		if (collapse === true && this.instance['total-count'] > 0) {
			// If so, check if we've reached the collapse limit
			if (this.instance.collapseLimit >= this.setup['collapse-limit']) {
				// If so, append class to indicate collapsed comment
				classes += ' hashover-hidden';
			} else {
				// If not, increase collapse limit
				this.instance.collapseLimit++;
			}
		}
	}

	// Add avatar image to template
	template.avatar = this.strings.parseTemplate (
		this.ui['user-avatar'], {
			src: comment.avatar,
			href: permalink,
			text: permatext
		}
	);

	// Check if comment is not a notice
	if (comment.notice === undefined) {
		// If so, define commenter name
		var name = comment.name || this.setup['default-name'];

		// Initial website
		var website = comment.website;

		// Name is Twitter handle indicator
		var isTwitter = (name.charAt (0) === '@');

		// Check if user's name is a Twitter handle
		if (isTwitter === true) {
			// If so, remove the leading "@" character
			name = name.slice (1);

			// Set Twitter name class
			nameClass = 'hashover-name-twitter';

			// Get the name length
			var nameLength = name.length;

			// Check if Twitter handle is valid length
			if (nameLength > 1 && nameLength <= 30) {
				// Set website to Twitter profile if a specific website wasn't given
				if (website === undefined) {
					website = 'http://twitter.com/' + name;
				}
			}
		}

		// Check whether user gave a website
		if (website !== undefined) {
			// If so, set normal website class where appropriate
			if (isTwitter === false) {
				nameClass = 'hashover-name-website';
			}

			// And set name as a hyperlink
			var nameElement = this.strings.parseTemplate (
				this.ui['name-link'], {
					hashover: prefix,
					href: website,
					permalink: commentKey,
					name: name
				}
			);
		} else {
			// If not, set name as plain text
			var nameElement = this.strings.parseTemplate (
				this.ui['name-span'], {
					hashover: prefix,
					permalink: commentKey,
					name: name
				}
			);
		}

		// Construct thread link
		if ((comment.url && comment.title) !== undefined) {
			template['thread-link'] = this.strings.parseTemplate (
				this.ui['thread-link'], {
					url: comment.url,
					title: comment.title
				}
			);
		}

		// Check if comment has a parent
		if (parent !== null && this.ui['parent-link'] !== undefined) {
			// If so, create the parent thread permalink
			var parentThread = 'hashover-' + parent.permalink;

			// Get the parent's name
			var parentName = parent.name || this.setup['default-name'];

			// Add thread parent hyperlink to template
			template['parent-link'] = this.strings.parseTemplate (
				this.ui['parent-link'], {
					hashover: prefix,
					href: comment.url || this.instance['file-path'],
					parent: parentThread,
					permalink: commentKey,
					name: parentName
				}
			);
		}

		// Check if the logged in user owns the comment
		if (comment['user-owned'] !== undefined) {
			// If so, append class to indicate comment is from logged in user
			classes += ' hashover-user-owned';

			// Define "Reply" link with original poster title
			var replyTitle = this.locale['commenter-tip'];
			var replyClass = 'hashover-no-email';
		} else {
			// Check if commenter is subscribed
			if (comment.subscribed === true) {
				// If so, set subscribed title
				var replyTitle = name + ' ' + this.locale['subscribed-tip'];
				var replyClass = 'hashover-has-email';
			} else{
				// If not, set unsubscribed title
				var replyTitle = name + ' ' + this.locale['unsubscribed-tip'];
				var replyClass = 'hashover-no-email';
			}
		}

		// Check if the comment is editable for the user
		if ((comment['editable'] && this.ui['edit-link']) !== undefined) {
			// If so, add "Edit" hyperlink to template
			template['edit-link'] = this.strings.parseTemplate (
				this.ui['edit-link'], {
					hashover: prefix,
					href: comment.url || this.instance['file-path'],
					permalink: commentKey
				}
			);
		}

		// Add like link and count to template if likes are enabled
		if (this.setup['allows-likes'] !== false) {
			this.optionalMethod ('addRatings', [
				comment, template, 'like', commentKey
			]);
		}

		// Add dislike link and count to template if dislikes are enabled
		if (this.setup['allows-dislikes'] !== false) {
			this.optionalMethod ('addRatings', [
				comment, template, 'dislike', commentKey
			]);
		}

		// Add name HTML to template
		template.name = this.strings.parseTemplate (
			this.ui['name-wrapper'], {
				class: nameClass,
				link: nameElement
			}
		);

		// Append status text to date
		if (comment['status-text'] !== undefined) {
			commentDate += ' (' + comment['status-text'] + ')';
		}

		// Add date from comment as permalink hyperlink to template
		template.date = this.strings.parseTemplate (
			this.ui['date-link'], {
				hashover: prefix,
				href: comment.url || this.instance['file-path'],
				permalink: 'hashover-' + commentKey,
				title: comment['date-time'],
				date: commentDate
			}
		);

		// Add "Reply" hyperlink to template
		template['reply-link'] = this.strings.parseTemplate (
			this.ui['reply-link'], {
				hashover: prefix,
				href: comment.url || this.instance['file-path'],
				permalink: commentKey,
				class: replyClass,
				title: replyTitle
			}
		);

		// Add reply count to template
		if (comment.replies !== undefined) {
			template['reply-count'] = comment.replies.length;

			if (template['reply-count'] > 0) {
				if (template['reply-count'] !== 1) {
					template['reply-count'] += ' ' + this.locale['replies'];
				} else {
					template['reply-count'] += ' ' + this.locale['reply'];
				}
			}
		}

		// Add HTML anchor tag to URLs
		var body = comment.body.replace (this.rx.links, this.rx.html.linksReplace);

		// Replace [img] tags with placeholders if embedded images are enabled
		if (hashover.setup['allows-images'] !== false) {
			body = body.replace (this.rx.imageTags, function (m, link, url) {
				return hashover.optionalMethod ('embedImage', arguments);
			});
		}

		// Parse markdown in comment if enabled
		if (this.parseMarkdown !== undefined) {
			body = this.parseMarkdown (body);
		}

		// Check if there are code tags in the comment
		if (this.rx.html.code.open.test (body) === true) {
			// If so, define regular expression callback
			var codeReplacer = function (fullTag, open, html, close) {
				// Create code marker
				var codeMarker = open + 'CODE_TAG[' + codeTagCount + ']' + close;

				// Store original HTML for later re-injection
				codeTags[codeTagCount] = hashover.EOLTrim (html);

				// Increase code tag count
				codeTagCount++;

				// Return code tag marker
				return codeMarker;
			};

			// And replace code tags with marker text
			body = body.replace (this.rx.html.code.replace, codeReplacer);
		}

		// Check if there are pre tags in the comment
		if (this.rx.html.pre.open.test (body) === true) {
			// If so, define regular expression callback
			var preReplacer = function (fullTag, open, html, close) {
				// Create pre marker
				var preMarker = open + 'PRE_TAG[' + preTagCount + ']' + close;

				// Store original HTML for later re-injection
				preTags[preTagCount] = hashover.EOLTrim (html);

				// Increase pre tag count
				preTagCount++;

				// Return pre tag marker
				return preMarker;
			};

			// And replace pre tags with marker text
			body = body.replace (this.rx.html.pre.replace, preReplacer);
		}

		// Check if comment has whitespace to be trimmed
		if (this.rx.html.trimTags.open.test (body) === true) {
			// If so, define a regular expression callback
			var tagTrimmer = function (fullTag, open, name, html, close) {
				return open + hashover.EOLTrim (html) + close;
			};

			// And trim whitespace from comment
			body = body.replace (this.rx.html.trimTags.replace, tagTrimmer);
		}

		// Break comment into paragraphs
		var paragraphs = body.split (this.rx.paragraphs);

		// Initial paragraph'd comment
		var pdComment = '';

		// Run through paragraphs
		for (var i = 0, il = paragraphs.length; i < il; i++) {
			// Replace single line breaks with break tags
			var lines = paragraphs[i].replace (this.rx.html.lines, '<br>');

			// Wrap comment in paragraph tags
			pdComment += '<p>' + lines + '</p>' + this.setup['server-eol'];
		}

		// Replace code tag markers with original code tag HTML
		if (codeTagCount > 0) {
			pdComment = pdComment.replace (this.rx.html.code.marker, function (m, i) {
				return codeTags[i];
			});
		}

		// Replace pre tag markers with original pre tag HTML
		if (preTagCount > 0) {
			pdComment = pdComment.replace (this.rx.html.pre.marker, function (m, i) {
				return preTags[i];
			});
		}

		// Add comment data to template
		template.comment = pdComment;
	} else {
		// Append notice class
		classes += ' hashover-notice ' + comment['notice-class'];

		// Add notice to template
		template.comment = comment.notice;

		// Add name HTML to template
		template.name = this.strings.parseTemplate (
			this.ui['name-wrapper'], {
				class: nameClass,
				link: comment.title
			}
		);
	}

	// Comment HTML template
	var html = this.strings.parseTemplate (this.ui['theme'], template);

	// Check if comment has replies
	if (comment.replies !== undefined) {
		// If so, append class to indicate comment has replies
		classes += ' hashover-has-replies';

		// Recursively parse replies
		for (var i = 0, il = comment.replies.length; i < il; i++) {
			replies += this.parseComment (comment.replies[i], comment, collapse);
		}
	}

	// Wrap comment HTML
	var wrapper = this.strings.parseTemplate (
		this.ui['comment-wrapper'], {
			hashover: prefix,
			permalink: commentKey,
			class: classes,
			html: html + replies
		}
	);

	return wrapper;
};

// Shorthand for `Document.getElementById` (getelement.js)
HashOverConstructor.prototype.getElement = function (id, asIs)
{
	// Prepend pseudo-namespace prefix unless told not to
	id = (asIs === true) ? id : this.prefix (id);

	// Attempt to get the element by its ID
	var element = document.getElementById (id);

	// And return element
	return element;
};

// Execute callback function if element isn't false (getelement.js)
HashOverConstructor.prototype.elementExists = function (id, callback, asIs)
{
	// Attempt to get element
	var element = this.getElement (id, asIs);

	// Execute callback if element exists
	if (element !== null) {
		return callback (element);
	}

	// Otherwise, return false
	return false;
};

// Execute a callback for each element with a specific class (elements.js)
HashOverConstructor.prototype.eachClass = function (element, className, callback)
{
	// Get elements with a specific class name
	var elements = element.getElementsByClassName (className);

	// Execute callback for each element
	for (var i = elements.length - 1; i >= 0; i--) {
		callback (elements[i], elements, i, className);
	}
};

// Parse all comments in a given array (parseall.js)
HashOver.prototype.parseAll = function (comments, element, collapse, popular)
{
	// Comments HTML
	var html = '';

	// Parse every comment
	for (var i = 0, il = comments.length; i < il; i++) {
		html += this.parseComment (comments[i], null, collapse, popular);
	}

	// HTML parsing start time
	var htmlStart = Date.now ();

	// Check if we can insert HTML adjacently
	if ('insertAdjacentHTML' in element) {
		// If so, remove all existing content
		element.textContent = '';

		// And insert HTML adjacently
		element.insertAdjacentHTML ('beforeend', html);
	} else {
		// If not, add comments as element's inner HTML
		element.innerHTML = html;
	}

	// Get HTML parsing time
	var htmlTime = Date.now () - htmlStart;

	// Add control events
	for (var i = 0, il = comments.length; i < il; i++) {
		this.addControls (comments[i]);
	}

	return htmlTime;
};

// Returns a clone of an object (cloneobject.js)
HashOver.prototype.cloneObject = function (object)
{
	return JSON.parse (JSON.stringify (object));
};

// "Flatten" the comments object (getallcomments.js)
HashOver.prototype.getAllComments = function (comments)
{
	// Initial flattened comments
	var output = [];

	// Clone the comments
	var tmpArray = this.cloneObject (comments);

	// Recursively descend into comment replies
	function descend (comment)
	{
		// Add the current comment to flattened output
		output.push (comment);

		// Check if comment has replies
		if (comment.replies !== undefined) {
			// If so, descend into the replies
			for (var i = 0, il = comment.replies.length; i < il; i++) {
				descend (comment.replies[i]);
			}

			// And remove replies from flattened output
			delete comment.replies;
		}
	}

	// Initial descent into comments
	for (var i = 0, il = tmpArray.length; i < il; i++) {
		descend (tmpArray[i]);
	}

	// Return flattened comments
	return output;
};

// Sort any given comments (sortcomments.js)
HashOver.prototype.sortComments = function (comments, method)
{
	// Sort method or default
	method = method || this.setup['default-sorting'];

	// Configurable default name
	var defaultName = this.setup['default-name'];

	// Sorts comments by date
	function sortByDate (a, b)
	{
		// Return microtime difference if dates are different
		if (b.timestamp !== a.timestamp) {
			return b.timestamp - a.timestamp;
		}

		// Otherwise, return 1
		return 1;
	}

	// Returns a comment's number of likes minus dislikes
	function netLikes (comment)
	{
		// Number of likes or zero
		var likes = comment.likes || 0;

		// Number of dislikes or zero
		var dislikes = comment.dislikes || 0;

		// Return the difference
		return likes - dislikes;
	}

	// Returns a comment's number of replies
	function replyCounter (comment)
	{
		return comment.replies ? comment.replies.length : 0;
	}

	// Returns the sum number of replies in a comment thread
	function replySum (comment, callback)
	{
		// Initial sum
		var sum = 0;

		// Check if there are replies to the current comment
		if (comment.replies !== undefined) {
			// If so, run through them adding up the number of replies
			for (var i = 0, il = comment.replies.length; i < il; i++) {
				sum += replySum (comment.replies[i], callback);
			}
		}

		// Calculate the sum based on the give callback
		sum += callback (comment);

		return sum;
	}

	// Sorts comments alphabetically by commenters names
	function sortByCommenter (a, b)
	{
		// Lowercase commenter name or default name
		var nameA = (a.name || defaultName).toLowerCase ();
		var nameB = (b.name || defaultName).toLowerCase ();

		// Remove @ character if present
		nameA = (nameA.charAt (0) === '@') ? nameA.slice (1) : nameA;
		nameB = (nameB.charAt (0) === '@') ? nameB.slice (1) : nameB;

		// Return 1 or -1 based on lexicographical difference
		if (nameA !== nameB) {
			return (nameA > nameB) ? 1 : -1;
		}

		// Otherwise, return 0
		return 0;
	}

	// Decide how to sort the comments
	switch (method) {
		// Sort all comments in reverse order
		case 'descending': {
			// Get all comments
			var sortArray = this.getAllComments (comments);

			// And return reversed comments
			return sortArray.reverse ();
		}

		// Sort all comments by date
		case 'by-date': {
			// Get all comments
			var sortArray = this.getAllComments (comments);

			// And return comments sorted by date
			return sortArray.sort (sortByDate);
		}

		// Sort all comments by net number of likes
		case 'by-likes': {
			// Get all comments
			var sortArray = this.getAllComments (comments);

			// And return sorted comments
			return sortArray.sort (function (a, b) {
				return netLikes (b) - netLikes (a);
			});
		}

		// Sort all comments by number of replies
		case 'by-replies': {
			// Clone the comments
			var sortArray = this.cloneObject (comments);

			// And return comments sorted by number of replies
			return sortArray.sort (function (a, b) {
				return replyCounter (b) - replyCounter (a);
			});
		}

		// Sort threads by the sum of replies to its comments
		case 'by-discussion': {
			// Clone the comments
			var sortArray = this.cloneObject (comments);

			// And return comments sorted by the sum of each comment's replies
			return sortArray.sort (function (a, b) {
				var replyCountA = replySum (a, replyCounter);
				var replyCountB = replySum (b, replyCounter);

				return replyCountB - replyCountA;
			});
		}

		// Sort threads by the sum of likes to it's comments
		case 'by-popularity': {
			// Clone the comments
			var sortArray = this.cloneObject (comments);

			// And return comments sorted by the sum of each comment's net likes
			return sortArray.sort (function (a, b) {
				var likeCountA = replySum (a, netLikes);
				var likeCountB = replySum (b, netLikes);

				return likeCountB - likeCountA;
			});
		}

		// Sort all comments by the commenter names
		case 'by-name': {
			// Get all comments
			var sortArray = this.getAllComments (comments);

			// And return comments sorted by the commenter names
			return sortArray.sort (sortByCommenter);
		}

		// Sort threads in reverse order
		case 'threaded-descending': {
			// Clone the comments
			var sortArray = this.cloneObject (comments);

			// And return reversed comments
			return sortArray.reverse ();
		}

		// Sort threads by date
		case 'threaded-by-date': {
			// Clone the comments
			var sortArray = this.cloneObject (comments);

			// And return comments sorted by date
			return sortArray.sort (sortByDate);
		}

		// Sort threads by net likes
		case 'threaded-by-likes': {
			// Clone the comments
			var sortArray = this.cloneObject (comments);

			// And return comments sorted by the net number of likes
			return sortArray.sort (function (a, b) {
				return netLikes (b) - netLikes (a);
			});
		}

		// Sort threads by commenter names
		case 'threaded-by-name': {
			// Clone the comments
			var sortArray = this.cloneObject (comments);

			// And return comments sorted by the commenter names
			return sortArray.sort (sortByCommenter);
		}
	}

	// By default simply return the comments as-is
	return comments;
};

// Sort primary comments (sortcomments.js)
HashOver.prototype.sortPrimary = function (method, collapse)
{
	// Sorted comment destination
	var dest = this.instance['sort-section'];

	// Comment sorting start time
	var sortStart = Date.now ();

	// Sort the primary comments
	var sorted = this.sortComments (this.instance.comments.primary, method);

	// Reset collapsed comments count if comments are to be collapsed
	if (collapse === true) {
		this.instance.collapseLimit = 0;
	}

	// Get comment sorting time
	var sortTime = Date.now () - sortStart;

	// Parse the sorted comments
	var htmlTime = this.parseAll (sorted, dest, collapse);

	// Log execution time in console
	console.log (this.strings.sprintf (
		'HashOver: sorting %d ms, HTML %d ms', [ sortTime, htmlTime ]
	));
};

// Converts an HTML string to DOM elements (htmlchildren.js)
HashOver.prototype.htmlChildren = function (html)
{
	// Create a div to place the HTML into for parsing
	var div = this.createElement ('div', {
		innerHTML: html
	});

	// Return the child elements
	return div.children;
};

// For appending new comments to the thread on page (appendcomments.js)
HashOver.prototype.appendComments = function (comments, dest, parent)
{
	// Set append element to more section
	dest = dest || this.instance['sort-section'];

	// HTML parsing time
	var htmlTime = 0;

	// Run through each comment
	for (var i = 0, il = comments.length; i < il; i++) {
		// Current comment
		var comment = comments[i];

		// Attempt to get the comment element
		var element = this.getElement (comment.permalink);

		// Check if comment exists
		if (element !== null) {
			// If so, re-append the comment element
			element.parentNode.appendChild (element);

			// Check comment's replies
			if (comment.replies !== undefined) {
				this.appendComments (comment.replies, element, comment);
			}

			// And do nothing else
			continue;
		}

		// Parse comment
		var html = this.parseComment (comment, parent);

		// HTML parsing start time
		var htmlStart = Date.now ();

		// Check if we can insert HTML adjacently
		if ('insertAdjacentHTML' in dest) {
			// If so, insert comment adjacently
			dest.insertAdjacentHTML ('beforeend', html);
		} else {
			// If not, convert HTML to NodeList
			var element = this.htmlChildren (html);

			// And append the first node
			dest.appendChild (element[0]);
		}

		// HTML parsing end time
		var htmlEnd = Date.now ();

		// Add to HTML parsing time
		htmlTime += htmlEnd - htmlStart;

		// Add controls to the comment
		this.addControls (comment);
	}

	// Re-append more comments link
	this.reappendMoreLink ();

	// And return HTML parsing
	return htmlTime;
};

// Initial timeouts (messages.js)
HashOver.prototype.messageTimeouts = {};

// Gets a computed element style by property (messages.js)
HashOver.prototype.computeStyle = function (element, property, type)
{
	// Check for modern browser support (Mozilla Firefox, Google Chrome)
	if (window.getComputedStyle !== undefined) {
		// If found, get the computed styles for the element
		var computedStyle = window.getComputedStyle (element, null);

		// And get the specific property
		computedStyle = computedStyle.getPropertyValue (property);
	} else {
		// Otherwise, assume we're in IE
		var computedStyle = element.currentStyle[property];
	}

	// Cast value to specified type
	switch (type) {
		case 'int': {
			computedStyle = computedStyle.replace (/px|em/, '');
			computedStyle = parseInt (computedStyle) || 0;
			break;
		}

		case 'float': {
			computedStyle = computedStyle.replace (/px|em/, '');
			computedStyle = parseFloat (computedStyle) || 0.0;
			break;
		}
	}

	return computedStyle;
};

// Gets the client height of a message element (messages.js)
HashOver.prototype.getHeight = function (element, setChild)
{
	// Get first child of message element
	var firstChild = element.children[0];

	// Set max-height style to initial
	firstChild.style.maxHeight = 'initial';

	// Get various computed styles
	var borderTop = this.computeStyle (firstChild, 'border-top-width', 'int');
	var borderBottom = this.computeStyle (firstChild, 'border-bottom-width', 'int');
	var marginBottom = this.computeStyle (firstChild, 'margin-bottom', 'int');
	var border = borderTop + borderBottom;

	// Calculate its client height
	var maxHeight = firstChild.clientHeight + border + marginBottom;

	// Set its max-height style as well if told to
	if (setChild === true) {
		firstChild.style.maxHeight = maxHeight + 'px';
	} else {
		firstChild.style.maxHeight = '';
	}

	return maxHeight;
};

// Open a message element (messages.js)
HashOver.prototype.openMessage = function (element)
{
	// Reference to this object
	var hashover = this;

	// Add classes to indicate message element is open
	this.classes.remove (element, 'hashover-message-animated');
	this.classes.add (element, 'hashover-message-open');

	// Get height of element
	var maxHeight = this.getHeight (element);

	// Get first child of message element
	var firstChild = element.children[0];

	// Remove class indicating message element is open
	this.classes.remove (element, 'hashover-message-open');

	setTimeout (function () {
		// Add class to indicate message element is open
		hashover.classes.add (element, 'hashover-message-open');
		hashover.classes.add (element, 'hashover-message-animated');

		// Set max-height styles
		element.style.maxHeight = maxHeight + 'px';
		firstChild.style.maxHeight = maxHeight + 'px';

		// Set max-height style to initial after transition
		setTimeout (function () {
			element.style.maxHeight = 'initial';
			firstChild.style.maxHeight = 'initial';
		}, 150);
	}, 150);
};

// Close a message element (messages.js)
HashOver.prototype.closeMessage = function (element)
{
	// Reference to this object
	var hashover = this;

	// Set max-height style to specific height before transition
	element.style.maxHeight = this.getHeight (element, true) + 'px';

	setTimeout (function () {
		// Remove max-height style from message elements
		element.children[0].style.maxHeight = '';
		element.style.maxHeight = '';

		// Remove classes indicating message element is open
		hashover.classes.remove (element, 'hashover-message-open');
		hashover.classes.remove (element, 'hashover-message-error');
	}, 150);
};

// Handle message element(s) (messages.js)
HashOver.prototype.showMessage = function (messageText, type, permalink, error)
{
	// Reference to this object
	var hashover = this;

	// Check if message is in an edit form
	if (type === 'edit') {
		// If so, get message from edit form by permalink
		var container = this.getElement ('edit-message-container-' + permalink);
		var message = this.getElement ('edit-message-' + permalink);
	} else {
		// If not, check if message is anything other than a reply
		if (type !== 'reply') {
			// If so, get primary message element
			var container = this.getElement ('message-container');
			var message = this.getElement ('message');
		} else {
			// If not, get message from reply form by permalink
			var container = this.getElement ('reply-message-container-' + permalink);
			var message = this.getElement ('reply-message-' + permalink);
		}
	}

	// Check if the message isn't empty
	if (messageText !== undefined && messageText !== '') {
		// Add message text to element
		message.textContent = messageText;

		// Add class to indicate message is an error if set
		if (error === true) {
			this.classes.add (container, 'hashover-message-error');
		}
	}

	// Add class to indicate message element is open
	this.openMessage (container);

	// Instantiated permalink as timeout key
	var key = this.prefix (permalink);

	// Add the comment to message counts
	if (this.messageTimeouts[key] === undefined) {
		this.messageTimeouts[key] = {};
	}

	// Clear necessary timeout
	if (this.messageTimeouts[key][type] !== undefined) {
		clearTimeout (this.messageTimeouts[key][type]);
	}

	// Add timeout to close message element after 10 seconds
	this.messageTimeouts[key][type] = setTimeout (function () {
		hashover.closeMessage (container);
	}, 10000);
};

// Handles display of various email warnings (validateemail.js)
HashOver.prototype.emailValidator = function (form, subscribe, type, permalink)
{
	// Do nothing if email form doesn't exist
	if (form.email === undefined) {
		return true;
	}

	// Check if email form is empty
	if (form.email.value === '') {
		// If so, return true if user unchecked subscribe checkbox
		if (this.getElement(subscribe).checked === false) {
			return true;
		}

		// Ask user if they are sure they don't want reply notifications
		var notifications = confirm (this.locale['no-email-warning']);

		// Check if user did not confirm
		if (notifications === false) {
			// If so, focus email field
			form.email.focus ();

			// And return false
			return false;
		}
	} else {
		// If not, check if email is valid
		if (this.rx.email.test (form.email.value) === false) {
			// If so, check if user unchecked subscribe checkbox
			if (this.getElement(subscribe).checked === false) {
				// If so, remove email address
				form.email.value = '';

				// And return true
				return true;
			}

			// Otherwise, get message from locales
			var message = this.locale['invalid-email'];

			// Show message
			this.showMessage (message, type, permalink, true);

			// Focus email input
			form.email.focus ();

			// And return false
			return false;
		}
	}

	// Otherwise, return true
	return true;
};

// Validate a comment form e-mail field (validateemail.js)
HashOver.prototype.validateEmail = function (type, permalink, form)
{
	// Subscribe checkbox ID
	var subscribe = type + '-subscribe';

	// Append permalink if form is a reply or edit
	if (type === 'reply' || type === 'edit') {
		subscribe += '-' + permalink;
	}

	// Attempt to validate form fields
	var valid = this.emailValidator (form, subscribe, type, permalink);

	// And return validity
	return valid;
};

// Validate a comment form (validatecomment.js)
HashOver.prototype.commentValidator = function (form, type, skipComment)
{
	// Check each input field for if they are required
	for (var field in this.setup['form-fields']) {
		// Skip other people's prototypes
		if (this.setup['form-fields'].hasOwnProperty (field) !== true) {
			continue;
		}

		// Check if the field is required, and that the input exists
		if (this.setup['form-fields'][field] === 'required' && form[field] !== undefined) {
			// Check if it has a value
			if (form[field].value === '') {
				// If not, add a class indicating a failed post
				this.classes.add (form[field], 'hashover-emphasized-input');

				// Focus the input
				form[field].focus ();

				// Return error message to display to the user
				return this.strings.sprintf (this.locale['field-needed'], [
					this.locale[field]
				]);
			}

			// And remove class indicating a failed post
			this.classes.remove (form[field], 'hashover-emphasized-input');
		}
	}

	// Check if a comment was given
	if (skipComment !== true && form.comment.value === '') {
		// If not, add a class indicating a failed post
		this.classes.add (form.comment, 'hashover-emphasized-input');

		// Focus the comment textarea
		form.comment.focus ();

		// Error message to display to the user
		var localeKey = (type === 'reply') ? 'reply-needed' : 'comment-needed';
		var errorMessage = this.locale[localeKey];

		// Return a error message to display to the user
		return errorMessage;
	}

	// And return true
	return true;
};

// Validate required comment credentials (validatecomment.js)
HashOver.prototype.validateComment = function (form, type, permalink, skipComment)
{
	// Attempt to validate comment
	var message = this.commentValidator (form, type, skipComment);

	// Check if comment is invalid
	if (message !== true) {
		// If so, display validator's message
		this.showMessage (message, type, permalink, true);

		// And return false
		return false;
	}

	// Validate e-mail if user isn't logged in or is editing
	if (this.setup['user-is-logged-in'] === false || type === 'edit') {
		// Return false on any failure
		if (this.validateEmail (type, permalink, form) === false) {
			return false;
		}
	}

	// And return true
	return true;
};

// For adding new comments to comments array (addcomments.js)
HashOver.prototype.addComments = function (comment, type)
{
	// Check if comment is a reply
	if (type === 'reply') {
		// If so, fetch parent comment by its permalink
		var parent = this.permalinkComment (
			this.permalinkParent (comment.permalink),
			this.instance.comments.primary
		);

		// Check if the parent comment exists
		if (parent !== null) {
			// If so, check if comment has replies
			if (parent.replies !== undefined) {
				// If so, append comment to replies
				parent.replies.push (comment);
			} else {
				// If not, create replies array
				parent.replies = [ comment ];
			}

			// And do nothing else
			return;
		}
	}

	// Otherwise, append to primary comments
	this.instance.comments.primary.push (comment);
};

// Increase comment counts (ajaxpost.js)
HashOver.prototype.incrementCounts = function (type)
{
	// Count top level comments
	if (type !== 'reply') {
		this.instance['primary-count']++;
	}

	// Increase all count
	this.instance['total-count']++;
};

// For posting comments (ajaxpost.js)
HashOver.prototype.AJAXPost = function (json, permalink, type)
{
	// Reference to this object
	var hashover = this;

	// Check if comment is a reply
	if (type === 'reply') {
		// If so, get element of comment being replied to
		var dest = this.getElement (permalink);
	} else {
		// If not, use sort section element
		var dest = this.instance['sort-section'];
	}

	// Get primary comments in order
	var comments = this.instance.comments.primary;

	// Check if there are no comments
	if (this.instance['total-count'] === 0) {
		// If so, replace "Be the first to comment!"
		this.instance.comments.primary[0] = json.comment;

		// And place comment on page
		dest.innerHTML = this.parseComment (json.comment);
	} else {
		// If not, add comment to comments array
		this.addComments (json.comment, type);

		// Sort comments if sort method drop down menu exists
		this.elementExists ('sort-select', function (sortSelect) {
			comments = hashover.sortComments (comments, sortSelect.value);
		});

		// And append comments
		this.appendComments (comments);
	}

	// Add controls to the new comment
	this.addControls (json.comment);

	// Update comment count
	this.getElement('count').textContent = json.count;
	this.incrementCounts (type);
};

// For editing comments (ajaxedit.js)
HashOver.prototype.AJAXEdit = function (json, permalink)
{
	// Get old comment element
	var comment = this.getElement (permalink);

	// Get old comment from primary comments
	var oldItem = this.permalinkComment (permalink, this.instance.comments.primary);

	// Get new comment child elements
	var newComment = this.htmlChildren (this.parseComment (json.comment));

	// Get old and new comment elements
	var newElements = newComment[0].children;
	var oldElements = comment.children;

	// Replace old comment with edited comment
	for (var i = newElements.length - 1; i >= 0; i--) {
		comment.replaceChild (newElements[i], oldElements[i]);
	}

	// Add controls back to the comment
	this.addControls (json.comment);

	// Update primary comments with edited comment
	for (var attribute in json.comment) {
		if (json.comment.hasOwnProperty (attribute) === true) {
			oldItem[attribute] = json.comment[attribute];
		}
	}
};

// Posts comments via AJAX (postrequest.js)
HashOver.prototype.postRequest = function (form, button, type, permalink, callback)
{
	// Reference to this object
	var hashover = this;

	// Form inputs
	var inputs = form.elements;

	// Initial request queries
	var queries = [];

	// AJAX response handler
	function commentHandler (json)
	{
		// Check if JSON includes a comment
		if (json.comment !== undefined) {
			// If so, check if comment is anything other than an edit
			if (type !== 'edit') {
				// If so, execute primary comment post function
				hashover.AJAXPost.apply (hashover, [ json, permalink, type ]);
			} else {
				// If so, execute comment edit function
				hashover.AJAXEdit.apply (hashover, [ json, permalink ]);
			}

			// Execute callback function if one was provided
			if (typeof (callback) === 'function') {
				callback ();
			}

			// Get the comment element by its permalink
			var scrollToElement = hashover.getElement (json.comment.permalink);

			// Scroll comment into view
			scrollToElement.scrollIntoView ({
				behavior: 'smooth',
				block: 'start',
				inline: 'start'
			});

			// And clear the comment form
			form.comment.value = '';

			// Re-enable button on success
			setTimeout (function () {
				button.disabled = false;
			}, 1000);
		} else {
			// If not, display message returned instead
			hashover.showMessage (json.message, type, permalink, true);

			// And return false
			return false;
		}
	}

	// Sends a request to post a comment
	function sendRequest ()
	{
		// Create post comment request queries
		var postQueries = queries.concat ([
			button.name + '=' + encodeURIComponent (button.value)
		]);

		// Send request to post a comment
		hashover.ajax ('POST', form.action, postQueries, commentHandler, true);
	}

	// Get all form input names and values
	for (var i = 0, il = inputs.length; i < il; i++) {
		// Skip submit inputs
		if (inputs[i].type === 'submit') {
			continue;
		}

		// Skip unchecked checkboxes
		if (inputs[i].type === 'checkbox' && inputs[i].checked !== true) {
			continue;
		}

		// Otherwise, get encoded input value
		var value = encodeURIComponent (inputs[i].value);

		// Add query to queries array
		queries.push (inputs[i].name + '=' + value);
	}

	// Add final queries
	queries = queries.concat ([
		// Add current client time
		'time=' + HashOver.getClientTime (),

		// Add AJAX indicator
		'ajax=yes'
	]);

	// Check if autologin is enabled and user isn't admin
	if (this.setup['user-is-admin'] !== true
	    && this.setup['uses-auto-login'] !== false)
	{
		// If so, check if the user is logged in
		if (this.setup['user-is-logged-in'] !== true) {
			// If not, create login request queries
			var loginQueries = queries.concat ([ 'login=Login' ]);

			// Send post comment request after login request
			this.ajax ('POST', form.action, loginQueries, sendRequest, true);
		} else {
			// If so, send post comment request normally
			sendRequest ();
		}
	} else {
		// If not, send post comment request
		sendRequest ();
	}

	// Re-enable button after 10 seconds
	setTimeout (function () {
		button.disabled = false;
	}, 10000);

	// And return false
	return false;
};

// For posting comments, both traditionally and via AJAX (postcomment.js)
HashOver.prototype.postComment = function (form, button, type, permalink, callback)
{
	// Return false if comment is invalid
	if (this.validateComment (form, type, permalink) === false) {
		return false;
	}

	// Disable button
	setTimeout (function () {
		button.disabled = true;
	}, 250);

	// Post by sending an AJAX request if enabled
	if (this.postRequest) {
		return this.postRequest.apply (this, arguments);
	}

	// Re-enable button after 10 seconds
	setTimeout (function () {
		button.disabled = false;
	}, 10000);

	// And return true
	return true;
};

// Generate file from permalink (permalinkfile.js)
HashOverConstructor.prototype.permalinkFile = function (permalink)
{
	// Remove leading 'c'
	var file = permalink.slice (1);

	// Replace 'r' by '-'
	file = file.replace (/r/g, '-');

	// Remove "-pop" if present
	file = file.replace ('-pop', '');

	return file;
};

// Changes a given hyperlink into a "Cancel" hyperlink (cancelswitcher.js)
HashOver.prototype.cancelSwitcher = function (form, link, wrapper, permalink)
{
	// Initial state properties of hyperlink
	var reset = {
		textContent: link.textContent,
		title: link.title,
		onclick: link.onclick
	};

	function linkOnClick ()
	{
		// Remove fields from form wrapper
		wrapper.textContent = '';

		// Reset button
		link.textContent = reset.textContent;
		link.title = reset.title;
		link.onclick = reset.onclick;

		return false;
	}

	// Change hyperlink to "Cancel" hyperlink
	link.textContent = this.locale['cancel'];
	link.title = this.locale['cancel'];

	// This resets the "Cancel" hyperlink to initial state onClick
	link.onclick = linkOnClick;

	// Check if cancel buttons are enabled
	if (this.setup['uses-cancel-buttons'] !== false) {
		// If so, get "Cancel" button
		var cancelButtonId = form + '-cancel-' + permalink;
		var cancelButton = this.getElement (cancelButtonId);

		// Attach event listeners to "Cancel" button
		cancelButton.onclick = linkOnClick;
	}
};

// Attach click event to formatting revealer hyperlinks (formattingonclick.js)
HashOver.prototype.formattingOnclick = function (type, permalink)
{
	// Prepend dash to permalink if present
	permalink = permalink ? '-' + permalink : '';

	// Reference to this object
	var hashover = this;

	// Get "Formatting" hyperlink element
	var link = this.getElement (type + '-formatting' + permalink);

	// Get formatting message element
	var message = this.getElement (type + '-formatting-message' + permalink);

	// Attach click event to formatting revealer hyperlink
	link.onclick = function ()
	{
		// Check if message is open
		if (hashover.classes.contains (message, 'hashover-message-open')) {
			// If so, close it
			hashover.closeMessage (message);

			// And do nothing else
			return false;
		}

		// Otherwise, open it
		hashover.openMessage (message);
		return false;
	}
};

// Adds duplicate event listeners to an element (duplicateproperties.js)
HashOverConstructor.prototype.duplicateProperties = function (element, names, value)
{
	// Initial properties
	var properties = {};

	// Construct a properties object with duplicate values
	for (var i = 0, il = names.length; i < il; i++) {
		properties[(names[i])] = value;
	}

	// Add the properties to the object
	element = this.addProperties (element, properties);

	return element;
};

// Returns false if key event is the enter key (formevents.js)
HashOver.prototype.enterCheck = function (event)
{
	return (event.keyCode === 13) ? false : true;
};

// Prevents enter key on inputs from submitting form (formevents.js)
HashOver.prototype.preventSubmit = function (form)
{
	// Get login info inputs
	var infoInputs = form.getElementsByClassName ('hashover-input-info');

	// Set enter key press to return false
	for (var i = 0, il = infoInputs.length; i < il; i++) {
		infoInputs[i].onkeypress = this.enterCheck;
	}
};

// Displays reply form (replytocomment.js)
HashOver.prototype.replyToComment = function (permalink)
{
	// Reference to this object
	var hashover = this;

	// Get reply link element
	var link = this.getElement ('reply-link-' + permalink);

	// Get file
	var file = this.permalinkFile (permalink);

	// Create reply form element
	var form = this.createElement ('form', {
		id: this.prefix ('reply-' + permalink),
		className: 'hashover-reply-form',
		action: this.setup['http-backend'] + '/form-actions.php',
		method: 'post'
	});

	// Place reply fields into form
	form.innerHTML = this.strings.parseTemplate (
		this.ui['reply-form'], {
			hashover: this.prefix (),
			permalink: permalink,
			url: this.instance['page-url'],
			thread: this.instance['thread-name'],
			title: this.instance['page-title'],
			file: file
		}
	);

	// Prevent input submission
	this.preventSubmit (form);

	// Get form by its permalink ID
	var replyForm = this.getElement ('placeholder-reply-form-' + permalink);

	// Add form to page
	replyForm.appendChild (form);

	// Change "Reply" link to "Cancel" link
	this.cancelSwitcher ('reply', link, replyForm, permalink);

	// Attach event listeners to "Post Reply" button
	var postReply = this.getElement ('reply-post-' + permalink);

	// Attach click event to formatting revealer hyperlink
	this.formattingOnclick ('reply', permalink);

	// Set onclick and onsubmit event handlers
	this.duplicateProperties (postReply, [ 'onclick', 'onsubmit' ], function () {
		return hashover.postComment (form, this, 'reply', permalink, link.onclick);
	});

	// Focus comment field
	form.comment.focus ();

	// And return false
	return true;
};

// Displays edit form (editcomment.js)
HashOver.prototype.editComment = function (comment, callback)
{
	// Do nothing if the comment isn't editable
	if (comment['editable'] !== true) {
		return false;
	}

	// Reference to this object
	var hashover = this;

	// Path to comment edit information backend script
	var editInfo = HashOver.backendPath + '/comment-info.php';

	// Get permalink from comment JSON object
	var permalink = comment.permalink;

	// Get file
	var file = this.permalinkFile (permalink);

	// Set request queries
	var queries = [
		'url=' + encodeURIComponent (this.instance['page-url']),
		'thread=' + encodeURIComponent (this.instance['thread-name']),
		'comment=' + encodeURIComponent (file)
	];

	// Get edit link element
	var link = this.getElement ('edit-link-' + permalink);

	// Set loading class to edit link
	this.classes.add (link, 'hashover-loading');

	// Send request for comment information
	this.ajax ('post', editInfo, queries, function (info) {
		// Check if request returned an error
		if (info.error !== undefined) {
			// If so, display error
			alert (info.error);

			// Remove loading class from edit link
			hashover.classes.remove (link, 'hashover-loading');

			// And do nothing else
			return;
		}

		// Get and clean comment body
		var body = info.body.replace (hashover.rx.links, '$1');

		// Get edit form placeholder
		var placeholder = hashover.getElement ('placeholder-edit-form-' + permalink);

		// Available comment status options
		var statuses = [ 'approved', 'pending', 'deleted' ];

		// Create edit form element
		var form = hashover.createElement ('form', {
			id: hashover.prefix ('edit-' + permalink),
			className: 'hashover-edit-form',
			action: hashover.setup['http-backend'] + '/form-actions.php',
			method: 'post'
		});

		// Place edit form fields into form
		form.innerHTML = hashover.strings.parseTemplate (
			hashover.ui['edit-form'], {
				hashover: hashover.prefix (),
				permalink: permalink,
				url: hashover.instance['page-url'],
				thread: hashover.instance['thread-name'],
				title: hashover.instance['page-title'],
				file: file,
				name: info.name || '',
				email: info.email || '',
				website: info.website || '',
				body: body
			}
		);

		// Prevent input submission
		hashover.preventSubmit (form);

		// Add edit form to placeholder
		placeholder.appendChild (form);

		// Set status dropdown menu option to comment status
		hashover.elementExists ('edit-status-' + permalink, function (status) {
			if (comment.status !== undefined) {
				status.selectedIndex = statuses.indexOf (comment.status);
			}
		});

		// Uncheck subscribe checkbox if user isn't subscribed
		hashover.elementExists ('edit-subscribe-' + permalink, function (sub) {
			if (comment.subscribed !== true) {
				sub.checked = null;
			}
		});

		// Get delete button
		var editDelete = hashover.getElement('edit-delete-' + permalink);

		// Get "Save Edit" button
		var saveEdit = hashover.getElement ('edit-post-' + permalink);

		// Change "Edit" link to "Cancel" link
		hashover.cancelSwitcher ('edit', link, placeholder, permalink);

		// Displays confirmation dialog for comment deletion
		editDelete.onclick = function () {
			return confirm (hashover.locale['delete-comment']);
		};

		// Attach click event to formatting revealer hyperlink
		hashover.formattingOnclick ('edit', permalink);

		// Set onclick and onsubmit event handlers
		hashover.duplicateProperties (saveEdit, [ 'onclick', 'onsubmit' ], function () {
			return hashover.postComment (form, this, 'edit', permalink, link.onclick);
		});

		// Remove loading class from edit link
		hashover.classes.remove (link, 'hashover-loading');

		// And execute callback if one was given
		if (typeof (callback) === 'function') {
			callback ();
		}
	}, true);

	// And return false
	return false;
};

// Changes Element.textContent onmouseover and reverts onmouseout (mouseoverchanger.js)
HashOver.prototype.mouseOverChanger = function (element, over, out)
{
	// Reference to this object
	var hashover = this;

	if (over === null || out === null) {
		element.onmouseover = null;
		element.onmouseout = null;

		return false;
	}

	element.onmouseover = function ()
	{
		this.textContent = hashover.locale[over];
	};

	element.onmouseout = function ()
	{
		this.textContent = hashover.locale[out];
	};
};

// For liking comments (likecomment.js)
HashOver.prototype.likeComment = function (action, permalink)
{
	// Reference to this object
	var hashover = this;

	// Get get from permalink
	var file = this.permalinkFile (permalink);

	// Get like/dislike button
	var actionLink = this.getElement (action + '-' + permalink);

	// Get likes/dislikes count element
	var likesElement = this.getElement (action + 's-' + permalink);

	// Path to like/dislike backend script
	var likePath = this.setup['http-backend'] + '/like.php';

	// Set request queries
	var queries = [
		'url=' + encodeURIComponent (this.instance['page-url']),
		'thread=' + encodeURIComponent (this.instance['thread-name']),
		'comment=' + encodeURIComponent (file),
		'action=' + action
	];

	// When loaded update like count
	this.ajax ('POST', likePath, queries, function (likeResponse) {
		// If a message is returned display it to the user
		if (likeResponse.message !== undefined) {
			alert (likeResponse.message);
			return;
		}

		// If an error is returned display a standard error to the user
		if (likeResponse.error !== undefined) {
			alert (likeResponse.error);
			return;
		}

		// Get number of likes
		var likesKey = (action !== 'dislike') ? 'likes' : 'dislikes';
		var likes = likeResponse[likesKey] || 0;

		// Check if button is marked as a like button
		if (hashover.classes.contains (actionLink, 'hashover-' + action) === true) {
			// If so, choose liked/disliked locale keys
			var title = (action === 'like') ? 'liked-comment' : 'disliked-comment';
			var content = (action === 'like') ? 'liked' : 'disliked';

			// Change class to indicate comment has been liked/disliked
			hashover.classes.add (actionLink, 'hashover-' + action + 'd');
			hashover.classes.remove (actionLink, 'hashover-' + action);

			// Change title and class to indicate comment has been liked/disliked
			actionLink.title = hashover.locale[title];
			actionLink.textContent = hashover.locale[content];

			// Add listener to change link text to "Unlike" on mouse over
			if (action === 'like') {
				hashover.mouseOverChanger (actionLink, 'unlike', 'liked');
			}
		} else {
			// If not, choose like/dislike locale keys
			var title = (action === 'like') ? 'like-comment' : 'dislike-comment';
			var content = (action === 'like') ? 'like' : 'dislike';

			// Change class to indicate comment has been unliked/undisliked
			hashover.classes.add (actionLink, 'hashover-' + action);
			hashover.classes.remove (actionLink, 'hashover-' + action + 'd');

			// Change title and class to indicate comment has been unliked/undisliked
			actionLink.title = hashover.locale[title];
			actionLink.textContent = hashover.locale[content];

			// Add listener to change link text to "Unlike" on mouse over
			if (action === 'like') {
				hashover.mouseOverChanger (actionLink, null, null);
			}
		}

		// Check if comment has likes
		if (likes > 0) {
			// If so, check if there is more than one like/dislike
			if (likes !== 1) {
				// If so, use plural like/dislike locale
				var likeLocale = (action !== 'like') ? 'dislikes' : 'likes';
			} else {
				// If not, use singlur like/dislike locale
				var likeLocale = (action !== 'like') ? 'dislike' : 'like';
			}

			// Change number of likes/dislikes
			likesElement.textContent = likes + ' ' + hashover.locale[likeLocale];

			// And set font weight bold
			likesElement.style.fontWeight = 'bold';
		} else {
			// If not, remove like count
			likesElement.textContent = '';

			// And set font weight normal
			likesElement.style.fontWeight = '';
		}
	}, true);
};

// Add various events to various elements in each comment (addcontrols.js)
HashOverConstructor.prototype.addControls = function (comment)
{
	// Reference to this object
	var hashover = this;

	// Adds the same event handlers to each comment reply
	function stepIntoReplies ()
	{
		// Check if the comment has replies
		if (comment.replies !== undefined) {
			// If so, add event handlers to each reply
			for (var i = 0, il = comment.replies.length; i < il; i++) {
				hashover.addControls (comment.replies[i]);
			}
		}
	}

	// Check if comment is a notice
	if (comment.notice !== undefined) {
		// If so, handle replies
		stepIntoReplies ();

		// And do nothing else
		return false;
	}

	// Get permalink from comment
	var permalink = comment.permalink;

	// Set onclick functions for external images
	if (this.setup['allows-images'] !== false) {
		// Main element
		var main = this.instance['main-element'];

		// Get embedded image elements
		var embeds = main.getElementsByClassName ('hashover-embedded-image');

		// Run through each embedded image element
		for (var i = 0, il = embeds.length; i < il; i++) {
			embeds[i].onclick = function () {
				hashover.openEmbeddedImage (this);
			};
		}
	}

	// Get thread link of comment
	this.elementExists ('thread-link-' + permalink, function (threadLink) {
		// Add onClick event to thread hyperlink
		threadLink.onclick = function ()
		{
			// Callback to execute after uncollapsing comments
			var callback = function ()
			{
				// Afterwards, get the parent comment permlink
				var parentThread = permalink.replace (hashover.rx.thread, '$1');

				// Get the parent comment element
				var scrollToElement = hashover.getElement (parentThread);

				// Scroll to the parent comment
				scrollToElement.scrollIntoView ({
					behavior: 'smooth',
					block: 'start',
					inline: 'start'
				});
			};

			// Check if collapsed comments are enabled
			if (hashover.setup['collapses-comments'] !== false) {
				// If so, show uncollapsed comments
				hashover.showMoreComments (threadLink, callback);
			} else {
				// If not, execute callback directly
				callback ();
			}

			return false;
		};
	});

	// Get reply link of comment
	this.elementExists ('reply-link-' + permalink, function (replyLink) {
		// Add onClick event to "Reply" hyperlink
		replyLink.onclick = function () {
			hashover.replyToComment (permalink);
			return false;
		};
	});

	// Check if the comment is editable for the user
	this.elementExists ('edit-link-' + permalink, function (editLink) {
		// If so, add onClick event to "Edit" hyperlinks
		editLink.onclick = function () {
			hashover.editComment (comment);
			return false;
		};
	});

	// Check if the comment doesn't belong to the logged in user
	if (comment['user-owned'] === undefined) {
		// If so, check if likes are enabled
		if (this.setup['allows-likes'] !== false) {
			// If so, check if the like link exists
			this.elementExists ('like-' + permalink, function (likeLink) {
				// Add onClick event to "Like" hyperlinks
				likeLink.onclick = function () {
					hashover.likeComment ('like', permalink);
					return false;
				};

				// And add "Unlike" mouseover event to liked comments
				if (hashover.classes.contains (likeLink, 'hashover-liked') === true) {
					hashover.mouseOverChanger (likeLink, 'unlike', 'liked');
				}
			});
		}

		// Check if dislikes are enabled
		if (this.setup['allows-dislikes'] !== false) {
			// If so, check if the dislike link exists
			this.elementExists ('dislike-' + permalink, function (dislikeLink) {
				// Add onClick event to "Dislike" hyperlinks
				dislikeLink.onclick = function () {
					hashover.likeComment ('dislike', permalink);
					return false;
				};
			});
		}
	}

	// Recursively execute this function on replies
	stepIntoReplies ();
};

// Appends HashOver theme CSS to page head (appendcss.js)
HashOverConstructor.prototype.appendCSS = function (id)
{
	// Get the page head
	var head = document.head || document.getElementsByTagName ('head')[0];

	// Get head link tags
	var links = head.getElementsByTagName ('link');

	// Theme CSS regular expression
	var themeRegex = new RegExp (this.setup['theme-css']);

	// Get the main HashOver element
	var mainElement = this.getMainElement (id);

	// Do nothing if the theme StyleSheet is already in the <head>
	for (var i = 0, il = links.length; i < il; i++) {
		if (themeRegex.test (links[i].href) === true) {
			// Hide HashOver if the theme isn't loaded
			if (links[i].loaded === false) {
				mainElement.style.display = 'none';
			}

			// And do nothing else
			return;
		}
	}

	// Otherwise, create <link> element for theme StyleSheet
	var css = this.createElement ('link', {
		rel: 'stylesheet',
		href: this.setup['theme-css'],
		type: 'text/css',
		loaded: false
	});

	// Check if the browser supports CSS load events
	if (css.onload !== undefined) {
		// CSS load and error event handler
		var onLoadError = function ()
		{
			// Get all HashOver class elements
			var hashovers = document.getElementsByClassName ('hashover');

			// Show all HashOver class elements
			for (var i = 0, il = hashovers.length; i < il; i++) {
				hashovers[i].style.display = '';
			}

			// Set CSS as loaded
			css.loaded = true;
		};

		// Hide HashOver
		mainElement.style.display = 'none';

		// And and CSS load and error event listeners
		css.addEventListener ('load', onLoadError, false);
		css.addEventListener ('error', onLoadError, false);
	}

	// Append theme StyleSheet <link> element to page <head>
	head.appendChild (css);
};

// Appends HashOver comments RSS feed to page head (appendrss.js)
HashOver.prototype.appendRSS = function ()
{
	// Get the page head
	var head = document.head || document.getElementsByTagName ('head')[0];

	// Get encoded page URL
	var pageURL = encodeURIComponent (this.instance['page-url']);

	// Create link element for comment RSS feed
	var rss = this.createElement ('link', {
		rel: 'alternate',
		href: this.setup['rss-api'] + '?url=' + pageURL,
		type: 'application/rss+xml',
		title: 'Comments'
	});

	// Append comment RSS feed link element to page head
	head.appendChild (rss);
};

// HashOver UI initialization process (init.js)
HashOver.prototype.init = function (id)
{
	// Reference to this object
	var hashover = this;

	// Execution start time
	var execStart = Date.now ();

	// Get the main HashOver element
	var mainElement = this.getMainElement (id);

	// Form events that get the same listeners
	var formEvents = [ 'onclick', 'onsubmit' ];

	// Current page URL without the hash
	var pageURL = window.location.href.split ('#')[0];

	// Current page URL hash
	var pageHash = window.location.hash.substring (1);

	// Scrolls to a specified element
	function scrollToElement (id)
	{
		hashover.elementExists (id, function (element) {
			element.scrollIntoView ({
				behavior: 'smooth',
				block: 'start',
				inline: 'start'
			});
		}, true);
	}

	// Callback for scrolling a comment into view on page load
	function scrollCommentIntoView ()
	{
		// Check if the comments are collapsed
		if (hashover.setup['collapses-comments'] !== false) {
			// Check if comment exists on the page
			var linkedHidden = hashover.elementExists (pageHash, function (comment) {
				// Check if the comment is visible
				if (hashover.classes.contains (comment, 'hashover-hidden') === false) {
					// If so, scroll to the comment
					scrollToElement (pageHash);
					return true;
				}

				return false;
			}, true);

			// Check if the linked comment is hidden
			if (linkedHidden === false) {
				// If not, scroll to comment after showing more comments
				hashover.showMoreComments (hashover.instance['more-link'], function () {
					scrollToElement (pageHash);
				});
			}
		} else {
			// If not, scroll to comment normally
			scrollToElement (pageHash);
		}
	}

	// Callback for scrolling a comment into view on page load
	function prepareScroll ()
	{
		// Scroll the main HashOver element into view
		if (pageHash.match (/comments|hashover/)) {
			scrollToElement (pageHash);
		}

		// Check if we're scrolling to a comment
		if (pageHash.match (/hashover-c[0-9]+r*/)) {
			// If so, check if the user interface is collapsed
			if (hashover.setup['collapses-interface'] !== false) {
				// If so, scroll to it after uncollapsing the interface
				hashover.showInterface (scrollCommentIntoView);
			} else {
				// If not, scroll to the comment directly
				scrollCommentIntoView ();
			}
		}

		// Open the message element if there's a message
		if (hashover.getElement('message').textContent !== '') {
			hashover.showMessage ();
		}
	}

	// Page load event handler
	function onLoad ()
	{
		setTimeout (prepareScroll, 500);
	}

	// Append theme CSS if enabled
	this.optionalMethod ('appendCSS', [ id ]);

	// Put number of comments into "hashover-comment-count" identified HTML element
	if (this.instance['total-count'] !== 0) {
		this.elementExists ('comment-count', function (countElement) {
			countElement.textContent = hashover.instance['total-count'];
		});

		// Append RSS feed if enabled
		this.optionalMethod ('appendRSS');
	}

	// Check if we can insert HTML adjacently
	if ('insertAdjacentHTML' in mainElement) {
		// If so, clear main element's contents
		mainElement.textContent = '';

		// And insert initial HTML adjacently
		mainElement.insertAdjacentHTML ('beforeend', this.instance['initial-html']);
	} else {
		// If not, replace main element's inner HTML with initial HTML
		mainElement.innerHTML = this.instance['initial-html'];
	}

	// Add main HashOver element to this HashOver instance
	this.instance['main-element'] = mainElement;

	// Get the sort section
	var sortSection = this.getElement ('sort-section');

	// Get sort div element
	this.instance['sort-section'] = sortSection;

	// Display most popular comments
	this.elementExists ('top-comments', function (topComments) {
		if (hashover.instance.comments.popular[0] !== undefined) {
			hashover.parseAll (hashover.instance.comments.popular, topComments, false, true);
		}
	});

	// Initial comments
	var comments = this.instance.comments.primary;

	// Sort the initial comments if they weren't sorted on the backend
	if (this.setup['collapses-comments'] === false || this.setup['uses-ajax'] === false) {
		comments = this.sortComments (comments);
	}

	// Parse all of the initial comments
	this.htmlTime = this.parseAll (comments, sortSection, this.setup['collapses-comments']);

	// Create show interface hyperlink if enabled
	this.optionalMethod ('showInterfaceLink');

	// Create show more comments hyperlink if enabled
	this.optionalMethod ('showMoreLink');

	// Attach click event to formatting revealer hyperlink
	this.formattingOnclick ('main');

	// Get some various form elements
	var postButton = this.getElement ('post-button');
	var formElement = this.getElement ('form');

	// Set onclick and onsubmit event handlers
	this.duplicateProperties (postButton, formEvents, function () {
		return hashover.postComment (formElement, postButton, 'main');
	});

	// Check if login is enabled
	if (this.setup['allows-login'] !== false) {
		// If so, check if user is logged in
		if (this.setup['user-is-logged-in'] !== true) {
			// If so, get the login button
			var loginButton = this.getElement ('login-button');

			// Set onclick and onsubmit event handlers
			this.duplicateProperties (loginButton, formEvents, function () {
				return hashover.validateComment (formElement, 'main', null, true);
			});
		}
	}

	// Check if sort method drop down menu exists
	this.elementExists ('sort-select', function (sortSelect) {
		// If so, add change event handler
		sortSelect.onchange = function ()
		{
			// Check if the comments are collapsed
			if (hashover.setup['collapses-comments'] !== false) {
				// If so, get the select div
				var sortSelectDiv = hashover.getElement ('sort');

				// And show comments before sorting
				hashover.loadAllComments (sortSelectDiv, function () {
					// Collapse comment indicator based on current collapse state
					var collapse = !hashover.instance['showing-more'];

					// Sort primary comments using selected sort method
					hashover.sortPrimary (sortSelect.value, collapse);

					// And reappend show more comments hyperlink
					hashover.reappendMoreLink ();
				}, false);
			} else {
				// If not, sort comments immediately
				hashover.sortPrimary (sortSelect.value);
			}
		};
	});

	// Check if reply or edit form request URL queries are set
	if (pageURL.match (/hashover-(reply|edit)=/)) {
		// If so, get the permalink from form request URL query
		var permalink = pageURL.replace (/.*?hashover-(edit|reply)=(c[0-9r\-pop]+).*?/, '$2');

		// Callback to execute after showing comments
		var callback = function ()
		{
			// Check if reply form is requested
			if (pageURL.match ('hashover-reply=')) {
				// If so, open reply form
				hashover.replyToComment (permalink);

				// And scroll to reply form
				scrollToElement (pageHash);
			} else {
				// If not, indicate if comment is popular
				var isPop = permalink.match ('-pop');

				// Decide appropriate array to get comment from
				var comments = hashover.instance.comments[isPop ? 'popular' : 'primary'];

				// Get comment being edited
				var edit = hashover.permalinkComment (permalink, comments);

				// Open and scroll to comment edit form
				hashover.editComment (edit, function () {
					scrollToElement (pageHash);
				});
			}
		};

		// Check if the comments are collapsed
		if (hashover.setup['collapses-comments'] !== false) {
			// If so, show more comments before executing callback
			this.showMoreComments (this.instance['more-link'], callback);
		} else {
			// If not, execute callback directly
			callback ();
		}
	}

	// Execution end time
	this.execTime = Math.abs (Date.now () - execStart - this.htmlTime);

	// Log execution time in console
	console.log (this.strings.sprintf (
		'HashOver: front-end %d ms, HTML %d ms', [ this.execTime, this.htmlTime ]
	));

	// Page onload compatibility wrapper
	if (window.addEventListener) {
		// Rest of the world
		window.addEventListener ('load', onLoad, false);
	} else {
		// IE ~8
		window.attachEvent ('onload', onLoad);
	}

	// Execute page load event handler manually
	onLoad ();
};

// Self-executing function to prevent pollution
(function () {
	// Default global instantiation target
	var instance = 'hashover';

	// Check if we have a loader instance
	if (HashOver.loaderInstance !== undefined) {
		// If so, run through global scope
		for (var variable in window) {
			// Check if current property is loader instance
			if (window[variable] === HashOver.loaderInstance) {
				// If so, set it as instantiation target
				instance = variable;
				break;
			}
		}
	}

	// Instantiate globally
	window[instance] = new HashOver ();
}) ();

/*

	HashOver Statistics

	Execution Time     : 83.20498 ms
	Script Memory Peak : 0.59 MiB
	System Memory Peak : 2 MiB

*/