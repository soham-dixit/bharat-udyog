import 'dart:io';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';
import 'package:get/get_navigation/src/root/get_material_app.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:shop_app/components/load_data.dart';
import 'package:shop_app/firebase_options.dart';
import 'package:shop_app/models/favorite.dart';
import 'package:shop_app/routes.dart';
import 'package:shop_app/screens/sign_in/sign_in_screen.dart';
import 'package:shop_app/screens/splash/splash_screen.dart';
import 'package:shop_app/size_config.dart';
import 'package:shop_app/theme.dart';

import 'firebase_options.dart';
import 'models/Cart.dart';

Future main() async {
  HttpOverrides.global = MyHttpOverrides();
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor: Colors.transparent,
  ));

  final SharedPreferences prefs = await SharedPreferences.getInstance();
  final bool hasSeenOnboarding = prefs.getBool('hasSeenOnboarding') ?? false;
  prefs.setBool('hasSeenOnboarding', true);
  FavItem.wishlistString = prefs.getString('wishlist_key') ?? "";
  CartItem.cartlistString = prefs.getString('cartlist_key') ?? "";
  final bool isLogin = prefs.getBool("remember") ?? false;

  await Future.delayed(const Duration(seconds: 2));
  FlutterNativeSplash.remove();

  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  runApp(
    MyApp(
      initialRoute: isLogin
          ? LoadData.routeName
          : (hasSeenOnboarding
              ? SignInScreen.routeName
              : SplashScreen.routeName),
    ),
  );
}

class MyApp extends StatelessWidget {
  final String initialRoute;

  MyApp({required this.initialRoute});

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme(context),
      title: 'Bharat Udyog',
      color: const Color(0xFFB02925),
      initialRoute: initialRoute, // Use the initialRoute passed from main
      routes: routes,
    );
  }
}

class MyHttpOverrides extends HttpOverrides {
  @override
  HttpClient createHttpClient(SecurityContext? context) {
    return super.createHttpClient(context)
      ..badCertificateCallback =
          (X509Certificate cert, String host, int port) => true;
  }
}
