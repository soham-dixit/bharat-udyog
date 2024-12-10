import 'dart:convert';

// import 'package:flutter/material.dart';
import 'package:get/get_core/get_core.dart';
import 'package:get/get_navigation/get_navigation.dart';
import 'package:http/http.dart' as http;
import 'package:shop_app/constants.dart';

class OrderPlacement {
  static Future<Map<String, dynamic>> performHttpRequest(
    String apiReq,
    String endUrl,
    Map<String, dynamic> getApiData,
    // BuildContext context
  ) async {
    var headers = {'Content-Type': 'application/json'};
    var request = http.Request(apiReq, Uri.parse('$regUrl$endUrl'));
    request.body = json.encode(getApiData);
    request.headers.addAll(headers);

    try {
      http.StreamedResponse response = await request.send();
      var dataFinal = await response.stream.bytesToString();
      var data = jsonDecode(dataFinal);
      if (response.statusCode == 201) {
        Get.snackbar("Success", "Order placed successfully");
        return data;
      } else if (response.statusCode >= 400) {
        print("${data['message']}");
        Get.snackbar("Error", "${data['message']}");
        return {}; // Return an empty map or handle the error as needed
      }
    } catch (error) {
      Get.snackbar("Error", "$error}");
      print(error);
      return {}; // Return an empty map or handle the error as needed
    }
    return {};
  }
}
