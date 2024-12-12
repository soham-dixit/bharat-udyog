import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:get/get_core/get_core.dart';
import 'package:get/get_navigation/get_navigation.dart';
import 'package:http/http.dart' as http;
import 'package:shop_app/constants.dart';

class SendMessage {
  static Future<String> performHttpRequest(String apiReq, String endUrl,
      String expoerter_id, String query, BuildContext context) async {
    var headers = {'Content-Type': 'application/json'};
    var request = http.Request(
      apiReq,
      Uri.parse('$ngrox$endUrl'),
    );

    request.headers.addAll(headers);

    request.body = jsonEncode({
      'seller_id': expoerter_id,
      'query': query,
    });

    try {
      http.StreamedResponse response = await request.send();
      var dataFinal = await response.stream.bytesToString();
      var data = jsonDecode(dataFinal);

      if (response.statusCode == 200) {
        print(data);
        return data['response'];
      } else if (response.statusCode >= 400) {
        return ""; // Return an empty list or handle the error as needed
      }
    } catch (error) {
      Get.snackbar("Error", "$error");
      print(error);
      return " "; // Return an empty list or handle the error as needed
    }
    return " ";
  }
}
