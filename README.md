# iOS 16 Benzeri Todo Uygulaması

Bu proje Expo Go v54, React Native ve Firebase kullanılarak oluşturulmuş modern bir todo uygulamasıdır. iOS 16 tasarım dilini takip eder.

## Özellikler

- **iOS 16 Tasarım**: Apple'ın yeni tasarım dilini takip eden modern arayüz
- **Firebase Entegrasyonu**: Gerçek zamanlı veri senkronizasyonu
- **Todo Yönetimi**: Görev ekleme, tamamlama ve silme
- **Animasyonlar**: Smooth geçişler ve fade efektleri
- **Responsive Tasarım**: Tüm ekran boyutlarında uyumlu
- **KeyboardAvoidingView**: Klavye ile uyumlu çalışma

## Kurulum

1. Projeyi klonlayın veya indirin
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. Firebase konfigürasyonu:
   - Firebase Console'da yeni proje oluşturun
   - Firestore Database'i etkinleştirin
   - `App.js` dosyasındaki `firebaseConfig` objesini kendi config'inizle değiştirin

## Çalıştırma

### Expo Go ile (Önerilen)
1. Expo Go uygulamasını telefonunuza indirin
2. Projeyi başlatın:
   ```bash
   npm start
   ```
3. QR kodu Expo Go ile tarayın

### Diğer Platformlar
- **Android**: `npm run android`
- **iOS**: `npm run ios`
- **Web**: `npm run web`

## Teknolojiler

- **Expo SDK**: v54.0.6
- **React Native**: 0.81.4
- **React**: 19.1.0
- **Expo Status Bar**: 3.0.8

## Proje Yapısı

```
test01/
├── App.js              # Ana uygulama bileşeni
├── app.json            # Expo konfigürasyonu
├── package.json        # Proje bağımlılıkları
├── assets/             # Görsel dosyalar
│   ├── icon.png
│   ├── splash-icon.png
│   └── adaptive-icon.png
└── README.md           # Bu dosya
```

## Geliştirme

Uygulama aşağıdaki React Native bileşenlerini kullanır:
- `SafeAreaView`: Güvenli alan desteği
- `ScrollView`: Kaydırılabilir içerik
- `TouchableOpacity`: Dokunulabilir butonlar
- `TextInput`: Metin girişi
- `Alert`: Uyarı mesajları
- `StyleSheet`: Stil tanımlamaları

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
