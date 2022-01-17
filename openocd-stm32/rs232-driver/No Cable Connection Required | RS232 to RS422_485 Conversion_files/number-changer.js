// PATENT PENDING

function _vs_popup(url, wid, ht){
    var win;
    ht  = ht  || 600;
    wid = wid || 650;

    win = window.open(url, 'VSPOPUP', "toolbar=no,status=no,location=no,menubar=no,"+
        "resizable=yes,scrollbars=yes,height=" + ht + ",width=" + wid, 'yes');
    win.opener = self;
    win.focus();
    win.location = url;
}


var int_dbg = 0;

function debug(msg) {
    if (int_dbg == 2) {

    } else if ( int_dbg == 1) {
        console.log('v1 int : ' + msg);

    } else {
        if (document.URL.match(/\?.*_vsdebug/)) {
            int_dbg = 1;
            console.log('v1 int : ' + msg); 

        } else {
            int_dbg = 2;

        }
    }
}

// count the digits in a string.
function countDigits ( strippedPhone ) {
    var numDigits = 0;
    var c;
    for (var i = 0; i < strippedPhone.length; ++i) {
        c = strippedPhone.charAt(i);
        if (c >= '0' && c <= '9' ) {
            ++numDigits;
        }
    }
    return numDigits;
}
// eg. endsWith( 'hello there', 'here' ) returns true
function endsWith( str, suffix ) {
    if( ! suffix || ! str ) {
        return false;
    }

    return str.indexOf( suffix, str.length - suffix.length ) !== -1;
}

// vs_intl_class being set to something implies vs_intl to be true
function shouldRewriteIntl( node, vs_intl, vs_intl_class, parentHasIntlClass ) {
    if(    parentHasIntlClass
        || vs_intl && ! vs_intl_class
        || vs_intl_class && node.className === vs_intl_class
    ) {
        return true;
    }

    return false;
}

function findIntlRewriteNum( strippedNumOnPage, isE164, tableOfRewrites ) {
    var i, rewriteCandidate, anyRule, fromNum, intl_rewrite_num;
    var numOfRewrites = tableOfRewrites.length;

    for( i = 0; i < numOfRewrites; i++ ) {
        if( tableOfRewrites[i].repl ) {
            fromNum = tableOfRewrites[i].repl;
            // strip country code from front:
            fromNum = fromNum.replace( /^[+][^0-9]*[0-9]{0,2}[^0-9]*/, "" );
            fromNum = fromNum.replace( /[^0-9]+/g, "" );    // strip non-digits

            if( endsWith( strippedNumOnPage, fromNum ) ) {
                debug("about to rewrite " + strippedNumOnPage + " with number " + tableOfRewrites[i].num);

                if( tableOfRewrites[i].dont === '1' ) {
                    return null;
                }

                if( isE164 ) {
                    return tableOfRewrites[i].pretty_e164;
                } else if (tableOfRewrites[i].pretty_natl != null ) {
                    return tableOfRewrites[i].pretty_natl;
                } else {
                    debug("niether of pretty_e164 and pretty_natl format is defined");
                    debug("for table entry " + i + " which reads " + tableOfRewrites[i] + "\n");
                    debug("So rewriting it with raw number " + tableOfRewrites[i].num);
                    return tableOfRewrites[i].num;
                }

            }
        } else {
            anyRule = tableOfRewrites[i];
            if( tableOfRewrites[i].dont !== '1' ) {
                debug("about to rewrite any number with " + anyRule.num);
                if( isE164 ) {
                    return anyRule.pretty_e164;
                } else if (anyRule.pretty_natl != null ) {
                    return anyRule.pretty_natl;
                } else {
                    return anyRule.num;
                }

            }
        }
    }

    return null;
}

function getRewriteNumber( match, tableOfRewrites ) {
    var intlRewriteNumber;
    var isE164 = 0;
    debug("numbers matched by regex " + match);
    var numOnPage = match[0]; // first index is the match expression

    numOnPage = numOnPage.replace( /[^+0-9]+/g, "" );
    isE164 = ( numOnPage.substring( 0, 1 ) === '+' ) ? 1 : 0;
    numOnPage = numOnPage.replace( /^[+]/, "" );

    if (countDigits(numOnPage) > 20 ) 
    { 
        intlRewriteNumber = null; 
    } else {
        intlRewriteNumber = findIntlRewriteNum( numOnPage, isE164, tableOfRewrites );
    }

    return intlRewriteNumber;
}

