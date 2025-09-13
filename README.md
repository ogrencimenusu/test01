# React Native App with Expo Go v54

Bu proje Expo Go v54 ve React Native kullanılarak oluşturulmuş modern bir mobil uygulamadır.

## Özellikler

- **Sayaç Uygulaması**: Artırma ve azaltma butonları ile sayı sayma
- **Todo Listesi**: Görev ekleme, tamamlama ve yönetme
- **Modern UI**: Gölgeler, yuvarlatılmış köşeler ve renkli tasarım
- **Alert Sistemi**: Kullanıcı etkileşimi için alert mesajları
- **ScrollView**: İçerik kaydırma desteği
- **SafeAreaView**: Güvenli alan desteği

## Kurulum

1. Projeyi klonlayın veya indirin
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

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
