import ReactDOM, {Root} from "react-dom/client";
import DialogNode from "./dialog-node";

import Style from './index.module.scss';
import {DialogInstance, DialogNodeProps} from "./interface";

// import '../assets/fontawesome-free-6.4.0-web/css/regular.min.css';
// import '../assets/fontawesome-free-6.4.0-web/css/fontawesome.min.css';
import '../../assets/fontawesome-free-6.4.0-web/css/all.min.css';


interface DialogProps {
		onCancel?: (instance: DialogInstance) => void;
		onOk?: (instance: DialogInstance) => void;
}

// type DialogType = { dialogRoot?: Root, id: string, show: (options?: DialogNodeProps & DialogProps) => void, close: () => void };

class Dialog {
		private dialogRoot: Root | undefined = undefined;
		private id: string = "";

		show(options?: DialogNodeProps & DialogProps) {
				const dialogDocument = document.createElement("div");
				this.id = "dialog-" + Math.random().toString(36).slice(-8);
				dialogDocument.setAttribute("id", this.id);
				dialogDocument.setAttribute("class", Style.dialog);
				document.body.insertBefore(dialogDocument, null);
				this.dialogRoot = ReactDOM.createRoot(dialogDocument);
				const onCancel = () => {
						options?.onCancel?.(this);
				}

				const onOk = () => {
						options?.onOk?.(this);
				}

				this.dialogRoot!.render(<DialogNode {...options} onCancel={onCancel} onOk={onOk}/>);
				return this;
		}

		close() {
				this.dialogRoot?.unmount();
				document.body.removeChild(document.getElementById(this.id)!);
		}
}

export default Dialog;
