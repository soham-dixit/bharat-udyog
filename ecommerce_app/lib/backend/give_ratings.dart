import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:shop_app/constants.dart';

class GiveRatings {
  static Future<void> performHttpRequest(
      String apiReq, String endUrl, String product_id, int rating) async {
    var headers = {'Content-Type': 'application/json'};
    var request =
        http.Request(apiReq, Uri.parse('$regUrl$endUrl/$product_id/$rating'));

    print('$regUrl$endUrl/$product_id/$rating');
    request.headers.addAll(headers);

    try {
      http.StreamedResponse response = await request.send();

      if (response.statusCode == 200) {
        // print("Success fetch orders");
        print("Ratings successfully uploaded");
      } else if (response.statusCode >= 400) {
        print("Ratings unsuccessfully ");
        // Get.snackbar("Error", "${data['message']}");
        // return []; // Return an empty map or handle the error as needed
      }
    } catch (error) {
      // Get.snackbar("Error", "$error}");
      print(error);
      // Return an empty map or handle the error as needed
    }
  }
}
