import 'package:flutter/material.dart';
import 'package:shop_app/globals.dart';
import 'package:shop_app/models/Cart.dart';

import '../../../constants.dart';
// import '../../../globals.dart';
import '../../../size_config.dart';
import '../../details/details_screen.dart';

class CartCard extends StatelessWidget {
  const CartCard({
    Key? key,
    required this.cart,
  }) : super(key: key);

  final Cart cart;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        SizedBox(
          width: 88,
          child: AspectRatio(
            aspectRatio: 0.88,
            child: InkWell(
              onTap: () => Navigator.pushNamed(context, DetailsScreen.routeName,
                  arguments: ProductDetailsArguments(
                    product: cart.product,
                  )),
              child: Container(
                padding: EdgeInsets.all(getProportionateScreenWidth(10)),
                decoration: BoxDecoration(
                  color: Color(0xFFF5F6F9),
                  borderRadius: BorderRadius.circular(15),
                ),
                child: Image.network("${cart.product.photoUrl}"),
              ),
            ),
          ),
        ),
        SizedBox(width: 20),
        Container(
          width: getProportionateScreenWidth(220),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                cart.product.title,
                softWrap: false,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(color: Colors.black, fontSize: 16),
              ),
              SizedBox(height: 10),
              Text.rich(
                TextSpan(
                  text:
                      "$currencySymbol${double.parse((cart.product.price * KConversionrate).toStringAsFixed(2))}",
                  style: TextStyle(
                      fontWeight: FontWeight.w600, color: kPrimaryColor),
                  children: [
                    TextSpan(
                        text: " x${cart.numOfItem}",
                        style: Theme.of(context).textTheme.bodyLarge),
                  ],
                ),
              )
            ],
          ),
        )
      ],
    );
  }
}
