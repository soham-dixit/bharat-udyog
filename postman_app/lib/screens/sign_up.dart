import 'package:postman_app/widgets/sign_up_form.dart';
// import 'package:postman_app/widgets/socal_card.dart';
import 'package:flutter/material.dart';
import '../../constants.dart';
import '../../size_config.dart';

class SignUpScreen extends StatelessWidget {
  // static String routeName = "/sign_up";
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        // backgroundColor: Colors.white,
        // elevation: 0,
        title: Text(
          "Login",
          style: TextStyle(
              fontFamily: 'Poppins',
              fontSize: getProportionateScreenHeight(20)),
        ),
      ),
      body: SafeArea(
        child: SizedBox(
          width: double.infinity,
          child: Padding(
            padding: EdgeInsets.symmetric(
                horizontal: getProportionateScreenWidth(20)),
            child: SingleChildScrollView(
              child: Column(
                children: [
                  const SizedBox(height: 25),
                  Text("Register Account", style: headingStyle),
                  const SizedBox(height: 8),
                  const Text(
                    "Complete your details",
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(height: SizeConfig.screenHeight * 0.05),
                  SignUpForm(),
                  SizedBox(height: SizeConfig.screenHeight * 0.08),
                  SizedBox(height: getProportionateScreenHeight(20)),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
