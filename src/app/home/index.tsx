import { Image, TouchableOpacity, View, Text, ScrollView, FlatList, Alert } from 'react-native';
import { styles } from './styles';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter';
import { FilterStatus } from '@/types/FilterStatus';
import { Item, ItemData } from '@/components/Item';
import React, { useEffect, useState } from 'react';
import { itemsStorage } from '@/storage/items-storage';

const FILTER_STATUS: FilterStatus[] = [
	FilterStatus.DONE,
	FilterStatus.PENDING,
];

export default function Home() {
	const [filterStatus, setFilterStatus] = useState<FilterStatus>(FilterStatus.DONE)
	const [compras, setCompras] = useState<ItemData[]>([])
	const [item, setItem] = useState<ItemData>({
		status: FilterStatus.PENDING,
		description: ""
	})

	const handleAddItem = async () => {
		if (!item.description.trim()) {
			return Alert.alert("Adicionar", "Informe a descrição do item")
		}

		await itemsStorage.add(item)
		await getItems()
		clearDescription()
	}

	const handleRemove = () => {
		console.log("Remover item")
	}

	const handleStatus = (item: ItemData) => {
	}

	async function getItems() {
		try {
			const items = await itemsStorage.get()
			console.log(items)
			setCompras(items)
		} catch (error) {
			console.log(error)
			Alert.alert("Ops...", "Não foi possível filtrar os itens.")
		}
	}

	const clearDescription = () => {
		setItem(({
			status: FilterStatus.PENDING,
			description: ""
		}))
	}

	useEffect(() => {
		getItems()
	}, [])

	return (
		<View style={styles.container}>
			<Image source={require('@/assets/logo.png')} style={styles.logo} />

			<View style={styles.form}>
				<Input
					placeholder='O que você precisa comprar?'
					onChangeText={(description) => setItem(prev => ({ ...prev, description }))}
					value={item.description}
				/>
				<Button onPress={handleAddItem} title='Adicionar' activeOpacity={0.7} />
			</View>

			<View style={styles.content}>
				<View style={styles.header}>
					{
						FILTER_STATUS.map((item, index) => (
							<Filter
								key={index}
								status={item}
								isActive={item === filterStatus}
								onPress={() => setFilterStatus(item)}
							/>
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
					data={compras}
					ListEmptyComponent={() => <Text style={styles.empty}>Nenhum item aqui.</Text>}
					ItemSeparatorComponent={() => <View style={styles.separator} />}
					renderItem={({ item, index }) => (
						<Item
							key={index}
							data={item}
							onRemove={handleRemove}
							onStatus={() => handleStatus(item)}
						/>
					)}
				/>
			</View>
		</View>
	);
}