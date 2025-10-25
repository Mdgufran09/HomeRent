const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/auth.js");
const listingRoutes = require("./routes/listing.js");
const bookingRoutes = require("./routes/booking.js");
const userRoutes = require("./routes/user.js");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL, { dbName: "homerent" })
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => console.log(`❌ MongoDB connection failed: ${err}`));

// Test route to create a sample listing
app.get("/test-listing", async (req, res) => {
  try {
    const testListing = new Listing({
      creator: "653fa1eb074498c5ce62f106", // You'll need to replace this with a valid user ID
      category: "Beach",
      type: "Entire place",
      streetAddress: "123 Test Street",
      aptSuite: "Apt 1",
      city: "Test City",
      province: "Test Province",
      country: "Test Country",
      guestCount: 2,
      bedroomCount: 1,
      bedCount: 1,
      bathroomCount: 1,
      amenities: ["Wifi", "Kitchen"],
      listingPhotoPaths: ["public/uploads/test.jpg"],
      title: "Test Beach House",
      description: "A beautiful test listing",
      highlight: "Great Location",
      highlightDesc: "Perfect for a getaway",
      price: 100
    });

    await testListing.save();
    res.json({ message: "Test listing created", listing: testListing });
  } catch (err) {
    console.error("Error creating test listing:", err);
    res.status(500).json({ error: err.message });
  }
});
