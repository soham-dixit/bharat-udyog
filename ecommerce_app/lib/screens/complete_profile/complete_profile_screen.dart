import 'package:flutter/material.dart';

import 'components/body.dart';

class CompleteProfileScreen extends StatelessWidget {
  CompleteProfileScreen({
    required this.countryName,
    required this.email,
    required this.password,
  });

  final String countryName;
  final String email;
  final String password;

  static String routeName = "/complete_profile";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Body(
        email: email,
        countryName: countryName,
        password: password,
      ),
    );
  }
}
