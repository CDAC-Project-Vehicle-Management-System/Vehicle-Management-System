import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import { Link } from "react-router-dom";
import axios from "axios";

function Mace() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:44383/api/vehicle/getAll"); // Use the correct port here
        setVehicles(response.data.data); // Adjust based on your API response structure
      } catch (err) {
        setError("Failed to fetch vehicles");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <section className="models-section">
        <HeroPages name="Vehicle Models" />
        <div className="container">
          <div className="models-div">
            {vehicles.map((vehicle) => (
              <div className="models-div__box" key={vehicle.id}>
                <div className="models-div_box_img">
                  <img src={vehicle.imageUrl} alt={vehicle.name} /> {/* Assuming imageUrl is part of the vehicle data */}
                  <div className="models-div_box_descr">
                    <div className="models-div_boxdescr_name-price">
                      <div className="models-div_boxdescrname-price_name">
                        <p>{vehicle.name}</p>
                        <span>
                          {[...Array(vehicle.rating)].map((_, index) => (
                            <i key={index} className="fa-solid fa-star"></i>
                          ))}
                        </span>
                      </div>
                      <div className="models-div_boxdescrname-price_price">
                        <h4>₹{vehicle.price}</h4>
                        <p>per day</p>
                      </div>
                    </div>
                    <div className="models-div_boxdescrname-price_details">
                      <span>
                        <i className="fa-solid fa-car-side"></i> &nbsp; {vehicle.brand}
                      </span>
                      <span style={{ textAlign: "right" }}>
                        {vehicle.seats}/5 &nbsp; <i className="fa-solid fa-car-side"></i>
                      </span>
                      <span>
                        <i className="fa-solid fa-car-side"></i> &nbsp; {vehicle.transmission}
                      </span>
                      <span style={{ textAlign: "right" }}>
                        {vehicle.fuelType} &nbsp; <i className="fa-solid fa-car-side"></i>
                      </span>
                    </div>
                    <div className="models-div_boxdescrname-price_btn">
                      <Link onClick={() => window.scrollTo(0, 0)} to="/">
                        Book Ride
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="book-banner">
          <div className="book-banner__overlay"></div>
          <div className="container">
            <div className="text-content">
              <h2>Book a car by getting in touch with us</h2>
              <span>
                <i className="fa-solid fa-phone"></i>
                <h3>(123) 456-7869</h3>
              </span>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Mace;