import ReactDOM, {Root} from "react-dom/client";
import DialogNode from "./dialog-node/index";

import Style from './index.module.scss';
import {DialogInstance, DialogNodeProps} from "./Props";

// import '../assets/fontawesome-free-6.4.0-web/css/regular.min.css';
// import '../assets/fontawesome-free-6.4.0-web/css/fontawesome.min.css';
import '../assets/fontawesome-free-6.4.0-web/css/all.min.css';


interface DialogProps {
		onCancel?: (instance: DialogInstance) => void;
		onOk?: (instance: DialogInstance) => void;
}


let dialogRoot: Root;
const Dialog = {
		show(options?: DialogNodeProps & DialogProps) {
				const dialogDocument = document.createElement("div");
				dialogDocument.setAttribute("id", "dialog");
				dialogDocument.setAttribute("class", Style.dialog);
				document.body.insertBefore(dialogDocument, null);

				dialogRoot = ReactDOM.createRoot(dialogDocument);

				const onCancel = () => {
						options?.onCancel?.(this);
				}

				const onOk = () => {
						options?.onOk?.(this);
				}

				dialogRoot.render(<DialogNode {...options} onCancel={onCancel} onOk={onOk}/>);
				return this;
		},
		close() {
				dialogRoot.unmount();
				document.body.removeChild(document.getElementById("dialog")!);
		}
}

export default Dialog;
