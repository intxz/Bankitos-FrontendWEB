export interface Place {
  _id?: string;
  title: string;
  content: string;
  author: string;
  reviews?: string[];
  rating: number;
  coords: {
    latitude: number;
    longitude: number;
  };
  photo: string;
  typeOfPlace: {
    bankito: boolean;
    public: boolean; //false = private true = public
    covered: boolean;
  };
  schedule: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  address: string;
  place_deactivated?: boolean;
  creation_date?: Date;
  modified_date?: Date;
}
