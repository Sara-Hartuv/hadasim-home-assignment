import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Location {
    idNumber: string;
    name: string;
    latitude: number;
    longitude: number;
    isTooFar? : boolean;
    isTeacher? :boolean;
}

interface Props {
    locations: Location[];
}

const defaultIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const redIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

const teacherIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

const MapView = ({ locations }: Props) => {
    return (
        <MapContainer center={[31.7683, 35.2137]} zoom={13} style={{ height: "500px", width: "100%" }}>
            <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            {locations.map((loc) => {
                const icon = loc.isTeacher? teacherIcon : loc.isTooFar ? redIcon : defaultIcon;
                return(
                    <Marker key={loc.idNumber} position={[loc.latitude, loc.longitude]} icon={icon}>
                        <Popup>
                            <div>
                                {loc.isTeacher ? "מורה" : loc.name}
                            </div>
                            {loc.isTooFar && (
                                <div style={{color: "red"}}>רחוק/ה מהמורה</div>
                            )}
                        </Popup>
                    </Marker>
                );   
            }
        )}
        </MapContainer>
    );
};
export default MapView;