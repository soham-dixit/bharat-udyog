import 'package:postman_app/enums.dart';
import 'package:postman_app/models/order.dart';
import 'package:postman_app/routes.dart';
import 'package:postman_app/size_config.dart';
import 'package:postman_app/widgets/CommonWidgets.dart';
import 'package:postman_app/widgets/bottom_navbar.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../backend/perform_http.dart';
import '../load_data.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String postmanId = "";
  String name = "";
  String email = "";
  int phone = 0;
  int pinCode = 0;

  var result;

  getPostmanDetails() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    postmanId = prefs.getString('postmanId')!;
    name = prefs.getString('postmanName')!;
    email = prefs.getString('postmanEmail')!;
    phone = prefs.getInt('postmanPhone')!;
    pinCode = prefs.getInt('postmanPincode')!;

    if (name.split(' ').length > 1) {
      name = name.substring(0, name.indexOf(' '));
    }

    setState(() {});
  }

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
        preferredSize: const Size.fromHeight(100),
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
                  const SizedBox(height: 10),
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
        child: RefreshIndicator(
          onRefresh: () async {
            Navigator.pushAndRemoveUntil(
                context,
                MaterialPageRoute(builder: (context) => LoadData()),
                (route) => false);
          },
          child: SingleChildScrollView(
            dragStartBehavior: DragStartBehavior.down,
            physics: const AlwaysScrollableScrollPhysics(),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      margin: const EdgeInsets.fromLTRB(10, 0, 0, 0),
                      child: const Text(
                        'Current Orders',
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
                (orderList.length == 0)
                    ? Center(
                        child: Column(
                          children: [
                            SizedBox(
                              height: getProportionateScreenHeight(70),
                            ),
                            SvgPicture.asset(
                              'assets/icons/empty_orders.svg',
                              width: getProportionateScreenWidth(200),
                              height: getProportionateScreenHeight(200),
                            ),
                            SizedBox(
                              height: getProportionateScreenHeight(20),
                            ),
                            const Text('Empty! No pickups yet',
                                style: TextStyle(
                                  fontSize: 16,
                                  color: Color(0xFFB02925),
                                )),
                          ],
                        ),
                      )
                    : ListView.builder(
                        shrinkWrap: true,
                        itemCount: orderList.length,
                        physics: const BouncingScrollPhysics(),
                        itemBuilder: (context, position) {
                          //if(snapshot.data["orders"][position]["isDroppedAtDnk"] == false)
                          return OrderCard(
                              shopName: orderList[position].productName,
                              area: orderList[position].city,
                              // exporterName: orderList[position].,
                              orderCreatedTime:
                                  orderList[position].creationDate == ""
                                      ? "Data not available"
                                      : orderList[position]
                                          .creationDate
                                          .substring(0, 10),
                              status: orderList[position].status,
                              onPress: () {
                                Get.toNamed(
                                  Routesclass.orderDetails,
                                  arguments: {
                                    'orderId': orderList[position].orderId,
                                    'status': orderList[position].status,
                                  },
                                );
                              });
                        },
                      ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
