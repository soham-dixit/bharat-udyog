import 'package:shared_preferences/shared_preferences.dart';

import 'dart:convert';
import 'Product.dart';

class Cart {
  final Product product;
  final int numOfItem;

  Cart({required this.product, required this.numOfItem});
}

// Demo data for our cart

List<Cart> demoCarts = [
  Cart(product: demoProducts[0], numOfItem: 2),
  Cart(product: demoProducts[1], numOfItem: 1),
  Cart(product: demoProducts[3], numOfItem: 1),
];

class CartItem {
  final String id;
  int num;

  CartItem({required this.id, required this.num});

  factory CartItem.fromJson(Map<String, dynamic> jsonData) {
    return CartItem(id: jsonData['id'], num: jsonData['num']);
  }

  static Map<String, dynamic> toMap(CartItem prod) =>
      {'id': prod.id, 'num': prod.num};

  static String encode() => json.encode(CartItem.cartlist
      .map<Map<String, dynamic>>((music) => CartItem.toMap(music))
      .toList());

  static void loadAndDecode() {
    if (CartItem.cartlistString != "")
      CartItem.cartlist =
          (json.decode(CartItem.cartlistString) as List<dynamic>)
              .map<CartItem>((prod) => CartItem.fromJson(prod))
              .toList();
  }

  static void storedData() async {
    CartItem.cartlistString = CartItem.encode();
    final SharedPreferences _prefs = await SharedPreferences.getInstance();
    await _prefs.setString('cartlist_key', cartlistString);
  }

  static List<CartItem> cartlist = [];
  static String cartlistString = '';
}
