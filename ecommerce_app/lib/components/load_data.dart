import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:shop_app/backend/fetch_order_status.dart';
import 'package:shop_app/backend/fetch_orders.dart';
import 'package:shop_app/backend/fetch_products.dart';
import 'package:shop_app/backend/fetch_festive_products.dart';
import 'package:shop_app/components/coustom_bottom_nav_bar.dart';
import 'package:shop_app/constants.dart';
import 'package:shop_app/globals.dart';
import 'package:http/http.dart' as http;
import 'package:shop_app/models/Order.dart';
import 'package:shop_app/models/Product.dart';

import '../models/RateModel.dart';

class LoadData extends StatefulWidget {
  const LoadData({super.key});
  static String routeName = "load-data";
  @override
  State<LoadData> createState() => _LoadDataState();
}

class _LoadDataState extends State<LoadData> {
  String conversionKey = currConversionKey;
  late String countryName;

  Map<String, int> statusPrioiry = {};
  Map<String, DateTime> statusDates = {};

  List<dynamic> fetchedAllProducts = [];
  List<dynamic> orders = [];
  List<dynamic> fetchedFestiveProducts = [];

  Future<dynamic> loadAllData() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    double storedConversionRate = prefs.getDouble('conversionRate') ?? 0;
    countryName = prefs.getString('consumerCountry')!;
    currentUserEmail = prefs.getString('consumerEmail')!;

    currentUserId = prefs.getString('consumerId')!;
    currentUserName = prefs.getString('consumerName')!;
    // fetching all products

    print("feching rpodcuts");
    List<dynamic> response = await FetchProducts.performHttpRequest(
      'GET',
      'details/getAllProducts',
      context,
    );
    if (response.isNotEmpty) {
      fetchedAllProducts = response;

      allProducts = [];
      fetchedAllProducts.forEach((element) {
        print(element['rating']['\$numberDecimal'].runtimeType);

        Product prod = Product(
            id: element['_id'],
            exporterId: element['exporterId'],
            title: element['productName'],
            price: element['price'].toDouble(),
            photoUrl: element['photoUrl'],
            description: element['description'],
            availableQty: element['availableQty'],
            category: element['category'],
            rating: double.parse(element['rating']['\$numberDecimal']),
            weight: element['weight'].toDouble(),
            isFestival: false,
            isPopular: true);
        allProducts.add(prod);
        print("Done");
      });

      print("all products listed");
      if (allProducts.isEmpty) allProducts = demoProducts;

      print("Fetching festive products...");

      List<dynamic> festiveResponse =
          await FetchFestiveProducts.performHttpRequest(
        'GET',
        'utils/festive_products',
        context,
      );
      if (festiveResponse.isNotEmpty) {
        fetchedFestiveProducts = festiveResponse;
        print("Festive products fetched successfully!");
      } else {
        print("No festive products found.");
      }
      festiveProducts = [];
// Print fetched data to ensure it is populated correctly
      // print(fetchedFestiveProducts);

      if (fetchedFestiveProducts.isNotEmpty) {
        fetchedFestiveProducts.forEach((element) {
          Product prod = Product(
            id: element['_id'],
            exporterId: element['exporterId'],
            title: element['productName'],
            price: element['price'].toDouble(),
            photoUrl: element['photoUrl'],
            description: element['description'],
            availableQty: element['availableQty'],
            category: element['category'],
            rating: double.parse(element['rating']['\$numberDecimal']),
            weight: element['weight'].toDouble(),
            isFestival: true, // Explicitly setting it here
            isPopular: false,
          );

          festiveProducts.add(prod);
        });

        // Verify if all products have isFestival set to true
        // allProducts.forEach((prod) {
        //   print('Product: ${prod.title}, isFestival: ${prod.isFestival}');
        // });
      }

      //ORDER starting........................

      List<dynamic> res = await FetchOrders.performHttpRequest(
        'GET',
        'consumer/getConsumerOrder/$currentUserEmail',
      );

      if (response.isNotEmpty) {
        print("got orders");
        allOrders = [];
        orders = res;
        // print(orders);

        orders.forEach((element) async {
          Map<String, dynamic> statusRes =
              await FetchOrderStatus.performHttpRequest(
            'GET',
            "consumer/getOrderStatus/${element["_id"]}",
          );
          // print(statusRes);

          //find highest prioriy and set dates
          int statusIndex = 0;
          Map<String, String> dateMap = {
            "isDispatchedDate": "",
            "isPickedUpDate": "",
            "readyToShipDate": "",
            "postmanAssignDate": "",
            "dnkVerifiedDate": "",
            "customVerifiedDate": "",
            "isShipToCustomDate": "",
            "isDroppedAtDnkDate": "",
          };

          statusRes.forEach((key, value) {
            if (statusIdx.containsKey(key)) {
              if (orderStatusMsgDateMap.containsKey(key) &&
                  (statusIdx[Key] ?? 0) > statusIndex)
                statusIndex = statusIdx[key]!;
              if (dateMap.containsKey(key)) dateMap[key] = value;
            }
          });

          Order ord = Order(
            dateMap: dateMap,
            status: statusIndex,
            id: element["_id"],
            // date: element["orderDate"],
            photoUrl: element["photoUrl"],
            address: element["address"],
            city: element["city"],
            orderDate: element["orderDate"],
            price: element["price"].toString(),
            productName: element["productName"],
            qty: element["qty"].toString(),
            pincode: element["pincode"].toString(),
            state: element["state"],
          );
          allOrders.add(ord);
        });
      }

      //end of order.........................

      if (currencySymbolMap.containsKey(countryName.toLowerCase()))
        currencySymbol = currencySymbolMap[countryName.toLowerCase()]!;

      print(storedConversionRate);

      if (storedConversionRate != 0) {
        KConversionrate = storedConversionRate;
        print("stored.....");
        return KConversionrate;
      } else {
        var response = await http.get(Uri.parse(
            "https://openexchangerates.org/api/latest.json?base=USD&app_id=" +
                conversionKey));
        var data = ratesModelFromJson(response.body);
        var usd = 1 / data.rates["INR"]!;

        GcountryCode = CountryCodeMap[countryName.toLowerCase()]!;
        KConversionrate = usd * data.rates[GcountryCode]!;

        prefs.setDouble('conversionRate', KConversionrate);
        print(currencySymbol);
        print(KConversionrate);

        return response;
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FutureBuilder(
        future: loadAllData(),
        builder: (context, snapshot) {
          if (snapshot.hasData)
            return CustomBottomNavBar();
          else
            return Container(
              alignment: Alignment.center,
              child: CircularProgressIndicator(
                color: kPrimaryColor,
              ),
            );
        },
      ),
    );
  }
}
