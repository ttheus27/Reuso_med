import { Fragment, useState } from "react";
import Lightbox from "yet-another-react-lightbox";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";

export const Gallery2 = () => {

	const [open, setOpen] = useState(false);
	return (
		<Fragment>
			<Row>
				<Col xl={3} md={4} sm={6} className="col-12">
					<Link href="#!" className="glightbox card border-0" data-gallery="gallery1">
						<img src="../../../assets/images/media/media-91.jpg" alt="image" onClick={() => setOpen(true)} />
					</Link>
				</Col>
				<Col xl={3} md={4} sm={6} className="col-12">
					<Link href="#!" className="glightbox card border-0" data-gallery="gallery1">
						<img src="../../../assets/images/media/media-92.jpg" alt="image" onClick={() => setOpen(true)} />
					</Link>
				</Col>
				<Col xl={3} md={4} sm={6} className="col-12">
					<Link href="#!" className="glightbox card border-0" data-gallery="gallery1">
						<img src="../../../assets/images/media/media-93.jpg" alt="image" onClick={() => setOpen(true)} />
					</Link>
				</Col>
				<Col xl={3} md={4} sm={6} className="col-12">
					<Link href="#!" className="glightbox card border-0" data-gallery="gallery1">
						<img src="../../../assets/images/media/media-94.jpg" alt="image" onClick={() => setOpen(true)} />
					</Link>
				</Col>
				<Col xl={3} md={4} sm={6} className="col-12">
					<Link href="#!" className="glightbox card border-0" data-gallery="gallery1">
						<img src="../../../assets/images/media/media-95.jpg" alt="image" onClick={() => setOpen(true)} />
					</Link>
				</Col>
				<Col xl={3} md={4} sm={6} className="col-12">
					<Link href="#!" className="glightbox card border-0" data-gallery="gallery1">
						<img src="../../../assets/images/media/media-96.jpg" alt="image" onClick={() => setOpen(true)} />
					</Link>
				</Col>
				<Col xl={3} md={4} sm={6} className="col-12">
					<Link href="#!" className="glightbox card border-0" data-gallery="gallery1">
						<img src="../../../assets/images/media/media-97.jpg" alt="image" onClick={() => setOpen(true)} />
					</Link>
				</Col>
				<Col xl={3} md={4} sm={6} className="col-12">
					<Link href="#!" className="glightbox card border-0" data-gallery="gallery1">
						<img src="../../../assets/images/media/media-98.jpg" alt="image" onClick={() => setOpen(true)} />
					</Link>
				</Col>
				
			</Row>

			<Lightbox open={open} close={() => setOpen(false)} plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]} zoom={{
				maxZoomPixelRatio: 10,
				scrollToZoom: true
			}}
			slides={[{ src: "../../../assets/images/media/media-91.jpg" }, { src: "../../../assets/images/media/media-92.jpg" },
				{ src: "../../../assets/images/media/media-93.jpg" }, { src: "../../../assets/images/media/media-94.jpg" },
				{ src: "../../../assets/images/media/media-95.jpg" }, { src: "../../../assets/images/media/media-96.jpg" },
				{ src: "../../../assets/images/media/media-97.jpg" }, { src: "../../../assets/images/media/media-98.jpg" },
			]} />

		</Fragment>
	);
};
