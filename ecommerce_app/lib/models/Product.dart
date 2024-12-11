class Product {
  final String id;
  final String exporterId;
  final String title, description;
  final String photoUrl;
  final int availableQty;
  final String category;
  final double weight;
  final double rating, price;
  bool isFavourite, isPopular, isFestival;

  Product({
    required this.id,
    required this.exporterId,
    required this.title,
    required this.price,
    required this.photoUrl,
    required this.description,
    required this.availableQty,
    required this.rating,
    required this.category,
    required this.weight,
    this.isFavourite = false,
    this.isPopular = false,
    this.isFestival = false,
  });
}

// Our demo Products

List<Product> allProducts = [];
List<Product> festiveProducts = [];

List<Product> demoProducts = [
  Product(
    id: "657d13cea1bab7076a51139f",
    exporterId: "657d020892998eba6e975709",
    title: "DEmo",
    price: 123,
    photoUrl: "file-1702695886397-331336014.png",
    description: "jkbkwebfk",
    availableQty: 10,
    category: "design",
    weight: 5,
    rating: 4.4,
  ),
  Product(
    id: "657d54b3b5d070880e854890",
    exporterId: "657d020892998eba6e975709",
    title: "Idcard",
    price: 20,
    photoUrl: "file-1702712499862-72947172.png",
    description: "This is ID Card",
    availableQty: 1,
    category: "Edu",
    weight: 5,
    rating: 4.4,
  ),
];

const String description =
    "All Products of India Meets India are Proudly made By Various Indian Awarded NGO's and Rural Artisans of all age groups";
