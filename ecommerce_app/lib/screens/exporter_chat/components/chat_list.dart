import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/material.dart';
import 'package:shop_app/components/empty_lottie.dart';
import 'package:shop_app/screens/exporter_chat/components/chat_list_item.dart';
import 'package:shop_app/word_in_languages.dart';

import '../../../globals.dart';
import '../../../size_config.dart';

class ChatList extends StatelessWidget {
  final DatabaseReference dbReference = FirebaseDatabase.instance.ref();
  ChatList({super.key});

  List<Map<dynamic, dynamic>> chats = [];
  List<Map<String, String>> exporterDetails = [];

  @override
  Widget build(BuildContext context) {
    return StreamBuilder(
        stream: dbReference.child("consumers").child("$currentUserId").onValue,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            DataSnapshot? data = snapshot.data?.snapshot;

            exporterDetails = [];

            if (data?.value != null) {
              Map<dynamic, dynamic> d = data?.value as Map<dynamic, dynamic>;

              print(d);
              d.keys.toList().forEach((element) async {
                String id = element.toString().substring(0, 24);
                String name = element.toString().substring(24);
                print(name + " " + id);
                exporterDetails.add({
                  'id': id,
                  'latestMsg': d[element].toString(),
                  'name': name,
                });
              });

              exporterDetails
                  .sort((a, b) => a['latestMsg']!.compareTo(b['latestMsg']!));

              return ListView.builder(
                  physics: BouncingScrollPhysics(),
                  itemCount: exporterDetails.length,
                  itemBuilder: (context, index) {
                    return ChatListItem(
                      id: exporterDetails[index]['id']!,
                      name: exporterDetails[index]['name']!,
                      date: exporterDetails[index]['latestMsg']!,
                      unseen: true,
                    );
                  });
            }

            return Container(
              margin: EdgeInsets.only(
                  top: getProportionateScreenHeight(80),
                  left: getProportionateScreenWidth(15),
                  right: getProportionateScreenWidth(15)),
              height: SizeConfig.screenHeight * 0.895,
              child: EmptySvg(
                  pathToAsset: "assets/empty_chats.svg",
                  heading: "No Chats with Exporters."),
            );
          }
          return Center(
            child: CircularProgressIndicator(),
          );
        });
  }
}
