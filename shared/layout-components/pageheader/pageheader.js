import React, { Fragment } from "react";
import { Breadcrumb } from "react-bootstrap";

import { useRouter } from "next/router";
const Pageheader = ({ title, heading, active }) => {

	return (
		<Fragment>
			<div className="breadcrumb-header justify-content-between">
				<div className="left-content">
					<span className="main-content-title mg-b-0 mg-b-lg-1">{title}</span>
				</div>

				<div className="justify-content-center mt-2">
					<nav>
						<Breadcrumb as="ol" className="mb-0 breadcrumb">
							{heading && (
								<Breadcrumb.Item as="li" className="fs-15" href="#!">
									{heading}
								</Breadcrumb.Item>
							)}
							<Breadcrumb.Item aria-current="page" active>
								{active}
							</Breadcrumb.Item>
						</Breadcrumb>
					</nav>
				</div>
			</div>
		</Fragment>

	);
};
export default Pageheader;
