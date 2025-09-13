import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { registerRootComponent } from 'expo';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Alert,
  TextInput
} from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [todos, setTodos] = useState([
    { id: 1, text: 'Expo Go v54 ile React Native öğren', completed: false },
    { id: 2, text: 'Modern UI bileşenleri oluştur', completed: false },
    { id: 3, text: 'State management uygula', completed: false }
  ]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    setCount(count - 1);
  };

  const addTodo = () => {
    if (name.trim()) {
      const newTodo = {
        id: Date.now(),
        text: name,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setName('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const showAlert = () => {
    Alert.alert(
      'Merhaba!',
      'Expo Go v54 ve React Native ile oluşturuldu!',
      [{ text: 'Tamam' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>React Native App</Text>
          <Text style={styles.subtitle}>Expo Go v54 ile oluşturuldu</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sayaç Uygulaması</Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity style={styles.button} onPress={decrementCount}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterText}>{count}</Text>
            <TouchableOpacity style={styles.button} onPress={incrementCount}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Todo Listesi falan Listesi</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Yeni görev ekle..."
              value={name}
              onChangeText={setName}
            />
            <TouchableOpacity style={styles.addButton} onPress={addTodo}>
              <Text style={styles.addButtonText}>Ekle</Text>
            </TouchableOpacity>
          </View>
          {todos.map(todo => (
            <TouchableOpacity
              key={todo.id}
              style={[styles.todoItem, todo.completed && styles.completedTodo]}
              onPress={() => toggleTodo(todo.id)}
            >
              <Text style={[styles.todoText, todo.completed && styles.completedText]}>
                {todo.text} 
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.alertButton} onPress={showAlert}>
          <Text style={styles.alertButtonText}>Alert Göster</Text>
        </TouchableOpacity>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  counterText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 60,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  todoItem: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  completedTodo: {
    backgroundColor: '#e8f5e8',
    borderLeftColor: '#34C759',
  },
  todoText: {
    fontSize: 16,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  alertButton: {
    backgroundColor: '#FF9500',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  alertButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

// Expo Snack için gerekli
registerRootComponent(App);
