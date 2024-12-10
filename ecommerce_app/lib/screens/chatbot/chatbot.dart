import 'package:dialog_flowtter/dialog_flowtter.dart';
import 'package:flutter/material.dart';
import 'package:shop_app/constants.dart';
import 'package:shop_app/size_config.dart';
import '../../globals.dart';
import '../../models/Chats.dart';
import 'components/messages.dart';

class ChatBot extends StatefulWidget {
  static final String routeName = '/chatbot';

  const ChatBot({super.key});

  @override
  State<ChatBot> createState() => _ChatBotState();
}

class _ChatBotState extends State<ChatBot> {
  late DialogFlowtter dialogFlowtter;
  final _controller = new TextEditingController();
  var _enteredMessage = '';
  List<Chat> messages = [];

  @override
  void initState() {
    DialogFlowtter.fromFile().then((instance) => dialogFlowtter = instance);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('BharatUdyog Chatbot',
            style: TextStyle(
                color: kPrimaryColor,
                fontSize: getProportionateScreenHeight(20),
                fontFamily: 'Poppins',
                fontWeight: FontWeight.bold)),
      ),
      body: Container(
        child: Column(
          children: [
            Expanded(child: MessagesScreen(messages)),
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
                        setState(() {
                          _enteredMessage = value;
                        });
                      },
                    ),
                  ),
                  IconButton(
                    color: kPrimaryColor,
                    icon: Icon(Icons.send),
                    onPressed: () {
                      if (!_enteredMessage.trim().isEmpty) {
                        sendMessage(_controller.text);
                        _controller.clear();
                      }
                    },
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  sendMessage(String text) async {
    if (text.isEmpty) {
      print('Empty Text!');
    } else {
      setState(() {
        addMessage(text, currentUserId);
      });

      DetectIntentResponse response = await dialogFlowtter.detectIntent(
        queryInput: QueryInput(text: TextInput(text: text)),
      );
      if (response.message == null) return;
      setState(() {
        addMessage(
            response.message?.text!.text?[0] ?? "can't understand", "bot");
      });
    }
  }

  addMessage(String message, String bot) {
    messages.add(Chat(
        createdAt: DateTime.now().toString(),
        createdBy: bot,
        message: message));
  }
}
