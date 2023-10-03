import React from "react";
import "./FAQPopup.css"; 

const FAQPopup = ({ onClose, suggestedFaqs }) => {
  return (
    <div className="popup-container">
      <div className="popup-content">
        <div className="faq-list">
        {suggestedFaqs.length > 0 && (
                    <div className="faq-details">
                        
                        {suggestedFaqs.map((faq) => (
                            <div className="faq-item" key={faq.id} style={{ padding: "20px", fontSize: "20px" }}>
                                <details>
                                    <summary className="para">{faq.question}</summary>
                                    <p className="para">{faq.answer}</p>
                                </details>
                            </div>
                        ))}
                    </div>
                )}
          
        </div>

      </div>
    </div>
  );
};

export default FAQPopup;
