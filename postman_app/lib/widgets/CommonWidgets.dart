import 'package:postman_app/constants.dart';
import 'package:postman_app/size_config.dart';
import 'package:flutter/material.dart';

class OrderCard extends StatefulWidget {
  final VoidCallback onPress;

  final String shopName;
  final String area;
  // final String exporterName;

  final String orderCreatedTime;
  final String status;
  const OrderCard(
      {Key? key,
      required this.shopName,
      required this.area,
      // required this.exporterName,
      required this.orderCreatedTime,
      required this.status,
      required this.onPress})
      : super(key: key);

  @override
  State<OrderCard> createState() => _OrderCardState();
}

class _OrderCardState extends State<OrderCard> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(0, 0, 10, 0),
      child: GestureDetector(
        onTap: widget.onPress,
        child: Card(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12.0),
          ),
          elevation: 1, // Add shadow
          child: Container(
            width: 358.0, // Set width
            padding: const EdgeInsets.all(10.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Vehicle number
                    Text(
                      widget.shopName,
                      style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w500,
                          color: Colors.black),
                    ),
                    // Customer name
                    SizedBox(
                      height: getProportionateScreenHeight(2),
                    ),
                    Text(
                      widget.area,
                      style: const TextStyle(
                        fontSize: 8,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(
                      height: getProportionateScreenHeight(6),
                    ),
                    // Assigned employee
                    Row(children: [
                      const Icon(
                        Icons.person_2_outlined,
                        size: 12,
                      ),
                      SizedBox(
                        width: getProportionateScreenWidth(4),
                      ),
                      // Text(
                      //   widget.exporterName,
                      //   style: const TextStyle(
                      //     fontSize: 8,
                      //     fontWeight: FontWeight.bold,
                      //     color: Color.fromRGBO(20, 20, 20, 0.8),
                      //   ),
                      // ),
                    ]),
                    SizedBox(
                      height: getProportionateScreenHeight(2),
                    ),

                    // Job created date
                    Row(
                      children: [
                        const Icon(
                          Icons.calendar_today_outlined,
                          size: 12,
                        ),
                        SizedBox(
                          width: getProportionateScreenWidth(4),
                        ),

                        // Job created time
                        Text(
                          widget.orderCreatedTime,
                          style: const TextStyle(
                            fontSize: 8,
                            fontWeight: FontWeight.bold,
                            color: Color.fromRGBO(20, 20, 20, 0.8),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                Column(
                  children: [
                    Container(
                      padding: const EdgeInsets.fromLTRB(
                          8, 12, 8, 12), // Adjust padding as needed
                      decoration: BoxDecoration(
                        color: widget.status == 'picked up'
                            ? const Color.fromRGBO(0, 125, 219, 0.08)
                            : widget.status == 'pending'
                                ? const Color.fromARGB(19, 244, 103, 15)
                                : widget.status == 'completed'
                                    ? const Color.fromRGBO(89, 195, 106, 0.08)
                                    : const Color.fromARGB(19, 255, 0, 0),
                        borderRadius:
                            BorderRadius.circular(8), // Radius of the box
                      ),
                      child: Text(
                        widget.status,
                        style: TextStyle(
                          fontSize: 9,
                          fontWeight: FontWeight.bold,
                          color: widget.status == 'picked up'
                              ? Colors.blue
                              : widget.status == 'pending'
                                  ? const Color.fromARGB(255, 255, 106, 0)
                                  : widget.status == 'completed'
                                      ? const Color(0xFF59C36A)
                                      : const Color.fromARGB(255, 255, 0, 0),
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
