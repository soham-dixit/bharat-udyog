import 'dart:async';
import 'package:open_route_service/open_route_service.dart';
import 'package:postman_app/constants.dart';
import 'package:postman_app/size_config.dart';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:get/get.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class NavigationPage extends StatefulWidget {
  const NavigationPage(
      {Key? key, required this.lat, required this.long, required this.pos})
      : super(key: key);
  final Position pos;
  final double lat;
  final double long;

  @override
  State<NavigationPage> createState() => _NavigationPageState();
}

class _NavigationPageState extends State<NavigationPage> {
  final OpenRouteService client = OpenRouteService(
    apiKey: '5b3ce3597851110001cf6248216fc70cd809493eb4dd0746e4fab19d',
  );

  late double startLat;
  late double startLong;
  late double endLat;
  late double endLong;
  Polyline? routePolyline; // Changed to nullable
  late CameraPosition _defaultPosition;
  final Set<Marker> _markers = <Marker>{};
  final Completer<GoogleMapController> _controller = Completer();
  late List<ORSCoordinate> routeCoordinates;

  Future<void> getLatituteLongitude() async {
    startLat = widget.pos.latitude;
    startLong = widget.pos.longitude;
    endLat = widget.lat;
    endLong = widget.long;

    routeCoordinates = await client.directionsRouteCoordsGet(
      startCoordinate: ORSCoordinate(latitude: startLat, longitude: startLong),
      endCoordinate: ORSCoordinate(latitude: endLat, longitude: endLong),
      profileOverride: ORSProfile.footWalking,
    );

    final List<LatLng> routePoints = routeCoordinates
        .map((coordinate) => LatLng(coordinate.latitude, coordinate.longitude))
        .toList();

    // Create Polyline (requires Material UI for Color)
    setState(() {
      routePolyline = Polyline(
        polylineId: const PolylineId('route'),
        visible: true,
        points: routePoints,
        color: kPrimaryColor,
        width: 6,
        startCap: Cap.roundCap,
        endCap: Cap.roundCap,
      );
    });
  }

  double calculateDistance(List<ORSCoordinate> routeCoordinates) {
    double distance = 0;
    for (int i = 0; i < routeCoordinates.length - 1; i++) {
      distance += Geolocator.distanceBetween(
        routeCoordinates[i].latitude,
        routeCoordinates[i].longitude,
        routeCoordinates[i + 1].latitude,
        routeCoordinates[i + 1].longitude,
      );
    }
    print(distance / 1000);
    return distance / 1000; // Convert meters to kilometers
  }

  double calculateEstimatedTime(double distance) {
    double walkingSpeed = 5.0; // Average walking speed in km/h
    print((distance / walkingSpeed) * 60);
    return (distance / walkingSpeed) * 60; // Convert hours to minutes
  }

  @override
  void initState() {
    super.initState();
    getLatituteLongitude();

    // Add a marker for the destination
    _markers.add(
      Marker(
        markerId: const MarkerId('DestinationId'),
        position: LatLng(widget.lat, widget.long),
        infoWindow: const InfoWindow(title: 'Destination'),
        icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueGreen),
      ),
    );

    // Add a marker for the current location (start position)
    _markers.add(
      Marker(
        markerId: const MarkerId('CurrentLocationId'),
        position: LatLng(startLat, startLong), // Use the current position here
        infoWindow: const InfoWindow(
            title: 'Current Location'), // You can customize the marker icon
      ),
    );

    _defaultPosition = CameraPosition(
      target: LatLng(widget.pos.latitude, widget.pos.longitude),
      zoom: 16.5,
    );
  }

  @override
  Widget build(BuildContext context) {
    double distance =
        routePolyline != null ? calculateDistance(routeCoordinates) : 0.0;
    double estimatedTime =
        routePolyline != null ? calculateEstimatedTime(distance) : 0.0;
    return Scaffold(
      body: Stack(
        children: [
          GoogleMap(
            initialCameraPosition: _defaultPosition,
            markers: _markers,
            // zoomControlsEnabled: false,
            onMapCreated: (GoogleMapController controller) {
              _controller.complete(controller);
            },
            polylines: routePolyline != null
                ? <Polyline>{routePolyline!} // Added null check and ! operator
                : <Polyline>{},
          ),
          Positioned(
            top: getProportionateScreenHeight(50),
            left: 0,
            child: MaterialButton(
              onPressed: () {
                Get.back();
              },
              color: Color.fromARGB(67, 176, 42, 37),
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
          Column(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    margin: const EdgeInsets.only(bottom: 50),
                    padding: const EdgeInsets.symmetric(
                      vertical: 6.0,
                      horizontal: 12.0,
                    ),
                    decoration: BoxDecoration(
                      color: kPrimaryColor,
                      borderRadius: BorderRadius.circular(20.0),
                      boxShadow: const [
                        BoxShadow(
                          color: Colors.black26,
                          offset: Offset(0, 2),
                          blurRadius: 50.0,
                        )
                      ],
                    ),
                    child: Text(
                      '${estimatedTime.toStringAsFixed(0)} min, ${distance.toStringAsFixed(2)} km',
                      style:
                          const TextStyle(fontSize: 18.0, color: Colors.white),
                    ),
                  ),
                ],
              ),
            ],
          )
        ],
      ),
    );
  }
}
