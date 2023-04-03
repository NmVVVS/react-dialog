import React from "react";
import ReactDOM from "react-dom/client";
import ReactDialog from '../packages/dialog';

const onClick = () => {
		ReactDialog.show({
				children: <div>aaaa</div>
		})
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
		<button onClick={onClick}>点击</button>
);
