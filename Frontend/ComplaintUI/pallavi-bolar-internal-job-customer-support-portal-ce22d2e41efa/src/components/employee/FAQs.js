import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import EmployeeService from "../services/EmployeeService"; 
import "./FAQs.css"; 

const FAQs = () => {
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const response = await EmployeeService.getAllFAQs();
                setFaqs(response.data);
            } catch (error) {
                console.error("Error fetching FAQs:", error);
            }
        };

        fetchFAQs();
    }, []);

    const toggleFAQ = (index) => {
        const updatedFAQs = [...faqs];
        updatedFAQs[index].open = !updatedFAQs[index].open;
        setFaqs(updatedFAQs);
    };

    return (
        <div className="faq-list">
            <h2 className="header">Frequently Asked Questions</h2>
            <p className="sub-heading">
                Quick answers to questions you may have.&nbsp;&nbsp;Can't find what you are look for ?&nbsp;&nbsp; 
                <Link to="/registerComplaint" className="we-value-link">
                    We Value - Submit your complaints / queries
                </Link>
                
            </p>
            {faqs.map((faq, index) => (
                <div className="faq-item" key={faq.id} style={{ padding: "20px", fontSize: "20px" }}>
                    <button className={`faq-toggle-button ${faq.open ? "open" : ""}`} onClick={() => toggleFAQ(index)}>
                        
                    </button>
                    <details open={faq.open}>
                        <summary>{faq.question}</summary>
                        <p style={{ padding: "45px", fontSize: "20px" }}>{faq.answer}</p>
                    </details>
                </div>
            ))}
        </div>
    );
};

export default FAQs;
