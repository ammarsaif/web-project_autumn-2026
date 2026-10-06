import { useEffect } from 'react';
import '../App.css';

const Map= ()=>{
    useEffect(() => {
        const getMap = async () => {
            const response = await fetch("http://127.0.0.1:3000/api/restaurants");
            const data = await response.json();

            const map = L.map('map').setView([60.1699, 24.9384],12);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
                    attribution: '&copy; OpenStreetMap contributors'}).addTo(map);

            data.forEach((restaurant) => {
                if (restaurant.latitude !== null && restaurant.longitude !== null) {
                    const lat = parseFloat(restaurant.latitude);
                    const lng = parseFloat(restaurant.longitude);

                    const marker = L.marker([lat, lng]).addTo(map);
                    marker.bindPopup(`
                        <h3>${restaurant.name}</h3>
                        <p>${restaurant.address}</p>
                        <p>${restaurant.city}</p>
                        <p>${restaurant.opening_hour}</p>
                    `);
                }
            });
        };
        getMap();
    }, []);

    return (
        <div className="mapH">
            <h1>Our Locations</h1>
            <div id="map"></div>
        </div>
    );
};
export default Map;