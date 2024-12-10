class Order{
  final String productName;
  // final String name;
  final String city;
  final String orderId;
  // final bool isReadyToShip;
  // final bool isPostmanAssigned;
  final String assignedPostman;
  final String creationDate;
  final String status;


  Order({
    required this.status,
    required this.creationDate,
    required this.assignedPostman,
    // required this.isReadyToShip,
    required this.productName,
    required this.city,
    // required this.isPostmanAssigned,
    // required this.isReadyToShip,
    // required this.name,
    required this.orderId,
  });
  // "productName":"Wooden Chair",
  // "name":"vinay",
  // "city":"pune",
  // "_id":"65815ba23a9652254dc18d59",
  // "orderId":"65815ba23a9652254dc18d57",
  // "isReadyToShip":true,
  // "isPostmanAssigned":true,
  // "assignedPostman":"postman@gmail.com",
  // "isVerifiedByDnk":false,
  // "isVerifiedByCustom":false,
  // "isPickedUp":false,
  // "isDroppedAtDnk":false,
  // "isDispatched":false,
  // "isDispatchedDate":null,
  // "isPickedUpDate":null,
  // "readyToShipDate":"2023-12-19T09:03:57.823Z"
  // ,"postmanAssignDate":"2023-12-19T09:25:49.920Z",
  // "dnkVerifiedDate":null,
  // "customVerifiedDate":null,
  // "isShipToCustomDate":null,
  // "isDroppedAtDnkDate":null,
  // "__v":0,
}

List<Order> orderList = [];
List<Order> compOrderList = [];