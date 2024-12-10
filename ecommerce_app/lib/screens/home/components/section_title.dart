import 'package:flutter/material.dart';
import 'package:shop_app/constants.dart';
import 'package:shop_app/globals.dart';
import 'package:shop_app/screens/search/search_screen.dart';

import '../../../size_config.dart';
import '../../../word_in_languages.dart';

class SectionTitle extends StatelessWidget {
  const SectionTitle({
    Key? key,
    required this.title,
    required this.press,
    this.festival = false, // Add optional festival parameter
  }) : super(key: key);

  final String title;
  final GestureTapCallback press;
  final bool festival; // New parameter

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          title,
          style: TextStyle(
            fontSize: getProportionateScreenWidth(18),
            color: kPrimaryColor,
          ),
        ),
        GestureDetector(
          onTap: () => Navigator.pushNamed(
            context,
            SearchScreen.routeName,
            arguments:
                festival ? {'festival': true} : null, // Pass festival argument
          ),
          child: Text(
            seeMoreTranslations[crntSlctdLan]!,
            style: TextStyle(color: Color(0xFFBBBBBB)),
          ),
        ),
      ],
    );
  }
}
