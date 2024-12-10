import 'package:flutter/material.dart';
import 'package:shop_app/components/product_card.dart';
import 'package:shop_app/globals.dart';
import 'package:shop_app/models/Product.dart';

import '../../../size_config.dart';
import '../../../word_in_languages.dart';
import 'section_title.dart';

class PersonalizedRecommend extends StatelessWidget {
  const PersonalizedRecommend({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
          padding:
              EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(20)),
          child: SectionTitle(
              title: recommendForYouTranslations[crntSlctdLan]!, press: () {}),
        ),
        SizedBox(height: getProportionateScreenWidth(20)),
        SingleChildScrollView(
          physics: BouncingScrollPhysics(),
          scrollDirection: Axis.horizontal,
          child: Row(
            children: [
              ...List.generate(
                allProducts.length, // personal_recommendation Product
                (index) {
                  if (allProducts[index].isPopular)
                    return ProductCard(product: allProducts[index]);

                  return SizedBox
                      .shrink(); // here by default width and height is 0
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
