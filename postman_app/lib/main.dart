import 'dart:io';
import 'package:postman_app/routes.dart';
import 'package:postman_app/size_config.dart';
import 'package:postman_app/theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

Future<void> main() async {
  HttpOverrides.global = MyHttpOverrides();
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor: Colors.transparent,
  ));
  await Future.delayed(const Duration(seconds: 2));
  FlutterNativeSplash.remove();
  SharedPreferences prefs = await SharedPreferences.getInstance();
  bool? remember = prefs.getBool('remember');
  runApp(MyApp(remember: remember ?? false));
}

class MyApp extends StatelessWidget {
  final bool remember;
  const MyApp({Key? key, required this.remember}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);

    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Postman',
      // theme: ThemeData(
      //   fontFamily: 'Poppins',
      // ),
      theme: AppTheme.lightTheme(context),
      color: const Color(0xFFB02925),
      initialRoute: remember ? Routesclass.loader : Routesclass.logIn,
      getPages: Routesclass.appRoutes(),
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
