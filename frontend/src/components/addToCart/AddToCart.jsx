import React, { useContext, useEffect, useState } from "react";
import "./AddToCart.css";
import { Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Logincontext } from "../context/Contexprovider";
import Navbar from "../Navbar/Navbar";
import NewNavbaar from "../newNavbaar/NewNavbaar";
import Footer from "../footer/Footer";

const AddToCart = () => {
  const context = useContext(Logincontext);
  const { account, setAccount } = context || {};
  console.log("Logincontext in AddToCart:", context);

  const { id } = useParams();

  console.log(id);
  const navigate = useNavigate();

  const [inddata, setInddata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartAdded, setCartAdded] = useState(false);

  const getinddata = async () => {
    try {
      const res = await fetch(`/getproductsone/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (res.status === 200 || data) {
        setInddata(data);
      } else {
        alert("No product data available.");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("Something went wrong while loading product details.");
    } finally {
      setLoading(false);
    }
  };
  console.log(inddata);

  useEffect(() => {
    getinddata();
  }, [id]);

  const addtocart = async (id) => {
    try {
      const res = await fetch(`/addcart/${id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inddata,
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.status === 201) {
        console.log("Added to cart");
        setAccount(data);
        navigate("/buynow");
      } else {
        alert(data.error || "Failed to add to cart.");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Something went wrong while adding to cart.");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <NewNavbaar />
        <div className="circle">
          <CircularProgress size={60} />
          <h2 style={{ marginTop: "1rem" }}>Loading...</h2>
        </div>
      </>
    );
  }

  if (!inddata) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
        No Product Found
      </h2>
    );
  }

  return (
    <>
      <Navbar />
      <NewNavbaar />
      <div className="cart_section">
        <div className="cart_container">
          <div className="left_cart">
            <img
              src={inddata.detailUrl}
              alt="product"
              onError={(e) => (e.target.src = "/fallback.png")}
            />
            <div className="cart_btn">
              <button
                className="cart_btn1"
                onClick={() => addtocart(inddata.id)}
              >
                Add to Cart
              </button>
              <button
                className="cart_btn2"
                disabled={!account}
                title={!account ? "Please login to buy" : "Proceed to buy"}
              >
                Buy Now
              </button>
            </div>
          </div>

          <div className="right_cart">
            <h3>{inddata.title.shortTitle}</h3>
            <h4>{inddata.title.longTitle}</h4>
            <Divider />
            <p className="mrp">
              M.R.P. : <del>₹{inddata.price.mrp}</del>
            </p>
            <p>
              Deal of the Day :{" "}
              <span style={{ color: "#B12704" }}>₹{inddata.price.cost}.00</span>
            </p>
            <p>
              You save :{" "}
              <span style={{ color: "#B12704" }}>
                ₹{inddata.price.mrp - inddata.price.cost} (
                {inddata.price.discount})
              </span>
            </p>

            <div className="discount_box">
              <h5>
                Discount :{" "}
                <span style={{ color: "#111" }}>{inddata.discount}</span>
              </h5>
              <h4>
                FREE Delivery :{" "}
                <span style={{ fontWeight: "600" }}>Oct 8 - 21</span> Details
              </h4>
              <p>
                Fastest delivery:{" "}
                <span style={{ fontWeight: "600" }}>Tomorrow 11AM</span>
              </p>
            </div>

            <p className="description">
              About the Item:{" "}
              <span
                style={{
                  color: "#565959",
                  fontSize: "14px",
                  fontWeight: "500",
                  letterSpacing: "0.4px",
                }}
              >
                {inddata.description}
              </span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddToCart;
