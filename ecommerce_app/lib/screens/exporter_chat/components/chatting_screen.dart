import 'package:dialog_flowtter/dialog_flowtter.dart';
import 'package:flutter/material.dart';
import 'package:shop_app/backend/fetch_exporter.dart';
import 'package:shop_app/backend/send_message.dart';
import 'package:shop_app/constants.dart';
import 'package:shop_app/globals.dart';
import 'package:shop_app/models/Chats.dart';
import 'package:shop_app/screens/chatbot/components/messages.dart';
import 'package:shop_app/size_config.dart';
import 'package:firebase_database/firebase_database.dart';

class ChattingScreen extends StatefulWidget {
  ChattingScreen({this.receiverId = ''});
  String receiverId;
  static String routeName = "/chatting_screen";

  @override
  State<ChattingScreen> createState() => _ChattingScreenState();
}

class _ChattingScreenState extends State<ChattingScreen> {
  // late DialogFlowtter dialogFlowtter;
  // final DatabaseReference dbReference = FirebaseDatabase.instance.ref();
  final _controller = new TextEditingController();
  var _enteredMessage = '';
  List<Chat> messages = [];
  String receiverName = 'Exporter AI';
  String receiverId = '';
  bool isLoading = false;

  @override
  void initState() {
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
          child: Column(
        children: [
          !messages.isEmpty
              ? Expanded(child: MessagesScreen(messages))
              : Expanded(
                  child: Center(
                    child: Text("Contact to Exporter for more details"),
                  ),
                ),
          if (isLoading)
            Center(
              child: Text("Exported AI responding..."),
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
                    decoration: InputDecoration(hintText: 'Send Message'),
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
      )),
    );
  }

  sendMessage(String text) async {
    if (text.isEmpty) {
      print('empty');
    } else {
      setState(() {
        messages.add(Chat(
            createdAt: DateTime.now().toString(),
            createdBy: currentUserId,
            message: text));
        isLoading = true;
      });

      String response = await SendMessage.performHttpRequest(
        'POST',
        'askQuestion',
        widget.receiverId,
        text,
        context,
      );

      setState(() {
        messages.add(Chat(
            createdAt: DateTime.now().toString(),
            createdBy: "Exporter AI",
            message: response));
        isLoading = false;
      });
    }
  }
}
