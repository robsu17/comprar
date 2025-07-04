import { Image, TouchableOpacity, View, Text, FlatList, Alert } from 'react-native';
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
	const [filterStatus, setFilterStatus] = useState<FilterStatus>(FilterStatus.PENDING)
	const [compras, setCompras] = useState<ItemData[]>([])
	const [item, setItem] = useState<ItemData>({
		status: FilterStatus.PENDING,
		description: "",
		id: ""
	})

	const handleAddItem = async () => {
		if (!item.description.trim()) {
			return Alert.alert("Adicionar", "Informe a descrição do item")
		}

		setItem(prev => ({ ...prev, id: Math.random().toString(32) }))
		await itemsStorage.add(item)
		await itemsByStatus()
		clearDescription()

		Alert.alert("Adicionado", `Novo item adicionado: ${item.description}`)
	}

	const handleRemove = async (id: string) => {
		try {
			await itemsStorage.remove(id)
			await itemsByStatus()
			Alert.alert("Removeu", "Item removido com sucesso")
		} catch (error) {
			console.log(error)
			Alert.alert("Remover", "Não foi possível remover.")
		}
	}

	const handleConfirmClearItems = async () => {
		Alert.alert("Limpar", "Deseja remover todos?", [
			{ text: "Não", style: "cancel" },
			{ text: "Sim", onPress: () => handleClearItems() }
		])
	}

	const handleClearItems = async () => {
		try {
			await itemsStorage.clear()
			await itemsByStatus()
		} catch (error) {
			console.log(error)
			Alert.alert("Limpar", "Não foi possível limpar os items.")
		}
	}

	const handleStatus = async (id: string) => {
		try {
			await itemsStorage.toogleStatus(id)
			await itemsByStatus()
		} catch (error) {
			console.log(error)
			Alert.alert("Status", "Não foi possível mudar o status.")
		}
	}

	async function itemsByStatus() {
		try {
			const items = await itemsStorage.getByStatus(filterStatus)
			setCompras(items)
		} catch (error) {
			console.log(error)
			Alert.alert("Ops...", "Não foi possível filtrar os itens.")
		}
	}

	const clearDescription = () => {
		setItem(prev => ({
			...prev,
			status: FilterStatus.PENDING,
			description: ""
		}))
	}

	useEffect(() => {
		itemsByStatus()
	}, [filterStatus])

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
					<TouchableOpacity style={styles.clearButton} onPress={handleConfirmClearItems} disabled={compras.length === 0}>
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
							onRemove={() => handleRemove(item.id || "")}
							onStatus={() => handleStatus(item.id || "")}
						/>
					)}
				/>
			</View>
		</View>
	);
}