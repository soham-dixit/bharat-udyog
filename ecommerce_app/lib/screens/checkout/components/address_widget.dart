import 'package:flutter/material.dart';

import '../../../models/Address.dart';
import '../../../size_config.dart';

class AddressWidget extends StatelessWidget {
  AddressWidget(this.address, this.value, this.groupValue, this.onChanged);
  final int value;
  final int groupValue;
  final ValueChanged<int?> onChanged;

  final Address address;
  @override
  Widget build(BuildContext context) {
    return Container(
      width: SizeConfig.screenWidth,
      height: SizeConfig.screenHeight * 20 / 100,
      decoration: BoxDecoration(),
    );
  }
}
