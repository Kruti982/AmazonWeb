import React, { useContext, useEffect, useState } from "react";
import { Logincontext } from "../context/Contexprovider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Option = ({ deletedata, get, productPrice = 0 }) => {
  const { account, setAccount } = useContext(Logincontext);

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  // Update total price whenever quantity or product price changes
  useEffect(() => {
    const calculated = (productPrice || 0) * quantity;
    setTotalPrice(calculated);
  }, [quantity, productPrice]);

  // Handle item removal
  const removeData = async (id) => {
    try {
      const res = await fetch(`remove/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (res.status === 400 || !data) {
        console.error("Error while removing item");
      } else {
        setAccount(data);
        get(); // Refresh cart list
        toast.success("Item removed from cart 😃!", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Remove error:", error);
    }
  };

  return (
    <div className="add_remove_select" key={deletedata}>
      {/* Quantity Selector */}
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>

      {/* Delete Button */}
      <p onClick={() => removeData(deletedata)} style={{ cursor: "pointer" }}>
        Delete
      </p>

      <span>|</span>

      {/* Other Options */}
      <p className="forremovemedia">Save For Later</p>
      <span>|</span>
      <p className="forremovemedia">See More like this</p>

      {/* Display total price */}
      <p style={{ marginTop: "10px", fontWeight: "bold" }}>
        Total: ₹{Number.isNaN(totalPrice) ? "0.00" : totalPrice.toFixed(2)}
      </p>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Option;
