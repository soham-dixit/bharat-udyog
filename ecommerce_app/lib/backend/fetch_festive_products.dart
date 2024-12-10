import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:get/get_core/get_core.dart';
import 'package:get/get_navigation/get_navigation.dart';
import 'package:http/http.dart' as http;
import 'package:shop_app/constants.dart';

class FetchFestiveProducts {
  static Future<List<dynamic>> performHttpRequest(
      String apiReq, String endUrl, BuildContext context) async {
    var headers = {'Content-Type': 'application/json'};
    var request = http.Request(apiReq, Uri.parse('$regUrl$endUrl'));

    request.headers.addAll(headers);

    try {
      http.StreamedResponse response = await request.send();
      var dataFinal = await response.stream.bytesToString();
      var data = jsonDecode(dataFinal);

      if (response.statusCode == 200) {
        return data['data'];
      } else if (response.statusCode >= 400) {
        return []; // Return an empty list or handle the error as needed
      }
    } catch (error) {
      Get.snackbar("Error", "$error");
      print(error);
      return []; // Return an empty list or handle the error as needed
    }
    return [];
  }
}
