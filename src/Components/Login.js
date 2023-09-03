"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

function LoginForm() {
  const [windowWidth, setWindowWidth] = useState();

  // Function to update the window width state when the window is resized
  const handleResize = () => {
    setWindowWidth(window?.innerWidth);
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    // Add a resize event listener to track window resizing
    window?.addEventListener("resize", handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, []); // Only run this effect once on component mount

  const calculateDimensions = () => {
    // Adjust these values as needed for your responsive design
    if (windowWidth < 576) {
      return { width: 188, height: 177 };
    } else if (windowWidth < 992) {
      return { width: 250, height: 236 };
    } else {
      return { width: 350, height: 330 };
    }
  };

  const { width, height } = calculateDimensions();

  const handleGoogleSignIn = () => {
    signIn("google");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(email, password);
    // Perform form submission or validation here
  };

  return (
    <main className="d-flex relative login justify-content-center align-items-center h-100 flex-column">
      <div className="my-4">
        <Image src={"/Logo.png"} width={192} height={42} alt="logo"></Image>
      </div>

      <Container style={{ maxWidth: "400px" }} className="form">
        <div className="shadow-text text-center mb-3">Log in to TaskFlow</div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email" className="mb-4">
            <Form.Control type="email" name="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="goggle" className="">
            <Button variant="success" type="submit" className="w-100">
              Continue
            </Button>
          </Form.Group>

          <div className="shadow-text my-2 text-center">OR</div>

          <Form.Group
            controlId="goggle"
            className=""
            style={{ marginBottom: "12px" }}
          >
            <Button
              variant="outline"
              onClick={handleGoogleSignIn}
              className="w-100"
            >
              <Image
                src="/google.svg"
                alt="google"
                width={24}
                height={24}
                className="me-2"
              />
              Continue with Google
            </Button>
          </Form.Group>

          <Form.Group
            controlId="goggle"
            className=""
            style={{ marginBottom: "12px" }}
          >
            <Button
              variant="outline"
              onClick={handleGoogleSignIn}
              className="w-100"
            >
              <Image
                src="/microsoft.svg"
                alt="google"
                width={24}
                height={24}
                className="me-2"
              />
              Continue with Microsoft
            </Button>
          </Form.Group>

          <Form.Group
            controlId="goggle"
            className=""
            style={{ marginBottom: "12px" }}
          >
            <Button
              variant="outline"
              onClick={handleGoogleSignIn}
              className="w-100"
            >
              <Image
                src="/apple.svg"
                alt="google"
                width={24}
                height={24}
                className="me-2"
              />
              Continue with Apple
            </Button>
          </Form.Group>

          <Form.Group
            controlId="goggle"
            className=""
            style={{ marginBottom: "12px" }}
          >
            <Button
              variant="outline"
              onClick={handleGoogleSignIn}
              className="w-100"
            >
              <Image
                src="/slack.svg"
                alt="google"
                width={24}
                height={24}
                className="me-2"
              />
              Continue with Slack
            </Button>
          </Form.Group>

          <hr />

          <div
            className="d-flex align-items-center justify-content-between"
            style={{ marginBottom: "12px" }}
          >
            <Link href={"/login/resetPsw"}>{"Can't login?"}</Link>
            <Link href={"/signup"}>{"Sign up for an account"}</Link>
          </div>
        </Form>
      </Container>

      <div className="left d-none d-sm-block">
        <Image src="/lefthand.svg" alt="left" width={width} height={height} />
      </div>

      <div className="right d-none d-sm-block">
        <Image src="/righthand.svg" alt="right" width={width} height={height} />
      </div>
    </main>
  );
}

export default LoginForm;
