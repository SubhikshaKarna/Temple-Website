import styled from 'styled-components';

/* Main Form Container */
export const FormContainer = styled.div`
  position: relative;
  margin: 8px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

/* Input Section Styling */
export const InputSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

/* Preview Button Section Styling */
export const PreviewButtonSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; /* Optional for spacing */
`;

/* Input Field Styling */
export const InputField = styled.input`
  width: 60%;
  padding: 10px;
  margin: 6px 0;  /* Reduced from 8px */
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Adding subtle box-shadow */
    transition: box-shadow 0.3s ease-in-out;
  }
`;

/* Dropdown (Select Field) Styling */
export const Dropdown = styled.select`
  width: 70%;
  padding: 10px;
  margin: 6px 0;  /* Reduced from 8px */
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Adding subtle box-shadow */
    transition: box-shadow 0.3s ease-in-out;
  }
`;

/* Row Container for Label and Input */
export const RowContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;  /* Reduced from 15px */
  width: 100%;
`;

/* Label Styling */
export const LabelContainer = styled.div`
  width: 40%;
  margin-right: 8px;
  font-size: 14px;
  color: #3e2723;
`;

/* Half-Width Input Field */
export const HalfWidthField = styled.input`
 
`;

/* Submit Button Styling */
export const Button = styled.button`
  display: block;
  width: 50%;
  padding: 12px 20px;
  background-color: rgb(96, 2, 2);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin: 15px auto;

  &:hover {
    background-color: rgb(120, 5, 5);
  }

  &:disabled {
    background-color: #dcdcdc;
    color: #a1a1a1;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 80%; /* Adjust width for smaller screens */
  }
`;

/* Modal Overlay Styling */
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

/* Modal Content Styling */
export const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  width: 600px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  z-index: 1001;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

/* Modal Close Button Styling */
export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
`;

/* Preview Button Styling */
export const PreviewButton = styled.button`
  padding: 12px 20px;
  background-color: rgb(96, 2, 2);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: rgb(120, 5, 5);
  }

  &:disabled {
    background-color: #dcdcdc;
    color: #a1a1a1;
    cursor: not-allowed;
  }
`;

/* Error Modal Content Styling */
export const ErrorModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  text-align: center;
  color: #d9534f; /* Red for error messages */

  @media (max-width: 768px) {
    width: 90%;
  }
`;

/* Preview List Styling */
export const PreviewList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 15px;
  color: #333;
`;

/* Preview Item Styling */
export const PreviewItem = styled.li`
  font-size: 16px;
  margin-bottom: 8px;
  strong {
    color: #555;
  }
`;
