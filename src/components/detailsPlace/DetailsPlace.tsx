import React, { useState, useEffect } from "react";
import axios from "axios";
import { Place } from "../../models/place";
import "./DetailsPlace.css";
import { useNavigate, useParams } from "react-router-dom";

const apiUrl = "http://localhost:3000";

function ViewPlaces({ _id, token }: { _id: string; token: string }) {
  const [place, setPlace] = useState<Place>();
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
        setPlace(response.data);
      } catch (error) {
        console.error("Error fetching places:", error);
        // Handle error if necessary
      }
    };

    fetchPlace();
  }, [_id, token]);

  if (!place) {
    return <h1>No places found</h1>;
  }else{
  return (
    <div>
      <h1>{place.title}</h1>
      <p>Description: {place.content}</p>
      <p>Rating:{place.rating}</p>
      <p>Coordinates: {place.coords.latitude},{place.coords.longitude}</p>
      <p>Photo: {place.photo}</p>
      <p>Address:{place.address}</p>
      <p>Services:</p>

      if({place.typeOfPlace.bankito}){<p>Bankito</p>}
      if({place.typeOfPlace.public}){<p>Public Place</p>}
      if({place.typeOfPlace.covered}){<p>Covered</p>}

      <p>Schedule:</p>
      <li>
      Monday:{place.schedule.monday}
      Tuesday:{place.schedule.tuesday}
      Wednesday:{place.schedule.wednesday}
      Thursday:{place.schedule.thursday}
      Friday:{place.schedule.friday}
      Saturday:{place.schedule.saturday}
      Sunday:{place.schedule.sunday}
      </li>

    </div>
  );
}
}

export default ViewPlaces;