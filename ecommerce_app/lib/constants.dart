import 'package:flutter/material.dart';
import 'package:shop_app/size_config.dart';

const kPrimaryColor = Color(0xFFB02925);
const kPrimaryLightColor = Color(0xFFFBF9F6);
// const kPrimaryLightColor = Color.fromARGB(255, 255, 255, 255);
const kPrimaryGradientColor = LinearGradient(
  begin: Alignment.topLeft,
  end: Alignment.bottomRight,
  colors: [Color(0xFFFFA53E), Color(0xFFB02925)],
);
const kSecondaryColor = Color(0xFF979797);
const kTextColor = Color(0xFF757575);

const kAnimationDuration = Duration(milliseconds: 200);

final headingStyle = TextStyle(
  fontSize: getProportionateScreenWidth(28),
  fontWeight: FontWeight.bold,
  color: const Color(0xFFB02925),
  height: 1.5,
);

const defaultDuration = Duration(milliseconds: 250);

// Form Error
final RegExp emailValidatorRegExp =
    RegExp(r"^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+");
const String kEmailNullError = "Please Enter your email";
const String kInvalidEmailError = "Please Enter Valid Email";
const String kPassNullError = "Please Enter your password";
const String kShortPassError = "Password is too short";
const String kMatchPassError = "Passwords don't match";
const String kNamelNullError = "Please Enter your name";
const String kPhoneNumberNullError = "Please Enter your phone number";
const String kcityNullError = "Please Enter your city";
const String kpincodeNullError = "Please Enter your pincode";
const String kstateNullError = "Please Enter your state";
const String kCountryNullError = "Please Enter or Pick a country";

const String currConversionKey = "0f793f6eddf6443699769d274f876175";

const List<String> orderStatusSeq = [
  "isReadyToShip",
  "isPostmanAssigned",
  "isPickedUp",
  // "isDroppedAtDnk",
  // "isVerifiedByDnk",
  "isVerifiedByCustom",
  "isDispatched",
];

const Map<String, int> statusIdx = {
  "isReadyToShip": 0,
  "isPostmanAssigned": 1,
  "isPickedUp": 2,
  "isVerifiedByCustom": 3,
  "isDispatched": 4,
};

const Map<String, Map<String, String>> orderStatusMsgDateMap = {
  "isReadyToShip": {
    "dateKey": "readyToShipDate",
    "status": "order placed",
    "msg": "order placed successfully",
  },
  "isPostmanAssigned": {
    "dateKey": "postmanAssignDate",
    "status": "OrderReady",
    "msg": "order placed successfully",
  },
  "isPickedUp": {
    "dateKey": "isPickedUpDate",
    "status": "shipped",
  },
  // "isDroppedAtDnkDate": {
  //   "dateKey": "isDroppedAtDnkDate",
  //   "msg": "",
  // },
  // "isVerifiedByDnk": {
  //   "dateKey": "dnkVerifiedDate",
  //   "msg": "",
  // },
  "isVerifiedByCustom": {
    "dateKey": "customVerifiedDate",
    "status": "verified",
    "msg": "verified by custom department",
  },
  "isDispatched": {
    "dateKey": "isDispatchedDate",
    "status": "dispatched",
    "msg": "dispatched to get to your home",
  },
};

