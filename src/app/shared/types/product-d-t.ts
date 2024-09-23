export interface IProduct {
  id: string;
  name: string;
  img: string;
  trending?: boolean;
  topRated?: boolean;
  recommended?: boolean;
  bestSeller?: boolean;
  new?: boolean;
  banner?: boolean;
  description?: string;
  shortdescription?: string;
  sku?: string;
  price:number;
  old_price?:number;
  discount?:number;
  rating?:number;
  status?:string;
  seller: string;
  quantity:number;
  related_images: string[];
  imageUrl: string;
  orderQuantity?: number;
  sizes: string[];
  weight?: number;
  dimension?: string;
  bigImg?: string;
  colors: string[];
  thumbImageUrl: string;
  thumbImg: string;
  smDesc: string;
  shortDescription: string;
  banner_img?: string;
  bannerImageUrl?: string;
  parentCategory: string;
  category: string;
  brand: string;
  title: string;
  additionalDetails: string[],
  details: {
    details_text: string;
    details_list: string[];
    details_text_2: string;
};
reviews:{
  img: string;
  name: string;
  time: string;
  rating: number;
  review_desc: string;
}[]
}

export interface ICartProduct {
productId: string;
quantity: number;
product: {
  id: string;
  sku: string;
  shortDescription: string;
  name: string;
  imageUrl: string;
  price: number
}
}

interface IReviewerType {
id: string;
name: string;
imageUrl: string;
}

export interface IReviewType {
id: string;
imageUrls: string | null;
productId: string;
rating: number;
reviewText: string;
reviewer: IReviewerType;
}
export interface IWishlistProduct {
productId: string;
addedDate: string;
product: {
  id: string;
  sku: string;
  shortDescription: string;
  name: string;
  imageUrl: string;
  price: number
}
}
