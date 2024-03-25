import { Card } from "react-bootstrap";
import { BucketFill } from "react-bootstrap-icons";

function PaintCard({ paint, drag }) {
  return (
    <Card
      className="draggable shadow-sm"
      draggable="true"
      id={`paint-${paint.id}`}
      onDragStart={() => drag(paint.id)}
      onTouchStart={() => drag(paint.id)}
    >
      <Card.Body className="p-2">
        <div className="card-title">
          <h5>
            <BucketFill className="mr-1" style={{ color: `rgb${paint.rgb}` }} />{" "}
            {paint.colour}
          </h5>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PaintCard;
