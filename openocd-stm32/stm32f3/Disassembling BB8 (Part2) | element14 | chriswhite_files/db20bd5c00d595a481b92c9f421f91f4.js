/*
 * Copyright (C) 1999-2015 Jive Software. All rights reserved.
 *
 * This software is the proprietary information of Jive Software. Use is subject to license terms.
 */
jive.namespace('nitro');

jive.nitro.Nitro = jive.oo.Class.extend(function(protect, _super) {

    this.init = function(options) {
        this.options = options || {};
        this.methods = [];
        this.dfd = new $j.Deferred();
        
        this.dfd.done(this.setSession);
        
        if (this.options.hasOwnProperty('server')) {
            this.dfd.resolveWith(this, [this.options]);
        } else {
            this.loadSession();
        }
    };
    
    this.execute = function(callback) {
        var promise = new jive.conc.Promise();
        var self = this;
        
        this.dfd.done(function() {
            var methodString = this.generateAllMethodsString();
            
            $j.getJSON(self.serverUrl + encodeURIComponent(methodString), function(res) {
                $j.extend(res, {
                    eachMethod: function(methodName, callback) {
                        self.eachMethod(res, methodName, callback);
                    }
                });
                self.handleNitroResponse(res, promise, callback);
            });
        });
        
        return promise;
    };
    
    this.addMethod = function(name, params) {
        this.methods.push(this.createMethodString(name, params));
        
        return this;
    };

    this.isLocalizationEnabled = function() {
        return this.localizationEnabled || false;
    };

    protect.eachMethod = function(res, methodName, callback) {
        $j.each(res.Nitro.Nitro, function(i, method) {
            if (method.method === methodName) {
                callback.call(this, method);
            }
        });
    };
    
    protect.generateAllMethodsString = function() {
        this.methods.unshift(this.createMethodString('user.login', this.loginParameters));
        
        var methodString = '[' + this.methods.join(',') + ']';
        
        this.methods = [];
        
        return methodString;
    };
    
    protect.setSession = function(data) {
        this.serverUrl = (data.server || data.baseUrl) + '?jsCallback=?&method=batch.run&methodFeed=';
        this.localizationEnabled = data.localizationEnabled || false;
        this.loginParameters = {
            userId: data.userID,
            apiKey:  data.apiKey,
            ts: data.timeStamp,
            sig: data.signature
        };
    };
    
    protect.loadSession = function() {
        var self = this;
        
        $j.ajax({
            url: jive.rest.url("/nitro/admin/session"),
            success: function(response) {
                self.dfd.resolveWith(self, [response]);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error getting session: '+textStatus+'/'+errorThrown);
                self.dfd.rejectWith(self, [textStatus, errorThrown]);
            }
        });
    };
    
    protect.handleNitroResponse = function(res, promise, callback) {
        var nitro = res.Nitro;
        if (typeof nitro.Error != "undefined") {
            promise.emitError(nitro.Error.Code, nitro.Error.Message);
        } else {
            var noErrors = true;
            $j.each(nitro.Nitro, function(i, method) {
                if (typeof method.Error != "undefined") {
                    promise.emitError(method.Error.Code, method.Error.Message);
                    noErrors = false;
                }
            });
            
            if (noErrors) {
                callback.call(this, res, promise);
            }
        }
    };
    
    protect.createMethodString = function(name, params) {
        var result = '"method='+name;
        
        $j.each(params, function(key, value) {
            result += '&'+key+'='+value;
        });
        
        result += '"';
        
        return result;
    };

});

;
/*
 * Copyright (C) 1999-2015 Jive Software. All rights reserved.
 *
 * This software is the proprietary information of Jive Software. Use is subject to license terms.
 */
jive.namespace('nitro.shared');

jive.nitro.shared.UserService = jive.RestService.extend(function(protect, _super) {
    
    this.init = function(options) {
        _super.init.call(this, options);
        this.options = options;
    };
    
    this.getProfileInfo = function(options) {
        var success = options.success;
        var error = options.error;
        
        delete options.success;
        delete options.error;
        
        $j.ajax({
            url: jive.rest.url("/nitro/users/data"),
            data: options,
            success: success,
            error: error
        });
    };
    
    this.getUserIDs = function(jiveUserIDs) {
        var dfd = new $j.Deferred();
        var self = this;
        
        $j.ajax({
            url: jive.rest.url("/nitro/users/ids"),
            data: {
                userId: jiveUserIDs
            },
            success: function(response) {
                dfd.resolveWith(self, [response]);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error getting userIds: '+textStatus+'/'+errorThrown);
                dfd.rejectWith(self, [textStatus, errorThrown]);
            }
        });
        
        return dfd;
    };
    
});

;
/*
 * Copyright (C) 1999-2015 Jive Software. All rights reserved.
 *
 * This software is the proprietary information of Jive Software. Use is subject to license terms.
 */
jive.namespace('nitro.content');

/**
 * @depends path=/plugins/gamification/resources/script/jive-nitro.js
 * @depends path=/plugins/gamification/resources/script/apps/shared/models/userService.js
 */
jive.nitro.content.ContentSource = jive.RestService.extend(function(protect, _super) {
    
    this.init = function(options) {
        _super.init.call(this, options);
        this.options = options;
    };
    
    this.loadStatusLevels = function(jiveUserIDs) {
        var promise = new jive.conc.Promise();
        var userService = new jive.nitro.shared.UserService({});
        var self = this;
        
        userService.getUserIDs(jiveUserIDs).done(function(userIDs) {
            self.loadStatusFromNitro(userIDs, promise);
        });
        
        return promise;
    };
    
    protect.loadStatusFromNitro = function(userIDs, promise) {
        var self = this;
        var nitro = new jive.nitro.Nitro(this.options);
        var locale = n4jive.locale(this.options.localizationEnabled);

        nitro.addMethod('user.getLevel', n4jive.extendWithLocale({
            userIds: Object.values(userIDs).join(',')
        },locale));
        
        nitro.execute(function(res) {
            self.handleNitroResponse(res, userIDs, promise);
        });
    };
    
    this.handleNitroResponse = function(res, userIDs, promise) {
        var nitro = res.Nitro;
        
        $j.each(nitro.Nitro, function(i, method) {
            if (method.method === "user.getLevel") {
                var users = {};
                
                $j.each($j.makeArray(method.users.User), function(j, user) {
                    users[user.userId] = user.SiteLevel;
                });
                
                $j.each(userIDs, function(jiveUserID, userID) {
                    users[userID].jiveUserID = jiveUserID;
                }); 
                
                promise.emitSuccess(users);
            }
        });
    };
    
});

;
goog.provide("jive.ps.nitro.content.statusLevelImage");jive.ps.nitro.content.statusLevelImage=function(opt_data,opt_sb){var output=opt_sb||new soy.StringBuilder;output.append('<span class="j-status-levels j-gamification-status-level"><img src="',soy.$$escapeHtml(opt_data.imagePath),'" alt="',soy.$$escapeHtml(opt_data.title),'" title="',soy.$$escapeHtml(opt_data.title),'" /></span>');return opt_sb?"":output.toString()};
;
/*
 * Copyright (C) 1999-2015 Jive Software. All rights reserved.
 *
 * This software is the proprietary information of Jive Software. Use is subject to license terms.
 */
jive.namespace('nitro.content');

/**
 * @depends template=jive.ps.nitro.content.statusLevelImage
 */
jive.nitro.content.ContentView = jive.AbstractView.extend(function(protect, _super) {
    
    jive.conc.observable(this);
    
    this.init = function(options) {
        this.options = options;
        var view = this;
        
        $j(function () {
            view.emit('viewReady');
        });
        
    };
    
    this.showStatusLevels = function(users) {
        $j(".jive-comment a.j-avatar, div.j-post-avatar a.j-avatar").each(function(i, link) {
            var jiveUserID = $j(link).data('userid');
            
            $j.each(users, function(userID, user) {
                if (jiveUserID == user.jiveUserID) {
                    $j(link).append(jive.ps.nitro.content.statusLevelImage({
                        imagePath: user.iconUrl,
                        title: user.name
                    }));
                }
            });
        });
    };
    
    
    this.getUserIDs = function() {
        var userIDs = [];
        
        $j("a.j-avatar, div.j-post-avatar a.j-avatar").each(function(i, link) {
            var userID = $j(link).data('userid');
            if ($j.inArray(userID, userIDs) === -1) {
                userIDs.push(userID);
            }
        });
        
        return userIDs;
    };
    
});

;
/*
 * Copyright (C) 1999-2015 Jive Software. All rights reserved.
 *
 * This software is the proprietary information of Jive Software. Use is subject to license terms.
 */
jive.namespace('nitro.content');

/**
 * @depends path=/plugins/gamification/resources/script/apps/content/models/content_source.js
 * @depends path=/plugins/gamification/resources/script/apps/content/views/content_view.js
 */
jive.nitro.content.Main = jive.oo.Class.extend(function() {

    this.init = function(options) {
        this.options = options;
        this.source = new jive.nitro.content.ContentSource(options);
        this.view = new jive.nitro.content.ContentView(options);
        
        var main = this;
        
        jive.rte.renderedContent.addListener("renderedContent", function(container) {
            var id = $j(container).attr('id');
            if (container && ("jive-comments" === id || "jive-thread-messages-container" == id)) {
                main.loadStatusLevels();
            }
        });
        
        this.view.addListener('viewReady', $j.proxy(this.loadStatusLevels, this));
    };
    
    this.loadStatusLevels = function() {
        var main = this;
        
        main.source.loadStatusLevels(main.view.getUserIDs()).addCallback(function(users) {
            main.view.showStatusLevels(users);
            jive.localexchange.emit("nitro.content.userStatusLoaded");
        });
    };

});

;
/*
 * Copyright (C) 1999-2015 Jive Software. All rights reserved.
 *
 * This software is the proprietary information of Jive Software. Use is subject to license terms.
 */
var nitroProtocol = "http";
if( document.location.toString().indexOf( 'https://' ) != -1 ) {
	nitroProtocol = "https";
}
if (typeof nitroLibsVersion == "undefined") {
	nitroLibsVersion = "current";	
}	


