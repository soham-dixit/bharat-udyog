import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:shop_app/constants.dart';
import 'package:shop_app/globals.dart';
// import 'package:shop_app/models/Cart.dart';
import 'package:shop_app/models/Order.dart';
// import 'package:shop_app/screens/cart/components/cart_card.dart';
import 'package:shop_app/screens/profile/components/order_item.dart';
import 'package:shop_app/size_config.dart';

import '../../../word_in_languages.dart';

class OrdersScreen extends StatefulWidget {
  OrdersScreen({super.key});
  static final String routeName = "/order_screen";

  @override
  State<OrdersScreen> createState() => _OrdersScreenState();
}

class _OrdersScreenState extends State<OrdersScreen> {
  List<dynamic> orders = [];
  bool areOrdersPresent = false;

  // Future fetchOrders() async {
  //   SharedPreferences prefs = await SharedPreferences.getInstance();
  //   String userEmail = prefs.getString('consumerEmail')!;
  //   try {
  //     List<dynamic> response = await FetchOrders.performHttpRequest(
  //       'GET',
  //       'consumer/getConsumerOrder/$userEmail',
  //     );

  //     if (response.isNotEmpty) {
  //       print("got orders");
  //       orders = response;
  //       print(orders);
  //       orders.forEach((element) {
  //         Order ord = Order(
  //           id: element["_id"],
  //           photoUrl: element["photoUrl"],
  //           address: element["address"],
  //           city: element["city"],
  //           orderDate: element["orderDate"],
  //           price: element["price"].toString(),
  //           productName: element["productName"],
  //           qty: element["qty"].toString(),
  //           pincode: element["pincode"].toString(),
  //           state: element["state"],
  //         );
  //         allOrders.add(ord);
  //       });
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(getProportionateScreenHeight(100)),
        child: Column(
          children: [
            SizedBox(
              height: getProportionateScreenHeight(36),
            ),
            Row(
              children: [
                Align(
                  alignment: Alignment.topLeft,
                  child: MaterialButton(
                    onPressed: () {
                      Navigator.pop(context);
                    },
                    color: const Color.fromARGB(22, 176, 42, 37),
                    textColor: kPrimaryColor,
                    padding: EdgeInsets.all(getProportionateScreenWidth(16)),
                    shape: const CircleBorder(),
                    elevation: 0.0,
                    highlightElevation:
                        0.0, // Set highlight elevation to 0.0 to remove animation
                    splashColor: Colors
                        .transparent, // Set splash color to transparent to remove splash effect
                    child: const Icon(
                      Icons.arrow_back,
                      size: 24,
                    ),
                  ),
                ),
                Container(
                  margin: EdgeInsets.only(
                    top: getProportionateScreenHeight(25),
                    right: getProportionateScreenWidth(80),
                    bottom: getProportionateScreenHeight(25),
                  ),
                  padding:
                      EdgeInsets.only(left: getProportionateScreenWidth(12)),
                  child: Text(
                    myOrdersTranslations[crntSlctdLan]!,
                    style: TextStyle(
                      // fontSize: 36,
                      // set font size with screen size
                      fontSize: getProportionateScreenWidth(26),
                      fontWeight: FontWeight.bold,
                      color: Color(0xFFB02925),
                    ),
                    textAlign: TextAlign.left,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
      //end of appbar
      body: allOrders.isEmpty
          ? Center(
              child: Column(
                children: [
                  SizedBox(height: getProportionateScreenWidth(200),),
                  SvgPicture.asset(
                    'assets/icons/no_orders.svg',
                    height: getProportionateScreenWidth(140),
                  ),
                  Container(
                    child: Text(noOrdersFoundTranslations[crntSlctdLan]!),
                  ),
                ],
              ),
            )
          : ListView.builder(
              itemCount: allOrders.length,
              itemBuilder: (context, index) => OrderItem(
                dateMap: allOrders[index].dateMap,
                creationDate: allOrders[index].orderDate,
                itemName: allOrders[index].productName,
                quantity: int.parse(allOrders[index].qty),
                price: (int.parse(allOrders[index].qty) *
                        double.parse(allOrders[index].price)) *
                    KConversionrate,
                imageUrl: allOrders[index].photoUrl,
                status: allOrders[index].status,
              ),
            ),
      //appbar
    );
  }
}
