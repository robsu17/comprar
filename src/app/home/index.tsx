import { Image, View } from 'react-native';
import { styles } from './styles';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export default function Home() {
	return (
		<View style={styles.container}>
			<Image source={require('@/assets/logo.png')} style={styles.logo} />

			<View style={styles.form}>
				<Input placeholder='O que você precisa comprar?' />
				<Button title='Adicionar' activeOpacity={0.7} />
			</View>

			<View style={styles.content}>

			</View>
		</View>
	);
}