import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:shop_app/components/rounded_icon_btn.dart';
import 'package:shop_app/globals.dart';
import 'package:shop_app/models/Product.dart';

import '../../../constants.dart';
import '../../../models/Cart.dart';
import '../../../size_config.dart';
import '../../../word_in_languages.dart';

class ColorDots extends StatefulWidget {
  ColorDots({
    Key? key,
    required this.product,
  }) : super(key: key);

  final Product product;

  @override
  State<ColorDots> createState() => _ColorDotsState();
}

class _ColorDotsState extends State<ColorDots> {
  int noOf = 0;
  late BuildContext ctx;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getNoOF();
  }

  @override
  void dispose() {
    // TODO: implement dispose
    super.dispose();
    setCart();
    // ScaffoldMessenger.of(ctx).hideCurrentSnackBar();
  }

  @override
  Widget build(BuildContext context) {
    // Now this is fixed and only for demo
    ctx = context;
    return Padding(
      padding:
          EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(20)),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            "${quantityTranslations[crntSlctdLan]!} : ${noOf}",
            overflow: TextOverflow.ellipsis,
            style: TextStyle(
              fontSize: 17,
              fontWeight: FontWeight.w600,
              color: kPrimaryColor,
            ),
          ),
          SizedBox(width: getProportionateScreenWidth(100)),
          RoundedIconBtn(
            icon: Icons.remove,
            press: _onRemove,
          ),
          SizedBox(width: getProportionateScreenWidth(15)),
          RoundedIconBtn(
            icon: Icons.add,
            showShadow: true,
            press: _onAdd,
          ),
        ],
      ),
    );
  }

  void getNoOF() {
    var contain = CartItem.cartlist
        .where((element) => element.id == widget.product.id)
        .toList();

    if (contain.isEmpty)
      noOf = 0;
    else
      noOf = contain[0].num;
  }

  void setCart() {
    var contain = CartItem.cartlist
        .where((element) => element.id == widget.product.id)
        .toList();

    if (contain.isEmpty && noOf > 0)
      CartItem.cartlist.add(CartItem(id: widget.product.id, num: noOf));
    else if (noOf > 0)
      contain[0].num = noOf;
    else
      CartItem.cartlist.removeWhere((prod) => prod.id == widget.product.id);

    CartItem.storedData();
  }

  void _onAdd() {
    if (noOf + 1 <= widget.product.availableQty) {
      setState(() => noOf++);
      Get.snackbar("Added to cart", "successfully added to cart");
    } else
      Get.snackbar("Limit Exceeded", "Products not available");
  }

  void _onRemove() {
    if (noOf - 1 >= 0) {
      setState(() => noOf--);
      Get.snackbar("Removed from cart", "successfully removed from cart");
    }
    // storing data to shared preferences
  }
}
