function getFieldStr() {
    var fields = [
        { val: "<http://purl.org/seo#ArtificialIntelligence>", label: "Artificial Intelligence" },
        { val: "<http://purl.org/seo#SoftwareEngineering>", label: "Software Engineering" },
        { val: "<http://purl.org/seo#WorldWideWeb>", label: "Web Technologies" },
        { val: "<http://purl.org/seo#SecurityAndPrivacy>", label: "Computer Security" },
        { val: "<http://purl.org/seo#InformationSystems>", label: "Information systems" },
        { val: "<http://purl.org/seo#ComputerSystemsOrganization>", label: "Computer systems organization" },
        { val: "<http://purl.org/seo#HumanCenteredComputing>", label: "Human Centered Computing" },
        { val: "<http://purl.org/seo#TheoryOfComputations>", label: "Theory of Computation" }
    ];
    var fieldStr = "";
    fields.forEach(function (data, index) {
        fieldStr += `<option value="${data.val}">${data.label}</option>`;
    });
    return fieldStr;
}
function getSeriesStr() {
    var series = ["AAAI", "CVPR", "NIPS", "ICCV", "IJCAI", "ECCV", "ACCV", "AAMAS", "UIST", "FOGA", "ECAI", "AISTATS", "UAI", "ICONIP", "EUROGP", "KR", "ISCA", "HPCA", "FOCS", "PERCOM", "DSN", "SBAC-PAD", "CSCW", "EuroSys", "PODC", "ISMAR", "VR", "CHI", "MOBICOM", "Infovis", "SIGGRAPH", "VLDB", "RecSys", "EDBT", "PKDD", "PODS", "SIGIR", "SIGMOD", "ICSE", "PLDI", "ASPLOS", "ICDE", "POPL", "OOPSLA", "OSDI", "FSE", "ASE", "ICFP", "ECOOP", "FASE", "CCS", "SP", "USENIX", "NDSS", "EuroCrypt", "Ubicomp", "ACSAC", "CSF", "ESORICS", "DCC", "IJCAR", "COLT", "STOC", "SPAA", "CCC", "ISSAC", "TheWeb", "ICWS", "WSDM", "ESWC", "ISWC", "ICWE", "ICSC"]
    var seriesStr = "";
    series.forEach(function (data, index) {
        seriesStr += `<option value="${data}">${data}</option>`;
    });
    return seriesStr;
}

