import React, { useState, useEffect } from "react";
import axios from "axios";
import { Place } from "../../../models/place";
import "./DetailsPlace.css";
import { useNavigate, useParams } from "react-router-dom";

const apiUrl = "http://localhost:3000";
//const apiUrl='//api.bankitos.duckdns.org';


function DetailsPlace({ _id, token }: { _id: string; token: string }) {
  const [place, setPlace] = useState<Place>();
  const [bankitos, setBankitos] = useState([]);
  const { placeId } = useParams<{ placeId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const headers = {
          "x-access-token": token,
        };
        const response = await axios.get(apiUrl + "/place/" + placeId, {
          headers,
        });
        console.log(response.data);
        setPlace(response.data);
      } catch (error) {
        console.error("Error fetching places:", error);
        // Handle error if necessary
      }
    };

    fetchPlace();
  }, [placeId, _id, token]);

  const renderStars = (rating: number) => {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={i}>★</span>);
    }
    return stars;
  };

  const fetchBankitos = async () => {
    try {
      const headers = {
        "x-access-token": token,
      };
        const response = await axios.get(apiUrl + "/place/", {
            params: {
                longitude: place?.coords.coordinates[0],
                latitude: place?.coords.coordinates[1],
                maxDistanceKm: '50'
            },
            headers,
        });
        // Establece los bankitos en el estado
        console.log(response.data);
        setBankitos(response.data);
    } catch (error) {
        console.error('Error al obtener los bankitos:', error);
    }
};

  const handleDelete = async () => {
    try {
      const headers = {
        "x-access-token": token,
      };
      await axios.delete(apiUrl + "/place/" + placeId, { headers });
      navigate("/view_places");
    } catch (error) {
      console.error("Error deleting place:", error);
      // Handle error if necessary
    }
  };



  if (!place) {
    return <h1>No places found</h1>;
  } else {
    const isAuthor = place.author === _id;
    return (
      <div>
        <h1 style={{ color: "#fc7a00" }}>{place.title}</h1>
        <div className="containerDetailsPlace">
          <p>Description: {place.content}</p>
          <p>Rating: {renderStars(place.rating)}</p>
          <p>
            Coordinates: {place.coords.coordinates[0]}, {place.coords.coordinates[1]}
          </p>
          <p>Photo: {place.photo}</p>
          <p>Address: {place.address}</p>

          <div className="serviceContainerDetailsPlace">
            <label style={{ fontSize: "25px", color: "#fc7a00" }}>
              Services:
            </label>
            {place.typeOfPlace.bankito && <li>Bankito</li>}
            {place.typeOfPlace.public && <li>Public Place</li>}
            {place.typeOfPlace.covered && <li>Covered</li>}
          </div>
        </div>
        <div className="scheduleContainerDetailsPlace">
          <label style={{ fontSize: "25px", color: "#fc7a00" }}>
            Schedule:
          </label>
          <ul>
            <li>Monday: {place.schedule.monday}</li>
            <li>Tuesday: {place.schedule.tuesday}</li>
            <li>Wednesday: {place.schedule.wednesday}</li>
            <li>Thursday: {place.schedule.thursday}</li>
            <li>Friday: {place.schedule.friday}</li>
            <li>Saturday: {place.schedule.saturday}</li>
            <li>Sunday: {place.schedule.sunday}</li>
          </ul>
        </div>
        {isAuthor && (
          <button
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => navigate(`/place/edit/${placeId}`)}
            className="buttonDetailsPlace"
          >
            Edit
          </button>
        )}
        {isAuthor && (
          <button
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleDelete}
            className="buttonDetailsPlace"
          >
            Delete
          </button>
        )}
        <button
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => navigate(`/place/create_review/${placeId}`)}
          className="buttonDetailsPlace"
        >
          Add Review
        </button>
        <button
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => navigate(`/view_reviews/${placeId}`)}
          className="buttonDetailsPlace"
        >
          View Reviews
        </button>
        <button
  style={{
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  }}
  onClick={fetchBankitos} // Llama a la función fetchBankitos cuando se hace clic en el botón
  className="buttonDetailsPlace"
>
  Buscar Bankitos
</button>
<div>
  {bankitos.map((place: { title: string }, index: number) => (
    <div key={index}>
      <p>Nombre: {place.title}</p>
      {/* Agrega más información sobre el lugar si lo necesitas */}
    </div>
  ))}
</div>
      </div>
    );
  }
}

export default DetailsPlace;
