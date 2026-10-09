APNA DHAVA — शुरुआती PWA संस्करण

इस पैकेज में:
- मोबाइल/PC के लिए responsive village app interface
- खबर, सूचना बोर्ड, कार्यक्रम और खबर भेजने का फॉर्म
- PWA manifest और basic offline cache
- खबर भेजने का विकल्प WhatsApp message तैयार करता है

महत्वपूर्ण:
1. अभी खबर भेजने का बटन जानबूझकर placeholder पर है।
2. app.js में ADMIN_WHATSAPP_NUMBER को अपने सार्वजनिक/समर्पित WhatsApp नंबर से बदलें।
   भारत के नंबर के उदाहरण का format: 91XXXXXXXXXX (बिना +, space या dash)।
3. यह संस्करण अपने-आप खबरों को सबके सामने प्रकाशित नहीं करता। Admin को खबर जाँचकर प्रकाशित करनी होगी।
4. यह एक static PWA है। Google Play Store में प्रकाशित APK/AAB अलग काम है और Play Console की शर्तें लागू होंगी।

मुफ्त में ऑनलाइन करने का एक तरीका:
- GitHub पर नया public repository बनाएं।
- ZIP extract करके सभी files repository के root में upload करें।
- Repository Settings > Pages > Deploy from a branch > main / root चुनें।
- कुछ समय बाद GitHub Pages का URL मिलेगा।
- Android Chrome में URL खोलकर browser menu से “Install app” या “Add to Home screen” चुनें।
- PC Chrome/Edge में address bar का install icon या browser menu इस्तेमाल करें।

सुरक्षा और जिम्मेदारी:
- केवल खबरों को जाँचकर प्रकाशित करें।
- निजी जानकारी, अफ़वाह और बिना प्रमाण के आरोप न डालें।
- अगर भविष्य में users को सीधे app में पोस्ट करने देना हो, तो backend/database और moderation जोड़ना होगा।
