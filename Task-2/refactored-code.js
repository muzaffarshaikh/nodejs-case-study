app.get("/product/:productId", (req, res) => {
  const productId = req.params.productId;
  db.query(
    "SELECT * FROM products WHERE id = ?",
    [productId],
    (error, result) => {
      if (error) {
        console.error("Database query error:", error);
        return res.status(500).send("Internal Server Error");
      }

      if (result.length === 0) {
        return res.status(404).send("Product not found");
      }

      res.status(200).send(result);
    }
  );
});
