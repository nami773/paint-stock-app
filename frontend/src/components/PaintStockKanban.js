import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useGetQuery, usePatchQuery } from "../hooks/useRequest";
import PaintCard from "./PaintCard";
import Alert from "react-bootstrap/Alert";

function PaintStockKanban() {
  const [alert, setAlert] = useState("");
  const [outPaints, setOutPaints] = useState([]);
  const [lowPaints, setLowPaints] = useState([]);
  const [availablePaints, setAvailablePaints] = useState([]);
  const [draggedPaint, setDraggedPaint] = useState(null);
  const { data, execute } = useGetQuery(`/api/paints/`, {
    useCache: false,
  });
  const { execute: executeEdit } = usePatchQuery(
    `/api/paints/${draggedPaint}/`
  );
  useEffect(() => {
    if (data) {
      // Filter paints based on status
      const out = data.filter((paint) => paint.status === "OUT");
      const low = data.filter((paint) => paint.status === "LOW");
      const available = data.filter((paint) => paint.status === "AVL");

      // Set state for each list
      setOutPaints(out);
      setLowPaints(low);
      setAvailablePaints(available);
    }
  }, [data]);

  const allowDrop = (event) => {
    event.preventDefault();
  };
  const drag = (paint_id) => {
    setDraggedPaint(paint_id);
  };

  const handleDrop = (status) => {
    executeEdit({
      data: {
        status: status,
      },
    })
      .then((response) => {
        // refetch the data
        setAlert("");
        execute();
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          // Handle Forbidden error
          setAlert(
            "Forbidden: You don't have permission to perform edit paint status. Please request the admin to give you access right."
          );
        } else {
          // Handle other errors
          console.log(error);
          setAlert("Edit user failed. Please try again.");
        }
      });
  };

  return (
    <>
      {alert && <Alert variant="danger">{alert}</Alert>}
      <Container fluid className="pt-3">
        <Row className="flex-row flex-sm-nowrap py-3">
          <Col sm={6} md={4} xl={3} className="ms-auto">
            <Card bg="light">
              <Card.Body>
                <Card.Title className="py-2">Available</Card.Title>
                <div
                  onDrop={() => handleDrop("AVL")}
                  onDragOver={allowDrop}
                  style={{ minHeight: "100px" }}
                >
                  {availablePaints.map((paint) => (
                    <PaintCard paint={paint} drag={drag} key={`paint-${paint.id}`}/>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} md={4} xl={3}>
            <Card bg="light">
              <Card.Body>
                <Card.Title className="py-2">Running Low</Card.Title>
                <div
                  onDrop={() => handleDrop("LOW")}
                  onDragOver={allowDrop}
                  style={{ minHeight: "100px" }}
                >
                  {lowPaints.map((paint) => (
                    <PaintCard paint={paint} drag={drag} key={`paint-${paint.id}`}/>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} md={4} xl={3} className="me-auto">
            <Card bg="light">
              <Card.Body>
                <Card.Title className="py-2">Out of Stock</Card.Title>
                <div
                  onDrop={() => handleDrop("OUT")}
                  onDragOver={allowDrop}
                  style={{ minHeight: "100px" }}
                >
                  {outPaints.map((paint) => (
                    <PaintCard paint={paint} drag={drag} key={`paint-${paint.id}`} />
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PaintStockKanban;
