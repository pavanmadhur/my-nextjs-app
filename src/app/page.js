import React from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Pricingplans from "@/components/Pricingplans";
import ContactUs from "@/components/ContactUs";
import Section from "@/components/Section";

export default function Home() {
  return (
    <div>
      {/* Fixed Header */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          backgroundColor: "#fff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Header />
      </div>

      {/* Main Content */}
      <div style={{ marginTop: "80px" }}>
        <center>
          <h1
            className="text-center font-bold mb-4"
            style={{
              fontSize: "36px",
              lineHeight: "1.2",
              margin: "0px 0px 16px",
              color: "#000",
            }}
          >
            Transform Your Monolith into Microservices
          </h1>

          <p
            style={{
              margin: "0px 0px 32px",
              textAlign: "center",
              fontWeight: "300",
              color: "gray",
              fontSize: "20px",
              lineHeight: "1.5",
            }}
          >
            Reduce hosting costs and optimize performance automatically
          </p>
        </center>

        <div>
          <Section />
        </div>

        {/* Pricing Section */}
        <div>
          <Pricingplans />
        </div>

        {/* Contact Section */}
        <div>
          <ContactUs />
        </div>
      </div>

      <Footer />
    </div>
  );
}
