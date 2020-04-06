import React from 'react';

import { CartItemContainer, ItemDetailsContainer, Name } from './cart-item.styles';

const CartItem = ({ item :  { imageUrl, price, name, quantity}}) => (
    <CartItemContainer>
        <img src={imageUrl} alt={name}/>
        <ItemDetailsContainer>
            <Name>{name}</Name>
            <span>{quantity} x {price}</span>
        </ItemDetailsContainer>
    </CartItemContainer>
);

export default CartItem;