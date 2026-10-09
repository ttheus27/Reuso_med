import React, { useState, useEffect } from "react";
import Link from "next/link";

const TabToTop = () => {
	const [BacktoTop, setBacktopTop] = useState("");
	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 100) {
				setBacktopTop("d-flex");
			} else setBacktopTop("");
		});
	}, []);
	const screenup = () => {
		window.scrollTo({
			top: 10,
			behavior: "auto",
			//   smooth
		});
	};
	return (
	
		<div
			
			className={`scrollToTop ${BacktoTop}`}
			onClick={screenup}
		
		>
			<span className="arrow"><i className="ri-arrow-up-s-fill fs-20"></i></span>
		</div>
	
	);
};

export default TabToTop;
