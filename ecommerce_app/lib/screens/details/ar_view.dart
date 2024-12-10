import 'dart:typed_data';

import 'package:arcore_flutter_plugin/arcore_flutter_plugin.dart';
// import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
// import 'package:get/get.dart';
import 'package:path_provider/path_provider.dart';
import 'package:shop_app/constants.dart';
import 'package:shop_app/size_config.dart';
import 'package:http/http.dart' as http;
import 'package:path/path.dart';
// import 'package:path_provider/path_provider.dart';
import 'package:vector_math/vector_math_64.dart' as vector;
import 'dart:io';

class ARView extends StatefulWidget {
  static final String routeName = '/arview';
  final String productImagePath;

  const ARView({super.key, required this.productImagePath});

  @override
  State<ARView> createState() => _ARViewState();
}

class _ARViewState extends State<ARView> {
  late ArCoreController arCoreController;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Stack(
          children: [
            ArCoreView(
              onArCoreViewCreated: _onArCoreViewCreated,
            ),
            Positioned(
              top: getProportionateScreenHeight(50),
              left: 0,
              child: MaterialButton(
                onPressed: () {
                  Navigator.pop(context);
                },
                color: const Color.fromARGB(22, 176, 42, 37),
                textColor: kPrimaryColor,
                padding: const EdgeInsets.all(16),
                shape: const CircleBorder(),
                elevation: 0.0,
                highlightElevation: 0.0,
                splashColor: Colors.transparent,
                child: const Icon(
                  Icons.arrow_back,
                  size: 24,
                ),
              ),
            ),
          ],
        ));
  }

  void _onArCoreViewCreated(ArCoreController controller) {
    arCoreController = controller;
    _addImage(arCoreController);
  }

  Future<Uint8List> getImageBytes(String imageName) async {
    final ByteData data = await rootBundle.load('$imageName');
    return data.buffer.asUint8List();
  }

  Future<File> getImageFileFromAssets(String path) async {
    final byteData = await rootBundle.load('$path');

    final file = File('${(await getTemporaryDirectory()).path}/$path');
    await file.create(recursive: true);
    await file.writeAsBytes(byteData.buffer
        .asUint8List(byteData.offsetInBytes, byteData.lengthInBytes));

    return file;
  }

  Future<File> getImageFileFromNetwork() async {
    final response = await http.get(Uri.parse("${widget.productImagePath}"));
    final documentDirectory = await getApplicationDocumentsDirectory();

    final file = File(join(documentDirectory.path, 'imagetest.png'));

    file.writeAsBytesSync(response.bodyBytes);

    return file;
  }

  Future<Uint8List> readNetworkImage(String imageUrl) async {
  final ByteData data =
      await NetworkAssetBundle(Uri.parse(imageUrl)).load(imageUrl);
  final Uint8List bytes = data.buffer.asUint8List();
  return bytes;
}

  void _addImage(ArCoreController controller) async {
    final imagebytes = await readNetworkImage("${widget.productImagePath}");

    // File image = await getImageFileFromAssets(
    //     widget.productImagePath); // Or any other way to get a File instance.

    File image = await getImageFileFromNetwork();
    var decodedImage = await decodeImageFromList(image.readAsBytesSync());

    final node = ArCoreNode(
      image: ArCoreImage(
          bytes: imagebytes,
          width: decodedImage.width,
          height: decodedImage.height,
          // width: decodedImage.width,
          // height: decodedImage.height,
          ),
      position: vector.Vector3(-0.5, 0.5, -3.5),
    );
    controller.addArCoreNode(node);
  }

  @override
  void dispose() {
    arCoreController.dispose();
    super.dispose();
  }
}
