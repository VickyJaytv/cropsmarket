export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "CropsMarket API",
    version: "0.0.1",
    description:
      "Interactive REST API documentation for CropsMarket - an agricultural produce e-commerce platform linking farmers, buyers, and administrators.",
    contact: {
      name: "CropsMarket Engineering Team",
    },
  },
  servers: [
    {
      url: "http://localhost:8090",
      description: "Local Development Server",
    },
  ],
  tags: [
    { name: "Authentication", description: "User registration, authentication, and session management" },
    { name: "Categories", description: "Product category management" },
    { name: "Products", description: "Produce product catalog operations" },
    { name: "Listings", description: "Farmer crop marketplace listings" },
    { name: "Buyer Profile", description: "Buyer user profile management" },
    { name: "Farmer Profile", description: "Farmer user profile management" },
    { name: "Admin", description: "System administration and user oversight" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Provide JWT Bearer token in Authorization header",
      },
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "token",
        description: "HTTP-only cookie containing JWT authentication token",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          firstName: { type: "string", example: "John" },
          lastName: { type: "string", example: "Doe" },
          email: { type: "string", format: "email", example: "john.doe@example.com" },
          phoneNumber: { type: "string", example: "08012345678" },
          role: { type: "string", enum: ["buyer", "farmer", "admin"], example: "farmer" },
          accountType: { type: "string", enum: ["INDIVIDUAL", "BUSINESS"], example: "INDIVIDUAL" },
          createdAt: { type: "string", format: "date-time", example: "2026-08-12T10:00:00.000Z" },
          updatedAt: { type: "string", format: "date-time", example: "2026-08-12T10:00:00.000Z" },
        },
      },
      BuyerProfile: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          profilePicture: { type: "string", nullable: true, example: "/uploads/profiles/1723456789-123456789.png" },
          bio: { type: "string", nullable: true, example: "Bulk agricultural buyer from Lagos" },
          companyName: { type: "string", nullable: true, example: "AgroBuy Ltd" },
          state: { type: "string", example: "Lagos" },
          lga: { type: "string", example: "Ikeja" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      FarmerProfile: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          profilePicture: { type: "string", nullable: true, example: "/uploads/profiles/1723456789-987654321.jpg" },
          farmName: { type: "string", nullable: true, example: "Green Acres Farm" },
          address: { type: "string", nullable: true, example: "Plot 12 Farm Settlement Road" },
          state: { type: "string", example: "Oyo" },
          lga: { type: "string", example: "Ibadan North" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Category: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "Grains & Cereals" },
          slug: { type: "string", example: "grains-cereals-a1b2c3" },
          image: { type: "string", nullable: true, example: "https://example.com/grains.jpg" },
          isActive: { type: "boolean", example: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Product: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "Yellow Maize" },
          slug: { type: "string", example: "yellow-maize-x9y8z7" },
          description: { type: "string", nullable: true, example: "High quality yellow maize grains" },
          image: { type: "string", nullable: true, example: "/uploads/products/maize.jpg" },
          isActive: { type: "boolean", example: true },
          category: { $ref: "#/components/schemas/Category" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Listing: {
        type: "object",
        properties: {
          id: { type: "integer", example: 10 },
          quantity: { type: "number", example: 100 },
          unit: { type: "number", example: 1 },
          price: { type: "number", example: 15000 },
          description: { type: "string", nullable: true, example: "Freshly harvested dried yellow maize" },
          location: { type: "string", example: "Kano Central Market" },
          isAvailable: { type: "boolean", example: true },
          image: { type: "string", nullable: true, example: "/uploads/listing/listing-123.jpg" },
          status: { type: "string", enum: ["active", "sold", "paused"], example: "active" },
          product: { $ref: "#/components/schemas/Product" },
          farmer: { $ref: "#/components/schemas/FarmerProfile" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Pagination: {
        type: "object",
        properties: {
          total: { type: "integer", example: 45 },
          page: { type: "integer", example: 1 },
          limit: { type: "integer", example: 10 },
          totalPages: { type: "integer", example: 5 },
        },
      },
      ApiResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string", example: "Operation completed successfully" },
          data: { type: "object" },
        },
      },
      ApiError: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          message: {
            oneOf: [
              { type: "string", example: "Unauthorized" },
              { type: "array", items: { type: "string" }, example: ["Password must contain at least one number"] },
            ],
          },
        },
      },
      SignupRequest: {
        type: "object",
        required: ["firstName", "lastName", "email", "phoneNumber", "role", "accountType", "password"],
        properties: {
          firstName: { type: "string", minLength: 3, example: "John" },
          lastName: { type: "string", minLength: 3, example: "Doe" },
          email: { type: "string", format: "email", example: "john.doe@example.com" },
          phoneNumber: { type: "string", example: "08012345678", description: "Must be 11 digits starting with 0" },
          role: { type: "string", enum: ["buyer", "farmer"], example: "farmer" },
          accountType: { type: "string", enum: ["INDIVIDUAL", "BUSINESS"], example: "INDIVIDUAL" },
          password: { type: "string", minLength: 8, example: "Password123!" },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email", example: "john.doe@example.com" },
          password: { type: "string", example: "Password123!" },
        },
      },
      CreateCategoryRequest: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string", minLength: 4, example: "Grains & Cereals" },
          image: { type: "string", format: "uri", nullable: true, example: "https://example.com/grains.jpg" },
        },
      },
      UpdateCategoryRequest: {
        type: "object",
        properties: {
          name: { type: "string", minLength: 4, example: "Grains & Legumes" },
          image: { type: "string", format: "uri", nullable: true, example: "https://example.com/grains.jpg" },
        },
      },
      CreateListingRequest: {
        type: "object",
        required: ["quantity", "unit", "price", "location"],
        properties: {
          quantity: { type: "number", minimum: 0.1, example: 50 },
          unit: { type: "number", minimum: 1, example: 1 },
          price: { type: "number", minimum: 0.1, example: 12000 },
          description: { type: "string", maxLength: 500, example: "Fresh dried yellow maize" },
          location: { type: "string", example: "Ibadan Central Market" },
          status: { type: "string", enum: ["active", "sold", "paused"], example: "active" },
          image: { type: "string", format: "uri", nullable: true },
        },
      },
    },
  },
  paths: {
    "/api/v1/auth/signup": {
      post: {
        summary: "Register new user",
        description: "Creates a new buyer or farmer account. Role ADMIN is forbidden on public signup.",
        tags: ["Authentication"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SignupRequest" },
            },
          },
        },
        responses: {
          201: {
            description: "User registered successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "user signed up successfully" },
                    data: { $ref: "#/components/schemas/User" },
                  },
                },
              },
            },
          },
          400: { description: "Validation error or invalid input", content: { "application/json": { schema: { $ref: "#/components/schemas/ApiError" } } } },
          409: { description: "Email or phone number already registered", content: { "application/json": { schema: { $ref: "#/components/schemas/ApiError" } } } },
        },
      },
    },
    "/api/v1/auth/login": {
      post: {
        summary: "User login",
        description: "Authenticates user credentials and issues an HTTP-only token cookie.",
        tags: ["Authentication"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
            },
          },
        },
        responses: {
          200: {
            description: "Logged in successfully",
            headers: {
              "Set-Cookie": {
                schema: { type: "string", example: "token=jwt_token_value; Path=/; HttpOnly; Secure; SameSite=Strict" },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "user logged in successfully" },
                    data: { $ref: "#/components/schemas/User" },
                  },
                },
              },
            },
          },
          401: { description: "Invalid email or password", content: { "application/json": { schema: { $ref: "#/components/schemas/ApiError" } } } },
        },
      },
    },
    "/api/v1/auth/logout": {
      post: {
        summary: "User logout",
        description: "Logs out the authenticated user and clears authentication cookie.",
        tags: ["Authentication"],
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        responses: {
          200: { description: "Logged out successfully" },
          401: { description: "Unauthorized" },
        },
      },
    },
    "/api/v1/buyer/profile": {
      post: {
        summary: "Create buyer profile",
        description: "Creates buyer profile for authenticated BUYER role.",
        tags: ["Buyer Profile"],
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: ["state", "lga"],
                properties: {
                  profilePicture: { type: "string", format: "binary" },
                  bio: { type: "string", example: "Grain wholesaler" },
                  companyName: { type: "string", example: "AgroBuy Ltd" },
                  state: { type: "string", example: "Lagos" },
                  lga: { type: "string", example: "Ikeja" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Buyer profile created successfully" },
          400: { description: "Validation error or profile already exists" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden - Buyer role required" },
        },
      },
      get: {
        summary: "Get personal buyer profile",
        description: "Fetches profile for authenticated buyer.",
        tags: ["Buyer Profile"],
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        responses: {
          200: { description: "Profile fetched successfully" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden - Buyer role required" },
        },
      },
      patch: {
        summary: "Update buyer profile",
        description: "Updates buyer profile for authenticated buyer.",
        tags: ["Buyer Profile"],
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  profilePicture: { type: "string", format: "binary" },
                  bio: { type: "string" },
                  companyName: { type: "string" },
                  state: { type: "string" },
                  lga: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Profile updated successfully" },
          401: { description: "Unauthorized" },
        },
      },
    },
    "/api/v1/farmer/profile": {
      post: {
        summary: "Create farmer profile",
        description: "Creates farmer profile for authenticated FARMER role.",
        tags: ["Farmer Profile"],
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: ["address", "state", "lga"],
                properties: {
                  profilePicture: { type: "string", format: "binary" },
                  farmName: { type: "string", example: "Green Pastures Farm" },
                  address: { type: "string", example: "Farm Road 1" },
                  state: { type: "string", example: "Oyo" },
                  lga: { type: "string", example: "Ibadan North" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Farmer profile created successfully" },
          400: { description: "Validation error or profile already exists" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden - Farmer role required" },
        },
      },
      get: {
        summary: "Get personal farmer profile",
        description: "Fetches profile for authenticated farmer.",
        tags: ["Farmer Profile"],
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        responses: {
          200: { description: "Profile fetched successfully" },
          401: { description: "Unauthorized" },
        },
      },
      patch: {
        summary: "Update farmer profile",
        description: "Updates farmer profile for authenticated farmer.",
        tags: ["Farmer Profile"],
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  profilePicture: { type: "string", format: "binary" },
                  farmName: { type: "string" },
                  address: { type: "string" },
                  state: { type: "string" },
                  lga: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Profile updated successfully" },
          401: { description: "Unauthorized" },
        },
      },
    },
    "/api/v1/categories": {
      get: {
        summary: "Get categories",
        description: "Public endpoint to retrieve categories, optionally filtered by search term.",
        tags: ["Categories"],
        parameters: [
          { name: "q", in: "query", required: false, schema: { type: "string" }, description: "Search term for category name" },
        ],
        responses: {
          200: {
            description: "Categories fetched successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "category fetched successfully" },
                    data: { type: "array", items: { $ref: "#/components/schemas/Category" } },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create category",
        description: "Admin endpoint to create a new product category.",
        tags: ["Categories"],
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateCategoryRequest" },
            },
          },
        },
        responses: {
          201: { description: "Category created successfully" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden - Admin role required" },
          409: { description: "Category name already exists" },
        },
      },
    },
    "/api/v1/categories/{id}": {
      patch: {
        summary: "Update category",
        description: "Admin endpoint to update an existing category.",
        tags: ["Categories"],
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" }, description: "Category ID" },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UpdateCategoryRequest" },
            },
          },
        },
        responses: {
          200: { description: "Category updated successfully" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden - Admin role required" },
          404: { description: "Category not found" },
        },
      },
      delete: {
        summary: "Delete category",
        description: "Admin endpoint to delete a category. Fails if products are linked.",
        tags: ["Categories"],
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" }, description: "Category ID" },
        ],
        responses: {
          200: { description: "Category deleted successfully" },
          400: { description: "Category cannot be deleted while products exist" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden - Admin role required" },
          404: { description: "Category not found" },
        },
      },
    },
    "/api/v1/categories/{categoryId}/products": {
      post: {
        summary: "Create product under category",
        description: "Admin endpoint to create a product associated with a category.",
        tags: ["Products"],
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        parameters: [
          { name: "categoryId", in: "path", required: true, schema: { type: "integer" }, description: "Category ID" },
        ],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: ["name"],
                properties: {
                  productImage: { type: "string", format: "binary" },
                  name: { type: "string", minLength: 2, example: "Yellow Maize" },
                  description: { type: "string", example: "High grade yellow maize" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Product created successfully" },
          400: { description: "Invalid category ID or validation error" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden - Admin role required" },
          404: { description: "Category not found" },
        },
      },
    },
    "/api/v1/products": {
      get: {
        summary: "Get products catalog",
        description: "Public endpoint to retrieve products catalog with filtering and pagination.",
        tags: ["Products"],
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", default: 10, maximum: 100 } },
          { name: "q", in: "query", schema: { type: "string" }, description: "Search query for product name" },
          { name: "name", in: "query", schema: { type: "string" } },
          { name: "categoryId", in: "query", schema: { type: "integer" } },
          { name: "status", in: "query", schema: { type: "string", enum: ["active", "inactive"] } },
          { name: "isActive", in: "query", schema: { type: "boolean" } },
        ],
        responses: {
          200: {
            description: "Products fetched successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string" },
                    data: {
                      type: "object",
                      properties: {
                        products: { type: "array", items: { $ref: "#/components/schemas/Product" } },
                        pagination: { $ref: "#/components/schemas/Pagination" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/products/{productId}": {
      get: {
        summary: "Get product by ID",
        description: "Public endpoint to retrieve product details by ID.",
        tags: ["Products"],
        parameters: [
          { name: "productId", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          200: { description: "Product fetched successfully" },
          404: { description: "Product not found" },
        },
      },
    },
    "/api/v1/products/{id}": {
      patch: {
        summary: "Update product",
        description: "Admin endpoint to update product details or image.",
        tags: ["Products"],
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  productImage: { type: "string", format: "binary" },
                  name: { type: "string" },
                  description: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Product updated successfully" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden - Admin role required" },
          404: { description: "Product not found" },
        },
      },
      delete: {
        summary: "Delete product",
        description: "Admin endpoint to delete product. Fails if listings are attached.",
        tags: ["Products"],
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          200: { description: "Product deleted successfully" },
          400: { description: "Cannot delete product while listings exist" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden - Admin role required" },
        },
      },
    },
    "/api/v1/products/{id}/toggle-status": {
      patch: {
        summary: "Toggle product active status",
        description: "Admin endpoint to enable/disable product in catalog.",
        tags: ["Products"],
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          200: { description: "Product status toggled successfully" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden - Admin role required" },
        },
      },
    },
    "/api/v1/products/{productId}/listing": {
      post: {
        summary: "Create listing for product",
        description: "Farmer endpoint to post a produce listing under a specific product.",
        tags: ["Listings"],
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        parameters: [
          { name: "productId", in: "path", required: true, schema: { type: "integer" } },
        ],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: ["quantity", "unit", "price", "location"],
                properties: {
                  image: { type: "string", format: "binary" },
                  quantity: { type: "number", example: 100 },
                  unit: { type: "number", example: 1 },
                  price: { type: "number", example: 15000 },
                  description: { type: "string", example: "Fresh dried yellow maize" },
                  location: { type: "string", example: "Kano Market" },
                  status: { type: "string", enum: ["active", "sold", "paused"], default: "active" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Listing created successfully" },
          400: { description: "Validation error or missing farmer profile" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden - Farmer role required" },
          404: { description: "Product not found" },
        },
      },
    },
    "/api/v1/listings": {
      get: {
        summary: "Get marketplace listings",
        description: "Public endpoint to retrieve marketplace listings with sorting, pagination, and location/price filters.",
        tags: ["Listings"],
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", default: 10, maximum: 100 } },
          { name: "name", in: "query", schema: { type: "string" } },
          { name: "status", in: "query", schema: { type: "string", enum: ["active", "sold", "paused"] } },
          { name: "minPrice", in: "query", schema: { type: "number" } },
          { name: "maxPrice", in: "query", schema: { type: "number" } },
          { name: "minQuantity", in: "query", schema: { type: "number" } },
          { name: "maxQuantity", in: "query", schema: { type: "number" } },
          { name: "state", in: "query", schema: { type: "string" } },
          { name: "lga", in: "query", schema: { type: "string" } },
          { name: "farmerId", in: "query", schema: { type: "integer" } },
          { name: "farmerName", in: "query", schema: { type: "string" } },
          { name: "sortBy", in: "query", schema: { type: "string", enum: ["price", "quantity", "createdAt"] } },
          { name: "sortOrder", in: "query", schema: { type: "string", enum: ["ASC", "DESC", "asc", "desc"] } },
        ],
        responses: {
          200: {
            description: "Listings fetched successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string" },
                    data: {
                      type: "object",
                      properties: {
                        listings: { type: "array", items: { $ref: "#/components/schemas/Listing" } },
                        pagination: { $ref: "#/components/schemas/Pagination" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/listings/personal": {
      get: {
        summary: "Get personal farmer listings",
        description: "Farmer endpoint to view their own posted listings.",
        tags: ["Listings"],
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", default: 10, maximum: 100 } },
          { name: "name", in: "query", schema: { type: "string" } },
          { name: "status", in: "query", schema: { type: "string", enum: ["active", "sold", "paused"] } },
          { name: "minPrice", in: "query", schema: { type: "number" } },
          { name: "maxPrice", in: "query", schema: { type: "number" } },
        ],
        responses: {
          200: { description: "Listings fetched successfully" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden - Farmer role required" },
        },
      },
    },
    "/api/v1/listings/{listingId}": {
      get: {
        summary: "Get listing by ID",
        description: "Public endpoint to retrieve single listing details by ID.",
        tags: ["Listings"],
        parameters: [
          { name: "listingId", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          200: { description: "Listing fetched successfully" },
          404: { description: "Listing not found" },
        },
      },
      patch: {
        summary: "Update listing",
        description: "Farmer (owner) or Admin endpoint to update listing price, quantity, or status.",
        tags: ["Listings"],
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        parameters: [
          { name: "listingId", in: "path", required: true, schema: { type: "integer" } },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateListingRequest" },
            },
          },
        },
        responses: {
          200: { description: "Listing updated successfully" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden - Not listing owner" },
          404: { description: "Listing not found" },
        },
      },
      delete: {
        summary: "Delete listing",
        description: "Farmer (owner) or Admin endpoint to delete a listing.",
        tags: ["Listings"],
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        parameters: [
          { name: "listingId", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          200: { description: "Listing deleted successfully" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden - Not listing owner" },
          404: { description: "Listing not found" },
        },
      },
    },
    "/api/v1/admin/users": {
      get: {
        summary: "Admin get all users",
        description: "Admin endpoint to list all registered system users with pagination. Excludes password hashes.",
        tags: ["Admin"],
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", default: 10, maximum: 100 } },
        ],
        responses: {
          200: {
            description: "Users fetched successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string" },
                    users: { type: "array", items: { $ref: "#/components/schemas/User" } },
                    pagination: { $ref: "#/components/schemas/Pagination" },
                  },
                },
              },
            },
          },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden - Admin role required" },
        },
      },
    },
    "/api/v1/admin/user/{id}": {
      get: {
        summary: "Admin get user details by ID",
        description: "Admin endpoint to retrieve full details for a user by ID.",
        tags: ["Admin"],
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          200: { description: "User fetched successfully" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden - Admin role required" },
          404: { description: "User not found" },
        },
      },
    },
    "/api/v1/admin/listings": {
      get: {
        summary: "Admin get all listings",
        description: "Admin endpoint to retrieve all marketplace listings.",
        tags: ["Admin"],
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", default: 10, maximum: 100 } },
        ],
        responses: {
          200: { description: "Listings fetched successfully" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden - Admin role required" },
        },
      },
    },
    "/api/v1/admin/listings/{listingId}": {
      delete: {
        summary: "Admin delete listing",
        description: "Admin endpoint to forcibly delete any marketplace listing by ID.",
        tags: ["Admin"],
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        parameters: [
          { name: "listingId", in: "path", required: true, schema: { type: "integer" } },
        ],
        responses: {
          200: { description: "Listing deleted successfully" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden - Admin role required" },
          404: { description: "Listing not found" },
        },
      },
    },
  },
};
