import { axiosInstance } from "./axiosInstance";

export interface ListingFilterParams {
  name?: string;
  category?: string;
  state?: string;
  minPrice?: number;
  maxPrice?: number;
  minQuantity?: number;
  maxQuantity?: number;
  status?: "active" | "sold" | "paused";
  page?: number;
  limit?: number;
}

export interface CreateListingPayload {
  quantity: number;
  unit: string;
  price: number;
  description?: string;
  locationState?: string;
  locationLGA?: string;
  availability?: boolean;
}

export const listingService = {
  getAllListings: async (params?: ListingFilterParams) => {
    const response = await axiosInstance.get("/listings", { params });
    return response.data;
  },

  getListingById: async (listingId: number) => {
    const response = await axiosInstance.get(`/listings/${listingId}`);
    return response.data;
  },

  getPersonalListings: async (params?: ListingFilterParams) => {
    const response = await axiosInstance.get("/listings/personal", { params });
    return response.data;
  },

  createListing: async (productId: number, payload: CreateListingPayload) => {
    const response = await axiosInstance.post(
      `/products/${productId}/listing`,
      payload
    );
    return response.data;
  },

  updateListing: async (listingId: number, payload: Partial<CreateListingPayload> & { status?: string }) => {
    const response = await axiosInstance.patch(`/listings/${listingId}`, payload);
    return response.data;
  },

  deleteListing: async (listingId: number) => {
    const response = await axiosInstance.delete(`/listings/${listingId}`);
    return response.data;
  },
};
