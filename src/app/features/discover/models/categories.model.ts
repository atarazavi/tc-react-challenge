export interface CategoriesApiResponse {
    categories: Categories;
}
interface Categories {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: CategoryItem[];
}
export interface CategoryItem {
    href: string;
    icons: Icon[];
    id: string;
    name: string;
}
interface Icon {
    height: number | null;
    url: string;
    width: number | null;
}
