import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [fname, setFName] = useState("");
  const [gender, setGender] = useState("");
  const [file, setFile] = useState("");
  const [show, setShow] = useState(false);

  const history = useNavigate();

  const setdata = (e) => {
    const { value } = e.target;
    setFName(value);
  };

  const setimgfile = (e) => {
    setFile(e.target.files[0]);
  };

  // Add User Data
  const addUserData = async (e) => {
    e.preventDefault();

    if (!fname || !gender || !file) {
      setShow(true);
    } else if (fname && gender && file) {
      var formData = new FormData();
      formData.append("photo", file);
      formData.append("fname", fname);
      formData.append("gender", gender);

      // Display the key/value pairs
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      // Send POST request
      await fetch("/register", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(Object.values(data)[1]);
        })
        .catch((error) => {
          console.error(error);
        });
      history("/");
    }
  };

  return (
    <>
      {show ? (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          Fill all the fields
        </Alert>
      ) : (
        ""
      )}
      <div className="container mt-3">
        <h1>Upload Your Img Here</h1>

        <Form className="mt-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>UserName</Form.Label>
            <Form.Control type="text" name="fname" onChange={setdata} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              type="text"
              name="gender"
              value={gender}
              onChange={(e) => {
                e.preventDefault();
                setGender(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Select Your Image</Form.Label>
            <Form.Control type="file" onChange={setimgfile} name="photo" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={addUserData}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Register;
