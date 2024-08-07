import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let data = useCart();
  let navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [buttonText, setButtonText] = useState("Add to Cart");
  const priceRef = useRef();

  let options = props.options || {};
  let priceOptions = Object.keys(options);
  let foodItem = props.foodItem || {};
  const dispatch = useDispatchCart();

  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  };

  const handleQty = (e) => {
    setQty(e.target.value);
  };

  const handleOptions = (e) => {
    setSize(e.target.value);
  };

  const handleAddToCart = async () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return; // Exit the function if the user is not logged in
    }
    let food = data.find((item) => item.id === foodItem._id);

    console.log(food);
    console.log(new Date());
    
    if (food) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItem._id,
          price: finalPrice,
          qty: qty,
        });
      } else {
        await dispatch({
          type: "ADD",
          id: foodItem._id,
          name: foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.imgSrc,
        });
        console.log("Size different so simply ADD one more to the list");
      }
    } else {
      await dispatch({
        type: "ADD",
        id: foodItem._id,
        name: foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    }

    setButtonText("Added");

    setTimeout(() => {
      setButtonText("Add to Cart");
    }, 2000);
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  let finalPrice = qty * parseInt(options[size]);

  return (
    <div>
      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
        <img
          src={props.imgSrc}
          className="card-img-top"
          alt="..."
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container w-100 p-0" style={{ height: "38px" }}>
            <select
              className="m-2 h-100 w-20 text-black rounded"
              style={{ select: "#2abaff", backgroundColor: "#00a8ff" }}
              onClick={handleClick}
              onChange={handleQty}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 w-20 text-black rounded"
              style={{ select: "#2abaff", backgroundColor: "#00a8ff" }}
              ref={priceRef}
              onClick={handleClick}
              onChange={handleOptions}
            >
              {priceOptions.map((i) => {
                return (
                  <option key={i} value={i}>
                    {i}
                  </option>
                );
              })}
            </select>
            <div className="d-inline ms-2 h-100 w-20 fs-5">
              ₹{finalPrice}/-
            </div>
          </div>
          <hr></hr>
          <button
            className={`btn justify-center ms-2`}
            style={{ backgroundColor: "#00a8ff", color: "black" }}
            onClick={handleAddToCart}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
