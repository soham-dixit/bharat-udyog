import 'package:postman_app/size_config.dart';
import 'package:postman_app/widgets/login_in_form.dart';
import 'package:postman_app/widgets/no_account_text.dart';
// import 'package:postman_app/widgets/socal_card.dart';
import 'package:flutter/material.dart';

class LogInBody extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: SizedBox(
        width: double.infinity,
        child: Padding(
          padding:
              EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(20)),
          child: SingleChildScrollView(
            child: Column(
              children: [
                SizedBox(height: SizeConfig.screenHeight * 0.12),
                Text(
                  "Welcome Back",
                  style: TextStyle(
                    color: const Color(0xFFB02925),
                    fontSize: getProportionateScreenWidth(28),
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 8),
                const Text(
                  "Login with your email and password",
                  textAlign: TextAlign.center,
                ),
                SizedBox(height: SizeConfig.screenHeight * 0.08),
                LogInSignForm(),
                SizedBox(height: SizeConfig.screenHeight * 0.08),
                SizedBox(height: getProportionateScreenHeight(20)),
                //const NoAccountText(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
