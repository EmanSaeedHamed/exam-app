"use client";
import React from "react";

export default function Stepper({ steps = 4, currentStep = 1 }) {
  const stepsArray = Array.from({ length: steps }, (_, i) => i + 1);

  return <>
     <div className="flex items-center w-full">
      {stepsArray.map((step, index) => {
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;

        return <React.Fragment key={step}>
            {/* Step */}
            <div
              className={`flex items-center justify-center border rotate-45 transition-all duration-300
              ${
                isCompleted
                  ? "bg-blue-600 border-blue-600 size-2.5"
                  : isActive
                  ? "bg-blue-100 border-blue-100 size-[21px]"
                  : "bg-blue-50 border-blue-600 size-2.5"
              }`}
            >
              {isActive && (
                <div className="size-2.5 bg-blue-600"></div>
              )}
            </div>

            {/* Line */}
            {index !== stepsArray.length - 1 && (
              <div
                className={`flex-1 mx-2 border transition-all duration-300
                ${
                  step < currentStep
                    ? "border-blue-600"
                    : "border-dashed border-blue-600"
                }`}
              ></div>
            )}
          </React.Fragment>
        
      })}
    </div>
  </>
    
}