if (typeof Nitro=="undefined") {
	
	function Nitro(connectionParams) {

		if (typeof Nitro.counter == "undefined") {
			Nitro.counter = 0;			
		}
		if (typeof Nitro.instances == "undefined") {
			Nitro.instances = new Array();			
		}
		if (typeof Nitro.divCounter == "undefined") {
			Nitro.divCounter = 0;	
		}
		
		this.counterId = Nitro.counter ++;
		var twitterEnabled = null;	
		var twitterLoginUrl = null;
		var facebookEnabled = null;
		var facebookLoginUrl = null;
		var paymentOptions = null;
		var paymentMethods = null;
		
		Nitro.instances.push(this);
		
		this.connectionParams = connectionParams;
		if (typeof this.connectionParams.debug == "undefined") {
			this.connectionParams.debug = false;
		}
		Nitro.debug = this.connectionParams.debug;
		this.jsConnector = new NitroJSConnector(connectionParams);
		
		//asynchronous since this object doesn't exist until the closing bracket
		var thisObj = this;
		setTimeout(function() {thisObj.handleRedirects();}, 250);
		
		this.getUserId = function (callback) {
			return NitroCookies.getUserId(this.connectionParams.apiKey, callback);
		}
		
		Nitro.getUserId = function (apiKey, callback) {
			return NitroCookies.getUserId(apiKey, callback);	
		}
		
		this.setUserId = function (value) {
			NitroCookies.setUserId(this.connectionParams.apiKey, value, true, false);
		}
		
		this.showPendingNotifications = function(callback, asyncToken, returnCount) {
			NitroNotifier.jsConnector = this.jsConnector;
			return NitroNotifier.showPendingNotifications(this.connectionParams, callback, asyncToken, returnCount);
		}
		Nitro.showPendingNotificationsNoCallback = function(callback, asyncToken) {
			var instance = Nitro.getInstanceForCounter(asyncToken);			
			return instance.showPendingNotifications();
		}		
		this.showNotificationsByName = function(notificationNames, callback, asyncToken, previewMode) {
			NitroNotifier.jsConnector = this.jsConnector;
			return NitroNotifier.showNotificationsByName(this.connectionParams, notificationNames, callback, asyncToken, previewMode);
		}
		this.getNotificationsFeed = function(callback, asyncToken, userIds, returnCount) {
			NitroNotifier.jsConnector = this.jsConnector;
			return NitroNotifier.getNotificationsFeed(this.connectionParams, callback, asyncToken, userIds, returnCount);
		}
		this.callAPI = function (params, callback, asyncToken, addUserId, noSessionKey) {
			return this.jsConnector.callAPI(params, callback, asyncToken, addUserId, noSessionKey);
		}	
		Nitro.callAPI = function (params, callback, asyncToken, addUserId, noSessionKey) {
			var instance = Nitro.getInstanceForCounter(asyncToken);			
			return instance.callAPI(params, callback, asyncToken, addUserId, noSessionKey);
		}
		this.logAction = function (tags, value) {
		  	this.jsConnector.callAPI("method=user.logAction&tags="+tags+(value ? '&value='+value : ''), "Nitro.processLogAction", this.counterId, true);
		}
		Nitro.logAction = function (tags, value, target, asyncToken) {
			var instance = Nitro.getInstanceForCounter(asyncToken);			
		  	instance.jsConnector.callAPI("method=user.logAction&tags="+tags+(value ? '&value='+value : '')+(target ? '&target='+target : ''), "Nitro.processLogAction", this.counterId, true);
		}
		
		Nitro.getInstanceForResponse = function(data, counterId) {
			if (data == null) {
				if (Nitro.debug) {
					alert ('Error');
				}
				return;
			}
			if (data.Nitro.res == "err") {
				if (Nitro.debug) {
					alert (data.Nitro.Error.Message);
				}
				return;
			}
			
			return Nitro.getInstanceForCounter(counterId);
		}
		
		Nitro.getInstanceForCounter = function(counterId) {
			for (var i = 0; i < Nitro.instances.length; i++) {
				if (Nitro.instances[i].counterId == counterId) {
					return Nitro.instances[i];
				}
			}
			return null;
		}		
		
		Nitro.processLogAction = function(data, token) {
			var instance = Nitro.getInstanceForResponse(data,token);
			// copy over session key to avoid extra login
			instance.connectionParams.sessionKey = instance.jsConnector.connectionParams.sessionKey;	
			NitroNotifier.jsConnector = this.jsConnector;
			NitroNotifier.showPendingNotifications(instance.connectionParams);
		}
		
		this.embedWidget = function(embedNames,divId,owner) {
			if (owner == null) {
				owner = "";	
			}
			if (this.jsConnector.connectionParams.userId == null) {
				var _self = this;
				setTimeout(function(){
					_self.embedWidget(embedNames,owner);
				}, this.retryEmbedInterval);
				return;			 
			}

			this.callAPI("method=user.getWidgetEmbeds&embedNames=" + embedNames, "Nitro.processGetWidgetEmbeds", this.counterId + "|" + divId + "|" + owner);
		}
		
		Nitro.processGetWidgetEmbeds = function(data, token) {
			var cId = token.split("|")[0];
			var instance = Nitro.getInstanceForResponse(data,cId);			
			instance.embedWidgetWithParams(data, token.split("|")[1], token.split("|")[2]);
		}
		
		this.embedWidgetWithParams = function(data, divId, owner) {
			var viewerId = this.jsConnector.connectionParams.userId;
			var ownerId = this.jsConnector.connectionParams.userId;		
			if (owner != null && owner != "") {
				ownerId = owner;	
			}
			var server = this.connectionParams.server.replace("/json", "/xml");
			
			var embedsArray = this.makeArray(data.Nitro.widgetEmbeds.WidgetEmbed);
			if (typeof embedsArray == "undefined") {
				return;	
			}
			
			for (var i=0; i < embedsArray.length; i++) {
				var embed = embedsArray[i];
				var type = embed.type;
				
				if(this.args && this.args[divId]) {
					var args = this.args[divId];
				}else  {
					var args = {};
				}
				args.apiKey=this.connectionParams.apiKey;
				args.server=server;
				args.ownerId=ownerId;
				args.viewerId=viewerId;
				args.divId=divId;
				args.nitroInstanceId=this.counterId;
					
				if (typeof this.connectionParams.timeStamp != "undefined") {
					args.timeStamp = this.connectionParams.timeStamp;
					args.signature = this.connectionParams.signature;
				}
				if (typeof this.connectionParams.sessionKey != "undefined") {
					args.sessionKey = this.connectionParams.sessionKey;				
				}

				var div = document.getElementById(divId);
				var attrs = div.attributes;

				/* precedence of params is
					1) Specified already in the args param
					2) Specified in the element tag via NML
					3) Specified in Nitro via the AdminUI
				*/
				var paramsArray = this.makeArray(embed.embedParams.WidgetEmbedParam);
				if (typeof paramsArray != "undefined") {
					for (var j=0; j < paramsArray.length; j++) {
						var param = paramsArray[j];
						//if the flashVar is not already set
						if(typeof args[param.name] == 'undefined') {
							//sets flashVars that came down from Nitro 
							if (param.value != null && param.value != "") {
								args[param.name] = param.value;
							}
							//overwrites those flashVars if they are specified via NML
							for(var k=attrs.length-1; k>=0; k--) {
								if (attrs[k].value == null || attrs[k].value == "null") {
									continue;
								}
								if (attrs[k].name.toLowerCase() == param.name.toLowerCase()) {
									args[param.name] = attrs[k].value;	
								}
							}
						}
					}
				}
				
				nitroWidget.embed(type, args);
			}
		}
		this.makeArray = function(obj) {
			if (typeof obj != "undefined" && typeof obj.length == "undefined") {
				return [obj];
			}
			return obj;
		}
		Nitro.isString = function() {
			if (typeof arguments[0] == 'string') 
				return true;
			if (typeof arguments[0] == 'object') {  
				var criterion = arguments[0].constructor.toString().match(/string/i); 
				return (criterion != null);  
			}
			return false;
		}		
		this.getElementForClass = function(className) {
			var all = document.all ? document.all :
			document.getElementsByTagName('*');
			var elements = new Array();
			for (var e = 0; e < all.length; e++)
				if (all[e].className.indexOf(className) != -1)
					elements[elements.length] = all[e];
			return elements;
		}
						
		this.addClass = function(elem, clazz) {
			if(!elem.className)
				elem.className = "";
			if(elem.className.indexOf(clazz) == -1) {
				elem.className+= " " + clazz;
			}
		}	
						
		this.removeClass = function(elem, clazz) {
			elem.className = elem.className ? elem.className.replace(clazz,'') : '';
		}		

		this.retryEmbedInterval = 10;
		
		this.refreshNML = function(primaryNMLThread) {
			if (this.jsConnector.connectionParams.sessionKey == null) {
				var _self = this;
				setTimeout(function(){
					_self.refreshNML();
				}, this.retryEmbedInterval);
				return;			 
			}
			
     		var items = document.getElementsByTagName("*");
		    var i=items.length;
			var elem;
			
			// look for tests first
			var testsToReplace = new Array();
			var testGroup = this.jsConnector.connectionParams.abTestGroup;
			if (typeof testGroup == "undefined" || testGroup == null || testGroup == "") {
				testGroup = "content";	
			}
			while (i > 0) {
				i--;
				elem = items[i];
				if (this.isNitroNode(elem, "block")) {
					var children = elem.getElementsByTagName("*");
					var childToUse = null;
					for (var j = 0; j < children.length; j++) {  
						var child = children[j];
						if (this.isNitroNode(child, testGroup)) {
							childToUse = child;
							break;
						}
					}					
					if (childToUse != null) {
						testsToReplace.push({child : child, elem : elem});						
					}					
				}
			}
			
			for (i = 0; i < testsToReplace.length; i++) {
				var testNode = testsToReplace[i].elem;
				var groupNode = testsToReplace[i].child;
				while (groupNode.firstChild) {
					testNode.parentNode.insertBefore(groupNode.firstChild, testNode);
				}
				testNode.parentNode.removeChild(testNode);
			}
			
			var nodeWasUpdated = false;
			items = document.getElementsByTagName("*");
		    i=items.length;
			while (i > 0) {
				i--;
				elem = items[i];
				if(elem && elem.id && elem.id.indexOf('nitro_elem_') == 0)	{
					//replacement in progress
					continue;
				}
				var params = "";
				var addUserId = false;
				var newElem = null;
				if (this.isNitroNode(elem, "request")) {
					var attrs = elem.attributes;
					for(var j=attrs.length-1; j>=0; j--) {
						if (attrs[j].name.toLowerCase() == "adduserid") {
							addUserId = true;
						}
						else if (this.isNitroParameter(attrs[j])) {
							var val = attrs[j].value;
							if(val.indexOf('eval(') != -1) {
								val = val.substring(6);
								val = val.substring(0,val.length-2);
								val = eval(val);
							}
							params += "&" + attrs[j].name + "=" + val;
						}
					}
					elem.id = "nitro_elem_" + Nitro.divCounter;
					this.callAPI(params, "Nitro.processNMLCall", this.counterId + "|" + elem.id, addUserId);	
					Nitro.divCounter++;
					nodeWasUpdated = true;
				}
				else if (this.isNitroNode(elem, "widget")) {
					var ownerId = this.getElemAttribute(elem,"ownerId");
					var name = elem.getAttribute("name");
					if (name == null || name == "") {
	  					continue;
					}
					if (ownerId == "") {
						ownerId = null;
					}
					elem.id = "nitro_elem_" + Nitro.divCounter;
					Nitro.divCounter++;

					if(!this.args)
						this.args = [];
					this.args[elem.id] = {};
					
					for(var i = 0; i < elem.attributes.length; i++) {
						var a = elem.attributes.item(i);
						if(a.name)
							eval("this.args[elem.id]['"+a.name+"']='"+a.value+"'");
					}					

					if(!this.args[elem.id].userId) 
						this.args[elem.id].userId = this.args[elem.id].userid ? this.args[elem.id].userid : this.jsConnector.connectionParams.userId;
						
					this.embedWidget(name, elem.id, ownerId);
					nodeWasUpdated = true;
				}
				else if (this.isNitroNode(elem, "avatar-full") || this.isNitroNode(elem, "avatar-thumb")) {
					var userId = this.jsConnector.connectionParams.userId;
					var ownerId = this.getElemAttribute(elem,"ownerId");
					if (ownerId != "" && ownerId != null) {
						userId = ownerId;
					}					
					var size = elem.getAttribute("size");
					var catalog = elem.getAttribute("catalog");
					var src = nitroProtocol + "://dynamic.bunchball.net/assets/avatar/" + this.connectionParams.apiKey + "/" + userId + "/";
					if (this.isNitroNode(elem, "avatar-full")) {
						src = src + "full.png";
					}
					else {
						src = src + "thumb.png";	
					}
					src = src + "?ts=" + (new Date()).getTime();
					if (size != null) {
						src = src + "&size=" + size;	
					}
					if (catalog != null) {
						src = src + "&catalog=" + catalog;	
					}
					this.replaceWithImage(src, elem);
					nodeWasUpdated = true;
				}	
				else if (this.isNitroNode(elem, "canvas-flat")) {
					var userId = this.jsConnector.connectionParams.userId;
					var ownerId = this.getElemAttribute(elem,"ownerId");
					if (ownerId != "" && ownerId != null) {
						userId = ownerId;
					}										
					var size = elem.getAttribute("size");
					var catalog = elem.getAttribute("catalog");
					var src = nitroProtocol + "://dynamic.bunchball.net/assets/canvas/" + this.connectionParams.apiKey + "/" + userId + ".jpg";
					src = src + "?ts=" + (new Date()).getTime();
					if (size != null) {
						src = src + "&size=" + size;	
					}
					if (catalog != null) {
						src = src + "&catalog=" + catalog;	
					}
					this.replaceWithImage(src, elem);
					nodeWasUpdated = true;
				}	
				else if (this.isNitroNode(elem, "notifications-feed")) {
					var returnCount = this.getElemAttribute(elem, "returnCount");
					var userIds = this.getElemAttribute(elem, "userIds");
					elem.id = "nitro_elem_" + Nitro.divCounter;
					Nitro.divCounter++;			
					NitroNotifier.jsConnector = this.jsConnector;
					NitroNotifier.getNotificationsFeed(connectionParams, "Nitro.processNotificationsFeedNMLCall", this.counterId + "|" + elem.id, userIds, returnCount);
					nodeWasUpdated = true;
				}
			}
			if(primaryNMLThread || !this.primaryNMLThreadStarted) {
				this.primaryNMLThreadStarted = true;
				var _self = this;
				if(!this.nmlRefreshTimeout)
					this.nmlRefreshTimeout = 500;			
				if(nodeWasUpdated)
					this.nmlRefreshTimeout = 500;
				else
					this.nmlRefreshTimeout*= 3;
				if(this.nmlRefreshTimeout > 120000)
					this.nmlRefreshTimeout = 120000;				

				setTimeout(function(){
					_self.refreshNML(true);
				}, this.nmlRefreshTimeout);
			}
		}

		Nitro.updateTwitterSettingsAndHideNotification = function(data, token) {
			var instance = Nitro.getInstanceForResponse(data,token);					
			instance.twitterEnabled = null;
			Nitro.updateTwitterSettings(data, token);
		}

		Nitro.updateTwitterSettings = function(data, token) {
			var instance = Nitro.getInstanceForResponse(data,token);					
			
			//first timers
			if(data.Nitro.Twitter.requiresLogin) {
				twitterLoginUrl = data.Nitro.Twitter.requiresLogin				
			}
					
			var twitterSlider = document.getElementById('nitro_statusUpdater_twitter');
					
			if(data.Nitro.Twitter.enabled == "false") {
				twitterSlider.style.backgroundPosition = "-40px 0px";
				CurrentTwitterNitroInstanceId = instance.counterId;
				instance.twitterEnabled = false;
				if(twitterLoginUrl != null)
					twitterSlider.onclick = function(){window.open(twitterLoginUrl);CurrentTwitterStatusRefreshCounter = 0;Nitro.checkTwitterStatus();};
				else
					twitterSlider.onclick = function(){Nitro.callAPI('method=user.twitter.enable','Nitro.updateTwitterSettings',instance.counterId)};
			}else {
				twitterSlider.style.backgroundPosition = "0px 0px";					
				twitterSlider.onclick = function(){Nitro.callAPI('method=user.twitter.disable','Nitro.updateTwitterSettings',instance.counterId)};
				instance.twitterEnabled = true;
				CurrentTwitterNitroInstanceId = null;
				twitterLoginUrl = null;
			}
		}	

		Nitro.updateFacebookSettings = function(data, token) {
			var instance = Nitro.getInstanceForResponse(data,token);
			
			//first timers
			if(data.Nitro.Facebook.requiresLogin) {
				facebookLoginUrl = data.Nitro.Facebook.requiresLogin
			}
					
			var facebookSlider = document.getElementById('nitro_statusUpdater_facebook');
					
			if(data.Nitro.Facebook.enabled == "false") {
				facebookSlider.style.backgroundPosition = "-40px 0px";
				CurrentFacebookNitroInstanceId = instance.counterId;
				instance.facebookEnabled = false;
				if(facebookLoginUrl != null)
					facebookSlider.onclick = function(){window.open(facebookLoginUrl);CurrentFacebookStatusRefreshCounter = 0;Nitro.checkFacebookStatus();};
				else
					Nitro.callAPI('method=user.facebook.status','Nitro.updateFacebookSettings',instance.counterId);				
			}else {
				facebookSlider.style.backgroundPosition = "0px 0px";					
				facebookSlider.onclick = function(){Nitro.callAPI('method=user.facebook.disable','Nitro.updateFacebookSettings',instance.counterId)};
				instance.facebookEnabled = true;
				CurrentFacebookNitroInstanceId = null;
			}
		}

		var CurrentFacebookNitroInstanceId = null;
		var CurrentFacebookStatusRefreshCounter = 0;
		Nitro.checkFacebookStatus = function() {
			if(CurrentFacebookNitroInstanceId != null && CurrentFacebookStatusRefreshCounter < 50) {
				Nitro.callAPI('method=user.facebook.status','Nitro.updateFacebookSettings',CurrentFacebookNitroInstanceId);
				setTimeout("Nitro.checkFacebookStatus()", 2500);
				CurrentFacebookStatusRefreshCounter++;
			}
		}
		var CurrentTwitterNitroInstanceId = null;
		var CurrentTwitterStatusRefreshCounter = 0;
		Nitro.checkTwitterStatus = function() {
			if(CurrentTwitterNitroInstanceId != null && CurrentTwitterStatusRefreshCounter < 50) {
				Nitro.callAPI('method=user.twitter.status','Nitro.updateTwitterSettings',CurrentTwitterNitroInstanceId);
				setTimeout("Nitro.checkTwitterStatus()", 2500);
				CurrentTwitterStatusRefreshCounter++;
			}
		}		
		
		Nitro.processNotificationsFeedNMLCall = function(notifications, token) {
			var cId = token.split("|")[0];
			var instance = null;
			for (var i = 0; i < Nitro.instances.length; i++) {
				if (Nitro.instances[i].counterId == cId) {
					instance = Nitro.instances[i];
				}
			}
			instance.replaceNML(null, token.split("|")[1], notifications);
		}

		Nitro.processNMLCall = function(data, token) {
			var cId = token.split("|")[0];
			var instance = Nitro.getInstanceForResponse(data,cId);			
			instance.replaceNML(data, token.split("|")[1]);
		}
				
		this.replaceNML = function(data, divId, notifications) {
			var elem = document.getElementById(divId);
			var textReplacements = new Array();
			var imgReplacements = new Array();
			var htmlDivReplacements = new Array();
			var htmlSpanReplacements = new Array();			
			
			var children = elem.getElementsByTagName("*");
			var childToRepeat = null;
			for (var i = 0; i < children.length; i++) {  
				var child = children[i];
				if (child.getAttribute("nitro_repeat") != null) {
					childToRepeat = child;
					break;
				}
			}
			
			if (childToRepeat != null) {
				var numRows = this.getElemAttribute(elem, "returnCount");
				if (numRows == null) {
					numRows = 10;
				}
				for (var r=0; r < numRows;r++) {
					var clone = childToRepeat.cloneNode(true);									
					var cloneChildren = clone.getElementsByTagName("*");
					for (var c=0; c < cloneChildren.length; c++) {
						var setRank = false;
						if (this.isNitroNode(cloneChildren[c], "response") || this.isNitroNode(cloneChildren[c], "notification")) {
							cloneChildren[c].setAttribute("rank", r);
						}
					}
					childToRepeat.parentNode.insertBefore(clone, childToRepeat);
				}
				childToRepeat.parentNode.removeChild(childToRepeat);
			}
			
			for (var i = 0; i < children.length; i++) {  
				var child = children[i];
				if (this.isNitroNode(child, "notification")) {			
					var rank = child.getAttribute("rank");  
					if (rank == null) { 
						rank = 0; 
					}
					if (typeof (notifications[rank]) == "undefined") {
						continue;
					}
					this.addNodeReplacement(htmlDivReplacements, child, notifications[rank].html);
				}				
				else if (this.isNitroNode(child, "response")) {
					var accessor = child.getAttribute("data");
					if (accessor == "rank") {
						var rank = child.getAttribute("rank");  
						if (rank == null) { 
							rank = 0; 
						}
						this.addNodeReplacement(textReplacements, child, parseInt(rank) + 1);
						continue;
					}
					accessor = accessor.split(".");
					var value = data.Nitro;
					for (var a = 0; a < accessor.length; a++) {
						var curr = accessor[a];
						var arrI = curr.indexOf("[%]");
						if (arrI > -1) {
							var rank = child.getAttribute("rank");  
							if (rank == null) { 
								rank = 0; 
							}
							value = value[curr.substring(0, arrI)];
							if (typeof value == "undefined") {break;}
							value = this.makeArray(value);
							value = value[rank];
						}
						else {
							value = value[curr];
						}
						if (typeof value == "undefined") {break;}
					}
					if (typeof value == "undefined") {continue;}
					
					var postProcess = this.getElemAttribute(child, "postProcess");
					if (postProcess != null) {
						value = eval( postProcess + "(value)" );
					}
					
					if (child.getAttribute("type") != null && child.getAttribute("type") == "date") {
						var date = new Date(parseInt(value) * 1000);
						this.addNodeReplacement(textReplacements, child, date.toLocaleString());	
					}
					else if (child.getAttribute("type") != null && child.getAttribute("type") == "img") {
						this.addNodeReplacement(imgReplacements, child, value);
					}
					else if (child.getAttribute("type") != null && (child.getAttribute("type") == "avatar-full" || child.getAttribute("type") == "avatar-thumb")) {
					    var src = nitroProtocol + "://dynamic.bunchball.net/assets/avatar/" + this.connectionParams.apiKey + "/" + value + "/";
						if (child.getAttribute("type") == "avatar-full") {
							src = src + "full.png";
						}
						else {
							src = src + "thumb.png";	
						}	
						this.addNodeReplacement(imgReplacements, child, src);
					}
					else if (child.getAttribute("type") != null && child.getAttribute("type") == "canvas-flat") {
					    var src = nitroProtocol + "://dynamic.bunchball.net/assets/canvas/" + this.connectionParams.apiKey + "/" + value + ".jpg";
						this.addNodeReplacement(imgReplacements, child, src);
					}
					else if (child.getAttribute("type") != null && child.getAttribute("type") == "html") {
						this.addNodeReplacement(htmlSpanReplacements, child, value);
					}
					else {
						this.addNodeReplacement(textReplacements, child, value);								
					}
				}
			}		
			
			for (var i = 0; i < textReplacements.length; i++) {
				this.replaceWithText(textReplacements[i].value, textReplacements[i].elem);
			}
			for (var i = 0; i < htmlDivReplacements.length; i++) {
				this.replaceWithHtml(htmlDivReplacements[i].value, htmlDivReplacements[i].elem, "div");
			}
			for (var i = 0; i < htmlSpanReplacements.length; i++) {
				this.replaceWithHtml(htmlSpanReplacements[i].value, htmlSpanReplacements[i].elem, "span");
			}
			for (var i = 0; i < imgReplacements.length; i++) {
				this.replaceWithImage(imgReplacements[i].value, imgReplacements[i].elem);
			}
			
			while (elem.firstChild)
			{
				elem.parentNode.insertBefore(elem.firstChild, elem);
			}	
			elem.parentNode.removeChild(elem);				
		}
		
		this.isNitroNode = function(elem, type){
			if (!elem || !elem.nodeName) {
				return false;	
			}
			return (elem.nodeName.toUpperCase() == "NITRO:" + type.toUpperCase() || elem.nodeName.toUpperCase() == type.toUpperCase());
		}
		this.isNitroParameter = function(attr) {
			if (attr.value != null && attr.value != "null" && attr.value != "") {
				if (attr.name in {'id':'', 'tabIndex':'','disabled':'', 'contentEditable':'', 'hideFocus':''}) {
					return false;
				}
				if (attr.name.indexOf("nml_") == 0) {
					return false;
				}
				return true;
			}	
		}
		this.getElemAttribute = function(elem, attr) {
			if (elem.getAttribute(attr) != null) {
				return elem.getAttribute(attr);					
			}
			if (elem.getAttribute(attr.toLowerCase()) != null) {
				return elem.getAttribute(attr.toLowerCase());					
			}			
			return null;
		}
		this.addNodeReplacement = function(replacementsArr, elem, value) {
			if (typeof value == "undefined") {
				value = "";
			}
			replacementsArr.push({value : value, elem : elem});
		}
		this.replaceWithText = function(text, elem) {
			if (text != null && typeof text != "undefined") {
				var newNode = document.createTextNode(text);
				elem.parentNode.replaceChild(newNode, elem);
			}
		}
		this.replaceWithImage = function(url, elem) {
			if (url != null && typeof url != "undefined") {
				var newNode = document.createElement('img');
				newNode.setAttribute("src", url);
				
				var attrs = elem.attributes;
				for(var j=attrs.length-1; j>=0; j--) {
					newNode.setAttribute(attrs[j].name, attrs[j].value);
				}
				elem.parentNode.replaceChild(newNode, elem);
			}
		}
		this.replaceWithHtml = function(html, elem, divOrSpan) {
			if (html != null && typeof html != "undefined") {
				var newNode = document.createElement(divOrSpan);
				newNode.innerHTML = html;
				elem.parentNode.replaceChild(newNode, elem);
			}
		}
		Nitro.onBuyPointsClick = function(pointCategory) {
		
			if (typeof Nitro_Overlay != "undefined") {
				nitroOverlay.reset();
			}
		
			var nitro = Nitro.getInstanceForCounter(0);
			if(nitro != null) {
				var params = new Object();
				params.pointCategory = pointCategory;
				nitro.showPaymentDialog(params);
			}
		}
		this.showPaymentDialog = function(params) {
			if (params.pointCategory == null) {
				return;	
			}
			if (params.useDefaultStyle == null) {
				params.useDefaultStyle = true;
			}
			if (params.paymentWindowTarget == null) {
				params.paymentWindowTarget = "_blank";
			}
			if(typeof nitroToolbar != "undefined")
				nitroToolbar.reset();
			this.paymentDialogParams = params;
			this.jsConnector.callAPI("method=site.getPaymentOptions&verifyPointCategory=true&pointCategory=" + this.paymentDialogParams.pointCategory, "Nitro.processPaymentOptions", this.counterId, true);
		}
		
		Nitro.processPointsBalance = function(data, token) {
			var instance = Nitro.getInstanceForResponse(data, token);		
			instance.updatePaymentDialogPointsBalance(data);
		}
		Nitro.processPaymentOptions = function(data, token) {
			var instance = Nitro.getInstanceForResponse(data, token);			
			instance.showPaymentDialogWithOptions(data);
		}
		Nitro.reloadWidgets = function() {
			var isIE = navigator.appName.indexOf("Microsoft") != -1;
			for(var i in nitroWidget.embedNames) {
				var flashName = nitroWidget.embedNames[i];
				if(Nitro.isString(flashName) && flashName.toLowerCase().indexOf('cookie') >= 0)
					continue;
				if(Nitro.isString(flashName) && flashName.toLowerCase().indexOf('poker') >= 0)
					continue;					
				var flashObject = swfobject.getObjectById(flashName);
				if(flashObject) {
					var prevNode = flashObject.prevSibling;
					var parentNode = flashObject.parentNode;
					parentNode.removeChild(flashObject);
					if(prevNode == null) {
						parentNode.appendChild(flashObject);
					}else {
						parentNode.insertBefore(flashObject,prevNode.nextSibling);
					}
					if(isIE && document.getElementById('nitroAvatar')) {
						setTimeout("document.getElementById('nitroAvatar').focus()",2500);					
					}else {
						//document.getElementById(flashName).focus();
					}
				}
			}
		}
		this.updatePaymentDialogPointsBalance = function(data) {
			var balance = data.Nitro.Balance.pointCategories.PointCategory.points;
			var iconUrl = data.Nitro.Balance.pointCategories.PointCategory.iconUrl;
			var balanceDiv = document.getElementById('nitro_payment_dialog_points_balance');
			var iconImg = document.getElementById('nitro_payment_dialog_points_balance_pc');//!!! nitro_payment_dialog_points_icon
			balanceDiv.innerHTML = this.addCommas(balance);
			if (iconUrl && iconUrl.length > 0) {
				if(iconUrl.indexOf("swf") != -1) {
	
					var params = {
						base:				iconUrl.substr(0,iconUrl.lastIndexOf('/')),
						wmode:				"transparent",
						allowscriptaccess:	"always",
						allownetworking:	"all"	
					};
					
					var attributes = {
						id:					"nitro_payment_dialog_points_icon_swf",
						name:				"nitro_payment_dialog_points_icon_swf",
						style:				"background:#F0F0F0"
					};
					iconImg.innerHTML = "";
					nitroWidget.embedSWF(iconUrl, "nitro_payment_dialog_points_balance_pc", 20, 20, {}, params, attributes);
				}else {
					iconImg.innerHTML = "<img src='" + iconUrl + "' width='20' height='20' vertical-align='bottom'>";
				}
			}
		}
		this.showConfirmPaymentFrame = function() {
			var backgroundFrame = document.getElementById('nitro_payment_dialog_background_frame');
			this.addClass(backgroundFrame,'nitro_payment_dialog_container_small');			
			backgroundFrame.innerHTML = "<div style='margin-top:50px;width:100%;text-align:center'>Welcome back! Click \"Continue\" once you've finished.</div>";
			backgroundFrame.innerHTML+= '<a class="nitro_payment_dialog_cancel_button" href="#" onclick="nitro.closePaymentDialog();" onmouseout="nitro.removeClass(this,\'nitro_payment_dialog_cancel_button_hover\')" onmouseover="nitro.addClass(this,\'nitro_payment_dialog_cancel_button_hover\')" ></a>';			
			backgroundFrame.innerHTML+= '<a class="nitro_payment_dialog_continue_button" href="#" onclick="Nitro.reloadWidgets();nitro.closePaymentDialog();" onmouseout="nitro.removeClass(this,\'nitro_payment_dialog_continue_button_hover\')" onmouseover="nitro.addClass(this,\'nitro_payment_dialog_continue_button_hover\')" ></a>';
			this.toggleBackgroundFrame(true);
			if(!backgroundFrame.innerHTML) {
				//fix for chrome
				setTimeout("nitro.showConfirmPaymentFrame()",500);
				return;
			}			
		}		
		this.closePaymentDialog = function() {
			if(this.checkPaymentsDialogStatusTimer != null) {	
				clearTimeout(this.checkPaymentsDialogStatusTimer);
				this.checkPaymentsDialogStatusTimer = null;
			}
			if(document.getElementById("nitro_payment_dialog_container")) {
				document.body.removeChild(document.getElementById("nitro_payment_dialog_container"));
				document.body.removeChild(document.getElementById("nitro_payment_dialog_background_frame"));
				var mask = document.getElementById("nitro_payment_dialog_mask");
				if (mask != null) {
					document.body.removeChild(mask);
				}
				if(typeof nitroToolbar != "undefined") {
					nitroToolbar.reset();
					nitroToolbar.drawerOpen['nitroToolbar_drawer_payments'] = false;				
				}
			}	
		}
		this.onPaymentClicked = function() {
			for (var i = 0; i < document.nitroPaymentOptions.po.length; i ++) {
				this.removeClass(document.getElementById('nitro_tr_po_'+i),'nitro_payment_dialog_selected_field');
				if (document.nitroPaymentOptions.po[i].checked) {
					// paypal/credit card
					if(document.nitroPaypalForm) {
						document.nitroPaypalForm.amount.value = document.nitroPaymentOptions.po[i].value.split("|")[1];	
						document.nitroPaypalForm.item_name.value = document.nitroPaymentOptions.po[i].value.split("|")[0] + ' ' + this.paymentDialogParams.pointCategory;
					}					
					this.addClass(document.getElementById('nitro_tr_po_'+i),'nitro_payment_dialog_selected_field');
				}
			}
			this.removeClass(document.getElementById('nitroPaymentOptions'),'nitro_payment_dialog_obscured');				
			this.removeClass(document.getElementById('nitro_payments_dialog_method_content'),'nitro_payment_dialog_obscured');
		}
		this.resetPaymentOptions = function() {
			for (var i = 0; i < document.nitroPaymentOptions.po.length; i ++) {
				document.nitroPaymentOptions.po[i].checked = false;
				this.removeClass(document.getElementById('nitro_tr_po_'+i),'nitro_payment_dialog_selected_field');
				document.getElementById('nitro_tr_po_'+i).style.visibility = 'visible';
				if(this.hidablePaymentOptions['nitro_tr_po_'+i] && this.selectedPaymentMethod=='boku') {
					document.getElementById('nitro_tr_po_'+i).style.visibility = 'hidden';
				}
			}
		}
		this.getBokuFrame = function(img, price, desc) {
			var backgroundFrame = document.getElementById('nitro_payment_dialog_background_frame');
			backgroundFrame.innerHTML = "<br><br><br><center><h3>Loading...</h3></center>";

			params = "method=user.payments.status&image=" + encodeURIComponent(img) + "&description=" + encodeURIComponent(desc) + "&price=" + price + "&forceNewBuyButton=true" + (typeof nitroToolbar != "undefined" && nitroToolbar.args.siteId ? '&toolbarSiteId='+nitroToolbar.args.siteId+'&affl='+nitroToolbar.args.siteId : '');
			this.callAPI(params,'nitro.setBokuFrame');
		}
		this.setBokuFrame = function(data, token) {
			var backgroundFrame = document.getElementById('nitro_payment_dialog_background_frame');
			backgroundFrame.innerHTML = "<iframe id='nitro_payment_dialog_background_iframe' src='" + data.Nitro.paymentMethods.Boku.buyButton + "'></iframe>";
			backgroundFrame.innerHTML+= '<a class="nitro_payment_dialog_back_button" href="#" onclick="nitro.toggleBackgroundFrame()" onmouseout="nitro.removeClass(this,\'nitro_payment_dialog_back_button_hover\')" onmouseover="nitro.addClass(this,\'nitro_payment_dialog_back_button_hover\')" ></a>';
			backgroundFrame.innerHTML+= '<p class="nitro_payment_dialog_terms_message">By clicking "Purchase" you agree to the <a href="'+nitroProtocol+'://www.bunchball.com/about/vgtos.shtml" target="_blank">Bunchball Virtual Goods Terms of Service</a></p> \
										<div onclick="window.open(\''+nitroProtocol+'://www.bunchball.com/about/vgtos.shtml\')" class="nitro_payment_dialog_poweredby">&nbsp;</div>';
		}
		Nitro.closeNotification = function(elem) {
			if(elem == null) return;
			if(elem.parentNode.className == 'nitro_notices')
				elem.parentNode.removeChild(elem);
			else
				Nitro.closeNotification(elem.parentNode);
		}
		
		var checkPaymentsDialogStatusTimer = null;
		Nitro.checkPaymentsDialogStatus = function(data, token) {

			var instance = Nitro.getInstanceForCounter(0);			
			if(data == null) {
				if(instance.checkPaymentsDialogStatusTimer == null) 
					instance.checkPaymentsDialogStatusTimer = setTimeout("Nitro.callAPI('method=user.payments.status','Nitro.checkPaymentsDialogStatus',0)",2500);
				return;
			}

			if(data.Nitro.paymentMethods.Boku.status == 'success') {
				instance.showConfirmPaymentFrame();
			}else if(data.Nitro.paymentMethods.Boku.status == 'failure') {
				instance.showConfirmPaymentFrame();
			}else {
				instance.checkPaymentsDialogStatusTimer = setTimeout("Nitro.callAPI('method=user.payments.status','Nitro.checkPaymentsDialogStatus',0)",2000);
			}
		}
		
		this.injectPaymentsDialogContent = function(button,content) {
			if(button != null) {
				var elems = this.getElementForClass('nitro_payment_dialog_method');
				for(var i = 0; i < elems.length; i++) {
					this.removeClass(elems[i],'nitro_payment_dialog_method_active');
				}
				this.addClass(button,'nitro_payment_dialog_method_active');

				var div = document.getElementById('nitro_payments_dialog_method_content');
				div.innerHTML = content;
				if(button.id == "nitro_surveyMethodButton") {
					this.removeClass(document.getElementById('nitro_payments_dialog_method_content'),'nitro_payment_dialog_obscured');				
					this.addClass(document.getElementById('nitroPaymentOptions'),'nitro_payment_dialog_obscured');
				}else {
					this.removeClass(document.getElementById('nitroPaymentOptions'),'nitro_payment_dialog_obscured');
					this.addClass(document.getElementById('nitro_payments_dialog_method_content'),'nitro_payment_dialog_obscured');				
				}					
			}
			this.resetPaymentOptions();
			
		}
		
		this.showBokuFrame = function() {
			for (var i = 0; i < document.nitroPaymentOptions.po.length; i ++) {
				if (document.nitroPaymentOptions.po[i].checked) {
					var img = this.paymentOptions.paymentProductUrl;
					var price = document.nitroPaymentOptions.po[i].value.split("|")[1];
					var desc = document.nitroPaymentOptions.po[i].value.split("|")[0] + ' ' + this.paymentDialogParams.pointCategory;
					this.getBokuFrame(img, price, desc);
					break;
				}
			}
			this.toggleBackgroundFrame(true);
		}
		this.showOfferpalFrame = function() {			
			var backgroundFrame = document.getElementById('nitro_payment_dialog_background_frame');
			backgroundFrame.innerHTML = "<iframe id='nitro_payment_dialog_background_iframe_wide' src='" + this.paymentMethods.Offerpal.buyButton + (typeof nitroToolbar != "undefined" && nitroToolbar.args.siteId ? '&affl='+nitroToolbar.args.siteId : '') + "'></iframe>";
			backgroundFrame.innerHTML+= '<p class="nitro_payment_dialog_background_frame_title">Complete Surveys to Earn ' + this.paymentDialogParams.pointCategory + '</p>';
			backgroundFrame.innerHTML+= '<a class="nitro_payment_dialog_back_button" style="right:35px" href="#" onclick="nitro.toggleBackgroundFrame()" onmouseout="nitro.removeClass(this,\'nitro_payment_dialog_back_button_hover\')" onmouseover="nitro.addClass(this,\'nitro_payment_dialog_back_button_hover\')" ></a>';
			backgroundFrame.innerHTML+= '<a class="nitro_payment_dialog_cancel_button" href="#" onclick="Nitro.reloadWidgets();nitro.closePaymentDialog();" onmouseout="nitro.removeClass(this,\'nitro_payment_dialog_cancel_button_hover\')" onmouseover="nitro.addClass(this,\'nitro_payment_dialog_cancel_button_hover\')" ></a>';
			backgroundFrame.innerHTML+= '<p class="nitro_payment_dialog_terms_message">By clicking "Purchase" you agree to the <a href="'+nitroProtocol+'://www.bunchball.com/about/vgtos.shtml" target="_blank">Bunchball Virtual Goods Terms of Service</a></p> \
										<div onclick="window.open(\''+nitroProtocol+'://www.bunchball.com/about/vgtos.shtml\')" class="nitro_payment_dialog_poweredby">&nbsp;</div>';

			this.toggleBackgroundFrame(true);
		}
		
		this.toggleBackgroundFrame = function(show) {
			var backgroundFrame = document.getElementById('nitro_payment_dialog_background_frame');
			var light = document.getElementById('nitro_payment_dialog_container');
			if(show) {
				backgroundFrame.style.display = "block";
				light.style.display = "none";
			}else {
				backgroundFrame.style.display = "none";
				light.style.display = "block";
			}
		}
		
		this.addCommas = function(nStr) {
			nStr += '';
			x = nStr.split('.');
			x1 = x[0];
			x2 = x.length > 1 ? '.' + x[1] : '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
			}
			return x1 + x2;
		}
		
		this.showPaymentDialogWithOptions = function(data) {
			
			var optionsHTML = "";
			var amountHTML = "";
			var methodsHTML = "";
			var itemHTML = "";
			this.paymentOptions = data.Nitro.paymentOptions;
			this.paymentMethods = data.Nitro.paymentMethods;
			var optionsArray = this.makeArray(data.Nitro.paymentOptions.PaymentOption);
			var numOptions = 0;
			var numMethods = 0;
			if (optionsArray != null) {
				numOptions = optionsArray.length;
				optionsHTML = "<table class='nitro_payment_dialog_options_table' cellspacing=0 cellpadding=0><tr><th style='width:30px'>&nbsp;</th><th style='width:90px'>Price</th><th>Package</th></tr>\n";
				for (var i = 0; i < optionsArray.length; i++) {
					var cost = parseFloat(optionsArray[i].cost).toFixed(2);
					if(cost > 29.99) {
						if(!this.hidablePaymentOptions)
							this.hidablePaymentOptions = [];
						this.hidablePaymentOptions["nitro_tr_po_"+i] = true;
					}
					optionsHTML+= '<tr id="nitro_tr_po_'+i+'" onclick="this.childNodes[0].childNodes[0].checked=true;nitro.onPaymentClicked()" onmouseout="nitro.removeClass(this,\'nitro_payment_dialog_selected_field_hover\')" onmouseover="if(!this.childNodes[0].childNodes[0].checked) nitro.addClass(this,\'nitro_payment_dialog_selected_field_hover\')" >' +
									'<td style="border:0px"><input class="nitro_payment_dialog_choice" type="radio" name="po" id="nitro_po_'+i+'" value="' + optionsArray[i].quantity + '|' + cost + '" onClick="nitro.onPaymentClicked()" ' + '></td>' + 
									'<td>$' + cost + '</td>' +
									'<td>' + nitro.addCommas(optionsArray[i].quantity) + ' ' + this.paymentDialogParams.pointCategory + '</td>' +
								  '</tr>\n';
				}
				optionsHTML+= "</table>\n";
				if (optionsArray.length > 0) {
					var cost = parseFloat(optionsArray[0].cost).toFixed(2);					
					amountHTML = '<input type="hidden" name="amount" value="' + cost  + '">';
					itemHTML = '<input type="hidden" name="item_name" value="' + optionsArray[0].quantity + ' ' + this.paymentDialogParams.pointCategory + '">';	
				}
			}
	
			var error = false;
			if (optionsHTML == "") {
				optionsHTML = "No payment options configured in the Admin UI or invalid pointCategory.";
				error = true;
			}
			var paymentMessage = "Buy points";
			if (typeof data.Nitro.paymentOptions.paymentMessage != "undefined" && data.Nitro.paymentOptions.paymentMessage != "") {
				paymentMessage = data.Nitro.paymentOptions.paymentMessage;	
			}		
			var imageUrl = "";
			if (typeof data.Nitro.paymentOptions.paymentLogoUrl != "undefined" && data.Nitro.paymentOptions.paymentLogoUrl != "") {
				imageUrl = '<input type="hidden" name="image_url" value="' + data.Nitro.paymentOptions.paymentLogoUrl + '">';
			}
			if (this.paymentDialogParams.logoUrl != null && this.paymentDialogParams.logoUrl != "") {
				imageUrl = '<input type="hidden" name="image_url" value="' + this.paymentDialogParams.logoUrl + '">';	
			}
			var returnUrl = "";
			if (this.paymentDialogParams.returnUrl != null && this.paymentDialogParams.returnUrl != "") {
				returnUrl = '<input type="hidden" name="return" value="' + this.paymentDialogParams.returnUrl + '">';	
			}
			var cancelReturnUrl = "";
			if (this.paymentDialogParams.cancelReturnUrl != null && this.paymentDialogParams.cancelReturnUrl != "") {
				cancelReturnUrl = '<input type="hidden" name="cancel_return" value="' + this.paymentDialogParams.cancelReturnUrl + '">';	
			}
			var returnButtonText = "";
			if (this.paymentDialogParams.returnButtonText != null && this.paymentDialogParams.returnButtonText != "") {
				returnButtonText = '<input type="hidden" name="cbt" value="' + this.paymentDialogParams.returnButtonText + '">';	
			}
			
			var onPaypalClick = "nitroPaypalForm.submit();nitro.showConfirmPaymentFrame()";
			if (this.paymentDialogParams.paymentWindowTarget == "_self" || this.paymentDialogParams.paymentWindowTarget == "_top") {
				onPaypalClick = "nitroPaypalForm.submit();";	
			}						
									
			var ipn_url = this.connectionParams.server;
			ipn_url = ipn_url.substring(0, ipn_url.indexOf('/json')) + '/premiumCreditProcessor';
			var paypalServer = "https://www.paypal.com/cgi-bin/webscr";
			var pixelUrl = "https://www.paypal.com/en_US/i/scr/pixel.gif";
			var businessId = "S5GDMZW4PTLPQ";
			
			var testing = 0;
			if (testing) {
				paypalServer = "https://www.sandbox.paypal.com/cgi-bin/webscr";
				pixelUrl = "https://www.sandbox.paypal.com/en_US/i/scr/pixel.gif";
				businessId = "UWWDCGQCS7CE8";
			}
			
			var paypal_content = "<div style=\\\'margin:0px 5px 5px 10px\\\'>" + 
									"<img style=\\\'margin-right:5px\\\' src=\\\'"+nitroProtocol+"://assets.bunchball.net/widgets/payments/" + nitroLibsVersion + "/Padlock.png\\\'>" +
									"<span>Step 3: Checkout with PayPal</span>" +
								"</div>" +
				'<form name="nitroPaypalForm" action="' + paypalServer + '" method="post" target="' + this.paymentDialogParams.paymentWindowTarget + '"> \
				<input type="hidden" name="cmd" value="_xclick"> \
				<input type="hidden" name="business" value="' + businessId + '"> \
				<input type="hidden" name="lc" value="US"> \
				<input type="hidden" name="button_subtype" value="products"> \
				<input type="hidden" name="no_note" value="1"> \
				<input type="hidden" name="no_shipping" value="1"> \
				<input type="hidden" name="currency_code" value="USD">' + 
				imageUrl + returnUrl + cancelReturnUrl + returnButtonText +
				'<input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted"> \
				<input type="hidden" name="notify_url" value="' + ipn_url + '"> \
				<input type="hidden" name="quantity" value="1">' +
				amountHTML + itemHTML + 
				'<input type="hidden" name="custom" value="'+(typeof nitroToolbar != "undefined" && nitroToolbar.args.siteId ? 'toolbarSiteId='+nitroToolbar.args.siteId+'&affl='+nitroToolbar.args.siteId+'&' : '')+'apiKey=' + this.connectionParams.apiKey + '&userId=' + this.jsConnector.connectionParams.userId + '&pointCategory=' + this.paymentDialogParams.pointCategory + '">' +
				'<div style="font-weight:normal;padding:10px;">' +
					'<h4>Use your Paypal account to buy ' + this.paymentDialogParams.pointCategory + '!</h4>' +
					'When you click &quot;Next&quot; below, a new window will open to complete your order securely through PayPal.<br><br>' +
				'</div> ' +
				'<input type="button" class="nitro_payment_dialog_next_button" onclick="' + onPaypalClick + '" > \
				</form>';
			paypal_content = paypal_content.replace(/\"/g,"\\\'");
			
			var boku_content = "<div style=\\\'margin:0px 5px 5px 10px\\\'>" + 
									"<img style=\\\'margin-right:5px\\\' src=\\\'"+nitroProtocol+"://assets.bunchball.net/widgets/payments/" + nitroLibsVersion + "/Padlock.png\\\'>" +
									"<span>Step 3: Pay with Your Mobile Phone</span>" +
								"</div>" +
								'<div style=\\\'font-weight:normal;padding:10px;\\\'>' +
									'<h4>Use your Mobile Phone to buy ' + this.paymentDialogParams.pointCategory + '!</h4>' +
									'When you click &quot;Next&quot; below, a window will open to assist you with your secure order through Paymo.<br><br>' +
								'</div> ' +
								"<input type=\\\'button\\\' class=\\\'nitro_payment_dialog_next_button\\\' onclick=\\\'nitro.showBokuFrame()\\\' >";
			var cc_content = paypal_content;
			
			var offerpal_content = "<div style=\\\'margin:0px 5px 5px 10px\\\'>" + 
									"<span>Step 2: Earn "+this.paymentDialogParams.pointCategory+"</span>" +
								"</div>" +
								'<div style=\\\'font-weight:normal;padding:10px;\\\'>' +
									'<h4>Complete surveys and offers to earn ' + this.paymentDialogParams.pointCategory + '!</h4>' +
									'<span>When you click &quot;Next&quot; below, a window will open with surveys and offers you can complete.</span><br><br>' +
								'</div> ' +
								'<input type=\\\'button\\\' class=\\\'nitro_payment_dialog_next_button\\\' onclick=\\\'nitro.showOfferpalFrame()\\\' >';
											
			methodsHTML+= '<a class="nitro_payment_dialog_method" onmouseout="nitro.removeClass(this,\'nitro_payment_dialog_method_hover\')" onmouseover="nitro.addClass(this,\'nitro_payment_dialog_method_hover\')" id="nitro_paypalMethodButton" onclick="nitro.selectedPaymentMethod=\'cc\';nitro.injectPaymentsDialogContent(this,\'' + cc_content + '\')"><div>Credit Card / Paypal</div><img style="margin-top:5px" src="'+nitroProtocol+'://assets.bunchball.net/widgets/payments/' + nitroLibsVersion + '/CreditCards.png"><img src="'+nitroProtocol+'://assets.bunchball.net/widgets/payments/' + nitroLibsVersion + '/PayPalLogo.png"></a>\n';
			methodsHTML+= '<a class="nitro_payment_dialog_method" onmouseout="nitro.removeClass(this,\'nitro_payment_dialog_method_hover\')" onmouseover="nitro.addClass(this,\'nitro_payment_dialog_method_hover\')" id="nitro_bokuMethodButton" onclick="nitro.selectedPaymentMethod=\'boku\';nitro.injectPaymentsDialogContent(this,\'' + boku_content + '\');Nitro.checkPaymentsDialogStatus(null,null);"><div>Mobile Phone</div><img src="'+nitroProtocol+'://assets.bunchball.net/widgets/payments/' + nitroLibsVersion + '/BokuLogo.png"></a>\n';
			if(data.Nitro.paymentMethods.Offerpal) methodsHTML+= '<a class="nitro_payment_dialog_method" onmouseout="nitro.removeClass(this,\'nitro_payment_dialog_method_hover\')" onmouseover="nitro.addClass(this,\'nitro_payment_dialog_method_hover\')" id="nitro_surveyMethodButton" onclick="nitro.selectedPaymentMethod=\'offerpal\';nitro.injectPaymentsDialogContent(this,\'' + offerpal_content + '\')"><div>Earn '+this.paymentDialogParams.pointCategory+'</div><img src="'+nitroProtocol+'://assets.bunchball.net/widgets/payments/' + nitroLibsVersion + '/SurveyIcon.png"></a>\n';
			methodsHTML+= '<br style="clear:both">';
			
			var paymentDialogHTML = '<p class="nitro_payment_dialog_message">' + paymentMessage + '</p> \
									<div class="nitro_payment_dialog_account_balance"> \
										<span>Account Balance: </span> \
										<span id="nitro_payment_dialog_points_balance"></span> \
										<span id="nitro_payment_dialog_points_balance_pc">' + this.paymentDialogParams.pointCategory + '</span> \
									</div> \
									<div class="nitro_payment_dialog_step_full">' +
										'<div style="margin:5px 5px 5px 10px">' + 
											'<img style="margin-right:5px" src="'+nitroProtocol+'://assets.bunchball.net/widgets/payments/' + nitroLibsVersion + '/Padlock.png">' +
											'<span>Step 1: Select A Secure Payment Option...</span>' +
										'</div>\n' +
										methodsHTML + 			
									'</div>\n' + 
									'<br style="clear:both"/>' +
									'<form id="nitroPaymentOptions" name="nitroPaymentOptions" class="nitro_payment_dialog_form nitro_payment_dialog_step_half nitro_payment_dialog_obscured">' + 
										'<div style="margin:5px 5px 5px 27px">' + 
											'<span>Step 2: Choose a Package</span>' + 
										'</div>' + 
										optionsHTML +
									'</form> \
									<div class="nitro_payment_dialog_step_half nitro_payment_dialog_obscured" id="nitro_payments_dialog_method_content" style="float:left">' + 
									'</div>' +
									'<a class="nitro_payment_dialog_cancel_button" href="#" onclick="nitro.closePaymentDialog();" onmouseout="nitro.removeClass(this,\'nitro_payment_dialog_cancel_button_hover\')" onmouseover="nitro.addClass(this,\'nitro_payment_dialog_cancel_button_hover\')" ></a> \
									<p class="nitro_payment_dialog_terms_message">By clicking "Purchase" you agree to the <a href="'+nitroProtocol+'://www.bunchball.com/about/vgtos.shtml" target="_blank">Bunchball Virtual Goods Terms of Service</a></p> \
									<div onclick="window.open(\''+nitroProtocol+'://www.bunchball.com/about/vgtos.shtml\')" class="nitro_payment_dialog_poweredby">&nbsp;</div>\
									<img alt="" border="0" src="' + pixelUrl + '" width="1" height="1"> \
								';
			if (error) {
					paymentDialogHTML = optionsHTML + '<button type="button" onclick="nitro.closePaymentDialog();">Cancel</button>';
			}
			var positioning = "fixed";
			var doMask = true;
			if (!window.XMLHttpRequest || document.compatMode == "BackCompat") {			
				// IE6 or quirks mode
				positioning = "absolute";
			}
			if (!window.XMLHttpRequest) {
				doMask = false;	
			}
			
			if (typeof this.paymentStylesWritten == "undefined" && this.paymentDialogParams.useDefaultStyle) {
				var width = 685;
				var height = 600;
				var bokuFrameWidth = 550;
				var bokuFrameHeight = 490;
				var offerpalFrameWidth = 640;
				var offerpalFrameHeight = 490;
				var width_small = 480;
				var height_small = 200;
				var browser=navigator.appName;

				this.paymentDialogStyles = ".nitro_payment_dialog_container * { \
											  margin: 0; padding: 0; font-family:Helvetica,Verdana; \
											} \
											.nitro_payment_dialog_container { \
											  top:350px; left:50%; margin-top: -" + (height / 2) + "px; height:" + height +"px; \
											  padding-top: 10px; padding-bottom: 10px; position: " + positioning + "; z-index: 1002; overflow: hidden; \
											  background: #dcd8d7 url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/MainWindow.png) no-repeat 0 0; \
											  border: 2px solid #9ea3a9; border-radius: 8px; -moz-border-radius: 8px; -webkit-border-radius: 8px; \
											  border-color: #FFF #9ea3a9 #9ea3a9 #FFF; \
											"+(!window.XMLHttpRequest || document.compatMode == "BackCompat" ? "padding-right: 0px; padding-left: 0px; width: " + (width) + "px;margin-left: -" + ((width) / 2) + "px;"  : "padding-right: 0px; padding-left: 20px; width: " + (width-20) + "px; margin-left: -" + ((width-20) / 2) + "px;" )+"\
											} \
											html>body .nitro_payment_dialog_container { \
											  width: " + (width-25) + "px; margin-left: -" + ((width-25) / 2) + "px; margin-top: -" + ((height-30) / 2) + "px; height:" + (height-30) +"px; \
											} \
											.nitro_payment_dialog_container_small * { \
											  margin: 0; padding: 0; font-family:Helvetica,Verdana; \
											} \
											.nitro_payment_dialog_container_small { \
											  top:30px; left:50%; width: " + width_small + "px; margin-left: -" + (width_small / 2) + "px; margin-top: -" + (height_small / 2) + "px; height:" + height_small +"px; \
											  padding-top: 10px; padding-right: 0px; padding-bottom: 10px; padding-left: 20px; position: " + positioning + "; z-index: 1002; overflow: auto; \
											  background: #dcd8d7 url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/MiniMessage_Window.png) no-repeat 0 0; \
											  border: 2px solid #9ea3a9; border-radius: 8px; -moz-border-radius: 8px; -webkit-border-radius: 8px; \
											  border-color: #FFF #9ea3a9 #9ea3a9 #FFF; \
											} \
											html>body .nitro_payment_dialog_container_small { \
											  width: " + (width_small-25) + "px; margin-left: -" + ((width_small-25) / 2) + "px; margin-top: -" + ((height_small-30) / 2) + "px; height:" + (height_small-30) +"px; \
											  padding-top: 10px; padding-right: 0px; padding-bottom: 10px; padding-left: 20px; \
											} \
											.nitro_payment_dialog_container label { \
											  cursor: pointer; \
											} \
											.nitro_payment_dialog_next_button { \
											  width: 85px; height: 50px; border:0px; float:right; margin-right:15px; cursor:pointer; \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/NextButton_Up.png) no-repeat 0 0; \
											} \
											.nitro_payment_dialog_next_button_hover { \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/NextButton_Over.png) no-repeat 0 0; \
											} \
											.nitro_payment_dialog_cancel_button { \
											  width:26px; height:30px; position:absolute; top:0px; right:0px; \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/XButton_Up.png) no-repeat 0 0; \
											} \
											.nitro_payment_dialog_cancel_button_hover { \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/XButton_Over.png) no-repeat 0 0; \
											} \
											.nitro_payment_dialog_back_button { \
											  width:53px; height:27px; position:absolute; top:10px; right:10px; cursor:pointer; \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/BackButton_Up.png) no-repeat 0 0; \
											} \
											.nitro_payment_dialog_back_button_hover { \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/BackButton_Over.png) no-repeat 0 0; \
											} \
											.nitro_payment_dialog_continue_button { \
											  width:121px; height:38px; position:absolute; bottom:50px; left:180px; cursor:pointer; \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/ContinueButton_Up.png) no-repeat 0 0; \
											} \
											.nitro_payment_dialog_continue_button_hover { \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/ContinueButton_Over.png) no-repeat 0 0; \
											} \
											.nitro_payment_dialog_message { \
											  font-size: 20px; margin-top:3px; margin-bottom: 10px; font-weight: bold; width:100%; text-align: left; color: white; \
											"+(!window.XMLHttpRequest || document.compatMode == "BackCompat" ? "margin-left:15px;" : "")+"\
											} \
											.nitro_payment_dialog_account_balance { \
											  position:relative; font-size: 16px; font-weight: bold; text-align:right; padding-right:16px; margin-top:0px; margin-bottom:10px; vertical-align:bottom;  \
											} \
											#nitro_payment_dialog_points_icon { \
											  position:relative; top:3px; height: 20px; width:20px; border:0px; float:left; \
											} \
											#nitro_payment_dialog_points_balance { \
											  font-size:14px; \
											} \
											#nitro_payment_dialog_points_balance_pc { \
											  font-size:14px; font-weight: normal; margin-left:5px; \
											} \
											#nitro_payment_dialog_background_frame { \
											} \
											.nitro_payment_dialog_background_frame_title { \
											  color: white; font-weight:bold; font-size:16px; position:absolute; top:15px; left:15px; \
											} \
											#nitro_payment_dialog_background_iframe { \
											  border: 0px; margin:35px 0px 0px 45px; \
											  height: " + bokuFrameHeight + "px; width: " + bokuFrameWidth + "px; \
											} \
											#nitro_payment_dialog_background_iframe_wide { \
											  border: 0px; overflow-x: hidden; overflow-y: auto; \
											  height: " + offerpalFrameHeight + "px; width: " + offerpalFrameWidth + "px; \
											"+(!window.XMLHttpRequest || document.compatMode == "BackCompat" ? "margin:35px 0px 0px 20px; " : "margin:35px 0px 0px 0px; ")+"\
											} \
											.nitro_payment_dialog_form { \
											  padding-bottom: 20px; float:left; \
											} \
											.nitro_payment_dialog_options_table { \
											  width: 315px; border:0px; \
											} \
											.nitro_payment_dialog_options_table th, .nitro_payment_dialog_options_table td{ \
											  padding-top:5px; font-weight:bold; \
											} \
											html>body .nitro_payment_dialog_options_table td{ \
											  padding-bottom: 5px; \
											} \
											.nitro_payment_dialog_options_table td{ \
											  border-left:0px solid #CCCCCC; text-align:center; cursor:pointer; \
											} \
											#nitro_payments_dialog_method_content { \
											  padding:5px; \
											} \
											.nitro_payment_dialog_selected_field { \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/SelectedField_Active.png) no-repeat 0 0; \
											} \
											.nitro_payment_dialog_selected_field td{ \
											  border: 0px; \
											} \
											.nitro_payment_dialog_selected_field_hover { \
											  background:  url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/SelectedField_Over.png) no-repeat 0 0; \
											} \
											.nitro_payment_dialog_selected_field_hover td{ \
											  border: 0px; \
											} \
											.nitro_payment_dialog_step_full { \
											  display:block; padding: 0px; height:119px; float:left; font-weight:bold; margin-bottom:20px; \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/StepBox_Long.png) no-repeat 0 0; \
											"+(!window.XMLHttpRequest || document.compatMode == "BackCompat" ? 'margin-left:8px; width: 645px; ' : 'margin-left:-5px; width: 651px; ')+"\
											} \
											.nitro_payment_dialog_step_half { \
											  display:block; padding: 0px; height:244px; float:left; font-weight:bold; margin-right:5px; \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/StepBox_Standard2.png) no-repeat 0 0; \
											"+(!window.XMLHttpRequest || document.compatMode == "BackCompat" ? 'margin-left:10px; width: 310px;' : 'margin-left:5px; width: 317px;')+"\
											} \
											html>body .nitro_payment_dialog_step_half { \
												width: 310px;\
											}\
											.nitro_payment_dialog_method { \
											  display:block; padding: 0px; width: 130px; height:85px; text-align: center; float:left; cursor:pointer; \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/PaymentTypeBox_Up.png) no-repeat 0 0; \
											"+(!window.XMLHttpRequest || document.compatMode == "BackCompat" ? 'margin-left: 7%;' : 'margin-left: 10%;')+"\
											} \
											.nitro_payment_dialog_method_hover { \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/PaymentTypeBox_Over.png) no-repeat 0 0; \
											} \
											.nitro_payment_dialog_method_active { \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/PaymentTypeBox_Active.png) no-repeat 0 0; \
											} \
											.nitro_payment_dialog_method div { \
											  font-size:12px; font-weight:bold; margin-bottom: 5px; margin-top:5px; \
											} \
											.nitro_payment_dialog_method img { \
											  \
											} \
											.nitro_payment_dialog_choice { \
											  padding-bottom: 5px; padding-top: 5px; margin-left: 20px; color: red; \
											} \
											.nitro_payment_dialog_terms_message { \
											  position:absolute; bottom:5px; left:15px; cursor:pointer; font-size: 10px; \
											} \
											.nitro_payment_dialog_poweredby { \
											  height:24px; width:176px; position:absolute; bottom:0px; right:10px; cursor:pointer; \
											  background: url("+nitroProtocol+"://assets.bunchball.net/widgets/payments/"+nitroLibsVersion+"/BunchballLogo_Up.png) no-repeat 0 0; \
											} \
											.nitro_payment_dialog_obscured { \
											  filter: alpha(opacity='10'); opacity:.1; \
											} \
											html>body .nitro_payment_dialog_obscured { \
											} \
											.nitro_payment_dialog_obscured * { \
											  filter: alpha(opacity='10'); opacity:.1; \
											} \
				";

				var styleElement = document.createElement("div");
				styleElement.innerHTML = "<br><style>"+this.paymentDialogStyles+"</style>";				
				document.getElementsByTagName('head')[0].appendChild(styleElement);
				this.paymentStylesWritten = true;
			}								

			if (doMask) {
				var fade = document.createElement("div");
				fade.id = "nitro_payment_dialog_mask";
				fade.setAttribute("class", "nitro_payment_dialog_mask");
				fade.setAttribute("className", "nitro_payment_dialog_mask");
				if (this.paymentDialogParams.useDefaultStyle) {
					fade.style.position = positioning;
					fade.style.top = "0%";
					fade.style.left = "0%";
					fade.style.width = "100%";
					fade.style.height = "100%";	
					fade.style.backgroundColor = "black";	
					fade.style.zIndex = 1001;	
					fade.style.filter = 'alpha(opacity='+80+')';			
					fade.style.opacity = .8;	
				}
				document.body.appendChild(fade);
			}
			
			
			var backgroundFrame = document.createElement('div');
			backgroundFrame.id = "nitro_payment_dialog_background_frame";
			backgroundFrame.style.display = "none";
			backgroundFrame.setAttribute("class", "nitro_payment_dialog_container");
			backgroundFrame.setAttribute("className", "nitro_payment_dialog_container");	
			document.body.appendChild(backgroundFrame);
			
			var light = document.createElement("div");
			light.id = "nitro_payment_dialog_container";
			light.setAttribute("class", "nitro_payment_dialog_container");
			light.setAttribute("className", "nitro_payment_dialog_container");	
			light.innerHTML = paymentDialogHTML;
			document.body.appendChild(light);
			this.jsConnector.callAPI("method=user.getPointsBalance&pointCategory=" + this.paymentDialogParams.pointCategory, "Nitro.processPointsBalance", this.counterId, true);
		}
		
	
		this.showToolbar = function(plugins, args) {
			if(!args)
				var args = {};
		
			if(this.args) {
				for(var i in this.args) {
					if(!args[i])
						args[i] = this.args[i];
				}
			}
			args.plugins = [];
			for(var i in plugins) {
				if(!plugins[i].name)
					plugins[i].name = (plugins[i].type + (plugins[i].type == 'custom' ? i : ''));
				args.plugins[plugins[i].name.replace(/ /g,'_')] = plugins[i];
			}
			
			args.apiKey = this.connectionParams.apiKey;
			args.server = this.connectionParams.server.replace("/json", "/xml");
			args.ownerId = this.jsConnector.connectionParams.userId;
			args.userId = args.ownerId;
			args.viewerId = args.ownerId;
			args.nitroInstanceId=this.counterId;
			
			if (typeof this.connectionParams.timeStamp != "undefined") {
				args.timeStamp = this.connectionParams.timeStamp;
				args.signature = this.connectionParams.signature;
				args.sessionKey = this.connectionParams.sessionKey;
			}
			
			if (this.connectionParams.sessionKey == null && !this.connectionParams.noLogin) NitroJSConnector.toolbarArgs = args;
			else nitroToolbar.show(args);
		}
		
		Nitro.redirectTo = null;
		Nitro.redirectToAction = null;
		Nitro.redirectToUserId = null;
		this.handleRedirects = function() {
			var action = this.getUrlParameter('nitroAction');
			var userId = this.getUrlParameter('nitroUserId');
			Nitro.redirectTo = this.getUrlParameter('nitroRedirectTo');
			Nitro.redirectToAction = action;
			Nitro.redirectToUserId = userId;
			
			if(action) {
				if(!userId) {
					userId = this.connectionParams.userId;
				}
				
				//check if this redirect has happened before
				var actionAlreadyLogged = NitroCookies.readJSCookie('NITRO_ACTION-'+Nitro.redirectToAction+"|"+Nitro.redirectToUserId)
				
				if(actionAlreadyLogged) {
					Nitro.handleClientLogAction();
				}else {
					this.jsConnector.callAPI("method=user.clientLogAction&userId=" + userId + "&tags=" + action, "Nitro.handleClientLogAction", this.counterId, true);
				}
			}
		}
		Nitro.handleClientLogAction = function() {		
		
			//save the cookie that we have logged the action
			NitroCookies.createJSCookie('NITRO_ACTION-'+Nitro.redirectToAction+"|"+Nitro.redirectToUserId, true, 365);
		
			if(Nitro.redirectTo) {
				window.location = decodeURI(Nitro.redirectTo);
			}
		}
		
		this.getUrlParameter = function(name) {
		  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		  var regexS = "[\\?&]"+name+"=([^&#]*)";
		  var regex = new RegExp( regexS );
		  var results = regex.exec(window.location.href);
		  if(results == null)
			return null;
		  else
			return results[1];
		}
	}
	
	/**** Localization *****
	* This variable will be populated after Login takes place and a locale is requested
	*/
	Nitro.Localization = null;
	
	Nitro.getLocale = function() {
		if ( navigator ) {
			if ( navigator.language ) {
				return navigator.language;
			} else if ( navigator.browserLanguage ) {
				return navigator.browserLanguage;
			} else if ( navigator.systemLanguage ) {
				return navigator.systemLanguage;
			} else if ( navigator.userLanguage ) {
				return navigator.userLanguage;
			}
		}
	}

	Nitro.getLocalizationFile = function(locale) {
		if(typeof JSONscriptRequest == "undefined") {
			eval('setTimeout("Nitro.getLocalizationFile(\''+locale+'\')",50)');
			return;
		}
		var fullUrl = nitroProtocol+"://assets.bunchball.net/scripts/locale/"+nitroLibsVersion+"/"+locale+".properties";
		var obj=new JSONscriptRequest(fullUrl,true);     
		obj.buildScriptTag(); // Build the script tag     
		obj.addScriptTag(); // Execute (add) the script tag
	}
	
	Nitro.processLocalizationFile = function(data) {
		
		if(!Nitro.Localization)
			Nitro.Localization = [];
		
		var localeMap = eval(data);
		for (var name in localeMap) {
			var value = localeMap[name];
			Nitro.Localization[name] = value;
		}
	}	
	
	//for flash ease of use
	Nitro.getLocalizedString = function(name,prefix) {
		return name.nitroLocalize(prefix);
	}
	
	String.prototype.nitroLocalize = function(prefix){
		if(!prefix)
			var prefix = 'javascript';
			
		var s = Nitro.Localization[prefix+"."+this];
		if( !s ) return( "���" + this + "���" );
		for (var i = 1; i < arguments.length; i++) {
			s = s.replace("{" + i + "}", arguments[i]);
		}  
		return s;
	};
	
	if(typeof nitroLocale != "undefined")
		Nitro.getLocalizationFile(nitroLocale);
}
;
/*
 * Copyright (C) 1999-2015 Jive Software. All rights reserved.
 *
 * This software is the proprietary information of Jive Software. Use is subject to license terms.
 */
