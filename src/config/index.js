import { Dimensions } from 'react-native';
import Styles from './styles';

const { height, width, fontScale, scale } = Dimensions.get("window");

const screenHeight = height;
const screenWidth = width;


const log = (msg, header = 'LOG: ') => {
    __DEV__ && console.log(header, msg);
}

export {
    screenHeight,
    screenWidth,
    fontScale,
    scale,
    Styles,
    log,
}