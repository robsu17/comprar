import { styles } from "./styles";
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native'

interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
    title: string;
}

export function Button({ title, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity 
            style={styles.container} 
            {...rest}
        >
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}