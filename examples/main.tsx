import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import Dialog from "../packages";

const Test: React.FC = () => {
		const [visible, setVisible] = useState<boolean>(false);


		return <>
				<button onClick={() => setVisible(true)}>显示</button>
				<Dialog visible={visible} onClose={() => setVisible(false)}
								title="文件资源管理器文件资源管理器文件资源管理器文件资源管理器"/>
		</>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
		// <button onClick={onClick}>点击</button>

		<Test/>
);
