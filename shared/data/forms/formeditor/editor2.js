import dynamic from "next/dynamic";
import { Component } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const defaultContent = `

  <h4><b className="ql-size-large">Quill Bubble</b> is a free, open source <a href="https://github.com/quilljs/quill/" target="_blank">Quill Editor</a> built for the modern web. With its <a href="https://quilljs.com/docs/modules/" target="_blank">modular architecture</a> and expressive API, it is completely customizable to fit any need.</h4>
  <p><br/></p>
  <ol>
      <li className="ql-size-normal">Write text, select and edit with multiple options.</li>
      <li className="">This is quill bubble editor.</li>
      <li className="">Easy to customize and flexible.</li>
  </ol>
  <p><br/></p>
  <h4>Quill officially supports a standard toolbar theme <a href="https://github.com/quilljs/quill/" target="_blank">"Snow"</a> and a floating tooltip theme <a href="https://github.com/quilljs/quill/" target="_blank">"Bubble"</a></h4>
`;

class Editor1 extends Component{ quill;

	static modules = {
		toolbar: [
			[{ "header": "1" }, { "header": "2" }, { "blockquote": "blockquote" }],
			["bold", "italic", "link"],
		],
		clipboard: {
			matchVisual: false,
		},
	};

	constructor(props) {
		super(props);
		this.state = { editorHtml: defaultContent, theme: "bubble", showToolbar: false };
		this.handleChange = this.handleChange.bind(this);
		this.handleSelectionChange = this.handleSelectionChange.bind(this);
	}

	componentDidMount() {
		if (this.quill) {
			this.quill.on("selection-change", this.handleSelectionChange);
		}
	}

	handleChange(html) {
		this.setState({ editorHtml: html });
	}

	handleSelectionChange(range) {
		if (range && range.length > 0) {
			this.setState({ showToolbar: true });
		} else {
			this.setState({ showToolbar: false });
		}
	}

	render() {
		return (
			<>
				<ReactQuill
					theme={this.state.theme}
					onChange={this.handleChange}
					value={this.state.editorHtml}
					modules={Editor1.modules}
					formats={Editor1.formats}
					//   ref={(quill) => {
					//     if (quill) {
					//       this.quill = quill.getEditor();
					//     }
					//   }}
				/>
			</>
		);
	}
}

export default Editor1;

