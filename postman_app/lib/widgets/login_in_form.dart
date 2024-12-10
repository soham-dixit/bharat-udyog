import 'package:postman_app/backend/login.dart';
import 'package:postman_app/backend/userData.dart';
import 'package:postman_app/constants.dart';
import 'package:postman_app/helper/keyboard.dart';
import 'package:postman_app/routes.dart';
import 'package:postman_app/size_config.dart';
import 'package:postman_app/widgets/custom_surfix_icon.dart';
import 'package:postman_app/widgets/default_button.dart';
import 'package:postman_app/widgets/form_error.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LogInSignForm extends StatefulWidget {
  @override
  _LogInSignFormState createState() => _LogInSignFormState();
}

class _LogInSignFormState extends State<LogInSignForm> {
  final _formKey = GlobalKey<FormState>();
  String? email;
  String? password;
  bool? remember = false;
  final List<String?> errors = [];

  void addError({String? error}) {
    if (!errors.contains(error)) {
      setState(() {
        errors.add(error);
      });
    }
  }

  void removeError({String? error}) {
    if (errors.contains(error)) {
      setState(() {
        errors.remove(error);
      });
    }
  }

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
                    // print(remember);
                  });
                },
              ),
              Text("Remember me"),
              Spacer(),
              GestureDetector(
                onTap: () => Get.toNamed(Routesclass.forgotScreen),
                child: const Text(
                  "Forgot Password",
                  style: TextStyle(decoration: TextDecoration.underline),
                ),
              )
            ],
          ),
          FormError(errors: errors),
          SizedBox(height: getProportionateScreenHeight(20)),
          DefaultButton(
            text: "Continue",
            press: () {
              if (_formKey.currentState!.validate()) {
                _formKey.currentState!.save();
                // if all are valid then go to success screen
                KeyboardUtil.hideKeyboard(context);
                performLogin();
                // Get.toNamed(Routesclass.home);
                // Navigator.pushNamed(context, LoginSuccessScreen.routeName);
              }
            },
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
      decoration: const InputDecoration(
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
      decoration: const InputDecoration(
        labelText: "Email",
        hintText: "Enter your email",
        // If  you are using latest version of flutter then lable text and hint text shown like this
        // if you r using flutter less then 1.20.* then maybe this is not working properly
        floatingLabelBehavior: FloatingLabelBehavior.always,
        suffixIcon: CustomSurffixIcon(svgIcon: "assets/icons/Mail.svg"),
      ),
    );
  }

  void performLogin() async {
    Map<String, dynamic> apiData = {
      'email': email,
      'password': password,
      'latitude': "",
      'longitude': "",
      'role': "Postman"
      // Add other required fields
    };

    Map<String, dynamic> response = await PostmanLogin.performHttpRequest(
      'POST',
      'auth/login', // Adjust the API endpoint accordingly
      apiData,
    );

    // Handle the API response
    if (response.isNotEmpty) {
      // Check if the user role is 'Postman'
      if (response['user']['role'] == 'Postman') {
        // Allow login
        print(response);
        // get id from response
        String postmanId = response['user']['id'];
        print(postmanId);
        Map<String, dynamic> postmanDetails =
            await PostmanDetails.getPostmanData(postmanId);
        storeDetails(postmanDetails);
        Get.offAllNamed(Routesclass.loader);
        Get.snackbar("Success!", "Login successful");
        if (remember == true) {
          SharedPreferences prefs = await SharedPreferences.getInstance();
          prefs.setBool('remember', true);
        }
      } else {
        // Show snackbar for invalid email address
        Get.snackbar(
          "Invalid Email!",
          "Postman for this Email doesn't exists.",
          snackPosition: SnackPosition.BOTTOM,
          backgroundColor: Colors.red,
          colorText: Colors.white,
        );
      }
    } else {
      // Handle the error
      print('Login request failed');
    }
  }

  void storeDetails(Map<String, dynamic> postmanDetails) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    print(postmanDetails);
    String id = postmanDetails['postman']['_id'];
    String email = postmanDetails['postman']['email'];
    String name = postmanDetails['postman']['name'];
    int pincode = postmanDetails['postman']['pincode'];
    int phoneNumber = postmanDetails['postman']['phoneNumber'];

    prefs.setString('postmanId', id);
    prefs.setString('postmanEmail', email);
    prefs.setString('postmanName', name);
    prefs.setInt('postmanPincode', pincode);
    prefs.setInt('postmanPhone', phoneNumber);
  }
}
