import 'package:accordion/accordion.dart';
import 'package:accordion/controllers.dart';
import 'package:flutter/material.dart';
import 'package:shop_app/constants.dart';
import 'package:shop_app/size_config.dart';

import '../../../globals.dart';
import '../../../word_in_languages.dart';

// ignore: must_be_immutable
class HelpScreen extends StatelessWidget {
  HelpScreen({super.key});
  static final String routeName = "/help_screen";
  String selectLanguage = "English";
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body:
          //appbar
          SingleChildScrollView(
        child: Column(
          children: [
            SizedBox(
              height: getProportionateScreenHeight(50),
            ),
            Row(
              children: [
                Align(
                  alignment: Alignment.topLeft,
                  child: MaterialButton(
                    onPressed: () {
                      Navigator.pop(context);
                    },
                    color: const Color.fromARGB(22, 176, 42, 37),
                    textColor: kPrimaryColor,
                    padding: EdgeInsets.all(getProportionateScreenWidth(16)),
                    shape: const CircleBorder(),
                    elevation: 0.0,
                    highlightElevation:
                        0.0, // Set highlight elevation to 0.0 to remove animation
                    splashColor: Colors
                        .transparent, // Set splash color to transparent to remove splash effect
                    child: Icon(
                      Icons.arrow_back,
                      size: getProportionateScreenHeight(24),
                    ),
                  ),
                ),
                Container(
                  margin: EdgeInsets.only(
                    top: getProportionateScreenHeight(25),
                    right: getProportionateScreenWidth(80),
                    bottom: getProportionateScreenHeight(25),
                  ),
                  padding:
                      EdgeInsets.only(left: getProportionateScreenWidth(12)),
                  child: Text(
                    helpCenterTranslations[crntSlctdLan]!,
                    style: TextStyle(
                      fontSize: getProportionateScreenWidth(26),
                      fontWeight: FontWeight.bold,
                      color: Color(0xFFB02925),
                    ),
                    textAlign: TextAlign.left,
                  ),
                ),
              ],
            ),
            Accordion(
                headerBorderColor: Colors.blueGrey,
                headerBorderColorOpened: Colors.transparent,
                // headerBorderWidth: 1,
                headerBackgroundColorOpened: Colors.green,
                contentBackgroundColor: Colors.white,
                contentBorderColor: Colors.green,
                contentBorderWidth: 3,
                contentHorizontalPadding: 20,
                scaleWhenAnimating: true,
                openAndCloseAnimation: true,
                headerPadding:
                    const EdgeInsets.symmetric(vertical: 7, horizontal: 15),
                sectionOpeningHapticFeedback: SectionHapticFeedback.heavy,
                sectionClosingHapticFeedback: SectionHapticFeedback.light,
                children: [
                  AccordionSection(
                    isOpen: false,
                    leftIcon:
                        const Icon(Icons.question_mark, color: Colors.black54),
                    rightIcon: const Icon(
                      Icons.keyboard_arrow_down,
                      color: Colors.black54,
                      size: 20,
                    ),
                    headerBackgroundColor: Colors.transparent,
                    headerBackgroundColorOpened: Colors.transparent,
                    headerBorderColor: Colors.black54,
                    headerBorderColorOpened: Colors.black54,
                    headerBorderWidth: 1,
                    contentBackgroundColor: Colors.transparent,
                    contentBorderColor: Colors.black54,
                    contentBorderWidth: 1,
                    contentVerticalPadding: 30,
                    header: const Text('Can I trust products on this app?',
                        style: TextStyle(
                            color: kTextColor,
                            fontSize: 15,
                            fontWeight: FontWeight.bold)),
                    content: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Flexible(
                          child: Text(
                            'Yes, the platform is part of the Bharat Udyog initiative, ensuring reliability. All products undergo thorough verification for secure international transactions.',
                            maxLines: 5,
                            style:
                                TextStyle(color: Colors.black45, fontSize: 14),
                          ),
                        ),
                      ],
                    ),
                  ),
                  AccordionSection(
                    isOpen: false,
                    leftIcon:
                        const Icon(Icons.question_mark, color: Colors.black54),
                    rightIcon: const Icon(
                      Icons.keyboard_arrow_down,
                      color: Colors.black54,
                      size: 20,
                    ),
                    headerBackgroundColor: Colors.transparent,
                    headerBackgroundColorOpened: Colors.transparent,
                    headerBorderColor: Colors.black54,
                    headerBorderColorOpened: Colors.black54,
                    headerBorderWidth: 1,
                    contentBackgroundColor: Colors.transparent,
                    contentBorderColor: Colors.black54,
                    contentBorderWidth: 1,
                    contentVerticalPadding: 30,
                    header: const Text('How does dynamic pricing work?',
                        style: TextStyle(
                            color: kTextColor,
                            fontSize: 15,
                            fontWeight: FontWeight.bold)),
                    content: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Flexible(
                          child: Text(
                            'Dynamic pricing adjusts based on Bharat Udyog service availability, providing cost-effectiveness and transparent rates for international consumers.',
                            maxLines: 5,
                            style:
                                TextStyle(color: Colors.black45, fontSize: 14),
                          ),
                        ),
                      ],
                    ),
                  ),
                  AccordionSection(
                    isOpen: false,
                    leftIcon:
                        const Icon(Icons.question_mark, color: Colors.black54),
                    rightIcon: const Icon(
                      Icons.keyboard_arrow_down,
                      color: Colors.black54,
                      size: 20,
                    ),
                    headerBackgroundColor: Colors.transparent,
                    headerBackgroundColorOpened: Colors.transparent,
                    headerBorderColor: Colors.black54,
                    headerBorderColorOpened: Colors.black54,
                    headerBorderWidth: 1,
                    contentBackgroundColor: Colors.transparent,
                    contentBorderColor: Colors.black54,
                    contentBorderWidth: 1,
                    contentVerticalPadding: 30,
                    header: const Text('Is there in-app messaging?',
                        style: TextStyle(
                            color: kTextColor,
                            fontSize: 15,
                            fontWeight: FontWeight.bold)),
                    content: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        // const Icon(
                        //   Icons.label_important_outline_rounded,
                        //   size: 20,
                        // ).paddingOnly(right: 20),
                        const Flexible(
                          child: Text(
                            'Yes, enjoy seamless communication between exporters and international consumers within the app.',
                            maxLines: 5,
                            style:
                                TextStyle(color: Colors.black45, fontSize: 14),
                          ),
                        ),
                      ],
                    ),
                  ),
                  AccordionSection(
                    isOpen: false,
                    leftIcon:
                        const Icon(Icons.question_mark, color: Colors.black54),
                    rightIcon: const Icon(
                      Icons.keyboard_arrow_down,
                      color: Colors.black54,
                      size: 20,
                    ),
                    headerBackgroundColor: Colors.transparent,
                    headerBackgroundColorOpened: Colors.transparent,
                    headerBorderColor: Colors.black54,
                    headerBorderColorOpened: Colors.black54,
                    headerBorderWidth: 1,
                    contentBackgroundColor: Colors.transparent,
                    contentBorderColor: Colors.black54,
                    contentBorderWidth: 1,
                    contentVerticalPadding: 30,
                    header: const Text(
                        'Can I use AR to view products on the app?',
                        style: TextStyle(
                            color: kTextColor,
                            fontSize: 15,
                            fontWeight: FontWeight.bold)),
                    content: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Flexible(
                          child: Text(
                            'Yes, experience Augmented Reality (AR) product viewing for an immersive exploration before making a purchase.',
                            maxLines: 5,
                            style:
                                TextStyle(color: Colors.black45, fontSize: 14),
                          ),
                        ),
                      ],
                    ),
                  ),
                  AccordionSection(
                    isOpen: false,
                    leftIcon:
                        const Icon(Icons.question_mark, color: Colors.black54),
                    rightIcon: const Icon(
                      Icons.keyboard_arrow_down,
                      color: Colors.black54,
                      size: 20,
                    ),
                    headerBackgroundColor: Colors.transparent,
                    headerBackgroundColorOpened: Colors.transparent,
                    headerBorderColor: Colors.black54,
                    headerBorderColorOpened: Colors.black54,
                    headerBorderWidth: 1,
                    contentBackgroundColor: Colors.transparent,
                    contentBorderColor: Colors.black54,
                    contentBorderWidth: 1,
                    contentVerticalPadding: 30,
                    header: const Text(
                        'How to track my international shipment?',
                        style: TextStyle(
                            color: kTextColor,
                            fontSize: 15,
                            fontWeight: FontWeight.bold)),
                    content: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Flexible(
                          child: Text(
                            'Use the app\'s tracking feature for real-time updates on your international shipment from export to delivery.',
                            maxLines: 5,
                            style:
                                TextStyle(color: Colors.black45, fontSize: 14),
                          ),
                        ),
                      ],
                    ),
                  ),
                  AccordionSection(
                    isOpen: false,
                    leftIcon:
                        const Icon(Icons.question_mark, color: Colors.black54),
                    rightIcon: const Icon(
                      Icons.keyboard_arrow_down,
                      color: Colors.black54,
                      size: 20,
                    ),
                    headerBackgroundColor: Colors.transparent,
                    headerBackgroundColorOpened: Colors.transparent,
                    headerBorderColor: Colors.black54,
                    headerBorderColorOpened: Colors.black54,
                    headerBorderWidth: 1,
                    contentBackgroundColor: Colors.transparent,
                    contentBorderColor: Colors.black54,
                    contentBorderWidth: 1,
                    contentVerticalPadding: 30,
                    header: const Text(
                        'Are there international shipping options on the app?',
                        style: TextStyle(
                            color: kTextColor,
                            fontSize: 15,
                            fontWeight: FontWeight.bold)),
                    content: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Flexible(
                          child: Text(
                            'Yes, the app offers various international shipping options for your convenience.',
                            maxLines: 5,
                            style:
                                TextStyle(color: Colors.black45, fontSize: 14),
                          ),
                        ),
                      ],
                    ),
                  ),
                  AccordionSection(
                    isOpen: false,
                    leftIcon:
                        const Icon(Icons.question_mark, color: Colors.black54),
                    rightIcon: const Icon(
                      Icons.keyboard_arrow_down,
                      color: Colors.black54,
                      size: 20,
                    ),
                    headerBackgroundColor: Colors.transparent,
                    headerBackgroundColorOpened: Colors.transparent,
                    headerBorderColor: Colors.black54,
                    headerBorderColorOpened: Colors.black54,
                    headerBorderWidth: 1,
                    contentBackgroundColor: Colors.transparent,
                    contentBorderColor: Colors.black54,
                    contentBorderWidth: 1,
                    contentVerticalPadding: 30,
                    header: const Text(
                        'How do I get support for product queries on the app?',
                        style: TextStyle(
                            color: kTextColor,
                            fontSize: 15,
                            fontWeight: FontWeight.bold)),
                    content: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Flexible(
                          child: Text(
                            'Access assistance for product-related queries through the app\'s customer support feature.',
                            maxLines: 5,
                            style:
                                TextStyle(color: Colors.black45, fontSize: 14),
                          ),
                        ),
                      ],
                    ),
                  ),
                ]),
          ],
        ),
      ),
    );
  }
}
