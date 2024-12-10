import 'package:flutter/material.dart';
import 'package:shop_app/globals.dart';

import '../../../constants.dart';
import '../../../size_config.dart';
import '../../../word_in_languages.dart';

// top tracer

Widget tracer({
  required BuildContext ctx,
  int which = 1,
}) {
  return Container(
    child: Card(
      elevation: 4,
      child: Container(
        // margin: EdgeInsets.only(top: ),
        alignment: Alignment.center,
        height: SizeConfig.screenHeight * 17 / 100,
        width: SizeConfig.screenWidth,
        decoration: BoxDecoration(
          color: Colors.white,
        ),
        child: Row(
          children: [
            Container(
              margin: EdgeInsets.only(top: 30),
              alignment: Alignment.topLeft,
              child: IconButton(
                  onPressed: () {
                    Navigator.pop(ctx);
                  },
                  icon: Icon(
                    Icons.arrow_back,
                    size: 23,
                  )),
            ),
            Container(
              // color: Colors.amber,
              padding: EdgeInsets.only(top: 50),
              alignment: Alignment.center,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    // width: SizeConfig.screenWidth,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          alignment: Alignment.center,
                          width: 20,
                          height: 20,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: kPrimaryColor,
                          ),
                          child: Text(
                            "1",
                            style: TextStyle(fontSize: 13, color: Colors.white),
                            textAlign: TextAlign.justify,
                          ),
                        ),
                        Container(
                          margin: EdgeInsets.symmetric(horizontal: 5),
                          width: 80,
                          decoration: BoxDecoration(
                              border: Border.all(
                                  width: 1,
                                  color: which >= 2
                                      ? kPrimaryColor
                                      : Color.fromARGB(255, 220, 217, 217)),
                              color: Colors.white),
                        ),
                        Container(
                          alignment: Alignment.center,
                          width: 20,
                          height: 20,
                          decoration: BoxDecoration(
                              border:
                                  Border.all(width: 1, color: kPrimaryColor),
                              shape: BoxShape.circle,
                              color: which >= 2 ? kPrimaryColor : Colors.white),
                          child: Text(
                            "2",
                            style: TextStyle(
                                fontSize: 13,
                                color:
                                    which >= 2 ? Colors.white : kPrimaryColor),
                            textAlign: TextAlign.justify,
                          ),
                        ),
                        Container(
                          margin: EdgeInsets.symmetric(horizontal: 5),
                          width: 80,
                          decoration: BoxDecoration(
                              border: Border.all(
                                  width: 1,
                                  color: which == 3
                                      ? kPrimaryColor
                                      : Color.fromARGB(255, 220, 217, 217)),
                              color: Colors.white),
                        ),
                        Container(
                          alignment: Alignment.center,
                          width: 20,
                          height: 20,
                          decoration: BoxDecoration(
                              border:
                                  Border.all(width: 1, color: kPrimaryColor),
                              shape: BoxShape.circle,
                              color: which == 3 ? kPrimaryColor : Colors.white),
                          child: Text(
                            "3",
                            style:
                                TextStyle(fontSize: 13, color: kPrimaryColor),
                            textAlign: TextAlign.justify,
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(
                    height: 3,
                  ),
                  Container(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(addressTranslations[crntSlctdLan]!),
                        SizedBox(
                          width: 30,
                        ),
                        Text(orderSummaryTranslations[crntSlctdLan]!),
                        SizedBox(
                          width: 30,
                        ),
                        Text(paymentTranslations[crntSlctdLan]!),
                      ],
                    ),
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    ),
  );
}
