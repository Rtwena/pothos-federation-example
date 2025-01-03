import { Selection } from '@pothos/plugin-federation'
import { builder } from './builder'
import stock from "../../data/stock.json";

type Cart = {
  id: string
  lineItems: LineItem[]
  lineItemsStock: LineItemStock[]
}

type LineItem = {
  id: string
  variant: Variant
}

type Variant = {
  sku: string
  stock: number
}

type LineItemStock = {
  sku: string
  stock: number
}

export const CartRef = builder.externalRef<Selection<{ id: string }>, Cart>('Cart', builder.selection('id')).implement({
  description: 'Cart',
  externalFields: (fieldBuilder) => ({
    lineItems: fieldBuilder.field({ type: [LineItemRef] }),
  }),
  fields: (fieldBuilder) => ({
    id: fieldBuilder.exposeID('id'),
    lineItemsStock: fieldBuilder.field({
      type: [LineItemStockRef],
      requires: builder.selection<{ lineItems: { variant: { sku: string } } }>('lineItems { variant { sku } }'),
      resolve: (cart) => {
        console.log({ cart: JSON.stringify(cart) }, 'Cart lineItemsStock')
        return cart.lineItems.map((lineItem) => ({
          sku: lineItem.variant.sku,
          stock: findStockLevel(lineItem.variant.sku) ?? 0,
        }))
      },
    }),
  }),
})

export const LineItemRef = builder.externalRef<Selection<{ id: string }>, LineItem>('LineItem', builder.selection('id')).implement({
  description: 'Line item',
  externalFields: (fieldBuilder) => ({
    id: fieldBuilder.id(),
    variant: fieldBuilder.field({ type: VariantRef }),
  }),
})

export const VariantRef = builder.externalRef<Selection<{ sku: string }>, Variant>('Variant', builder.selection('sku')).implement({
  description: 'Variant',
  externalFields: (fieldBuilder) => ({
    sku: fieldBuilder.id(),
  }),
  fields: (fieldBuilder) => ({
    stock: fieldBuilder.exposeInt('stock'),
  }),
})

export const LineItemStockRef = builder.externalRef<Selection<{ sku: string }>, LineItemStock>('LineItemStock', builder.selection('sku')).implement({
  description: 'Stock of a line item',
  fields: (fieldBuilder) => ({
    stock: fieldBuilder.exposeInt('stock'),
    sku: fieldBuilder.exposeID('sku'),
  }),
})


export const findStockLevel = (sku: string): number | undefined => stock.find((level) => level.sku === sku)?.stock
