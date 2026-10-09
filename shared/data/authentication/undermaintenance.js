
import { Col, Row } from "react-bootstrap";
import Countdown from "react-countdown";

const render = ({ days, hours, minutes, seconds }) => (
	<Row className=" row-sm mx-auto" id="timer">

		<Col xxl={3} xl={3} lg={3} md={3} sm={3} className="col-6 mb-3 mb-sm-1">
			<div className="p-2 under-maintenance-time rounded">
				<p className="mb-1 fs-12 op-9">DAYS</p>
				<h4 className="fw-semibold mb-0 text-fixed-white">{days}</h4>
			</div>
		</Col>
		<Col xxl={3} xl={3} lg={3} md={3} sm={3} className="col-6 mb-3 mb-sm-1">
			<div className="p-2 under-maintenance-time rounded">
				<p className="mb-1 fs-12 op-9">Hours</p>
				<h4 className="fw-semibold mb-0 text-fixed-white">{hours}</h4>
			</div>
		</Col>
		<Col xxl={3} xl={3} lg={3} md={3} sm={3} className="col-6 mb-3 mb-sm-1">
			<div className="p-2 under-maintenance-time rounded">
				<p className="mb-1 fs-12 op-9">Minutes</p>
				<h4 className="fw-semibold mb-0 text-fixed-white">{minutes}</h4>
			</div>
		</Col>
		<Col xxl={3} xl={3} lg={3} md={3} sm={3} className="col-6 mb-3 mb-sm-1">
			<div className="p-2 under-maintenance-time rounded">
				<p className="mb-1 fs-12 op-9">Seconds</p>
				<h4 className="fw-semibold mb-0 text-fixed-white">{seconds}</h4>
			</div>
		</Col>

	</Row>
);

export function DayCounter() {
	return (
		<Countdown date={Date.now() + 20888000000} renderer={render} />
	);
}
