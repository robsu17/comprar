import { FilterStatus } from '@/types/FilterStatus'
import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native'
import { styles } from './styles'
import { CircleCheck,  } from 'lucide-react-native'

interface FilterProps extends Omit<TouchableOpacityProps, 'style'> {
    status: FilterStatus
    isActive: boolean
}

export function Filter({ status, isActive, ...rest }: FilterProps) {
    return (
        <TouchableOpacity 
            style={[styles.container, { opacity: isActive ? 1 : 0.5 }]} 
            activeOpacity={0.8}
            {...rest}
        >
            <CircleCheck size={18} color="#000" />

            <Text style={styles.title}>
                { status === FilterStatus.DONE ? 'Comprados' : 'Pendentes' }
            </Text>
        </TouchableOpacity>
    )
}