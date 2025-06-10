import { Image, View } from 'react-native';
import { styles } from './styles';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter';
import { FilterStatus } from '@/types/FilterStatus';

export default function Home() {
	return (
		<View style={styles.container}>
			<Image source={require('@/assets/logo.png')} style={styles.logo} />

			<View style={styles.form}>
				<Input placeholder='O que você precisa comprar?' />
				<Button title='Adicionar' activeOpacity={0.7} />
			</View>

			<View style={styles.content}>
				<Filter status={FilterStatus.DONE} isActive />
				<Filter status={FilterStatus.PENDING} isActive={false} />
			</View>
		</View>
	);
}