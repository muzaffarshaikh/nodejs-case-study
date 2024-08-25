// This code is not refactored yet.
app.get("/product/:productId", (req, res) => {
  db.query(
    `SELECT * FROM products WHERE id=${req.params.productId}`,
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});
