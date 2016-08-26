<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="../MasterPage.master" CodeFile="../Default.aspx.cs" Inherits="Default" %>
<asp:Content runat="server" ContentPlaceHolderID="pageContent">






<div class="container-fluid section-padding-default bg-lt-grey mt-60 pb-20">
    <div class="container">
          
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 text-left text-center-xs text-center-sm">

            <div class="col-lg-12 col-md-12">
                <h1 class="title no-shadow mt-0"><strong>The author’s handbook to more effective marketing on Amazon</strong></h1>
                <p class="lead"><em>Use this free eBook to increase your book’s status and sales</em></p>
            </div>
            <div class="col-lg-12 col-md-12 mtb-40 free-guide-img">
                <img src="/images/request-marketing-amazon.png" alt="Marketing Your Book On Amazon" title="Marketing Your Book On Amazon" width="420" height="449" class="img-responsive center-block mb-10">
            </div>

        </div>




        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

            <div class="responsive-form" id="request-form">

             <p>Learn how to optimize your Amazon book page as author Shelley Hitz walks you through 21 chapters you can apply today for future online success. <strong>Download your free copy today!</strong></p>
             <p>Fill out the information below to download the PDF instantly!</p>

                

            <fieldset id="personal-container">
                <legend>Personal Information</legend>

                <div class="warning-messages">
                </div>


                <ul class="overlayform">
                    <li>
                        <p class="textbox-mask txt-name" title="Please enter your first name."><label for="contentMain_ucEmailNameAddress_txtFirstName" id="contentMain_ucEmailNameAddress_lblFirstName">First Name</label> <input class="textbox focus" data-validation="req-field" id="contentMain_ucEmailNameAddress_txtFirstName" maxlength="20" name="ctl00$contentMain$ucEmailNameAddress$txtFirstName" tabindex="4" type="text"> <i class="input-status input-warning icon-attention" onclick="return ShowValidationMessage(event, $(this));" title="Please enter your first name."></i></p>
                    </li>


                    <li>
                        <p class="textbox-mask txt-name" title="Please enter your last name."><label for="contentMain_ucEmailNameAddress_txtLastName" id="contentMain_ucEmailNameAddress_lblLastName">Last Name</label> <input class="textbox" data-validation="req-field" id="contentMain_ucEmailNameAddress_txtLastName" maxlength="20" name="ctl00$contentMain$ucEmailNameAddress$txtLastName" tabindex="5" type="text"> <i class="input-status input-warning icon-attention" onclick="return ShowValidationMessage(event, $(this));" title="Please enter your last name."></i></p>
                    </li>
                </ul>


                <ul>
                    <li>
                        <p class="textbox-mask txt-email" title="Please enter your email address."><label for="contentMain_ucEmailNameAddress_txtEmail" id="contentMain_ucEmailNameAddress_lblEmail">Email Address</label> <input class="textbox" data-validation="req-email" id="contentMain_ucEmailNameAddress_txtEmail" maxlength="50" name="ctl00$contentMain$ucEmailNameAddress$txtEmail" tabindex="6" type="text"> <i class="input-status input-warning icon-attention" onclick="return ShowValidationMessage(event, $(this));" title="Please enter your email address."></i></p>
                    </li>
                </ul>
            </fieldset>


            <fieldset id="address-container">
                <div id="contentMain_ucEmailNameAddress_upAddressPanel">
            
                    <legend>Contact Information</legend>

                    <div class="warning-messages"></div>


                    <ul>
                        <li>
                            <p class="dropdown-mask dd-country" title="Please choose your country."><label class="inputted" for="contentMain_ucEmailNameAddress_ddlCountries" id="contentMain_ucEmailNameAddress_lblCountry">Country</label> <select class="dropdown no-reset hasCustomSelect" data-validation="req-selection" id="contentMain_ucEmailNameAddress_ddlCountries" name="ctl00$contentMain$ucEmailNameAddress$ddlCountries" onchange="javascript:setTimeout('__doPostBack(\'ctl00$contentMain$ucEmailNameAddress$ddlCountries\',\'\')', 0)" style="-webkit-appearance: menulist-button; width: 100%; position: absolute; opacity: 0; z-index: 3; height: 37px; font-size: 14px;" tabindex="7">
                                <option selected="selected" value="US">
                                    United States of America
                                </option>

                                <option value="USV">
                                    U.S. – Virgin Islands
                                </option>

                                <option value="AF">
                                    Afghanistan
                                </option>

                                <option value="ALI">
                                    Aland Islands
                                </option>

                                <option value="ALB">
                                    Albania
                                </option>

                                <option value="ALG">
                                    Algeria
                                </option>

                                <option value="AS">
                                    American Samoa
                                </option>

                                <option value="AN">
                                    Andorra
                                </option>

                                <option value="ANG">
                                    Angola
                                </option>

                                <option value="ANGU">
                                    Anguilla
                                </option>

                                <option value="ATC">
                                    Antarctica
                                </option>

                                <option value="ANT">
                                    Antigua
                                </option>

                                <option value="ARG">
                                    Argentina
                                </option>

                                <option value="ARM">
                                    Armenia
                                </option>

                                <option value="AR">
                                    Aruba
                                </option>

                                <option value="AU">
                                    Australia
                                </option>

                                <option value="AT">
                                    Austria
                                </option>

                                <option value="AZ">
                                    Azerbaijan
                                </option>

                                <option value="BAH">
                                    Bahamas
                                </option>

                                <option value="BA">
                                    Bahrain
                                </option>

                                <option value="BAN">
                                    Bangladesh
                                </option>

                                <option value="BAR">
                                    Barbados
                                </option>

                                <option value="BEL">
                                    Belarus
                                </option>

                                <option value="BE">
                                    Belgium
                                </option>

                                <option value="BELI">
                                    Belize
                                </option>

                                <option value="BEN">
                                    Benin
                                </option>

                                <option value="BER">
                                    Bermuda
                                </option>

                                <option value="BH">
                                    Bhutan
                                </option>

                                <option value="BO">
                                    Bolivia
                                </option>

                                <option value="BON">
                                    Bonaire
                                </option>

                                <option value="BOS">
                                    Bosnia
                                </option>

                                <option value="BOT">
                                    Botswana
                                </option>

                                <option value="BV">
                                    Bouvet Island
                                </option>

                                <option value="BR">
                                    Brazil
                                </option>

                                <option value="IO">
                                    British Indian Ocean Territory
                                </option>

                                <option value="BRU">
                                    Brunei
                                </option>

                                <option value="BUL">
                                    Bulgaria
                                </option>

                                <option value="BUR">
                                    Burkina Faso
                                </option>

                                <option value="BURU">
                                    Burundi
                                </option>

                                <option value="CAM">
                                    Cambodia
                                </option>

                                <option value="CAME">
                                    Cameroon
                                </option>

                                <option value="CA">
                                    Canada
                                </option>

                                <option value="CAP">
                                    Cape Verde
                                </option>

                                <option value="CAY">
                                    Cayman Islands
                                </option>

                                <option value="CEN">
                                    Central African Republic
                                </option>

                                <option value="CHA">
                                    Chad
                                </option>

                                <option value="CL">
                                    Chile
                                </option>

                                <option value="CHI">
                                    China
                                </option>

                                <option value="CX">
                                    Christmas Island
                                </option>

                                <option value="CC">
                                    Cocos Islands (Keeling)
                                </option>

                                <option value="CO">
                                    Colombia
                                </option>

                                <option value="COM">
                                    Comoros
                                </option>

                                <option value="CON">
                                    Congo
                                </option>

                                <option value="ZAI">
                                    CONGO, Democratic Republic of (Zaire)
                                </option>

                                <option value="COO">
                                    Cook Islands
                                </option>

                                <option value="CR">
                                    Costa Rica
                                </option>

                                <option value="COT">
                                    Cote D'Ivoire
                                </option>

                                <option value="CRO">
                                    Croatia
                                </option>

                                <option value="CUB">
                                    Cuba
                                </option>

                                <option value="CU">
                                    Curacao
                                </option>

                                <option value="CY">
                                    Cyprus
                                </option>

                                <option value="CZR">
                                    Czech Republic
                                </option>

                                <option value="DK">
                                    Denmark
                                </option>

                                <option value="DJ">
                                    Djibouti
                                </option>

                                <option value="DOMI">
                                    Dominica
                                </option>

                                <option value="DO">
                                    Dominican Republic
                                </option>

                                <option value="ECU">
                                    Ecuador
                                </option>

                                <option value="EGY">
                                    Egypt
                                </option>

                                <option value="ELS">
                                    El Salvador
                                </option>

                                <option value="ENG">
                                    England
                                </option>

                                <option value="GQ">
                                    Equatorial Guinea
                                </option>

                                <option value="ER">
                                    Eritrea
                                </option>

                                <option value="EST">
                                    Estonia
                                </option>

                                <option value="ETH">
                                    Ethiopia
                                </option>

                                <option value="FI">
                                    Falkland Islands
                                </option>

                                <option value="FAI">
                                    Faroe Islands
                                </option>

                                <option value="FIJI">
                                    Fiji Islands
                                </option>

                                <option value="FIN">
                                    Finland
                                </option>

                                <option value="FR">
                                    France
                                </option>

                                <option value="FRG">
                                    French Guiana
                                </option>

                                <option value="FRP">
                                    French Polynesia
                                </option>

                                <option value="TF">
                                    French Southern Territories
                                </option>

                                <option value="GAB">
                                    Gabon
                                </option>

                                <option value="GAM">
                                    Gambia
                                </option>

                                <option value="GEO">
                                    Georgia
                                </option>

                                <option value="DE">
                                    Germany
                                </option>

                                <option value="GH">
                                    Ghana
                                </option>

                                <option value="GIB">
                                    Gibraltar
                                </option>

                                <option value="GR">
                                    Greece
                                </option>

                                <option value="GRE">
                                    Greenland
                                </option>

                                <option value="GREN">
                                    Grenada
                                </option>

                                <option value="GUAD">
                                    Guadeloupe
                                </option>

                                <option value="GUAM">
                                    Guam
                                </option>

                                <option value="GUA">
                                    Guatemala
                                </option>

                                <option value="GG">
                                    Guernsey
                                </option>

                                <option value="GUI">
                                    Guinea
                                </option>

                                <option value="GUIB">
                                    Guinea-Bissau
                                </option>

                                <option value="GUY">
                                    Guyana
                                </option>

                                <option value="HAI">
                                    Haiti
                                </option>

                                <option value="HM">
                                    Heard Island And McDonald Islands
                                </option>

                                <option value="HO">
                                    Honduras
                                </option>

                                <option value="HK">
                                    Hong Kong
                                </option>

                                <option value="HUN">
                                    Hungary
                                </option>

                                <option value="IC">
                                    Iceland
                                </option>

                                <option value="IN">
                                    India
                                </option>

                                <option value="ID">
                                    Indonesia
                                </option>

                                <option value="IR">
                                    Iran
                                </option>

                                <option value="IRQ">
                                    Iraq
                                </option>

                                <option value="IE">
                                    Ireland
                                </option>

                                <option value="IM">
                                    Isle of Man
                                </option>

                                <option value="IS">
                                    Israel
                                </option>

                                <option value="IT">
                                    Italy
                                </option>

                                <option value="JAM">
                                    Jamaica
                                </option>

                                <option value="JP">
                                    Japan
                                </option>

                                <option value="JE">
                                    Jersey
                                </option>

                                <option value="JOR">
                                    Jordan
                                </option>

                                <option value="KAZ">
                                    Kazakhstan
                                </option>

                                <option value="KEN">
                                    Kenya
                                </option>

                                <option value="KIR">
                                    Kiribati
                                </option>

                                <option value="KUW">
                                    Kuwait
                                </option>

                                <option value="KYR">
                                    Kyrgyzstan
                                </option>

                                <option value="LAOS">
                                    Laos
                                </option>

                                <option value="LAT">
                                    Latvia
                                </option>

                                <option value="LEB">
                                    Lebanon
                                </option>

                                <option value="LES">
                                    Lesotho
                                </option>

                                <option value="LIB">
                                    Liberia
                                </option>

                                <option value="LIBY">
                                    Libya
                                </option>

                                <option value="LIE">
                                    Liechtenstein
                                </option>

                                <option value="LIT">
                                    Lithuania
                                </option>

                                <option value="LUX">
                                    Luxembourg
                                </option>

                                <option value="MAC">
                                    Macau
                                </option>

                                <option value="MACE">
                                    Macedonia
                                </option>

                                <option value="MAD">
                                    Madagascar
                                </option>

                                <option value="MAL">
                                    Malawi
                                </option>

                                <option value="MALY">
                                    Malaysia
                                </option>

                                <option value="MALD">
                                    Maldives
                                </option>

                                <option value="MALI">
                                    Mali
                                </option>

                                <option value="MLA">
                                    Malta
                                </option>

                                <option value="MH">
                                    Marshall Islands
                                </option>

                                <option value="MAR">
                                    Martinique
                                </option>

                                <option value="MR">
                                    Mauritania
                                </option>

                                <option value="MAU">
                                    Mauritius
                                </option>

                                <option value="YT">
                                    Mayotte
                                </option>

                                <option value="MX">
                                    Mexico
                                </option>

                                <option value="FM">
                                    Micronesia
                                </option>

                                <option value="MOL">
                                    Moldova
                                </option>

                                <option value="MON">
                                    Monaco
                                </option>

                                <option value="MONG">
                                    Mongolia
                                </option>

                                <option value="MONT">
                                    Montenegro
                                </option>

                                <option value="MONS">
                                    Montserrat
                                </option>

                                <option value="MOR">
                                    Morocco
                                </option>

                                <option value="MOZ">
                                    Mozambique
                                </option>

                                <option value="MY">
                                    Myanmar
                                </option>

                                <option value="NAM">
                                    Namibia
                                </option>

                                <option value="NAU">
                                    Nauru
                                </option>

                                <option value="NEP">
                                    Nepal
                                </option>

                                <option value="NL">
                                    Netherlands, The
                                </option>

                                <option value="NE">
                                    Nevis
                                </option>

                                <option value="NC">
                                    New Caledonia
                                </option>

                                <option value="NZ">
                                    New Zealand
                                </option>

                                <option value="NIC">
                                    Nicaragua
                                </option>

                                <option value="NIG">
                                    Niger
                                </option>

                                <option value="NI">
                                    Nigeria
                                </option>

                                <option value="NU">
                                    Niue
                                </option>

                                <option value="NOR">
                                    Norfolk Island
                                </option>

                                <option value="KOR">
                                    North Korea
                                </option>

                                <option value="NIRL">
                                    Northern Ireland
                                </option>

                                <option value="NO">
                                    Norway
                                </option>

                                <option value="OMAN">
                                    Oman
                                </option>

                                <option value="PAK">
                                    Pakistan
                                </option>

                                <option value="PAL">
                                    Palau
                                </option>

                                <option value="PS">
                                    Palestinian Territory
                                </option>

                                <option value="PAN">
                                    Panama
                                </option>

                                <option value="PAP">
                                    Papua New Guinea
                                </option>

                                <option value="PAR">
                                    Paraguay
                                </option>

                                <option value="PERU">
                                    Peru
                                </option>

                                <option value="PHI">
                                    Philippines
                                </option>

                                <option value="PN">
                                    Pitcairn
                                </option>

                                <option value="POL">
                                    Poland
                                </option>

                                <option value="POR">
                                    Portugal
                                </option>

                                <option value="PR">
                                    Puerto Rico
                                </option>

                                <option value="QAT">
                                    Qatar
                                </option>

                                <option value="RO">
                                    Romania
                                </option>

                                <option value="RWA">
                                    Rwanda
                                </option>

                                <option value="SH">
                                    Saint Helena Ascension and Tristan Da Cunha
                                </option>

                                <option value="PM">
                                    Saint Pierre And Miquelon
                                </option>

                                <option value="SAI">
                                    Saipan (Northern Mariana Islands)
                                </option>

                                <option value="WS">
                                    Samoa
                                </option>

                                <option value="SM">
                                    San Marino
                                </option>

                                <option value="ST">
                                    Sao Tome
                                </option>

                                <option value="SA">
                                    Saudi Arabia
                                </option>

                                <option value="SCOT">
                                    Scotland
                                </option>

                                <option value="SEN">
                                    Senegal
                                </option>

                                <option value="SER">
                                    Serbia
                                </option>

                                <option value="SEY">
                                    Seychelles Islands
                                </option>

                                <option value="SL">
                                    Sierra Leone
                                </option>

                                <option value="SING">
                                    Singapore
                                </option>

                                <option value="SLOV">
                                    Slovakia
                                </option>

                                <option value="SLO">
                                    Slovenia
                                </option>

                                <option value="SI">
                                    Solomon Islands
                                </option>

                                <option value="SOM">
                                    Somalia
                                </option>

                                <option value="SAFR">
                                    South Africa
                                </option>

                                <option value="GS">
                                    South Georgia And The South Sandwich Islands
                                </option>

                                <option value="SK">
                                    South Korea
                                </option>

                                <option value="SS">
                                    South Sudan
                                </option>

                                <option value="ES">
                                    Spain
                                </option>

                                <option value="SRIL">
                                    Sri Lanka
                                </option>

                                <option value="STB">
                                    St. Barthelemy
                                </option>

                                <option value="STE">
                                    St. Eustatius
                                </option>

                                <option value="STK">
                                    St. Kitts
                                </option>

                                <option value="STL">
                                    St. Lucia
                                </option>

                                <option value="STM">
                                    St. Maarten
                                </option>

                                <option value="STV">
                                    St. Vincent
                                </option>

                                <option value="SUD">
                                    Sudan
                                </option>

                                <option value="SUR">
                                    Suriname
                                </option>

                                <option value="SWAZ">
                                    Swaziland
                                </option>

                                <option value="SE">
                                    Sweden
                                </option>

                                <option value="CH">
                                    Switzerland
                                </option>

                                <option value="SYR">
                                    Syria
                                </option>

                                <option value="TA">
                                    Tahiti
                                </option>

                                <option value="TAI">
                                    Taiwan
                                </option>

                                <option value="TAJ">
                                    Tajikstan
                                </option>

                                <option value="TAN">
                                    Tanzania
                                </option>

                                <option value="THAI">
                                    Thailand
                                </option>

                                <option value="TL">
                                    Timor-Leste
                                </option>

                                <option value="TOGO">
                                    Togo
                                </option>

                                <option value="TK">
                                    Tokelau
                                </option>

                                <option value="TONG">
                                    Tonga Islands
                                </option>

                                <option value="TRI">
                                    Trinidad &amp; Tobago
                                </option>

                                <option value="TUN">
                                    Tunisia
                                </option>

                                <option value="TUR">
                                    Turkey
                                </option>

                                <option value="TURK">
                                    Turkmenistan
                                </option>

                                <option value="TC">
                                    Turks &amp; Caicos
                                </option>

                                <option value="TUV">
                                    Tuvalu
                                </option>

                                <option value="UGA">
                                    Uganda
                                </option>

                                <option value="UKR">
                                    Ukraine
                                </option>

                                <option value="UAE">
                                    United Arab Emirates
                                </option>

                                <option value="UNK">
                                    United Kingdom
                                </option>

                                <option value="UM">
                                    United States Minor Outlying Islands
                                </option>

                                <option value="URU">
                                    Uruguay
                                </option>

                                <option value="UZB">
                                    Uzbekistan
                                </option>

                                <option value="VA">
                                    Vanuatu
                                </option>

                                <option value="VC">
                                    Vatican City
                                </option>

                                <option value="VE">
                                    Venezuela
                                </option>

                                <option value="VIE">
                                    Vietnam
                                </option>

                                <option value="BRV">
                                    Virgin Islands – British
                                </option>

                                <option value="WA">
                                    Wales
                                </option>

                                <option value="WF">
                                    Wallis And Futuna
                                </option>

                                <option value="EH">
                                    Western Sahara
                                </option>

                                <option value="YE">
                                    Yemen
                                </option>

                                <option value="ZAM">
                                    Zambia
                                </option>

                                <option value="ZIM">
                                    Zimbabwe
                                </option>
                            </select><span class="customSelect dropdown no-reset" style="display: inline-block;"><span class="customSelectInner" style="padding-right: 30px; display: inline-block;">United States of America</span></span> <i class="input-status input-warning icon-attention" onclick="return ShowValidationMessage(event, $(this));" title="Please choose your country."></i></p>
                        </li>


                        <li>
                            <p class="textbox-mask txt-zipcode" data-warning-override="We could not validate this ZIP Code, please enter a valid ZIP Code." title="Please enter your ZIP Code."><label for="contentMain_ucEmailNameAddress_txtZip" id="contentMain_ucEmailNameAddress_lblZip">ZIP Code</label> <input autocomplete="off" class="textbox" data-validation="req-zipcode" id="contentMain_ucEmailNameAddress_txtZip" maxlength="9" name="ctl00$contentMain$ucEmailNameAddress$txtZip" tabindex="8" type="text"> <i class="input-status input-warning icon-attention" onclick="return ShowValidationMessage(event, $(this));" title="Please enter your ZIP Code."></i></p>
                        </li>
                    </ul>


                    <ul>
                        <li>
                            <p class="textbox-mask txt-address1" title="Please enter your street address."><label class="" for="contentMain_ucEmailNameAddress_txtAddr1" id="contentMain_ucEmailNameAddress_lblAddr1">Street Address</label> <span aria-live="polite" class="ui-helper-hidden-accessible" role="status"></span><input autocomplete="off" class="textbox ui-autocomplete-input" data-validation="req-address1" id="contentMain_ucEmailNameAddress_txtAddr1" maxlength="35" name="ctl00$contentMain$ucEmailNameAddress$txtAddr1" tabindex="9" type="text"> <i class="input-status input-warning icon-attention" onclick="return ShowValidationMessage(event, $(this));" title="Please enter your street address."></i></p>
                        </li>
                    </ul>


                    <ul>
                        <li>
                            <p class="textbox-mask txt-address2" data-warning-override="Are you missing an apartment, suite, or building number?" title="Please enter your Apt, Suite, Bldg. (if applicable)."><label for="contentMain_ucEmailNameAddress_txtAddr2" id="contentMain_ucEmailNameAddress_lblAddr2">Apt, Suite, Bldg.<em>(if applicable)</em></label> <input autocomplete="off" class="textbox" data-loader="true" data-validation="opt-address2" id="contentMain_ucEmailNameAddress_txtAddr2" maxlength="35" name="ctl00$contentMain$ucEmailNameAddress$txtAddr2" tabindex="10" type="text"> <i class="input-status input-warning icon-attention" onclick="return ShowValidationMessage(event, $(this));" title="Please enter your Apt, Suite, Bldg. (if applicable)."></i><img alt="Loading" class="input-loading" src="/CommonControls/ResponsiveForms/IMG/async-loader-1.gif"></p>
                        </li>
                    </ul>


                    <ul>
                        <li>
                            <p class="textbox-mask txt-city" title="Please enter your city."><label for="contentMain_ucEmailNameAddress_txtCity" id="contentMain_ucEmailNameAddress_lblCity">City / Town</label> <input autocomplete="off" class="textbox" data-loader="true" data-validation="req-field" id="contentMain_ucEmailNameAddress_txtCity" maxlength="30" name="ctl00$contentMain$ucEmailNameAddress$txtCity" tabindex="11" type="text"> <i class="input-status input-warning icon-attention" onclick="return ShowValidationMessage(event, $(this));" title="Please enter your city."></i><img alt="Loading" class="input-loading" src="/CommonControls/ResponsiveForms/IMG/async-loader-1.gif"></p>
                        </li>


                        <li>
                            <p class="dropdown-mask dd-states" style="display: block;" title="Please choose your state."><label class="inputted" for="contentMain_ucEmailNameAddress_ddlStates" id="contentMain_ucEmailNameAddress_lblStateDD">State</label> 
                        
                            <select class="dropdown hasCustomSelect" data-loader="true" data-override-server="true" data-validation="req-selection" id="contentMain_ucEmailNameAddress_ddlStates" name="ctl00$contentMain$ucEmailNameAddress$ddlStates" style="-webkit-appearance: menulist-button; width: 100%; position: absolute; opacity: 0; z-index: 3; height: 37px; font-size: 14px;" tabindex="12">
                                    <option selected="selected" value="AA">
                                        APO/FPO-Armed Forces Americas
                                    </option>

                                    <option value="AE">
                                        APO/FPO-Armed Forces Europe
                                    </option>

                                    <option value="AK">
                                        Alaska
                                    </option>

                                    <option value="AL">
                                        Alabama
                                    </option>

                                    <option value="AP">
                                        APO/FPO-Armed Forces Pacific
                                    </option>

                                    <option value="AR">
                                        Arkansas
                                    </option>

                                    <option value="AS">
                                        American Samoa
                                    </option>

                                    <option value="AZ">
                                        Arizona
                                    </option>

                                    <option value="CA">
                                        California
                                    </option>

                                    <option value="CO">
                                        Colorado
                                    </option>

                                    <option value="CT">
                                        Connecticut
                                    </option>

                                    <option value="DC">
                                        District of Columbia
                                    </option>

                                    <option value="DE">
                                        Delaware
                                    </option>

                                    <option value="FL">
                                        Florida
                                    </option>

                                    <option value="FM">
                                        Federated States of Micronesia
                                    </option>

                                    <option value="GA">
                                        Georgia
                                    </option>

                                    <option value="GU">
                                        Guam
                                    </option>

                                    <option value="HI">
                                        Hawaii
                                    </option>

                                    <option value="IA">
                                        Iowa
                                    </option>

                                    <option value="ID">
                                        Idaho
                                    </option>

                                    <option value="IL">
                                        Illinois
                                    </option>

                                    <option value="IN">
                                        Indiana
                                    </option>

                                    <option value="KS">
                                        Kansas
                                    </option>

                                    <option value="KY">
                                        Kentucky
                                    </option>

                                    <option value="LA">
                                        Louisiana
                                    </option>

                                    <option value="MA">
                                        Massachusetts
                                    </option>

                                    <option value="MD">
                                        Maryland
                                    </option>

                                    <option value="ME">
                                        Maine
                                    </option>

                                    <option value="MH">
                                        Marshall Islands
                                    </option>

                                    <option value="MI">
                                        Michigan
                                    </option>

                                    <option value="MN">
                                        Minnesota
                                    </option>

                                    <option value="MO">
                                        Missouri
                                    </option>

                                    <option value="MP">
                                        Northern Mariana Islands
                                    </option>

                                    <option value="MS">
                                        Mississippi
                                    </option>

                                    <option value="MT">
                                        Montana
                                    </option>

                                    <option value="NC">
                                        North Carolina
                                    </option>

                                    <option value="ND">
                                        North Dakota
                                    </option>

                                    <option value="NE">
                                        Nebraska
                                    </option>

                                    <option value="NH">
                                        New Hampshire
                                    </option>

                                    <option value="NJ">
                                        New Jersey
                                    </option>

                                    <option value="NM">
                                        New Mexico
                                    </option>

                                    <option value="NV">
                                        Nevada
                                    </option>

                                    <option value="NY">
                                        New York
                                    </option>

                                    <option value="OH">
                                        Ohio
                                    </option>

                                    <option value="OK">
                                        Oklahoma
                                    </option>

                                    <option value="OR">
                                        Oregon
                                    </option>

                                    <option value="PA">
                                        Pennsylvania
                                    </option>

                                    <option value="PW">
                                        Palau
                                    </option>

                                    <option value="RI">
                                        Rhode Island
                                    </option>

                                    <option value="SC">
                                        South Carolina
                                    </option>

                                    <option value="SD">
                                        South Dakota
                                    </option>

                                    <option value="TN">
                                        Tennessee
                                    </option>

                                    <option value="TX">
                                        Texas
                                    </option>

                                    <option value="UT">
                                        Utah
                                    </option>

                                    <option value="VA">
                                        Virginia
                                    </option>

                                    <option value="VT">
                                        Vermont
                                    </option>

                                    <option value="WA">
                                        Washington
                                    </option>

                                    <option value="WI">
                                        Wisconsin
                                    </option>

                                    <option value="WV">
                                        West Virginia
                                    </option>

                                    <option value="WY">
                                        Wyoming
                                    </option>
                            </select>
                                <span class="customSelect dropdown" style="display: inline-block;"><span class="customSelectInner" style="padding-right: 30px; display: inline-block;">APO/FPO-Armed Forces Americas</span></span> <i class="input-status input-warning icon-attention" onclick="return ShowValidationMessage(event, $(this));" title="Please choose your state."></i><img alt="Loading" class="input-loading" src="/CommonControls/ResponsiveForms/IMG/async-loader-1.gif"></p>
                        </li>


                        <li>
                            <p class="textbox-mask txt-state" style="display: none;" title="Please enter your state/province/region."><label for="contentMain_ucEmailNameAddress_txtState" id="contentMain_ucEmailNameAddress_lblStateTXT">State / Province / Region</label>
                            </p>
                        </li>
                    </ul>
                </div>
                <input checked="checked" id="phustrigger" style="display:none;" type="checkbox">
            </fieldset>


                <input class="btn btn-orange btn-lg" id="contentMain_ucEmailNameAddress_btnSubmit" name="ctl00$contentMain$ucEmailNameAddress$btnSubmit" onclick="return ValidateEmailNameAddressForm(event);" tabindex="14" title="Submit" type="submit" value="Submit">

        </div>

        </div>
    </div>
</div>






    

</asp:Content>