import 'dart:convert';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;

class PostmanLogin {
  static var ipAdd = 'https://bharat-udyog.vercel.app/api/v4/';

  static Future<Map<String, dynamic>> performHttpRequest(
      String apiReq, String endUrl, Map<String, dynamic> getApiData) async {
    var headers = {'Content-Type': 'application/json'};
    var request = http.Request(apiReq, Uri.parse('$ipAdd$endUrl'));
    request.body = json.encode(getApiData);
    request.headers.addAll(headers);

    try {
      http.StreamedResponse response = await request.send();
      var dataFinal = await response.stream.bytesToString();
      var data = jsonDecode(dataFinal);

      if (response.statusCode == 200) {
        return data;
      } else if (response.statusCode == 401) {
        // print error msg received
        Get.snackbar("Error!", data['message']);
        return {};
      } else if (response.statusCode >= 400) {
        // print error msg received
        Get.snackbar("Error!", data['message']);
        return {};
      }
    } catch (error) {
      Get.snackbar("Error!", "Something went wrong.");
      return {};
    }

    return {};
  }
}
