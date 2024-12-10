import 'package:postman_app/routes.dart';
import 'package:postman_app/size_config.dart';
import 'package:postman_app/widgets/login_in_body.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SignInScreen extends StatelessWidget {
  // static String routeName = "/sign_in";

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      // appBar: AppBar(
      //   title:  Text("Sign In",style: TextStyle(fontFamily: 'Poppins',fontSize: getProportionateScreenHeight(20)),),
      // ),
      body: LogInBody(),
    );
  }
}
