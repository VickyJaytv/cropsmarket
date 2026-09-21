import bcrypt from "bcrypt";
import { FarmerProfile } from "../entities/FarmerProfile.js";
import { Category } from "../entities/Category.js";
import { Product } from "../entities/Product.js";
import { UserRepository } from "../repositories/user.repository.js";
import { BuyerProfileRepository } from "../repositories/buyerProfile.repository.js";
import { FarmerProfileRepository } from "../repositories/farmerProfile.repository.js";
import { CategoryRepository } from "../repositories/category.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";
import { ListingRepository } from "../repositories/listing.repository.js";
import { Role, AccountType, ListingStatus } from "../enums/enums.js";

export const seedMockData = async () => {
  console.log("🌱 Starting full database seed...");

  // Default common password for test accounts
  const testPassword = await bcrypt.hash("CropsMarket123@", 12);

  // 1. Get or Ensure Admin User
  let admin = await UserRepository.findOne({ where: { role: Role.ADMIN } });
  if (!admin) {
    admin = UserRepository.create({
      firstName: process.env.ADMIN_FIRST_NAME || "Super",
      lastName: process.env.ADMIN_LAST_NAME || "Admin",
      email: process.env.ADMIN_EMAIL || "admin@cropsmarket.com",
      phoneNumber: process.env.ADMIN_PHONE_NUMBER || "08000000000",
      password: testPassword,
      role: Role.ADMIN,
      accountType: AccountType.INDIVIDUAL,
    });
    admin = await UserRepository.save(admin);
    console.log("  ✅ Admin user ensured:", admin.email);
  }

  // 2. Seed Buyer Users and Profiles
  const buyersData = [
    {
      user: {
        firstName: "Chioma",
        lastName: "Okonjo",
        email: "chioma@goldenflour.ng",
        phoneNumber: "08031112233",
        role: Role.BUYER,
        accountType: AccountType.BUSINESS,
      },
      profile: {
        companyName: "Golden Flour Mills Ltd",
        bio: "Wholesale procurement director for industrial grain processing in Lagos and Ogun.",
        state: "Lagos",
        lga: "Ikeja",
      },
    },
    {
      user: {
        firstName: "Tunde",
        lastName: "Bakare",
        email: "tunde@agrodistributors.ng",
        phoneNumber: "08034445566",
        role: Role.BUYER,
        accountType: AccountType.INDIVIDUAL,
      },
      profile: {
        companyName: "Bakare Food Logistics",
        bio: "Sourcing premium tubers and vegetables for supermarkets and hospitality chains in Abuja.",
        state: "FCT - Abuja",
        lga: "Municipal",
      },
    },
  ];

  for (const item of buyersData) {
    let user = await UserRepository.findOne({
      where: { email: item.user.email },
    });
    if (!user) {
      user = UserRepository.create({
        ...item.user,
        password: testPassword,
      });
      user = await UserRepository.save(user);
    }

    let profile = await BuyerProfileRepository.findOne({
      where: { user: { id: user.id } },
    });
    if (!profile) {
      profile = BuyerProfileRepository.create({
        ...item.profile,
        user,
      });
      await BuyerProfileRepository.save(profile);
    }
    console.log(`  ✅ Buyer seeded: ${user.firstName} ${user.lastName} (${item.profile.companyName})`);
  }

  // 3. Seed Farmer Users and Profiles
  const farmersData = [
    {
      user: {
        firstName: "Ibrahim",
        lastName: "Danjuma",
        email: "ibrahim@danjumafarms.ng",
        phoneNumber: "08023334455",
        role: Role.FARMER,
        accountType: AccountType.BUSINESS,
      },
      profile: {
        farmName: "Danjuma Grain Belt Enterprises",
        address: "Plot 14 Agro-Industrial Layout, Zaria Road",
        state: "Kano",
        lga: "Kano Municipal",
      },
    },
    {
      user: {
        firstName: "Adebayo",
        lastName: "Adeleke",
        email: "adebayo@greenacres.ng",
        phoneNumber: "08056667788",
        role: Role.FARMER,
        accountType: AccountType.INDIVIDUAL,
      },
      profile: {
        farmName: "Green Acres Commercial Farm",
        address: "Kilometer 8 Iseyin Road",
        state: "Oyo",
        lga: "Iseyin",
      },
    },
    {
      user: {
        firstName: "Emmanuel",
        lastName: "Ortom",
        email: "emmanuel@benueharvests.ng",
        phoneNumber: "08078889900",
        role: Role.FARMER,
        accountType: AccountType.BUSINESS,
      },
      profile: {
        farmName: "Benue Food Basket Co-op",
        address: "12 Makurdi-Gboko Express Way",
        state: "Benue",
        lga: "Makurdi",
      },
    },
  ];

  const farmerProfiles: FarmerProfile[] = [];

  for (const item of farmersData) {
    let user = await UserRepository.findOne({
      where: { email: item.user.email },
    });
    if (!user) {
      user = UserRepository.create({
        ...item.user,
        password: testPassword,
      });
      user = await UserRepository.save(user);
    }

    let profile = await FarmerProfileRepository.findOne({
      where: { user: { id: user.id } },
      relations: { user: true },
    });
    if (!profile) {
      profile = FarmerProfileRepository.create({
        ...item.profile,
        user,
      });
      profile = await FarmerProfileRepository.save(profile);
    }
    farmerProfiles.push(profile);
    console.log(`  ✅ Farmer seeded: ${user.firstName} ${user.lastName} (${item.profile.farmName})`);
  }

  // 4. Seed Categories (Created by Admin)
  const categoriesList = [
    { name: "Grains & Cereals", slug: "grains-cereals", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600" },
    { name: "Legumes & Oilseeds", slug: "legumes-oilseeds", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600" },
    { name: "Roots & Tubers", slug: "roots-tubers", image: "https://images.unsplash.com/photo-1590165482129-1b8b27698980?auto=format&fit=crop&q=80&w=600" },
    { name: "Fresh Vegetables", slug: "fresh-vegetables", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600" },
    { name: "Fruits & Cash Crops", slug: "fruits-cash-crops", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=600" },
  ];

  const categoryMap = new Map<string, Category>();

  for (const catData of categoriesList) {
    let cat = await CategoryRepository.findOne({ where: { slug: catData.slug } });
    if (!cat) {
      cat = CategoryRepository.create({
        name: catData.name,
        slug: catData.slug,
        image: catData.image,
        isActive: true,
        admin,
      });
      cat = await CategoryRepository.save(cat);
    }
    categoryMap.set(catData.slug, cat);
    console.log(`  ✅ Category seeded: ${cat.name}`);
  }

  // 5. Seed Products (Tied to Categories)
  const productsList = [
    {
      categorySlug: "grains-cereals",
      name: "Dry White Maize",
      slug: "dry-white-maize",
      description: "Grade A dry white maize with moisture <12%. Ideal for commercial flour milling and livestock feeds.",
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=600",
    },
    {
      categorySlug: "grains-cereals",
      name: "Yellow Maize",
      slug: "yellow-maize",
      description: "High-protein yellow maize grain sorted for poultry feed formulation and cereal production.",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600",
    },
    {
      categorySlug: "grains-cereals",
      name: "Paddy Rice (FARO 44)",
      slug: "paddy-rice-faro-44",
      description: "Freshly harvested long-grain paddy rice ready for industrial parboiling and milling.",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600",
    },
    {
      categorySlug: "grains-cereals",
      name: "Red Guinea Corn (Sorghum)",
      slug: "red-guinea-corn-sorghum",
      description: "Clean red sorghum for brewing, food manufacturing, and animal feeds.",
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=600",
    },
    {
      categorySlug: "legumes-oilseeds",
      name: "Soybeans (Commercial Grade)",
      slug: "soybeans-commercial-grade",
      description: "Cleaned high-oil content soybeans dried to 9.5% moisture. Perfect for edible oil extraction.",
      image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=600",
    },
    {
      categorySlug: "legumes-oilseeds",
      name: "White Cowpea (Iron Beans)",
      slug: "white-cowpea-iron-beans",
      description: "Fumigated, weevil-free large white beans ready for wholesale grocery dispatch.",
      image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&q=80&w=600",
    },
    {
      categorySlug: "roots-tubers",
      name: "Cassava Tubers (High Starch)",
      slug: "cassava-tubers-high-starch",
      description: "Freshly uprooted high-yield cassava tubers for starch factories and garri processing hubs.",
      image: "https://images.unsplash.com/photo-1590165482129-1b8b27698980?auto=format&fit=crop&q=80&w=600",
    },
    {
      categorySlug: "roots-tubers",
      name: "Benue White Yam Tubers",
      slug: "benue-white-yam-tubers",
      description: "Export quality large white yam tubers from the Benue river floodplains.",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=600",
    },
    {
      categorySlug: "fresh-vegetables",
      name: "Fresh Roma Tomatoes",
      slug: "fresh-roma-tomatoes",
      description: "Firm-skinned, deep red Roma tomatoes packed in standard 45kg crates for restaurant and retail buyers.",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600",
    },
    {
      categorySlug: "fresh-vegetables",
      name: "Red Bell Pepper (Tatase)",
      slug: "red-bell-pepper-tatase",
      description: "Freshly harvested thick-fleshed red bell peppers for wholesale produce markets.",
      image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&q=80&w=600",
    },
  ];

  const productMap = new Map<string, Product>();

  for (const prodData of productsList) {
    const category = categoryMap.get(prodData.categorySlug);
    if (!category) continue;

    let prod = await ProductRepository.findOne({ where: { slug: prodData.slug } });
    if (!prod) {
      prod = ProductRepository.create({
        name: prodData.name,
        slug: prodData.slug,
        description: prodData.description,
        image: prodData.image,
        isActive: true,
        category,
      });
      prod = await ProductRepository.save(prod);
    }
    productMap.set(prodData.slug, prod);
    console.log(`  ✅ Product seeded: ${prod.name}`);
  }

  // 6. Seed Listings (Tied to Farmers and Products)
  const listingsData = [
    {
      farmerIndex: 0, // Danjuma (Kano)
      productSlug: "dry-white-maize",
      quantity: 150,
      unit: 1, // Metric Ton / 50kg Bags
      price: 280000,
      location: "Kano Municipal, Kano State",
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=800",
      description: "Batch A certified dry white maize. Moisture tested at 11.8%. Weighbridge departure and truck loading ready.",
    },
    {
      farmerIndex: 0, // Danjuma (Kano)
      productSlug: "soybeans-commercial-grade",
      quantity: 80,
      unit: 1,
      price: 450000,
      location: "Zaria Road Agro Hub, Kano State",
      image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=800",
      description: "Cleaned industrial soybeans with 38% protein and under 9.5% moisture. Vetted for edible oil crushers.",
    },
    {
      farmerIndex: 1, // Adebayo (Oyo)
      productSlug: "cassava-tubers-high-starch",
      quantity: 300,
      unit: 1,
      price: 85000,
      location: "Iseyin, Oyo State",
      image: "https://images.unsplash.com/photo-1590165482129-1b8b27698980?auto=format&fit=crop&q=80&w=800",
      description: "Fresh high-starch TMS variety cassava tubers. Harvested within 24 hours of dispatch order confirmation.",
    },
    {
      farmerIndex: 1, // Adebayo (Oyo)
      productSlug: "fresh-roma-tomatoes",
      quantity: 200,
      unit: 1,
      price: 35000,
      location: "Ibadan North, Oyo State",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800",
      description: "Firm export grade fresh Roma tomatoes packed in ventilated 45kg wooden crates. Direct farm pickup available.",
    },
    {
      farmerIndex: 2, // Emmanuel (Benue)
      productSlug: "paddy-rice-faro-44",
      quantity: 500,
      unit: 1,
      price: 320000,
      location: "Makurdi, Benue State",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800",
      description: "FARO 44 whole grain long paddy rice from Benue river floodplains. Low chaff, dried to 12% moisture.",
    },
    {
      farmerIndex: 2, // Emmanuel (Benue)
      productSlug: "benue-white-yam-tubers",
      quantity: 1000,
      unit: 1,
      price: 2500,
      location: "Gboko Farm Hub, Benue State",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=800",
      description: "Large size premium white yam tubers (Pona & Laboko varieties) ready for wholesale market distribution.",
    },
  ];

  for (const item of listingsData) {
    const farmer = farmerProfiles[item.farmerIndex];
    const product = productMap.get(item.productSlug);

    if (!farmer || !product) continue;

    // Check if listing already exists for this farmer and product
    const existing = await ListingRepository.findOne({
      where: {
        farmer: { id: farmer.id },
        product: { id: product.id },
      },
    });

    if (!existing) {
      const listing = ListingRepository.create({
        product,
        farmer,
        quantity: item.quantity,
        unit: item.unit,
        price: item.price,
        location: item.location,
        image: item.image,
        description: item.description,
        isAvailable: true,
        status: ListingStatus.ACTIVE,
      });
      await ListingRepository.save(listing);
      console.log(`  ✅ Listing seeded: ${product.name} (₦${item.price.toLocaleString()}) by ${farmer.farmName}`);
    }
  }

  console.log("🎉 Database seeding completed successfully!");
};
