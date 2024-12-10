import 'package:flutter/material.dart';
import 'package:shop_app/components/empty_lottie.dart';
import 'package:shop_app/globals.dart';
import 'package:shop_app/models/favorite.dart';

import '../../../components/product_card_vertical.dart';
import '../../../models/Product.dart';
import '../../../size_config.dart';
import '../../../word_in_languages.dart';

class Body extends StatefulWidget {
  const Body({super.key});

  @override
  State<Body> createState() => _BodyState();
}

class _BodyState extends State<Body> {
  List<Product> products = [];

  @override
  void initState() {
    super.initState();
    products = [];
    FavItem.wishlist.forEach((item) {
      products.addAll(allProducts.where((element) {
        return item.id == element.id;
      }).toList());
    });
  }

  @override
  Widget build(BuildContext context) {
    double aspectratio =
        getProportionateScreenWidth(150) / getProportionateScreenHeight(225);
    return Container(
        margin: EdgeInsets.only(
            top: getProportionateScreenHeight(15),
            left: getProportionateScreenWidth(15),
            right: getProportionateScreenWidth(15)),
        height: SizeConfig.screenHeight * 0.895,
        child: whatToShow(aspectratio));
  }

  Widget whatToShow(double aspectratio) {
    if (products.length == 0) {
      return EmptyLottie(
          pathToAsset: "assets/empty_wishlist.json",
          heading: noProductsInWishlistTranslations[crntSlctdLan]!);
    }

    return GridView.builder(
      physics: BouncingScrollPhysics(),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          childAspectRatio: aspectratio,
          crossAxisCount: 2, // number of items in each row
          mainAxisSpacing: 10.0,
          crossAxisSpacing: 15 // spacing between rows
          ),
      itemCount: products.length,
      itemBuilder: (context, index) {
        return ProductCardVertical(
          product: products[index],
        );
      },
    );
  }
}