function rewriteNodeIntl( node, intlRegex, tableOfRewrites, escFunc, unescFunc ) {
    var number, match;
    var maxMatch = 10;
    switch( node.nodeName ) {
        case '#text':
            number = node.nodeValue;
            while (match = intlRegex.exec(node.nodeValue)) { 
                // returns an array
                var intlRewriteNumber = getRewriteNumber( match, tableOfRewrites );
                if ( intlRewriteNumber) {
                    t = node.nodeValue;
                    node.nodeValue = t.substr( 0, match.index )
                        + intlRewriteNumber
                        + t.substr( match.index + match[0].length );
                }
                
                if ( maxMatch <= 0) {
                    debug("Max no of rewrite per node is reached. aborting this node");
                    break;
                }

                maxMatch--;

            }
            break;

        case 'A': // anchor node
            var text = node.href;
            var numberIndex = text.indexOf('tel:'); // "tel:".length = 4
            if ( numberIndex == -1 ) {
                return;
            }

            numberIndex += 4; // "tel:".length = 4
            number = text.substring(numberIndex);
            number = unescFunc( number ); // firefox is url encoding 'number' 
            match = intlRegex.exec(number);
            break;

        default:
            // node type not supported
    }

    if( ! match ) {
         return;
    }

    var intlRewriteNumber = getRewriteNumber( match, tableOfRewrites );
    if( ! intlRewriteNumber ) {
         return;
    }

    switch( node.nodeName ) {
        case '#text':
            var t = node.nodeValue;
            node.nodeValue = t.substr( 0, match.index )
                + intlRewriteNumber
                + t.substr( match.index + match[0].length );
            break;

        case 'A':
            node.href = 'tel:' + escFunc( intlRewriteNumber );
            node.text = intlRewriteNumber;
            break;
    }
}

