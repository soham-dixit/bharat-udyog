import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:shop_app/globals.dart';

import '../../constants.dart';
import '../../size_config.dart';
import '../../word_in_languages.dart';

// ignore: must_be_immutable
class MyAccount extends StatefulWidget {
  MyAccount({super.key});
  static const String routeName = "/myAccountPage";

  @override
  State<MyAccount> createState() => _MyAccountState();
}

class _MyAccountState extends State<MyAccount> {
  String selectLanguage = "English";
  String consumerId = "";
  String name = "";
  String email = "";
  String phone = "";
  String pincode = "";
  String country = "";
  String state = "";
  String city = "";

  late List<TextEditingController> controllers = [];

  getConsumerDetails() async {
    // get data from shared pref
    SharedPreferences prefs = await SharedPreferences.getInstance();
    consumerId = prefs.getString('consumerId')!;
    name = prefs.getString('consumerName')!;
    email = prefs.getString('consumerEmail')!;
    phone = prefs.getString('consumerPhone')!;
    pincode = prefs.getString('consumerPincode')!;
    country = prefs.getString('consumerCountry')!;
    state = prefs.getString('consumerState')!;
    city = prefs.getString('consumerCity')!;

    print(pincode);

    setState(() {});
  }

  @override
  void initState() {
    super.initState();
    getConsumerDetails();
  }

  @override
  Widget build(BuildContext context) {
    controllers = [
      TextEditingController(text: name),
      TextEditingController(text: email),
      TextEditingController(text: phone),
      TextEditingController(text: city),
      TextEditingController(text: state),
      TextEditingController(text: country),
      TextEditingController(text: pincode),
    ];

    return Scaffold(
      body: Column(
        children: [
          SizedBox(
            height: getProportionateScreenHeight(50),
          ),
          Row(
            children: [
              Align(
                alignment: Alignment.topLeft,
                child: MaterialButton(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  color: const Color.fromARGB(22, 176, 42, 37),
                  textColor: kPrimaryColor,
                  padding: EdgeInsets.all(getProportionateScreenWidth(16)),
                  shape: const CircleBorder(),
                  elevation: 0.0,
                  highlightElevation:
                      0.0, // Set highlight elevation to 0.0 to remove animation
                  splashColor: Colors
                      .transparent, // Set splash color to transparent to remove splash effect
                  child: Icon(
                    Icons.arrow_back,
                    size: getProportionateScreenHeight(24),
                  ),
                ),
              ),
              Container(
                margin: EdgeInsets.only(
                  top: getProportionateScreenHeight(25),
                  right: getProportionateScreenWidth(80),
                  bottom: getProportionateScreenHeight(25),
                ),
                padding: EdgeInsets.only(left: getProportionateScreenWidth(12)),
                child: Text(
                  myAccountTranslations[crntSlctdLan]!,
                  style: TextStyle(
                    fontSize: getProportionateScreenWidth(26),
                    fontWeight: FontWeight.bold,
                    color: Color(0xFFB02925),
                  ),
                  textAlign: TextAlign.left,
                ),
              ),
            ],
          ),
          SizedBox(
            height: 20,
          ),
          Padding(
            padding: EdgeInsets.only(
              left: 20,
              right: 20,
            ),
            child: Column(
              children: [
                getDisplayComponent(_getFieldLabel(0), controllers[0]),
                getDisplayComponent(_getFieldLabel(1), controllers[1]),
                getDisplayComponent(_getFieldLabel(2), controllers[2]),
                getDisplayComponent(_getFieldLabel(3), controllers[3]),
                getDisplayComponent(_getFieldLabel(4), controllers[4]),
                getDisplayComponent(_getFieldLabel(5), controllers[5]),
                getDisplayComponent(_getFieldLabel(6), controllers[6]),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

Widget getDisplayComponent(
    String title, TextEditingController subTitleController) {
  return Column(
    mainAxisAlignment: MainAxisAlignment.center,
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(
        title,
        style: TextStyle(
          fontSize: 10,
          fontWeight: FontWeight.normal,
          color: kPrimaryColor,
        ),
      ),
      SizedBox(height: 4),
      EditableText(
        readOnly: true,
        style: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w600,
          fontFamily: 'Poppins',
          color: Colors.black,
        ),
        cursorColor: Colors.black,
        backgroundCursorColor: Colors.black,
        controller: subTitleController,
        focusNode: FocusNode(),
      ),
      Divider(
        thickness: 1,
        color: Colors.black45,
      ),
      const SizedBox(height: 20),
    ],
  );
}

String _getFieldLabel(int index) {
  switch (index) {
    case 0:
      return nameTranslations[crntSlctdLan]!;
    case 1:
      return emailTranslations[crntSlctdLan]!;
    case 2:
      return mobileNumberTranslations[crntSlctdLan]!;
    case 3:
      return cityTranslations[crntSlctdLan]!;
    case 4:
      return stateTranslations[crntSlctdLan]!;
    case 5:
      return countryTranslations[crntSlctdLan]!;
    case 6:
      return pincodeTranslations[crntSlctdLan]!;
    default:
      return '';
  }
}
