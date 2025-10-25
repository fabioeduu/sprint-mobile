import AsyncStorage from '@react-native-async-storage/async-storage';
import { Veiculo } from '../types';

const VEICULOS_KEY = '@osfacil:veiculos';

function genId() {
  return `${Date.now().toString(36)}-${Math.floor(Math.random() * 1e9).toString(36)}`;
}

export const getVeiculos = async (): Promise<Veiculo[]> => {
  const json = await AsyncStorage.getItem(VEICULOS_KEY);
  return json ? JSON.parse(json) : [];
};

export const getVeiculoById = async (id: string): Promise<Veiculo | undefined> => {
  const veiculos = await getVeiculos();
  return veiculos.find(v => v.id === id);
};

export const saveVeiculos = async (veiculos: Veiculo[]) => {
  await AsyncStorage.setItem(VEICULOS_KEY, JSON.stringify(veiculos));
};

export const createVeiculo = async (veiculoPartial: Omit<Veiculo, 'id' | 'dataCadastro'>) => {
  const veiculos = await getVeiculos();
  const veiculo: Veiculo = {
    id: genId(),
    clienteId: veiculoPartial.clienteId,
    marca: veiculoPartial.marca,
    modelo: veiculoPartial.modelo,
    placa: veiculoPartial.placa,
    ano: veiculoPartial.ano,
    cor: veiculoPartial.cor,
    dataCadastro: new Date().toISOString(),
  };
  veiculos.push(veiculo);
  await saveVeiculos(veiculos);
  return veiculo;
};

export const deleteVeiculo = async (id: string) => {
  const veiculos = await getVeiculos();
  const filtered = veiculos.filter(v => v.id !== id);
  await saveVeiculos(filtered);
};

export const updateVeiculo = async (veiculo: Veiculo) => {
  const veiculos = await getVeiculos();
  const idx = veiculos.findIndex(v => v.id === veiculo.id);
  if (idx >= 0) veiculos[idx] = veiculo;
  await saveVeiculos(veiculos);
};
