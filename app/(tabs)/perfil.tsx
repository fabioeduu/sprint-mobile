import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Container from '../../components/Container';
import { useFocusEffect } from '@react-navigation/native';
import { getOrdens } from '../../src/services/orders';
import { getClientes } from '../../src/services/clientes';

export default function PerfilPage() {
  const [stats, setStats] = useState({
    totalOrdens: 0,
    totalClientes: 0,
  });

  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      const loadStats = async () => {
        const ordens = await getOrdens();
        const clientes = await getClientes();
        
        if (mounted) {
          setStats({
            totalOrdens: ordens.length,
            totalClientes: clientes.length,
          });
        }
      };
      loadStats();
      return () => { mounted = false; };
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <Container>
        <Text style={styles.title}>Perfil</Text>

        <View style={styles.statItem}>
          <Ionicons name="list" size={24} color="#2596be" />
          <View style={styles.statContent}>
            <Text style={styles.statLabel}>Total de Ordens</Text>
            <Text style={styles.statValue}>{stats.totalOrdens}</Text>
          </View>
        </View>

        <View style={styles.statItem}>
          <Ionicons name="people" size={24} color="#2596be" />
          <View style={styles.statContent}>
            <Text style={styles.statLabel}>Total de Clientes</Text>
            <Text style={styles.statValue}>{stats.totalClientes}</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>ℹ️ Sobre</Text>
          <Text style={styles.infoText}>
            OSFácil v1.0.0
          </Text>
          <Text style={styles.infoText}>
            Sistema de gerenciamento de ordens de serviço automotivas
          </Text>
        </View>

		
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  statContent: {
    marginLeft: 16,
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2596be',
  },
  infoBox: {
    backgroundColor: '#E8F4F8',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#555',
    marginBottom: 6,
    lineHeight: 18,
  },
});
