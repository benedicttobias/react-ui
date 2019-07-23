import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Settings extends Component {
  constructor(props){
    super(props);

    this.TestConnection = this.TestConnection.bind(this);
  }

  TestConnection(props) {
    fetch('http://jvzvnq2.calero.com/registry/v1/session', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'lbj@calero.com',
        password: 'calerols',
      })
    })
    .then(response => response.json())
    .then(jsondata => console.log(jsondata))
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Calero Cloud Settings</h1>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-screen-desktop"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="URL" autoComplete="url" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="username" autoComplete="username" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="new-password" />
                    </InputGroup>
                    <Button onClick={this.TestConnection} block>Test Connection</Button>
                    <Button color="success" block>Save</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Settings;
