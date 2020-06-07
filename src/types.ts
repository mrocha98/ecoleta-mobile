export interface Item {
  id: number;
  title: string;
  image_url: string;
}

export interface Point {
  id: number;
  name: string;
  image: string;
  image_url: string;
  latitude: number;
  longitude: number;
}

export interface PointParams {
  uf: string;
  city: string;
}

export interface DetailParams {
  point_id: number;
}

export interface Data {
  point: {
    image: string;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: {
    title: string;
  }[];
}
