import Toast from 'react-native-toast-message'

export const showToast = (type, text1, text2) => {
    Toast.show({
        type: type,
        position: 'bottom',
        text1: text1,
        text2: text2,
        visibilityTime: 3000,
        autoHide: true
    })
}