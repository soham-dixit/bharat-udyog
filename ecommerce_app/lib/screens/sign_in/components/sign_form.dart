import 'package:flutter/material.dart';
import 'package:get/get_core/get_core.dart';
import 'package:get/get_navigation/get_navigation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:shop_app/backend/signin.dart';
import 'package:shop_app/backend/userData.dart';

import 'package:shop_app/components/custom_surfix_icon.dart';
import 'package:shop_app/components/form_error.dart';
import 'package:shop_app/components/load_data.dart';

import 'package:shop_app/screens/forgot_password/forgot_password_screen.dart';

// import 'package:shop_app/helper/keyboard.dart';
// import 'package:shop_app/screens/home/home_screen.dart';
// import 'package:shop_app/screens/login_success/login_success_screen.dart';
// import 'package:shop_app/components/coustom_bottom_nav_bar.dart';
// import '../../../components/default_button.dart';
import '../../../constants.dart';
import '../../../size_config.dart';

class SignForm extends StatefulWidget {
  @override
  _SignFormState createState() => _SignFormState();
}

class _SignFormState extends State<SignForm> {
  final _formKey = GlobalKey<FormState>();
  String? email;
  String? password;
  bool? remember = false;
  final List<String?> errors = [];

  void addError({String? error}) {
    if (!errors.contains(error))
      setState(() {
        errors.add(error);
      });
  }

  void removeError({String? error}) {
    if (errors.contains(error))
      setState(() {
        errors.remove(error);
      });
  }

  void siginUser() async {
    if (!_formKey.currentState!.validate()) return;
    _formKey.currentState!.save();
    print("$email $password");
    Map<String, dynamic> data = {
      'email': email!.trim(),
      'password': password!.trim(),
      'role': 'Consumer'
    };

    Map<String, dynamic> response = await ConsumerSignIn.performHttpRequest(
      'POST',
      'auth/login',
      data,
      context,
    );

    if (response.isNotEmpty) {
      if (response['user']["role"] == "Consumer") {
        String consumerId = response['user']['id'];
        print(consumerId);
        Map<String, dynamic> consumerDetails =
            await ConsumerDetails.getConsumerData(consumerId);
        storeDetails(consumerDetails);

        if (remember == true) {
          SharedPreferences pref = await SharedPreferences.getInstance();
          pref.setBool("remember", true);
        }
        Navigator.pushAndRemoveUntil(
            context,
            MaterialPageRoute(builder: (context) => LoadData()),
            (route) => false);
      } else {
        Get.snackbar("Success", "Logged out successfully");
      }
    } else {
      print("Error in Api call");
    }

    setState(() {
      isLoading = false;
    });
  }

  void storeDetails(Map<String, dynamic> consumerDetails) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    print(consumerDetails);
    String id = consumerDetails['consumer']['_id'];
    String email = consumerDetails['consumer']['email'];
    String name = consumerDetails['consumer']['name'];
    String pincode = consumerDetails['consumer']['pincode'];
    String phoneNumber = consumerDetails['consumer']['mobileNumber'];
    String country = consumerDetails['consumer']['country'];
    String state = consumerDetails['consumer']['state'];
    String city = consumerDetails['consumer']['city'];

    prefs.setString('consumerId', id);
    prefs.setString('consumerEmail', email);
    prefs.setString('consumerName', name);
    prefs.setString('consumerPincode', pincode);
    prefs.setString('consumerPhone', phoneNumber);
    prefs.setString('consumerCountry', country);
    prefs.setString('consumerState', state);
    prefs.setString('consumerCity', city);
  }

  bool isLoading = false;
  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          buildEmailFormField(),
          SizedBox(height: getProportionateScreenHeight(30)),
          buildPasswordFormField(),
          SizedBox(height: getProportionateScreenHeight(30)),
          Row(
            children: [
              Checkbox(
                value: remember,
                activeColor: kPrimaryColor,
                onChanged: (value) {
                  setState(() {
                    remember = value;
                  });
                },
              ),
              Text("Remember me"),
              Spacer(),
              GestureDetector(
                onTap: () => Navigator.pushNamed(
                    context, ForgotPasswordScreen.routeName),
                child: Text(
                  "Forgot Password",
                  style: TextStyle(decoration: TextDecoration.underline),
                ),
              )
            ],
          ),
          FormError(errors: errors),
          SizedBox(height: getProportionateScreenHeight(20)),
          // DefaultButton(
          //   press: () {
          //     siginUser();
          //   },
          //   text: "Login",
          // ),
          SizedBox(
            width: double.infinity,
            height: getProportionateScreenHeight(56),
            child: TextButton(
              style: TextButton.styleFrom(
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20)),
                foregroundColor: Colors.white,
                backgroundColor: kPrimaryColor,
              ),
              onPressed: () async {
                if (!(_formKey.currentState!.validate())) return;
                setState(() {
                  isLoading = true;
                });
                siginUser();
              },
              child: isLoading
                  ? Center(
                      child: CircularProgressIndicator(
                      color: Colors.white,
                    ))
                  : Text(
                      "Login",
                      style: TextStyle(
                        fontSize: getProportionateScreenWidth(18),
                        color: Colors.white,
                      ),
                    ),
            ),
          ),
        ],
      ),
    );
  }

  TextFormField buildPasswordFormField() {
    return TextFormField(
      obscureText: true,
      onSaved: (newValue) => password = newValue,
      onChanged: (value) {
        if (value.isNotEmpty) {
          removeError(error: kPassNullError);
        } else if (value.length >= 8) {
          removeError(error: kShortPassError);
        }
        return null;
      },
      validator: (value) {
        if (value!.isEmpty) {
          addError(error: kPassNullError);
          return "";
        } else if (value.length < 8) {
          addError(error: kShortPassError);
          return "";
        }
        return null;
      },
      decoration: InputDecoration(
        labelText: "Password",
        hintText: "Enter your password",
        // If  you are using latest version of flutter then lable text and hint text shown like this
        // if you r using flutter less then 1.20.* then maybe this is not working properly
        floatingLabelBehavior: FloatingLabelBehavior.always,
        suffixIcon: CustomSurffixIcon(svgIcon: "assets/icons/Lock.svg"),
      ),
    );
  }

  TextFormField buildEmailFormField() {
    return TextFormField(
      keyboardType: TextInputType.emailAddress,
      onSaved: (newValue) => email = newValue,
      onChanged: (value) {
        if (value.isNotEmpty) {
          removeError(error: kEmailNullError);
        } else if (emailValidatorRegExp.hasMatch(value)) {
          removeError(error: kInvalidEmailError);
        }
        return null;
      },
      validator: (value) {
        if (value!.isEmpty) {
          addError(error: kEmailNullError);
          return "";
        } else if (!emailValidatorRegExp.hasMatch(value)) {
          addError(error: kInvalidEmailError);
          return "";
        }
        return null;
      },
      decoration: InputDecoration(
        labelText: "Email",
        hintText: "Enter your email",
        // If  you are using latest version of flutter then lable text and hint text shown like this
        // if you r using flutter less then 1.20.* then maybe this is not working properly
        floatingLabelBehavior: FloatingLabelBehavior.always,
        suffixIcon: CustomSurffixIcon(svgIcon: "assets/icons/Mail.svg"),
      ),
    );
  }
}
