import Dialog from "./index";
import {PropsWithChildren} from "react";

export type DialogInstance = typeof Dialog;

export interface DialogNodeProps extends PropsWithChildren {
		title?: string;
		canMax?: boolean;
		canMin?: boolean;
		canClose?: boolean;
		// onCancel?: () => void;
		onOk?: () => void;
}
