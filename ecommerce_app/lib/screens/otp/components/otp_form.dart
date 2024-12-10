import 'package:email_otp/email_otp.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:otp_text_field/otp_field.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:shop_app/backend/registration.dart';

import 'package:shop_app/components/default_button.dart';
import 'package:shop_app/components/load_data.dart';
import 'package:shop_app/size_config.dart';

// import 'package:shop_app/components/coustom_bottom_nav_bar.dart';
// import 'package:uuid/enums.dart';
// import 'package:shop_app/components/load_data.dart';
// import '../../../backend/userData.dart';
// import '../../../constants.dart';

class OtpForm extends StatefulWidget {
  OtpForm({
    required this.city,
    required this.countryName,
    required this.email,
    required this.mobileNumber,
    required this.name,
    required this.password,
    required this.pincode,
    required this.state,
  });

  final String countryName;
  final String email;
  final String password;
  final String name;
  final String pincode;
  final String mobileNumber;
  final String city;
  final String state;

  @override
  _OtpFormState createState() => _OtpFormState();
}

class _OtpFormState extends State<OtpForm> {

   void registerUser() async {
    Map<String, dynamic> data = {
      'name': widget.name,
      'email': widget.email,
      'password': widget.password,
      'mobileNumber': widget.mobileNumber,
      'country': widget.countryName.toLowerCase(),
      'pincode': widget.pincode,
      'city': widget.city,
      'state': widget.state,
    };

    Map<String, dynamic> response =
        await ConsumerRegistration.performHttpRequest(
      'POST',
      'consumer/registerConsumer',
      data,
      context,
    );

    if (response.isNotEmpty) {
      storeDetails(response["consumerId"]);
      Future.delayed(Duration(seconds: 1));
      Navigator.pushNamed(context, LoadData.routeName);
    } else {
      print("Error in API call!");
    }
  }

   void storeDetails(String id) async {
     SharedPreferences prefs = await SharedPreferences.getInstance();

     prefs.setString('consumerId', id);
     prefs.setString('consumerEmail', widget.email);
     prefs.setString('consumerName', widget.name);
     prefs.setString('consumerPincode', widget.pincode);
     prefs.setString('consumerPhone', widget.mobileNumber);
     prefs.setString('consumerCountry', widget.countryName);
     prefs.setString('consumerState', widget.state);
     prefs.setString('consumerCity', widget.city);
   }

  EmailOTP myauth = EmailOTP();
  bool hasError = false;
  String? enteredOtp;
  OtpFieldController otpFieldController = OtpFieldController();

  void initializeEmailOtp() async {
    myauth.setConfig(
        appEmail: "sohampande1902@Gmail.com",
        appName: "BharatUdyog",
        userEmail: widget.email,
        otpLength: 6,
        otpType: OTPType.digitsOnly
    );

    if (await myauth.sendOTP() == true) {
      Get.snackbar("Success", "Email OTP has been sent!");
    } else {
      Get.snackbar("Error", "Email OTP not sent");
    }
  }

  @override
  void initState() {
    super.initState();
    initializeEmailOtp();
  }



  // void nextField(String value, FocusNode? focusNode) {
  //   if (value.length == 1) {
  //     focusNode.requestFocus();
  //   }
  // }

  @override
  Widget build(BuildContext context) {
    return Form(
      child: Column(
        children: [
          SizedBox(height: SizeConfig.screenHeight * 0.15),
          OTPTextField(
            controller: otpFieldController,
            hasError: hasError,
            length: 6,
            width: MediaQuery.of(context).size.width,
            style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w300
            ),
            textFieldAlignment: MainAxisAlignment.spaceAround,
            onChanged: (pin) {},
            onCompleted: (pin) {
              enteredOtp = pin;
            },
          ),
          SizedBox(height: SizeConfig.screenHeight * 0.15),
          DefaultButton(
            text: "Continue",
            press: () async {
              if(enteredOtp?.length != 6) {
                setState(() {
                  hasError = true;
                });
                return;
              }

              if (await myauth.verifyOTP(otp: enteredOtp) == true) {
                Get.snackbar("Success", 'Email Verified!');
                registerUser();
              } else {
                Get.snackbar("Error", 'Invalid OTP, please try again!');
              }
            },
          )
        ],
      ),
    );
  }
}
