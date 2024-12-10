import 'package:dialog_flowtter/dialog_flowtter.dart';
import 'package:flutter/material.dart';
import 'package:shop_app/backend/fetch_exporter.dart';
import 'package:shop_app/constants.dart';
import 'package:shop_app/globals.dart';
import 'package:shop_app/models/Chats.dart';
import 'package:shop_app/screens/chatbot/components/messages.dart';
import 'package:shop_app/size_config.dart';
import 'package:firebase_database/firebase_database.dart';

class ChattingScreen extends StatefulWidget {
  ChattingScreen({this.receiverId = '', this.receiverName = ''});
  String receiverId;
  String receiverName;
  static String routeName = "/chatting_screen";

  @override
  State<ChattingScreen> createState() => _ChattingScreenState();
}

class _ChattingScreenState extends State<ChattingScreen> {
  late DialogFlowtter dialogFlowtter;
  final DatabaseReference dbReference = FirebaseDatabase.instance.ref();
  final _controller = new TextEditingController();
  var _enteredMessage = '';
  List<Chat> messages = [];
  String receiverName = '';
  String receiverId = '';

  @override
  void initState() {
    receiverName = widget.receiverName;
    if (widget.receiverName.isEmpty) getExporterDetails();
    print(widget.receiverId);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(receiverName.isEmpty ? "Exporter" : receiverName,
            style: TextStyle(
                color: kPrimaryColor,
                fontSize: getProportionateScreenHeight(20),
                fontFamily: 'Poppins',
                fontWeight: FontWeight.bold)),
      ),
      body: Container(
        child: StreamBuilder(
            stream: dbReference
                .child("allchats")
                .child("$currentUserId${widget.receiverId}")
                .onValue,
            builder: (context, snapshot) {
              print(widget.receiverId);
              bool isdata = false;
              if (snapshot.hasData) {
                DataSnapshot? data = snapshot.data?.snapshot;
                messages = [];


                print(data);
                if (data?.value != null) {
                  Map<dynamic, dynamic> d =
                      data?.value as Map<dynamic, dynamic>;
                  d.forEach((key, value) => messages.add(Chat(
                        createdAt: value['createdAt'],
                        createdBy: value['createdBy'],
                        message: value['message'],
                      )));

                  messages.sort((a, b) => a.createdAt.compareTo(b.createdAt));
                  isdata = true;
                }
                return Column(
                  children: [
                    isdata
                        ? Expanded(child: MessagesScreen(messages))
                        : Expanded(
                          child: Center(
                              child: Text("Contact to Exporter for more details"),
                            ),
                        ),
                    Container(
                      margin: EdgeInsets.only(top: 8),
                      padding: EdgeInsets.all(8),
                      child: Row(
                        children: [
                          Expanded(
                            child: TextField(
                              autocorrect: true,
                              enableSuggestions: true,
                              textCapitalization: TextCapitalization.sentences,
                              controller: _controller,
                              decoration:
                                  InputDecoration(hintText: 'Send Message'),
                              onChanged: (value) {
                                // setState(() {
                                _enteredMessage = value;
                                // });
                              },
                            ),
                          ),
                          IconButton(
                            color: kPrimaryColor,
                            icon: Icon(Icons.send),
                            onPressed: () {
                              if (_enteredMessage.trim().isNotEmpty) {
                                sendMessage(_controller.text);
                                _controller.clear();
                              }
                            },
                          )
                        ],
                      ),
                    ),
                  ],
                );
              }
              if (snapshot.hasError)
                return Center(
                  child: CircularProgressIndicator(),
                );
              return Center(
                child: CircularProgressIndicator(),
              );
            }),
      ),
    );
  }

  sendMessage(String text) async {
    if (text.isEmpty) {
      print('empty');
    } else {
      var newmessage = {
        'createdBy': currentUserId,
        'createdAt': DateTime.now().toString(),
        'message': text,
      };

      String currentuserchatid = "$currentUserId$currentUserName";
      String exporterchatid = "${widget.receiverId}$receiverName";

      dbReference
          .child("allchats")
          .child("$currentUserId${widget.receiverId}")
          .push()
          .update(newmessage)
          .then((value) async {
        // fetching data and adding curret data
        DataSnapshot data =
            await dbReference.child("consumers").child("$currentUserId").get();
        var d = data.value as Map<dynamic, dynamic>;
        d[exporterchatid] = DateTime.now().toString();

        // adding current data
        dbReference
            .child("consumers")
            .child("$currentUserId")
            .set(d)
            .then((value) {
          dbReference
              .child("exporters")
              .child("${widget.receiverId}")
              .update({"$currentuserchatid": DateTime.now().toString()});
        });
      });
    }
  }

  Future<void> getExporterDetails() async {
    dynamic response = await FetchExporter.performHttpRequest(
      'GET',
      'exporter/getExporterDetails/',
      widget.receiverId,
    );

    if (response.isNotEmpty) {
      receiverName = response['companyName'];
      print(receiverName);
    }
  }
}
