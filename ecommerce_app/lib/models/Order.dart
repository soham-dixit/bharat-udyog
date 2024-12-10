class Order{
    final String productName;
    final String price;
    final String qty;
    final String address;
    final String pincode;
    final String city;
    final String state;
    final String photoUrl;
    final String id;
    final int status;
    final Map<String,String> dateMap;
    // final String date;
    // final Map<String,String> statusDates;
    final String orderDate;

    Order({
      required this.dateMap,
      required this.status,
      required this.id,
      // required this.date,
      required this.photoUrl,
      required this.address,
      required this.city,
      required this.orderDate,
      required this.price,
      required this.productName,
      required this.qty,
      required this.pincode,
      required this.state
    });
}

  List<Order> allOrders = [];