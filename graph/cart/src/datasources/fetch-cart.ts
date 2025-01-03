import carts from '../../../data/carts.json'

// Internal Backend Types
export type Cart = {
  id: string
  userId: string
  lineItems: LineItem[]
}

export type LineItem = {
  id: string
  productId: string
  sku: string
  quantity: number
  variant: Variant
}

export type Variant = {
  sku: string
  size: string
  price: number
}


const cartSkeleton: Cart = {
  id: '',
  userId: '',
  lineItems: [],
}

export const fetchCart = async (id: string): Promise<Cart> => {
  return carts.find((cart) => cart.id === id) ?? cartSkeleton
}
