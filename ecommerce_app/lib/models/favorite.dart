import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

class FavItem {
  final String id;

  FavItem({required this.id});

  factory FavItem.fromJson(Map<String, dynamic> jsonData) {
    return FavItem(
      id: jsonData['id'].toString(),
    );
  }

  static Map<String, dynamic> toMap(FavItem prod) => {'id': prod.id};

  static String encode() => json.encode(
        FavItem.wishlist
            .map<Map<String, dynamic>>((music) => FavItem.toMap(music))
            .toList(),
      );

  static void loadAndDecode() {
    if (FavItem.wishlistString != "")
      FavItem.wishlist = (json.decode(FavItem.wishlistString) as List<dynamic>)
          .map<FavItem>((prod) => FavItem.fromJson(prod))
          .toList();
    else {
      print("epmty wishlisttt");
    }
  }

  static void storedData() async {
    String wishlistString = FavItem.encode();
    final SharedPreferences _prefs = await SharedPreferences.getInstance();
    await _prefs.setString('wishlist_key', wishlistString);
  }

  static List<FavItem> wishlist = [];
  static String wishlistString = '';
}
