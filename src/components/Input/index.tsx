import { TextInput, TextInputProps } from 'react-native'
import { styles } from './styles'

export function Input({ ...rest }: Omit<TextInputProps, 'style'>) {
    return (
        <TextInput
            {...rest}
            style={styles.container}
        />
    )
}