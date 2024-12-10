import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../constants.dart';
import '../../size_config.dart';

// ignore: must_be_immutable
class MyAccount extends StatefulWidget {
  MyAccount({super.key});
  static const String routeName = "/myAccountPage";

  @override
  State<MyAccount> createState() => _MyAccountState();
}

class _MyAccountState extends State<MyAccount> {
  String selectLanguage = "English";
  late List<TextEditingController> controllers = [];
  String postmanId = "";
  String name = "";
  String email = "";
  int phone = 0;
  int pincode = 0;

  getPostmanDetails() async {
    // get data from shared pref
    SharedPreferences prefs = await SharedPreferences.getInstance();
    postmanId = prefs.getString('postmanId')!;
    name = prefs.getString('postmanName')!;
    email = prefs.getString('postmanEmail')!;
    phone = prefs.getInt('postmanPhone')!;
    pincode = prefs.getInt('postmanPincode')!;
    // name = name.substring(0, name.indexOf(' '));

    print(pincode);

    setState(() {});
  }

  @override
  void initState() {
    super.initState();
    getPostmanDetails();
  }

  @override
  Widget build(BuildContext context) {
    controllers = [
      TextEditingController(text: name),
      TextEditingController(text: email),
      TextEditingController(text: phone.toString()),
      TextEditingController(text: pincode.toString()),
      TextEditingController(text: postmanId),
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
                  'My Account',
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
      return 'Name';
    case 1:
      return 'Email';
    case 2:
      return 'Phone no.';
    case 3:
      return 'Pincode';
    case 4:
      return 'Postman ID';
    default:
      return '';
  }
}
