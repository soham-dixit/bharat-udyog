import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:shop_app/globals.dart';
import 'package:shop_app/models/Cart.dart';

import '../../models/Product.dart';
import '../../word_in_languages.dart';
import '../checkout/address_fill_screen.dart';
import '../checkout/components/check_out_card.dart';
import 'components/body.dart';

class CartScreen extends StatefulWidget {
  static String routeName = "/cart";

  @override
  State<CartScreen> createState() => _CartScreenState();
}

class _CartScreenState extends State<CartScreen> {
  List<Cart> products = [];
  double amount = 0;

  @override
  void initState() {
    super.initState();
    products = [];

    // loadinfg and decode shared preferences
    CartItem.loadAndDecode();
    CartItem.cartlist.forEach((item) {
      var list = allProducts.where((element) {
        return item.id == element.id;
      }).toList();

      products.add(Cart(product: list[0], numOfItem: item.num));
      amount += list[0].price * item.num;
    });
  }

  void onUpdate(int index) {
    setState(() {
      Cart pd = products.removeAt(index);
      amount -= (pd.numOfItem * pd.product.price);
      CartItem.cartlist.removeWhere((element) => element.id == pd.product.id);
      // storing data to shared preferences
      CartItem.storedData();
    });
  }

  @override
  Widget build(BuildContext context) {
    void _onPressed() {
      if(products.length == 0)
        Get.snackbar('Error', 'Add a product in your cart!');
      else
        Navigator.of(context).push(
          MaterialPageRoute(
              builder: (context) =>
                  AddressFillScreen(amount: amount, products: products)),
        );
    }

    return Scaffold(
      appBar: buildAppBar(context),
      body: Body(
        update: onUpdate,
        products: products,
      ),
      bottomNavigationBar: CheckoutCard(
        label: checkOutTranslations[crntSlctdLan]!,
        amount: amount,
        onpressed: _onPressed,
      ),
    );
  }

  AppBar buildAppBar(BuildContext context) {
    return AppBar(
      title: Column(
        children: [
          Text(
            yourCartTranslations[crntSlctdLan]!,
            style: TextStyle(color: Colors.black),
          ),
          Text(
            "${CartItem.cartlist.length} ${itemTranslations[crntSlctdLan]}",
            style: Theme.of(context).textTheme.bodySmall,
          ),
        ],
      ),
    );
  }
}
