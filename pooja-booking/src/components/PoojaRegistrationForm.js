import React, { useState, useRef } from "react";
import {
  FormContainer,
  InputField,
  Button,
  Dropdown,
  RowContainer,
  LabelContainer,
  ModalOverlay,
  ModalContent,
  CloseButton,
  PreviewList,
  PreviewItem,
  PreviewButtonSection,
  PreviewButton,
  InputSection,
} from "./StyledComponents";
import axios from "axios";

// PoojaRegistrationForm component
export const PoojaRegistrationForm = ({ onBack }) => {
  const [name, setName] = useState("");
  const [poojaName, setPoojaName] = useState("");
  const [poojaDate, setPoojaDate] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [tithi, setTithi] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});
  const inputRefs = {
    name: useRef(null),
    poojaName: useRef(null),
    poojaDate: useRef(null),
    contactNumber: useRef(null),
    address: useRef(null),
    pincode: useRef(null),
  };

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = true;
    if (!poojaName) errors.poojaName = true;
    if (!poojaDate) errors.poojaDate = true;
    if (!contactNumber || contactNumber.length !== 10) errors.contactNumber = true;
    if (!address.trim()) errors.address = true;
    if (!pincode) errors.pincode = true;
    return errors;
  };

  const handlePreview = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      // Focus on the first unfilled field
      const firstErrorField = Object.keys(formErrors)[0];
      inputRefs[firstErrorField].current.scrollIntoView({ behavior: "smooth" });
      inputRefs[firstErrorField].current.focus();
    } else {
      setErrors({});
      setShowModal(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      poojaName,
      poojaDate,
      contactNumber,
      address,
      pincode,
      tithi,
    };

    axios
      .post("http://localhost:5000/api/pooja_registration", formData)
      .then(() => {
        setShowSuccessModal(true);
        setName("");
        setPoojaName("");
        setPoojaDate("");
        setContactNumber("");
        setAddress("");
        setPincode("");
        setTithi("");
        setErrors({});
        setShowModal(false);
      })
      .catch(() => {
        alert("There was an error with the registration. Please try again.");
      });
  };

  return (
    <>
      <FormContainer>
        <InputSection>
          <h2>Register for Pooja</h2>
          <form>
            <RowContainer style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
              <LabelContainer htmlFor="name" style={{ width: "30%" }}>
                ಹೆಸರು (Name): <span style={{ color: "red" }}>*</span>
              </LabelContainer>
              <InputField
                ref={inputRefs.name}
                id="name"
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "70%",
                  borderColor: errors.name && Object.keys(errors)[0] === "name" ? "red" : "",
                  boxShadow: errors.name && Object.keys(errors)[0] === "name" ? "0 0 10px red" : "",
                }}
              />
            </RowContainer>
            <RowContainer style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
              <LabelContainer htmlFor="poojaName" style={{ width: "30%" }}>
               ಪೂಜೆ ಹೆಸರು (Pooja Name): <span style={{ color: "red" }}>*</span>
              </LabelContainer>
              <Dropdown
                ref={inputRefs.poojaName}
                id="poojaName"
                value={poojaName}
                onChange={(e) => setPoojaName(e.target.value)}
                style={{
                  width: "70%",
                  borderColor: errors.poojaName && Object.keys(errors)[0] === "poojaName" ? "red" : "",
                  boxShadow: errors.poojaName && Object.keys(errors)[0] === "poojaName" ? "0 0 10px red" : "",
                }}
              >
                <option value="">Select Pooja Name</option>
                <option value="Ganesh Pooja">Ganesh Pooja</option>
                <option value="Lakshmi Pooja">Lakshmi Pooja</option>
                <option value="Navratri Pooja">Navratri Pooja</option>
                <option value="Diwali Pooja">Diwali Pooja</option>
                <option value="Satyanarayan Pooja">Satyanarayan Pooja</option>
              </Dropdown>
            </RowContainer>
            <RowContainer style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
              <LabelContainer htmlFor="contactNumber" style={{ width: "30%" }}>
                ಸಂಪರ್ಕ ಸಂಖ್ಯೆ (Contact Number): <span style={{ color: "red" }}>*</span>
              </LabelContainer>
              <InputField
                ref={inputRefs.contactNumber}
                id="contactNumber"
                type="tel"
                placeholder="Enter Contact Number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                pattern="[0-9]{10}"
                style={{
                  width: "70%",
                  borderColor: errors.contactNumber && Object.keys(errors)[0] === "contactNumber" ? "red" : "",
                  boxShadow: errors.contactNumber && Object.keys(errors)[0] === "contactNumber" ? "0 0 10px red" : "",
                }}
              />
            </RowContainer>
            <RowContainer style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
              <LabelContainer htmlFor="poojaDate" style={{ width: "30%" }}>
               ಪೂಜೆ ದಿನಾಂಕ (Pooja Date): <span style={{ color: "red" }}>*</span>
              </LabelContainer>
              <InputField
                ref={inputRefs.poojaDate}
                id="poojaDate"
                type="date"
                value={poojaDate}
                onChange={(e) => setPoojaDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]} // Restrict to today's date and onwards
                style={{
                  width: "70%",
                  borderColor: errors.poojaDate && Object.keys(errors)[0] === "poojaDate" ? "red" : "",
                  boxShadow: errors.poojaDate && Object.keys(errors)[0] === "poojaDate" ? "0 0 10px red" : "",
                }}
              />
            </RowContainer>
            <RowContainer style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
              <LabelContainer htmlFor="tithi" style={{ width: "30%" }}>
                ತಿಥಿ (Tithi):
              </LabelContainer>
              <InputField
                id="tithi"
                type="text"
                placeholder="Enter Tithi (Optional)"
                value={tithi}
                onChange={(e) => setTithi(e.target.value)}
                style={{ width: "70%" }}
              />
            </RowContainer>
            <RowContainer style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
              <LabelContainer htmlFor="address" style={{ width: "30%" }}>
                ವಿಳಾಸ (Address): <span style={{ color: "red" }}>*</span>
              </LabelContainer>
              <InputField
                ref={inputRefs.address}
                id="address"
                type="text"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{
                  width: "70%",
                  borderColor: errors.address && Object.keys(errors)[0] === "address" ? "red" : "",
                  boxShadow: errors.address && Object.keys(errors)[0] === "address" ? "0 0 10px red" : "",
                }}
              />
            </RowContainer>
            <RowContainer style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
              <LabelContainer htmlFor="pincode" style={{ width: "30%" }}>
                ಪಿನ್ ಕೋಡ್ (Pincode): <span style={{ color: "red" }}>*</span>
              </LabelContainer>
              <InputField
                ref={inputRefs.pincode}
                id="pincode"
                type="text"
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                style={{
                  width: "70%",
                  borderColor: errors.pincode && Object.keys(errors)[0] === "pincode" ? "red" : "",
                  boxShadow: errors.pincode && Object.keys(errors)[0] === "pincode" ? "0 0 10px red" : "",
                }}
              />
            </RowContainer>
            {/* Preview Button Inside the Form Container */}
            <PreviewButtonSection style={{ marginTop: "20px" }}>
              <PreviewButton onClick={handlePreview}>Preview</PreviewButton>
            </PreviewButtonSection>
          </form>
        </InputSection>
      </FormContainer>

      {/* Preview Modal */}
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h3>Preview Your Pooja Registration Details</h3>
            <PreviewList>
              <PreviewItem>
                <strong>ಹೆಸರು (Name):</strong> {name}
              </PreviewItem>
              <PreviewItem>
                <strong>ಪೂಜೆ ಹೆಸರು (Pooja Name):</strong> {poojaName}
              </PreviewItem>
              <PreviewItem>
                <strong>ಪೂಜೆ ದಿನಾಂಕ (Pooja Date):</strong> {poojaDate}
              </PreviewItem>
              <PreviewItem>
                <strong>ಸಂಪರ್ಕ ಸಂಖ್ಯೆ (Contact Number):</strong> {contactNumber}
              </PreviewItem>
              <PreviewItem>
                <strong>ವಿಳಾಸ (Address):</strong> {address}
              </PreviewItem>
              <PreviewItem>
                <strong>ಪಿನ್ ಕೋಡ್ (Pincode):</strong> {pincode}
              </PreviewItem>
              {tithi && (
                <PreviewItem>
                  <strong>ತಿಥಿ (Tithi):</strong> {tithi}
                </PreviewItem>
              )}
            </PreviewList>
            <Button onClick={handleSubmit}>Confirm</Button>
            <CloseButton onClick={() => setShowModal(false)}>&times;</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <ModalOverlay>
          <ModalContent>
            <h3>Registration Successful!</h3>
            <p>Your Pooja Registration has been successfully submitted.</p>
            <Button onClick={() => setShowSuccessModal(false)}>Close</Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};
