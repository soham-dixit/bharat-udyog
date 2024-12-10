import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:shop_app/constants.dart';
import 'package:shop_app/screens/exporter_chat/components/chatting_screen.dart';
import 'package:shop_app/size_config.dart';

class ChatListItem extends StatelessWidget {
  ChatListItem(
      {this.id, required this.name, required this.date, required this.unseen});
  final id;
  final String name;
  final String date;
  final bool unseen;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) =>
                ChattingScreen(receiverId: id, receiverName: name),
          ),
        );
      },
      child: Container(
        decoration: BoxDecoration(
          // border: Border.all(),
          borderRadius: BorderRadius.all(Radius.circular(10)),
          color: Color.fromARGB(255, 219, 222, 231),
        ),
        margin: EdgeInsets.only(
            left: getProportionateScreenWidth(10),
            right: getProportionateScreenWidth(10),
            bottom: getProportionateScreenHeight(7),
            top: getProportionateScreenHeight(7)),
        child: Row(
          children: [
            Container(
              padding: EdgeInsets.fromLTRB(
                  getProportionateScreenWidth(20),
                  getProportionateScreenHeight(7),
                  getProportionateScreenWidth(7),
                  getProportionateScreenHeight(7)),
              child: CircleAvatar(
                radius: getProportionateScreenWidth(23),
                child: SvgPicture.asset("assets/default_profile.svg"),
                backgroundColor: kPrimaryLightColor,
              ),
            ),
            Container(
              width: getProportionateScreenWidth(190),
              // color: Colors.amber,
              margin: EdgeInsets.only(
                  left: getProportionateScreenWidth(14),
                  top: getProportionateScreenHeight(4),
                  bottom: getProportionateScreenHeight(4)),
              child: Text(
                name,
                maxLines: 1,
                overflow: TextOverflow.fade,
                style: TextStyle(
                    color: Colors.black,
                    fontWeight: FontWeight.w500,
                    fontSize: getProportionateScreenHeight(17)),
              ),
            ),
            // Expanded(child: Container()),
            Container(
              margin: EdgeInsets.only(
                  // left: getProportionateScreenWidth(120),
                  right: getProportionateScreenWidth(10)),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    alignment: Alignment.centerRight,
                    margin: EdgeInsets.only(
                        bottom: getProportionateScreenHeight(4)),
                    child: Text(
                      date.substring(11, 16),
                      textAlign: TextAlign.right,
                      style:
                          TextStyle(fontSize: getProportionateScreenHeight(12)),
                    ),
                  ),
                  Container(
                    margin: EdgeInsets.only(
                        bottom: getProportionateScreenHeight(4)),
                    child: Text(
                      date.substring(0, 10),
                      style:
                          TextStyle(fontSize: getProportionateScreenHeight(12)),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
