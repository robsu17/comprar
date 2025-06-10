import { FilterStatus } from '@/types/FilterStatus'
import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native'
import { styles } from './styles'
import { StatusIcon } from '../StatusIcon'

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
            <StatusIcon status={status} />

            <Text style={styles.title}>
                { status === FilterStatus.DONE ? 'Comprados' : 'Pendentes' }
            </Text>
        </TouchableOpacity>
    )
}