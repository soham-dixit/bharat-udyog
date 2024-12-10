import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:lottie/lottie.dart';
import 'package:shop_app/size_config.dart';

class EmptyLottie extends StatelessWidget {
  EmptyLottie({required this.pathToAsset, required this.heading});

  final String pathToAsset;
  final String heading;
  @override
  Widget build(BuildContext context) {
    return Container(
      // color: Colors.amber,
      // alignment: Alignment.Center,
      // height: 300,
      margin: EdgeInsets.symmetric(
          horizontal: getProportionateScreenWidth(90),
          vertical: getProportionateScreenHeight(150)),
      width: getProportionateScreenWidth(180),
      child: Column(
        // mainAxisAlignment: MainAxisAlignment.center,
        children: [
          LottieBuilder.asset(pathToAsset),
          SizedBox(
            height: getProportionateScreenHeight(20),
          ),
          Text(
            heading,
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 16),
          ),
        ],
      ),
    );
  }
}

class EmptySvg extends StatelessWidget {
  EmptySvg({required this.pathToAsset, required this.heading});

  final String pathToAsset;
  final String heading;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(
          horizontal: getProportionateScreenWidth(80),
          vertical: getProportionateScreenHeight(130)),
      width: getProportionateScreenWidth(180),
      child: Column(
        // mainAxisAlignment: MainAxisAlignment.center,
        children: [
          SvgPicture.asset(pathToAsset, height: 100),
          SizedBox(
            height: getProportionateScreenHeight(20),
          ),
          Text(
            heading,
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 16),
          ),
        ],
      ),
    );
  }
}
