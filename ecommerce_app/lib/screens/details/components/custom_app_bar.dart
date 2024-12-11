import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:shop_app/backend/give_ratings.dart';
import 'package:shop_app/constants.dart';
import 'package:rating_dialog/rating_dialog.dart';

import '../../../size_config.dart';

class CustomAppBar extends StatelessWidget {
  final double rating;
  final String product_id;

  CustomAppBar({required this.rating, required this.product_id});

  @override
  // AppBar().preferredSize.height provide us the height that appy on our app bar
  Size get preferredSize => Size.fromHeight(AppBar().preferredSize.height);

  // final _dialog = ;/

  void onRateProduct(BuildContext context) {
    showDialog(
        context: context,
        barrierDismissible: true,
        builder: (context) => RatingDialog(
              initialRating: 0.0,
              enableComment: false,
              title: Text(
                'Rate Product',
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 25,
                  fontWeight: FontWeight.bold,
                ),
              ),
              message: Text(
                'Tap a star to set your rating.',
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 15),
              ),
              submitButtonText: 'Submit',
              onSubmitted: (response) async {
                int ratings = response.rating.toInt();
                await GiveRatings.performHttpRequest(
                    'PUT', "consumer/addRating", product_id, ratings);
                // print("Successfully Uploaded");
              },
            ));
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding:
            EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(20)),
        child: Row(
          children: [
            SizedBox(
              height: getProportionateScreenWidth(40),
              width: getProportionateScreenWidth(40),
              child: TextButton(
                style: TextButton.styleFrom(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(60),
                  ),
                  foregroundColor: kPrimaryColor,
                  backgroundColor: Colors.white,
                  padding: EdgeInsets.zero,
                ),
                onPressed: () => Navigator.pop(context),
                child: SvgPicture.asset(
                  "assets/icons/Back ICon.svg",
                  height: 15,
                ),
              ),
            ),
            Spacer(),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 5),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(14),
                    bottomLeft: Radius.circular(14)),
              ),
              child: Row(
                children: [
                  Text(
                    "$rating",
                    style: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(width: 5),
                  SvgPicture.asset("assets/icons/Star Icon.svg"),
                ],
              ),
            ),
            Container(
              width: getProportionateScreenWidth(1),
              margin: const EdgeInsets.symmetric(vertical: 18),
              decoration:
                  BoxDecoration(color: Color.fromARGB(255, 112, 111, 111)),
            ),
            GestureDetector(
              onTap: () => onRateProduct(context),
              child: Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 14, vertical: 5),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(
                      topRight: Radius.circular(14),
                      bottomRight: Radius.circular(14)),
                ),
                child: Text(
                  "Rate Product",
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
