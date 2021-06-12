import React from "react"
import Navbar from "./NavBar"
import "../styles/info.css";
import { Row, Col } from "react-bootstrap"
import logo from "../images/logo.jpg";


export default function Contact() {

      return (
        <>
        <Navbar />
        <body>
        <div class="container">
        <div class="about">
          <br/>
          <div class="about1">
          <Row>
            <Col xs="6">
          <div class="map">
          <img
            className="d-block w-100"
            src={logo}
            alt="Logo"
            height="300px"
          />
          </div>
          </Col>
          <Col xs={5}>
          <br/><br/>
            <div class="opis">Firma Petrokomis powstała w 2010 roku i ma profil handlowy. Specjalizuje się w sprzedaży szeroko pojętych systemów technologicznych do transportu węglowodorów 
            oraz innych cieczy. <br/><br/> Chcąc sprostać wymaganiom naszych klientów gwarantujemy najwyższą jakość produktów oraz maksymalną elastyczność przy ich zakupie: konkurencyjne ceny, 
            terminową dostawę materiałów, szkolenia i wyposażenie dla ekip montażowych, szkolenia dla projektantów instalacji, a także niezbędny nadzór na placach budów. Nasi doświadczeni 
            specjaliści służą pomocą przy rozwiązywaniu wszelkiego rodzaju problemów związanych z instalacjami technologicznymi. Efektem tych działań jest rozwój firmy i systematyczny wzrost 
            sprzedaży. <br/><br/> Zależy nam przede wszystkim na zadowoleniu naszych klientów, partnerskiej współpracy i wzajemnej wymianie doświadczeń.
            </div>
            </Col>
          </Row>
          </div>
          <br/><br/>
          <div class="contact">
          <br/>
          <Row>
              <Col xs="4"><i class="fas fa-map-marker-alt fa-2x fa-fw1"></i>ul. Zaciszna 2, 84-208 Dobrzewino</Col>
              <Col xs="4"><i class="fas fa-phone-alt fa-2x fa-fw2"></i>+48 691 310 954</Col>
              <Col xs="4"><i class="fas fa-envelope fa-2x fa-fw3"></i>   petrokomis@wp.pl</Col>
          </Row>
          <br/>
          </div>
        </div>
        </div>
        </body>
      </>
      )
}

