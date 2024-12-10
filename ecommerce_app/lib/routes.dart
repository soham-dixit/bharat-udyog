import 'package:flutter/widgets.dart';
import 'package:shop_app/components/coustom_bottom_nav_bar.dart';
import 'package:shop_app/components/load_data.dart';
import 'package:shop_app/screens/cart/cart_screen.dart';
import 'package:shop_app/screens/chatbot/chatbot.dart';

import 'package:shop_app/screens/details/ar_view.dart';
import 'package:shop_app/screens/details/details_screen.dart';
import 'package:shop_app/screens/exporter_chat/components/chatting_screen.dart';
import 'package:shop_app/screens/forgot_password/forgot_password_screen.dart';

import 'package:shop_app/screens/login_success/login_success_screen.dart';

import 'package:shop_app/screens/search/search_screen.dart';

import 'screens/sign_in/sign_in_screen.dart';
import 'screens/splash/splash_screen.dart';
import 'screens/sign_up/sign_up_screen.dart';

// import 'screens/profile/profile_screen.dart';
// import 'package:shop_app/screens/otp/otp_screen.dart';
// import 'package:shop_app/screens/home/home_screen.dart';
// import 'package:shop_app/screens/complete_profile/complete_profile_screen.dart';
// import 'package:dialog_flowtter/dialog_flowtter.dart';
// We use name route
// All our routes will be available here
final Map<String, WidgetBuilder> routes = {
  ChattingScreen.routeName: (context) => ChattingScreen(),
  ChatBot.routeName: (context) => ChatBot(),
  SplashScreen.routeName: (context) => SplashScreen(),
  SignInScreen.routeName: (context) => SignInScreen(),
  ForgotPasswordScreen.routeName: (context) => ForgotPasswordScreen(),
  LoginSuccessScreen.routeName: (context) => LoginSuccessScreen(),
  SignUpScreen.routeName: (context) => SignUpScreen(),
  LoadData.routeName: (context) => LoadData(),
  CustomBottomNavBar.routeName: (context) => CustomBottomNavBar(),
  DetailsScreen.routeName: (context) => DetailsScreen(),
  CartScreen.routeName: (context) => CartScreen(),
  SearchScreen.routeName: (context) => SearchScreen(),
  ARView.routeName: (context) => ARView(productImagePath: '')
};
