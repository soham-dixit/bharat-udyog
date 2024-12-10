import 'package:flutter/material.dart';
import 'package:shop_app/components/empty_lottie.dart';

import '../../../models/Product.dart';
import '../../../components/product_card_vertical.dart';
import '../../../size_config.dart';

class Body extends StatefulWidget {
  const Body({super.key, required this.products});

  final List<Product> products;

  @override
  State<Body> createState() => BodyState();
}

class BodyState extends State<Body> {
  void update() {
    setState(() {});
  }

  Widget whatToShow(double aspectratio) {
    // if empty()
    if (widget.products.length == 0) {
      return EmptySvg(
          pathToAsset: "assets/no_search.svg",
          heading: "Oops, We don't have what you are looking for.");
    }

    return GridView.builder(
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          childAspectRatio: aspectratio,
          crossAxisCount: 2, // number of items in each row
          mainAxisSpacing: 10.0,
          crossAxisSpacing: 15 // spacing between rows
          // crossAxisSpacing: 8.0, // spacing between columns
          ),
      itemCount: widget.products.length,
      itemBuilder: (context, index) =>
          ProductCardVertical(product: widget.products[index]),
    );
  }

  @override
  Widget build(BuildContext context) {
    double aspectratio =
        getProportionateScreenWidth(150) / getProportionateScreenHeight(225);
    return Container(
      // color: Colors.amber,
      // alignment: Alignment.center,
      margin: EdgeInsets.only(
          top: SizeConfig.screenHeight * 0.07,
          left: getProportionateScreenWidth(15),
          right: getProportionateScreenWidth(15)),
      height: SizeConfig.screenHeight * 0.895,
      child: whatToShow(aspectratio),
    );
  }
}
