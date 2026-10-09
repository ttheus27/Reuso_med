import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<link href="https://cdn.jsdelivr.net/npm/dragula@3.7.3/dist/dragula.min.css" rel="stylesheet"></link>
			<Head />
			<body>
				<Main />
				<script src="https://cdn.jsdelivr.net/npm/dragula@3.7.3/dist/dragula.min.js"></script>
				<NextScript />
			</body>
		</Html>
	);
}