const Map<String, String> CountryCodeMap = {
  "andorra": "EUR",
  "austria": "EUR",
  "belgium": "EUR",
  "cyprus": "EUR",
  "estonia": "EUR",
  "finland": "EUR",
  "france": "EUR",
  "england": "EUR",
  "germany": "EUR",
  "greece": "EUR",
  "ireland": "EUR",
  "italy": "EUR",
  "kosovo": "EUR",
  "latvia": "EUR",
  "lithuania": "EUR",
  "luxembourg": "EUR",
  "malta": "EUR",
  "monaco": "EUR",
  "montenegro": "EUR",
  "netherlands": "EUR",
  "portugal": "EUR",
  "san marino": "EUR",
  "slovakia": "EUR",
  "slovenia": "EUR",
  "spain": "EUR",
  "vatican city (holy see)": "EUR",
  "united states of america": "USD",
  "united arab emirates": "AED",
  "afghanistan": "AFN",
  "albania": "ALL",
  "armenia": "AMD",
  "netherlands antilles": "ANG",
  "angola": "AOA",
  "argentina": "ARS",
  "australia": "AUD",
  "aruba": "AWG",
  "azerbaijan": "AZN",
  "bosnia-herzegovina": "BAM",
  "barbados": "BBD",
  "bangladesh": "BDT",
  "bulgaria": "BGN",
  "bahrain": "BHD",
  "burundi": "BIF",
  "bermuda": "BMD",
  "brunei": "BND",
  "bolivia": "BOB",
  "brazil": "BRL",
  "bahamas": "BSD",
  "bitcoin": "BTC",
  "bhutan": "BTN",
  "botswana": "BWP",
  "belarus": "BYN",
  "belize": "BZD",
  "canada": "CAD",
  "congo": "CDF",
  "switzerland": "CHF",
  "chile": "CLF",
  // "chile": "CLP",
  "china": "CNH",
  // "china": "CNY",
  "colombia": "COP",
  "costa rica": "CRC",
  "cuba": "CUC",
  // "cuba": "CUP",
  "cape verde": "CVE",
  "czech republic": "CZK",
  "djibouti": "DJF",
  "denmark": "DKK",
  "dominican republic": "DOP",
  "algeria": "DZD",
  "egypt": "EGP",
  "eritrea": "ERN",
  "ethiopia": "ETB",
  "euro": "EUR",
  "fiji": "FJD",
  "falkland islands": "FKP",
  "united kingdom": "GBP",
  "georgia": "GEL",
  "guernsey": "GGP",
  "ghana": "GHS",
  "gibraltar": "GIP",
  "gambia": "GMD",
  "guinea": "GNF",
  "guatemala": "GTQ",
  "guyana": "GYD",
  "hong kong": "HKD",
  "honduras": "HNL",
  "croatia": "HRK",
  "haiti": "HTG",
  "hungary": "HUF",
  "indonesia": "IDR",
  "israel": "ILS",
  "manx pound": "IMP",
  "india": "INR",
  "iraq": "IQD",
  "iran": "IRR",
  "iceland": "ISK",
  "jersey": "JEP",
  "jamaica": "JMD",
  "jordan": "JOD",
  "japan": "JPY",
  "kenya": "KES",
  "kyrgyzstan": "KGS",
  "cambodia": "KHR",
  "comoros": "KMF",
  "north korea": "KPW",
  "south korea": "KRW",
  "kuwait": "KWD",
  "cayman islands": "KYD",
  "kazakhstan": "KZT",
  "laos": "LAK",
  "lebanon": "LBP",
  "sri lanka": "LKR",
  "liberia": "LRD",
  "lesotho": "LSL",
  "libya": "LYD",
  "morocco": "MAD",
  "moldova": "MDL",
  "madagascar": "MGA",
  "macedonia": "MKD",
  "myanmar": "MMK",
  "mongolia": "MNT",
  "macau": "MOP",
  "mauritania": "MRU",
  "mauritius": "MUR",
  "maldives": "MVR",
  "malawi": "MWK",
  "mexico": "MXN",
  "malaysia": "MYR",
  "mozambique": "MZN",
  "namibia": "NAD",
  "nigeria": "NGN",
  "nicaragua": "NIO",
  "norway": "NOK",
  "nepal": "NPR",
  "new zealand": "NZD",
  "oman": "OMR",
  "panama": "PAB",
  "peru": "PEN",
  "papua new guinea": "PGK",
  "philippines": "PHP",
  "pakistan": "PKR",
  "poland": "PLN",
  "paraguay": "PYG",
  "qatar": "QAR",
  "romania": "RON",
  "serbia": "RSD",
  "russia": "RUB",
  "rwanda": "RWF",
  "saudi arabia": "SAR",
  "solomon islands": "SBD",
  "seychelles": "SCR",
  "sudan": "SDG",
  "sweden": "SEK",
  "singapore": "SGD",
  "saint helena": "SHP",
  "sierra leone": "SLL",
  "somalia": "SOS",
  "suriname": "SRD",
  "south sudan": "SSP",
  "são tomé and príncipe": "STD",
  // "são tomé and príncipe": "STN",
  "el salvador": "SVC",
  "syria": "SYP",
  "swaziland": "SZL",
  "thailand": "THB",
  "tajikistan": "TJS",
  "turkmenistan": "TMT",
  "tunisia": "TND",
  "tonga": "TOP",
  "turkey": "TRY",
  "trinidad and tobago": "TTD",
  "taiwan": "TWD",
  "tanzania": "TZS",
  "ukraine": "UAH",
  "uganda": "UGX",
  "united states": "USD",
  "uruguay": "UYU",
  "uzbekistan": "UZS",
  "venezuela": "VEF",
  // "venezuela": "VES",
  "vietnam": "VND",
  "vanuatu": "VUV",
  "samoa": "WST",
  "cfa franc beac": "XAF",
  "silver ounce": "XAG",
  "gold ounce": "XAU",
  "east caribbean": "XCD",
  "special drawing rights": "XDR",
  "cfa franc bceao": "XOF",
  "palladium ounce": "XPD",
  "cfp franc": "XPF",
  "platinum ounce": "XPT",
  "yemen": "YER",
  "south africa": "ZAR",
  "zambia": "ZMW",
  "zimbabwe": "ZWL"
};

