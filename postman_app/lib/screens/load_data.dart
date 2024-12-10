import 'package:postman_app/backend/perform_http.dart';
import 'package:postman_app/enums.dart';
import 'package:postman_app/models/order.dart';
import 'package:postman_app/screens/order/navigation_page.dart';
import 'package:postman_app/size_config.dart';
import 'package:postman_app/widgets/bottom_navbar.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LoadData extends StatefulWidget {
  const LoadData({super.key});
  static String routeName = "load-data";
  @override
  State<LoadData> createState() => _LoadDataState();
}

class _LoadDataState extends State<LoadData> {
  String postmanId = "";
  String name = "";
  String email = "";
  int phone = 0;
  int pinCode = 0;

  Future<List<dynamic>> getPostmanCurrentOrders() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    postmanId = prefs.getString('postmanId')!;
    name = prefs.getString('postmanName')!;
    email = prefs.getString('postmanEmail')!;
    phone = prefs.getInt('postmanPhone')!;
    pinCode = prefs.getInt('postmanPincode')!;

    if (name.split(' ').length > 1) {
      name = name.substring(0, name.indexOf(' '));
    }
    // print("kabfkabfkaf");
    // print(email);
    Map getApiData = {};
    // print('postman/getPostmanOrders/$email');
    List<dynamic> res = await HttpRequest.performHttpRequest(
        'GET', 'postman/getPostmanOrders/$email', getApiData);
    orderList = [];
    compOrderList = [];
    print(res);
    if (res.isNotEmpty) {
      for (var element in res) {
        if (element["isDroppedAtDnk"] == true) {
          Order ord = Order(
            status: "completed",
            creationDate: element["readyToShipDate"] ?? "",
            assignedPostman: element["assignedPostman"],
            productName: element["productName"],
            city: element["city"],
            orderId: element["orderId"],
          );
          compOrderList.add(ord);
        } else {
          Order ord = Order(
            status: element["isPickedUp"] ? "picked up" : "pending",
            creationDate: element["readyToShipDate"] ?? "",
            assignedPostman: element["assignedPostman"],
            productName: element["productName"],
            city: element["city"],
            orderId: element["orderId"],
          );
          orderList.add(ord);
        }
      }
      return res;
      // print("akbfkaf");
    }
    // print("afnakf");
    // return [];
    return [];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FutureBuilder(
          future: getPostmanCurrentOrders(),
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              return const CustomBottomNavBar();
            }
            return const Center(
              child: CircularProgressIndicator(),
            );
          }),
    );
  }
}
