import 'package:postman_app/constants.dart';
import 'package:postman_app/size_config.dart';
import 'package:flutter/material.dart';
// import 'package:flutter_svg/flutter_svg.dart';
import 'package:geolocator/geolocator.dart';
import 'package:get/get.dart';

class CompletedOrderDetails extends StatefulWidget {
  const CompletedOrderDetails({super.key});

  @override
  State<CompletedOrderDetails> createState() => _OrderDetailsState();
}

class _OrderDetailsState extends State<CompletedOrderDetails> {
  Future<Position> getUserCurrentLocation() async {
    await Geolocator.requestPermission()
        .then((value) {})
        .onError((error, stackTrace) {
      print("error" + error.toString());
    });
    return await Geolocator.getCurrentPosition();
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
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
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
            // SizedBox(
            //   height: getProportionateScreenHeight(10),
            // ),
            Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Container(
                  margin: EdgeInsets.only(
                      left: getProportionateScreenWidth(20),
                      right: getProportionateScreenWidth(100),
                      bottom: getProportionateScreenHeight(10)),
                  decoration: const BoxDecoration(
                    border: Border(
                      left: BorderSide(
                        width: 14,
                        color: Color.fromARGB(21, 193, 32, 26),
                      ),
                    ),
                  ),
                  padding:
                      EdgeInsets.only(left: getProportionateScreenWidth(12)),
                  child: Text(
                    'Order Details',
                    style: TextStyle(
                      // fontSize: 36,
                      // set font size with screen size
                      fontSize: getProportionateScreenWidth(32),
                      fontWeight: FontWeight.bold,
                      color: Color(0xFFB02925),
                    ),
                    textAlign: TextAlign.left,
                  ),
                ),
                // Padding(
                //   padding: EdgeInsets.only(
                //       right: 30, left: 20, top: 20, bottom: 12),
                //   child: Text(
                //     "This data will be displayed in your account profile for security",
                //     style: TextStyle(
                //       fontSize: 16,
                //       color: Color.fromARGB(191, 0, 0, 0),
                //       fontFamily: 'Montserrat-Regular',
                //     ),
                //     textAlign: TextAlign.left,
                //   ),
                // ),
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
                      child: const Padding(
                        padding: EdgeInsets.all(16.0),
                        child: Wrap(
                          runSpacing: 8,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  'Name',
                                  style: TextStyle(
                                      fontSize: 12,
                                      color: Colors.black,
                                      fontWeight: FontWeight.w500),
                                ),
                                Text(
                                  'Soham Shah',
                                  style: TextStyle(
                                      fontSize: 12,
                                      fontWeight: FontWeight.w500),
                                )
                              ],
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  'Mobile No.',
                                  style: TextStyle(
                                      fontSize: 12,
                                      color: Colors.black,
                                      fontWeight: FontWeight.w500),
                                ),
                                Text(
                                  '9876543210',
                                  style: TextStyle(
                                      fontSize: 12,
                                      fontWeight: FontWeight.w500),
                                )
                              ],
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  'Email',
                                  style: TextStyle(
                                      fontSize: 12,
                                      color: Colors.black,
                                      fontWeight: FontWeight.w500),
                                ),
                                Text(
                                  'test@gmail.com',
                                  style: TextStyle(
                                      fontSize: 12,
                                      fontWeight: FontWeight.w500),
                                )
                              ],
                            ),
                            Row(
                              // crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  'Address',
                                  style: TextStyle(
                                      fontSize: 12,
                                      color: Colors.black,
                                      fontWeight: FontWeight.w500),
                                ),
                                Text(
                                  'Pune',
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
                      child: const Padding(
                        padding: EdgeInsets.all(16.0),
                        child: Wrap(
                          runSpacing: 8,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
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
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
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
                    // SizedBox(
                    //   height: getProportionateScreenHeight(75),
                    // ),
                    Container(
                      margin: EdgeInsets.only(
                          top: getProportionateScreenHeight(25)),
                      padding: EdgeInsets.only(
                          right: getProportionateScreenWidth(205)),
                      child: const Text(
                        'Interval Details',
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
                      child: const Padding(
                        padding: EdgeInsets.all(16.0),
                        child: Wrap(
                          runSpacing: 8,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  'Date',
                                  style: TextStyle(
                                      fontSize: 12,
                                      color: Colors.black,
                                      fontWeight: FontWeight.w500),
                                ),
                                Text(
                                  '20-09-2023',
                                  style: TextStyle(
                                      fontSize: 12,
                                      fontWeight: FontWeight.w500),
                                )
                              ],
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  'Time',
                                  style: TextStyle(
                                      fontSize: 12,
                                      color: Colors.black,
                                      fontWeight: FontWeight.w500),
                                ),
                                Text(
                                  '8:00 AM',
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
                      height: getProportionateScreenHeight(60),
                    ),
                  ],
                )
              ],
            ),
          ],
        ),
      ),
    );
  }
}
