import { Image, TouchableOpacity, View, Text, ScrollView, FlatList } from 'react-native';
import { styles } from './styles';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter';
import { FilterStatus } from '@/types/FilterStatus';
import { Item, ItemData } from '@/components/Item';

const FILTER_STATUS: FilterStatus[] = [
	FilterStatus.DONE,
	FilterStatus.PENDING,
];

const ITEMS: ItemData[] = [
	{ status: FilterStatus.DONE, description: "1 pacote de café" },
	{ status: FilterStatus.PENDING, description: "3 pacotes de macarrão" },
	{ status: FilterStatus.PENDING, description: "3 cebolas" },
]

export default function Home() {
	const handleRemove = () => {
		console.log("Remover item")
	}

	const handleStatus = () => {
		console.log("Muda status")
	}

	return (
		<View style={styles.container}>
			<Image source={require('@/assets/logo.png')} style={styles.logo} />

			<View style={styles.form}>
				<Input placeholder='O que você precisa comprar?' />
				<Button title='Adicionar' activeOpacity={0.7} />
			</View>

			<View style={styles.content}>
				<View style={styles.header}>
					{
						FILTER_STATUS.map((item, index) => (
							<Filter key={index} status={item} isActive />
						))
					}
					<TouchableOpacity style={styles.clearButton}>
						<Text style={styles.clearText}>Limpar</Text>
					</TouchableOpacity>
				</View>

				<FlatList
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.listContent}
					data={ITEMS}
					ListEmptyComponent={() => <Text style={styles.empty}>Nenhum item aqui.</Text>}
					ItemSeparatorComponent={() => <View style={styles.separator} />}
					renderItem={({ item, index }) => (
						<Item
							key={index}
							onRemove={handleRemove}
							onStatus={handleStatus}
							data={item}
						/>
					)}
				/>
			</View>
		</View>
	);
}