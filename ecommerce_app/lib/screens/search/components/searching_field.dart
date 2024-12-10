import 'package:flutter/material.dart';
import 'package:shop_app/globals.dart';
import 'package:shop_app/word_in_languages.dart';

import '../../../size_config.dart';
import '../../../constants.dart';

class SearchingField extends StatelessWidget {
  SearchingField({required this.updateBody, required this.previous});

  final Function updateBody;
  final TextEditingController _searchController = TextEditingController();
  String previous;

  void _onChanged(String text) {
    previous = text;
    updateBody(text);
  }

  void _onPressed() {
    previous = _searchController.text;
    FocusManager.instance.primaryFocus?.unfocus();
    updateBody(_searchController.text);
  }

  void _onClear() {
    _searchController.clear();
    previous = _searchController.text;
    updateBody(_searchController.text);
  }

  @override
  Widget build(BuildContext context) {
    _searchController.value = _searchController.value.copyWith(
      text: previous,
      selection: TextSelection.collapsed(offset: previous.length),
    );
    return Container(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          SizedBox(width: 8),
          IconButton(
            icon: Icon(Icons.arrow_back_rounded),
            onPressed: () => Navigator.pop(context),
          ),
          SizedBox(width: 3),
          Container(
            height: SizeConfig.screenHeight * 0.07,
            width: SizeConfig.screenWidth * 0.8,
            decoration: BoxDecoration(
              color: kSecondaryColor.withOpacity(0.1),
              borderRadius: BorderRadius.circular(15),
            ),
            child: TextField(
              onChanged: _onChanged,
              controller: _searchController,
              decoration: InputDecoration(
                focusedBorder: OutlineInputBorder(borderSide: BorderSide.none),
                enabledBorder: OutlineInputBorder(borderSide: BorderSide.none),
                hintText: searchProductTranslations[crntSlctdLan]!,
                suffixIcon: IconButton(
                  icon: Icon(Icons.clear),
                  onPressed: _onClear,
                ),
                prefixIcon: IconButton(
                  icon: Icon(
                    Icons.search,
                    color: kPrimaryColor,
                  ),
                  onPressed: _onPressed,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
