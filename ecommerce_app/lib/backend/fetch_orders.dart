import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:shop_app/constants.dart';


class FetchOrders {
  static Future<List<dynamic>> performHttpRequest(
      String apiReq, String endUrl) async {
    var headers = {'Content-Type': 'application/json'};
    var request = http.Request(apiReq, Uri.parse('$regUrl$endUrl'));

    request.headers.addAll(headers);

    try {
      http.StreamedResponse response = await request.send();
      var dataFinal = await response.stream.bytesToString();
      var data = jsonDecode(dataFinal);

      if (response.statusCode == 200) {
        // print("Success fetch orders");
        return data['orders'];
      } else if (response.statusCode >= 400) {
        print("${data['message']}");
        // Get.snackbar("Error", "${data['message']}");
        return []; // Return an empty map or handle the error as needed
      }
    } catch (error) {
      // Get.snackbar("Error", "$error}");
      print(error);
      return []; // Return an empty map or handle the error as needed
    }
    return [];
  }
}
