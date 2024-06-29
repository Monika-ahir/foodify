import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import fries from "../components/Images/fries.jpg";
import pastry from "../components/Images/pastry.jpg";
import burger from "../components/Images/burger.jpg";
import pancake from "../components/Images/pancake.jpg";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      setFoodItem(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.error("Error fetching food data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                {/* <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>

            <div className="carousel-item active">
              <img
                src={fries}
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(60%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src={pastry}
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(60%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src={burger}
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(60%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src={pancake}
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(60%)" }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {loading ? (
          <div>Loading...</div>
        ) : (
          foodCat.length > 0 &&
          foodCat.map((data) => (
            <div className="row mb-3" key={data._id}>
              <div className="fs-3 m-3">{data.CategoryName}</div>
              <hr />
              {foodItem.length > 0 ? (
                foodItem
                  .filter(
                    (item) =>
                      item.CategoryName === data.CategoryName &&
                      item.name
                        .toLowerCase()
                        .includes(search.toLocaleLowerCase())
                  )
                  .map((filterItems) => (
                    <div
                      key={filterItems._id}
                      className="col-12 col-md-6 col-lg-3"
                    >
                      <Card
                        foodItem={filterItems}
                        options={filterItems.options[0]}
                        imgSrc={filterItems.img}
                      />
                    </div>
                  ))
              ) : (
                <div>No Such Data Found</div>
              )}
            </div>
          ))
        )}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
