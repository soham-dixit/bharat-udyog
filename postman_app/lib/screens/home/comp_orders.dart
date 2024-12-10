import 'package:postman_app/enums.dart';
import 'package:postman_app/models/order.dart';
import 'package:postman_app/routes.dart';
import 'package:postman_app/size_config.dart';
import 'package:postman_app/widgets/CommonWidgets.dart';
import 'package:postman_app/widgets/bottom_navbar.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../backend/perform_http.dart';

class CompOrdersPage extends StatefulWidget {
  const CompOrdersPage({super.key});

  @override
  State<CompOrdersPage> createState() => _CompOrdersPageState();
}

class _CompOrdersPageState extends State<CompOrdersPage> {
  String postmanId = "";
  String name = "";
  String email = "";
  int phone = 0;
  int pinCode = 0;

  // Future<Map<String, dynamic>> getPostmanCurrentOrders() async {
  //   SharedPreferences prefs = await SharedPreferences.getInstance();
  //   var postmanEmail = prefs.getString('postmanEmail');

  //   Map getApiData = {};
  //   Map<String, dynamic> res = await HttpRequest.performHttpRequest(
  //       'GET', 'postman/getPostmanOrders/$postmanEmail', getApiData);
  //   if (res.isNotEmpty) {
  //     return res;
  //   }
  //   return {};
  // }

  // List<OrderCard> jobCards = [
  //   OrderCard(
  //       shopName: 'Nike',
  //       area: 'Pune',
  //       exporterName: 'Vinay',
  //       orderCreatedTime: '20 Sept 2023 - 10:00',
  //       status: 'Completed',
  //       onPress: () {
  //         Get.toNamed(Routesclass.compOrdersDetails);
  //       }),
  //   OrderCard(
  //       shopName: 'Nike',
  //       area: 'Pune',
  //       exporterName: 'Vinay',
  //       orderCreatedTime: '20 Sept 2023 - 10:00',
  //       status: 'Completed',
  //       onPress: () {
  //         Get.toNamed(Routesclass.compOrdersDetails);
  //       }),
  //   OrderCard(
  //       shopName: 'Nike',
  //       area: 'Pune',
  //       exporterName: 'Vinay',
  //       orderCreatedTime: '20 Sept 2023 - 10:00',
  //       status: 'Completed',
  //       onPress: () {
  //         Get.toNamed(Routesclass.compOrdersDetails);
  //       }),
  // ];

  getPostmanDetails() async {
    // get data from shared pref
    SharedPreferences prefs = await SharedPreferences.getInstance();
    postmanId = prefs.getString('postmanId')!;
    name = prefs.getString('postmanName')!;
    email = prefs.getString('postmanEmail')!;
    phone = prefs.getInt('postmanPhone')!;
    pinCode = prefs.getInt('postmanPincode')!;
    if (name.split(' ').length > 1) {
      // If more than one word, apply substring
      name = name.substring(0, name.indexOf(' '));
    }

    print(pinCode);

    setState(() {});
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getPostmanDetails();
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(100), // here the desired height
        child: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                Color(0xFFB02925),
                Color(0xFFFFA53E),
              ],
            ),
          ),
          child: Padding(
            padding: const EdgeInsets.only(top: 25),
            child: AppBar(
              automaticallyImplyLeading: false,
              backgroundColor: Colors.transparent,
              elevation: 0,
              title: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Hi, $name 👋',
                    style: const TextStyle(
                      fontSize: 22,
                      color: Colors.white,
                      fontFamily: 'Poppins',
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 10),
                  Text(
                    'Post Office - $pinCode',
                    style: const TextStyle(
                      fontSize: 16,
                      color: Colors.white,
                      fontWeight: FontWeight.normal,
                      fontFamily: 'Poppins',
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
      body: Padding(
        padding: // calculate screen padding
            EdgeInsets.only(
          top: MediaQuery.of(context).padding.top,
          bottom: MediaQuery.of(context).padding.bottom + 10,
          left: 12,
        ),
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    margin: const EdgeInsets.fromLTRB(10, 0, 0, 0),
                    child: const Text(
                      'Completed Orders',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.w700,
                        color: Color(0xFFB02925),
                      ),
                    ),
                  ),
                ],
              ),
              SizedBox(
                height: getProportionateScreenHeight(16),
              ),
              ListView.builder(
                shrinkWrap: true,
                itemCount: compOrderList.length,
                physics: const BouncingScrollPhysics(),
                itemBuilder: (context, position) {
                  return OrderCard(
                      shopName: compOrderList[position].productName,
                      area: compOrderList[position].city,
                      orderCreatedTime:
                          compOrderList[position].creationDate == ""
                              ? "Data not available"
                              : compOrderList[position]
                                  .creationDate
                                  .substring(0, 10),
                      status: compOrderList[position].status,
                      onPress: () {
                        Get.toNamed(
                          Routesclass.orderDetails,
                          arguments: {
                            'orderId': compOrderList[position].orderId,
                            'status': compOrderList[position].status,
                          },
                        );
                      });
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
