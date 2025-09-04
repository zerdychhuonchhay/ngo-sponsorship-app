//import node modules libraries
import { Metadata } from "next";
import { Fragment } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { getAssetPath } from "helper/assetPath";

export const metadata: Metadata = {
  title: "404 error | Dasher - Responsive Bootstrap 5 Admin Dashboard",
  description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

const NotFound = () => {
  return (
    <Fragment>
      <Row className="justify-content-center">
        <Col>
          <div className="text-center">
            <div>
              <Image
                src={getAssetPath("/images/svg/404.svg")}
                alt="Image"
                className="img-fluid"
              />
            </div>

            <h1 className="display-4">Oops! the page not found.</h1>
            <p className="mb-6 fs-5">
              Or simply leverage the expertise of our consultation team.
            </p>

            <Button href="/" variant="primary" size="lg">
              Go Home
            </Button>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default NotFound;
