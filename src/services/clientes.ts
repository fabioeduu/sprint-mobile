import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cliente } from '../types';

function genId() {
  return `${Date.now().toString(36)}-${Math.floor(Math.random() * 1e9).toString(36)}`;
}

const CLIENTES_KEY = '@osfacil:clientes';

export const getClientes = async (): Promise<Cliente[]> => {
  const json = await AsyncStorage.getItem(CLIENTES_KEY);
  return json ? JSON.parse(json) : [];
};

export const getClienteById = async (id: string): Promise<Cliente | undefined> => {
  const clientes = await getClientes();
  return clientes.find(c => c.id === id);
};

export const saveClientes = async (clientes: Cliente[]) => {
  await AsyncStorage.setItem(CLIENTES_KEY, JSON.stringify(clientes));
};

export const createCliente = async (clientePartial: Omit<Cliente, 'id' | 'dataCadastro'>) => {
  const clientes = await getClientes();
  
  const cliente: Cliente = {
    id: genId(),
    nome: clientePartial.nome,
    email: clientePartial.email,
    telefone: clientePartial.telefone,
    endereco: clientePartial.endereco,
    dataCadastro: new Date().toISOString(),
  };

  clientes.push(cliente);
  await saveClientes(clientes);
  return cliente;
};

export const deleteCliente = async (id: string) => {
  const clientes = await getClientes();
  const filtered = clientes.filter(c => c.id !== id);
  await saveClientes(filtered);
};

export const updateCliente = async (cliente: Cliente) => {
  const clientes = await getClientes();
  const idx = clientes.findIndex(c => c.id === cliente.id);
  if (idx >= 0) clientes[idx] = cliente;
  await saveClientes(clientes);
};
