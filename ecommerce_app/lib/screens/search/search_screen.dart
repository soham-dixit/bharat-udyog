import 'package:flutter/material.dart';
import 'package:shop_app/size_config.dart';

import './components/searching_field.dart';
import './components/body.dart';
import '../../models/Product.dart';
// import 'package:shop_app/screens/home/components/search_field.dart';

class SearchScreen extends StatefulWidget {
  static String routeName = "/search-screen";
  SearchScreen({super.key});

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  List<Product> products = [...allProducts];
  String searchText = "";
  bool isFestivalScreen = false;
  bool isRecommendScreen = false;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // Check for festival argument when screen is first loaded
    final args = ModalRoute.of(context)?.settings.arguments;
    if (args is Map<String, dynamic> && args['festival'] == true) {
      isFestivalScreen = true;
      products = festiveProducts
          .where((product) => product.isFestival == true)
          .toList();
    }
    if (args is Map<String, dynamic> && args['recommend'] == true) {
      isRecommendScreen = true;
      products = recommendedProducts;
    }
  }

  void updateBody(String str) {
    List<Product> newProducts = isFestivalScreen
        ? allProducts.where((product) => product.isFestival == true).toList()
        : isRecommendScreen
            ? [...recommendedProducts]
            : [...allProducts];

    searchText = str;

    if (str.isNotEmpty) {
      newProducts = newProducts.where((element) {
        return element.title.toLowerCase().contains(str.toLowerCase());
      }).toList();
    }

    setState(() {
      products = newProducts;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Container(
      height: double.infinity,
      padding: EdgeInsets.only(top: SizeConfig.screenHeight * 0.06),
      child: Stack(
        children: [
          SearchingField(
            updateBody: updateBody,
            previous: searchText,
          ),
          Body(
            products: products,
          ),
        ],
      ),
    ));
  }
}
