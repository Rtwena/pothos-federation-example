import { LineItemStock } from '../schema'
import { Cart } from '../datasources/fetch-cart'

export type CanCheckoutCart = Cart & {
  lineItemsStock: { sku: string; stock: number }[]
}

export const canCheckout = async (cart: CanCheckoutCart): Promise<boolean> => {
  if (!cart.lineItems) throw new Error('No line items in cart')
  if (!cart.lineItemsStock) throw new Error('No line items stock in cart')
  // if (cart.lineItemsStock && cart.lineItems) {
  return !cart.lineItems.some((lineItem) => hasEnoughStock(lineItem, cart.lineItemsStock))
  // } else {
  //   return false
  // }
}

const hasEnoughStock = (lineItem: CanCheckoutCart['lineItems'][0], lineItemsStock: LineItemStock[]): boolean => {
  const lineItemQty = lineItem.quantity
  const lineItemStock = lineItemsStock.find((itemStock) => itemStock.sku == lineItem.sku) ?? { stock: 0 }
  return lineItemQty >= lineItemStock.stock
}
