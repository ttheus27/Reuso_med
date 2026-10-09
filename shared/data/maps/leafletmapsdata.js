import { Fragment } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import {
    Circle,
    CircleMarker,
    MapContainer,
    Polygon,
    Polyline,
    Popup,
    Rectangle,
    TileLayer,
} from 'react-leaflet';
import Pageheader from '../../layout-components/pageheader/pageheader';
const position = [51.505, -0.09];
const redOptions = { color: 'red' };
const center = [51.51, -0.12];
const fillBlueOptions = { fillColor: 'blue' };
const blackOptions = { color: 'black' };
const limeOptions = { color: 'lime' };
const purpleOptions = { color: 'purple' };
const polyline = [
    [51.505, -0.09],
    [51.51, -0.1],
    [51.51, -0.12],
];
const multiPolyline = [
    [
        [51.5, -0.1],
        [51.5, -0.12],
        [51.52, -0.12],
    ],
    [
        [51.5, -0.05],
        [51.5, -0.06],
        [51.52, -0.06],
    ],
];

const polygon = [
    [51.515, -0.09],
    [51.52, -0.1],
    [51.52, -0.12],
];

const multiPolygon = [
    [
        [51.51, -0.12],
        [51.51, -0.13],
        [51.53, -0.13],
    ],
    [
        [51.51, -0.05],
        [51.51, -0.07],
        [51.53, -0.07],
    ],
];

const rectangle = [
    [51.49, -0.08],
    [51.5, -0.06],
];
function Leafletmapsdata() {
    return (
        <Fragment>
            <Pageheader
                title="LEAFLET MAPS"
                heading="Maps"
                active="Leaflet maps"
            />
            <Row>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">Leaflet Map</div>
                        </Card.Header>
                        <Card.Body>
                            <div id="map">
                                <MapContainer
                                    center={position}
                                    zoom={13}
                                    scrollWheelZoom={true}
                                    className="mapleaflet ht-300"
                                    id="leaflet1"
                                    style={{ height: '300px' }}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                </MapContainer>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">
                                Map With Markers,Circles and Polygons
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div id="map1">
                                <MapContainer
                                    center={center}
                                    zoom={13}
                                    scrollWheelZoom={true}
                                    className="ht-200 ht-sm-300 ht-md-400 popup-map"
                                    id="leaflet3"
                                    style={{ height: '300px' }}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Circle
                                        center={center}
                                        pathOptions={fillBlueOptions}
                                        radius={200}
                                    />
                                    <CircleMarker
                                        center={[51.51, -0.12]}
                                        pathOptions={redOptions}
                                        radius={20}
                                    >
                                        <Popup>Popup in CircleMarker</Popup>
                                    </CircleMarker>
                                    <Polyline
                                        pathOptions={limeOptions}
                                        positions={polyline}
                                    />
                                    <Polyline
                                        pathOptions={limeOptions}
                                        positions={multiPolyline}
                                    />
                                    <Polygon
                                        pathOptions={purpleOptions}
                                        positions={polygon}
                                    />
                                    <Polygon
                                        pathOptions={purpleOptions}
                                        positions={multiPolygon}
                                    />
                                    <Rectangle
                                        bounds={rectangle}
                                        pathOptions={blackOptions}
                                    />
                                </MapContainer>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">Map With Popup</div>
                        </Card.Header>
                        <Card.Body>
                            <div id="map-popup">
                                <MapContainer
                                    center={center}
                                    zoom={13}
                                    scrollWheelZoom={true}
                                    className="ht-300 circle-map"
                                    id="leaflet2"
                                    style={{ height: '300px' }}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <CircleMarker
                                        center={[51.51, -0.12]}
                                        pathOptions={redOptions}
                                        radius={20}
                                    >
                                        <Popup>Popup in CircleMarker</Popup>
                                    </CircleMarker>
                                </MapContainer>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">
                                Interactive Choropleth Map
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div id="interactive-map">
                                <MapContainer
                                    center={position}
                                    zoom={13}
                                    scrollWheelZoom={true}
                                    className="mapleaflet ht-300"
                                    id="interactive-map"
                                    style={{ height: '300px' }}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                </MapContainer>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
}
export default Leafletmapsdata;
