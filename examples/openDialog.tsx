import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import {openDialog} from "../packages";

const Test: React.FC = () => {

		const onClick1 = () => {
				openDialog({
						width: "60%",
						children: <div>
								这里是第二个
						</div>,
						onClose: () => {
								console.log("AA");
						}
				})
		}

		const onClick = () => {
				openDialog({
						children: <div>
								<button onClick={onClick1}>打开</button>
						</div>,
						onClose: () => {


								console.log("AA");
								// closeDialog();
						}
				})
		}

		return <>
				<button onClick={onClick}>显示</button>
		</>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
		// <button onClick={onClick}>点击</button>

		<Test/>
);
