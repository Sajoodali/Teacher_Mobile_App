// import { API_ENDPOINTS, BASE_URL } from '@/config/api';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Device from 'expo-device'; // 🔥 Ye install hona chahiye
// import * as Notifications from 'expo-notifications';
// import { useCallback, useEffect, useRef, useState } from 'react';
// import { Platform } from 'react-native';

// // Notification Handler (App open hony p bhi notification dikhaye)
// Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//         shouldShowAlert: true,
//         shouldPlaySound: true,
//         shouldSetBadge: false,
//         shouldShowBanner: true,
//         shouldShowList: true,
//     }),
// });

// export interface NotificationUI {
//     id: string;
//     title: string;
//     message: string;
//     time: string;
//     type: 'info' | 'warning' | 'success';
//     read: boolean;
// }

// export const useNotifications = () => {
//     const [notifications, setNotifications] = useState<NotificationUI[]>([]);
//     const [unreadCount, setUnreadCount] = useState(0);
//     const [loading, setLoading] = useState(false);
//     const responseListener = useRef<Notifications.Subscription | null>(null);

//     // 1. Data Formatter
//     const formatTime = (dateString: string) => {
//         const date = new Date(dateString);
//         return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     };

//     const mapBackendToUI = (data: any[]): NotificationUI[] => {
//         return data.map((item) => ({
//             id: item._id,
//             title: item.title,
//             message: item.message,
//             time: formatTime(item.createdAt),
//             type: ['assignment', 'exam', 'fee_overdue'].includes(item.type) ? 'warning'
//                 : ['result', 'fee_payment'].includes(item.type) ? 'success'
//                     : 'info',
//             read: item.isRead || false,
//         }));
//     };

//     // 2. Fetch Notifications Logic
//     const fetchNotifications = useCallback(async () => {
//         try {
//             setLoading(true);
//             const token = await AsyncStorage.getItem('token');
//             const userStr = await AsyncStorage.getItem('user');

//             if (!userStr || !token) return;
//             const user = JSON.parse(userStr);
//             const userId = user._id || user.id;

//             const response = await fetch(`${BASE_URL}${API_ENDPOINTS.NOTIFICATIONS.GET_NOTIFICATIONS}?userId=${userId}`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 },
//             });

//             const result = await response.json();

//             if (result.success) {
//                 const formattedData = mapBackendToUI(result.data.notifications);
//                 setNotifications(formattedData);
//                 setUnreadCount(result.data.unreadCount);
//             }
//         } catch (error) {
//             console.error('Fetch Notification Error:', error);
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     // ============================================================
//     // 🔥 NEW: TOKEN REGISTRATION & SAVING LOGIC
//     // ============================================================
//     const registerForPushNotificationsAsync = async () => {
//         let token;

//         if (Platform.OS === 'android') {
//             await Notifications.setNotificationChannelAsync('default', {
//                 name: 'default',
//                 importance: Notifications.AndroidImportance.MAX,
//                 vibrationPattern: [0, 250, 250, 250],
//                 lightColor: '#FF231F7C',
//             });
//         }

//         if (Device.isDevice) {
//             const { status: existingStatus } = await Notifications.getPermissionsAsync();
//             let finalStatus = existingStatus;

//             if (existingStatus !== 'granted') {
//                 const { status } = await Notifications.requestPermissionsAsync();
//                 finalStatus = status;
//             }

//             if (finalStatus !== 'granted') {
//                 console.log('Failed to get push token permission!');
//                 return;
//             }

//             // ✅ Project ID zaroori hai Development Build k liye
//             token = (await Notifications.getExpoPushTokenAsync({
//                 projectId: '305b608b-280d-4995-beb7-9a5ad3e55fd5'
//             })).data;

//             console.log("📲 Generated Token:", token);
//             console.log("📲 Generated Token:", token);
//             // Backend par bhejo
//             await saveTokenToBackend(token);
//         } else {
//             console.log('Must use physical device for Push Notifications');
//         }
//     };

//     const saveTokenToBackend = async (pushToken: string) => {
//         try {
//             const userStr = await AsyncStorage.getItem('user');
//             const token = await AsyncStorage.getItem('token'); // Auth token
//             if (!userStr) return;
//             const user = JSON.parse(userStr);

//             // API Endpoint for saving token
//             const response = await fetch(`${BASE_URL}/api/auth/save-token`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     // 'Authorization': `Bearer ${token}` // Agar secured hai to
//                 },
//                 body: JSON.stringify({
//                     userId: user._id || user.id,
//                     token: pushToken
//                 })
//             });
//             const data = await response.json();
//             console.log("✅ Token Saved to DB:", data.success);
//         } catch (error) {
//             console.error("❌ Failed to save token:", error);
//         }
//     }

//     // 3. Mark As Read
//     const markAsRead = async (id: string) => {
//         setNotifications(prev =>
//             prev.map(n => n.id === id ? { ...n, read: true } : n)
//         );
//         setUnreadCount(prev => Math.max(0, prev - 1));
//     };

