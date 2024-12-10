import 'package:flutter/material.dart';
import 'package:order_tracker_zen/order_tracker_zen.dart';
import 'package:shop_app/constants.dart';
import 'package:shop_app/globals.dart';
import 'package:shop_app/size_config.dart';
import 'package:shop_app/word_in_languages.dart';

class OrderDetails extends StatefulWidget {
  const OrderDetails({
    required this.status,
    required this.image,
    required this.itemName,
    required this.imageUrl,
    required this.date,
    required this.dateMap,
  });
  final String image;
  final String itemName;
  final String imageUrl;
  final int status;
  final String date;
  final Map<String, String> dateMap;
  @override
  State<OrderDetails> createState() => _OrderDetailsState();
}

class _OrderDetailsState extends State<OrderDetails> {
  List<TrackerData> trackData = [];
  @override
  Widget build(BuildContext context) {
    // int currentStep = widget.status;
    for (int i = 0; i <= widget.status; i++) {
      TrackerData trk = TrackerData(
        title: orderStatusMsgDateMap[orderStatusSeq[i]]!["status"]!,
        date: widget.date.substring(0, 10),
        tracker_details: [
          TrackerDetails(
              title:  orderStatusMsgDateMap[orderStatusSeq[i]]!["msg"]!, datetime: widget.date.substring(10,19)),
        ],
      );
      trackData.add(trk);
    }

    return Scaffold(
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(100),
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
      body: SingleChildScrollView(
        child: Column(
          children: [
            Container(
              margin: EdgeInsets.only(top: getProportionateScreenWidth(0)),
              padding: EdgeInsets.all(getProportionateScreenWidth(40)),
              width: double.infinity,
              child: Image.network(
                widget.image,
                scale: 0.65,
              ),
            ),
            Container(
              padding: EdgeInsets.symmetric(
                horizontal: getProportionateScreenWidth(17),
                vertical: getProportionateScreenHeight(7),
              ),
              child: Text(
                widget.itemName,
                style: TextStyle(fontSize: getProportionateScreenWidth(18)),
              ),
            ),

            //stepper
            Container(
              margin: EdgeInsets.symmetric(
                  horizontal: getProportionateScreenWidth(50),
                  vertical: getProportionateScreenHeight(30)),
              child: OrderTrackerZen(
                isShrinked: false,
                // animation_duration: ,
                success_color: kPrimaryColor,
                tracker_data: trackData,
              ),
            ),
            //end of stepper
          ],
        ),
      ),
    );
  }
}
