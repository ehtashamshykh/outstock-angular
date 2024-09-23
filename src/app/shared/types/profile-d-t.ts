export interface IProfileType {
  firstName?: string;
  lastName?: string;
  email?: string;
  id?: string;
  phoneNumber?: string;
  addresses: IAddress[];
  paymentMethods: IPaymentMethod[];
}

interface IAddress {
  id: string;
  addressLine1: string;
  addressLine2?: string;
  addressType: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  customerId?: string | null;
}

export interface IPaymentMethod {
  accountNumber: string;
  id: string;
  expirationDate: string;
  provider: string;
  paymentType: string;
}

export interface IOrder {
  orderNumber: string;
  productName: string;
  quantity: number;
  price: number;
  status: string;
  id: string;
  orderItems? : any[];
}

export interface IOrderItem {
  productName: string;
  quantity: number;
  productId: string;
  product: any;
  totalPrice: number;
}
