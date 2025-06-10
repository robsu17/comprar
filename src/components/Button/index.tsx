import { ReactNode } from "react";
import { styles } from "./styles";
import { TouchableOpacity, Text } from 'react-native'

interface ButtonProps {
    children: ReactNode
}

export function Button({ children }: ButtonProps) {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7}>
            <Text style={styles.title}>{children}</Text>
        </TouchableOpacity>
    )
}