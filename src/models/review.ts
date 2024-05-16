export interface Review {
  _id?: string;
  title: string;
  content: string;
  stars: number;
  author: string; // Reference to the User collection
  place_id?: string; // Reference to the Place collection
  housing_id?: string; // Reference to the Housing collection
  review_deactivated?: boolean;
  creation_date?: Date;
  modified_date?: Date;
}
