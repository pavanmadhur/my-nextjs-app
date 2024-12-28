// Import Font Awesome Icons
"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt, // Speedometer
  faPiggyBank, // Piggy Bank
  faChartBar, // Diagram-3
} from "@fortawesome/free-solid-svg-icons";

const Microconvert = [
  {
    title: "Improved Performance",
    text: "Optimize your application for better speed and efficiency",
    icon: faTachometerAlt, // Speedometer icon
  },
  {
    title: "Cost Reduction",
    text: "Reduce hosting costs through efficient resource utilization",
    icon: faPiggyBank, // Piggy Bank icon
  },
  {
    title: "Scalable Architecture",
    text: "Easy to maintain and scale individual services",
    icon: faChartBar, // Diagram-3 icon
  },
];

export default function Section() {
  return (
    <section id="MicroConvert" style={{ padding: "40px 20px" }}>
      <h1
        className="text-center font-bold"
        style={{
          fontSize: "28px",
          lineHeight: "1.2",
          color: "#000",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Why Choose MicroConvert?
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {Microconvert.map((micro) => (
          <div
            key={micro.title}
            style={{
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              padding: "24px",
              maxWidth: "300px",
              flex: "1",
            }}
          >
            <div
              style={{
                fontSize: "36px",
                color: "#4a90e2",
                marginBottom: "10px",
              }}
            >
              <FontAwesomeIcon icon={micro.icon} />
            </div>
            <h1
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "10px",
                margin: "16px 0px 0px",
                color: "#000",
              }}
            >
              {micro.title}
            </h1>
            <h3
              style={{
                fontSize: "16px",
                lineHeight: "1.5",
                color: "gray",
                margin: "8px 0px 0px",
              }}
            >
              {micro.text}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