const Map<String, String> currencySymbolMap = {
  "india": "₹",
  "united states of america": "\$",
  "china": "¥",
  "hong kong": "HK\$",
  "andorra": "€",
  "austria": "€",
  "belgium": "€",
  "cyprus": "€",
  "estonia": "€",
  "finland": "€",
  "france": "€",
  "germany": "€",
  "greece": "€",
  "ireland": "€",
  "italy": "€",
  "kosovo": "€",
  "latvia": "€",
  "lithuania": "€",
  "luxembourg": "€",
  "malta": "€",
  "monaco": "€",
  "montenegro": "€",
  "netherlands": "€",
  "portugal": "€",
  "san marino": "€",
  "slovakia": "€",
  "slovenia": "€",
  "spain": "€",
  "vatican city (holy see)": "€"
};

const String regUrl = "https://bharatudyog.vercel.app/api/v4/";
const String dbUrl = "https://dnk-documents-default-rtdb.firebaseio.com/";
const String imgUrl = "https://bharatudyog.vercel.app/";

final otpInputDecoration = InputDecoration(
  contentPadding:
      EdgeInsets.symmetric(vertical: getProportionateScreenWidth(15)),
  border: outlineInputBorder(),
  focusedBorder: outlineInputBorder(),
  enabledBorder: outlineInputBorder(),
);

OutlineInputBorder outlineInputBorder() {
  return OutlineInputBorder(
    borderRadius: BorderRadius.circular(getProportionateScreenWidth(15)),
    borderSide: BorderSide(color: kTextColor),
  );
}

// const Map<String, String> languages = {
//   'Hindi': 'Hindi',
//   'Bengali': 'Bengali',
//   'Telugu': 'Telugu',
//   'Marathi': 'Marathi',
//   'Tamil': 'Tamil',
//   'Urdu': 'Urdu',
//   'Gujarati': 'Gujarati',
//   'Malayalam': 'Malayalam',
//   'Kannada': 'Kannada',
//   'Odia': 'Odia',
//   'Punjabi': 'Punjabi',
//   'Assamese': 'Assamese',
//   'Nepali': 'Nepali',
//   'English': 'English',
//   'Spanish': 'Spanish',
//   'French': 'French',
//   'German': 'German',
//   'Italian': 'Italian',
//   'Portuguese': 'Portuguese',
//   'Russian': 'Russian',
//   'Chinese': 'Chinese',
//   'Japanese': 'Japanese',
//   'Korean': 'Korean',
//   'Turkish': 'Turkish',
//   'Dutch': 'Dutch',
//   'Swedish': 'Swedish',
//   'Norwegian': 'Norwegian',
//   'Finnish': 'Finnish',
//   'Greek': 'Greek',
//   'Thai': 'Thai',
// };

const List<String> languages = [
  'Hindi',
  'Bengali',
  'Telugu',
  'Marathi',
  'Tamil',
  'Urdu',
  'Gujarati',
  'Malayalam',
  'Kannada',
  'Odia',
  'Punjabi',
  'Assamese',
  'Nepali',
  'English',
];