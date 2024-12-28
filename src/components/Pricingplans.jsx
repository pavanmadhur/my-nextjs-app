"use client";

import React, { useState } from "react";

const Pricingplans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const pricingPlans = [
    {
        name: 'Starter',
        price: '$49/month',
        features: ['Up to 5 conversions/month', 'Basic support'],
        button: 'Choose Plan',
      },
      {
        name: 'Professional',
        price: '$99/month',
        features: ['Unlimited conversions', 'Priority support', 'Advanced analytics'],
        button: 'Choose Plan',
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        features: ['Custom solutions', '24/7 support', 'Dedicated account manager'],
        button: 'Choose Plan',
      },
  ];

  

  return (
    <section
    id="pricing"
    style={{
      padding: "40px",
      backgroundColor: "#f5f7fa",
      textAlign: "center",
    }}
  >
    <h1
      className="text-center font-bold mb-4"
      style={{
        fontSize: "32px",
        lineHeight: "1.2",
        color: "#000",
        marginBottom: "40px",
      }}
    >
      Pricing Plans
    </h1>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        flexWrap: "wrap",
      }}
    >
      {pricingPlans.map((plan, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "24px",
            width: "300px",
            textAlign: "left",
            border:
              selectedPlan === index
                ? "3px solid #007bff"
                : "1px solid #ddd", // Highlight selected card
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            {plan.name}
          </h3>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            {plan.price}
            <span style={{ fontSize: "16px", fontWeight: "normal" }}>/month</span>
          </h2>
          <ul style={{ marginBottom: "20px" }}>
            {plan.features.map((feature, featureIndex) => (
              <li
                key={featureIndex}
                style={{
                  fontSize: "16px",
                  marginBottom: "8px",
                  color: "#333",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: "green",
                    fontSize: "20px",
                    marginRight: "8px",
                  }}
                >
                  ✓
                </span>
                {feature}
              </li>
            ))}
          </ul>
          <button
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              color: "#fff",
              backgroundColor: "#007bff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => setSelectedPlan(index)} // Update selected plan
          >
            {plan.button}
          </button>
        </div>
      ))}
    </div>
  </section>
  );
};

export default Pricingplans;
