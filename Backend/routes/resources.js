const router = require("express").Router();
const fs = require("fs");

// Helper function to calculate distance between two lat/lng points using Haversine formula
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in KM
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // distance in KM
}


router.get("/:radius", (req, res) => {
  try {
  const radius = parseFloat(req.params.radius) || 5; // default 5km
  const { lat, lng } = req.session;

  if (!lat || !lng) {
    return res.status(400).json({ error: "Location not set" });
  }

  if (fs.existsSync("data/shops.json")) {
    const shops = JSON.parse(fs.readFileSync("data/shops.json"));
  }

  const filteredShops = shops.filter(shop => {
    const distance = getDistance(lat, lng, shop.lat, shop.lng);
    return distance <= radius;
  });

  res.json(filteredShops);
} catch (err) {
  res.status(500).json({ error: "Failed to fetch resources", details: err.message });   
}
});

module.exports = router;