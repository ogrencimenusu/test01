import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { registerRootComponent } from 'expo';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated
} from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

// Firebase konfigürasyonu (kendi config'inizi buraya ekleyin)
const firebaseConfig = {
  apiKey: "AIzaSyCt8nW-195pG2R66FPhK8mdVQiMMSA39qk",
  authDomain: "portfoy-7a82c.firebaseapp.com",
  projectId: "portfoy-7a82c",
  storageBucket: "portfoy-7a82c.firebasestorage.app",
  messagingSenderId: "988278857233",
  appId: "1:988278857233:web:e6d649240a11df21231bb0",
  measurementId: "G-DEYR8W2501"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    loadTodos();
    // Fade in animasyonu
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'todos'));
      const todosData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTodos(todosData);
    } catch (error) {
      console.error('Error loading todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (newTodo.trim()) {
      try {
        const docRef = await addDoc(collection(db, 'todos'), {
          text: newTodo.trim(),
          completed: false,
          createdAt: new Date()
        });
        setTodos([...todos, { id: docRef.id, text: newTodo.trim(), completed: false }]);
        setNewTodo('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find(t => t.id === id);
      await updateDoc(doc(db, 'todos', id), {
        completed: !todo.completed
      });
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          {/* iOS 16 benzeri header */}
          <View style={styles.header}>
            <Text style={styles.title}>Görevlerim</Text>
            <Text style={styles.subtitle}>{todos.length} görev</Text>
          </View>

          {/* iOS 16 benzeri input alanı */}
          <View style={styles.inputSection}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Yeni görev ekle..."
                placeholderTextColor="#8E8E93"
                value={newTodo}
                onChangeText={setNewTodo}
                onSubmitEditing={addTodo}
                returnKeyType="done"
              />
              <TouchableOpacity 
                style={[styles.addButton, !newTodo.trim() && styles.addButtonDisabled]} 
                onPress={addTodo}
                disabled={!newTodo.trim()}
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* iOS 16 benzeri todo listesi */}
          <ScrollView style={styles.todoList} showsVerticalScrollIndicator={false}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Yükleniyor...</Text>
              </View>
            ) : todos.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Henüz görev yok</Text>
                <Text style={styles.emptySubtext}>Yukarıdan yeni görev ekleyebilirsin</Text>
              </View>
            ) : (
              todos.map((todo, index) => (
                <Animated.View
                  key={todo.id}
                  style={[
                    styles.todoItem,
                    todo.completed && styles.completedTodo,
                    { transform: [{ translateX: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0]
                    })}] }
                  ]}
                >
                  <TouchableOpacity
                    style={styles.todoContent}
                    onPress={() => toggleTodo(todo.id)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.checkbox, todo.completed && styles.checkboxCompleted]}>
                      {todo.completed && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <Text style={[styles.todoText, todo.completed && styles.completedText]}>
                      {todo.text}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteTodo(todo.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.deleteButtonText}>🗑️</Text>
                  </TouchableOpacity>
                </Animated.View>
              ))
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </Animated.View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7', // iOS 16 benzeri arka plan
  },
  content: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 34,
    fontWeight: '700', // iOS 16 bold
    color: '#000000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '400',
    color: '#8E8E93',
  },
  inputSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  addButton: {
    backgroundColor: '#007AFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  addButtonDisabled: {
    backgroundColor: '#C7C7CC',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  todoList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  todoItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  completedTodo: {
    opacity: 0.6,
  },
  todoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#C7C7CC',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#34C759',
    borderColor: '#34C759',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  todoText: {
    fontSize: 17,
    color: '#000000',
    fontWeight: '400',
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteButtonText: {
    fontSize: 18,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 17,
    color: '#8E8E93',
    fontWeight: '400',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 20,
    color: '#8E8E93',
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 17,
    color: '#C7C7CC',
    fontWeight: '400',
  },
});

// Expo Snack için gerekli
registerRootComponent(App);
