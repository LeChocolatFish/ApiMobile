const API_URL = 'https://criptos.webapptech.cloud/api/cripto';
import { Alert} from 'react-native';

export const fetchCripto = async (setRegistros) => {
    try {
        const response = await fetch(API_URL);
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('erro ao buscar criptos:', error);
        return [];
    }
};
export const createCripto = async (CriptoData ) => {
    console.log('resposta bruta da api:', CriptoData)
    try {
        const response = await fetch('https://criptos.webapptech.cloud/api/cripto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(CriptoData),
        });
        if (response.status === 204) {
            Alert.alert('sucesso', 'cadastro realizado com sucesso');
            return {};
        }

        const textResponse = await response.text();
        console.log('resposta bruta da api:', textResponse);

        let responseData;
        try {
            responseData = JSON.parse(textResponse);
        } catch (error) {
        console.warn('a resposta não é um JSON valido');
        responseData = null;
        }
        if (!response.ok || !responseData) {
            throw new Error(responseData?.message || 'erro desconhecido na api');
        }

        return responseData;
    } catch (error) {
        console.error('erro ao cadastrar cripto', error.message);
        Alert.alert ('erro ao cadastrar', `detalhes: ${error.message}`);
        return null;
    }
};
export const deleteCripto = async (CriptoId, setRegistros) => {
    try {
        const response = await fetch(`https://criptos.webapptech.cloud/api/cripto/${CriptoId}`, {
            method: 'DELETE', 
        });

        if (response.ok) {
            const responseData = await response.json();
            if (responseData.success) {
                Alert.alert('sucesso!', responseData.message);    
                
setRegistros((prevRegistros) => {
    const novaLista = prevRegistros.filter((Cripto) => Cripto.id != CriptoId);
    console.log('nova lista de criptos:', novaLista);
    return novaLista;
});
        } else {
            Alert.alert('erro', responseData.message);
        }
    } else {
        const textResponse = await response.text();
        let responseData = null;

        try {
            responseData = JSON.parse(textResponse);
        } catch (error) {
            console.warn('a resposta não é um json valido');
        }
        throw new Error(responseData?.message || 'erro desconhecido ao excluir o cripto');
    }
} catch (error) {
        console.error('erro ao excluir Cripto:', error.message);
        Alert.alert('erro ao excluir', `detalhes: ${error.message}`);
    }
};
    export const updateCripto = async (Cripto, updatedData, navigation) => {
        try {
            const response = await fetch(`https://criptos.webapptech.cloud/api/cripto/${Cripto.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            console.log('Dados enviados:', updatedData);

            if (response.status === 200) {
                Alert.alert('sucesso!', 'cripto atualizado com sucesso!');
                navigation.navigate('Home');
            } else {
                const textResponse = await response.text();
                let responseData;
                try {
                    responseData = JSON.parse(textResponse);
                } catch (error) {
                    console.warn('a resposta não é um json valido');
                    responseData = null;
                }

                throw new Error(responseData?.message || 'erro desconhecido ao atualizar o cripto');
            }
        } catch (error) {
            console.error('erro ao atualizar cripto:', error.message);
            Alert.alert('erro ao atualizar', `detalhes: ${error.message}`);
        }
    };
