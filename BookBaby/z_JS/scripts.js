function signupBBP(e) {
    var button = this,
        $emailinput = $(button).closest(':has(#control_EMAIL)').find('#control_EMAIL');
    $emailinput.attr('name', 'Email');
    this.form.action = 'https://www.pages04.net/discmakers-cdbaby/Web_Leads_Masterlist/Footer?Source=BBPFOOTER&initialsource=BBPFOOTER&vs=NGRkZGEwMDYtYjFmZi00YTE3LWE3MGUtYzIyY2UyNGRiMmMxOzsS1';
    button.onclick = null;
    setTimeout(function () { button.click() });
}

function focusSignUpEmail(e) {
    e.preventDefault();
    var label = e.target || e.srcElement,
        $emailinput = $(label).closest(':has(#control_EMAIL)').find('#control_EMAIL');
    $emailinput.focus();
    return false;
}