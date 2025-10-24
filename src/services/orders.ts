import AsyncStorage from '@react-native-async-storage/async-storage';
import { OrdemServico } from '../types';

function genId() {
  return `${Date.now().toString(36)}-${Math.floor(Math.random() * 1e9).toString(36)}`;
}

const ORDENS_KEY = '@osfacil:ordens';
const ULTIMO_NUMERO = '@osfacil:ultimo_numero_ordem';

export const getOrdens = async (): Promise<OrdemServico[]> => {
  const json = await AsyncStorage.getItem(ORDENS_KEY);
  return json ? JSON.parse(json) : [];
};

export const getOrdemById = async (id: string): Promise<OrdemServico | undefined> => {
  const ordens = await getOrdens();
  return ordens.find(o => o.id === id);
};

export const saveOrdens = async (ordens: OrdemServico[]) => {
  await AsyncStorage.setItem(ORDENS_KEY, JSON.stringify(ordens));
};

export const createOrdem = async (ordemPartial: Omit<OrdemServico, 'id' | 'numero' | 'dataAbertura' | 'valorTotal'> & { servicos?: any[] }) => {
  const ordens = await getOrdens();
  const ultimo = (await AsyncStorage.getItem(ULTIMO_NUMERO)) || '0';
  const numero = parseInt(ultimo, 10) + 1;
  await AsyncStorage.setItem(ULTIMO_NUMERO, String(numero));

  const servicos = (ordemPartial.servicos || []).map(s => ({ id: genId(), descricao: s.descricao, valor: Number(s.valor) }));
  const valorTotal = servicos.reduce((sum, s) => sum + s.valor, 0);

  const ordem: OrdemServico = {
    id: genId(),
    numero,
    clienteId: ordemPartial.clienteId,
    veiculoId: ordemPartial.veiculoId,
    dataAbertura: new Date().toISOString(),
    status: ordemPartial.status || 'ABERTA',
    defeito: ordemPartial.defeito || '',
    observacoes: ordemPartial.observacoes || '',
    servicos,
    valorTotal,
  };

  ordens.push(ordem);
  await saveOrdens(ordens);
  return ordem;
};

export const deleteOrdem = async (id: string) => {
  const ordens = await getOrdens();
  const filtered = ordens.filter(o => o.id !== id);
  await saveOrdens(filtered);
};

export const updateOrdem = async (ordem: OrdemServico) => {
  const ordens = await getOrdens();
  const idx = ordens.findIndex(o => o.id === ordem.id);
  if (idx >= 0) ordens[idx] = ordem;
  await saveOrdens(ordens);
};
