import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

const Home = () => {
  const [data, setData] = useState([]);

  const [show, setShow] = useState(false);

  const getUserData = async () => {
    await fetch("/getdata", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(Object.values(data)[1]);
        setData(Object.values(data)[1]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const dltUser = async (id) => {
    await fetch(`/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Deleted user: ${Object.values(data)[1].fname}`);
        setShow(true);
      })
      .catch((error) => {
        console.error(error);
      });

    getUserData();
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      {show ? (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          User Delete
        </Alert>
      ) : (
        ""
      )}
      <div className="container mt-2">
        <h1 className="text-center mt-2">MERN Image Upload Project</h1>
        <div className="text-end">
          <Button variant="primary">
            <NavLink to="/register" className="text-decoration-none text-light">
              Add User
            </NavLink>
          </Button>
        </div>

        <div className="row d-flex justify-content-between align-iteams-center mt-5">
          {data.length > 0
            ? data.map((profile) => {
                const createdAt = new Date(profile.createdAt);
                return (
                  <>
                    <Card
                      style={{
                        width: "22rem",
                        height: "20rem",
                        backgroundColor: "rgb(12, 12, 12, 0.1)",
                      }}
                      className="mb-3"
                      key={profile._id}
                    >
                      <Card.Img
                        variant="top"
                        style={{
                          maxHeight: "100px",
                          width: "auto",
                          textAlign: "center",
                          margin: "auto",
                        }}
                        src={`/uploads/${profile.imgpath}`}
                        className="mt-2"
                      />
                      <Card.Body className="text-center">
                        <Card.Title>User Name : {profile.fname}</Card.Title>
                        <Card.Title>Gender : {profile.gender}</Card.Title>
                        <Card.Text>
                          Date Added :{" "}
                          {createdAt.toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}{" "}
                          at{" "}
                          {createdAt.toLocaleString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                          })}
                        </Card.Text>
                        <Button
                          variant="danger"
                          className="col-lg-6 text-center"
                          onClick={() => dltUser(profile._id)}
                        >
                          Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  </>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
};

export default Home;
