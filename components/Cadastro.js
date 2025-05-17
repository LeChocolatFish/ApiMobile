import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { createCripto } from './Api';

export default function Cadastro({ navigation }) {
    const [registro, setRegistros] = useState([]);
    const [nomeCripto, setNomeCripto] = useState('');
    const [siglaCripto, setSiglaCripto] = useState('');

const [selectedCriptoId, setSelectedCriptoId] = useState(null);

    const handleSubmit = async () => {
        if (!nomeCripto || !siglaCripto) {
            Alert.alert('atenção', 'Preencha todos os campos antes de cadastrar');
            return;
        }

        const newCripto = { nomeCripto, siglaCripto };

        if (selectedCriptoId) {
            await updateCripto(selectedCriptoId, newCripto);
            setSelectedCriptoId(null);
        } else {
            const addedCripto = await createCripto(newCripto);
            if (addedCripto) {
                Alert.alert('sucesso!', 'cadastro realizado com sucesso', [
                    {text: 'ok', onPress: () => navigation.navigate('Home')},
                ]);
            }
        }

        setNomeCripto('');
        setSiglaCripto('');
    };
    return (
        <View>
            <TextInput
            placeholder="nome da cripto"
            value={nomeCripto}
            onChangeText={setNomeCripto}
            />
            <TextInput
            placeholder="sigla da cripto"
            value={siglaCripto}
            onChangeText={setSiglaCripto}
            />

            <Button title="cadastrar" onPress={handleSubmit} />
        </View>
    );
}