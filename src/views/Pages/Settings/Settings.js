import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


class Settings extends Component {
  constructor(props){
    super(props);

    this.TestConnection = this.TestConnection.bind(this);
    this.SaveConnection = this.SaveConnection.bind(this)
  }

  // IIS 10, you need to install CORS module: 
  // And add these to webConfig unser system.webServer:
  //   <cors enabled="true">
  //     <add origin="localhost:3000">
  //       <allowHeaders allowAllRequestedHeaders="true" />
  //     </add>
  //   </cors>
  TestConnection(props) {
    fetch('http://jvzvnq2.calero.com/registry/v1/session', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: 'lbj@calero.com',
        password: 'calerols',
      })
    })
    .then(response => response.json())
    .then(jsondata => {
      if (jsondata.item.token != null){
        fetch('http://jvzvnq2.calero.com/registry/v1/session', {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
          }
        })
      }
    })
  }

  SaveConnection(props) {
    fetch('http://jvzvnq2.calero.com/registry/v1/session', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          username: 'lbj@calero.com',
          password: 'calerols',
        })
      })
      .then(response => response.json())
      .then(jsondata => {
        cookies.set('loginToken', jsondata.item.token, { path: '/' });

        console.log('cookie set: ' + cookies.get('loginToken'));
      })
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
                    <Button onClick={this.SaveConnection} color="success" block>Save</Button>
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
