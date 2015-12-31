import Colors from 'material-ui/lib/styles/colors'
import ColorManipulator from 'material-ui/lib/utils/color-manipulator'
import Spacing from 'material-ui/lib/styles/spacing'

export default {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.greenA400,
    primary2Color: Colors.greenA700,
    primary3Color: Colors.grey400,
    accent1Color: Colors.pinkA200,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.greenA400,
    clockCircleColor: ColorManipulator.fade(Colors.darkBlack, 0.07),
  },
}
