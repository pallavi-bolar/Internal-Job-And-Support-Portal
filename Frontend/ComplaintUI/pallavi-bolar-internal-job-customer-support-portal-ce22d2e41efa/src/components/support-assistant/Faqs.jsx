import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBInput,
  MDBTextArea,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
} from "@chakra-ui/react";
import "./Faqs.css";
import { useNavigate } from "react-router-dom";
import ComplaintService from "../services/ComplaintService";

export default function Faqs() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      await ComplaintService.createFAQ(question, answer);
      setIsModalOpen(true);
      setQuestion("");
      setAnswer("");
    } catch (error) {
      console.error("Error creating FAQ:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigateToViewAllFaqs = () => {
    navigate("/view-all-faqs");
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
          <MDBBreadcrumbItem active className="custom-breadcrumb-active">
            Create FAQ
          </MDBBreadcrumbItem>
          <MDBBreadcrumbItem>
            <a
              href="/view-all-faqs"
              className="text-reset custom-breadcrumb-link"
            >
              View FAQs
            </a>
          </MDBBreadcrumbItem>
        </MDBBreadcrumb>
      </div>
      <div className="faq-header">
        <span className="faq-text">Create FAQ</span>
      </div>
      <div className="center-container">
        <MDBCard>
          <MDBCardBody className="faq-card-body">
            <div className="label">Question</div>
            <MDBInput
              label="Enter your question"
              id="typeText"
              type="text"
              className="custom-question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <div className="label">Answer</div>
            <MDBTextArea
              label="Enter your answer"
              id="textAreaExample"
              rows={4}
              className="custom-textarea"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />

            <MDBBtn
              color="success"
              className="faq-button"
              onClick={handleSubmit}
            >
              Submit
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>FAQ</ModalHeader>
          <ModalCloseButton />
          <ModalBody>FAQ Created Successfully</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={navigateToViewAllFaqs}>
              View
            </Button>
            <Button variant="ghost" onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
