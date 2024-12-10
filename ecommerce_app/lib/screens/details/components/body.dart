import 'package:flutter/material.dart';
import 'package:shop_app/models/Product.dart';

import 'product_description.dart';
import 'top_rounded_container.dart';
import 'product_images.dart';
import 'add_to_cart.dart';

class Body extends StatelessWidget {
  final Product product;

  const Body({Key? key, required this.product}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      physics: BouncingScrollPhysics(),
      child: Column(
        children: [
          ProductImages(product: product),
          TopRoundedContainer(
            color: Colors.white,
            child: Column(
              children: [
                ProductDescription(product: product),
                AddToCart(product: product),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
