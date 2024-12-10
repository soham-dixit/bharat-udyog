import 'package:flutter/material.dart';
import 'package:get/get_core/get_core.dart';
import 'package:get/get_navigation/get_navigation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:shop_app/globals.dart';

import '../../models/Cart.dart';
import '../../word_in_languages.dart';
import 'components/tracer.dart';
import '../../models/Address.dart';
import '../../../constants.dart';
import '../../../size_config.dart';

import 'order_smry_screen.dart';

class AddressFillScreen extends StatefulWidget {
  AddressFillScreen({super.key, required this.amount, required this.products});

  final double amount;
  final List<Cart> products;
  // static String routeName = "address_fill-screen";

  @override
  State<AddressFillScreen> createState() => _AddressFillScreenState();
}

class _AddressFillScreenState extends State<AddressFillScreen> {
  String? country;
  String? id;

  @override
  void initState() {
    Future.delayed(Duration.zero, () async {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      _controlCountry.text = prefs.getString('consumerCountry')!;
      print(country);
    });

    super.initState();
  }

  TextEditingController _controlName = TextEditingController();
  TextEditingController _controlMobile = TextEditingController();
  TextEditingController _controlCountry = TextEditingController();
  TextEditingController _controlPincode = TextEditingController();
  TextEditingController _controlState = TextEditingController();
  TextEditingController _controlCity = TextEditingController();
  TextEditingController _controlHouse = TextEditingController();
  TextEditingController _controlArea = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // resizeToAvoidBottomInset: false,
      backgroundColor: Colors.white,

      body: SingleChildScrollView(
        child: Container(
          width: SizeConfig.screenWidth,
          height: SizeConfig.screenHeight,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              tracer(ctx: context),
              enterAddres(),
              InkWell(
                onTap: () {
                  if (_controlName.text != "" &&
                      _controlMobile.text != "" &&
                      _controlCountry.text != "" &&
                      _controlPincode.text != "" &&
                      _controlMobile.text.toString().length >= 10 &&
                      _controlState.text != "" &&
                      _controlCity.text != "" &&
                      _controlHouse.text != "" &&
                      _controlArea.text != "") {
                    // ignore: unused_local_variable
                    Address addresss = Address(
                        name: _controlName.text.trim(),
                        mobileNo: _controlMobile.text.trim(),
                        pincode: _controlPincode.text.trim(),
                        country: _controlCountry.text.trim(),
                        state: _controlState.text.trim(),
                        city: _controlCity.text.trim(),
                        house: _controlHouse.text.trim(),
                        area: _controlArea.text.trim());

                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context) => OrderSummaryScreen(
                          address: addresss,
                          amount: widget.amount,
                          products: widget.products,
                        ),
                      ),
                    );
                  } else if (_controlMobile.text.toString().length < 10) {
                    Get.snackbar(
                        "Invalid mobile", "Enter 10 digit mobile number");
                  } else {
                    Get.snackbar("All details not provided",
                        "Enter all required fields");
                  }
                },
                child: Container(
                  alignment: Alignment.center,
                  height: SizeConfig.screenHeight * 8 / 100,
                  color: kPrimaryColor,
                  child: Text(
                    deliverHereTranslations[crntSlctdLan]!,
                    style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.white),
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget textField(
      {required String label,
      required TextEditingController controller,
      required bool readOnly,
      TextInputType textInputType = TextInputType.text}) {
    return TextField(
      readOnly: readOnly,
      controller: controller,
      keyboardType: textInputType,
      decoration: InputDecoration(
          labelText: label,
          labelStyle: TextStyle(fontSize: 14, color: Colors.grey),
          // border: OutlineInputBorder(
          //   borderSide: BorderSide(color: Colors.red),
          // ),
          enabledBorder: OutlineInputBorder(
            borderSide:
                BorderSide(color: const Color.fromARGB(255, 177, 186, 194)),
          ),
          focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.blue),
          ),
          fillColor: Color.fromRGBO(0, 128, 128, 1),
          contentPadding: EdgeInsets.symmetric(
              vertical: getProportionateScreenHeight(15),
              horizontal: getProportionateScreenWidth(15))),
      minLines: 1,
      maxLines: 3,
    );
  }

  Widget enterAddres() {
    return Container(
      padding: EdgeInsets.symmetric(
          vertical: getProportionateScreenHeight(10),
          horizontal: getProportionateScreenWidth(12)),
      height: SizeConfig.screenHeight * 72 / 100,
      width: SizeConfig.screenWidth,
      // color: Colors.green,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Container(
            margin:
                EdgeInsets.symmetric(vertical: getProportionateScreenHeight(5)),
            height: getProportionateScreenHeight(30),
            child: Text(fillAddressDetailsTranslations[crntSlctdLan]!),
          ),
          Container(
            margin:
                EdgeInsets.symmetric(vertical: getProportionateScreenHeight(5)),
            height: getProportionateScreenHeight(70),
            child: textField(
              readOnly: false,
              label: "Name (Required)*",
              controller: _controlName,
            ),
          ),
          Container(
            margin:
                EdgeInsets.symmetric(vertical: getProportionateScreenHeight(5)),
            height: getProportionateScreenHeight(70),
            child: textField(
                readOnly: false,
                label: "Mobile. No (Required)*",
                controller: _controlMobile,
                textInputType: TextInputType.number),
          ),
          Container(
            height: getProportionateScreenHeight(80),
            width: SizeConfig.screenWidth,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  width: SizeConfig.screenWidth * 45 / 100,
                  // margin:
                  // EdgeInsets.only(right: getProportionateScreenHeight(5)),
                  height: getProportionateScreenHeight(70),
                  child: textField(
                      readOnly: true,
                      label: "Country (Required)*",
                      controller: _controlCountry),
                ),
                Container(
                  width: SizeConfig.screenWidth * 45 / 100,
                  // margin: EdgeInsets.only(left: getProportionateScreenWidth(5)),
                  height: getProportionateScreenHeight(70),
                  child: textField(
                      readOnly: false,
                      label: "Pincode (Required)*",
                      controller: _controlPincode,
                      textInputType: TextInputType.number),
                ),
              ],
            ),
          ),
          Container(
            height: getProportionateScreenHeight(70),
            width: SizeConfig.screenWidth,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  width: SizeConfig.screenWidth * 45 / 100,
                  // margin:
                  // EdgeInsets.only(right: getProportionateScreenWidth(7)),
                  height: getProportionateScreenHeight(70),
                  child: textField(
                    readOnly: false,
                    label: "State (Required)*",
                    controller: _controlState,
                  ),
                ),
                Container(
                  width: SizeConfig.screenWidth * 45 / 100,
                  // margin: EdgeInsets.only(left: getProportionateScreenWidth(7)),
                  height: getProportionateScreenHeight(70),
                  child: textField(
                    readOnly: false,
                    label: "City (Required)*",
                    controller: _controlCity,
                  ),
                ),
              ],
            ),
          ),
          Container(
            margin:
                EdgeInsets.symmetric(vertical: getProportionateScreenHeight(5)),
            height: getProportionateScreenHeight(70),
            child: textField(
                readOnly: false,
                label: "House No., Building Name (Required)*",
                controller: _controlHouse),
          ),
          Container(
            margin:
                EdgeInsets.symmetric(vertical: getProportionateScreenHeight(5)),
            height: getProportionateScreenHeight(70),
            child: textField(
                readOnly: false,
                label: "Colony, Area (Required)*",
                controller: _controlArea),
          ),
        ],
      ),
    );
  }
}
