import React, {useState} from "react";
import Style from './index.module.scss';
import {DialogNodeProps} from "../Props";


const Index: React.FC<DialogNodeProps & { onCancel: () => void, onOk: () => void }> = (props) => {
		const [isFullScreen, changeFullScreen] = useState<boolean>(false);


		return <div className={[Style.dialogContainer, isFullScreen ? Style.fullscreen : ''].join(' ')}>
				{/*return <div className={[Style.dialogContainer].join(' ')}>*/}
				<div className={Style.header}>
						<div className={Style.title}>{props.title}</div>
						<div className={Style.toolIcon}>
								<div className={Style.icon}><i className="fa-solid fa-minus"></i></div>
								<div className={Style.icon} onClick={() => changeFullScreen(!isFullScreen)}>
										{/*<div className={Style.icon}>*/}
										<i className="fa-solid fa-expand"></i>
								</div>
								<div className={Style.icon} onClick={props.onCancel}>
										<i className="fa-solid fa-close"></i>
								</div>
						</div>
				</div>
				<div className={Style.body}>
						{props.children}
				</div>
				<div className={Style.footer}>
						<div>
								<button className={Style.btn} onClick={props.onCancel}>取消</button>
								<button className={[Style.btn, Style.primary].join(' ')} onClick={props.onOk}>确认</button>
						</div>
				</div>
		</div>
}

export default Index;
