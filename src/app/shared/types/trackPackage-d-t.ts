export interface ITrackPackage {
  estimatedDeliveryDate: string;
  events: IEvent[];
  orderId: string;
  shippingProvider: string;
  status: string;
  trackingNumber: string;
}

export interface IEvent {
  description: string;
  location: string;
  status: string;
  timestamp: string;
}