function getCountriesStr() {
    var countries = [
        { val: "http://dbpedia.org/resource/Afganistan", label: "Afghanistan" },
        { val: "http://dbpedia.org/resource/Albania", label: "Albania" },
        { val: "http://dbpedia.org/resource/Algeria", label: "Algeria" },
        { val: "http://dbpedia.org/resource/American_Samoa", label: "American Samoa" },
        { val: "http://dbpedia.org/resource/Andorra", label: "Andorra" },
        { val: "http://dbpedia.org/resource/Angola", label: "Angola" },
        { val: "http://dbpedia.org/resource/Anguilla", label: "Anguilla" },
        { val: "http://dbpedia.org/resource/Antigua_and_Barbuda", label: "Antigua &amp; Barbuda" },
        { val: "http://dbpedia.org/resource/Argentina", label: "Argentina" },
        { val: "http://dbpedia.org/resource/Armenia", label: "Armenia" },
        { val: "http://dbpedia.org/resource/Aruba", label: "Aruba" },
        { val: "http://dbpedia.org/resource/Australia", label: "Australia" },
        { val: "http://dbpedia.org/resource/Austria", label: "Austria" },
        { val: "http://dbpedia.org/resource/Azerbaijan", label: "Azerbaijan" },
        { val: "http://dbpedia.org/resource/Bahamas", label: "Bahamas" },
        { val: "http://dbpedia.org/resource/Bahrain", label: "Bahrain" },
        { val: "http://dbpedia.org/resource/Bangladesh", label: "Bangladesh" },
        { val: "http://dbpedia.org/resource/Barbados", label: "Barbados" },
        { val: "http://dbpedia.org/resource/Belarus", label: "Belarus" },
        { val: "http://dbpedia.org/resource/Belgium", label: "Belgium" },
        { val: "http://dbpedia.org/resource/Belize", label: "Belize" },
        { val: "http://dbpedia.org/resource/Benin", label: "Benin" },
        { val: "http://dbpedia.org/resource/Bermuda", label: "Bermuda" },
        { val: "http://dbpedia.org/resource/Bhutan", label: "Bhutan" },
        { val: "http://dbpedia.org/resource/Bolivia", label: "Bolivia" },
        { val: "http://dbpedia.org/resource/Bonaire", label: "Bonaire" },
        { val: "http://dbpedia.org/resource/Bosnia_and_Herzegovina", label: "Bosnia &amp; Herzegovina" },
        { val: "http://dbpedia.org/resource/Botswana", label: "Botswana" },
        { val: "http://dbpedia.org/resource/Brazil", label: "Brazil" },
        { val: "http://dbpedia.org/resource/Brunei", label: "Brunei" },
        { val: "http://dbpedia.org/resource/Bulgaria", label: "Bulgaria" },
        { val: "http://dbpedia.org/resource/Burkina_Faso", label: "Burkina Faso" },
        { val: "http://dbpedia.org/resource/Burundi", label: "Burundi" },
        { val: "http://dbpedia.org/resource/Cambodia", label: "Cambodia" },
        { val: "http://dbpedia.org/resource/Cameroon", label: "Cameroon" },
        { val: "http://dbpedia.org/resource/Canada", label: "Canada" },
        { val: "http://dbpedia.org/resource/Canary_Islands", label: "Canary Islands" },
        { val: "http://dbpedia.org/resource/Cape_Verde", label: "Cape Verde" },
        { val: "http://dbpedia.org/resource/Cayman_Islands", label: "Cayman Islands" },
        { val: "http://dbpedia.org/resource/Central_African_Republic", label: "Central African Republic" },
        { val: "http://dbpedia.org/resource/Chad", label: "Chad" },
        { val: "http://dbpedia.org/resource/Channel_Islands_Beach,_California", label: "Channel Islands" },
        { val: "http://dbpedia.org/resource/Chile", label: "Chile" },
        { val: "http://dbpedia.org/resource/China", label: "China" },
        { val: "http://dbpedia.org/resource/Christmas_Island", label: "Christmas Island" },
        { val: "http://dbpedia.org/resource/Colombia", label: "Colombia" },
        { val: "http://dbpedia.org/resource/Comoros", label: "Comoros" },
        { val: "http://dbpedia.org/resource/Congo", label: "Congo" },
        { val: "http://dbpedia.org/resource/Cook_Islands", label: "Cook Islands" },
        { val: "http://dbpedia.org/resource/Costa_Rica", label: "Costa Rica" },
        { val: "http://dbpedia.org/resource/Ivory_Coast", label: "Cote D'Ivoire" },
        { val: "http://dbpedia.org/resource/Croatia", label: "Croatia" },
        { val: "http://dbpedia.org/resource/Cuba", label: "Cuba" },
        { val: "http://dbpedia.org/resource/Curaco", label: "Curacao" },
        { val: "http://dbpedia.org/resource/Cyprus", label: "Cyprus" },
        { val: "http://dbpedia.org/resource/Czech_Republic", label: "Czech Republic" },
        { val: "http://dbpedia.org/resource/Denmark", label: "Denmark" },
        { val: "http://dbpedia.org/resource/Djibouti", label: "Djibouti" },
        { val: "http://dbpedia.org/resource/Dominica", label: "Dominica" },
        { val: "http://dbpedia.org/resource/Dominican_Republic", label: "Dominican Republic" },
        { val: "http://dbpedia.org/resource/East_Timor", label: "East Timor" },
        { val: "http://dbpedia.org/resource/Ecuador", label: "Ecuador" },
        { val: "http://dbpedia.org/resource/Egypt", label: "Egypt" },
        { val: "http://dbpedia.org/resource/El_Salvador", label: "El_Salvador" },
        { val: "http://dbpedia.org/resource/Equatorial_Guinea", label: "Equatorial Guinea" },
        { val: "http://dbpedia.org/resource/Eritrea", label: "Eritrea" },
        { val: "http://dbpedia.org/resource/Estonia", label: "Estonia" },
        { val: "http://dbpedia.org/resource/Ethiopia", label: "Ethiopia" },
        { val: "http://dbpedia.org/resource/Falkland_Islands", label: "Falkland Islands" },
        { val: "http://dbpedia.org/resource/Faroe_Islands", label: "Faroe Islands" },
        { val: "http://dbpedia.org/resource/Fiji", label: "Fiji" },
        { val: "http://dbpedia.org/resource/Finland", label: "Finland" },
        { val: "http://dbpedia.org/resource/France", label: "France" },
        { val: "http://dbpedia.org/resource/French_Guiana", label: "French Guiana" },
        { val: "http://dbpedia.org/resource/French_Polynesia", label: "French Polynesia" },
        { val: "http://dbpedia.org/resource/Gabon", label: "Gabon" },
        { val: "http://dbpedia.org/resource/Gambia", label: "Gambia" },
        { val: "http://dbpedia.org/resource/Georgia", label: "Georgia" },
        { val: "http://dbpedia.org/resource/Germany", label: "Germany" },
        { val: "http://dbpedia.org/resource/Ghana", label: "Ghana" },
        { val: "http://dbpedia.org/resource/Gibraltar", label: "Gibraltar" },
        { val: "http://dbpedia.org/resource/Great_Britain", label: "United Kingdom" },
        { val: "http://dbpedia.org/resource/Greece", label: "Greece" },
        { val: "http://dbpedia.org/resource/Greenland", label: "Greenland" },
        { val: "http://dbpedia.org/resource/Grenada", label: "Grenada" },
        { val: "http://dbpedia.org/resource/Guadeloupe", label: "Guadeloupe" },
        { val: "http://dbpedia.org/resource/Guam", label: "Guam" },
        { val: "http://dbpedia.org/resource/Guatemala", label: "Guatemala" },
        { val: "http://dbpedia.org/resource/Guinea", label: "Guinea" },
        { val: "http://dbpedia.org/resource/Guyana", label: "Guyana" },
        { val: "http://dbpedia.org/resource/Haiti", label: "Haiti" },
        { val: "http://dbpedia.org/resource/Hawaii", label: "Hawaii" },
        { val: "http://dbpedia.org/resource/Honduras", label: "Honduras" },
        { val: "http://dbpedia.org/resource/Hong_Kong", label: "Hong Kong" },
        { val: "http://dbpedia.org/resource/Hungary", label: "Hungary" },
        { val: "http://dbpedia.org/resource/Iceland", label: "Iceland" },
        { val: "http://dbpedia.org/resource/India", label: "India" },
        { val: "http://dbpedia.org/resource/Indonesia", label: "Indonesia" },
        { val: "http://dbpedia.org/resource/Iran", label: "Iran" },
        { val: "http://dbpedia.org/resource/Iraq", label: "Iraq" },
        { val: "http://dbpedia.org/resource/Ireland", label: "Ireland" },
        { val: "http://dbpedia.org/resource/Isle_of_Man", label: "Isle of Man" },
        { val: "http://dbpedia.org/resource/Israel", label: "Israel" },
        { val: "http://dbpedia.org/resource/Italy", label: "Italy" },
        { val: "http://dbpedia.org/resource/Jamaica", label: "Jamaica" },
        { val: "http://dbpedia.org/resource/Japan", label: "Japan" },
        { val: "http://dbpedia.org/resource/Jordan", label: "Jordan" },
        { val: "http://dbpedia.org/resource/Kazakhstan", label: "Kazakhstan" },
        { val: "http://dbpedia.org/resource/Kenya", label: "Kenya" },
        { val: "http://dbpedia.org/resource/Kiribati", label: "Kiribati" },
        { val: "Korea North", label: "Korea North" },
        { val: "Korea South", label: "Korea South" },
        { val: "http://dbpedia.org/resource/Kuwait", label: "Kuwait" },
        { val: "http://dbpedia.org/resource/Kyrgyzstan", label: "Kyrgyzstan" },
        { val: "http://dbpedia.org/resource/Laos", label: "Laos" },
        { val: "http://dbpedia.org/resource/Latvia", label: "Latvia" },
        { val: "http://dbpedia.org/resource/Lebanon", label: "Lebanon" },
        { val: "http://dbpedia.org/resource/Lesotho", label: "Lesotho" },
        { val: "http://dbpedia.org/resource/Liberia", label: "Liberia" },
        { val: "http://dbpedia.org/resource/Libya", label: "Libya" },
        { val: "http://dbpedia.org/resource/Liechtenstein", label: "Liechtenstein" },
        { val: "http://dbpedia.org/resource/Lithuania", label: "Lithuania" },
        { val: "http://dbpedia.org/resource/Luxembourg", label: "Luxembourg" },
        { val: "http://dbpedia.org/resource/Macau", label: "Macau" },
        { val: "http://dbpedia.org/resource/Macedonia", label: "Macedonia" },
        { val: "http://dbpedia.org/resource/Madagascar", label: "Madagascar" },
        { val: "http://dbpedia.org/resource/Malaysia", label: "Malaysia" },
        { val: "http://dbpedia.org/resource/Malawi", label: "Malawi" },
        { val: "http://dbpedia.org/resource/Maldives", label: "Maldives" },
        { val: "http://dbpedia.org/resource/Mali", label: "Mali" },
        { val: "http://dbpedia.org/resource/Malta", label: "Malta" },
        { val: "http://dbpedia.org/resource/Marshall Islands", label: "Marshall Islands" },
        { val: "http://dbpedia.org/resource/Martinique", label: "Martinique" },
        { val: "http://dbpedia.org/resource/Mauritania", label: "Mauritania" },
        { val: "http://dbpedia.org/resource/Mauritius", label: "Mauritius" },
        { val: "http://dbpedia.org/resource/Mayotte", label: "Mayotte" },
        { val: "http://dbpedia.org/resource/Mexico", label: "Mexico" },
        { val: "http://dbpedia.org/resource/Midway Islands", label: "Midway Islands" },
        { val: "http://dbpedia.org/resource/Moldova", label: "Moldova" },
        { val: "http://dbpedia.org/resource/Monaco", label: "Monaco" },
        { val: "http://dbpedia.org/resource/Mongolia", label: "Mongolia" },
        { val: "http://dbpedia.org/resource/Montserrat", label: "Montserrat" },
        { val: "http://dbpedia.org/resource/Morocco", label: "Morocco" },
        { val: "http://dbpedia.org/resource/Mozambique", label: "Mozambique" },
        { val: "http://dbpedia.org/resource/Myanmar", label: "Myanmar" },
        { val: "http://dbpedia.org/resource/Nambia", label: "Nambia" },
        { val: "http://dbpedia.org/resource/Nauru", label: "Nauru" },
        { val: "http://dbpedia.org/resource/Nepal", label: "Nepal" },
        { val: "http://dbpedia.org/resource/Netherland_Antilles", label: "Netherland Antilles" },
        { val: "http://dbpedia.org/resource/Netherlands", label: "Netherlands (Holland, Europe)" },
        { val: "http://dbpedia.org/resource/Nevis", label: "Nevis" },
        { val: "http://dbpedia.org/resource/New_Caledonia", label: "New Caledonia" },
        { val: "http://dbpedia.org/resource/New_Zealand", label: "New Zealand" },
        { val: "http://dbpedia.org/resource/Nicaragua", label: "Nicaragua" },
        { val: "http://dbpedia.org/resource/Niger", label: "Niger" },
        { val: "http://dbpedia.org/resource/Nigeria", label: "Nigeria" },
        { val: "http://dbpedia.org/resource/Niue", label: "Niue" },
        { val: "http://dbpedia.org/resource/Norway", label: "Norway" },
        { val: "http://dbpedia.org/resource/Oman", label: "Oman" },
        { val: "http://dbpedia.org/resource/Pakistan", label: "Pakistan" },
        { val: "http://dbpedia.org/resource/Palau_Island", label: "Palau Island" },
        { val: "http://dbpedia.org/resource/Palestine", label: "Palestine" },
        { val: "http://dbpedia.org/resource/Panama", label: "Panama" },
        { val: "Papua New Guinea", label: "Papua New Guinea" },
        { val: "http://dbpedia.org/resource/Paraguay", label: "Paraguay" },
        { val: "http://dbpedia.org/resource/Peru", label: "Peru" },
        { val: "http://dbpedia.org/resource/Phillipines", label: "Philippines" },
        { val: "http://dbpedia.org/resource/Pitcairn Island", label: "Pitcairn Island" },
        { val: "http://dbpedia.org/resource/Poland", label: "Poland" },
        { val: "http://dbpedia.org/resource/Portugal", label: "Portugal" },
        { val: "http://dbpedia.org/resource/Puerto_Rico", label: "Puerto Rico" },
        { val: "http://dbpedia.org/resource/Qatar", label: "Qatar" },
        { val: "Republic of Montenegro", label: "Republic of Montenegro" },
        { val: "Republic of Serbia", label: "Republic of Serbia" },
        { val: "http://dbpedia.org/resource/Reunion", label: "Reunion" },
        { val: "http://dbpedia.org/resource/Romania", label: "Romania" },
        { val: "http://dbpedia.org/resource/Russia", label: "Russia" },
        { val: "http://dbpedia.org/resource/Rwanda", label: "Rwanda" },
        { val: "http://dbpedia.org/resource/Saipan", label: "Saipan" },
        { val: "http://dbpedia.org/resource/Samoa", label: "Samoa" },
        { val: "Samoa American", label: "Samoa American" },
        { val: "San Marino", label: "San Marino" },
        { val: "Sao Tome &amp; Principe", label: "Sao Tome &amp; Principe" },
        { val: "http://dbpedia.org/resource/Saudi_Arabia", label: "Saudi Arabia" },
        { val: "http://dbpedia.org/resource/Senegal", label: "Senegal" },
        { val: "http://dbpedia.org/resource/Serbia", label: "Serbia" },
        { val: "http://dbpedia.org/resource/Seychelles", label: "Seychelles" },
        { val: "Sierra Leone", label: "Sierra Leone" },
        { val: "http://dbpedia.org/resource/Singapore", label: "Singapore" },
        { val: "http://dbpedia.org/resource/Slovakia", label: "Slovakia" },
        { val: "http://dbpedia.org/resource/Slovenia", label: "Slovenia" },
        { val: "Solomon Islands", label: "Solomon Islands" },
        { val: "http://dbpedia.org/resource/Somalia", label: "Somalia" },
        { val: "South Africa", label: "South Africa" },
        { val: "http://dbpedia.org/resource/Spain", label: "Spain" },
        { val: "http://dbpedia.org/resource/Sudan", label: "Sudan" },
        { val: "http://dbpedia.org/resource/Suriname", label: "Suriname" },
        { val: "http://dbpedia.org/resource/Swaziland", label: "Swaziland" },
        { val: "http://dbpedia.org/resource/Sweden", label: "Sweden" },
        { val: "http://dbpedia.org/resource/Switzerland", label: "Switzerland" },
        { val: "http://dbpedia.org/resource/Syria", label: "Syria" },
        { val: "http://dbpedia.org/resource/Tahiti", label: "Tahiti" },
        { val: "http://dbpedia.org/resource/Taiwan", label: "Taiwan" },
        { val: "http://dbpedia.org/resource/Tajikistan", label: "Tajikistan" },
        { val: "http://dbpedia.org/resource/Tanzania", label: "Tanzania" },
        { val: "http://dbpedia.org/resource/Thailand", label: "Thailand" },
        { val: "http://dbpedia.org/resource/Togo", label: "Togo" },
        { val: "http://dbpedia.org/resource/Tokelau", label: "Tokelau" },
        { val: "http://dbpedia.org/resource/Tonga", label: "Tonga" },
        { val: "http://dbpedia.org/resource/Tunisia", label: "Tunisia" },
        { val: "http://dbpedia.org/resource/Turkey", label: "Turkey" },
        { val: "http://dbpedia.org/resource/Turkmenistan", label: "Turkmenistan" },
        { val: "http://dbpedia.org/resource/Tuvalu", label: "Tuvalu" },
        { val: "http://dbpedia.org/resource/Uganda", label: "Uganda" },
        { val: "http://dbpedia.org/resource/Ukraine", label: "Ukraine" },
        { val: "United Arab Erimates", label: "United Arab Emirates" },
        { val: "http://dbpedia.org/resource/England", label: "England" },
        { val: "http://dbpedia.org/resource/United_States", label: "United States" },
        { val: "http://dbpedia.org/resource/Uraguay", label: "Uruguay" },
        { val: "http://dbpedia.org/resource/Uzbekistan", label: "Uzbekistan" },
        { val: "http://dbpedia.org/resource/Vanuatu", label: "Vanuatu" },
        { val: "http://dbpedia.org/resource/Vatican_City", label: "Vatican City State" },
        { val: "http://dbpedia.org/resource/Venezuela", label: "Venezuela" },
        { val: "http://dbpedia.org/resource/Vietnam", label: "Vietnam" },
        { val: "Virgin Islands (Brit)", label: "Virgin Islands (Brit)" },
        { val: "Virgin Islands (USA)", label: "Virgin Islands (USA)" },
        { val: "Wake Island", label: "Wake Island" },
        { val: "Wallis &amp; Futana Is", label: "Wallis &amp; Futana Is" },
        { val: "http://dbpedia.org/resource/Yemen", label: "Yemen" },
        { val: "http://dbpedia.org/resource/Zaire", label: "Zaire" },
        { val: "http://dbpedia.org/resource/Zambia", label: "Zambia" },
        { val: "http://dbpedia.org/resource/Zimbabwe", label: "Zimbabwe" }
    ]
    var countriesStr = "";
    countries.forEach(function (data, index) {
        countriesStr += `<option value="${data.val}" ${data.label == "United States" ? "selected" : ""}>${data.label}</option>`;
    });
    return countriesStr;
}