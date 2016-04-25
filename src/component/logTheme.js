import Colors from 'material-ui/lib/styles/colors'
import ColorManipulator from 'material-ui/lib/utils/color-manipulator'
import Spacing from 'material-ui/lib/styles/spacing'

export default {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
   primary1Color: Colors.amberA400,
    primary2Color: Colors.amberA700,
    primary3Color: Colors.grey50,
    accent1Color: Colors.amberA200,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey200,
    textColor: Colors.darkWhite,
    alternateTextColor: Colors.darkWhite,
    canvasColor: Colors.grey900,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkWhite, 0.3),
    pickerHeaderColor: Colors.amberA400,
    clockCircleColor: ColorManipulator.fade(Colors.darkWhite, 0.07),
  },
}
