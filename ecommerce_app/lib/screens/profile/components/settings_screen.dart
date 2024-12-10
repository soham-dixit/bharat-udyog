import 'package:flutter/material.dart';
import 'package:shop_app/components/coustom_bottom_nav_bar.dart';
// import 'package:get/get.dart';
import 'package:shop_app/constants.dart';
import 'package:shop_app/globals.dart';
import 'package:shop_app/screens/profile/components/language_card.dart';
import 'package:shop_app/size_config.dart';

import '../../../word_in_languages.dart';

// ignore: must_be_immutable
class SettingsScreen extends StatefulWidget {
  SettingsScreen({super.key});
  static final String routeName = "/settings_screen";

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  String selectLanguage = "English";

  void updateUi() {
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body:
          //appbar
          Column(
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
                  settingsTranslations[crntSlctdLan]!,
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

          //body
          SizedBox(
            height: getProportionateScreenHeight(60),
          ),
          ChoiceWidget(
            title: changeLanguageTranslations[crntSlctdLan]!,
            icon: Icons.language,
          ),
          SizedBox(
            height: getProportionateScreenHeight(28),
          ),
          // ChoiceWidget(
          //   title: "Change Region",
          //   icon: Icons.landscape_outlined,
          // ),
          // SizedBox(
          //   height: getProportionateScreenHeight(28),
          // ),
          SaveAddress(
            title: savedAddressTranslations[crntSlctdLan]!,
            icon: Icons.location_on_outlined,
          ),
        ],
      ),
    );
  }
}

// ignore: must_be_immutable
class SaveAddress extends StatelessWidget {
  SaveAddress({required this.title, required this.icon});
  final String title;
  final IconData icon;

  int selectedItem = 0;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {},
      child: Container(
        margin:
            EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(10)),
        padding: EdgeInsets.symmetric(
            horizontal: getProportionateScreenWidth(20),
            vertical: getProportionateScreenHeight(20)),
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Color.fromARGB(255, 169, 163, 163),
              blurRadius: 0.5,
              spreadRadius: 0.0,
              offset: Offset(1.0, 1.0), // shadow direction: bottom right
            ),
          ],
          borderRadius: BorderRadius.all(Radius.circular(10)),
        ),
        child: Row(
          children: [
            Container(
              margin: EdgeInsets.only(left: getProportionateScreenWidth(16)),
              child: Icon(
                size: getProportionateScreenHeight(28),
                icon,
                color: kPrimaryColor,
              ),
            ),
            Container(
              margin: EdgeInsets.only(left: getProportionateScreenWidth(30)),
              child: Text(
                title,
                style: TextStyle(
                  color: kPrimaryColor,
                  fontSize: getProportionateScreenHeight(16),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class CustomDialog extends StatefulWidget {
  const CustomDialog({
    required this.title,
  });
  final String title;
  @override
  State<CustomDialog> createState() => _CustomDialogState();
}

class _CustomDialogState extends State<CustomDialog> {
  int selectedItem = 0;
  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text(
        widget.title,
        style: TextStyle(color: kPrimaryColor, fontWeight: FontWeight.bold),
      ),
      content:
          //region & language content

          Container(
        margin: EdgeInsets.only(bottom: getProportionateScreenHeight(0)),
        width: double.maxFinite,
        child: ListView.builder(
            itemCount: languages.length,
            itemBuilder: (context, index) {
              return InkWell(
                  onTap: () {
                    setState(() {
                      selectedItem = index;
                    });
                  },
                  child: LanguageCard(
                      lang: languages[index], selected: selectedItem == index));
            }),
      ),

      //buttons
      actions: <Widget>[
        Container(
          margin: EdgeInsets.only(
            right: getProportionateScreenWidth(10),
          ),
          child: TextButton(
            child: Text(
              'Cancel',
              style: TextStyle(
                color: kPrimaryColor,
              ),
            ),
            onPressed: () {
              Navigator.of(context).pop();
            },
          ),
        ),
        Container(
          margin: EdgeInsets.only(
            right: getProportionateScreenWidth(18),
          ),
          child: TextButton(
            child: Text(
              'Select',
              style: TextStyle(
                color: kPrimaryColor,
              ),
            ),
            onPressed: () {
              crntSlctdLan = languages[selectedItem];
              Navigator.of(context).pushAndRemoveUntil(
                  MaterialPageRoute(
                      builder: (context) => CustomBottomNavBar(
                            index: 3,
                          )),
                  (route) => false);
            },
          ),
        ),
      ],
    );
  }
}

// ignore: must_be_immutable
class ChoiceWidget extends StatelessWidget {
  ChoiceWidget({required this.title, required this.icon});
  final String title;
  final IconData icon;

  int selectedItem = 0;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        showDialog<void>(
          context: context,
          barrierDismissible: false,
          builder: (BuildContext context) {
            return Container(
              margin: EdgeInsets.symmetric(
                vertical: getProportionateScreenHeight(130),
              ),
              child: CustomDialog(
                title: title,
              ),
            );
          },
        );
      },
      child: Container(
        margin:
            EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(10)),
        padding: EdgeInsets.symmetric(
            horizontal: getProportionateScreenWidth(20),
            vertical: getProportionateScreenHeight(20)),
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Color.fromARGB(255, 169, 163, 163),
              blurRadius: 0.5,
              spreadRadius: 0.0,
              offset: Offset(1.0, 1.0), // shadow direction: bottom right
            ),
          ],
          borderRadius: BorderRadius.all(Radius.circular(10)),
        ),
        child: Row(
          children: [
            Container(
              margin: EdgeInsets.only(left: getProportionateScreenWidth(16)),
              child: Icon(
                size: getProportionateScreenHeight(28),
                icon,
                color: kPrimaryColor,
              ),
            ),
            Container(
              margin: EdgeInsets.only(left: getProportionateScreenWidth(30)),
              child: Text(
                title,
                style: TextStyle(
                  color: kPrimaryColor,
                  fontSize: getProportionateScreenHeight(16),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