//     const markAllAsRead = () => {
//         setNotifications(prev => prev.map(n => ({ ...n, read: true })));
//         setUnreadCount(0);
//     };

//     // 4. Initial Load
//     useEffect(() => {
//         // 1. Fetch List
//         fetchNotifications();

//         // 2. 🔥 Register Token (Ye missing tha pehle)
//         registerForPushNotificationsAsync();

//         // 3. Listen for incoming notifications
//         const subscription = Notifications.addNotificationReceivedListener(() => {
//             fetchNotifications(); // Naya message aate hi list update karo
//         });

//         return () => subscription.remove();
//     }, [fetchNotifications]);

//     return {
//         notifications,
//         unreadCount,
//         loading,
//         fetchNotifications,
//         markAsRead,
//         markAllAsRead,
//     };
// };




import { API_ENDPOINTS, BASE_URL } from '@/config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

// 1. Notification Handler (Background/Foreground behavior)
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export interface NotificationUI {
    id: string;
    title: string;
    message: string;
    time: string;
    type: 'info' | 'warning' | 'success';
    read: boolean;
}

export const useNotifications = () => {
    const [notifications, setNotifications] = useState<NotificationUI[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const responseListener = useRef<Notifications.Subscription | null>(null);
    const notificationListener = useRef<Notifications.Subscription | null>(null);

    // Helper: Time Format
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Helper: Map Data
    const mapBackendToUI = (data: any[]): NotificationUI[] => {
        return data.map((item) => ({
            id: item._id,
            title: item.title,
            message: item.message,
            time: formatTime(item.createdAt),
            type: ['assignment', 'exam', 'fee_overdue'].includes(item.type) ? 'warning'
                : ['result', 'fee_payment'].includes(item.type) ? 'success'
                    : 'info',
            read: item.isRead || false,
        }));
    };

    // ----------------------------------------------------
    // 2. TOKEN GENERATION & SAVING (Fixed)
    // ----------------------------------------------------
    const registerForPushNotificationsAsync = async () => {
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== 'granted') {
                console.log('❌ Permission not granted for push notifications');
                return;
            }

            try {
                // 🔥 Project ID (EAS Build k liye zaroori)
                const tokenData = await Notifications.getExpoPushTokenAsync({
                    projectId: '305b608b-280d-4995-beb7-9a5ad3e55fd5'
                });

                const token = tokenData.data;
                console.log("📲 Mobile Token Generated:", token);

                // Backend pay save karo
                await saveTokenToBackend(token);
            } catch (error) {
                console.error("❌ Error getting token:", error);
            }
        } else {
            console.log('⚠️ Must use physical device for Push Notifications');
        }
    };

    const saveTokenToBackend = async (pushToken: string) => {
        try {
            const userStr = await AsyncStorage.getItem('user');
            const authToken = await AsyncStorage.getItem('token');

            if (!userStr) return;
            const user = JSON.parse(userStr);
            const userId = user._id || user.id;

            // 🔥 FIX: Correct Endpoint URL from Constants
            const url = `${BASE_URL}${API_ENDPOINTS.NOTIFICATIONS.SAVE_TOKEN}`;

            console.log("📡 Sending Token to:", url);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}` // Secure API
                },
                body: JSON.stringify({
                    userId: userId,
                    token: pushToken
                })
            });

            const data = await response.json();

            if (data.success) {
                console.log("✅ Token Saved Successfully in DB");
            } else {
                console.log("⚠️ Token Save Failed:", data.message);
            }

        } catch (error) {
            console.error("❌ Network Error saving token:", error);
        }
    }

    // ----------------------------------------------------
    // 3. FETCH NOTIFICATIONS (List)
    // ----------------------------------------------------
    const fetchNotifications = useCallback(async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('token');
            const userStr = await AsyncStorage.getItem('user');

            if (!userStr || !token) return;
            const user = JSON.parse(userStr);
            const userId = user._id || user.id;

            const response = await fetch(`${BASE_URL}${API_ENDPOINTS.NOTIFICATIONS.GET_NOTIFICATIONS}?userId=${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

            if (result.success) {
                const formattedData = mapBackendToUI(result.data.notifications);
                setNotifications(formattedData);
                setUnreadCount(result.data.unreadCount);
            }
        } catch (error) {
            console.error('Fetch Error:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // 4. Mark Read Logic
    const markAsRead = async (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
        setUnreadCount(prev => Math.max(0, prev - 1));
        // TODO: Backend API call to mark read
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        setUnreadCount(0);
    };

    // 5. Initial Setup
    useEffect(() => {
        fetchNotifications();
        registerForPushNotificationsAsync();

        // Listener: Jab app open ho aur notification aaye
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            console.log("🔔 Notification Received in Foreground");
            fetchNotifications(); // List refresh karo
        });

        // Listener: Jab user notification par click kare
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log("👆 User Clicked Notification");
            // Yahan Navigation logic laga sakte ho
        });

        return () => {
            if (notificationListener.current) notificationListener.current.remove();
            if (responseListener.current) responseListener.current.remove();
        };
    }, [fetchNotifications]);

    return {
        notifications,
        unreadCount,
        loading,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
    };
};