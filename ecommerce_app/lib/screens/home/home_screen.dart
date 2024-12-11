import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:shop_app/screens/home/components/festival_specific_product.dart';
import 'package:shop_app/screens/home/components/personalized_recommend.dart';

import '../../constants.dart';
import '../../size_config.dart';
import '../chatbot/chatbot.dart';
import 'components/categories.dart';
import 'components/discount_banner.dart';
import 'components/home_header.dart';
import 'components/popular_product.dart';
import 'components/special_offers.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Container(
        child: Stack(children: [
          SingleChildScrollView(
            physics: BouncingScrollPhysics(),
            child: Column(
              children: [
                SizedBox(height: getProportionateScreenHeight(20)),
                HomeHeader(),
                SizedBox(height: getProportionateScreenWidth(10)),
                DiscountBanner(),
                Categories(),
                SpecialOffers(),
                SizedBox(height: getProportionateScreenWidth(30)),
                PopularProducts(),
                SizedBox(height: getProportionateScreenWidth(30)),
                // PersonalizedRecommend(),
                // SizedBox(height: getProportionateScreenWidth(30)),
                FestiveProducts(),
                SizedBox(height: getProportionateScreenWidth(30)),
              ],
            ),
          ),
          // temporary hided
          // GestureDetector(
          //   onTap: () {
          //     Navigator.pushNamed(context, ChatBot.routeName);
          //   },
          //   child: Padding(
          //     padding: EdgeInsets.only(right: 13, bottom: 23),
          //     child: Align(
          //       alignment: Alignment.bottomRight,
          //       child: Container(
          //           margin: EdgeInsets.all(3),
          //           decoration: BoxDecoration(
          //             color: kPrimaryColor.withOpacity(0.3),
          //             borderRadius: BorderRadius.circular(100),
          //           ),
          //           child: Padding(
          //             padding: const EdgeInsets.all(10.0),
          //             child: SvgPicture.asset(
          //               "assets/icons/chatbot.svg",
          //               width: 40,
          //               height: 40,
          //             ),
          //           )),
          //     ),
          //   ),
          // ),
        ]),
      ),
    );
  }
}
