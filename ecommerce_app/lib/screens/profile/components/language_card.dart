import 'package:flutter/material.dart';
import 'package:shop_app/constants.dart';
import 'package:shop_app/size_config.dart';

class LanguageCard extends StatelessWidget {
  LanguageCard({required this.lang, required this.selected});
  final String lang;
  final bool selected;
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: getProportionateScreenHeight(5)),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Container(
            margin: EdgeInsets.only(left: getProportionateScreenWidth(20)),
            child: selected
                ? Icon(
                    Icons.done_rounded,
                    color: kPrimaryColor,
                  )
                : CircleAvatar(
                    backgroundColor: kPrimaryLightColor,
                    radius: 8,
                  ),
          ),
          Container(
            margin: EdgeInsets.only(left: getProportionateScreenWidth(30)),
            child: Text(
              lang,
              style: TextStyle(
                fontSize: getProportionateScreenHeight(18),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
