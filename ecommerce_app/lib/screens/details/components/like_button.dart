import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:shop_app/models/favorite.dart';

import '../../../models/Product.dart';
import '../../../size_config.dart';

class LikeButton extends StatefulWidget {
  LikeButton({
    super.key,
    required this.product,
  });

  Product product;

  @override
  State<LikeButton> createState() => _LikeButtonState();
}

class _LikeButtonState extends State<LikeButton> {
  bool isLike = false;

  @override
  void initState() {
    super.initState();
    isLike = widget.product.isFavourite;
  }

  @override
  void dispose() {
    super.dispose();
    // if it was true and now false
    if (widget.product.isFavourite && !isLike)
      FavItem.wishlist.add(FavItem(id: widget.product.id));

    // if it was false and now true
    else if (isLike && !widget.product.isFavourite)
      FavItem.wishlist.removeWhere((prod) => prod.id == widget.product.id);

    // storing data to shared preferences
    FavItem.storedData();
  }

  _onTap() {
    setState(() {
      if (widget.product.isFavourite)
        widget.product.isFavourite = false;
      else
        widget.product.isFavourite = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.centerRight,
      child: InkWell(
        onTap: _onTap,
        child: Container(
          padding: EdgeInsets.all(getProportionateScreenWidth(15)),
          width: getProportionateScreenWidth(64),
          decoration: BoxDecoration(
            color: widget.product.isFavourite
                ? Color(0xFFFFE6E6)
                : Color(0xFFF5F6F9),
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(20),
              bottomLeft: Radius.circular(20),
            ),
          ),
          child: SvgPicture.asset(
            "assets/icons/Heart Icon_2.svg",
            color: widget.product.isFavourite
                ? Color(0xFFFF4848)
                : Color.fromARGB(255, 172, 175, 180),
            height: getProportionateScreenWidth(16),
          ),
        ),
      ),
    );
  }
}
