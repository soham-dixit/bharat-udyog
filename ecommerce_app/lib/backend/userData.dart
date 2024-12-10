import 'dart:convert';
import 'package:http/http.dart' as http;

class ConsumerDetails {
  static var serverUrl = 'https://bharatudyog.vercel.app/api/v4';

  static Future<Map<String, dynamic>> getConsumerData(String consumerId) async {
    var headers = {'Content-Type': 'application/json'};
    var request = http.Request(
        'GET', Uri.parse('$serverUrl/consumer/getConsumerData/$consumerId'));
    request.headers.addAll(headers);

    try {
      http.StreamedResponse response = await request.send();
      var dataFinal = await response.stream.bytesToString();
      var data = jsonDecode(dataFinal);

      if (response.statusCode == 200) {
        // Successfully retrieved postman details
        return data;
      } else if (response.statusCode >= 400) {
        // Handle the error
        return {}; // Return an empty map or handle the error as needed
      }
    } catch (error) {
      // Handle the error
      print("Failed to connect to the server: $error");
      return {}; // Return an empty map or handle the error as needed
    }
    return {};
  }
}
