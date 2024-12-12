import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:shop_app/globals.dart';
import 'package:shop_app/models/Product.dart';

import '../../../constants.dart';
import '../../../globals.dart';
import '../../../size_config.dart';
import '../../../word_in_languages.dart';
import '../../exporter_chat/components/chatting_screen.dart';
import '../ar_view.dart';
import 'like_button.dart';

class ProductDescription extends StatelessWidget {
  ProductDescription({
    Key? key,
    required this.product,
  }) : super(key: key);

  final Product product;
  final DatabaseReference dbReference = FirebaseDatabase.instance.ref();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding:
              EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(20)),
          child: Text(
            product.title,
            style: Theme.of(context).textTheme.titleLarge,
          ),
        ),
        Padding(
          padding:
              EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(20)),
          child: Text(
            "$currencySymbol${double.parse((product.price * KConversionrate).toStringAsFixed(2))}",
            style: TextStyle(fontSize: 17, color: kPrimaryColor),
          ),
        ),
        LikeButton(product: product),
        Padding(
          padding: EdgeInsets.only(
            left: getProportionateScreenWidth(20),
            right: getProportionateScreenWidth(64),
          ),
          child: Text(
            product.description,
            maxLines: 3,
          ),
        ),
        Padding(
          padding: EdgeInsets.only(
            left: getProportionateScreenWidth(20),
            right: getProportionateScreenWidth(20),
            top: 10,
          ),
          child: // temporry placeholder
              GestureDetector(
            onTap: () {
              Navigator.of(context).push(MaterialPageRoute(
                  builder: (context) =>
                      ARView(productImagePath: product.photoUrl)));
            },
            child: Row(
              children: [
                Text(
                  "See, how it will look with AR View",
                  maxLines: 2,
                  style: TextStyle(
                      fontWeight: FontWeight.w600, color: kPrimaryColor),
                ),
                SizedBox(width: 5),
                Icon(
                  Icons.arrow_forward_ios,
                  size: 12,
                  color: kPrimaryColor,
                ),
                Expanded(
                  child: Container(),
                ),
                Container(
                  padding: EdgeInsets.all(5),
                  decoration: BoxDecoration(
                    color: const Color.fromARGB(22, 176, 42, 37),
                    borderRadius: BorderRadius.all(
                      Radius.circular(40),
                      //  Radius.circular(40),
                    ),
                  ),
                  child: SvgPicture.asset(
                    'assets/icons/ar.svg',
                    height: getProportionateScreenHeight(40),
                    width: getProportionateScreenWidth(40),
                  ),
                )
              ],
            ),
          ),
        ),
        SizedBox(
          height: getProportionateScreenHeight(15),
        ),
        Padding(
            padding: EdgeInsets.only(
              left: getProportionateScreenWidth(20),
              right: getProportionateScreenWidth(20),
              bottom: 10,
            ),
            child: SizedBox(
              height: getProportionateScreenHeight(20),
            ) // temporry placeholder
            // GestureDetector(
            //   onTap: () {
            //     Navigator.of(context).push(MaterialPageRoute(
            //         builder: (context) =>
            //             ChattingScreen(receiverId: product.exporterId)));
            //   },
            //   child: Row(
            //     mainAxisAlignment: MainAxisAlignment.center,
            //     children: [
            //       Container(
            //         child: Container(
            //           padding: EdgeInsets.all(10),
            //           decoration: BoxDecoration(
            //             color: const Color.fromARGB(22, 176, 42, 37),
            //             borderRadius: BorderRadius.all(
            //               Radius.circular(40),
            //               //  Radius.circular(40),
            //             ),
            //           ),
            //           child: SvgPicture.asset(
            //             'assets/icons/chat_icon.svg',
            //             height: getProportionateScreenHeight(35),
            //             width: getProportionateScreenWidth(35),
            //           ),
            //         ),
            //       ),
            //       SizedBox(width: 70),
            //       Icon(
            //         Icons.arrow_back_ios,
            //         size: 12,
            //         color: kPrimaryColor,
            //       ),
            //       SizedBox(width: 5),
            //       Text(
            //         contactToExporterTranslations[crntSlctdLan]!,
            //         overflow: TextOverflow.ellipsis,
            //         maxLines: 2,
            //         style: TextStyle(
            //             fontWeight: FontWeight.w600, color: kPrimaryColor),
            //       ),
            //     ],
            //   ),
            // ),
            )
      ],
    );
  }
}
