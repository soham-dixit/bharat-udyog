import 'package:postman_app/enums.dart';
import 'package:postman_app/size_config.dart';
import 'package:postman_app/widgets/bottom_navbar.dart';
import 'package:postman_app/widgets/profile/profile_menu.dart';
import 'package:postman_app/widgets/profile/profile_pic.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../constants.dart';
import '../../routes.dart';

// import 'components/body.dart';

class ProfileScreen extends StatelessWidget {
  static String routeName = "/profile";

  void logout(context) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.clear();
    Get.snackbar("Logged out!", "You have successfully logged out.");
    Navigator.pushNamedAndRemoveUntil(context, '/logIn', (route) => false);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar: AppBar(
      //   title: Text("Profile"),
      // ),
      body: SingleChildScrollView(
        padding: EdgeInsets.symmetric(vertical: 20),
        child: Column(
          children: [
            Container(
                margin: EdgeInsets.only(top: getProportionateScreenHeight(100)),
                child: const ProfilePic()),
            SizedBox(height: getProportionateScreenHeight(20)),
            ProfileMenu(
              text: "My Account",
              icon: "assets/icons/User Icon.svg",
              press: () {
                Get.toNamed(Routesclass.myAccount);
              },
            ),
            ProfileMenu(
              text: "Change Language",
              icon: "assets/icons/language.svg",
              press: () {
                showDialog<void>(
                  context: context,
                  barrierDismissible: false,
                  builder: (BuildContext context) {
                    return Container(
                      margin: EdgeInsets.symmetric(
                        vertical: getProportionateScreenHeight(130),
                      ),
                      child: CustomDialog(
                        title: 'Change Language',
                      ),
                    );
                  },
                );
              },
            ),
            ProfileMenu(
              text: "Help Center",
              icon: "assets/icons/Question mark.svg",
              press: () {},
            ),
            ProfileMenu(
              text: "Log Out",
              icon: "assets/icons/Log out.svg",
              press: () {
                showDialog(
                  context: context,
                  builder: (_) => AlertDialog(
                    backgroundColor: kPrimaryLightColor,
                    title: const Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Log out",
                          style: TextStyle(color: kPrimaryColor),
                        ),
                        Divider(
                          thickness: 1,
                        ),
                      ],
                    ),
                    content: Text("Do you really want to Sign out?"),
                    actions: [
                      OutlinedButton(
                          onPressed: () async {
                            await Future.delayed(Duration(milliseconds: 200));
                            Navigator.of(context).pop();
                          },
                          child: const Text(
                            "Cancel",
                            style: TextStyle(color: kPrimaryColor),
                          )),
                      OutlinedButton(
                          onPressed: () async {
                            logout(context);
                          },
                          child: const Text(
                            "Log out",
                            style: TextStyle(color: kPrimaryColor),
                          )),
                    ],
                  ),
                );
              },
            ),
          ],
        ),
      ),
      // bottomNavigationBar:
      //     const CustomBottomNavBar(selectedMenu: MenuState.profile),
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
            itemCount: 50,
            itemBuilder: (context, index) {
              return InkWell(
                  onTap: () {
                    setState(() {
                      selectedItem = index;
                    });
                  },
                  child: LanguageCard(
                      lang: "English", selected: selectedItem == index));
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
              //implementation of language selection
              Navigator.of(context).pop();
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

class LanguageCard extends StatelessWidget {
  LanguageCard({required this.lang, required this.selected});
  final String lang;
  final bool selected;
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: getProportionateScreenHeight(5)),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Container(
            margin: EdgeInsets.only(left: getProportionateScreenWidth(20)),
            child: selected
                ? Icon(
                    Icons.done_rounded,
                    color: kPrimaryColor,
                  )
                : CircleAvatar(
                    backgroundColor: kPrimaryLightColor,
                    radius: 8,
                  ),
          ),
          Container(
            margin: EdgeInsets.only(left: getProportionateScreenWidth(30)),
            child: Text(
              lang,
              style: TextStyle(
                fontSize: getProportionateScreenHeight(18),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
