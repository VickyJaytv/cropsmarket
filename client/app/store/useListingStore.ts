import { create } from "zustand";

export interface ProduceListing {
  id: number;
  productId?: number;
  productName?: string;
  categoryName?: string;
  quantity: number;
  unit: string | number;
  price: number;
  description?: string | null;
  location?: string;
  locationState?: string;
  locationLGA?: string;
  availability?: boolean;
  isAvailable?: boolean;
  status?: "active" | "sold" | "paused";
  image?: string | null;
  product?: {
    id: number;
    name: string;
    description?: string | null;
    image?: string | null;
    category?: {
      id: number;
      name: string;
    };
  };
  farmer?: {
    id: number;
    name?: string;
    farmName?: string | null;
    phoneNumber?: string | null;
    state?: string | null;
    lga?: string | null;
    verified?: boolean;
    user?: {
      id: number;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      email: string;
    };
  };
  createdAt?: string;
  updatedAt?: string;
}

interface ListingState {
  // Marketplace Filters
  searchQuery: string;
  selectedCategory: string;
  selectedState: string;
  minPrice: number | null;
  maxPrice: number | null;
  currentPage: number;
  
  // Data
  listings: ProduceListing[];
  personalListings: ProduceListing[];
  isLoading: boolean;
  totalListings: number;
  
  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedState: (state: string) => void;
  setPriceRange: (min: number | null, max: number | null) => void;
  setCurrentPage: (page: number) => void;
  setListings: (listings: ProduceListing[], total?: number) => void;
  setPersonalListings: (listings: ProduceListing[]) => void;
  setIsLoading: (loading: boolean) => void;
  resetFilters: () => void;
}

export const useListingStore = create<ListingState>((set) => ({
  searchQuery: "",
  selectedCategory: "All",
  selectedState: "All",
  minPrice: null,
  maxPrice: null,
  currentPage: 1,
  
  listings: [],
  personalListings: [],
  isLoading: false,
  totalListings: 0,
  
  setSearchQuery: (searchQuery) => set({ searchQuery, currentPage: 1 }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory, currentPage: 1 }),
  setSelectedState: (selectedState) => set({ selectedState, currentPage: 1 }),
  setPriceRange: (minPrice, maxPrice) => set({ minPrice, maxPrice, currentPage: 1 }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  
  setListings: (listings, totalListings) => set({ listings, totalListings: totalListings ?? listings.length }),
  setPersonalListings: (personalListings) => set({ personalListings }),
  setIsLoading: (isLoading) => set({ isLoading }),
  
  resetFilters: () =>
    set({
      searchQuery: "",
      selectedCategory: "All",
      selectedState: "All",
      minPrice: null,
      maxPrice: null,
      currentPage: 1,
    }),
}));
