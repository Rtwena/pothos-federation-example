import { builder } from '../builder'
import { CartRef } from '../schema'
import { fetchCart } from '../datasources/fetch-cart'

// This is where we define the query and resolver
builder.queryField('cart', (t) =>
  t.field({
    type: CartRef,
    args: {
      cartId: t.arg.string({ required: true }),
    },
    resolve: async (_root, { cartId }) => fetchCart(cartId),
  }),
)
