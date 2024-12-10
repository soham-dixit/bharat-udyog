import 'package:flutter/material.dart';
import 'package:shop_app/constants.dart';
import 'package:shop_app/globals.dart';
import 'package:shop_app/screens/profile/components/order_details_screen.dart';
import 'package:shop_app/size_config.dart';

class OrderItem extends StatelessWidget {
  const OrderItem(
      {required this.itemName,
      required this.creationDate,
      required this.quantity,
      required this.price,
      required this.imageUrl,
      required this.status,
      required this.dateMap});
  final String itemName;
  final int quantity;
  // final String date;
  final Map<String, String> dateMap;
  final int status;
  final double price;
  final String imageUrl;
  final String creationDate;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => OrderDetails(
            status: status,
            dateMap: dateMap,
            image: imageUrl,
            itemName: itemName,
            imageUrl: imageUrl,
            date: creationDate,

          ),
        ),
      ),
      child: Container(
        margin: EdgeInsets.only(bottom: getProportionateScreenHeight(7)),
        child: Container(
          margin: EdgeInsets.only(top: 0),
          child: Row(
            children: [
              SizedBox(
                width: 88,
                child: AspectRatio(
                  aspectRatio: 0.88,
                  child: Container(
                    padding: EdgeInsets.all(getProportionateScreenWidth(10)),
                    decoration: BoxDecoration(
                      color: Color(0xFFF5F6F9),
                      borderRadius: BorderRadius.circular(15),
                    ),
                    child: Image.network("$imageUrl"),
                  ),
                ),
              ),
              SizedBox(width: 20),
              Container(
                width: getProportionateScreenWidth(170),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      itemName,
                      softWrap: false,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(color: Colors.black, fontSize: 16),
                    ),
                    SizedBox(height: 10),
                    Text.rich(
                      TextSpan(
                        text: "$currencySymbol${price.toStringAsFixed(2)}",
                        style: TextStyle(
                            fontWeight: FontWeight.w600, color: kPrimaryColor),
                        children: [
                          TextSpan(
                              text: " x$quantity",
                              style: Theme.of(context).textTheme.bodyLarge),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Container(
                    margin: EdgeInsets.only(
                      left: getProportionateScreenWidth(7),
                      bottom: getProportionateScreenHeight(30),
                    ),
                    padding: const EdgeInsets.fromLTRB(
                        6, 8, 6, 8), // Adjust padding as needed
                    decoration: BoxDecoration(
                      color: const Color.fromRGBO(0, 125, 219, 0.08),

                      borderRadius:
                          BorderRadius.circular(8), // Radius of the box
                    ),
                    child: Text(
                      orderStatusMsgDateMap[orderStatusSeq[status]]!["status"]!,
                      style: TextStyle(
                        fontSize: 9,
                        fontWeight: FontWeight.bold,
                        color: const Color.fromARGB(255, 255, 106, 0),
                      ),
                    ),
                  ),
                  Container(
                    width: getProportionateScreenWidth(70),
                    margin: EdgeInsets.only(
                        bottom: getProportionateScreenHeight(10)),
                    child: Text(
                      overflow: TextOverflow.ellipsis,
                      "$creationDate",
                      style: TextStyle(
                        fontSize: getProportionateScreenWidth(11),
                      ),
                    ),
                  )
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
