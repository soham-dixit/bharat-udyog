import 'package:flutter/material.dart';

import './summary_card.dart';
import '../../../models/Cart.dart';
import '../../../size_config.dart';

class Body extends StatelessWidget {
  Body({required this.products});
  final List<Cart> products;

  Widget build(BuildContext context) {
    return Padding(
      padding:
          EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(15)),
      child: Container(
        // color: Colors.green,
        height: getProportionateScreenHeight(518),
        child: ListView.builder(
          physics: BouncingScrollPhysics(),
          itemCount: products.length,
          itemBuilder: (context, index) => Padding(
            padding: EdgeInsets.symmetric(vertical: 10),
            child: SummaryCard(cart: products[index]),
          ),
        ),
      ),
    );
  }
}
