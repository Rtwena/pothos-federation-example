import { Selection } from '@pothos/plugin-federation'
import { builder } from './builder'
import { Cart, LineItem, Variant } from './datasources/fetch-cart'
import { canCheckout } from './resolvers'

// External graph types (schema output)
// Using externalRef here, even though the entity is defined and resolved by this service, because otherwise I can't set @external and @requires on the fields
export const CartRef = builder.externalRef<Selection<{ id: string }>, Cart>('Cart', builder.selection('id')).implement({
  description: 'Cart',
  externalFields: (fieldBuilder) => ({
    lineItemsStock: fieldBuilder.field({
      type: [LineItemStockRef],
    }),
  }),
  fields: (fieldBuilder) => ({
    id: fieldBuilder.exposeID('id'),
    lineItems: fieldBuilder.field({
      type: [LineItemRef],
      // LineItems come from the parent resolver that resolved cart (so like query Cart, mutation addLineItem, etc)
      resolve: (cart) => {
        console.log({ cart: JSON.stringify(cart) }, 'Cart lineItems')
        return cart.lineItems
      },
    }),
    canCheckout: fieldBuilder.boolean({
      requires: builder.selection<{ lineItemsStock: LineItemStock[] }>('lineItemsStock { stock sku }'),
      // Cart here only contains lineItemsStock, it should have everything else too, the resolvers above work (see log for field lineItems)
      resolve: (cart) => {
        console.log({ cart: JSON.stringify(cart) }, 'Cart canCheckout')
        return canCheckout(cart)
      },
    }),
  }),
})

// this will re-fetch the cart, which we don't want for `canCheckout`, since this service would have already fetched the cart
// builder.asEntity(CartRef, {
//   key: builder.selection<{ id: string }>('id'),
//   resolveReference: async ({ id }) => {
//     logger.info({ id }, 'Cart resolveReference')
//     return fetchCart(id)
//   },
// })

export const LineItemRef = builder.externalRef<Selection<{ id: string }>, LineItem>('LineItem', builder.selection('id')).implement({
  description: 'Line item',
  shareable: true,
  fields: (fieldBuilder) => ({
    id: fieldBuilder.exposeID('id'),
    productId: fieldBuilder.exposeString('productId'),
    sku: fieldBuilder.exposeString('sku'),
    quantity: fieldBuilder.exposeInt('quantity'),
    variant: fieldBuilder.field({
      type: VariantRef,
      resolve: (lineItem) => lineItem.variant,
    }),
  }),
})

export const VariantRef = builder.externalRef<Selection<{ sku: string }>, Variant>('Variant', builder.selection('sku')).implement({
  description: 'Variant',
  shareable: true,
  fields: (fieldBuilder) => ({
    sku: fieldBuilder.exposeID('sku'),
    size: fieldBuilder.exposeString('size'),
    price: fieldBuilder.exposeFloat('price'),
  }),
})

// could import from stock subgraph
export type LineItemStock = { sku: string; stock: number }

export const LineItemStockRef = builder.externalRef<Selection<{ sku: string }>, LineItemStock>('LineItemStock', builder.selection('sku')).implement({
  description: 'Stock of a line item',
  externalFields: (fieldBuilder) => ({
    stock: fieldBuilder.int(),
    sku: fieldBuilder.id(),
  }),
})


