import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shop_app/components/coustom_bottom_nav_bar.dart';
import 'package:shop_app/models/Address.dart';
import 'package:shop_app/models/Cart.dart';
import 'package:http/http.dart' as http;

import '../../../constants.dart';
import './razor_pay.dart';

class PaymentLoadScreen extends StatefulWidget {
  const PaymentLoadScreen({
    required this.amount,
    required this.address,
    required this.products,
  });
  final double amount;
  final Address address;
  final List<Cart> products;

  @override
  State<PaymentLoadScreen> createState() => _PaymentLoadScreenState();
}

class _PaymentLoadScreenState extends State<PaymentLoadScreen> {
  RazorPayGateway? _razorPayGateway;

  Future<String> createRazorpayOrder(double amount) async {
    // Replace 'YOUR_KEY_ID' and 'YOUR_SECRET' with your actual Razorpay API key and secret
    String keyId = 'rzp_test_qV2u3EETbOukSU';
    String keySecret = 'bgi7CbFCxoOHXg7mgxPtKGkM';

    String apiUrl = 'https://api.razorpay.com/v1/orders';

    Map<String, dynamic> orderData = {
      'amount':
          amount.toInt(), // Convert to integer (in smallest currency sub-unit)
      'currency': CountryCodeMap[widget.address.country.toLowerCase()],
      'receipt': 'receipt#1',
      'notes': {
        'key1': 'value3',
        'key2': 'value2',
      },
    };

    try {
      final response = await http.post(
        Uri.parse(apiUrl),
        headers: {
          'Content-Type': 'application/json',
          'Authorization':
              'Basic ${base64Encode(utf8.encode('$keyId:$keySecret'))}',
        },
        body: jsonEncode(orderData),
      );

      if (response.statusCode == 200) {
        // Successfully created the order
        Map<String, dynamic> responseData = json.decode(response.body);
        print('Order created successfully: ${responseData['id']}');
        return responseData['id'];
      } else {
        // Handle error
        print(
            'Error creating order: ${response.statusCode} - ${response.body}');
        return 'Error creating order';
      }
    } catch (error) {
      print('Error creating order: $error');
      return error.toString();
    }
  }

  @override
  Widget build(BuildContext context) {
    _razorPayGateway = RazorPayGateway(
        widget.address, widget.products, widget.amount, context);

    return Scaffold(
        body: FutureBuilder(
      future: createRazorpayOrder(widget.amount * 100),
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          String orderId = snapshot.data!;
          _razorPayGateway!.startPayment(orderId);
        }
        // if no orderid recerived
        else
          return Container(
              alignment: Alignment.center, child: CircularProgressIndicator());
        // poping out

        return Container(
            alignment: Alignment.center, child: CircularProgressIndicator());
      },
    ));
  }
}
