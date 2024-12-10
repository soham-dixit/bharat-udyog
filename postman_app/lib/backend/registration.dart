import 'dart:convert';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;

class PostmanRegistration {
  static var serverUrl = 'https://bharatudyog.vercel.app/api/v4/';

  static Future<Map<String, dynamic>> performHttpRequest(
    String apiReq,
    String endUrl,
    Map<String, dynamic> getApiData,
  ) async {
    var headers = {'Content-Type': 'application/json'};
    var request = http.Request(apiReq, Uri.parse('$serverUrl$endUrl'));
    request.body = json.encode(getApiData);
    request.headers.addAll(headers);

    try {
      http.StreamedResponse response = await request.send();
      var dataFinal = await response.stream.bytesToString();
      var data = jsonDecode(dataFinal);

      if (response.statusCode == 201) {
        Get.snackbar("Success!", "Registered successfully.");
        return data;
      } else if (response.statusCode >= 400) {
        Get.snackbar("Error!", "${data['message']}");
        return {}; // Return an empty map or handle the error as needed
      }
    } catch (error) {
      Get.snackbar("Error!", "Failed to connect to the server: $error");
      print(error);
      return {}; // Return an empty map or handle the error as needed
    }
    return {};
  }
}