function getGeneralIntlRegex() {
    var intlGeneral = /()(\+?[(0-9][\[\]()\-.\s0-9]{4,20}[0-9])($|(?=[^0-9]))/g; 
    return intlGeneral;
}


var mutationListnerAttached = false;
var maxTokens = 1000;
var curTokens = maxTokens;

var addTokens = function() {
    curTokens +=  1000;
    if (curTokens >= maxTokens ) {
        curTokens = maxTokens;
    }

    setTimeout(arguments.callee, 1000); 

}

function attachMutationObserver() 
{
    if ( mutationListnerAttached || (( typeof _is_proxy === 'defined' ) && ( _is_proxy !== true )) ) {
        return;
    }

    mutationListnerAttached = true;
    debug('Mutation Listener Attached =' + mutationListnerAttached);

    // Select the node that will be observed for mutations
    var targetNode = document;

    // Options for the observer (which mutations to observe)
    var config = {  childList: true, subtree: true, characterData: false };

    // Callback function to execute when mutations are observed
    var callback = function(mutationsList, observer) {
        var mutaionIndex = 0;
        for(mutationIndex = 0; mutationIndex < mutationsList.length; ++mutationIndex) {
            if (mutationsList[mutationIndex].type == 'childList') {
                if (mutationsList[mutationIndex].addedNodes.length != 0) {
                    var addedNodeIndex = 0;
                    for (addedNodeIndex = 0; addedNodeIndex < mutationsList[mutationIndex].addedNodes.length; ++addedNodeIndex) {
                        curNode = mutationsList[mutationIndex].addedNodes[addedNodeIndex];
                        if ( curTokens > 0 ) {
                            debug('A child node ' + curNode + 'is added');
                            _vsrkpd.replace_all_numbers(curNode, 0 );
                            curTokens--;
                        } else {
                            debug('All token used, skipping rewrite');
                        }
                    }
                }
            }
            
        }
    };

    // Create an observer instance linked to the callback function
    var observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    //Start adding tokens
    addTokens();

}


var vs_intl;
var vs_intl_class;
var _vsnocookies;
var _vskw;
var _vsrkpd = {

    number_regexp:          new RegExp( '(\\(?)(\\d*)(\\d{3})((?:[)\\s.\\-\\xAD\\xB7\\u2010\\u2011\\u2013\\u2014\\u2015\\u2022\\u2027\\u2043\\u2063\\u2212]|%20)*)(\\d{3})((?:[\\s.\\-\\xAD\\xB7\\u2010\\u2011\\u2013\\u2014\\u2015\\u2022\\u2027\\u2043\\u2063\\u2212]|%20)*)(\\d{4})(\\d*)' ),
    anchor_number_regexp:   new RegExp( '(?:\\s*1\\s*[.-]?\\s*)?(\\(?)(\\d*)(\\d{3})((?:[)\\s.\\-\\xAD\\xB7\\u2010\\u2011\\u2013\\u2014\\u2015\\u2022\\u2027\\u2043\\u2063\\u2212]|%20)*)(\\d{3})((?:[\\s.\\-\\xAD\\xB7\\u2010\\u2011\\u2013\\u2014\\u2015\\u2022\\u2027\\u2043\\u2063\\u2212]|%20)*)(\\d{4})(\\d*)' ),
    UK_intl_number_regexp:  '',
    UK_intl_anchor_regexp:  new RegExp( '\\s*\\+?\\s*(44)(\\(?)(\\d*)(\\d{3})((?:[)\\s.\\-\\xAD\\xB7\\u2010\\u2011\\u2013\\u2014\\u2015\\u2022\\u2027\\u2043\\u2063\\u2212]|%20)*)(\\d{3})((?:[\\s.\\-\\xAD\\xB7\\u2010\\u2011\\u2013\\u2014\\u2015\\u2022\\u2027\\u2043\\u2063\\u2212]|%20)*)(\\d{4})(\\d*)' ),
    LEN_MAX_COOKIE: 4000,
    NUM_NUMDATA_COOKIES: 1,
    numdata: null,
    script: '',
    doc_loaded: false,
    did_rewrite: false,
    v2_unsupported_vars: '',

    dbg: document.URL.match(/\?.*_vsdebug/),

    esc: function(txt){
        if(typeof encodeURIComponent=="function"){
            return encodeURIComponent(txt)
        }else{
            return escape(txt)
        }
    },

    unesc: function(txt){
        if(typeof decodeURIComponent=="function"){
            return decodeURIComponent(txt)
        }else{
            return unescape(txt)
        }
    },

    arg: function(p, v){
        if( v ){
            return p + '=' + this.esc(v) + ';';
        }else{
            return '';
        }
    },

    '_debugtxt': '',

    debug: function(m){
        this._debugtxt = this._debugtxt + m + "\n";
    },

    alert: function(m){
        if( this.dbg ){
            if (typeof console != 'undefined' && typeof console.log == 'function') {
                console.log(m);
            } else {
                alert(m);
            }
        }
    },

    base64: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-",

    encode64: function( phone ) {
        var b = '';
        while( 1 <= phone ) {
            b = b + this.base64.charAt( phone % 64 );
            phone = phone/64;
        }
        return( b );
    },

    decode64: function( b ) {
        var phone = 0;
        var i = b.length;
        while( 0 < i ) {
            phone = 64*phone + this.base64.indexOf( b.charAt(--i) );
        }
        return( '+' + phone );
    },

    set_cookie: function(name, val, exp){
        if (_vsnocookies) return;
        var ck = name + "=" + this.esc( val ) + "; path=/";
        if(exp){
            var now = new Date();
            exp = new Date( now.getTime() + (exp * 1000));
            ck = ck + "; expires=" + exp.toGMTString();
        }

        document.cookie = ck;
    },

    get_specific_cookie: function(n) {
        var s, e, c = document.cookie, n = n + '=';
        while((s = c.indexOf(n)) > -1) {
            if (s && c.charAt(s-1) !== ' ') continue;
            e = c.indexOf(';', s);
            if (e == -1) e = c.length;
            break;
        }
        return e > -1 ? c.substring(s + n.length, e) : null;
    },

    get_cookie: function(n){
        if (_vsnocookies) return null;
        var v = this.get_specific_cookie(n);
        return v == null ? null : this.unesc(v);
    },

    write_numdata: function(name, value, exp) {
        this.numdata = [name,value,exp];
    },

    numdata_notfit: function(name) {
        var i;
        for(i=0; i<120;i++) _vsrkpd.set_cookie(name+'_'+i, '', -1);
        var dom = _vsrkpd.script.replace(/[^\/]+[\/]+/,'').replace(/[\/\?].*/,'').split('.').reverse();
        document.cookie = name + '_cz=1; path=/; domain=' + [dom[1],dom[0]].join('.');
    },

    flush_numdata: function() {
        if (!this.numdata) return;
        var name = this.numdata[0], value = this.numdata[1], exp = this.numdata[2];
        var str = '', num = 0, i, now = null;
        if (!value) return;
        if (exp) exp = '; expires=' + ((new Date((new Date()).getTime() + (exp * 1000))).toGMTString());
        else exp = '';
        function write_cookie () {
            var cklen = (document.cookie).length;
            document.cookie = ((name + '_' + num) + '=' + str + '; path=/' + exp);
            num++;
            str = '';
            if ((''+document.cookie).length < cklen) throw new Error('!');
        }
        function append_record (data) {
            if (str.length + data.length > _vsrkpd.LEN_MAX_COOKIE) write_cookie();
            if (str.length) str += '&';
            str += data;
        }
        try {
            _vsrkpd.set_cookie(name, '', -1);
            for (i = 0; i < value.length; i++) {
                var rec = '', k;
                for (k in value[i]) {
                    var v = value[i][k];
                    if (rec.length) rec += ':';
                    rec += [k, (k=='txtl'||k=='txtr') ? _vsrkpd.esc(v) : v].join(':');
                }
                append_record(rec);
                if (num >= _vsrkpd.NUM_NUMDATA_COOKIES) break;
            }
            append_record(':');
            write_cookie();
        }catch(e){
            _vsrkpd.numdata_notfit(name)
        };
    },

    has_numdata: function (name) {
        if (_vsnocookies) return false;
        var c = document.cookie;
        name += '_0=';
        if (c.indexOf(name) == 0) return true;
        if (c.indexOf('; '+name) > -1) return true;
        return false;
    },


    read_numdata: function (name) {
        var num = 0, data = [], cookie = document.cookie;
        function add_recs (recs) {
            var i;
            if (!recs || !recs.length) return true;
            for (i = 0; i < recs.length; i++) {
                var j, rec = {}, kvps = recs[i].split(':');
                if (!kvps || !kvps.length) return true;
                for (j = 0; j < kvps.length; j += 2) {
                    if (kvps[j].length == 0) return true;
                    rec[kvps[j]] = kvps[j+1];
                }
                data.push(rec);
            }
            return false;
        }
        while(true) {
            var cv = this.get_specific_cookie( name + '_' + (num++) );
            if ( cv == null ) break;
            if ( add_recs(cv.split('&')) ) break;
        }
        return data;
    },

    extract_keyword_from_url: function (kwparam, url) {
        var query = url.replace(/.*\?/,'').split(/[&;]/g);
        if (query && query.length) {
            var i;
            for (i = 0; i < query.length; i++) {
                var kvp = query[i].split('=',2);
                if (kvp[0] === kwparam) {
                    return decodeURIComponent(kvp[1]);
                }
            }
        }
        return '';
    },

    ckw_get_number_data: function () {
        if (vs_account_id) _vsrkpd.d = this.read_numdata('rkpd_'+vs_account_id);
    },

    get_number_data: function() {
        if( ! vs_account_id ){
            _vsrkpd._ds.parseDomForNumbers();
            // misconfigured. user did not set the account id
            return ;
        }
        var n = 'rkpd_' + vs_account_id;
        var has_numdata = this.has_numdata(n);

        var ignck = _vsnocookies || document.URL.match(/\?.*_vsignck/);

        // get kw from cookie
        var kw_cookie = 'kw_' + vs_account_id;
        var prev_kw = this.get_cookie(kw_cookie);
        var ckw_chk = 0;
        var new_kw;
        var cur_kw = _vskw || '';
        var custom_kw_param = '';
        if (typeof prev_kw === 'string' && prev_kw.match(/=/)) {
            var kvp = prev_kw.split('=',2);
            prev_kw = kvp[1];
            custom_kw_param = kvp[0];
        }
        if (!cur_kw) {
            if (custom_kw_param) {
                var found_kw = this.extract_keyword_from_url(custom_kw_param, document.URL);
                if (found_kw) {
                    cur_kw = found_kw;
                }
                else {
                    custom_kw_param = '';
                }
            } else {
                ckw_chk = 1;
                ignck = true;
            }
        }
        else {
            custom_kw_param = '';
        }

        // if we don't have a keyword cookie, or if the current keyword is
        // different than the old one, set the cookie and re-fetch data
        if (cur_kw) {
            new_kw = cur_kw;
            if ((!prev_kw) || (new_kw && new_kw != prev_kw)) {
                has_numdata = false;
                ignck = true;
                if (custom_kw_param) new_kw = custom_kw_param + '=' + new_kw;
                this.set_cookie(kw_cookie, new_kw, 86400 * 365);
            }
        }

        if( has_numdata && !ignck ) {
            this.ckw_get_number_data();
            this.rewrite_document_onload();
        } else {
            // fetch data
            var url = "https://rw1.marchex.io/euinc/getnumdata.js?"
                + this.arg( 'var', '_vsrkpd.d' )
                + this.arg( 'acc', window.vs_account_id )
                + this.arg( 'cky', n )
                + this.arg( 'ign', ignck ? 1 : 0 )
                + this.arg( 'ref', document.referrer )
                + this.arg( 'url', document.URL )
                + this.arg( 'has_v1_only', this.v2_unsupported_vars )
                + this.arg( 'ckw_chk', _vsnocookies ? false : has_numdata && ckw_chk )
                + this.arg( 'is_proxy' , window._is_proxy);
            if( typeof vs_ref_override != 'undefined' && vs_ref_override )
                url += this.arg('ref_ovrd', vs_ref_override);
            if( _vskw )
                url += this.arg( 'keyword', _vskw )
            else if( prev_kw && ! new_kw )
                url += this.arg( 'keyword', prev_kw );

            this.debug( "no cookie[" + n + "*] (" + !!_vsnocookies + ") fetch: " + url);

            var top = this.get_first_element_child( document.documentElement );
            var script = this.new_element( 'SCRIPT',
                [ 'type', 'text/javascript', 'src', url ] );

            top.insertBefore( script, this.get_first_element_child( top ) );
            this.rewrite_document_onload();
        }
    },

    get_uk_country_code: function( e164 ) {
        if( ! e164 ) return '';
        var match = e164.match( /^(\+44)/ );
        return match ? match[1] : '';
    },

    add_local_prefix: function( number ) {
        //default local prefix is 0
        var local_prefix = '0';
        return local_prefix+number;
    },

    new_element: function( type, attribs ) {
        var elt = document.createElement(type);
        while( attribs.length ) {
            elt.setAttribute( attribs[0], attribs[1] );
            attribs.splice( 0, 2 );
        }
        return elt;
    },

    ctn: { },

    track_ctn: function( phone ) {
        var intl = '+1' + phone;
        intl.replace( /^\+1\+/, '+' );
        if( this.ctn[intl] ) return;
        this.ctn[intl] = 1;
    },

    rewrite_number: function( m, rltext, strip ) {
        // (, x, 111, ), 555, -, 1234, x

        var numfull = '' + m[1] + m[2] + m[3] + m[4] + m[5] + m[6] + m[7] + m[8];

        if( m[2] != '' || m[8] != '' ) {
            this.debug( "not a number: " + numfull );
            return null;
        }

        var num = '' + m[3] + m[5] + m[7];

        var pd = this.d;
        var rw, lk, na, nb, nc, rwtxt, rw_local;
        var nr = pd.length;
        var i;
        for( i=0; i<nr; i++ ) {

            //change e164 rewrite number to local format
            var match_num = pd[i].repl;
            var match_cc = this.get_uk_country_code(match_num);
            if( match_cc ) match_num = this.add_local_prefix(
                match_num.substring(match_cc.length) );
            if ( (! match_num) && ( num == pd[i].num ) ) {
                //do not rewrite already rewritten number;
                continue;
            }
            if( match_num == num || ! match_num ) {

                if( pd[i].dont ) break;
                rw = pd[i].num;

                if( rw ) {
                    this.track_ctn( rw );
                    rw_local = rw;
                    var rw_cc = this.get_uk_country_code(rw);
                    if( rw_cc ) {
                        rw_local = rw.substring(rw_cc.length);
                        rw = this.add_local_prefix( rw_local );
                    }
                    if( ! strip ) {
                        na = rw_local.substring( 0, 3 );
                        if( rw_cc ) na = this.add_local_prefix( na );
                        nb = rw_local.substring( 3, 6 );
                        nc = rw_local.substring( 6 );
                        rw = '' + m[1] + m[2] + na + m[4] + nb + m[6] + nc;
                    }
                    this.debug( "rewriting: " + numfull + " => " + rw );
                } else {
                    pd[i].ctcp = 1;   // no number, force ctc
                    this.debug( "rewriting: " + numfull + " => click-to-call" );
                }

                rwtxt = '';
                if( rltext && pd[i].txtl ) rwtxt += _vsrkpd.unesc(pd[i].txtl);
                if( rw )                   rwtxt += rw;
                if( rltext && pd[i].txtr ) rwtxt += _vsrkpd.unesc(pd[i].txtr);

                if( ! rwtxt ) {
                    // provide default text if none
                    rwtxt = 'Click-To-Call';
                }
                if( pd[i].ctcp ) {
                    lk = 'https://rw1.marchex.io/euinc/ctc/callformpop?cmp=' + pd[i].cmp;
                }

                return { text: rwtxt, href: lk, cmp: pd[i].cmp };
            }
        }

        return null;
    },

    rewrite_anchor_node: function(node) {
        var txt = node.href;
        //"tel:".length = 4
        var i = txt.indexOf('tel:')+ 4;
        var num = txt.substring(i);
        // match against e164 pattern first: +44808-123-4567
        var cc_m = this.UK_intl_anchor_regexp.exec(num);
        var cc = '';
        var m;
        if( cc_m ) {
            cc = cc_m[1]; //+44
            // put together the rest of digits and any characters (.-)
            // and change to local international format: 0808-123-4567
            num = cc_m[2] + '0' + cc_m[3] + cc_m[4] + cc_m[5] + cc_m[6] + cc_m[7] + cc_m[8] + cc_m[9];
        }
        // match against local international number format: 0808-123-4567
        m = this.UK_intl_number_regexp.exec(num);
        // match US numbers
        if( ! m ) m = this.anchor_number_regexp.exec(num);
        if( ! m ) return; //no match

        var rw = this.rewrite_number( m, false, true ); // match, rltext, strip
        if( ! rw ) return; // number unchanged

        node.href = 'tel:' + cc + this.esc(rw.text);
    },

    rewrite_text_node: function(node){
        var number = node.nodeValue;
        var m = this.UK_intl_number_regexp.exec( number );

        if( ! m ) m = this.number_regexp.exec( number );

        if( ! m ) return;       // no match

        var rw = this.rewrite_number( m, true, false ); // match, rltext, strip

        if( ! rw ) return;      // number unchanged

        // split into 3 nodes => text, number, text
        var n2 = node.splitText( m.index );
        n2.splitText( m[0].length );

        n2.nodeValue = rw.text;

        if( ! rw.href ) return; // no ctc

        var a = document.createElement('A');
        node.parentNode.replaceChild(a, n2);
        a.appendChild(n2);
        a.href = '#';
        a.className = 'vsctcnumber';
        if( this.dbg ) {
            a.title = 'cmp:' + rw.cmp;
        } else {
            a.title = 'Click To Call';
        }

        a.onclick = function() {
            _vs_popup( rw.href, 300, 200 );
        };
    },

    replace_all_numbers: function( node, parentHasIntlClass ) {
        var shouldRwIntl = 0;

        if( ! node ) return;

        // skip certain types?
        if( node.nodeName == 'SCRIPT' || node.nodeName == 'STYLE' ) return;

        // handle special spans?
        if( node.className == 'vsnotnumber' ) return;

        // rewrite this node text
        shouldRwIntl = shouldRewriteIntl(
                            node, vs_intl, vs_intl_class, parentHasIntlClass );

        if( shouldRwIntl ) {
            rewriteNodeIntl( node, this.intl_general_regexp, this.d, this.esc, this.unesc );
        } else {
            if( ! vs_intl && ! vs_intl_class ) {
                switch( node.nodeName ) {
                    case '#text':
                        this.rewrite_text_node( node );
                        break;

                    // rewrite <a href="tel:xxx"> tags, possibly added by mobile devices
                    case 'A':
                        this.rewrite_anchor_node(node);
                        break;

                    default:
                        // node type not supported
                }
            }
        }

        // walk children nodes
        var nn, i;

        for(i=0; i<node.childNodes.length; i++){
            nn = node.childNodes.length;
            this.replace_all_numbers( node.childNodes[i], shouldRwIntl );
            if( node.childNodes.length != nn ){
                // extra nodes were added for CTC link. skip link
                i++;
            }
        }
    },

    // built this function because Internet Explorer doesn't handle finding first element child
    // http://stackoverflow.com/questions/6333249/firstelementchild-doesnt-work-in-internet-explorer-7-what-are-my-options
    get_first_element_child: function( parentElement ) {
        // check that firstElementChild exists
        if( typeof parentElement.firstElementChild === 'function' ) {
            return parentElement.firstElementChild;
        }

        var node = parentElement.firstChild;
        var firstElementChild = null;

        for( ; node; node = node.nextSibling ) {
            if( node.nodeType === 1 ) {
                firstElementChild = node;
                break;
            }
        }

        return firstElementChild;
    },

    getnum_error: function(m){
        this.debug(m);
        if( _vsrkpd._debugtxt ){
            this.alert('DEBUG\n' + _vsrkpd._debugtxt );
        }
    },

    do_rewrite: function () {
        _vsrkpd.replace_all_numbers( document, 0 );
        if (this.numdata) _vsrkpd.flush_numdata();
    },

    rewrite_document_onload: function() {
        if( document.readyState === 'complete' ) {
            _vsrkpd.load_rewrite();
        } else {
            var o = window.onload;
            window.onload = function() {
                _vsrkpd.load_rewrite();
                if(o) o();
            };
        }
    },

    load_rewrite: function() {
        if( ! _vsrkpd.did_rewrite && _vsrkpd.d ) {
            _vsrkpd.did_rewrite = true;
            _vsrkpd.rewrite_document();
        }
        _vsrkpd.doc_loaded = true;
        _vsrkpd._ds.parseDomForNumbers();
    },

    rewrite_document: function() {
        _vsrkpd.do_rewrite();
         _vsrkpd._ds.parseDomForNumbers();
        if( _vsrkpd._debugtxt ) {
            _vsrkpd.alert( 'DEBUG\n' + _vsrkpd._debugtxt );
        }

        attachMutationObserver();

    },

    has_vars_unsupported_in_v2: function(){
        // these are unsupported in v2 as of 2015/12/03
        // leading underbars choke in Graphite names
        var unsupported_list = '';
        if (  document.URL.match(/\?.*_vsignck/ ) ) {
            unsupported_list = 'vsignck';
        }
        if ( typeof vs_intl !== 'undefined' && !!vs_intl  ){
            if (unsupported_list.length > 0){
                unsupported_list += 'X';
            }
            unsupported_list += 'vs_intl';
        }
        if (typeof vs_intl_class !== 'undefined' && !!vs_intl_class ){
            if (unsupported_list.length > 0){
                unsupported_list += 'X';
            }
            unsupported_list += 'vs_intl_class';
        }
        if (typeof _vskw !== 'undefined' && !!_vskw ){
            if (unsupported_list.length > 0){
                unsupported_list += 'X';
            }
            unsupported_list += 'vskw';
        }
        if (unsupported_list.length > 0) {
            _vsrkpd.v2_unsupported_vars = unsupported_list;
            return true;
        }
        return false;
    },

    should_redirect_v2: function(){
        var self = _vsrkpd;
        var accounts = [];
        var want_to_v2 = false;
        var can_v2 = true;
            accounts[ 'CA6pr1Xx6-5DDAB_' ] = 1;
            accounts[ 'CtjSslXx7OJbYABH' ] = 1;
            accounts[ 'CA6pr1Xx6nA9iQAv' ] = 1;
            accounts[ 'CtjSslXx6wlTkgC6' ] = 1;
        if( accounts[vs_account_id] == 1 ){
            want_to_v2 = true;
        }
        if ('0' === '1'){
            can_v2 = false;
        }
        if ( self.has_vars_unsupported_in_v2() ) {
            can_v2= false;
        }
        if (want_to_v2 && ! can_v2){
            // ping a graphite counter
            if ( _vsrkpd.v2_unsupported_vars.length > 0 ){
                _vsrkpd.v2_unsupported_vars += 'X';
            }
            _vsrkpd.v2_unsupported_vars += 'v2fail';
        }
        return (want_to_v2 && can_v2);
    },

    redirect_account_v2: function(){
        // 'sendtov2' is arbitrary (normally we put an rule set id)
        var redirect_url= "https://rw.marchex.io/2/sendtov2";
        var script = document.createElement( 'script' );
        script.src = redirect_url;
        script.onerror = _vsrkpd.do_v1_rewrite;
        document.body.appendChild( script );
    },

    do_v1_rewrite: function() {
        var self = _vsrkpd; // We shouldn't use 'this' since we copy this function to another object (script)
        var UK_intl_pat = '\\s*(\\(?)(\\d*)(0808)((?:[\\s\\)\\.\\-]|%20)*)(\\d{3})((?:[\\s\\.\\-]|%20)*)(\\d{4})(\\d*)';

        self.UK_intl_number_regexp = new RegExp(UK_intl_pat); // only matches UK
        self.intl_general_regexp = getGeneralIntlRegex(); // located in intl.js
        var scripts = document.getElementsByTagName('script');
        self.script = scripts[scripts.length - 1].src;

        self.get_number_data();
    },

    _ds : {
        postParameters: "",
        firstParameter:true,
        hasBeenExecuted:false,

        inArray: function(needle, haystack) {
            var length = haystack.length;
            for (var i = 0; i < length; i++) {
                if (haystack[i] == needle)
                    return true;
            }
            return false;
        },


        genRandomNumParam: function(){
            var key = "c";
            var value;
            try{
                value = Date.now();
            } catch(ignore) {
                value = 1;
            }
            _vsrkpd._ds.addParamLocal(key,value);
        },

        addParamLocal: function(key, value) {
            if(_vsrkpd._ds.firstParameter===true){
                _vsrkpd._ds.postParameters += "?" + key + "=" + value;
                _vsrkpd._ds.firstParameter = false;
            }
            else {
                _vsrkpd._ds.postParameters += "&" + key + "=" + value;
            }
        },

        //Recursive aggregation of all text nodes
        checkNode: function(node) {
            var text = "";

            if (node.nodeType == 3) {
                return node.data;
            }
            else { // walks the node's children
                var i;
                for (i = 0; i < node.childNodes.length; i++) {
                    text += " (" + this.checkNode(node.childNodes[i]) + ") ";
                }
            }
            return text;
        },

        formatPhoneNumberParameter: function(phoneNumbers){
            if(typeof  phoneNumbers !=='undefined' && phoneNumbers !== "") {
                var i;
                var key = "p";
                var value = "";
                for (i = 0; i < phoneNumbers.length; i += 1) {
                    value += phoneNumbers[i] + ",";
                }
                value = value.substring(0, value.length - 1);
                if (value != "") {
                    _vsrkpd._ds.addParamLocal(key, value);
                }
            }
        },

        findPhoneNumbers: function() {
            var phoneNumbers = _vsrkpd._ds.checkNode(document).match(/(\(?)(\d*)(\d{3})((?:[\s\)\.\-]|%20)*)(\d{3})((?:[\s\.\-]|%20)*)(\d{4})(\d*)/g);
            if(typeof  phoneNumbers ==='undefined' || phoneNumbers === null) {
                return "";
            }
            return phoneNumbers;
        },

        clean: function(numbers) {
            var i;
            for (i = 0; i < numbers.length; i += 1) {
                numbers[i] = numbers[i].replace(/[\s\-\(\)\.]/g, "");
            }
            return numbers;
        },

        distinct: function(arr) {
            var i, a, target = [];
            for (i = 0, a = arr.length; i < a; i++) {
                var obj = arr[i];
                if (!_vsrkpd._ds.inArray(obj, target)) {
                    target.push(obj);
                }
            }
            return target;
        },

        validPhoneNumber: function(numbers) {
            var validNumbers = [];
            var i;
            for (i = 0; i < numbers.length; i += 1) {
                if (numbers[i].length == 10) {
                    validNumbers.push("+1" + numbers[i]);
                }
                else if (numbers[i].length == 11 && numbers[i].substring(0, 1) == "1") {
                    validNumbers.push("+" + numbers[i]);
                }
            }
            return validNumbers;
        },

        encodePhoneNumbers: function(phoneNumbers) {
            var base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-";
            var encodedPhoneNumbers = [];
            var i;
            for (i = 0; i < phoneNumbers.length; i += 1) {
                var b = '';
                var phone = phoneNumbers[i];
                while (1 <= phone) {
                    b = b + base64.charAt(phone % 64);
                    phone = phone / 64;
                }
                encodedPhoneNumbers[i] = b;
            }
            return encodedPhoneNumbers;
        },

        findCleanNumbers: function() {
            var cleanPhoneNumbers = this.encodePhoneNumbers(this.validPhoneNumber(this.distinct(this.clean(this.findPhoneNumbers()))));
            if(typeof  cleanPhoneNumbers ==='undefined' || cleanPhoneNumbers === null) {
                return "";
            }
            return cleanPhoneNumbers;
        },

        buildUrl: function(baseUrl) {
            return baseUrl + _vsrkpd._ds.postParameters;
        },

        createPixel: function(url) {
            var pixel = document.createElement("IMG");
            pixel.style.display = "none";
            pixel.src = url;
            pixel.alt = '';
        },

        parseDomForNumbers: function(){
            if(!_vsrkpd._ds.hasBeenExecuted) {
                _vsrkpd._ds.hasBeenExecuted=true;

                _vsrkpd._ds.postParameters = "";
                _vsrkpd._ds.genRandomNumParam();
                _vsrkpd._ds.createPixel(_vsrkpd._ds.buildUrl("https://px.marchex.io/pixel.gif"));
                _vsrkpd._ds.formatPhoneNumberParameter(_vsrkpd._ds.findCleanNumbers());
                _vsrkpd._ds.createPixel(_vsrkpd._ds.buildUrl("https://px.marchex.io/pixel.gif"));

            }
        }
    }
};

setTimeout(function(){ _vsrkpd._ds.parseDomForNumbers(); }, 4000);
if( _vsrkpd.should_redirect_v2() ) {
    _vsrkpd.redirect_account_v2();
}else{
    _vsrkpd.do_v1_rewrite();
}

