import { switchDrop } from "./switchDrop.mjs";
import { switchButton } from "./switchButton.mjs";

export function switchAction(data, level, buttonsPath) {
    var option = data.option;
    switch (data.action) {
        case "clic":
            return switchButton(data, level, buttonsPath);
        case "drop":
            return switchDrop(data, level, buttonsPath, option);
        default:

    }
}