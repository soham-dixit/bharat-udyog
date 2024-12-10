import 'package:flutter/material.dart';
import 'package:shop_app/globals.dart';
import 'package:shop_app/screens/chatbot/components/message_bubble.dart';

import '../../../models/Chats.dart';

class MessagesScreen extends StatefulWidget {
  final List<Chat> chatDocs;
  MessagesScreen(this.chatDocs);

  @override
  State<MessagesScreen> createState() => _MessagesScreenState();
}

class _MessagesScreenState extends State<MessagesScreen> {
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      physics: BouncingScrollPhysics(),
      itemCount: widget.chatDocs.length,
      itemBuilder: (ctx, i) => MessageBubble(
        widget.chatDocs[i].message,
        widget.chatDocs[i].createdBy == currentUserId, //vinay chakka
      ),
    );
  }
}
