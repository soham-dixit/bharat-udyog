import 'package:postman_app/screens/forgot_password_screen.dart';
import 'package:postman_app/screens/home/comp_orders.dart';
import 'package:postman_app/screens/home/home.dart';
import 'package:postman_app/screens/load_data.dart';
import 'package:postman_app/screens/log_in.dart';
import 'package:postman_app/screens/login_success_screen.dart';
import 'package:postman_app/screens/order/navigation_page.dart';
import 'package:postman_app/screens/order/order_details.dart';
import 'package:postman_app/screens/order/orders_completed.dart';
import 'package:postman_app/screens/profile/my_account.dart';
import 'package:postman_app/screens/profile/profile_screen.dart';
import 'package:postman_app/screens/sign_up.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class Routesclass {
  static String home = "/home";
  static String logIn = "/logIn";
  static String signUp = "/signUp";
  static String forgotScreen = "/forgotScreen";
  static String loginSuccess = "/loginSuccess";
  static String compOrders = "/compOrders";
  static String navigationPage = "/navigationPage";
  static String orderDetails = "/orderDetails";
  static String profilePage = "/profilePage";
  static String compOrdersDetails = "/compOrderDetails";
  static String myAccount = "/myAccountPage";
  static String loader = "/loaderPage";

  static String getHomePageRoute() => home;
  static String getLogInRoute() => logIn;
  static String getLoaderRoute() => loader;
  static String getsignUp() => signUp;
  static String getforgotScreen() => forgotScreen;
  static String getLoginSucess() => loginSuccess;
  static String getCompOrders() => compOrders;
  static String getOrder() => orderDetails;
  static String getNavigationPage() => navigationPage;
  static String getProfilePage() => profilePage;
  static String getCompOrdersDetails() => compOrdersDetails;
  static String getMyAccountPage() => myAccount;

  static appRoutes() => [
        GetPage(
          name: Routesclass.loader,
          page: () => const LoadData(),
          transition: Transition.noTransition,
        ),
        GetPage(
            name: Routesclass.home,
            page: () => const HomePage(),
            transition: Transition.noTransition),
        GetPage(
            name: Routesclass.profilePage,
            page: () => ProfileScreen(),
            transition: Transition.noTransition),
        GetPage(
            name: Routesclass.compOrdersDetails,
            page: () => CompletedOrderDetails()),
        GetPage(name: Routesclass.signUp, page: () => SignUpScreen()),
        GetPage(name: Routesclass.logIn, page: () => SignInScreen()),
        GetPage(
            name: Routesclass.forgotScreen, page: () => ForgotPasswordScreen()),
        GetPage(
            name: Routesclass.loginSuccess, page: () => LoginSuccessScreen()),
        GetPage(
            name: Routesclass.compOrders,
            page: () => const CompOrdersPage(),
            transition: Transition.noTransition),
        GetPage(
            name: Routesclass.orderDetails, page: () => const OrderDetails()),
        GetPage(
            name: Routesclass.navigationPage,
            page: () {
              NavigationPage _nav = Get.arguments;
              return _nav;
            }),
        GetPage(name: Routesclass.myAccount, page: () => MyAccount()),
      ];
}


// class MyMiddelware extends GetMiddleware {
//   @override
//   GetPage? onPageCalled(GetPage? page) {
//     return super.onPageCalled(page);
//   }
// }