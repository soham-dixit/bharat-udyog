import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:shop_app/globals.dart';
import 'package:shop_app/size_config.dart';

import '../../word_in_languages.dart';
import './components/body.dart';

class WishlistScreen extends StatelessWidget {
  const WishlistScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(100), // here the desired height
        child: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                Color(0xFFB02925),
                Color(0xFFFFA53E),
              ],
            ),
          ),
          child: Padding(
            padding: EdgeInsets.only(top: 25),
            child: AppBar(
              automaticallyImplyLeading: false,
              backgroundColor: Colors.transparent,
              elevation: 0,
              title: Row(
                children: [
                  SvgPicture.asset(
                    'assets/icons/wishlist.svg',
                    height: 30,
                    width: 30,
                  ),
                  SizedBox(width: getProportionateScreenWidth(10)),
                  Text(
                    wishlistTranslations[crntSlctdLan]!,
                    // textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 22,
                      color: Colors.white,
                      fontFamily: 'Poppins',
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
      body: Body(),
    );
  }
}
