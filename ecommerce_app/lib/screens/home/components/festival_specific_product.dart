import 'package:flutter/material.dart';
import 'package:shop_app/components/product_card.dart';
import 'package:shop_app/globals.dart';
import 'package:shop_app/models/Product.dart';
import '../../../size_config.dart';
import '../../../word_in_languages.dart';
import 'section_title.dart';

class FestiveProducts extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
          padding:
              EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(20)),
          child: SectionTitle(
              title: festivalSpecificProductTranslations[crntSlctdLan]!, press: () {}, festival: true,),
        ),
        SizedBox(height: getProportionateScreenWidth(20)),
        SingleChildScrollView(
          physics: BouncingScrollPhysics(),
          scrollDirection: Axis.horizontal,
          child: Row(
            children: [
              ...List.generate(
                festiveProducts.length,
                (index) {
                  return ProductCard(product: festiveProducts[index]);
                },
              ),
              SizedBox(width: getProportionateScreenWidth(20)),
            ],
          ),
        )
      ],
    );
  }
}
