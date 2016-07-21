function startLogin(providerbutton) {
    var provider = providerbutton;
    var oidbase = '';
    var getoidpart = 'false';
    var extra = '';
    var action = '';
    switch (provider) {
        case 'facebook':
            action = 'https://' + realm + '/facebook/connect_start';
            extra = '<input type="hidden" name="ext_perm" value="email" />';
            break;
        case 'google':
            action = 'https://' + realm + '/openid/start';
            oidbase = 'https://www.google.com/accounts/o8/id';
            break;
        case 'myspace':
            action = 'https://' + realm + '/myspace/start';
            break;
        case 'twitter':
            action = 'https://' + realm + '/twitter/start';
            oidbase = 'https://openid.aol.com/{screenname}';
            break;
    }
    loginpop = window.open('', 'name', 'height=470,width=630');
    if (window.focus) { loginpop.focus() }
    
    var popupDoc = '';
    popupDoc += '<!DOCTYPE HTML>' + "\n";
    popupDoc += '<html><head><title>Login</title>' + "\n";
    popupDoc += '<scr' + 'ipt type="text/javascript" src="/JS/engage-custom-ui.js"></scr' + 'ipt>' + "\n";
    popupDoc += '</head>' + "\n";
    popupDoc += '<body onload="launchLogin(\'' + provider + '\',' + getoidpart + ')">' + "\n";
    popupDoc += '<form id="' + provider + '" name="' + provider + '" action="' + action + '" method="GET">' + "\n";
    if (oidbase != null && oidbase != '') {
        popupDoc += '<input type="hidden" name="openid_identifier" value="' + oidbase + '" />' + "\n";
    }
    popupDoc += '<input type="hidden" name="token_url" value="' + tokenurl + '" />' + "\n";
    try {
        popupDoc += '<input type="hidden" name="bp_channel" value="' + Backplane.getChannelID() + '" />' + "\n";
    } catch (err) {
    }
    if (extra != null && extra != '') {
        popupDoc += extra + "\n";
    }
    popupDoc += '</form>' + "\n";
    popupDoc += '</body></html>';
    loginpop.document.write(popupDoc);

    loginpop.document.close();
}
function launchLogin(provider, getoidpart) {
    if (getoidpart == true) {
        var theform = document.getElementById(provider);
        var lefty = theform.openid_identifier.value.indexOf('{');
        var righty = theform.openid_identifier.value.indexOf('}');
        var length = righty - lefty;
        var special = theform.openid_identifier.value.substr(lefty, length + 1);
        var oidpart = getCookie("engageOidPart");
        if (oidpart == null || oidpart == "") {
            var prefill = special;
        } else {
            var prefill = oidpart;
        }
        var trimspecial = theform.openid_identifier.value.substring(lefty + 1, righty);
        var theprompt = "What is your " + provider + " " + trimspecial + "?";
        var oidpart = prompt(theprompt, prefill);
        if (oidpart != null && oidpart != "" && oidpart != special) {
            setCookie("engageOidPart", oidpart, 364);
            var rawoid = theform.openid_identifier.value;
            var oid = rawoid.replace(special, oidpart);
            theform.openid_identifier.value = oid;
        } else {
            self.close();
        }
    }
    setCookie('engageProvider', provider, 364);
    document.getElementById(provider).submit();
}
function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}
function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}
function checkProviderCookie() {
    var provider = getCookie("engageProvider");
    if (provider != null && provider != "") {
        thebutton = document.getElementById(provider + "_button");
        thebutton.className += " return_exp";
    }
}
