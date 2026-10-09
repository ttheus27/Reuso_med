import { Fragment, useState } from "react";
import { Range, getTrackBackground } from "react-range";

const LabeledTwoThumbs = ({ rtl }) => {
	const STEP = 0.1;
	const MIN = 0;
	const MAX = 100;

	const [values, setValues] = useState([20, 40]);

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				flexWrap: "wrap",
			}}
		>
			<Range
				values={values}
				step={STEP}
				min={MIN}
				max={MAX}
				rtl={rtl}
				onChange={(newValues) => setValues(newValues)}
				renderTrack={({ props, children }) => (
					<div
						onMouseDown={props.onMouseDown}
						onTouchStart={props.onTouchStart}
						style={{
							...props.style,
							height: "36px",
							display: "flex",
							width: "100%",
						}}
					>
						<div
							className="rangeslider-thumb"
							ref={props.ref}
							style={{
								height: "5px",
								width: "100%",
								borderRadius: "4px",
								background: getTrackBackground({
									values,
									colors: ["#ccc", "#38cab3", "#ccc"],
									min: MIN,
									max: MAX,
									rtl,
								}),
								alignSelf: "center",
							}}
						>
							{children}
						</div>
					</div>
				)}
				renderThumb={({ index, props, isDragged }) => (
					<Fragment key={Math.random()}>
						<div
							{...props}
							key={index}
							style={{
								...props.style,
								top: "16px",
								height: "24px",
								width: "24px",
								borderRadius: "4px",
								backgroundColor: "#FFF",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								border: "1px solid #38cab3",
								boxShadow: "0px 2px 6px rgb(170 170 170 / 30%)",
								// boxShadow: '0px 2px 6px #AAA',
							}}
						>
							<Fragment key={Math.random()}>
								<div
									style={{
										height: "26px",
										width: "36px",
										position: "absolute",
										top: "-29px",
										color: "#fff",
										fontWeight: "bold",
										fontSize: "14px",
										fontFamily: "Arial, Helvetica Neue, Helvetica, sans-serif",
										padding: "4px",
										borderRadius: "4px",
										backgroundColor: "#38cab3",
									}}
								>
									{values[index].toFixed(1)}
								</div>
								<div
									style={{
										height: "16px",
										width: "5px",
										backgroundColor: isDragged ? "#4a77f0" : "#CCC",
									}}
								/>
							</Fragment>
						</div>
					</Fragment>
				)}
			/>
		</div>
	);
};

export default LabeledTwoThumbs;
export const Marks = ({ rtl }) => {
	const STEP = 10;
	const MIN = 0;
	const MAX = 100;

	const [values, setValues] = useState([50]);

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				flexWrap: "wrap",
			}}
		>
			<Range
				values={values}
				step={STEP}
				min={MIN}
				max={MAX}
				rtl={rtl}
				onChange={(newValues) => setValues(newValues)}
				renderMark={({ props, index }) => (
					<div
						{...props}
						key={`mark-${index} *66`}
						style={{
							...props.style,
							height: "16px",
							width: "5px",
							backgroundColor: index * STEP < values[0] ? "#38cab3" : "#ccc",
						}}
					/>
				)}
				renderTrack={({ props, children }) => (
					<div
						onMouseDown={props.onMouseDown}
						onTouchStart={props.onTouchStart}
						style={{
							...props.style,
							height: "36px",
							display: "flex",
							width: "100%",
						}}
					>
						<div
							className="rangeslider-thumb"
							ref={props.ref}
							style={{
								height: "5px",
								width: "100%",
								borderRadius: "4px",
								background: getTrackBackground({
									values,
									colors: ["#38cab3", "#ccc"],
									min: MIN,
									max: MAX,
									rtl,
								}),
								alignSelf: "center",
							}}
						>
							{children}
						</div>
					</div>
				)}
				renderThumb={({ props, isDragged }) => (
					<div
						{...props}
						key="thumb"
						style={{
							...props.style,
							height: "35px",
							width: "35px",
							borderRadius: "4px",
							backgroundColor: "#FFF",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							boxShadow: "0px 2px 6px #AAA",
						}}
					>
						<div
							style={{
								height: "16px",
								width: "5px",
								backgroundColor: isDragged ? "#38cab3" : "#CCC",
							}}
						/>
					</div>
				)}
			/>
		</div>
	);
};
