import 'package:postman_app/routes.dart';
import 'package:postman_app/screens/home/comp_orders.dart';
import 'package:postman_app/screens/home/home.dart';
import 'package:postman_app/screens/order/orders_completed.dart';
import 'package:postman_app/screens/profile/profile_screen.dart';
import 'package:postman_app/size_config.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import '../enums.dart';

class CustomBottomNavBar extends StatefulWidget {
  const CustomBottomNavBar({
    Key? key,
  }) : super(key: key);

  @override
  State<CustomBottomNavBar> createState() => _CustomBottomNavBarState();
}

class _CustomBottomNavBarState extends State<CustomBottomNavBar> {
  @override
  int idx = 1;

  final List<Widget> children = [
    CompOrdersPage(),
    HomePage(),
    ProfileScreen(),
  ];
  Widget build(BuildContext context) {
    const Color inActiveIconColor = Colors.black;
    return Scaffold(
      body: children[idx],
      bottomNavigationBar: Container(
        padding: const EdgeInsets.symmetric(vertical: 14),
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              offset: Offset(0, -15),
              blurRadius: 20,
              color: Color(0xFFDADADA).withOpacity(0.15),
            ),
          ],
          borderRadius: const BorderRadius.only(
            topLeft: Radius.circular(40),
            topRight: Radius.circular(40),
          ),
        ),
        child: SafeArea(
            top: false,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                IconButton(
                  icon: SvgPicture.asset(
                    "assets/icons/completed_orders.svg",
                    width: getProportionateScreenWidth(27),
                    height: getProportionateScreenHeight(27),
                    color:
                        idx == 0 ? const Color(0xFFB02925) : inActiveIconColor,
                  ),
                  onPressed: () {
                    setState(() {
                      idx = 0;
                    });
                  },
                ),
                IconButton(
                  icon: SvgPicture.asset(
                    "assets/icons/orders.svg",
                    width: getProportionateScreenWidth(32),
                    height: getProportionateScreenHeight(32),
                    color:
                        idx == 1 ? const Color(0xFFB02925) : inActiveIconColor,
                  ),
                  onPressed: () {
                    setState(() {
                      idx = 1;
                    });
                  },
                ),
                IconButton(
                  icon: SvgPicture.asset(
                    "assets/icons/User Icon.svg",
                    width: getProportionateScreenWidth(27),
                    height: getProportionateScreenHeight(27),
                    color:
                        idx == 2 ? const Color(0xFFB02925) : inActiveIconColor,
                  ),
                  onPressed: () {
                    setState(() {
                      idx = 2;
                    });
                  },
                  // Navigator.pushNamed(context, ProfileScreen.routeName),
                ),
              ],
            )),
      ),
    );
  }
}
