import { Brand } from "../../shared/interfaces/brand"
import { Category } from "../../shared/interfaces/category"

export interface ProductPage {
    results: number
    metadata: Metadata
    data: Product[]
  }
  
  export interface Metadata {
    currentPage: number
    numberOfPages: number
    limit: number
    prevPage: number
  }
  
  export interface Product {
    sold: number
    images: string[]
    subcategory: Subcategory[]
    ratingsQuantity: number
    _id: string
    title: string
    slug: string
    description: string
    quantity: number
    price: number
    availableColors: any[]
    imageCover: string
    category: Category
    brand: Brand
    ratingsAverage: number
    createdAt: string
    updatedAt: string
    id: string
    priceAfterDiscount?: number
  }
  
  export interface Subcategory {
    _id: string
    name: string
    slug: string
    category: string
  }
  
  
  
 