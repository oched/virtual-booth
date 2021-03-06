/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";

export default function sales() {
  const router = useRouter();
  const [dataSales, setDataSales] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;
    setDataSales(JSON.parse(`[` + router.query.kontak + `]`));
  }, [router]);

  return (
    <div style={{ background: "white", padding: "3rem" }}>
      <Row xs={2} md={2} className="g-4">
        {dataSales.map((data) => {
          return (
            <Col key={data.Nama + data.Wa}>
              <Card style={{ width: "18rem" }}>
                <Image rounded src={data.Foto === "" ? "noimage.png" : data.Foto} alt=''/>
                <Card.Body>
                <Card.Title>{data.Nama}</Card.Title>
                {/* <Button variant="primary">{data.Wa}</Button> */}
                <a href={`https://wa.me/62` + data.Wa.substring(1)} target="_blank" className="btn-hall" rel="noreferrer">{data.Wa}</a>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
