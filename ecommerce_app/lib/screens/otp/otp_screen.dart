import 'package:flutter/material.dart';
import 'package:shop_app/size_config.dart';

import 'components/body.dart';

class OtpScreen extends StatelessWidget {
  static String routeName = "/otp";
  OtpScreen({
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
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      appBar: AppBar(
        title: Text("OTP Verification"),
      ),
      body: Body(
        countryName: countryName,
        name: name,
        city: city,
        mobileNumber: mobileNumber,
        email: email,
        password: password,
        pincode: pincode,
        state: state,
      ),
    );
  }
}
