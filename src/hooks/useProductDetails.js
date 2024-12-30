import axios from "axios";
import { useEffect, useState } from "react";

const useProductDetails = (bookId) => {
  const [product, setProduct] = useState(null);
  const [sellerInfo, setSellerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductDetails = async () => {
    try {
      const productResponse = await axios.get(
        `http://localhost:5000/book/get-book-by-id/${bookId}`
      );
      const productData = productResponse?.data;
      setProduct(productData);

      const sellerResponse = await axios.get(
        `http://localhost:5000/user/get-user-by-id`,
        { headers: { id: productData?.seller } }
      );
      setSellerInfo(sellerResponse?.data);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching product details:", err);
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [bookId]);

  return { product, sellerInfo, loading, error };
};

export default useProductDetails;
