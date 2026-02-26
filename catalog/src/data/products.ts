export interface Product {
  id: string
  name: string
  price: string
  description: string
  image: string
}

export const PRODUCTS: Product[] = [
  { id: '1', name: '$50 Assortment Bag', price: '$50.00', description: '9 items', image: '/images/products/featured/assortment-bag-50.png' },
  { id: '2', name: '$75 Assortment Bag', price: '$75.00', description: '14 items', image: '/images/products/featured/assortment-bag-75.png' },
  { id: '3', name: '$100 Assortment Bag', price: '$100.00', description: '18 items', image: '/images/products/featured/assortment-bag-100.png' },
  { id: '4', name: "Libby's Vienna Sausages", price: '$0.80', description: '4.6 oz - 1 can', image: '/images/products/meat-seafood/vienna-sausages-product.png' },
  { id: '5', name: 'Goya tomato sauce', price: '$0.80', description: '8 oz', image: '/images/products/featured/assortment-bag-50.png' },
  { id: '6', name: 'Goya black beans', price: '$1.10', description: '15.5 oz', image: '/images/products/featured/assortment-bag-50.png' },
  { id: '7', name: 'Bananas', price: '$1.60', description: '3 lbs', image: '/images/products/produce/bananas-product.png' },
  { id: '8', name: 'Barilla spaghetti', price: '$2.70', description: '2 lbs', image: '/images/products/featured/assortment-bag-50.png' },
  { id: '9', name: 'Sliced Bacon', price: '$3.60', description: '1 lb', image: '/images/products/meat-seafood/sliced-bacon-product.png' },
  { id: '10', name: 'Red Apples', price: '$5.30', description: '4 lbs', image: '/images/products/produce/red-apples-product.png' },
  { id: '11', name: "Hellmann's mayonnaise", price: '$5.60', description: '25 oz', image: '/images/products/featured/assortment-bag-50.png' },
  { id: '12', name: 'Mandarin Oranges', price: '$7.40', description: '5 lbs', image: '/images/products/produce/mandarin-oranges-product.png' },
  { id: '13', name: 'Green Seedless Grapes', price: '$9.50', description: '4 lbs', image: '/images/products/produce/green-seedless-grapes-product.png' },
  { id: '14', name: 'Jumbo Uncooked Shrimp', price: '$11.10', description: '1.5 lbs', image: '/images/products/meat-seafood/jumbo-shrimp-product.png' },
  { id: '15', name: 'Beef Hot Dogs', price: '$14.70', description: '28 franks (3.5 lbs)', image: '/images/products/meat-seafood/beef-hot-dogs-product.png' },
]