var nitroProtocol = "http";
if( document.location.toString().indexOf( 'https://' ) != -1 ) {
	nitroProtocol = "https";
}
if (typeof nitroLibsVersion == "undefined") {
	nitroLibsVersion = "current";	
}		

if (typeof NitroCookies=="undefined") {
	NitroCookies = {};
	NitroCookies.swfLoaded = false;
	NitroCookies.callbacks = [];
	NitroCookies.setIds = [];	
	
	NitroCookies.getUserId = function (apiKey, callback) {
		var key = "NITRO_USERID_" + apiKey;
		
		var value = "alpha";
	
		
		if (typeof callback != "undefined" && callback != null) {
			// we got it from the browser or from the SWF, call callback and return. 
			callback(value);		
			return value;
		}
		
		// Return with no value. 
		return;
	}
	
	// unused arguments are to maintain backward compatibility for now. 
	// change in nitro.js to remove. 
	NitroCookies.setUserId = function(apiKey, value, unused1, unused2) {
		var key = "NITRO_USERID_" + apiKey;		

		return;
}
	
	
	NitroCookies.isSetup = false;
	NitroCookies.setup = function() {
		if(NitroCookies.isSetup) {
			return;
		}
		NitroCookies.isSetup = true;
		
	}	


	NitroCookies.getSWFUserId = function(key) {		
		return "alpha";
	}
	
	NitroCookies.setSWFUserId = function(key, value) {
		return;
	}	
	
	
	NitroCookies.createJSCookie = function(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}

	NitroCookies.readJSCookie = function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	
	NitroCookies.setup();		
}
;
/*
 * Copyright (C) 1999-2015 Jive Software. All rights reserved.
 *
 * This software is the proprietary information of Jive Software. Use is subject to license terms.
 */
