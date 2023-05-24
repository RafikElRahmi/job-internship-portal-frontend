import axios from "axios";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { RadialChart } from "react-vis";
import { BaseURL } from "../../components/auth/BaseURL";
import { useState } from "react";
import { useEffect } from "react";

const HomeAdmin = () => {
  const [usersrole, setusersrole] = useState();
  const [users, setusers] = useState();
  const [data, setdata] = useState(null);
  const [posts, setposts] = useState();
  const [postulations, setpostulations] = useState();
  const [postsnumber, setpostsnumber] = useState();
  const load = async () => {
    await axios.post(`${BaseURL}homeadmin`).then((res) => {
      setusersrole(res.data.count);
      setusers(res.data.users);
      setposts(res.data.posts);
      setpostulations(res.data.postulations);
      setpostsnumber(res.data.postsnumber);
    });
  };
  useEffect(() => {
    load();
    return setdata(null);
  }, []);
  const colorPalette = ["#EBE850", "#FC944E", "#D253E6", "#4EACFC", "#4AFF4D"];

  return (
    <Card className="p-4">
      <Container style={{ minHeight: "100vh", fontWeight: "700" }}>
        {usersrole ? (
          <Card className="p-1 m-3">
            <Card.Title className="text-center p-2">
              Number of users depend their roles
            </Card.Title>
            <Row>
              <Col md={4}>
                <Card className="p-3">
                  <Row>
                    <Col md={4} className="text-center">
                      {usersrole.users}
                    </Col>
                    <Col md={1}></Col>
                    <Col md={7}>Users</Col>
                  </Row>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="p-3">
                  <Row>
                    <Col md={4} className="text-center">
                      {usersrole.societies}
                    </Col>
                    <Col md={1}></Col>
                    <Col md={7}>Societies</Col>
                  </Row>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="p-3">
                  <Row>
                    <Col md={4} className="text-center">
                      {usersrole.admins}
                    </Col>
                    <Col md={1}></Col>
                    <Col md={7}>Admins</Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Card>
        ) : null}
        {postsnumber ? (
          <Card className="p-1 m-3">
            <Card.Title className="text-center p-2">
              Total postulations and posts
            </Card.Title>
            <Row>
              <Col md={1}></Col>
              <Col md={4}>
                <Card className="p-3">
                  <Row>
                    <Col md={4} className="text-center">
                      {postsnumber.posts}
                    </Col>
                    <Col md={1}></Col>
                    <Col md={7}>posts</Col>
                  </Row>
                </Card>
              </Col>
              <Col md={2}></Col>
              <Col md={4}>
                <Card className="p-3">
                  <Row>
                    <Col md={4} className="text-center">
                      {postsnumber.postulations}
                    </Col>
                    <Col md={1}></Col>
                    <Col md={7}>postulations</Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Card>
        ) : null}
        {users ? (
          <Card className="p-1 m-3">
            <Card.Title className="text-center p-2">
              Users depend of educations and sections
            </Card.Title>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Row>
                    <Col>
                      <Row className="m-2 p-3"></Row>
                      <Row className="m-2">
                        <Col
                          className="box"
                          style={{ backgroundColor: colorPalette[0] }}
                          xs={2}
                        >
                          {users.bachelor}
                        </Col>
                        <Col xs={10}>Bachelor's degree</Col>
                      </Row>
                      <Row className="m-2">
                        <Col
                          className="box"
                          style={{ backgroundColor: colorPalette[1] }}
                          xs={2}
                        >
                          {users.master}
                        </Col>
                        <Col xs={10}>Master's degree</Col>
                      </Row>
                      <Row className="m-2">
                        <Col
                          className="box"
                          style={{ backgroundColor: colorPalette[2] }}
                          xs={2}
                        >
                          {users.doctorate}
                        </Col>
                        <Col xs={10}>Doctorate degree</Col>
                      </Row>
                    </Col>
                    <Col>
                      <RadialChart
                        data={[
                          { angle: users.master },
                          { angle: users.doctorate },
                          { angle: users.bachelor },
                        ]}
                        width={200}
                        height={200}
                        colorType="category"
                        colorRange={colorPalette}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <Row>
                    <Col md={6}>
                      <Row className="m-2">
                        <Col
                          className="box"
                          style={{ backgroundColor: colorPalette[0] }}
                          xs={2}
                        >
                          {users.programming}
                        </Col>
                        <Col xs={10}>Computer programming</Col>
                      </Row>
                      <Row className="m-2">
                        <Col
                          className="box"
                          style={{ backgroundColor: colorPalette[1] }}
                          xs={2}
                        >
                          {users.network}
                        </Col>
                        <Col xs={10}>Computer network</Col>
                      </Row>
                      <Row className="m-2">
                        <Col
                          className="box"
                          style={{ backgroundColor: colorPalette[2] }}
                          xs={2}
                        >
                          {users.intelligence}
                        </Col>
                        <Col xs={10}>Artificial intelligence</Col>
                      </Row>
                      <Row className="m-2">
                        <Col
                          className="box"
                          style={{ backgroundColor: colorPalette[3] }}
                          xs={2}
                        >
                          {users.science}
                        </Col>
                        <Col xs={10}>Data science</Col>
                      </Row>
                      <Row className="m-2">
                        <Col
                          className="box"
                          style={{ backgroundColor: colorPalette[4] }}
                          xs={2}
                        >
                          {users.cyber}
                        </Col>
                        <Col xs={10}>Cyber security</Col>
                      </Row>
                    </Col>
                    <Col>
                      <RadialChart
                        data={[
                          { angle: users.network },
                          { angle: users.cyber },
                          { angle: users.science },
                          { angle: users.intelligence },
                          { angle: users.programming },
                        ]}
                        width={200}
                        height={200}
                        colorType="category"
                        colorRange={[
                          "#EBE850",
                          "#FC944E",
                          "#D253E6",
                          "#4EACFC",
                          "#4AFF4D",
                        ]}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ) : null}
        {posts ? (
          <Card className="p-1 m-3">
            <Card.Title className="text-center p-2">
              posts depend of educations and sections
            </Card.Title>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Row>
                    <Col>
                      <Row className="m-2 p-3"></Row>
                      <Row className="m-2">
                        <Col
                          className="box"
                          style={{ backgroundColor: colorPalette[0] }}
                          xs={2}
                        >
                          {posts.bachelor}
                        </Col>
                        <Col xs={10}>Bachelor's degree</Col>
                      </Row>
                      <Row className="m-2">
                        <Col
                          className="box"
                          style={{ backgroundColor: colorPalette[1] }}
                          xs={2}
                        >
                          {posts.master}
                        </Col>
                        <Col xs={10}>Master's degree</Col>
                      </Row>
                      <Row className="m-2">
                        <Col
                          className="box"
                          style={{ backgroundColor: colorPalette[2] }}
                          xs={2}
                        >
                          {posts.doctorate}
                        </Col>
                        <Col xs={10}>Doctorate degree</Col>
                      </Row>
                    </Col>
                    <Col>
                      <RadialChart
                        data={[
                          { angle: posts.master },
                          { angle: posts.doctorate },
                          { angle: posts.bachelor },
                        ]}
                        width={200}
                        height={200}
                        colorType="category"
                        colorRange={colorPalette}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <Row>
                    <Col md={6}>
                      <Row className="m-2">
                        <Col
                          className="box"
                          style={{ backgroundColor: colorPalette[0] }}
                          xs={2}
                        >
                          {posts.programming}
                        </Col>
                        <Col xs={10}>Computer programming</Col>
                      </Row>
                      <Row className="m-2">
                        <Col
                          className="box"
                          style={{ backgroundColor: colorPalette[1] }}
                          xs={2}
                        >
                          {posts.network}
                        </Col>
                        <Col xs={10}>Computer network</Col>
                      </Row>
                      <Row className="m-2">
                        <Col
                          className="box"
                          style={{ backgroundColor: colorPalette[2] }}
                          xs={2}
                        >
                          {posts.intelligence}
                        </Col>
                        <Col xs={10}>Artificial intelligence</Col>
                      </Row>
                      <Row className="m-2">
                        <Col
                          className="box"
                          style={{ backgroundColor: colorPalette[3] }}
                          xs={2}
                        >
                          {posts.science}
                        </Col>
                        <Col xs={10}>Data science</Col>
                      </Row>
                      <Row className="m-2">
                        <Col
                          className="box"
                          style={{ backgroundColor: colorPalette[4] }}
                          xs={2}
                        >
                          {posts.cyber}
                        </Col>
                        <Col xs={10}>Cyber security</Col>
                      </Row>
                    </Col>
                    <Col>
                      <RadialChart
                        data={[
                          { angle: posts.network },
                          { angle: posts.cyber },
                          { angle: posts.science },
                          { angle: posts.intelligence },
                          { angle: posts.programming },
                        ]}
                        width={200}
                        height={200}
                        colorType="category"
                        colorRange={[
                          "#EBE850",
                          "#FC944E",
                          "#D253E6",
                          "#4EACFC",
                          "#4AFF4D",
                        ]}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ) : null}
        {postulations ? (
          <Card className="p-3 m-3">
            <Card.Title className="text-center p-2">
              postulations depend of educations and sections
            </Card.Title>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Row>
                    <Col>
                      <Row className="m-2 p-3"></Row>
                      <Row className="m-2">
                        <Col
                          className="box"
                          style={{ backgroundColor: colorPalette[0] }}
                          xs={2}
                        >
                          {postulations.bachelor}
                        </Col>
                        <Col xs={10}>Bachelor's degree</Col>
                      </Row>
                      <Row className="m-2">
                        <Col
                          className="box"
                          style={{ backgroundColor: colorPalette[1] }}
                          xs={2}
                        >
                          {postulations.master}
                        </Col>
                        <Col xs={10}>Master's degree</Col>
                      </Row>
                      <Row className="m-2">
                        <Col
                          className="box"
                          style={{ backgroundColor: colorPalette[2] }}
                          xs={2}
                        >
                          {postulations.doctorate}
                        </Col>
                        <Col xs={10}>Doctorate degree</Col>
                      </Row>
                    </Col>
                    <Col>
                      <RadialChart
                        data={[
                          { angle: postulations.master },
                          { angle: postulations.doctorate },
                          { angle: postulations.bachelor },
                        ]}
                        width={200}
                        height={200}
                        colorType="category"
                        colorRange={colorPalette}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <Row>
                    <Col md={6}>
                      <Row className="m-2">
                        <Col
                          className="box"
                          style={{ backgroundColor: colorPalette[0] }}
                          xs={2}
                        >
                          {postulations.programming}
                        </Col>
                        <Col xs={10}>Computer programming</Col>
                      </Row>
                      <Row className="m-2">
                        <Col
                          className="box"
                          style={{ backgroundColor: colorPalette[1] }}
                          xs={2}
                        >
                          {postulations.network}
                        </Col>
                        <Col xs={10}>Computer network</Col>
                      </Row>
                      <Row className="m-2">
                        <Col
                          className="box"
                          style={{ backgroundColor: colorPalette[2] }}
                          xs={2}
                        >
                          {postulations.intelligence}
                        </Col>
                        <Col xs={10}>Artificial intelligence</Col>
                      </Row>
                      <Row className="m-2">
                        <Col
                          className="box"
                          style={{ backgroundColor: colorPalette[3] }}
                          xs={2}
                        >
                          {postulations.science}
                        </Col>
                        <Col xs={10}>Data science</Col>
                      </Row>
                      <Row className="m-2">
                        <Col
                          className="box"
                          style={{ backgroundColor: colorPalette[4] }}
                          xs={2}
                        >
                          {postulations.cyber}
                        </Col>
                        <Col xs={10}>Cyber security</Col>
                      </Row>
                    </Col>
                    <Col>
                      <RadialChart
                        data={[
                          { angle: postulations.network },
                          { angle: postulations.cyber },
                          { angle: postulations.science },
                          { angle: postulations.intelligence },
                          { angle: postulations.programming },
                        ]}
                        width={200}
                        height={200}
                        colorType="category"
                        colorRange={[
                          "#EBE850",
                          "#FC944E",
                          "#D253E6",
                          "#4EACFC",
                          "#4AFF4D",
                        ]}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ) : null}
      </Container>
    </Card>
  );
};

export default HomeAdmin;
