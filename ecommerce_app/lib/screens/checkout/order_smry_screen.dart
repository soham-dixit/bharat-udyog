import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get_core/get_core.dart';
import 'package:get/get_navigation/get_navigation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:shop_app/backend/place_order.dart';

import 'package:shop_app/constants.dart';
import 'package:shop_app/models/Address.dart';
import 'package:shop_app/word_in_languages.dart';

import '../../globals.dart';
import '../../models/Cart.dart';
// import 'address_fill_screen.dart';
import 'components/payment_loading.dart';
import 'components/body.dart';
import 'components/tracer.dart';

import '../../size_config.dart';

class OrderSummaryScreen extends StatefulWidget {
  // static String routeName = "order-summary-screen";
  OrderSummaryScreen({
    super.key,
    required this.amount,
    required this.address,
    // required this.exporterId,
    required this.products,
  });

  final double amount;
  // final String url;
  final Address address;
  final List<Cart> products;
  @override
  State<OrderSummaryScreen> createState() => _OrderSummaryScreenState();
}

class _OrderSummaryScreenState extends State<OrderSummaryScreen> {
// amount needs toupdate as total order amount
  bool isOrdered = true;
  Future<void> placeAllorders() async {
    print("Function called.............");
    SharedPreferences prefs = await SharedPreferences.getInstance();
    // String userName = prefs.getString('consumerName')!;
    String email = prefs.getString('consumerEmail')!;
    // bool isOrdered = false;
    widget.products.forEach((element) async {
      //call post for every unique item
      int price = (element.product.price * element.numOfItem).round();
      Map<String, dynamic> postData = {
        "productName": element.product.title,
        "productId": element.product.id,
        "email": email,
        // "productId" : id;
        "price": price,
        "qty": element.numOfItem,
        "orderedBy": widget.address.name,
        "country": widget.address.country,
        "pincode": widget.address.pincode,
        "phoneNumber": widget.address.mobileNo,
        "state": widget.address.state,
        "city": widget.address.city,
        "photoUrl": element.product.photoUrl,
        "address": widget.address.house +
            widget.address.area +
            widget.address.city +
            widget.address.pincode,
        "exporterId": element.product.exporterId,
        "photoUrl": element.product.photoUrl,
      };

      var response = await OrderPlacement.performHttpRequest(
        'POST',
        'consumer/placeOrder',
        postData,
      );

      if (response.isEmpty) {
        isOrdered = false;
        Get.snackbar("Failed", "Sorry order failed :(");
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: false,
        backgroundColor: Colors.white,
        body: Container(
          width: SizeConfig.screenWidth,
          height: SizeConfig.screenHeight,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              tracer(which: 2, ctx: context),
              Body(
                products: widget.products,
              ),
            ],
          ),
        ),
        bottomNavigationBar: Container(
          padding: EdgeInsets.symmetric(
            vertical: getProportionateScreenWidth(15),
            horizontal: getProportionateScreenWidth(30),
          ),
          // height: 174,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(30),
              topRight: Radius.circular(30),
            ),
            boxShadow: [
              BoxShadow(
                offset: Offset(0, -15),
                blurRadius: 20,
                color: Color(0xFFDADADA).withOpacity(0.15),
              )
            ],
          ),
          child: SafeArea(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Container(
                      padding: EdgeInsets.all(10),
                      height: getProportionateScreenWidth(40),
                      width: getProportionateScreenWidth(40),
                      decoration: BoxDecoration(
                        color: Color(0xFFF5F6F9),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: SvgPicture.asset("assets/icons/receipt.svg"),
                    ),
                    Spacer(),
                    Text(doPaymentTranslations[crntSlctdLan]!),
                    const SizedBox(width: 10),
                    Icon(
                      Icons.arrow_forward_ios,
                      size: 12,
                      color: kTextColor,
                    )
                  ],
                ),
                SizedBox(height: getProportionateScreenHeight(20)),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text.rich(
                      TextSpan(
                        text: "${totalTranslations[crntSlctdLan]}:\n",
                        children: [
                          TextSpan(
                            text:
                                "$currencySymbol${double.parse((widget.amount * KConversionrate).toStringAsFixed(2))}",
                            style: TextStyle(fontSize: 16, color: Colors.black),
                          ),
                        ],
                      ),
                    ),
                    SizedBox(
                      width: getProportionateScreenWidth(190),
                      child: SizedBox(
                        width: double.infinity,
                        height: getProportionateScreenHeight(56),
                        child: TextButton(
                          style: TextButton.styleFrom(
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(20)),
                            foregroundColor: Colors.white,
                            backgroundColor: kPrimaryColor,
                          ),
                          onPressed: () async {
                            //
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => PaymentLoadScreen(
                                  amount: widget.amount,
                                  address: widget.address,
                                  products: widget.products,
                                ),
                              ),
                            );
                            // Future.delayed(Duration(seconds: 80));
                          },
                          child: Text(
                            payTranslations[crntSlctdLan]!,
                            style: TextStyle(
                              fontSize: getProportionateScreenWidth(18),
                              color: Colors.white,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        )

        //after razor pay uncomment this.....
        //   CheckoutCard(
        //   label: "Pay",
        //   amount: widget.amount,
        //   address: widget.address,
        //   products: widget.products,
        // ),
        );
  }
}
