import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AlertTriangle, DropletIcon } from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Simple Card components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white shadow-md rounded-lg ${className}`}>{children}</div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`px-4 py-5 border-b border-gray-200 sm:px-6 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`px-4 py-5 sm:p-6 ${className}`}>{children}</div>
);

const waterBodiesData = [
  {
    id: 1,
    name: "Yamuna River",
    pollutionLevel: 75,
    waterLevel: 60,
    risk: "High",
    lat: 28.6139,
    lng: 77.209,
    affected: "Aquatic life, Drinking water",
    radius: 5000,
  },
  {
    id: 2,
    name: "Bhalswa Lake",
    pollutionLevel: 65,
    waterLevel: 70,
    risk: "High",
    lat: 28.7356,
    lng: 77.1684,
    affected: "Local ecosystem, Recreation",
    radius: 2000,
  },
  {
    id: 3,
    name: "Naini Lake",
    pollutionLevel: 30,
    waterLevel: 90,
    risk: "Low",
    lat: 28.7011,
    lng: 77.2099,
    affected: "Minor impact on local flora",
    radius: 1000,
  },
  {
    id: 4,
    name: "Sanjay Lake",
    pollutionLevel: 50,
    waterLevel: 70,
    risk: "Medium",
    lat: 28.6227,
    lng: 77.3014,
    affected: "Biodiversity, Water sports",
    radius: 1500,
  },
];

const Navigation = ({ setActiveView }) => (
  <nav className="bg-blue-600 p-4 text-white">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold">Delhi Water Bodies Monitor</h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setActiveView("dashboard")}
          className="px-3 py-2 bg-blue-700 rounded"
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveView("reports")}
          className="px-3 py-2 bg-blue-700 rounded"
        >
          Reports
        </button>
        <button
          onClick={() => setActiveView("map")}
          className="px-3 py-2 bg-blue-700 rounded"
        >
          Map
        </button>
        <span>Admin</span>
      </div>
    </div>
  </nav>
);

const Dashboard = () => {
  const criticalLakes = waterBodiesData
    .filter((body) => body.risk === "High")
    .map((body) => body.name);

  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Critical Alerts</h2>
            <AlertTriangle className="text-red-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-500">
              {criticalLakes.length}
            </p>
            <p>High-risk water bodies:</p>
            <ul className="list-disc pl-5">
              {criticalLakes.map((lake, index) => (
                <li key={index} className="text-sm">
                  {lake}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Water Demand</h2>
            <DropletIcon className="text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-500">1,290 MG</p>
            <p>Daily water demand</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Supply Gap</h2>
            <AlertTriangle className="text-yellow-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-500">290 MG</p>
            <p>Daily supply shortage</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-xl font-semibold">Water Bodies Status</h2>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={waterBodiesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="pollutionLevel"
                  fill="#8884d8"
                  name="Pollution Level"
                />
                <Bar dataKey="waterLevel" fill="#82ca9d" name="Water Level" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Reports = () => (
  <div className="container mx-auto mt-8 p-4">
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Risk Assessment Report</h2>
      </CardHeader>
      <CardContent>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left">Water Body</th>
              <th className="text-left">Risk Level</th>
              <th className="text-left">Affected Areas</th>
            </tr>
          </thead>
          <tbody>
            {waterBodiesData.map((body, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="py-2">{body.name}</td>
                <td className="py-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      body.risk === "High"
                        ? "bg-red-200 text-red-800"
                        : body.risk === "Medium"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    {body.risk}
                  </span>
                </td>
                <td className="py-2">{body.affected}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  </div>
);

const InteractiveMap = () => (
  <div className="container mx-auto mt-8 p-4">
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Delhi Water Bodies Risk Map</h2>
      </CardHeader>
      <CardContent>
        <div style={{ height: "500px", width: "100%" }}>
          <MapContainer
            center={[28.6139, 77.209]}
            zoom={11}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {waterBodiesData.map((body) => (
              <React.Fragment key={body.id}>
                <CircleMarker
                  center={[body.lat, body.lng]}
                  radius={5}
                  pathOptions={{
                    color:
                      body.risk === "High"
                        ? "red"
                        : body.risk === "Medium"
                        ? "yellow"
                        : "green",
                    fillColor:
                      body.risk === "High"
                        ? "red"
                        : body.risk === "Medium"
                        ? "yellow"
                        : "green",
                    fillOpacity: 0.7,
                  }}
                >
                  <Popup>
                    <strong>{body.name}</strong>
                    <br />
                    Risk: {body.risk}
                    <br />
                    Affected: {body.affected}
                  </Popup>
                </CircleMarker>
                <CircleMarker
                  center={[body.lat, body.lng]}
                  radius={body.radius / 100}
                  pathOptions={{
                    color:
                      body.risk === "High"
                        ? "red"
                        : body.risk === "Medium"
                        ? "yellow"
                        : "green",
                    fillColor:
                      body.risk === "High"
                        ? "red"
                        : body.risk === "Medium"
                        ? "yellow"
                        : "green",
                    fillOpacity: 0.2,
                  }}
                />
              </React.Fragment>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  </div>
);

const DelhiWaterMonitoringSystem = () => {
  const [activeView, setActiveView] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation setActiveView={setActiveView} />
      <main>
        {activeView === "dashboard" && <Dashboard />}
        {activeView === "reports" && <Reports />}
        {activeView === "map" && <InteractiveMap />}
      </main>
    </div>
  );
};

export default DelhiWaterMonitoringSystem;
