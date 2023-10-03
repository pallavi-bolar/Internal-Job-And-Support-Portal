import React, { useEffect, useState } from "react";
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-react-ui-kit";
import "./ViewAllFaqsPage.css";
import ComplaintService from "../services/ComplaintService";

function ViewAllFaqsPage() {
  const [allFaqs, setAllFaqs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const faqs = await ComplaintService.fetchAllFaqs();
        setAllFaqs(faqs);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchData();
  }, []);

  const toggleAccordion = (index) => {
    const faqCollapse = document.getElementById(`faqCollapse${index}`);
    if (faqCollapse) {
      faqCollapse.classList.toggle("show");
    }

    const accordionButton = document.getElementById(`accordionButton${index}`);
    if (accordionButton) {
      accordionButton.classList.toggle("collapsed");
    }
  };

  return (
    <div>
      <div className="breadcrumb">
        <MDBBreadcrumb>
          <MDBBreadcrumbItem>
            <a
              href="/support-dashboard"
              className="text-reset custom-breadcrumb-link"
            >
              Home
            </a>
          </MDBBreadcrumbItem>
          <MDBBreadcrumbItem>
            <a href="/create-faq" className="text-reset custom-breadcrumb-link">
              Create FAQ
            </a>
          </MDBBreadcrumbItem>
          <MDBBreadcrumbItem active className="custom-breadcrumb-active">
            View All Faqs
          </MDBBreadcrumbItem>
        </MDBBreadcrumb>
      </div>
      <div className="view-faqs-header">
        <span className="view-faqs-text">Frequently Asked Questions</span>
      </div>
      <div>
        <div className="accordion" id="basicAccordion">
          {allFaqs.map((faq, index) => (
            <div className="accordion-item" key={faq.id}>
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  id={`accordionButton${index}`}
                  className="accordion-button collapsed"
                  type="button"
                  onClick={() => toggleAccordion(index)}
                >
                  FAQ #{faq.id}: {faq.question}
                </button>
              </h2>
              <div
                id={`faqCollapse${index}`}
                className="accordion-collapse collapse"
              >
                <div className="accordion-body">A: {faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewAllFaqsPage;