var nitroProtocol = "http";
if( document.location.toString().indexOf( 'https://' ) != -1 ) {
	nitroProtocol = "https";
}
if (typeof nitroLibsVersion == "undefined") {
	nitroLibsVersion = "current";	
}	

if (typeof NitroJSConnector=="undefined") {
	
	function NitroJSConnector(connectionParams) {
		this.connectionParams = connectionParams;
		if (typeof NitroJSConnector.counter == "undefined") {
			NitroJSConnector.counter = 0;
		}
		this.counterId = NitroJSConnector.counter ++;
		if(typeof this.connectionParams.autoLogin == "undefined") {
			this.connectionParams.autoLogin = true;
		}
		
		this.tryLogin = function() {
			if (this.connectionParams.userId == null) {
				if (typeof NitroCookies != "undefined") {
					// wait for callback before proceeding. 
					NitroCookies.getUserId(this.connectionParams.apiKey, NitroJSConnector.gotUserId);
					return;
				}
			}
			
			if(!this.connectionParams.autoLogin && this.connectionParams.userId.indexOf('NITRO_USER_') == 0) {
				NitroCookies.createJSCookie("anonymous",true,365);
				this.connectionParams.userId = null;
			}
			
			// If we have the session key stored in a cookie, use it.  Otherwise, we need to login.
			if (NitroCookies.readJSCookie("NITRO_SESSION_" + this.connectionParams.apiKey + "_" + this.connectionParams.userId)) {
				this.connectionParams.sessionKey = NitroCookies.readJSCookie("NITRO_SESSION_" + this.connectionParams.apiKey + "_" + this.connectionParams.userId);
				this.connectionParams.abTestGroup = NitroCookies.readJSCookie("NITRO_AB_" + this.connectionParams.apiKey + "_" + this.connectionParams.userId);
			}
			else if (this.connectionParams.autoLogin && this.connectionParams.anonymous) {	//creates a new random user
				NitroCookies.createJSCookie("anonymous",true,365);//explicit anonymous call
				this.callAPI("method=user.anonymousLogin&apiKey=" + this.connectionParams.apiKey, "NitroJSConnector.processLogin", this.counterId, false, true);
			} else if (this.connectionParams.autoLogin && typeof this.connectionParams.timeStamp == "undefined") {	//low security
				this.callAPI("method=user.login&apiKey=" + this.connectionParams.apiKey, "NitroJSConnector.processLogin", this.counterId, true, true);
			} else if(this.connectionParams.userId) {	//medium+ security
				//we were given a userId
				NitroCookies.createJSCookie("anonymous",false,365);
				this.callAPI("method=user.login&apiKey=" + this.connectionParams.apiKey +  
							 "&ts=" + this.connectionParams.timeStamp + "&sig=" + this.connectionParams.signature, 
							 "NitroJSConnector.processLogin", this.counterId, true, true);
			}
			else {
				this.connectionParams.noLogin = true;
				
				if (NitroJSConnector.toolbarArgs) {
					nitroToolbar.show(NitroJSConnector.toolbarArgs);
					NitroJSConnector.toolbarArgs = null;
				}
			}
		}
		
		NitroJSConnector.gotUserId = function(userId) {
			NitroJSConnector.userId = userId;
			for (var i = 0; i < NitroJSConnector.instances.length; i++) {
				NitroJSConnector.instances[i].connectionParams.userId = userId;
				if(userId.indexOf('NITRO_USER_') == 0) {
					//we were not given a user id and we created one ourselves
					NitroCookies.createJSCookie("anonymous",true,365);
				}
				NitroJSConnector.instances[i].tryLogin();
			}
						
		}
		
		this.callAPI = function (params, callback, asyncToken, addUserId, noSessionKey) {
		  var fullUrl = this.connectionParams.server + "?" + params;
		  if (callback != null) {
			fullUrl = fullUrl + "&jsCallback=" + callback;  
		  }
		  if (asyncToken != null) {
			fullUrl = fullUrl + "&jsAsyncToken=" + asyncToken;  
		  }
		  if (this.connectionParams.userId && addUserId != null && addUserId == true) {
			fullUrl = fullUrl + "&userId=" + this.connectionParams.userId;  
		  }
		  
		  if (noSessionKey == null || noSessionKey == false) {
			  if (this.connectionParams.sessionKey == null) {
				 if (this.retryTries > 0) {
					 this.retryTries--;
					 var _self = this;
					 setTimeout(function(){
						 _self.callAPI(params, callback, asyncToken, addUserId, noSessionKey);
					 }, this.retryCallInterval);
				 }
				 return;  
			  }
			  
			  fullUrl = fullUrl + "&sessionKey=" + this.connectionParams.sessionKey;
		  }else {
			  fullUrl = fullUrl + "&apiKey=" + this.connectionParams.apiKey;		  
		  }
		  
		  if (this.connectionParams.abTestGroup == "no") {
			  // don't make any nitro calls for the "no" group
			  return;
		  }
			setTimeout(function(){
				var obj=new JSONscriptRequest(fullUrl);
		  		obj.buildScriptTag(); // Build the script tag
		  		obj.addScriptTag(); // Execute (add) the script tag
			}, _jive_nitro_call_delay)
		}
		
		NitroJSConnector.processLogin = function(data,token) {
			if (data == null) {
				if (NitroJSConnector.debug) {
					alert ('Error');
				}
				return;
			}
			if (data.Nitro.res == "err") {
				if (NitroJSConnector.debug) {
					alert (data.Nitro.Error.Message);
				}
				return;
			}
			
			for (var i = 0; i < NitroJSConnector.instances.length; i++) {
				if (NitroJSConnector.instances[i].counterId == token) {
					var cp = NitroJSConnector.instances[i].connectionParams;
					
					if(data.Nitro.Login.userId)
						cp.userId = data.Nitro.Login.userId;
					
					cp.sessionKey = data.Nitro.Login.sessionKey;
					NitroCookies.createJSCookie("NITRO_SESSION_" + cp.apiKey + "_" + cp.userId, data.Nitro.Login.sessionKey, 1/72);
					
					if (typeof data.Nitro.Login.TestGroup != "undefined") {
						cp.abTestGroup = data.Nitro.Login.TestGroup.abTestGroup;
						NitroCookies.createJSCookie("NITRO_AB_" + cp.apiKey + "_" + cp.userId, data.Nitro.Login.TestGroup.abTestGroup, 1/72);
					}
					else {
						cp.abTestGroup = null;
					}
					
					break;
				}
			}
			
			if (NitroJSConnector.toolbarArgs) {
				nitroToolbar.show(NitroJSConnector.toolbarArgs);
				NitroJSConnector.toolbarArgs = null;
			}
		}
		
		if (typeof NitroJSConnector.instances == "undefined") {
			NitroJSConnector.instances = new Array();
		}
		NitroJSConnector.instances.push(this);
		if (typeof this.connectionParams.debug == "undefined") {
			this.connectionParams.debug = false;
		}
		if (typeof this.connectionParams.userId == "undefined" || this.connectionParams.userId == null || this.connectionParams.userId == "") {
			this.connectionParams.userId = null;
		}		
		if (typeof this.connectionParams.sessionKey == "undefined" || this.connectionParams.sessionKey == null || this.connectionParams.sessionKey == "") {
			this.connectionParams.sessionKey = null;
		}		
		NitroJSConnector.debug = this.connectionParams.debug;
		this.retryLoginInterval = 10;
		this.retryCallInterval = 10;
		this.retryTries = 50000;
		if (this.connectionParams.sessionKey == null) {
			this.tryLogin();
		}
	}
	
	function JSONscriptRequest(fullUrl,dontAddNoCacheParam) {
		// REST request path
		this.fullUrl = fullUrl; 
		// Keep IE from caching requests
		this.noCacheIE = '&noCacheIE=' + (new Date()).getTime();
		// Get the DOM location to put the script tag
		this.headLoc = document.getElementsByTagName("head").item(0);
		// Generate a unique script tag id
		this.scriptId = 'YJscriptId' + JSONscriptRequest.scriptCounter++;
		
		// buildScriptTag method
		//
		this.buildScriptTag = function () {
			if (typeof JSONscriptRequest.scriptCounter == "undefined") {
				JSONscriptRequest.scriptCounter = 1;
			}
			// Create the script tag
			this.scriptObj = document.createElement("script");
			
			// Add script object attributes
			this.scriptObj.setAttribute("type", "text/javascript");
			this.scriptObj.setAttribute("src", encodeURI(this.fullUrl + (dontAddNoCacheParam ? '' : this.noCacheIE)));
			this.scriptObj.setAttribute("id", this.scriptId);
		}
		 
		// removeScriptTag method
		// 
		this.removeScriptTag = function () {
			// Destroy the script tag
			this.headLoc.removeChild(this.scriptObj);  
		}
		
		// addScriptTag method
		//
		this.addScriptTag = function () {
			// Create the script tag
			this.headLoc.appendChild(this.scriptObj);
		}
	
	}
	
	
}


