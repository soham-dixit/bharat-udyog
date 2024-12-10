import 'package:flutter/material.dart';
import 'package:get/get_core/get_core.dart';
import 'package:get/get_navigation/get_navigation.dart';
import 'package:razorpay_flutter/razorpay_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:shop_app/backend/place_order.dart';
import 'package:shop_app/components/coustom_bottom_nav_bar.dart';
import 'package:shop_app/constants.dart';
import 'package:shop_app/globals.dart';
import 'package:shop_app/models/Address.dart';
import 'package:shop_app/models/Cart.dart';
import 'package:shop_app/models/Order.dart';

class RazorPayGateway {
  late Razorpay _razorpay;

  late double amount;
  late List<Cart> products;
  late Address address;
  late BuildContext context;

  RazorPayGateway(Address address, List<Cart> products, double amount,
      BuildContext context) {
    this.products = products;
    this.amount = amount;
    this.address = address;
    this.amount = amount;
    this.context = context;
    _razorpay = Razorpay();
    _razorpay.on(Razorpay.EVENT_PAYMENT_SUCCESS, _handlePaymentSuccess);
    _razorpay.on(Razorpay.EVENT_PAYMENT_ERROR, _handlePaymentError);
    _razorpay.on(Razorpay.EVENT_EXTERNAL_WALLET, _handleExternalWallet);
  }

  Future<void> placeAllorders() async {
    print("Function called.............");
    SharedPreferences prefs = await SharedPreferences.getInstance();
    // print("user id $userID");
    String email = prefs.getString("consumerEmail")!;
    bool isOrdered = true;
    products.forEach((element) async {
      //call post for every unique item
      int price = (element.product.price * element.numOfItem).round();
      Map<String, dynamic> postData = {
        "productName": element.product.title,
        "price": price,
        "qty": element.numOfItem,
        "orderedBy": address.name,
        "productId": element.product.id,
        "photoUrl": element.product.photoUrl,
        "email": email,
        "country": address.country,
        "pincode": address.pincode,
        "phoneNumber": address.mobileNo,
        "state": address.state,
        "city": address.city,
        "address":
            address.house + address.area + address.city + address.pincode,
        "exporterId": element.product.exporterId,
      };

      var response = await OrderPlacement.performHttpRequest(
        'POST',
        'consumer/placeOrder',
        postData,
      );
      print("fabfjafbakbkg");
      print(response);

      if (response.isEmpty) {
        isOrdered = false;
        Get.snackbar("Failed", "Sorry order failed :(");
      } else {
        Order ord = Order(
          status: 0,
          dateMap: {"readyToShipDate": DateTime.now().toString()},
          id: element.product.id,
          photoUrl: element.product.photoUrl,
          address:
              address.house + address.area + address.city + address.pincode,
          city: address.city,
          orderDate: DateTime.now().toString(),
          price: price.toString(),
          productName: element.product.title,
          qty: element.numOfItem.toString(),
          pincode: address.pincode,
          state: address.state,
        );
        allOrders.add(ord);
      }
    });
    if (isOrdered) {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      Get.snackbar("Success", "Order placed successfully");
      prefs.remove('cartlist_key');
      CartItem.cartlist = [];
      CartItem.cartlistString = "";
    }
  }

  startPayment(String orderId) async {
    print("start payment prodssssss");

    print("Razorpayyyyyyyyyyyyyyy");
    print(GcountryCode);
    var options = {
      'key': 'rzp_test_qV2u3EETbOukSU',
      'currency': CountryCodeMap[address.country.toLowerCase()],
      'amount': amount * 100, //in the smallest currency sub-unit.
      'name': 'BharatUdyog',
      'order_id': orderId, // Generate order_id using Orders API
      'description': 'BharatUdyog E-Commerce',
      'timeout': 120, // in seconds
      'prefill': {
        'contact': address.mobileNo,
        'email': currentUserEmail,
      }
    };

    try {
      _razorpay.open(options);
    } catch (e) {
      print(" Razor Pay errror " + e.toString());
    }
  }

  void dispose() {
    _razorpay.clear();
  }

  void _handlePaymentSuccess(PaymentSuccessResponse response) async {
    print("placing order");
    await placeAllorders();
    print(
        "Payment Successfull.   Payment ID - ${response.paymentId}  Order ID - ${response.orderId}");
    Get.snackbar("Order placed", "Payment successful");
    Navigator.pushNamedAndRemoveUntil(
        context, CustomBottomNavBar.routeName, (route) => false);
  }

  void _handlePaymentError(PaymentFailureResponse response) async {
    // await placeAllorders();
    Get.snackbar("Order Failed", "Payment Transaction failed");
    print("Payment Errror .  ${response.message!}");
    Navigator.pop(context);
  }

  void _handleExternalWallet(ExternalWalletResponse response) {
    // Do something when an external wallet was selected
    print("RazorWallet  :  ${response.walletName!}");
  }
}
