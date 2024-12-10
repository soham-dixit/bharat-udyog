import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
// import 'package:flutter_svg/flutter_svg.dart';
// import 'package:shared_preferences/shared_preferences.dart';
import 'package:shop_app/models/favorite.dart';
// import 'package:shop_app/globals.dart';
// import 'package:shop_app/models/RateModel.dart';
import 'package:shop_app/screens/exporter_chat/all_chats_screen.dart';
import 'package:shop_app/screens/home/home_screen.dart';
import 'package:shop_app/screens/profile/profile_screen.dart';
import 'package:shop_app/screens/whishlist/whishlist_screen.dart';
// import 'package:http/http.dart' as http;

import '../constants.dart';
import '../enums.dart';
import '../../../models/Product.dart';

class CustomBottomNavBar extends StatefulWidget {
  CustomBottomNavBar({
    Key? key,
    this.index = 0,
  }) : super(key: key);

  static String routeName = "custom-navigation-bar";
  int index;

  @override
  State<CustomBottomNavBar> createState() => _CustomBottomNavBarState();
}

class _CustomBottomNavBarState extends State<CustomBottomNavBar> {
  late MenuState selectedMenu;
  late int selectedItem = widget.index;

  String conversionKey = currConversionKey;
  String countryName = "india";
  final List<Widget> _children = [
    HomeScreen(),
    WishlistScreen(),
    AllExporterChat(),
    ProfileScreen(),
  ];

  @override
  void initState() {
    super.initState();
    _loadWishlist();
  }

  void _loadWishlist() {
    FavItem.loadAndDecode();
    allProducts.forEach((element) {
      var contain = FavItem.wishlist.where((item) => item.id == element.id);
      element.isFavourite = contain.isEmpty ? false : true;
      print(element);
    });
  }
  // Future<dynamic> getConversionRate() async {
  //   SharedPreferences prefs = await SharedPreferences.getInstance();
  //   double storedConversionRate = prefs.getDouble('conversionRate') ?? 0;

  //   if (currencySymbolMap.containsKey(countryName.toLowerCase()))
  //     currencySymbol = currencySymbolMap[countryName.toLowerCase()]!;
  //   print(storedConversionRate);
  //   if (storedConversionRate != 0) {
  //     KConversionrate = storedConversionRate;
  //     print("stored.....");
  //     print(KConversionrate);
  //     return KConversionrate;
  //   } else {
  //     var response = await http.get(Uri.parse(
  //         "https://openexchangerates.org/api/latest.json?base=USD&app_id=" +
  //             conversionKey));
  //     var data = ratesModelFromJson(response.body);
  //     var usd = 1 / data.rates["INR"]!;

  //     GcountryCode = CountryCodeMap[countryName.toLowerCase()]!;
  //     KConversionrate = usd * data.rates[GcountryCode]!;

  //     prefs.setDouble('conversionRate', KConversionrate);
  //     print(currencySymbol);
  //     print(KConversionrate);
  //     return response;
  //   }
  // }

  void _navigateBottomBar(int index) {
    setState(() {
      selectedItem = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    final Color inActiveIconColor = Color(0xFFB6B6B6);
    return Scaffold(
      body: _children[selectedItem],
      bottomNavigationBar: BottomNavigationBar(
          type: BottomNavigationBarType.fixed,
          showSelectedLabels: false,
          showUnselectedLabels: false,
          backgroundColor: Color.fromARGB(255, 247, 242, 242),
          currentIndex: selectedItem,
          onTap: _navigateBottomBar,
          items: [
            BottomNavigationBarItem(
              label: "Home",
              icon: SvgPicture.asset(
                "assets/icons/Shop Icon.svg",
                color: selectedItem == 0 ? kPrimaryColor : inActiveIconColor,
              ),
            ),
            BottomNavigationBarItem(
              label: "wishlist",
              icon: SvgPicture.asset(
                "assets/icons/Heart Icon.svg",
                color: selectedItem == 1 ? kPrimaryColor : inActiveIconColor,
              ),
            ),
            BottomNavigationBarItem(
              label: "chatExporter",
              icon: SvgPicture.asset(
                "assets/icons/Chat bubble Icon.svg",
                color: selectedItem == 2 ? kPrimaryColor : inActiveIconColor,
              ),
            ),
            BottomNavigationBarItem(
              label: "profile",
              icon: SvgPicture.asset(
                "assets/icons/User Icon.svg",
                color: selectedItem == 3 ? kPrimaryColor : inActiveIconColor,
              ),
            ),
          ]),
    );
  }

  // @override
  // Widget build(BuildContext context) {
  //   final Color inActiveIconColor = Color(0xFFB6B6B6);
  //   return Container(
  //     padding: EdgeInsets.symmetric(vertical: 14),
  //     decoration: BoxDecoration(
  //       color: Colors.white,
  //       boxShadow: [
  //         BoxShadow(
  //           offset: Offset(0, -15),
  //           blurRadius: 20,
  //           color: Color(0xFFDADADA).withOpacity(0.15),
  //         ),
  //       ],
  //       borderRadius: BorderRadius.only(
  //         topLeft: Radius.circular(40),
  //         topRight: Radius.circular(40),
  //       ),
  //     ),
  //     child: SafeArea(
  //         top: false,
  //         child: Row(
  //           mainAxisAlignment: MainAxisAlignment.spaceAround,
  //           children: [
  //             IconButton(
  //                 icon: SvgPicture.asset(
  //                   "assets/icons/Shop Icon.svg",
  //                   color: MenuState.home == selectedMenu
  //                       ? kPrimaryColor
  //                       : inActiveIconColor,
  //                 ),
  //                 onPressed: () {
  //                   if (MenuState.home != selectedMenu) {

  //                   }
  //                 }),
  //             IconButton(
  //               icon: SvgPicture.asset("assets/icons/Heart Icon.svg"),
  //               onPressed: () {},
  //             ),
  //             IconButton(
  //               icon: SvgPicture.asset("assets/icons/Chat bubble Icon.svg"),
  //               onPressed: () {},
  //             ),
  //             IconButton(
  //               icon: SvgPicture.asset(
  //                 "assets/icons/User Icon.svg",
  //                 color: MenuState.profile == selectedMenu
  //                     ? kPrimaryColor
  //                     : inActiveIconColor,
  //               ),
  //               onPressed: () {
  //                 if (MenuState.profile != selectedMenu) {
  //                   Navigator.pushReplacementNamed(
  //                       context, ProfileScreen.routeName);
  //                 }
  //               },
  //             ),
  //           ],
  //         )),
  //   );
  // }
}
