import 'package:postman_app/constants.dart';
import 'package:postman_app/routes.dart';
import 'package:postman_app/screens/order/navigation_page.dart';
import 'package:postman_app/size_config.dart';
import 'package:flutter/material.dart';
// import 'package:flutter_svg/flutter_svg.dart';
import 'package:geolocator/geolocator.dart';
import 'package:get/get.dart';

import '../../backend/perform_http.dart';

class OrderDetails extends StatefulWidget {
  const OrderDetails({super.key});

  @override
  State<OrderDetails> createState() => _OrderDetailsState();
}

class _OrderDetailsState extends State<OrderDetails> {
  Future<Position> getUserCurrentLocation() async {
    await Geolocator.requestPermission()
        .then((value) {})
        .onError((error, stackTrace) {
      print("error" + error.toString());
    });
    return await Geolocator.getCurrentPosition();
  }

  late final orderId;
  late final orderStatus;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();

    final arguments = Get.arguments;
    orderId = arguments['orderId'];
    orderStatus = arguments['status'];
  }

  Future<Map<String, dynamic>> getOrderDetails() async {
    Map getApiData = {};
    Map<String, dynamic> res = await HttpRequest.performOrderHttpRequest(
        'GET', 'postman/getOrderDetails/$orderId', getApiData);

    if (res.isNotEmpty) return res;

    return {};
  }

  dropAtDnk() async {
    Map<String, dynamic> res = await HttpRequest.performPutRequest(
        'PUT', 'postman/dropAtDnkCentre/$orderId');

    if (res.isNotEmpty) {
      setState(() {
        Get.snackbar('Success', 'Status updated!');
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: true,
      body: Container(
        padding: EdgeInsets.only(
            top: getProportionateScreenHeight(50),
            bottom: getProportionateScreenHeight(30)),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Align(
              alignment: Alignment.topLeft,
              child: MaterialButton(
                onPressed: () {
                  Get.back();
                },
                color: const Color.fromARGB(22, 176, 42, 37),
                textColor: kPrimaryColor,
                padding: const EdgeInsets.all(16),
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
            SizedBox(
              height: getProportionateScreenHeight(25),
            ),
            FutureBuilder(
                future: getOrderDetails(),
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    return Column(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Container(
                          margin: EdgeInsets.only(
                              top: getProportionateScreenHeight(25),
                              right: getProportionateScreenWidth(80)),
                          decoration: const BoxDecoration(
                            border: Border(
                              left: BorderSide(
                                width: 14,
                                color: Color.fromARGB(21, 193, 32, 26),
                              ),
                            ),
                          ),
                          padding: EdgeInsets.only(
                              left: getProportionateScreenWidth(12)),
                          child: Text(
                            'Order Details',
                            style: TextStyle(
                              // fontSize: 36,
                              // set font size with screen size
                              fontSize: getProportionateScreenWidth(34),
                              fontWeight: FontWeight.bold,
                              color: Color(0xFFB02925),
                            ),
                            textAlign: TextAlign.left,
                          ),
                        ),
                        Column(
                          children: [
                            Container(
                              margin: EdgeInsets.only(
                                  top: getProportionateScreenHeight(25)),
                              padding: EdgeInsets.only(
                                  right: getProportionateScreenWidth(175)),
                              child: const Text(
                                'Customer Details',
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.w500,
                                  color: Colors.black,
                                ),
                              ),
                            ),
                            SizedBox(
                              height: getProportionateScreenHeight(25),
                            ),
                            Card(
                              margin: EdgeInsets.only(
                                  left: getProportionateScreenWidth(18),
                                  right: getProportionateScreenWidth(18)),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                              elevation: 1,
                              child: Padding(
                                padding: EdgeInsets.all(16.0),
                                child: Wrap(
                                  runSpacing: 8,
                                  children: [
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        const Text(
                                          'Name',
                                          style: TextStyle(
                                              fontSize: 12,
                                              color: Colors.black,
                                              fontWeight: FontWeight.w500),
                                        ),
                                        Text(
                                          snapshot.data?['orderedBy'],
                                          style: const TextStyle(
                                              fontSize: 12,
                                              fontWeight: FontWeight.w500),
                                        )
                                      ],
                                    ),
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        const Text(
                                          'Mobile No.',
                                          style: TextStyle(
                                              fontSize: 12,
                                              color: Colors.black,
                                              fontWeight: FontWeight.w500),
                                        ),
                                        Text(
                                          snapshot.data?['phoneNumber'],
                                          style: const TextStyle(
                                              fontSize: 12,
                                              fontWeight: FontWeight.w500),
                                        )
                                      ],
                                    ),
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        const Text(
                                          'Email',
                                          style: TextStyle(
                                              fontSize: 12,
                                              color: Colors.black,
                                              fontWeight: FontWeight.w500),
                                        ),
                                        Text(
                                          snapshot.data?['email'],
                                          style: const TextStyle(
                                              fontSize: 12,
                                              fontWeight: FontWeight.w500),
                                        )
                                      ],
                                    ),
                                    Row(
                                      // crossAxisAlignment: CrossAxisAlignment.start,
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        const Text(
                                          "City",
                                          style: const TextStyle(
                                              fontSize: 12,
                                              color: Colors.black,
                                              fontWeight: FontWeight.w500),
                                        ),
                                        Text(
                                          snapshot.data?['city'],
                                          style: const TextStyle(
                                              fontSize: 12,
                                              fontWeight: FontWeight.w500),
                                        )
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                            ),
                            Container(
                              margin: EdgeInsets.only(
                                  top: getProportionateScreenHeight(25)),
                              padding: EdgeInsets.only(
                                  right: getProportionateScreenWidth(205)),
                              child: const Text(
                                'Parcel Details',
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.w500,
                                  color: Colors.black,
                                ),
                              ),
                            ),
                            SizedBox(
                              height: getProportionateScreenHeight(25),
                            ),
                            Card(
                              margin: EdgeInsets.only(
                                  left: getProportionateScreenWidth(18),
                                  right: getProportionateScreenWidth(18)),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                              elevation: 1,
                              child: Padding(
                                padding: EdgeInsets.all(16.0),
                                child: Wrap(
                                  runSpacing: 8,
                                  children: [
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        Text(
                                          'Item | Quantity | Weight',
                                          style: TextStyle(
                                              fontSize: 12,
                                              color: Colors.black,
                                              fontWeight: FontWeight.w500),
                                        ),
                                        Text(
                                          '${snapshot.data?['productName']} | ${snapshot.data?['qty']} | 1 kg',
                                          style: TextStyle(
                                              fontSize: 12,
                                              fontWeight: FontWeight.w500),
                                        )
                                      ],
                                    ),
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        Text(
                                          'Item | Quantity | Weight',
                                          style: TextStyle(
                                              fontSize: 12,
                                              color: Colors.black,
                                              fontWeight: FontWeight.w500),
                                        ),
                                        Text(
                                          'Pot | 1 | 1 kg',
                                          style: TextStyle(
                                              fontSize: 12,
                                              fontWeight: FontWeight.w500),
                                        )
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                            ),
                            SizedBox(
                              height: getProportionateScreenHeight(30),
                            ),
                            (orderStatus == 'completed')
                                ? Center(
                                    child: Text('Order completed'),
                                  )
                                : Column(
                                    children: [
                                      Center(
                                        child: Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.center,
                                          children: [
                                            Text(
                                              'Verification Pin: ',
                                              style: TextStyle(
                                                  fontSize: 18,
                                                  fontWeight: FontWeight.w500,
                                                  color: Colors.black),
                                            ),
                                            Text(
                                              snapshot.data!['pin'].toString(),
                                              style: TextStyle(
                                                  fontSize: 18,
                                                  fontWeight: FontWeight.w500,
                                                  color: kPrimaryColor),
                                            ),
                                          ],
                                        ),
                                      ),
                                      SizedBox(
                                        height:
                                            getProportionateScreenHeight(20),
                                      ),
                                      MaterialButton(
                                        height:
                                            getProportionateScreenHeight(55),
                                        minWidth:
                                            getProportionateScreenWidth(120),
                                        padding: EdgeInsets.all(
                                            getProportionateScreenHeight(8)),
                                        color: kPrimaryColor,
                                        shape: RoundedRectangleBorder(
                                          borderRadius: BorderRadius.circular(
                                              20), // Adjust the radius as needed
                                        ),
                                        child: const Text(
                                          'Drop at Post Office',
                                          style: TextStyle(
                                              color: Colors.white,
                                              fontSize: 13),
                                        ),
                                        onPressed: dropAtDnk,
                                      ),
                                      SizedBox(
                                        height:
                                            getProportionateScreenHeight(10),
                                      ),
                                      Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceEvenly,
                                        children: <Widget>[
                                          MaterialButton(
                                            height:
                                                getProportionateScreenHeight(
                                                    55),
                                            minWidth:
                                                getProportionateScreenWidth(
                                                    120),
                                            padding: EdgeInsets.all(
                                                getProportionateScreenHeight(
                                                    8)),
                                            color: kPrimaryColor,
                                            shape: RoundedRectangleBorder(
                                              borderRadius: BorderRadius.circular(
                                                  20), // Adjust the radius as needed
                                            ),
                                            child: const Text(
                                              'Navigate to Exporter',
                                              style: TextStyle(
                                                  color: Colors.white,
                                                  fontSize: 13),
                                            ),
                                            onPressed: () {
                                              print("location");
                                              print(snapshot
                                                      .data?['exporterLocation']
                                                  ['latitude']);
                                              print(snapshot
                                                      .data?['exporterLocation']
                                                  ['longitude']);
                                              getUserCurrentLocation()
                                                  .then((value) {
                                                Get.toNamed(
                                                    Routesclass.navigationPage,
                                                    arguments: NavigationPage(
                                                        lat: double.parse(snapshot
                                                                    .data?[
                                                                'exporterLocation']
                                                            ['latitude']),
                                                        long: double.parse(snapshot
                                                                    .data?[
                                                                'exporterLocation']
                                                            ['longitude']),
                                                        // lat: 18.50186,
                                                        // long: 73.863613,
                                                        pos: value));
                                              });
                                            },
                                          ),
                                          MaterialButton(
                                            padding: EdgeInsets.all(
                                                getProportionateScreenHeight(
                                                    8)),
                                            height:
                                                getProportionateScreenHeight(
                                                    55),
                                            minWidth:
                                                getProportionateScreenWidth(
                                                    120),
                                            color: kPrimaryColor,
                                            shape: RoundedRectangleBorder(
                                              borderRadius: BorderRadius.circular(
                                                  20), // Adjust the radius as needed
                                            ),
                                            child: const Text(
                                              'Navigate to Post Office',
                                              style: TextStyle(
                                                  color: Colors.white,
                                                  fontSize: 13),
                                            ),
                                            onPressed: () {
                                              getUserCurrentLocation()
                                                  .then((value) {
                                                Get.toNamed(
                                                    Routesclass.navigationPage,
                                                    arguments: NavigationPage(
                                                        lat: 13.003162112819226,
                                                        long: 80.09884398437424,
                                                        pos: value));
                                              });
                                            },
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                          ],
                        )
                      ],
                    );
                  } else {
                    return Container(
                      margin: EdgeInsets.only(
                          top: getProportionateScreenHeight(250)),
                      child: Center(
                        child: CircularProgressIndicator(),
                      ),
                    );
                  }
                }),
          ],
        ),
      ),
    );
  }
}
