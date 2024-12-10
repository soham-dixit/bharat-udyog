// import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:shop_app/globals.dart';
import 'package:shop_app/screens/search/search_screen.dart';
// import '../../search/components/body.dart';

import '../../../constants.dart';
import '../../../size_config.dart';
import '../../../word_in_languages.dart';

class CustomSearchField extends StatelessWidget {
  CustomSearchField({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        padding: EdgeInsets.symmetric(vertical: 8, horizontal: 10),
        width: SizeConfig.screenWidth * 0.7,
        decoration: BoxDecoration(
          color: kSecondaryColor.withOpacity(0.1),
          borderRadius: BorderRadius.circular(15),
        ),
        child: InkWell(
          onTap: () => Navigator.pushNamed(
            context,
            SearchScreen.routeName,
          ),
          child: Row(
            children: [
              Icon(Icons.search),
              SizedBox(width: 10),
              Text(
                searchProductTranslations[crntSlctdLan]!,
                style: TextStyle(fontSize: 18),
              )
            ],
          ),
        ));
  }
}
