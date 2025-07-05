import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Row,
  Column,
} from "@react-email/components";

interface OrderConfirmProps {
  orderId: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  total: number;
  products: { 
    title: string; 
    quantity: number; 
    price: number;
  }[];
}

export const OrderConfirm: React.FC<Readonly<OrderConfirmProps>> = ({
  orderId,
  firstName,
  lastName,
  email,
  address,
  city,
  postalCode,
  phone,
  total,
  products,
}) => {
  console.log("product", products);
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f6f9fc", padding: "20px 0" }}>
        <Container
          style={{
            margin: "0 auto",
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
          }}
        >
          <Text
            style={{ fontSize: "24px", color: "#4CAF50", fontWeight: "bold" }}
          >
            Order Confirmation
          </Text>

          <Text>
            Hi {firstName} {lastName},
          </Text>
          <Text>
            Thank you for your order! Your order ID is{" "}
            <strong>{orderId}</strong>.
          </Text>

          <Section style={{ marginTop: "24px" }}>
            <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
              Shipping Information:
            </Text>
            <Text>
              {address}
              <br />
              {city}, {postalCode}
              <br />
              {phone}
              <br />
              {email}
            </Text>
          </Section>

          <Section style={{ marginTop: "24px" }}>
            <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
              Order Summary:
            </Text>
            {products.map((product, index) => (
              <Row key={index} style={{ margin: "8px 0" }}>
                <Column>
                  <Text>
                    {product.title} x {product.quantity}
                  </Text>
                </Column>
                <Column align="right">
                  <Text>৳{(product.price * product.quantity).toFixed(2)}</Text>
                </Column>
              </Row>
            ))}
            <Hr style={{ margin: "16px 0" }} />
            <Row>
              <Column>
                <Text style={{ fontWeight: "bold" }}>Total:</Text>
              </Column>
              <Column align="right">
                <Text style={{ fontWeight: "bold" }}>৳{total.toFixed(2)}</Text>
              </Column>
            </Row>
          </Section>

          <Text style={{ marginTop: "24px" }}>
            Your order is being processed. We will notify you when it is
            shipped.
          </Text>

          <Text style={{ marginTop: "24px" }}>
            Thank you for shopping with us!
          </Text>

          <Text style={{ fontWeight: "bold", marginTop: "24px" }}>
            Your Store Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
};