;
/*
* qTip2 - Pretty powerful tooltips
* http://craigsworks.com/projects/qtip2/
*
* Version: nightly
* Copyright 2009-2010 Craig Michael Thompson - http://craigsworks.com
*
* Dual licensed under MIT or GPLv2 licenses
*   http://en.wikipedia.org/wiki/MIT_License
*   http://en.wikipedia.org/wiki/GNU_General_Public_License
*
* Date: Tue Jan 31 10:16:34.0000000000 2012
*//*jslint browser: true, onevar: true, undef: true, nomen: true, bitwise: true, regexp: true, newcap: true, immed: true, strict: true *//*global window: false, jQuery: false, console: false */
(function(a,b,c){function A(b){var c=this,d=b.elements,e=d.tooltip,f=".bgiframe-"+b.id;a.extend(c,{init:function(){d.bgiframe=a('<iframe class="ui-tooltip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>'),d.bgiframe.appendTo(e),e.bind("tooltipmove"+f,c.adjust)},adjust:function(){var a=b.get("dimensions"),c=b.plugins.tip,f=d.tip,g,h;h=parseInt(e.css("border-left-width"),10)||0,h={left:-h,top:-h},c&&f&&(g=c.corner.precedance==="x"?["width","left"]:["height","top"],h[g[1]]-=f[g[0]]()),d.bgiframe.css(h).css(a)},destroy:function(){d.bgiframe.remove(),e.unbind(f)}}),c.init()}function z(b,c){var i,j,k,l,m,n=a(this),o=a(document.body),p=this===document?o:n,q=n.metadata?n.metadata(c.metadata):f,r=c.metadata.type==="html5"&&q?q[c.metadata.name]:f,s=n.data(c.metadata.name||"qtipopts");try{s=typeof s==="string"?(new Function("return "+s))():s}catch(t){w("Unable to parse HTML5 attribute data: "+s)}l=a.extend(d,{},g.defaults,c,typeof s==="object"?x(s):f,x(r||q)),j=l.position,l.id=b;if("boolean"===typeof l.content.text){k=n.attr(l.content.attr);if(l.content.attr!==e&&k)l.content.text=k;else{w("Unable to locate content for tooltip! Aborting render of tooltip on element: ",n);return e}}j.container.length||(j.container=o),j.target===e&&(j.target=p),l.show.target===e&&(l.show.target=p),l.show.solo===d&&(l.show.solo=o),l.hide.target===e&&(l.hide.target=p),l.position.viewport===d&&(l.position.viewport=j.container),j.at=new h.Corner(j.at),j.my=new h.Corner(j.my);if(a.data(this,"qtip"))if(l.overwrite)n.qtip("destroy");else if(l.overwrite===e)return e;l.suppress&&(m=a.attr(this,"title"))&&a(this).removeAttr("title").attr(u,m),i=new y(n,l,b,!!k),a.data(this,"qtip",i),n.bind("remove.qtip-"+b,function(){i.destroy()});return i}function y(s,t,w,y){function R(){var c=[t.show.target[0],t.hide.target[0],z.rendered&&G.tooltip[0],t.position.container[0],t.position.viewport[0],b,document];z.rendered?a([]).pushStack(a.grep(c,function(a){return typeof a==="object"})).unbind(F):t.show.target.unbind(F+"-create")}function Q(){function p(a){E.is(":visible")&&z.reposition(a)}function o(a){if(E.hasClass(m))return e;clearTimeout(z.timers.inactive),z.timers.inactive=setTimeout(function(){z.hide(a)},t.hide.inactive)}function l(b){if(E.hasClass(m)||C||D)return e;var d=a(b.relatedTarget||b.target),g=d.closest(n)[0]===E[0],h=d[0]===f.show[0];clearTimeout(z.timers.show),clearTimeout(z.timers.hide);if(c.target==="mouse"&&g||t.hide.fixed&&(/mouse(out|leave|move)/.test(b.type)&&(g||h)))try{b.preventDefault(),b.stopImmediatePropagation()}catch(i){}else t.hide.delay>0?z.timers.hide=setTimeout(function(){z.hide(b)},t.hide.delay):z.hide(b)}function k(a){if(E.hasClass(m))return e;clearTimeout(z.timers.show),clearTimeout(z.timers.hide);var b=function(){z.toggle(d,a)};t.show.delay>0?z.timers.show=setTimeout(b,t.show.delay):b()}var c=t.position,f={show:t.show.target,hide:t.hide.target,viewport:a(c.viewport),document:a(document),body:a(document.body),window:a(b)},h={show:a.trim(""+t.show.event).split(" "),hide:a.trim(""+t.hide.event).split(" ")},j=a.browser.msie&&parseInt(a.browser.version,10)===6;E.bind("mouseenter"+F+" mouseleave"+F,function(a){var b=a.type==="mouseenter";b&&z.focus(a),E.toggleClass(q,b)}),t.hide.fixed&&(f.hide=f.hide.add(E),E.bind("mouseover"+F,function(){E.hasClass(m)||clearTimeout(z.timers.hide)})),/mouse(out|leave)/i.test(t.hide.event)?t.hide.leave==="window"&&f.window.bind("mouseout"+F+" blur"+F,function(a){/select|option/.test(a.target)&&!a.relatedTarget&&z.hide(a)}):/mouse(over|enter)/i.test(t.show.event)&&f.hide.bind("mouseleave"+F,function(a){clearTimeout(z.timers.show)}),(""+t.hide.event).indexOf("unfocus")>-1&&f.body.bind("mousedown"+F,function(b){var c=a(b.target),d=!E.hasClass(m)&&E.is(":visible");c[0]!==E[0]&&c.parents(n).length===0&&c.add(s).length>1&&!c.attr("disabled")&&z.hide(b)}),"number"===typeof t.hide.inactive&&(f.show.bind("qtip-"+w+"-inactive",o),a.each(g.inactiveEvents,function(a,b){f.hide.add(G.tooltip).bind(b+F+"-inactive",o)})),a.each(h.hide,function(b,c){var d=a.inArray(c,h.show),e=a(f.hide);d>-1&&e.add(f.show).length===e.length||c==="unfocus"?(f.show.bind(c+F,function(a){E.is(":visible")?l(a):k(a)}),delete h.show[d]):f.hide.bind(c+F,l)}),a.each(h.show,function(a,b){f.show.bind(b+F,k)}),"number"===typeof t.hide.distance&&f.show.add(E).bind("mousemove"+F,function(a){var b=H.origin||{},c=t.hide.distance,d=Math.abs;(d(a.pageX-b.pageX)>=c||d(a.pageY-b.pageY)>=c)&&z.hide(a)}),c.target==="mouse"&&(f.show.bind("mousemove"+F,function(a){i={pageX:a.pageX,pageY:a.pageY,type:"mousemove"}}),c.adjust.mouse&&(t.hide.event&&(E.bind("mouseleave"+F,function(a){(a.relatedTarget||a.target)!==f.show[0]&&z.hide(a)}),G.target.bind("mouseenter"+F+" mouseleave"+F,function(a){H.onTarget=a.type==="mouseenter"})),f.document.bind("mousemove"+F,function(a){H.onTarget&&!E.hasClass(m)&&E.is(":visible")&&z.reposition(a||i)}))),(c.adjust.resize||f.viewport.length)&&(a.event.special.resize?f.viewport:f.window).bind("resize"+F,p),(f.viewport.length||j&&E.css("position")==="fixed")&&f.viewport.bind("scroll"+F,p)}function P(b,d){function g(b){function i(c){c&&(delete h[c.src],clearTimeout(z.timers.img[c.src]),a(c).unbind(F)),a.isEmptyObject(h)&&(z.redraw(),d!==e&&z.reposition(H.event),b())}var g,h={};if((g=f.find("img:not([height]):not([width])")).length===0)return i();g.each(function(b,d){if(h[d.src]===c){var e=0,f=3;(function g(){if(d.height||d.width||e>f)return i(d);e+=1,z.timers.img[d.src]=setTimeout(g,700)})(),a(d).bind("error"+F+" load"+F,function(){i(this)}),h[d.src]=d}})}var f=G.content;if(!z.rendered||!b)return e;a.isFunction(b)&&(b=b.call(s,H.event,z)||""),b.jquery&&b.length>0?f.empty().append(b.css({display:"block"})):f.html(b),z.rendered<0?E.queue("fx",g):(D=0,g(a.noop));return z}function O(b,c){var d=G.title;if(!z.rendered||!b)return e;a.isFunction(b)&&(b=b.call(s,H.event,z));if(b===e)return K(e);b.jquery&&b.length>0?d.empty().append(b.css({display:"block"})):d.html(b),z.redraw(),c!==e&&z.rendered&&E.is(":visible")&&z.reposition(H.event)}function N(a){var b=G.button,c=G.title;if(!z.rendered)return e;a?(c||M(),L()):b.remove()}function M(){var b=B+"-title";G.titlebar&&K(),G.titlebar=a("<div />",{"class":k+"-titlebar "+(t.style.widget?"ui-widget-header":"")}).append(G.title=a("<div />",{id:b,"class":k+"-title","aria-atomic":d})).insertBefore(G.content).delegate(".ui-tooltip-close","mousedown keydown mouseup keyup mouseout",function(b){a(this).toggleClass("ui-state-active ui-state-focus",b.type.substr(-4)==="down")}).delegate(".ui-tooltip-close","mouseover mouseout",function(b){a(this).toggleClass("ui-state-hover",b.type==="mouseover")}),t.content.title.button?L():z.rendered&&z.redraw()}function L(){var b=t.content.title.button,c=typeof b==="string",d=c?b:"Close tooltip";G.button&&G.button.remove(),b.jquery?G.button=b:G.button=a("<a />",{"class":"ui-state-default ui-tooltip-close "+(t.style.widget?"":k+"-icon"),title:d,"aria-label":d}).prepend(a("<span />",{"class":"ui-icon ui-icon-close",html:"&times;"})),G.button.appendTo(G.titlebar).attr("role","button").click(function(a){E.hasClass(m)||z.hide(a);return e}),z.redraw()}function K(a){G.title&&(G.titlebar.remove(),G.titlebar=G.title=G.button=f,a!==e&&z.reposition())}function J(){var a=t.style.widget;E.toggleClass(l,a).toggleClass(o,t.style["default"]&&!a),G.content.toggleClass(l+"-content",a),G.titlebar&&G.titlebar.toggleClass(l+"-header",a),G.button&&G.button.toggleClass(k+"-icon",!a)}function I(a){var b=0,c,d=t,e=a.split(".");while(d=d[e[b++]])b<e.length&&(c=d);return[c||t,e.pop()]}var z=this,A=document.body,B=k+"-"+w,C=0,D=0,E=a(),F=".qtip-"+w,G,H;z.id=w,z.rendered=e,z.elements=G={target:s},z.timers={img:{}},z.options=t,z.checks={},z.plugins={},z.cache=H={event:{},target:a(),disabled:e,attr:y,onTarget:e},z.checks.builtin={"^id$":function(b,c,f){var h=f===d?g.nextid:f,i=k+"-"+h;h!==e&&h.length>0&&!a("#"+i).length&&(E[0].id=i,G.content[0].id=i+"-content",G.title[0].id=i+"-title")},"^content.text$":function(a,b,c){P(c)},"^content.title.text$":function(a,b,c){if(!c)return K();!G.title&&c&&M(),O(c)},"^content.title.button$":function(a,b,c){N(c)},"^position.(my|at)$":function(a,b,c){"string"===typeof c&&(a[b]=new h.Corner(c))},"^position.container$":function(a,b,c){z.rendered&&E.appendTo(c)},"^show.ready$":function(){z.rendered?z.toggle(d):z.render(1)},"^style.classes$":function(a,b,c){E.attr("class",k+" qtip ui-helper-reset "+c)},"^style.widget|content.title":J,"^events.(render|show|move|hide|focus|blur)$":function(b,c,d){E[(a.isFunction(d)?"":"un")+"bind"]("tooltip"+c,d)},"^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)":function(){var a=t.position;E.attr("tracking",a.target==="mouse"&&a.adjust.mouse),R(),Q()}},a.extend(z,{render:function(b){if(z.rendered)return z;var c=t.content.text,f=t.content.title.text,g=t.position,i=a.Event("tooltiprender");a.attr(s[0],"aria-describedby",B),E=G.tooltip=a("<div/>",{id:B,"class":k+" qtip ui-helper-reset "+o+" "+t.style.classes+" "+k+"-pos-"+t.position.my.abbrev(),width:t.style.width||"",height:t.style.height||"",tracking:g.target==="mouse"&&g.adjust.mouse,role:"alert","aria-live":"polite","aria-atomic":e,"aria-describedby":B+"-content","aria-hidden":d}).toggleClass(m,H.disabled).data("qtip",z).appendTo(t.position.container).append(G.content=a("<div />",{"class":k+"-content",id:B+"-content","aria-atomic":d})),z.rendered=-1,C=D=1,f&&(M(),a.isFunction(f)||O(f,e)),a.isFunction(c)||P(c,e),z.rendered=d,J(),a.each(t.events,function(b,c){a.isFunction(c)&&E.bind(b==="toggle"?"tooltipshow tooltiphide":"tooltip"+b,c)}),a.each(h,function(){this.initialize==="render"&&this(z)}),Q(),E.queue("fx",function(a){i.originalEvent=H.event,E.trigger(i,[z]),C=D=0,z.redraw(),(t.show.ready||b)&&z.toggle(d,H.event,e),a()});return z},get:function(a){var b,c;switch(a.toLowerCase()){case"dimensions":b={height:E.outerHeight(),width:E.outerWidth()};break;case"offset":b=h.offset(E,t.position.container);break;default:c=I(a.toLowerCase()),b=c[0][c[1]],b=b.precedance?b.string():b}return b},set:function(b,c){function m(a,b){var c,d,e;for(c in k)for(d in k[c])if(e=(new RegExp(d,"i")).exec(a))b.push(e),k[c][d].apply(z,b)}var g=/^position\.(my|at|adjust|target|container)|style|content|show\.ready/i,h=/^content\.(title|attr)|style/i,i=e,j=e,k=z.checks,l;"string"===typeof b?(l=b,b={},b[l]=c):b=a.extend(d,{},b),a.each(b,function(c,d){var e=I(c.toLowerCase()),f;f=e[0][e[1]],e[0][e[1]]="object"===typeof d&&d.nodeType?a(d):d,b[c]=[e[0],e[1],d,f],i=g.test(c)||i,j=h.test(c)||j}),x(t),C=D=1,a.each(b,m),C=D=0,E.is(":visible")&&z.rendered&&(i&&z.reposition(t.position.target==="mouse"?f:H.event),j&&z.redraw());return z},toggle:function(b,c){function q(){b?(a.browser.msie&&E[0].style.removeAttribute("filter"),E.css("overflow",""),"string"===typeof h.autofocus&&a(h.autofocus,E).focus(),p=a.Event("tooltipvisible"),p.originalEvent=c?H.event:f,E.trigger(p,[z]),h.target.trigger("qtip-"+w+"-inactive")):E.css({display:"",visibility:"",opacity:"",left:"",top:""})}if(!z.rendered)return b?z.render(1):z;var g=b?"show":"hide",h=t[g],j=E.is(":visible"),k=!c||t[g].target.length<2||H.target[0]===c.target,l=t.position,m=t.content,o,p;(typeof b).search("boolean|number")&&(b=!j);if(!E.is(":animated")&&j===b&&k)return z;if(c){if(/over|enter/.test(c.type)&&/out|leave/.test(H.event.type)&&c.target===t.show.target[0]&&E.has(c.relatedTarget).length)return z;H.event=a.extend({},c)}p=a.Event("tooltip"+g),p.originalEvent=c?H.event:f,E.trigger(p,[z,90]);if(p.isDefaultPrevented())return z;a.attr(E[0],"aria-hidden",!b),b?(H.origin=a.extend({},i),z.focus(c),a.isFunction(m.text)&&P(m.text,e),a.isFunction(m.title.text)&&O(m.title.text,e),!v&&l.target==="mouse"&&l.adjust.mouse&&(a(document).bind("mousemove.qtip",function(a){i={pageX:a.pageX,pageY:a.pageY,type:"mousemove"}}),v=d),z.reposition(c,arguments[2]),(p.solo=!!h.solo)&&a(n,h.solo).not(E).qtip("hide",p)):(clearTimeout(z.timers.show),delete H.origin,v&&!a(n+'[tracking="true"]:visible',h.solo).not(E).length&&(a(document).unbind("mousemove.qtip"),v=e),z.blur(c)),k&&E.stop(0,1),h.effect===e?(E[g](),q.call(E)):a.isFunction(h.effect)?(h.effect.call(E,z),E.queue("fx",function(a){q(),a()})):E.fadeTo(90,b?1:0,q),b&&h.target.trigger("qtip-"+w+"-inactive");return z},show:function(a){return z.toggle(d,a)},hide:function(a){return z.toggle(e,a)},focus:function(b){if(!z.rendered)return z;var c=a(n),d=parseInt(E[0].style.zIndex,10),e=g.zindex+c.length,f=a.extend({},b),h,i;E.hasClass(p)||(i=a.Event("tooltipfocus"),i.originalEvent=f,E.trigger(i,[z,e]),i.isDefaultPrevented()||(d!==e&&(c.each(function(){this.style.zIndex>d&&(this.style.zIndex=this.style.zIndex-1)}),c.filter("."+p).qtip("blur",f)),E.addClass(p)[0].style.zIndex=e));return z},blur:function(b){var c=a.extend({},b),d;E.removeClass(p),d=a.Event("tooltipblur"),d.originalEvent=c,E.trigger(d,[z]);return z},reposition:function(c,d){if(!z.rendered||C)return z;C=1;var f=t.position.target,g=t.position,j=g.my,l=g.at,m=g.adjust,n=m.method.split(" "),o=E.outerWidth(),p=E.outerHeight(),q=0,r=0,s=a.Event("tooltipmove"),u=E.css("position")==="fixed",v=g.viewport,w={left:0,top:0},x=g.container,y=e,B=z.plugins.tip,D={horizontal:n[0],vertical:n[1]=n[1]||n[0],enabled:v.jquery&&f[0]!==b&&f[0]!==A&&m.method!=="none",left:function(a){var b=D.horizontal==="shift",c=-x.offset.left+v.offset.left+v.scrollLeft,d=j.x==="left"?o:j.x==="right"?-o:-o/2,e=l.x==="left"?q:l.x==="right"?-q:-q/2,f=B&&B.size?B.size.width||0:0,g=B&&B.corner&&B.corner.precedance==="x"&&!b?f:0,h=c-a+g,i=a+o-v.width-c+g,k=d-(j.precedance==="x"||j.x===j.y?e:0)-(l.x==="center"?q/2:0),n=j.x==="center";b?(g=B&&B.corner&&B.corner.precedance==="y"?f:0,k=(j.x==="left"?1:-1)*d-g,w.left+=h>0?h:i>0?-i:0,w.left=Math.max(-x.offset.left+v.offset.left+(g&&B.corner.x==="center"?B.offset:0),a-k,Math.min(Math.max(-x.offset.left+v.offset.left+v.width,a+k),w.left))):(h>0&&(j.x!=="left"||i>0)?w.left-=k:i>0&&(j.x!=="right"||h>0)&&(w.left-=n?-k:k),w.left!==a&&n&&(w.left-=m.x),w.left<c&&-w.left>i&&(w.left=a));return w.left-a},top:function(a){var b=D.vertical==="shift",c=-x.offset.top+v.offset.top+v.scrollTop,d=j.y==="top"?p:j.y==="bottom"?-p:-p/2,e=l.y==="top"?r:l.y==="bottom"?-r:-r/2,f=B&&B.size?B.size.height||0:0,g=B&&B.corner&&B.corner.precedance==="y"&&!b?f:0,h=c-a+g,i=a+p-v.height-c+g,k=d-(j.precedance==="y"||j.x===j.y?e:0)-(l.y==="center"?r/2:0),n=j.y==="center";b?(g=B&&B.corner&&B.corner.precedance==="x"?f:0,k=(j.y==="top"?1:-1)*d-g,w.top+=h>0?h:i>0?-i:0,w.top=Math.max(-x.offset.top+v.offset.top+(g&&B.corner.x==="center"?B.offset:0),a-k,Math.min(Math.max(-x.offset.top+v.offset.top+v.height,a+k),w.top))):(h>0&&(j.y!=="top"||i>0)?w.top-=k:i>0&&(j.y!=="bottom"||h>0)&&(console.log("test"),w.top-=n?-k:k),w.top!==a&&n&&(w.top-=m.y),w.top<0&&-w.top>i&&(w.top=a));return w.top-a}},F;if(a.isArray(f)&&f.length===2)l={x:"left",y:"top"},w={left:f[0],top:f[1]};else if(f==="mouse"&&(c&&c.pageX||H.event.pageX))l={x:"left",y:"top"},c=(c&&(c.type==="resize"||c.type==="scroll")?H.event:c&&c.pageX&&c.type==="mousemove"?c:i&&i.pageX&&(m.mouse||!c||!c.pageX)?{pageX:i.pageX,pageY:i.pageY}:!m.mouse&&H.origin&&H.origin.pageX&&t.show.distance?H.origin:c)||c||H.event||i||{},w={top:c.pageY,left:c.pageX};else{f==="event"?c&&c.target&&c.type!=="scroll"&&c.type!=="resize"?f=H.target=a(c.target):f=H.target:f=H.target=a(f.jquery?f:G.target),f=a(f).eq(0);if(f.length===0)return z;f[0]===document||f[0]===b?(q=h.iOS?b.innerWidth:f.width(),r=h.iOS?b.innerHeight:f.height(),f[0]===b&&(w={top:(v||f).scrollTop(),left:(v||f).scrollLeft()})):f.is("area")&&h.imagemap?w=h.imagemap(f,l,D.enabled?n:e):f[0].namespaceURI==="http://www.w3.org/2000/svg"&&h.svg?w=h.svg(f,l):(q=f.outerWidth(),r=f.outerHeight(),w=h.offset(f,x)),w.offset&&(q=w.width,r=w.height,y=w.flipoffset,w=w.offset);if(h.iOS<4.1&&h.iOS>3.1||h.iOS==4.3||!h.iOS&&u)F=a(b),w.left-=F.scrollLeft(),w.top-=F.scrollTop();w.left+=l.x==="right"?q:l.x==="center"?q/2:0,w.top+=l.y==="bottom"?r:l.y==="center"?r/2:0}w.left+=m.x+(j.x==="right"?-o:j.x==="center"?-o/2:0),w.top+=m.y+(j.y==="bottom"?-p:j.y==="center"?-p/2:0),D.enabled?(v={elem:v,height:v[(v[0]===b?"h":"outerH")+"eight"](),width:v[(v[0]===b?"w":"outerW")+"idth"](),scrollLeft:u?0:v.scrollLeft(),scrollTop:u?0:v.scrollTop(),offset:v.offset()||{left:0,top:0}},x={elem:x,scrollLeft:x.scrollLeft(),scrollTop:x.scrollTop(),offset:x.offset()||{left:0,top:0}},w.adjusted={left:D.horizontal!=="none"?D.left(w.left):0,top:D.vertical!=="none"?D.top(w.top):0},w.adjusted.left+w.adjusted.top&&E.attr("class",E[0].className.replace(/ui-tooltip-pos-\w+/i,k+"-pos-"+j.abbrev())),y&&w.adjusted.left&&(w.left+=y.left),y&&w.adjusted.top&&(w.top+=y.top)):w.adjusted={left:0,top:0},s.originalEvent=a.extend({},c),E.trigger(s,[z,w,v.elem||v]);if(s.isDefaultPrevented())return z;delete w.adjusted,d===e||isNaN(w.left)||isNaN(w.top)||f==="mouse"||!a.isFunction(g.effect)?E.css(w):a.isFunction(g.effect)&&(g.effect.call(E,z,a.extend({},w)),E.queue(function(b){a(this).css({opacity:"",height:""}),a.browser.msie&&this.style.removeAttribute("filter"),b()})),C=0;return z},redraw:function(){if(z.rendered<1||D)return z;var a=t.position.container,b,c,d,e;D=1,t.style.height&&E.css("height",t.style.height),t.style.width?E.css("width",t.style.width):(E.css("width","").addClass(r),c=E.width()+1,d=E.css("max-width")||"",e=E.css("min-width")||"",b=(d+e).indexOf("%")>-1?a.width()/100:0,d=(d.indexOf("%")>-1?b:1)*parseInt(d,10)||c,e=(e.indexOf("%")>-1?b:1)*parseInt(e,10)||0,c=d+e?Math.min(Math.max(c,e),d):c,E.css("width",Math.round(c)).removeClass(r)),D=0;return z},disable:function(b){"boolean"!==typeof b&&(b=!E.hasClass(m)&&!H.disabled),z.rendered?(E.toggleClass(m,b),a.attr(E[0],"aria-disabled",b)):H.disabled=!!b;return z},enable:function(){return z.disable(e)},destroy:function(){var b=s[0],c=a.attr(b,u),d=s.data("qtip");z.rendered&&(E.remove(),a.each(z.plugins,function(){this.destroy&&this.destroy()})),clearTimeout(z.timers.show),clearTimeout(z.timers.hide),R();if(!d||z===d)a.removeData(b,"qtip"),t.suppress&&c&&(a.attr(b,"title",c),s.removeAttr(u)),s.removeAttr("aria-describedby");s.unbind(".qtip-"+w),delete j[z.id];return s}})}function x(b){var c;if(!b||"object"!==typeof b)return e;if(b.metadata===f||"object"!==typeof b.metadata)b.metadata={type:b.metadata};if("content"in b){if(b.content===f||"object"!==typeof b.content||b.content.jquery)b.content={text:b.content};c=b.content.text||e,!a.isFunction(c)&&(!c&&!c.attr||c.length<1||"object"===typeof c&&!c.jquery)&&(b.content.text=e);if("title"in b.content){if(b.content.title===f||"object"!==typeof b.content.title)b.content.title={text:b.content.title};c=b.content.title.text||e,!a.isFunction(c)&&(!c&&!c.attr||c.length<1||"object"===typeof c&&!c.jquery)&&(b.content.title.text=e)}}if("position"in b)if(b.position===f||"object"!==typeof b.position)b.position={my:b.position,at:b.position};if("show"in b)if(b.show===f||"object"!==typeof b.show)b.show.jquery?b.show={target:b.show}:b.show={event:b.show};if("hide"in b)if(b.hide===f||"object"!==typeof b.hide)b.hide.jquery?b.hide={target:b.hide}:b.hide={event:b.hide};if("style"in b)if(b.style===f||"object"!==typeof b.style)b.style={classes:b.style};a.each(h,function(){this.sanitize&&this.sanitize(b)});return b}function w(){w.history=w.history||[],w.history.push(arguments);if("object"===typeof console){var a=console[console.warn?"warn":"log"],b=Array.prototype.slice.call(arguments),c;typeof arguments[0]==="string"&&(b[0]="qTip2: "+b[0]),c=a.apply?a.apply(console,b):a(b)}}"use strict";var d=!0,e=!1,f=null,g,h,i,j={},k="ui-tooltip",l="ui-widget",m="ui-state-disabled",n="div.qtip."+k,o=k+"-default",p=k+"-focus",q=k+"-hover",r=k+"-fluid",s="-31000px",t="_replacedByqTip",u="oldtitle",v;g=a.fn.qtip=function(b,h,i){var j=(""+b).toLowerCase(),k=f,l=a.makeArray(arguments).slice(1),m=l[l.length-1],n=this[0]?a.data(this[0],"qtip"):f;if(!arguments.length&&n||j==="api")return n;if("string"===typeof b){this.each(function(){var b=a.data(this,"qtip");if(!b)return d;m&&m.timeStamp&&(b.cache.event=m);if(j!=="option"&&j!=="options"||!h)b[j]&&b[j].apply(b[j],l);else if(a.isPlainObject(h)||i!==c)b.set(h,i);else{k=b.get(h);return e}});return k!==f?k:this}if("object"===typeof b||!arguments.length){n=x(a.extend(d,{},b));return g.bind.call(this,n,m)}},g.bind=function(b,f){return this.each(function(k){function r(b){function d(){p.render(typeof b==="object"||l.show.ready),m.show.add(m.hide).unbind(o)}if(p.cache.disabled)return e;p.cache.event=a.extend({},b),p.cache.target=b?a(b.target):[c],l.show.delay>0?(clearTimeout(p.timers.show),p.timers.show=setTimeout(d,l.show.delay),n.show!==n.hide&&m.hide.bind(n.hide,function(){clearTimeout(p.timers.show)})):d()}var l,m,n,o,p,q;q=a.isArray(b.id)?b.id[k]:b.id,q=!q||q===e||q.length<1||j[q]?g.nextid++:j[q]=q,o=".qtip-"+q+"-create",p=z.call(this,q,b);if(p===e)return d;l=p.options,a.each(h,function(){this.initialize==="initialize"&&this(p)}),m={show:l.show.target,hide:l.hide.target},n={show:a.trim(""+l.show.event).replace(/ /g,o+" ")+o,hide:a.trim(""+l.hide.event).replace(/ /g,o+" ")+o},/mouse(over|enter)/i.test(n.show)&&!/mouse(out|leave)/i.test(n.hide)&&(n.hide+=" mouseleave"+o),m.show.bind("mousemove"+o,function(a){i={pageX:a.pageX,pageY:a.pageY,type:"mousemove"},p.cache.onTarget=d}),m.show.bind(n.show,r),(l.show.ready||l.prerender)&&r(f)})},h=g.plugins={Corner:function(a){a=(""+a).replace(/([A-Z])/," $1").replace(/middle/gi,"center").toLowerCase(),this.x=(a.match(/left|right/i)||a.match(/center/)||["inherit"])[0].toLowerCase(),this.y=(a.match(/top|bottom|center/i)||["inherit"])[0].toLowerCase();var b=a.charAt(0);this.precedance=b==="t"||b==="b"?"y":"x",this.string=function(){return this.precedance==="y"?this.y+this.x:this.x+this.y},this.abbrev=function(){var a=this.x.substr(0,1),b=this.y.substr(0,1);return a===b?a:a==="c"||a!=="c"&&b!=="c"?b+a:a+b},this.clone=function(){return{x:this.x,y:this.y,precedance:this.precedance,string:this.string,abbrev:this.abbrev,clone:this.clone}}},offset:function(a,b){function i(a,b){c.left+=b*a.scrollLeft(),c.top+=b*a.scrollTop()}var c=a.offset(),d=b,e=0,f=document.body,g,h;if(d){do{d.css("position")!=="static"&&(g=d[0]===f?{left:parseInt(d.css("left"),10)||0,top:parseInt(d.css("top"),10)||0}:d.position(),c.left-=g.left+(parseInt(d.css("borderLeftWidth"),10)||0)+(parseInt(d.css("marginLeft"),10)||0),c.top-=g.top+(parseInt(d.css("borderTopWidth"),10)||0),h=d.css("overflow"),(h==="scroll"||h==="auto")&&++e);if(d[0]===f)break}while(d=d.offsetParent());b[0]!==f&&e&&i(b,1)}return c},iOS:parseFloat((""+(/CPU.*OS ([0-9_]{1,3})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent)||[0,""])[1]).replace("undefined","3_2").replace("_","."))||e,fn:{attr:function(b,c){if(this.length){var d=this[0],e="title",f=a.data(d,"qtip");if(b===e&&f&&"object"===typeof f&&f.options.suppress){if(arguments.length<2)return a.attr(d,u);f&&f.options.content.attr===e&&f.cache.attr&&f.set("content.text",c);return this.attr(u,c)}}return a.fn["attr"+t].apply(this,arguments)},clone:function(b){var c=a([]),d="title",e=a.fn["clone"+t].apply(this,arguments);b||e.filter("["+u+"]").attr("title",function(){return a.attr(this,u)}).removeAttr(u);return e},remove:a.ui?f:function(b,c){a.ui||a(this).each(function(){c||(!b||a.filter(b,[this]).length)&&a("*",this).add(this).each(function(){a(this).triggerHandler("remove")})})}}},a.each(h.fn,function(b,c){if(!c||a.fn[b+t])return d;var e=a.fn[b+t]=a.fn[b];a.fn[b]=function(){return c.apply(this,arguments)||e.apply(this,arguments)}}),g.version="nightly",g.nextid=0,g.inactiveEvents="click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),g.zindex=15e3,g.defaults={prerender:e,id:e,overwrite:d,suppress:d,content:{text:d,attr:"title",title:{text:e,button:e}},position:{my:"top left",at:"bottom right",target:e,container:e,viewport:e,adjust:{x:0,y:0,mouse:d,resize:d,method:"flip flip"},effect:function(b,c,d){a(this).animate(c,{duration:200,queue:e})}},show:{target:e,event:"mouseenter",effect:d,delay:90,solo:e,ready:e,autofocus:e},hide:{target:e,event:"mouseleave",effect:d,delay:0,fixed:e,inactive:e,leave:"window",distance:e},style:{classes:"",widget:e,width:e,height:e,"default":d},events:{render:f,move:f,show:f,hide:f,toggle:f,visible:f,focus:f,blur:f}},h.bgiframe=function(b){var c=a.browser,d=b.plugins.bgiframe;if(a("select, object").length<1||(!c.msie||(""+c.version).charAt(0)!=="6"))return e;return"object"===typeof d?d:b.plugins.bgiframe=new A(b)},h.bgiframe.initialize="render"})(jQuery,window)

;
/*
 * Copyright (C) 1999-2015 Jive Software. All rights reserved.
 *
 * This software is the proprietary information of Jive Software. Use is subject to license terms.
 */

/**
 * This is the n4jive object declaration. holds the global defaults for things. 
 * only one of these per page will be instantiated.
 */

/**
 * @depends path=/plugins/gamification/resources/script/lib/n4jive/n4jive.libs.js
 * @depends path=/resources/scripts/apps/shared/views/loader_view.js
 */
if (typeof(n4jive) == "undefined") {
    n4jive = {};
}


(function($){
    $j.extend(n4jive, {
        data: {},  //just a place to handily dump stuff to.
        self: this,
        settings: {}
    });

	n4jive.old = {};
	
	n4jive.workingFactory = function(pTarget) {
	    var spinner = new jive.loader.LoaderView({size: 'small', showLabel: false});
        spinner.appendTo(pTarget);

        return function(){
            if (spinner) {
                spinner.hide().destroy();
                spinner = null;
            }
        };
    }
    
	n4jive.addCommas = function(nStr){
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;				
	}	
	
	n4jive.getIntPercentage = function(num1, num2){
		return  Math.round((num1/num2) * 100);
	}

	n4jive.showLoadingSpinners = function(){
		for(i in arguments){
			var el = arguments[i];
			el.prepend("<img src='https://assets.bunchball.net/widgets/jive/test/images/ajaxload.gif' style='width:auto' class='n4jive_loading_spinner' />");
		}
	}

	n4jive.destroyLoadingSpinners = function(){
		$(".n4jive_loading_spinner").remove();
	}
	
	n4jive.getSanitizeChallengesResponse = function(responseObj){
		var challenges = new Array();
		//check for no one first...
		
		if(responseObj.res != "ok" || responseObj.challenges == true){
			//hide the 'recent challenges' header
			$("#n4jive_hover_recent_challenges").hide();
			
			//BAIL!				
			return []; 
		}
		
		//organize challenges...
		//single challenge
		if(typeof responseObj.challenges.Challenge.length == "undefined"){
			challenges.push(responseObj.challenges.Challenge);			
		}
		//multiple challenges
		else{
			for(i=0;i<responseObj.challenges.Challenge.length;i++){
				challenges.push(responseObj.challenges.Challenge[i]);
			}
		}
		
		return challenges;
	}
	
	n4jive.getJiveHoverTipHTML = function(content, showLoader){
		var h = '<div class="jive-tooltip2 notedefault snp-mouseoffset" id="n4jive_hover_tip" style="visibility: visible">'+
					'<div class="jive-tooltip2-mid j-mini-modal j-mini-modal-user">' +
						'<div id="jive-note-user-body" class="n4jive_hover_tip_body jive-tooltip2-mid-padding j-modal-content clearfix">';
						if(typeof showLoader != 'undefined' && showLoader){
							h += '<p>Loading...</p>';
						}
						h += content;
					h += '</div>' +
					'</div>' +
				'</div>'
		return h;
	}
	
	n4jive.md5 = function(C){var D;var w=function(b,a){return(b<<a)|(b>>>(32-a))};var H=function(k,b){var V,a,d,x,c;d=(k&2147483648);x=(b&2147483648);V=(k&1073741824);a=(b&1073741824);c=(k&1073741823)+(b&1073741823);if(V&a){return(c^2147483648^d^x)}if(V|a){if(c&1073741824){return(c^3221225472^d^x)}else{return(c^1073741824^d^x)}}else{return(c^d^x)}};var r=function(a,c,b){return(a&c)|((~a)&b)};var q=function(a,c,b){return(a&b)|(c&(~b))};var p=function(a,c,b){return(a^c^b)};var n=function(a,c,b){return(c^(a|(~b)))};var u=function(W,V,aa,Z,k,X,Y){W=H(W,H(H(r(V,aa,Z),k),Y));return H(w(W,X),V)};var f=function(W,V,aa,Z,k,X,Y){W=H(W,H(H(q(V,aa,Z),k),Y));return H(w(W,X),V)};var F=function(W,V,aa,Z,k,X,Y){W=H(W,H(H(p(V,aa,Z),k),Y));return H(w(W,X),V)};var t=function(W,V,aa,Z,k,X,Y){W=H(W,H(H(n(V,aa,Z),k),Y));return H(w(W,X),V)};var e=function(V){var W;var d=V.length;var c=d+8;var b=(c-(c%64))/64;var x=(b+1)*16;var X=new Array(x-1);var a=0;var k=0;while(k<d){W=(k-(k%4))/4;a=(k%4)*8;X[W]=(X[W]|(V.charCodeAt(k)<<a));k++}W=(k-(k%4))/4;a=(k%4)*8;X[W]=X[W]|(128<<a);X[x-2]=d<<3;X[x-1]=d>>>29;return X};var s=function(d){var a="",b="",k,c;for(c=0;c<=3;c++){k=(d>>>(c*8))&255;b="0"+k.toString(16);a=a+b.substr(b.length-2,2)}return a};var E=[],L,h,G,v,g,U,T,S,R,O=7,M=12,J=17,I=22,B=5,A=9,z=14,y=20,o=4,m=11,l=16,j=23,Q=6,P=10,N=15,K=21;C=this.utf8_encode(C);E=e(C);U=1732584193;T=4023233417;S=2562383102;R=271733878;D=E.length;for(L=0;L<D;L+=16){h=U;G=T;v=S;g=R;U=u(U,T,S,R,E[L+0],O,3614090360);R=u(R,U,T,S,E[L+1],M,3905402710);S=u(S,R,U,T,E[L+2],J,606105819);T=u(T,S,R,U,E[L+3],I,3250441966);U=u(U,T,S,R,E[L+4],O,4118548399);R=u(R,U,T,S,E[L+5],M,1200080426);S=u(S,R,U,T,E[L+6],J,2821735955);T=u(T,S,R,U,E[L+7],I,4249261313);U=u(U,T,S,R,E[L+8],O,1770035416);R=u(R,U,T,S,E[L+9],M,2336552879);S=u(S,R,U,T,E[L+10],J,4294925233);T=u(T,S,R,U,E[L+11],I,2304563134);U=u(U,T,S,R,E[L+12],O,1804603682);R=u(R,U,T,S,E[L+13],M,4254626195);S=u(S,R,U,T,E[L+14],J,2792965006);T=u(T,S,R,U,E[L+15],I,1236535329);U=f(U,T,S,R,E[L+1],B,4129170786);R=f(R,U,T,S,E[L+6],A,3225465664);S=f(S,R,U,T,E[L+11],z,643717713);T=f(T,S,R,U,E[L+0],y,3921069994);U=f(U,T,S,R,E[L+5],B,3593408605);R=f(R,U,T,S,E[L+10],A,38016083);S=f(S,R,U,T,E[L+15],z,3634488961);T=f(T,S,R,U,E[L+4],y,3889429448);U=f(U,T,S,R,E[L+9],B,568446438);R=f(R,U,T,S,E[L+14],A,3275163606);S=f(S,R,U,T,E[L+3],z,4107603335);T=f(T,S,R,U,E[L+8],y,1163531501);U=f(U,T,S,R,E[L+13],B,2850285829);R=f(R,U,T,S,E[L+2],A,4243563512);S=f(S,R,U,T,E[L+7],z,1735328473);T=f(T,S,R,U,E[L+12],y,2368359562);U=F(U,T,S,R,E[L+5],o,4294588738);R=F(R,U,T,S,E[L+8],m,2272392833);S=F(S,R,U,T,E[L+11],l,1839030562);T=F(T,S,R,U,E[L+14],j,4259657740);U=F(U,T,S,R,E[L+1],o,2763975236);R=F(R,U,T,S,E[L+4],m,1272893353);S=F(S,R,U,T,E[L+7],l,4139469664);T=F(T,S,R,U,E[L+10],j,3200236656);U=F(U,T,S,R,E[L+13],o,681279174);R=F(R,U,T,S,E[L+0],m,3936430074);S=F(S,R,U,T,E[L+3],l,3572445317);T=F(T,S,R,U,E[L+6],j,76029189);U=F(U,T,S,R,E[L+9],o,3654602809);R=F(R,U,T,S,E[L+12],m,3873151461);S=F(S,R,U,T,E[L+15],l,530742520);T=F(T,S,R,U,E[L+2],j,3299628645);U=t(U,T,S,R,E[L+0],Q,4096336452);R=t(R,U,T,S,E[L+7],P,1126891415);S=t(S,R,U,T,E[L+14],N,2878612391);T=t(T,S,R,U,E[L+5],K,4237533241);U=t(U,T,S,R,E[L+12],Q,1700485571);R=t(R,U,T,S,E[L+3],P,2399980690);S=t(S,R,U,T,E[L+10],N,4293915773);T=t(T,S,R,U,E[L+1],K,2240044497);U=t(U,T,S,R,E[L+8],Q,1873313359);R=t(R,U,T,S,E[L+15],P,4264355552);S=t(S,R,U,T,E[L+6],N,2734768916);T=t(T,S,R,U,E[L+13],K,1309151649);U=t(U,T,S,R,E[L+4],Q,4149444226);R=t(R,U,T,S,E[L+11],P,3174756917);S=t(S,R,U,T,E[L+2],N,718787259);T=t(T,S,R,U,E[L+9],K,3951481745);U=H(U,h);T=H(T,G);S=H(S,v);R=H(R,g)}var i=s(U)+s(T)+s(S)+s(R);return i.toLowerCase()};
	
	
    /**
     *  This method allows the script to check the compatibility of CSS3 styles that may or may not be mainstream.
     *  It simply selects the name of the style, then checks vendor prefixes automatically.
     *
     *  @param      {string} The style to check for support
     *  @returns    {boolean} Is the style supported?
     */
    n4jive.cssCompatibilityChecker = function(pStyle) {
        if ( this.css3Enabled ) { return true; }
        var
            CSSprefix = "Webkit,Moz,O,ms,Khtml".split(","),
            d = document.createElement("detect"),
            test = [],
            p, pty;

        // test prefixed codes
        function TestPrefixes(property) {
            var
                Uprop = property.charAt(0).toUpperCase() + property.substr(1),
                All = (property + ' ' + CSSprefix.join(Uprop + ' ') + Uprop).split(' ');
            for (var n = 0, np = All.length; n < np; n++) {
                if (d.style[All[n]] === "") return true;
            }
            return false;
        }

        return TestPrefixes(pStyle);
    },

	n4jive.opacitySupported = function(){
		var el = document.createElement("div");
		if(typeof el.style.opacity == "string"){
			return true;
		}else{ 
			return false;
		}
	},
	
    /////*****/////*****/////*****/////*****
    /////*****  UPDATE SERVICE
    /////*****/////*****/////*****/////*****
    n4jive.callbacks = [], // array containing the callback information for any widget slaved to update.

    /**
     *  Durring the init phase of the widget, in addition to creating help and loading blocks, a function may be
     *  supplied to it's parent (here) that can be looked up when other widgets have signnaled that they have made
     *  a change.
     */
    n4jive.registerUpdate = function(pCallback) {
        if(typeof(pCallback) == 'function') {
            this.callbacks.push(pCallback);
        }
    },

    /**
     *  Simply itterates through the array of callbacks we have and calls each and every one.
     */
    n4jive.runUpdates = function() {
        if(this.callbacks.length > 0) {
            for (var item in this.callbacks) {
                this.callbacks[item]();
            }
        }
    },
	
    /**
     *  Encodes an ISO-8859-1 string to UTF-8
     *
     *  This is a modified method from the the php.js project which implemented the original.
     *      Project Site: hhttp://phpjs.org
     *      original by: Webtoolkit.info (http://www.webtoolkit.info/)
     *      php.js is copyright 2011 Kevin van Zonneveld.
     *      Version: 3.26
     *      Dual licensed under the MIT and GPL licenses.
     *      http://phpjs.org/pages/license
     *
     *  @param      {string} Data to encode
     *  @returns    {string} Encoded String
     */
    n4jive.utf8_encode = function(argString) {
        if (argString === null || typeof argString === "undefined") {
            return "";
        }
        var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        var utftext = "",
            start, end, stringl = 0;

        start = end = 0;    stringl = string.length;
        for (var n = 0; n < stringl; n++) {
            var c1 = string.charCodeAt(n);
            var enc = null;
             if (c1 < 128) {
                end++;
            } else if (c1 > 127 && c1 < 2048) {
                enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128);
            } else {
                enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128);
            }
            if (enc !== null) {
                if (end > start) {
                    utftext += string.slice(start, end);
                }
                utftext += enc;
                start = end = n + 1;
            }
        }
        if (end > start) {
            utftext += string.slice(start, stringl);
        }
        return utftext;
    }

    /**
     *  @param      {string} Data to encode
     *  @returns    {string} Encoded String
     */
    n4jive.encode64 = function(pInput) {
        var input = encodeURIComponent(pInput);
        var output = '';
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4 = "";
        var i = 0;
        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
            this.keyString.charAt(enc1) +
            this.keyString.charAt(enc2) +
            this.keyString.charAt(enc3) +
            this.keyString.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);
        return output;
    }

	n4jive.getOrdinal = function(n){
	   var s=["th","st","nd","rd"],
	       v=n%100;
	   return n+(s[(v-20)%10]||s[v]||s[0]);
	}
	
	n4jive.log = function(m){
		console.log(m)
	}
	
	n4jive.getUserId = function(context){
		return context.nitro.connectionParams.userId;
	}
	
	n4jive.getOption = function(opt, context){
		if(context.options[opt]){
			return context.options[opt];
		}else{
			return false;
		}
	}
	
	/**
	 * n4jive.sidebarTeamLeaders.getSessionKey()
	 * convenience function to return our sessionKey
	 * @return - a nitro session key for the passed-in nitro object
	 */	
	n4jive.getSessionKey = function(context){
		return context.nitro.connectionParams.sessionKey;			
	}
	
	/**
	 * n4jive.sidebarTeamLeaders.getPointCategory()
	 * convenience function to return the passed in point Category
	 * @return - the provided point category || "Points"
	 */	
	n4jive.getPointCategory = function(){
		if(typeof options.pointCategory != 'undefined'){
			return options.pointCategory;
		}
		return "Points"
	}


    var locale_map = {
        'cs': 'cs-CZ',
        'da': 'da-DK',
        'de': 'de-DE',
        'en': 'en-US',
        'es': 'es-ES',
        'fi': 'fi-FI',
        'fr': 'fr-FR',
        'hu': 'hu-HU',
        'it': 'it-IT',
        'ja': 'ja-JP',
        'ko': 'ko-KR',
        'nl': 'nl-NL',
        'no': 'nb-NO',
        'pl': 'pl-PL',
        'pt': 'pt-PT',
        'ru': 'ru-RU',
        'sv': 'sv-SE',
        'th': null, // there is not match
        'zh': 'zh-CN',
        'zh-CN': 'zh-CN',
        'zh_CN': 'zh-CN'
    };

    n4jive.locale = function (enabled) {
        if (enabled) {
            var pageLocale = $j('html').attr('lang');
            return locale_map[pageLocale];
        }
        else {
            return null;
        }
    };


    n4jive.buildLocaleString = function(locale) {
        if (locale) {
            return "&locale=" + locale;
        }
        else {
            return "";
        }
    };

    n4jive.localeString = function(enabled) {
        var locale = n4jive.locale(enabled);
        return n4jive.buildLocaleString(locale);
    };

    n4jive.extendWithLocale = function (hash, locale) {
        if (locale) {
            return _.extend(hash, {locale: locale});
        }
        else {
            return hash;
        }
    };


})(jQuery);

if (typeof n4jive.workingFactory == 'undefined'){
	n4jive.workingFactory = function(pTarget) {
        var working = $('<div/>', { "class" : "nitro-widget-loading" });

        var topOffset = (pTarget.height() / 2) - 70;

        working.append(
            $('<div/>', { "class" : "loading-icon" }).css('top', (topOffset < 0 ? 0 : topOffset)).css('margin-left', (pTarget.width() - 50) / 2).append(
                $('<img/>', { "src" : "https://assets.bunchball.net/widgets/jiveTest/images/ajax-loader.gif", "width" : "50", "height" : "50" })
            )
        )

        pTarget.prepend(working);

        return function(){
            working.detach();
        };
    }
}
;
