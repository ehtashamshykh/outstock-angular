export interface ICategoriesType {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  children: ICategoriesType[];
}