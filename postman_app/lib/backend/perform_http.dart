import 'dart:convert';

import 'package:http/http.dart' as http;

import '../constants.dart';


class HttpRequest {

  static Future<dynamic> performHttpRequest(String apiReq, String endUrl, Map getApiData) async {
    var headers = {'Content-Type': 'application/json'};
    var request = http.Request(apiReq, Uri.parse('$regUrl$endUrl'));
    // request.body = json.encode(getApiData);
    request.headers.addAll(headers);
    http.StreamedResponse response = await request.send();
    var dataFinal = await response.stream.bytesToString();
    var data = jsonDecode(dataFinal);
    if (response.statusCode == 200) {
      return data["orders"];
    } else if (response.statusCode >= 400) {
      return [];
    }
    return [];
  }

  static Future<dynamic> performOrderHttpRequest(String apiReq, String endUrl, Map getApiData) async {
    var headers = {'Content-Type': 'application/json'};
    var request = http.Request(apiReq, Uri.parse('$regUrl$endUrl'));
    request.headers.addAll(headers);
    http.StreamedResponse response = await request.send();
    var dataFinal = await response.stream.bytesToString();
    var data = jsonDecode(dataFinal);
    if (response.statusCode == 200) {
      return data["orderDetail"];
    } else if (response.statusCode >= 400) {
      return {};
    }
    return {};
  }

  static Future<dynamic> performPutRequest(String apiReq, String endUrl) async {
    var headers = {'Content-Type': 'application/json'};
    var request = http.Request(apiReq, Uri.parse('$regUrl$endUrl'));
    request.headers.addAll(headers);
    http.StreamedResponse response = await request.send();
    var dataFinal = await response.stream.bytesToString();
    var data = jsonDecode(dataFinal);
    if (response.statusCode == 200) {
      return data;
    } else if (response.statusCode >= 400) {
      return {};
    }
    return {};
  }
}
