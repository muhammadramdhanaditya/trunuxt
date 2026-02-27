export interface CategoryChild {
  id: number;
  name: string;
  url: string;
  children: CategoryChild[]; // Recursive untuk nested categories
}

// Interface untuk category products
export interface ProductCategory {
  id: number;
  name: string;
  url: string;
  children: CategoryChild[];
}

// Interface untuk brand
export interface Brand {
  id: number;
  name: string;
  url: string;
  children: [];
}

// Interface untuk services - man power
export interface ManPowerService {
  id: number;
  name: string;
  url: string;
  children: CategoryChild[];
}

// Interface untuk services - rental
export interface RentalService {
  id: number;
  name: string;
  url: string;
  children: CategoryChild[];
}

// Interface untuk services container
export interface Services {
  man_power: ManPowerService[];
  rental: RentalService[];
}

// Interface utama untuk category payload
export interface CategoryPayload {
  category: {
    products: ProductCategory[];
    brands: Brand[];
  };
  services: Services;
}

// Interface untuk response API
export interface CategoryResponse {
  status: boolean;
  message: string;
  payload: CategoryPayload;
}

// Type guard untuk mengecek tipe category
export const isProductCategory = (
  category: any
): category is ProductCategory => {
  return "children" in category && Array.isArray(category.children);
};

export const isBrand = (brand: any): brand is Brand => {
  return "children" in brand && brand.children.length === 0;
};

// Helper type untuk flattened category (untuk dropdown, dll)
export interface FlattenedCategory {
  id: number;
  name: string;
  url: string;
  path: string; // Untuk breadcrumb, contoh: "Pelumas > GREASE"
  level: number;
  parentId?: number;
  type: "product" | "brand" | "man_power" | "rental";
}

// Type untuk category yang sudah di-flatten (untuk keperluan UI)
export type FlatCategory = FlattenedCategory;
