import 'package:flutter/material.dart';
import 'package:shop_app/globals.dart';
import 'package:shop_app/screens/details/components/top_rounded_container.dart';

import '../../../models/Product.dart';
import '../../../size_config.dart';
import '../../../word_in_languages.dart';
import 'color_dots.dart';

class AddToCart extends StatelessWidget {
  AddToCart({
    super.key,
    required this.product,
  });

  final Product product;

  @override
  Widget build(BuildContext context) {
    return TopRoundedContainer(
      color: Color(0xFFF6F7F9),
      child: Column(
        children: [
          Container(
              decoration: BoxDecoration(
                color: Color.fromARGB(255, 172, 175, 180),
                borderRadius: BorderRadius.all(Radius.circular(40)),
              ),
              margin: EdgeInsets.symmetric(
                  horizontal: getProportionateScreenWidth(80),
                  vertical: getProportionateScreenHeight(10)),
              padding: EdgeInsets.symmetric(
                  horizontal: getProportionateScreenWidth(20),
                  vertical: getProportionateScreenHeight(6)),
              child: Text(
                addToCartTranslations[crntSlctdLan]!,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                    fontSize: getProportionateScreenWidth(15),
                    color: Colors.white,
                    fontWeight: FontWeight.w600),
              )),
          ColorDots(product: product),
        ],
      ),
    );
  }
}
