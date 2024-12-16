export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface JsonApiData {
  id: string;
  type: string;
  attributes: {
    title: string;
    field_price: {
      value: number;
    };
    field_description: {
      value: string;
    };
    field_image?: {
      uri?: {
        url: string;
      };
    };
  };
}

export interface JsonApiResponse {
  data: JsonApiData[];
  included?: any[];
  meta?: any;
  links?: any;
}