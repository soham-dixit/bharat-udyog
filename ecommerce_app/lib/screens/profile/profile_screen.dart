import 'package:flutter/material.dart';
import 'package:get/get_core/get_core.dart';
import 'package:get/get_navigation/get_navigation.dart';

import 'package:shared_preferences/shared_preferences.dart';
import 'package:shop_app/constants.dart';
import 'package:shop_app/globals.dart';
import 'package:shop_app/screens/profile/components/help_screen.dart';
import 'package:shop_app/screens/profile/components/orders_screen.dart';
import 'package:shop_app/screens/profile/components/profile_menu.dart';
import 'package:shop_app/screens/profile/components/profile_pic.dart';
import 'package:shop_app/screens/profile/components/settings_screen.dart';
import 'package:shop_app/size_config.dart';

import '../../word_in_languages.dart';
import 'my_account.dart';

// import 'package:get/get.dart';
class ProfileScreen extends StatelessWidget {
  void logout(context) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    // unset all data
    prefs.clear();

    Get.snackbar("Success", "Logged out successfully");
    Navigator.pushNamedAndRemoveUntil(context, '/sign_in', (route) => false);
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: EdgeInsets.symmetric(vertical: getProportionateScreenHeight(20)),
      child: Column(
        children: [
          Container(
              margin: EdgeInsets.only(top: getProportionateScreenHeight(100)),
              child: ProfilePic()),
          SizedBox(height: getProportionateScreenHeight(20)),
          ProfileMenu(
            text: myAccountTranslations[crntSlctdLan]!,
            icon: "assets/icons/User Icon.svg",
            press: () {
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => MyAccount()));
            },
          ),
          ProfileMenu(
            text: myOrdersTranslations[crntSlctdLan]!,
            icon: "assets/icons/orders.svg",
            press: () {
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => OrdersScreen()));
            },
          ),
          ProfileMenu(
            text: settingsTranslations[crntSlctdLan]!,
            icon: "assets/icons/Settings.svg",
            press: () {
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => SettingsScreen()));
            },
          ),
          ProfileMenu(
            text: helpCenterTranslations[crntSlctdLan]!,
            icon: "assets/icons/Question mark.svg",
            press: () {
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => HelpScreen()));
            },
          ),
          //logout
          ProfileMenu(
            text: logoutTranslations[crntSlctdLan]!,
            icon: "assets/icons/Log out.svg",
            press: () {
              showDialog(
                context: context,
                builder: (_) => AlertDialog(
                  backgroundColor: kPrimaryLightColor,
                  title: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        logoutTranslations[crntSlctdLan]!,
                        style: TextStyle(color: kPrimaryColor),
                      ),
                      Divider(
                        thickness: 1,
                      ),
                    ],
                  ),
                  content: Text(signOutConfirmationTranslations[crntSlctdLan]!),
                  actions: [
                    OutlinedButton(
                        onPressed: () async {
                          await Future.delayed(Duration(milliseconds: 200));
                          Navigator.of(context).pop();
                        },
                        child: Text(
                          cancelTranslations[crntSlctdLan]!,
                          style: TextStyle(color: kPrimaryColor),
                        )),
                    OutlinedButton(
                      onPressed: () async {
                        logout(context);
                      },
                      child: Text(
                        signOutTranslations[crntSlctdLan]!,
                        style: TextStyle(color: kPrimaryColor),
                      ),
                    ),
                  ],
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}
